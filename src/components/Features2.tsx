import { Shield, Zap, Users, BarChart3, Lock, Sparkles } from "lucide-react";

const Features2 = () => {
  const features = [
    {
      icon: Shield,
      title: "Transparent & Fair",
      description: "All trades are recorded on-chain. No hidden fees, no manipulation, complete transparency."
    },
    {
      icon: Zap,
      title: "Instant Settlements",
      description: "Get paid immediately when markets resolve. No waiting, no delays."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of traders making predictions on real-world events."
    },
    {
      icon: BarChart3,
      title: "Real-Time Data",
      description: "Live price updates, volume tracking, and detailed market analytics."
    },
    {
      icon: Lock,
      title: "Secure Trading",
      description: "Bank-level security with multi-factor authentication and cold storage."
    },
    {
      icon: Sparkles,
      title: "Low Fees",
      description: "Trade with confidence knowing you keep more of your winnings."
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Why Choose JusPredict
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            The most advanced prediction market platform with features designed for serious traders
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group rounded-2xl border border-gray-800 bg-gray-800 p-8 shadow-sm transition-all hover:border-primary hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 transition-all group-hover:bg-primary group-hover:scale-110">
                  <Icon className="h-6 w-6 text-primary transition-all group-hover:text-green-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features2;


