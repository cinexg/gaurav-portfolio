"use client";

import { motion } from "framer-motion";
import { myStack } from "@/lib/data";

export default function TechStack() {
  return (
    <section className="mb-32">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[1.2rem] font-semibold tracking-tight mb-6"
      >
        Software Stack &rarr;
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[var(--border-color)] border border-[var(--border-color)] rounded-[20px] overflow-hidden">
        {myStack.map((item, index) => (
          <motion.a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="flex items-center justify-between p-6 bg-[var(--surface-color)] hover:bg-[var(--hover-bg)] transition-colors duration-300 group cursor-none"
          >
            <div className="flex items-center gap-5 group-hover:translate-x-2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                style={{ backgroundColor: item.bg }}
              >
                {/* This is the fix: We are now rendering an image 
                  instead of raw text. 
                */}
                <img 
                  src={item.icon} 
                  alt={`${item.name} logo`} 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[1rem] tracking-tight">{item.name}</span>
                <span className="text-[0.85rem] text-[var(--text-muted)]">{item.desc}</span>
              </div>
            </div>
            
            <div className="opacity-0 -translate-x-4 text-[var(--text-muted)] group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[var(--text-main)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}