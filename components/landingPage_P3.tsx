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
                        const textOffset = (scrollProgress - 0.5) * -200;
                        text.style.transform = `translateY(${textOffset}px) translateZ(50px)`;
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
            <style jsx>{`
                .glass-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        135deg,
                        rgba(255, 255, 255, 0.15) 0%,
                        rgba(255, 255, 255, 0.05) 100%
                    );
                    backdrop-filter: blur(12px) saturate(150%);
                    -webkit-backdrop-filter: blur(12px) saturate(150%);
                    opacity: 0;
                    transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    pointer-events: none;
                    border: 1px solid rgba(255, 255, 255, 0.25);
                    box-shadow: 
                        inset 0 1px 1px rgba(255, 255, 255, 0.3),
                        0 8px 32px rgba(0, 0, 0, 0.2);
                }
                
                .parallax-container:hover .glass-overlay {
                    opacity: 1;
                }
                
                .parallax-container:hover .arrow-icon {
                    transform: translate(5px, -5px);
                }
                
                .arrow-icon {
                    transition: transform 0.4s ease;
                }
            `}</style>
            
            <div className="sm:h-[150vh] h-[100vh] w-screen grid grid-cols-4 lg:grid-cols-6 grid-rows-8 gap-0 mt-[5vh] lg:mt-[10vh]">
                <div className="col-start-1 col-end-3 row-start-1 row-end-5 relative overflow-hidden parallax-container cursor-pointer" style={{ perspective: '1000px' }}>
                    <div className="parallax-image absolute inset-0 transition-transform duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
                        <Image
                            src="/landingPage/1.png"
                            alt="Image 1"
                            id=""
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="glass-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t to-transparent flex justify-center items-center pointer-events-none">
                        <h3 className="parallax-text text-white font-bold text-xl" style={{ 
                            transformStyle: 'preserve-3d',
                            textShadow: '0 10px 30px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)'
                        }}>
                            Ring
                        </h3>
                    </div>
                    <ArrowSvg className="arrow-icon absolute bottom-1 md:bottom-7 right-1 md:right-7 size-5"/>
                </div>
                
                <div className="col-start-1 col-end-3 row-start-5 row-end-9 relative overflow-hidden parallax-container cursor-pointer" style={{ perspective: '1000px' }}>
                    <div className="parallax-image absolute inset-0 transition-transform duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
                        <Image
                            src="/landingPage/2.png"
                            alt="Image 2"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="glass-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t to-transparent flex justify-center items-center pointer-events-none">
                        <h3 className="parallax-text text-white font-bold text-xl" style={{ 
                            transformStyle: 'preserve-3d',
                            textShadow: '0 10px 30px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)'
                        }}>
                            Women Braclet 
                        </h3>
                    </div>
                    <ArrowSvg className="arrow-icon absolute bottom-1 md:bottom-7 right-1 md:right-7 size-5"/>
                </div>
                
                <div className="col-start-3 col-end-5 row-start-1 row-end-5 relative overflow-hidden parallax-container cursor-pointer" style={{ perspective: '1000px' }}>
                    <div className="parallax-image absolute inset-0 transition-transform duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
                        <Image
                            src="/landingPage/3.png"
                            alt="Image 3"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="glass-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t to-transparent flex justify-center items-center pointer-events-none">
                        <p className="parallax-text text-white font-bold text-xl" style={{ 
                            transformStyle: 'preserve-3d',
                            textShadow: '0 10px 30px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)'
                        }}>
                            Men Earrings 
                        </p>
                    </div>
                    <ArrowSvg className="arrow-icon absolute bottom-1 md:bottom-7 right-1 md:right-7 size-5"/>
                </div>
                
                <div className="col-start-3 col-end-5 row-start-5 row-end-9 relative overflow-hidden parallax-container cursor-pointer" style={{ perspective: '1000px' }}>
                    <div className="parallax-image absolute inset-0 transition-transform duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
                        <Image
                            src="/landingPage/4.png"
                            alt="Image 4"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="glass-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t to-transparent flex justify-center items-center pointer-events-none">
                        <p className="parallax-text text-white font-bold text-xl" style={{ 
                            transformStyle: 'preserve-3d',
                            textShadow: '0 10px 30px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)'
                        }}>
                            Men Necklace
                        </p>
                    </div>
                    <ArrowSvg className="arrow-icon absolute bottom-1 md:bottom-7 right-1 md:right-7 size-5"/>
                </div>
                
                <div className="col-start-5 col-end-7 row-start-1 row-end-9 relative overflow-hidden parallax-container cursor-pointer" style={{ perspective: '1000px' }}>
                    <div className="parallax-image absolute inset-0 transition-transform duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
                        <Image
                            src="/landingPage/5.png"
                            alt="Image 5"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="glass-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t to-transparent flex justify-center items-center pointer-events-none">
                        <h3 className="parallax-text text-white font-bold text-xl" style={{ 
                            transformStyle: 'preserve-3d',
                            textShadow: '0 10px 30px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)'
                        }}>
                            Boby & More
                        </h3>
                    </div>
                    <ArrowSvg className="arrow-icon absolute bottom-1 md:bottom-7 right-1 md:right-7 size-5"/>
                </div>
            </div>
            <div className="w-screen h-[100vh] relative flex lg:hidden parallax-container">
                <div className="parallax-image absolute inset-0 transition-transform duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
                    <Image
                        className=""
                        src="/landingPage/5.png"
                        alt="Image 5"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className="glass-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t to-transparent flex justify-center items-center pointer-events-none">
                    <h3 className="parallax-text text-white font-bold text-xl" style={{ 
                        transformStyle: 'preserve-3d',
                        textShadow: '0 10px 30px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)'
                    }}>
                        Boby & More
                    </h3>
                </div>
                <ArrowSvg className="arrow-icon absolute bottom-1 md:bottom-7 right-1 md:right-7 size-5"/>
            </div>
        </div>
    );
}