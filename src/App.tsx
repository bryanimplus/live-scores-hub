
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FixtureDetails from "./pages/FixtureDetails";
import Predictions from "./pages/Predictions";
import ValueBets from "./pages/ValueBets";
import BetSimulation from "./pages/BetSimulation";
import Education from "./pages/Education";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fixture/:id" element={<FixtureDetails />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/value-bets" element={<ValueBets />} />
          <Route path="/bet-simulation" element={<BetSimulation />} />
          <Route path="/education" element={<Education />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
