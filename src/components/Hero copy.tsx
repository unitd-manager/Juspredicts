import { Button } from "@/components/ui/button";
import { Users, FileText, Target, ShieldCheck } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-secondary/30 py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Hero Header */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Target className="h-4 w-4" />
            <span>Trade on Real-World Events</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Predict the Future,
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Trade with Confidence</span>
          </h1>

          <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
            Join the next generation prediction market platform. Trade on elections, sports, crypto, and more.
            Real-time data, transparent odds, and instant settlements.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 sm:w-auto text-base font-semibold px-8 py-6">
              Start Trading Now
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base font-semibold px-8 py-6">
              Explore Markets
            </Button>
          </div>

          {/* ✅ Expert Predictions Section */}
          <div className="relative mt-20 overflow-hidden rounded-xl bg-gradient-to-r from-green-700 via-emerald-700 to-green-800 p-10 text-white shadow-2xl">
            {/* Wave Pattern Overlay */}
            <div className="absolute inset-0 opacity-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                className="absolute bottom-0 left-0 w-full h-full"
              >
                <path
                  fill="url(#grad)"
                  fillOpacity="0.3"
                  d="M0,160L60,149.3C120,139,240,117,360,128C480,139,600,181,720,181.3C840,181,960,139,1080,133.3C1200,128,1320,160,1380,176L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00c16a" />
                    <stop offset="100%" stopColor="#007f4f" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
                  EXPERT SPORTS BETTING PREDICTIONS
                </h2>
                <Button
                  className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold rounded-md px-6 py-3 shadow-md"
                >
                  LATEST PICKS
                </Button>
              </div>

              <p className="mt-4 text-center sm:text-left text-base font-medium opacity-90">
                Your go-to source for free predictions, odds, stats & team news — backed by a transparent track record.
              </p>

              <hr className="my-6 border-white/30" />

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center sm:text-left">
                <div className="flex flex-col items-center sm:items-start">
                  <Users className="h-8 w-8 mb-2 text-white" />
                  <div className="font-semibold text-lg">5M+ Readers</div>
                  <div className="text-sm opacity-80">Trust Us</div>
                </div>

                <div className="flex flex-col items-center sm:items-start">
                  <FileText className="h-8 w-8 mb-2 text-white" />
                  <div className="font-semibold text-lg">30,000+</div>
                  <div className="text-sm opacity-80">Previews Per Year</div>
                </div>

                <div className="flex flex-col items-center sm:items-start">
                  <Target className="h-8 w-8 mb-2 text-white" />
                  <div className="font-semibold text-lg">5+ Years</div>
                  <div className="text-sm opacity-80">of Accuracy Records</div>
                </div>

                <div className="flex flex-col items-center sm:items-start">
                  <ShieldCheck className="h-8 w-8 mb-2 text-white" />
                  <div className="font-semibold text-lg">Licensed Partners</div>
                  <div className="text-sm opacity-80">Only</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements behind the whole Hero */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
