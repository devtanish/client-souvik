"use client"

import Home from "@/components/main-login"
import LandingPage from "@/components/landingPage_P1"
import JewelryCustomizer from "@/components/landingPage_P2"

export default function Shop() {
    return (
        <div className="">
            <div className=" md:pt-40 pt-20 pb-10 bg-[#eaebe5]">
                <LandingPage/>
                <JewelryCustomizer/>
            </div>
        </div>
    )
} 