"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Engineer at Vercel",
    content: "DebugMind AI saved me 4 hours of debugging on a complex memory leak issue in production. It's now a mandatory tool in our stack.",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Marcus Thorne",
    role: "Fullstack Developer",
    content: "The way it explains the root cause is what sets it apart. It doesn't just fix code; it makes you a better developer by explaining the 'why'.",
    image: "https://i.pravatar.cc/150?u=marcus"
  },
  {
    name: "Elena Rodriguez",
    role: "CTO at Streamline",
    content: "The ROI was immediate. Our engineering team slowed down significantly less during bug-fixing sprints. Simply incredible.",
    image: "https://i.pravatar.cc/150?u=elena"
  }
];

export function Testimonials() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6"
          >
            <Star className="w-3 h-3 fill-blue-400" /> Testimonials
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Trusted by the <span className="text-blue-500">Best.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/20 transition-all group relative"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-blue-500/10 group-hover:text-blue-500/20 transition-colors" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/5 ring-4 ring-blue-500/10">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-wider">{t.name}</h4>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>

              <p className="text-zinc-400 text-lg font-medium leading-relaxed italic relative z-10">
                "{t.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
