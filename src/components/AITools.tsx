import React from "react";
import { AiToolsData } from "../assets/assets"; // ✅ import your data array
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import { useUser } from "@clerk/clerk-react"; // optional - used in your app for auth

const AITools: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <section className="py-24 bg-background px-6 sm:px-20 xl:px-32">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-foreground">Powerful AI Tools</h2>
        <p className="text-muted-foreground max-w-lg mx-auto mt-3">
          Everything you need to create, enhance, and optimize your content using
          the power of <span className="text-primary font-medium">VibeXCraft AI</span>.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="flex flex-wrap justify-center gap-6 mt-12">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            onClick={() => navigate(tool.path)}
            className="cursor-pointer bg-card border border-border shadow-glow-cyan 
                       p-8 rounded-2xl max-w-xs text-left transition-all duration-300 
                       hover:-translate-y-2 hover:shadow-glow-purple"
          >
            {/* Tool Icon */}
            <tool.Icon
              className="w-12 h-12 p-3 rounded-xl text-white"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            />

            {/* Tool Info */}
            <h3 className="mt-6 text-lg font-semibold text-foreground">
              {tool.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AITools;
