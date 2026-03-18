"use client";

import { motion, AnimatePresence } from "framer-motion";
import { History, Trash2, Search, Filter, ShieldCheck, AlertTriangle, Bug, Code2, ExternalLink, Activity, BarChart3, PieChart, Info, Eye, Calendar, Clock, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getHistory, deleteHistory, HistoryEntry } from "@/lib/history";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id: string) => {
    deleteHistory(id);
    setHistory(getHistory());
  };

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.error.toLowerCase().includes(search.toLowerCase()) || 
                          item.cause.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || item.severity.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Analytics Logic
  const stats = {
    syntax: history.filter(h => h.cause.toLowerCase().includes('syntax') || h.cause.toLowerCase().includes('unexpected')).length,
    logic: history.filter(h => h.cause.toLowerCase().includes('logic') || h.cause.toLowerCase().includes('type') || h.cause.toLowerCase().includes('undefined')).length,
    performance: history.filter(h => h.cause.toLowerCase().includes('loop') || h.cause.toLowerCase().includes('memory') || h.cause.toLowerCase().includes('speed')).length,
  };
  const total = stats.syntax + stats.logic + stats.performance || 1;
  const percentages = {
    syntax: Math.round((stats.syntax / total) * 100),
    logic: Math.round((stats.logic / total) * 100),
    performance: Math.round((stats.performance / total) * 100),
  };

  return (
    <div className="max-w-6xl mx-auto w-full h-full flex flex-col space-y-6 animate-in fade-in duration-700">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Neural Archive</h1>
          <p className="text-zinc-500 font-medium text-sm uppercase tracking-widest text-[10px]">Historical data of all processed bug vectors.</p>
        </div>
      </div>

      {/* Analytics Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-[2rem] border border-white/5 bg-white/[0.01]"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
           <div className="flex-1 space-y-4 w-full">
              <div className="flex items-center justify-between">
                 <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <PieChart className="w-3.5 h-3.5 text-blue-500" /> Error Archetype Distribution
                 </h3>
                 <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{history.length} Cycles Logged</span>
              </div>
              
              <div className="flex h-3 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                 <motion.div initial={{ width: 0 }} animate={{ width: `${percentages.syntax}%` }} className="h-full bg-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.3)]" />
                 <motion.div initial={{ width: 0 }} animate={{ width: `${percentages.logic}%` }} className="h-full bg-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                 <motion.div initial={{ width: 0 }} animate={{ width: `${percentages.performance}%` }} className="h-full bg-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
              </div>

              <div className="flex flex-wrap gap-6">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">Syntax ({percentages.syntax}%)</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">Logic ({percentages.logic}%)</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">Performance ({percentages.performance}%)</span>
                 </div>
              </div>
           </div>

           <div className="shrink-0 flex gap-4">
              <div className="glass-card px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
                 <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Success Rate</p>
                 <p className="text-xl font-black text-emerald-500">99.8%</p>
              </div>
              <div className="glass-card px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
                 <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Neural Load</p>
                 <p className="text-xl font-black text-blue-500">OPTIMAL</p>
              </div>
           </div>
        </div>
      </motion.div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text"
            placeholder="Search by cause, error, or language..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
          />
        </div>
        
        <div className="flex bg-white/[0.02] border border-white/5 rounded-2xl p-1 shadow-inner">
           {['all', 'critical', 'warning', 'minor'].map((lvl) => (
             <button
               key={lvl}
               onClick={() => setFilter(lvl)}
               className={cn(
                 "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                 filter === lvl ? "bg-white/5 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
               )}
             >
               {lvl}
             </button>
           ))}
        </div>
      </div>

      <div className="flex-1 glass-card border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Temporal Vector</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Environment</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Bug Analysis</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Priority</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              <AnimatePresence mode="popLayout">
                {filteredHistory.map((item) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id} 
                    className="hover:bg-blue-500/[0.02] transition-colors group cursor-default"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                         <div className="bg-zinc-800 p-2 rounded-lg group-hover:bg-blue-500/10 transition-colors">
                            <Calendar className="w-4 h-4 text-zinc-500 group-hover:text-blue-500 transition-colors" />
                         </div>
                         <span className="text-zinc-300 font-mono text-xs">{item.date}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-blue-400 text-[10px] font-black uppercase tracking-tighter">
                        {item.lang}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-white font-bold text-sm line-clamp-1">{item.cause}</span>
                        <span className="text-zinc-500 text-xs font-medium line-clamp-1">{item.error}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        item.severity === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                        item.severity === 'Warning' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                        'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }`}>
                        {item.severity}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-70 hover:opacity-100 transition-all">
                        <Link href="/dashboard/debug">
                          <button className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 rounded-xl transition-all shadow-xl" title="Re-open Session">
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-500 hover:border-red-500/20 rounded-xl transition-all shadow-xl" title="Delete Session"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                       <div className="w-16 h-16 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center">
                          <History className="w-8 h-8 text-zinc-800" />
                       </div>
                       <div>
                          <p className="text-white font-black text-lg uppercase tracking-tighter">No Neural Archives Found</p>
                          <p className="text-zinc-500 text-xs font-medium">Initialize a debugging cycle to begin data logging.</p>
                       </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
