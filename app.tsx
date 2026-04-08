import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { TranslationProvider } from "@/hooks/use-translation";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import HomePage from "@/pages/HomePage";
import Profile from "@/pages/Profile";
import CheckerPage from "@/pages/CheckerPage";
import ChatbotPage from "@/pages/ChatbotPage";
import AmbulancePage from "@/pages/AmbulancePage";
import HealthMonitorPage from "@/pages/HealthMonitorPage";
import RemindersPage from "@/pages/RemindersPage";
import SchedulePage from "@/pages/SchedulePage";
import DoctorPage from "@/pages/DoctorPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={HomePage} />
      <Route path="/profile" component={Profile} />
      <Route path="/checker" component={CheckerPage} />
      <Route path="/chatbot" component={ChatbotPage} />
      <Route path="/ambulance" component={AmbulancePage} />
      <Route path="/health-monitor" component={HealthMonitorPage} />
      <Route path="/reminders" component={RemindersPage} />
      <Route path="/schedule" component={SchedulePage} />
      <Route path="/doctor" component={DoctorPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="shc-theme">
        <TranslationProvider>
          <AuthProvider>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </TranslationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
