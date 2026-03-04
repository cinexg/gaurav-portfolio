"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { myProjects } from "@/lib/data";

export default function ProjectsGrid() {
  return (
    <section className="mb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <Link href="/works" className="inline-flex items-center gap-2 text-[1.2rem] font-semibold tracking-tight hover:opacity-60 transition-opacity">
          New Work &rarr;
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {myProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          >
            <Link href={project.url} className="block glass-card interactive-card p-3 group cursor-none">
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
        ))}
      </div>
    </section>
  );
}