"use client"

// DOMPurify used to convert productcat?.description which is in String format to HTML format
import { Card, CardContent } from "@/components/ui/card"
import { Info } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Hind } from "next/font/google"
import * as React from "react"
import { useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { RingSizeGuideSidebar } from "@/components/ring-size-guide-sidebar"
import { NecklaceSizeGuideSidebar } from "@/components/necklace-size-guide-sidebar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { products } from "./../../../components/data"

const oswald = Hind({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

// Type definitions for better type safety
interface GemStone {
  id: string | number
  grade: string
  price: number
  url: string
  description?: string
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

export default function Home({ params }: { params: Promise<{ product: string }> }) {
  const { product } = React.use(params)

  const originalValue = product.replaceAll("%20", " ")
  const productcat = products.find((p) => p.name === originalValue)

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

  const gemstoneScrollRef = useRef<HTMLDivElement>(null)
  const metalScrollRef = useRef<HTMLDivElement>(null)

  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const handleDiamondChange = () => {
    if (!productcat?.diamondOptions) return

    const currentIndex = productcat.diamondOptions.indexOf(selectedDiamond)
    const nextIndex = (currentIndex + 1) % productcat.diamondOptions.length
    setSelectedDiamond(productcat.diamondOptions[nextIndex])
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

  return (
    <TooltipProvider>
      <div className="mt-18 md:mt-36 w-full mb-20">
        <div className="md:mt-0 lg:mx-2.5 md:mx-6 mx-0">
          <div className="grid gap-1.5 grid-cols-1 md:grid-cols-3 lg:grid-cols-11 ">
            <div className="flex justify-center lg:hidden col-space-2 -mx-4 md:mx-0">
              <Carousel className="w-full max-w-none md:max-w-xs flex lg:hidden">
                <CarouselContent className="border-2">
                  {productcat?.productImg?.map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="">
                        <Card className="border-none">
                          <CardContent className=" border-none flex aspect-square items-center justify-center scale-115">
                            <Image
                              src={img || "/placeholder.svg"}
                              alt="product"
                              className="cursor-crosshair w-full h-full"
                              width={800}
                              height={800}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            <div className="col-span-8 space-y-1.5 flex-wrap hidden lg:flex">
              {productcat?.productImg?.map((img, index) => (
                <Image
                  src={img || "/placeholder.svg"}
                  alt="product"
                  className="cursor-crosshair mr-2 md:size-130 xl:size-170 w-full "
                  width={650}
                  height={650}
                  key={index}
                />
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
                    <div className="mb-4">
                      <div className="mt-0 font-bold  text-xl flex">
                        Starting at{" "}
                        <div className={`${oswald.className} text-lg ml-1 translate-y-0.5`}> ${productcat?.price}</div>
                      </div>

                      <div className="mt-2.5 text-md ">
                        <b>Shape:</b> {activeStone}
                      </div>
                      <div className=" h-10">
                        <div className="mx-3 -translate-y-4 relative">
                          <button
                            onClick={() => scrollCategories("left")}
                            className="absolute -left-5 top-1/2 -translate-y-2/3 -translate-x-2 z-10 bg-white/80 rounded-full p-1 shadow-md opacity-15 lg:flex hidden"
                            aria-label="Scroll left"
                          >
                            <ChevronLeft size={20} />
                          </button>

                          <div
                            ref={categoryScrollRef}
                            className="flex overflow-x-auto scrollbar-hide gap-1 px-0 pb-0 py-0 scroll-smooth -translate-x-3"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                          >
                            {productcat?.activeStones?.map((category, index) => (
                              <div
                                key={index}
                                className={cn(
                                  "flex-shrink-0 flex flex-col items-center cursor-pointer transition-all -translate-y-0.5",
                                  "lg:w-1/10 sm:w-1/10 w-1/7",
                                  activeStone === category.name ? "opacity-100 " : "opacity-80 hover:opacity-100",
                                )}
                                onClick={() => {
                                  console.log(category.name)
                                  setActiveStone(category.name)
                                }}
                              >
                                <div className={`relative h-20 w-20`}>
                                  <Image
                                    src={category.element || "/placeholder.svg"}
                                    alt={category.name}
                                    fill
                                    className={`  scale-40`}
                                  />
                                </div>
                                {activeStone === category.name && (
                                  <div className="border-1 w-7 border-black transition-transform duration-300 -translate-y-4.5"></div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => scrollCategories("right")}
                          className="absolute -right-6 top-1/2 -translate-y-2/3 z-10 bg-white/80 rounded-full p-1 shadow-md opacity-15 lg:flex hidden"
                          aria-label="Scroll right"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Explore Gemstones Section */}
                  {productcat?.diamondOptions && (
                    <div className="border mb-2 md:mb-4">
                      <div className="flex items-center gap-3 py-1 bg-gray-100">
                        <h2 className="text-lg px-2 font-medium text-gray-800">Explore Gemstones</h2>
                        <Badge variant="secondary" className="bg-yellow-100 rounded-none text-yellow-800 text-xs">
                          NEW
                        </Badge>
                      </div>
                      <div className="flex items-center py-3 justify-between">
                        <div className="flex items-center gap-3 px-2">
                          <div>
                            <Image
                              src={selectedGemstone?.url || "/svg/diamond.svg"}
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
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-medium text-gray-800 ">Explore More Options</h2>
                      <Badge variant="secondary" className="bg-yellow-100 rounded-none text-yellow-800 text-xs">
                        NEW
                      </Badge>
                    </div>
                  </div>
                  {productcat?.GemStone && (
                    <div className="mb-2 md:mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-gray-700 font-medium">
                          Gemstone Quality : {selectedGemstone?.grade || "Not selected"}
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
                          {productcat?.GemStone?.map((option) => (
                            <div
                              key={option.id}
                              className={`min-w-[80px] border -translate-x-6.5 p-3 flex flex-col items-center cursor-pointer transition-all ${
                                selectedGemstone?.id === option.id
                                  ? "border-black bg-gray-100"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => setSelectedGemstone(option)}
                            >
                              <Image
                                className="w-8 h-8 bg-gradient-to-br from-white to-gray-100 rounded-full mb-2 flex items-center justify-center shadow-inner"
                                src={option.url || "/placeholder.svg"}
                                width={100}
                                height={100}
                                alt="gemstone"
                              ></Image>
                              <span className="text-xs text-center font-medium">{option.grade}</span>
                              <span className="text-xs text-gray-500">
                                ${Math.round(option.price * (gemstoneType === "NATURAL" ? 1.5 : 1)).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Backing Type Selection */}
                  {productcat?.backingOptions && (
                    <div className="border mb-2 md:mb-4">
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

                  {productcat?.metalType && (
                    <div className="mb-2 md:mb-4">
                      <h3 className="text-gray-700 font-medium mb-2">
                        Metal Type : {selectedMetal?.displayName || "Not selected"}
                      </h3>

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
                              setSelectedKarat(null) // Reset karat selection when changing category
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
                              setSelectedKarat(null) // Reset karat selection when changing category
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
                  )}

                  {productcat?.CaratWidth && (
                    <div className={`mb-2 md:mb-4 ${productcat?.CaratWidth ? "" : "hidden"}`}>
                      <h3 className="text-gray-700 font-medium z-0 mb-1">
                        Total Carat Weight : {selectedCarat?.displayWeight || "Not selected"}
                      </h3>
                      <div className="relative">
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
                                src={"url" in option ? option?.url : "/placeholder.svg"}
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
                  )}

                  {productcat?.bands && (
                    <div>
                      <div className="mt-2.5 text-md font-medium">
                        <b>Band:</b> {activeBand}
                      </div>
                      <div className="h-10">
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
                                  " lg:w-1/10 sm:w-1/10 w-1/7",
                                  activeBand === category.name ? "opacity-100 " : "opacity-80 hover:opacity-100",
                                )}
                                onClick={() => {
                                  console.log(category)
                                  setActiveBand(category.name)
                                }}
                              >
                                <div className={`relative h-20 w-20 ${oswald.className} `}>
                                  <div className={`${oswald.className}  h-7.5 w-7.5  text-center  mt-6 ml-[1.6rem]`}>
                                    <Image
                                      src={category.img || "/placeholder.svg"}
                                      width={100}
                                      height={100}
                                      alt="band"
                                      className="w-full rounded-2xl -translate-x-[0.1rem] border-1 h-full object-cover "
                                    />
                                  </div>
                                </div>
                                {activeBand === category.name && (
                                  <div className="border-1 w-7 border-black transition-transform duration-300"></div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {productcat?.bandWidth && (
                    <div>
                      <div className="mt-2.5 text-md font-medium">
                        <b>Band Width:</b> {activeBandWidth}
                      </div>
                      <div className="h-10">
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
                                  " lg:w-1/10 sm:w-1/10 w-1/7",
                                  activeBandWidth === category.name ? "opacity-100 " : "opacity-80 hover:opacity-100",
                                )}
                                onClick={() => {
                                  console.log(category)
                                  setActiveBandWidth(category.name)
                                }}
                              >
                                <div className={`relative h-20 w-20 ${oswald.className} `}>
                                  <div className={`${oswald.className}  h-7.5 w-7.5  text-center  mt-6 ml-[1.6rem]`}>
                                    <Image
                                      src={category.img || "/placeholder.svg"}
                                      width={100}
                                      height={100}
                                      alt="band width"
                                      className="w-full rounded-2xl -translate-x-[0.1rem] border-1 h-full object-cover "
                                    />
                                  </div>
                                </div>
                                {activeBandWidth === category.name && (
                                  <div className="border-1 w-7 border-black transition-transform duration-300"></div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {productcat?.sizes && (
                    <div className={`${productcat?.sizes ? "" : "hidden"}`}>
                      <div className="mt-2.5 text-md ">
                        <b>Select Size:</b> {activeSize} inch
                      </div>
                      <div className="h-10">
                        <div className="mx-3 -translate-y-4 relative">
                          <div
                            ref={categoryScrollRef}
                            className="flex overflow-x-auto scrollbar-hide gap-1 px-0 pb-0 py-0 scroll-smooth -translate-x-3"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                          >
                            {productcat?.sizes?.map((category, index) => (
                              <div
                                key={index}
                                className={cn(
                                  "flex-shrink-0 h-15 flex flex-col items-center cursor-pointer transition-all -translate-y-0.5",
                                  " lg:w-1/10 sm:w-1/10 w-1/7",
                                  activeSize === category ? "opacity-100 " : "opacity-80 hover:opacity-100",
                                )}
                                onClick={() => {
                                  console.log(category)
                                  setActiveSize(category)
                                }}
                              >
                                <div className={`relative h-20 w-20 ${oswald.className} `}>
                                  <div className={`${oswald.className} border h-6 w-7  text-center mt-6 ml-[1.6rem]`}>
                                    {category}
                                  </div>
                                </div>
                                {activeSize === category && (
                                  <div className="border-1 w-7 border-black transition-transform duration-300"></div>
                                )}
                              </div>
                            ))}
                          </div>
                          <button
                            className="underline cursor-pointer -translate-y-3 md:-translate-y-5 -translate-x-2.5 hover:text-gray-600 transition-colors justify-end text-end w-full"
                            onClick={() => setIsSizeGuideOpen(true)}
                          >
                            size guide
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {productcat?.length && (
                    <div>
                      <div className="mt-2.5 text-md ">
                        <b>Metal:</b> {activeLength} inches
                      </div>
                      <div className="h-10">
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
                                  " lg:w-1/8 sm:w-1/10 w-1/6",
                                  activeLength === category ? "opacity-100 " : "opacity-80 hover:opacity-100",
                                )}
                                onClick={() => {
                                  console.log(category)
                                  setActiveLength(category)
                                }}
                              >
                                <div className={`relative h-20 w-20 ${oswald.className} `}>
                                  <div
                                    className={`${oswald.className} border h-6 w-15 -translate-x-4 text-center mt-6 ml-[1.6rem]`}
                                  >
                                    {category}
                                  </div>
                                </div>
                                {activeLength === category && (
                                  <div className="border-1 w-7 border-black transition-transform duration-300"></div>
                                )}
                              </div>
                            ))}
                          </div>
                          <button
                            className="underline cursor-pointer -translate-y-5 md:-translate-y-5 -translate-x-2.5 hover:text-gray-600 transition-colors justify-end text-end w-full"
                            onClick={() => setIsNecklaceSizeGuideOpen(true)}
                          >
                            metal guide
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="">
                <Button className=" mb-3 text-white rounded-none w-full pt-3 h-12 text-md">
                  Select your RAYA created diamond
                </Button>
                <Button className="rounded-none bg-white border-1 border-black hover:bg-gray-100 text-black w-full pt-3 h-12 text-md">
                  {" "}
                  <Image src={"/svg/cal.svg"} height={20} width={20} alt="calendar" className="ml-2 mb-1" /> Consult
                  with a diamond expert online{" "}
                </Button>
              </div>

              <div className="mt-6">
                <div className="-translate-x-1 flex text-[15px] font-light">
                  <Image
                    src={"/svg/dimand.svg"}
                    height={8}
                    width={30}
                    alt="diamond"
                    className=" icon scale-55 mr-0.5 -translate-y-0.5"
                  />
                  RAYA created diamonds <span className="font-bold ml-2 text-sm mt-0.5"> &#9432;</span>
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

              <div>
                <div className="text-2xl mt-6">The Classic Design</div>
                <div className="text-lg mt-3">{productcat?.subtitle}</div>

                {/* //used to convert productcat?.description which is in String format to HTML format */}
                {productcat?.description && (
                  <div className="mt-3" dangerouslySetInnerHTML={{ __html: productcat.description }} />
                )}
              </div>
            </div>
            <div></div>
          </div>
        </div>

        {/* Ring Size Guide Sidebar (First size guide - unchanged) */}
        <RingSizeGuideSidebar isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

        {/* Necklace Size Guide Sidebar (Second size guide - new) */}
        <NecklaceSizeGuideSidebar isOpen={isNecklaceSizeGuideOpen} onClose={() => setIsNecklaceSizeGuideOpen(false)} />
      </div>
    </TooltipProvider>
  )
}
