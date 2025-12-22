"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { FuturaCyrillicBook } from "./fonts"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageCarouselProps {
  images: string[]
  alt?: string
  className?: string
}

export function ImageCarousel({ images, alt = "Carousel image", className }: ImageCarouselProps) {
  const extendedImages = [...images, ...images, ...images]
  const [currentIndex, setCurrentIndex] = useState(images.length)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isTransitioning) {
      if (currentIndex >= images.length * 2) {
        setCurrentIndex(currentIndex - images.length)
      } else if (currentIndex < images.length) {
        setCurrentIndex(currentIndex + images.length)
      }
      // Re-enable transition after reset
      setTimeout(() => setIsTransitioning(true), 50)
    }
  }, [currentIndex, isTransitioning, images.length])

  const scrollToNext = () => {
    if (!isTransitioning) return

    setCurrentIndex((prevIndex) => prevIndex + 1)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const scrollToPrevious = () => {
    if (!isTransitioning) return

    setCurrentIndex((prevIndex) => prevIndex - 1)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const actualIndex = ((currentIndex % images.length) + images.length) % images.length

  return (
    <div className={cn("relative w-full lg:mt-10", className)}>
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div
          className={cn("flex", isTransitioning && "transition-transform duration-500 ease-out")}
          style={{ transform: `translateX(-${currentIndex * 80}%)` }}
        >
          {extendedImages.map((image, index) => (
            <div key={index} className="flex-shrink-0 px-2 " style={{ width: "80%" }}>
              <div className="relative aspect-[13/9] w-full overflow-hidden rounded-lg">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${alt} ${(index % images.length) + 1}`}
                  fill
                  className="object-cover"
                  sizes="80vw"
                  priority={index === images.length}
                />
              <div aria-label="Like" className="absolute backdrop-brightness-90  tracking-wider right-5 top-10 -translate-y-1/2 p-3 rounded-4xl text-white cursor-pointer">
                    <svg width="13" height="12" className="size-4.5" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.2157 4.26549C12.1644 3.7263 11.9139 3.21876 11.5723 2.79855C10.9856 2.07763 10.0284 1.49259 9.07933 1.48113C8.11391 1.46967 7.21563 2.01814 6.68408 2.80782C6.15253 2.01814 5.25424 1.46967 4.28883 1.48113C3.33979 1.49259 2.38257 2.07763 1.7959 2.79855C1.45372 3.21876 1.20377 3.7263 1.15248 4.26549C1.08917 4.93457 1.33584 5.60364 1.7124 6.16029C2.23031 6.92596 2.97415 7.48371 3.62085 8.13041C4.64193 9.15149 5.663 10.1726 6.68462 11.1942C7.7057 10.1731 8.72678 9.15203 9.7484 8.13041C10.3951 7.48371 11.1389 6.92596 11.6568 6.16029C12.0334 5.60364 12.2801 4.93457 12.2168 4.26549H12.2157Z" stroke="white" stroke-miterlimit="10"></path></svg>
                </div>
              </div>
              <div className={`mt-2 flex justify-center ${FuturaCyrillicBook.className}`}>Van Der Bauwede’s Lace & Diamond Collection made its debut on Victor’s Spring/Summer 2026 catwalk at Paris Fashion Week</div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        onClick={scrollToPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous image</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        onClick={scrollToNext}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next image</span>
      </Button>

    </div>
  )
}
