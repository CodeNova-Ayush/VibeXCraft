import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Bell,
  Link2,
  Shield,
  Palette,
  LogOut,
  KeyRound,
  Laptop,
  Cpu,
  Globe,
  Lock,
} from "lucide-react";

export default function Settings() {
  const [theme, setTheme] = useState("dark");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-8 space-y-8 text-foreground"
    >
      {/* HEADER */}
      <div>
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] bg-clip-text text-transparent">
          Settings ⚙️
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Manage your account, AI preferences, integrations, and app appearance
        </p>
      </div>

      {/* MAIN SETTINGS TABS */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-card/50 backdrop-blur-lg border border-border rounded-xl p-1">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="developer">Developer</TabsTrigger>
        </TabsList>

        {/* 🧍 GENERAL */}
        <TabsContent value="general" className="space-y-8 mt-6">
          <GlassCard hover className="p-6 space-y-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Profile Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Full Name</label>
                <Input defaultValue="Omkar Shewale" className="bg-background/50" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Username</label>
                <Input defaultValue="omkar_dev" className="bg-background/50" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-muted-foreground">Email</label>
                <Input type="email" defaultValue="omkar@vibexcraft.com" className="bg-background/50" />
              </div>
            </div>

            <Button className="bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] hover:opacity-90 transition">
              Save Changes
            </Button>
          </GlassCard>

          <GlassCard hover className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
            {[
              { label: "Email notifications", desc: "Receive updates via email" },
              { label: "Push alerts", desc: "Show notifications in your browser" },
              { label: "Project activity", desc: "Notify on commits, comments, merges" },
              { label: "System alerts", desc: "Critical security or downtime alerts" },
            ].map((n, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border">
                <div>
                  <p className="font-medium">{n.label}</p>
                  <p className="text-sm text-muted-foreground">{n.desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </GlassCard>
        </TabsContent>

        {/* 🤖 AI SETTINGS */}
        <TabsContent value="ai" className="space-y-8 mt-6">
          <GlassCard hover className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">AI Copilot Preferences</h2>
            {[
              { label: "Code Suggestions", desc: "Enable AI auto-completion while coding" },
              { label: "Debug Assistance", desc: "AI auto-fixes detected bugs" },
              { label: "Smart Refactor", desc: "Suggests cleaner structure for your code" },
              { label: "Learning Mode", desc: "AI adapts to your personal coding style" },
            ].map((ai, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border">
                <div>
                  <p className="font-medium">{ai.label}</p>
                  <p className="text-sm text-muted-foreground">{ai.desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </GlassCard>

          <GlassCard hover className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">AI Model Configuration</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Preferred Model</label>
                <Input defaultValue="GPT-4 Turbo" className="bg-background/50" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Max Token Limit</label>
                <Input defaultValue="4000" type="number" className="bg-background/50" />
              </div>
            </div>
            <Button variant="secondary">Save AI Config</Button>
          </GlassCard>
        </TabsContent>

        {/* 🔗 INTEGRATIONS */}
        <TabsContent value="integrations" className="space-y-8 mt-6">
          <GlassCard hover className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Link2 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Connected Services</h2>
            </div>
            {[
              { name: "GitHub", status: "Connected" },
              { name: "Google", status: "Not connected" },
              { name: "Discord", status: "Connected" },
              { name: "Figma", status: "Not connected" },
            ].map((service, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-background/50 border border-border rounded-xl">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">{service.status}</p>
                </div>
                <Button size="sm" variant="secondary">
                  {service.status === "Connected" ? "Disconnect" : "Connect"}
                </Button>
              </div>
            ))}
          </GlassCard>
        </TabsContent>

        {/* 🔒 PRIVACY */}
        <TabsContent value="privacy" className="space-y-8 mt-6">
          <GlassCard hover className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-semibold">Privacy & Security</h2>
            </div>
            {[
              { label: "Profile visibility", desc: "Make profile publicly visible" },
              { label: "Two-Factor Authentication", desc: "Secure login with 2FA" },
              { label: "Session management", desc: "Auto logout on inactivity" },
              { label: "Public API data", desc: "Allow analytics to use anonymized data" },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-background/50 border border-border rounded-xl">
                <div>
                  <p className="font-medium">{p.label}</p>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
                <Switch />
              </div>
            ))}

            <div className="pt-4 border-t border-border space-y-3">
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </div>
          </GlassCard>
        </TabsContent>

        {/* 🎨 APPEARANCE */}
        <TabsContent value="appearance" className="space-y-8 mt-6">
          <GlassCard hover className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Appearance</h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {["dark", "light", "auto"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`p-4 rounded-xl border ${
                    theme === t ? "border-primary bg-primary/10" : "border-border"
                  } transition-all`}
                >
                  <p className="capitalize">{t} Mode</p>
                </button>
              ))}
            </div>

            <div className="p-4 bg-background/50 rounded-xl border border-border">
              <p className="text-sm text-muted-foreground">
                Theme will auto-adjust based on your system preference if set to “Auto”.
              </p>
            </div>
          </GlassCard>
        </TabsContent>

        {/* 💻 DEVELOPER */}
        <TabsContent value="developer" className="space-y-8 mt-6">
          <GlassCard hover className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Developer Options</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground">API Key</label>
                <Input type="password" value="sk-************************" readOnly />
              </div>
              <Button variant="secondary" size="sm">
                Regenerate Key
              </Button>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Environment</p>
              <div className="flex gap-3">
                <Button size="sm" variant="secondary">
                  <Laptop className="w-4 h-4 mr-1" /> Local
                </Button>
                <Button size="sm" variant="secondary">
                  <Globe className="w-4 h-4 mr-1" /> Cloud
                </Button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>

      {/* LOGOUT */}
      <GlassCard className="p-6">
        <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </GlassCard>
    </motion.div>
  );
}
