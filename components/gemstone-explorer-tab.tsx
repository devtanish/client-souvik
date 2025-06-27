"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { products } from "./data"

interface GemstoneOption {
  id: string | number
  name?: string
  grade: string
  price: number
  description?: string
  url?: string
  features?: string[]
  origin?: string
  clarity?: string
  cut?: string
  type?: string
  tags?: string[]
}

interface GemstoneExplorerTabProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (gemstone: GemstoneOption, quality?: GemstoneOption, qualitySource?: "natural" | "lab-grown") => void
  gemstones: GemstoneOption[]
}

export function GemstoneExplorerTab({ isOpen, onClose, onSelect, gemstones }: GemstoneExplorerTabProps) {
  const [activeTab, setActiveTab] = useState<"all" | "natural" | "lab-grown">("all")
  const [sortBy, setSortBy] = useState<"price" | "name">("price")
  const [selectedGemstone, setSelectedGemstone] = useState<GemstoneOption | null>(null)
  const [selectedQuality, setSelectedQuality] = useState<GemstoneOption | null>(null)
  const [qualityTabSource, setQualityTabSource] = useState<"natural" | "lab-grown" | null>(null)

  if (!isOpen) return null

  // Early return if no gemstones provided
  if (!gemstones || gemstones.length === 0) {
    return (
      <TooltipProvider>
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">No Gemstones Available</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-gray-600 mb-4">No gemstones are available for selection.</p>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        </div>
      </TooltipProvider>
    )
  }

  // Safe access to first gemstone
  const firstGemstone = gemstones[0]

  // Safe access to product stones with error handling
  const getProductStones = () => {
    if (!firstGemstone?.id) {
      return []
    }

    const product = products.find((product) => product.id === firstGemstone.id)
    return product?.GemStone || []
  }

  // Get natural and lab grown gemstones safely
  const naturalGemstones = firstGemstone?.id
    ? products.find((product) => product.id === firstGemstone.id)?.naturalGemstones || []
    : []

  const labGrownGemstones = firstGemstone?.id
    ? products.find((product) => product.id === firstGemstone.id)?.labGrownGemstones || []
    : []

  const productStone = getProductStones()

  // Filter gemstones based on active tab
  const getFilteredGemstones = () => {
    if (activeTab === "all") {
      return productStone
    }
    return [] // Only show gemstones in "All" tab
  }

  // Filter quality options based on active tab
  const getFilteredQuality = () => {
    if (activeTab === "natural") {
      return naturalGemstones
    } else if (activeTab === "lab-grown") {
      return labGrownGemstones
    }
    return [] // Only show quality in Natural/Lab Grown tabs
  }

  // Sort function
  const sortItems = (items: GemstoneOption[]) => {
    if (!items || items.length === 0) return []

    return [...items].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price
        case "name":
          const nameA = a.name || a.grade || ""
          const nameB = b.name || b.grade || ""
          return nameA.localeCompare(nameB)
        default:
          return 0
      }
    })
  }

  const sortedGemstones = sortItems(getFilteredGemstones())
  const sortedQuality = sortItems(getFilteredQuality())

  // Handle gemstone selection (only one allowed)
  const handleGemstoneSelect = (gemstone: GemstoneOption) => {
    setSelectedGemstone(selectedGemstone?.id === gemstone.id ? null : gemstone)
  }

  // Handle quality selection (only one allowed, clears other tab)
  const handleQualitySelect = (quality: GemstoneOption) => {
    if (selectedQuality?.id === quality.id && qualityTabSource === activeTab) {
      // Deselect if clicking the same item in the same tab
      setSelectedQuality(null)
      setQualityTabSource(null)
    } else {
      // Select new quality and remember which tab it came from
      setSelectedQuality(quality)
      setQualityTabSource(activeTab as "natural" | "lab-grown")
    }
  }

  // Format gemstone title
  const formatGemstoneTitle = (gemstone: GemstoneOption) => {
    const title = gemstone.name || gemstone.grade || "Unknown"
    return title
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  // Get selection summary
  const getSelectionSummary = () => {
    const parts = []
    if (qualityTabSource) parts.push(qualityTabSource === "natural" ? "Natural" : "Lab Grown")
    if (selectedGemstone) parts.push(formatGemstoneTitle(selectedGemstone))
    if(selectedQuality) parts.push(formatGemstoneTitle(selectedQuality))
    
    return parts.join(" + ") || "No selection"
  }

  // Calculate total price
  const getTotalPrice = () => {
    let total = 0
    if (selectedGemstone) total += selectedGemstone.price
    if (selectedQuality) total += selectedQuality.price
    return total
  }

  // Handle confirm selection
  const handleConfirmSelection = () => {
    if (selectedGemstone && (activeTab === "all" || (selectedQuality && qualityTabSource))) {
      // Pass the quality tab source information along with the selections
      onSelect(selectedGemstone, selectedQuality || undefined, qualityTabSource || undefined)
      handleCancel() // Reset and close
    }
  }

  // Handle cancel
  const handleCancel = () => {
    setSelectedGemstone(null)
    setSelectedQuality(null)
    setQualityTabSource(null)
    setActiveTab("all")
    onClose()
  }

  // Check if selection is valid
  const isSelectionValid = () => {
    if (activeTab === "all") {
      return selectedGemstone !== null
    }
    return selectedGemstone !== null && selectedQuality !== null && qualityTabSource !== null
  }

  // Get available count
  const getAvailableCount = () => {
    const gemstoneCount = sortedGemstones.length
    const qualityCount = sortedQuality.length
    const total = gemstoneCount + qualityCount
    return total > 0 ? `${total} option${total !== 1 ? "s" : ""} available` : ""
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
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Filters and Sort */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant={activeTab === "all" ? "default" : "outline"}
                  className="rounded-none"
                  size="sm"
                  onClick={() => setActiveTab("all")}
                >
                  All Gemstones
                </Button>
                <Button
                  variant={activeTab === "natural" ? "default" : "outline"}
                  size="sm"
                  className="rounded-none"
                  onClick={() => setActiveTab("natural")}
                >
                  Natural
                </Button>
                <Button
                  className="rounded-none"
                  variant={activeTab === "lab-grown" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("lab-grown")}
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
                  onChange={(e) => setSortBy(e.target.value as "price" | "name")}
                  className="border px-3 py-1 text-sm"
                >
                  <option value="price">Price</option>
                  <option value="name">A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="p-6 overflow-y-auto max-h-[52vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Render Gemstones (All tab) */}
              {sortedGemstones.map((gemstone) => (
                <Card
                  key={`gemstone-${gemstone.id}`}
                  className={`cursor-pointer rounded-none transition-all hover:shadow-lg ${
                    selectedGemstone?.id === gemstone.id ? "ring ring-black bg-gray-50" : ""
                  }`}
                  onClick={() => handleGemstoneSelect(gemstone)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Image
                        src={gemstone.url || "/placeholder.svg?height=60&width=60"}
                        alt={formatGemstoneTitle(gemstone)}
                        width={60}
                        height={60}
                        className="rounded-full border-gray-200"
                      />
                      <Checkbox
                        className="size-6 rounded-none"
                        checked={selectedGemstone?.id === gemstone.id}
                        aria-readonly
                      />
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
                                  <strong>Origin:</strong> {gemstone.type === "lab-grown" ? "Laboratory" : "Natural"}
                                </p>
                                <p>
                                  <strong>Price:</strong> ${gemstone.price.toLocaleString()}
                                </p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <div>
                          {gemstone.tags?.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="mr-1 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {selectedGemstone?.id === gemstone.id && (
                      <div className="mt-4 p-2 bg-black text-center">
                        <span className="text-sm font-medium text-white">Selected</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* Render Quality Options (Natural/Lab Grown tabs) */}
              {sortedQuality.map((quality) => (
                <Card
                  key={`quality-${quality.id}`}
                  className={`cursor-pointer rounded-none transition-all hover:shadow-lg ${
                    selectedQuality?.id === quality.id && qualityTabSource === activeTab
                      ? "ring ring-black bg-gray-50"
                      : ""
                  }`}
                  onClick={() => handleQualitySelect(quality)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Image
                          src={quality.url || "/placeholder.svg?height=60&width=60"}
                          width={60}
                          height={60}
                          className="rounded-full border-gray-200"
                          alt="diamond"
                        />
                      </div>
                      <Checkbox
                        className="size-6 rounded-none"
                        checked={selectedQuality?.id === quality.id && qualityTabSource === activeTab}
                        aria-readonly
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-gray-900">{formatGemstoneTitle(quality)}</h3>
                        <span className="text-lg font-bold text-green-600">+${quality.price.toLocaleString()}</span>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">{quality.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Quality grade</span>
                        </div>

                        <div>
                          {quality.tags?.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="mr-1 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {selectedQuality?.id === quality.id && qualityTabSource === activeTab && (
                      <div className="mt-4 p-2 bg-black text-center">
                        <span className="text-sm font-medium text-white">Selected</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedGemstones.length === 0 && sortedQuality.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No options available for this tab.</p>
              </div>
            )}
          </div>

          {/* Selection Summary */}
          {(selectedGemstone || selectedQuality) && (
            <div className="border-t"> 
              <div className="px-6 py-3 bg-gray-50 ">
                <div className="flex justify-between  items-center">
                  <div className="text-sm md:text-base">{getSelectionSummary()}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-700 font-semibold"> ${getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">{getAvailableCount()}</p>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-none" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmSelection} className="rounded-none" disabled={!isSelectionValid()}>
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
