"use client"

// DOMPurify used to convert productcat?.description which is in String format to HTML format
import { Be_Vietnam_Pro } from "next/font/google"
import localFont from "next/font/local"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import StyleWithSidebar from "./styleWithSidebar"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Info, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Hind } from "next/font/google"
import * as React from "react"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import { RingSizeGuideSidebar } from "@/components/ring-size-guide-sidebar"
import { NecklaceSizeGuideSidebar } from "@/components/necklace-size-guide-sidebar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { products } from "../components/data"
import { GemstoneExplorerTab } from "@/components/gemstone-explorer-tab"
import Link from "next/link"

const fontLocal = localFont({
  src: "../public/fonts/ciguatera.otf", // use relative path if inside project folder
  display: "swap", // optional but recommended
  weight: "900",
})

const oswald = Hind({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

// Type definitions for better type safety
interface GemStone {
  id: string | number
  name?: string
  grade: string
  price: number
  url?: string
  description?: string
  rating?: number
  features?: string[]
  origin?: string
  clarity?: string
  cut?: string
}

interface MetalType {
  id: string | number
  displayName: string
  color: string
  url: string
}

interface CaratWidth {
  id: string | number
  weight: string
  displayWeight: string
  price: number
  url?: string
}

// Animated Toggle Button Component
const AnimatedToggleButton = ({
  isOpen,
  onClick,
  className = "",
}: {
  isOpen: boolean
  onClick: (e: React.MouseEvent) => void
  className?: string
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center w-8 h-8 rounded-full text-black focus:outline-none transition-all duration-300 ease-in-out hover:bg-gray-100 ${className}`}
      aria-label={isOpen ? "Collapse" : "Expand"}
    >
      <span className={`absolute transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-90"}`}>
        <Minus size={16} className={isOpen ? "opacity-100" : "opacity-0"} />
      </span>
      <span
        className={`absolute transition-transform duration-300 ${
          isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
        }`}
      >
        <Plus size={16} color="gray" />
      </span>
    </button>
  )
}

export default function ProductPage({ params }: { params: Promise<{ product: string }> }) {
  const { addToCart, removeFromWishlist, addToWishlist } = useCart()

  const { product } = React.use(params)

  const [showSidebar, setShowSidebar] = React.useState(false)
  const originalValue = product.replaceAll("%20", " ")
  const productcat = products.find((p) => p.name === originalValue)

  const [isShapeOpen, setIsShapeOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isGemstoneOpen, setIsGemstoneOpen] = useState(false)
  const [isMetalTypeOpen, setIsMetalTypeOpen] = useState(false)
  const [isBandOpen, setIsBandOpen] = useState(false)
  const [isBandWidthOpen, setIsBandWidthOpen] = useState(false)
  const [hoveredStone, setHoveredStone] = useState<string | null>(null)
  const [isSizeOpen, setIsSizeOpen] = useState(false)
  const [isLengthOpen, setIsLengthOpen] = useState(false)
  const categoryScrollRef = useRef<HTMLDivElement>(null)
  const [activeStone, setActiveStone] = useState(productcat?.activeStones?.[0]?.name || "")
  const [activeSize, setActiveSize] = useState(productcat?.sizes?.[0] || "")
  const [activeLength, setActiveLength] = useState(productcat?.length?.[0] || "")
  const [activeBand, setActiveBand] = useState(productcat?.bands?.[0]?.name || "")
  const [activeBandWidth, setActiveBandWidth] = useState(productcat?.bandWidth?.[0]?.name || "")
  const [liked, setLiked] = useState(productcat?.Liked || false)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)
  const [isNecklaceSizeGuideOpen, setIsNecklaceSizeGuideOpen] = useState(false)
  const [gemstoneType, setGemstoneType] = useState<"LAB GROWN" | "NATURAL">("LAB GROWN")
  const [selectedGemstone, setSelectedGemstone] = useState<GemStone | null>(productcat?.GemStone?.[0] || null)
  const [selectedCarat, setSelectedCarat] = useState<CaratWidth | null>(productcat?.CaratWidth?.[0] || null)
  const [selectedMetal, setSelectedMetal] = useState<MetalType | null>(productcat?.metalType?.[0] || null)
  const [selectedDiamond, setSelectedDiamond] = useState<string>("Lab Grown Diamond")
  const [selectedBacking, setSelectedBacking] = useState<string>("Push Back")
  const [selectedMetalCategory, setSelectedMetalCategory] = useState<"gold" | "silver" | null>(null)
  const [selectedKarat, setSelectedKarat] = useState<"18kt" | "14kt" | null>(null)
  const [isGemstoneExplorerOpen, setIsGemstoneExplorerOpen] = useState(false)
  const [selectedQuality, setSelectedQuality] = useState<GemStone | null>(null)
  const [qualityTabSource, setQualityTabSource] = useState<"natural" | "lab-grown" | null>(null)
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(true)

  const gemstoneScrollRef = useRef<HTMLDivElement>(null)
  const metalScrollRef = useRef<HTMLDivElement>(null)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = scrollRef.current

    if (!element) return // Handle null case

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      element.scrollLeft += e.deltaY
    }

    element.addEventListener("wheel", handleWheel, { passive: false })
    return () => element.removeEventListener("wheel", handleWheel)
  }, [])

  const scrollCategories1 = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = 200
      categoryScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleDiamondChange = () => {
    setIsGemstoneExplorerOpen(true)
  }

  const handleGemstoneSelect = (gemstone: GemStone, quality?: GemStone, qualitySource?: "natural" | "lab-grown") => {
    setSelectedGemstone(gemstone)
    setSelectedDiamond(gemstone.name || gemstone.grade)

    // Handle quality selection if provided - this is the key fix
    if (quality) {
      setSelectedQuality(quality)
      // IMPORTANT: Also update the selectedGemstone to the quality option
      // so it syncs with the main page gemstone quality section
      setSelectedGemstone(quality)
      setGemstoneType(qualitySource === "natural" ? "NATURAL" : "LAB GROWN")
    }
    if (qualitySource) {
      setQualityTabSource(qualitySource)
    }

    setIsGemstoneExplorerOpen(false)
  }

  const handleBackingChange = () => {
    if (!productcat?.backingOptions) return

    const currentIndex = productcat.backingOptions.indexOf(selectedBacking)
    const nextIndex = (currentIndex + 1) % productcat.backingOptions.length
    setSelectedBacking(productcat.backingOptions[nextIndex])
  }

  const getFilteredMetals = () => {
    if (!productcat?.metalType) return []

    let filtered = productcat.metalType

    // Filter by main category first
    if (selectedMetalCategory === "gold") {
      filtered = filtered.filter(
        (metal) =>
          metal.displayName.toLowerCase().includes("gold") ||
          metal.displayName.toLowerCase().includes("yellow") ||
          metal.displayName.toLowerCase().includes("rose"),
      )
    } else if (selectedMetalCategory === "silver") {
      filtered = filtered.filter(
        (metal) =>
          metal.displayName.toLowerCase().includes("silver") ||
          metal.displayName.toLowerCase().includes("white") ||
          metal.displayName.toLowerCase().includes("platinum"),
      )
    }

    // Then filter by karat if selected
    if (selectedKarat === "18kt") {
      filtered = filtered.filter(
        (metal) =>
          metal.displayName.toLowerCase().includes("18") ||
          (selectedMetalCategory === "gold" &&
            metal.displayName.toLowerCase().includes("gold") &&
            !metal.displayName.toLowerCase().includes("14")) ||
          (selectedMetalCategory === "silver" &&
            metal.displayName.toLowerCase().includes("silver") &&
            !metal.displayName.toLowerCase().includes("14")),
      )
    } else if (selectedKarat === "14kt") {
      filtered = filtered.filter((metal) => metal.displayName.toLowerCase().includes("14"))
    }

    return filtered
  }

  const scrollRef1 = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scrollLeft = () => {
    if (scrollRef1.current) {
      scrollRef1.current.scrollBy({
        left: -200,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (scrollRef1.current) {
      scrollRef1.current.scrollBy({
        left: 200,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (scrollRef1.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef1.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <TooltipProvider>
      <div className="mt-13.5 md:mt-28 lg:mt-36 w-full mb-20">
        <div className="md:mt-0 lg:mx-2.5 md:mx-6 mx-0">
          <div className="grid gap-1.5 grid-cols-1 md:grid-cols-3 lg:grid-cols-11 ">
            <div className="flex justify-center lg:hidden col-span-full -mx-4 md:mx-0 -mb-9 md:-mb-2 lg:mb-6">
              <div className="relative w-full max-w-2xl md:max-w-3xl">
                <Carousel className="w-full flex lg:hidden" setApi={setApi}>
                  <CarouselContent className="border-none">
                    {productcat?.productImg?.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="px-0 md:px-2">
                          <Card className="border-none shadow-none">
                            <CardContent className="border-none shadow-none flex items-center justify-center p-1">
                              <div className="w-full aspect-[3/3] md:aspect-[4/3] flex items-center justify-center overflow-hidden">
                                <Image
                                  src={img || "/placeholder.svg"}
                                  alt="product"
                                  className="cursor-crosshair w-full h-full object-cover"
                                  width={800}
                                  height={600}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>

                {/* Enhanced Image indicators positioned at bottom center */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
                  {/* Enhanced Dots indicator */}
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: count }).map((_, index) => (
                      <button
                        key={index}
                        className={`pagination-dot ${index === current - 1 ? "active" : ""}`}
                        onClick={() => api?.scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      >
                        <span className="sr-only">Go to slide {index + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <style jsx>{`
                  .pagination-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    border: 1px solid rgba(255, 255, 255, 0.6);
                    background: transparent;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                  }

                  .pagination-dot:hover {
                    border-color: rgba(255, 255, 255, 0.8);
                    transform: scale(1.2);
                  }

                  .pagination-dot.active {
                    background: white;
                    border-color: white;
                    transform: scale(1.3);
                  }

                  .pagination-dot.active::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100%;
                    height: 100%;
                    background: white;
                    border-radius: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    animation: fillDot 0.3s ease forwards;
                  }

                  @keyframes fillDot {
                    to {
                      transform: translate(-50%, -50%) scale(1);
                    }
                  }
                `}</style>
              </div>
            </div>
            <div className="col-span-8 space-y-1.5 flex-wrap hidden lg:flex">
              {productcat?.productImg?.map((img, index) => (
                <div className="w-1/2 pr-3" key={index}>
                  <Image
                    src={img || "/placeholder.svg"}
                    alt="product"
                    className="cursor-crosshair size-full"
                    width={650}
                    height={650}
                    key={index}
                  />
                </div>
              ))}
            </div>
            <div className={` col-span-3 mx-2 md:mx-4 sticky`}>
              <div className="col-span-1 mb-5">
                <div className="flex justify-between wrap-normal">
                  <div className="text-2xl mt-5 md:mt-0 font-semibold">{productcat?.title}</div>
                  <div className="mt-7.5 md:mt-2 ml-6">
                    <svg
                      width="27"
                      height="27"
                      onClick={() => {
                        setLiked(!liked)
                        !liked
                          ? addToWishlist({
                              id: productcat?.id?.toString() || "",
                              name: productcat?.title || "",
                              price: productcat?.price || 0,
                              image: productcat?.productImg?.[0] || "",
                              material: selectedMetal?.displayName || "",
                              sizes: activeSize || "",
                              stone: activeStone || "",
                              length: activeLength || "",
                              GemStone: selectedGemstone
                                ? {
                                    id: selectedGemstone.id.toString(),
                                    grade: selectedGemstone.grade,
                                    price: selectedGemstone.price + (selectedQuality?.price || 0), // Include quality price
                                    url: selectedGemstone.url || "/placeholder.svg",
                                    description: selectedGemstone.description,
                                  }
                                : undefined,
                              GemQuality: {
                                id: selectedQuality?.id.toString() || "",
                                name: selectedQuality?.name || "",
                                grade: selectedQuality?.grade || "",
                                price: selectedQuality?.price || 0,
                              },
                              bands: activeBand
                                ? {
                                    name: activeBand,
                                    img: productcat?.bands?.find((b) => b.name === activeBand)?.img || "",
                                  }
                                : undefined,
                              bandWidth: activeBandWidth
                                ? {
                                    name: activeBandWidth,
                                    img: productcat?.bandWidth?.find((b) => b.name === activeBandWidth)?.img || "",
                                  }
                                : undefined,
                              shape: activeStone
                                ? {
                                    id: productcat?.activeStones?.find((s) => s.name === activeStone)?.id || 0,
                                    name: activeStone,
                                  }
                                : undefined,
                              CaratWidth: selectedCarat
                                ? {
                                    id: selectedCarat.id.toString(),
                                    weight: selectedCarat.weight,
                                    displayWeight: selectedCarat.displayWeight,
                                    price: selectedCarat.price,
                                    url: selectedCarat.url,
                                  }
                                : undefined,
                              metalType: selectedMetal
                                ? {
                                    id: selectedMetal.id.toString(),
                                    name: selectedMetal.displayName,
                                    displayName: selectedMetal.displayName,
                                    price: 0,
                                    url: selectedMetal.url,
                                    color: selectedMetal.color,
                                  }
                                : undefined,
                              diamond: selectedDiamond || "",
                              backingOption: selectedBacking || "",
                            })
                          : removeFromWishlist(productcat?.id?.toString() || "")
                      }}
                      viewBox="0 0 24 24"
                      fill={liked ? "red" : "white"}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.12 17.95L20.02 11.3C20.63 10.53 21 9.56 21 8.5C21 6.01 18.99 4 16.5 4C14.01 4 12 6.01 12 8.5C12 6.01 9.99 4 7.5 4C5.01 4 3 6.01 3 8.5C3 9.56 3.37 10.53 3.98 11.3L9.88 17.95L12 20.34L14.12 17.95Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        className="svg-stroke svg-fill -translate-y-0.5"
                      />
                    </svg>
                  </div>
                </div>

                {/* Shape Section */}
                <div>
                  {productcat?.shape && (
                    <div className="pb-3">
                      <div className="mt-0 font-bold text-xl flex">
                        Starting at <div className={` text-lg ml-1 translate-y-0.5`}> ${productcat?.price}</div>
                      </div>

                      {/* Title with Animated Toggle Button */}
                      <div
                        className="flex items-center justify-between cursor-pointer mb-1 mt-2.5"
                        onClick={() => setIsShapeOpen(!isShapeOpen)}
                      >
                        <div className="text-md">
                          <b>Shape:</b> {activeStone}
                        </div>
                        <AnimatedToggleButton
                          isOpen={isShapeOpen}
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsShapeOpen(!isShapeOpen)
                          }}
                        />
                      </div>

                      {/* Collapsible Content */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isShapeOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="h-12">
                          <div className="mx-3 -translate-y-4 relative">
                            <button
                              onClick={() => scrollCategories("left")}
                              className="absolute -left-5 top-1/2 -translate-y-2/3 -translate-x-2 z-10 bg-white/80 rounded-full p-1 shadow-md opacity-15 lg:flex hidden hover:opacity-30 transition-opacity duration-200"
                              aria-label="Scroll left"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <div
                              ref={categoryScrollRef}
                              className="flex overflow-x-auto scrollbar-hide gap-1 px-0 pb-0 py-0 scroll-smooth -translate-x-3"
                              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                            >
                              {productcat.activeStones.map((category, index) => (
                                <div
                                  key={index}
                                  className={cn(
                                    "flex-shrink-0 flex flex-col items-center cursor-pointer transition-all duration-300 ease-out -translate-y-0.5 group",
                                    "lg:w-1/9 sm:w-1/10 w-1/7",
                                    activeStone === category.name ? "opacity-100" : "opacity-80 hover:opacity-100",
                                  )}
                                  onClick={() => {
                                    console.log(category.name)
                                    setActiveStone(category.name)
                                  }}
                                >
                                  <div
                                    className={`relative h-20 w-20 transition-transform duration-300 ease-out group-hover:scale-130 ${activeStone === category.name && "scale-130"}`}
                                  >
                                    <Image
                                      src={category.element || "/placeholder.svg"}
                                      alt={category.name}
                                      fill
                                      className="scale-40 transition-all duration-300 group-hover:brightness-110"
                                    />
                                  </div>
                                  {activeStone === category.name && (
                                    <div className=" w-11 h-11 transition-all duration-300 ease-out -translate-y-15.5  animate-pulse"></div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Explore Gemstones Section */}
                  {productcat?.diamondOptions && (
                    <div className="border mb-2 md:mb-2">
                      <div className="flex items-center gap-3 py-1 bg-gray-100">
                        <h2 className="text-lg px-2 font-medium text-gray-800">Explore Gems</h2>
                        <Badge variant="secondary" className="bg-yellow-100 rounded-none text-yellow-800 text-xs">
                          NEW
                        </Badge>
                      </div>
                      <div className="flex items-center py-3 justify-between">
                        <div className="flex items-center gap-3 px-2">
                          <div>
                            <Image
                              src="/gemStone/D-Round-Faceted-GVS2.webp"
                              width={20}
                              height={20}
                              alt="diamond"
                              className="w-6 h-6 rounded-full"
                            />
                          </div>
                          <span className="text-gray-700 font-medium">{selectedDiamond}</span>
                        </div>
                        <Button
                          variant="ghost"
                          className="text-gray-600 underline hover:text-gray-800 p-0 h-auto font-normal px-2"
                          onClick={handleDiamondChange}
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Explore More Options Section */}
                  {productcat?.GemStone && (
                    <div className="mb-2 md:mb-2">
                      {/* Title with Animated Toggle Button */}
                      <div
                        className="flex items-center justify-between cursor-pointer mb-1"
                        onClick={() => setIsGemstoneOpen(!isGemstoneOpen)}
                      >
                        <div className="flex items-center gap-2">
                          <h3 className="text-gray-700 font-medium flex">
                            <div className="font-bold">Gemstone Quality :</div>{" "}
                            <div className="ml-1 ">{selectedGemstone?.grade || "Not selected"}</div>
                          </h3>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                {selectedGemstone?.description || selectedGemstone?.grade || "No description available"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <AnimatedToggleButton
                          isOpen={isGemstoneOpen}
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsGemstoneOpen(!isGemstoneOpen)
                          }}
                        />
                      </div>

                      {/* Collapsible Content */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isGemstoneOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pt-2">
                          <div className="flex gap-2 mb-2">
                            <Button
                              variant={gemstoneType === "LAB GROWN" ? "default" : "outline"}
                              size="sm"
                              onClick={() => setGemstoneType("LAB GROWN")}
                              className="rounded-none"
                            >
                              LAB GROWN
                              <Badge variant="secondary" className="ml-2">
                                -33%
                              </Badge>
                            </Button>
                            <Button
                              variant={gemstoneType === "NATURAL" ? "default" : "outline"}
                              size="sm"
                              onClick={() => setGemstoneType("NATURAL")}
                              className="rounded-none"
                            >
                              NATURAL
                            </Button>
                          </div>

                          <div className="relative -translate-x-1">
                            <div
                              ref={gemstoneScrollRef}
                              className="flex gap-2 overflow-x-auto scrollbar-hide px-8"
                              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                            >
                              {gemstoneType == "LAB GROWN" &&
                                productcat?.labGrownGemstones?.map((option) => (
                                  <div
                                    key={option.id}
                                    className={`min-w-[85px] border -translate-x-6.5 p-3 flex flex-col items-center cursor-pointer transition-all ${
                                      selectedGemstone?.id === option.id
                                        ? "border-black bg-gray-100"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                                    onClick={() => setSelectedGemstone(option)}
                                  >
                                    <Image
                                      className="w-8 h-8 mb-2 flex items-center justify-center shadow-inner"
                                      src={option.url || "/placeholder.svg"}
                                      width={100}
                                      height={100}
                                      alt="gemstone"
                                    />
                                    <span className="text-xs text-center font-medium">{option.grade}</span>
                                    <span className="text-xs text-gray-500">${option.price}</span>
                                  </div>
                                ))}
                              {gemstoneType == "NATURAL" &&
                                productcat?.naturalGemstones?.map((option) => (
                                  <div
                                    key={option.id}
                                    className={`min-w-[85px] border -translate-x-6.5 p-3 flex flex-col items-center cursor-pointer transition-all ${
                                      selectedGemstone?.id === option.id
                                        ? "border-black bg-gray-100"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                                    onClick={() => setSelectedGemstone(option)}
                                  >
                                    <Image
                                      className="w-8 h-8 bg-gradient-to-br from-white to-gray-100 mb-2 flex items-center justify-center shadow-inner"
                                      src={option.url || "/placeholder.svg"}
                                      width={100}
                                      height={100}
                                      alt="gemstone"
                                    />
                                    <span className="text-xs text-center font-medium">{option.grade}</span>
                                    <span className="text-xs text-gray-500">${option.price}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {productcat?.CaratWidth && (
                    <div className={`mb-2 md:mb-2 ${productcat?.CaratWidth ? "" : "hidden"}`}>
                      {/* Title with Animated Toggle Button */}
                      <div
                        className="flex items-center justify-between cursor-pointer mb-1"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <h3 className="text-gray-700 font-medium z-0 flex">
                          <div className="font-bold mr-1">Total Carat Weight</div>:{" "}
                          {selectedCarat?.displayWeight || "Not selected"}
                        </h3>
                        <AnimatedToggleButton
                          isOpen={isOpen}
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsOpen(!isOpen)
                          }}
                        />
                      </div>

                      {/* Collapsible Content */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="relative pt-2">
                          <div
                            ref={metalScrollRef}
                            className="flex gap-2 overflow-x-auto scrollbar-hide px-1"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                          >
                            {productcat?.CaratWidth.map((option) => (
                              <div
                                key={option.id}
                                className={`min-w-[80px] border p-3 flex flex-col items-center cursor-pointer transition-all ${
                                  selectedCarat?.id === option.id
                                    ? "border-black bg-gray-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                                onClick={() => setSelectedCarat(option)}
                              >
                                <Image
                                  className={`w-12 h-12 rounded-full mb-2 flex items-center justify-center shadow-inner border`}
                                  src={"url" in option ? option?.url : "/placeholder.svg?height=100&width=100"}
                                  width={100}
                                  height={100}
                                  alt="carat weight"
                                />
                                <span className="text-xs text-center font-medium">{option.displayWeight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {productcat?.metalType && (
                    <div className="mb-2 md:mb-2">
                      {/* Title with Animated Toggle Button */}
                      <div
                        className="flex items-center justify-between cursor-pointer mb-1"
                        onClick={() => setIsMetalTypeOpen(!isMetalTypeOpen)}
                      >
                        <h3 className="text-gray-700 flex font-medium">
                          <div className="font-bold mr-1">Metal Type </div>:{" "}
                          {selectedMetal?.displayName || "Not selected"}
                        </h3>
                        <AnimatedToggleButton
                          isOpen={isMetalTypeOpen}
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsMetalTypeOpen(!isMetalTypeOpen)
                          }}
                        />
                      </div>

                      {/* Collapsible Content */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isMetalTypeOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pt-2">
                          {/* Metal Type Sorting Buttons */}
                          <div className="mb-3">
                            {/* Main category buttons */}
                            <div className="flex gap-2 mb-2">
                              <Button
                                variant={selectedMetalCategory === "gold" ? "default" : "outline"}
                                size="sm"
                                className="rounded-none text-xs"
                                onClick={() => {
                                  setSelectedMetalCategory("gold")
                                  setSelectedKarat(null)
                                }}
                              >
                                GOLD
                              </Button>
                              <Button
                                variant={selectedMetalCategory === "silver" ? "default" : "outline"}
                                size="sm"
                                className="rounded-none text-xs"
                                onClick={() => {
                                  setSelectedMetalCategory("silver")
                                  setSelectedKarat(null)
                                }}
                              >
                                SILVER
                              </Button>
                            </div>

                            {/* Conditional karat options */}
                            {selectedMetalCategory === "gold" && (
                              <div className="flex gap-2">
                                <Button
                                  variant={selectedKarat === "18kt" ? "default" : "outline"}
                                  size="sm"
                                  className="rounded-none text-xs"
                                  onClick={() => setSelectedKarat("18kt")}
                                >
                                  18kt
                                </Button>
                                <Button
                                  variant={selectedKarat === "14kt" ? "default" : "outline"}
                                  size="sm"
                                  className="rounded-none text-xs"
                                  onClick={() => setSelectedKarat("14kt")}
                                >
                                  14kt
                                </Button>
                              </div>
                            )}

                            {selectedMetalCategory === "silver" && (
                              <div className="flex gap-2">
                                <Button
                                  variant={selectedKarat === "18kt" ? "default" : "outline"}
                                  size="sm"
                                  className="rounded-none text-xs"
                                  onClick={() => setSelectedKarat("18kt")}
                                >
                                  18kt
                                </Button>
                                <Button
                                  variant={selectedKarat === "14kt" ? "default" : "outline"}
                                  size="sm"
                                  className="rounded-none text-xs"
                                  onClick={() => setSelectedKarat("14kt")}
                                >
                                  14kt
                                </Button>
                              </div>
                            )}
                          </div>

                          <div className="relative">
                            <div
                              ref={metalScrollRef}
                              className="flex gap-2 overflow-x-auto scrollbar-hide px-1"
                              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                            >
                              {getFilteredMetals().map((option) => (
                                <div
                                  key={option.id}
                                  className={`min-w-[80px] border p-3 flex flex-col items-center cursor-pointer transition-all ${
                                    selectedMetal?.id === option.id
                                      ? "border-black bg-gray-50"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                  onClick={() => setSelectedMetal(option)}
                                >
                                  <Image
                                    className={`w-12 h-12 ${option.color} rounded-full mb-2 flex items-center justify-center shadow-inner border`}
                                    src={option.url || "/placeholder.svg"}
                                    width={100}
                                    height={100}
                                    alt="metal type"
                                  />
                                  <span className="text-xs text-center font-medium">{option.displayName}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {productcat?.bands && (
                    <div className="mb-2 md:mb-2">
                      {/* Title with Animated Toggle Button */}
                      <div
                        className="flex items-center justify-between cursor-pointer mb-1"
                        onClick={() => setIsBandOpen(!isBandOpen)}
                      >
                        <div className="text-md font-medium">
                          <b>Band:</b> {activeBand}
                        </div>
                        <AnimatedToggleButton
                          isOpen={isBandOpen}
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsBandOpen(!isBandOpen)
                          }}
                        />
                      </div>

                      {/* Collapsible Content */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isBandOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="h-10.5">
                          <div className="mx-3 -translate-y-4 relative">
                            <div
                              ref={categoryScrollRef}
                              className="flex overflow-x-auto scrollbar-hide gap-1 px-0 pb-0 py-0 scroll-smooth -translate-x-3"
                              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                            >
                              {productcat?.bands?.map((category, index) => (
                                <div
                                  key={index}
                                  className={cn(
                                    "flex-shrink-0 h-15 flex flex-col items-center cursor-pointer transition-all -translate-y-0.5",
                                    " lg:w-1/8 sm:w-1/10 w-1/6",
                                    activeBand === category.name ? "opacity-100 " : "opacity-80 hover:opacity-100",
                                  )}
                                  onClick={() => {
                                    setActiveBand(category.name)
                                  }}
                                >
                                  <div className={`relative h-20 w-20 ${oswald.className} `}>
                                    <div
                                      className={`${oswald.className}  h-9 w-9  text-center  mt-6 ml-[1.6rem] ${activeBand === category.name && "border-black border rounded-4xl "}`}
                                      onClick={() => {
                                        console.log(category.name)
                                      }}
                                    >
                                      <Image
                                        src={category.img || "/placeholder.svg"}
                                        width={100}
                                        height={100}
                                        alt="band"
                                        className="w-7.5 rounded-2xl h-7.5 object-cover translate-x-[0.15rem] translate-y-[0.15rem]"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {productcat?.bandWidth && (
                    <div className="mb-2 md:mb-2">
                      {/* Title with Animated Toggle Button */}
                      <div
                        className="flex items-center justify-between cursor-pointer mb-1"
                        onClick={() => setIsBandWidthOpen(!isBandWidthOpen)}
                      >
                        <div className="text-md font-medium">
                          <b>Band Width:</b> {activeBandWidth}
                        </div>
                        <AnimatedToggleButton
                          isOpen={isBandWidthOpen}
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsBandWidthOpen(!isBandWidthOpen)
                          }}
                        />
                      </div>

                      {/* Collapsible Content */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isBandWidthOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="h-10.5">
                          <div className="mx-3 -translate-y-4 relative">
                            <div
                              ref={categoryScrollRef}
                              className="flex overflow-x-auto scrollbar-hide gap-1 px-0 pb-0 py-0 scroll-smooth -translate-x-3"
                              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                            >
                              {productcat?.bandWidth?.map((category, index) => (
                                <div
                                  key={index}
                                  className={cn(
                                    "flex-shrink-0 h-15 flex flex-col items-center cursor-pointer transition-all -translate-y-0.5",
                                    " lg:w-1/8 sm:w-1/10 w-1/6",
                                    activeBandWidth === category.name ? "opacity-100 " : "opacity-80 hover:opacity-100",
                                  )}
                                  onClick={() => {
                                    console.log(category)
                                    setActiveBandWidth(category.name)
                                  }}
                                >
                                  <div className={`relative h-20 w-20 ${oswald.className} `}>
                                    <div
                                      className={`${oswald.className}  h-9 w-9  text-center  mt-6 ml-[1.6rem] ${activeBandWidth === category.name && "border-black border rounded-4xl "}`}
                                    >
                                      <Image
                                        src={category.img || "/placeholder.svg"}
                                        width={100}
                                        height={100}
                                        alt="band width"
                                        className="w-7.5 rounded-2xl  h-7.5 object-cover translate-x-[0.15rem] translate-y-[0.15rem]"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {productcat?.sizes && (
                    <div className={`mb-2 md:mb-2 ${productcat?.sizes ? "" : "hidden"}`}>
                      {/* Title with Animated Toggle Button */}
                      <div
                        className="flex items-center justify-between cursor-pointer mb-1"
                        onClick={() => setIsSizeOpen(!isSizeOpen)}
                      >
                        <div className="text-md">
                          <b>Select Size:</b> {activeSize} inch
                        </div>
                        <AnimatedToggleButton
                          isOpen={isSizeOpen}
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsSizeOpen(!isSizeOpen)
                          }}
                        />
                      </div>

                      {/* Collapsible Content */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isSizeOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="h-11">
                          <div className="mx-3 -translate-y-4 relative">
                            <div
                              ref={categoryScrollRef}
                              className="flex overflow-x-auto scrollbar-hide gap-1 px-0 pb-0 py-0 z-10 scroll-smooth -translate-x-3"
                              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                            >
                              {productcat?.sizes?.map((category, index) => (
                                <div
                                  key={index}
                                  className={cn(
                                    "flex-shrink-0 h-15 flex flex-col items-center cursor-pointer transition-all -translate-y-0.5",
                                    " lg:w-1/8 sm:w-1/10 w-1/6",
                                    activeSize === category ? "opacity-100 " : "opacity-80 hover:opacity-100",
                                  )}
                                  onClick={() => {
                                    console.log(category)
                                    setActiveSize(category)
                                  }}
                                >
                                  <div className={`relative h-20 w-20 ${oswald.className} `}>
                                    <div
                                      className={`${fontLocal.className} text-md  h-9 w-11 items-center pt-1.5 text-center mt-6 ml-[1.6rem] ${activeSize === category && "border-black border"}`}
                                    >
                                      <div className=" translate-y-[0.01rem]">{category}</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="underline cursor-pointer z-0 hover:text-gray-600 transition-colors flex mt-3 justify-end w-full">
                              <button
                                className="mt-0 text-end -translate-y-3 md:-translate-y-9 -translate-x-2.5"
                                onClick={() => setIsSizeGuideOpen(true)}
                              >
                                size guide
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {productcat?.length && (
                    <div className="mb-2 md:mb-2">
                      {/* Title with Animated Toggle Button */}
                      <div
                        className="flex items-center justify-between cursor-pointer mb-1"
                        onClick={() => setIsLengthOpen(!isLengthOpen)}
                      >
                        <div className="text-md">
                          <b>Select Length:</b> {activeLength} inches
                        </div>
                        <AnimatedToggleButton
                          isOpen={isLengthOpen}
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsLengthOpen(!isLengthOpen)
                          }}
                        />
                      </div>

                      {/* Collapsible Content */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isLengthOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="h-11.5">
                          <div className="mx-3 -translate-y-4 relative">
                            <div
                              ref={categoryScrollRef}
                              className="flex overflow-x-auto scrollbar-hide gap-1 px-0 pb-0 py-0 scroll-smooth -translate-x-3"
                              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                            >
                              {productcat?.length?.map((category, index) => (
                                <div
                                  key={index}
                                  className={cn(
                                    "flex-shrink-0 h-15 flex flex-col items-center cursor-pointer transition-all -translate-y-0.5",
                                    " lg:w-1/8 sm:w-1/10 w-1/5",
                                    activeLength === category ? "opacity-100 " : "opacity-80 hover:opacity-100",
                                  )}
                                  onClick={() => {
                                    console.log(category)
                                    setActiveLength(category)
                                  }}
                                >
                                  <div className={`relative h-20 w-20 ${fontLocal.className} `}>
                                    <div
                                      className={`h-9 w-15 items-center pt-1.5 text-md text-center mt-6 ml-[1.6rem] ${activeLength === category && "border-black border"}`}
                                    >
                                      {category}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="underline cursor-pointer z-0 hover:text-gray-600 transition-colors flex mt-3 justify-end w-full">
                              <button
                                className="mt-0 text-end -translate-y-3 md:-translate-y-9 -translate-x-2.5"
                                onClick={() => setIsNecklaceSizeGuideOpen(true)}
                              >
                                metal guide
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Backing Type Selection */}
                  {productcat?.backingOptions && (
                    <div className="border mb-2 md:mb-2">
                      <div className="flex items-center gap-3 py-1 bg-gray-100">
                        <h2 className="text-lg px-2 font-medium text-gray-800">Explore More Options</h2>
                        <Badge variant="secondary" className="bg-yellow-100 rounded-none text-yellow-800 text-xs">
                          NEW
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between py-3 mx-2">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
                              <path d="M8 2L6 4H10L8 2Z" fill="currentColor" />
                              <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                              <path d="M8 14L6 12H10L8 14Z" fill="currentColor" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">Backing Type : {selectedBacking}</span>
                        </div>
                        <Button
                          variant="ghost"
                          className="text-gray-600 underline hover:text-gray-800 p-0 h-auto font-normal"
                          onClick={handleBackingChange}
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="">
                <Button
                  onClick={() => {
                    addToCart({
                      id: productcat?.id?.toString() || "",
                      name: productcat?.title || "",
                      price: productcat?.price || 0,
                      image: productcat?.productImg?.[0] || "",
                      material: selectedMetal?.displayName || "",
                      sizes: activeSize || "",
                      stone: activeStone || "",
                      length: activeLength || "",
                      GemStone: selectedGemstone
                        ? {
                            id: selectedGemstone.id.toString(),
                            grade: selectedGemstone.grade,
                            price: selectedGemstone.price,
                            url: selectedGemstone.url || "/placeholder.svg",
                            description: selectedGemstone.description,
                          }
                        : undefined,
                      bands: activeBand
                        ? {
                            name: activeBand,
                            img: productcat?.bands?.find((b) => b.name === activeBand)?.img || "",
                          }
                        : undefined,
                      bandWidth: activeBandWidth
                        ? {
                            name: activeBandWidth,
                            img: productcat?.bandWidth?.find((b) => b.name === activeBandWidth)?.img || "",
                          }
                        : undefined,
                      shape: activeStone
                        ? {
                            id: productcat?.activeStones?.find((s) => s.name === activeStone)?.id || 0,
                            name: activeStone,
                          }
                        : undefined,
                      CaratWidth: selectedCarat
                        ? {
                            id: selectedCarat.id.toString(),
                            weight: selectedCarat.weight,
                            displayWeight: selectedCarat.displayWeight,
                            price: selectedCarat.price,
                            url: selectedCarat.url,
                          }
                        : undefined,
                      metalType: selectedMetal
                        ? {
                            id: selectedMetal.id.toString(),
                            name: selectedMetal.displayName,
                            displayName: selectedMetal.displayName,
                            price: 0,
                            url: selectedMetal.url,
                            color: selectedMetal.color,
                          }
                        : undefined,
                      diamond: selectedDiamond || "",
                      backingOption: selectedBacking || "",
                    })

                    console.log({
                      id: productcat?.id?.toString() || "",
                      name: productcat?.title || "",
                      price: productcat?.price || 0,
                      image: productcat?.productImg?.[0] || "",
                      material: selectedMetal?.displayName || "",
                      sizes: activeSize || "",
                      stone: activeStone || "",
                      length: activeLength || "",
                      GemStone: selectedGemstone
                        ? {
                            id: selectedGemstone.id.toString(),
                            grade: selectedGemstone.grade,
                            price: selectedGemstone.price,
                            url: selectedGemstone.url || "/placeholder.svg",
                            description: selectedGemstone.description,
                          }
                        : undefined,
                      bands: activeBand
                        ? {
                            name: activeBand,
                            img: productcat?.bands?.find((b) => b.name === activeBand)?.img || "",
                          }
                        : undefined,
                      bandWidth: activeBandWidth
                        ? {
                            name: activeBandWidth,
                            img: productcat?.bandWidth?.find((b) => b.name === activeBandWidth)?.img || "",
                          }
                        : undefined,
                      shape: activeStone
                        ? {
                            id: productcat?.activeStones?.find((s) => s.name === activeStone)?.id || 0,
                            name: activeStone,
                          }
                        : undefined,
                      CaratWidth: selectedCarat
                        ? {
                            id: selectedCarat.id.toString(),
                            weight: selectedCarat.weight,
                            displayWeight: selectedCarat.displayWeight,
                            price: selectedCarat.price,
                            url: selectedCarat.url,
                          }
                        : undefined,
                      metalType: selectedMetal
                        ? {
                            id: selectedMetal.id.toString(),
                            name: selectedMetal.displayName,
                            displayName: selectedMetal.displayName,
                            price: 0,
                            url: selectedMetal.url,
                            color: selectedMetal.color,
                          }
                        : undefined,
                      diamond: selectedDiamond || "",
                      backingOption: selectedBacking || "",
                    })
                  }}
                  className=" mb-3 text-white rounded-none w-full pt-3 h-12 text-md"
                >
                  Add to Bag
                </Button>
                <Button className="rounded-none bg-white border-1 border-black hover:bg-gray-100 text-black w-full pt-3 h-12 text-md">
                  {" "}
                  <Image src={"/svg/cal.svg"} height={20} width={20} alt="calendar" className="ml-2 mb-1" /> Consult
                  with a diamond expert online{" "}
                </Button>
              </div>

              <div className="mt-6">
                <div className="-translate-x-1 flex text-[15px] font-light ml-2">
                  <div>
                    <div className="">
                      {/* Product Details Section with Diamond Icon */}
                      <div
                        className="flex items-center justify-between cursor-pointer "
                        onClick={() => setIsProductDetailsOpen(!isProductDetailsOpen)}
                      >
                        <div className="flex items-center gap-2">
                          <Image src={"/svg/dimand.svg"} height={16} width={16} alt="diamond" className="icon" />
                          <div className="text-md ">Product Details</div>
                        </div>
                        <AnimatedToggleButton
                          isOpen={isProductDetailsOpen}
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsProductDetailsOpen(!isProductDetailsOpen)
                          }}
                        />
                      </div>

                      {/* Collapsible Content */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isProductDetailsOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="">
                          <div className="text-xl font-medium mb-3">The Classic Design</div>

                          <div className="text-gray-700">{productcat?.subtitle}</div>

                          {/* Used to convert productcat?.description which is in String format to HTML format */}
                          {productcat?.description && (
                            <div
                              className="mb-6 text-gray-700"
                              dangerouslySetInnerHTML={{ __html: productcat.description }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" flex text-[15px] font-light">
                  <Image
                    src={"/svg/calender.svg"}
                    height={8}
                    width={20}
                    alt="calendar"
                    className="icon scale-70 mr-2 -translate-y-0.5"
                  />
                  Made-to-order. Ships by Tue, Jun 10
                </div>
                <div className="cursor-pointer flex underline text-gray-500 text-[15px] font-light">
                  <Image
                    src={"/svg/tick.svg"}
                    height={8}
                    width={20}
                    alt="checkmark"
                    className="icon scale-65 mr-2 -translate-y-0.5"
                  />
                  Lifetime warranty and value guarantee
                </div>
                <div className="cursor-pointer -translate-x-1 flex underline text-gray-500 text-[15px] font-light">
                  <Image
                    src={"/svg/truck.svg"}
                    height={8}
                    width={30}
                    alt="shipping"
                    className="icon scale-55 mr-0.5 -translate-y-0.5"
                  />
                  Shipping policy
                </div>
                <div className="cursor-pointer flex underline -translate-x-1 text-gray-500 text-[15px] font-light">
                  <Image
                    src={"/svg/restart.png"}
                    height={8}
                    width={30}
                    alt="return"
                    className="-translate-y-1 icon scale-50 "
                  />
                  Return policy
                </div>
              </div>

              <div className="py-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-medium text-lg">Style With</h2>
                  <button className="text-sm underline font-medium" onClick={() => setShowSidebar(true)}>
                    VIEW ALL
                  </button>
                </div>

                {/* Product Carousel */}
                <div className="relative group">
                  <div
                    className="flex gap-1 overflow-x-auto scrollbar-hide pb-4"
                    ref={scrollRef1}
                    style={{ whiteSpace: "nowrap" }}
                    onScroll={handleScroll}
                  >
                    {productcat?.styleWith &&
                      productcat?.styleWith.map((item, index) => (
                        <Link href={item.url} key={index}>
                          <div className="flex-shrink-0 w-48">
                            <div className="bg-gray-50 p-0 mb-3 aspect-square flex items-center justify-center">
                              <Image
                                src={item.imgURL || "/placeholder.svg"}
                                alt="Gothic Letter Pendant"
                                width={190}
                                height={190}
                                className="rounded-lg object-contain"
                              />
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-medium text-sm">{item.name}</h3>
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">${item.price}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>

                  {/* Navigation Arrows - Desktop/Laptop Only */}
                  {showLeftArrow && (
                    <button
                      onClick={scrollLeft}
                      className="hidden md:flex absolute left-2 top-3/7 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 z-10 items-center justify-center transition-all duration-200 hover:scale-110 border border-gray-200"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                  )}

                  {showRightArrow && (
                    <button
                      onClick={scrollRight}
                      className="hidden md:flex absolute right-2 top-3/7 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 z-10 items-center justify-center transition-all duration-200 hover:scale-110 border border-gray-200"
                      aria-label="Scroll right"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              <div className={`mt-6 ${oswald.className}`}>
                <div className={`text-2xl ${oswald.className}`}>NEED MORE TIME TO THINK?</div>
                <div className="text-sm mt-1">Email this piece to yourself or drop a hint.</div>
                <div className="flex">
                  <Input
                    className="rounded-none mr-3 mt-1 w-4/5 border-gray-400 hover:shadow-none !ring-0 "
                    placeholder="Your email address"
                  />
                  <Button className="h-9 rounded-none mt-1 w-fit">Submit</Button>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <StyleWithSidebar productcat={productcat} setShowSidebar={setShowSidebar} showSidebar={showSidebar} />

        {/* Ring Size Guide Sidebar (First size guide - unchanged) */}
        <RingSizeGuideSidebar isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

        {/* Necklace Size Guide Sidebar (Second size guide - new) */}
        <NecklaceSizeGuideSidebar isOpen={isNecklaceSizeGuideOpen} onClose={() => setIsNecklaceSizeGuideOpen(false)} />

        {/* Gemstone Explorer Tab */}
        <GemstoneExplorerTab
          isOpen={isGemstoneExplorerOpen}
          onClose={() => setIsGemstoneExplorerOpen(false)}
          gemstones={
            productcat?.GemStone?.map((stone) => ({
              ...stone,
              id: productcat.id,
              name: stone.grade, // Use grade as name if name doesn't exist
              rating: 4, // Default rating
              features: ["High Quality", "Certified"], // Default features
              origin: "Laboratory", // Default origin
              clarity: stone.grade, // Use grade as clarity
              cut: "Excellent", // Default cut
            })) || []
          }
          onSelect={handleGemstoneSelect}
          selectedQuality={selectedQuality}
          onSelectedQualityChange={setSelectedQuality}
          qualityTabSource={qualityTabSource}
          onQualityTabSourceChange={setQualityTabSource}
        />
      </div>
    </TooltipProvider>
  )
}
