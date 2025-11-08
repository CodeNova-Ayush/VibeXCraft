import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  LayoutDashboard,
  Folder,
  Bot,
  Users,
  BarChart3,
  Settings,
  Search,
  HelpCircle,
  Github,
  MessageCircle,
  Code,
  Trophy,
  Video,
  PlusCircle,
  Globe,
  Layers,
  Calendar,
} from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement | null>(null);

  // 🔗 All Tools
  const apps = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/ai/dashboard" },
    { name: "Projects", icon: Folder, path: "/ai/projects" },
    { name: "AI Copilot", icon: Bot, path: "/ai/copilot" },
    { name: "Community", icon: Users, path: "/ai/community" },
    { name: "Workspace", icon: Code, path: "/ai/workspace" },
    { name: "Events", icon: Calendar, path: "/ai/events" },
    { name: "Analytics", icon: BarChart3, path: "/ai/analytics" },
    { name: "Profile", icon: Users, path: "/ai/profile" },
    { name: "Settings", icon: Settings, path: "/ai/settings" },
  ];

  // 🔍 Smart Search Navigation
  useEffect(() => {
    if (query.trim().length > 0) {
      const lower = query.toLowerCase();
      const match = apps.find((a) => lower.includes(a.name.toLowerCase()));
      if (match) navigate(match.path);
    }
  }, [query, navigate]);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl bg-gradient-to-r from-[#050510]/70 via-[#0A0A14]/80 to-[#050510]/70 border-b border-border/40 shadow-[0_0_25px_rgba(155,92,245,0.1)]"
    >
      <div className="flex justify-between items-center px-6 sm:px-16 lg:px-24 py-3">
        {/* 🌐 Logo */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#9B5CF5] to-[#00E0FF] shadow-[0_0_12px_rgba(0,224,255,0.4)]">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#9B5CF5] via-[#00E0FF] to-[#9B5CF5] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,224,255,0.4)]">
              VibeXCraft
            </span>
          </motion.div>
        </NavLink>

        {/* 🔐 If user is logged in */}
        {user ? (
          <div className="flex items-center gap-6 w-full justify-end">
            {/* 🔍 Search Bar */}
            <motion.div
              ref={searchRef}
              whileFocus={{ scale: 1.02 }}
              className="flex items-center bg-white/5 hover:bg-white/10 rounded-full px-4 py-1.5 w-full max-w-md border border-white/10 focus-within:ring-2 focus-within:ring-[#00E0FF]/40 transition-all"
            >
              <Search className="w-5 h-5 text-[#00E0FF]/70 mr-2" />
              <input
                type="text"
                placeholder="Search copilots, projects, or tools..."
                className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-white/50"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </motion.div>

            {/* 🔘 Right Icons */}
            <div className="flex items-center gap-3">
              {/* ⚙️ Settings */}
              <button
                onClick={() => navigate("/ai/settings")}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-[#00E0FF] transition-all"
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* ❓Help */}
              <button
                onClick={() => navigate("/ai/query")}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-[#9B5CF5] transition-all"
                aria-label="Help and Support"
              >
                <HelpCircle className="w-5 h-5" />
              </button>

              {/* 🧩 App Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsAppsOpen(!isAppsOpen)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Apps"
                >
                  <div className="grid grid-cols-3 gap-0.5 w-5 h-5">
                    {[...Array(9)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-1 bg-white/80 rounded-full"
                        whileHover={{ scale: 1.3, backgroundColor: "#00E0FF" }}
                      />
                    ))}
                  </div>
                </button>

                {/* 🧠 Animated Dropdown */}
                <AnimatePresence>
                  {isAppsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-80 bg-[#0D0D16]/95 border border-white/10 backdrop-blur-2xl rounded-2xl shadow-[0_0_25px_rgba(0,224,255,0.2)] overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-white/10">
                        <h3 className="text-sm font-semibold text-white/80">
                          Your VibeXCraft Tools
                        </h3>
                      </div>

                      <div className="p-4 grid grid-cols-3 gap-3 max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#00E0FF]/30 scrollbar-track-transparent">
                        {apps.map((app, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.15 }}
                          >
                            <NavLink
                              to={app.path}
                              onClick={() => setIsAppsOpen(false)}
                              className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-[#00E0FF] transition-all text-center"
                            >
                              <app.icon className="w-5 h-5 mb-1" />
                              <span className="text-xs font-medium">
                                {app.name}
                              </span>
                            </NavLink>
                          </motion.div>
                        ))}
                      </div>

                      <div className="border-t border-white/10 text-center p-3">
                        <button
                          onClick={() => navigate("/ai/dashboard")}
                          className="text-xs text-white/50 hover:text-[#00E0FF] transition"
                        >
                          View All Apps →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 👤 User */}
              <div className="ml-2 scale-95 hover:scale-100 transition-all duration-200">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => openSignIn()}
            className="flex items-center gap-2 px-6 py-2.5 text-sm rounded-full font-medium bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white shadow-[0_0_15px_rgba(0,224,255,0.3)] hover:shadow-[0_0_25px_rgba(155,92,245,0.4)] transition-all"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {/* 🔒 Click outside to close */}
      {isAppsOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsAppsOpen(false)}
        ></div>
      )}
    </motion.nav>
  );
};

export default Navbar;
