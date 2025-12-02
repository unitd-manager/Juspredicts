import React from "react";
import Navbar from "@/components/Navbar";
import { api } from "@/api/client";
import { ArrowLeft, TrendingUp, Users, DollarSign, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ✅ Team display inside a match card
const TeamRow = ({ team, probability }: { team: any; probability: number }) => {
  // Normalize team name from various possible fields
  const teamName =
    [team?.name, team?.shortName, team?.displayName, team?.teamName, team?.abbreviation]
      .find((v: any) => typeof v === "string" && v.trim().length > 0) || "Team";

  // Try multiple possible image fields and sanitize value
  const rawImageUrl =
    [team?.imageUrl, team?.logoUrl, team?.logo, team?.iconUrl, team?.badgeUrl, team?.pictureUrl]
      .find((v: any) => typeof v === "string") || "";

  const imageUrl = rawImageUrl.replace(/`/g, "").replace(/"/g, "").trim();

  const isLow = probability < 50;
  const percentTextClass = isLow ? "text-slate-400" : "text-emerald-300";
  const fillClass = isLow ? "bg-slate-700" : "bg-emerald-400";

  return (
    <div className="rounded-xl bg-slate-900 p-4 border border-slate-700 mb-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={teamName}
              className="h-10 w-10 rounded object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="h-10 w-10 rounded bg-slate-700 flex items-center justify-center">🏏</div>
          )}
          <div>
            <div className="text-base text-slate-200 font-medium">{teamName}</div>
            {team?.record && <div className="text-xs text-slate-400">Record: {team.record}</div>}
          </div>
        </div>
        <div className={`text-sm font-semibold ${percentTextClass}`}>
          {probability}%
        </div>
      </div>

      <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full ${fillClass}`}
          style={{ width: `${probability}%` }}
        ></div>
      </div>

      {team?.form && Array.isArray(team.form) && team.form.length > 0 && (
        <div className="flex items-center gap-2 text-xs text-slate-400">
          Form:
          <div className="flex gap-1">
            {team.form.map((f: string, i: number) => (
              <span
                key={i}
                className={`px-1 py-0.5 rounded bg-slate-700 ${
                  f === "W" ? "text-emerald-300" : "text-rose-400"
                }`}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ Main Event Card
const EventCard = ({ event, onViewQuestions, onQuickPredict }: { event: any; onViewQuestions: () => void; onQuickPredict: (question: any, eventId: string) => void }) => {
  const date = new Date(
    Number(event.startDate) * 1000
  ).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Event name (prioritize explicit name)
  const eventName =
    (typeof event?.name === "string" && event.name.trim()) ||
    (typeof event?.eventName === "string" && event.eventName.trim()) ||
    (typeof event?.sportEvent?.name === "string" && event.sportEvent.name.trim()) ||
    (typeof event?.sportEvent?.eventName === "string" && event.sportEvent.eventName.trim()) ||
    [
      event?.sportEvent?.sportType?.replace?.("SPORT_TYPE_", ""),
      event?.sportEvent?.eventFormat,
    ]
      .filter(Boolean)
      .join(" • ");

  // Extract team list safely from either location
  const teams = Array.isArray(event?.teams)
    ? event.teams
    : Array.isArray(event?.sportEvent?.teams)
    ? event.sportEvent.teams
    : [];

  const teamA = teams?.[0] || {};
  const teamB = teams?.[1] || {};

  // Default probabilities
  let probA = 50;
  let probB = 50;

  try {
    const stats = JSON.parse(event.stats || "{}");
    const pred = stats.result_prediction;
    if (Array.isArray(pred) && pred.length === 2) {
      probA = Number(pred[0]?.value) || probA;
      probB = Number(pred[1]?.value) || probB;
    }
  } catch {
    // fallback to 50/50
  }

  // Fetch latest (last) question for this event
  const [lastQuestionName, setLastQuestionName] = React.useState<string | null>(null);
  const [latestQuestion, setLatestQuestion] = React.useState<any | null>(null);
  const [isQLoading, setIsQLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const id = String(event.id ?? event.eventId ?? "");
    if (!id) return;
    let cancelled = false;
    const run = async () => {
      try {
        setIsQLoading(true);
        const res = await api.post<{
          event: any;
          questions: any[];
          status: { type: string };
        }>(
          "/event/v1/getevent",
          {
            eventId: id,
            getEventQuestions: true,
            questionsPageInfo: { pageNumber: 1, pageSize: 50 },
          }
        );
        if (!cancelled && res?.status?.type === "SUCCESS") {
          const qs = Array.isArray(res.questions) ? res.questions : [];
          const latest = qs.length > 0 ? qs[qs.length - 1] : null;
          console.log("EventCard fetch questions result:", { eventId: id, questions: qs, latestQuestion: latest });
          setLastQuestionName(latest?.description || latest?.name || latest?.questionName || null);
          setLatestQuestion(latest || null);
        }
      } catch {
        if (!cancelled) setLastQuestionName(null);
      } finally {
        if (!cancelled) setIsQLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [event?.id, event?.eventId]);

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-inner">
      <div className="flex justify-between mb-4">
        <div className="text-sm text-slate-300 font-medium">
          {eventName}
        </div>
        <div className="text-sm bg-slate-700/60 px-3 py-1 rounded-full">
          {date}
        </div>
      </div>

      {/* Top row: latest question (left) and View Questions button (right) */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm">
          {isQLoading ? (
            <span className="text-slate-400">Loading latest question...</span>
          ) : lastQuestionName ? (
              <button
                onClick={() => {
                  const id = String(event.id ?? event.eventId ?? "");
                  if (!id) return;
                  if (latestQuestion) {
                    onQuickPredict(latestQuestion, id);
                  } else {
                    onViewQuestions();
                  }
                }}
                className="w-full  text-white py-3 rounded-lg font-semibold  transition"
              >
                {lastQuestionName}
              </button>
          ) : (
            <span className="text-slate-400">No questions yet</span>
          )}
        </div>
        <button
          onClick={onViewQuestions}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
        >
          View Questions
        </button>
      </div>

      <TeamRow team={teamA} probability={probA} />
      <TeamRow team={teamB} probability={probB} />

      {/* Removed the full-width bottom button; now shown in the top-right */}
    
    </div>
  );
};

// Inline EventDetails component to show related questions for an event
const EventDetails: React.FC<{
  eventId: string;
  selectedQuestionId?: string | null;
  onBack: () => void;
  onPredict: (question: any, eventId: string, predictionId?: string | null) => void;
  showTabs?: boolean;
  initialTab?: "All" | "Others" | "Live" | "Open" | "Completed" | "Cancelled" | "Exit";
}> = ({ eventId, selectedQuestionId, onBack, onPredict, showTabs = true, initialTab = "All" }) => {
  const [event, setEvent] = React.useState<any | null>(null);
  const [questions, setQuestions] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [tab, setTab] = React.useState<"All" | "Others" | "Live" | "Open" | "Completed" | "Cancelled" | "Exit">(initialTab);
  const [completedPeriod, setCompletedPeriod] = React.useState<string>("PREDICTIONTIMEINFORCE_COMPLETED_ALLTIME");
  const [myPredictionsMap, setMyPredictionsMap] = React.useState<Record<string, any[]>>({});
  
  // Helper to normalize question id from different API shapes (some responses use `id`, others `questionId`).
  const getQuestionId = (q: any) => String(q?.questionId ?? q?.id ?? "");

  // Return an array of predictions for a question (supports multiple predictions per question)
  const getPredictionsForQuestion = (q: any) => {
    const qid = getQuestionId(q);
    if (!qid) return [] as any[];
    const v = myPredictionsMap[qid];
    if (Array.isArray(v)) return v;
    // fallback: search values for matching questionId/id inside arrays
    for (const k of Object.keys(myPredictionsMap)) {
      const arr = myPredictionsMap[k];
      if (!Array.isArray(arr)) continue;
      for (const p of arr) {
        const pid = String(p?.questionId ?? p?.question?.id ?? "");
        if (pid && pid === qid) return arr;
      }
    }
    return [] as any[];
  };
  React.useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true);
      try {
        const response = await api.post<{
          event: any;
          questions: any[];
          status: { type: string };
        }>("/event/v1/getevent", {
          eventId,
          getEventQuestions: true,
          questionsPageInfo: {
            pageNumber: 1,
            pageSize: 50,
          },
        });

        if (response.status.type === "SUCCESS") {
          setEvent(response.event);
          setQuestions(response.questions || []);
        }
      } catch (error) {
        console.error("Failed to fetch event details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  React.useEffect(() => {
    const run = async () => {
      if (!questions || questions.length === 0) return;
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setMyPredictionsMap({});
        return;
      }
      try {
        const res = await api.post<any>("/prediction/v1/get", {
          day: 0,
          month: 0,
          year: 0,
          pageRequest: { pageNumber: 1, pageSize: 200 },
          timeInForce: "PREDICTIONTIMEINFORCE_UPCOMING",
        });
        const preds = Array.isArray(res?.predictions) ? res.predictions : [];
        const filtered = preds.filter((p: any) => String(p?.eventId || "") === String(eventId));
        const map: Record<string, any[]> = {};
        for (const p of filtered) {
          const qid = String(p?.questionId || "");
          if (!qid) continue;
          if (!map[qid]) map[qid] = [];
          map[qid].push(p);
        }
        setMyPredictionsMap(map);
      } catch {
        setMyPredictionsMap({});
      }
    };
    run();
  }, [questions]);

  React.useEffect(() => {
    const timeInForceByTab: Record<string, string> = {
      All: "PREDICTIONTIMEINFORCE_UPCOMING",
      Live: "PREDICTIONTIMEINFORCE_LIVE",
      Open: "PREDICTIONTIMEINFORCE_PENDING_LIVE",
      Completed: "PREDICTIONTIMEINFORCE_COMPLETED_ALLTIME",
      Cancelled: "PREDICTIONTIMEINFORCE_CANCELLED",
      Exit: "PREDICTIONTIMEINFORCE_EXITED",
      Others: "PREDICTIONTIMEINFORCE_UPCOMING",
    };

    let interval: number | undefined;
    let mounted = true;

    const refresh = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        if (mounted) setMyPredictionsMap({});
        return;
      }
      const tif = tab === "Completed" ? completedPeriod : (timeInForceByTab[tab] || "PREDICTIONTIMEINFORCE_UPCOMING");
      try {
        const res = await api.post<any>("/prediction/v1/get", {
          day: 0,
          month: 0,
          year: 0,
          pageRequest: { pageNumber: 1, pageSize: 200 },
          timeInForce: tif,
        });
        const preds = Array.isArray(res?.predictions) ? res.predictions : [];
        const filtered = preds.filter((p: any) => String(p?.eventId || "") === String(eventId));
        const map: Record<string, any[]> = {};
        for (const p of filtered) {
          const qid = String(p?.questionId || "");
          if (!qid) continue;
          if (!map[qid]) map[qid] = [];
          map[qid].push(p);
        }
        if (mounted) setMyPredictionsMap(map);
      } catch {
        if (mounted) setMyPredictionsMap({});
      }
    };

    refresh();
    interval = window.setInterval(refresh, 120_000);

    return () => {
      mounted = false;
      if (interval) window.clearInterval(interval);
    };
  }, [tab, eventId, completedPeriod]);

  React.useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 mt-2">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-700 rounded w-1/3"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-slate-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 mt-2">
        <button onClick={onBack} className="flex items-center text-slate-300 hover:text-white mb-4">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <p className="text-slate-400">Event not found</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 mt-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-100">Available Predictions</h2>
        <button onClick={onBack} className="flex items-center text-slate-300 hover:text-white">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>
      </div>

      {/* {showTabs && (
        <div className="mb-4 inline-flex rounded-lg border border-slate-700 bg-slate-800 p-1">
          {(["Live", "Open", "Completed", "Cancelled", "Exit", "Others"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                tab === t ? "bg-emerald-600 text-white" : "text-slate-300 hover:bg-slate-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )} */}
      {/* {showTabs && tab === "Completed" && (
        <div className="mb-4 flex flex-wrap gap-2">
          {[
            "PREDICTIONTIMEINFORCE_COMPLETED_TODAY",
            "PREDICTIONTIMEINFORCE_COMPLETED_YESTERDAY",
            "PREDICTIONTIMEINFORCE_COMPLETED_LASTWEEK",
            "PREDICTIONTIMEINFORCE_COMPLETED_THISMONTH",
            "PREDICTIONTIMEINFORCE_COMPLETED_LASTMONTH",
            "PREDICTIONTIMEINFORCE_COMPLETED_ALLTIME",
          ].map((code) => (
            <button
              key={code}
              onClick={() => setCompletedPeriod(code)}
              className={`px-3 py-1 rounded border ${
                completedPeriod === code ? "border-emerald-500 text-emerald-300" : "border-slate-700 text-slate-300"
              }`}
            >
              {code.replace("PREDICTIONTIMEINFORCE_COMPLETED_", "Completed ")}
            </button>
          ))}
        </div>
      )} */}

      {questions.length === 0 ? (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
          <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-400">No prediction questions available yet</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {(() => {
            const entries: Array<{ question: any; prediction?: any }> = [];
            for (const question of questions) {
              const preds = getPredictionsForQuestion(question) || [];
              if (preds.length > 0) {
                for (const p of preds) entries.push({ question, prediction: p });
              } else {
                entries.push({ question, prediction: undefined });
              }
            }

            const filtered = entries.filter((e) => {
              const question = e.question;
              const pred = e.prediction;
              if (tab === "All") return true;
              if (tab === "Others") return getQuestionId(question) !== String(selectedQuestionId || "");
              const s = String(pred?.predictionStatus || "");
              if (tab === "Live") return s === "PREDICTION_STATUS_MATCHED";
              if (tab === "Open") return s === "PREDICTION_STATUS_ACCEPTED" || s === "PREDICTION_STATUS_CANCEL_REQUESTED";
              if (tab === "Completed") return s === "PREDICTION_STATUS_SETTLED";
              if (tab === "Cancelled") return s === "PREDICTION_STATUS_CANCELLED";
              if (tab === "Exit") return s === "PREDICTION_STATUS_EXITED";
              return true;
            });

            return filtered.map((entry, _idx: number) => {
              const { question, prediction } = entry;
              const cardClass = (() => {
                const s = String(prediction?.predictionStatus || "");
                if (s === "PREDICTION_STATUS_CANCELLED") return "bg-slate-800 rounded-xl border border-rose-600/50 p-6 opacity-70";
                if (s === "PREDICTION_STATUS_MATCHED") return "bg-slate-800 rounded-xl border border-emerald-600 p-6";
                if (s === "PREDICTION_STATUS_SETTLED") return "bg-slate-800 rounded-xl border border-blue-600 p-6";
                if (s === "PREDICTION_STATUS_EXITED") return "bg-slate-800 rounded-xl border border-slate-600 p-6 opacity-75";
                return "bg-slate-800 rounded-xl border border-slate-700 p-6";
              })();

              return (
                <div key={(prediction?.predictionId || getQuestionId(question) || question.name || _idx)} className={cardClass + " hover:shadow-md transition"}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-slate-100 mb-2">{question.name}</h3>
                      {question.description && <p className="text-slate-400 text-sm">{question.description}</p>}
                    </div>
                  </div>

                  {question.activity && (
                    <div className="flex items-center space-x-6 mb-4 text-sm">
                      <div className="flex items-center text-slate-400">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>Volume: ${Number.parseFloat(String(question.activity.questionVolume || "0")).toFixed(0)}</span>
                      </div>
                      <div className="flex items-center text-slate-400">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{question.activity.questionUsers} traders</span>
                      </div>
                    </div>
                  )}

                  {question.activity?.marketDataDetails && question.activity.marketDataDetails.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      {question.activity.marketDataDetails.map((option: any, idx: number) => {
                        const chosenOutcome = String(
                          prediction?.predictedOutcome ?? prediction?.predictionDetails?.selectedPredictionOutcome ?? prediction?.selectedPredictionOutcome ?? prediction?.selectedOutcome ?? ""
                        ).trim();
                        const isChosen = chosenOutcome && String(option.outcome || "").trim() === chosenOutcome;
                        return (
                          <div
                            key={(prediction?.predictionId ? prediction.predictionId + '-' + idx : (getQuestionId(question) ? getQuestionId(question) + '-' + idx : idx))}
                            className={"border rounded-lg p-4 transition " + (isChosen ? "border-emerald-500 bg-slate-900 text-emerald-300" : "border-slate-700 hover:border-emerald-500")}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-slate-100">{option.outcome}</span>
                              <span className="text-lg font-bold text-emerald-400">{Number.parseFloat(String(option.impliedProbability || "0")).toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${Number.parseFloat(String(option.impliedProbability || "0"))}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div>
                    <button onClick={() => onPredict(question, eventId, prediction?.predictionId ?? null)} className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">Predict</button>
                  </div>
                </div>
              );
            });
          })()}
          {(() => {
            const queued: Array<{ question: any; prediction: any }> = [];
            for (const q of questions) {
              const preds = getPredictionsForQuestion(q) || [];
              for (const p of preds) {
                const s = String(p?.predictionStatus || "");
                if (s === "PREDICTION_STATUS_ACCEPTED" || s === "PREDICTION_STATUS_CANCEL_REQUESTED") queued.push({ question: q, prediction: p });
              }
            }
            if (tab === "Open" && queued.length > 0) {
              return (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-slate-200 mb-2">Queued Questions</h4>
                  <div className="space-y-3">
                    {queued.map((e, _idx) => (
                      <div key={(e.prediction?.predictionId || getQuestionId(e.question) || e.question.name || _idx)} className="bg-slate-800 rounded-xl border border-yellow-600/50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-slate-200 text-sm">{e.question.name}</div>
                          <div className="text-xs text-yellow-400">Open</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })()}
        </div>
      )}
    </div>
  );
};

// Aggregated list for the Live tab, styled to match the reference design
const LivePredictionsList: React.FC<{ onExit: (p: any, event: any) => void }> = ({ onExit }) => {
  const [items, setItems] = React.useState<any[]>([]);
  const [eventsMap, setEventsMap] = React.useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getEventName = (event: any) => (
    (typeof event?.name === "string" && event.name.trim()) ||
    (typeof event?.eventName === "string" && event.eventName.trim()) ||
    (typeof event?.sportEvent?.name === "string" && event.sportEvent.name.trim()) ||
    (typeof event?.sportEvent?.eventName === "string" && event.sportEvent.eventName.trim()) ||
    [event?.sportEvent?.sportType?.replace?.("SPORT_TYPE_", ""), event?.sportEvent?.eventFormat].filter(Boolean).join(" • ")
  );

  const timeUntil = (startDateSec: any) => {
    const startMs = Number(startDateSec) * 1000;
    if (!isFinite(startMs)) return "--";
    const diff = startMs - Date.now();
    if (diff <= 0) return "0m";
    const d = Math.floor(diff / (24 * 3600_000));
    if (d >= 1) return `${d}d`;
    const h = Math.floor((diff % (24 * 3600_000)) / 3600_000);
    if (h >= 1) return `${h}h`;
    const m = Math.floor((diff % 3600_000) / 60_000);
    return `${m}m`;
  };

  React.useEffect(() => {
    let mounted = true;
    const fetchLive = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          if (mounted) {
            setItems([]);
            setEventsMap({});
            setIsLoading(false);
          }
          return;
        }
        const res = await api.post<any>("/prediction/v1/get", {
          day: 0,
          month: 0,
          year: 0,
          pageRequest: { pageNumber: 1, pageSize: 200 },
          timeInForce: "PREDICTIONTIMEINFORCE_LIVE",
        });
        const preds = Array.isArray(res?.predictions) ? res.predictions : [];
        if (mounted) setItems(preds);
        const idsSet = new Set<string>(
          preds
            .map((p: any) => String(p?.eventId || ""))
            .filter((s: string) => s.length > 0)
        );
        const ids: string[] = Array.from(idsSet);
        const map: Record<string, any> = {};
        await Promise.all(
          ids.map(async (id: string) => {
            try {
              const ev = await api.post<any>("/event/v1/getevent", {
                 eventId: id,  getEventQuestions: true,
          questionsPageInfo: {
            pageNumber: 1,
            pageSize: 50,
          }, });
              if (ev?.status?.type === "SUCCESS") map[id] = ev?.event || null;
            } catch {}
          })
        );
        if (mounted) setEventsMap(map);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetchLive();
    const interval = window.setInterval(fetchLive, 120_000);
    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  if (isLoading) return <div className="text-slate-400">Loading live predictions...</div>;
  if (!items || items.length === 0) return <div className="text-slate-400">No live predictions</div>;

  return (
    <div className="space-y-4">
      {items.map((p: any, idx: number) => {
        const eventId = String(p?.eventId || "");
        const event = eventsMap[eventId] || {};
        const title = getEventName(event) || `Event ${eventId}`;
        const eventDate = new Date(p?.eventStartDate);
        const today = new Date();
        const diffTime = Math.abs(eventDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const startsIn = diffDays > 0 ? `${diffDays} day${diffDays > 1 ? "s" : ""}` : "Today";
        const qName = p?.question || p?.questionName || p?.question?.description || "Prediction";
        const qAns = p?.predictedOutcome;
          const eventDes = p?.eventDescription;
        const status = String(p?.predictionStatus || "");
        const isAccepted = status === "PREDICTION_STATUS_ACCEPTED" || status === "PREDICTION_STATUS_CANCEL_REQUESTED";
        const isMatched = status === "PREDICTION_STATUS_MATCHED";
        const statusText = isMatched ? "Matched" : isAccepted ? "Accepted" : status.replace("PREDICTION_STATUS_", "").toLowerCase();
        const outcome = String(p?.eventShortName ?? p?.predictionDetails?.selectedPredictionOutcome ?? p?.selectedPredictionOutcome ?? "").trim();
        const pctNum = Number(p?.percentage ?? p?.exitPercentage ?? 0);
        const pctText = isFinite(pctNum) ? `${Math.max(0, Math.min(100, Math.round(pctNum)))}%` : "--%";
        const matched = Number(p?.matchedAmt ?? 0);
        const invest = Number(p?.investmentAmt ?? 0);
        const matchedText = isFinite(matched) && isFinite(invest) && invest > 0 ? `${matched.toFixed(2)}/${invest.toFixed(2)} is matched` : "--";
        return (
          <div key={p?.predictionId || idx} className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
            <div className="flex items-center justify-between">
              <div className="text-slate-200 font-semibold">{outcome || "--"} {eventDes}</div>
              <div className="text-xs px-3 py-1 rounded-full border border-rose-400/50 text-rose-300">Match starts in {startsIn}</div>
            </div>
            <div className="my-3 border-t border-slate-700" />
            <div className="flex items-start justify-between">
              <div className="text-slate-100 font-medium">{qName}</div>
              <div className={`text-xs px-2 py-1 rounded-md border ${isAccepted ? "border-emerald-500 text-emerald-300" : isMatched ? "border-teal-500 text-teal-300" : "border-slate-600 text-slate-300"}`}>{statusText}</div>
            </div>
            
            <div className="mt-2 text-slate-300 text-sm flex items-center gap-2">
              <span>{qAns}</span>
              <span>•</span>
              <span>{pctText}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1"><span className="text-yellow-300">🪙</span> {matched}</span>
            </div>
            {isMatched && (
              <button
                onClick={() => onExit(p, event)}
                className="mt-2 text-xs px-3 py-1 rounded-md bg-yellow-500 text-slate-900 hover:bg-yellow-600"
              >
                Exit
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Aggregated list for the Open tab (Accepted/Queued predictions)
const OpenPredictionsList: React.FC<{ onOpen: (p: any, event: any) => void }> = ({ onOpen }) => {
  const [items, setItems] = React.useState<any[]>([]);
  const [eventsMap, setEventsMap] = React.useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getEventName = (event: any) => (
    (typeof event?.name === "string" && event.name.trim()) ||
    (typeof event?.eventName === "string" && event.eventName.trim()) ||
    (typeof event?.sportEvent?.name === "string" && event.sportEvent.name.trim()) ||
    (typeof event?.sportEvent?.eventName === "string" && event.sportEvent.eventName.trim()) ||
    [event?.sportEvent?.sportType?.replace?.("SPORT_TYPE_", ""), event?.sportEvent?.eventFormat].filter(Boolean).join(" • ")
  );

  React.useEffect(() => {
    let mounted = true;
    const fetchOpen = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          if (mounted) {
            setItems([]);
            setEventsMap({});
            setIsLoading(false);
          }
          return;
        }
        const res = await api.post<any>("/prediction/v1/get", {
          day: 0,
          month: 0,
          year: 0,
          pageRequest: { pageNumber: 1, pageSize: 200 },
          timeInForce: "PREDICTIONTIMEINFORCE_PENDING_LIVE",
        });
        const preds = Array.isArray(res?.predictions) ? res.predictions : [];
        if (mounted) setItems(preds);
        const idsSet = new Set<string>(
          preds
            .map((p: any) => String(p?.eventId || ""))
            .filter((s: string) => s.length > 0)
        );
        const ids: string[] = Array.from(idsSet);
        const map: Record<string, any> = {};
        await Promise.all(
          ids.map(async (id: string) => {
            try {
              const ev = await api.post<any>("/event/v1/getevent", { 
                eventId: id,
               getEventQuestions: true,
          questionsPageInfo: {
            pageNumber: 1,
            pageSize: 50,
          }, });
              if (ev?.status?.type === "SUCCESS") map[id] = ev?.event || null;
            } catch {}
          })
        );
        if (mounted) setEventsMap(map);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetchOpen();
    const interval = window.setInterval(fetchOpen, 120_000);
    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  if (isLoading) return <div className="text-slate-400">Loading open predictions...</div>;
  if (!items || items.length === 0) return <div className="text-slate-400">No open predictions</div>;

  return (
    <div className="space-y-4">
      {items.map((p: any, idx: number) => {
        const eventId = String(p?.eventId || "");
        const event = eventsMap[eventId] || {};
        const title = getEventName(event) || `Event ${eventId}`;
        const eventDes = p?.eventDescription;
        const eventDate = new Date(p?.eventStartDate);
        const today = new Date();
        const diffTime = Math.abs(eventDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const startsIn = diffDays > 0 ? `${diffDays} day${diffDays > 1 ? "s" : ""}` : "Today";
        const qName = p?.question || p?.questionName || p?.question?.description || "Prediction";
        const status = String(p?.predictionStatus || "");
        const isAccepted = status === "PREDICTION_STATUS_ACCEPTED" || status === "PREDICTION_STATUS_CANCEL_REQUESTED";
        const outcome = String(p?.eventShortName ?? p?.predictionDetails?.selectedPredictionOutcome ?? p?.selectedPredictionOutcome ?? "").trim();
        const pctNum = Number(p?.percentage ?? p?.exitPercentage ?? 0);
        const pctText = isFinite(pctNum) ? `${Math.max(0, Math.min(100, Math.round(pctNum)))}%` : "--%";
        const matched = Number(p?.matchedAmt ?? 0);
        const invest = Number(p?.investmentAmt ?? 0);
        const matchedText = isFinite(matched) && isFinite(invest) && invest > 0 ? `${matched.toFixed(2)}/${invest.toFixed(2)} is matched` : "--";
        return (
          <div key={p?.predictionId || idx} className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
            <div className="flex items-center justify-between">
              <div className="text-slate-200 font-semibold">{outcome || "--"} {eventDes}</div>
              <div className="text-xs px-3 py-1 rounded-full border border-rose-400/50 text-rose-300">Match starts in {startsIn}</div>
            </div>
            <div className="my-3 border-t border-slate-700" />
            <div className="flex items-start justify-between">
              <div className="text-slate-100 font-medium">{qName}</div>
              {isAccepted && <div className="text-xs px-2 py-1 rounded-md border border-emerald-500 text-emerald-300">Accepted</div>}
            </div>
            <div className="mt-2 text-slate-300 text-sm flex items-center gap-2">
              <span>{outcome || "--"}</span>
              <span>•</span>
              <span>{pctText}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1"><span className="text-yellow-300">🪙</span> {matchedText}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CompletedPredictionsList: React.FC<{ onOpen: (p: any, event: any) => void }> = ({ onOpen }) => {
  const [items, setItems] = React.useState<any[]>([]);
  const [eventsMap, setEventsMap] = React.useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [period, setPeriod] = React.useState<string>("PREDICTIONTIMEINFORCE_COMPLETED_ALLTIME");

  const getEventName = (event: any) => (
    (typeof event?.name === "string" && event.name.trim()) ||
    (typeof event?.eventName === "string" && event.eventName.trim()) ||
    (typeof event?.sportEvent?.name === "string" && event.sportEvent.name.trim()) ||
    (typeof event?.sportEvent?.eventName === "string" && event.sportEvent.eventName.trim()) ||
    [event?.sportEvent?.sportType?.replace?.("SPORT_TYPE_", ""), event?.sportEvent?.eventFormat].filter(Boolean).join(" • ")
  );

  React.useEffect(() => {
    let mounted = true;
    const fetchCompleted = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          if (mounted) {
            setItems([]);
            setEventsMap({});
            setIsLoading(false);
          }
          return;
        }
        const res = await api.post<any>("/prediction/v1/get", {
          day: 0,
          month: 0,
          year: 0,
          pageRequest: { pageNumber: 1, pageSize: 200 },
          timeInForce: period,
        });
        const preds = Array.isArray(res?.predictions) ? res.predictions : [];
        if (mounted) setItems(preds);
        const idsSet = new Set<string>(
          preds
            .map((p: any) => String(p?.eventId || ""))
            .filter((s: string) => s.length > 0)
        );
        const ids: string[] = Array.from(idsSet);
        const map: Record<string, any> = {};
        await Promise.all(
          ids.map(async (id: string) => {
            try {
              const ev = await api.post<any>("/event/v1/getevent", { eventId: id,  getEventQuestions: true,
          questionsPageInfo: {
            pageNumber: 1,
            pageSize: 50,
          }, });
              if (ev?.status?.type === "SUCCESS") map[id] = ev?.event || null;
            } catch {}
          })
        );
        if (mounted) setEventsMap(map);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetchCompleted();
    const interval = window.setInterval(fetchCompleted, 120_000);
    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, [period]);

  if (isLoading) return <div className="text-slate-400">Loading completed predictions...</div>;
  if (!items || items.length === 0) return <div className="text-slate-400">No completed predictions</div>;

  return (
    <div className="space-y-4">
      <div className="mb-2 inline-flex rounded-lg border border-slate-700 bg-slate-800 p-1">
        {[
          "PREDICTIONTIMEINFORCE_COMPLETED_ALLTIME",
          "PREDICTIONTIMEINFORCE_COMPLETED_TODAY",
          "PREDICTIONTIMEINFORCE_COMPLETED_YESTERDAY",
          "PREDICTIONTIMEINFORCE_COMPLETED_LASTWEEK",
          "PREDICTIONTIMEINFORCE_COMPLETED_LASTMONTH",
          "PREDICTIONTIMEINFORCE_COMPLETED_THISMONTH",
        ].map((code) => (
          <button
            key={code}
            onClick={() => setPeriod(code)}
            className={`px-3 py-1 text-xs font-medium rounded-md ${
              period === code ? "bg-emerald-600 text-white" : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            {code.replace("PREDICTIONTIMEINFORCE_COMPLETED_", "Completed ")}
          </button>
        ))}
      </div>
      {items.map((p: any, idx: number) => {
        const eventId = String(p?.eventId || "");
        const event = eventsMap[eventId] || {};
        const title = getEventName(event) || `Event ${eventId}`;
        const eventDate = new Date(p?.eventStartDate);
        const today = new Date();
        const diffTime = Math.abs(eventDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const startsIn = diffDays > 0 ? `${diffDays} day${diffDays > 1 ? "s" : ""}` : "Today";
        const qName = p?.question || p?.questionName || p?.question?.description || "Prediction";
        const status = String(p?.predictionStatus || "");
        const isSettled = status === "PREDICTION_STATUS_SETTLED";
        const outcome = String(p?.predictedOutcome ?? p?.predictionDetails?.selectedPredictionOutcome ?? p?.selectedPredictionOutcome ?? "").trim();
        const pctNum = Number(p?.percentage ?? p?.exitPercentage ?? 0);
        const pctText = isFinite(pctNum) ? `${Math.max(0, Math.min(100, Math.round(pctNum)))}%` : "--%";
        const matched = Number(p?.matchedAmt ?? 0);
        const invest = Number(p?.investmentAmt ?? 0);
        const matchedText = isFinite(matched) && isFinite(invest) && invest > 0 ? `${matched.toFixed(2)}/${invest.toFixed(2)} is matched` : "--";
        return (
          <div key={p?.predictionId || idx} className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
            <div className="flex items-center justify-between">
              <div className="text-slate-200 font-semibold">{title}</div>
              <div className="text-xs px-3 py-1 rounded-full border border-rose-400/50 text-rose-300">Match starts in {startsIn}</div>
            </div>
            <div className="my-3 border-t border-slate-700" />
            <div className="flex items-start justify-between">
              <div className="text-slate-100 font-medium">{qName}</div>
              {isSettled && <div className="text-xs px-2 py-1 rounded-md border border-blue-500 text-blue-300">Settled</div>}
            </div>
            <div className="mt-2 text-slate-300 text-sm flex items-center gap-2">
              <span>{outcome || "--"}</span>
              <span>•</span>
              <span>{pctText}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1"><span className="text-yellow-300">🪙</span> {matchedText}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CancelledPredictionsList: React.FC<{ onOpen: (p: any, event: any) => void }> = ({ onOpen }) => {
  const [items, setItems] = React.useState<any[]>([]);
  const [eventsMap, setEventsMap] = React.useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getEventName = (event: any) => (
    (typeof event?.name === "string" && event.name.trim()) ||
    (typeof event?.eventName === "string" && event.eventName.trim()) ||
    (typeof event?.sportEvent?.name === "string" && event.sportEvent.name.trim()) ||
    (typeof event?.sportEvent?.eventName === "string" && event.sportEvent.eventName.trim()) ||
    [event?.sportEvent?.sportType?.replace?.("SPORT_TYPE_", ""), event?.sportEvent?.eventFormat].filter(Boolean).join(" • ")
  );

  React.useEffect(() => {
    let mounted = true;
    const fetchCancelled = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          if (mounted) {
            setItems([]);
            setEventsMap({});
            setIsLoading(false);
          }
          return;
        }
        const res = await api.post<any>("/prediction/v1/get", {
          day: 0,
          month: 0,
          year: 0,
          pageRequest: { pageNumber: 1, pageSize: 200 },
          timeInForce: "PREDICTIONTIMEINFORCE_CANCELLED",
        });
        const preds = Array.isArray(res?.predictions) ? res.predictions : [];
        if (mounted) setItems(preds);
        const idsSet = new Set<string>(
          preds
            .map((p: any) => String(p?.eventId || ""))
            .filter((s: string) => s.length > 0)
        );
        const ids: string[] = Array.from(idsSet);
        const map: Record<string, any> = {};
        await Promise.all(
          ids.map(async (id: string) => {
            try {
              const ev = await api.post<any>("/event/v1/getevent", { eventId: id,  getEventQuestions: true,
          questionsPageInfo: {
            pageNumber: 1,
            pageSize: 50,
          }, });
              if (ev?.status?.type === "SUCCESS") map[id] = ev?.event || null;
            } catch {}
          })
        );
        if (mounted) setEventsMap(map);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetchCancelled();
    const interval = window.setInterval(fetchCancelled, 120_000);
    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  if (isLoading) return <div className="text-slate-400">Loading cancelled predictions...</div>;
  if (!items || items.length === 0) return <div className="text-slate-400">No cancelled predictions</div>;

  return (
    <div className="space-y-4">
      {items.map((p: any, idx: number) => {
        const eventId = String(p?.eventId || "");
        const event = eventsMap[eventId] || {};
        const title = getEventName(event) || `Event ${eventId}`;
        const eventDate = new Date(p?.eventStartDate);
        const today = new Date();
        const diffTime = Math.abs(eventDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const startsIn = diffDays > 0 ? `${diffDays} day${diffDays > 1 ? "s" : ""}` : "Today";
        const qName = p?.question || p?.questionName || p?.question?.description || "Prediction";
        const status = String(p?.predictionStatus || "");
        const isCancelled = status === "PREDICTION_STATUS_CANCELLED";
        const outcome = String(p?.predictedOutcome ?? p?.predictionDetails?.selectedPredictionOutcome ?? p?.selectedPredictionOutcome ?? "").trim();
        const pctNum = Number(p?.percentage ?? p?.exitPercentage ?? 0);
        const pctText = isFinite(pctNum) ? `${Math.max(0, Math.min(100, Math.round(pctNum)))}%` : "--%";
        const matched = Number(p?.matchedAmt ?? 0);
        const invest = Number(p?.investmentAmt ?? 0);
        const matchedText = isFinite(matched) && isFinite(invest) && invest > 0 ? `${matched.toFixed(2)}/${invest.toFixed(2)} is matched` : "--";
        return (
          <div key={p?.predictionId || idx} className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
            <div className="flex items-center justify-between">
              <div className="text-slate-200 font-semibold">{title}</div>
              <div className="text-xs px-3 py-1 rounded-full border border-rose-400/50 text-rose-300">Match starts in {startsIn}</div>
            </div>
            <div className="my-3 border-t border-slate-700" />
            <div className="flex items-start justify-between">
              <div className="text-slate-100 font-medium">{qName}</div>
              {isCancelled && <div className="text-xs px-2 py-1 rounded-md border border-rose-500 text-rose-300">Cancelled</div>}
            </div>
            <div className="mt-2 text-slate-300 text-sm flex items-center gap-2">
              <span>{outcome || "--"}</span>
              <span>•</span>
              <span>{pctText}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1"><span className="text-yellow-300">🪙</span> {matchedText}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ExitedPredictionsList: React.FC<{ onOpen: (p: any, event: any) => void }> = ({ onOpen }) => {
  const [items, setItems] = React.useState<any[]>([]);
  const [eventsMap, setEventsMap] = React.useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getEventName = (event: any) => (
    (typeof event?.name === "string" && event.name.trim()) ||
    (typeof event?.eventName === "string" && event.eventName.trim()) ||
    (typeof event?.sportEvent?.name === "string" && event.sportEvent.name.trim()) ||
    (typeof event?.sportEvent?.eventName === "string" && event.sportEvent.eventName.trim()) ||
    [event?.sportEvent?.sportType?.replace?.("SPORT_TYPE_", ""), event?.sportEvent?.eventFormat].filter(Boolean).join(" • ")
  );

  React.useEffect(() => {
    let mounted = true;
    const fetchExited = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          if (mounted) {
            setItems([]);
            setEventsMap({});
            setIsLoading(false);
          }
          return;
        }
        const res = await api.post<any>("/prediction/v1/get", {
          day: 0,
          month: 0,
          year: 0,
          pageRequest: { pageNumber: 1, pageSize: 200 },
          timeInForce: "PREDICTIONTIMEINFORCE_EXITED",
        });
        const preds = Array.isArray(res?.predictions) ? res.predictions : [];
        if (mounted) setItems(preds);
        const idsSet = new Set<string>(
          preds
            .map((p: any) => String(p?.eventId || ""))
            .filter((s: string) => s.length > 0)
        );
        const ids: string[] = Array.from(idsSet);
        const map: Record<string, any> = {};
        await Promise.all(
          ids.map(async (id: string) => {
            try {
              const ev = await api.post<any>("/event/v1/getevent", { eventId: id,  getEventQuestions: true,
          questionsPageInfo: {
            pageNumber: 1,
            pageSize: 50,
          }, });
              if (ev?.status?.type === "SUCCESS") map[id] = ev?.event || null;
            } catch {}
          })
        );
        if (mounted) setEventsMap(map);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetchExited();
    const interval = window.setInterval(fetchExited, 120_000);
    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  if (isLoading) return <div className="text-slate-400">Loading exited predictions...</div>;
  if (!items || items.length === 0) return <div className="text-slate-400">No exited predictions</div>;

  return (
    <div className="space-y-4">
      {items.map((p: any, idx: number) => {
        const eventId = String(p?.eventId || "");
        const event = eventsMap[eventId] || {};
        const title = getEventName(event) || `Event ${eventId}`;
        const eventDate = new Date(p?.eventStartDate);
        const today = new Date();
        const diffTime = Math.abs(eventDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const startsIn = diffDays > 0 ? `${diffDays} day${diffDays > 1 ? "s" : ""}` : "Today";
        const qName = p?.question || p?.questionName || p?.question?.description || "Prediction";
        const status = String(p?.predictionStatus || "");
        const isExited = status === "PREDICTION_STATUS_EXITED";
        const outcome = String(p?.predictedOutcome ?? p?.predictionDetails?.selectedPredictionOutcome ?? p?.selectedPredictionOutcome ?? "").trim();
        const pctNum = Number(p?.percentage ?? p?.exitPercentage ?? 0);
        const pctText = isFinite(pctNum) ? `${Math.max(0, Math.min(100, Math.round(pctNum)))}%` : "--%";
        const matched = Number(p?.matchedAmt ?? 0);
        const invest = Number(p?.investmentAmt ?? 0);
        const matchedText = isFinite(matched) && isFinite(invest) && invest > 0 ? `${matched.toFixed(2)}/${invest.toFixed(2)} is matched` : "--";
        return (
          <div key={p?.predictionId || idx} className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
            <div className="flex items-center justify-between">
              <div className="text-slate-200 font-semibold">{title}</div>
              <div className="text-xs px-3 py-1 rounded-full border border-rose-400/50 text-rose-300">Match starts in {startsIn}</div>
            </div>
            <div className="my-3 border-t border-slate-700" />
            <div className="flex items-start justify-between">
              <div className="text-slate-100 font-medium">{qName}</div>
              {isExited && <div className="text-xs px-2 py-1 rounded-md border border-slate-500 text-slate-300">Exited</div>}
            </div>
            <div className="mt-2 text-slate-300 text-sm flex items-center gap-2">
              <span>{outcome || "--"}</span>
              <span>•</span>
              <span>{pctText}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1"><span className="text-yellow-300">🪙</span> {matchedText}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ✅ Main Page (unchanged below)
const SportsPage = () => {
  const [events, setEvents] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = React.useState<any | null>(null);
  const [selectedOutcome, setSelectedOutcome] = React.useState<any | null>(null);
  const [amount, setAmount] = React.useState<string>("");
  const [confidenceOverride, setConfidenceOverride] = React.useState<number | null>(null);
  const [selectedTeams, setSelectedTeams] = React.useState<{ a: { name: string; prob: number }; b: { name: string; prob: number } } | null>(null);
  const [selectedQuestionPrediction, setSelectedQuestionPrediction] = React.useState<any | null>(null);
  const [suppressQuestionPredictionFetch, setSuppressQuestionPredictionFetch] = React.useState<boolean>(false);
  const [mainTab, setMainTab] = React.useState<
    "All" | "Live" | "Open" | "Completed" | "Cancelled" | "Exited"
  >("All");
  const navigate = useNavigate();

  // Safely format percentages, handling strings like "43%" or fractional values like 0.43
  const formatPercent = (val: any) => {
    const raw = typeof val === "string" ? val.replace("%", "").trim() : val;
    let n = Number(raw);
    if (!isFinite(n) || isNaN(n)) return "--%";
    if (n <= 1) n = n * 100; // treat <=1 as fractional probability
    n = Math.max(0, Math.min(100, n));
    return `${Math.round(n)}%`;
  };

  // Balance & order helpers
  const [balance, setBalance] = React.useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string>("");

  const getAvailableBalance = (b: any) => {
    const candidates = [b?.availableBalance, b?.available, b?.balance?.available];
    for (const c of candidates) {
      const n = Number(c);
      if (!isNaN(n) && isFinite(n)) return n;
    }
    return 0;
  };
  const formatCurrency = (n: number) => `$${n.toFixed(2)}`;

  const fetchBalance = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setBalance(null);
      return;
    }
    try {
      const res = await api.post<any>("/balances/v1/get", {});
      if (res?.status?.type === "SUCCESS") {
        setBalance(res);
      } else {
        setBalance(null);
      }
    } catch (e) {
      console.error("Failed to fetch balance", e);
      setBalance(null);
    }
  };

  React.useEffect(() => {
    fetchEvents();
  }, []);

  React.useEffect(() => {
    const run = async () => {
      if (!selectedQuestion?.questionId) {
        setSelectedQuestionPrediction(null);
        return;
      }
      if (suppressQuestionPredictionFetch) {
        // skip automatic fetch because a specific prediction was requested
        return;
      }
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setSelectedQuestionPrediction(null);
        return;
      }
      try {
        const res = await api.post<any>("/prediction/v1/getbyquestion", {
          questionId: selectedQuestion.questionId,
          timeInForce: "PREDICTIONTIMEINFORCE_UPCOMING",
        });
        const mine = Array.isArray(res?.myPredictions) ? res.myPredictions[0] : null;
        setSelectedQuestionPrediction(mine);
      } catch {
        setSelectedQuestionPrediction(null);
      }
    };
    run();
  }, [selectedQuestion?.questionId, suppressQuestionPredictionFetch]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await api.post<{
        events: any[];
        status: { type: string };
      }>("/event/v1/listevents", {
        status: [
          "EVENT_STATUS_UPCOMING",
          "EVENT_STATUS_ACTIVE",
          "EVENT_STATUS_COMPLETED",
        ],
        category: "EVENT_CATEGORY_SPORTS",
        pageNumber: 1,
        pageSize: 50,
      });

      if (response?.status?.type === "SUCCESS") {
        setEvents(response.events || []);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <aside className="w-64 bg-slate-800/80 border-r border-slate-700 p-4 overflow-y-auto">
          <h3 className="text-sm font-semibold text-slate-200 mb-4">Filters</h3>
          <div className="space-y-2 mb-6">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-700 text-emerald-300 font-medium">
              <span className="text-green-400">●</span> Live
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700">Upcoming</button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700">Trending</button>
          </div>

          <h3 className="text-sm font-semibold text-slate-200 mb-3">Sports</h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-between px-3 py-2 rounded-lg bg-transparent hover:bg-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-slate-600 flex items-center justify-center text-sm">🏈</div>
                <span>Football</span>
              </div>
              <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">24</span>
            </li>
            <li className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-orange-500"></div>
                <span>Basketball</span>
              </div>
              <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">18</span>
            </li>
            <li className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-yellow-400"></div>
                <span>Cricket</span>
              </div>
              <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">12</span>
            </li>
            <li className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-blue-500"></div>
                <span>Soccer</span>
              </div>
              <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">32</span>
            </li>
            <li className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-400"></div>
                <span>Tennis</span>
              </div>
              <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">15</span>
            </li>
          </ul>
        </aside>
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="rounded-2xl overflow-hidden mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">Live Prediction Markets</h2>
              <p className="text-slate-100/90 mt-1">Make your prediction. Own your call. Skill-based matching with transparent odds.</p>
              <div className="mt-6 grid grid-cols-2 gap-6 text-sm text-white/90">
                <div>
                  <div className="text-xs">Active Markets</div>
                  <div className="text-2xl font-bold">1,248</div>
                </div>
                <div>
                  <div className="text-xs">Live Traders</div>
                  <div className="text-2xl font-bold">23,451</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 p-4 border-t border-slate-700 rounded-b-2xl">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMainTab("All")}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    mainTab === "All"
                      ? "bg-slate-700 text-slate-200"
                      : "text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setMainTab("Live")}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    mainTab === "Live"
                      ? "bg-slate-700 text-slate-200"
                      : "text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  Live
                </button>
                <button
                  onClick={() => setMainTab("Open")}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    mainTab === "Open"
                      ? "bg-slate-700 text-slate-200"
                      : "text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  Open
                </button>
                <button
                  onClick={() => setMainTab("Completed")}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    mainTab === "Completed"
                      ? "bg-slate-700 text-slate-200"
                      : "text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setMainTab("Cancelled")}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    mainTab === "Cancelled"
                      ? "bg-slate-700 text-slate-200"
                      : "text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  Cancelled
                </button>
                <button
                  onClick={() => setMainTab("Exited")}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    mainTab === "Exited"
                      ? "bg-slate-700 text-slate-200"
                      : "text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  Exited
                </button>


              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-slate-400">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-slate-400">No events available</div>
          ) : (
            <div className="space-y-5">
              {mainTab === "All" &&
                events.map((event, i) => (
                  <div key={i} className="space-y-3">
                    <EventCard
                      event={event}
                      onViewQuestions={() => {
                      const id = String(event.id ?? event.eventId ?? "");
                      setSelectedEventId(id);
                      setSelectedQuestion(null);
                      setSelectedOutcome(null);
                      setConfidenceOverride(null);
                      setAmount("");
                      const teams = Array.isArray(event?.teams)
                        ? event.teams
                        : Array.isArray(event?.sportEvent?.teams)
                        ? event.sportEvent.teams
                        : [];
                      const getName = (t: any) => [t?.name, t?.shortName, t?.displayName, t?.teamName, t?.abbreviation].find((v: any) => typeof v === "string" && v.trim().length > 0) || "Team";
                      const aName = getName(teams?.[0] || {});
                      const bName = getName(teams?.[1] || {});
                      // Derive probabilities for team A and B from event.stats.result_prediction with robust parsing
                      const statsStr = typeof event?.stats === "string" ? event.stats : JSON.stringify(event?.stats ?? {});
                      let aProb = 50;
                      let bProb = 50;
                      try {
                        const statsObj = JSON.parse(statsStr || "{}");
                        const pred = statsObj?.result_prediction;
                        const parseProb = (v: any) => {
                          const raw = typeof v === "string" ? v.replace("%", "").trim() : v;
                          let n = Number(raw);
                          if (!isFinite(n) || isNaN(n)) return 50;
                          if (n <= 1) n = n * 100; // treat fractional
                          return Math.max(0, Math.min(100, n));
                        };
                        if (Array.isArray(pred) && pred.length >= 2) {
                          aProb = parseProb(pred[0]?.value);
                          bProb = parseProb(pred[1]?.value);
                        }
                      } catch {
                        // default 50/50
                      }
                      setSelectedTeams({ a: { name: aName, prob: aProb }, b: { name: bName, prob: bProb } });
                    }}
                    onQuickPredict={(question, eventId) => {
                      const id = String(event.id ?? event.eventId ?? eventId ?? "");
                      setSelectedEventId(id);
                      setSelectedQuestion(question);
                      setSelectedOutcome(null);
                      setConfidenceOverride(null);
                      setAmount("");
                      setErrorMsg("");
                      const teams = Array.isArray(event?.teams)
                        ? event.teams
                        : Array.isArray(event?.sportEvent?.teams)
                        ? event.sportEvent.teams
                        : [];
                      const getName = (t: any) => [t?.name, t?.shortName, t?.displayName, t?.teamName, t?.abbreviation].find((v: any) => typeof v === "string" && v.trim().length > 0) || "Team";
                      const aName = getName(teams?.[0] || {});
                      const bName = getName(teams?.[1] || {});
                      const statsStr = typeof event?.stats === "string" ? event.stats : JSON.stringify(event?.stats ?? {});
                      let aProb = 50;
                      let bProb = 50;
                      try {
                        const statsObj = JSON.parse(statsStr || "{}");
                        const pred = statsObj?.result_prediction;
                        const parseProb = (v: any) => {
                          const raw = typeof v === "string" ? v.replace("%", "").trim() : v;
                          let n = Number(raw);
                          if (!isFinite(n) || isNaN(n)) return 50;
                          if (n <= 1) n = n * 100;
                          return Math.max(0, Math.min(100, n));
                        };
                        if (Array.isArray(pred) && pred.length >= 2) {
                          aProb = parseProb(pred[0]?.value);
                          bProb = parseProb(pred[1]?.value);
                        }
                      } catch {}
                      setSelectedTeams({ a: { name: aName, prob: aProb }, b: { name: bName, prob: bProb } });
                      fetchBalance();
                    }}
                  />
                  {selectedEventId === String(event.id ?? event.eventId ?? "") && (
                    <EventDetails
                      eventId={String(event.id ?? event.eventId ?? "")}
                      selectedQuestionId={selectedQuestion ? (selectedQuestion.questionId ?? selectedQuestion.id ?? null) : null}
                      onBack={() => {
                        setSelectedEventId(null);
                        setSelectedQuestion(null);
                        setSelectedOutcome(null);
                        setConfidenceOverride(null);
                        setAmount("");
                        setSelectedTeams(null);
                        setBalance(null);
                        setErrorMsg("");
                        setSuppressQuestionPredictionFetch(false);
                      }}
                      onPredict={(question, eventId, predictionId) => {
                        setSelectedQuestion(question);
                        setSelectedOutcome(null);
                        setConfidenceOverride(null);
                        setAmount("");
                        setErrorMsg("");
                        fetchBalance();
                        if (predictionId) {
                          setSuppressQuestionPredictionFetch(true);
                          (async () => {
                            try {
                              const byId = await api.post<any>("/prediction/v1/getbyid", { predictionId });
                              const mine = byId?.prediction || null;
                              setSelectedQuestionPrediction(mine);
                            } catch (e) {
                              setSelectedQuestionPrediction(null);
                            }
                          })();
                        } else {
                          setSelectedQuestionPrediction(null);
                        }
                      }}
                      showTabs={false}
                      initialTab="Open"
                    />
                  )}
                  </div>
                ))}

              {mainTab !== "All" && (
                mainTab === "Live" ? (
                  <LivePredictionsList
                    onExit={(p: any, ev: any) => {
                      const id = String(p?.eventId || "");
                      setSelectedEventId(id);
                      const q = p?.question || { questionId: p?.questionId, name: p?.questionName };
                      setSelectedQuestion(q);
                      setSelectedOutcome(null);
                      setConfidenceOverride(null);
                      setAmount("");
                      setErrorMsg("");
                      setSuppressQuestionPredictionFetch(true);
                      setSelectedQuestionPrediction(p);
                      fetchBalance();
                      const teams = Array.isArray(ev?.teams)
                        ? ev.teams
                        : Array.isArray(ev?.sportEvent?.teams)
                        ? ev.sportEvent.teams
                        : [];
                      const getName = (t: any) => [t?.name, t?.shortName, t?.displayName, t?.teamName, t?.abbreviation].find((v: any) => typeof v === "string" && v.trim().length > 0) || "Team";
                      const aName = getName(teams?.[0] || {});
                      const bName = getName(teams?.[1] || {});
                      const statsStr = typeof ev?.stats === "string" ? ev.stats : JSON.stringify(ev?.stats ?? {});
                      let aProb = 50;
                      let bProb = 50;
                      try {
                        const statsObj = JSON.parse(statsStr || "{}");
                        const pred = statsObj?.result_prediction;
                        const parseProb = (v: any) => {
                          const raw = typeof v === "string" ? v.replace("%", "").trim() : v;
                          let n = Number(raw);
                          if (!isFinite(n) || isNaN(n)) return 50;
                          if (n <= 1) n = n * 100;
                          return Math.max(0, Math.min(100, n));
                        };
                        if (Array.isArray(pred) && pred.length >= 2) {
                          aProb = parseProb(pred[0]?.value);
                          bProb = parseProb(pred[1]?.value);
                        }
                      } catch {}
                      setSelectedTeams({ a: { name: aName, prob: aProb }, b: { name: bName, prob: bProb } });
                    }}
                  />
                ) : mainTab === "Open" ? (
                  <OpenPredictionsList
                    onOpen={(p: any, ev: any) => {
                      const id = String(p?.eventId || "");
                      setSelectedEventId(id);
                      const q = p?.question || { questionId: p?.questionId, name: p?.questionName };
                      setSelectedQuestion(q);
                      setSelectedOutcome(null);
                      setConfidenceOverride(null);
                      setAmount("");
                      setErrorMsg("");
                      setSuppressQuestionPredictionFetch(true);
                      setSelectedQuestionPrediction(p);
                      fetchBalance();
                      const teams = Array.isArray(ev?.teams)
                        ? ev.teams
                        : Array.isArray(ev?.sportEvent?.teams)
                        ? ev.sportEvent.teams
                        : [];
                      const getName = (t: any) => [t?.name, t?.shortName, t?.displayName, t?.teamName, t?.abbreviation].find((v: any) => typeof v === "string" && v.trim().length > 0) || "Team";
                      const aName = getName(teams?.[0] || {});
                      const bName = getName(teams?.[1] || {});
                      const statsStr = typeof ev?.stats === "string" ? ev.stats : JSON.stringify(ev?.stats ?? {});
                      let aProb = 50;
                      let bProb = 50;
                      try {
                        const statsObj = JSON.parse(statsStr || "{}");
                        const pred = statsObj?.result_prediction;
                        const parseProb = (v: any) => {
                          const raw = typeof v === "string" ? v.replace("%", "").trim() : v;
                          let n = Number(raw);
                          if (!isFinite(n) || isNaN(n)) return 50;
                          if (n <= 1) n = n * 100;
                          return Math.max(0, Math.min(100, n));
                        };
                        if (Array.isArray(pred) && pred.length >= 2) {
                          aProb = parseProb(pred[0]?.value);
                          bProb = parseProb(pred[1]?.value);
                        }
                      } catch {}
                      setSelectedTeams({ a: { name: aName, prob: aProb }, b: { name: bName, prob: bProb } });
                    }}
                  />
                ) : mainTab === "Completed" ? (
                  <CompletedPredictionsList
                    onOpen={(p: any, ev: any) => {
                      const id = String(p?.eventId || "");
                      setSelectedEventId(id);
                      const q = p?.question || { questionId: p?.questionId, name: p?.questionName };
                      setSelectedQuestion(q);
                      setSelectedOutcome(null);
                      setConfidenceOverride(null);
                      setAmount("");
                      setErrorMsg("");
                      setSuppressQuestionPredictionFetch(true);
                      setSelectedQuestionPrediction(p);
                      fetchBalance();
                    }}
                  />
                ) : mainTab === "Cancelled" ? (
                  <CancelledPredictionsList
                    onOpen={(p: any, ev: any) => {
                      const id = String(p?.eventId || "");
                      setSelectedEventId(id);
                      const q = p?.question || { questionId: p?.questionId, name: p?.questionName };
                      setSelectedQuestion(q);
                      setSelectedOutcome(null);
                      setConfidenceOverride(null);
                      setAmount("");
                      setErrorMsg("");
                      setSuppressQuestionPredictionFetch(true);
                      setSelectedQuestionPrediction(p);
                      fetchBalance();
                    }}
                  />
                ) : mainTab === "Exited" ? (
                  <ExitedPredictionsList
                    onOpen={(p: any, ev: any) => {
                      const id = String(p?.eventId || "");
                      setSelectedEventId(id);
                      const q = p?.question || { questionId: p?.questionId, name: p?.questionName };
                      setSelectedQuestion(q);
                      setSelectedOutcome(null);
                      setConfidenceOverride(null);
                      setAmount("");
                      setErrorMsg("");
                      setSuppressQuestionPredictionFetch(true);
                      setSelectedQuestionPrediction(p);
                      fetchBalance();
                    }}
                  />
                ) : (
                  <div className="space-y-3">
                    {events.map((event, i) => (
                      <EventDetails
                        key={i}
                        eventId={String(event.id ?? event.eventId ?? "")}
                        selectedQuestionId={selectedQuestion ? (selectedQuestion.questionId ?? selectedQuestion.id ?? null) : null}
                        onBack={() => {}}
                        onPredict={(question, eventId, predictionId) => {
                          setSelectedQuestion(question);
                          setSelectedOutcome(null);
                          setConfidenceOverride(null);
                          setAmount("");
                          setErrorMsg("");
                          fetchBalance();
                          if (predictionId) {
                            setSuppressQuestionPredictionFetch(true);
                            (async () => {
                              try {
                                const byId = await api.post<any>("/prediction/v1/getbyid", { predictionId });
                                const mine = byId?.prediction || null;
                                setSelectedQuestionPrediction(mine);
                              } catch (e) {
                                setSelectedQuestionPrediction(null);
                              }
                            })();
                          } else {
                            setSelectedQuestionPrediction(null);
                          }
                        }}
                        showTabs={false}
                        initialTab={mainTab === "Cancelled" ? "Cancelled" : mainTab === "Completed" ? "Completed" : mainTab === "Exited" ? "Exit" : mainTab}
                      />
                    ))}
                  </div>
                )
              )}
            </div>
          )}
        </main>
        {/* Right Sidebar */}
        <aside className="w-96 bg-slate-800/80 border-l border-slate-700 p-6 overflow-y-auto">
          <div className="rounded-lg bg-slate-900/60 p-4 border border-slate-700">
            <h3 className="text-sm text-slate-300">Make Your Prediction</h3>
            <p className="text-xs text-slate-400 mt-1">Own your call. Trade with confidence.</p>

            <div className="mt-4 bg-slate-800 p-3 rounded-md border border-slate-700">
              {selectedQuestion ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-slate-700 flex items-center justify-center">🏈</div>
                    <div>
                      <div className="text-sm text-slate-200">{selectedQuestion.name}</div>
                      {selectedQuestion.category && (
                        <div className="text-xs text-slate-400">{selectedQuestion.category}</div>
                      )}
                    </div>
                  </div>

                  {selectedTeams && (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg border border-emerald-500 bg-slate-900 text-emerald-300 text-center">
                        {selectedTeams.a.name}
                        <div className="text-xs text-slate-400">{formatPercent(selectedTeams.a.prob)}</div>
                      </div>
                      <div className="p-3 rounded-lg border border-emerald-500 bg-slate-900 text-emerald-300 text-center">
                        {selectedTeams.b.name}
                        <div className="text-xs text-slate-400">{formatPercent(selectedTeams.b.prob)}</div>
                      </div>
                    </div>
                  )}

               

                  {balance && (
                    <div className="mt-3 bg-blue-500/10 border border-blue-500 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-200 text-sm">Available Balance</span>
                        <span className="text-blue-300 font-semibold">{formatCurrency(getAvailableBalance(balance))}</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {selectedQuestion.activity?.marketDataDetails?.map((option: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => { setSelectedOutcome(option); setConfidenceOverride(null); }}
                        className={`p-3 rounded-lg border ${
                          selectedOutcome?.outcome === option.outcome
                            ? "border-emerald-500 bg-slate-900 text-emerald-300"
                            : "border-slate-700 bg-slate-800 text-slate-300"
                        }`}
                      >
                        {option.outcome}
                        <div className="text-xs text-slate-400">
                          {Number.parseFloat(String(option.impliedProbability || "0")).toFixed(1)}%
                        </div>
                      </button>
                    ))}
                  </div>

                     {selectedQuestion && (
                    (() => {
                      const qpText = String(selectedQuestion?.activity?.questionProbability || "");
                      const m = qpText.match(/(\d+(?:\.\d+)?)\s*%/);
                      const defaultPct = m ? Math.max(0, Math.min(100, Number(m[1]))) : 0;
                      const selectedPct = selectedOutcome
                        ? Math.max(0, Math.min(100, Number.parseFloat(String(selectedOutcome?.impliedProbability || "0"))))
                        : defaultPct;
                      const pct = confidenceOverride ?? selectedPct;
                      return (
                        <div className="mt-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">Confidence</span>
                            <span className="text-xs text-slate-200">{formatPercent(pct)}</span>
                          </div>
                          {/* <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                          </div> */}
                          <div className="mt-3 flex items-center gap-3">
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={pct}
                              onChange={(e) => setConfidenceOverride(Number(e.target.value))}
                              className="flex-1 accent-emerald-500"
                            />
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={pct}
                              onChange={(e) => setConfidenceOverride(Math.max(0, Math.min(100, Number(e.target.value))))}
                              className="w-20 rounded-md bg-slate-700 p-2 text-slate-100 border border-slate-600"
                            />
                            {/* <button
                              onClick={() => setConfidenceOverride(null)}
                              className="px-3 py-2 rounded bg-slate-700 text-slate-200"
                            >
                              Reset
                            </button> */}
                          </div>
                        </div>
                      );
                    })()
                  )}

                  {errorMsg && (
                    <div className="mt-3 bg-red-500/10 border border-red-500 text-red-300 px-3 py-2 rounded flex items-start text-sm">
                      <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="mt-4">
                    <label className="block text-xs text-slate-400">Amount</label>
                    <input
                      className="mt-2 w-full rounded-md bg-slate-700 p-3 text-slate-100 border border-slate-600"
                      type="number"
                      step="0.01"
                      min="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      disabled={Boolean(selectedQuestionPrediction && selectedQuestionPrediction.predictionStatus && selectedQuestionPrediction.predictionStatus !== "PREDICTION_STATUS_CANCELLED" && selectedQuestionPrediction.predictionStatus !== "PREDICTION_STATUS_EXITED")}
                      placeholder="$100"
                    />
                    {balance && amount && Number(amount) > 0 && (
                      <div className="mt-2 text-xs text-slate-400">
                        Remaining balance: {formatCurrency(Math.max(0, getAvailableBalance(balance) - Number(amount)))}
                      </div>
                    )}
                    <div className="mt-3 flex gap-2">
                      {(["10", "50", "100", "500"] as const).map((v) => (
                        <button
                          key={v}
                          onClick={() => setAmount(v)}
                          className="flex-1 py-2 rounded bg-slate-700 text-slate-200"
                        >
                          ${v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedOutcome && amount && Number(amount) > 0 && selectedQuestion.activity?.marketDataDetails && (
                    <div className="mt-4 bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                      <h4 className="text-sm text-slate-200 mb-2">Potential Returns</h4>
                      {(() => {
                        const selectedOption = selectedQuestion.activity.marketDataDetails.find(
                          (o: any) => o.outcome === selectedOutcome.outcome
                        );
                        if (!selectedOption) return null;
                        const qpText = String(selectedQuestion?.activity?.questionProbability || "");
                        const m = qpText.match(/(\d+(?:\.\d+)?)\s*%/);
                        const defaultPct = m ? Math.max(0, Math.min(100, Number(m[1]))) : 0;
                        const impliedPct = Math.max(0, Math.min(100, Number.parseFloat(String(selectedOption.impliedProbability || "0")) || 0));
                        const confPct = confidenceOverride ?? impliedPct ?? defaultPct;
                        const amt = Number(amount);
                        if (!confPct || !amt) return null;
                        const profit = (amt * confPct) / 100;
                        const totalReturn = amt + profit;
                        return (
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Investment</span>
                              <span className="text-slate-200 font-medium">{formatCurrency(amt)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Prediction</span>
                              <span className="text-slate-200 font-medium">{formatPercent(confPct)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Potential Profit</span>
                              <span className="font-semibold text-emerald-300">+{formatCurrency(profit)}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-slate-700">
                              <span className="text-slate-200">Total Return</span>
                              <span className="font-semibold text-slate-200">{formatCurrency(totalReturn)}</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {(() => {
                    const pred = selectedQuestionPrediction;
                    const s = String(pred?.predictionStatus || "");
                    const canPredict = !s || s === "PREDICTION_STATUS_CANCELLED" || s === "PREDICTION_STATUS_EXITED";
                    if (canPredict) {
                      return (
                        <button
                          onClick={async () => {
                            setErrorMsg("");
                            if (!selectedOutcome || !amount || Number(amount) <= 0) {
                              setErrorMsg("Select an outcome and enter a valid amount");
                              return;
                            }
                            const token = localStorage.getItem("auth_token");
                            if (!token) {
                              navigate("/login");
                              return;
                            }
                            const amt = Number(amount);
                            if (balance && amt > getAvailableBalance(balance)) {
                              setErrorMsg("Insufficient balance");
                              return;
                            }
                            setIsSubmitting(true);
                            try {
                              const qpText = String(selectedQuestion?.activity?.questionProbability || "");
                              const m = qpText.match(/(\d+(?:\.\d+)?)\s*%/);
                              const defaultPct = m ? Math.max(0, Math.min(100, Number(m[1]))) : 0;
                              const impliedPct = Math.max(0, Math.min(100, Number.parseFloat(String(selectedOutcome?.impliedProbability || "0")) || 0));
                              const confPct = confidenceOverride ?? impliedPct ?? defaultPct;
                              const res = await api.post<any>("/order/v1/createorder", {
                                eventId: selectedEventId,
                                questionId: selectedQuestion.questionId,
                                amount: amount,
                                predictionDetails: {
                                  selectedPredictionOutcome: selectedOutcome.outcome,
                                  selectedPredictionChoice: true,
                                },
                                modifiers: {
                                  creditDiscount: "0",
                                  creditMarkup: "0",
                                  percentage: String(confPct),
                                  updatedPercentage: "0",
                                },
                              });
                              if (res?.status?.type === "SUCCESS") {
                                setSelectedOutcome(null);
                                setAmount("");
                                fetchBalance();
                                try {
                                  if (res?.predictionId) {
                                    const byId = await api.post<any>("/prediction/v1/getbyid", { predictionId: res.predictionId });
                                    const mine = byId?.prediction || null;
                                    setSelectedQuestionPrediction(mine);
                                  } else {
                                    const ref = await api.post<any>("/prediction/v1/getbyquestion", { questionId: selectedQuestion.questionId, timeInForce: "PREDICTIONTIMEINFORCE_UPCOMING" });
                                    const mine = Array.isArray(ref?.myPredictions) ? ref.myPredictions[0] : null;
                                    setSelectedQuestionPrediction(mine);
                                  }
                                } catch {}
                              } else {
                                setErrorMsg("Failed to create prediction");
                              }
                            } catch (e) {
                              setErrorMsg("Failed to add prediction. Please try again.");
                            } finally {
                              setIsSubmitting(false);
                            }
                          }}
                          className="mt-6 w-full py-3 rounded-lg bg-emerald-500 text-slate-900 font-semibold disabled:opacity-50"
                          disabled={!selectedOutcome || !amount || Number(amount) <= 0 || isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Make Prediction"}
                        </button>
                      );
                    }
                    if (s === "PREDICTION_STATUS_ACCEPTED" || s === "PREDICTION_STATUS_CANCEL_REQUESTED") {
                      return (
                        <button
                          onClick={async () => {
                            if (!pred?.orderId) {
                              setErrorMsg("Missing order ID for cancellation");
                              return;
                            }
                            setIsSubmitting(true);
                            try {
                              const res = await api.post<any>("/order/v1/cancelorder", { orderId: pred.orderId });
                              if (res?.status?.type === "SUCCESS") {
                                try {
                                  const ref = await api.post<any>("/prediction/v1/getbyquestion", { questionId: selectedQuestion.questionId, timeInForce: "PREDICTIONTIMEINFORCE_UPCOMING" });
                                  const mine = Array.isArray(ref?.myPredictions) ? ref.myPredictions[0] : null;
                                  setSelectedQuestionPrediction(mine);
                                } catch {}
                              } else {
                                setErrorMsg("Failed to cancel prediction");
                              }
                            } catch (e) {
                              setErrorMsg("Failed to cancel prediction");
                            } finally {
                              setIsSubmitting(false);
                            }
                          }}
                          className="mt-6 w-full py-3 rounded-lg bg-rose-600 text-white font-semibold disabled:opacity-50"
                          disabled={isSubmitting}
                        >
                          Cancel Prediction
                        </button>
                      );
                    }
                    if (s === "PREDICTION_STATUS_MATCHED") {
                      return (
                        <button
                          onClick={async () => {
                            setIsSubmitting(true);
                            try {
                              const res = await api.post<any>("/order/v1/exitorder", {
                                eventId: selectedEventId,
                                questionId: selectedQuestion.questionId,
                                orderId: pred?.orderId,
                                amount: pred?.matchedAmt || pred?.investmentAmt || amount || "0",
                                modifiers: {
                                  creditDiscount: "0",
                                  creditMarkup: "0",
                                  percentage: String(pred?.exitPercentage || pred?.percentage || 0),
                                  updatedPercentage: "0",
                                },
                              });
                              if (res?.status?.type === "SUCCESS") {
                                try {
                                  const ref = await api.post<any>("/prediction/v1/getbyquestion", { questionId: selectedQuestion.questionId, timeInForce: "PREDICTIONTIMEINFORCE_UPCOMING" });
                                  const mine = Array.isArray(ref?.myPredictions) ? ref.myPredictions[0] : null;
                                  setSelectedQuestionPrediction(mine);
                                } catch {}
                              } else {
                                setErrorMsg("Failed to request exit");
                              }
                            } catch (e) {
                              setErrorMsg("Failed to request exit");
                            } finally {
                              setIsSubmitting(false);
                            }
                          }}
                          className="mt-6 w-full py-3 rounded-lg bg-yellow-500 text-slate-900 font-semibold disabled:opacity-50"
                          disabled={isSubmitting}
                        >
                          Request to Exit Prediction
                        </button>
                      );
                    }
                    return null;
                  })()}
                  <button
                    onClick={() => navigate("/login")}
                    className="mt-3 w-full py-3 rounded-lg bg-slate-700 text-slate-200 font-semibold"
                  >
                    Sign Up to Trade
                  </button>
                </>
              ) : (
                <div className="text-slate-400 text-sm">
                  Select a question from the left to start your prediction.
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SportsPage;
