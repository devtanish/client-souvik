"use client"

import { useState, useEffect, useRef } from "react"
import { Gem, Film, Filter, ScrollText, Palette, Wrench, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"

const items = [
  {
    id: "craft",
    title: "The Craft",
    description:
      "Gain the confidence to build anything you envision, transforming motion, interaction, and design principles into second nature.",
    icon: Gem,
    image: "https://picsum.photos/720/720?random=12",
  },
  {
    id: "animation",
    title: "CSS Animation",
    description:
      "Master CSS animations from your very first set of @keyframes right through to things no one else ever teaches you.",
    icon: Film,
    image: "https://picsum.photos/720/720?random=17",
  },
  {
    id: "filters",
    title: "SVG Filters",
    description: "Shaders on a budget. Learn how to use noise to your advantage whilst making flames and stickers.",
    icon: Filter,
    image: "https://picsum.photos/720/720?random=19",
  },
  {
    id: "scroll",
    title: "Scroll Animation",
    description:
      "Take your users on a journey with the joy of tasteful scroll animation. You might not even need JavaScript.",
    icon: ScrollText,
    image: "https://picsum.photos/720/720?random=42",
  },
  {
    id: "canvas",
    title: "Taming Canvas",
    description:
      'Grasp how to tame the pixel playground and when to do so. Whilst building with "Performance Driven Development".',
    icon: Palette,
    image: "https://picsum.photos/720/720?random=128",
  },
  {
    id: "layout",
    title: "Layout Tricks",
    description:
      "Do you really need a library for that? Sometimes stepping back and rethinking the problem yields a nifty solution.",
    icon: Wrench,
    image: "https://picsum.photos/720/720?random=56",
  },
  {
    id: "time",
    title: "Mastering Time",
    description:
      "It's not all just easings and compositions. Time plays a crucial part in various UI patterns that might not seem obvious at first.",
    icon: Timer,
    image: "https://picsum.photos/720/720?random=39",
  },
]

// Custom Image component (since shadcn/ui doesn't have one)
interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  crossOrigin?: "anonymous" | "use-credentials" | ""
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className, 
  style, 
  crossOrigin, 
  ...props 
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      crossOrigin={crossOrigin}
      loading="lazy"
      {...props}
    />
  )
}

export function UICraftGrid() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)

  const handleItemInteraction = (index: number) => {
    setActiveIndex(index)
  }

  const updateGridColumns = (index: number) => {
    if (listRef.current && !isMobile) {
      const cols = new Array(items.length)
        .fill(null)
        .map((_, i) => (index === i ? "10fr" : "1fr"))
        .join(" ")
      listRef.current.style.setProperty("grid-template-columns", cols)
    }
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      updateGridColumns(activeIndex)
    }
  }, [activeIndex, isMobile])

  if (isMobile) {
    return (
      <div className="w-full max-w-lg mx-auto space-y-6 flex flex-col items-center justify-center flex-1 p-4 pt-12 bg-black">
        {items.map((item, index) => {
          const IconComponent = item.icon
          const isActive = activeIndex === index

          return (
            <div
              key={item.id}
              className={`w-full ${isActive ? "ring-2" : ""}`}
              onClick={() => handleItemInteraction(index)}
              style={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <div className="relative h-64 overflow-hidden border-white border">
                <OptimizedImage
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  className="w-full h-full object-cover transition-all duration-500"
                  style={{
                    filter: isActive ? "grayscale(0) brightness(1)" : "grayscale(0.8) brightness(1.2)",
                    scale: isActive ? "1" : "1.05",
                  }}
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent className="w-5 h-5 text-white" />
                    <h3 className="text-white font-medium text-lg font-mono uppercase tracking-wide">{item.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6 ">
                <p className="text-sm text-muted-foreground font-mono leading-relaxed mb-4">{item.description}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-auto font-medium hover:no-underline hover:bg-transparent"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="underline underline-offset-4 hover:no-underline">Watch now</span>
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="w-full flex items-center justify-center p-4 bg-black h-screen">
      <ul
        ref={listRef}
        className="list-none p-0 m-0 w-full max-w-15/16 h-196"
        style={{
          display: "grid",
          gridTemplateColumns: "10fr 1fr 1fr 1fr 1fr 1fr 1fr",
          gap: "8px",
          transition: "grid-template-columns 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {items.map((item, index) => {
          const IconComponent = item.icon
          const isActive = activeIndex === index

          return (
            <li
              key={item.id}
              className="relative overflow-hidden cursor-pointer rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300"
              onClick={() => handleItemInteraction(index)}
              onMouseEnter={() => handleItemInteraction(index)}
              onFocus={() => handleItemInteraction(index)}
              tabIndex={0}
              style={{
                background: "hsl(var(--background))",
                minWidth: "clamp(2rem, 8cqi, 80px)",
              }}
            >
              <div className="relative w-full h-full">
                {/* Background Image */}
                <OptimizedImage
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                  style={{
                    filter: isActive ? "brightness(0.4)" : "brightness(0.2)",
                    transform: isActive ? "scale(1)" : "scale(1.05)",
                  }}
                  crossOrigin="anonymous"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                  {/* Icon */}
                  <div className="flex justify-end">
                    <IconComponent 
                      className="text-white transition-all duration-300"
                      style={{
                        width: isActive ? "32px" : "20px",
                        height: isActive ? "32px" : "20px",
                        opacity: isActive ? 1 : 0.7,
                      }}
                    />
                  </div>
                  
                  {/* Bottom Content */}
                  <div className="space-y-3">
                    <h3 
                      className="text-white font-mono uppercase tracking-wide font-semibold transition-all duration-300"
                      style={{
                        fontSize: isActive ? "18px" : "14px",
                        opacity: isActive ? 1 : 0.9,
                      }}
                    >
                      {item.title}
                    </h3>
                    
                    {isActive && (
                      <div className="space-y-3 animate-fade-in">
                        <p className="text-white/90 text-sm font-mono leading-relaxed">
                          {item.description}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 h-auto text-white hover:text-white/80 hover:bg-transparent font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="underline underline-offset-2">Watch now</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}