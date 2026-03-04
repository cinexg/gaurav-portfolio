"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThanksPage() {
  return (
    <main className="w-full mt-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="text-green-500 mb-6"
      >
        <CheckCircle size={64} strokeWidth={1.5} />
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-[clamp(2rem,5vw,3rem)] font-medium tracking-tight mb-4"
      >
        Message received.
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-[1.15rem] text-[var(--text-muted)] max-w-[500px] mb-10"
      >
        Thanks for reaching out! I'll review your details and get back to you within the next 24-48 hours.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-[var(--text-main)] text-[var(--surface-color)] px-8 py-3.5 rounded-xl font-medium hover:opacity-90 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-none"
        >
          &larr; Back to Home
        </Link>
      </motion.div>
    </main>
  );
}