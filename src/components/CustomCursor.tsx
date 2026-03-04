"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Motion values for instant tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for the follower ring (the slight delay effect)
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const followerX = useSpring(cursorX, springConfig);
  const followerY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on desktop devices
    if (window.matchMedia("(any-pointer: coarse)").matches) return;
    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive-card")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main tiny dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[var(--text-main)] rounded-full pointer-events-none z-[9999] -ml-[3px] -mt-[3px]"
        style={{ x: cursorX, y: cursorY }}
        animate={{ opacity: isHovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Follower ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-gray-400/40 mix-blend-difference"
        style={{ x: followerX, y: followerY }}
        animate={{
          width: isHovering ? 50 : 36,
          height: isHovering ? 50 : 36,
          marginLeft: isHovering ? -25 : -18,
          marginTop: isHovering ? -25 : -18,
          backgroundColor: isHovering ? "#FFFFFF" : "transparent",
          borderColor: isHovering ? "transparent" : "rgba(150, 150, 150, 0.4)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </>
  );
}