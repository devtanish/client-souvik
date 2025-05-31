"use client"

// DOMPurify used to convert productcat?.description which is in String format to HTML format
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import DOMPurify from "dompurify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Hind } from 'next/font/google'
import * as React from "react"
import { useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { RingSizeGuideSidebar } from "@/components/ring-size-guide-sidebar"

// Import data
import { products } from "./../../../components/data"

const oswald = Hind({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

export default function Home({ params }: { params: Promise<{ product: string }> }) {
  const { product } = React.use(params)

  const originalValue = product.replaceAll("%20", " ")
  const productcat = products.find((p) => p.name === originalValue)

  const categoryScrollRef = useRef<HTMLDivElement>(null)
  const [activeStone, setActiveStone] = useState(productcat?.activeStones[0].name)
  const [activeSize, setActiveSize] = useState(productcat?.sizes[0])
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)

  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="mt-18 md:mt-36 w-full mb-20">
      <div className="md:mt-0 lg:mx-2.5 md:mx-6 mx-0">
        <div className="grid gap-1.5 grid-cols-1 md:grid-cols-3 lg:grid-cols-11 ">
          <div className="flex justify-center lg:hidden col-space-2 -mx-4 md:mx-0">
            <Carousel className="w-full max-w-none md:max-w-xs flex lg:hidden">
              <CarouselContent className="border-2">
                {productcat?.productImg.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="">
                      <Card className="border-none">
                        <CardContent className=" border-none flex aspect-square items-center justify-center scale-115">
                          <Image src={img || "/placeholder.svg"} alt="product" className="cursor-crosshair w-full h-full" width={800} height={800} />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="col-span-8 space-y-1.5 flex-wrap hidden lg:flex">
            {productcat?.productImg.map((img, index) => (
              <Image
                src={img || "/placeholder.svg"}
                alt="product"
                className="cursor-crosshair mr-2 md:size-130 xl:size-170 w-full "
                width={650}
                height={650}
                key={index}
              />
            ))}
          </div>
          <div className={` col-span-3 mx-1 md:mx-4 sticky`}>
            <div className="col-span-1">
              <div className="flex justify-between wrap-normal">
                <div className="text-2xl mt-5 md:mt-0 font-semibold">{productcat?.title}</div>
                <div className="mt-2 ml-6">
                  <Image src={"/svg/heart.svg"} height={27} width={27} alt="heart" className="-translate-y-0.5"></Image>
                </div>
              </div>

              <div>
                <div className="mt-0 font-bold  text-xl flex">
                  Starting at{" "}
                  <div className={`${oswald.className} text-lg ml-1 translate-y-0.5`}> ${productcat?.price}</div>
                </div>
                <div className="mt-2.5 text-md ">Shape: {activeStone}</div>
                <div className=" h-10">
                  <div className="mx-3 -translate-y-4 relative">
                    <button
                      onClick={() => scrollCategories("left")}
                      className="absolute -left-5 top-1/2 -translate-y-2/3 -translate-x-2 z-10 bg-white/80 rounded-full p-1 shadow-md opacity-15 lg:flex hidden"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <div
                      ref={categoryScrollRef}
                      className="flex overflow-x-auto scrollbar-hide gap-1 px-0 pb-0 py-0 scroll-smooth -translate-x-3"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      {productcat?.activeStones.map((category, index) => (
                        <div
                          key={index}
                          className={cn(
                            "flex-shrink-0 flex flex-col items-center cursor-pointer transition-all -translate-y-0.5",
                            "lg:w-1/6 sm:w-1/10 w-1/6",
                            activeStone === category.name ? "opacity-100 " : "opacity-80 hover:opacity-100",
                          )}
                          onClick={() => {
                            console.log(category.name)
                            setActiveStone(category.name)
                          }}
                        >
                          <div className={`relative h-20 w-20`}>
                            <Image
                              src={category.element || "/placeholder.svg"}
                              alt={category.name}
                              fill
                              className={`  scale-40`}
                            />
                          </div>
                          {activeStone === category.name && (
                            <div className="border-1 w-7 border-black transition-transform duration-300 -translate-y-4.5"></div>
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => scrollCategories("right")}
                      className="absolute -right-6 top-1/2 -translate-y-2/3 z-10 bg-white/80 rounded-full p-1 shadow-md opacity-15 lg:flex hidden"
                      aria-label="Scroll right"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
                <div className="mt-2.5 text-md ">Select Size: {activeSize} </div>
                <div className="h-10">
                  <div className="mx-3 -translate-y-4 relative">
                    <div
                      ref={categoryScrollRef}
                      className="flex overflow-x-auto scrollbar-hide gap-1 px-0 pb-0 py-0 scroll-smooth -translate-x-3"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      {productcat?.sizes.map((category, index) => (
                        <div
                          key={index}
                          className={cn(
                            "flex-shrink-0 h-15 flex flex-col items-center cursor-pointer transition-all -translate-y-0.5",
                            " lg:w-1/6 sm:w-1/10 w-1/6",
                            activeSize === category ? "opacity-100 " : "opacity-80 hover:opacity-100",
                          )}
                          onClick={() => {
                            console.log(category)
                            setActiveSize(category)
                          }}
                        >
                          <div className={`relative h-20 w-20 ${oswald.className} `}>
                            <div className={`${oswald.className} border h-6 w-7  text-center mt-6 ml-[1.6rem]`}>
                              {category}
                            </div>
                          </div>
                          {activeSize === category && (
                            <div className="border-1 w-7 border-black transition-transform duration-300"></div>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      className="underline cursor-pointer -translate-x-2.5 hover:text-gray-600 transition-colors"
                      onClick={() => setIsSizeGuideOpen(true)}
                    >
                      size guide
                    </button>
                  </div>
                </div>
                <div className="mt-12.5 text-md ">Metal: </div>
                <div className="h-10"></div>
                <div className="mt-2.5 text-md font-medium">Band: </div>
                <div className="h-10"></div>
              </div>
            </div>

            <div className="">
              <Button className=" mb-3 text-white rounded-none w-full pt-3 h-12 text-md">
                Select your RAYA created diamond
              </Button>
              <Button className="rounded-none bg-white border-1 border-black hover:bg-gray-100 text-black w-full pt-3 h-12 text-md">
                {" "}
                <Image src={"/svg/cal.svg"} height={20} width={20} alt="calendar" className="ml-2 mb-1" /> Consult with
                a diamond expert online{" "}
              </Button>
            </div>

            <div className="mt-6">
              <div className="-translate-x-1 flex text-[15px] font-light">
                <Image
                  src={"/svg/dimand.svg"}
                  height={8}
                  width={30}
                  alt="calendar"
                  className=" icon scale-55 mr-0.5 -translate-y-0.5"
                />
                RAYA created diamonds <span className="font-bold ml-2 text-sm mt-0.5"> &#9432;</span>
              </div>
              <div className=" flex text-[15px] font-light">
                <Image
                  src={"/svg/calender.svg"}
                  height={8}
                  width={20}
                  alt="calendar"
                  className="icon scale-70 mr-2 -translate-y-0.5"
                />
                Made-to-order. Ships by Tue, Jun 10
              </div>
              <div className="cursor-pointer flex underline text-gray-500 text-[15px] font-light">
                <Image
                  src={"/svg/tick.svg"}
                  height={8}
                  width={20}
                  alt="calendar"
                  className="icon scale-65 mr-2 -translate-y-0.5"
                />
                Lifetime warranty and value guarantee
              </div>
              <div className="cursor-pointer -translate-x-1 flex underline text-gray-500 text-[15px] font-light">
                <Image
                  src={"/svg/truck.svg"}
                  height={8}
                  width={30}
                  alt="calendar"
                  className="icon scale-55 mr-0.5 -translate-y-0.5"
                />
                Shipping policy
              </div>
              <div className="cursor-pointer flex underline -translate-x-1 text-gray-500 text-[15px] font-light">
                <Image
                  src={"/svg/restart.png"}
                  height={8}
                  width={30}
                  alt="calendar"
                  className="-translate-y-1 icon scale-50 "
                />
                Return policy
              </div>
            </div>

            <div className={`mt-6 ${oswald.className}`}>
              <div className={`text-2xl ${oswald.className}`}>NEED MORE TIME TO THINK?</div>
              <div className="text-sm mt-1">Email this piece to yourself or drop a hint.</div>
              <div className="flex">
                <Input
                  className="rounded-none mr-3 mt-1 w-4/5 border-gray-400 hover:shadow-none !ring-0 "
                  placeholder="Your email address"
                />
                <Button className="h-9 rounded-none mt-1 w-fit">Submit</Button>
              </div>
            </div>

            <div>
              <div className="text-2xl mt-6">The Classic Design</div>
              <div className="text-lg mt-3">{productcat?.subtitle}</div>

              {/* //used to convert productcat?.description which is in String format to HTML format */}
              <div
                className="mt-3"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(productcat?.description || ""),
                }}
              />
            </div>
          </div>
          <div></div>
        </div>
      </div>

      {/* Ring Size Guide Sidebar */}
      <RingSizeGuideSidebar isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  )
}