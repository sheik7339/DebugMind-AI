"use client";

import { motion } from "framer-motion";
import { Check, Zap, Crown, Rocket, Star, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/components/providers/FirebaseAuthProvider";

const plans = [
  {
    name: "Free",
    price: { monthly: "$0", yearly: "$0" },
    description: "Perfect for students and hobbyists.",
    features: [
      "5 Debug Sessions / Month",
      "Standard AI Model",
      "Community Support",
      "Core 5 Languages",
      "Web Access Only"
    ],
    cta: "Get Started",
    icon: Rocket,
    highlight: false
  },
  {
    name: "Professional",
    price: { monthly: "$29", yearly: "$22" },
    description: "For serious developers who ship faster.",
    features: [
      "Unlimited Debug Sessions",
      "Advanced AI Models (GPT-4o)",
      "Priority Email Support",
      "Full 40+ Language Support",
      "VS Code Extension Access",
      "Session History Sync"
    ],
    cta: "Start Free Trial",
    icon: Zap,
    highlight: true
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", yearly: "Custom" },
    description: "Scale with precision and security.",
    features: [
      "SOC-2 Type II Compliance",
      "Self-Hosted Deployment",
      "Dedicated Account Manager",
      "Custom Model Training",
      "SSO & RBAC Integration",
      "24/7 Phone Support"
    ],
    cta: "Contact Sales",
    icon: Crown,
    highlight: false
  }
];

export function Pricing() {
  const { user, tier, usageCount } = useAuth();
  const [isYearly, setIsYearly] = useState(false);

  const getPlanHref = (planName: string) => {
    if (!user) return "/signin";
    
    // Enterprise always goes to dashboard for now or a contact flow
    if (planName === "Enterprise") return "#";

    // If already Pro, go to workspace
    if (tier === "pro") return "/dashboard/debug";

    // For Free tier users
    if (usageCount >= 5) {
      // Out of credits, send to billing
      return "/dashboard/pricing";
    }

    // Still has credits, go to workspace
    return "/dashboard/debug";
  };

  return (
    <section id="pricing" className="py-32 px-6 relative overflow-hidden bg-[#050505]">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/[0.02] blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6"
          >
            <Star className="w-3 h-3 fill-blue-400" /> Transparent Pricing
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
            Plans for Every <span className="text-blue-500 underline decoration-blue-500/20 underline-offset-8">Scale</span>
          </h2>

          {/* SaaS Toggle */}
          <div className="flex items-center justify-center gap-4 mt-12 mb-4">
             <span className={`text-sm font-bold uppercase tracking-widest ${!isYearly ? "text-white" : "text-zinc-500"}`}>Monthly</span>
             <button 
                onClick={() => setIsYearly(!isYearly)}
                className="w-16 h-8 rounded-full bg-zinc-900 border border-white/5 p-1 flex items-center transition-all relative"
             >
                <div className={`w-6 h-6 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all ${isYearly ? "translate-x-8" : "translate-x-0"}`} />
             </button>
             <span className={`text-sm font-bold uppercase tracking-widest ${isYearly ? "text-white" : "text-zinc-500"}`}>Yearly</span>
             {isYearly && (
               <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border border-emerald-500/20">
                 Save 20%
               </span>
             )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`relative flex flex-col p-8 md:p-10 rounded-[2.5rem] border ${
                plan.highlight 
                  ? "bg-zinc-900/50 border-blue-500/30 shadow-[0_30px_60px_-15px_rgba(59,130,246,0.3)] z-10" 
                  : "bg-[#09090b] border-white/5 hover:border-white/10 transition-colors"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                  Most Popular
                </div>
              )}

              <div className="mb-10 flex flex-col gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${plan.highlight ? "bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.5)]" : "bg-zinc-900 border border-zinc-800"}`}>
                  <plan.icon className={`w-7 h-7 ${plan.highlight ? "text-white" : "text-blue-500"}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                  <p className="text-zinc-500 text-sm font-medium mt-1">{plan.description}</p>
                </div>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-black text-white">
                  {isYearly ? plan.price.yearly : plan.price.monthly}
                </span>
                {plan.price.monthly !== "Custom" && (
                  <span className="text-zinc-500 font-bold">/mo</span>
                )}
              </div>

              <div className="flex-1 space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 group">
                    <div className="mt-1 bg-blue-500/10 rounded-full p-0.5 group-hover:bg-blue-500 transition-colors">
                      <Check className="w-3 h-3 text-blue-500 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href={getPlanHref(plan.name)}>
                <button className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                  plan.highlight 
                    ? "bg-white text-black hover:bg-zinc-200 active:scale-95 shadow-xl" 
                    : "bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 active:scale-95"
                }`}>
                  {plan.cta}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center flex flex-col md:flex-row items-center justify-center gap-6 glass-card p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-white/5">
           <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-zinc-950 overflow-hidden bg-zinc-900">
                  <img src={`https://i.pravatar.cc/150?u=${i+20}`} alt="user" />
                </div>
              ))}
           </div>
           <div className="text-left">
              <p className="text-white font-bold text-lg leading-snug">Trusted by over 12,000+ developers</p>
              <p className="text-zinc-500 font-medium">From indie hackers to Fortune 500 engineering teams.</p>
           </div>
            <div className="md:ml-auto">
              <Link href={getPlanHref("Free")}>
                <button className="flex items-center gap-2 self-start font-black text-[10px] uppercase tracking-[0.2em] text-blue-500 hover:text-blue-400 group">
                   Start Debugging for Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
        </div>
      </div>
    </section>
  );
}
