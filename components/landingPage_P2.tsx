"use client"

import type React from "react"
import { useState } from "react"
import BottomDrawer from "./subCompo/BottomDrawer"
import { Cormorant_Garamond } from "next/font/google"
import { Plus, Minus } from "lucide-react"

interface Selections {
  "jewelry-type": string[]
  recipient: string
  trait: string
}

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

type PanelId = keyof Selections

const JewelryCustomizer: React.FC = () => {
  const [activePanel, setActivePanel] = useState<PanelId | null>(null)
  const [showMessageBox, setShowMessageBox] = useState(false)
  const [showLeoDrawer, setShowLeoDrawer] = useState(false)
  const [selections, setSelections] = useState<Selections>({
    "jewelry-type": ["Ring"],
    recipient: "Myself",
    trait: "Leo",
  })
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([])

  const config = {
    "jewelry-type": {
      options: ["Ring", "Earring", "Necklace", "Bracelet", "Charm", "Pendant"],
      type: "checkbox" as const,
    },
    recipient: {
      options: ["Myself", "My Partner", "My Mother", "My Father", "My Best Friend", "A Couple"],
      type: "radio" as const,
    },
    trait: {
      options: [],
      type: "radio" as const,
    },
  }

  const togglePanel = (panelId: PanelId) => {
    setActivePanel((prev) => (prev === panelId ? null : panelId))
  }

  const handleSelection = (key: PanelId, value: string, checked?: boolean) => {
    setSelections((prev) => {
      if (key === "jewelry-type" && checked !== undefined) {
        return {
          ...prev,
          [key]: checked ? [...prev[key], value] : prev[key].filter((item) => item !== value),
        }
      }
      return {
        ...prev,
        [key]: key === "jewelry-type" ? [value] : value,
      }
    })

    // Open drawer when Leo is selected
    if (key === "trait" && value === "Leo") {
      setTimeout(() => {
        setShowLeoDrawer(true)
      }, 100)
    }
  }

  const getDisplayText = (key: PanelId): string => {
    return key === "jewelry-type" ? selections[key].join(", ") : (selections[key] as string)
  }

  const isSelected = (key: PanelId, value: string): boolean => {
    return key === "jewelry-type" ? selections[key].includes(value) : selections[key] === value
  }

  const [activeTab, setActiveTab] = useState<"ring" | "myself" | "lio">("ring")
  const [expandedSections, setExpandedSections] = useState({
    brand: true,
    productType: false,
  })
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const brands = [
    { name: "Wes Casuals", count: 340 },
    { name: "Nuon", count: 251 },
    { name: "Eta", count: 248 },
    { name: "Wes Formals", count: 191 },
    { name: "Ascot", count: 150 },
    { name: "Studiofit", count: 127 },
    { name: "Wes Lounge", count: 63 },
    { name: "Kala by eta", count: 23 },
  ];

  const productTypes = ["Shirts", "T-Shirts", "Trousers", "Jeans", "Jackets", "Blazers"]

  const toggleSection = (section: "brand" | "productType") => {
    setExpandedSections((prev) => {
      if (prev[section]) {
        return {
          ...prev,
          [section]: false,
        }
      }
      return {
        brand: section === "brand",
        productType: section === "productType",
      }
    })
  }

  const toggleBrand = (brandName: string) => {
    setSelectedBrands((prev) => (prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]))
  }

  const toggleProductType = (type: string) => {
    setSelectedProductTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleDoneAll = () => {
    // Commit all changes and close the drawer
    setShowLeoDrawer(false)
    setActivePanel(null)
    
    // Update the trait selection with all Leo properties
    if (activeTab === "lio" && (selectedBrands.length > 0 || selectedProductTypes.length > 0)) {
      const leoDetails: string[] = []
      if (selectedBrands.length > 0) {
        leoDetails.push(selectedBrands.join(", "))
      }
      if (selectedProductTypes.length > 0) {
        leoDetails.push(selectedProductTypes.join(", "))
      }
      setSelections((prev) => ({
        ...prev,
        trait: leoDetails.join(" | "),
      }))
    }
  }

  const handleDoneInline = () => {
    // Only close inline panels, don't affect drawer
    setActivePanel(null)
  }

  function DrawerContent() {
    return (
      <>
        <div
          className={`w-full h-full bg-transparent p-0 sm:p-2 lg:p-4 animate-slideDown ${cormorantGaramond.className}`}
        >
          {/* Header */}
          <div className="mb-6 sticky top-0 bg-gradient-to-b z-10 pb-2">
            <div className="mb-4">
              <h2 className="text-xl w-screen flex sm:text-2xl lg:text-3xl font-bold text-gray-800 flex-wrap gap-1">
                Help me pick
                {activeTab === "lio" && selectedBrands.length > 0 && (
                  <>
                    {selectedBrands.map((items) => (
                      <div key={items} className="pl-2 lowercase text-gray-400">{`${items}, `}</div>
                    ))}
                  </>
                )}
              </h2>
            </div>
            <div className="flex gap-4 sm:gap-6 lg:text-lg justify-around">
              <button
                onClick={() => setActiveTab("ring")}
                className={`pb-2 font-medium transition-colors ${
                  activeTab === "ring"
                    ? "text-gray-900 border-b-2 border-amber-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Ring
              </button>
              <button
                onClick={() => setActiveTab("myself")}
                className={`pb-2 font-medium transition-colors ${
                  activeTab === "myself"
                    ? "text-gray-900 border-b-2 border-amber-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Myself
              </button>
              <button
                onClick={() => setActiveTab("lio")}
                className={`pb-2 font-medium transition-colors ${
                  activeTab === "lio"
                    ? "text-gray-900 border-b-2 border-amber-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Lio
              </button>
            </div>
            <div className="border-gray-200 border-b -translate-x-10 w-[54.5vh] xs:w-0 sm:w-[137vh] md:w-[96vh] lg:w-[126.5vh] xl:w-[176vh] 2xl:w-[221vh]"></div>
          </div>

          {/* Tab Content */}
          <div className="mb-6">
            {activeTab === "ring" && (
              <>
                {/* Jewelry Type Section */}
                <div className="mb-6 transition-all duration-500 ease-in-out">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">Jewelry Type</h3>
                  </div>
                  <div className="pt-2 space-y-0 mx-2">
                    {config["jewelry-type"].options.map((option, i) => (
                      <label
                        key={option}
                        className="flex text-xl md:text-2xl items-center cursor-pointer py-1.5 md:p-2.5 rounded-lg transition-all hover:bg-amber-100/50 "
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        <div className="flex items-center gap-3 sm:gap-3">
                          <input
                            type="checkbox"
                            value={option}
                            checked={selections["jewelry-type"].includes(option)}
                            onChange={(e) => handleSelection("jewelry-type", option, e.target.checked)}
                            className="w-3 h-3 sm:w-4 sm:h-4 border-gray-300 accent-amber-300 text-amber-500 focus:ring-amber-500 bg-amber-500 focus:bg-amber-500"
                          />
                          <span className="text-gray-700 font-medium text-sm sm:text-md lg:text-sm">{option}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "myself" && (
              <>
                {/* Recipient Section */}
                <div className="">
                  <div className="mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">Who is it for?</h3>
                  </div>
                  <div className="flex flex-col w-full px-1 md:px-2 py-1 text-left space-y-0 max-h-80 overflow-y-auto">
                    {config.recipient.options.map((option, i) => (
                      <label
                        key={option}
                        className="flex text-xl md:text-2xl items-center cursor-pointer py-1.5 md:p-2.5 rounded-lg transition-all hover:bg-amber-100/50 "
                        style={{
                          transitionDelay: `${i * 50}ms`,
                          transform: "translateX(0)",
                        }}
                      >
                        <div className="flex items-center gap-3 sm:gap-3">
                          <input
                            type="radio"
                            name="recipient-drawer"
                            value={option}
                            checked={selections.recipient === option}
                            onChange={() => handleSelection("recipient", option)}
                            className="w-3 h-3 sm:w-4 sm:h-4 border-0 focus:border-0 accent-amber-300 text-amber-500 focus:ring-amber-500"
                          />
                          <span className="text-gray-700 font-medium text-sm sm:text-sm lg:text-sm flex">{option}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "lio" && (
              <>
                {/* Brand Section */}
                <div className="mb-6 transition-all duration-500 ease-in-out">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">Brand</h3>
                    <button
                      onClick={() => toggleSection("brand")}
                      className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-black focus:outline-none transition-all duration-300 ease-in-out"
                      aria-label={expandedSections.brand ? "Collapse" : "Expand"}
                    >
                      <span
                        className={`absolute transition-transform duration-300 ${
                          expandedSections.brand ? "rotate-0" : "rotate-90"
                        }`}
                      >
                        <Minus size={16} className={expandedSections.brand ? "opacity-100" : "opacity-0"} />
                      </span>
                      <span
                        className={`absolute transition-transform duration-300 ${
                          expandedSections.brand ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                        }`}
                      >
                        <Plus size={16} />
                      </span>
                    </button>
                  </div>

                  <div
                    className="grid transition-all duration-500 ease-in-out"
                    style={{
                      gridTemplateRows: expandedSections.brand ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`pt-2 space-y-0 transition-opacity duration-300 ${
                          expandedSections.brand ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {brands.map((brand, index) => (
                          <label
                            key={brand.name}
                            className={`flex items-center justify-between cursor-pointer hover:bg-amber-100/50 p-2 wrap-break-word transition-all duration-300 ${
                              expandedSections.brand ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                            style={{
                              transitionDelay: expandedSections.brand ? `${index * 50}ms` : "0ms",
                            }}
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand.name)}
                                onChange={() => toggleBrand(brand.name)}
                                className="w-3 h-3 sm:w-4 sm:h-4 accent-amber-300 border-gray-300 text-amber-500 focus:ring-amber-500"
                              />
                              <span className="text-gray-700 font-medium text-xs sm:text-sm lg:text-xs uppercase">
                                {brand ? brand.name : "Leo"}
                              </span>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-500 flex"></span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Type Section */}
                <div className="mb-6 transition-all duration-500 ease-in-out">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">Product Type</h3>
                    <button
                      onClick={() => toggleSection("productType")}
                      className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-black focus:outline-none transition-all duration-300 ease-in-out"
                      aria-label={expandedSections.productType ? "Collapse" : "Expand"}
                    >
                      <span
                        className={`absolute transition-transform duration-300 ${
                          expandedSections.productType ? "rotate-0" : "rotate-90"
                        }`}
                      >
                        <Minus size={16} className={expandedSections.productType ? "opacity-100" : "opacity-0"} />
                      </span>
                      <span
                        className={`absolute transition-transform duration-300 ${
                          expandedSections.productType ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                        }`}
                      >
                        <Plus size={16} />
                      </span>
                    </button>
                  </div>

                  <div
                    className="grid transition-all duration-500 ease-in-out"
                    style={{
                      gridTemplateRows: expandedSections.productType ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`pt-2 space-y-0 transition-opacity duration-300 ${
                          expandedSections.productType ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {productTypes.map((type, index) => (
                          <label
                            key={type}
                            className="flex text-xl md:text-2xl items-center cursor-pointer py-1.5 md:p-2.5 rounded-lg transition-all hover:bg-amber-100/50 "
                            style={{
                              transitionDelay: expandedSections.productType ? `${index * 50}ms` : "0ms",
                            }}
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <input
                                type="checkbox"
                                checked={selectedProductTypes.includes(type)}
                                onChange={() => toggleProductType(type)}
                                className="w-3 h-3 sm:w-4 sm:h-4 border-gray-300 accent-amber-300 text-amber-500 focus:ring-amber-500"
                              />
                              <span className="text-gray-700 font-medium text-xs sm:text-xs lg:text-xs uppercase">{type}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-gray-200">
            <button onClick={handleDoneAll} className="w-full bg-black p-2 sm:p-3 mb-5 lg:py-2 text-center hover:bg-gray-800 transition-colors cursor-pointer">
              <p className="text-white font-bold tracking-wide text-sm sm:text-md lg:text-lg">Done</p>
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen py-20 bg-[#eaebe5] flex justify-center items-center font-sans text-gray-800">
      {/* Message Box Modal */}
      {showMessageBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowMessageBox(false)} />
          <div className="relative bg-[#eaebe5] p-8 shadow-2xl text-center max-w-xl mx-4 rounded-xl border-2 border-amber-800/20 animate-in fade-in zoom-in duration-300">
            <h3 className="font-serif text-amber-800 text-2xl mb-4 font-bold">Finding Inspiration...</h3>
            <p className="leading-relaxed mb-6 text-gray-700">
              Finding inspiration for a <strong className="text-amber-900">{getDisplayText("jewelry-type")}</strong> for{" "}
              <strong className="text-amber-900">{selections.recipient}</strong> who is a proud{" "}
              <strong className="text-amber-900">{selections.trait}</strong>!
            </p>
            <button
              onClick={() => setShowMessageBox(false)}
              className="bg-amber-800 text-white px-6 py-3 rounded transition-all hover:bg-amber-900 hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Leo Bottom Drawer */}
      <BottomDrawer isOpen={showLeoDrawer} onClose={() => setShowLeoDrawer(false)} title="" height="70vh" className="">
        {DrawerContent()}
      </BottomDrawer>

      {/* Main Container */}
      <div
        className={`bg-[#eaebe5] p-4 md:p-12 text-center max-w-2xl w-full rounded-xl transition-all ${activePanel ? "pt-24" : ""}`}
      >
        <h2 className="font-serif text-2xl md:text-4xl leading-relaxed font-normal text-gray-800 w-full">
          <div className="flex flex-wrap items-baseline max-w-full text-3xl">
            <span className="mr-2">Help me pick a</span>

            {/* Jewelry Type Trigger */}
            <span
              className={`italic font-bold cursor-pointer pb-0.5 transition-all mr-2 break-words ${
                activePanel === "jewelry-type"
                  ? "text-[#eaebe5] bg-[#925c40] px-2.5 rounded scale-105"
                  : "text-[#925c40] hover:text-amber-900 hover:scale-105 relative"
              }`}
              onClick={() => {
                setActiveTab("ring")
                setShowLeoDrawer(true)
              }}
            >
              {getDisplayText("jewelry-type") ? getDisplayText("jewelry-type") : "Jewelry"}
            </span>

            {/* Jewelry Type Panel */}
            <div
              className={`w-full md:w-[100vh] transition-all duration-500 bg-[#eaebe5] rounded-xl mt-4 shadow-lg origin-top ${
                activePanel === "jewelry-type"
                  ? "opacity-100 scale-y-100"
                  : "max-h-0 opacity-0 scale-y-90 -translate-y-4 overflow-hidden"
              }`}
            >
              <div
                className={`flex flex-col w-full px-3 md:px-5 py-4 text-left space-y-2 max-h-80 overflow-y-auto ${
                  activePanel === "jewelry-type" ? "opacity-100 delay-150" : "opacity-0"
                }`}
                onWheel={(e) => e.stopPropagation()}
              >
                {config["jewelry-type"].options.map((option, i) => (
                  <label
                    key={option}
                    className="flex text-xl md:text-2xl items-center cursor-pointer py-1.5 md:p-2.5 rounded-lg transition-all hover:bg-amber-100/50 hover:translate-x-2"
                    style={{
                      transitionDelay: activePanel === "jewelry-type" ? `${i * 50}ms` : "0ms",
                      transform: activePanel === "jewelry-type" ? "translateX(0)" : "translateX(-20px)",
                    }}
                  >
                    <input
                      type="checkbox"
                      value={option}
                      checked={selections["jewelry-type"].includes(option)}
                      onChange={(e) => handleSelection("jewelry-type", option, e.target.checked)}
                      className="hidden"
                    />
                    <span
                      className={`w-5 h-5 border-2 border-amber-800 mr-3 rounded transition-all ${
                        isSelected("jewelry-type", option)
                          ? "bg-[#925c40] scale-110"
                          : "bg-white hover:border-amber-900"
                      }`}
                    >
                      {isSelected("jewelry-type", option) && (
                        <span className="flex items-center justify-center text-white text-xs h-full">✓</span>
                      )}
                    </span>
                    <span>{option}</span>
                  </label>
                ))}
                <button
                  onClick={handleDoneInline}
                  className="mt-4 border-2 bg-[#925c40] text-white px-4 py-2 text-sm rounded transition-all hover:bg-amber-800 hover:scale-105 self-start"
                >
                  Done
                </button>
              </div>
            </div>

            <span className="mr-2">for</span>

            {/* Recipient Trigger */}
            <span
              className={`italic font-bold cursor-pointer pb-0.5 transition-all whitespace-nowrap mr-2 ${
                activePanel === "recipient"
                  ? "text-[#eaebe5] bg-[#925c40] px-2.5 rounded scale-105"
                  : "text-[#925c40] hover:text-amber-900 hover:scale-105 relative"
              }`}
              onClick={() => {
                setActiveTab("myself")
                setShowLeoDrawer(true)
              }}
            >
              {selections.recipient}
            </span>

            {/* Recipient Panel */}
            <div
              className={`w-full md:w-[100vh] transition-all duration-500 bg-[#eaebe5] rounded-xl mt-4 shadow-lg origin-top ${
                activePanel === "recipient"
                  ? "opacity-100 scale-y-100"
                  : "max-h-0 opacity-0 scale-y-90 -translate-y-4 overflow-hidden"
              }`}
            >
              <div
                className={`flex flex-col w-full px-3 md:px-5 py-4 text-left space-y-1 max-h-80 overflow-y-auto ${
                  activePanel === "recipient" ? "opacity-100 delay-150" : "opacity-0"
                }`}
                onWheel={(e) => e.stopPropagation()}
              >
                {config.recipient.options.map((option, i) => (
                  <label
                    key={option}
                    className="flex text-xl md:text-2xl items-center cursor-pointer py-1.5 md:p-2.5 rounded-lg transition-all hover:bg-amber-100/50 hover:translate-x-2"
                    style={{
                      transitionDelay: activePanel === "recipient" ? `${i * 50}ms` : "0ms",
                      transform: activePanel === "recipient" ? "translateX(0)" : "translateX(-20px)",
                    }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <input
                        type="radio"
                        name="recipient"
                        value={option}
                        checked={selections.recipient === option}
                        onChange={() => handleSelection("recipient", option)}
                        className="w-3 h-3 sm:w-4 sm:h-4 border-gray-300 accent-amber-300 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-gray-700 font-medium text-xs sm:text-sm lg:text-xs">{option}</span>
                    </div>
                  </label>
                ))}
                <button
                  onClick={handleDoneInline}
                  className="mt-4 border-2 bg-[#925c40] text-white px-4 py-2 text-sm rounded transition-all hover:bg-amber-800 hover:scale-105 self-start"
                >
                  Done
                </button>
              </div>
            </div>

            <span className="mr-2">inspired by</span>

            {/* Trait Trigger */}
            <span
              className={`italic font-bold cursor-pointer pb-0.5 transition-all break-words mr-2 ${
                activePanel === "trait"
                  ? "text-[#eaebe5] bg-[#925c40] px-2.5 rounded scale-105"
                  : "text-[#925c40] hover:text-amber-900 hover:scale-105 relative"
              }`}
              onClick={() => {
                setActiveTab("lio")
                setShowLeoDrawer(true)
              }}
            >
              {selections.trait}
            </span>
          </div>

          <button
            onClick={() => setShowMessageBox(true)}
            className="block mt-8 mx-auto font-medium text-lg px-8 md:px-8 py-2 bg-[#925c40] text-white rounded shadow-lg transition-all hover:bg-[#b0947f] hover:-translate-y-1 hover:shadow-2xl hover:scale-105 uppercase tracking-wider"
          >
            Show Me My Inspiration
          </button>
        </h2>

        <p className="mt-8 text-sm text-gray-600">
          ...or,{" "}
          <a href="#" className="text-amber-800 font-semibold transition-all hover:underline hover:text-amber-900">
            speak to us
          </a>{" "}
          and share your inspiration so our team can get back to you with a mood board.
        </p>
      </div>
    </div>
  )
}

export default JewelryCustomizer