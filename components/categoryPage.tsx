"use client"

import { Lugrasimo } from 'next/font/google';
import { categories, metals, products, shapes } from "./data"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import {
  ChevronDown,
  Heart,
  LayoutGrid,
  Columns2,
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal,
  ShoppingBag,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export const lugrasimo = Lugrasimo({
  subsets: ['latin'],
  weight: '400', // Lugrasimo only has 400 weight
});

export default function EarringsPage() {
  const [activeCategory, setActiveCategory] = useState("Earrings")
  const [gridView, setGridView] = useState<"four" | "two">("four")
  const [priceRange, setPriceRange] = useState([100, 22000])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState("Featured")
  const [selectedMetals, setSelectedMetals] = useState<string[]>([])
  const [selectedShapes, setSelectedShapes] = useState<number[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const categoryScrollRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showFilters] = useState(true)

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



  // Reset all filters
  const resetFilters = () => {
    setSelectedMetals([])
    setSelectedShapes([])
    setPriceRange([100, 22000])
    setInStockOnly(false)
    setSortBy("Featured")
  }

  return (
    <div className="min-h-screen flex flex-col">

      <div className=" py-6 w-full flex-1">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <div className="flex items-center gap-1">
            <Link href="/" className={`text-gray-500 hover:text-gray-700 ${lugrasimo.className}`}>
              Shop All
            </Link>
            <span className="text-gray-500">/</span>
            <span className={`font-medium ${lugrasimo.className}`}>{activeCategory}</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-5">
          <h1 className={`text-3xl font-bold uppercase mb-1`}>{activeCategory}</h1>
          <p className="text-gray-600">Huggies, hoops, studs, and more. A whole lot more.</p>
        </div>

        <div className="relative md:mb-9 mb-2"> 
          <button
            onClick={() => scrollCategories("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-5 bg-white/80 rounded-full p-1 shadow-md"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={categoryScrollRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 px-0 pb-0 py-0 scroll-smooth -translate-x-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <div
                key={category.name}
                className={cn(
                  "flex-shrink-0 flex flex-col items-center cursor-pointer transition-all",
                  "w-[225px] sm:w-[300px]",
                  activeCategory === category.name ? "opacity-100" : "opacity-80 hover:opacity-100",
                )}
                onClick={() => setActiveCategory(category.name)}
              >
                <div
                  className={cn(
                    "relative w-full aspect-square mb-2 overflow-hidden",
                    activeCategory === category.name ? "" : "",
                  )}
                >
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className={cn("text-sm text-center -translate-y-10", activeCategory === category.name ? " font-medium" : "")}>
                  {category.name}
                </span>
                {activeCategory === category.name && <div className="h-0.5 w-10 bg-black -translate-y-10 mt-1"></div>}
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollCategories("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-5 bg-white/80 rounded-full p-1 shadow-md"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Mobile Filter Buttons */}
        {isMobile ? (
          <div className="mb-4 flex justify-between items-center border-b border-t py-2 w-screen -translate-x-4.5">

            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center justify-center gap-2 ml-4.5">
                  <SlidersHorizontal size={16} />
                  Filters
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle className="text-left">Filters</SheetTitle>
                </SheetHeader>
                <div className="py-4 px-3 space-y-6">
                  {/* Mobile filter content - moved inside filter menu as per feedback */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Metal</h3>
                    <div className="flex flex-wrap gap-2">
                      {metals.map((metal) => (
                        <button
                          key={metal.name}
                          className={cn(
                            "w-10 h-10 rounded-full border hover:ring-2 hover:ring-offset-2",
                            selectedMetals.includes(metal.name) ? "ring-2 ring-offset-2 ring-black" : "",
                          )}
                          style={{ backgroundColor: metal.color }}
                          aria-label={metal.name}
                          onClick={() => toggleMetal(metal.name)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Shape</h3>
                    <div className="flex flex-wrap gap-2">
                      {shapes.map((shape) => (
                        <button
                          key={shape.id}
                          className={cn(
                            "w-10 h-10 rounded-full border flex items-center justify-center",
                            selectedShapes.includes(shape.id)
                              ? "border-black bg-gray-100"
                              : "border-gray-300 hover:border-gray-400",
                          )}
                          onClick={() => toggleShape(shape.id)}
                        >
                          {shape.icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Price</h3>
                    <div className="space-y-4">
                      <Slider value={priceRange} min={0} max={25000} step={100} onValueChange={setPriceRange} />
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            type="number"
                            className="pl-7 w-24"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                            min={0}
                          />
                        </div>
                        <span className="text-gray-500">-</span>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            type="number"
                            className="pl-7 w-24"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                            min={0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">In-Stock Only</span>
                    <Switch checked={inStockOnly} onCheckedChange={setInStockOnly} />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Sort By</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          {sortBy} <ChevronDown size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        {["Featured", "Price: Low to High", "Price: High to Low", "Newest"].map((option) => (
                          <DropdownMenuItem
                            key={option}
                            onClick={() => setSortBy(option)}
                            className={sortBy === option ? "bg-gray-100" : ""}
                          >
                            {option}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1" onClick={resetFilters}>
                      Reset
                    </Button>
                    <Button className="flex-1">Apply</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden md:flex items-center gap-2 border rounded-md">
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
            </div>
          </div>
        ) : (
          /* Desktop Filters - Collapsible as per feedback */
          !isMobile &&
          showFilters && (
            <div className="mb-8 space-y-6 border p-4 rounded-md">
              {/* Metal filter */}
              <div>
                <h3 className="text-sm mb-3">Metal</h3>
                <div className="flex gap-2">
                  {metals.map((metal) => (
                    <button
                      key={metal.name}
                      className={cn(
                        "w-8 h-8 rounded-full border hover:ring-2 hover:ring-offset-2 hover:ring-gray-300",
                        selectedMetals.includes(metal.name) ? "ring-2 ring-offset-2 ring-black" : "",
                      )}
                      style={{ backgroundColor: metal.color }}
                      aria-label={metal.name}
                      onClick={() => toggleMetal(metal.name)}
                    />
                  ))}
                </div>
              </div>

              {/* Shape filter */}
              <div>
                <h3 className="text-sm mb-3">Shape</h3>
                <div className="flex gap-2">
                  {shapes.map((shape) => (
                    <button
                      key={shape.id}
                      className={cn(
                        "w-8 h-8 rounded-full border flex items-center justify-center",
                        selectedShapes.includes(shape.id)
                          ? "border-black bg-gray-100"
                          : "border-gray-300 hover:border-gray-400",
                      )}
                      onClick={() => toggleShape(shape.id)}
                    >
                      {shape.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price filter */}
              <div>
                <h3 className="text-sm mb-3">Price</h3>
                <div className="space-y-4">
                  <Slider value={priceRange} min={0} max={25000} step={100} onValueChange={setPriceRange} />
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        type="number"
                        className="pl-7 w-24"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                        min={0}
                      />
                    </div>
                    <span className="text-gray-500">-</span>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        type="number"
                        className="pl-7 w-24"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                        min={0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {/* Sort and view options */}
        <div
          className={cn(
            "flex flex-wrap justify-between items-center gap-4 mb-6",
            isMobile ? "py-2" : "border-t border-b py-3",
          )}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium">
                  {sortBy} <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {["Featured", "Price: Low to High", "Price: High to Low", "Newest"].map((option) => (
                    <DropdownMenuItem key={option} onClick={() => setSortBy(option)}>
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={inStockOnly} onCheckedChange={setInStockOnly} />
              IN-STOCK ONLY
            </label>
          </div>
        </div>

        {/* Product Grid */}
        <div
          className={cn(
            "grid md:gap-4 gap-2",
            gridView === "four"
              ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-2 md:grid-cols-2",
          )}
        >
          {products.map((product) => (
            <div key={product.id} className="group relative">
              {/* Wishlist button */}
              <button
                className={cn(
                  "absolute top-2 right-2 z-5 p-1.5 rounded-full ",
                  "transition-all duration-300",
                )}
                onClick={() => toggleWishlist(product.id)}
                aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  size={18}
                  className={wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}
                />
              </button>

              <div className="relative mb-2 bg-gray-50 aspect-square overflow-hidden">
                {product.bestSeller && (
                  <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 z-5 font-medium">Best Seller</span>
                )}

                {/* Default image */}
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className={cn(
                    "object-cover transition-opacity duration-300",
                    product.hoverImage ? "group-hover:opacity-0" : "",
                  )}
                />

                {/* Hover image (model wearing) */}
                {product.hoverImage && (
                  <Image
                    src={product.hoverImage || "/placeholder.svg"}
                    alt={`${product.name} worn`}
                    fill
                    className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}

                {/* Add to bag button */}
                <div className="absolute bottom-0 left-0 right-0 bg-white py-2 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full text-center text-sm font-medium flex items-center justify-center gap-2">
                    <ShoppingBag size={16} />
                    ADD TO BAG
                  </button>
                </div>
              </div>

              <h3 className="font-medium text-sm mb-0.5">{product.name}</h3>
              <p className="text-gray-700 text-sm mb-0.5">${product.price}</p>

              <div className="flex gap-1 mb-0.5">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-4 h-4 rounded-full border hover:ring-1 hover:ring-offset-1 hover:ring-gray-400",
                      isMobile ? "w-3 h-3" : "w-4 h-4",
                    )}
                    style={{ backgroundColor: color }}
                    aria-label={color}
                  />
                ))}
              </div>

              <p className={cn("text-xs text-gray-500", isMobile ? "text-[10px]" : "text-xs")}>{product.material}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
