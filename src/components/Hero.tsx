"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

export default function Hero() {

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col items-start gap-10 mb-28 mt-10"
    >
      <div className="max-w-[650px] relative z-10">

        <motion.h1
          variants={itemVariants}
          className="text-[clamp(2.5rem,6vw,4.2rem)] font-medium tracking-tight leading-[1.05] mb-6"
        >
          Hi, I build cool things.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-[clamp(1.1rem,2vw,1.25rem)] text-[var(--text-muted)] mb-14 leading-relaxed max-w-[500px]"
        >
          I build digital work with discipline, clarity, and long term thinking. It believe that it should feel mature. It does not oversell. It respects the culture.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-5">

          <Link
            href="/contact"
            className="flex-1 min-w-[200px] p-6 glass-card interactive-card group flex flex-col hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 cursor-none"
          >
            <span className="text-[0.85rem] text-[var(--text-muted)] mb-3 flex justify-between items-center font-medium">
              Available
              <span className="flex gap-[3px] items-center text-green-500">
                <span className="w-1.5 h-1.5 rounded-full bg-current group-hover:translate-x-2 transition-transform duration-300"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-current group-hover:-translate-x-2 transition-transform duration-300"></span>
              </span>
            </span>

            <span className="text-[1.15rem] font-semibold tracking-tight">
              Connect with Me
            </span>
          </Link>

          <Link
            href="/blog"
            className="flex-1 min-w-[200px] p-6 glass-card interactive-card group flex flex-col hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 cursor-none"
          >
            <span className="text-[0.85rem] text-[var(--text-muted)] mb-3 flex justify-between items-center font-medium">
              Writing
              <span className="flex gap-[3px] items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-current group-hover:translate-x-2 transition-transform duration-300"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-current group-hover:-translate-x-2 transition-transform duration-300"></span>
              </span>
            </span>

            <span className="text-[1.15rem] font-semibold tracking-tight">
              Read my thoughts
            </span>
          </Link>

        </motion.div>
      </div>
    </motion.header>
  );
}