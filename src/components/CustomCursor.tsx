"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isHolding, setIsHolding] = useState(false); // New state for click/drag

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

    // Handlers for Click/Hold/Drag visuals
    const handleMouseDown = () => setIsHolding(true);
    const handleMouseUp = () => setIsHolding(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  // Calculate dynamic size based on current action
  // Holding takes precedence to simulate a "grab" or "pinch" effect
  const ringSize = isHolding ? 24 : isHovering ? 50 : 36;
  const ringOffset = -ringSize / 2;

  return (
    <>
      {/* Main tiny dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[var(--text-main)] rounded-full pointer-events-none z-[9999] -ml-[3px] -mt-[3px]"
        style={{ x: cursorX, y: cursorY }}
        animate={{ 
          opacity: isHovering || isHolding ? 0 : 1,
          scale: isHolding ? 0.5 : 1 // Shrink the dot slightly when clicking
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Follower ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-gray-400/40 mix-blend-difference"
        style={{ x: followerX, y: followerY }}
        animate={{
          width: ringSize,
          height: ringSize,
          marginLeft: ringOffset,
          marginTop: ringOffset,
          // Fill white when grabbing or hovering
          backgroundColor: isHovering || isHolding ? "#FFFFFF" : "transparent",
          borderColor: isHovering || isHolding ? "transparent" : "rgba(150, 150, 150, 0.4)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </>
  );
}