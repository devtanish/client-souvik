import { IoBag } from "react-icons/io5";
import { Questrial, Cormorant_Garamond } from 'next/font/google';

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

export default function Header(){

    return (
      <div className=" fixed justify-between  w-2/5 top-15 right-12 hidden lg:flex">
        <input
          type="email"
          placeholder="SEARCH"
          className= {`${questrial.className} md:w-[400px] text-sm w-[170px] bg-transparent border-b border-gray-500 focus:border-gray-300 text-black placeholder-black py- px-0 outline-none transition-colors`}
        />
        <IoBag size={25} className="hidden lg:flex rounded-4xl ml-5" />      </div>

    )
}