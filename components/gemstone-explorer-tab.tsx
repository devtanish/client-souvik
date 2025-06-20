"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Star, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

const sampleGemstones: GemstoneOption[] = [
  {
    id: 1,
    name: "Lab Grown Diamond",
    grade: "VS1 Clarity",
    price: 1200,
    url: "/svg/diamond.svg",
    description: "Ethically created with identical properties to natural diamonds",
    rating: 5,
    features: ["Eco-friendly", "Conflict-free", "Same hardness as natural"],
    origin: "Laboratory",
    clarity: "VS1",
    cut: "Excellent",
  },
  {
    id: 2,
    name: "Natural Diamond",
    grade: "VVS2 Clarity",
    price: 2400,
    url: "/svg/diamond.svg",
    description: "Naturally formed over billions of years deep within the Earth",
    rating: 5,
    features: ["Natural formation", "Rare", "Traditional choice"],
    origin: "Earth",
    clarity: "VVS2",
    cut: "Excellent",
  },
  {
    id: 3,
    name: "Sapphire",
    grade: "AAA Quality",
    price: 800,
    url: "/placeholder.svg?height=100&width=100",
    description: "Stunning blue gemstone known for its durability and brilliance",
    rating: 4,
    features: ["Durable", "Vibrant color", "Royal heritage"],
    origin: "Sri Lanka",
    clarity: "Eye Clean",
    cut: "Round",
  },
  {
    id: 4,
    name: "Emerald",
    grade: "AA+ Quality",
    price: 1000,
    url: "/placeholder.svg?height=100&width=100",
    description: "Precious green gemstone symbolizing rebirth and love",
    rating: 4,
    features: ["Rare", "Vibrant green", "Historical significance"],
    origin: "Colombia",
    clarity: "SI1",
    cut: "Emerald",
  },
  {
    id: 5,
    name: "Ruby",
    grade: "AA Quality",
    price: 1500,
    url: "/placeholder.svg?height=100&width=100",
    description: "The king of gemstones with passionate red color",
    rating: 5,
    features: ["Passionate red", "Extremely durable", "Symbol of love"],
    origin: "Myanmar",
    clarity: "Eye Clean",
    cut: "Oval",
  },
  {
    id: 6,
    name: "Tanzanite",
    grade: "A+ Quality",
    price: 600,
    url: "/placeholder.svg?height=100&width=100",
    description: "Rare blue-purple gemstone found only in Tanzania",
    rating: 4,
    features: ["Extremely rare", "Unique color", "Investment potential"],
    origin: "Tanzania",
    clarity: "VS",
    cut: "Cushion",
  },
]

export function GemstoneExplorerTab({
  isOpen,
  onClose,
  gemstones = sampleGemstones,
  onSelect,
  selectedGemstone,
}: GemstoneExplorerTabProps) {
  const [filter, setFilter] = useState<"all" | "natural" | "lab-grown">("all")
  const [sortBy, setSortBy] = useState<"price" | "rating" | "name">("price")

  if (!isOpen) return null

  const filteredGemstones = gemstones.filter((gemstone) => {
    if (filter === "natural") return gemstone.origin !== "Laboratory" && gemstone.origin !== undefined
    if (filter === "lab-grown") return gemstone.origin === "Laboratory"
    return true
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

  return (
    <TooltipProvider>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Explore Gemstones</h2>
              <p className="text-gray-600 mt-1">Choose the perfect gemstone for your jewelry</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Filters and Sort */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-2">
                <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                  All Gemstones
                </Button>
                <Button
                  variant={filter === "natural" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("natural")}
                >
                  Natural
                </Button>
                <Button
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
                  className="border rounded px-3 py-1 text-sm"
                >
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Gemstone Grid */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedGemstones.map((gemstone) => (
                <Card
                  key={gemstone.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedGemstone?.id === gemstone.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => onSelect(gemstone)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Image
                        src={gemstone.url || "/placeholder.svg"}
                        alt={gemstone.name || gemstone.grade}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-gray-200"
                      />
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">${gemstone.price.toLocaleString()}</div>
                        {gemstone.rating && (
                          <div className="flex items-center gap-1 mt-1">{renderStars(gemstone.rating)}</div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-bold text-lg text-gray-900">{gemstone.name || gemstone.grade}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">{gemstone.grade}</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="max-w-xs space-y-1">
                              <p>
                                <strong>Origin:</strong> {gemstone.origin || "Not specified"}
                              </p>
                              <p>
                                <strong>Clarity:</strong> {gemstone.clarity || "Not specified"}
                              </p>
                              <p>
                                <strong>Cut:</strong> {gemstone.cut || "Not specified"}
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">{gemstone.description}</p>

                      {gemstone.features && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {gemstone.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {gemstone.features.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{gemstone.features.length - 2} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    {selectedGemstone?.id === gemstone.id && (
                      <div className="mt-4 p-2 bg-blue-100 rounded text-center">
                        <span className="text-sm font-medium text-blue-800">Selected</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {sortedGemstones.length} gemstone{sortedGemstones.length !== 1 ? "s" : ""} available
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={onClose} disabled={!selectedGemstone}>
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
