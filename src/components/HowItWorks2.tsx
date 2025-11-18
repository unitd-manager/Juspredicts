import { Target, TrendingUp, Users, Award } from "lucide-react";

const HowItWorks2 = () => {
  const steps = [
    {
      icon: Target,
      number: 1,
      title: "Predict",
      description: "Choose your favorite sport and make predictions on match outcomes."
    },
    {
      icon: TrendingUp,
      number: 2,
      title: "Trading",
      description: "Trade your predictions with other users in real-time markets."
    },
    {
      icon: Users,
      number: 3,
      title: "Clan",
      description: "Join or create clans to compete together and share strategies."
    },
    {
      icon: Award,
      number: 4,
      title: "Rewards",
      description: "Earn points and rewards based on your prediction accuracy."
    }
  ];

  return (
    <section id="how" className="relative py-20 bg-black">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-green-500/10 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-4xl font-bold text-white sm:text-5xl">
            How It <span className="text-green-500">Works</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">Start your prediction journey in four simple steps</p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute left-0 right-0 top-[64px] mx-auto h-0.5 bg-white/10"></div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="absolute -left-3 -top-3 grid h-8 w-8 place-items-center rounded-full bg-green-500 text-white text-sm font-bold">{step.number}</div>
                  <div className="rounded-2xl border border-white/10 bg-gray-800/80 p-8 shadow-md transition-all hover:shadow-xl h-full">
                    <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-xl bg-green-500/15">
                      <Icon className="h-7 w-7 text-green-500" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-white">{step.title}</h3>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks2;


