"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { myProjects } from "@/lib/data";

export default function WorksPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Instantly filter projects based on the search query
  const filteredProjects = myProjects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="w-full mt-10 md:mt-20 min-h-[60vh]">
      {/* Header & Search */}
      <header className="flex flex-col items-start gap-4 mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[clamp(2.5rem,5vw,3.5rem)] font-medium tracking-tight"
        >
          Case Studies
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[1.15rem] text-[var(--text-muted)]"
        >
          Selected clients and personal projects from the past years.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative w-full max-w-[400px] mt-4"
        >
          <input 
            type="text" 
            placeholder="Search case studies..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl font-sans text-[1rem] text-[var(--text-main)] outline-none focus:border-[var(--text-main)] focus:ring-4 focus:ring-black/5 dark:focus:ring-white/5 transition-all"
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </motion.div>
      </header>

      {/* Filtered Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              >
                <Link href={project.url} className="block glass-card interactive-card p-3 group cursor-none h-full">
                  <div className="w-full aspect-[16/10] rounded-[14px] overflow-hidden mb-5 bg-[var(--border-color)] relative">
                    <img 
                      src={project.thumbnail} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                    />
                  </div>
                  <div className="flex justify-between items-center px-2 pb-2">
                    <span className="font-semibold text-[1.05rem] flex items-center gap-2.5 tracking-tight">
                      <span className="text-[var(--text-muted)] bg-[var(--pill-bg)] px-2 py-1.5 rounded-md flex gap-[3px] items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-current group-hover:translate-x-1 transition-transform"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-current group-hover:-translate-x-1 transition-transform"></span>
                      </span>
                      {project.title}
                    </span>
                    <span className="text-[0.8rem] px-3 py-1 bg-[var(--pill-bg)] rounded-full text-[var(--text-muted)] font-medium">
                      {project.tag}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-[var(--text-muted)] col-span-1 md:col-span-2 py-10"
            >
              No projects found matching that keyword.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}