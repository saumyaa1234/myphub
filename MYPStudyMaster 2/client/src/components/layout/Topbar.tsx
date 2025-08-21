import { useLocation } from "wouter";
import { Menu, Bell, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface TopbarProps {
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Topbar({ setMobileMenuOpen }: TopbarProps) {
  const [location] = useLocation();
  
  const getPageTitle = () => {
    switch (true) {
      case location === '/':
        return 'Dashboard';
      case location.startsWith('/timetable'):
        return 'Study Timetable';
      case location.startsWith('/subject-tips'):
        return 'Subject Tips';
      case location.startsWith('/pomodoro'):
        return 'Pomodoro Timer';
      case location.startsWith('/notes'):
        return 'Study Notes';
      default:
        return 'MYP Companion';
    }
  };
  
  return (
    <header className="bg-background border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          className="md:hidden mr-2 text-muted-foreground"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="font-heading font-bold text-xl text-primary md:hidden">MYP Companion</h1>
        <h2 className="font-heading font-medium text-foreground hidden md:block">{getPageTitle()}</h2>
      </div>
      
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <button className="p-2 rounded-full text-muted-foreground hover:bg-accent transition-colors">
          <Bell className="h-6 w-6" />
        </button>
        <button className="p-2 rounded-full text-muted-foreground hover:bg-accent transition-colors">
          <User className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
