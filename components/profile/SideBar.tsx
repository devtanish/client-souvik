import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"
import { RxCross1 } from "react-icons/rx";
import Image from "next/image"
import { useTabsContext } from "@/contexts/profileTabContext";
import { useEffect } from "react";

export function AppSidebar() {

    const {setTab, isActive, currentTab} = useTabsContext()

    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar()

    useEffect(()=> {
        if(isMobile) {
            setOpenMobile(false)
        } else {
        }
    }, [currentTab])

  return (
    <Sidebar>
        <SidebarHeader className=" hidden md:flex" >
            <div className=" md:mt-29 flex">
                <button className="relative w-7 h-7.5 md:hidden" onClick={() => {
                    toggleSidebar()
                }}>
                    <div className="absolute top-1/2 left-0 w-full border-t-1 border-black rotate-45"></div>
                    <div className="absolute top-1/2 left-0 w-full border-t-1 border-black -rotate-45"></div>
                </button>
                <Image 
                    className="md:hidden ml-2"
                    alt=""
                    src={"/Logo.svg"}
                    width={110}
                    height={110} 
                />
            </div>
        </SidebarHeader>
        <SidebarContent className="md:border-1 md:border-gray-200 rounded-2xl bg-white">
            <div className="flex h-full flex-col justify-between">
                <div className="">
                    <SidebarGroup className="py-2 space-y-2">

                        <button
                        onClick={() => setTab("WISHLIST")}
                        className={`w-full text-left px-3 py-2 ${isActive("WISHLIST") ? "bg-black text-white" : "hover:bg-gray-100"} rounded-lg text-sm font-medium transition`}
                        >
                        Wishlist
                        </button>

                        <button
                        onClick={() => setTab("AFFILIATE PROGRAM")}
                        className={`w-full text-left px-3 py-2 ${isActive("AFFILIATE PROGRAM") ? "bg-black text-white" : "hover:bg-gray-100"} rounded-lg text-sm font-medium transition`}
                        >
                        Affiliate Program
                        </button>

                        <button
                        onClick={() => setTab("STORE CREDIT/GIFT CARDS")}
                        className={`w-full text-left px-3 py-2 ${isActive("STORE CREDIT/GIFT CARDS") ? "bg-black text-white" : "hover:bg-gray-100"} rounded-lg text-sm font-medium transition`}
                        >
                        Store Credit
                        </button>

                        <button
                        onClick={() => setTab("ORDERS")}
                        className={`w-full text-left px-3 py-2 ${isActive("ORDERS") ? "bg-black text-white" : "hover:bg-gray-100"} rounded-lg text-sm font-medium transition`}
                        >
                        Orders
                        </button>

                        <button
                        onClick={() => setTab("ADDRESSES")}
                        className={`w-full text-left px-3 py-2 ${isActive("ADDRESSES") ? "bg-black text-white" : "hover:bg-gray-100"} rounded-lg text-sm font-medium transition`}
                        >
                        Addresses
                        </button>

                        <button
                        onClick={() => setTab("PROFILE")}
                        className={`w-full text-left px-3 py-2 ${isActive("PROFILE") ? "bg-black text-white" : "hover:bg-gray-100"} rounded-lg text-sm font-medium transition`}
                        >
                        Profile
                        </button>

                    </SidebarGroup>
                    <SidebarGroup className="p-5">
                    </SidebarGroup>
                </div>
                <SidebarGroup>
                    Setting Area
                </SidebarGroup>
            </div>
            
            <SidebarFooter>
                Hello
            </SidebarFooter>
        </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}