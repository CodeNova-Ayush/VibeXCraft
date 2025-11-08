import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import {
  Heart,
  Share2,
  Users,
  PlusCircle,
  ExternalLink,
} from "lucide-react";

export default function Community() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    user: user?.fullName || user?.username || "You",
    project: "",
    lang: "",
    desc: "",
    likes: 0,
    comments: 0,
    image: "🆕",
    tag: "General",
  });

  // ✅ FIX: Add missing visiblePosts and visibleCommunities states
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [visibleCommunities, setVisibleCommunities] = useState(6);

  // 🧠 FEED POSTS
  const initialPosts = [
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

  // Load posts from localStorage and merge with initial posts
  const [posts, setPosts] = useState(initialPosts);
  const [likesMap, setLikesMap] = useState<Record<number, number>>({});
  
  useEffect(() => {
    try {
      // Load posted projects from localStorage
      const savedPosts = JSON.parse(localStorage.getItem('community_posts') || '[]');
      
      // Transform saved posts to match the format
      const transformedPosts = savedPosts.map((post: any) => ({
        user: post.user || "Anonymous",
        project: post.project || "",
        lang: post.lang || "Other",
        desc: post.desc || "",
        likes: post.likes || 0,
        comments: post.comments || 0,
        image: post.image || "🆕",
        tag: post.tag || "General",
        projectLink: post.projectLink,
        timestamp: post.timestamp,
      }));
      
      // Merge with initial posts and sort by timestamp (newest first)
      const allPosts = [...transformedPosts, ...initialPosts].sort((a, b) => {
        if (a.timestamp && b.timestamp) {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        }
        if (a.timestamp) return -1;
        if (b.timestamp) return 1;
        return 0;
      });
      
      setPosts(allPosts);
      setLikesMap(Object.fromEntries(allPosts.map((p, i) => [i, p.likes])));
    } catch (error) {
      console.error("Error loading posts:", error);
      setPosts(initialPosts);
      setLikesMap(Object.fromEntries(initialPosts.map((p, i) => [i, p.likes])));
    }
  }, []);

  // 🌍 COMMUNITY CARDS
  const allCommunities = [
    { name: "AI Builders Hub", members: "4.2k", desc: "Collaborate on AI-powered projects & research.", link: "https://discord.gg/aibuilders" },
    { name: "Open Source Coders", members: "6.1k", desc: "Contribute, fork, and push open innovation.", link: "https://discord.gg/opensource" },
    { name: "UI/UX Visionaries", members: "2.8k", desc: "Design-first developers making beautiful apps.", link: "https://discord.gg/uiux" },
    { name: "Next.js Wizards", members: "3.9k", desc: "Full-stack devs building for the web of tomorrow.", link: "https://discord.gg/nextjs" },
    { name: "Hackathon Heroes", members: "1.5k", desc: "Compete, create, and win with fellow devs.", link: "https://discord.gg/hackathon" },
    { name: "Cloud Native Crew", members: "2.3k", desc: "Kubernetes, Docker, and scalable architectures.", link: "https://discord.gg/cloudnative" },
    { name: "Mobile Mavericks", members: "3.1k", desc: "Cross-platform mobile apps with React Native.", link: "https://discord.gg/mobile" },
    { name: "Cyber Sentinels", members: "1.9k", desc: "Ethical hackers, pen testers, and security experts.", link: "https://discord.gg/cybersecurity" },
    { name: "Game Dev Galaxy", members: "2.5k", desc: "3D, Unreal, and Unity creators sharing their worlds.", link: "https://discord.gg/gamedev" },
  ];

  const handleLike = (index: number) => {
    setLikesMap((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
  };

  const handleShare = async (post: (typeof posts)[number]) => {
    const shareData = {
      title: `${post.project} by ${post.user}`,
      text: post.desc,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.title} - ${shareData.url}`);
        // no toast system here; rely on UX change
      }
    } catch {}
  };

  const submitNewPost = () => {
    if (!newPost.project.trim() || !newPost.desc.trim()) return;
    
    // Save to localStorage
    const savedPosts = JSON.parse(localStorage.getItem('community_posts') || '[]');
    const postToSave = {
      ...newPost,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      user: user?.fullName || user?.username || "You",
    };
    savedPosts.unshift(postToSave);
    localStorage.setItem('community_posts', JSON.stringify(savedPosts));
    
    // Update state
    setPosts((prev) => [postToSave, ...prev]);
    setLikesMap((prev) => ({ 0: newPost.likes, ...Object.fromEntries(Object.entries(prev).map(([k,v]) => [Number(k)+1, v])) }));
    setShowCreatePost(false);
    setNewPost({ user: user?.fullName || user?.username || "You", project: "", lang: "", desc: "", likes: 0, comments: 0, image: "🆕", tag: "General" });
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

        <Button 
          onClick={() => setShowCreatePost(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] hover:opacity-90 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Create Post
        </Button>
      </div>

      {/* TABS */}
      {showCreatePost && (
        <GlassCard className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Create Post</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              value={newPost.project}
              onChange={(e) => setNewPost({ ...newPost, project: e.target.value })}
              placeholder="Project title"
              className="bg-background/50 border border-border rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 ring-primary"
            />
            <input
              value={newPost.lang}
              onChange={(e) => setNewPost({ ...newPost, lang: e.target.value })}
              placeholder="Tech / Language"
              className="bg-background/50 border border-border rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 ring-primary"
            />
          </div>
          <textarea
            value={newPost.desc}
            onChange={(e) => setNewPost({ ...newPost, desc: e.target.value })}
            placeholder="Describe your build..."
            className="w-full min-h-24 bg-background/50 border border-border rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 ring-primary"
          />
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setShowCreatePost(false)}>Cancel</Button>
            <Button className="bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF]" onClick={submitNewPost}>Post</Button>
          </div>
        </GlassCard>
      )}

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="bg-card/50 border border-border backdrop-blur-lg rounded-xl">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
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
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(i);
                          }} 
                          className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition active:scale-95"
                        >
                          <Heart className={`w-5 h-5 ${(likesMap[i] ?? post.likes) > post.likes ? 'fill-red-500 text-red-500' : ''}`} /> 
                          {likesMap[i] ?? post.likes}
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(post);
                          }} 
                          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition active:scale-95"
                        >
                          <Share2 className="w-5 h-5" /> Share
                        </button>
                        {(post as any).projectLink && (
                          <a
                            href={(post as any).projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4" /> View Project
                          </a>
                        )}
                      </div>
                      <Button
                        onClick={() => navigate("/ai/workspace")}
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
              onClick={() => c.link ? window.open(c.link, '_blank') : navigate('/ai/community')}
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
      </Tabs>
      <Footer />
    </motion.div>
  );
}
