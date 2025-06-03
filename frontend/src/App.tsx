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
import { Button } from "@/components/ui/button";
import WritingAssist from './pages/WritingAssist';
import DocumentProcessing from './pages/DocumentProcessing';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <nav className="w-full flex items-center justify-between px-4 py-2 bg-white/80 border-b border-gmail-gray/20 shadow-sm sticky top-0 z-50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-extrabold text-gmail-gray hover:text-fuchsia-600 transition-colors tracking-tight">
              Ornex Office
            </Link>
            <div className="flex gap-1 ml-6 flex-1">
              <Button asChild variant="ghost" size="sm">
                <Link to="/writer">Writer</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/tasks">Tasks</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/processing">Processing</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/inbox">Inbox</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/calendar">Calendar</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/drive">Drive</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/audit">Audit Trails</Link>
              </Button>
            </div>
            <div className="flex gap-1 justify-end">
              <Button asChild variant="ghost" size="sm">
                <Link to="/about">About Us</Link>
              </Button>
            </div>
          </div>
          {/* Logo entfernt */}
        </nav>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/scheduler" element={<SchedulerPage />} />
          <Route path="/audit" element={<AuditTrailPage />} />
          <Route path="/writing-assist" element={<WritingAssist />} />
          <Route path="/processing" element={<DocumentProcessing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
