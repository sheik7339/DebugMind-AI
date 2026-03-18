"use client";

import { motion } from "framer-motion";
import { Copy, Terminal, Activity, Zap, Search, MoreVertical, Trash2, Eye, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/FirebaseAuthProvider";

const mockHistory = [
  { id: 1, date: "2026-03-15", lang: "TypeScript", error: "TypeError: Cannot read properties of undefined (reading 'map')", status: "Resolved", severity: "Critical" },
  { id: 2, date: "2026-03-14", lang: "Python", error: "IndentationError: expected an indented block", status: "Resolved", severity: "Minor" },
  { id: 3, date: "2026-03-12", lang: "Rust", error: "borrow of moved value: `user`", status: "Resolved", severity: "Warning" },
];

import { getHistory, deleteHistory, HistoryEntry } from "@/lib/history";

export default function DashboardPage() {
  const { user, tier, usageCount, geminiKey } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  
  useEffect(() => {
    setMounted(true);
    setHistory(getHistory());
  }, []);

  const handleDelete = (id: string) => {
    deleteHistory(id);
    setHistory(getHistory());
    toast.success("Log deleted successfully");
  };

  if (!mounted) return null;

  // Derive stats from history
  const bugsFixed = history.length;
  const hoursSaved = (bugsFixed * 0.5).toFixed(1); // Assume 30 mins saved per bug
  const activeSessions = history.filter(h => {
    const entryDate = new Date(h.date);
    const now = new Date();
    return (now.getTime() - entryDate.getTime()) < 3600000; // Active if within last hour
  }).length;

  return (
    <div className="max-w-6xl mx-auto w-full space-y-6 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {user?.photoURL && (
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden border-2 border-white/5 ring-4 ring-blue-500/10 shadow-2xl shrink-0">
              <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1 text-white">
              Welcome back, <span className="text-blue-500 capitalize">{user?.displayName?.split(" ")[0] || "Developer"}</span>
            </h1>
            <p className="text-zinc-500 font-medium text-sm md:text-base">Here's what's happening in your workspace today.</p>
          </div>
        </div>
        <Link href="/dashboard/debug" className="w-full md:w-auto">
          <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 active:scale-95">
            <Zap className="w-4 h-4" />
            New Debug Session
          </button>
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Bugs Fixed", value: bugsFixed.toString(), icon: Activity, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Hours Saved", value: `${hoursSaved}h`, icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Active Sessions", value: activeSessions.toString(), icon: Terminal, color: "text-blue-500", bg: "bg-blue-500/10" },
          { 
            label: "Neural Quota", 
            value: tier === 'pro' || geminiKey ? "∞" : `${usageCount}/5`, 
            icon: Sparkles, 
            color: "text-blue-400", 
            bg: "bg-blue-500/10",
            footer: (
               <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ width: tier === 'pro' || geminiKey ? '100%' : `${(usageCount/5)*100}%` }} 
                  />
               </div>
            )
          }
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="glass-card rounded-xl p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-2xl font-black text-white">{stat.value}</h3>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            {stat.footer}
          </motion.div>
        ))}
      </div>

      {/* Quick History */}
      <div className="glass-card rounded-xl border border-zinc-800/50 overflow-hidden bg-white/[0.01]">
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
            <Search className="w-4 h-4 text-blue-500" /> Recent Debug Logs
          </h3>
          <Link href="/dashboard/history" className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400">
            View full history
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-zinc-500 font-black uppercase tracking-widest bg-white/[0.02]">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Language</th>
                <th className="px-6 py-4">Error Summary</th>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-600 font-medium">
                    No debug logs found. Start your first session to see reality!
                  </td>
                </tr>
              ) : (
                history.slice(0, 5).map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 text-zinc-500 text-xs">{item.date.split(",")[0]}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-400 text-[10px] font-mono font-bold uppercase">{item.lang}</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-[11px] text-red-400/80 truncate max-w-[280px]">{item.error}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        item.severity === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                        item.severity === 'Warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {item.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-70 hover:opacity-100 transition-opacity">
                        <Link href={`/dashboard/history?id=${item.id}`}>
                          <button className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/10 text-zinc-400 hover:text-blue-500 transition-all">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
