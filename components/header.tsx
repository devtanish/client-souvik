"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function Header() {

    const [selectedTab] = useState()

    const tabs = [{
        name: "Piercing Studio",
        href: "/piercing-studio"
    }, {
        name: "Stores & Services",
        href: "/stores-services"
    }, {
        name: "About Us",
        href: "/about-us"
    }, {
        name: "Help",
        href: "/help"
    }, {
        name: "Join Mejuri+",
        href: "/join-mejuri"
    }]

    return (
        <header className="w-full absolute top-0 z-40">
            {/* Top black bar */}
            <div className="bg-black text-white py-1.5 px-4 flex justify-between items-center text-xs">
                <div className="flex items-center space-x-2">
                    <ChevronLeft className="h-5 w-5" />
                    <ChevronRight className="h-5 w-5" />
                    <span className="ml-2">Free Shipping On All Orders Over C$75.</span>
                </div>

                <div className="hidden lg:flex">
                    <div className="flex items-center space-x-10">
                        {tabs.map((tab, index) => (
                            <Link
                                key={index}
                                href={tab.href}
                                className={`${selectedTab === tab.name ? "bg-white text-black" : ""
                                    } hover:underline whitespace-nowrap`}
                            >
                                {tab.name}
                            </Link>
                        ))}
                        <div className="flex items-center ml-0 mr-6">
                            <span className="flex items-center">
                                <span className="w-5 h-5 bg-red-600 text-white flex items-center justify-center text-xs mr-1">
                                    🍁
                                </span>
                                CAD
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
