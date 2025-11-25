import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, TrendingUp } from "lucide-react";

type MatchItem = {
  left: { name: string; odds: number; tag: string; color: string };
  right: { name: string; odds: number; tag: string; color: string };
  category: string;
  predictions: string;
  startsIn: string;
  percentFull: number;
  prizePool: string;
  trend: "+" | "-";
};

const items: MatchItem[] = [
  {
    left: { name: "India", odds: 1.85, tag: "IN", color: "bg-blue-500" },
    right: { name: "Australia", odds: 2.1, tag: "AU", color: "bg-yellow-500" },
    category: "Cricket",
    predictions: "12,435",
    startsIn: "2h 30m",
    percentFull: 62,
    prizePool: "$45,230",
    trend: "+",
  },
  {
    left: { name: "Barcelona", odds: 1.65, tag: "BL", color: "bg-red-500" },
    right: { name: "Real Madrid", odds: 2.35, tag: "AU", color: "bg-indigo-500" },
    category: "Football",
    predictions: "18,234",
    startsIn: "4h 15m",
    percentFull: 91,
    prizePool: "$82,150",
    trend: "+",
  },
  {
    left: { name: "Lakers", odds: 1.9, tag: "L", color: "bg-gray-500" },
    right: { name: "Warriors", odds: 1.95, tag: "W", color: "bg-green-500" },
    category: "Basketball",
    predictions: "9,876",
    startsIn: "1h 45m",
    percentFull: 49,
    prizePool: "$82,150",
    trend: "-",
  },
];

const Badge = ({ text }: { text: string }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">{text}</span>
);

const TeamPill = ({ tag, color }: { tag: string; color: string }) => (
  <div className={`h-9 w-9 rounded-full ${color} text-white grid place-items-center font-semibold`}>{tag}</div>
);

const MatchPredictionCard = ({ m, highlighted }: { m: MatchItem; highlighted?: boolean }) => (
  <Card className={`rounded-2xl p-6 ${highlighted ? "border border-green-500/60 bg-gray-800" : "border border-white/10 bg-gray-800/80"}`}>
    <div className="grid grid-cols-12 gap-6 items-center">
      <div className="col-span-4 flex items-center gap-4">
        <TeamPill tag={m.left.tag} color={m.left.color} />
        <div className="flex-1">
          <div className="text-white font-semibold">{m.left.name}</div>
          <div className="text-gray-400 text-xs">Odds: {m.left.odds}</div>
        </div>
        <div className="mx-2 text-gray-300 font-semibold">Vs</div>
        <div className="text-right flex items-center gap-4">
          <div className="flex-1 text-right">
            <div className="text-white font-semibold">{m.right.name}</div>
            <div className="text-gray-400 text-xs">Odds: {m.right.odds}</div>
          </div>
          <TeamPill tag={m.right.tag} color={m.right.color} />
        </div>
      </div>

      <div className="col-span-2 flex justify-center"><Badge text={m.category} /></div>

      <div className="col-span-3 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-gray-900/60 px-3 py-2 text-sm text-white">
          <Users className="h-4 w-4 text-white/80" />
          <span>Predictions</span>
          <span className="font-semibold">{m.predictions}</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-gray-900/60 px-3 py-2 text-sm text-white">
          <Clock className="h-4 w-4 text-white/80" />
          <span>Starts In</span>
          <span className="font-semibold">{m.startsIn}</span>
        </div>
      </div>

      <div className="col-span-3 flex items-center justify-end gap-3">
        <Button className="bg-green-500 hover:bg-green-600">Predict</Button>
        <div className={`flex items-center gap-1 ${m.trend === "+" ? "text-green-500" : "text-red-500"}`}>
          <TrendingUp className="h-4 w-4" />
          <span className="text-xs">{m.trend}15%</span>
        </div>
      </div>
    </div>

    <div className="mt-4 grid grid-cols-12 items-center gap-4">
      <div className="col-span-4 text-sm text-gray-300">Prize Pool : <span className="text-green-500 font-semibold">{m.prizePool}</span></div>
      <div className="col-span-8 flex items-center gap-3">
        <div className="flex-1">
          <Progress value={m.percentFull} className="h-2 bg-gray-700" />
        </div>
        <div className="text-sm text-gray-300">{m.percentFull}% Full</div>
      </div>
    </div>
  </Card>
);

const LivePredictions2 = () => (
  <section id="live" className="py-16 bg-black">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-white">Live <span className="text-green-500">Match</span> Predictions</h2>
        <p className="mt-2 text-sm text-gray-300">Make your predictions and compete with the community</p>
      </div>
      <div className="space-y-6">
        {items.map((m, idx) => (
          <MatchPredictionCard key={m.left.name} m={m} highlighted={idx === 0} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button variant="outline" className="border-green-500 text-green-500">View All Matches</Button>
      </div>
    </div>
  </section>
);

export default LivePredictions2;
