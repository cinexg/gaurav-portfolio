"use client";

import { useEffect } from "react";

export default function DragScroll() {
  useEffect(() => {
    // Only run on desktop where mice are used
    if (window.matchMedia("(any-pointer: coarse)").matches) return;

    let isDragging = false;
    let startY = 0;
    let startScrollTop = 0;

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Ignore clicks on interactive elements so links/buttons still work
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        return;
      }

      isDragging = true;
      startY = e.clientY;
      startScrollTop = window.scrollY;
      
      // Prevents text from accidentally highlighting while dragging
      document.body.style.userSelect = "none";
    };

    const handleMouseUpOrLeave = () => {
      isDragging = false;
      document.body.style.userSelect = "";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const deltaY = e.clientY - startY;
      
      // The '1.5' is the scroll speed multiplier. Tweak as needed!
      window.scrollTo(0, startScrollTop - (deltaY * 1.5)); 
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUpOrLeave);
    window.addEventListener("mouseleave", handleMouseUpOrLeave);
    window.addEventListener("mousemove", handleMouseMove, { passive: false }); 

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUpOrLeave);
      window.removeEventListener("mouseleave", handleMouseUpOrLeave);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // This component doesn't render anything visible, it just runs the background logic
  return null; 
}