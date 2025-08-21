import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Timer, PlayCircle, PauseCircle, RotateCcw, Bell, Volume2, VolumeX, CheckCircle2, ListTodo } from "lucide-react";

export default function PomodoroTimer() {
  const { toast } = useToast();
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(4);
  const [remainingTime, setRemainingTime] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isLongBreak, setIsLongBreak] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [task, setTask] = useState("");
  const [savedTasks, setSavedTasks] = useState<string[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3");
    audioRef.current.volume = 0.7;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);
  
  useEffect(() => {
    if (!isRunning) return;
    
    timerRef.current = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          playSound();
          clearInterval(timerRef.current!);
          
          if (!isBreak) {
            const sessions = completedSessions + 1;
            setCompletedSessions(sessions);
            
            // Check if it's time for a long break
            if (sessions % sessionsBeforeLongBreak === 0) {
              toast({
                title: "Long break time!",
                description: `Well done! You've completed ${sessions} sessions. Time for a longer break.`,
              });
              setIsLongBreak(true);
              setIsBreak(true);
              setRemainingTime(longBreakTime * 60);
            } else {
              toast({
                title: "Break time!",
                description: "Great job! Take a short break.",
              });
              setIsBreak(true);
              setRemainingTime(breakTime * 60);
            }
          } else {
            toast({
              title: "Break ended!",
              description: "Time to get back to work!",
            });
            setIsBreak(false);
            setIsLongBreak(false);
            setRemainingTime(workTime * 60);
            
            // Save the completed task
            if (task.trim() !== "") {
              setSavedTasks(prev => [...prev, task]);
              setTask("");
            }
          }
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isBreak, completedSessions, workTime, breakTime, longBreakTime, sessionsBeforeLongBreak, task, toast]);
  
  // Format time as mm:ss
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Start/pause timer
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };
  
  // Reset timer
  const resetTimer = () => {
    clearInterval(timerRef.current!);
    setIsRunning(false);
    setRemainingTime(isBreak ? (isLongBreak ? longBreakTime * 60 : breakTime * 60) : workTime * 60);
  };
  
  // Play sound when timer completes
  const playSound = () => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  };
  
  // Skip current interval
  const skipInterval = () => {
    if (isBreak) {
      setIsBreak(false);
      setIsLongBreak(false);
      setRemainingTime(workTime * 60);
    } else {
      const sessions = completedSessions + 1;
      setCompletedSessions(sessions);
      
      if (sessions % sessionsBeforeLongBreak === 0) {
        setIsLongBreak(true);
        setIsBreak(true);
        setRemainingTime(longBreakTime * 60);
      } else {
        setIsBreak(true);
        setRemainingTime(breakTime * 60);
      }
    }
    setIsRunning(false);
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    const totalTime = isBreak ? (isLongBreak ? longBreakTime * 60 : breakTime * 60) : workTime * 60;
    return (remainingTime / totalTime) * 100;
  };
  
  // Remove task from completed list
  const removeTask = (index: number) => {
    setSavedTasks(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <section className="mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="font-heading font-bold text-xl text-gray-800 mb-2">Pomodoro Timer</h2>
            <p className="text-sm text-gray-600">
              Boost your productivity with the Pomodoro Technique: work in focused intervals, then take short breaks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Timer Display */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center">
              <div className="w-full max-w-sm bg-gradient-to-br from-primary/5 to-primary/20 rounded-lg p-6 mb-4">
                <div className="text-center mb-2">
                  <span className="text-sm font-medium">
                    {isBreak ? (isLongBreak ? "Long Break" : "Short Break") : "Focus Time"}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">
                    {completedSessions} sessions completed
                  </span>
                </div>
                
                <div className="relative h-48 flex items-center justify-center mb-4"
                  style={{
                    background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), 
                                conic-gradient(from 0deg, ${isBreak ? 'var(--success-color, #10b981)' : 'var(--primary-color, #3b82f6)'} ${calculateProgress()}%, var(--muted, #e5e7eb) 0)`,
                    borderRadius: '50%',
                  }}
                >
                  <div className="text-center">
                    <div className="text-5xl font-bold">{formatTime(remainingTime)}</div>
                    <div className="text-sm text-gray-500 mt-2">
                      {isBreak ? "Time to recharge" : "Stay focused"}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button 
                    variant={isRunning ? "outline" : "default"} 
                    size="lg" 
                    onClick={toggleTimer} 
                    className="rounded-full w-14 h-14 p-0 flex items-center justify-center"
                  >
                    {isRunning ? (
                      <PauseCircle className="h-8 w-8" />
                    ) : (
                      <PlayCircle className="h-8 w-8" />
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={resetTimer} 
                    className="rounded-full w-14 h-14 p-0 flex items-center justify-center"
                  >
                    <RotateCcw className="h-6 w-6" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={skipInterval} 
                    className="rounded-full w-14 h-14 p-0 flex items-center justify-center"
                  >
                    <Timer className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              
              <div className="w-full max-w-sm">
                <div className="mb-4">
                  <Label className="mb-2 block">Current Task</Label>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="What are you working on?" 
                      value={task} 
                      onChange={(e) => setTask(e.target.value)}
                      disabled={isRunning && !isBreak}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="sound-toggle" 
                      checked={soundEnabled}
                      onCheckedChange={setSoundEnabled}
                    />
                    <Label htmlFor="sound-toggle" className="flex items-center">
                      {soundEnabled ? (
                        <Volume2 className="h-4 w-4 mr-2" />
                      ) : (
                        <VolumeX className="h-4 w-4 mr-2" />
                      )}
                      Sound
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Settings Panel */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-4">Timer Settings</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Work Time (minutes): {workTime}</Label>
                    </div>
                    <Slider 
                      value={[workTime]} 
                      min={5} 
                      max={60} 
                      step={1} 
                      onValueChange={(values) => setWorkTime(values[0])}
                      disabled={isRunning}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Short Break (minutes): {breakTime}</Label>
                    </div>
                    <Slider 
                      value={[breakTime]} 
                      min={1} 
                      max={15} 
                      step={1} 
                      onValueChange={(values) => setBreakTime(values[0])}
                      disabled={isRunning}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Long Break (minutes): {longBreakTime}</Label>
                    </div>
                    <Slider 
                      value={[longBreakTime]} 
                      min={5} 
                      max={30} 
                      step={1} 
                      onValueChange={(values) => setLongBreakTime(values[0])}
                      disabled={isRunning}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Sessions before long break</Label>
                    <Select 
                      value={sessionsBeforeLongBreak.toString()} 
                      onValueChange={(value) => setSessionsBeforeLongBreak(parseInt(value))}
                      disabled={isRunning}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sessions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 sessions</SelectItem>
                        <SelectItem value="3">3 sessions</SelectItem>
                        <SelectItem value="4">4 sessions</SelectItem>
                        <SelectItem value="5">5 sessions</SelectItem>
                        <SelectItem value="6">6 sessions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Completed Tasks */}
              <div>
                <h3 className="font-medium text-gray-700 mb-4">Completed Tasks</h3>
                <div className="bg-neutral-100 rounded-md p-3 min-h-[200px] max-h-[300px] overflow-y-auto">
                  {savedTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-center">
                      <ListTodo className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-gray-500">No completed tasks yet</p>
                      <p className="text-sm text-gray-400">Completed tasks will appear here</p>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {savedTasks.map((savedTask, index) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-2 bg-white p-3 rounded shadow-sm"
                        >
                          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">{savedTask}</p>
                          </div>
                          <button 
                            className="text-gray-400 hover:text-destructive"
                            onClick={() => removeTask(index)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}