"use client"

import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Logo from "./logo"
import { Button } from "./ui/button"
import { useState } from "react"
import { Plus, Minus, X, Menu } from "lucide-react"
import Link from "next/link"
import { PiCurrencyDollarLight } from "react-icons/pi";
import { PiQuestionLight } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";

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
        className="fixed md:top-8 md:left-10.5 top-8 left-3 z-50 bg-white p-2 rounded-md   focus:outline-none transition-all duration-200"
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <X className="md:hidden" size={24} /> : <Menu className="md:hidden" size={24} />}
        {/* {isSidebarOpen ?  */}
        <div role="presentation" className="relative md:w-16 md:h-16 h-8 w-8 md:inline-block cursor-pointer group md:visible hidden">
          <span className={`${isSidebarOpen ? "visible" : "invisible opacity-0"}  rotate-135 top-10 md:block absolute h-[0.03rem] w-full bg-black rounded transition-all duration-500 ease-in-out group-[.open]:rotate-45 group-[.open]:top-7`}></span>
          <span className={`${isSidebarOpen ? " opacity-0 invisible" : "visible"}  md:block absolute h-[0.03rem] w-full  bg-black rounded transition-all duration-500 ease-in-out top-6 group-[.open]:opacity-0`}></span>
          <span className={`${isSidebarOpen ? "rotate-45 top-7" : "rotate-0"} absolute top-10 md:block h-[0.03rem] w-full bg-black rounded transition-all duration-500 ease-in-out `}></span>
          <span className={`${isSidebarOpen ? " opacity-0 invisible" : "visible"} md:block absolute h-[0.03rem] w-full  bg-black rounded transition-all duration-500 ease-in-out top-14 group-[.open]:opacity-0`}></span>
        </div>
      </button>

      <Logo />

      {/* Sidebar */}
      <div
        className={`scrollbar-hide overflow-y-scroll hide-scrollbar flex flex-col justify-between fixed top-0 md:pt-40 w-screen left-0 md:w-[40rem]  bg-white border-gray-200  z-20  transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div>
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 md:mt-0 mt-17">
            <div>
              <Link href={"/cart"} className="md:hidden fixed top-10.5 right-5"><BsCart3 size={21} /></Link>
              <button className="md:hidden fixed top-10.5 right-13"><IoSearchOutline size={21} /></button>
              <Link href={"/help"} className="md:hidden z-30 fixed top-10.5 right-21"><PiQuestionLight size={21} /></Link>
              <div className="md:hidden z-20 fixed top-8.5 translate-y-[0.053rem] right-27.5 translate-x-[0.19rem]">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-none bg-[#FFFF] shadow-none"><PiCurrencyDollarLight color="black"/></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 ring-0">
                    <DropdownMenuRadioGroup >
                      <DropdownMenuRadioItem value="top">INR</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="bottom">USD</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="right">DRM</DropdownMenuRadioItem>
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
            <div className="fixed md:top-42 top-42 bottom-0 left-1/2 w-[0.006rem] bg-gray-200 md:h-9 h-9 -translate-x-1/2" />
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
        className={`scrollbar-hide overflow-y-scroll hide-scrollbar flex flex-col justify-between fixed md:top-5 top-28 md:pt-50 left-0 w-screen md:w-[40rem] h-full bg-white border-r border-gray-200 shadow-lg z-10  transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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
        <div className="md:mb-8 mb-24  w-full flex flex-col items-center">
          <div className="mb-5 ">
            <Button className="mb-1 w-[300px] text-lg rounded-none bg-[#01081c] justify-center mt-2">SIGN IN</Button>
            <p className="text-[#01081c] text-center ">New to Raya? <Link href={"sign-up"} className="text-[#01081c] underline cursor-pointer">Create Account</Link></p>
          </div>
          <span className={`h-[0.03rem] w-full bg-gray-200 `}></span>
          <div className="mt-2 w-full text-sm font-medium text-gray-500">
            <p>Shipping To: <Link className="underline cursor-pointer " href="#">CANADA (CAD)</Link></p>
          </div>

          {/* <div className="justify-center mt-2">
            <p className=""><p>Shipping To : </p><p>Curency :</p></p>
          </div> */}
        </div>
      </div>
    </>
  )
}
