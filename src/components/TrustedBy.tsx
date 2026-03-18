"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Cpu, Cloud, Database, Globe, Layers } from "lucide-react";

const logos = [
  { name: "GitStack", icon: Github },
  { name: "CoreProcess", icon: Cpu },
  { name: "CloudBase", icon: Cloud },
  { name: "DataFlow", icon: Database },
  { name: "WebSphere", icon: Globe },
  { name: "Layered", icon: Layers },
];

export function TrustedBy() {
  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-blue-500/80 mb-12">
          Trusted by developers worldwide
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-20 opacity-80 hover:opacity-100 transition-all duration-500">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center gap-3 group cursor-default">
              <logo.icon className="w-8 h-8 text-gray-300 group-hover:text-blue-500 transition-colors" />
              <span className="text-xl font-bold text-gray-200 group-hover:text-white transition-colors">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
