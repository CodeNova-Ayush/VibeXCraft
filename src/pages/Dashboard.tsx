// src/pages/Dashboard.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Code,
  Video,
  Users,
  Rocket,
  Brain,
  BarChart3,
  Wand2,
  Zap,
  FolderGit2,
  Globe,
  ChartPie,
  Terminal,
  Sparkles,
  Layers,
  Activity,
  GitBranch,
  FilePlus,
  MessageSquare,
  Play,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ChevronLeft, ChevronRight } from "lucide-react"; 

/**
 * VibeXCraft Dashboard
 * - a large single-file UI that demonstrates hero slider, launch center,
 *   copilot showcase, workspace preview, community & projects, analytics,
 *   and feature overview. Meant to be visually rich and app-like.
 *
 * Notes:
 * - Requires: framer-motion, lucide-react, tailwind configured with your theme.
 * - Replace navigate() routes with your real routes.
 */

type Slide = {
  id: number;
  title: string;
  desc: string;
  icon: any;
  gradient: string;
  button: string;
};

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "Automate the Boring, Amplify the Brilliant ⚡",
    desc: "Your workplace for AI-assisted coding, design, and collaboration.",
    icon: Bot,
    gradient: "from-[#9B5CF5] via-[#6D28D9] to-[#00E0FF]",
    button: "Explore Workspace",
  },
  {
    id: 2,
    title: "Code Together in Real-Time",
    desc: "Collaborate, chat, and deploy instantly with a Judge0-powered IDE.",
    icon: Code,
    gradient: "from-[#00E0FF] via-[#2563EB] to-[#9333EA]",
    button: "Start a Coding Room",
  },
  {
    id: 3,
    title: "AI Copilots — Your New Teammates",
    desc: "From code to meetings — copilots that actually help you ship.",
    icon: Brain,
    gradient: "from-[#9333EA] via-[#7C3AED] to-[#00E0FF]",
    button: "Meet Copilots",
  },
  {
    id: 4,
    title: "Launch, Share, Repeat",
    desc: "Post projects, find collaborators and deploy with a click.",
    icon: FolderGit2,
    gradient: "from-[#EC4899] via-[#8B5CF6] to-[#00E0FF]",
    button: "Post a Project",
  },
  {
    id: 5,
    title: "Vibe Mode — Focus & Flow",
    desc: "Turn on neon visuals, ambient audio, and flow-state helpers.",
    icon: Wand2,
    gradient: "from-[#7C3AED] via-[#9B5CF5] to-[#00E0FF]",
    button: "Activate Vibe Mode",
  },
  {
    id: 6,
    title: "Explore Trending Repos & Challenges",
    desc: "Discover open-source gems and community hackathons.",
    icon: Rocket,
    gradient: "from-[#00E0FF] via-[#4ADE80] to-[#22D3EE]",
    button: "Explore Repos",
  },
];

const QUICK_ACTIONS = [
  {
    title: "Start New Project",
    desc: "Scaffold a project with templates or AI-generated starter code.",
    icon: Rocket,
    route: "/projects/new",
    gradient: "from-[#9B5CF5]/10 to-[#00E0FF]/10",
  },
  {
    title: "Create Post",
    desc: "Share progress, ask for collaborators, or announce demos.",
    icon: FilePlus,
    route: "/community/new",
    gradient: "from-[#00E0FF]/10 to-[#9333EA]/10",
  },
  {
    title: "Start Coding Room",
    desc: "Host or join a real-time coding room with video and AI help.",
    icon: Code,
    route: "/rooms",
    gradient: "from-[#9333EA]/10 to-[#9B5CF5]/10",
  },
  {
    title: "Explore Community",
    desc: "Trending posts, discussions, and collaborator matching.",
    icon: Users,
    route: "/community",
    gradient: "from-[#00E0FF]/10 to-[#9B5CF5]/10",
  },
  {
    title: "Trending Repos",
    desc: "Discover and fork top open-source projects.",
    icon: GitBranch,
    route: "/explore/repos",
    gradient: "from-[#9B5CF5]/10 to-[#2563EB]/10",
  },
  {
    title: "AI Assist",
    desc: "Ask the AI Advisor for stack help, roadmap, or README templates.",
    icon: Zap,
    route: "/ai/advisor",
    gradient: "from-[#00E0FF]/10 to-[#9333EA]/10",
  },
];

const COPILOTS = [
  {
    name: "Code Copilot",
    desc: "Writes, debugs, and explains code inline.",
    icon: Code,
    accent: "bg-gradient-to-br from-[#1F1B6B] to-[#5C33FF]",
  },
  {
    name: "Meeting Copilot",
    desc: "Records, summarizes and generates action items.",
    icon: Video,
    accent: "bg-gradient-to-br from-[#022B3A] to-[#00E0FF]",
  },
  {
    name: "Tutor Copilot",
    desc: "Teaches concepts and generates practice tasks.",
    icon: Brain,
    accent: "bg-gradient-to-br from-[#2E1F4A] to-[#9B5CF5]",
  },
  {
    name: "Design Copilot",
    desc: "Suggests UI tweaks, color harmony and CSS snippets.",
    icon: Wand2,
    accent: "bg-gradient-to-br from-[#0B3B2E] to-[#22D3EE]",
  },
  {
    name: "Workflow Copilot",
    desc: "Plans sprints and auto-generates Kanban boards.",
    icon: Sparkles,
    accent: "bg-gradient-to-br from-[#2B2A4A] to-[#7C3AED]",
  },
];

const MOCK_PROJECTS = [
  {
    name: "VibeXCraft-Core",
    desc: "AI orchestration engine for copilots and workflows.",
    lang: "TypeScript",
    stars: 2380,
    updated: "2 hours ago",
  },
  {
    name: "AI-Copilot-Engine",
    desc: "Agent-based code generation and auto-review pipelines.",
    lang: "Python",
    stars: 1740,
    updated: "1 day ago",
  },
  {
    name: "Community-Platform",
    desc: "Social features for creators with live rooms and challenges.",
    lang: "React",
    stars: 940,
    updated: "3 days ago",
  },
  {
    name: "Judge0-Bridge",
    desc: "Judge0 integration and live execution adapters.",
    lang: "Go",
    stars: 612,
    updated: "1 week ago",
  },
  {
    name: "Vibe-UI-Kit",
    desc: "Design system and UI primitives used across the web app.",
    lang: "Tailwind",
    stars: 2040,
    updated: "4 days ago",
  },
];

const FEATURES_FULL = [
  {
    heading: "Human + AI Co-Creation",
    points: [
      "Idea Composer: natural language to project scaffolding.",
      "AI Design Companion: wireframes → code snippets.",
      "Smart Templates: Next.js / Replit starters.",
    ],
  },
  {
    heading: "Autonomous Agent Execution",
    points: [
      "Planner & Developer agents — automate code tasks.",
      "Reviewer agents run tests and auto-fix simple issues.",
      "Reporter agents create docs, readmes and demos.",
    ],
  },
  {
    heading: "Realtime Workspace & Integrations",
    points: [
      "Judge0 IDE embedded for live execution.",
      "GitHub / Replit sync with PR automation.",
      "Supabase realtime + file backups.",
    ],
  },
  {
    heading: "Collaboration & Community",
    points: [
      "Live coding rooms with video/voice and shared terminal.",
      "Project showcase, forks, and hackathons.",
      "AI Collab Matcher — find collaborators by skill.",
    ],
  },
  {
    heading: "Analytics & Safety",
    points: [
      "Vibe Score, Focus Rate, Team health dashboards.",
      "Sandboxed execution, whitelists, and audit logs.",
      "Role-based access and enterprise controls.",
    ],
  },
];



const Dashboard: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();
  const slideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const start = () => {
      if (slideTimerRef.current) window.clearInterval(slideTimerRef.current);
      slideTimerRef.current = window.setInterval(() => {
        setSlideIndex((s) => (s + 1) % SLIDES.length);
      }, 4500) as unknown as number;
    };

    if (!paused) start();
    return () => {
      if (slideTimerRef.current) {
        window.clearInterval(slideTimerRef.current);
      }
    };
  }, [paused]);

  // handlers
  const handleCTA = (route: string) => {
    // In a demo, navigate or just console
    if (route.startsWith("/")) navigate(route);
    else console.log("CTA:", route);
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* top bar small (optional) */}
      

      <main className="pt-10">
        {/* HERO SECTION */}


<section
  onMouseEnter={() => setPaused(true)}
  onMouseLeave={() => setPaused(false)}
  className="relative mx-6 sm:mx-10 lg:mx-20 mt-6 mb-16 rounded-3xl overflow-hidden"
>
  <AnimatePresence mode="wait">
    <motion.div
      key={SLIDES[slideIndex].id}
      initial={{ opacity: 0, y: 20, scale: 1.02 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className={`relative min-h-[62vh] flex items-center justify-center text-center px-6 sm:px-12 lg:px-24 bg-gradient-to-br ${SLIDES[slideIndex].gradient}`}
    >
      {/* subtle shapes */}
      <div className="absolute left-0 top-0 bottom-0 w-1/4 pointer-events-none opacity-10 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.2),transparent)]" />
      <div className="absolute right-0 top-0 bottom-0 w-1/4 pointer-events-none opacity-10 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02),transparent)]" />

      <div className="relative z-10 max-w-5xl">
        <div className="flex flex-col items-center gap-4">
          <div className="p-2 rounded-xl bg-white/10 inline-flex items-center justify-center">
            {React.createElement(SLIDES[slideIndex].icon, {
              className: "w-12 h-12 text-white",
            })}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
            {SLIDES[slideIndex].title}
          </h1>

          <p className="text-white/90 max-w-3xl mx-auto mt-2 text-base sm:text-lg">
            {SLIDES[slideIndex].desc}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={() => handleCTA(SLIDES[slideIndex].button)}
              className="px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20 backdrop-blur hover:bg-white/20"
            >
              {SLIDES[slideIndex].button}
            </motion.button>
          </div>
        </div>

        {/* slide indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSlideIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === slideIndex ? "bg-white" : "bg-white/30"
              }`}
              aria-label={`slide-${i}`}
            />
          ))}
        </div>
      </div>

      {/* ⬅️ Left Arrow */}
      <motion.button
        whileHover={{ scale: 1.1, x: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() =>
          setSlideIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))
        }
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 rounded-full p-3 backdrop-blur-md hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </motion.button>

      {/* ➡️ Right Arrow */}
      <motion.button
        whileHover={{ scale: 1.1, x: 2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSlideIndex((s) => (s + 1) % SLIDES.length)}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 rounded-full p-3 backdrop-blur-md hover:bg-white/20 transition-all"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </motion.button>
    </motion.div>
  </AnimatePresence>

  {/* particle overlay */}
  <div className="pointer-events-none absolute inset-0">
    {[...Array(20)].map((_, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0], y: [-10, -60, -10] }}
        transition={{
          duration: 6 + (i % 5),
          repeat: Infinity,
          delay: i * 0.3,
        }}
        style={{
          left: `${(i * 13) % 100}%`,
          top: `${(i * 7) % 100}%`,
        }}
        className="absolute w-[6px] h-[6px] rounded-full bg-white/30"
      />
    ))}
  </div>
</section>


      <section className="mx-6 sm:mx-10 lg:mx-20 mb-24">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] bg-clip-text text-transparent">
          Launch Center 🚀
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Quickly start projects, host rooms, post updates, or ask your AI advisor —
          all from one futuristic hub.
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {QUICK_ACTIONS.map((a, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.04, y: -6 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleCTA(a.route)}
            className="relative group p-7 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0D0D0D]/80 to-[#1A1A1A]/70 backdrop-blur-xl cursor-pointer overflow-hidden shadow-[0_0_25px_rgba(0,224,255,0.05)] hover:shadow-[0_0_40px_rgba(155,92,245,0.25)] transition-all"
            title={a.title}
          >
            {/* Glow border on hover */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#9B5CF5]/40 transition-all duration-500"></div>

            {/* Light sweep animation */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-[#00E0FF]/10 to-transparent animate-[shine_2.5s_infinite]"></div>
            </div>

            {/* Content */}
            <div className="flex items-start gap-5 relative z-10">
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 6, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9B5CF5]/20 to-[#00E0FF]/10 border border-white/10 flex items-center justify-center shadow-inner shadow-[#9B5CF5]/20"
              >
                {React.createElement(a.icon, {
                  className:
                    "w-8 h-8 text-[#00E0FF] group-hover:text-[#9B5CF5] transition-colors duration-300",
                })}
              </motion.div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1 group-hover:text-[#00E0FF] transition-colors">
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {a.desc}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 rounded-md text-sm font-medium text-white bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] shadow-lg hover:shadow-[0_0_15px_rgba(155,92,245,0.4)] transition-all"
                  >
                    Open
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 rounded-md text-sm border border-white/10 text-muted-foreground bg-[#121212]/60 hover:bg-[#1A1A1A] transition-all"
                  >
                    Demo
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>




<section className="px-6 sm:px-20 xl:px-32 mb-32 text-foreground overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold mb-1 bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] bg-clip-text text-transparent">
            AI Copilot Suite 🤖
          </h2>
          <p className="text-muted-foreground">
            Activate specialized copilots for code, meetings, design, and learning.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md border border-border text-muted-foreground hover:bg-white/5 transition">
            Manage Copilots
          </button>
          <button className="px-4 py-2 rounded-md bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white font-medium hover:scale-105 transition">
            Add New
          </button>
        </div>
      </div>

      {/* Infinite Scroll Animation */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          {[...COPILOTS, ...COPILOTS].map((c, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
className={`snap-center min-w-[300px] p-6 rounded-2xl bg-gradient-to-br ${c.accent} border border-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(155,92,245,0.2)] hover:shadow-[0_0_35px_rgba(0,224,255,0.25)] transition-all relative`}
            >
              {/* Glow Line Top */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] opacity-30 rounded-t-2xl"></div>

              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9B5CF5] to-[#00E0FF] flex items-center justify-center text-white text-2xl shadow-lg">
                  {React.createElement(c.icon, { className: "w-6 h-6" })}
                </div>
                <h3 className="font-semibold text-lg">{c.name}</h3>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {c.desc}
              </p>

              {/* Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 rounded-md bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white text-sm font-medium hover:scale-105 transition">
                  Activate
                </button>
                <button className="flex-1 px-4 py-2 rounded-md bg-[#181818]/80 border border-white/10 text-muted-foreground text-sm hover:bg-[#222] transition">
                  Customize
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background via-background/60 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background via-background/60 to-transparent pointer-events-none"></div>
      </div>
    </section>





        {/* 💻 WORKSPACE PREVIEW SECTION */}
<section className="px-6 sm:px-20 xl:px-32 mb-28">
  <h2 className="text-4xl font-bold text-center mb-10">
    Your AI Workspaces 💻
  </h2>
  <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">
    Create, test, and deploy directly in your browser — powered by AI, Judge0, and
    real-time collaboration. Swipe through to explore your active projects.
  </p>

  {/* 🔥 Horizontal slider */}
  <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
    {[
      {
        title: "Frontend IDE",
        desc: "Collaborative React + Tailwind coding powered by AI Copilot.",
        code: `import React from "react";
function App() {
  return <div className="text-purple-400">Hello VibeXCraft Frontend!</div>;
}
export default App;`,
      },
      {
        title: "Backend Server",
        desc: "Run Node.js APIs with live Judge0 execution and AI debugging.",
        code: `import express from "express";
const app = express();
app.get("/", (_, res) => res.send("API up and running ⚡"));
app.listen(4000);`,
      },
      {
        title: "AI Copilot Logic",
        desc: "Core copilot intelligence for code review and refactoring.",
        code: `export const analyzeCode = (snippet) => {
  return "AI suggests refactoring this loop with map()";
};`,
      },
      {
        title: "UI Playground",
        desc: "Test animations, layouts, and dynamic UIs in real time.",
        code: `import { motion } from "framer-motion";
export default function Box() {
  return <motion.div whileHover={{ scale: 1.2 }}>Hover me 🚀</motion.div>;
}`,
      },
    ].map((workspace, i) => (
      <motion.div
        key={i}
        whileHover={{ y: -8 }}
        className="snap-center min-w-[600px] max-w-[650px] rounded-3xl bg-gradient-to-br from-[#0d0d0d] to-[#111827] border border-white/10 shadow-glow-purple p-8 flex flex-col justify-between text-white/90 backdrop-blur-xl"
      >
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-1">{workspace.title}</h3>
          <p className="text-sm text-white/60">{workspace.desc}</p>
        </div>

        {/* Code preview block */}
        <div className="bg-[#0f0f0f] rounded-2xl p-6 font-mono text-sm text-white/90 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">›</span>
              <div>
                <p className="text-xs text-white/70">Workspace</p>
                <p className="text-xs text-white/40">
                  {workspace.title} • main
                </p>
              </div>
            </div>
          </div>
          <pre className="overflow-x-auto leading-relaxed whitespace-pre">
            {workspace.code}
          </pre>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-white/40">Last run: {12 + i * 4}s ago</p>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-md bg-[#9B5CF5] text-sm font-medium text-white hover:bg-[#7C3AED]/80 transition-all">
                Run
              </button>
              <button className="px-4 py-1.5 rounded-md bg-[#1f1f1f] text-sm font-medium text-white/70 border border-white/10 hover:bg-[#2b2b2b]">
                Open
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>

        {/* 🌐 COMMUNITY & PROJECTS SECTION */}
<section className="px-6 sm:px-20 xl:px-32 mb-32">
  {/* PROJECTS GRID */}
  <div className="mb-24">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-4xl font-bold mb-1 bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] bg-clip-text text-transparent">
          Projects 🚀
        </h2>
        <p className="text-muted-foreground">
          Explore open-source projects, AI copilots, and community builds.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 rounded-md border border-border text-muted-foreground hover:bg-white/5 transition">
          Explore
        </button>
        <button className="px-4 py-2 rounded-md bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white font-medium hover:scale-105 transition">
          Create
        </button>
      </div>
    </div>

    {/* Project Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          name: "VibeXCraft-Core",
          lang: "TypeScript",
          desc: "AI orchestration engine for copilots and workflows.",
          stars: "2.3k",
          updated: "2 hours ago",
        },
        {
          name: "AI-Copilot-Engine",
          lang: "Python",
          desc: "Agent-based code generation and auto-review pipelines.",
          stars: "1.7k",
          updated: "1 day ago",
        },
        {
          name: "Community-Platform",
          lang: "React",
          desc: "Social features for creators with live rooms and challenges.",
          stars: "940",
          updated: "3 days ago",
        },
        {
          name: "Judge0-Bridge",
          lang: "Go",
          desc: "Judge0 integration and live execution adapters.",
          stars: "612",
          updated: "1 week ago",
        },
        {
          name: "Vibe-UI-Kit",
          lang: "Tailwind",
          desc: "Design system and UI primitives used across the web app.",
          stars: "2.0k",
          updated: "4 days ago",
        },
        {
          name: "AI-Analytics-Dashboard",
          lang: "Next.js",
          desc: "Real-time dashboard that visualizes AI task performance and usage.",
          stars: "1.3k",
          updated: "5 days ago",
        },
      ].map((p, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-3xl bg-[#0d0d0d]/80 border border-white/10 shadow-[0_0_15px_rgba(0,224,255,0.15)] hover:shadow-[0_0_35px_rgba(155,92,245,0.25)] hover:border-[#00E0FF]/30 transition-all backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <div className="text-sm text-muted-foreground text-right">
              <p>{p.lang}</p>
              <p>{p.stars} ★</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            {p.desc}
          </p>

          {/* Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button className="px-4 py-1.5 rounded-md bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white text-sm hover:scale-105 transition">
              Open
            </button>
            <button className="px-4 py-1.5 rounded-md bg-[#181818] border border-white/10 text-muted-foreground text-sm hover:bg-[#1E1E1E] transition">
              Fork
            </button>
            <button className="px-4 py-1.5 rounded-md bg-[#181818] border border-white/10 text-muted-foreground text-sm hover:bg-[#1E1E1E] transition">
              AI Review
            </button>
          </div>

          {/* Footer */}
          <p className="text-xs text-muted-foreground mt-4">
            Updated {p.updated}
          </p>
        </motion.div>
      ))}
    </div>

    {/* Explore More Button */}
    <div className="flex justify-center mt-12">
      <motion.button
        whileHover={{ scale: 1.08 }}
        className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white font-medium shadow-[0_0_25px_rgba(155,92,245,0.4)] hover:shadow-[0_0_35px_rgba(0,224,255,0.3)] transition-all"
      >
        Explore More Projects →
      </motion.button>
    </div>
  </div>



  {/* COMMUNITIES CAROUSEL */}
  {/* 🌍 COMMUNITIES SECTION (Auto Scrolling) */}
<section className="px-6 sm:px-20 xl:px-32 mb-32 text-foreground overflow-hidden">
  {/* Header */}
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2 className="text-4xl font-bold mb-1 bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] bg-clip-text text-transparent">
        Communities 🌍
      </h2>
      <p className="text-muted-foreground">
        Join collaborative circles, hackathons, and creative coding tribes.
      </p>
    </div>
    <button className="px-4 py-2 rounded-md bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white font-medium hover:scale-105 transition">
      View All
    </button>
  </div>

  {/* Infinite Scroll Animation */}
  <div className="relative w-full overflow-hidden">
    <motion.div
      className="flex gap-8"
      animate={{ x: ["0%", "-50%"] }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: 28, // controls speed — higher = slower
      }}
    >
      {[...[
        {
          name: "AI Builders Hub",
          desc: "Collaborate on AI-powered projects & participate in weekly sprints.",
          members: "4.5k",
          color: "from-[#9B5CF5]/30 to-[#00E0FF]/30",
        },
        {
          name: "Open Source Coders",
          desc: "Contribute, fork, and discuss open-source initiatives worldwide.",
          members: "6.8k",
          color: "from-[#00E0FF]/30 to-[#22D3EE]/30",
        },
        {
          name: "Hackathon Central",
          desc: "Weekly hackathons with real prizes, mentors & community builds.",
          members: "2.2k",
          color: "from-[#9333EA]/30 to-[#00E0FF]/30",
        },
        {
          name: "Designers & Devs",
          desc: "Where design meets development — prototypes, feedback, collabs.",
          members: "3.4k",
          color: "from-[#EC4899]/30 to-[#00E0FF]/30",
        },
        {
          name: "Future Founders",
          desc: "Entrepreneurs & coders turning side projects into startups.",
          members: "1.8k",
          color: "from-[#00E0FF]/30 to-[#7C3AED]/30",
        },
        {
          name: "Data Science Tribe",
          desc: "AI, ML, and data visualization enthusiasts building smarter tools.",
          members: "2.9k",
          color: "from-[#7C3AED]/30 to-[#00E0FF]/30",
        },
      ], ...[
        // Duplicate for seamless loop
        {
          name: "AI Builders Hub",
          desc: "Collaborate on AI-powered projects & participate in weekly sprints.",
          members: "4.5k",
          color: "from-[#9B5CF5]/30 to-[#00E0FF]/30",
        },
        {
          name: "Open Source Coders",
          desc: "Contribute, fork, and discuss open-source initiatives worldwide.",
          members: "6.8k",
          color: "from-[#00E0FF]/30 to-[#22D3EE]/30",
        },
        {
          name: "Hackathon Central",
          desc: "Weekly hackathons with real prizes, mentors & community builds.",
          members: "2.2k",
          color: "from-[#9333EA]/30 to-[#00E0FF]/30",
        },
        {
          name: "Designers & Devs",
          desc: "Where design meets development — prototypes, feedback, collabs.",
          members: "3.4k",
          color: "from-[#EC4899]/30 to-[#00E0FF]/30",
        },
        {
          name: "Future Founders",
          desc: "Entrepreneurs & coders turning side projects into startups.",
          members: "1.8k",
          color: "from-[#00E0FF]/30 to-[#7C3AED]/30",
        },
        {
          name: "Data Science Tribe",
          desc: "AI, ML, and data visualization enthusiasts building smarter tools.",
          members: "2.9k",
          color: "from-[#7C3AED]/30 to-[#00E0FF]/30",
        },
      ]].map((c, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.3 }}
          className={`snap-center min-w-[340px] p-6 rounded-3xl bg-gradient-to-br ${c.color} border border-white/10 shadow-[0_0_25px_rgba(155,92,245,0.2)] backdrop-blur-lg hover:shadow-[0_0_35px_rgba(0,224,255,0.3)] transition-all`}
        >
          {/* Avatar + Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9B5CF5] to-[#00E0FF] flex items-center justify-center text-white text-lg font-bold shadow-lg">
              {c.name[0]}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <p className="text-xs text-muted-foreground">
                {c.members} members
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {c.desc}
          </p>

          {/* Buttons */}
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-md bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white text-sm hover:scale-105 transition">
              Join
            </button>
            <button className="px-4 py-2 rounded-md bg-[#181818] border border-white/10 text-muted-foreground text-sm hover:bg-[#1E1E1E] transition">
              View Feed
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>

    {/* Gradient Fade Edges */}
    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background via-background/70 to-transparent pointer-events-none"></div>
    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background via-background/70 to-transparent pointer-events-none"></div>
  </div>


</section>
</section>




      {/* ⚡ Analytics & Vibe Score (Circular UI) */}
<section className="mx-6 sm:mx-10 lg:mx-20 mb-24 text-foreground">
  <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
    Analytics & Vibe Score 📊
  </h2>
  <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
    Get visual insights into your productivity, focus, and coding patterns — all tracked by your AI copilots.
  </p>

  <div className="flex flex-wrap justify-center gap-10">
    {/* 🔵 Vibe Score */}
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="relative w-56 h-56 rounded-full border-4 border-[#9B5CF5]/50 bg-gradient-to-br from-[#9B5CF5]/20 to-[#00E0FF]/10 shadow-[0_0_35px_rgba(155,92,245,0.3)] flex flex-col justify-center items-center text-center backdrop-blur-xl transition-all"
    >
      <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-[#9B5CF5]/50 animate-spin-slow"></div>
      <BarChart3 className="w-8 h-8 text-[#9B5CF5] mb-2" />
      <h3 className="text-lg font-semibold">Vibe Score</h3>
      <p className="text-3xl font-bold mt-1 text-white">87 / 100</p>
      <p className="text-xs text-muted-foreground mt-2">
        +18% this week 🚀
      </p>
    </motion.div>

    {/* 🟣 Focus Rate */}
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="relative w-56 h-56 rounded-full border-4 border-[#00E0FF]/40 bg-gradient-to-br from-[#00E0FF]/15 to-[#1E90FF]/10 shadow-[0_0_35px_rgba(0,224,255,0.25)] flex flex-col justify-center items-center text-center backdrop-blur-xl transition-all"
    >
      <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-[#00E0FF]/50 animate-spin-reverse"></div>
      <ChartPie className="w-8 h-8 text-[#00E0FF] mb-2" />
      <h3 className="text-lg font-semibold">Focus Rate</h3>
      <p className="text-3xl font-bold mt-1 text-white">92%</p>
      <p className="text-xs text-muted-foreground mt-2">
        Avg: 6.3h/day 💻
      </p>
    </motion.div>

    {/* 💻 Weekly Coding Time */}
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="relative w-56 h-56 rounded-full border-4 border-[#7C3AED]/40 bg-gradient-to-br from-[#7C3AED]/20 to-[#00E0FF]/10 shadow-[0_0_35px_rgba(124,58,237,0.3)] flex flex-col justify-center items-center text-center backdrop-blur-xl transition-all"
    >
      <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-[#7C3AED]/40 animate-spin-slow"></div>
      <Layers className="w-8 h-8 text-[#7C3AED] mb-2" />
      <h3 className="text-lg font-semibold">Weekly Coding</h3>
      <p className="text-3xl font-bold mt-1 text-white">28h</p>
      <p className="text-xs text-muted-foreground mt-2">
        TS • Python • Go
      </p>
    </motion.div>
  </div>
</section>


        

        {/* CTA */}
        <section className="mx-6 sm:mx-10 lg:mx-20 mb-28">
          <motion.div whileHover={{ scale: 1.02 }} className="p-10 rounded-3xl bg-gradient-to-r from-[#9B5CF5]/20 to-[#00E0FF]/10 border border-border shadow-glow-cyan text-center">
            <h2 className="text-3xl font-bold mb-2">Ready to Craft Brilliance?</h2>
            <p className="text-muted-foreground mb-6">Enter your workspace and let AI amplify your best ideas.</p>
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => handleCTA("/workspace")} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white">Enter Workspace</button>
              <button onClick={() => handleCTA("/signup")} className="px-6 py-3 rounded-xl border border-border text-muted-foreground">Create Account</button>
            </div>
          </motion.div>
        </section>

        {/* footer small */}
        <footer className="mx-6 sm:mx-10 lg:mx-20 py-10 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} VibeXCraft • Built with ❤️ • Demo UI
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
