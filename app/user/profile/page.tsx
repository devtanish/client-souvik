"use client"

import { MetricCard } from "@/components/profile/CardTabs"
import { Tabs } from "@/components/profile/main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useRef, useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Menu, User, CreditCard, MapPin, Package, Gift, Heart, Settings } from "lucide-react"

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
        { title: "PROFILE", value: 1250, trend: 12.5, type: "money", description: "Trending up this month", lastUpdate: "Visitors for the last 6 months" },
        { title: "AFFILIATE PROGRAM", value: 1234, trend: -20, type: "number", description: "Down 20% this period", lastUpdate: "Acquisition needs attention" },
        { title: "ORDERS", value: 45678, trend: 12.5, type: "number", description: "Strong user retention", lastUpdate: "Engagement exceed targets" },
        { title: "ADDRESSES", value: 4.5, trend: 4.5, type: "number", description: "Steady performance increase", lastUpdate: "Meets growth projections" },
        { title: "STORE CREDIT/GIFT CARDS", value: 89234, trend: 8.3, type: "number", description: "User base expanding", lastUpdate: "Active in last 30 days" },
        { title: "WISHLIST", value: 3.2, trend: 15.7, type: "number", description: "Optimization working", lastUpdate: "Above industry average" },
    ]

    const menuItems = [
        { title: "PROFILE", icon: User },
        { title: "ORDERS", icon: Package },
        { title: "ADDRESSES", icon: MapPin },
        { title: "AFFILIATE PROGRAM", icon: CreditCard },
        { title: "STORE CREDIT/GIFT CARDS", icon: Gift },
        { title: "WISHLIST", icon: Heart },
    ]

    return (
        <SidebarProvider>
            <div className="flex w-full min-h-[calc(100vh-5rem)] relative">
                
                {/* FIX: Changed z-10 to z-50 to ensure it sits ON TOP of the sidebar */}
                <div className="w-[200vh] h-24 bg-gray-50 z-12 top-8 md:flex hidden -translate-x-12 fixed"></div>
                <Sidebar 
                    collapsible="icon" 
                    className="border-r sticky top-35 h-[calc(100vh-5rem)] md:sticky md:top-32 md:h-[calc(100vh-5rem)]"
                >
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {menuItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                onClick={() => handleTabClick(item.title)}
                                                isActive={activeTab === item.title}
                                                className="px-6 py-3 hover:bg-gray-100 transition-colors"
                                            >
                                                <item.icon className="w-4 h-4" />
                                                <span className="text-sm">{item.title}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="border-t px-6 py-4">
                        <SidebarMenu>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>

                {/* Main Content */}
                <main className="flex-1 overflow-x-hidden">
                    <div className="w-full mb-20">
                        <div className="lg:mx-5 md:mx-10 mx-3">
                            <div className="bg-white">
                                <div>
                                    {/* Header Greeting with Sidebar Toggle */}
                                    <div className="flex items-center gap-3 mb-2 md:mb-5 md:pt-15">
                                        <SidebarTrigger className="flex items-center justify-center w-8 h-8 md:w-11 md:h-11 rounded-lg  border-gray-600 hover:bg-gray-100 hover:border-gray-600 transition-all cursor-pointer border">
                                            <Menu className="w-6 h-6 text-gray-700" />
                                        </SidebarTrigger>
                                        <h1 className="text-3xl md:text-4xl font-light tracking-wide">
                                            HI, TANISH
                                        </h1>
                                    </div>

                                    {/* Navigation Tabs */}
                                    <div
                                        ref={scrollContainerRef}
                                        onMouseDown={handleMouseDown}
                                        onMouseLeave={handleMouseLeave}
                                        onMouseUp={handleMouseUp}
                                        onMouseMove={handleMouseMove}
                                        className="overflow-x-scroll overflow-y-hidden pb-4 select-none scrollbar-hide"
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

                                    <div className="mb-7 w-full border-b"></div>

                                    {/* Profile Section */}
                                    <Tabs currentTab={activeTab} />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}

export default function Profile() {
    return (
        <Suspense fallback={
            <div className="pt-20 w-full mb-20">
                <div className="lg:mx-15 md:mx-10 mx-3">
                    <div className="bg-white">
                        <h1 className="text-3xl md:text-4xl ml-1 font-light mb-2 md:mb-5 tracking-wide pt-5">
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