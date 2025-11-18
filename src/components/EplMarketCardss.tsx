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

const EplMarketCard = ({ match, index }: { match: Match; index: number }) => {
  return (
    <Card
      className={`
        relative w-full p-8 rounded-2xl transition-all duration-300
        ${index % 2 === 0
          ? "bg-gradient-to-br from-gray-800 to-gray-700 text-white shadow-[inset_1px_1px_3px_rgba(255,255,255,0.1),_4px_4px_12px_rgba(0,0,0,0.5)]"
          : "bg-gradient-to-br from-gray-100 to-gray-50 text-gray-900 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.6),_4px_4px_10px_rgba(0,0,0,0.1)]"}
        hover:scale-[1.01] hover:shadow-xl
      `}
    >
      <div className="text-sm font-semibold opacity-80 mb-4 tracking-wide" style={{ marginLeft: '555px' }}>
        Prediction Odds
      </div>

      <div className="grid grid-cols-12 items-center gap-6">
        {/* Teams */}
        <div className="col-span-3 flex justify-between items-center">
          {/* Home */}
          <div className="flex items-center gap-3">
            <img
              src={match.teams.home.logo}
              // alt={match.teams.home.name}
              className="w-10 h-10 rounded-full shadow-md"
            />
            <div>
              <div className="font-semibold">{match.teams.home.name}</div>
              <div className="text-xs opacity-70">{match.teams.home.record}</div>
            </div>
          </div>

          <span className="font-bold text-lg opacity-70">VS</span>

          {/* Away */}
          <div className="flex items-center gap-3 text-right">
            <div>
              <div className="font-semibold">{match.teams.away.name}</div>
              <div className="text-xs opacity-70">{match.teams.away.record}</div>
            </div>
            <img
              src={match.teams.away.logo}
              // alt={match.teams.away.name}
              className="w-10 h-10 rounded-full shadow-md"
            />
          </div>
        </div>

        {/* Odds */}
        <div className="col-span-4 flex justify-center gap-3">
          <Button
            className={`rounded-full px-5 font-semibold shadow-sm ${
              index % 2 === 0
                ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            {match.teams.home.name.slice(0, 7).toUpperCase()} {match.odds.home.moneyline}
          </Button>

          <Button
            className={`rounded-full px-5 font-semibold shadow-sm ${
              index % 2 === 0
                ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            DRAW {match.odds.draw}
          </Button>

          <Button
            className={`rounded-full px-5 font-semibold shadow-sm ${
              index % 2 === 0
                ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            {match.teams.away.name.slice(0, 7).toUpperCase()} {match.odds.away.moneyline}
          </Button>
        </div>

        {/* Question + Yes/No */}
           <div className="col-span-3">
          <div className="text-sm font-medium mb-2">Who will win the match - {match.teams.home.name}/{match.teams.away.name}</div>
         
        </div>
        <div className="col-span-2 flex flex-col items-center">
        
          <div className="flex gap-3">
            <Button className="bg-green-500 hover:bg-green-600 text-white w-24 rounded-full shadow-md hover:shadow-lg transition-all">
              Yes
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white w-24 rounded-full shadow-md hover:shadow-lg transition-all">
              No
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EplMarketCard;
