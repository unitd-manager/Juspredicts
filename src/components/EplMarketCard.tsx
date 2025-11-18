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

const EplMarketCard = ({ match }: EplMarketCardProps) => {
  return (
     <Card className="group overflow-hidden rounded-lg border border-gray-200 p-4 shadow-2xl transition-all hover:shadow-2xl" style={{ background: 'linear-gradient(180deg, #fdfbfb 0%, #ebedee 100%)' }}>
      {/* Header */}
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex items-center gap-2 text-base font-semibold text-gray-900">
          ⚽ {match.teams.home.name} vs. {match.teams.away.name}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{match.time}</span> • <span>${match.volume} Vol.</span> • <span className="cursor-pointer hover:text-blue-500">📺 Game View</span>
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between p-3 rounded-xl  mb-4">
        <div className="flex items-center gap-2">
          <img src={match.teams.home.logo} className="w-6 h-6" />
          <span className="text-sm font-medium text-gray-800">{match.teams.home.name} ({match.teams.home.record})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-800">{match.teams.away.name} ({match.teams.away.record})</span>
          <img src={match.teams.away.logo} className="w-6 h-6" />
        </div>
      </div>
<hr />
      {/* Moneyline */}
      <div className="p-3 rounded-xl  mb-3">
        <div className="text-sm mb-2 font-medium text-gray-600">Prediction</div>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" className="rounded-lg text-xs bg-white border-white-200 ">TOT {match.odds.home.moneyline}</Button>
          <Button variant="outline" className="rounded-lg text-xs bg-white border-white-200 ">DRAW {match.odds.draw}</Button>
          <Button variant="outline" className="rounded-lg text-xs bg-white border-white-200 ">MUN {match.odds.away.moneyline}</Button>
        </div>
      </div>
<hr />
      {/* Over/Under */}
      <div className="p-3 rounded-xl ">
        <div className="text-lg mb-2 font-bold text-gray-600">Will there be more than 2.5 goals in the match?</div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="rounded-lg text-base bg-green-500 text-white border-gray-200 hover:bg-green-600">Yes</Button>
          <Button variant="outline" className="rounded-lg text-base bg-red-500 text-white border-gray-200 hover:bg-red-600">No</Button>
        </div>
      </div>
    </Card>
  );
};

export default EplMarketCard;

