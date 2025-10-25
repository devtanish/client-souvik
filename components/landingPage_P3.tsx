"use client";

import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { useEffect, useRef } from "react";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: [ "400", "500", "600", "700"],
  display: "swap",
})

const ArrowSvg = ({fill, className}: {fill?: string, className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={fill ? fill : "#ffffff"} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25" />
  </svg>
)

export default function LandingPage_P3() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            
            const images = containerRef.current.querySelectorAll('.parallax-container');
            
            images.forEach((container) => {
                const rect = container.getBoundingClientRect();
                const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                
                if (scrollProgress >= 0 && scrollProgress <= 1) {
                    const text = container.querySelector('.parallax-text') as HTMLElement;
                    const image = container.querySelector('.parallax-image') as HTMLElement;
                    
                    if (text && image) {
                        // Text moves faster (creates depth)
                        const textOffset = (scrollProgress - 0.5) * -300;
                        text.style.transform = `translateY(${textOffset}px) translateZ(50px)`;
                        
                        // Image moves slower
                        const imageOffset = (scrollProgress - 0.5) * -0.1;
                        image.style.transform = `translateY(${imageOffset}px) scale(${1 + scrollProgress * 0.05})`;
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div id="landingPage3" className={`scroll-mt-16 ${cormorantGaramond.className}`} ref={containerRef}>
            <div className="sm:h-[150vh] h-[100vh] w-screen grid grid-cols-4 lg:grid-cols-6 grid-rows-8 gap-0 mt-[5vh] lg:mt-[10vh]">
                <div className="col-start-1 col-end-3 row-start-1 row-end-5 relative group overflow-hidden parallax-container" style={{ perspective: '1000px' }}>
                    <div className="parallax-image absolute inset-0 transition-transform duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
                        <Image
                            src="/landingPage/1.png"
                            alt="Image 1"
                            id=""
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-center items-center pointer-events-none">
                        <h3 className="parallax-text text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" style={{ 
                            transformStyle: 'preserve-3d',
                            textShadow: '0 10px 30px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)'
                        }}>
                            Ring
                        </h3>
                    </div>
                    <ArrowSvg className="absolute bottom-7 right-7 size-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                </div>
                
                <div className="col-start-1 col-end-3 row-start-5 row-end-9 relative group overflow-hidden parallax-container" style={{ perspective: '1000px' }}>
                    <div className="parallax-image absolute inset-0 transition-transform duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
                        <Image
                            src="/landingPage/2.png"
                            alt="Image 2"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-center items-center pointer-events-none">
                        <h3 className="parallax-text text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" style={{ 
                            transformStyle: 'preserve-3d',
                            textShadow: '0 10px 30px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)'
                        }}>
                            Women Braclet 
                        </h3>
                    </div>
                    <ArrowSvg className="absolute bottom-7 right-7 size-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                </div>
                
                <div className="col-start-3 col-end-5 row-start-1 row-end-5 relative group overflow-hidden parallax-container" style={{ perspective: '1000px' }}>
                    <div className="parallax-image absolute inset-0 transition-transform duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
                        <Image
                            src="/landingPage/3.png"
                            alt="Image 3"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-center items-center pointer-events-none">
                        <p className="parallax-text text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" style={{ 
                            transformStyle: 'preserve-3d',
                            textShadow: '0 10px 30px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)'
                        }}>
                            Men Earrings 
                        </p>
                    </div>
                    <ArrowSvg className="absolute bottom-7 right-7 size-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                </div>
                
                <div className="col-start-3 col-end-5 row-start-5 row-end-9 relative group overflow-hidden parallax-container" style={{ perspective: '1000px' }}>
                    <div className="parallax-image absolute inset-0 transition-transform duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
                        <Image
                            src="/landingPage/4.png"
                            alt="Image 4"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-center items-center pointer-events-none">
                        <p className="parallax-text text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" style={{ 
                            transformStyle: 'preserve-3d',
                            textShadow: '0 10px 30px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)'
                        }}>
                            Men Necklace
                        </p>
                    </div>
                    <ArrowSvg className="absolute bottom-7 right-7 size-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                </div>
                
                <div className="col-start-5 col-end-7 row-start-1 row-end-9 relative group overflow-hidden parallax-container" style={{ perspective: '1000px' }}>
                    <div className="parallax-image absolute inset-0 transition-transform duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
                        <Image
                            src="/landingPage/5.png"
                            alt="Image 5"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-center items-center pointer-events-none">
                        <h3 className="parallax-text text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" style={{ 
                            transformStyle: 'preserve-3d',
                            textShadow: '0 10px 30px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)'
                        }}>
                            Boby & More
                        </h3>
                    </div>
                    <ArrowSvg className="absolute bottom-7 right-7 size-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                </div>
            </div>
            <div className="w-screen h-[100vh] relative flex lg:hidden">
                <Image
                    className=""
                    src="/landingPage/5.png"
                    alt="Image 5"
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>
        </div>
    );
}