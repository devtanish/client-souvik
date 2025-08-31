"use client"

import Home from "@/components/main-login"
import LandingPage from "@/components/landingPage_P1"
import JewelryCustomizer from "@/components/landingPage_P2"
import LandingPage_P3 from "@/components/landingPage_P3"

export default function Shop() {
    return (
        <div className="">
            <div className=" md:pt-8 pt-7 pb-10 bg-[#eaebe5]">
                <LandingPage/>
                <LandingPage_P3/>
                <JewelryCustomizer/>
            </div>
        </div>
    )
} 