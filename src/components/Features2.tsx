import { Shield, Zap, Globe, Gift } from "lucide-react";

const Features2 = () => {
  const features = [
    {
      icon: Zap,
      title: "Real-Time Match Predictions",
      description:
        "Get instant updates and make predictions as the action unfolds. Stay ahead with live data and insights."
    },
    {
      icon: Globe,
      title: "Global Community",
      description:
        "Join thousands of sports enthusiasts worldwide. Compete, collaborate, and climb the global leaderboards."
    },
    {
      icon: Gift,
      title: "Transparent Rewards",
      description:
        "Earn real rewards for accurate predictions. Track your earnings with our transparent reward system."
    },
    {
      icon: Shield,
      title: "Secure & Fair Platform",
      description:
        "Built with security and fairness in mind. Your data and rewards are protected with industry-leading encryption."
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl">
            Why Choose <span className="text-green-500">JusPredict</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Experience the future of sports prediction with our cutting-edge platform
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group rounded-2xl border border-gray-800 bg-gray-800 p-8 shadow-sm transition-all hover:border-green-500/40 hover:shadow-lg">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20 transition-all group-hover:bg-green-500/30 group-hover:scale-105">
                  <Icon className="h-6 w-6 text-green-500" />
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


