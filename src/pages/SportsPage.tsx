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
const EventDetails: React.FC<{ eventId: string; onBack: () => void; onPredict: (question: any, eventId: string) => void }> = ({ eventId, onBack, onPredict }) => {
  const [event, setEvent] = React.useState<any | null>(null);
  const [questions, setQuestions] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

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

      {questions.length === 0 ? (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
          <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-400">No prediction questions available yet</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {questions.map((question: any) => (
            <div
              key={question.questionId}
              className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-base font-bold text-slate-100 mb-2">{question.name}</h3>
                  {question.description && (
                    <p className="text-slate-400 text-sm">{question.description}</p>
                  )}
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
                  {question.activity.marketDataDetails.map((option: any, idx: number) => (
                    <div
                      key={idx}
                      className="border border-slate-700 rounded-lg p-4 hover:border-emerald-500 transition"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-100">{option.outcome}</span>
                        <span className="text-lg font-bold text-emerald-400">
                          {Number.parseFloat(String(option.impliedProbability || "0")).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full transition-all"
                          style={{ width: `${Number.parseFloat(String(option.impliedProbability || "0"))}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => onPredict(question, eventId)}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
              >
                Predict
              </button>
            </div>
          ))}
        </div>
      )}
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
                <button className="px-4 py-2 rounded-full bg-slate-700 text-slate-200">Games</button>
                <button className="px-4 py-2 rounded-full text-slate-400 hover:bg-slate-700">Futures</button>
                <button className="px-4 py-2 rounded-full text-slate-400 hover:bg-slate-700">Awards</button>
                <button className="px-4 py-2 rounded-full text-slate-400 hover:bg-slate-700">Events</button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-slate-400">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-slate-400">No events available</div>
          ) : (
            <div className="space-y-5">
              {events.map((event, i) => (
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
                      onBack={() => {
                        setSelectedEventId(null);
                        setSelectedQuestion(null);
                        setSelectedOutcome(null);
                        setConfidenceOverride(null);
                        setAmount("");
                        setSelectedTeams(null);
                        setBalance(null);
                        setErrorMsg("");
                      }}
                      onPredict={(question, eventId) => {
                        setSelectedQuestion(question);
                        setSelectedOutcome(null);
                        setConfidenceOverride(null);
                        setAmount("");
                        setErrorMsg("");
                        fetchBalance();
                      }}
                    />
                  )}
                </div>
              ))}
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
                              updatedPercentage: "0"

                          },
                        });
                        if (res?.status?.type === "SUCCESS") {
                          // reset or show success; for now just clear amount/outcome
                          setSelectedOutcome(null);
                          setAmount("");
                          fetchBalance();
                        } else {
                          setErrorMsg("Failed to create prediction");
                        }
                      } catch (e) {
                        console.error("Failed to create prediction", e);
                        setErrorMsg("Failed to create prediction. Please try again.");
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                    className="mt-6 w-full py-3 rounded-lg bg-emerald-500 text-slate-900 font-semibold disabled:opacity-50"
                    disabled={!selectedOutcome || !amount || Number(amount) <= 0 || isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Make Prediction"}
                  </button>
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
