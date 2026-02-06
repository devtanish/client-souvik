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

export function AppSidebar() {

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
        <SidebarHeader >
            <div className=" md:mt-30 flex">
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
        <SidebarContent>
            <div className="flex h-full flex-col justify-between">
                <div className="">
                    <SidebarGroup>
                        1st Section
                    </SidebarGroup>
                    <SidebarGroup>
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