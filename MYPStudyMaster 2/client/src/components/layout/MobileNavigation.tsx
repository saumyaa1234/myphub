import { Link, useLocation } from "wouter";
import { Home, CalendarDays, Brain, Timer, BookOpen, Activity } from "lucide-react";

export default function MobileNavigation() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex md:hidden z-10">
      <Link 
        href="/"
        className={`flex flex-1 flex-col items-center justify-center py-3 ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}
      >
        <Home className="h-6 w-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>

      <Link 
        href="/timetable"
        className={`flex flex-1 flex-col items-center justify-center py-3 ${isActive('/timetable') ? 'text-primary' : 'text-muted-foreground'}`}
      >
        <CalendarDays className="h-6 w-6" />
        <span className="text-xs mt-1">Timetable</span>
      </Link>

      <Link 
        href="/pomodoro"
        className={`flex flex-1 flex-col items-center justify-center py-3 ${isActive('/pomodoro') ? 'text-primary' : 'text-muted-foreground'}`}
      >
        <Timer className="h-6 w-6" />
        <span className="text-xs mt-1">Pomodoro</span>
      </Link>

      <Link 
        href="/healthy-habits"
        className={`flex flex-1 flex-col items-center justify-center py-3 ${isActive('/healthy-habits') ? 'text-primary' : 'text-muted-foreground'}`}
      >
        <Activity className="h-6 w-6" />
        <span className="text-xs mt-1">Health</span>
      </Link>

      <Link 
        href="/subject-tips"
        className={`flex flex-1 flex-col items-center justify-center py-3 ${isActive('/subject-tips') ? 'text-primary' : 'text-muted-foreground'}`}
      >
        <Brain className="h-6 w-6" />
        <span className="text-xs mt-1">Tips</span>
      </Link>

      <Link 
        href="/resources"
        className={`flex flex-1 flex-col items-center justify-center py-3 ${isActive('/resources') ? 'text-primary' : 'text-muted-foreground'}`}
      >
        <BookOpen className="h-6 w-6" />
        <span className="text-xs mt-1">Resources</span>
      </Link>
    </div>
  );
}