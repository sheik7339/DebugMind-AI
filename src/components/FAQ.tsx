"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How accurate is the AI in detecting bugs?",
    answer: "DebugMind AI uses an ensemble of specialized large language models (including GPT-4o and Claude 3.5) fine-tuned on billions of lines of code. It currently maintains a 94.2% accuracy rate in identifying root causes across 40+ programming languages."
  },
  {
    question: "Is my code secure and private?",
    answer: "Absolutely. We are SOC-2 Type II compliant. Your code is processed in volatile memory and is never used to train our base models unless you explicitly opt into a private Enterprise fine-tuning program. All data is encrypted at rest and in transit."
  },
  {
    question: "Which programming languages do you support?",
    answer: "We offer full syntax and logic support for TypeScript, JavaScript, Python, Rust, Go, Java, C++, Ruby, PHP, and 30+ other languages. Our analyzer also understands major frameworks like React, Next.js, Django, and Spring."
  },
  {
    question: "Can I integrate this into my existing CI/CD pipeline?",
    answer: "Yes! Our Pro and Enterprise plans include access to our CLI tool and GitHub Actions integration. You can automatically run DebugMind analysis on every PR to catch bugs before they ever reach production."
  }
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 bg-transparent relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6"
          >
            <HelpCircle className="w-3 h-3" /> Common Questions
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Got <span className="text-blue-500">Questions?</span>
          </h2>
          <p className="text-zinc-500 text-lg font-medium">Everything you need to know about DebugMind AI.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-card rounded-3xl border ${activeIndex === idx ? "border-blue-500/30 bg-blue-500/[0.02]" : "border-white/5"} overflow-hidden transition-all`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full p-8 flex items-center justify-between text-left group"
              >
                <span className={`text-lg font-bold tracking-tight transition-colors ${activeIndex === idx ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${activeIndex === idx ? "bg-blue-600 border-blue-500 text-white rotate-0" : "bg-white/5 border-white/10 text-zinc-500 rotate-90"}`}>
                  {activeIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 text-zinc-500 text-sm leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
