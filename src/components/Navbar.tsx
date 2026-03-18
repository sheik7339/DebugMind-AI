"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Menu, X, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/FirebaseAuthProvider";
import { auth } from "@/lib/firebase";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Docs", href: "#docs" },
  { name: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const { user, tier, usageCount } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-6",
        isScrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(37,99,235,0.3)] group-hover:scale-110 group-active:scale-95 transition-all duration-300">
             <img src="/logo.png" alt="DebugMind Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            DebugMind <span className="text-blue-500">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10 bg-white/[0.03] border border-white/5 px-8 py-2.5 rounded-full backdrop-blur-md shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-all hover:scale-105 active:scale-95"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Global Action Buttons - Professional SaaS Style */}
        <div className="hidden lg:flex items-center gap-8">
          {!user ? (
            <>
              <Link
                href="/signin"
                className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signin"
                className="group relative inline-flex items-center justify-center px-10 py-3 text-xs font-black uppercase tracking-widest text-white transition-all duration-300 bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                   Start Debugging
                   <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-5 relative group/profile">
               {/* Professional User Dropdown Trigger */}
               <motion.div 
                 onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                 className="flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-md cursor-pointer hover:bg-white/[0.08] transition-all border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
               >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-black text-white shadow-lg overflow-hidden border border-white/20">
                     {user.photoURL ? (
                       <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                     ) : (
                       user.displayName?.[0].toUpperCase() || "D"
                     )}
                  </div>
                  <div className="flex flex-col pr-1">
                     <span className={cn(
                       "text-[9px] font-black uppercase tracking-widest leading-none mb-1",
                       tier === "pro" ? "text-blue-400" : "text-zinc-500"
                     )}>
                       {tier === "pro" ? "PRO ACCESS" : `FREE TIER (${usageCount}/5)`}
                     </span>
                     <span className="text-[12px] font-bold text-white leading-none capitalize">{user.displayName?.split(" ")[0]}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: profileDropdownOpen ? 180 : 0 }}
                    className="ml-1"
                  >
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
               </motion.div>

               {/* Dropdown Menu */}
               <AnimatePresence>
                 {profileDropdownOpen && (
                   <motion.div
                     initial={{ opacity: 0, y: 15, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 15, scale: 0.95 }}
                     className="absolute top-full right-0 mt-4 w-64 bg-[#0a0a0b]/95 border border-white/10 rounded-2xl shadow-3xl backdrop-blur-3xl z-[110] overflow-hidden"
                   >
                     <div className="flex items-center gap-3 p-3 border-b border-white/5 bg-white/[0.02]">
                       <div className="relative group/avatar">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-base font-black text-white shadow-xl overflow-hidden border border-white/10">
                            {user.photoURL ? (
                              <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                              user.displayName?.[0].toUpperCase() || "D"
                            )}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-[#0a0a0b]" />
                       </div>
                       <div className="flex flex-col min-w-0">
                         <span className="text-sm font-black text-white tracking-tight leading-none mb-1 truncate">{user.displayName}</span>
                         <span className="text-[10px] text-zinc-500 font-bold truncate">{user.email}</span>
                         <div className="mt-2 flex items-center gap-2">
                            <span className={cn(
                              "px-1.5 py-0.5 rounded-[4px] text-[8px] font-black uppercase tracking-[0.1em] border",
                              tier === "pro" 
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20" 
                                : "bg-zinc-500/10 text-zinc-500 border-white/5"
                            )}>
                              {tier === "pro" ? "Pro Access" : "Standard Plan"}
                            </span>
                         </div>
                       </div>
                     </div>

                     <div className="p-2 space-y-2.5">
                        {/* Usage & Plan Status */}
                        <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2">
                           <div className="flex justify-between items-center mb-1.5">
                              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Quota</span>
                              <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">
                                 {tier === "pro" ? "Unlimited" : `${usageCount} / 5`}
                              </span>
                           </div>
                           <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: tier === "pro" ? "100%" : `${(usageCount / 5) * 100}%` }}
                                className={cn(
                                   "h-full rounded-full",
                                   tier === "pro" ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-blue-600"
                                )}
                              />
                           </div>
                        </div>

                        {tier === "free" && (
                          <Link
                            href="/dashboard/pricing"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 p-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 group hover:shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition-all"
                          >
                            <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center backdrop-blur-md">
                              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[9px] font-black text-white uppercase tracking-widest leading-none mb-0.5">Elite Upgrade</span>
                              <span className="text-[7px] font-bold text-white/70">Join Pro</span>
                            </div>
                            <ChevronRight className="w-3 h-3 text-white ml-auto group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        )}

                        <div className="space-y-0.5">
                           <span className="px-2 text-[7px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1 block">Platform</span>
                           {[
                             { name: "Workspace", href: tier === "free" && usageCount >= 5 ? "/dashboard/pricing" : "/dashboard/debug", icon: "Layout" },
                             { name: "History", href: "#", icon: "History" },
                           ].map((item) => (
                             <Link
                               key={item.name}
                               href={item.href}
                               onClick={() => setProfileDropdownOpen(false)}
                               className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.04] transition-all group"
                             >
                                <span className="text-[11px] font-bold text-zinc-400 group-hover:text-white transition-colors">{item.name}</span>
                                <div className="p-0.5 px-1 rounded bg-zinc-900 border border-white/5 text-[7px] font-mono text-zinc-600 group-hover:text-blue-500 group-hover:border-blue-500/20 transition-all opacity-0 group-hover:opacity-100">
                                   OPEN
                                </div>
                             </Link>
                           ))}
                        </div>

                        <div className="space-y-0.5">
                           <span className="px-2 text-[7px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1 block">Management</span>
                           {[
                             { name: "Billing", href: "/dashboard/pricing", icon: "CreditCard" },
                             { name: "Profile", href: "/dashboard/account", icon: "Settings" },
                             { name: "Security", href: "/dashboard/account", icon: "Shield" },
                           ].map((item) => (
                             <Link
                               key={item.name}
                               href={item.href}
                               onClick={() => setProfileDropdownOpen(false)}
                               className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.04] transition-all group"
                             >
                                <span className="text-[11px] font-bold text-zinc-400 group-hover:text-white transition-colors">{item.name}</span>
                             </Link>
                           ))}
                        </div>
                     </div>

                     <div className="p-2 pt-0">
                        <button
                          onClick={() => {
                            auth.signOut();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center justify-between p-3 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-red-500 transition-all group"
                        >
                          <span className="text-[10px] font-black uppercase tracking-widest">Terminate Session</span>
                          <div className="w-7 h-7 rounded-lg bg-red-500 group-hover:bg-red-600 flex items-center justify-center text-white shadow-lg transition-colors">
                             <span className="text-xs font-bold font-mono">X</span>
                          </div>
                        </button>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>

               <Link
                href={tier === "free" && usageCount >= 5 ? "/dashboard/pricing" : "/dashboard/debug"}
                className="group relative inline-flex items-center justify-center px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all duration-300 bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                   Workspace
                   <ChevronRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-zinc-950 border-b border-white/10 p-8 lg:hidden flex flex-col gap-6 overflow-hidden backdrop-blur-2xl shadow-3xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-2xl font-black text-zinc-500 hover:text-white active:scale-95 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-[1px] bg-white/5 my-2" />
            <div className="flex flex-col gap-4">
              {!user ? (
                <>
                  <Link href="/signin" className="w-full py-4 text-center font-black text-zinc-500 uppercase tracking-widest" onClick={() => setMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                  <Link
                    href="/signin"
                    className="w-full py-5 bg-blue-600 rounded-2xl text-center font-black text-white uppercase tracking-widest shadow-[0_15px_30px_rgba(37,99,235,0.3)] active:scale-95"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Debugging
                  </Link>
                </>
              ) : (
                <Link
                  href={tier === "free" && usageCount >= 5 ? "/dashboard/pricing" : "/dashboard/debug"}
                  className="w-full py-5 bg-blue-600 rounded-2xl text-center font-black text-white uppercase tracking-widest shadow-[0_15px_30px_rgba(37,99,235,0.3)] active:scale-95"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Open Workspace
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
