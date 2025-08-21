
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { 
  Activity, 
  Heart, 
  Timer, 
  Target, 
  Zap, 
  Droplets, 
  Move,
  Clock,
  Trophy,
  PlayCircle,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function HealthyHabits() {
  const { toast } = useToast();
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [lastStretchReminder, setLastStretchReminder] = useState<Date | null>(null);
  const [dailyProgress, setDailyProgress] = useState({
    water: 0,
    movement: 0,
    stretches: 0
  });

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem("healthy_habits_progress");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCompletedChallenges(data.completed || []);
        setDailyProgress(data.progress || { water: 0, movement: 0, stretches: 0 });
      } catch (error) {
        console.error("Error loading progress:", error);
      }
    }
  }, []);

  // Save progress
  const saveProgress = (completed: string[], progress: typeof dailyProgress) => {
    localStorage.setItem("healthy_habits_progress", JSON.stringify({
      completed,
      progress,
      date: new Date().toDateString()
    }));
  };

  const completeChallenge = (challengeId: string) => {
    const newCompleted = [...completedChallenges, challengeId];
    setCompletedChallenges(newCompleted);
    saveProgress(newCompleted, dailyProgress);
    
    toast({
      title: "Challenge completed! 🎉",
      description: "Great job staying active and healthy!",
    });
  };

  const updateProgress = (type: keyof typeof dailyProgress, increment: number = 1) => {
    const newProgress = {
      ...dailyProgress,
      [type]: dailyProgress[type] + increment
    };
    setDailyProgress(newProgress);
    saveProgress(completedChallenges, newProgress);
  };

  const stretchReminder = () => {
    setLastStretchReminder(new Date());
    toast({
      title: "Stretch Reminder! 🧘‍♀️",
      description: "Time for a quick 2-minute stretch break. Your body will thank you!",
    });
  };

  const workoutSuggestions = [
    {
      id: "cardio-blast",
      name: "MYP Cardio Blast",
      duration: "10 min",
      equipment: "None",
      description: "High-intensity cardio perfect for PE assessment preparation",
      exercises: ["Jumping jacks", "High knees", "Burpees", "Mountain climbers"],
      icon: <Heart className="h-5 w-5" />
    },
    {
      id: "strength-builder",
      name: "Strength Builder",
      duration: "12 min",
      equipment: "Bodyweight",
      description: "Build functional strength for sports and daily activities",
      exercises: ["Push-ups", "Squats", "Planks", "Lunges"],
      icon: <Zap className="h-5 w-5" />
    },
    {
      id: "flexibility-flow",
      name: "Flexibility Flow",
      duration: "8 min",
      equipment: "Mat (optional)",
      description: "Improve flexibility and prevent injury",
      exercises: ["Dynamic stretches", "Yoga poses", "Joint mobility", "Cool-down stretches"],
      icon: <Move className="h-5 w-5" />
    }
  ];

  const quickChallenges = [
    {
      id: "wall-sit-60",
      name: "60-Second Wall Sit",
      description: "Hold a wall sit for 60 seconds straight",
      category: "Strength",
      icon: <Target className="h-4 w-4" />
    },
    {
      id: "jumping-jacks-100",
      name: "100 Jumping Jacks",
      description: "Complete 100 jumping jacks in under 3 minutes",
      category: "Cardio",
      icon: <Activity className="h-4 w-4" />
    },
    {
      id: "plank-2min",
      name: "2-Minute Plank",
      description: "Hold a proper plank position for 2 minutes",
      category: "Core",
      icon: <Timer className="h-4 w-4" />
    },
    {
      id: "water-8-glasses",
      name: "8 Glasses of Water",
      description: "Drink 8 glasses of water throughout the day",
      category: "Hydration",
      icon: <Droplets className="h-4 w-4" />
    }
  ];

  return (
    <section className="mb-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl text-gray-800 mb-2 flex items-center">
          <Activity className="h-6 w-6 mr-2 text-primary" />
          Healthy Habits
        </h1>
        <p className="text-gray-600">Stay active, healthy, and balanced with MYP PE-focused wellness activities</p>
      </div>

      {/* Daily Progress Overview */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
            Today's Progress
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Movement Sessions</span>
                <span className="text-sm text-gray-500">{dailyProgress.movement}/3</span>
              </div>
              <Progress value={(dailyProgress.movement / 3) * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Stretch Breaks</span>
                <span className="text-sm text-gray-500">{dailyProgress.stretches}/5</span>
              </div>
              <Progress value={(dailyProgress.stretches / 5) * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Water Intake</span>
                <span className="text-sm text-gray-500">{dailyProgress.water}/8</span>
              </div>
              <Progress value={(dailyProgress.water / 8) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              onClick={stretchReminder}
              className="h-20 flex flex-col items-center justify-center"
            >
              <Move className="h-6 w-6 mb-1" />
              <span className="text-xs">Stretch Break</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => updateProgress('water')}
              className="h-20 flex flex-col items-center justify-center"
            >
              <Droplets className="h-6 w-6 mb-1" />
              <span className="text-xs">Log Water</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => updateProgress('movement')}
              className="h-20 flex flex-col items-center justify-center"
            >
              <Activity className="h-6 w-6 mb-1" />
              <span className="text-xs">Log Movement</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => updateProgress('stretches')}
              className="h-20 flex flex-col items-center justify-center"
            >
              <Clock className="h-6 w-6 mb-1" />
              <span className="text-xs">Stretch Done</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* MYP PE Workout Suggestions */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <PlayCircle className="h-5 w-5 mr-2 text-primary" />
            MYP PE Workout Suggestions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workoutSuggestions.map((workout) => (
              <Card key={workout.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                      {workout.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{workout.name}</h4>
                      <div className="flex gap-2 text-xs text-gray-500">
                        <span>{workout.duration}</span>
                        <span>•</span>
                        <span>{workout.equipment}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{workout.description}</p>
                  
                  <div className="space-y-1 mb-4">
                    {workout.exercises.map((exercise, index) => (
                      <div key={index} className="text-xs text-gray-500 flex items-center">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                        {exercise}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      updateProgress('movement');
                      toast({
                        title: "Workout started! 💪",
                        description: `Great choice starting ${workout.name}. Remember to warm up first!`,
                      });
                    }}
                  >
                    Start Workout
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 10-Minute Challenges */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-orange-500" />
            10-Minute Challenges
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickChallenges.map((challenge) => (
              <Card key={challenge.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="p-2 bg-orange-500/10 rounded-lg mr-3">
                        {challenge.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{challenge.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {challenge.category}
                        </Badge>
                      </div>
                    </div>
                    
                    {completedChallenges.includes(challenge.id) ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Button 
                        size="sm"
                        onClick={() => completeChallenge(challenge.id)}
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600">{challenge.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wellness Tips */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
            Wellness Tips for MYP Students
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-primary">Balancing Screen Time</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Take a 5-minute movement break every hour of study
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Set device curfews 1 hour before bedtime for better sleep
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-primary">Daily Movement Goals</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Aim for 60 minutes of moderate physical activity daily
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Include strength, cardio, and flexibility exercises weekly
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Use stairs instead of elevators when possible
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Walk or bike to school if safe and practical
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
