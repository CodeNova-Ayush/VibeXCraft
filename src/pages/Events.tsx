import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Globe,
  Users,
  Trophy,
  Rocket,
  GitBranch,
  Code,
  Sparkles,
  Clock,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Events() {
  const [showAllHackathons, setShowAllHackathons] = useState(false);
  const [showAllOpenSource, setShowAllOpenSource] = useState(false);
  const [showAllContests, setShowAllContests] = useState(false);
  const [showAllMeetups, setShowAllMeetups] = useState(false);
  const hackathons = [
    {
      name: "AI Innovation Sprint",
      desc: "Build an AI product that solves real-world challenges. Compete with the best minds.",
      date: "Nov 20 - Dec 1, 2025",
      prize: "$5000 + Internship",
      type: "Online",
    },
    {
      name: "HackX India 2025",
      desc: "Nation-wide hackathon for futuristic web, AI, and health-tech innovations.",
      date: "Dec 15 - Dec 18, 2025",
      prize: "$10,000 + Incubation",
      type: "Hybrid",
    },
    {
      name: "Web3 Future Hack",
      desc: "Build decentralized apps with real-world utility.",
      date: "Jan 10 - Jan 15, 2026",
      prize: "$7,500 + Mentorship",
      type: "Online",
    },
    {
      name: "HealthTech Buildathon",
      desc: "AI for diagnostics and personal wellness.",
      date: "Feb 5 - Feb 12, 2026",
      prize: "$6,000 + Cloud Credits",
      type: "Hybrid",
    },
    {
      name: "FinAI Challenge",
      desc: "Intelligent financial analytics and assistants.",
      date: "Mar 1 - Mar 7, 2026",
      prize: "$8,000 + Internship",
      type: "Online",
    },
    {
      name: "DevOps Speedrun",
      desc: "Automate CI/CD at scale with cutting-edge tools.",
      date: "Mar 20 - Mar 24, 2026",
      prize: "$4,000 + Swag",
      type: "Online",
    },
    {
      name: "Design Systems Jam",
      desc: "Design+code systems for product velocity.",
      date: "Apr 5 - Apr 9, 2026",
      prize: "$3,000 + Design Mentorship",
      type: "Offline",
    },
    {
      name: "Robotics AI Sprint",
      desc: "Control and vision models for robotics.",
      date: "Apr 25 - Apr 30, 2026",
      prize: "$9,000 + Lab Access",
      type: "Hybrid",
    },
  ];

  const openSource = [
    {
      name: "HacktoberFest Reloaded",
      desc: "Contribute to open-source projects and earn swag, badges, and recognition.",
      platform: "GitHub",
      participants: "25K+ Developers",
    },
    {
      name: "Next.js Contributor Week",
      desc: "Join the global Next.js contributor week and make your first PR.",
      platform: "Vercel GitHub",
      participants: "12K+ Developers",
    },
  ];

  const contests = [
    {
      name: "LeetCode Weekly #420",
      desc: "Compete in 4 challenging coding problems. Rank globally.",
      platform: "LeetCode",
      prize: "$500 + Goodies",
      time: "Every Sunday",
    },
    {
      name: "Codeforces Round #970 (Div. 2)",
      desc: "For competitive programmers who want to test logic under pressure.",
      platform: "Codeforces",
      prize: "Rating + Medals",
      time: "Weekly",
    },
  ];

  const meetups = [
    {
      name: "AI Dev Summit Mumbai",
      desc: "Offline event bringing together top AI builders, startups, and dev communities.",
      date: "Jan 12, 2026",
      location: "BKC Convention Center",
    },
    {
      name: "Open Source Meetup Pune",
      desc: "Local open-source developers meetup to showcase projects and collaborations.",
      date: "Feb 3, 2026",
      location: "MIT WPU Pune",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-8 sm:p-16 xl:px-32 space-y-10"
    >
      {/* 🧭 Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] bg-clip-text text-transparent">
            Developer Events 🏁
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Join hackathons, open-source programs, and coding competitions to level up your skills.
          </p>
        </div>

        <Button className="flex items-center gap-2 bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] hover:shadow-[0_0_20px_rgba(0,224,255,0.3)]">
          <Rocket className="w-4 h-4" /> Host Event
        </Button>
      </div>

      {/* 🌍 Tabs */}
      <Tabs defaultValue="hackathons" className="w-full">
        <TabsList className="bg-card/50 border border-border rounded-xl backdrop-blur-lg">
          <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
          <TabsTrigger value="opensource">Open Source</TabsTrigger>
          <TabsTrigger value="contests">Competitive</TabsTrigger>
          <TabsTrigger value="meetups">Meetups</TabsTrigger>
        </TabsList>

        {/* 🏆 Hackathons */}
        <TabsContent value="hackathons" className="mt-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {(showAllHackathons ? hackathons : hackathons.slice(0, 4)).map((h, i) => (
            <GlassCard
              key={i}
              hover
              className="p-6 border border-border/50 bg-background/50 backdrop-blur-md transition-all hover:shadow-[0_0_30px_rgba(155,92,245,0.25)]"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{h.name}</h3>
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">{h.desc}</p>
              <div className="text-xs text-muted-foreground flex items-center gap-3 mb-3">
                <Calendar className="w-4 h-4" /> {h.date}
                <Globe className="w-4 h-4" /> {h.type}
              </div>
              <p className="text-sm text-accent font-medium mb-4">
                🏆 {h.prize}
              </p>
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]"
              >
                Join Hackathon
              </Button>
            </GlassCard>
            ))}
          </div>
          {!showAllHackathons && hackathons.length > 4 && (
            <div className="flex justify-center">
              <Button 
                onClick={() => setShowAllHackathons(true)}
                variant="secondary"
                className="px-6 py-2"
              >
                Explore More ({hackathons.length - 4} more)
              </Button>
            </div>
          )}
        </TabsContent>

        {/* 🌐 Open Source */}
        <TabsContent value="opensource" className="mt-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {(showAllOpenSource ? openSource : openSource.slice(0, 4)).map((o, i) => (
            <GlassCard
              key={i}
              hover
              className="p-6 border border-border/50 bg-background/50 backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{o.name}</h3>
                <GitBranch className="w-5 h-5 text-accent" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">{o.desc}</p>
              <p className="text-xs text-muted-foreground mb-3">
                Platform: <span className="text-primary font-medium">{o.platform}</span>
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                👥 {o.participants}
              </p>
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]"
              >
                Contribute Now
              </Button>
            </GlassCard>
          ))}
          </div>
          {!showAllOpenSource && openSource.length > 4 && (
            <div className="flex justify-center">
              <Button 
                onClick={() => setShowAllOpenSource(true)}
                variant="secondary"
                className="px-6 py-2"
              >
                Explore More ({openSource.length - 4} more)
              </Button>
            </div>
          )}
        </TabsContent>

        {/* 💻 Competitive Programming */}
        <TabsContent value="contests" className="mt-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {(showAllContests ? contests : contests.slice(0, 4)).map((c, i) => (
            <GlassCard
              key={i}
              hover
              className="p-6 border border-border/50 bg-background/50 backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{c.name}</h3>
                <Code className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">{c.desc}</p>
              <p className="text-xs text-muted-foreground mb-3">
                Platform: <span className="text-primary font-medium">{c.platform}</span>
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                ⏰ {c.time}
              </p>
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]"
              >
                Register
              </Button>
            </GlassCard>
          ))}
          </div>
          {!showAllContests && contests.length > 4 && (
            <div className="flex justify-center">
              <Button 
                onClick={() => setShowAllContests(true)}
                variant="secondary"
                className="px-6 py-2"
              >
                Explore More ({contests.length - 4} more)
              </Button>
            </div>
          )}
        </TabsContent>

        {/* 🤝 Meetups */}
        <TabsContent value="meetups" className="mt-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {(showAllMeetups ? meetups : meetups.slice(0, 4)).map((m, i) => (
            <GlassCard
              key={i}
              hover
              className="p-6 border border-border/50 bg-background/50 backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{m.name}</h3>
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">{m.desc}</p>
              <p className="text-xs text-muted-foreground mb-3">
                📅 {m.date}
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                📍 {m.location}
              </p>
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]"
              >
                Join Meetup
              </Button>
            </GlassCard>
          ))}
          </div>
          {!showAllMeetups && meetups.length > 4 && (
            <div className="flex justify-center">
              <Button 
                onClick={() => setShowAllMeetups(true)}
                variant="secondary"
                className="px-6 py-2"
              >
                Explore More ({meetups.length - 4} more)
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* 💡 AI Recommendation */}
      <GlassCard hover className="p-6 mt-8 text-center border border-border/50 bg-background/50 backdrop-blur-md">
        <Sparkles className="w-6 h-6 mx-auto text-primary mb-3" />
        <h3 className="text-lg font-semibold mb-2">AI-Recommended for You</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Based on your interests, we recommend joining <strong>HackX India 2025</strong> and 
          <strong> HacktoberFest Reloaded</strong> for maximum exposure.
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => window.location.href = '/ai/copilot'}
          className="mx-auto bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]"
        >
          View More Suggestions
        </Button>
      </GlassCard>
    </motion.div>
  );
}