"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Paste your code and error",
    description: "Simply drop your buggy code and the stack trace into our interface. We'll handle the rest.",
  },
  {
    step: "02",
    title: "AI analyzes the issue",
    description: "Our specialized models trace the logic and context to find the root cause in milliseconds.",
  },
  {
    step: "03",
    title: "Get the fix instantly",
    description: "Review the explanation and apply the suggested fix with a single click. Boom, bug gone.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Debugging has never been this simple. Follow these three easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 -z-10" />

          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="relative bg-[#040405] backdrop-blur-xl border border-white/5 rounded-3xl p-8 h-full hover:border-blue-500/30 transition-all duration-300 shadow-2xl">
                <div className="text-6xl font-black text-blue-500 mb-6 tracking-tighter drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>
                
                {/* Underline decoration */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 rounded-full group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
