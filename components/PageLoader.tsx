"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import localFont from "next/font/local";

const words = [
  "Hello",
  "Bonjour", 
  "やあ",
  "Hallo",
  "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ",
  "Olà",
];

const myfont = localFont({
  src: "../public/fonts/Articulat-CF.ttf", // use relative path if inside project folder
  display: "swap", // optional but recommended
  weight: "900",
})

interface LoadingPageProps {
  onComplete: () => void;
}

const LoadingPage = () => {
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const timeouts: NodeJS.Timeout[] = [];

    const scheduleNext = () => {
      // Determine how long the current word should stay on screen
      let displayDuration: number;
      
      if (currentIndex === 0) {
        // First word stays for 500ms
        displayDuration = 1000;
      } else if (currentIndex === words.length - 1) {
        // Last word stays for 500ms, then start exit animation
        const exitTimeout = setTimeout(() => {
          setIsComplete(true);
          // Wait for the full curtain animation to complete (1000ms) before calling onComplete
          // setTimeout(onComplete, 1000);
        }, 500);
        timeouts.push(exitTimeout);
        return;
      } else {
        // All middle words stay for 300ms
        displayDuration = 300;
      }

      const timeout = setTimeout(() => {
        currentIndex++;
        setIndex(currentIndex);
        scheduleNext();
      }, displayDuration);
      
      timeouts.push(timeout);
    };

    scheduleNext();

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  const curtainVariants = {
    initial: {
      clipPath: "ellipse(90% 120% at 50% 0%)",
    },
    exit: {
      clipPath: "ellipse(90% 0% at 50% 0%)",
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      },
    },
  };

  const wordVariants = {
    initial: {
      opacity: 0,
      y: 0,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      variants={curtainVariants}
      initial="initial"
      animate={isComplete ? "exit" : "initial"}
      // Prevent the component from being removed until animation completes
      style={{ pointerEvents: isComplete ? "none" : "auto" }}
    >
      <div className="relative">
        <motion.div
          key={index}
          variants={wordVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white ${myfont.className}`}
        >
          {words[index]}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingPage;