"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface GemStone {
  id: string | number
  grade: string
  price: number
  url: string
  description?: string
  color?: string
  clarity?: string
  cut?: string
}

interface GemstoneComparisonModalProps {
  isOpen: boolean
  onClose: () => void
  gemstones: GemStone[]
  selectedGemstone: GemStone | null
  onSelectGemstone: (gemstone: GemStone) => void
  gemstoneType: "LAB GROWN" | "NATURAL"
  onGemstoneTypeChange: (type: "LAB GROWN" | "NATURAL") => void
}

export function ImprovedGemstoneModal({
  isOpen,
  onClose,
  gemstones,
  selectedGemstone,
  onSelectGemstone,
  gemstoneType,
  onGemstoneTypeChange,
}: GemstoneComparisonModalProps) {
  const [activeFilter, setActiveFilter] = useState<"quality" | "carat" | "metal">("quality")

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
      }
    }

    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  const getGemstonePrice = (gemstone: GemStone) => {
    return Math.round(gemstone.price * (gemstoneType === "NATURAL" ? 1.5 : 1))
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto" onClick={handleBackdropClick}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-lg sticky top-0 z-20">
            <h2 className="text-xl font-semibold">Compare</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sustainability Badge */}
          <div className="px-4 py-3 bg-gray-50 flex items-center gap-2 border-b">
            <Leaf className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-700">All gemstones are sustainably sourced</span>
          </div>

          {/* Filter Tabs */}
          <div className="px-4 py-3 flex gap-2 border-b bg-white sticky top-[73px] z-10">
            <Button
              variant={activeFilter === "quality" ? "default" : "outline"}
              size="sm"
              className="rounded-none"
              onClick={() => setActiveFilter("quality")}
            >
              Gemstone Quality
            </Button>
            <Button
              variant={activeFilter === "carat" ? "default" : "outline"}
              size="sm"
              className="rounded-none"
              onClick={() => setActiveFilter("carat")}
            >
              Total Carat Weight
            </Button>
            <Button
              variant={activeFilter === "metal" ? "default" : "outline"}
              size="sm"
              className="rounded-none"
              onClick={() => setActiveFilter("metal")}
            >
              Metal Type
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {activeFilter === "quality" && (
              <div className="p-4 space-y-6">
                {/* Gemstone Type Toggle */}
                <div className="flex gap-2">
                  <Button
                    variant={gemstoneType === "LAB GROWN" ? "default" : "outline"}
                    size="sm"
                    onClick={() => onGemstoneTypeChange("LAB GROWN")}
                    className="rounded-none"
                  >
                    LAB GROWN
                    <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                      -33%
                    </Badge>
                  </Button>
                  <Button
                    variant={gemstoneType === "NATURAL" ? "default" : "outline"}
                    size="sm"
                    onClick={() => onGemstoneTypeChange("NATURAL")}
                    className="rounded-none"
                  >
                    NATURAL
                  </Button>
                </div>

                {/* Comparison Table */}
                <div className="border overflow-hidden">
                  {/* Table Header */}
                  <div className="bg-gray-900 text-white grid grid-cols-4 text-sm font-medium">
                    <div className="p-3">Visual</div>
                    <div className="p-3">Quality</div>
                    <div className="p-3">Grade</div>
                    <div className="p-3">Color</div>
                  </div>

                  {/* Table Rows */}
                  <div className="divide-y">
                    {gemstones.map((gemstone) => (
                      <div
                        key={gemstone.id}
                        className={cn(
                          "grid grid-cols-4 cursor-pointer hover:bg-gray-50 transition-colors",
                          selectedGemstone?.id === gemstone.id && "bg-blue-50",
                        )}
                        onClick={() => onSelectGemstone(gemstone)}
                      >
                        <div className="p-3 flex items-center justify-center">
                          <Image src={gemstone.url || "/placeholder.svg"} width={40} height={40} alt={gemstone.grade} />
                        </div>
                        <div className="p-3 flex items-center">
                          <span className="text-sm">{gemstone.grade}</span>
                        </div>
                        <div className="p-3 flex items-center">
                          <span className="text-sm">{gemstone.color || "Deep Rich Blue"}</span>
                        </div>
                        <div className="p-3 flex items-center">
                          <span className="text-sm">
                            {gemstone.clarity ||
                              (gemstone.grade === "Heirloom"
                                ? "Very Slightly Included"
                                : gemstone.grade === "Best"
                                  ? "Slightly Included"
                                  : gemstone.grade === "Better"
                                    ? "Moderately Included"
                                    : "Opaque")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Information */}
                {selectedGemstone && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{selectedGemstone.grade} Quality</h4>
                        <p className="text-sm text-gray-600">{gemstoneType} gemstone</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          ${getGemstonePrice(selectedGemstone).toLocaleString()}
                        </div>
                        {gemstoneType === "LAB GROWN" && (
                          <div className="text-sm text-green-600">33% savings vs natural</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeFilter === "carat" && (
              <div className="p-4">
                <div className="text-center py-8 text-gray-500">
                  <p>Carat weight comparison coming soon...</p>
                </div>
              </div>
            )}

            {activeFilter === "metal" && (
              <div className="p-4">
                <div className="text-center py-8 text-gray-500">
                  <p>Metal type comparison coming soon...</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50 rounded-b-lg">
            <div className="flex gap-3">
              <Button onClick={onClose} className="flex-1">
                Apply Selection
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
