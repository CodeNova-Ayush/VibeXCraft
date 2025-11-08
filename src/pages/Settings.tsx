import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useUser, useClerk } from "@clerk/clerk-react";
import Footer from "@/components/Footer";
import {
  User,
  Bell,
  Link2,
  Shield,
  Palette,
  KeyRound,
  Laptop,
  Cpu,
  Globe,
  Lock,
  Mail,
  Save,
  Eye,
  EyeOff,
  Copy,
  Check,
  Github,
  Trash2,
  AlertTriangle,
  Moon,
  Sun,
  Monitor,
  Settings2,
  Database,
  Zap,
  Languages,
  Clock,
} from "lucide-react";

const SETTINGS_STORAGE_KEY = "user_settings";

interface UserSettings {
  theme: "light" | "dark" | "system";
  notifications: {
    email: boolean;
    push: boolean;
    projectActivity: boolean;
    systemAlerts: boolean;
  };
  ai: {
    codeSuggestions: boolean;
    debugAssistance: boolean;
    smartRefactor: boolean;
    learningMode: boolean;
    preferredModel: string;
    maxTokens: number;
  };
  privacy: {
    profileVisibility: boolean;
    twoFactorAuth: boolean;
    sessionManagement: boolean;
    publicAPIData: boolean;
  };
  developer: {
    apiKey: string;
    environment: "local" | "cloud";
    showDebugInfo: boolean;
  };
  preferences: {
    language: string;
    timezone: string;
    dateFormat: string;
  };
}

const defaultSettings: UserSettings = {
  theme: "system",
  notifications: {
    email: true,
    push: true,
    projectActivity: true,
    systemAlerts: true,
  },
  ai: {
    codeSuggestions: true,
    debugAssistance: true,
    smartRefactor: true,
    learningMode: false,
    preferredModel: "gpt-3.5-turbo",
    maxTokens: 4000,
  },
  privacy: {
    profileVisibility: true,
    twoFactorAuth: false,
    sessionManagement: true,
    publicAPIData: false,
  },
  developer: {
    apiKey: "",
    environment: "local",
    showDebugInfo: false,
  },
  preferences: {
    language: "en",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dateFormat: "MM/DD/YYYY",
  },
};

export default function Settings() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { toast } = useToast();
  
  // Load settings from localStorage
  const loadSettings = (): UserSettings => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        return { ...defaultSettings, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
    return defaultSettings;
  };

  const [settings, setSettings] = useState<UserSettings>(loadSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === "dark" || (settings.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [settings.theme]);

  // Update setting
  const updateSetting = <K extends keyof UserSettings>(
    category: K,
    key: keyof UserSettings[K],
    value: any
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  // Save all settings
  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
    }, 500);
  };

  // Generate API key
  const generateApiKey = () => {
    const newKey = `vibex_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    updateSetting("developer", "apiKey", newKey);
    toast({
      title: "API Key Generated",
      description: "Your new API key has been generated.",
    });
  };

  // Copy API key
  const copyApiKey = () => {
    if (settings.developer.apiKey) {
      navigator.clipboard.writeText(settings.developer.apiKey);
      setCopied(true);
      toast({
        title: "Copied",
        description: "API key copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // User data
  const userName = user?.fullName || user?.username || "User";
  const userEmail = user?.primaryEmailAddress?.emailAddress || "";
  const userImageUrl = user?.imageUrl || "";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] bg-clip-text text-transparent mb-2">
            Settings
        </h1>
          <p className="text-muted-foreground">
            Manage your account preferences, integrations, and app settings
        </p>
      </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-6">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">AI</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              <span className="hidden sm:inline">Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="developer" className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span className="hidden sm:inline">Developer</span>
            </TabsTrigger>
        </TabsList>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9B5CF5] to-[#00E0FF] flex items-center justify-center text-white font-semibold text-lg">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{userName}</h3>
                  <p className="text-sm text-muted-foreground">{userEmail}</p>
                </div>
            </div>

              <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      defaultValue={userName}
                      className="mt-1"
                    />
              </div>
              <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={userEmail}
                      className="mt-1"
                      disabled
                    />
              </div>
            </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself"
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Save className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications
              </h3>
              <div className="space-y-4">
                {[
                  { key: "email", label: "Email notifications", desc: "Receive updates via email" },
                  { key: "push", label: "Push notifications", desc: "Browser push notifications" },
                  { key: "projectActivity", label: "Project activity", desc: "Commits, comments, merges" },
                  { key: "systemAlerts", label: "System alerts", desc: "Critical security updates" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                      onCheckedChange={(checked) =>
                        updateSetting("notifications", item.key as any, checked)
                      }
                    />
              </div>
            ))}
              </div>
          </GlassCard>
        </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences" className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Appearance
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {[
                      { value: "light", icon: Sun, label: "Light" },
                      { value: "dark", icon: Moon, label: "Dark" },
                      { value: "system", icon: Monitor, label: "System" },
                    ].map((theme) => (
                      <button
                        key={theme.value}
                        onClick={() => updateSetting("theme", "theme", theme.value)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          settings.theme === theme.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <theme.icon className="w-5 h-5 mx-auto mb-2" />
                        <p className="text-sm font-medium">{theme.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
          </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Languages className="w-5 h-5 text-primary" />
                Localization
              </h3>
              <div className="space-y-4">
              <div>
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) => updateSetting("preferences", "language", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
              <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.preferences.timezone}
                    onValueChange={(value) => updateSetting("preferences", "timezone", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                      <SelectItem value="Asia/Shanghai">Shanghai (CST)</SelectItem>
                    </SelectContent>
                  </Select>
            </div>
                <div>
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={settings.preferences.dateFormat}
                    onValueChange={(value) => updateSetting("preferences", "dateFormat", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
          </GlassCard>
        </TabsContent>

          {/* AI Settings */}
          <TabsContent value="ai" className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                AI Copilot Preferences
              </h3>
              <div className="space-y-4">
                {[
                  { key: "codeSuggestions", label: "Code Suggestions", desc: "Auto-completion while coding" },
                  { key: "debugAssistance", label: "Debug Assistance", desc: "Auto-fix detected bugs" },
                  { key: "smartRefactor", label: "Smart Refactor", desc: "Suggest code improvements" },
                  { key: "learningMode", label: "Learning Mode", desc: "Adapt to your coding style" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={settings.ai[item.key as keyof typeof settings.ai] as boolean}
                      onCheckedChange={(checked) =>
                        updateSetting("ai", item.key as any, checked)
                      }
                    />
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Model Configuration</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="model">Preferred AI Model</Label>
                  <Select
                    value={settings.ai.preferredModel}
                    onValueChange={(value) => updateSetting("ai", "preferredModel", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-4-turbo-preview">GPT-4 Turbo Preview</SelectItem>
                    </SelectContent>
                  </Select>
            </div>
                <div>
                  <Label htmlFor="maxTokens">Max Tokens</Label>
                  <Input
                    id="maxTokens"
                    type="number"
                    value={settings.ai.maxTokens}
                    onChange={(e) => updateSetting("ai", "maxTokens", parseInt(e.target.value))}
                    className="mt-1"
                    min="100"
                    max="8000"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum tokens per request (100-8000)
                  </p>
                </div>
              </div>
            </GlassCard>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Link2 className="w-5 h-5 text-primary" />
                Connected Services
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "GitHub",
                    icon: Github,
                    status: localStorage.getItem("github_token") ? "connected" : "disconnected",
                    desc: "Sync repositories and projects",
                    action: () => {
                      // Handle GitHub connection
                      toast({
                        title: "GitHub Integration",
                        description: "Connect GitHub from your Profile page",
                      });
                    },
                  },
                  {
                    name: "Google",
                    icon: Globe,
                    status: "disconnected",
                    desc: "Import from Google Drive",
                    action: () => {
                      toast({
                        title: "Coming Soon",
                        description: "Google integration will be available soon",
                      });
                    },
                  },
                ].map((service, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{service.name}</p>
                        <p className="text-xs text-muted-foreground">{service.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          service.status === "connected"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-gray-500/20 text-gray-500"
                        }`}
                      >
                        {service.status === "connected" ? "Connected" : "Not connected"}
                      </span>
                      <Button
                        size="sm"
                        variant={service.status === "connected" ? "outline" : "default"}
                        onClick={service.action}
                      >
                        {service.status === "connected" ? "Disconnect" : "Connect"}
              </Button>
                    </div>
                  </div>
                ))}
            </div>
          </GlassCard>
        </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Security Settings
              </h3>
              <div className="space-y-4">
                {[
                  { key: "profileVisibility", label: "Public Profile", desc: "Make your profile visible to others" },
                  { key: "twoFactorAuth", label: "Two-Factor Authentication", desc: "Enable 2FA for extra security" },
                  { key: "sessionManagement", label: "Auto Logout", desc: "Logout after inactivity" },
                  { key: "publicAPIData", label: "Share Analytics", desc: "Allow anonymous usage data" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={settings.privacy[item.key as keyof typeof settings.privacy]}
                      onCheckedChange={(checked) =>
                        updateSetting("privacy", item.key as any, checked)
                      }
                    />
            </div>
              ))}
            </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Password
              </h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
                <p className="text-xs text-muted-foreground">
                  Manage your password through your authentication provider
              </p>
            </div>
          </GlassCard>

            <GlassCard className="p-6 border-destructive/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Danger Zone
              </h3>
            <div className="space-y-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Account</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and all associated data.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive">Delete Account</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </GlassCard>
          </TabsContent>

          {/* Developer */}
          <TabsContent value="developer" className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-primary" />
                API Keys
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="apiKey"
                      type={showApiKey ? "text" : "password"}
                      value={settings.developer.apiKey || "No API key generated"}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyApiKey}
                      disabled={!settings.developer.apiKey}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use this key to authenticate API requests
                  </p>
                </div>
                <Button onClick={generateApiKey} variant="outline">
                  <KeyRound className="w-4 h-4 mr-2" />
                  Generate New Key
                </Button>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Environment
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>Environment</Label>
                  <div className="flex gap-3 mt-2">
                    <Button
                      variant={settings.developer.environment === "local" ? "default" : "outline"}
                      onClick={() => updateSetting("developer", "environment", "local")}
                    >
                      <Laptop className="w-4 h-4 mr-2" />
                      Local
                    </Button>
                    <Button
                      variant={settings.developer.environment === "cloud" ? "default" : "outline"}
                      onClick={() => updateSetting("developer", "environment", "cloud")}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Cloud
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                  <div>
                    <p className="font-medium text-sm">Debug Mode</p>
                    <p className="text-xs text-muted-foreground">Show debug information in console</p>
                  </div>
                  <Switch
                    checked={settings.developer.showDebugInfo}
                    onCheckedChange={(checked) =>
                      updateSetting("developer", "showDebugInfo", checked)
                    }
                  />
              </div>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>

        {/* Save Button - Fixed at bottom */}
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} size="lg">
            {isSaving ? (
              <>
                <Save className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save All Changes
              </>
            )}
        </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
