import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  HelpCircle,
  LifeBuoy,
  BookOpen,
  Send,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";

const FAQS = [
  {
    q: "How can I create a new AI project?",
    a: "Go to the Launch Center → ‘New Project’. Choose your stack (React, Node, etc.) and your workspace will initialize automatically with AI setup.",
  },
  {
    q: "Can I collaborate with teammates?",
    a: "Yes! You can invite others into your coding room using your workspace share link — all changes are synced live with AI Copilot assistance.",
  },
  {
    q: "Where can I find my previous projects?",
    a: "Navigate to ‘Projects’ from the top navigation bar — all saved and synced repositories appear there with their AI metadata.",
  },
  {
    q: "How do I connect GitHub or external repos?",
    a: "Go to Settings → Integrations → GitHub Sync. You can authorize and connect your GitHub account to pull or push code directly.",
  },
  {
    q: "Can AI copilots work offline?",
    a: "No — AI copilots require cloud access for real-time model inference, but you can use cached suggestions while disconnected.",
  },
];

const Query: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi 👋 I'm VibeX Support Bot. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse =
        "I’ve noted your query — one of our team members will get back to you soon!";
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    }, 1000);
  };

  return (
    <section className="min-h-screen bg-background text-foreground px-6 sm:px-20 xl:px-32 py-20 relative overflow-hidden">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#9B5CF5]/20 to-[#00E0FF]/20 px-4 py-2 rounded-full text-sm text-primary mb-3">
          <LifeBuoy className="w-4 h-4" /> Need Help?
        </div>
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] bg-clip-text text-transparent">
          VibeXCraft Support Center
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
          Find answers, get help, or connect directly with our team.
        </p>
      </motion.div>

      {/* SUPPORT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: "AI Helpdesk",
            desc: "Chat instantly with our AI-powered assistant for quick troubleshooting.",
            icon: MessageCircle,
            color: "from-[#9B5CF5]/30 to-[#00E0FF]/30",
          },
          {
            title: "Knowledge Base",
            desc: "Browse tutorials, articles, and developer documentation.",
            icon: BookOpen,
            color: "from-[#00E0FF]/30 to-[#22D3EE]/30",
          },
          {
            title: "Email Support",
            desc: "Need personal help? Email us directly at support@vibexcraft.ai.",
            icon: Mail,
            color: "from-[#9333EA]/30 to-[#00E0FF]/30",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`p-8 rounded-3xl bg-gradient-to-br ${card.color} border border-white/10 backdrop-blur-xl shadow-[0_0_25px_rgba(0,224,255,0.1)] transition-all`}
          >
            <card.icon className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-semibold text-xl mb-2">{card.title}</h3>
            <p className="text-sm text-muted-foreground">{card.desc}</p>
            <button className="mt-5 flex items-center text-sm font-medium text-primary hover:underline">
              Learn more <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* FAQ SECTION */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-5">
          {FAQS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-card/70 border border-border shadow-glow-cyan hover:shadow-glow-purple transition-all"
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">{item.q}</h3>
                  <p className="text-muted-foreground text-sm">{item.a}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CONTACT FORM */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center bg-card/70 border border-border rounded-3xl p-10 shadow-glow-purple"
      >
        <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-3">Still need help?</h2>
        <p className="text-muted-foreground mb-6">
          Send us a message — our team usually replies within a few hours.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Your query has been submitted! Our team will reach out soon.");
          }}
          className="space-y-4 text-left"
        >
          <div>
            <label className="block text-sm mb-1">Your Name</label>
            <input
              type="text"
              required
              className="w-full rounded-lg bg-background/50 border border-border px-4 py-2 text-sm focus:ring-2 ring-primary outline-none"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full rounded-lg bg-background/50 border border-border px-4 py-2 text-sm focus:ring-2 ring-primary outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Your Message</label>
            <textarea
              required
              rows={4}
              className="w-full rounded-lg bg-background/50 border border-border px-4 py-2 text-sm focus:ring-2 ring-primary outline-none resize-none"
              placeholder="Describe your issue or question..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white py-3 rounded-lg text-sm font-medium hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            Send Message <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-xs text-muted-foreground mt-4">
          Or reach us directly at{" "}
          <span className="text-primary">support@vibexcraft.ai</span>
        </p>
      </motion.div>

      {/* 💬 Floating AI Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChatOpen(true)}
            className="p-4 rounded-full bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white shadow-lg hover:shadow-[0_0_20px_rgba(155,92,245,0.4)] transition-all"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-80 bg-[#0E0E0E]/95 border border-white/10 rounded-2xl shadow-xl backdrop-blur-xl p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg text-white">AI Support</h3>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 transition"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 mb-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-xl text-sm ${
                    msg.sender === "ai"
                      ? "bg-[#1a1a1a] text-white/90 self-start"
                      : "bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white self-end"
                  } max-w-[85%]`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 bg-[#121212]/80 text-sm rounded-lg px-3 py-2 outline-none text-white border border-white/10"
              />
              <button
                type="submit"
                className="px-3 rounded-lg bg-gradient-to-r from-[#9B5CF5] to-[#00E0FF] text-white text-sm font-medium"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Query;
