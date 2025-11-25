import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Hero2 from "@/components/Hero2";
import Markets from "@/components/Markets";
import TrendingSports2 from "@/components/TrendingSports2";
import { useTheme } from "@/components/theme/ThemeProvider";
import HowItWorks from "@/components/HowItWorks";
import HowItWorks2 from "@/components/HowItWorks2";
import Features from "@/components/Features";
import Features2 from "@/components/Features2";
import CTA from "@/components/CTA";
import CTA2 from "@/components/CTA2";
import Footer from "@/components/Footer";
import Footer2 from "@/components/Footer2";
import UpcomingCards2 from "@/components/UpcomingCards2";

import LivePredictions2 from "@/components/LivePredictions2";

import { useHostname } from "@/lib/useHostname";

const Index = () => {
 
  const hostname = useHostname();
  const { theme } = useTheme();

  

  const showOnlyMinimal = hostname === "juspredictlive.unitdtechnologies.com";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      {showOnlyMinimal ? (
        <>
          <Hero2 />
          <TrendingSports2 />
          <Footer2 />
        </>
      ) : (
        <>
          <Hero2 />
          <TrendingSports2 />
          <LivePredictions2 />
          <UpcomingCards2 />
          <HowItWorks2 />
          <CTA2 />
          <Features2 />
          <Footer2 />
        </>
      )}
    </div>
  );
};

export default Index;
