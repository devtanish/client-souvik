"use client"

import { useEffect, useState } from "react";

// Custom hook to handle Scrolling Hide Component logic
export function useScrollDirection(thresholdRef: React.RefObject<HTMLDivElement | null>) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (thresholdRef.current) {
        const thresholdRect = thresholdRef.current.getBoundingClientRect();
        const thresholdBottom = thresholdRect.bottom;
        
        // Check if the user has scrolled past the initial "HELLO" / Header section
        const hasScrolledPastThreshold = thresholdBottom < 0;
        
        if (hasScrolledPastThreshold) {
          if (currentScrollY > lastScrollY) {
            setIsVisible(false); // Scrolling down
          } else if (currentScrollY < lastScrollY) {
            setIsVisible(true); // Scrolling up
          }
        } else {
          setIsVisible(true); // Always show if threshold is still visible
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, thresholdRef]);

  return isVisible;
}