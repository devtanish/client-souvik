"use client"

import Image from "next/image";
import localFont from "next/font/local";
import ImageHoverZoom from "../animations/ImageZoom";
import { ppplayground } from "./fonts";

interface BlogCardProps {
    url?: string;
    title?: string;
    description?: string;
    tags?: string[];
    sign?: string;
    club?: boolean;
}


export function BlogCard({url, title, description, tags, sign, club}: BlogCardProps) {
    return (
        <div className="px-2 rounded-lg transition-transform duration-500 ease-out hover:text-gray-500">
            <div className="relative">
                <ImageHoverZoom
                    url={url || "/blog-images/1.webp"} 
                />
                {club && (
                    <div className="absolute top-4 left-4 font-bold text-white px-4 py-2 rounded-full text-xs uppercase tracking-wider">
                        Club
                    </div>
                )}
            </div>
            <div className=" mt-3 lg:mt-5">
                <div className="flex uppercase text-xs gap-1 text-black hover:text-black">
                    <span className="border px-4 py-1 rounded-2xl">{tags && tags[0]}</span>
                    <span className="px-4 py-1 rounded-2xl">{tags && tags[1]}</span>
                </div>
                <div className={`ml-2 flex items-baseline mt-3 gap-2 flex-nowrap`}>
                    <span className={`text-xl md:text-3xl `}><span className={`text-4xl md:text-[2.7rem] ${ppplayground.className}`}>{title}:</span> {description}</span>
                    
                </div>
                <div className="ml-2 text-xs mt-0 lg:mt-2 text-black hover:text-black">
                    {sign}
                </div>
            </div>
        </div>
    );
}