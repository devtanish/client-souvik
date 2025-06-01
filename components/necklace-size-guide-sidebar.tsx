"use client"

import * as React from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface NecklaceSizeGuideSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function NecklaceSizeGuideSidebar({ isOpen, onClose }: NecklaceSizeGuideSidebarProps) {
  const [activeTab, setActiveTab] = React.useState<"SIZE_CHART" | "HOW_TO_STYLE">("SIZE_CHART")

  // Prevent body scroll when sidebar is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const sizeData = [
    { inches: '14"', cm: "35.50 cm" },
    { inches: '16"', cm: "40.50 cm" },
    { inches: '18"', cm: "45.75 cm" },
    { inches: '20"', cm: "50.75 cm" },
    { inches: '22"', cm: "56 cm" },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-1/1 md:max-w-1/3 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">NECKLACE SIZE GUIDE</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={cn(
              "flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors",
              activeTab === "SIZE_CHART"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
            onClick={() => setActiveTab("SIZE_CHART")}
          >
            SIZE CHART
          </button>
          <button
            className={cn(
              "flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors",
              activeTab === "HOW_TO_STYLE"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
            onClick={() => setActiveTab("HOW_TO_STYLE")}
          >
            HOW TO STYLE
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "SIZE_CHART" && (
            <div className="space-y-6">
              {/* Size Chart Table */}
              <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-sm font-medium text-gray-600">Inches (in)</div>
                  <div className="text-sm font-medium text-gray-600">Centimeters (cm)</div>
                </div>
                
                <div className="space-y-3">
                  {sizeData.map((size, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100">
                      <div className="text-sm">{size.inches}</div>
                      <div className="text-sm">{size.cm}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Help Text */}
              <div className="mt-8 p-4 bg-gray-50 rounded-none">
                <p className="text-sm text-gray-600">
                  Need help finding your size? Let us help.
                </p>
              </div>
            </div>
          )}

          {activeTab === "HOW_TO_STYLE" && (
            <div className="space-y-6">
              {/* Styling Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="aspect-square bg-gray-100 rounded-none overflow-hidden">
                    <Image
                      src="/man/1.avif"
                      alt="Necklace styling example 1"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover "
                    />
                  </div>
                  <p className="text-xs text-gray-600 text-center">Layered Look</p>
                </div>
                <div className="space-y-2">
                  <div className="aspect-square bg-gray-100 rounded-none overflow-hidden">
                    <Image
                      src="/man/2.avif"
                      alt="Necklace styling example 2"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-gray-600 text-center">Single Statement</p>
                </div>
              </div>

              {/* Styling Tips */}
              <div className="space-y-4">
                <h3 className="font-medium">Styling Tips:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 16&quot; sits at the base of the neck</li>
                  <li>• 18&quot; falls just below the collarbone</li>
                  <li>• 20&quot; creates a classic look</li>
                  <li>• Layer different lengths for a modern style</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
