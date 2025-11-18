import { Button } from "@/components/ui/button";
import { Sparkles, BarChart3, Trophy } from "lucide-react";

const CTA2 = () => {
  return (
    <section className="relative py-24 bg-gray-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-green-500/15 blur-3xl" />
        <div className="absolute right-6 top-12 h-24 w-24 rounded-xl bg-green-500/20 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-full bg-green-500/20">
            <Sparkles className="h-6 w-6 text-green-500" />
          </div>
          <h2 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl">
            Ready to start <span className="text-green-500">predicting</span>?
          </h2>
          <p className="mb-10 text-lg text-gray-300">
            Join JusPredict today and earn rewards with every prediction! Be part of a global community of sports enthusiasts.
          </p>

          <Button size="lg" className="px-8 py-6 bg-green-500 hover:bg-green-600">Get Started</Button>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-green-500">10K+</div>
              <div className="mt-1 text-sm text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-green-500">50K+</div>
              <div className="mt-1 text-sm text-gray-400">Predictions Made</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-green-500">$1M+</div>
              <div className="mt-1 text-sm text-gray-400">Rewards Distributed</div>
            </div>
          </div>

          <div className="mt-10 flex justify-between text-green-500/60">
            <div className="hidden sm:flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              <Trophy className="h-5 w-5" />
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA2;


