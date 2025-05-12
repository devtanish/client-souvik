import { Questrial, Cormorant_Garamond } from 'next/font/google';
import Link from "next/link";
import Image from "next/image";
import ToggleSearch from "./toggle-search";
import { LuHeart } from "react-icons/lu";
import { SlHandbag } from "react-icons/sl";

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
    <div className="fixed z-30 h-11.5 md:flex md:justify-between md:w-2/5 w-screen top-6.5 md:top-15 pt-3 right-0 md:right-12 md:border-none">
      <Image
        src={"/logo2.png"}
        alt="logo"
        className="m-0 p-0 z-30 fixed top-18 left-1/2 md:hidden transform -translate-x-1/2"
        width={280}
        height={280}
      />

      <div className="float-right md:hidden gap-1.5 mr-2 inline-flex -translate-y-2 -translate-x-2">
        <ToggleSearch />
        <LuHeart size={20} className='mt-2 mr-2'/>
        <Link href={"/cart"}>
          <SlHandbag size={20} className="mt-2"/>
        </Link>
      </div>

      <input
        type="email"
        placeholder="SEARCH"
        className={`${questrial.className} hidden lg:flex md:w-[400px] z-30 text-sm w-[170px] bg-transparent border-b border-gray-500 focus:border-gray-300 text-black placeholder-black px-0 outline-none transition-colors`}
      />

      <div>
        
      </div>

      <div className="hidden md:flex gap-9">
        <LuHeart size={25} className="mt-0.5"/>
        <SlHandbag size={25} className=""/>
      </div>
    </div>

  )
}