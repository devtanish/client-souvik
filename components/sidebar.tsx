"use client"

import type React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LoginPopup from "@/components/login-popup"
import OtpPopup from "@/components/otp-popup"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import Link from "next/link"
import { PiQuestionLight } from "react-icons/pi"
import { IoSearchOutline } from "react-icons/io5"
import { LanguagesIcon } from "lucide-react"
import { SlHandbag } from "react-icons/sl"
import { usePathname } from "next/navigation"
import { Cormorant_Garamond } from "next/font/google"

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

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
const languages = [
  {
    name: "English",
    short: "EN",
  },
  {
    name: "French",
    short: "FR",
  },
  {
    name: "German",
    short: "DE",
  },
]

const currencys = ["INR", "USD", "DRM"]

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
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [showOtpPopup, setShowOtpPopup] = useState(false)

  const handleLoginClick = () => {
    setShowLoginPopup(true)
  }

  const handleVerifyClick = () => {
    setShowLoginPopup(false)
    setShowOtpPopup(true)
  }

  const handleOtpSubmit = () => {
    setShowOtpPopup(false)
    // Handle successful authentication here
  }

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false)
  }

  const handleCloseOtpPopup = () => {
    setShowOtpPopup(false)
  }

  const [currentCurrency, setCurrentCurrency] = useState<string>("USD")
  const pathname = usePathname()
  const [currentLanguage, setCurrentLanguage] = useState<string>("EN")
  const [activeTab, setActiveTab] = useState<"women" | "men">("women")
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["RINGS"])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName) ? prev.filter((name) => name !== categoryName) : [...prev, categoryName],
    )
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleBackdropClick = () => {
    setIsSidebarOpen(false)
  }

  const handleSidebarWheel = (e: React.WheelEvent) => {
    e.stopPropagation()
  }

  const currentCategories = activeTab === "women" ? womenCategories : menCategories

  return (
    <div className={`${cormorantGaramond.className}`}>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/30 backdrop-blur-sm"
          onClick={handleBackdropClick}
          aria-label="Close sidebar"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Escape" && handleBackdropClick()}
        />
      )}

      {(showLoginPopup || showOtpPopup) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm transition-all">
          <div
            className={`transform transition-all duration-300 ease-in-out ${
              showLoginPopup || showOtpPopup ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            {showLoginPopup && <LoginPopup onVerify={handleVerifyClick} onClose={handleCloseLoginPopup} />}
            {showOtpPopup && <OtpPopup onSubmit={handleOtpSubmit} onClose={handleCloseOtpPopup} />}
          </div>
        </div>
      )}

      <button
        onClick={toggleSidebar}
        className="fixed md:top-8 md:left-10.5 top-8 -left-2.5 z-50 p-2 rounded-md focus:outline-none transition-all duration-200"
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        <div role="presentation" className="relative md:w-16 z-30 md:h-16 h-8 w-8 md:inline-block cursor-pointer group">
          <span
            className={`${isSidebarOpen ? "visible" : "invisible opacity-0"} rotate-135 md:top-10 top-2.5 md:block absolute h-[0.03rem] w-full bg-black rounded transition-all duration-500 ease-in-out group-[.open]:rotate-45 group-[.open]:top-7`}
          ></span>
          <span
            className={`${isSidebarOpen ? "opacity-0 invisible" : "visible"} md:block md:top-6 top-0 absolute h-[0.03rem] w-full bg-black rounded transition-all duration-500 ease-in-out group-[.open]:opacity-0`}
          ></span>
          <span
            className={`${isSidebarOpen ? "rotate-45 top-2.5" : "rotate-0"} absolute md:top-10 top-2.5 md:block h-[0.03rem] w-full bg-black rounded transition-all duration-500 ease-in-out`}
          ></span>
          <span
            className={`${isSidebarOpen ? "opacity-0 invisible" : "visible"} md:block md:top-14 top-5 absolute h-[0.03rem] w-full bg-black rounded transition-all duration-500 ease-in-out group-[.open]:opacity-0`}
          ></span>
        </div>
      </button>

      <Link href={"/"}>
        <Image
          src={"/logo2.png"}
          alt="logo"
          className={`${pathname === "/" ? "fixed top-10 md:flex z-30 hidden left-35 cursor-pointer m-0 p-0" : "fixed top-12 md:flex z-30 hidden left-35 cursor-pointer m-0 p-0"}`}
          width={pathname === "/" ? 300 : 200}
          height={300}
        />
      </Link>

      {/* Sidebar */}
      <div
        className={`scrollbar-hide overflow-y-scroll hide-scrollbar flex flex-col justify-between fixed top-0 md:pt-40 w-screen left-0 md:w-[40rem] bg-white border-gray-200 z-20 transition-transform duration-300 ease-in-out  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onWheel={handleSidebarWheel}
      >
        <div>
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 md:mt-0 mt-17">
            <div>
              <Link href={"/cart"} className="md:hidden fixed top-10.5 right-5">
                <SlHandbag size={21} />
              </Link>
              <button className="md:hidden fixed top-10.5 right-13">
                <IoSearchOutline size={21} />
              </button>
              <Link href={"/help"} className="md:hidden fixed top-10.5 right-21">
                <PiQuestionLight size={21} />
              </Link>
              <div className="md:hidden z-20 fixed top-8.5 translate-y-[0.053rem] right-27.5 translate-x-[0.19rem]">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-none bg-[#FFFF] shadow-none">
                      <LanguagesIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 ring-0">
                    <DropdownMenuRadioGroup value={currentLanguage} onValueChange={setCurrentLanguage}>
                      {languages.map((language) => (
                        <DropdownMenuRadioItem
                          value={language.short}
                          key={language.short}
                        >{`${language.name} (${language.short})`}</DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <button
              className={`flex-1 py-4 text-center font-medium ${activeTab === "women" ? "text-[#01081c]" : "text-gray-500"}`}
              onClick={() => setActiveTab("women")}
            >
              WOMEN
            </button>
            <div className="fixed md:top-42 top-21 bottom-0 left-1/2 w-[0.006rem] bg-gray-200 md:h-9 h-8 -translate-x-1/2" />
            <button
              className={`flex-1 py-4 text-center font-medium ${activeTab === "men" ? "text-[#01081c]" : "text-gray-500"}`}
              onClick={() => setActiveTab("men")}
            >
              MEN
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div
        className={`scrollbar-hide overflow-y-scroll hide-scrollbar flex flex-col justify-between fixed md:top-5 top-28 md:pt-50 left-0 w-screen md:w-[40rem] h-full bg-white border-r border-gray-200 shadow-lg z-15 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onWheel={handleSidebarWheel}
      >
        <div className="py-9">
          <div className="px-6 mb-4 text-sm font-medium text-gray-500">SHOP BY</div>

          <ul className="space-y-1">
            {currentCategories.map((category) => (
              <li key={category.name} className="px-6">
                <div className="flex items-center justify-between py-1">
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
                      className="relative flex items-center justify-center w-8 h-8 rounded-full text-black focus:outline-none transition-all duration-300 ease-in-out"
                      aria-label={expandedCategories.includes(category.name) ? "Collapse" : "Expand"}
                    >
                      <span
                        className={`absolute transition-transform duration-300 ${
                          expandedCategories.includes(category.name) ? "rotate-0" : "rotate-90"
                        }`}
                      >
                        <Minus
                          size={16}
                          className={expandedCategories.includes(category.name) ? "opacity-100" : "opacity-0"}
                        />
                      </span>
                      <span
                        className={`absolute transition-transform duration-300 ${
                          expandedCategories.includes(category.name) ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                        }`}
                      >
                        <Plus size={16} />
                      </span>
                    </button>
                  ) : null}
                </div>

                {/* Subcategories with staggered animation */}
                {category.subCategories && (
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedCategories.includes(category.name) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="ml-4 mt-1 mb-2 space-y-1">
                      {category.subCategories.map((subCategory, index) => (
                        <li
                          key={subCategory.name}
                          className={`transform transition-all duration-300 ${
                            expandedCategories.includes(category.name)
                              ? "translate-y-0 opacity-100"
                              : "translate-y-4 opacity-0"
                          }`}
                          style={{
                            transitionDelay: expandedCategories.includes(category.name) ? `${index * 50}ms` : "0ms",
                          }}
                        >
                          <a
                            href={subCategory.url}
                            className="block py-1 text-sm text-gray-600 hover:text-gray-400 transition-colors duration-200"
                          >
                            {subCategory.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:mb-8 mb-30 w-full flex flex-col items-center">
          <div className="mb-5">
            <Button
              className="mb-1 w-[300px] text-lg rounded-none bg-[#01081c] justify-center mt-2"
              onClick={handleLoginClick}
            >
              SIGN IN
            </Button>
            <p className="text-[#01081c] text-center">
              New to Raya?{" "}
              <Link href={"sign-up"} className="text-[#01081c] underline cursor-pointer">
                Create Account
              </Link>
            </p>
          </div>
          <span className={`h-[0.03rem] w-full bg-gray-200`}></span>
          <div className="mt-2 w-full text-sm font-medium text-gray-500 flex">
            <p>
              Shipping To:{" "}
              <Link className="underline cursor-pointer" href="#">
                CANADA (CAD)
              </Link>
            </p>
            <div className="fixed right-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-5 -translate-x-6 border-none bg-[#FFFF] shadow-none hover:bg-[#FFFF] hover:text-black"
                  >
                    {currentCurrency}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 ring-0">
                  <DropdownMenuRadioGroup value={currentCurrency} onValueChange={setCurrentCurrency}>
                    {currencys.map((currency, index) => (
                      <DropdownMenuRadioItem value={currency} key={index}>
                        {currency}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
