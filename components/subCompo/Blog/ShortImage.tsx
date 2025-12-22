"use client"

import Image from "next/image"
import { FuturaCyrillicBook } from "../fonts"

export default function ShortImage({URL, Title}: {URL: string, Title: string}) {
    return (
        <div className=" md:h-[65vh] lg:h-[60vh] lg:mb-10 xl:mb-0 2xl:mb-5 xl:h-[80vh] w-full lg:w-[90%] flex justify-center">
            <div className="relative w-full h-full gap-2 flex flex-col">
                <Image
                alt="SmallImage"
                className="w-full h-full rounded-xl md:rounded-3xl object-cover"
                src={URL}
                height={1000}
                width={1000}
                />

                <div aria-label="Like" className="absolute backdrop-brightness-90  tracking-wider right-5 top-10 -translate-y-1/2 p-3 rounded-4xl text-white cursor-pointer">
                    <svg width="13" height="12" className="size-4.5" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.2157 4.26549C12.1644 3.7263 11.9139 3.21876 11.5723 2.79855C10.9856 2.07763 10.0284 1.49259 9.07933 1.48113C8.11391 1.46967 7.21563 2.01814 6.68408 2.80782C6.15253 2.01814 5.25424 1.46967 4.28883 1.48113C3.33979 1.49259 2.38257 2.07763 1.7959 2.79855C1.45372 3.21876 1.20377 3.7263 1.15248 4.26549C1.08917 4.93457 1.33584 5.60364 1.7124 6.16029C2.23031 6.92596 2.97415 7.48371 3.62085 8.13041C4.64193 9.15149 5.663 10.1726 6.68462 11.1942C7.7057 10.1731 8.72678 9.15203 9.7484 8.13041C10.3951 7.48371 11.1389 6.92596 11.6568 6.16029C12.0334 5.60364 12.2801 4.93457 12.2168 4.26549H12.2157Z" stroke="white" stroke-miterlimit="10"></path></svg>
                </div>
                <div className={`flex justify-center px-2 ${FuturaCyrillicBook.className}`}>{Title}</div>
            </div>
        </div>
    )
}