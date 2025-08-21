
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Settings as SettingsIcon, User, Bell, Palette, Database, Shield } from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    username: "Student",
    email: "",
    notifications: true,
    soundEnabled: true,
    theme: "system",
    autoSave: true,
    pomodoroWorkTime: 25,
    pomodoroBreakTime: 5,
    studyReminders: true,
  });

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("myp_app_settings");
    if (savedSettings) {
      try {
        setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }));
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem("myp_app_settings", JSON.stringify(settings));
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    const defaultSettings = {
      username: "Student",
      email: "",
      notifications: true,
      soundEnabled: true,
      theme: "system",
      autoSave: true,
      pomodoroWorkTime: 25,
      pomodoroBreakTime: 5,
      studyReminders: true,
    };
    setSettings(defaultSettings);
    localStorage.removeItem("myp_app_settings");
    toast({
      title: "Settings reset",
      description: "All settings have been restored to default values.",
    });
  };

  return (
    <section className="mb-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl text-gray-800 mb-2 flex items-center">
          <SettingsIcon className="h-6 w-6 mr-2 text-primary" />
          Settings
        </h1>
        <p className="text-gray-600">Customize your MYP Companion experience</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-semibold text-lg">Profile</h3>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="username">Display Name</Label>
                <Input
                  id="username"
                  value={settings.username}
                  onChange={(e) => updateSetting("username", e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSetting("email", e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Bell className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-semibold text-lg">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Enable Notifications</Label>
                  <p className="text-sm text-gray-500">Receive app notifications and alerts</p>
                </div>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={(checked) => updateSetting("notifications", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sound">Sound Effects</Label>
                  <p className="text-sm text-gray-500">Play sounds for timers and alerts</p>
                </div>
                <Switch
                  id="sound"
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) => updateSetting("soundEnabled", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="study-reminders">Study Reminders</Label>
                  <p className="text-sm text-gray-500">Get reminders for study sessions</p>
                </div>
                <Switch
                  id="study-reminders"
                  checked={settings.studyReminders}
                  onCheckedChange={(checked) => updateSetting("studyReminders", checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Palette className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-semibold text-lg">Appearance</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value) => updateSetting("theme", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Study Settings */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Database className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-semibold text-lg">Study Preferences</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-save">Auto-save Notes</Label>
                  <p className="text-sm text-gray-500">Automatically save your notes as you type</p>
                </div>
                <Switch
                  id="auto-save"
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => updateSetting("autoSave", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="work-time">Default Work Time (minutes)</Label>
                  <Input
                    id="work-time"
                    type="number"
                    min="5"
                    max="60"
                    value={settings.pomodoroWorkTime}
                    onChange={(e) => updateSetting("pomodoroWorkTime", parseInt(e.target.value) || 25)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="break-time">Default Break Time (minutes)</Label>
                  <Input
                    id="break-time"
                    type="number"
                    min="1"
                    max="15"
                    value={settings.pomodoroBreakTime}
                    onChange={(e) => updateSetting("pomodoroBreakTime", parseInt(e.target.value) || 5)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-semibold text-lg">Data Management</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 mb-2">Local Storage</h4>
                <p className="text-sm text-amber-700 mb-3">
                  Your data is stored locally in your browser. This includes notes, settings, and completed tasks.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const dataSize = new Blob([
                      localStorage.getItem("myp_study_notes") || "[]",
                      localStorage.getItem("myp_app_settings") || "{}",
                      localStorage.getItem("myp_completed_tasks") || "[]"
                    ]).size;
                    toast({
                      title: "Storage Info",
                      description: `Approximately ${Math.round(dataSize / 1024)} KB of data stored locally.`,
                    });
                  }}
                >
                  Check Storage Usage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button onClick={saveSettings} className="flex-1 sm:flex-none">
            Save Settings
          </Button>
          
          <Button 
            variant="outline" 
            onClick={resetSettings}
            className="flex-1 sm:flex-none"
          >
            Reset to Defaults
          </Button>
        </div>
      </div>
    </section>
  );
}
