"use client"

import { Cormorant_Garamond } from 'next/font/google'

import { SlHandbag } from "react-icons/sl"
import * as React from "react"
import { useState, useRef, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Montserrat } from 'next/font/google'
import { useCart } from "@/contexts/cart-context"

// Initialize the Cormorant Garamond font
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400"],
})

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ChevronDown, LayoutGrid, Columns2, ChevronRight, ChevronLeft, SlidersHorizontal, X, Plus, Minus } from 'lucide-react'
import { cn } from "@/lib/utils"

// Import data
import { categories, metalscolor, shapes, products, stone } from "./data"

// Add keyframes for subtle shimmer effect
const shimmerAnimation = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes scaleIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .collapsible-content-open {
    animation: fadeIn 0.3s ease-out forwards;
  }

  .filter-item {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .filter-item:hover {
    transform: translateY(-2px);
  }

  .collapsible-section {
    transition: background-color 0.2s ease;
  }
  
  .collapsible-section:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
  
  .chevron-rotate {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .chevron-rotate[data-state="open"] {
    transform: rotate(180deg);
  }

  .filter-item .hover-info {
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .filter-item:hover .hover-info {
    opacity: 1;
    transform: translateY(0);
  }
  
  @keyframes pulseScale {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  .stone-hover-effect {
    animation: pulseScale 1.5s infinite;
  }
`

export default function EarringsPage() {

  const [centerTrackedCategory, setCenterTrackedCategory] = useState(categories[0].name)

  const { addToCart, addToWishlist, removeFromWishlist } = useCart()

  const [activeCategory, setActiveCategory] = useState("Earrings")
  const [gridView, setGridView] = useState<"four" | "two" | "one">("four")
  const [priceRange, setPriceRange] = useState([0, 22000])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState("Featured")
  const [selectedMetals, setSelectedMetals] = useState<string[]>([])
  const [selectedShapes, setSelectedShapes] = useState<number[]>([])
  const [selectedStones, setSelectedStones] = useState<string[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const categoryScrollRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // State to track open filter sections
  type FilterSection = "price" | "material" | "shape" | "metal" | "stone"

  const [openFilters, setOpenFilters] = useState<Record<FilterSection, boolean>>({
    price: true,
    material: false,
    shape: false,
    metal: true,
    stone: true,
  })

  const [open, setOpen] = React.useState(false)
  const [selectedFilters] = React.useState<Record<string, string[]>>({})
  const [pickupOnly] = React.useState(false)

  const filterCount = Object.values(selectedFilters).flat().length + (pickupOnly ? 1 : 0)

  const scrollToCategory = (index: number) => {
    if (categoryScrollRef.current) {
      const targetElement = categoryScrollRef.current.children[index] as HTMLElement
      if (targetElement) {
        // Set the clicked category as the active one (for visual selection)
        setActiveCategory(categories[index].name)
      }
    }
  }

  //strted used for dot selection tracker of middel image
  useEffect(() => {
    const handleScroll = () => {
      if (categoryScrollRef.current) {
        const scrollContainer = categoryScrollRef.current
        const children = Array.from(scrollContainer.children) as HTMLElement[]

        // Calculate the center of the visible scroll area
        const containerCenter = scrollContainer.scrollLeft + scrollContainer.offsetWidth / 2

        let closestCategoryIndex = 0
        let minDistance = Number.POSITIVE_INFINITY

        // Find the category closest to the center of the scroll container
        children.forEach((child, index) => {
          const childCenter = child.offsetLeft + child.offsetWidth / 2
          const distance = Math.abs(containerCenter - childCenter)

          if (distance < minDistance) {
            minDistance = distance
            closestCategoryIndex = index
          }
        })
        // Update the tracked category, but this does NOT affect activeCategory
        if (centerTrackedCategory !== categories[closestCategoryIndex].name) {
          setCenterTrackedCategory(categories[closestCategoryIndex].name)
        }
      }
    }

    const scrollContainer = categoryScrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
      // Call handleScroll once on mount to set initial tracked category
      handleScroll()
      return () => scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [categories, centerTrackedCategory])

  // Check if mobile on mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  useEffect(() => {
    // Set appropriate default grid view when switching between mobile and desktop
    if (isMobile && (gridView === "four" || gridView === "two")) {
      setGridView("two")
    } else if (!isMobile && gridView === "one") {
      setGridView("four")
    }
  }, [isMobile, gridView])

  // Handle category scroll
  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // Toggle wishlist
  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  // Toggle metal selection
  const toggleMetal = (metalName: string) => {
    setSelectedMetals((prev) =>
      prev.includes(metalName) ? prev.filter((name) => name !== metalName) : [...prev, metalName],
    )
  }

  // Toggle shape selection
  const toggleShape = (shapeId: number) => {
    setSelectedShapes((prev) => (prev.includes(shapeId) ? prev.filter((id) => id !== shapeId) : [...prev, shapeId]))
  }

  // Toggle shape selection
  const toggleStone = (shapeId: string) => {
    setSelectedStones((prev) => (prev.includes(shapeId) ? prev.filter((id) => id !== shapeId) : [...prev, shapeId]))
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedMetals([])
    setSelectedShapes([])
    setSelectedStones([])
    setPriceRange([0, 22000])
    setInStockOnly(false)
    setSortBy("Featured")
  }

  // Function to toggle a specific filter's open state
  const toggleFilterSection = (section: FilterSection) => {
    setOpenFilters((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Function to toggle a specific filter's open state
  const toggleFilterSection2 = (section: FilterSection) => {
    setOpenFilters((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Filter and sort products based on selected filters
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Filter by metal
        if (selectedMetals.length > 0) {
          const productMetal = product.name.split(" ")[0] // Extract metal from name
          if (!selectedMetals.includes(productMetal)) {
            return false
          }
        }

        // Filter by shape
        if (selectedShapes.length > 0 && !selectedShapes.includes(product.shape.id)) {
          return false
        }

        // Filter by stone
        if (selectedStones.length > 0 && !selectedStones.includes(product.stone)) {
          return false
        }

        // Filter by price range
        if (product.price < priceRange[0] || product.price > priceRange[1]) {
          return false
        }

        // Filter by in-stock
        if (inStockOnly && !product.bestSeller) {
          // Using bestSeller as a proxy for inStock
          return false
        }

        return true
      })
      .sort((a, b) => {
        // Sort based on selected option
        switch (sortBy) {
          case "Price: Low to High":
            return a.price - b.price
          case "Price: High to Low":
            return b.price - a.price
          case "Newest":
            return b.id - a.id // Using ID as a proxy for date
          default:
            return b.bestSeller ? 1 : -1 // Featured sorts by best seller
        }
      })
  }, [selectedMetals, selectedShapes, selectedStones, priceRange, inStockOnly, sortBy])

  return (
    <div className={`min-h-screen flex flex-col ${cormorantGaramond.className}`}>
      <style jsx global>{`
        ${shimmerAnimation}
        
        .metal-filter-selected::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 100%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 200%;
          animation: shimmer 2s infinite linear;
          pointer-events: none;
        }
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
      <div className="py-6 w-full flex-1">
        {/* Breadcrumb */}
        <nav className="text-sm mb-2 lg:mx-12 md:mx-10 mx-3">
          <div className="flex items-center gap-1">
            <Link href="/" className={`text-gray-400 hover:text-gray-700 text-md ${cormorantGaramond.className}`}>
              Shop All
            </Link>
            <span className="text-gray-500 text-md">/</span>
            <span className={`text-md font-medium text-gray-500 ${cormorantGaramond.className}`}>{activeCategory}</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-5 lg:mx-12 md:mx-10 mx-3">
          <h1 className={`text-3xl font-bold uppercase mb-1 ${cormorantGaramond.className}`}>{activeCategory}</h1>
          <p className={`text-gray-600 ${cormorantGaramond.className}`}>
            Huggies, hoops, studs, and more. A whole lot more.
          </p>
        </div>

        <div className="relative md:mb-4 mb-2 lg:mx-12 md:mx-10 mx-3">
          <button
            onClick={() => scrollCategories("left")}
            className="md:flex hidden absolute left-0 top-1/2 -translate-y-1/2 z-8 bg-white/80 rounded-full p-1 shadow-md"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <div
            ref={categoryScrollRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 px-0 pb-0 py-0 scroll-smooth -translate-x-0 mt-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category, index) => (
              <div
                key={category.name}
                className={cn(
                  "flex-shrink-0 flex flex-col items-center cursor-pointer transition-all",
                  "w-[225px] sm:w-[300px]",
                  // Visuals (opacity) are still tied to activeCategory, not centerTrackedCategory
                  activeCategory === category.name ? "opacity-100" : "opacity-80 hover:opacity-100",
                )}
                onClick={() => scrollToCategory(index)} // Clicking scrolls and sets activeCategory
              >
                <div
                  className={cn(
                    "relative w-full aspect-square mb-2 overflow-hidden md:h-[400px] h-[300px] shadow-md",
                    // Visuals (shadow) are still tied to activeCategory
                    activeCategory === category.name ? "" : "",
                  )}
                >
                  <Image
                    src={category.image || "/placeholder.svg?height=300&width=300"}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span
                  className={cn(
                    `text-sm text-center -translate-y-10 font-serif`, // Using font-serif as a placeholder for cormorantGaramond.className
                    // Visuals (font-weight) are still tied to activeCategory
                    activeCategory === category.name ? " font-medium" : "",
                  )}
                >
                  {category.name.toUpperCase()}
                </span>
                {/* Visual (black bar) is still tied to activeCategory */}
                {activeCategory === category.name && <div className="h-0.5 w-10 bg-black -translate-y-10 mt-1"></div>}
              </div>
            ))}
          </div>
          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-0 -translate-y-2.5 md:-translate-y-1">
            {categories.map((category, index) => (
              <button
                key={index}
                className={cn(
                  "w-1.5 h-1.5 size-[4.5px] md:size-[5px] rounded-full transition-colors",
                  // Dot styling: black if activeCategory, gray-600 if center-tracked (but not active), else gray-300
                  centerTrackedCategory === category.name
                    ? "bg-[#696969]" // Explicitly selected by click
                    : centerTrackedCategory === category.name
                      ? "bg-gray-600" // Center-tracked by scroll, but not the active one
                      : "bg-gray-300 hover:bg-gray-400", // Default
                )}
                onClick={() => scrollToCategory(index)} // Clicking scrolls and sets activeCategory
                aria-label={`Go to category ${category.name}`}
              />
            ))}
          </div>
          <button
            onClick={() => scrollCategories("right")}
            className=" md:flex hidden absolute right-0 top-1/2 -translate-y-1/2 z-8 bg-white/80 rounded-full p-1 shadow-md"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Sort and view options */}
        <div className="">
          <div
            className={cn(
              "flex sticky bg-white md:top-32 top-19 z-10 flex-wrap justify-between items-center gap-4 mb-6 border-t border-b py-3 md:-translate-x-0  w-full ",
              isMobile ? "py-2" : "border-t border-b py-3",
            )}
          >
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className={` text-md flex items-center justify-center gap-2 ml-3 md:ml-12.5`}>
                  <SlidersHorizontal size={16} />
                  Filters {filterCount > 0 && `(${filterCount})`}
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="md:w-1/2 w-screen sm:max-w-full p-0 flex flex-col">
                <SheetHeader className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <SheetTitle className={`  text-lg font-bold `}>FILTERS</SheetTitle>
                    <button onClick={() => setOpen(false)}>
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </button>
                  </div>
                </SheetHeader>

                <div className="flex-1 overflow-auto">
                  <div className="p-4 flex items-center justify-between">
                    <Label htmlFor="pickup" className={`text-sm
                       font-medium  `}>
                      IN-STOCK ONLY
                    </Label>
                    <Switch
                      id="pickup"
                      className="float-right"
                      checked={inStockOnly}
                      onCheckedChange={setInStockOnly}
                    />
                  </div>
                  <Separator />

                  <React.Fragment>
                    <Collapsible
                      className="w-full"
                      defaultOpen={openFilters.price}
                      open={openFilters.price}
                      onOpenChange={() => toggleFilterSection("price")}
                    >
                      <div className="p-5 px-4 collapsible-section hover:bg-gray-50/80">
                        <CollapsibleTrigger className="flex w-full items-center justify-between">
                          <span className={`text-sm font-medium `}>PRICE</span>
                          <button
                            className={`relative flex items-center justify-center w-8 h-8 rounded-full text-black focus:outline-none transition-all duration-300 ease-in-out hover:bg-gray-100`}
                            aria-label={openFilters.price ? "Collapse" : "Expand"}
                          >
                            <span className={`absolute transition-transform duration-300 ${openFilters.price ? "rotate-0" : "rotate-90"}`}>
                              <Minus size={16} className={openFilters.price ? "opacity-100" : "opacity-0"} color="gray" />
                            </span>
                            <span
                              className={`absolute transition-transform duration-300 ${openFilters.price ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                                }`}
                            >
                              <Plus size={16} color="gray" />
                            </span>
                          </button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="px-4 pb-4 overflow-hidden collapsible-content-open pt-4">
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <div className="space-y-4 w-full">
                              <Slider
                                value={priceRange}
                                min={0}
                                max={25000}
                                step={100}
                                onValueChange={setPriceRange}
                                className="w-full"
                              />
                              <div className="flex items-center gap-2">
                                <div className="relative">
                                  <span className={`absolute left-3 top-1/2 text-xs ${montserrat.className}  -translate-y-1/2 text-gray-500`}>$</span>
                                  <Input
                                    type="number"
                                    className={` ${montserrat.className} pl-7 w-30 rounded-none text-xs`}
                                    value={priceRange[0]}
                                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                    min={0}
                                  />
                                </div>
                                <span className="text-gray-500">-</span>
                                <div className="relative">
                                  <span className={`absolute left-3 top-1/2 text-xs -translate-y-1/2 text-gray-500 ${montserrat.className} `}>$</span>
                                  <Input
                                    type="number"
                                    className={`pl-7 w-34 rounded-none text-xs ${montserrat.className} `}
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    min={0}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    <Separator />
                  </React.Fragment>

                  <React.Fragment>
                    <Collapsible
                      className="w-full"
                      defaultOpen={openFilters.stone}
                      open={openFilters.stone}
                      onOpenChange={() => toggleFilterSection("stone")}
                    >
                      <div className="p-5 px-4 collapsible-section ">
                        <CollapsibleTrigger className="flex w-full items-center justify-between">
                          <span className={`text-sm font-medium `}>SHAPE</span>
                          <button
                            className={`relative flex items-center justify-center w-8 h-8 rounded-full text-black focus:outline-none transition-all duration-300 ease-in-out hover:bg-gray-100`}
                            aria-label={openFilters.stone ? "Collapse" : "Expand"}
                          >
                            <span className={`absolute transition-transform duration-300 ${openFilters.stone ? "rotate-0" : "rotate-90"}`}>
                              <Minus size={16} className={openFilters.price ? "opacity-100" : "opacity-0"} color="gray" />
                            </span>
                            <span
                              className={`absolute transition-transform duration-300 ${openFilters.stone ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                                }`}
                            >
                              <Plus size={16} color="gray" />
                            </span>
                          </button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="px-3 pb-4 lg:mx-0 transition-all overflow-hidden collapsible-content-open">
                        <div className="space-y-3">
                          <div className="flex gap-3 flex-wrap justify-between md:mx-0">
                            {stone.map((metal) => (
                              <div
                                key={metal.id}
                                className="flex flex-col items-center justify-center gap-1 filter-item relative group"
                              >
                                <button
                                  key={metal.id}
                                  className={cn(
                                    "rounded-full relative overflow-hidden transition-all duration-300 mt-2",
                                    "transform hover:scale-105  hover:z-10",
                                    "before:absolute before:inset-0 before:opacity-0 before:rounded-full before:transition-opacity before:duration-300 hover:before:opacity-20 before:bg-white",
                                    selectedStones.includes(metal.name)
                                      ? "ring-2 ring-offset-2 ring-black shadow metal-filter-selected"
                                      : " hover:ring-gray-300",
                                  )}
                                  aria-label={metal.name}
                                  onClick={() => toggleStone(metal.name)}
                                >
                                  <Image
                                    src={metal.element || "/placeholder.svg"}
                                    alt={metal.name}
                                    width={40}
                                    height={40}
                                    className="w-20 h-20 object-contain p-3"
                                  />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    <Separator />
                  </React.Fragment>

                  <React.Fragment>
                    <Collapsible
                      className="w-full"
                      defaultOpen={openFilters.metal}
                      open={openFilters.metal}
                      onOpenChange={() => toggleFilterSection2("metal")}
                    >
                      <div className="p-5 px-4 collapsible-section hover:bg-gray-50/80">
                        <CollapsibleTrigger className="flex w-full items-center justify-between">
                          <span className={`text-sm font-medium  `}>METALS</span>
                          <button
                            className={`relative flex items-center justify-center w-8 h-8 rounded-full text-black focus:outline-none transition-all duration-300 ease-in-out hover:bg-gray-100`}
                            aria-label={openFilters.metal ? "Collapse" : "Expand"}
                          >
                            <span className={`absolute transition-transform duration-300 ${openFilters.metal ? "rotate-0" : "rotate-90"}`}>
                              <Minus size={16} className={openFilters.price ? "opacity-100" : "opacity-0"} color="gray" />
                            </span>
                            <span
                              className={`absolute transition-transform duration-300 ${openFilters.metal ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                                }`}
                            >
                              <Plus size={16} color="gray" />
                            </span>
                          </button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="px-3 pb-4 overflow-hidden collapsible-content-open">
                        <div className="space-y-1">
                          {[
                            { id: 1, name: "18k Gold" },
                            { id: 2, name: "14k Gold" },
                            { id: 3, name: "9kt Gold" },
                            { id: 4, name: "925 silver" },
                          ].map((shape) => (
                            <div
                              key={shape.name}
                              className="flex items-center space-x-2 filter-item py-1 px-1 rounded-md hover:bg-gray-50"
                            >
                              <Checkbox
                                className="h-5 w-5"
                                id={`shape-${shape.name}`}
                                checked={selectedShapes.includes(shape.id)}
                                onCheckedChange={() => toggleShape(shape.id)}
                              />
                              <Label
                                htmlFor={`shape-${shape.name}`}
                                className={`text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${montserrat.className} `}
                              >
                                {shape.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    <Separator />
                  </React.Fragment>

                  <React.Fragment>
                    <Collapsible
                      className="w-full"
                      defaultOpen={openFilters.material}
                      open={openFilters.material}
                      onOpenChange={() => toggleFilterSection("material")}
                    >
                      <div className="p-5 px-4 collapsible-section ">
                        <CollapsibleTrigger className="flex w-full items-center justify-between">
                          <span className={`text-sm font-medium `}>METAL COLOUR</span>
                          <button
                            className={`relative flex items-center justify-center w-8 h-8 rounded-full text-black focus:outline-none transition-all duration-300 ease-in-out hover:bg-gray-100`}
                            aria-label={openFilters.material ? "Collapse" : "Expand"}
                          >
                            <span className={`absolute transition-transform duration-300 ${openFilters.material ? "rotate-0" : "rotate-90"}`}>
                              <Minus size={16} className={openFilters.price ? "opacity-100" : "opacity-0"} color="gray" />
                            </span>
                            <span
                              className={`absolute transition-transform duration-300 ${openFilters.material ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                                }`}
                            >
                              <Plus size={16} color="gray" />
                            </span>
                          </button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="px-3 pb-4 lg:mx-19 transition-all overflow-hidden collapsible-content-open">
                        <div className="space-y-3">
                          <div className="flex gap-3 justify-between md:mx-0">
                            {metalscolor.map((metal) => (
                              <div
                                key={metal.name}
                                className="flex flex-col items-center justify-center gap-1 filter-item"
                              >
                                <button
                                  key={metal.name}
                                  className={cn(
                                    "lg:w-20 lg:h-20 w-20 h-20 rounded-full border relative overflow-hidden transition-all duration-300 mt-2",
                                    "transform hover:scale-105 hover:shadow-lg hover:z-10",
                                    "before:absolute before:inset-0 before:opacity-0 before:rounded-full before:transition-opacity before:duration-300 hover:before:opacity-20 before:bg-white",
                                    selectedMetals.includes(metal.name)
                                      ? "ring-2 ring-offset-2 ring-black shadow-md"
                                      : "hover:ring-1 hover:ring-offset-2 hover:ring-gray-300",
                                  )}
                                  style={{
                                    backgroundImage: metal.color,
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                  }}
                                  aria-label={metal.name}
                                  onClick={() => toggleMetal(metal.name)}
                                >
                                  <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration">
                                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                      {selectedMetals.includes(metal.name) ? (
                                        <X size={14} className="text-black/70" />
                                      ) : (
                                        <span className="w-4 h-4 bg-white/70 rounded-full"></span>
                                      )}
                                    </span>
                                  </span>
                                </button>
                                <Label className={`mt-3 text-xs transition-all duration-200 hover:font-medium ${montserrat.className} `}>
                                  {metal.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    <Separator />
                  </React.Fragment>

                  <React.Fragment>
                    <Collapsible
                      className="w-full"
                      defaultOpen={openFilters.shape}
                      open={openFilters.shape}
                      onOpenChange={() => toggleFilterSection("shape")}
                    >
                      <div className="p-5 px-4 collapsible-section hover:bg-gray-50/80">
                        <CollapsibleTrigger className="flex w-full items-center justify-between">
                          <span className={`text-sm font-medium `}>STONE</span>
                          <button
                            className={`relative flex items-center justify-center w-8 h-8 rounded-full text-black focus:outline-none transition-all duration-300 ease-in-out hover:bg-gray-100`}
                            aria-label={openFilters.shape ? "Collapse" : "Expand"}
                          >
                            <span className={`absolute transition-transform duration-300 ${openFilters.shape ? "rotate-0" : "rotate-90"}`}>
                              <Minus size={16} className={openFilters.price ? "opacity-100" : "opacity-0"} color="gray" />
                            </span>
                            <span
                              className={`absolute transition-transform duration-300 ${openFilters.shape ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                                }`}
                            >
                              <Plus size={16} color="gray" />
                            </span>
                          </button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="px-3 pb-4 overflow-hidden collapsible-content-open">
                        <div className="space-y-1">
                          {shapes.map((shape) => (
                            <div
                              key={shape.name}
                              className="flex items-center space-x-2 filter-item py-1 px-1 rounded-md hover:bg-gray-50"
                            >
                              <Checkbox
                                className="h-5 w-5"
                                id={`shape-${shape.name}`}
                                checked={selectedShapes.includes(shape.id)}
                                onCheckedChange={() => toggleShape(shape.id)}
                              />
                              <Label
                                htmlFor={`shape-${shape.name}`}
                                className={`text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${montserrat.className} `}
                              >
                                {shape.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    <Separator />
                  </React.Fragment>
                </div>

                <div className="p-4 border-t mt-auto grid grid-cols-2 gap-4">
                  <Button variant="outline" className={`rounded-none text-sm `} onClick={resetFilters}>
                    CLEAR ALL
                  </Button>
                  <Button onClick={() => setOpen(false)} className={`text-sm rounded-none `}>
                    VIEW RESULTS {filterCount > 0 && `(${filterCount})`}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex rounded-none items-center gap-4 justify-between lg:-translate-x-0 mr-3 md:mr-12">
              <div className="flex items-center gap-2 ">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-md font-medium">
                    {sortBy} <ChevronDown size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {["Price: Low to High", "Price: High to Low", "Newest"].map((option) => (
                      <DropdownMenuItem key={option} onClick={() => setSortBy(option)}>
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2 border rounded-none">
                {isMobile ? (
                  <>
                    <button
                      className={cn("p-2", gridView === "two" ? "bg-gray-100" : "")}
                      onClick={() => setGridView("two")}
                      aria-label="Two column view"
                    >
                      <LayoutGrid size={18} />
                    </button>
                    <button
                      className={cn("p-2", gridView === "one" ? "bg-gray-100" : "")}
                      onClick={() => setGridView("one")}
                      aria-label="One column view"
                    >
                      <Columns2 size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={cn("p-2", gridView === "four" ? "bg-gray-100" : "")}
                      onClick={() => setGridView("four")}
                      aria-label="Four column view"
                    >
                      <LayoutGrid size={18} />
                    </button>
                    <button
                      className={cn("p-2", gridView === "two" ? "bg-gray-100" : "")}
                      onClick={() => setGridView("two")}
                      aria-label="Two column view"
                    >
                      <Columns2 size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div
            className={cn(
              "grid md:gap-4 gap-2 lg:mx-12 md:mx-10 mx-3",
              gridView === "four"
                ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : gridView === "two"
                  ? "grid-cols-2 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-1",
            )}
          >
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters to find what you&apos;re looking for.</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="group relative">
                  {/* Wishlist button */}
                  <button
                    className={cn("absolute top-2 right-2 z-5 p-1.5 rounded-full ", "transition-all duration-300")}
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      onClick={() => {
                        wishlist.includes(product.id) ? removeFromWishlist(product.id.toString())
                          : addToWishlist({
                            id: product.id.toString(),
                            name: product.name,
                            price: product.price,
                            image: product.images,
                            material: product.material,
                          })

                      }}
                      fill="red"
                      xmlns="http://www.w3.org/2000/svg">

                      <path d="M14.12 17.95L20.02 11.3C20.63 10.53 21 9.56 21 8.5C21 6.01 18.99 4 16.5 4C14.01 4 12 6.01 12 8.5C12 6.01 9.99 4 7.5 4C5.01 4 3 6.01 3 8.5C3 9.56 3.37 10.53 3.98 11.3L9.88 17.95L12 20.34L14.12 17.95Z"
                        fill="white"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        className={`svg-stroke svg-fill ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}>
                      </path>

                    </svg>
                  </button>

                  <div className="relative mb-2 bg-gray-50 aspect-[5/6] md:aspect-square overflow-hidden">
                    {product.bestSeller && (
                      <span className={`absolute font-mono top-2 left-2 bg-white md:text-[10px] text-[8.5px] px-2 py-1 z-5  ${montserrat.className} `}>
                        BEST SELLING
                      </span>
                    )}

                    {!product.bestSeller && ( // Using bestSeller as a proxy for inStock since inStock isn't in the data
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-5">
                        <span className="text-white font-medium text-sm">Out of Stock</span>
                      </div>
                    )}

                    {/* Default image */}
                    <Link target="_blank" href={`/shop/${product.name.toString()}`}>
                      <Image
                        src={product.images || "/placeholder.svg?height=300&width=300"}
                        alt={product.name}
                        fill
                        className={cn(
                          "object-cover transition-opacity duration-300 ",
                          product.hoverImage ? "group-hover:opacity-0" : "",
                        )}
                      />
                      {/* Hover image (model wearing) */}
                      {product.hoverImage && (
                        <Image
                          src={product.hoverImage || "/placeholder.svg?height=300&width=300"}
                          alt={`${product.name} worn`}
                          fill
                          className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      )}
                    </Link>

                    {/* Add to bag button */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white py-2 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button
                        className="w-full text-center text-sm font-medium flex items-center justify-center gap-2"
                        disabled={!product.bestSeller}
                        onClick={() => addToCart({ id: product.id.toString(), name: product.name, price: product.price, image: product.images, material: product.material, stone: product.stone })}
                      >
                        <SlHandbag size={16} />
                        ADD TO BAG
                      </button>
                    </div>
                  </div>

                  <Link target="_blank" href={`/shop/${product.name.toString()}`}>
                    <h3 className="font-medium text-md mb-0.5">{product.name}</h3>
                    <p className="text-gray-700 text-sm mb-0.5">${product.price}</p>

                    <div className="flex gap-1 mb-0.5">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          className={cn(
                            "w-4 h-4 rounded-full border hover:ring-1 hover:ring-offset-1 hover:ring-gray-400",
                            isMobile ? "w-3 h-3" : "w-4 h-4",
                          )}
                          style={{ backgroundImage: color }}
                          aria-label={`Color: ${color}`}
                        />
                      ))}
                    </div>
                    <p className={cn("text-xs text-gray-500", `${cormorantGaramond.className}`, isMobile ? "text-[15px]" : "text-xs")}>
                      {product.material}
                    </p>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}