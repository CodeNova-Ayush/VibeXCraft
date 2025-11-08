import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2, Code2, Video, Palette, GraduationCap, Sparkles } from "lucide-react";

export default function Copilots() {
  const copilots = [
    { 
      icon: CheckCircle2, 
      name: "Task Copilot", 
      desc: "Smart task management and prioritization",
      color: "text-primary"
    },
    { 
      icon: Video, 
      name: "Meeting Copilot", 
      desc: "Automated meeting summaries and notes",
      color: "text-accent"
    },
    { 
      icon: Code2, 
      name: "Code Copilot", 
      desc: "Real-time code assistance and suggestions",
      color: "text-primary"
    },
    { 
      icon: Palette, 
      name: "Design Copilot", 
      desc: "AI-powered design recommendations",
      color: "text-accent"
    },
    { 
      icon: GraduationCap, 
      name: "Tutor Copilot", 
      desc: "Interactive learning and code education",
      color: "text-primary"
    },
  ];

  return (
    <div className="min-h-screen p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Meet Your Copilots
        </h1>
        <p className="text-muted-foreground mt-1">AI assistants for every part of your workflow</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {copilots.map((copilot, i) => (
          <GlassCard key={i} hover className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow-purple`}>
                  <copilot.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{copilot.name}</h3>
                  <p className="text-sm text-muted-foreground">{copilot.desc}</p>
                </div>
              </div>
              <Switch />
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="secondary" className="flex-1">
                Customize
              </Button>
              <Button size="sm" className="bg-primary/10 hover:bg-primary/20">
                View Settings
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-accent" />
          <h2 className="text-xl font-semibold">AI Memory</h2>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-secondary/50 rounded-xl">
            <p className="text-muted-foreground">Last interaction: Code optimization for React components</p>
            <span className="text-xs text-muted-foreground">2 hours ago</span>
          </div>
          <div className="p-3 bg-secondary/50 rounded-xl">
            <p className="text-muted-foreground">Task prioritization updated based on deadlines</p>
            <span className="text-xs text-muted-foreground">1 day ago</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
