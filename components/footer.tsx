"use client"

import Image from "next/image"
import { GoArrowUpRight } from "react-icons/go";
import { useRef } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Plus, Minus } from "lucide-react"
import { Nothing_You_Could_Do } from "next/font/google"

const nothingYouCouldDo = Nothing_You_Could_Do({
  subsets: ["latin"],
  weight: "400",
})

// Mock data
const shopLinks = [
  { name: "Ring", href: "/ring" },
  { name: "Earring", href: "/earring" },
  { name: "Necklace", href: "/necklace" },
  { name: "New", href: "/new" },
  { name: "Sale", href: "/sale" },
]

const serviceLinks = [
  { name: "Shipping & Returns", href: "/shipping" },
  { name: "Store Policy", href: "/policy" },
  { name: "Payment Methods", href: "/payment" },
  { name: "FAQ", href: "/faq" },
]

const companyLinks = [
  { name: "Blog", href: "/blog" },
  { name: "About Us", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Customer Stories", href: "/stories" },
  { name: "Contact", href: "/contact" },
]

export default function Footer() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Shop"])
  const [isMobile, setIsMobile] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !imagesLoaded) {
            setImagesLoaded(true)
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% of the footer is visible
      }
    )

    const footerElement = document.querySelector('footer')
    if (footerElement) {
      observer.observe(footerElement)
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement)
      }
    }
  }, [imagesLoaded])

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionName) ? prev.filter((name) => name !== sectionName) : [...prev, sectionName],
    )
  }

  function borderLog(key: number, length: number): boolean {
    const itemsInLastRow = length % 3 || 3;
    const isInLastRow = key >= length - itemsInLastRow;
    
    return !isInLastRow;
  }

  return (
    <footer className="w-screen overflow-hidden">
      {/* Newsletter Section */}
      <div className="w-screen bg-[#1a1a1a] text-white py-17 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-center text-lg md:text-2xl mb-6 italic font-light ${nothingYouCouldDo.className}`}>
            Join MV Circle for early sale access, birthday treats, a discount on your first order, and more.
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full md:w-64 h-10 font-bold rounded-none border-gray-400 bg-white text-black placeholder:text-gray-500"
            />
            <Button className="w-full md:w-auto bg-transparent border border-white text-white rounded-none px-8 py-2 hover:bg-white hover:text-black transition-colors">
              JOIN NOW 
              <div className="-translate-y-[0.05rem]">
                →
              </div>
            </Button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            We&apos;ll update you by email • SMS and you can unsubscribe at any time •{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="w-screen bg-white text-[#081336] border-t border-b border-gray-200">
        <div className="py-10 px-4 md:px-8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-13 gap-8 lg:gap-0">
            {/* Logo Section */}
            <div className="lg:col-start-2 lg:col-end-7 lg:row-start-1 lg:row-end-2 lg:absolute absolute -translate-y-22 sm:-translate-y-20 lg:-translate-y-26 left-0 lg:left-[5%] lg:translate-x-0 w-full lg:w-auto mb-8 lg:mb-0">
              <div className="flex justify-center lg:grid lg:grid-cols-2 gap-0 max-w-fit mx-auto border-0 md:border border-white lg:border-0 lg:max-w-none lg:mx-0">
                <Image 
                  alt="Jewelry showcase 1" 
                  src="/footerImg/1.jpeg" 
                  height={1000}
                  width={1000}
                  className={`object-cover h-40 min-[300px]:h-35 min-[330px]:h-40 min-[380px]:h-47 xs:h-50 w-auto sm:h-47 md:h-45 lg:h-50 lg:w-50 xl:h-52 xl:w-60 filter grayscale hover:grayscale-0 border-t md:border-0 border-l lg:border-t lg:border-l transition-all duration-700 ${
                    imagesLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
                  style={{ transitionDelay: '100ms' }}
                />
                <Image 
                  alt="Jewelry showcase 2" 
                  src="/footerImg/2.jpeg" 
                  height={1000}
                  width={1000}
                  className={`object-cover h-40 w-auto min-[300px]:h-35 min-[330px]:h-40 min-[380px]:h-47 sm:h-47 md:h-45 lg:h-50 lg:w-50 xl:h-52 xl:w-60 filter grayscale hover:grayscale-0 transition-all md:border-0 lg:border-t lg:border-r border-t border-r duration-700 ${
                    imagesLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
                  style={{ transitionDelay: '400ms' }}
                />
                <Image 
                  alt="Jewelry showcase 3" 
                  src="/footerImg/3.jpeg" 
                  height={1000}
                  width={1000}
                  className={`object-cover h-40 w-auto sm:h-40 min-[380px]:h-50 md:h-45 lg:h-50 lg:w-50 xl:h-52 xl:w-60 filter grayscale hover:grayscale-0 transition-all duration-700 md:border-0 border-l lg:border-l hidden md:block ${
                    imagesLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
                  style={{ transitionDelay: '700ms' }}
                />
                <Image 
                  alt="Jewelry showcase 4" 
                  src="/footerImg/5.jpeg" 
                  height={1000}
                  width={1000}
                  className={`object-cover h-40 w-auto sm:h-40 min-[380px]:h-50 md:border-0 border-r lg:border-r md:h-45 lg:h-50 lg:w-50 xl:h-52 xl:w-60 filter grayscale hover:grayscale-0 transition-all duration-700 hidden md:block ${
                    imagesLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
                  style={{ transitionDelay: '1000ms' }}
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-3">
                <div 
                  className="w-[102%] -translate-x-2 min-[310px]:text-xl min-[370px]:text-2xl min-[420px]:text-[1.8rem] md:text-5xl lg:text-[1.90rem] xl:text-[2.5rem] text-center text-white whitespace-nowrap [animation:reveal_5s_ease-out_forwards] [clip-path:inset(0_100%_0_0)]" 
                  style={{ 
                    fontFamily: "'Nothing You Could Do', cursive",
                    textShadow: '2px 2px 4px #000108',
                  }}
                >
                  Timeless Luxury Playfully Told
                </div>
              </div>
              
              <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap');
                
                @keyframes reveal {
                  to { clip-path: inset(0 0% 0 0); }
                }
              `}</style>
            </div>


            {/* Links Section */}
            <div className="lg:col-start-7 mt-23 min-[380px]:mt-35 md:mt-33 lg:mt-0 lg:col-end-13 lg:row-start-1 lg:row-end-2 space-y-0">
              {/* Shop Section */}
              <div className={`border-b border-gray-200 pb-6 transition delay-150 duration-1000 ease-in-out`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-base text-[#081336] font-medium">Shop</h3>
                  <button
                    onClick={() => toggleSection("Shop")}
                    className="flex items-center justify-center w-6 h-6 text-[#081336] focus:outline-none"
                    aria-label={expandedSections.includes("Shop") ? "Collapse" : "Expand"}
                  >
                    {expandedSections.includes("Shop") ? <Minus size={20} /> : <Plus size={20} />}
                  </button>
                </div>
                <ul
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedSections.includes("Shop") ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-3 mr-1.5 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
                    {shopLinks.map((items, key) => (
                      <li key={key} className={`${borderLog(key, shopLinks.length) ? "md:border-b" : "md:border-0"} ${key === shopLinks.length-1 ? "border-0" : "border-b"} pb-2 flex justify-between`}>
                        <Link href={items.href} className="text-gray-700 hover:underline">
                          {items.name}
                        </Link>
                        <GoArrowUpRight/>
                      </li>
                    ))}
                  </div>
                </ul>
              </div>

              {/* Service Section */}
              <div className={`border-b border-gray-200 py-6 transition delay-150 duration-300 ease-in-out`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-[#081336]">Service</h3>
                  <button
                    onClick={() => toggleSection("Service")}
                    className="flex items-center justify-center w-6 h-6 text-[#081336] focus:outline-none"
                    aria-label={expandedSections.includes("Service") ? "Collapse" : "Expand"}
                  >
                    {expandedSections.includes("Service") ? <Minus size={20} /> : <Plus size={20} />}
                  </button>
                </div>
                <ul
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedSections.includes("Service") ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-3 mr-1.5 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
                    {serviceLinks.map((items, key) => (
                      <li key={key} className={`${borderLog(key, serviceLinks.length) ? "md:border-b" : "md:border-0"} ${key === serviceLinks.length-1 ? "border-0" : "border-b"} pb-2 flex justify-between`}>
                        <Link href={items.href} className="text-gray-700 hover:underline">
                          {items.name}
                        </Link>
                        <GoArrowUpRight/>
                      </li>
                    ))}
                  </div>
                </ul>
              </div>

              {/* Company Section */}
              <div className={`pb-6 pt-6 transition delay-150 duration-1000 ease-in-out`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-[#081336]">Company</h3>
                  <button
                    onClick={() => toggleSection("Company")}
                    className="flex items-center justify-center w-6 h-6 text-[#081336] focus:outline-none"
                    aria-label={expandedSections.includes("Company") ? "Collapse" : "Expand"}
                  >
                    {expandedSections.includes("Company") ? <Minus size={20} /> : <Plus size={20} />}
                  </button>
                </div>
                <ul
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedSections.includes("Company") ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-3 mr-1.5 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
                    {companyLinks.map((items, key) => (
                      <li key={key} className={`${borderLog(key, companyLinks.length) ? "md:border-b" : "md:border-0"} ${key === companyLinks.length-1 ? "border-0" : "border-b"} pb-2 flex justify-between`}>
                        <Link href={items.href} className="text-gray-700 hover:underline">
                          {items.name}
                        </Link>
                        <GoArrowUpRight/>
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Social Icons Section */}
        <div className={` ${expandedSections.length === 0 ? 'lg:mt-24' : ''} transition-all duration-500 ease-in-out border-t border-gray-200 pt-8 pb-8`}>
          <div className="flex space-x-6 justify-center items-center">
            <Link target="_blank" href="https://www.facebook.com/share/1A7oTXbCpe/" aria-label="Facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-facebook hover:opacity-70 transition-opacity"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
              </svg>
            </Link>
            <Link
              target="_blank"
              href="https://www.instagram.com/raya_stories?igsh=bGgydXZoNzE2M253"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 hover:opacity-70 transition-opacity"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
            <Link target="_blank" href="https://pin.it/6nY94OeoY" aria-label="Pinterest">
              <svg
                height="20"
                width="20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 511.998 511.998"
                className="hover:opacity-70 transition-opacity"
              >
                <path
                  fill="#081336"
                  d="M405.017,52.467C369.774,18.634,321.001,0,267.684,0C186.24,0,136.148,33.385,108.468,61.39
                	c-34.114,34.513-53.675,80.34-53.675,125.732c0,56.993,23.839,100.737,63.76,117.011c2.68,1.098,5.377,1.651,8.021,1.651
                	c8.422,0,15.095-5.511,17.407-14.35c1.348-5.071,4.47-17.582,5.828-23.013c2.906-10.725,0.558-15.884-5.78-23.353
                	c-11.546-13.662-16.923-29.817-16.923-50.842c0-62.451,46.502-128.823,132.689-128.823c68.386,0,110.866,38.868,110.866,101.434
                	c0,39.482-8.504,76.046-23.951,102.961c-10.734,18.702-29.609,40.995-58.585,40.995c-12.53,0-23.786-5.147-30.888-14.121
                	c-6.709-8.483-8.921-19.441-6.222-30.862c3.048-12.904,7.205-26.364,11.228-39.376c7.337-23.766,14.273-46.213,14.273-64.122
                	c0-30.632-18.832-51.215-46.857-51.215c-35.616,0-63.519,36.174-63.519,82.354c0,22.648,6.019,39.588,8.744,46.092
                	c-4.487,19.01-31.153,132.03-36.211,153.342c-2.925,12.441-20.543,110.705,8.618,118.54c32.764,8.803,62.051-86.899,65.032-97.713
                	c2.416-8.795,10.869-42.052,16.049-62.495c15.817,15.235,41.284,25.535,66.064,25.535c46.715,0,88.727-21.022,118.298-59.189
                	c28.679-37.02,44.474-88.618,44.474-145.282C457.206,127.983,438.182,84.311,405.017,52.467z"
                />
              </svg>
            </Link>
            <Link target="_blank" href="https://x.com/raya_stories?t=0Vtsc_NnsdYBjFGn7a2NnQ&s=09" aria-label="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="currentColor"
                className="bi bi-twitter-x hover:opacity-70 transition-opacity"
                viewBox="0 0 16 16"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </Link>
            <Link target="_blank" href="https://youtube.com/@raya_stories?si=9GyNacZKoyVW2K9z" aria-label="YouTube">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 hover:opacity-70 transition-opacity"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}