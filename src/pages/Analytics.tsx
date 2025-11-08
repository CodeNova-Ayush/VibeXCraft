import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Zap, Target, Download } from "lucide-react";
import Footer from "@/components/Footer";
import { useUser } from "@clerk/clerk-react";

export default function Analytics() {
  const { user } = useUser();
  
  // Check if user is new (no metadata or all zeros)
  const isNewUser = !user?.publicMetadata || 
    (!user.publicMetadata.codingHours && 
     !user.publicMetadata.aiUsage && 
     !user.publicMetadata.tasksCompleted && 
     !user.publicMetadata.vibeScore);

  const stats = {
    codingHours: (user?.publicMetadata?.codingHours as string) || "0h",
    aiUsage: (user?.publicMetadata?.aiUsage as number) ?? 0,
    tasksCompleted: (user?.publicMetadata?.tasksCompleted as number) ?? 0,
    vibeScore: (user?.publicMetadata?.vibeScore as number) ?? 0,
    weekly: (user?.publicMetadata?.weekly as number[]) || (isNewUser ? [0,0,0,0,0,0,0] : [10,15,8,20,12,18,14]),
    interactions: (user?.publicMetadata?.interactions as { type: string; count: number; color: string }[]) || (isNewUser ? [
      { type: "Code Reviews", count: 0, color: "bg-primary" },
      { type: "Optimizations", count: 0, color: "bg-accent" },
      { type: "Bug Fixes", count: 0, color: "bg-primary" },
      { type: "Explanations", count: 0, color: "bg-accent" },
    ] : [
      { type: "Code Reviews", count: 12, color: "bg-primary" },
      { type: "Optimizations", count: 8, color: "bg-accent" },
      { type: "Bug Fixes", count: 15, color: "bg-primary" },
      { type: "Explanations", count: 10, color: "bg-accent" },
    ]),
  };
  return (
    <div className="min-h-screen p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Analytics & Insights
          </h1>
          <p className="text-muted-foreground mt-1">Track your productivity and progress</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow-purple">
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Clock, label: "Coding Hours", value: stats.codingHours, change: "+0%" },
          { icon: Zap, label: "AI Usage", value: String(stats.aiUsage), change: "+0%" },
          { icon: Target, label: "Tasks Completed", value: String(stats.tasksCompleted), change: "+0%" },
          { icon: TrendingUp, label: "Vibe Score", value: String(stats.vibeScore), change: "+0%" },
        ].map((stat, i) => (
          <GlassCard key={i} hover className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-purple">
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="text-sm text-primary">{stat.change}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard hover className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Coding Activity
          </h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {stats.weekly.map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-gradient-primary rounded-t-lg transition-all hover:shadow-glow-purple min-h-[4px]"
                  style={{ height: `${Math.max(height, isNewUser ? 0 : 5)}%` }}
                />
                <span className="text-xs text-muted-foreground">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
          {isNewUser && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Start coding to see your activity here!
            </p>
          )}
        </GlassCard>

        <GlassCard hover className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            AI Interactions
          </h2>
          <div className="space-y-4">
            {stats.interactions.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.type}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full transition-all`}
                    style={{ width: `${(item.count / 50) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard hover className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Week Streak", desc: "7 days of coding", emoji: "🔥" },
            { title: "Code Master", desc: "100+ commits", emoji: "⭐" },
            { title: "AI Pioneer", desc: "50+ AI assists", emoji: "🤖" },
          ].map((achievement, i) => (
            <div key={i} className="p-4 bg-secondary/50 rounded-xl text-center">
              <div className="text-4xl mb-2">{achievement.emoji}</div>
              <h3 className="font-semibold">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground">{achievement.desc}</p>
            </div>
          ))}
        </div>
      </GlassCard>
      <Footer />
    </div>
  );
}
