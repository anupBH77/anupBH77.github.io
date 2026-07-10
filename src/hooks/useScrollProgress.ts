// ============================================
// Scroll Progress Hook
// ============================================

import { useState, useEffect, useCallback, useRef } from "react";

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastScrollRef = useRef(0);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    // Avoid unnecessary updates
    if (Math.abs(scrollTop - lastScrollRef.current) < 2) {
      rafRef.current = null;
      return;
    }

    lastScrollRef.current = scrollTop;
    const newProgress = docHeight > 0 ? scrollTop / docHeight : 0;
    setProgress(Math.min(Math.max(newProgress, 0), 1));
    rafRef.current = null;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateProgress]);

  return progress;
};
