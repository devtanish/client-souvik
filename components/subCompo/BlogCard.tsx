"use client"

import Image from "next/image";
import localFont from "next/font/local";
import ImageHoverZoom from "../animations/ImageZoom";

const myFont = localFont({
    src: "../../public/fonts/PPPlayground.otf",
    weight: "400",
    style: "normal",
    variable: "--font-myFont",
});

interface BlogCardProps {
    url?: string;
    title?: string;
    description?: string;
    tags?: string[2];
    sign?: string;
    club?: boolean;
}


export function BlogCard({url, title, description, tags, sign, club}: BlogCardProps) {
    return (
        <div className=" p-4 rounded-lg transition-transform duration-500 ease-out hover:text-gray-500">
            <ImageHoverZoom
                url={url || "/blog-images/1.webp"} 
            />
            <div className="mt-5">
                <div className="flex uppercase text-xs gap-1 text-black hover:text-black">
                    <span className="border px-4 py-1 rounded-2xl">{tags && tags[0]}</span>
                    <span className=" px-4 py-1 rounded-2xl">{tags && tags[1]}</span>
                </div>
                <div className={`ml-2 flex items-baseline mt-3 gap-2 flex-nowrap`}>
                    <span className={`text-3xl `}><span className={`text-[2.7rem] ${myFont.className}`}>{title}:</span> {description}</span>
                    
                </div>
                <div className="ml-2 text-xs mt-2 text-black hover:text-black">
                    {sign}
                </div>
            </div>
        </div>
    );
}