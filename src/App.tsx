import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SportsPage from "./pages/SportsPage.tsx";
import FaqPage from "./pages/faq.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import About from "./pages/About";
import ClanList from "./pages/ClanList";
import ClanDetail from "./pages/ClanDetail";
import GameDetailPage from "./pages/GameDetailPage.tsx";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sports" element={<SportsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/game/:id" element={<GameDetailPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/clan" element={<ClanList />} />
            <Route path="/clan/:groupId" element={<ClanDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
