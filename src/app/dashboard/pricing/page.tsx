"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Sparkles, Shield, Rocket, ArrowRight, Loader2, Globe, Heart } from "lucide-react";
import { useAuth } from "@/components/providers/FirebaseAuthProvider";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const { tier, upgradeToPro } = useAuth();
  const [loading, setLoading] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"idle" | "verifying" | "processing" | "finalizing">("idle");
  const [showSimulatedCheckout, setShowSimulatedCheckout] = useState(false);

  const handleUpgradeSimulated = async () => {
    setLoading(true);
    
    setCheckoutStep("verifying");
    await new Promise(r => setTimeout(r, 1500));
    
    setCheckoutStep("processing");
    await new Promise(r => setTimeout(r, 2000));
    
    setCheckoutStep("finalizing");
    await new Promise(r => setTimeout(r, 1500));
    
    upgradeToPro();
    setLoading(false);
    setShowSimulatedCheckout(false);
    setCheckoutStep("idle");
    toast.success("Identity Upgrade Successful!", {
      description: "Transaction ID: DB-MN-992384. Pro features activated.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto w-full space-y-16 pb-20">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Subscription Infrastructure
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
          Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Power Level</span>
        </h1>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium">
          Choose the tier that matches your development speed. Upgrade or downgrade anytime.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 flex flex-col relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-500/5 blur-3xl rounded-full -mr-16 -mt-16" />
          
          <div className="mb-8">
            <h3 className="text-xl font-black text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5" /> Free Tier
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-white">$0</span>
              <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">/ Month</span>
            </div>
            <p className="text-zinc-500 text-sm mt-4 font-medium leading-relaxed">
              Perfect for quick fixes and minor code adjustments.
            </p>
          </div>

          <div className="space-y-4 mb-10 border-t border-white/5 pt-8">
            {[
              "3 Neural Analysis per hour",
              "Standard AI Intelligence",
              "Basic Root Cause Mapping",
              "Community Support",
              "Web Dashboard Access"
            ].map(feature => (
              <div key={feature} className="flex items-center gap-3 text-sm font-bold text-zinc-500 group-hover:text-zinc-400 transition-colors">
                <Check className="w-4 h-4 text-emerald-500/50" />
                {feature}
              </div>
            ))}
          </div>

          <button 
            disabled 
            className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-xs text-zinc-600 uppercase tracking-widest mt-auto shadow-inner"
          >
            {tier === "free" ? "Current Tier" : "Active"}
          </button>
        </motion.div>

        {/* Pro Plan */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-[2.5rem] border border-blue-500/20 bg-blue-600/[0.03] p-10 flex flex-col relative overflow-hidden group shadow-[0_0_50px_rgba(37,99,235,0.1)]"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 blur-3xl rounded-full -mr-20 -mt-20 group-hover:bg-blue-600/20 transition-all" />
          
          <div className="mb-8">
            <h3 className="text-xl font-black text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Professional
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-white">$29</span>
              <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">/ Month</span>
            </div>
            <p className="text-zinc-400 text-sm mt-4 font-bold leading-relaxed">
              Unlock the full power of AI-driven debugging.
            </p>
          </div>

          <div className="space-y-4 mb-10 border-t border-white/5 pt-8">
            {[
              "Unlimited AI Analysis",
              "Advanced GPT-4o Engine",
              "Deep Logic Chain Analysis",
              "Enterprise-Grade Security",
              "Priority API Access",
              "24/7 Neural Support"
            ].map(feature => (
              <div key={feature} className="flex items-center gap-3 text-sm font-black text-white group-hover:text-blue-100 transition-colors">
                <Check className="w-4 h-4 text-blue-500" />
                {feature}
              </div>
            ))}
          </div>

          <button 
            onClick={() => tier === "free" ? setShowSimulatedCheckout(true) : null}
            disabled={tier === "pro"}
            className={cn(
               "w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2",
               tier === "pro" 
                 ? "bg-emerald-500/20 border border-emerald-500/20 text-emerald-500 cursor-default" 
                 : "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-95 group-hover:scale-[1.02]"
            )}
          >
            {tier === "pro" ? "Current Active Plan" : "Upgrade Securely"}
            {tier === "free" && <ArrowRight className="w-4 h-4" />}
          </button>
        </motion.div>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40">
        {[Globe, Shield, Heart, Rocket].map((Icon, i) => (
          <div key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-zinc-600">
            <Icon className="w-4 h-4" /> Trusted Infrastructure
          </div>
        ))}
      </div>

      {/* Simulated Checkout Modal */}
      <AnimatePresence>
        {showSimulatedCheckout && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !loading && setShowSimulatedCheckout(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="w-full max-w-[480px] bg-[#0c0c0e] border border-white/10 rounded-[2.5rem] p-10 relative z-10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600" />
              
              <div className="mb-10 flex justify-between items-start">
                 <div>
                   <h4 className="text-2xl font-black text-white tracking-tight leading-tight">Secure Upgrade</h4>
                   <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mt-1">Transaction Node: 7824-A</p>
                 </div>
                 <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-blue-500">
                   <Shield className="w-6 h-6" />
                 </div>
              </div>

              <div className="space-y-6 mb-10">
                 <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl shadow-inner">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-zinc-400">Selected Plan</span>
                      <span className="text-xs font-black text-white uppercase tracking-widest">Professional Monthly</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/5 pt-4">
                      <span className="text-sm font-black text-zinc-500 uppercase tracking-widest">Total Amount</span>
                      <span className="text-2xl font-black text-white leading-none">$29.00</span>
                    </div>
                 </div>

                 <div className="space-y-4">
                   <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                     <Check className="w-4 h-4 text-emerald-500" />
                     <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Instant Activation Guaranteed</span>
                   </div>
                   
                   {/* Checkout Logic Visualizer */}
                   {loading && (
                     <div className="bg-zinc-950/50 border border-white/5 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Bridge Status</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 animate-pulse">Connected</span>
                        </div>
                        <div className="space-y-3">
                           <div className="flex items-center gap-3">
                              {checkoutStep === "verifying" ? <Loader2 className="w-3 h-3 text-blue-500 animate-spin" /> : <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />}
                              <span className={`text-[11px] font-bold ${checkoutStep === "verifying" ? "text-white" : "text-zinc-500"}`}>Verifying Session Token...</span>
                           </div>
                           <div className="flex items-center gap-3">
                              {checkoutStep === "processing" ? <Loader2 className="w-3 h-3 text-blue-500 animate-spin" /> : checkoutStep === "verifying" ? <div className="w-3 h-3 rounded-full bg-zinc-800" /> : <div className="w-3 h-3 rounded-full bg-emerald-500" />}
                              <span className={`text-[11px] font-bold ${checkoutStep === "processing" ? "text-white" : "text-zinc-500"}`}>Syncing Payment Gateway...</span>
                           </div>
                           <div className="flex items-center gap-3">
                              {checkoutStep === "finalizing" ? <Loader2 className="w-3 h-3 text-blue-500 animate-spin" /> : (checkoutStep === "verifying" || checkoutStep === "processing") ? <div className="w-3 h-3 rounded-full bg-zinc-800" /> : <div className="w-3 h-3 rounded-full bg-emerald-500" />}
                              <span className={`text-[11px] font-bold ${checkoutStep === "finalizing" ? "text-white" : "text-zinc-500"}`}>Authorizing Pro Tier...</span>
                           </div>
                        </div>
                     </div>
                   )}
                 </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  disabled={loading}
                  onClick={handleUpgradeSimulated}
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-blue-600/50 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Authorizing...
                    </>
                  ) : (
                    "Authorize Transaction"
                  )}
                </button>
                <button
                  disabled={loading}
                  onClick={() => setShowSimulatedCheckout(false)}
                  className="w-full py-4 bg-transparent text-zinc-500 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors disabled:opacity-30"
                >
                  Cancel Connection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
