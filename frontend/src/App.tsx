import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import InboxPage from "./pages/Inbox";
import NotFound from "./pages/NotFound";
import SchedulerPage from "./pages/Scheduler";
import AuditTrailPage from "./pages/AuditTrail";
import MainMenu from "./components/MainMenu";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <nav className="w-full flex items-center px-4 py-2 bg-gmail-lightgray border-b border-gmail-gray/20">
          <Link to="/" className="text-xl font-bold text-gmail-gray hover:text-gmail-red transition-colors mr-6">
            Ornex Mail
          </Link>
          <MainMenu />
        </nav>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/scheduler" element={<SchedulerPage />} />
          <Route path="/audit" element={<AuditTrailPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
