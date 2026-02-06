"use client" // <--- This MUST be the very first line

import { MetricCard } from "@/components/profile/CardTabs"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs } from "@/components/profile/main"
import { useRef, useState, useEffect, Suspense } from "react"
import { AppSidebar } from "@/components/profile/SideBar"
import { useRouter, useSearchParams } from "next/navigation"

type MetricType = "money" | "number"

function ProfileContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const tabFromUrl = searchParams.get('tab') || 'PROFILE'
    const [activeTab, setActiveTab] = useState<string>(tabFromUrl)
    const scrollContainerRef = useRef<HTMLDivElement | null>(null)

    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [scrollLeft, setScrollLeft] = useState<number>(0)

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
        if (scrollContainerRef.current) scrollContainerRef.current.style.cursor = "grab"
    }

    const handleMouseUp = () => {
        setIsDragging(false)
        if (scrollContainerRef.current) scrollContainerRef.current.style.cursor = "grab"
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
        { title: "PROFILE", value: 1250, trend: 12.5, type: "money", description: "Trending up this month", lastUpdate: "Visitors for the last 6 months" },
        { title: "AFFILIATE PROGRAM", value: 1234, trend: -20, type: "number", description: "Down 20% this period", lastUpdate: "Acquisition needs attention" },
        { title: "ORDERS", value: 45678, trend: 12.5, type: "number", description: "Strong user retention", lastUpdate: "Engagement exceed targets" },
        { title: "ADDRESSES", value: 4.5, trend: 4.5, type: "number", description: "Steady performance increase", lastUpdate: "Meets growth projections" },
        { title: "STORE CREDIT/GIFT CARDS", value: 89234, trend: 8.3, type: "number", description: "User base expanding", lastUpdate: "Active in last 30 days" },
        { title: "WISHLIST", value: 3.2, trend: 15.7, type: "number", description: "Optimization working", lastUpdate: "Above industry average" },
    ]

    return (
        <div className="mt-1 md:mt-15 mb-3 border rounded-2xl mx-2 min-h-[85vh] max-h-full py-7 bg-white"> {/* Changed w-screen to w-full */}
            <div className="md:mt-0 lg:mx-13 md:mx-10 mx-3">
                <div className="bg-white">
                    <div className="flex items-center gap-2 mb-4">
                        <SidebarTrigger />
                        <h1 className="text-3xl md:text-4xl font-light tracking-wide">
                            HI, TANISH
                        </h1>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        className="overflow-x-auto overflow-y-hidden pb-4 select-none scrollbar-hide"
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
                    <div className="mb-7 border-b"></div>
                    <Tabs currentTab={activeTab} />
                </div>
            </div>
        </div>
    )
}

export function Profile() {
    return (
        <Suspense fallback={<div className="p-10">Loading Profile...</div>}>
            <ProfileContent />
        </Suspense>
    )
}

export default function Main() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <main className="flex-1 overflow-x-hidden">
                    <Profile/>
                </main>
            </div>
        </SidebarProvider>
    )
}