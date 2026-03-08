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

export function AppSidebar() {

    const {setTab, isActive} = useTabsContext()

    const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()

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
                    <SidebarGroup className="p-5">
                        <SidebarContent >Wishlist</SidebarContent>
                    </SidebarGroup>
                    <SidebarGroup className="p-5">
                        2st Section
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