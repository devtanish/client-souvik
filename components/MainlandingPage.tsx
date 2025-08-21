"use client"
import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"
import Lenis from "@studio-freight/lenis"
import styles from "../components/styles/portfolio-layout.module.css"

export default function ArtistryPortfolio() {
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

    return (
        <div className="wrapper">
            {/* TOP SVG - Animates on page load */}
            <section className="top-section">
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
            </section>

            {/* Hero Section */}
            <div className="block md:flex w-screen items-start md:items-end gap-[25%]">
                <img 
                    src="https://cdn.cosmos.so/2200c8e1-2901-4fdb-806c-a2596b3e9c49?format=jpeg" 
                    className="md:w-[45%] w-[100%]" 
                    alt="Portrait" 
                />
                <div className="flex items-start md:items-end">
                    <p className={`${styles.heroText} text-center md:text-right mr-2`}>
                        I am a visual artist exploring the intersection of mental landscapes and creative expression. 
                        Creating art as a therapeutic journey, my work embodies the transformation of internal chaos 
                        into external beauty. Through deliberate practice and intuitive creation, I find that art 
                        provides structure in times of uncertainty and offers a rare clarity when thoughts become 
                        overwhelming. Each piece becomes both mirror and window—reflecting inner states while allowing 
                        glimpses into possible futures.
                    </p>
                </div>
            </div>

            <section id="gallery" className="gallery justify-center flex">
                <div className="container">
                    <div className={styles.gallerySection}>
                        <div className={`${styles.galleryGrid} gallery-wrapper`}>
                            <div className={`${styles.galleryItem} gallery-item`}>
                                <img 
                                    src="https://cdn.cosmos.so/3be2e4e2-4ba8-47c2-9bd7-6b09cc6b82e3?format=jpeg" 
                                    alt="Gallery image 1" 
                                />
                                <div className=" text-center">Fading Embrace</div>
                            </div>
                            <div className={`${styles.galleryItem} gallery-item`}>
                                <img 
                                    src="https://cdn.cosmos.so/91da03b4-8f72-40bd-9531-ce101ecb9508?format=jpeg" 
                                    alt="Gallery image 2" 
                                />
                                <div className=" text-center">Fractured Motion</div>
                            </div>
                            <div className={`${styles.galleryItem} gallery-item`}>
                                <img 
                                    src="https://cdn.cosmos.so/9dbf17e4-d4fa-4095-98dd-d6527d4bb53a?format=jpeg" 
                                    alt="Gallery image 3" 
                                />
                                <div className=" text-center">Echo of Touch</div>
                            </div>
                            <div className={`${styles.galleryItem} gallery-item`}>
                                <img 
                                    src="https://cdn.cosmos.so/bed49b37-4a4a-4cec-ac80-86f5d2edbb8d?format=jpeg" 
                                    alt="Gallery image 4" 
                                />
                                <div className=" text-center">Shattered Light</div>
                            </div>
                            <div className={`${styles.galleryItem} gallery-item`}>
                                <img 
                                    src="https://cdn.cosmos.so/031178f7-7078-4866-9de3-c80062188a2b?format=jpeg" 
                                    alt="Gallery image 5" 
                                />
                                <div className=" text-center">Dissolving Form</div>
                            </div>
                        </div>
                        <div className={`md:px-[20%]`}>
                            <p>
                                When the mind becomes a labyrinth of anxious thoughts, art offers a thread to follow. 
                                The act of creation becomes rebellion against internal chaos—each finished piece a victory 
                                over the voices that whisper you cannot. Through repetitive artistic practice—the mixing 
                                of colors, the careful composition, the patient observation—we create rhythm where there 
                                was discord. This rhythm becomes a meditation, and within this meditation, we uncover parts 
                                of ourselves previously obscured by noise. Art does not remove our struggles but transforms 
                                them into something we can hold, examine, and eventually release.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* BOTTOM SVG - Animates only when footer comes into view */}
            <section id="footer" className="footer">
                <div className="footer-svg-container">
                    <svg width="100%" height="auto" viewBox="0 0 78 19" xmlns="http://www.w3.org/2000/svg">
                        <g className="footer-svg-paths" fill="var(--offblack)">
                            <path d="m62.7985 18v-17.159973h4.32l6 10.199973h.048v-10.199973h4.32v17.159973h-4.32l-6-10.19997h-.048v10.19997z" />
                            <path d="m52.8726 18.384c-5.448 0-8.496-3.792-8.496-8.97601 0-5.16 3.048-8.951996 8.496-8.951996 5.4 0 8.496 3.791996 8.496 8.951996 0 5.18401-3.096 8.97601-8.496 8.97601zm-4.08-8.97601c0 3.00001.936 5.44801 4.08 5.44801 3.12 0 4.08-2.448 4.08-5.44801 0-2.976-.96-5.424-4.08-5.424-3.144 0-4.08 2.448-4.08 5.424z" />
                            <path d="m38.6212 18v-17.159973h4.32v17.159973z" />
                            <path d="m30.4798 18.384c-4.488 0-7.872-2.28-7.872-6.216h4.368c0 1.992 1.512 2.736 3.456 2.736 1.608 0 2.424-.648 2.424-1.536 0-1.464-1.704-1.848-4.08-2.568-2.976-.91201-5.64-2.06401-5.64-5.13601 0-3.744 2.928-5.207996 6.624-5.207996 4.008 0 7.152 2.111996 7.272 5.591996h-4.368c-.192-1.32-1.248-2.112-2.904-2.112-1.296 0-2.208.432-2.208 1.416 0 1.152.96 1.536 3.144 2.184 3.24.96 6.576 1.872 6.576 5.42401 0 3.288-2.496 5.424-6.792 5.424z" />
                            <path d="m17.0925 18v-17.159973h4.32v17.159973z" />
                            <path d="m6.10183 18-5.711998-17.159973h4.728008l3.23999 12.023973h.048l3.26397-12.023973h4.56l-5.568 17.159973z" />
                        </g>
                    </svg>
                </div>
            </section>
        </div>
    )
}