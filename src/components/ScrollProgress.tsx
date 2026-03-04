"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Adding a spring physics config makes the bar follow the scroll with a slight, premium delay
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[9997] pointer-events-none origin-left bg-transparent">
      <motion.div
        className="h-full bg-[var(--text-main)] w-full origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}