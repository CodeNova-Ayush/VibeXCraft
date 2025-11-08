import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  MessageCircle,
  Share2,
  Users,
  Send,
  Trophy,
  PlusCircle,
} from "lucide-react";

export default function Community() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "Alex", text: "Hey devs! Excited for the new AI challenge? 🤖" },
    { sender: "You", text: "Absolutely! The theme looks insane 🔥" },
  ]);

  // ✅ FIX: Add missing visiblePosts and visibleCommunities states
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [visibleCommunities, setVisibleCommunities] = useState(6);

  // 🧠 FEED POSTS
  const posts = [
    {
      user: "Sarah Dev",
      project: "Real-time Chat App",
      lang: "TypeScript",
      desc: "A seamless real-time chat application powered by WebSockets and Node.js — with typing indicators and group chats!",
      likes: 234,
      comments: 45,
      image: "💬",
      tag: "Web",
    },
    {
      user: "Alex Code",
      project: "AI Image Generator",
      lang: "Python",
      desc: "An AI-based image generation platform using Stable Diffusion — allows prompts, styles, and image-to-image generation.",
      likes: 567,
      comments: 89,
      image: "🎨",
      tag: "AI/ML",
    },
    {
      user: "Jordan Builder",
      project: "E-commerce Platform",
      lang: "React",
      desc: "A scalable React + Node.js e-commerce platform with integrated Stripe payments and AI-driven product recommendations.",
      likes: 432,
      comments: 67,
      image: "🛍️",
      tag: "Fullstack",
    },
    {
      user: "Riya Singh",
      project: "HealthAI Tracker",
      lang: "Next.js",
      desc: "Tracks health data in real-time using wearable APIs and provides AI-driven health recommendations.",
      likes: 389,
      comments: 54,
      image: "💊",
      tag: "HealthTech",
    },
    {
      user: "Max Design",
      project: "UI Motion Kit",
      lang: "Figma + React",
      desc: "A toolkit for animating interfaces beautifully using Framer Motion and Tailwind presets.",
      likes: 412,
      comments: 33,
      image: "🎞️",
      tag: "Design",
    },
    {
      user: "Neha Dev",
      project: "Code Analyzer AI",
      lang: "Python + FastAPI",
      desc: "An AI that reviews codebases and suggests optimization or potential bug fixes automatically.",
      likes: 601,
      comments: 92,
      image: "🤖",
      tag: "AI Tools",
    },
    {
      user: "Arjun Tech",
      project: "Crypto Portfolio Dashboard",
      lang: "Vue.js",
      desc: "Live crypto analytics dashboard using CoinGecko API with real-time profit/loss tracking.",
      likes: 475,
      comments: 70,
      image: "💰",
      tag: "FinTech",
    },
    {
      user: "Maya Codes",
      project: "EduMentor AI",
      lang: "React + Flask",
      desc: "A personalized learning mentor that generates custom lessons and quizzes from your syllabus.",
      likes: 522,
      comments: 81,
      image: "📚",
      tag: "EdTech",
    },
  ];

  // 🌍 COMMUNITY CARDS
  const allCommunities = [
    { name: "AI Builders Hub", members: "4.2k", desc: "Collaborate on AI-powered projects & research." },
    { name: "Open Source Coders", members: "6.1k", desc: "Contribute, fork, and push open innovation." },
    { name: "UI/UX Visionaries", members: "2.8k", desc: "Design-first developers making beautiful apps." },
    { name: "Next.js Wizards", members: "3.9k", desc: "Full-stack devs building for the web of tomorrow." },
    { name: "Hackathon Heroes", members: "1.5k", desc: "Compete, create, and win with fellow devs." },
    { name: "Cloud Native Crew", members: "2.3k", desc: "Kubernetes, Docker, and scalable architectures." },
    { name: "Mobile Mavericks", members: "3.1k", desc: "Cross-platform mobile apps with React Native." },
    { name: "Cyber Sentinels", members: "1.9k", desc: "Ethical hackers, pen testers, and security experts." },
    { name: "Game Dev Galaxy", members: "2.5k", desc: "3D, Unreal, and Unity creators sharing their worlds." },
  ];

  // 💬 Handle Chat
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages([...messages, { sender: "You", text: chatInput }]);
    setChatInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-8 space-y-10"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] bg-clip-text text-transparent">
            Developer Community 🌐
          </h1>
          <p className="text-muted-foreground mt-2 text-base">
            Join discussions, share builds, and grow with innovators around the world.
          </p>
        </div>

        <Button className="flex items-center gap-2 bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] hover:opacity-90 transition">
          <PlusCircle className="w-5 h-5" />
          Create Post
        </Button>
      </div>

      {/* TABS */}
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="bg-card/50 border border-border backdrop-blur-lg rounded-xl">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
          <TabsTrigger value="chat">Live Chat</TabsTrigger>
        </TabsList>

        {/* 📰 FEED */}
        <TabsContent value="feed" className="mt-8">
          <div className="space-y-10">
            {/* Project Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {posts.slice(0, visiblePosts).map((post, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlassCard
                    hover
                    className="p-6 space-y-5 transition-all border border-white/10 hover:shadow-[0_0_25px_rgba(155,92,245,0.25)] hover:border-[#00E0FF]/40 bg-background/60 backdrop-blur-md"
                  >
                    {/* 🧑‍💻 User Info */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] flex items-center justify-center text-lg text-white font-semibold shadow-md">
                        {post.user[0]}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{post.user}</h3>
                        <p className="text-sm text-muted-foreground">
                          Posted in{" "}
                          <span className="text-primary font-medium">{post.tag}</span>
                        </p>
                      </div>
                      <Button variant="secondary" size="sm" className="text-xs">
                        Follow
                      </Button>
                    </div>

                    {/* 💡 Project Info */}
                    <div className="p-5 bg-background/50 border border-border rounded-xl text-center hover:bg-background/70 transition">
                      <div className="text-5xl mb-3">{post.image}</div>
                      <h4 className="font-semibold text-xl mb-1">{post.project}</h4>
                      <p className="text-sm text-muted-foreground mb-3 italic">{post.lang}</p>
                      <p className="text-sm text-foreground/80 leading-relaxed max-w-2xl mx-auto">
                        {post.desc}
                      </p>
                    </div>

                    {/* ⚙️ Action Buttons */}
                    <div className="flex items-center justify-between mt-4 border-t border-border pt-4">
                      <div className="flex items-center gap-5">
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
                          <Heart className="w-5 h-5" /> {post.likes}
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition">
                          <MessageCircle className="w-5 h-5" /> {post.comments}
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                          <Share2 className="w-5 h-5" /> Share
                        </button>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] hover:opacity-85 transition"
                      >
                        Join Workspace
                      </Button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* 🌐 Explore More Button */}
            {visiblePosts < posts.length && (
              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setVisiblePosts((prev) => prev + 4)}
                  className="px-6 py-2 rounded-lg hover:bg-background/70 border border-border"
                >
                  Explore More
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* 🌍 COMMUNITIES */}
<TabsContent value="communities" className="space-y-6 mt-6">
  <GlassCard hover className="p-6">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" /> Active Communities
        </h2>
        <p className="text-sm text-muted-foreground">
          Join coding tribes, AI circles, and creator squads.  
          Collaborate, learn, and build something extraordinary together.
        </p>
      </div>
    </div>

    {/* Community Grid */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {allCommunities.slice(0, visibleCommunities).map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="group p-6 rounded-2xl border border-border bg-background/50 hover:bg-background/70 hover:shadow-[0_0_25px_rgba(0,224,255,0.2)] transition-all backdrop-blur-md"
        >
          {/* Top Info */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition">
                {c.name}
              </h3>
              <p className="text-xs text-muted-foreground">{c.members} members</p>
            </div>
            <div className="text-3xl">🌐</div>
          </div>

          {/* Description */}
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            {c.desc}
          </p>

          {/* Extra Details */}
          <div className="text-xs text-muted-foreground mb-5 space-y-1">
            <p>🧠 Focus: {["AI & ML", "Web Dev", "Open Source", "Design", "Cloud"][i % 5]}</p>
            <p>🔥 Activity: {["Highly Active", "Growing Fast", "Weekly Events", "New Launches"][i % 4]}</p>
            <p>💬 Latest Discussion: "{[
              "Optimizing AI pipelines with LangChain",
              "UI challenge: Rebuild Discord with Tailwind",
              "Docker setup for Next.js apps",
              "AI bots for community moderation",
            ][i % 4]}"</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] hover:opacity-90 transition"
            >
              Join Community
            </Button>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Explore More Button */}
    {visibleCommunities < allCommunities.length && (
      <div className="flex justify-center mt-8">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setVisibleCommunities((prev) => prev + 3)}
          className="px-6 py-2 hover:bg-background/70 border border-border rounded-lg"
        >
          Explore More
        </Button>
      </div>
    )}
  </GlassCard>
</TabsContent>

        {/* 🏆 HACKATHONS */}
        <TabsContent value="hackathons" className="space-y-6 mt-6">
          <GlassCard hover className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" /> Upcoming Hackathons
              </h2>
              <Button size="sm" variant="secondary">Submit Idea</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: "AI Innovation Sprint", date: "Nov 20 - Dec 1, 2025", prize: "$5000 + Internship" },
                { name: "Web3 Future Hack", date: "Dec 10 - Dec 20, 2025", prize: "$10,000 + Cloud Credits" },
              ].map((hack, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-2xl border border-border bg-background/50 hover:bg-background/70 transition"
                >
                  <h3 className="font-semibold mb-1">{hack.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{hack.date}</p>
                  <p className="text-sm text-accent font-medium">🏆 {hack.prize}</p>
                  <Button size="sm" className="mt-3 w-full bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]">
                    Join Hackathon
                  </Button>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>

        {/* 💬 LIVE CHAT */}
        <TabsContent value="chat" className="mt-6">
          <GlassCard className="p-6 h-[70vh] flex flex-col">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-accent" /> Global Chatroom
            </h2>

            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl max-w-[70%] ${
                    msg.sender === "You"
                      ? "ml-auto bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white"
                      : "bg-background/60 border border-border text-foreground"
                  }`}
                >
                  <p className="text-xs font-medium mb-1">{msg.sender}</p>
                  <p className="text-sm">{msg.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Say something..."
                className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 ring-primary"
              />
              <Button type="submit" className="bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
