import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, TrendingUp } from "lucide-react";
import { api } from "@/api/client";
import { useEffect, useState } from "react";

type ApiPrediction = {
  predictionId: string;
  eventName: string;
  eventShortName?: string;
  eventDescription?: string;
  eventStatus?: string;
  eventStartDate?: string;
  lastActivity?: string;
  question?: string;
  predictedOutcome?: string;
  predictedOutcomeChoice?: string;
  percentage?: string;
  investmentAmt?: string;
  potentialReturns?: string;
  predictionOutcome?: string;
  earnings?: string;
  predictionStatus?: string;
  orderId?: string;
  matchedAmt?: string;
  questionId?: string;
  eventId?: string;
  reservedAmt?: string;
  type?: number;
  exitPercentage?: string;
  eventResult?: string;
};

type PageInfo = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
};

type PredictionsResponse = {
  status: { type: string; details: Array<unknown> };
  predictionCount: number;
  predictions: ApiPrediction[];
  pageInfo?: PageInfo;
};

const Badge = ({ text }: { text: string }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">{text}</span>
);

const TeamPill = ({ tag, color, imageUrl }: { tag?: string; color?: string; imageUrl?: string }) => {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`h-9 w-9 rounded-full ${color || "bg-gray-700"} grid place-items-center overflow-hidden`}>
      {imageUrl && !failed ? (
        <img src={imageUrl} alt={tag || "team"} className="h-full w-full object-cover" onError={() => setFailed(true)} />
      ) : (
        <span className="text-white font-semibold">{tag}</span>
      )}
    </div>
  );
};

const splitTeams = (name?: string) => {
  if (!name) return { left: "", right: "" };
  const parts = name.split(/\s+vs\s+/i);
  if (parts.length === 2) return { left: parts[0], right: parts[1] };
  return { left: name, right: "" };
};

const formatRelative = (isoDate?: string | null) => {
  if (!isoDate) return "Unknown";
  try {
    const d = new Date(isoDate);
    const now = new Date();
    const diff = d.getTime() - now.getTime();
    const abs = Math.abs(diff);
    const sec = Math.floor(abs / 1000);
    const min = Math.floor(sec / 60);
    const hrs = Math.floor(min / 60);
    const days = Math.floor(hrs / 24);

    if (diff > 0) {
      if (days > 0) return `${days}d ${hrs % 24}h`;
      if (hrs > 0) return `${hrs}h ${min % 60}m`;
      if (min > 0) return `${min}m`;
      return `in ${sec}s`;
    } else {
      // past
      if (days > 0) return `${days}d ago`;
      if (hrs > 0) return `${hrs}h ago`;
      if (min > 0) return `${min}m ago`;
      return `${sec}s ago`;
    }
  } catch {
    return "Unknown";
  }
};

const PredictionCard = ({ p }: { p: ApiPrediction }) => {
  const pct = Number(p.percentage || 0);
  const startsText = formatRelative(p.eventStartDate);
  const teams = splitTeams(p.eventName);
  const leftTag = teams.left ? teams.left.trim().slice(0, 2).toUpperCase() : "";
  const rightTag = teams.right ? teams.right.trim().slice(0, 2).toUpperCase() : "";

  return (
    <Card className="rounded-2xl p-6 border border-white/10 bg-gray-800/80">
      <div className="grid grid-cols-12 gap-6 items-center">
        <div className="col-span-4 flex items-center gap-4">
          <TeamPill tag={leftTag} color="bg-blue-500" />
          <div className="flex-1">
            <div className="text-white font-semibold">{teams.left}</div>
            {p.eventDescription && <div className="text-gray-400 text-xs">{p.eventDescription}</div>}
          </div>
          <div className="mx-2 text-gray-300 font-semibold">Vs</div>
          <div className="text-right flex items-center gap-4">
            <div className="flex-1 text-right">
              <div className="text-white font-semibold">{teams.right}</div>
            </div>
            <TeamPill tag={rightTag} color="bg-yellow-500" />
          </div>
        </div>

        <div className="col-span-2 flex justify-center">
          {p.eventShortName && <Badge text={p.eventShortName} />}
        </div>

        <div className="col-span-3 flex items-center justify-center gap-4">
          <div className="grid items-center gap-2 rounded-xl border border-white/10 bg-gray-900/60 px-3 py-2 text-sm text-white">
            {/* <Users className="h-4 w-4 text-white/80" /> */}
            <span>Predicted</span>
            <span className="font-semibold">{p.predictedOutcome || "-"}</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-gray-900/60 px-3 py-2 text-sm text-white">
            <Clock className="h-4 w-4 text-white/80" />
            <span>Starts In</span>
            <span className="font-semibold">{startsText}</span>
          </div>
        </div>

        <div className="col-span-3 flex items-center justify-end gap-3">
          <Button className="bg-green-500 hover:bg-green-600">Predict</Button>
          {p.exitPercentage && (
            <div className="flex items-center gap-1 text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">{p.exitPercentage}%</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 items-center gap-4">
        <div className="col-span-4 text-sm text-gray-300">
          <div className="flex items-center gap-4">
            {/* <div className="px-3 py-2 rounded bg-gray-900/60 text-white">
              <div className="text-xs">Predicted</div>
              <div className="font-semibold">{p.predictedOutcome}</div>
            </div> */}
            <div className="px-3 py-2 rounded bg-gray-900/60 text-white">
              <div className="text-xs">Investment</div>
              <div className="font-semibold">{p.investmentAmt || "-"}</div>
            </div>
            <div className="px-3 py-2 rounded bg-gray-900/60 text-white">
              <div className="text-xs">Returns</div>
              <div className="font-semibold">{p.potentialReturns || "-"}</div>
            </div>
          </div>
        </div>
        <div className="col-span-8 flex items-center gap-3">
          <div className="flex-1">
            <Progress value={Math.max(0, Math.min(100, pct))} className="h-2 bg-gray-700" />
          </div>
          <div className="text-sm text-gray-300">{pct}% Full</div>
        </div>
      </div>
    </Card>
  );
};

const LivePredictions2 = () => {
  const [predictions, setPredictions] = useState<ApiPrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);

  useEffect(() => {
    let mounted = true;
    let interval: number | undefined;

    async function fetchPredictions() {
      setLoading(true);
      setError(null);
      try {
        const body = {
          day: 0,
          month: 0,
          pageRequest: { pageNumber: 1, pageSize: 20 },
          timeInForce: "PREDICTIONTIMEINFORCE_LIVE",
          year: 0,
        };

        const res = await api.post<PredictionsResponse>("/prediction/v1/get", body);
        if (!mounted) return;
        setPredictions(res.predictions || []);
        if (res.pageInfo) setPageInfo(res.pageInfo);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchPredictions();
    // poll every 30s for live updates
    interval = window.setInterval(fetchPredictions, 30_000);

    return () => {
      mounted = false;
      if (interval) clearInterval(interval);
    };
  }, []);

  // expose a retry function used by UI
  const retry = async () => {
    setError(null);
    setLoading(true);
    try {
      const body = {
        day: 0,
        month: 0,
        pageRequest: { pageNumber: 1, pageSize: 20 },
        timeInForce: "PREDICTIONTIMEINFORCE_LIVE",
        year: 0,
      };
      const res = await api.post<PredictionsResponse>("/prediction/v1/get", body);
      setPredictions(res.predictions || []);
      if (res.pageInfo) setPageInfo(res.pageInfo);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="live" className="py-16 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white">Live <span className="text-green-500">Match</span> Predictions</h2>
          <p className="mt-2 text-sm text-gray-300">Make your predictions and compete with the community</p>
        </div>

        {loading && <div className="text-center text-gray-300">Loading predictions...</div>}
        {error && (
          <div className="text-center">
            <div className="text-red-400">Error: {error}</div>
            <div className="mt-3">
              <Button onClick={() => retry()}>Retry</Button>
            </div>
          </div>
        )}

        {!loading && !error && predictions.length === 0 && (
          <div className="text-center text-gray-400">No live predictions right now.</div>
        )}

        <div className="space-y-6">
          {predictions.map((p) => (
            <PredictionCard key={p.predictionId} p={p} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" className="border-green-500 text-green-500">View All Matches</Button>
        </div>
      </div>
    </section>
  );
};

export default LivePredictions2;
