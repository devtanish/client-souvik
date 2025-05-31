"use client"

import * as React from "react"
import { useState } from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RingSizeGuideSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const sizeData = [
  { diameter: "14.1 mm", usCan: "3", ukAus: "F", german: "14" },
  { diameter: "14.5 mm", usCan: "3.5", ukAus: "G", german: "14.5" },
  { diameter: "14.9 mm", usCan: "4", ukAus: "H 1/2", german: "15" },
  { diameter: "15.3 mm", usCan: "4.5", ukAus: "I 1/2", german: "15.25" },
  { diameter: "15.7 mm", usCan: "5", ukAus: "J 1/2", german: "15.5" },
  { diameter: "16.1 mm", usCan: "5.5", ukAus: "K 1/2", german: "16" },
  { diameter: "16.5 mm", usCan: "6", ukAus: "L 1/2", german: "16.5" },
  { diameter: "16.9 mm", usCan: "6.5", ukAus: "M 1/2", german: "17" },
  { diameter: "17.3 mm", usCan: "7", ukAus: "N 1/2", german: "17.25" },
  { diameter: "17.7 mm", usCan: "7.5", ukAus: "O 1/2", german: "17.5" },
  { diameter: "18.1 mm", usCan: "8", ukAus: "P 1/2", german: "18" },
  { diameter: "18.5 mm", usCan: "8.5", ukAus: "Q 1/2", german: "18.5" },
  { diameter: "18.9 mm", usCan: "9", ukAus: "R 1/2", german: "19" },
  { diameter: "19.3 mm", usCan: "9.5", ukAus: "S 1/2", german: "19.25" },
  { diameter: "19.7 mm", usCan: "10", ukAus: "T 1/2", german: "19.5" },
]

export function RingSizeGuideSidebar({ isOpen, onClose }: RingSizeGuideSidebarProps) {
  const [activeTab, setActiveTab] = useState<"own-ring" | "finger">("own-ring")

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-1/1 md:w-1/3 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">RING SIZE GUIDE</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors",
                activeTab === "own-ring" 
                  ? "border-black text-black" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
              onClick={() => setActiveTab("own-ring")}
            >
              MEASURE MY OWN RING
            </button>
            <button
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors",
                activeTab === "finger" 
                  ? "border-black text-black" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
              onClick={() => setActiveTab("finger")}
            >
              MEASURE MY FINGER
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "own-ring" ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Instructions</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><span className="font-medium">1.</span> Use a ring that fits the desired finger.</p>
                    <p><span className="font-medium">2.</span> Measure the internal diameter of the ring (in mm). Ensure your ruler starts at the 0mm mark.</p>
                  </div>
                </div>

                {/* Ring Diagram */}
                <div className="flex justify-center py-8">
                  <div className="relative">
                    <svg width="200" height="200" viewBox="0 0 200 200" className="transform">
                      {/* Outer ring */}
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#333"
                        strokeWidth="3"
                      />
                      {/* Inner ring */}
                      <circle
                        cx="100"
                        cy="100"
                        r="60"
                        fill="none"
                        stroke="#333"
                        strokeWidth="2"
                      />
                      {/* Diamond on top */}
                      <polygon
                        points="100,20 110,35 100,50 90,35"
                        fill="none"
                        stroke="#333"
                        strokeWidth="2"
                      />
                      {/* Measurement line */}
                      <line
                        x1="40"
                        y1="100"
                        x2="160"
                        y2="100"
                        stroke="#ff0000"
                        strokeWidth="2"
                      />
                      {/* Measurement arrows */}
                      <polygon points="40,100 45,95 45,105" fill="#ff0000" />
                      <polygon points="160,100 155,95 155,105" fill="#ff0000" />
                    </svg>
                  </div>
                </div>

                <div className="text-center text-sm font-medium">
                  Use the size chart to determine your ring size.
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Instructions</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><span className="font-medium">1.</span> Wrap a piece of string or paper around your finger.</p>
                    <p><span className="font-medium">2.</span> Mark where the string or paper overlaps.</p>
                    <p><span className="font-medium">3.</span> Measure the length in millimeters.</p>
                    <p><span className="font-medium">4.</span> Use the circumference measurement to find your size in the chart below.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Size Chart */}
            <div className="mt-8">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 grid grid-cols-4 gap-px">
                  <div className="p-3 text-xs font-medium text-center">Internal Diameter (mm)</div>
                  <div className="p-3 text-xs font-medium text-center">US/CAN</div>
                  <div className="p-3 text-xs font-medium text-center">UK/AUS</div>
                  <div className="p-3 text-xs font-medium text-center">German</div>
                </div>
                <div className="bg-white">
                  {sizeData.map((size, index) => (
                    <div key={index} className="grid grid-cols-4 gap-px border-t border-gray-100">
                      <div className="p-3 text-xs text-center">{size.diameter}</div>
                      <div className="p-3 text-xs text-center">{size.usCan}</div>
                      <div className="p-3 text-xs text-center">{size.ukAus}</div>
                      <div className="p-3 text-xs text-center">{size.german}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
