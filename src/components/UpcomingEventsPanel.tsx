import EplMarketCard from "@/components/EplMarketCardss";

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



const UpcomingEventsPanel = ({ matches }: { matches: Match[] }) => {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Upcoming Events
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Live Prediction — Real-time odds & insights
          </p>

          <div className="mt-4 mx-auto h-1 w-24 bg-blue-500"></div>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {matches.map((match, i) => (
            <EplMarketCard key={i} match={match} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default UpcomingEventsPanel;
