import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, GitFork, Eye, Plus } from "lucide-react";

export default function Projects() {
  const projects = [
    { name: "VibeXCraft-Core", lang: "TypeScript", stars: 42, forks: 12, views: 234 },
    { name: "AI-Copilot-Engine", lang: "Python", stars: 89, forks: 23, views: 567 },
    { name: "Community-Platform", lang: "React", stars: 156, forks: 45, views: 892 },
    { name: "Analytics-Dashboard", lang: "Vue", stars: 34, forks: 8, views: 198 },
    { name: "Code-Optimizer", lang: "Go", stars: 67, forks: 19, views: 445 },
    { name: "Design-System", lang: "CSS", stars: 123, forks: 34, views: 678 },
  ];

  return (
    <div className="min-h-screen p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Your Creations
          </h1>
          <p className="text-muted-foreground mt-1">Synced with the Cloud</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow-purple transition-all">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
            className="pl-10 bg-secondary/50 border-border"
          />
        </div>
        <Button variant="secondary">Filter</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <GlassCard key={i} hover className="p-6 space-y-4 group">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-muted-foreground">{project.lang}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {project.stars}
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                {project.forks}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {project.views}
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-primary/10 hover:bg-primary/20">
                Open in IDE
              </Button>
              <Button size="sm" variant="secondary">
                <GitFork className="w-4 h-4" />
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
