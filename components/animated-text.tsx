"use client"

import { useEffect, useState } from "react"
import { Nothing_You_Could_Do } from "next/font/google"; 

const indieFlower = Nothing_You_Could_Do({
  weight: "400", // Indie Flower has only one weight
  subsets: ["latin"],
});

export default function AnimatedText() {
  const [visibleChars, setVisibleChars] = useState(0)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isDisappearing, setIsDisappearing] = useState(false)
  const [invisibleFromLeft, setInvisibleFromLeft] = useState(0)

  const messages = [
    "Welcome to our amazing platform!",
    "Experience the future of technology today",
    "Join thousands of satisfied customers worldwide",
    "Innovation meets simplicity in perfect harmony",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const currentMessage = messages[currentMessageIndex]
      setIsTyping(true)
      setIsDisappearing(false)
      setVisibleChars(0)
      setInvisibleFromLeft(0)

      let charIndex = 0
      const typeInterval = setInterval(() => {
        if (charIndex <= currentMessage.length) {
          setVisibleChars(charIndex)
          charIndex++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)

          setIsDisappearing(true)
          let disappearIndex = 0
          const disappearInterval = setInterval(() => {
            if (disappearIndex < currentMessage.length) {
              setInvisibleFromLeft(disappearIndex + 1)
              disappearIndex++
            } else {
              clearInterval(disappearInterval)
              setIsDisappearing(false)
              setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
            }
          }, 80)
        }
      }, 100)

      return () => clearInterval(typeInterval)
    }, isTyping ? 3000 : 5000)

    return () => clearInterval(interval)
  }, [currentMessageIndex, messages])

  const renderText = () => {
    const currentMessage = messages[currentMessageIndex]
    return currentMessage.split("").map((char, index) => {
      let isVisible = false

      if (isTyping) {
        // During typing phase, show characters up to visibleChars
        isVisible = index < visibleChars
      } else if (isDisappearing) {
        // During disappearing phase, hide characters from left based on invisibleFromLeft
        isVisible = index >= invisibleFromLeft && index < visibleChars
      }

      return (
        <span
          key={index}
          className={isVisible ? "opacity-100" : "opacity-0"}
          style={{ transition: "opacity 0.1s ease" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      )
    })
  }

  return (
    <div className={`relative h-8 overflow-hidden my-4 bg-gradient-to-r  rounded-lg ${indieFlower.className}`}>
      <div className="flex items-center h-full justify-center px-6">
        <span className="text-md text-foreground">
          {renderText()}
          {(isTyping || isDisappearing) && <span className="animate-pulse"></span>}
        </span>
      </div>
    </div>
  )
}
