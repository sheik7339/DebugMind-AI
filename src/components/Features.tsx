"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Code, 
  Globe, 
  Layout,
  Search,
  MessageSquareCode
} from "lucide-react";

const features = [
  {
    title: "AI Bug Detection",
    description: "Our LLM-powered engine detects logic errors and syntax flaws in real-time.",
    icon: Search,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Code Fix Suggestions",
    description: "Don't just find the bug—get multiple high-quality PR-ready code fixes.",
    icon: Code,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Developer-Friendly",
    description: "Integrates with VS Code, GitHub, and terminal for a seamless workflow.",
    icon: Layout,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Lightning Fast Analysis",
    description: "Get context-aware explanations in under 2 seconds. No more long debugging sessions.",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    title: "Language Support",
    description: "Supports Python, JS, TS, Go, Rust, Java, and 20+ other popular languages.",
    icon: Globe,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    title: "Secure Debugging",
    description: "Your code stays private. Enterprise-grade encryption and SOC2 compliance.",
    icon: ShieldCheck,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Supercharge Your Workflow</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            DebugMind AI provides all the tools you need to build better software faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.07] group"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
