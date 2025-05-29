"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Hind } from "next/font/google";
import * as React from "react"
import { useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import data
import { stone } from "./../../../components/data"

const oswald = Hind({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

export default function Home() {

  const categoryScrollRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState("Earrings")

  console.log(activeCategory)

  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="mt-18 md:mt-34 w-screen  mb-20">
      <div className="md:mt-0 lg:mx-2.5 md:mx-10 mx-3">
        <div className="grid gap-1.5 grid-cols-11 grid-rows-5 ">
          <div className="col-span-4 row-start-1 row-end-5 space-y-1.5">
            <Image src={"/product/ring.avif"} alt="product" className="cursor-crosshair" width={800} height={800} />
            <Image src={"/product/ring2.png"} alt="product" className="cursor-crosshair" width={800} height={800} />
            <Image src={"/product/ring3.avif"} alt="product" className="cursor-crosshair" width={800} height={800} />
            <Image src={"/product/hand.webp"} alt="product" className="cursor-crosshair" width={800} height={800} />
          </div>
          <div className="col-span-4 row-start-1 row-end-5 space-y-1.5">
            <Image src={"/product/girl.avif"} alt="product" className="cursor-crosshair" width={800} height={800} />
            <Image src={"/product/ring4.avif"} alt="product" className="cursor-crosshair" width={800} height={800} />
            <Image src={"/product/ring5.avif"} alt="product" className="cursor-crosshair" width={800} height={800} />
          </div>
          <div className={` col-span-3 row-start-1 row-end-5 mx-10 sticky`}>
            <div className="flex justify-between wrap-normal">
              <div className="text-2xl font-semibold">The Classic Emerald Engagement Ring</div>
              <div className="mt-2 ml-6">
                <Image
                  src={"/svg/heart.svg"}
                  height={27}
                  width={27}
                  alt="heart"
                  className="-translate-y-0.5"
                >
                </Image>
              </div>
            </div>

            <div>
              <div className="mt-0 font-bold  text-xl flex">Starting at <div className={`${oswald.className} text-lg ml-1 translate-y-0.5`}>{` $900`}</div></div>
              <div className="mt-2.5 text-md ">Shape: </div>
              <div className=" h-10"><div className="mx-3 -translate-y-4 relative">
                <button
                  onClick={() => scrollCategories("left")}
                  className="absolute -left-5 top-1/2 -translate-y-2/3 -translate-x-2 z-10 bg-white/80 rounded-full p-1 shadow-md opacity-15"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={20} />
                </button>

                <div
                  ref={categoryScrollRef}
                  className="flex overflow-x-auto scrollbar-hide gap-1 px-0 pb-0 py-0 scroll-smooth -translate-x-3"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {stone.map((category) => (
                    <div
                      key={category.name}
                      className={cn(
                        "flex-shrink-0 flex flex-col items-center cursor-pointer transition-all -translate-y-0.5",
                        " sm:w-1/7",
                        activeCategory === category.name ? "opacity-100" : "opacity-80 hover:opacity-100",
                      )}
                      onClick={() => {
                        console.log(category.name)
                        console.log(activeCategory)
                        setActiveCategory(category.name)
                      }}
                    >
                      <div className="relative h-20 w-20">
                        <Image
                          src={category.element}
                          alt={category.name}
                          fill
                          className=" scale-40"
                        />
                        
                      {activeCategory === category.name && <div className="h-0.5 w-10 bg-black -translate-y-5">hello</div>}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollCategories("right")}
                  className="absolute -right-6 top-1/2 -translate-y-2/3 z-10 bg-white/80 rounded-full p-1 shadow-md opacity-15"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={20} />
                </button>
              </div></div>
              <div className="mt-2.5 text-md ">Band width: </div>
              <div className="h-10"></div>
              <div className="mt-2.5 text-md ">Metal: </div>
              <div className="h-10"></div>
              <div className="mt-2.5 text-md font-medium">Band: </div>
              <div className="h-10"></div>
            </div>

            <div className="">
              <Button className=" mb-3 text-white rounded-none w-full pt-3 h-12 text-md" >Select your RAYA created diamond</Button>
              <Button className="rounded-none bg-white border-1 border-black hover:bg-gray-100 text-black w-full pt-3 h-12 text-md" > <Image src={"/svg/cal.svg"} height={20} width={20} alt="calendar" className="ml-2 mb-1" /> Consult with a diamond expert online </Button>
            </div>

            <div className="mt-6">
              <div className="-translate-x-1 flex text-[15px] font-light"><Image src={"/svg/dimand.svg"} height={8} width={30} alt="calendar" className=" icon scale-55 mr-0.5 -translate-y-0.5" />RAYA created diamonds <span className="font-bold ml-2 text-sm mt-0.5"> &#9432;</span></div>
              <div className=" flex text-[15px] font-light"><Image src={"/svg/calender.svg"} height={8} width={20} alt="calendar" className="icon scale-70 mr-2 -translate-y-0.5" />Made-to-order. Ships by Tue, Jun 10</div>
              <div className="cursor-pointer flex underline text-gray-500 text-[15px] font-light"><Image src={"/svg/tick.svg"} height={8} width={20} alt="calendar" className="icon scale-65 mr-2 -translate-y-0.5" />Lifetime warranty and value guarantee</div>
              <div className="cursor-pointer -translate-x-1 flex underline text-gray-500 text-[15px] font-light"><Image src={"/svg/truck.svg"} height={8} width={30} alt="calendar" className="icon scale-55 mr-0.5 -translate-y-0.5" />Shipping policy</div>
              <div className="cursor-pointer flex underline -translate-x-1 text-gray-500 text-[15px] font-light"><Image src={"/svg/restart.png"} height={8} width={30} alt="calendar" className="-translate-y-1 icon scale-50 " />Return policy</div>
            </div>

            <div className={`mt-6 ${oswald.className}`} >
              <div className={`text-2xl ${oswald.className}`}>
                NEED MORE TIME TO THINK?
              </div>
              <div className="text-sm mt-1">
                Email this piece to yourself or drop a hint.
              </div>
              <div className="flex">
                <Input className="rounded-none mr-3 mt-1 w-4/5 border-gray-400 hover:shadow-none !ring-0 " placeholder="Your email address" />
                <Button className="h-9 rounded-none mt-1 w-fit">Submit</Button>
              </div>
            </div>

            <div>
              <div className="text-2xl mt-6">The Classic Design</div>
              <div className="text-lg mt-3">The Classic solitaire in 18k yellow gold with a oval diamond</div>
              <div className="mt-3">With clean fluid lines, the Classic solitaire engagement ring honors its moniker with a touch of modernity. Four curved prongs solely caress the center stone, allowing light to enter from all directions for maximum brilliance. An evolution of the signature solitaire, it’s thoughtfully designed and meticulously perfected for ultimate comfort and wearability. <br />
                <br />
                Band width: 1.7mm <br />
                Band depth: 1.6mm <br />
                Setting height: 6.5mm <br />
                Gold/Platinum metal weight: 2.86g (Ring size 6) <br />
                Pavé carat weight: 0.18ctw <br />
                Shown with center stone: 1.5ct</div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}
