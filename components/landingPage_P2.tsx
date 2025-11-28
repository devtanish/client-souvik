"use client"

import type React from "react"
import { useState, useCallback, useMemo } from "react"
import BottomDrawer from "./subCompo/BottomDrawer"
import { Cormorant_Garamond } from "next/font/google"

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
type TabType = "ring" | "myself" | "lio"
type SectionType = "brand" | "productType"

const PANEL_CONFIG = {
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

const BRANDS = [
  { name: "Wes Casuals", count: 340 },
  { name: "Nuon", count: 251 },
  { name: "Eta", count: 248 },
  { name: "Wes Formals", count: 191 },
  { name: "Ascot", count: 150 },
  { name: "Studiofit", count: 127 },
  { name: "Wes Lounge", count: 63 },
  { name: "Kala by eta", count: 23 },
]

const PRODUCT_TYPES = ["Shirts", "T-Shirts", "Trousers", "Jeans", "Jackets", "Blazers"]

const ExpandIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    {isExpanded ? (
      <line x1="2" y1="8" x2="14" y2="8" />
    ) : (
      <>
        <line x1="8" y1="2" x2="8" y2="14" />
        <line x1="2" y1="8" x2="14" y2="8" />
      </>
    )}
  </svg>
)

const CheckIcon = () => <span className="flex items-center justify-center text-white text-xs h-full">✓</span>

interface OptionCheckboxProps {
  option: string
  isSelected: boolean
  onChange: (checked: boolean) => void
  index?: number
  delay?: number
  variant?: "default" | "drawer"
}

const OptionCheckbox: React.FC<OptionCheckboxProps> = ({
  option,
  isSelected,
  onChange,
  index = 0,
  delay = 0,
  variant = "default",
}) => {
  return (
    <label
      className="flex text-xl md:text-2xl items-center cursor-pointer py-1.5 md:p-2.5 rounded-lg transition-all hover:bg-amber-100/50 hover:translate-x-2"
      style={{
        transitionDelay: `${delay}ms`,
        transform: delay > 0 ? "translateX(0)" : "translateX(-20px)",
      }}
    >
      <input type="checkbox" checked={isSelected} onChange={(e) => onChange(e.target.checked)} className="hidden" />
      {variant === "default" ? (
        <>
          <span
            className={`w-5 h-5 border-2 border-amber-800 mr-3 rounded transition-all ${
              isSelected ? "bg-[#925c40] scale-110" : "bg-white hover:border-amber-900"
            }`}
          >
            {isSelected && <CheckIcon />}
          </span>
          <span>{option}</span>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onChange(e.target.checked)}
            className="w-3 h-3 sm:w-4 sm:h-4 border-gray-300 accent-amber-300 text-amber-500 focus:ring-amber-500"
          />
          <span className="text-gray-700 font-medium text-xs sm:text-sm lg:text-xs ml-2">{option}</span>
        </>
      )}
    </label>
  )
}

interface OptionRadioProps {
  option: string
  isSelected: boolean
  onChange: () => void
  index?: number
  delay?: number
}

const OptionRadio: React.FC<OptionRadioProps> = ({ option, isSelected, onChange, index = 0, delay = 0 }) => (
  <label
    className="flex text-xl md:text-2xl items-center cursor-pointer py-1.5 md:p-2.5 rounded-lg transition-all hover:bg-amber-100/50"
    style={{
      transitionDelay: `${delay}ms`,
      transform: delay > 0 ? "translateX(0)" : "translateX(-20px)",
    }}
  >
    <input
      type="radio"
      checked={isSelected}
      onChange={onChange}
      className="w-3 h-3 sm:w-4 sm:h-4 border-gray-300 accent-amber-300 text-amber-500 focus:ring-amber-500"
    />
    <span className="text-gray-700 font-medium text-xs sm:text-sm lg:text-xs ml-2">{option}</span>
  </label>
)

interface ExpandableSectionProps {
  title: string
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ title, isExpanded, onToggle, children }) => (
  <div className="mb-6 transition-all duration-500 ease-in-out">
    <div className="flex items-center justify-between mb-1">
      <h3 className="text-base sm:text-lg font-bold text-gray-800">{title}</h3>
      <button
        onClick={onToggle}
        className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-black focus:outline-none transition-all duration-300 ease-in-out"
        aria-label={isExpanded ? "Collapse" : "Expand"}
      >
        <ExpandIcon isExpanded={isExpanded} />
      </button>
    </div>
    <div
      className="grid transition-all duration-500 ease-in-out"
      style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
    >
      <div className="overflow-hidden">
        <div className={`pt-2 space-y-0 transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
          {children}
        </div>
      </div>
    </div>
  </div>
)

const JewelryCustomizer: React.FC = () => {
  const [activePanel, setActivePanel] = useState<PanelId | null>(null)
  const [showMessageBox, setShowMessageBox] = useState(false)
  const [showLeoDrawer, setShowLeoDrawer] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("ring")
  const [expandedSections, setExpandedSections] = useState({ brand: true, productType: false })
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([])

  const [selections, setSelections] = useState<Selections>({
    "jewelry-type": ["Ring"],
    recipient: "Myself",
    trait: "Leo",
  })

  const displayText = useMemo(
    () => ({
      jewelryType: selections["jewelry-type"].join(", ") || "Jewelry",
      recipient: selections.recipient,
      trait: selections.trait,
    }),
    [selections],
  )

  const isSelected = useCallback(
    (key: PanelId, value: string) => {
      if (key === "jewelry-type") {
        return selections[key].includes(value)
      }
      return selections[key] === value
    },
    [selections],
  )

  const handleSelection = useCallback((key: PanelId, value: string, checked?: boolean) => {
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

    if (key === "trait" && value === "Leo") {
      setTimeout(() => setShowLeoDrawer(true), 100)
    }
  }, [])

  const toggleSection = useCallback((section: SectionType) => {
    setExpandedSections((prev) => ({
      brand: section === "brand",
      productType: section === "productType",
    }))
  }, [])

  const toggleBrand = useCallback((brandName: string) => {
    setSelectedBrands((prev) => (prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]))
  }, [])

  const toggleProductType = useCallback((type: string) => {
    setSelectedProductTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }, [])

  const handleDoneAll = useCallback(() => {
    setShowLeoDrawer(false)
    setActivePanel(null)

    if (activeTab === "lio" && (selectedBrands.length > 0 || selectedProductTypes.length > 0)) {
      const leoDetails: string[] = []
      if (selectedBrands.length > 0) leoDetails.push(selectedBrands.join(", "))
      if (selectedProductTypes.length > 0) leoDetails.push(selectedProductTypes.join(", "))
      setSelections((prev) => ({ ...prev, trait: leoDetails.join(" | ") }))
    }
  }, [activeTab, selectedBrands, selectedProductTypes])

  const handleDoneInline = useCallback(() => setActivePanel(null), [])

  const openPanel = useCallback((tab: TabType, panel: PanelId) => {
    setActiveTab(tab)
    setShowLeoDrawer(true)
  }, [])

  const renderDrawerContent = () => {
    const renderTabContent = () => {
      switch (activeTab) {
        case "ring":
          return (
            <div className="mb-6 transition-all duration-500 ease-in-out">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base sm:text-lg font-bold text-gray-800">Jewelry Type</h3>
              </div>
              <div className="pt-2 space-y-0 mx-2">
                {PANEL_CONFIG["jewelry-type"].options.map((option, i) => (
                  <label
                    key={option}
                    className="flex items-center justify-start cursor-pointer hover:bg-amber-100/50 p-2 transition-all"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <input
                      type="checkbox"
                      checked={selections["jewelry-type"].includes(option)}
                      onChange={(e) => handleSelection("jewelry-type", option, e.target.checked)}
                      className="w-3 h-3 sm:w-4 sm:h-4 border-gray-300 accent-amber-300 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-gray-700 font-medium text-xs sm:text-sm uppercase ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )

        case "myself":
          return (
            <div>
              <div className="mb-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-800">Who is it for?</h3>
              </div>
              <div className="flex flex-col w-full px-1 md:px-2 py-1 text-left space-y-0 max-h-80 overflow-y-auto">
                {PANEL_CONFIG.recipient.options.map((option, i) => (
                  <label
                    key={option}
                    className="flex items-center justify-start cursor-pointer hover:bg-amber-100/50 p-2 transition-all"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <input
                      type="radio"
                      name="recipient-drawer"
                      checked={selections.recipient === option}
                      onChange={() => handleSelection("recipient", option)}
                      className="w-3 h-3 sm:w-4 sm:h-4 border-0 focus:border-0 accent-amber-300 text-amber-500"
                    />
                    <span className="text-gray-700 font-medium text-xs sm:text-sm uppercase ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )

        case "lio":
          return (
            <>
              <ExpandableSection
                title="Brand"
                isExpanded={expandedSections.brand}
                onToggle={() => toggleSection("brand")}
              >
                {BRANDS.map((brand, index) => (
                  <label
                    key={brand.name}
                    className={`flex items-center justify-between cursor-pointer hover:bg-amber-100/50 p-2 transition-all ${
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
                        className="w-3 h-3 sm:w-4 sm:h-4 accent-amber-300"
                      />
                      <span className="text-gray-700 font-medium text-xs sm:text-sm uppercase">{brand.name}</span>
                    </div>
                  </label>
                ))}
              </ExpandableSection>

              <ExpandableSection
                title="Product Type"
                isExpanded={expandedSections.productType}
                onToggle={() => toggleSection("productType")}
              >
                {PRODUCT_TYPES.map((type, index) => (
                  <label
                    key={type}
                    className={`flex items-center justify-start cursor-pointer hover:bg-amber-100/50 p-2 transition-all ${
                      expandedSections.productType ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                    style={{
                      transitionDelay: expandedSections.productType ? `${index * 50}ms` : "0ms",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedProductTypes.includes(type)}
                      onChange={() => toggleProductType(type)}
                      className="w-3 h-3 sm:w-4 sm:h-4 accent-amber-300"
                    />
                    <span className="text-gray-700 font-medium text-xs sm:text-sm uppercase ml-2">{type}</span>
                  </label>
                ))}
              </ExpandableSection>
            </>
          )
      }
    }

    return (
      <div
        className={`w-full h-full bg-transparent p-0 sm:p-2 lg:p-4 animate-slideDown ${cormorantGaramond.className}`}
      >
        {/* Header */}
        <div className="mb-4 sticky top-0 bg-gradient-to-b z-10 pb-2 bg-white">
          <div className="mb-4">
            <h2 className="text-xl w-screen flex sm:text-2xl lg:text-3xl font-bold text-gray-800 flex-wrap gap-1">
              Help me pick
              {activeTab === "lio" &&
                selectedBrands.map((items) => (
                  <div key={items} className="pl-2 lowercase text-gray-400">{`${items}, `}</div>
                ))}
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 sm:gap-6 lg:text-lg justify-around">
            {(["ring", "myself", "lio"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 font-medium transition-colors capitalize ${
                  activeTab === tab ? "text-gray-900 border-b-2 border-amber-500" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "lio" ? "Lio" : tab}
              </button>
            ))}
          </div>

          <div className="border-gray-200 border-b -translate-x-10 w-[54.5vh] xs:w-0 sm:w-[137vh] md:w-[96vh] lg:w-[126.5vh] xl:w-[176vh] 2xl:w-[221vh]" />
        </div>

        {/* Tab Content */}
        <div className="mb-6">{renderTabContent()}</div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleDoneAll}
            className="w-full bg-black p-2 sm:p-3 mb-5 lg:py-2 text-center hover:bg-gray-800 transition-colors"
          >
            <p className="text-white font-bold tracking-wide text-sm sm:text-md lg:text-lg">Done</p>
          </button>
        </div>
      </div>
    )
  }

  interface PanelTriggerProps {
    panelId: PanelId
    displayText: string
    tab: TabType
  }

  // const PanelTrigger: React.FC<PanelTriggerProps> = ({ panelId, displayText, tab }) => (
  //   <>
  //     <span
  //       className={`italic font-bold cursor-pointer pb-0.5 transition-all mr-2 break-words ${
  //         activePanel === panelId
  //           ? "text-[#eaebe5] bg-[#000844] px-2.5 rounded scale-105"
  //           : "text-[#000844] hover:text-gray-600 hover:scale-105"
  //       }`}
  //       onClick={() => openPanel(tab, panelId)}
  //     >
  //       <div className="-translate-x-1 text-start md:text-center">{displayText}</div>
  //     </span>

  //     <div
  //       className={`w-full md:w-[150vh] transition-all duration-500 bg-[#eaebe5] rounded-xl mt-4 shadow-lg origin-top ${
  //         activePanel === panelId
  //           ? "opacity-100 scale-y-100"
  //           : "max-h-0 opacity-0 scale-y-90 -translate-y-4 overflow-hidden"
  //       }`}
  //     >
  //       <div
  //         className={`flex flex-col w-full px-3 md:px-5 py-4 text-left space-y-2 max-h-80 overflow-y-auto ${
  //           activePanel === panelId ? "opacity-100 delay-150" : "opacity-0"
  //         }`}
  //         onWheel={(e) => e.stopPropagation()}
  //       >
  //         {panelId === "jewelry-type" &&
  //           PANEL_CONFIG["jewelry-type"].options.map((option, i) => (
  //             <OptionCheckbox
  //               key={option}
  //               option={option}
  //               isSelected={isSelected("jewelry-type", option)}
  //               onChange={(checked) => handleSelection("jewelry-type", option, checked)}
  //               delay={activePanel === "jewelry-type" ? i * 50 : 0}
  //             />
  //           ))}

  //         {panelId === "recipient" &&
  //           PANEL_CONFIG.recipient.options.map((option, i) => (
  //             <label
  //               key={option}
  //               style={{
  //                 transitionDelay: activePanel === "recipient" ? `${i * 50}ms` : "0ms",
  //                 transform: activePanel === "recipient" ? "translateX(0)" : "translateX(-20px)",
  //               }}
  //               className="flex text-xl md:text-2xl items-center cursor-pointer py-1.5 md:p-2.5 rounded-lg transition-all hover:bg-amber-100/50"
  //             >
  //               <input
  //                 type="radio"
  //                 name="recipient"
  //                 checked={isSelected("recipient", option)}
  //                 onChange={() => handleSelection("recipient", option)}
  //                 className="w-3 h-3 sm:w-4 sm:h-4 border-gray-300 accent-amber-300 text-amber-500"
  //               />
  //               <span className="text-gray-700 font-medium text-xs sm:text-sm lg:text-xs ml-2">{option}</span>
  //             </label>
  //           ))}

  //         <button
  //           onClick={handleDoneInline}
  //           className="mt-4 border-2 bg-[#925c40] text-white px-4 py-2 text-sm rounded transition-all hover:bg-amber-800 hover:scale-105 self-start"
  //         >
  //           Done
  //         </button>
  //       </div>
  //     </div>
  //   </>
  // )

  return (
    <div
      className={`min-h-[70vh] py-20 bg-[#eaebe5] flex justify-center md:items-center font-sans text-gray-800 ${cormorantGaramond.className}`}
    >
      {/* Message Box Modal */}
      {showMessageBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowMessageBox(false)} />
          <div className="relative bg-[#eaebe5] p-8 shadow-2xl text-center max-w-xl mx-4 rounded-xl border-2 border-amber-800/20 animate-in fade-in zoom-in duration-300">
            <h3 className="font-serif text-amber-800 text-2xl mb-4 font-bold">Finding Inspiration...</h3>
            <p className="leading-relaxed mb-6 text-gray-700">
              Finding inspiration for a <strong className="text-amber-900">{displayText.jewelryType}</strong> for{" "}
              <strong className="text-amber-900">{displayText.recipient}</strong> who is a proud{" "}
              <strong className="text-amber-900">{displayText.trait}</strong>!
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
      <BottomDrawer isOpen={showLeoDrawer} className="" onClose={() => setShowLeoDrawer(false)} title="" height="76vh">
        {renderDrawerContent()}
      </BottomDrawer>

      {/* Main Container */}
      <div
        className={`bg-[#eaebe5] p-4 md:p-12 text-center max-w-4xl w-full rounded-xl transition-all ${activePanel ? "pt-24" : ""}`}
      >
        <h2 className="text-2xl md:text-4xl leading-snug font-normal text-gray-800 w-full">
          <div className="text-start md:text-center w-full text-3xl md:text-3xl lg:text-4xl xl:text-5xl px-4 leading-snug break-words">
            <span className="whitespace-nowrap">Help me pick a </span>
            <span
              className="italic font-bold cursor-pointer pb-0.5 transition-all text-[#000844] hover:text-gray-600 hover:scale-105 inline"
              onClick={() => openPanel("ring", "jewelry-type")}
            >
              {displayText.jewelryType}
            </span>
            <span className="whitespace-nowrap"> for </span>
            <span
              className="italic font-bold cursor-pointer pb-0.5 transition-all text-[#000844] hover:text-gray-600 hover:scale-105 inline"
              onClick={() => openPanel("myself", "recipient")}
            >
              {displayText.recipient}
            </span>
            <span className="whitespace-nowrap"> inspired by </span>
            <span
              className="italic font-bold cursor-pointer pb-0.5 transition-all text-[#000844] hover:text-gray-600 hover:scale-105 inline"
              onClick={() => openPanel("lio", "trait")}
            >
              {displayText.trait}
            </span>
          </div>

          <button
            onClick={() => setShowMessageBox(true)}
            className="block mt-8 mx-auto font-medium text-lg md:text-3xl px-8 md:px-8 py-2 bg-[#000108] text-white shadow-lg transition-all hover:bg-gray-600 hover:-translate-y-1 hover:shadow-2xl hover:scale-105 uppercase tracking-wider"
          >
            Show Me My Inspiration
          </button>
        </h2>

        <p className="mt-8 text-sm text-gray-600">
          ...or,{" "}
          <a href="#" className="text-[#000108] font-semibold transition-all hover:underline hover:text-gray-600">
            speak to us
          </a>{" "}
          and share your inspiration so our team can get back to you with a mood board.
        </p>
      </div>
    </div>
  )
}

export default JewelryCustomizer
