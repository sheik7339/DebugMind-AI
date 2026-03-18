"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Twitter, Github, Linkedin, MessageSquare, Send, ArrowUpRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(12543); // Premium base count

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/newsletter/count");
        if (res.ok) {
          const data = await res.json();
          setCount(12543 + data.count);
        }
      } catch (error) {
        // silently fail, show base count
      }
    };
    fetchCount();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email identity.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.status === 409) {
        toast.info("You're already on the grid! Check your inbox.");
      } else if (!res.ok) {
        toast.error(data.error || "Network sync failed. Please try again.");
      } else {
        toast.success("Welcome aboard! You are now on the grid for updates.");
        setEmail("");
        setCount(prev => prev + 1);
      }
    } catch (error: any) {
      toast.error("Network sync failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#050505] pt-32 pb-14 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-600/[0.03] blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 lg:gap-x-12 mb-24">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="relative z-10 flex items-center gap-3 hover:opacity-80 transition-all group">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white">
                DebugMind <span className="text-blue-500">AI</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-sm">
              The world's most advanced AI-powered debugging platform for professionals. Built to turn hours of frustration into seconds of clarity.
            </p>
            <div className="flex items-center gap-5">
              {[Twitter, Github, Linkedin, MessageSquare].map((Icon, i) => (
                <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 hover:text-white text-zinc-600 transition-all cursor-pointer group">
                   <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Platform</h4>
            <ul className="space-y-4">
              {["Features", "Debug Tool", "Pricing", "Enterprise", "Docs"].map((item) => (
                <li key={item}>
                  <Link href={item === "Debug Tool" ? "/dashboard/debug" : `/#${item.toLowerCase().replace(" ", "-")}`} className="text-zinc-500 hover:text-white text-sm font-bold transition-all hover:translate-x-1 flex items-center gap-1 group">
                    {item}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Company</h4>
            <ul className="space-y-4">
              {["About Us", "Contact", "Privacy", "Terms", "Status"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-zinc-500 hover:text-white text-sm font-bold transition-all hover:translate-x-1 flex items-center gap-1 group">
                    {item}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8 rounded-[2rem] border border-white/5 relative overflow-hidden bg-white/[0.01]">
               <h4 className="text-white text-xl font-black tracking-tight mb-2">Stay Updated</h4>
               <p className="text-zinc-500 text-sm font-medium mb-8 leading-relaxed">Join {count.toLocaleString()}+ developers receiving the latest debugging insights.</p>
               
               <form className="relative group" onSubmit={handleSubscribe}>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dev@company.com"
                    className="w-full bg-black/60 border border-white/10 rounded-2xl py-5 pl-6 pr-16 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold placeholder:text-zinc-800 disabled:opacity-50"
                    disabled={loading}
                  />
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="absolute right-2 top-2 bottom-2 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-95 group disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    )}
                  </button>
               </form>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
             <span>© 2026 DEBUGMIND AI INC.</span>
             <span className="w-1 h-1 rounded-full bg-zinc-800" />
             <span className="text-blue-500/50">ENGINEERED FOR EXCELLENCE</span>
          </p>
          <div className="flex gap-10 items-center">
            <Link href="#" className="text-zinc-700 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:-translate-y-0.5">Privacy Infrastructure</Link>
            <Link href="#" className="text-zinc-700 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:-translate-y-0.5">Usage Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
