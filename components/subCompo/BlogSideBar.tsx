"use client";

import { useState, useEffect } from 'react';
import BlogFooter from './BlogFooter';
import Link from 'next/link';
import Image from 'next/image';
import { ppplayground, fonnts_com_Lyon_Roman } from "./fonts";
import { FuturaCyrillicBook, fonnts_com_Lyon_Italic } from './fonts';

const Drawer = ({ isOpen, onClose, Data }: { isOpen: boolean; onClose: () => void; Data: any }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 w-[100%] lg:w-[90%] right-0 rounded-none xl:rounded-t-2xl xl:rounded-r-none h-full bg-white shadow-2xl transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Scrollable content wrapper */}
        <div className="h-full overflow-y-auto">
          {/* Image container */}
          <div className="relative w-full h-[32vh] xs:h-[40vh] md:h-[60vh] lg:h-[70vh] xl:h-[90vh] overflow-hidden rounded-none rounded-b-2xl xl:rounded-t-2xl xl:rounded-r-none group cursor-pointer flex-shrink-0">
            <Image
              src={Data.url}
              alt={Data.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 87vw, 87vw"
              className="object-cover"
              quality={85}
              priority={false}
            />
          </div>

          {/* Content area - Add your additional content here */}
          <div className="md:p-6 flex gap-5 flex-col justify-center items-center w-full">
            <span className=' sticky top-5/12 self-start z-10 hidden md:block'>
              <div className=' scale-120 border-1 mb-5 px-5  lg:px-6 xl:px-8 py-4 rounded-4xl hover:border-black bg-white transition-colors duration-200 '>
                <svg width="14" height="20" className='translate-x-0.5' viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1V10.5M7 1L3 4.5M7 1L11 4.5M4.5625 8H0.5V19H13.5V8H9.4375" stroke="black"></path></svg>
              </div>
              <div className=' scale-120 border-1 px-5 lg:px-6 xl:px-8 py-4 rounded-4xl bg-white hover:border-black transition-colors duration-200'>
                <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.9851 4.72677C15.9157 4.00513 15.5767 3.32585 15.1144 2.76344C14.3205 1.79857 13.0251 1.01557 11.7407 1.00024C10.4342 0.984897 9.2186 1.71896 8.49926 2.77585C7.77992 1.71896 6.56428 0.984897 5.2578 1.00024C3.97347 1.01557 2.67807 1.79857 1.88414 2.76344C1.42107 3.32585 1.08282 4.00513 1.01339 4.72677C0.927723 5.62224 1.26154 6.51772 1.77114 7.26274C2.47202 8.28749 3.47865 9.03397 4.35382 9.8995C5.73563 11.2661 7.11745 12.6327 8.5 14C9.88181 12.6334 11.2636 11.2668 12.6462 9.8995C13.5214 9.03397 14.528 8.28749 15.2289 7.26274C15.7385 6.51772 16.0723 5.62224 15.9866 4.72677H15.9851Z" stroke="black" stroke-miterlimit="10"></path></svg>
              </div>
            </span>


            <div className=' p-6 xl:px-[8%] 2xl:px-[10%] flex gap-0 flex-col justify-center items-center w-full md:-translate-y-40'>
                {/* Tags */}
                <div className="flex uppercase text-sm gap-1 text-black font-semibold hover:text-black">
                    <Link href={`/blog?tag=${Data.tags[0]}`} className="border-1 px-4 py-1 rounded-2xl cursor-pointer">{Data.tags && Data.tags[0]}</Link>
                    <Link href={`/blog?tag=${Data.tags[1]}`} className="px-4 py-1 rounded-2xl cursor-pointer">{Data.tags && Data.tags[1]}</Link>
                </div>

                {/*Title*/}
                <div className='my-0 mt-8 lg:my-10 lg:mb-5 justify-center flex flex-col lg:px-[6%]'>
                  <div className={`text-center leading-none font-light text-[3rem] md:text-[5rem] xl:text-[6.5rem]  ${ppplayground.className}`}><span>{Data.title}: </span></div>
                  <span className={`text-center -translate-y-2 leading-none font-light text-[2rem] md:text-[3rem] xl:text-[5rem] `}>{Data.description}</span>
                  <div
                    className={` hidden cursor-pointe mt-5 md:flex justify-center gap-x-5  text-center uppercase md:text-xs font-semibold ${FuturaCyrillicBook.className}`}
                  >
                    {Data.publishDate} <span>•</span> {Data.by} <span>•</span> {Data.readTime} 

                  </div>

                </div>

              {/* Content */}
                <div className="flex flex-col gap-10 my-10">
                  <div className={`${fonnts_com_Lyon_Italic.className} font-italic lg:px-[7%] xl:px-[10%] flex justify-center text-lg md:text-xl xl:text-2xl 2xl:text-3xl md:text-left`}>Sharing my passion for jewellery across my platforms often leads to unexpected encounters. When a new jewellery designer and devoted follower, Youngsun Nam, reached out asking to meet and show me the fruits of her imagination, I agreed right away. She had just exhibited her eponymous brand, Youngsun Nam, in Rome during Jewellery Week in October, and made a stop in Paris to meet me before flying back home to Seoul, Korea.
                  </div>
                  
                  <div
                    className={`
                      ${fonnts_com_Lyon_Roman.className} lg:px-[7%] xl:px-[10%] text-lg md:text-xl xl:text-2xl 2xl:text-3xl md:text-left first-letter:text-[4.5rem] first-letter:font-normal first-letter:leading-none first-letter:float-left first-letter:mr-2`}
                  >
                    Youngsun is one of the very few Korean jewellers I’ve had the pleasure of meeting, and her Instagram page, which revealed only glimpses of her designs, intrigued me from the very first glance. We met at the Cheval Blanc hotel in Paris, where she presented a dozen pieces from her debut collection against the backdrop of the River Seine. Three elements—a bold aesthetic, organic shapes and coloured gemstones—united the three chapters of her first collection into one harmonious vision. Though each jewel had a distinct identity, they shared a common thread: pavé diamond details, flowing organic forms and a hidden message behind every design, which I discovered one by one.
                  </div>
                </div>
              </div>
            </div>
          <BlogFooter/>
        </div>

        {/* Close button (optional but recommended) */}
        <button
          onClick={onClose}
          className="absolute transition-colors top-4 md:top-8 left-5 sm:left-10 lg:-left-17 xl:-left-20 scale-100 lg:scale-120 z-10 bg-transparent lg:ring-white ring-gray-500 ring-[0.05rem] hover:ring-gray-400 rounded-full p-2 "
          aria-label="Close drawer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 lg:text-white"
            fill=""
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        
      </div>
    </>
  );
};

export default Drawer;