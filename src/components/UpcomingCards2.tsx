import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarDays, MapPin, Dot } from "lucide-react";

type EventItem = {
  sport: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  countdown: string;
  live?: boolean;
  status?: string;
};

const events: EventItem[] = [
  { sport: "Cricket", title: "India vs Australia", date: "Nov 10, 2025", time: "14:30", venue: "Melbourne Cricket Ground", countdown: "2d 7h 22m" },
  { sport: "Football", title: "Real Madrid vs Barcelona", date: "Nov 9, 2025", time: "20:00", venue: "Santiago Bernabéu", countdown: "—", live: true, status: "In Progress" },
  { sport: "Basketball", title: "Lakers vs Warriors", date: "Nov 11, 2025", time: "19:30", venue: "Staples Center", countdown: "3d 12h 22m" },
  { sport: "Tennis", title: "Djokovic vs Nadal", date: "Nov 12, 2025", time: "15:00", venue: "Roland Garros", countdown: "4d 7h 52m" },
];

const Badge = ({ text }: { text: string }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">{text}</span>
);

const UpcomingCards2 = () => {
  return (
    <section id="upcoming" className="relative py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white">Upcoming <span className="text-green-500">Events</span></h2>
            <p className="mt-2 text-sm text-gray-300">Don’t miss out on these exciting matches</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-xl bg-yellow-400 text-black px-4 py-2 text-sm font-semibold">All</button>
            <button className="rounded-xl border border-white/10 bg-gray-800 text-white px-4 py-2 text-sm">Live</button>
            <button className="rounded-xl border border-white/10 bg-gray-800 text-white px-4 py-2 text-sm">Upcoming</button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {events.map((e) => (
            <Card key={e.title} className="rounded-2xl border border-white/10 bg-gray-800/80 p-6">
              <div className="flex items-center justify-between">
                <Badge text={e.sport} />
                {e.live ? (
                  <div className="flex items-center gap-1 text-red-500 text-xs">
                    <Dot className="h-4 w-4" />
                    <span>LIVE</span>
                  </div>
                ) : null}
              </div>
              <div className="mt-4 text-white font-semibold text-lg">{e.title}</div>
              <div className="mt-4 space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /><span>{e.date} • {e.time}</span></div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>{e.venue}</span></div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="text-green-500 text-sm font-semibold">{e.status ? e.status : e.countdown}</div>
                <Button className="bg-green-500 hover:bg-green-600">Predict</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingCards2;