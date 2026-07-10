// ============================================
// Active Section Hook - Tracks which section is in viewport
// ============================================

import { useState, useEffect, useCallback, useRef } from "react";

export const useActiveSection = (sectionIds: string[], offset = 100) => {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "");
  const rafRef = useRef<number | null>(null);
  const lastActiveRef = useRef<string>("");

  const updateActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + offset;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const section = document.getElementById(sectionIds[i]);
      if (section && section.offsetTop <= scrollPosition) {
        if (lastActiveRef.current !== sectionIds[i]) {
          lastActiveRef.current = sectionIds[i];
          setActiveSection(sectionIds[i]);
        }
        break;
      }
    }
    rafRef.current = null;
  }, [sectionIds, offset]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateActiveSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateActiveSection]);

  return activeSection;
};
