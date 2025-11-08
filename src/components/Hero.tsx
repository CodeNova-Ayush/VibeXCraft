import React from "react";
import { useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import { assets } from "../assets/assets";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { isSignedIn, isLoaded } = useUser();

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate("/ai/dashboard");
    } else {
      openSignIn({
        afterSignInUrl: "/ai/dashboard",
        afterSignUpUrl: "/ai/dashboard",
      });
    }
  };

  if (!isLoaded) return null;

  return (
    <section
      className="
        relative min-h-screen flex flex-col justify-center items-center text-center
        bg-[hsl(var(--background))] text-foreground overflow-hidden
        px-6 sm:px-20 xl:px-32
      "
    >
      {/* Neon Glow Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(147,51,234,0.06)_0%,transparent_75%)]" />

      <div className="relative z-10 mt-24">
        <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight">
          Build, Create & Innovate <br />
          with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-cyan))]">
            VibeXCraft AI
          </span>
        </h1>

        <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
          The all-in-one AI-powered workspace for creators, developers, and innovators.
          Generate, design, and automate your ideas — all in one intelligent platform.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-cyan))]
                       text-white font-semibold px-8 py-3 rounded-full 
                       hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]
                       hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {isSignedIn ? "Go to Dashboard" : "Start Creating"}
          </button>

          
        </div>
      </div>

      {/* Trusted Section */}
      <div className="relative z-10 mt-16 flex items-center gap-4 text-sm text-muted-foreground">
        <img src={assets.user_group} alt="Users" className="h-8 opacity-90" />
        <span>
          Trusted by <span className="text-[hsl(var(--neon-cyan))] font-medium">10k+</span> creators worldwide
        </span>
      </div>
    </section>
  );
};

export default Hero;
