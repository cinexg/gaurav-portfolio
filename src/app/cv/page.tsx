"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CVPage() {
  return (
    <main className="w-full mt-10 md:mt-16 min-h-[70vh] flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center max-w-[700px] w-full"
      >
        <div className="w-full h-[350px] rounded-[20px] overflow-hidden border border-[var(--border-color)] shadow-[var(--shadow-sm)] mb-8">
          <img 
            src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800&auto=format&fit=crop" 
            alt="Dog working on laptop" 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <span className="inline-block px-4 py-1.5 bg-red-500/10 text-red-500 text-[0.85rem] font-semibold rounded-full mb-6 tracking-wide uppercase">
          Area Restricted
        </span>
        
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-medium tracking-tight mb-4">
          Under Construction.
        </h1>
        
        <p className="text-[1.15rem] text-[var(--text-muted)] mb-4 leading-relaxed">
          My CV is currently undergoing an extreme aesthetic makeover. It simply wasn't pixel-perfect enough for this portfolio yet.
        </p>
        
        <p className="text-[1.1rem] font-medium text-[var(--text-main)] mb-10">
          ⚠️ Trespassers will be forced to fix my CSS bugs. ⚠️
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/" 
            className="bg-[var(--surface-color)] text-[var(--text-main)] border border-[var(--border-color)] px-8 py-3.5 rounded-xl font-medium hover:bg-[var(--hover-bg)] hover:-translate-y-1 transition-all duration-300 cursor-none"
          >
            &larr; Retreat to Safety
          </Link>
          <Link 
            href="/contact" 
            className="bg-[var(--text-main)] text-[var(--surface-color)] px-8 py-3.5 rounded-xl font-medium hover:opacity-90 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-none"
          >
            Message me instead
          </Link>
        </div>
      </motion.div>
    </main>
  );
}