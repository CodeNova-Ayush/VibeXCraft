import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      subtitle: "Starter Vibes",
      price: "$0",
      features: [
        "5 Projects",
        "Basic AI Copilot",
        "1GB Storage",
        "Community Access",
        "Basic Analytics"
      ]
    },
    {
      name: "Creator",
      subtitle: "Pro",
      price: "$19",
      popular: true,
      features: [
        "Unlimited Projects",
        "Advanced AI Copilot",
        "50GB Storage",
        "Priority Support",
        "Advanced Analytics",
        "Team Collaboration (5 members)",
        "GitHub Integration"
      ]
    },
    {
      name: "Enterprise",
      subtitle: "Custom",
      price: "Contact",
      features: [
        "Everything in Creator",
        "Unlimited Team Members",
        "Unlimited Storage",
        "Custom AI Training",
        "24/7 Premium Support",
        "SLA Guarantee",
        "Advanced Security"
      ]
    }
  ];

  return (
    <div className="min-h-screen p-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
          Choose Your Plan
        </h1>
        <p className="text-xl text-muted-foreground">
          Scale your creativity with the perfect plan for your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, i) => (
          <GlassCard 
            key={i} 
            hover 
            className={`p-8 relative ${plan.popular ? 'border-primary shadow-glow-purple' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-primary rounded-full text-sm font-semibold">
                Most Popular
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.subtitle}</p>
              <div className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                {plan.price}
              </div>
              {plan.price !== "Contact" && (
                <p className="text-sm text-muted-foreground">per month</p>
              )}
            </div>

            <div className="space-y-3 mb-8">
              {plan.features.map((feature, j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              className={`w-full ${
                plan.popular 
                  ? 'bg-gradient-primary hover:shadow-glow-purple' 
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {plan.price === "Contact" ? "Contact Sales" : "Get Started"}
            </Button>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3">Feature</th>
                <th className="text-center py-3">Free</th>
                <th className="text-center py-3">Creator</th>
                <th className="text-center py-3">Enterprise</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3">Projects</td>
                <td className="text-center">5</td>
                <td className="text-center">Unlimited</td>
                <td className="text-center">Unlimited</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3">AI Copilot</td>
                <td className="text-center">Basic</td>
                <td className="text-center">Advanced</td>
                <td className="text-center">Custom</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3">Storage</td>
                <td className="text-center">1GB</td>
                <td className="text-center">50GB</td>
                <td className="text-center">Unlimited</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3">Team Members</td>
                <td className="text-center">1</td>
                <td className="text-center">5</td>
                <td className="text-center">Unlimited</td>
              </tr>
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
