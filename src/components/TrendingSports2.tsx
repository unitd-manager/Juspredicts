import { Button } from "@/components/ui/button";
import cricketIcon from "@/assets/cricket.png";
import footballIcon from "@/assets/image.png";
import tennisIcon from "@/assets/tennis.jpeg";
import basketballIcon from "@/assets/basket.jpeg";
import soccerIcon from "@/assets/soccer.jpeg";
import { Gamepad2 } from "lucide-react";
import trendingGraphic from "@/assets/trending.png";

const TrendingSports2 = () => {
  const sports = [
    { name: "Cricket", count: 24, icon: cricketIcon },
    { name: "Football", count: 18, icon: footballIcon },
    { name: "Tennis", count: 12, icon: tennisIcon },
    { name: "Basketball", count: 15, icon: basketballIcon },
    { name: "Esports", count: 32, icon: null }
  ];

  return (
    <section id="sports" className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="pointer-events-none absolute inset-y-0 right-10 h-40 w-40 rounded-xl bg-green-500/20 blur-2xl" />
      <img src={trendingGraphic} alt="Trending graphic" className="pointer-events-none absolute right-6 top-10 w-24 h-24 object-contain drop-shadow-xl" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-4xl font-bold sm:text-5xl text-white">Trending <span className="text-green-500">Sports</span></h2>
          <p className="text-lg text-gray-300">Choose your sport and start predicting</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {sports.map((s) => (
            <div key={s.name} className="rounded-2xl border border-white/10 bg-gray-800/70 p-6 shadow-lg shadow-black/40 ring-1 ring-white/10">
              <div className="mx-auto mb-6 h-14 w-14 rounded-full border border-white/10 bg-gray-900/60 grid place-items-center">
                {s.icon ? (
                  <img src={s.icon as string} alt={s.name} className="h-7 w-7 object-contain" />
                ) : (
                  <Gamepad2 className="h-7 w-7 text-green-500" />
                )}
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-white">{s.name}</div>
                <div className="mt-1 text-sm text-gray-400"><span className="text-green-500 font-semibold">{s.count}</span> Active Matches</div>
                <Button className="mt-6 w-full bg-green-500 hover:bg-green-600">Predict Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSports2;