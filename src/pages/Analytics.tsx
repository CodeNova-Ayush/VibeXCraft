import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Zap, Target, Download } from "lucide-react";

export default function Analytics() {
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
          { icon: Clock, label: "Coding Hours", value: "124.5h", change: "+12%" },
          { icon: Zap, label: "AI Usage", value: "89", change: "+23%" },
          { icon: Target, label: "Tasks Completed", value: "47", change: "+8%" },
          { icon: TrendingUp, label: "Vibe Score", value: "87", change: "+5%" },
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
            {[40, 65, 45, 80, 55, 70, 90].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-gradient-primary rounded-t-lg transition-all hover:shadow-glow-purple"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-muted-foreground">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard hover className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            AI Interactions
          </h2>
          <div className="space-y-4">
            {[
              { type: "Code Reviews", count: 34, color: "bg-primary" },
              { type: "Optimizations", count: 28, color: "bg-accent" },
              { type: "Bug Fixes", count: 21, color: "bg-primary" },
              { type: "Explanations", count: 45, color: "bg-accent" },
            ].map((item, i) => (
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
    </div>
  );
}
