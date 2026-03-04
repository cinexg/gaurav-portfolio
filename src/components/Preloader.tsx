"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // 1. We define the dynamic text based on the current URL
  const getLoadingText = () => {
    if (pathname.includes("/works")) return "Loading Work.";
    if (pathname.includes("/blog")) return "Writing Blog.";
    if (pathname.includes("/cv")) return "Making CV.";
    if (pathname.includes("/contact")) return "Opening Channels.";
    return "Crafting Experience."; // Default for the homepage
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 10) + 1; 
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "auto";
          }, 400); 
          return 100;
        }
        return next;
      });
    }, 40);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []); // Only runs on initial page load

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[10000] bg-[var(--bg-color)] flex items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center gap-6">
            
            {/* 2. We animate the dynamic text so it fades in with a premium blur effect */}
            <motion.span 
              key={pathname}
              initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif italic text-4xl md:text-5xl text-[var(--text-main)] tracking-tight"
            >
              {getLoadingText()}
            </motion.span>

            <div className="w-[200px] h-[2px] bg-[var(--border-color)] rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-[var(--text-main)] transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-[0.85rem] text-[var(--text-muted)] font-medium tabular-nums">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}