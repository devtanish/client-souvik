"use client"

import { Questrial, Cormorant_Garamond } from "next/font/google"
import Link from "next/link"
import Image from "next/image"
import ToggleSearch2 from "./toggle-search2"
import { LuHeart } from "react-icons/lu"
import { SlHandbag } from "react-icons/sl"
import { useCart } from "@/contexts/cart-context"
import { Badge } from "@/components/ui/badge"
import { Inter } from "next/font/google"
import { User } from 'lucide-react'

const inter = Inter({ subsets: ["latin"] })

export const cormorant_Garamond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-inconsolata",
})

export const questrial = Questrial({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-inconsolata",
})

export default function Header({bg}: {bg: boolean}) {
  const { setIsCartOpen, getCartCount, setActiveTab, getWishlistCount } = useCart()

  const handleCartClick = () => {
    setActiveTab("bag")
    setIsCartOpen(true)
  }

  const handleWishlistClick = () => {
    setActiveTab("wishlist")
    setIsCartOpen(true)
  }

  return (
    <div>
      <Link href={"/"} className={` sm:invisible`}>
        <Image
          src={"/Logo.svg"}
          alt="logo"
          className="m-0 p-0 z-30 fixed top-8.5 left-27 md:hidden transform cursor-pointer -translate-x-1/2"
          width={110}
          height={110}
        />
      </Link>
      <div className={`fixed z-15 h-12.5 md:flex md:justify-end lg:justify-between md:w-2/5 w-screen top-6.5 md:top-15 pt-3 right-0 md:right-12 md:border-none ${bg ? "": "bg-gray-50"} md:bg-transparent`}>
        <Link href={"/"}>
          <Image
            src={"/Logo.svg"}
            alt="logo"
            className="m-0 p-0 z-30 fixed top-8.5 left-27 hidden transform cursor-pointer -translate-x-1/2"
            width={110}
            height={110}
          />
        </Link>

        <div className={`float-right md:hidden mt-0.5 gap-1.5 mr-2 inline-flex -translate-x-2  ${inter.className}`}>
          <ToggleSearch2 />
          <Link href={'/user/profile'} className="relative ">
            <User size={20} className="mt-0.5 mr-2" />
            {/* getWishlistCount() */}
          </Link>
          <button onClick={handleCartClick} className={`relative  ${inter.className}`}>
            <SlHandbag size={20} className="mt-0.5" />
            {getCartCount() > 0 && (
              <Badge
                variant="destructive"
                className={` ${inter.className} absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs`}
              >
                {getCartCount()} 
              </Badge>
            )}
          </button>
        </div>

        <input
          type="email"
          placeholder="SEARCH"
          className={`${questrial.className} hidden lg:flex md:w-[400px] z-30 text-sm w-[170px] bg-transparent border-b border-gray-500 focus:border-gray-300 text-black placeholder-black px-0 outline-none transition-colors`}
        />

        <div className="hidden md:flex gap-9">
          <Link href={"/user/profile"} className="relative translate-y-1.5">
            <User size={25} className="mt-0.5" />
            {/* getWishlistCount() */}
          </Link>
          <button onClick={handleCartClick} className="relative">
            <SlHandbag size={25} className="" />
            {getCartCount() > 0 && (
              <Badge
                variant="destructive"
                className={`absolute -top-0.5 -right-1.5 h-4 w-4 p-0 flex items-center justify-center text-[0.5rem]  ${inter.className}`}
              >
                {getCartCount()}
              </Badge>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
