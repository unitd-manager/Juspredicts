import { Button } from "@/components/ui/button";
import cricketIcon from "@/assets/cricket.png";
import footballIcon from "@/assets/image.png";
import basketballIcon from "@/assets/basket.jpeg";
import soccerIcon from "@/assets/soccer.jpeg";
import heroImage from "@/assets/phone.png";

const Hero2 = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-black py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-green-400/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
              <span className="block text-green-500">Your Game.</span>
              <span className="block text-green-500">Your Call.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-xl">
              Predict your favorite game outcomes with confidence and earn rewards.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button className="px-8 py-6 text-base font-semibold bg-green-500 hover:bg-green-600 text-black">Start Predicting</Button>
              <Button variant="outline" className="px-8 py-6 text-base font-semibold border-green-500 text-green-500 hover:bg-green-500/10">Learn More</Button>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-md">
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full border border-green-500/40 bg-gray-900/80 grid place-items-center">
                  <img src={cricketIcon} alt="Cricket" className="h-6 w-6 object-contain" />
                </div>
                <span className="text-sm text-gray-400">Cricket</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full border border-green-500/40 bg-gray-900/80 grid place-items-center">
                  <img src={footballIcon} alt="Football" className="h-6 w-6 object-contain" />
                </div>
                <span className="text-sm text-gray-400">Football</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full border border-green-500/40 bg-gray-900/80 grid place-items-center">
                  <img src={basketballIcon} alt="Basketball" className="h-6 w-6 object-contain" />
                </div>
                <span className="text-sm text-gray-400">Basketball</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full border border-green-500/40 bg-gray-900/80 grid place-items-center">
                  <img src={soccerIcon} alt="Soccer" className="h-6 w-6 object-contain" />
                </div>
                <span className="text-sm text-gray-400">Soccer</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 -top-6 h-24 w-24 rounded-full bg-green-500/30 blur-2xl" />
            <div className="absolute -right-6 bottom-10 h-24 w-24 rounded-full bg-green-400/20 blur-2xl" />

            <div className="relative mx-auto w-full max-w-[560px]">
              <img
                src={heroImage}
                alt="JusPredict app preview"
                className="relative mx-auto w-full max-w-[400px] object-contain drop-shadow-2xl"
              />
            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero2;


