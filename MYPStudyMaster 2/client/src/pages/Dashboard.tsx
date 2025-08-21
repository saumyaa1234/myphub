import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Home, 
  CalendarDays, 
  Brain, 
  Timer, 
  MessageSquareQuote,
  Clock,
  Lightbulb,
  Sparkles,
  BookOpen
} from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  return (
    <section id="dashboard" className="mb-8">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Welcome Card */}
        <Card className="col-span-1 lg:col-span-3">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-xl gradient-text">Welcome to MYP Companion</h2>
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <p className="text-muted-foreground mb-4">Your all-in-one platform for effective studying and MYP success.</p>
            <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
              <div className="flex items-start">
                <Lightbulb className="h-6 w-6 text-primary mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground">Productivity Tip of the Day</h4>
                  <p className="text-sm text-foreground/80 dark:text-foreground/90">Space out your study sessions over time. Research shows that spaced repetition is more effective than cramming.</p>
                  <div className="mt-2 pt-2 border-t border-primary/20">
                    <h5 className="text-sm font-medium text-foreground mb-1">Motivational Quote</h5>
                    <p className="text-sm italic text-foreground/80 dark:text-foreground/90">"The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks, and then starting on the first one."</p>
                    <p className="text-xs text-right mt-1 text-foreground/70">— Mark Twain</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        

        {/* Motivation Card */}
        <Card>
          <CardContent className="p-5">
            <h3 className="font-heading font-semibold mb-4">Daily Motivation</h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/10">
                <h4 className="text-sm font-medium mb-2 flex items-center text-primary">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Today's Affirmation
                </h4>
                <p className="text-sm font-medium">I am capable of achieving my goals through consistent effort.</p>
              </div>
              
              <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/10">
                <h4 className="text-sm font-medium mb-2 text-green-600">Success Habit</h4>
                <p className="text-sm">Break large tasks into smaller, more manageable steps to avoid feeling overwhelmed.</p>
              </div>
              
              <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/10">
                <h4 className="text-sm font-medium mb-2 text-amber-600">Mindfulness Tip</h4>
                <p className="text-sm">Take a 2-minute breathing break between study sessions to reset your mind and improve focus.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Access Card */}
        <Card>
          <CardContent className="p-5">
            <h3 className="font-heading font-semibold mb-4">Quick Access</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/timetable" className="bg-primary/10 hover:bg-primary/20 transition-colors p-3 rounded-lg flex flex-col items-center justify-center">
                <CalendarDays className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium text-primary">Timetable</span>
              </Link>
              <Link href="/pomodoro" className="bg-green-500/10 hover:bg-green-500/20 transition-colors p-3 rounded-lg flex flex-col items-center justify-center">
                <Timer className="h-8 w-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-green-600">Pomodoro</span>
              </Link>
              <Link href="/subject-tips" className="bg-amber-500/10 hover:bg-amber-500/20 transition-colors p-3 rounded-lg flex flex-col items-center justify-center">
                <Brain className="h-8 w-8 text-amber-600 mb-2" />
                <span className="text-sm font-medium text-amber-600">Subject Tips</span>
              </Link>
              <Link href="/resources" className="bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors p-3 rounded-lg flex flex-col items-center justify-center">
                <BookOpen className="h-8 w-8 text-indigo-600 mb-2" />
                <span className="text-sm font-medium text-indigo-600">Resources</span>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Study Motivation Card */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold">Inspirational Quotes & Tips</h3>
              <MessageSquareQuote className="h-5 w-5 text-primary" />
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                <h4 className="text-sm font-medium mb-2 text-primary">Study Quote</h4>
                <p className="text-sm italic">"The more that you read, the more things you will know. The more that you learn, the more places you'll go."</p>
                <p className="text-xs text-right mt-2 text-muted-foreground">— Dr. Seuss</p>
              </div>
              
              <div className="bg-green-500/5 p-4 rounded-lg border border-green-500/10">
                <h4 className="text-sm font-medium mb-2 text-green-600">Productivity Tip</h4>
                <p className="text-sm">Use the "2-minute rule" - if a task takes less than 2 minutes to complete, do it immediately rather than postponing it.</p>
              </div>
              
              <div className="bg-amber-500/5 p-4 rounded-lg border border-amber-500/10">
                <h4 className="text-sm font-medium mb-2 text-amber-600">Weekly Challenge</h4>
                <p className="text-sm">Try the Pomodoro technique this week! Set a timer for 25 minutes of focused work, then take a 5-minute break.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
