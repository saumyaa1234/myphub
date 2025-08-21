import { Link, useLocation } from "wouter";
import { 
  Home, 
  CalendarDays, 
  Brain, 
  ClipboardList, 
  BookOpen, 
  Timer, 
  Settings,
  X,
  Activity
} from "lucide-react";

interface SidebarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Sidebar({ mobileMenuOpen, setMobileMenuOpen }: SidebarProps) {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <Home className="h-5 w-5 mr-3" /> },
    { path: '/timetable', label: 'Study Timetable', icon: <CalendarDays className="h-5 w-5 mr-3" /> },
    { path: '/subject-tips', label: 'Subject Tips', icon: <Brain className="h-5 w-5 mr-3" /> },
    { path: '/pomodoro', label: 'Pomodoro Timer', icon: <Timer className="h-5 w-5 mr-3" /> },
    { path: '/healthy-habits', label: 'Healthy Habits', icon: <Activity className="h-5 w-5 mr-3" /> },
    { path: '/resources', label: 'Resources', icon: <BookOpen className="h-5 w-5 mr-3" /> },
  ];

  const sidebarBaseClass = "fixed inset-y-0 left-0 w-64 bg-background border-r border-border transform transition-transform duration-300 ease-in-out z-30 h-full flex flex-col";
  const sidebarClass = mobileMenuOpen 
    ? `${sidebarBaseClass} translate-x-0 md:relative md:translate-x-0`
    : `${sidebarBaseClass} -translate-x-full md:translate-x-0 md:relative`;

  return (
    <aside className={sidebarClass}>
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h1 className="font-heading font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">MYP Companion</h1>
        <button 
          className="md:hidden text-muted-foreground"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-grow overflow-y-auto hide-scrollbar">
        <ul className="p-2">
          {menuItems.map((item) => (
            <li key={item.path} className="mb-1">
              <Link 
                href={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path) 
                    ? "text-primary font-medium bg-primary/10"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <Link 
          href="/settings"
          className="flex items-center px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
        >
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </Link>
      </div>
    </aside>
  );
}