"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const SocialPopover = ({ icon, handle, text, metrics, link }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      className="relative inline-block mx-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a 
        href={link} 
        target="_blank" 
        rel="noreferrer"
        className="inline-flex items-center justify-center bg-[#111111] dark:bg-[#ffffff] text-white dark:text-[#111111] border border-[#333333] dark:border-[#dddddd] px-4 py-1.5 rounded-full hover:-translate-y-1 transition-transform duration-300"
      >
        {icon}
      </a>
      <div className="absolute bottom-full left-0 w-full h-4" />
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.85 }}
        animate={isHovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.85, pointerEvents: "none" }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
        className="absolute bottom-[calc(100%+15px)] left-1/2 -translate-x-1/2 w-[320px] bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-5 z-50 text-left font-sans text-[var(--text-main)] cursor-default"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-serif italic font-bold text-lg border border-[var(--border-color)]">G</div>
          <div className="flex flex-col leading-tight">
            <strong className="text-[0.95rem] font-semibold">Gaurav Raj Singh</strong>
            <span className="text-[0.85rem] text-[var(--text-muted)]">{handle}</span>
          </div>
        </div>
        <div className="text-[0.95rem] mb-4 leading-relaxed">{text}</div>
        <div className="flex gap-6 text-[0.85rem] text-[var(--text-muted)] border-t border-[var(--border-color)] pt-3">
          {metrics}
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[var(--surface-color)] border-r border-b border-[var(--border-color)] rotate-45" />
      </motion.div>
    </span>
  );
};

export default function About() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="glass-card p-8 md:p-12 mb-32"
    >
      <p className="text-[clamp(1.2rem,3vw,1.5rem)] leading-[1.9] font-normal">
        I'm <strong className="tracking-tight">GAURAV</strong> and I believe good work is never accidental. It is the result of curiosity, discipline and iteration. I explore
        <a href="https://en.wikipedia.org/wiki/Visual_communication" target="_blank" className="inline-flex items-center gap-2 px-4 py-1 mx-2 text-[1.05rem] font-medium rounded-full bg-[var(--surface-color)] border border-[var(--border-color)] shadow-sm hover:-translate-y-1 hover:bg-[var(--hover-bg)] transition-all duration-300 group">
          Visual Communication
          <span className="flex gap-1 text-[var(--text-muted)] group-hover:translate-x-1 transition-transform"><span className="w-1.5 h-1.5 rounded-full bg-current"></span><span className="w-1.5 h-1.5 rounded-full bg-current"></span></span>
        </a> 
        by balancing clean systems with creative instinct. I am continuously learning, creating, experimenting, and
        <a href="/works" className="inline-flex items-center gap-2 px-4 py-1 mx-2 text-[1.05rem] font-medium rounded-full bg-[var(--surface-color)] border border-[var(--border-color)] shadow-sm hover:-translate-y-1 hover:bg-[var(--hover-bg)] transition-all duration-300 group">
          Sharing My Process
          <span className="flex gap-1 text-[var(--text-muted)] group-hover:translate-x-1 transition-transform"><span className="w-1.5 h-1.5 rounded-full bg-current"></span><span className="w-1.5 h-1.5 rounded-full bg-current"></span></span>
        </a> 
        because I value lasting craft over quick shortcuts. I am early in my journey, but serious about where I am going.
      </p>

      <div className="mt-8 text-[clamp(1rem,2vw,1.15rem)] text-[var(--text-muted)] leading-[2.2]">
        You can find me on 
        <SocialPopover 
          link="https://x.com/cinexgaurav"
          icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.076H5.078z"/></svg>}
          handle="@cinexgaurav"
          text="Just refactored my portfolio. The mix of generative AI and clean code is feeling incredibly solid right now. 🚀✨ Drop a link to your portfolios below!"
          metrics={<span>124 Likes</span>}
        />
        where I share daily thoughts, and on 
        <SocialPopover 
          link="https://www.linkedin.com/in/cinexg/"
          icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>}
          handle="Creative Developer"
          text="I'm thrilled to share a glimpse into my creative process for the Skyline project. Blending AI generation with traditional dev tools has been a game-changer."
          metrics={<span>412 Likes</span>}
        />
        about my visual experiments.
      </div>
    </motion.section>
  );
}