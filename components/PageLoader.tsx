'use client';

import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loader is visible
    document.body.style.overflow = 'hidden';

    // Start slide up animation after 1.8 seconds
    const slideTimer = setTimeout(() => {
      setSlideUp(true);
    }, 1000);

    // Remove loader and restore scrolling after animation completes
    const removeTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'unset';
    }, 2000); // 1800ms + 800ms animation duration

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        slideUp ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="text-center space-y-8">
        <h1 
          className={`text-3xl md:text-4xl lg:text-4xl font-light text-white tracking-[0.15em] transition-all duration-700 ease-out ${
            slideUp 
              ? 'opacity-0 -translate-y-10 scale-95' 
              : 'opacity-100 translate-y-0 scale-100 animate-fadeInUp'
          }`}
        >
          RAYA<span className='text-sm absolute bottom-5'>®</span>
        </h1>

      </div>
    </div>
  );
}