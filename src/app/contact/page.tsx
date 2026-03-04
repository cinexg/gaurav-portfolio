"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="w-full mt-10 md:mt-16 min-h-[70vh] flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center max-w-[600px] w-full"
      >
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-4 border-[var(--surface-color)] shadow-[0_12px_32px_rgba(0,0,0,0.1)] mb-6 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <img src="/images/logo.svg" alt="Gaurav" className="w-full h-full object-cover" />
        </div>
        
        <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-medium tracking-tight mb-4">
          Let's talk.
        </h1>
        
        <p className="text-[1.15rem] text-[var(--text-muted)] mb-14 leading-relaxed">
          Feel free to reach out if you're looking for a developer, a designer, or simply want to connect about future projects.
        </p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="glass-card w-full p-8 md:p-10 text-left cursor-none"
        >
          {/* Replace the action URL with your actual Formspree endpoint if needed */}
          <form action="https://formspree.io/f/" method="POST" className="flex flex-col gap-6">
            <input type="text" name="_gotcha" className="hidden" />
            
            <div className="flex flex-col gap-2">
              <label className="font-medium text-[0.95rem]">Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="Jane Doe" 
                required 
                className="w-full p-4 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl font-sans text-[1rem] text-[var(--text-main)] outline-none focus:border-[var(--text-main)] focus:ring-4 focus:ring-black/5 dark:focus:ring-white/5 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-[0.95rem]">Email address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="jane@example.com" 
                required 
                className="w-full p-4 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl font-sans text-[1rem] text-[var(--text-main)] outline-none focus:border-[var(--text-main)] focus:ring-4 focus:ring-black/5 dark:focus:ring-white/5 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-[0.95rem]">Message</label>
              <textarea 
                name="message" 
                placeholder="Tell me about your project..." 
                required 
                rows={5}
                className="w-full p-4 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl font-sans text-[1rem] text-[var(--text-main)] outline-none focus:border-[var(--text-main)] focus:ring-4 focus:ring-black/5 dark:focus:ring-white/5 transition-all resize-y"
              ></textarea>
            </div>

            <input type="hidden" name="_next" value="/thanks" />
            
            <button 
              type="submit" 
              className="mt-2 w-full bg-[var(--text-main)] text-[var(--surface-color)] py-4 rounded-xl font-medium text-[1.05rem] hover:opacity-90 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-none"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </motion.div>
    </main>
  );
}