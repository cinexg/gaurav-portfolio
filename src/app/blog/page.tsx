"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { myBlogs } from "@/lib/data";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Instantly filter blogs based on the search query
  const filteredBlogs = myBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
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
          Journal
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[1.15rem] text-[var(--text-muted)]"
        >
          Thoughts, tutorials, and design insights.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative w-full max-w-[400px] mt-4"
        >
          <input 
            type="text" 
            placeholder="Search journal entries..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl font-sans text-[1rem] text-[var(--text-main)] outline-none focus:border-[var(--text-main)] focus:ring-4 focus:ring-black/5 dark:focus:ring-white/5 transition-all"
          />
          {/* Search Icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </motion.div>
      </header>

      {/* Filtered Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3, delay: index * 0.05 }}
              >
                <Link href={blog.url} className="block glass-card interactive-card p-7 group cursor-none h-full hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center mb-5">
                    <span className="text-[0.8rem] px-3 py-1 bg-[var(--hover-bg)] rounded-full text-[var(--text-muted)] font-medium">
                      {blog.category}
                    </span>
                    <span className="text-[0.9rem] text-[var(--text-muted)] ml-3">
                      {blog.date}
                    </span>
                  </div>
                  <h3 className="text-[1.4rem] font-semibold tracking-tight text-[var(--text-main)] mb-3 group-hover:opacity-80 transition-opacity">
                    {blog.title}
                  </h3>
                  <p className="text-[1rem] text-[var(--text-muted)]">
                    {blog.readTime}
                  </p>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-[var(--text-muted)] col-span-1 md:col-span-2 py-10"
            >
              No journal entries found matching that keyword.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}