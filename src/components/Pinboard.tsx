"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Pinboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={containerRef} className="mb-32 px-2">
      <motion.div 
        style={{ y }}
        className="bg-[#F5F4F0] dark:bg-[#0f0f0f] border border-[var(--border-color)] rounded-[28px] p-8 md:p-16 relative max-w-5xl mx-auto transition-colors duration-500"
      >
        <div className="absolute -top-7 -right-7 md:-top-7 md:-right-7 w-16 h-16 md:w-[72px] md:h-[72px] border-4 md:border-[6px] border-[var(--bg-color)] rounded-[20px] shadow-lg overflow-hidden bg-[var(--surface-color)] flex items-center justify-center">
          <img src="/images/logo.svg" alt="Avatar" className="w-full h-full object-cover" />
        </div>

        <span className="inline-block px-3 py-1 bg-[var(--pill-bg)] text-[var(--text-muted)] text-[0.8rem] font-medium rounded-full mb-8">
          Mission Statement
        </span>
        
        <h2 className="text-[clamp(1.8rem,4vw,3.4rem)] font-medium tracking-tight leading-[1.1] mb-8 text-[var(--text-main)] max-w-[800px]">
          Turning creative chaos into <em className="font-serif italic font-normal">consistent</em> design.
        </h2>
        
        <div className="space-y-4 text-[1.15rem] text-[var(--text-muted)] leading-[1.7] max-w-[650px]">
          <p>I work with ambitious brands and individuals who are ready to elevate their digital presence.</p>
          <p>Not just to chase trends, but to show up with profound purpose and build systems that resonate and scale natively.</p>
          <p>For me, generative AI is just the starting point. My approach combines logic, execution, and visual consistency.</p>
        </div>
        
        <div className="flex items-center gap-5 mt-14">
          <div className="w-12 h-12 rounded-full border border-[var(--border-color)] bg-[var(--surface-color)] flex items-center justify-center overflow-hidden shrink-0">
             <div className="font-serif italic font-bold">G</div>
          </div>
          <span className="font-serif italic font-semibold text-[1.2rem]">Gaurav</span>
        </div>
      </motion.div>
    </section>
  );
}