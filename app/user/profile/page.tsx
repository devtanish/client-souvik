"use client"

import { MetricCard } from "@/components/profile/CardTabs"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs } from "@/components/profile/main"
import { useRef, useState, useEffect, Suspense, useCallback } from "react"
import { AppSidebar } from "@/components/profile/SideBar"
import { TabsProvider, useTabsContext } from "@/contexts/profileTabContext"
import type { TabName } from "@/contexts/profileTabContext"
import { useRouter, useSearchParams } from "next/navigation"

type MetricType = "money" | "number"

const METRICS: { title: TabName; value: number; trend: number; type: MetricType; description: string; lastUpdate: string }[] = [
    { title: "WISHLIST",                value: 3.2,   trend: 15.7, type: "number", description: "Optimization working",        lastUpdate: "Above industry average" },
    { title: "AFFILIATE PROGRAM",       value: 1234,  trend: -20,  type: "number", description: "Down 20% this period",        lastUpdate: "Acquisition needs attention" },
    { title: "STORE CREDIT/GIFT CARDS", value: 89234, trend: 8.3,  type: "number", description: "User base expanding",         lastUpdate: "Active in last 30 days" },
    { title: "ORDERS",                  value: 45678, trend: 12.5, type: "number", description: "Strong user retention",       lastUpdate: "Engagement exceed targets" },
    { title: "ADDRESSES",               value: 4.5,   trend: 4.5,  type: "number", description: "Steady performance increase", lastUpdate: "Meets growth projections" },
    { title: "PROFILE",                 value: 1250,  trend: 12.5, type: "money",  description: "Trending up this month",      lastUpdate: "Visitors for the last 6 months" },
]

function ProfileContent() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // ✅ All tab state lives in context — no local activeTab
    const { setTab, isActive } = useTabsContext()

    const [showMetrics, setShowMetrics] = useState(true)
    const scrollRef = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const lastScrollRef = useRef(0)

    // Sync URL param → context on mount
    useEffect(() => {
        const tabFromUrl = searchParams.get("tab") as TabName | null
        if (tabFromUrl) setTab(tabFromUrl)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleScroll = useCallback(() => {
        const el = scrollRef.current
        if (!el) return
        const current = el.scrollTop
        setShowMetrics(current <= lastScrollRef.current || current <= 80)
        lastScrollRef.current = current
    }, [])

    useEffect(() => {
        const container = scrollRef.current
        if (!container) return
        container.addEventListener("scroll", handleScroll, { passive: true })
        return () => container.removeEventListener("scroll", handleScroll)
    }, [handleScroll])

    const dragRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0 })

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = scrollContainerRef.current
        if (!el) return
        dragRef.current = { isDragging: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft }
        el.style.cursor = "grabbing"
    }, [])

    const handleMouseLeaveOrUp = useCallback(() => {
        dragRef.current.isDragging = false
        if (scrollContainerRef.current) scrollContainerRef.current.style.cursor = "grab"
    }, [])

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = scrollContainerRef.current
        if (!dragRef.current.isDragging || !el) return
        e.preventDefault()
        const x = e.pageX - el.offsetLeft
        el.scrollLeft = dragRef.current.scrollLeft - (x - dragRef.current.startX) * 2
    }, [])

    // ✅ Writes to context + URL — no setActiveTab needed
    const handleTabClick = useCallback((tabTitle: TabName) => {
        setTab(tabTitle)
        router.push(`/user/profile?tab=${tabTitle}`, { scroll: false })
    }, [router, setTab])

    return (
        <div className="mt-1 md:mt-15 mb-3 border rounded-2xl mx-2 bg-white h-screen flex flex-col overflow-hidden">

            {/* HEADER */}
            <div className="px-3 md:px-10 lg:px-13 pt-5 border-b bg-white">
                <div className="flex items-center gap-3 mb-4">
                    <button>
                        <SidebarTrigger className="scale-130 lg:scale-150" />
                    </button>
                    <div className="h-8 w-px bg-gray-300" />
                    <h1 className="text-3xl md:text-4xl font-light tracking-wide uppercase">
                        HI, TANISH
                    </h1>
                </div>

                {/* METRICS (Collapsible + Drag Scroll) */}
                <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        showMetrics ? "max-h-[240px] opacity-100 pb-4" : "max-h-0 opacity-0"
                    }`}
                >
                    <div
                        ref={scrollContainerRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeaveOrUp}
                        onMouseUp={handleMouseLeaveOrUp}
                        onMouseMove={handleMouseMove}
                        className="overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab select-none"
                    >
                        <div className="flex gap-4">
                            {METRICS.map((metric, index) => (
                                <MetricCard
                                    key={index}
                                    title={metric.title}
                                    value={metric.value}
                                    trend={metric.trend}
                                    type={metric.type}
                                    description={metric.description}
                                    lastUpdate={metric.lastUpdate}
                                    onClick={() => handleTabClick(metric.title)}
                                    isActive={isActive(metric.title)} // ✅ from context
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-3 md:px-10 lg:px-13 pt-6 pb-10"
            >
                {/* ✅ No prop — Tabs reads currentTab from context */}
                <Tabs />
            </div>
        </div>
    )
}

function Profile() {
    return (
        <Suspense fallback={<div className="p-10">Loading Profile...</div>}>
            <ProfileContent />
        </Suspense>
    )
}

export default function Main() {
    return (
        <SidebarProvider>
            {/* ✅ TabsProvider wraps everything so both ProfileContent and Tabs share state */}
            <TabsProvider defaultTab="WISHLIST">
                <div className="flex min-h-screen w-full">
                    <AppSidebar />
                    <main className="flex-1 overflow-hidden">
                        <Profile />
                    </main>
                </div>
            </TabsProvider>
        </SidebarProvider>
    )
}