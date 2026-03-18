"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Camera, ShieldCheck, CreditCard, LogOut, CheckCircle2, ChevronRight, Image as ImageIcon, Key, Zap, Cpu, Save, Loader2, Activity } from "lucide-react";
import { useAuth } from "@/components/providers/FirebaseAuthProvider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

export default function AccountPage() {
  const { user, loading, tier, usageCount, geminiKey, setGeminiKey } = useAuth();
  const [activeTab, setActiveTab] = React.useState("profile");
  const [isSaving, setIsSaving] = React.useState(false);
  
  const [formData, setFormData] = React.useState({
    name: user?.displayName || "Developer",
    email: user?.email || "dev@debugmind.ai",
    phone: "+91 98765 43210"
  });

  const [tempKey, setTempKey] = React.useState(geminiKey || "");

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    toast.success("Profile Synchronized", {
      description: "Identity updates propagated across neural nodes."
    });
  };

  if (loading || !user) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: "profile", name: "Identity", icon: User },
    { id: "billing", name: "Billing", icon: CreditCard },
    { id: "security", name: "Security", icon: ShieldCheck },
  ];

  return (
    <div className="max-w-6xl mx-auto w-full space-y-8 animate-in fade-in duration-700">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Account Administration</h1>
          <p className="text-zinc-500 font-medium text-sm uppercase tracking-widest text-[10px]">Manage your neural identity and subscription matrix.</p>
        </div>

        <div className="flex bg-white/[0.02] border border-white/5 rounded-2xl p-1 shadow-inner overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                activeTab === tab.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="glass-card rounded-[2.5rem] border border-white/5 bg-white/[0.01] overflow-hidden"
           >
              <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                 <button className="absolute bottom-4 right-6 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-black/60 transition-all">
                    Change Banner
                 </button>
              </div>
              <div className="px-6 pb-8">
                 <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-10 mb-6">
                    <div className="relative group">
                       <div className="w-32 h-32 rounded-3xl bg-zinc-900 flex items-center justify-center text-4xl font-black text-white border-[6px] border-[#0a0a0b] shadow-2xl overflow-hidden">
                         {user.photoURL ? (
                           <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                         ) : (
                           user.displayName?.[0]?.toUpperCase() || "D"
                         )}
                       </div>
                       <button className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl">
                          <ImageIcon className="w-5 h-5 text-white" />
                       </button>
                    </div>
                    <div className="flex-1 pb-2">
                       <h2 className="text-2xl font-black text-white tracking-tight">{formData.name || "Developer"}</h2>
                       <p className="text-zinc-500 text-sm font-bold">{formData.email}</p>
                    </div>
                    <button 
                       onClick={handleSave}
                       disabled={isSaving}
                       className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all active:scale-95 flex items-center gap-2"
                    >
                       {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                       {isSaving ? "Saving..." : "Commit Changes"}
                    </button>
                 </div>

                  <AnimatePresence mode="wait">
                    {activeTab === "profile" && (
                      <motion.div 
                        key="profile"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="grid md:grid-cols-2 gap-5 pt-5 border-t border-white/5"
                      >
                         <div className="space-y-4">
                            <div className="space-y-2">
                               <label className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] ml-1">Identity Display Name</label>
                               <div className="relative group">
                                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                                  <input 
                                     type="text"
                                     value={formData.name}
                                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                                     className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
                                  />
                               </div>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] ml-1">Communication Email</label>
                               <div className="relative group">
                                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                                  <input 
                                     type="email"
                                     value={formData.email}
                                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                                     className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
                                  />
                               </div>
                            </div>
                         </div>
                         
                         <div className="space-y-4">
                            <div className="space-y-2">
                               <label className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] ml-1">Mobile Contact</label>
                               <div className="relative group">
                                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                                  <input 
                                     type="text"
                                     value={formData.phone}
                                     onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                     className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
                                  />
                               </div>
                            </div>
                            <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-5 group hover:bg-blue-500/10 transition-all">
                               <div className="flex items-center gap-3 mb-2">
                                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Enhanced Identity</span>
                               </div>
                               <p className="text-[9px] text-zinc-500 font-medium leading-relaxed">
                                  Updating these fields will sync your identity across all our nodes.
                               </p>
                            </div>
                         </div>
                      </motion.div>
                    )}

                    {activeTab === "billing" && (
                      <motion.div 
                        key="billing"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="pt-5 border-t border-white/5 space-y-6"
                      >
                         <div className="grid md:grid-cols-2 gap-5">
                            <div className="bg-zinc-900/40 p-5 rounded-2xl border border-white/5 space-y-4">
                               <div className="flex justify-between items-center">
                                  <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Current Plan Efficiency</h4>
                                  <span className="px-2 py-0.5 bg-blue-500/10 rounded text-[8px] font-black text-blue-500 uppercase tracking-widest">{tier.toUpperCase()} LEVEL</span>
                               </div>
                               <div className="flex items-baseline gap-2">
                                  <span className="text-3xl font-black text-white">{tier === 'pro' ? '$29' : '$0'}</span>
                                  <span className="text-zinc-500 text-xs font-bold uppercase">/ Month</span>
                               </div>
                               <Link href="/dashboard/pricing" className="block w-full text-center py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[9px] font-black text-white uppercase tracking-widest transition-all">
                                  {tier === 'pro' ? 'Manage Subscription' : 'Upgrade to Pro'}
                               </Link>
                            </div>
                            <div className="bg-zinc-900/40 p-5 rounded-2xl border border-white/5 space-y-4">
                               <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Neural Metering</h4>
                               <div className="space-y-2">
                                  <div className="flex justify-between text-[10px] font-black uppercase">
                                     <span className="text-zinc-500">Cycle Consumption</span>
                                     <span className="text-white">{tier === 'pro' ? 'Unlimited' : `${usageCount} / 5`}</span>
                                  </div>
                                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                     <motion.div initial={{ width: 0 }} animate={{ width: tier === 'pro' ? '100%' : `${(usageCount / 5) * 100}%` }} className="h-full bg-blue-600 rounded-full" />
                                  </div>
                               </div>
                               <p className="text-[9px] text-zinc-600 italic">Next reset in: 14h 22m</p>
                            </div>
                         </div>
                      </motion.div>
                    )}

                    {activeTab === "security" && (
                      <motion.div 
                        key="security"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="pt-5 border-t border-white/5 space-y-4"
                      >
                         <div className="bg-zinc-900/40 p-5 rounded-2xl border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                               <div className="p-3 bg-blue-500/10 rounded-xl">
                                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                   <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Two-Factor Authentication</h4>
                                   <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Protection Layer Level: 2</p>
                                </div>
                            </div>
                            <button className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 shadow-inner shadow-black/50">
                               <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
                            </button>
                         </div>
                         <div className="p-5 border border-white/5 rounded-2xl space-y-3">
                            <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Active Login Vectors</h4>
                            <div className="space-y-2">
                               {[
                                 { device: "Chrome / Windows 11", location: "Chennai, IN", time: "Now" },
                                 { device: "Safari / iPhone 14", location: "Bangalore, IN", time: "2h ago" }
                               ].map((session, i) => (
                                 <div key={i} className="flex justify-between items-center py-2 border-b border-white/[0.02]">
                                    <span className="text-[11px] font-bold text-zinc-400">{session.device}</span>
                                    <span className="text-[9px] font-black text-zinc-600 uppercase">{session.time}</span>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="grid md:grid-cols-2 gap-4"
           >
               <div className="glass-card rounded-[2rem] border border-white/5 p-6 space-y-5">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                           <Key className="w-4 h-4 text-blue-500" />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-tight">Custom AI Engine</h3>
                     </div>
                     <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                         <Zap className="w-3 h-3" /> UNLIMITED
                     </div>
                  </div>
                  
                  <div className="space-y-3">
                     <div className="relative group">
                        <input 
                           type="password"
                           value={tempKey}
                           onChange={(e) => setTempKey(e.target.value)}
                           placeholder="Gemini Pro API Key (AIzaSy...)"
                           className="w-full bg-black border border-white/5 rounded-2xl py-3 px-4 text-[11px] font-bold text-zinc-300 focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-800"
                        />
                        <button 
                           onClick={() => {
                              setGeminiKey(tempKey);
                              toast.success("Neural Link Synchronized!");
                           }}
                           className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
                        >
                           Commit
                        </button>
                     </div>
                     <p className="text-[10px] text-zinc-500 font-medium leading-relaxed italic px-2">
                        * Inputting your own key bypasses platform usage limits. Key is stored locally via secure client-side encryption.
                     </p>
                  </div>
               </div>

              <div className="glass-card rounded-[2rem] border border-white/5 p-6 space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                       <Activity className="w-4 h-4 text-violet-500" />
                    </div>
                    <h3 className="text-sm font-black text-white uppercase tracking-tight">Session Intelligence</h3>
                 </div>
                 <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-[10px]">
                       <span className="text-zinc-500 font-bold uppercase">Location</span>
                       <span className="text-white font-black uppercase tracking-tighter">Chennai, India (Detected)</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                       <span className="text-zinc-500 font-bold uppercase">Device</span>
                       <span className="text-white font-black uppercase tracking-tighter">Chrome Workstation</span>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>

        {/* Right Section: Power Status (Billing) */}
        <div className="space-y-8">
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="glass-card rounded-[2.5rem] border border-blue-500/20 bg-blue-600/[0.03] p-8 space-y-8 sticky top-24"
           >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                    <Zap className="w-6 h-6 text-white" />
                 </div>
                 <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">Power Status</h3>
                    <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">{tier === "pro" ? "Elite Access" : "Standard Trial"}</p>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="space-y-3">
                    <div className="flex justify-between items-end">
                       <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Neural Quota</span>
                       <span className="text-xl font-black text-white">{tier === "pro" ? "∝" : `${usageCount}/5`}</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: tier === "pro" ? "100%" : `${(usageCount / 5) * 100}%` }}
                         className={cn(
                           "h-full rounded-full",
                           tier === "pro" ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" : "bg-blue-600"
                         )}
                       />
                    </div>
                    <p className="text-[9px] text-zinc-500 font-bold leading-relaxed">
                       {tier === "pro" 
                          ? "You have unlimited access to all AI models and features on the Elite tier." 
                          : "You are currently utilizing our standard free tier quota. Upgrade for continuous development."}
                    </p>
                 </div>

                 {tier === "free" ? (
                   <Link href="/dashboard/pricing" className="block">
                      <button className="w-full py-5 bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-200 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95">
                         Go Professional Now
                      </button>
                   </Link>
                 ) : (
                   <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Professional Active</span>
                      </div>
                      <p className="text-[9px] text-zinc-500 leading-relaxed font-medium">Your subscription is active and synchronized across all nodes.</p>
                   </div>
                 )}
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
