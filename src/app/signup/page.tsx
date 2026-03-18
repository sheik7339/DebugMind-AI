"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Cpu, 
  Mail, 
  Lock, 
  User,
  Chrome, 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  ShieldCheck,
  Zap,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { getFriendlyErrorMessage } from "@/lib/error-handler";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuth } from "@/components/providers/FirebaseAuthProvider";

export default function SignUpPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1); 

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && name) setStep(2);
    else if (step === 2 && email) setStep(3);
    else if (step === 3 && password) handleSignUp(e);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name
      });
      toast.success("Account created successfully! Welcome to the grid.");
      router.replace("/dashboard");
    } catch (err: any) {
      toast.error(getFriendlyErrorMessage(err));
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Successfully authenticated with Google.");
      router.replace("/dashboard");
    } catch (err: any) {
      toast.error(getFriendlyErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-center items-center px-6 relative overflow-hidden font-inter">
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]" />
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-purple-600/10 blur-[180px] rounded-full animate-pulse decoration-1000" />
        
        {/* Animated Grid lines */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[1000px] grid lg:grid-cols-2 gap-0 relative z-10 glass rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-2xl"
      >
        {/* Left Side: Brand & Visuals */}
        <div className="hidden lg:flex flex-col p-16 bg-gradient-to-br from-blue-600/10 to-transparent border-r border-white/5 relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 blur-[120px] rounded-full" />
           </div>

          <Link href="/" className="inline-flex items-center gap-3 mb-20 group relative z-10">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.4)] group-hover:rotate-6 transition-all">
              <img src="/logo.png" alt="DebugMind Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-3xl font-black text-white tracking-tighter">DebugMind <span className="text-blue-500">AI</span></span>
          </Link>

          <div className="mt-auto space-y-12 relative z-10">
             <div className="space-y-4">
               <h2 className="text-4xl font-black text-white leading-tight">Create your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">developer key</span></h2>
               <p className="text-zinc-400 text-lg font-medium">Join 12,000+ engineers using AI to squash bugs in record time</p>
             </div>

             <div className="grid gap-6">
                {[
                  { icon: Zap, text: "Instant analysis & root cause mapping" },
                  { icon: ShieldCheck, text: "Enterprise-grade code security" },
                  { icon: Terminal, text: "Seamless IDE & CLI integration" }
                ].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    key={i} 
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
                      <item.icon className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-zinc-300 font-bold text-sm tracking-wide">{item.text}</span>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center relative bg-black/10">
          <div className="mb-10 text-center lg:text-left">
             <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Register</h3>
             <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em]">Establish your credentials on the grid</p>
          </div>

          <form onSubmit={handleNextStep} className="space-y-8">
            <div className="space-y-6 min-h-[100px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-3"
                  >
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-1">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-700 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="text"
                        required
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white font-bold focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-zinc-800"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-3"
                  >
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Email Identity</label>
                      <button type="button" onClick={() => setStep(1)} className="text-[10px] text-blue-500 hover:text-blue-400 font-black uppercase tracking-widest transition-colors">Back</button>
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-700 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="email"
                        required
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="dev@debugmind.ai"
                        className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white font-bold focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-zinc-800"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-3"
                  >
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Secret Key</label>
                      <button type="button" onClick={() => setStep(2)} className="text-[10px] text-blue-500 hover:text-blue-400 font-black uppercase tracking-widest transition-colors">Back</button>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-700 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="password"
                        required
                        autoFocus
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white font-bold focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-zinc-800"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              disabled={loading}
              className="w-full relative group py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] overflow-hidden shadow-[0_20px_40px_-10px_rgba(59,130,246,0.5)] disabled:opacity-70 transition-all active:scale-95"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
                      className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                    />
                    Creating Account...
                  </>
                ) : (
                  <>
                    {step === 3 ? "Create Account" : "Next Step"} 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </form>

          <div className="relative mt-12 mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-[#0c0c0e] px-4 text-zinc-700 font-black tracking-[0.3em]">Quick Access</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 py-4 bg-[#0a0a0a] border border-white/5 rounded-2xl hover:bg-zinc-900 transition-all font-bold text-xs text-white uppercase tracking-widest shadow-xl group"
            >
              <Chrome className="w-5 h-5 text-zinc-500 group-hover:text-red-500 transition-colors" /> Continue with Google
            </button>
          </div>

          <p className="mt-auto pt-16 text-center text-zinc-600 text-[10px] font-black uppercase tracking-[0.1em]">
            Already on the grid? <Link href="/signin" className="text-blue-500 hover:text-blue-400 hover:underline transition-all ml-1">Resume Session</Link>
          </p>
        </div>
      </motion.div>

      {/* Floating security indicators */}
      <div className="fixed bottom-10 flex gap-8 text-[10px] text-zinc-700 font-black uppercase tracking-[0.2em] relative z-10">
         <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> AES-256 Encrypted</div>
         <div className="flex items-center gap-2 border-l border-white/5 pl-8"><Sparkles className="w-3 h-3 text-blue-500" /> Powered by GPT-4o</div>
      </div>
    </div>
  );
}
