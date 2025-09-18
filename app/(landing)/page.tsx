"use client"

import Home from "@/components/main-login"
import LandingPage from "@/components/landingPage_P1"
import JewelryCustomizer from "@/components/landingPage_P2"
import LandingPage_P3 from "@/components/landingPage_P3"

export default function Shop() {
    return (
        <div className="">
            <div className="md:pt-8 pt-7 pb-10 bg-[#eaebe5]">
                <div id="hero">
                    <LandingPage/>
                </div>
                <div id="landingPage3">
                    <LandingPage_P3/>
                </div>
                <div id="landingPage2">
                    <JewelryCustomizer/>
                </div>
            </div>
        </div>
    )
} 