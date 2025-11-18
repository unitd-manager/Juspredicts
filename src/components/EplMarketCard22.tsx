import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Team {
  name: string;
  record: string;
  logo: string;
}

interface Odds {
  moneyline: number;
  spread: string;
  total: string;
}

interface Match {
  time: string;
  volume: string;
  teams: {
    home: Team;
    away: Team;
  };
  odds: {
    home: Odds;
    away: Odds;
    draw: number;
  };
}

interface EplMarketCardProps {
  match: Match;
}

const EplMarketCard22 = ({ match }: EplMarketCardProps) => {
  return (
<Card className="group overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 p-4 text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.4)] hover:shadow-[0_14px_25px_-3px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="text-center text-lg font-normal">
          {match.teams.home.name} vs. {match.teams.away.name}
        </div>
        <div className="flex justify-center items-center gap-4 text-xs text-gray-400">
          <span>🕒 {match.time}</span>
          <span>🔊 ${match.volume} Vol.</span>
          <span className="cursor-pointer hover:text-blue-500">Game View</span>
        </div>
      </div>

      {/* Teams */}
      <div className="flex justify-between items-center mb-4 text-sm">
        <div>{match.teams.home.name} ({match.teams.home.record})</div>
        <div>{match.teams.away.name} ({match.teams.away.record})</div>
      </div>

      {/* Prediction */}
      <div className="mb-4">
        <div className="text-center text-sm mb-2 font-normal">Prediction Odds</div>
        <div className="grid grid-cols-3 gap-2 ">
          <Button className="bg-slate-700 text-white rounded-full hover:bg-slate-600 border border-slate-500 py-2 text-xs">
            TEAM A {match.odds.home.moneyline}
          </Button>
          <Button className="bg-slate-700 text-white rounded-full hover:bg-slate-600 border border-slate-500 py-2 text-xs">
            DRAW {match.odds.draw}
          </Button>
          <Button className="bg-slate-700 text-white rounded-full hover:bg-slate-600 border border-slate-500 py-2 text-xs">
            TEAM B {match.odds.away.moneyline}
          </Button>
        </div>
      </div>

      {/* Will there be goals? */}
      <div>
        <div className="text-center mb-2 font-normal">Will there be goals?</div>
        <div className="grid grid-cols-2 gap-2">
          <Button className="rounded-lg bg-green-600 hover:bg-green-700 text-white">YES</Button>
          <Button className="rounded-lg bg-red-600 hover:bg-red-700 text-white">NO</Button>
        </div>
      </div>
    </Card>
  );
};

export default EplMarketCard22;


