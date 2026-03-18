"use client";

import { motion } from "framer-motion";
import { Terminal, Code, BookOpen, Cpu, Shield, Zap, ChevronRight, Search } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "Quickstart",
    description: "Get up and running with DebugMind AI in under 5 minutes.",
    icon: Zap,
    links: ["Installation", "First Analysis", "Authentication"]
  },
  {
    title: "API Reference",
    description: "Integrate our core debugging engine directly into your tools.",
    icon: Code,
    links: ["REST API", "GraphQL Support", "Rate Limits"]
  },
  {
    title: "SDKs & Tools",
    description: "Official wrappers for your favorite languages and IDEs.",
    icon: Cpu,
    links: ["VS Code Extension", "Python SDK", "Node.js Library"]
  }
];

export function Docs() {
  return (
    <section id="docs" className="py-32 px-6 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/[0.03] blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900 shadow-xl text-blue-500 text-xs font-black uppercase tracking-widest mb-8">
                <BookOpen className="w-4 h-4" /> Documentation
              </div>
              <h2 className="text-3xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
                Built by developers <br /> <span className="text-zinc-600">for developers.</span>
              </h2>
              <p className="text-zinc-400 text-lg md:text-xl font-medium mb-12 leading-relaxed">
                Whether you're integrating our SDK into a massive monorepo or just using the web tool for a quick fix, our documentation has everything you need to succeed.
              </p>

              <div className="space-y-4">
                {categories.map((cat, idx) => (
                  <motion.div
                    key={cat.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-zinc-900/30 border border-white/5 hover:border-blue-500/20 p-6 rounded-3xl transition-all hover:bg-zinc-900/50"
                  >
                    <div className="flex gap-5">
                       <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                          <cat.icon className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors" />
                       </div>
                       <div>
                          <h3 className="text-xl font-bold text-white mb-1">{cat.title}</h3>
                          <p className="text-zinc-500 text-sm font-medium mb-4">{cat.description}</p>
                          <div className="flex flex-wrap gap-2">
                             {cat.links.map(link => (
                               <span key={link} className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-blue-400 cursor-pointer transition-colors bg-zinc-900/50 px-2 py-1 rounded-md border border-zinc-800/50">
                                 {link}
                               </span>
                             ))}
                          </div>
                       </div>
                       <ChevronRight className="w-5 h-5 text-zinc-800 ml-auto group-hover:text-blue-500 group-hover:translate-x-1 transition-all self-center" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Mock Code Block / Terminal */}
            <div className="glass-card rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="bg-zinc-900 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">bash — terminal</div>
                  <Terminal className="w-4 h-4 text-zinc-700" />
               </div>
                <div className="p-6 md:p-10 font-mono text-xs md:text-sm leading-relaxed text-zinc-300">
                  <div className="flex gap-4 mb-4">
                    <span className="text-zinc-600">1</span>
                    <span className="text-emerald-400">npm</span> install @debugmind/sdk
                  </div>
                  <div className="flex gap-4 mb-8">
                    <span className="text-zinc-600">2</span>
                    <span className="text-zinc-400"># Setting up the analyzer</span>
                  </div>
                  <div className="flex gap-4 mb-4">
                    <span className="text-zinc-600">3</span>
                    <span className="text-blue-400">import</span> &#123; Analyzer &#125; <span className="text-blue-400">from</span> <span className="text-emerald-300">"@debugmind/sdk"</span>;
                  </div>
                  <div className="flex gap-4 mb-4">
                    <span className="text-zinc-600">4</span>
                    <span className="text-blue-400">const</span> analyzer = <span className="text-blue-400">new</span> Analyzer(&#123;
                  </div>
                  <div className="flex gap-4 mb-4">
                    <span className="text-zinc-600">5</span>
                    &nbsp;&nbsp;apiKey: <span className="text-emerald-300">process.env.DEBUGMIND_KEY</span>,
                  </div>
                  <div className="flex gap-4 mb-4">
                    <span className="text-zinc-600">6</span>
                    &nbsp;&nbsp;mode: <span className="text-emerald-300">"auto-fix"</span>
                  </div>
                  <div className="flex gap-4 mb-6">
                    <span className="text-zinc-600">7</span>
                    &#125;);
                  </div>
                  <div className="flex gap-4 mb-4">
                    <span className="text-zinc-600">8</span>
                    <span className="text-blue-400">await</span> analyzer.squash(error);
                  </div>
                  <div className="flex gap-4 animate-pulse">
                    <span className="text-zinc-600">9</span>
                    <span className="w-2 h-5 bg-blue-500" />
                  </div>
               </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-10 -right-10 glass-card p-5 rounded-3xl border border-white/20 shadow-2xl animate-bounce duration-[3000ms]">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Security</p>
                    <p className="text-white font-bold text-xs uppercase">SOC-2 Type II</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
