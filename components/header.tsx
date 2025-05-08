import { IoBag } from "react-icons/io5";
import { Questrial, Cormorant_Garamond } from 'next/font/google';
import Link from "next/link";
import Image from "next/image";
import ToggleSearch from "./toggle-search";
import { LanguagesIcon } from "lucide-react";
import { CircleDollarSignIcon } from "./ui/circle-dollar-sign";

export const cormorant_Garamond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-inconsolata', // Correct variable name
});

export const questrial = Questrial({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-inconsolata', // Correct variable name
});

export default function Header() {

  return (
    <div className="fixed h-11.5 md:flex md:justify-between md:w-2/5 w-screen top-6.5 md:top-15 pt-3 right-0 md:right-12 md:border-none">
      <Image
        src={"/logo2.png"}
        alt="logo"
        className="m-0 p-0 fixed top-18 left-1/2 md:hidden transform -translate-x-1/2"
        width={280}
        height={280}
      />

      <div className="float-right md:hidden inline-flex -translate-y-2 -translate-x-2">
        <ToggleSearch />
        <Link href={"/cart"}>
          <IoBag size={25} className=" ml-2 mt-1.5" />
        </Link>
      </div>

      <input
        type="email"
        placeholder="SEARCH"
        className={`${questrial.className} hidden lg:flex md:w-[400px] text-sm w-[170px] bg-transparent border-b border-gray-500 focus:border-gray-300 text-black placeholder-black px-0 outline-none transition-colors`}
      />

      <div>
        
      </div>

      <div className="hidden md:flex gap-4">
        <CircleDollarSignIcon size={30} className=""/>
        <LanguagesIcon size={30} />
        <IoBag size={25} className="rounded-4xl" />
      </div>
    </div>

  )
}