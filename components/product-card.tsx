"use client"

import type React from "react"
import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

// Define types for product and cart actions based on your provided file
interface Product {
  id: number
  name: string
  price: number
  images: string // Main image URL
  hoverImage?: string // Optional hover image URL (not used for main display in this version)
  bestSeller: boolean
  material: string
  stone: string
  colors: string[] // Assuming this is for the metal color swatches
}

interface ProductCardProps {
  product: Product
  productImages?: string[] // Additional images for the gallery
  wishlist: number[]
  addToCart: (item: { id: string; name: string; price: number; image: string; material: string; stone: string }) => void
  addToWishlist: (item: { id: string; name: string; price: number; image: string; material: string }) => void
  removeFromWishlist: (id: string) => void
  cormorantGaramondClassName: string // Pass font class from parent
  montserratClassName: string // Pass font class from parent
  isMobile: boolean // Pass isMobile state from parent
}

export default function ProductCard({
  product,
  productImages,
  wishlist,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  cormorantGaramondClassName,
  montserratClassName,
  isMobile,
}: ProductCardProps) {
  // Construct all display images for the gallery (main image + additional)
  const allDisplayImages = [
    { src: product.images, alt: product.name },
    ...(productImages || []).map((img) => ({ src: img, alt: `${product.name} variant` })),
  ]

  // Add more placeholder images for demonstration
  while (allDisplayImages.length < 8) {
    allDisplayImages.push({
      src: `/placeholder.svg?height=100&width=100&query=product-thumbnail-${allDisplayImages.length + 1}`,
      alt: `Product thumbnail ${allDisplayImages.length + 1}`,
    })
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [showMobileMetalColors, setShowMobileMetalColors] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const swipeThreshold = 50
  const titleTouchTimer = useRef<NodeJS.Timeout | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    e.preventDefault()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const deltaX = touchEndX - touchStartX.current

    if (deltaX > swipeThreshold) {
      setCurrentImageIndex((prevIndex) => Math.max(0, prevIndex - 1))
    } else if (deltaX < -swipeThreshold) {
      setCurrentImageIndex((prevIndex) => Math.min(allDisplayImages.length - 1, prevIndex + 1))
    }
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  // Mobile title touch handlers
  const handleTitleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return
    
    // Start a timer for long press
    titleTouchTimer.current = setTimeout(() => {
      setShowMobileMetalColors(true)
    }, 150) // Short delay for better UX
    
    e.stopPropagation()
  }

  const handleTitleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile) return
    
    // Clear the timer
    if (titleTouchTimer.current) {
      clearTimeout(titleTouchTimer.current)
      titleTouchTimer.current = null
    }
    
    // Toggle metal colors on tap
    setShowMobileMetalColors(!showMobileMetalColors)
    e.stopPropagation()
  }

  const handleTitleTouchMove = () => {
    if (!isMobile) return
    
    // Cancel the timer if user moves finger (scrolling)
    if (titleTouchTimer.current) {
      clearTimeout(titleTouchTimer.current)
      titleTouchTimer.current = null
    }
  }

  // Desktop hover handlers (unchanged)
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovering(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovering(false)
    }
  }

  const metalOptions = product.colors.map((color) => ({ color, label: color }))

  // Determine if metal colors should be shown
  const shouldShowMetalColors = isMobile ? showMobileMetalColors : isHovering

  return (
    <Card className="w-full h-full rounded-none overflow-hidden border-none shadow-none">
      {/* 1. Main Image Section - No changes */}
      <div
        className="relative w-full h-[550px] lg:h-[700px] cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Link href={`/shop/${product.name.toString()}`}>
          <div className="relative w-full h-full">
            {/* Heart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-2 z-10 h-12 w-12 rounded-full"
              onClick={(e) => {
                e.preventDefault()
                wishlist.includes(product.id)
                  ? removeFromWishlist(product.id.toString())
                  : addToWishlist({
                    id: product.id.toString(),
                    name: product.name,
                    price: product.price,
                    image: product.images,
                    material: product.material,
                  })
              }}
              aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={cn(
                  "h-10 w-10 text-gray-400",
                  wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "",
                )}
              />
              <span className="sr-only">Add to wishlist</span>
            </Button>

            {/* Product Image */}
            <Image
              src={allDisplayImages[currentImageIndex].src || "/placeholder.svg"}
              alt={allDisplayImages[currentImageIndex].alt || "Product image"}
              fill
              style={{ objectFit: "cover" }}
              className="object-center transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </Link>

        {/* Pagination dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1">
          {allDisplayImages.map((_, index) => (
            <span
              key={index}
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-white",
                currentImageIndex === index ? "opacity-80" : "opacity-50",
              )}
            />
          ))}
        </div>
      </div>

      <CardContent className="p-0">
        {/* 2. Title Section - Enhanced with Mobile Touch Support */}
        <div className="w-full px-2.5 pb-0 pt-0">
          <Link href={`/shop/${product.name.toString()}`}>
            <div
              className="flex justify-between relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTitleTouchStart}
              onTouchEnd={handleTitleTouchEnd}
              onTouchMove={handleTitleTouchMove}
            >
              <h3
                className={cn(
                  "text-xl font-medium leading-tight transition-opacity duration-300",
                  cormorantGaramondClassName,
                  shouldShowMetalColors && "opacity-0",
                )}
              >
                {product.name}
              </h3>

              {/* Metal colors overlay */}
              <div
                className={cn(
                  "absolute inset-0 flex items-start justify-start gap-2 transition-opacity duration-300 pointer-events-none",
                  shouldShowMetalColors ? "opacity-100" : "opacity-0",
                )}
              >
                {metalOptions.slice(0, 4).map((option, index) => (
                  <div
                    key={index}
                    className="w-7 h-7 rounded-full border-2 border-white "
                    style={{
                      background: option.color.startsWith("linear-gradient") ? option.color : option.color,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    title={option.label}
                  />
                ))}
              </div>
              <div className="text-xl pb-3.5 font-semibold text-gray-800">$150,000 - $200,000</div>
            </div>
          </Link>
        </div>

        {/* 3. Two Column Grid: Pricing + Scrollable Images */}
        <div className="grid grid-cols-1 mx-10 gap-0 px-2.5">
          {/* Left Column: Pricing and Metal Options */}
          <div className="flex flex-col justify-center">
          </div>

          {/* Right Column: Scrollable Product Images */}
          <div className="relative">
            {/* Scrollable Images Container */}
            <div
              ref={scrollContainerRef}
              className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {allDisplayImages.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex-shrink-0 cursor-pointer transition-all duration-200",
                    currentImageIndex === index && "border-x border-gray-400 ring-gray-800 ring-offset-1",
                  )}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <div className="w-13 h-16 relative rounded-none overflow-hidden border-gray-200 hover:border-gray-400 transition-colors">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="64px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}