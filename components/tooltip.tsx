"use client"
import * as React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function Header() {

    const frameworks = [
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

    let index = 0

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
    
    useEffect(() => {
        const startInterval = () => setInterval(handleClick, 32000); 
        startInterval();
        return () => {
            clearInterval(startInterval());
        }
    }, []);

    return (
        <header className={` font-sans  w-full absolute top-0 z-40`}>
            {/* Top black bar */}
            <div className="bg-black text-[#FFFFFF] py-1.5 px-4 flex justify-between items-center text-xs">
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
                        <div className="flex items-center ml-0 mr-6">
                            <span className="flex items-center h-5 w-20">
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild >
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="mr-9 ml-0 p-0 border-none font-light h-4 hover:underline hover:bg-black hover:text-[#FFFF] bg-black w-full justify-between"
                                        >
                                            {value
                                                ? frameworks.find((framework) => framework.value === value)?.label
                                                : "eng"}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className=" mt-1 w-[200px] p-0 rounded-none">
                                        <Command>
                                            <CommandInput placeholder="Search framework..." />
                                            <CommandList>
                                                <CommandEmpty>No framework found.</CommandEmpty>
                                                <CommandGroup >
                                                    {frameworks.map((framework) => (
                                                        <CommandItem
                                                            key={framework.value}
                                                            value={framework.value}
                                                            onSelect={(currentValue) => {
                                                                setValue(currentValue === value ? "" : currentValue)
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            {framework.label}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    value === framework.value ? "opacity-100" : "opacity-0"
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
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
