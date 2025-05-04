"use client"

import Logo from "./logo"
import { Button } from "./ui/button"
import { useState } from "react"
import { Plus, Minus, Menu, X } from "lucide-react"

// Define the data structure for our categories
type SubCategory = {
  name: string
  url: string
}

type Category = {
  name: string
  url: string
  subCategories?: SubCategory[]
}

// Sample data for both tabs
const womenCategories: Category[] = [
  {
    name: "All",
    url: "#",
  },
  {
    name: "RINGS",
    url: "#",
    subCategories: [
      { name: "Engagement Rings", url: "#" },
      { name: "Wedding Bands", url: "#" },
      { name: "Stacking Rings", url: "#" },
      { name: "Statement Rings", url: "#" },
      { name: "Cocktail Rings", url: "#" },
      { name: "Gemstone Rings", url: "#" },
      { name: "Signet Rings", url: "#" },
    ],
  },
  {
    name: "NECKLACES",
    url: "#",
    subCategories: [
      { name: "Pendants", url: "#" },
      { name: "Chains", url: "#" },
      { name: "Chokers", url: "#" },
      { name: "Lockets", url: "#" },
    ],
  },
  {
    name: "EARRINGS",
    url: "#",
    subCategories: [
      { name: "Studs", url: "#" },
      { name: "Hoops", url: "#" },
      { name: "Drops", url: "#" },
      { name: "Climbers", url: "#" },
    ],
  },
  {
    name: "BODY & BEYOND BASICS",
    url: "#",
    subCategories: [
      { name: "Bracelets", url: "#" },
      { name: "Anklets", url: "#" },
      { name: "Body Chains", url: "#" },
    ],
  },
  {
    name: "BUNDLES + SETS",
    url: "#",
    subCategories: [
      { name: "Gift Sets", url: "#" },
      { name: "Stacking Sets", url: "#" },
      { name: "Layering Sets", url: "#" },
    ],
  },
]

const menCategories: Category[] = [
  {
    name: "All",
    url: "#",
  },
  {
    name: "RINGS",
    url: "#",
    subCategories: [
      { name: "Wedding Bands", url: "#" },
      { name: "Signet Rings", url: "#" },
      { name: "Statement Rings", url: "#" },
    ],
  },
  {
    name: "NECKLACES",
    url: "#",
    subCategories: [
      { name: "Chains", url: "#" },
      { name: "Pendants", url: "#" },
    ],
  },
  {
    name: "BRACELETS",
    url: "#",
    subCategories: [
      { name: "Cuffs", url: "#" },
      { name: "Chain Bracelets", url: "#" },
    ],
  },
  {
    name: "ACCESSORIES",
    url: "#",
    subCategories: [
      { name: "Cufflinks", url: "#" },
      { name: "Tie Clips", url: "#" },
    ],
  },
]

export default function Sidebar() {
  // State for active tab (Women or Men)
  const [activeTab, setActiveTab] = useState<"women" | "men">("women")

  // State for expanded categories
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["RINGS"])

  // State for sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Toggle category expansion
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName) ? prev.filter((name) => name !== categoryName) : [...prev, categoryName],
    )
  }

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Get current categories based on active tab
  const currentCategories = activeTab === "women" ? womenCategories : menCategories

  return (
    <>
      {/* Toggle Button - Always visible */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md hover:bg-gray-100 focus:outline-none transition-all duration-200"
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <Logo />

      {/* Sidebar */}
      <div
        className={`scrollbar-hide overflow-y-scroll hide-scrollbar flex flex-col justify-between fixed top-0 pt-40  left-0 md:w-[40rem]  bg-white border-r border-gray-200  z-20  transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div>
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 md:mt-0 mt-12">
            <button
              className={`flex-1 py-4 text-center font-medium ${activeTab === "women" ? "text-black" : "text-gray-500"}`}
              onClick={() => setActiveTab("women")}
            >
              WOMEN
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium ${activeTab === "men" ? "text-black" : "text-gray-500"}`}
              onClick={() => setActiveTab("men")}
            >
              MEN
            </button>
          </div>
        </div>
      </div>

        {/* Category Navigation */}
        <div
        className={`scrollbar-hide overflow-y-scroll hide-scrollbar flex flex-col justify-between fixed top-10 pt-50 left-0 w-screen md:w-[40rem] h-full bg-white border-r border-gray-200 shadow-lg z-10  transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="py-6">
          <div className=" px-6 mb-4 text-sm font-medium text-gray-500">SHOP BY</div>

          <ul className="space-y-1">
            {currentCategories.map((category) => (
              <li key={category.name} className="px-6">
                <div className="flex items-center justify-between py-2">
                  <a
                    href={category.url}
                    className="text-sm font-medium"
                    onClick={(e) => {
                      if (category.subCategories?.length) {
                        e.preventDefault()
                        toggleCategory(category.name)
                      }
                    }}
                  >
                    {category.name}
                  </a>
                  {category.subCategories?.length ? (
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="text-gray-500 focus:outline-none ml-20"
                      aria-label={expandedCategories.includes(category.name) ? "Collapse" : "Expand"}
                    >
                      {expandedCategories.includes(category.name) ? <Minus size={16} /> : <Plus size={16} />}
                    </button>
                  ) : null}
                </div>

                {/* Subcategories */}
                {expandedCategories.includes(category.name) && category.subCategories && (
                  <ul className="ml-4 mt-1 mb-2 space-y-1">
                    {category.subCategories.map((subCategory) => (
                      <li key={subCategory.name}>
                        <a href={subCategory.url} className="block py-1 text-sm text-gray-600 hover:text-black">
                          {subCategory.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <p className="place-self-center-safe">New to raya? Create Account</p>
        <Button className="w-1/2 text-lg rounded-none place-self-center-safe mb-70">Signup</Button>
      </div>
    </>
  )
}
