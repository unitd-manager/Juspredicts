import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-secondary/30 py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <TrendingUp className="h-4 w-4" />
            <span>Trade on Real-World Events</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Predict the Future,
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Trade with Confidence</span>
          </h1>

          <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
            Join the next generation prediction market platform. Trade on sports. 
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

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
              <BarChart3 className="mx-auto mb-3 h-8 w-8 text-primary" />
              <div className="text-2xl font-bold text-foreground">2.5M+</div>
              <div className="text-sm text-muted-foreground">Daily Volume</div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
              <TrendingUp className="mx-auto mb-3 h-8 w-8 text-success" />
              <div className="text-2xl font-bold text-foreground">50K+</div>
              <div className="text-sm text-muted-foreground">Active Traders</div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
              <Shield className="mx-auto mb-3 h-8 w-8 text-accent" />
              <div className="text-2xl font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground">Transparent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
