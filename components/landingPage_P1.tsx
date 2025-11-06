"use client"
import { useEffect } from "react"
import BlurText from "./animations/BlurText"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { IoIosArrowBack } from "react-icons/io"
import ScrollFloat from "./animations/ScrollFloat"
import { IoIosArrowForward } from "react-icons/io"
import { cn } from "@/lib/utils"
import { useState, useRef } from "react"
import { CustomEase } from "gsap/CustomEase"
import Lenis from "@studio-freight/lenis"
import styles from "../components/styles/portfolio-layout.module.css"
import { Nothing_You_Could_Do } from "next/font/google"
import { Cormorant_Garamond } from "next/font/google"
import { Lamoric } from "./subCompo/fonts"

gsap.registerPlugin(ScrollTrigger)

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})


const nothingYouCouldDo = Nothing_You_Could_Do({
  subsets: ["latin"],
  weight: "400", // this font only has 400 weight
})

export default function ArtistryPortfolio() {
  const [activeIndex, setActiveIndex] = useState(0)
  const galleryScrollRef = useRef<HTMLDivElement>(null)

  const [isVisible, setIsVisible] = useState(false)

  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const letters = svgRef.current.querySelectorAll(".letter")

    gsap.set(letters, {
      y: 120,
      opacity: 0,
      filter: "blur(20px)",
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      },
    })

    tl.to([...letters].reverse(), {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      ease: "power3.out",
      duration: 0.8,
      stagger: 0.15,
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.1, // Trigger when 50% of the element is visible
        rootMargin: "0px",
      },
    )

    if (svgRef.current) {
      observer.observe(svgRef.current)
    }

    return () => {
      if (svgRef.current) {
        observer.unobserve(svgRef.current)
      }
    }
  }, [])

  const galleryItems = [
    {
      id: 1,
      src: "https://cdn.cosmos.so/3be2e4e2-4ba8-47c2-9bd7-6b09cc6b82e3?format=jpeg",
      alt: "Fading Embrace - Abstract artistic photography",
      title: "Fading Embrace",
    },
    {
      id: 2,
      src: "https://cdn.cosmos.so/91da03b4-8f72-40bd-9531-ce101ecb9508?format=jpeg",
      alt: "Fractured Motion - Abstract artistic photography",
      title: "Fractured Motion",
    },
    {
      id: 3,
      src: "https://cdn.cosmos.so/9dbf17e4-d4fa-4095-98dd-d6527d4bb53a?format=jpeg",
      alt: "Echo of Touch - Abstract artistic photography",
      title: "Echo of Touch",
    },
    {
      id: 4,
      src: "https://cdn.cosmos.so/bed49b37-4a4a-4cec-ac80-86f5d2edbb8d?format=jpeg",
      alt: "Shattered Light - Abstract artistic photography",
      title: "Shattered Light",
    },
    {
      id: 5,
      src: "https://cdn.cosmos.so/031178f7-7078-4866-9de3-c80062188a2b?format=jpeg",
      alt: "Dissolving Form - Abstract artistic photography",
      title: "Dissolving Form",
    },
  ]

  const scrollToSection = (index: number) => {
    const sections = ["landingPage3", "landingPage2", "hero"]
    const sectionId = sections[index]

    if (sectionId) {
      const targetElement = document.getElementById(sectionId)
      if (targetElement) {
        const yOffset = -100
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset + 75

        window.scrollTo({
          top: y,
          behavior: "smooth",
        })
      }
    }
  }

  const scrollToItem = (index: number) => {
    if (galleryScrollRef.current) {
      const container = galleryScrollRef.current
      const itemWidth = container.children[0]?.clientWidth || 0
      const scrollPosition = index * (itemWidth + 16)

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
      setActiveIndex(index)

      // Add a small delay before scrolling to section
      setTimeout(() => {
        scrollToSection(index)
      }, 300)
    }
  }

  const scrollGallery = (direction: "left" | "right") => {
    const newIndex =
      direction === "left" ? Math.max(0, activeIndex - 1) : Math.min(galleryItems.length - 1, activeIndex + 1)
    scrollToItem(newIndex)
  }

  useEffect(() => {
    // Only update activeIndex on scroll
    const handleScroll = () => {
      if (galleryScrollRef.current) {
        const container = galleryScrollRef.current
        const itemWidth = container.children[0]?.clientWidth || 0
        const scrollLeft = container.scrollLeft
        const centerIndex = Math.round(scrollLeft / (itemWidth + 16))
        setActiveIndex(Math.min(Math.max(0, centerIndex), galleryItems.length - 1))
      }
    }
    const container = galleryScrollRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [galleryItems.length])

  useEffect(() => {
    // Initialize Lenis for smooth scrolling with GSAP integration
    const lenis = new Lenis()

    // Synchronize Lenis scrolling with ScrollTrigger plugin
    lenis.on("scroll", (e: Parameters<typeof lenis.on>[1] extends (...args: infer P) => void ? P[0] : never) => {
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
      const parent = item.parentElement
      if (!parent) return

      gsap
        .timeline({
          scrollTrigger: {
            trigger: parent,
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
        staggerDelay,
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
        staggerDelay,
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

  const isAutoScrolling = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = prevIndex >= galleryItems.length - 1 ? 0 : prevIndex + 1

        // Set flag to prevent scroll handler interference
        isAutoScrolling.current = true

        // Scroll directly without calling scrollToItem
        if (galleryScrollRef.current) {
          const container = galleryScrollRef.current
          const itemWidth = container.children[0]?.clientWidth || 0
          const scrollPosition = nextIndex * (itemWidth + 16)
          container.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
          })

          // Reset flag after scroll animation completes (smooth scroll takes ~300ms)
          setTimeout(() => {
            isAutoScrolling.current = false
          }, 400)
        }

        return nextIndex
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

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
            I am a visual artist exploring the intersection of mental landscapes and creative expression. Creating art
            as a therapeutic journey, my work embodies the transformation of internal chaos
          </p>
        </div>
      </div>

      <div className={`justify-end mr-4 items-center text-center flex lg:hidden translate-y-5`}>
        <IoIosArrowBack />
        {/* <div className={`border-1 transition-all duration-500 ease-initial border-gray-500 -translate-x-2.5`} onClick={()=> scrollGallery("left")}></div> */}
        <div
          className={`border-1 transition-all duration-500 ease-initial ${activeIndex + 1 === 1 && "w-8"} ${activeIndex + 1 === galleryItems[galleryItems.length - 1].id && "w-25"} ${activeIndex + 1 != galleryItems[galleryItems.length - 1].id && activeIndex + 1 != galleryItems[0].id && "w-16.5"} border-gray-500 -translate-x-2.5`}
          onClick={() => {
            setActiveIndex((cur) => (cur === 1 ? 1 : cur - 1))
            scrollGallery("left")
          }}
        ></div>
        <div className="text-sm mx-3">
          {activeIndex + 1}/{galleryItems.length}
        </div>
        <div
          className={`border-1 transition-all duration-500 ease-initial ${activeIndex + 1 === 1 && "w-25"} ${activeIndex + 1 === galleryItems[galleryItems.length - 1].id && "w-8"} ${activeIndex + 1 != galleryItems[galleryItems.length - 1].id && activeIndex + 1 != galleryItems[0].id && "w-16.5"} border-gray-500 translate-x-2.5`}
          onClick={() => {
            setActiveIndex((cur) => (cur === 5 ? 5 : cur + 1))
            scrollGallery("right")
          }}
        ></div>
        <IoIosArrowForward />
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
                      src={item.src || "/placeholder.svg"}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span
                    className={cn(
                      `text-sm font-bold text-center -translate-y-0  text-black `,
                      activeIndex === index ? "font-bold" : "font-bold",
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
      <section id="gallery" className={`gallery justify-center lg:flex hidden`}>
        <div className="">
          <div className={styles.gallerySection}>
            <div className="grid place-items-center">
              <div className={`${styles.galleryGrid} gallery-wrapper`}>
                {galleryItems.map((item, index) => (
                  <div key={item.id} className={`${styles.galleryItem} gallery-item`} onClick={() => scrollToItem(index)}>
                    <img src={item.src || "/placeholder.svg"} alt={item.alt} loading="lazy" />
                    <div className={`text-center uppercase font-semibold ${cormorantGaramond.className}`}>
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={` md:px-[0%] text-center ${nothingYouCouldDo.className} mb-30 hidden lg:block`}>
        <ScrollFloat
          textClassName={` ${nothingYouCouldDo.className} md:px-[10%]  text-center text-[#690303] text-7xl md:text-7xl`}
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=60%"
          stagger={0.03}
        >
          Taste is more then prefrence
        </ScrollFloat>
        <ScrollFloat
          textClassName={` ${nothingYouCouldDo.className} md:px-[10%] text-center text-[#690303] text-7xl md:text-7xl`}
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=60%"
          stagger={0.03}
        >
          Its your nervous system
        </ScrollFloat>
      </div>
      <div className={` md:px-[0%] text-center ${nothingYouCouldDo.className} mb-30 hidden md:block lg:hidden`}>
        <ScrollFloat
          textClassName={` ${nothingYouCouldDo.className} md:px-[10%]  text-center text-[#690303] text-7xl md:text-7xl`}
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=40%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          Taste is more then prefrence
        </ScrollFloat>
        <ScrollFloat
          textClassName={` ${nothingYouCouldDo.className} md:px-[10%] text-center text-[#690303] text-7xl md:text-7xl`}
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=40%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          Its your nervous system
        </ScrollFloat>
      </div>

      {/* BOTTOM SVG - Animates only when footer comes into view */}
      <svg ref={svgRef} viewBox="0 0 1560 280" xmlns="http://www.w3.org/2000/svg" className={`w-full ${Lamoric.variable}`}>
        <defs>
            <style>
            {`
                .letter {
                font-family: var(--font-Lamorice);
                font-weight: 900;
                font-size: 365px;
                fill: #000000;
                text-anchor: middle;
                letter-spacing: -5;
                transform-origin: center;
                }
            `}
            </style>
        </defs>

        <g
					transform="translate(0.000000,370.000000) scale(0.165000,-0.140000)"
					fill="#000000"
          className=""
					stroke="none">
					<path
						className="letter"
						d="M277 2546 c27 -24 44 -49 52 -78 9 -32 11 -215 9 -693 -3 -736 2 -691 -85 -737 -24 -13 -43 -26 -43 -30 0 -5 238 -8 528 -8 l529 0 18 138 c10 76 16 145 13 152 -2 8 -21 -20 -41 -62 -78 -162 -224 -224 -511 -216 -146 4 -165 11 -194 68 -15 31 -17 73 -17 415 l0 380 130 -1 c149 -1 202 -13 248 -54 32 -28 57 -84 57 -129 0 -11 5 -21 10 -21 6 0 10 77 10 210 0 198 -10 264 -24 167 -9 -58 -37 -100 -80 -121 -45 -21 -179 -38 -276 -34 l-75 3 0 280 c0 252 2 285 18 322 11 22 29 46 41 53 16 8 82 11 227 8 197 -3 207 -4 254 -29 57 -29 111 -94 138 -166 10 -26 24 -59 30 -73 11 -25 12 -25 14 10 2 19 -5 89 -15 155 l-17 120 -495 3 -494 2 41 -34z"
					/>
					<path
						className="letter"
						d="M1360 2575 c0 -3 16 -11 36 -20 71 -30 133 -112 354 -476 118 -194 215 -362 214 -373 0 -23 -294 -493 -352 -565 -40 -49 -108 -96 -164 -113 -21 -6 -38 -15 -38 -20 0 -4 91 -8 203 -7 190 0 199 1 156 15 -25 7 -58 26 -74 41 -24 24 -27 34 -23 74 4 39 29 87 138 266 73 120 141 233 152 251 11 17 23 32 26 32 4 0 19 -19 33 -42 14 -24 87 -140 161 -258 75 -118 141 -231 148 -251 16 -46 7 -82 -25 -99 -14 -7 -25 -17 -25 -22 0 -4 100 -8 223 -8 l222 0 -42 21 c-65 32 -139 120 -242 290 -52 85 -147 240 -212 346 -65 105 -119 197 -121 205 -2 7 22 54 53 103 31 50 105 169 165 265 126 203 192 277 274 307 98 37 78 43 -132 43 l-193 -1 53 -25 c63 -31 87 -69 77 -122 -8 -43 -305 -534 -320 -529 -18 6 -335 521 -341 554 -9 47 2 78 31 91 58 26 24 32 -195 32 -121 0 -220 -2 -220 -5z"
					/>
					<path
						className="letter"
						d="M2871 2548 c30 -23 47 -46 56 -73 16 -54 18 -1281 2 -1340 -13 -46 -49 -88 -90 -105 -16 -7 -29 -16 -29 -21 0 -5 98 -9 217 -9 217 0 218 0 183 18 -22 12 -44 35 -57 62 -21 41 -23 58 -23 208 0 181 2 190 68 277 49 65 126 125 258 205 255 151 335 216 386 311 20 39 23 58 23 159 0 101 -3 120 -23 158 -35 66 -88 119 -150 149 l-57 28 -404 3 -404 3 44 -33z m672 -2 c46 -19 86 -63 116 -126 24 -50 26 -66 26 -180 0 -121 -1 -128 -32 -190 -43 -89 -85 -134 -205 -225 -160 -122 -215 -173 -266 -244 l-47 -66 -3 460 c-2 398 0 466 14 507 24 74 35 78 212 78 106 0 162 -4 185 -14z"
					/>
					<path
						className="letter"
						d="M3950 2576 c0 -2 15 -13 33 -24 70 -41 68 -14 65 -766 -3 -666 -3 -675 -24 -703 -11 -15 -41 -39 -65 -53 l-44 -25 529 -3 c291 -1 531 0 534 3 4 4 27 172 68 503 4 33 3 52 -4 52 -5 0 -16 -24 -22 -52 -70 -294 -177 -442 -350 -482 -95 -23 -304 -22 -350 2 -73 36 -70 8 -70 752 0 757 -5 712 84 761 25 14 43 28 39 32 -7 7 -423 10 -423 3z"
					/>
					<path
						className="letter"
						d="M5740 2581 c-71 -13 -186 -56 -248 -93 -67 -40 -178 -146 -217 -208 -68 -107 -104 -203 -130 -339 -19 -106 -19 -193 1 -312 61 -353 290 -584 631 -635 178 -27 340 -3 491 72 278 137 432 434 408 786 -24 347 -212 607 -511 705 -69 22 -100 26 -230 29 -82 1 -170 -1 -195 -5z m179 -102 c144 -38 263 -110 394 -238 194 -189 297 -399 297 -607 0 -108 -14 -173 -56 -259 -61 -126 -186 -233 -323 -276 -88 -28 -259 -30 -346 -4 -303 89 -583 386 -664 702 -63 244 22 480 219 612 144 96 296 118 479 70z"
					/>
					<path
						className="letter"
						d="M6822 2548 c66 -60 63 -22 66 -717 2 -425 -1 -652 -8 -686 -12 -56 -40 -90 -97 -119 -18 -9 -33 -19 -33 -21 0 -3 100 -5 222 -5 l223 0 -35 19 c-19 10 -45 36 -57 57 -22 37 -23 49 -23 287 0 226 2 251 19 286 28 54 102 123 170 160 106 56 175 37 214 -59 16 -38 42 -164 52 -250 12 -107 36 -226 61 -302 30 -91 93 -169 151 -189 46 -15 159 -7 201 15 33 17 46 44 15 30 -42 -18 -88 -16 -116 6 -54 43 -70 92 -117 361 -40 232 -63 301 -127 388 -27 35 -92 70 -132 71 -33 0 -17 14 34 30 78 25 181 78 224 116 63 55 91 120 91 216 0 142 -68 258 -183 309 -51 24 -56 24 -452 27 l-400 2 37 -32z m671 -2 c44 -19 92 -71 118 -131 34 -75 39 -229 10 -306 -36 -94 -82 -137 -233 -214 -164 -83 -204 -110 -262 -177 l-46 -53 0 395 c0 365 2 398 19 436 11 23 27 47 38 53 28 16 316 14 356 -3z"
					/>
					<path
						className="letter"
						d="M8191 2547 c30 -22 47 -45 56 -72 16 -54 18 -1281 2 -1340 -13 -46 -49 -88 -90 -105 -16 -7 -29 -16 -29 -21 0 -5 232 -9 530 -9 l530 0 0 27 c0 15 7 76 16 135 21 144 15 159 -26 74 -81 -170 -227 -233 -520 -224 -216 6 -211 -4 -208 498 l3 365 135 -2 c206 -2 269 -34 291 -145 6 -32 16 -58 20 -58 5 0 9 95 9 210 0 116 -4 210 -8 210 -5 0 -14 -24 -21 -54 -15 -68 -55 -109 -119 -126 -26 -6 -107 -14 -179 -17 l-133 -6 0 275 c0 296 8 351 53 383 31 22 382 21 454 0 87 -26 130 -78 203 -250 8 -18 15 -25 17 -17 5 12 -23 259 -33 290 -3 9 -111 12 -499 12 l-497 0 43 -33z"
					/>
				</g>
        </svg>
    </div>
  )
}
