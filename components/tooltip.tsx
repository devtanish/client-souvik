"use client"
import * as React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Cormorant_Garamond } from "next/font/google"

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export default function Header() {

    const [currentCurrency, setCurrentCurrency] = useState<string>("USD")

    const languages = [
        {
            value: "english",
            label: "English",
        },
        {
            value: "french",
            label: "French",
        },
        {
            value: "spanish",
            label: "Spanish",
        }
    ];

    const tabs = [{
        name: "Exchange program",
        href: "/exchange-program"
    }, {
        name: "Design services",
        href: "/Design-services"
    }, {
        name: "About Us",
        href: "/about-us"
    }, {
        name: "Help",
        href: "/help"
    }, {
        name: "Join Raya +",
        href: "/join-raya"
    }]

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [selectedTab] = useState()
    const [text, setText] = useState("Free Shipping On All Orders Over C$75.")
    const textArray = ["Free Shipping On All Orders Over C$75.", "Welcome to Raya", "Free on Delivery"]
    const currencys = ["INR", "USD", "DRM"];

    let index = 0

    useEffect(() => {
      function handleClick() {
          if (index === textArray.length - 1) {
              index = 0
              setText(textArray[index])
          } if (index === 0) {
              index = textArray.length - 1
              setText(textArray[index])
          }
          else {
              index++;
              setText(textArray[index])
          }
      }
      
      const intervalId = setInterval(handleClick, 32000);
    
      return () => {
        clearInterval(intervalId);
      };
    }, []);

    return (
        <header className={` font-sans  w-full md:fixed fixed top-0 z-40 ${cormorantGaramond.className}`}>
            {/* Top black bar */}
            <div className="bg-[#010614] text-[#FFFFFF] py-1.5 sm:py-2 px-4 flex justify-between items-center text-xs">
                <div className="items-center flex space-x-2 w-screen ">
                    <ChevronLeft className="h-5 w-5 hidden lg:flex" onClick={() => {
                        const decerese = textArray.findIndex(fruit => fruit === text) + 1
                        setText(textArray[decerese])
                    }} />
                    <ChevronRight className="h-5 w-5 hidden lg:flex" onClick={() => {
                        const incrrese = textArray.findIndex(fruit => fruit === text) + 1
                        setText(textArray[incrrese])
                    }} />

                    <span className="flex-1 lg:text-start text-center transition-all duration-500 ease-in-out lg:w-full">
                        {text}
                    </span>
                </div>

                <div className="">
                    <div className=" hidden lg:flex items-center space-x-8">
                        {tabs.map((tab, index) => (
                            <Link
                                key={index}
                                href={tab.href}
                                className={`${selectedTab === tab.name ? "bg-[#FFFFFF] text-black" : ""
                                    } hover:underline whitespace-nowrap`}
                            >
                                {tab.name}
                            </Link>
                        ))}
                        <div className="flex items-center ml-0">
                            <span className="flex items-center h-5 w-20">
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild >
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className=" ml-0 p-0 border-none font-light h-4 hover:underline hover:bg-[#010614] hover:text-[#FFFF] bg-[#010614] w-full justify-between"
                                        >
                                            {value
                                                ? languages.find((language) => language.value === value)?.label
                                                : "eng"}
                                            {/* <ChevronsUpDown className="opacity-50" /> <-- Removed this line */}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className=" mt-1 w-[200px] p-0 rounded-none">
                                        <Command>
                                            <CommandInput placeholder="Search language..." />
                                            <CommandList>
                                                <CommandEmpty>No framework found.</CommandEmpty>
                                                <CommandGroup >
                                                    {languages.map((language) => (
                                                        <CommandItem
                                                            key={language.value}
                                                            value={language.value}
                                                            onSelect={(currentValue) => {
                                                                setValue(currentValue === value ? "" : currentValue)
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            {language.label}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    value === language.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="h-5 -translate-x-9 border-none bg-[#010614] shadow-none hover:bg-[#010614] hover:text-white ">{currentCurrency}</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 ring-0">
                                    <DropdownMenuRadioGroup value={currentCurrency} onValueChange={setCurrentCurrency}>
                                        {currencys.map((currency, index) => (
                                            <DropdownMenuRadioItem value={currency} key={index}>{currency}</DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
