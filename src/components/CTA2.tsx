import { Button } from "@/components/ui/button";
import { Sparkles, BarChart3, Trophy } from "lucide-react";
import readyImg from "@/assets/ready.png";

const CTA2 = () => {
  return (
    <section className="relative py-24 bg-black">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(600px_300px_at_50%_50%,rgba(16,185,129,0.22),transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/20 blur-[120px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
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
        <img src={readyImg} alt="Decorative" className="absolute left-6 bottom-6 w-44 sm:w-56 opacity-90 drop-shadow-2xl" />
      </div>
    </section>
  );
};

export default CTA2;


