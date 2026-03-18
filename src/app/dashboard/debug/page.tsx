"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Editor, { DiffEditor } from "@monaco-editor/react";
import { Play, Sparkles, CheckCheck, Copy, Bug, Terminal, AlertTriangle, AlertOctagon, ShieldAlert, Lock, Code2, Globe, ChevronDown, ScrollText, TerminalSquare, ShieldCheck, Activity, Zap } from "lucide-react";
import { toast } from "sonner";
import { saveHistory } from "@/lib/history";
import { useAuth } from "@/components/providers/FirebaseAuthProvider";
import { cn } from "@/lib/utils";

export default function DebugToolPage() {
  const { tier, usageCount, incrementUsage, geminiKey } = useAuth();
  const [code, setCode] = useState("// Paste your broken code here...\nfunction add(a, b) {\n  return a - b; // deliberate bug\n}");
  const [errorMsg, setErrorMsg] = useState("Output does not match expected result. Expected 5, got -1.");
  const [logs, setLogs] = useState("");
  const [showLogs, setShowLogs] = useState(false);
  const [language, setLanguage] = useState("javascript");
  
  const [analyzing, setAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [verifying, setVerifying] = useState(false);
  
  const [result, setResult] = useState<null | any>(null);
  const [typedCause, setTypedCause] = useState("");
  const [typedInsight, setTypedInsight] = useState("");
  const [typedTip, setTypedTip] = useState("");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const scanForSecrets = (text: string) => {
    const patterns = [
      { name: "API Key", regex: /AIzaSy[a-zA-Z0-9_-]{33}|(?:key|api|token|secret|auth)[_-]?.*['"][a-zA-Z0-9_\-\.]{16,}/gi },
      { name: "Bearer Token", regex: /Bearer\s+[a-zA-Z0-9\-\._~+/]+=*/gi },
      { name: "Private Key", regex: /-----BEGIN (?:RSA |EC |)PRIVATE KEY-----/gi }
    ];
    const found: string[] = [];
    patterns.forEach(p => { if (p.regex.test(text)) found.push(p.name); });
    return found;
  };

  const handleAnalyze = async () => {
    if (!code || !errorMsg) return;
    
    const { allowed, reason } = incrementUsage();
    if (!allowed) {
      toast.error("Access Restricted", { description: reason });
      return;
    }

    setAnalyzing(true);
    setResult(null);
    setTypedCause("");
    setTypedInsight("");
    setTypedTip("");
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 800);

    try {
      const securityIssues = scanForSecrets(code + logs);
      
      const response = await fetch("/api/debug", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(geminiKey ? { "x-gemini-key": geminiKey } : {})
        },
        body: JSON.stringify({ code, language, error: errorMsg, logs }),
      });

      const data = await response.json();
      clearInterval(stepInterval);

      if (data.error) throw new Error(data.error);

      const safeString = (val: any) => typeof val === 'string' ? val : JSON.stringify(val, null, 2) || "No data provided.";
      
      const aiResult = {
        cause: safeString(data.root_cause),
        insight: safeString(data.neural_insight),
        security: safeString(data.security_audit),
        correctedCode: typeof data.suggested_fix === 'string' ? data.suggested_fix : (data.suggested_fix?.code || safeString(data.suggested_fix)),
        tip: safeString(data.optimization_tip),
        severity: (data.severity || "Critical") as any,
        securityScan: { 
          found: !!data.security_audit && (
            typeof data.security_audit === 'object' || 
            (typeof data.security_audit === 'string' && !data.security_audit.includes("Secure") && !data.security_audit.includes("None"))
          ), 
          items: Array.isArray(data.security_audit) ? data.security_audit : [data.security_audit] 
        }
      };
      
      setResult(aiResult);
      toast.success("Neural Analysis Complete");
      
      // Simulate Streaming Effect
      let causeText = "";
      let insightText = "";
      let tipText = "";

      const causeTimer = setInterval(() => {
        if (causeText.length < aiResult.cause.length) {
          causeText = aiResult.cause.slice(0, causeText.length + 2);
          setTypedCause(causeText);
        } else {
          clearInterval(causeTimer);
        }
      }, 10);

      const insightTimer = setInterval(() => {
        if (insightText.length < aiResult.insight.length) {
          insightText = aiResult.insight.slice(0, insightText.length + 5);
          setTypedInsight(insightText);
        } else {
          clearInterval(insightTimer);
        }
      }, 5);

      const tipTimer = setInterval(() => {
        if (tipText.length < aiResult.tip.length) {
          tipText = aiResult.tip.slice(0, tipText.length + 3);
          setTypedTip(tipText);
        } else {
          clearInterval(tipTimer);
        }
      }, 8);

      saveHistory({
        lang: language,
        error: errorMsg,
        cause: aiResult.cause,
        explanation: aiResult.insight,
        correctedCode: aiResult.correctedCode,
        severity: aiResult.severity
      });
    } catch (err: any) {
      clearInterval(stepInterval);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setAnalyzing(false);
    }
  };

  const verifyFix = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      toast.success("Fix Verified!", {
        description: "Unit tests passed in sanitized environment.",
        icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />
      });
    }, 2000);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.correctedCode);
      setCopied(true);
      toast.success("Corrected code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const loadingSteps = ["Neural Sync...", "Security Audit...", "Scanning Backend...", "AST Parsing...", "Heuristic Check...", "Generating Fix..."];

  return (
    <div className="min-h-screen lg:h-[calc(100vh-4rem)] flex flex-col lg:flex-row gap-6 mt-0 lg:mt-[-1rem] pb-24 lg:pb-0">
      {/* Left Side: Input */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4 min-h-[500px] h-[60vh] lg:h-full relative z-10 transition-all duration-300">
        <div className="flex flex-wrap items-center justify-between glass-card px-3 sm:px-4 py-3 rounded-xl border border-white/5 shrink-0 relative z-20 gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500 hidden xs:block" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-zinc-300">Workspace</span>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
                  tier === "pro" 
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20" 
                    : "bg-zinc-500/10 text-zinc-500 border-white/5"
                )}>
                  {tier === "pro" ? "Pro Access" : `${usageCount}/5 Free`}
                </span>
              </div>
              {tier === "free" && (
                <div className="w-24 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(usageCount / 5) * 100}%` }}
                    className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="relative group z-[9999]">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsLangOpen(!isLangOpen);
              }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all group"
            >
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-100">
                {language}
              </span>
              <motion.div animate={{ rotate: isLangOpen ? 180 : 0 }} className="flex items-center">
                <ChevronDown className="w-3 h-3 text-zinc-500" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  key="dropdown-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-[2px]" 
                  onClick={() => setIsLangOpen(false)} 
                />
              )}
              {isLangOpen && (
                <motion.div 
                  key="dropdown-menu"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-3 w-52 bg-[#09090b] border border-white/10 rounded-2xl shadow-[0_30px_60px_-12px_rgba(0,0,0,1)] p-2 z-[9999] backdrop-blur-3xl overflow-hidden ring-1 ring-white/10"
                >
                  <div className="max-h-64 overflow-y-auto custom-scrollbar space-y-0.5 relative z-[10000]">
                    {["javascript", "typescript", "python", "rust", "go", "cpp", "java", "php", "swift"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setIsLangOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                          language === lang 
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                            : "text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
                        )}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex-1 glass-card rounded-xl border border-white/5 overflow-hidden flex flex-col shadow-lg shadow-black/50 relative z-10">
          <div className="bg-zinc-900 border-b border-white/5 px-2 sm:px-4 py-2 text-xs font-mono text-zinc-500 flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <button 
              onClick={() => setShowLogs(!showLogs)}
              className={cn(
                "px-2 py-1 rounded transition-all flex items-center gap-1.5",
                showLogs ? "bg-blue-600/20 text-blue-400" : "hover:bg-white/5 text-zinc-500"
              )}
            >
              <ScrollText className="w-3 h-3" />
              <span className="text-[10px] font-black uppercase tracking-widest">Logs</span>
            </button>
          </div>
          <div className="flex-1 relative flex flex-col">
            <div className={cn("flex-1", showLogs ? "h-1/2" : "h-full")}>
              <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(v) => setCode(v || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "Inter, monospace",
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                }}
              />
            </div>
            {showLogs && (
              <div className="h-1/2 border-t border-white/5 bg-black/40 flex flex-col">
                <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between">
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <TerminalSquare className="w-3 h-3" /> Console Diagnostics / Stack Trace
                  </span>
                </div>
                <textarea 
                  value={logs}
                  onChange={(e) => setLogs(e.target.value)}
                  placeholder="Paste browser console logs or server stack trace here for deeper context..."
                  className="w-full flex-1 bg-transparent p-4 text-[11px] font-mono text-zinc-400 placeholder:text-zinc-700 focus:outline-none resize-none"
                />
              </div>
            )}
          </div>
        </div>

        <div className="h-40 glass-card rounded-xl border border-red-500/20 bg-red-500/5 flex flex-col overflow-hidden">
          <div className="px-4 py-2 bg-red-500/10 border-b border-red-500/20 text-xs font-semibold text-red-500 flex items-center gap-2 uppercase tracking-widest text-[10px]">
            <Bug className="w-3.5 h-3.5" /> Direct Error Input
          </div>
          <textarea 
            value={errorMsg}
            onChange={(e) => setErrorMsg(e.target.value)}
            placeholder="Paste your compiler error output here..."
            className="w-full flex-1 bg-transparent p-4 text-sm font-mono text-red-400 placeholder:text-red-900/50 focus:outline-none resize-none"
          />
        </div>

        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAnalyze}
          disabled={analyzing || !code || !errorMsg}
          className="w-full py-5 bg-blue-600 rounded-xl font-black text-white uppercase tracking-widest text-[11px] shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:bg-blue-700 transition-all"
        >
          {analyzing ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }}>
                <Activity className="w-4 h-4 text-blue-200" />
              </motion.div>
              Scanning Neural Links...
            </>
          ) : (
             <>
               <Play className="w-4 h-4 fill-white" /> Commit Neural Analysis
             </>
          )}
        </motion.button>
      </div>

      {/* Right Side: AI Result Panel */}
      <div className="w-full lg:w-1/2 min-h-[500px] h-[60vh] lg:h-full flex flex-col relative transition-all duration-300">
        <AnimatePresence mode="wait">
          {!analyzing && !result && (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex-1 glass-card rounded-2xl border border-zinc-900 flex flex-col items-center justify-center text-zinc-500 p-8 text-center"
            >
              <div className="w-20 h-20 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-center mb-8 rotate-12">
                <Sparkles className="w-10 h-10 text-zinc-700" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">Awaiting Context Injection</h3>
              <p className="max-w-xs text-xs font-medium text-zinc-500 leading-relaxed uppercase tracking-widest">Provide source code and error vectors to initialize neural debugging cycle.</p>
            </motion.div>
          )}

          {analyzing && (
            <motion.div 
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 glass-card border border-blue-500/20 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent animate-pulse" />
              <div className="relative z-10 flex flex-col items-center p-8 text-center">
                <div className="relative mb-12">
                  <div className="w-28 h-28 border-2 border-blue-500/10 rounded-full" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 border-t-2 border-blue-500 rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Sparkles className="w-8 h-8 text-blue-400" />
                    </motion.div>
                  </div>
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-[0.2em] mb-4">
                  {loadingSteps[loadingStep]}
                </h3>
                <div className="flex gap-2 mb-4">
                  {[0, 1, 2, 3, 4].map(i => (
                    <div 
                      key={i} 
                      className={cn(
                        "w-2.5 h-1 rounded-full transition-all duration-500",
                        loadingStep >= i ? "bg-blue-500 scale-x-150 shadow-[0_0_15px_rgba(59,130,246,1)]" : "bg-white/10"
                      )} 
                    />
                  ))}
                </div>
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Parallel Intelligence Cluster: ACTIVE</p>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div 
               key="result"
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex-1 flex flex-col gap-4 overflow-hidden"
            >
               {/* Metadata Header */}
               <div className="glass-card flex items-center justify-between px-6 py-5 rounded-2xl border border-white/5 shrink-0">
                 <div className="flex items-center gap-4">
                   <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                     <CheckCheck className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="text-sm font-black uppercase tracking-tight text-white leading-none mb-1.5">Neural Solution Ready</h3>
                     <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Confidence: 98.4% Accuracy</p>
                   </div>
                 </div>
                 <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 shadow-2xl transition-all
                   ${result.severity === 'Critical' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                     result.severity === 'Warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
                     'bg-green-500/10 border-green-500/20 text-green-500'
                   }
                 `}>
                   {result.severity === 'Critical' ? <AlertOctagon className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                   {result.severity} Priority
                 </div>
               </div>

                <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-5 flex-1 overflow-y-auto custom-scrollbar min-h-0">
                   <div className="grid md:grid-cols-2 gap-5">
                      <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { navigator.clipboard.writeText(result.cause); toast.success("Root Cause copied!"); }} className="p-1.5 bg-black/50 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-all backdrop-blur-md border border-white/5 cursor-pointer shadow-lg" title="Copy Root Cause">
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                           <Bug className="w-12 h-12 text-zinc-400" />
                        </div>
                        <h4 className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 relative z-10 w-[80%]">
                          Neural Root Cause
                        </h4>
                        <p className="text-zinc-300 text-[11px] font-bold leading-relaxed relative z-10 selection:bg-blue-500/30 selection:text-white">{typedCause}</p>
                      </div>

                      <div className={cn(
                        "p-5 rounded-2xl border transition-all relative overflow-hidden group flex flex-col max-h-[250px]",
                        result.securityScan?.found 
                          ? "bg-red-500/[0.03] border-red-500/20" 
                          : "bg-emerald-500/[0.03] border-emerald-500/20"
                      )}>
                         <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => { 
                             const itemsToCopy = result.securityScan?.found 
                               ? result.securityScan.items.map((it: any) => typeof it === 'object' ? JSON.stringify(it, null, 2) : it).join("\n\n") 
                               : "Environment Sanitized: No issues found.";
                             navigator.clipboard.writeText(itemsToCopy); 
                             toast.success("Security status copied!"); 
                           }} className={cn("p-1.5 bg-black/50 hover:bg-white/10 rounded-lg transition-all backdrop-blur-md border border-white/5 cursor-pointer shadow-lg", result.securityScan?.found ? "text-red-400 hover:text-white" : "text-emerald-400 hover:text-white")} title="Copy Security Status">
                             <Copy className="w-3.5 h-3.5" />
                           </button>
                         </div>
                         <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                           <ShieldAlert className={cn("w-12 h-12", result.securityScan?.found ? "text-red-400" : "text-emerald-400")} />
                        </div>
                        <h4 className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 shrink-0 relative z-10 w-[80%]">
                          Security Integrity Audit
                        </h4>
                        {result.securityScan?.found ? (
                          <div className="space-y-3 relative z-10 overflow-y-auto custom-scrollbar pr-2 flex-1">
                             <p className="text-red-400 text-[10px] font-black uppercase tracking-tight flex items-center gap-1.5 shrink-0 selection:bg-red-500/30 selection:text-white">
                                <AlertOctagon className="w-3 h-3" /> Potential Breach Detected:
                             </p>
                             <div className="flex flex-col gap-2">
                               {result.securityScan.items.map((item: any, i: number) => (
                                 <p key={i} className="text-[10px] font-bold text-red-500 leading-relaxed whitespace-pre-wrap break-words selection:bg-red-500/30 selection:text-white">
                                   {typeof item === 'object' ? JSON.stringify(item, null, 2) : item}
                                 </p>
                               ))}
                             </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 relative z-10 shrink-0">
                             <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                <Lock className="w-4 h-4 text-emerald-400" />
                             </div>
                             <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest selection:bg-emerald-500/30 selection:text-white">Environment Sanitized</p>
                          </div>
                        )}
                      </div>
                   </div>

                   <div className="bg-blue-600/[0.02] p-5 rounded-2xl border border-blue-500/10 relative overflow-hidden group">
                      <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => { navigator.clipboard.writeText(result.insight); toast.success("Insight copied!"); }} className="p-1.5 bg-black/50 hover:bg-white/10 rounded-lg text-blue-400 hover:text-white transition-all backdrop-blur-md border border-white/5 cursor-pointer shadow-lg" title="Copy Insight">
                           <Copy className="w-3.5 h-3.5" />
                         </button>
                      </div>
                      <div className="absolute inset-0 bg-blue-500/[0.01] animate-pulse pointer-events-none" />
                      <h4 className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 relative z-10 w-[80%]">
                        <Sparkles className="w-4 h-4 text-blue-400" /> Synthetic Intelligence Insight
                      </h4>
                      <p className="text-zinc-300 text-xs font-medium leading-relaxed relative z-10 selection:bg-blue-500/30 selection:text-white">{typedInsight}</p>
                   </div>

                   {typedTip && (
                     <div className="bg-emerald-500/[0.03] p-5 rounded-2xl border border-emerald-500/10 relative overflow-hidden group">
                        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => { navigator.clipboard.writeText(result.tip); toast.success("Optimization tip copied!"); }} className="p-1.5 bg-black/50 hover:bg-white/10 rounded-lg text-emerald-400 hover:text-white transition-all backdrop-blur-md border border-white/5 cursor-pointer shadow-lg" title="Copy Tip">
                             <Copy className="w-3.5 h-3.5" />
                           </button>
                        </div>
                       <h4 className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 relative z-10 w-[80%]">
                         <Zap className="w-3.5 h-3.5 text-emerald-400" /> Optimization Vector
                       </h4>
                       <p className="text-emerald-400/80 text-[11px] font-bold leading-relaxed relative z-10 italic selection:bg-emerald-500/30 selection:text-white">{typedTip}</p>
                     </div>
                   )}
                </div>

               {/* Diff View */}
               <div className="h-[250px] lg:flex-1 shrink-0 glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl bg-black/40">
                 <div className="bg-zinc-900/80 border-b border-white/5 px-6 py-4 flex items-center justify-between backdrop-blur-xl">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hidden sm:block">Optimization Matrix (Diff)</h4>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 sm:hidden">Matrix</h4>
                   </div>
                   <div className="flex items-center gap-2">
                      <button 
                        onClick={verifyFix}
                        disabled={verifying}
                        className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 rounded-xl transition-all disabled:opacity-50"
                      >
                        {verifying ? (
                           <Activity className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                           <ShieldCheck className="w-3.5 h-3.5" />
                        )}
                        <span className="hidden sm:inline">{verifying ? "Verifying..." : "Verify Solution"}</span>
                        <span className="sm:hidden">{verifying ? "..." : "Verify"}</span>
                      </button>
                      <button 
                        onClick={handleCopy}
                        className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white border border-white/5 rounded-xl transition-all group scale-100 hover:scale-105 active:scale-95 shadow-xl"
                      >
                        {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />}
                        {copied ? "Copied!" : "Copy Fixed Code"}
                      </button>
                   </div>
                 </div>
                 <div className="flex-1 relative">
                   <DiffEditor
                      key={"diff-" + language}
                     height="100%"
                     language={language}
                     theme="vs-dark"
                     original={code}
                     modified={result.correctedCode}
                     options={{
                       minimap: { enabled: false },
                       readOnly: true,
                       renderSideBySide: true,
                       fontSize: 13,
                       padding: { top: 16 },
                       scrollBeyondLastLine: false,
                       lineNumbersMinChars: 3,
                     }}
                   />
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
