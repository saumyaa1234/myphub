import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import StudyTimetable from "@/pages/StudyTimetable";
import SubjectTips from "@/pages/SubjectTips";
import PomodoroTimer from "@/pages/PomodoroTimer";
import Resources from "@/pages/Resources";
import Settings from "@/pages/Settings";
import HealthyHabits from "@/pages/HealthyHabits";


import Sidebar from "./components/layout/Sidebar";
import MobileNavigation from "./components/layout/MobileNavigation";
import Topbar from "./components/layout/Topbar";
import { ThemeProvider } from "@/hooks/use-theme";

function Router() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <div className="flex-1 flex flex-col h-full overflow-y-auto pb-16 md:pb-0">
        <Topbar setMobileMenuOpen={setMobileMenuOpen} />

        <main className="flex-1 p-4 md:p-6">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/timetable" component={StudyTimetable} />
            <Route path="/subject-tips" component={SubjectTips} />
            <Route path="/pomodoro" component={PomodoroTimer} />
            <Route path="/resources" component={Resources} />
            <Route path="/healthy-habits" component={HealthyHabits} />
            <Route path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </main>

        <MobileNavigation />
      </div>

      <Toaster />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="myp-theme-preference">
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;