"use client"
import { useEffect } from "react"
import BlurText from "./animations/BlurText";
import { gsap } from "gsap"
import { IoIosArrowBack } from "react-icons/io";
import ScrollFloat from "./animations/ScrollFloat";
import { IoIosArrowForward } from "react-icons/io";
import { cn } from "@/lib/utils"
import { useState, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"
import Lenis from "@studio-freight/lenis"
import styles from "../components/styles/portfolio-layout.module.css"
import { Nothing_You_Could_Do } from "next/font/google"
import { Cormorant_Garamond } from "next/font/google";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: [ "400", "500", "600", "700"],
  display: "swap",
})

const nothingYouCouldDo = Nothing_You_Could_Do({
    subsets: ["latin"],
    weight: "400", // this font only has 400 weight
});

export default function ArtistryPortfolio() {
    const [activeIndex, setActiveIndex] = useState(0);
    const galleryScrollRef = useRef<HTMLDivElement>(null);

    const galleryItems = [
    {
      id: 1,
      src: "https://cdn.cosmos.so/3be2e4e2-4ba8-47c2-9bd7-6b09cc6b82e3?format=jpeg",
      alt: "Fading Embrace - Abstract artistic photography",
      title: "Fading Embrace"
    },
    {
      id: 2,
      src: "https://cdn.cosmos.so/91da03b4-8f72-40bd-9531-ce101ecb9508?format=jpeg",
      alt: "Fractured Motion - Abstract artistic photography",
      title: "Fractured Motion"
    },
    {
      id: 3,
      src: "https://cdn.cosmos.so/9dbf17e4-d4fa-4095-98dd-d6527d4bb53a?format=jpeg",
      alt: "Echo of Touch - Abstract artistic photography",
      title: "Echo of Touch"
    },
    {
      id: 4,
      src: "https://cdn.cosmos.so/bed49b37-4a4a-4cec-ac80-86f5d2edbb8d?format=jpeg",
      alt: "Shattered Light - Abstract artistic photography",
      title: "Shattered Light"
    },
    {
      id: 5,
      src: "https://cdn.cosmos.so/031178f7-7078-4866-9de3-c80062188a2b?format=jpeg",
      alt: "Dissolving Form - Abstract artistic photography",
      title: "Dissolving Form"
    }
  ];

    const scrollToSection = (index: number) => {
        const sections = ['landingPage3', 'landingPage2', 'hero'];
        const sectionId = sections[index];
        
        if (sectionId) {
            const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        const yOffset = -100;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset + 75;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollToItem = (index: number) => {
    if (galleryScrollRef.current) {
      const container = galleryScrollRef.current;
      const itemWidth = container.children[0]?.clientWidth || 0;
      const scrollPosition = index * (itemWidth + 16);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
      setActiveIndex(index);
      
      // Add a small delay before scrolling to section
      setTimeout(() => {
        scrollToSection(index);
      }, 300);
    }
  };

  const scrollGallery = (direction: "left" | "right") => {
        const newIndex = direction === "left" 
            ? Math.max(0, activeIndex - 1)
            : Math.min(galleryItems.length - 1, activeIndex + 1);
        scrollToItem(newIndex);
  };

  useEffect(() => {
        // Only update activeIndex on scroll
        const handleScroll = () => {
            if (galleryScrollRef.current) {
                const container = galleryScrollRef.current;
                const itemWidth = container.children[0]?.clientWidth || 0;
                const scrollLeft = container.scrollLeft;
                const centerIndex = Math.round(scrollLeft / (itemWidth + 16));
                setActiveIndex(Math.min(Math.max(0, centerIndex), galleryItems.length - 1));
            }
        };
        const container = galleryScrollRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, [galleryItems.length]);


    useEffect(() => {
        // Initialize Lenis for smooth scrolling with GSAP integration
        const lenis = new Lenis()

        // Synchronize Lenis scrolling with ScrollTrigger plugin
        lenis.on("scroll", (e: any) => {
            ScrollTrigger.update()
        })

        

        // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        // Disable lag smoothing in GSAP
        gsap.ticker.lagSmoothing(0)

        // Register plugins
        gsap.registerPlugin(ScrollTrigger, CustomEase)

        // Custom eases
        CustomEase.create("verticalEase", "0.4, 0, 0.2, 1")
        CustomEase.create("blurEase", "0.65, 0, 0.35, 1")
        CustomEase.create("svgEase", "0.25, 0.1, 0.25, 1")

        // Gallery animations using clip-path for vertical transitions
        const galleryItems = document.querySelectorAll(".gallery-item img")
        galleryItems.forEach((item, index) => {
            gsap
                .timeline({
                    scrollTrigger: {
                        trigger: item.parentElement,
                        start: "top bottom-=100",
                        end: "bottom top+=100",
                        toggleActions: "play none none reverse",
                    },
                })
                .fromTo(
                    item,
                    { clipPath: "inset(100% 0 0 0)" },
                    {
                        clipPath: "inset(0% 0 0 0)",
                        duration: 1.2,
                        delay: index * 0.1,
                        ease: "verticalEase",
                    },
                )
        })

        // TOP SVG TEXT ANIMATION - Plays on page load
        const topSvgPaths = document.querySelectorAll(".top-svg-paths path")

        // Initialize top SVG paths
        topSvgPaths.forEach((path) => {
            const startY = 50 + Math.random() * 30
            gsap.set(path, {
                opacity: 0,
                y: startY,
                filter: "blur(8px)",
            })
        })

        // Create timeline for TOP SVG - plays on page load
        const topSvgTimeline = gsap.timeline({ delay: 0.5 })
        topSvgPaths.forEach((path, index) => {
            const staggerDelay = index * 0.08
            topSvgTimeline.to(
                path,
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1.4,
                    ease: "svgEase",
                },
                staggerDelay
            )
        })

        // BOTTOM SVG TEXT ANIMATION - Plays only when reaching end of page
        const footerSvgPaths = document.querySelectorAll(".footer-svg-paths path")
        let footerAnimationPlayed = false

        // Initialize footer SVG paths
        footerSvgPaths.forEach((path) => {
            const startY = 50 + Math.random() * 30
            gsap.set(path, {
                opacity: 0,
                y: startY,
                filter: "blur(8px)",
            })
        })

        // Create timeline for FOOTER SVG - only plays when footer is reached
        const footerSvgTimeline = gsap.timeline({ paused: true })
        footerSvgPaths.forEach((path, index) => {
            const staggerDelay = index * 0.08
            footerSvgTimeline.to(
                path,
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1.4,
                    ease: "svgEase",
                },
                staggerDelay
            )
        })

        // ScrollTrigger for FOOTER SVG
        ScrollTrigger.create({
            trigger: ".footer",
            start: "top bottom-=100",
            onEnter: () => {
                if (!footerAnimationPlayed) {
                    footerSvgTimeline.play()
                    footerAnimationPlayed = true
                }
            },
            onLeaveBack: () => {
                if (footerAnimationPlayed) {
                    footerSvgTimeline.reverse()
                    footerAnimationPlayed = false
                }
            },
        })

        return () => {
            lenis.destroy()
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [])

    // Add this useEffect after your existing useEffects in the component

    const isAutoScrolling = useRef(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => {
                const nextIndex = prevIndex >= galleryItems.length - 1 ? 0 : prevIndex + 1;
                
                // Set flag to prevent scroll handler interference
                isAutoScrolling.current = true;
                
                // Scroll directly without calling scrollToItem
                if (galleryScrollRef.current) {
                    const container = galleryScrollRef.current;
                    const itemWidth = container.children[0]?.clientWidth || 0;
                    const scrollPosition = nextIndex * (itemWidth + 16);
                    container.scrollTo({
                        left: scrollPosition,
                        behavior: "smooth"
                    });
                    
                    // Reset flag after scroll animation completes (smooth scroll takes ~300ms)
                    setTimeout(() => {
                        isAutoScrolling.current = false;
                    }, 400);
                }
                
                return nextIndex;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Remove frontImageIndex and related interval logic
    return (
        <div className="wrapper">
            {/* TOP SVG - Animates on page load */}
            {/* <section className="top-section">
                <div className="top-svg-container">
                    <svg width="100%" height="auto" viewBox="0 0 113 19" xmlns="http://www.w3.org/2000/svg">
                        <g className="top-svg-paths" fill="var(--offblack)">
                            <path d="m98.9088 18v-17.159973h13.0082v3.528003h-8.688v3.048h7.488v3.52797h-7.488v3.528h8.832v3.528z" />
                            <path d="m87.9181 18-5.712-17.159973h4.728l3.24 12.023973h.048l3.264-12.023973h4.56l-5.568 17.159973z" />
                            <path d="m77.0988 18v-17.159973h4.32v17.159973z" />
                            <path d="m66.7308 18v-13.63197h-4.992v-3.528003h14.28v3.528003h-4.968v13.63197z" />
                            <path d="m46.8616 18 6.528-17.159973h4.344l6.576 17.159973h-4.728l-1.104-3.576h-5.88l-1.104 3.576zm6.72-6.864h3.936l-1.944-6.33597h-.048z" />
                            <path d="m33.7431 18v-17.159973h13.008v3.528003h-8.688v3.048h7.488v3.52797h-7.488v3.528h8.832v3.528z" />
                            <path d="m17.9397 18v-17.159973h8.088c3.816 0 6.12 1.776003 6.12 4.896003 0 2.4-1.344 3.816-3.48 4.29597v.048c4.296.744 2.736 7.392 3.72 7.68v.24h-4.488c-.84-.72.72-5.976-2.952-5.976h-2.688v5.976zm4.32-9.50397h2.928c1.728 0 2.64-.624 2.64-2.064s-.912-2.064-2.64-2.064h-2.928z" />
                            <path d="m8.99145 18.384c-5.448 0-8.208003-3.792-8.208003-8.90401 0-5.256 2.904003-9.023996 8.328003-9.023996 4.67995 0 7.17595 2.783996 7.58395 6.767996h-4.416c-.312-1.872-1.08-3.24-3.35995-3.24-2.856 0-3.72 2.208-3.72 5.424 0 3.24001.864 5.44801 3.72 5.44801 2.30395 0 3.07195-1.368 3.35995-3.288h4.416c-.384 3.936-2.976 6.816-7.70395 6.816z" />
                        </g>
                    </svg>
                </div>
            </section> */}

            {/* Hero Section */}
            <div className="block lg:flex w-screen items-start md:items-end gap-[25%] ">
                <img
                    src="https://cdn.cosmos.so/2200c8e1-2901-4fdb-806c-a2596b3e9c49?format=jpeg"
                    className="lg:w-[45%] w-[100%]"
                    alt="Portrait"
                />
                <div className="flex items-start md:items-end mx-4 md:mx-0">
                    <p className={`${styles.heroText} text-start mr-2 md:text-right `}>
                        I am a visual artist exploring the intersection of mental landscapes and creative expression.
                        Creating art as a therapeutic journey, my work embodies the transformation of internal chaos
                    </p>
                    
                </div>
            </div>

            <div className={`justify-end mr-4 items-center text-center flex lg:hidden translate-y-5`}>
                <IoIosArrowBack/>
                {/* <div className={`border-1 transition-all duration-500 ease-initial border-gray-500 -translate-x-2.5`} onClick={()=> scrollGallery("left")}></div> */}
                <div className={`border-1 transition-all duration-500 ease-initial ${activeIndex+1 === 1 && "w-8"} ${activeIndex+1 === galleryItems[galleryItems.length-1].id && "w-25"} ${(activeIndex+1 != galleryItems[galleryItems.length-1].id && activeIndex+1 != galleryItems[0].id) && "w-16.5"} border-gray-500 -translate-x-2.5`} onClick={()=> {
                    setActiveIndex((cur) => cur === 1 ? 1 : cur - 1);
                    scrollGallery("left")
                }}></div>
                <div className="text-sm mx-3">{activeIndex+1}/{galleryItems.length}</div>
                <div className={`border-1 transition-all duration-500 ease-initial ${activeIndex+1 === 1 && "w-25"} ${activeIndex+1 === galleryItems[galleryItems.length-1].id && "w-8"} ${(activeIndex+1 != galleryItems[galleryItems.length-1].id && activeIndex+1 != galleryItems[0].id) && "w-16.5"} border-gray-500 translate-x-2.5`} onClick={()=> {
                    setActiveIndex((cur) => cur === 5 ? 5 : cur + 1);
                    scrollGallery("right")
                }}></div>
                <IoIosArrowForward/>
            </div>

            {/* <div className={`justify-end mr-4 items-center text-center flex md:hidden translate-y-3`}>
                <IoIosArrowBack/>
                <div className={`border-1 transition-all duration-500 ease-initial ${frontImageIndex+1 === 1 && "w-8"} ${frontImageIndex+1 === array[array.length-1] && "w-25"} ${(frontImageIndex+1 != galleryItems[galleryItems.length-1].id && frontImageIndex+1 != galleryItems[0].id) && "w-16.5"} border-gray-500 -translate-x-2.5`} onClick={()=> {
                    setPlace((cur) => cur === 1 ? 1 : cur - 1);
                    scrollGallery("left")
                }}></div>
                <div className="text-sm mx-3">{frontImageIndex+1}/{array.length}</div>
                <div className={`border-1 transition-all duration-500 ease-initial ${frontImageIndex+1 === 1 && "w-25"} ${frontImageIndex+1 === array[array.length-1] && "w-8"} ${(frontImageIndex+1 != array[array.length-1] && frontImageIndex+1 != array[0]) && "w-16.5"} border-gray-500 translate-x-2.5`} onClick={()=> {
                    setPlace((cur) => cur === 5 ? 5 : cur + 1);
                    scrollGallery("right")
                }}></div>
                <IoIosArrowForward/>
            </div> */}

            <section id="gallery" className={`py-16 pt-0 px-4 lg:px-8 lg:hidden block ${cormorantGaramond.className}`}>
                <div className="gallery-container">
                    <div className="relative md:mb-4 mb-[3rem] lg:mx-12 md:mx-10 ">
                        <div
                            ref={galleryScrollRef}
                            className="flex overflow-x-auto scrollbar-hide gap-0 px-0 pb-0 py-0 scroll-smooth mt-8 snap-x snap-mandatory"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            {galleryItems.map((item, index) => (
                                <div
                                key={item.id}
                                className={cn(
                                    "flex-shrink-0  flex flex-col items-center cursor-pointer transition-all snap-start",
                                    "w-[70%] mr-0",
                                )}
                                onClick={() => scrollToItem(index)}
                                >
                                    <div className="relative w-full max-w-md mx-auto aspect-square mb-2 overflow-hidden sm:h-[400px] md:h-[600px] h-[400px] shadow-md ">
                                        <img
                                            src={item.src}
                                            alt={item.alt}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span
                                        className={cn(
                                            `text-sm font-bold text-center -translate-y-0  text-black `,
                                            activeIndex === index ? "font-bold" : "font-bold"
                                        )}
                                    >
                                        {item.title.toUpperCase()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            <BlurText
            text="Taste is more then prefrence Its your nervous system"
            delay={150}
            animateBy="words"
            direction="top"
            className={` [@media(min-width:375px)]:text-6xl [@media(min-width:425px)]:text-7xl [@media(min-width:10px)]:text-5xl [@media(min-width:300px)]:text-6xl  text-[#690303] md:hidden ml-8 text-center ${nothingYouCouldDo.className} mb-5 md:block flex justify-center -translate-y-13 [@media(min-width:425px)]:-translate-y-10`}
            />

            {/* for desktop only  */}
            <section id="gallery" className={`gallery justify-center lg:flex hidden `}>
                <div className="">
                    <div className={styles.gallerySection}>
                        <div className={`${styles.galleryGrid} gallery-wrapper`}>
                            {galleryItems.map((item, index) => (
                                <div 
                                    key={item.id}
                                    className={`${styles.galleryItem} gallery-item`}
                                    onClick={() => scrollToItem(index)}
                                >
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        loading="lazy"
                                    />
                                    <div className={`text-center uppercase font-semibold ${cormorantGaramond.className}`}>{item.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className={` md:px-[0%] text-center ${nothingYouCouldDo.className} mb-30 hidden lg:block`}>
                <ScrollFloat
                textClassName={` ${nothingYouCouldDo.className} md:px-[10%]  text-center text-[#690303] text-7xl md:text-7xl`}
                animationDuration={1}
                ease='back.inOut(2)'
                scrollStart='center bottom+=50%'
                scrollEnd='bottom bottom-=60%'
                stagger={0.03}
                >
                    Taste is more then prefrence 
                </ScrollFloat>
                <ScrollFloat
                textClassName={` ${nothingYouCouldDo.className} md:px-[10%] text-center text-[#690303] text-7xl md:text-7xl`}
                animationDuration={1}
                ease='back.inOut(2)'
                scrollStart='center bottom+=50%'
                scrollEnd='bottom bottom-=60%'
                stagger={0.03}
                >
                    Its your nervous system
                </ScrollFloat>
            </div>
            <div className={` md:px-[0%] text-center ${nothingYouCouldDo.className} mb-30 hidden md:block lg:hidden`}>
                <ScrollFloat
                textClassName={` ${nothingYouCouldDo.className} md:px-[10%]  text-center text-[#690303] text-7xl md:text-7xl`}
                animationDuration={1}
                ease='back.inOut(2)'
                scrollStart='center bottom+=40%'
                scrollEnd='bottom bottom-=40%'
                stagger={0.03}
                >
                    Taste is more then prefrence 
                </ScrollFloat>
                <ScrollFloat
                textClassName={` ${nothingYouCouldDo.className} md:px-[10%] text-center text-[#690303] text-7xl md:text-7xl`}
                animationDuration={1}
                ease='back.inOut(2)'
                scrollStart='center bottom+=40%'
                scrollEnd='bottom bottom-=40%'
                stagger={0.03}
                >
                    Its your nervous system
                </ScrollFloat>
            </div>

            {/* BOTTOM SVG - Animates only when footer comes into view */}
           <svg viewBox="0 0 1560 300" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <defs>
                        <style>
                        {`
                            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap');
                            
                            .explore-text {
                            opacity: 0;
                            animation: fadeInUp 1.2s ease-out forwards;
                            }
                            
                            @keyframes fadeInUp {
                            0% {
                                opacity: 0;
                                transform: translateY(30px);
                            }
                            100% {
                                opacity: 1;
                                transform: translateY(0);
                            }
                            }
                        `}
                        </style>
                    </defs>
                    <rect width="1560" height="300" fill="#e8e4df"/>
                    <text 
                        className="explore-text"
                        x="780" 
                        y="260" 
                        fontFamily={`'Playfair Display', serif`} 
                        fontSize="325" 
                        fontWeight="900" 
                        fill="#000000" 
                        textAnchor="middle" 
                        letterSpacing="-5"
                    >
                        EXPLORE
                    </text>
                    </svg>
        </div>
    )
}