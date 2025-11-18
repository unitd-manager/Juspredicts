import { Search, DollarSign, TrendingUp, CheckCircle } from "lucide-react";

const HowItWorks2 = () => {
  const steps = [
    {
      icon: Search,
      title: "Find a Market",
      description: "Lorem Ipsum has been the industry's standard dummy text ever, when an unknown printer took a galley."
    },
    {
      icon: DollarSign,
      title: "Predict Shares",
      description: "Lorem Ipsum has been the industry's standard dummy text ever, when an unknown printer took a galley.",
    },
    {
      icon: TrendingUp,
      title: "Track & Trade",
      description: "Lorem Ipsum has been the industry's standard dummy text ever, when an unknown printer took a galley."
    },
    {
      icon: CheckCircle,
      title: "Get Paid",
      description: "Lorem Ipsum has been the industry's standard dummy text ever, when an unknown printer took a galley.",
    }
  ];

  return (
    <section id="how" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            How It Works
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Start trading on future outcomes in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="rounded-2xl bg-gray-800 p-8 shadow-md transition-all hover:shadow-xl h-full">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="mb-2 text-sm font-bold text-primary">Step {index + 1}</div>
                  <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-700 -translate-y-1/2"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks2;


