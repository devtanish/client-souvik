"use client"

import { MetricCard } from "@/components/profile/CardTabs"
import { Tabs } from "@/components/profile/main"
import { useRef, useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

type MetricType = "money" | "number"

// Separate component that uses useSearchParams
function ProfileContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    // Get tab from URL query params, default to "PROFILE"
    const tabFromUrl = searchParams.get('tab') || 'PROFILE'
    const [activeTab, setActiveTab] = useState<string>(tabFromUrl)

    const scrollContainerRef = useRef<HTMLDivElement | null>(null)

    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [scrollLeft, setScrollLeft] = useState<number>(0)

    // Sync activeTab with URL changes
    useEffect(() => {
        setActiveTab(tabFromUrl)
    }, [tabFromUrl])

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!scrollContainerRef.current) return
        setIsDragging(true)
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
        setScrollLeft(scrollContainerRef.current.scrollLeft)
        scrollContainerRef.current.style.cursor = "grabbing"
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.cursor = "grab"
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.cursor = "grab"
        }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollContainerRef.current) return
        e.preventDefault()
        const x = e.pageX - scrollContainerRef.current.offsetLeft
        const walk = (x - startX) * 2
        scrollContainerRef.current.scrollLeft = scrollLeft - walk
    }

    const handleTabClick = (tabTitle: string) => {
        setActiveTab(tabTitle)
        router.push(`/user/profile?tab=${tabTitle}`, { scroll: false })
    }

    const metrics: {
        title: string
        value: number
        trend: number
        type: MetricType
        description: string
        lastUpdate: string
    }[] = [
        {
            title: "PROFILE",
            value: 1250,
            trend: 12.5,
            type: "money",
            description: "Trending up this month",
            lastUpdate: "Visitors for the last 6 months",
        },
        {
            title: "AFFILIATE PROGRAM",
            value: 1234,
            trend: -20,
            type: "number",
            description: "Down 20% this period",
            lastUpdate: "Acquisition needs attention",
        },
        {
            title: "ORDERS",
            value: 45678,
            trend: 12.5,
            type: "number",
            description: "Strong user retention",
            lastUpdate: "Engagement exceed targets",
        },
        {
            title: "ADDRESSES",
            value: 4.5,
            trend: 4.5,
            type: "number",
            description: "Steady performance increase",
            lastUpdate: "Meets growth projections",
        },
        {
            title: "STORE CREDIT/GIFT CARDS",
            value: 89234,
            trend: 8.3,
            type: "number",
            description: "User base expanding",
            lastUpdate: "Active in last 30 days",
        },
        {
            title: "WISHLIST",
            value: 3.2,
            trend: 15.7,
            type: "number",
            description: "Optimization working",
            lastUpdate: "Above industry average",
        },
    ]

    return (
        <div className="mt-5 md:mt-20 w-screen mb-20">
            <div className="md:mt-0 lg:mx-15 md:mx-10 mx-3">
                <div className="w-screen h-24 bg-white z-10 top-8 md:flex hidden -translate-x-12 fixed"></div>
                <div className="bg-white">
                    <div>
                        {/* Header Greeting */}
                        <h1 className="text-3xl md:text-4xl ml-1 font-light mb-2 md:mb-5 tracking-wide">
                            HI, TANISH
                        </h1>

                        {/* Navigation Tabs */}
                        <div
                            ref={scrollContainerRef}
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            className="overflow-x-scroll overflow-y-hidden pb-4 select-none"
                            style={{ cursor: 'grab' }}
                        >
                            <div className="flex gap-4">
                                {metrics.map((metric, index) => (
                                    <MetricCard
                                        key={index}
                                        title={metric.title}
                                        value={metric.value}
                                        trend={metric.trend}
                                        type={metric.type}
                                        description={metric.description}
                                        lastUpdate={metric.lastUpdate}
                                        onClick={() => handleTabClick(metric.title)}
                                        isActive={activeTab === metric.title}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mb-7 w-end border-b"></div>

                        {/* Profile Section */}
                        <Tabs currentTab={activeTab} />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Main component with Suspense boundary
export default function Profile() {
    return (
        <Suspense fallback={
            <div className="mt-5 md:mt-20 w-screen mb-20">
                <div className="md:mt-0 lg:mx-15 md:mx-10 mx-3">
                    <div className="bg-white">
                        <h1 className="text-3xl md:text-4xl ml-1 font-light mb-2 md:mb-5 tracking-wide">
                            HI, TANISH
                        </h1>
                        <div className="flex gap-4 pb-4 animate-pulse">
                            <div className="min-w-[280px] h-48 bg-gray-200 rounded-2xl"></div>
                            <div className="min-w-[280px] h-48 bg-gray-200 rounded-2xl"></div>
                            <div className="min-w-[280px] h-48 bg-gray-200 rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        }>
            <ProfileContent />
        </Suspense>
    )
}