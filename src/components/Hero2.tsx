import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Shield } from "lucide-react";

const Hero2 = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 py-20 sm:py-32">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Embossed panel */}
        <div className="relative mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gray-900/60 p-10 shadow-2xl shadow-black/40 ring-1 ring-white/10 backdrop-blur-xl sm:p-14">
          {/* top highlight */}
          <div className="pointer-events-none absolute inset-x-0 -top-px mx-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span>Trade on Real-World Events</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Predict the Future,
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Trade with Confidence</span>
          </h1>

          <p className="mb-10 text-lg text-gray-300 sm:text-xl">
            Join the next generation prediction market platform. Trade on sports.
            Real-time data, transparent odds, and instant settlements.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 sm:w-auto text-base font-semibold px-8 py-6">
              Start Trading Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base font-semibold px-8 py-6 border-white/20 text-white hover:bg-white hover:text-primary"
            >
              Explore Markets
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-gray-900/70 p-6 shadow-lg shadow-black/40 ring-1 ring-white/10 transition-all hover:border-primary/40 hover:ring-primary/40">
              <BarChart3 className="mx-auto mb-3 h-8 w-8 text-primary" />
              <div className="text-2xl font-bold text-white">2.5M+</div>
              <div className="text-sm text-gray-400">Daily Volume</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gray-900/70 p-6 shadow-lg shadow-black/40 ring-1 ring-white/10 transition-all hover:border-primary/40 hover:ring-primary/40">
              <TrendingUp className="mx-auto mb-3 h-8 w-8 text-green-500" />
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-sm text-gray-400">Active Traders</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gray-900/70 p-6 shadow-lg shadow-black/40 ring-1 ring-white/10 transition-all hover:border-primary/40 hover:ring-primary/40">
              <Shield className="mx-auto mb-3 h-8 w-8 text-accent" />
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-sm text-gray-400">Transparent</div>
            </div>
          </div>

          {/* bottom highlight */}
          <div className="pointer-events-none absolute inset-x-0 -bottom-px mx-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero2;


