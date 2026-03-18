"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Github } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/providers/FirebaseAuthProvider";

export function Hero() {
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />

      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-6 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
              <Sparkles className="w-3 h-3 fill-blue-400" /> The Future of Debugging is Here
            </div>
            <div className="flex items-center gap-4 bg-zinc-900/50 border border-white/5 py-1.5 px-3 rounded-full backdrop-blur-sm">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-6 h-6 rounded-full border-2 border-zinc-950 overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${i+40}`} alt="user" />
                     </div>
                   ))}
                </div>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">+12k devs debugging now</span>
                <div className="h-3 w-[1px] bg-white/10" />
                <div className="flex items-center gap-1.5">
                   <Github className="w-3 h-3 text-white" />
                   <span className="text-[10px] font-black text-white">4.8k</span>
                </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 leading-tight px-2">
            Fix Bugs Instantly <br className="hidden sm:block" />
            <span className="text-blue-500">with AI</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Paste your code and error. DebugMind AI analyzes the bug and shows the fix in seconds. 
            Spend less time searching and more time shipping.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/dashboard/debug" className="w-full sm:w-auto">
            <button className="group relative w-full px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:shadow-[0_25px_50px_rgba(37,99,235,0.5)] active:scale-95">
              {user ? "Open Workspace" : "Start Debugging Free"}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link href="/dashboard/debug" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
              <Play className="w-5 h-5 fill-white" />
              View Demo
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
