"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, CheckCircle2, AlertCircle, Copy, Sparkles, Code2 } from "lucide-react";

export function ProductPreview() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            See DebugMind AI in Action
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the power of instant automated debugging.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative group lg:w-4/5 mx-auto"
        >
          {/* Card Container with Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative bg-[#09090b] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto md:h-[500px]">
            
            {/* Left: Mock Editor */}
            <div className="flex-1 border-r border-white/5 flex flex-col min-w-0">
              <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5 focus-within:ring-0">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-xs text-gray-500 ml-2 font-mono">auth-handler.ts</span>
                </div>
                <Copy className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-400" />
              </div>
              <div className="p-6 font-mono text-sm overflow-hidden flex-1 bg-[#0d0d0f]">
                <div className="flex gap-4">
                  <div className="text-gray-700 text-right select-none">
                    1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8
                  </div>
                  <div className="text-gray-300">
                    <span className="text-blue-400">async function</span> <span className="text-purple-400">getUser</span>(id: <span className="text-yellow-400">string</span>) &#123;<br/>
                    &nbsp;&nbsp;<span className="text-blue-400">try</span> &#123;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">const</span> response = <span className="text-blue-400">await</span> fetch(`/api/users/$&#123;id&#125;`);<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400 bg-red-500/10 border-b border-red-500/30">return response.json;</span> <span className="text-red-500 text-xs ml-2">// TypeError</span><br/>
                    &nbsp;&nbsp;&#125; <span className="text-blue-400">catch</span>(e) &#123;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;console.log(e);<br/>
                    &nbsp;&nbsp;&#125;<br/>
                    &#125;
                  </div>
                </div>
              </div>
            </div>

            {/* Right: AI Panel */}
            <div className="w-full md:w-[350px] bg-zinc-950 flex flex-col">
              <div className="p-4 border-b border-white/5 flex items-center gap-2 text-blue-400 font-semibold text-sm">
                <Sparkles className="w-4 h-4" />
                AI Analysis
              </div>
              <div className="p-6 space-y-6 flex-1 overflow-auto">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <AlertCircle className="w-3 h-3 text-red-500" />
                    Bug Cause
                  </h4>
                  <p className="text-sm text-gray-300">
                    You're returning the function reference `response.json` instead of calling it with `await response.json()`.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Code2 className="w-3 h-3 text-blue-500" />
                    Fix Explanation
                  </h4>
                  <p className="text-sm text-gray-300 italic">
                    Added parentheses to invoke the method and await the resulting promise.
                  </p>
                </div>

                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                  <h4 className="text-xs font-bold text-blue-400 uppercase mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3" />
                    Corrected Code
                  </h4>
                  <pre className="text-xs font-mono text-blue-100 overflow-x-auto">
                    return await response.json();
                  </pre>
                </div>
              </div>
              <div className="p-4 bg-zinc-900/50 mt-auto">
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                  Apply Fix
                  <Terminal className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
