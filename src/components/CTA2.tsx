import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA2 = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
            Ready to Start Trading?
          </h2>
          <p className="mb-10 text-lg text-gray-300">
            Join thousands of traders making predictions on real-world events. Sign up now and get 10 in trading credits.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto text-base font-semibold px-8 py-6">
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base font-semibold px-8 py-6 border-gray-600 text-white hover:bg-green-600 hover:text-primary">
              View Documentation
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            No credit card required • Free to start • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA2;


