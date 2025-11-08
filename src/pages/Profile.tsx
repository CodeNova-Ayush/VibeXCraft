import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  FolderGit2,
  Award,
  TrendingUp,
  Settings,
  Upload,
  Github,
  PlusCircle,
  BookOpen,
  Zap,
  Edit3,
  Trophy,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const [bio, setBio] = useState(
    "Passionate full-stack & AI developer working on futuristic web ecosystems. Love building with OpenAI, React, and Supabase."
  );
  const [editingBio, setEditingBio] = useState(false);
  const [projects, setProjects] = useState([
    {
      name: "VibeXCraft AI Suite",
      desc: "A unified AI-powered workspace for coding, collaboration, and hackathons.",
      stack: ["Next.js", "Tailwind", "Supabase"],
      stars: 421,
    },
    {
      name: "HealthAI",
      desc: "Smart medical assistant using OpenAI for diagnostics and health analysis.",
      stack: ["Python", "FastAPI", "React"],
      stars: 298,
    },
  ]);

  const handleUpload = () => {
    alert("🚀 Project upload feature coming soon with GitHub sync!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-8 sm:p-12 xl:px-32 space-y-8"
    >
      {/* 🧑‍🚀 Profile Header */}
      <GlassCard className="p-8 bg-background/60 backdrop-blur-xl border border-border/60 shadow-[0_0_30px_rgba(0,224,255,0.15)]">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#9B5CF5] to-[#00E0FF] p-[2px] shadow-[0_0_25px_rgba(0,224,255,0.3)]">
            <img
              src="https://api.dicebear.com/7.x/identicon/svg?seed=Omkar"
              alt="User Avatar"
              className="rounded-full w-full h-full object-cover"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white rounded-full shadow-md hover:scale-105"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] bg-clip-text text-transparent">
                  Omkar Shewale
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  @omkar • AI Engineer • Joined 3 months ago
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="flex items-center gap-1">
                  <Settings className="w-4 h-4" /> Edit Profile
                </Button>
                <Button
                  className="bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] hover:shadow-[0_0_15px_rgba(0,224,255,0.4)] flex items-center gap-1"
                >
                  <Github className="w-4 h-4" /> Connect GitHub
                </Button>
              </div>
            </div>

            <div className="flex gap-10 mt-6 text-center">
              {[
                { icon: Users, label: "Followers", value: "2.3K" },
                { icon: FolderGit2, label: "Projects", value: projects.length },
                { icon: Award, label: "Badges", value: "10+" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <div className="flex justify-center items-center gap-1 text-sm text-muted-foreground">
                    <stat.icon className="w-4 h-4" />
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* 🧭 Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-secondary border border-border/40">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="portfolio">Projects</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
        </TabsList>

        {/* 🌟 Overview */}
        <TabsContent value="overview" className="space-y-8 mt-6">
          <GlassCard hover className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" /> About Me
              </h2>
              {!editingBio ? (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setEditingBio(true)}
                >
                  Edit Bio
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]"
                  onClick={() => setEditingBio(false)}
                >
                  Save
                </Button>
              )}
            </div>

            {!editingBio ? (
              <p className="text-muted-foreground">{bio}</p>
            ) : (
              <textarea
                className="w-full rounded-xl border border-border bg-background/50 p-3 text-sm focus:ring-2 ring-primary outline-none"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            )}
          </GlassCard>

          {/* AI Summary */}
          <GlassCard hover className="p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" /> AI Insights
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You’ve shown consistent improvement in full-stack AI development this
              month with <span className="text-primary font-semibold">+34%</span>{" "}
              learning velocity. Keep exploring <strong>LangChain</strong> and{" "}
              <strong>Next.js 15</strong> for your upcoming projects.
            </p>
          </GlassCard>
        </TabsContent>

        {/* 💻 PROJECTS */}
        <TabsContent value="portfolio" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-primary" /> My Projects
            </h2>
            <Button
              onClick={handleUpload}
              className="flex items-center gap-2 bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]"
            >
              <Upload className="w-4 h-4" /> Upload Project
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <GlassCard
                key={i}
                hover
                className="p-6 space-y-3 border border-border/40 hover:shadow-[0_0_25px_rgba(155,92,245,0.2)] transition-all"
              >
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s, j) => (
                    <span
                      key={j}
                      className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border/40">
                  <Button size="sm" variant="outline" className="text-xs">
                    View
                  </Button>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-yellow-400" /> {p.stars}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        {/* 🏆 ACHIEVEMENTS */}
        <TabsContent value="achievements" className="space-y-6 mt-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" /> Achievements
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Replit VibeThon 2025 Winner", desc: "🏆 Won 1st place with VibeXCraft platform." },
              { title: "Hackathon Hero", desc: "🥇 Participated in 10+ national hackathons." },
              { title: "AI Research Contributor", desc: "🤖 Published AI optimization papers." },
            ].map((a, i) => (
              <GlassCard key={i} hover className="p-5 text-center">
                <h3 className="font-semibold mb-1">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        {/* 🏅 BADGES */}
        <TabsContent value="badges" className="space-y-6 mt-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" /> Earned Badges
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
              { emoji: "🚀", title: "Fast Learner" },
              { emoji: "🤝", title: "Team Player" },
              { emoji: "⚙️", title: "Builder" },
              { emoji: "🧠", title: "AI Master" },
              { emoji: "🐍", title: "Python Pro" },
              { emoji: "🖼️", title: "UI Visionary" },
              { emoji: "💬", title: "Community Champ" },
              { emoji: "🔥", title: "Hackathon Hero" },
            ].map((b, i) => (
              <GlassCard
                key={i}
                hover
                className="p-5 text-center border border-border/40 hover:shadow-[0_0_25px_rgba(0,224,255,0.2)] transition-all"
              >
                <div className="text-4xl mb-2">{b.emoji}</div>
                <p className="font-medium">{b.title}</p>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        {/* 📘 LEARNING */}
        <TabsContent value="learning" className="space-y-6 mt-6">
          <GlassCard className="p-6 text-center">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              Learning analytics and skill growth graph coming soon 📈
            </p>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
