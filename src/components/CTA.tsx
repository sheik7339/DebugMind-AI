"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/providers/FirebaseAuthProvider";

export function CTA() {
  const { user } = useAuth();

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl md:rounded-[3rem] bg-white/[0.03] backdrop-blur-3xl p-8 md:p-20 text-center border border-white/20 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
          {/* Decorative Blooms - More vibrant for glass effect */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 blur-[100px] rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-bold mb-8 border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              Limited Beta Now Open
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Start Debugging <br /> Smarter Today
            </h2>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Join 10,000+ developers who are fixing bugs 10x faster with DebugMind AI. Get started for free.
            </p>
            
            <Link href="/dashboard/debug">
              <button className="group relative inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all shadow-2xl hover:scale-105 active:scale-95">
                {user ? "Open Workspace" : "Try DebugMind AI"}
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
