import React from "react";
import { assets } from "../assets/assets";

const Testimonial: React.FC = () => {
  const data = [
    {
      name: "John Doe",
      title: "Founder, Creatify",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      text: "VibeXCraft AI tools are incredible — they streamlined our entire content process!",
    },
    {
      name: "Sarah Lin",
      title: "Developer, InnovateX",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      text: "The AI generators saved me countless hours. It’s like having a creative partner!",
    },
    {
      name: "David Lee",
      title: "Designer, FutureLab",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
      text: "Such clean UI and smart AI suggestions — a must-have for creators.",
    },
  ];

  return (
    <section className="px-6 sm:px-20 xl:px-32 py-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-foreground">Loved by Creators</h2>
        <p className="text-muted-foreground max-w-lg mx-auto mt-2">
          Here’s what our community says about using VibeXCraft AI.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {data.map((item, i) => (
          <div
            key={i}
            className="p-8 bg-card border border-border rounded-2xl max-w-xs shadow-md hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="flex gap-1 mb-3">
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <img
                    key={idx}
                    src={assets.star_icon}
                    className="w-4 h-4"
                    alt="star"
                  />
                ))}
            </div>
            <p className="text-muted-foreground text-sm mb-5">"{item.text}"</p>
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                className="w-10 h-10 rounded-full object-cover"
                alt={item.name}
              />
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ✅ Make sure you only have this one export at the very bottom:
export default Testimonial;
