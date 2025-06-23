"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Star, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { sampleGemstones } from "./data"

interface GemstoneOption {
  id: string | number
  name?: string
  grade: string
  price: number
  url: string
  description?: string
  rating?: number
  features?: string[]
  origin?: string
  clarity?: string
  cut?: string
}

interface GemstoneExplorerTabProps {
  isOpen: boolean
  onClose: () => void
  gemstones: GemstoneOption[]
  onSelect: (gemstone: GemstoneOption) => void
  selectedGemstone?: GemstoneOption | null
}

export function GemstoneExplorerTab({
  isOpen,
  onClose,
  gemstones = sampleGemstones,
  onSelect,
  selectedGemstone,
}: GemstoneExplorerTabProps) {
  const [filter, setFilter] = useState<"all" | "natural" | "lab-grown">("all")
  const [sortBy, setSortBy] = useState<"price" | "rating" | "name">("price")
  const [internalSelectedGemstone, setInternalSelectedGemstone] = useState<GemstoneOption | null>(
    selectedGemstone || null,
  )

  if (!isOpen) return null

  // Fixed filtering logic to work with your data structure
  const filteredGemstones = gemstones.filter((gemstone) => {
    if (filter === "natural") {
      // Check if it's a natural gemstone (doesn't contain "lab" in grade or id)
      return (
        !gemstone.grade.toLowerCase().includes("lab") &&
        !gemstone.id.toString().toLowerCase().includes("lab") &&
        gemstone.grade !== "moissanite"
      ) // moissanite is synthetic
    }
    if (filter === "lab-grown") {
      // Check if it's lab-grown (contains "lab" in grade/id or is moissanite)
      return (
        gemstone.grade.toLowerCase().includes("lab") ||
        gemstone.id.toString().toLowerCase().includes("lab") ||
        gemstone.grade === "moissanite" ||
        gemstone.grade === "lovada"
      ) // assuming lovada is lab-grown
    }
    return true // "all" filter
  })

  const sortedGemstones = [...filteredGemstones].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price
      case "rating":
        return (b.rating || 0) - (a.rating || 0)
      case "name":
        const nameA = a.name || a.grade || ""
        const nameB = b.name || b.grade || ""
        return nameA.localeCompare(nameB)
      default:
        return 0
    }
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  // Helper function to format gemstone name
  const formatGemstoneTitle = (gemstone: GemstoneOption) => {
    const title = gemstone.name || gemstone.grade
    return title
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <TooltipProvider>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-6xl w-full max-h-[100vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Explore Gemstones</h2>
              <p className="text-gray-600 mt-1">Choose the perfect gemstone for your jewelry</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="max-w-xs space-y-1">
                    <p>
                      <strong>Type:</strong>
                    </p>
                    <p>hello</p>
                    <p>
                      <strong>Price:</strong>
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Filters and Sort */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  className="rounded-none"
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  All Gemstones
                </Button>
                <Button
                  variant={filter === "natural" ? "default" : "outline"}
                  size="sm"
                  className="rounded-none"
                  onClick={() => setFilter("natural")}
                >
                  Natural
                </Button>
                <Button
                  className="rounded-none"
                  variant={filter === "lab-grown" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("lab-grown")}
                >
                  Lab Grown
                  <Badge variant="secondary" className="ml-2">
                    -30%
                  </Badge>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "price" | "rating" | "name")}
                  className="border px-3 py-1 text-sm"
                >
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                  <option value="name">A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Gemstone Grid */}
          <div className="p-6 overflow-y-auto max-h-[52vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {sortedGemstones.map((gemstone) => (
                <Card
                  key={gemstone.id}
                  className={`cursor-pointer rounded-none transition-all hover:shadow-lg ${
                    internalSelectedGemstone?.id === gemstone.id ? "ring ring-black bg-gray-50" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setInternalSelectedGemstone(gemstone)
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Image
                        src={gemstone.url || "/placeholder.svg?height=60&width=60"}
                        alt={formatGemstoneTitle(gemstone)}
                        width={60}
                        height={60}
                        className="rounded-full border border-gray-200"
                      />
                      <div>
                        <Checkbox
                          className="size-6 rounded-none"
                          checked={internalSelectedGemstone?.id === gemstone.id}
                          onChange={(e) => {
                            e.stopPropagation()
                            setInternalSelectedGemstone(gemstone)
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-gray-900">{formatGemstoneTitle(gemstone)}</h3>
                        <span className="text-lg font-bold text-green-600">${gemstone.price.toLocaleString()}</span>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">{gemstone.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Know more</span>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="max-w-xs space-y-1">
                                <p>
                                  <strong>Type:</strong> {formatGemstoneTitle(gemstone)}
                                </p>
                                <p>
                                  <strong>Origin:</strong>{" "}
                                  {gemstone.grade.toLowerCase().includes("lab") ||
                                  gemstone.id.toString().toLowerCase().includes("lab") ||
                                  gemstone.grade === "moissanite" ||
                                  gemstone.grade === "lovada"
                                    ? "Laboratory"
                                    : "Natural"}
                                </p>
                                <p>
                                  <strong>Price:</strong> ${gemstone.price.toLocaleString()}
                                </p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        {(gemstone.grade.toLowerCase().includes("lab") ||
                          gemstone.id.toString().toLowerCase().includes("lab") ||
                          gemstone.grade === "moissanite" ||
                          gemstone.grade === "lovada") && (
                          <Badge variant="secondary" className="text-xs">
                            Lab Grown
                          </Badge>
                        )}
                      </div>
                    </div>

                    {internalSelectedGemstone?.id === gemstone.id && (
                      <div className="mt-4 p-2 bg-black text-center">
                        <span className="text-sm font-medium text-white">Selected</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedGemstones.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No gemstones found matching your filters.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {sortedGemstones.length} gemstone{sortedGemstones.length !== 1 ? "s" : ""} available
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-none" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (internalSelectedGemstone) {
                      onSelect(internalSelectedGemstone)
                    }
                    onClose()
                  }}
                  className="rounded-none"
                  disabled={!internalSelectedGemstone}
                >
                  Confirm Selection
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
