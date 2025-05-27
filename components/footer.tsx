import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { shop, customeService, company } from "./interface-contents/footerContents"
import { Roboto } from "next/font/google"

const robotoMedium = Roboto({
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
})

const robotoBold = Roboto({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
})

export default function Footer() {
  return (
    <footer className={`w-full border-t bg-[#fffef2] border-t-black ${robotoMedium.className}`}>
      <div className=" md:mx-15 py-10">
        <div className="grid grid-cols-1 md:gap-7 gap-7 xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-6 pb-6 text-[#081336] pl-1">
          {/* Newsletter Signup */}
          <div className="col-span-1 md:col-span-3 ">
            <h3 className={`mb-4 text-xl ${robotoMedium.className}`}>Sign up to Our Newsletter</h3>
            <div className="space-y-2">
              <label htmlFor="email" className={`text-sm ${robotoBold.className}`}>
                Email<span className="text-black pb-1">*</span>
              </label>
              <div className="flex w-full max-w-sm flex-col space-y-2  gap-2.5 mt-2 ">
                <Input type="email" id="email" placeholder="Email" className="h-10 bg-[#ffffff] w-20/21 lg:w-21/21 md:w-6/7 xl:w-20/17 rounded-none border-black" />
                <Button variant="outline" className="w-fit bg-[#ffffff] border-black rounded-none px-8 py-5">
                  Submit
                </Button>
              </div>
            </div>
          </div>

          <div className="sm:visible hidden">

          </div>

          {/* Shop Links */}
          <div className="md:mt-6">
            <h3 className="mb-2 text-lg font-medium text-[#081336] lg:pb-0">Shop</h3>
            <ul className="space-y-2 text-sm text-[#081336]">
              {shop.map((items, key) => (
                <li key={key}>
                  <Link href={items.href ? `${items.href}` : `/${(items.name).toLowerCase().replace(/\s+/g, "-")}`} className="hover:underline">
                    {items.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Links */}
          <div className="md:mt-6 md:-translate-x-3 translate-x-0">
            <h3 className="mb-2 text-lg font-medium text-[#081336]">Service</h3>
            <ul className="space-y-2 text-sm text-[#081336]">
              {customeService.map((items, key) => (
                <li key={key}>
                  <Link href={items.href ? `${items.href}` : `/${(items.name).replace(/\s+/g, "-").toLowerCase()}`} className="hover:underline">
                    {items.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div className="md:mt-6 ">
            <h3 className="mb-2 text-lg font-medium text-[#081336]">Company</h3>
            <ul className="space-y-2 text-sm text-[#081336]">
              {company.map((items, key) => (
                <li key={key}>
                  <Link href={items.href ? `${items.href}` : `/${(items.name).replace(/\s+/g, "-").toLowerCase()}`} className="hover:underline">
                    {items.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section with Logo and Social Icons */}
        <div className="md:mt-12 mt-2 align-middle border-t pt-8 ">
          <div className="flex space-x-4 justify-center align-middle">
            <Link target="_blank" href="https://www.facebook.com/share/1A7oTXbCpe/" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                fill="currentColor" 
                className="bi bi-facebook" 
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
              </svg>
            </Link>
            <Link target="_blank" href="https://www.instagram.com/raya_stories?igsh=bGgydXZoNzE2M253" aria-label="Instagram">
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
                className="h-5 w-5"
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
              id="Layer_1" 
              xmlns="http://www.w3.org/2000/svg" 
	            viewBox="0 0 511.998 511.998" >
                <path className="fill-[#0a0a0a]" d="M405.017,52.467C369.774,18.634,321.001,0,267.684,0C186.24,0,136.148,33.385,108.468,61.39
                	c-34.114,34.513-53.675,80.34-53.675,125.732c0,56.993,23.839,100.737,63.76,117.011c2.68,1.098,5.377,1.651,8.021,1.651
                	c8.422,0,15.095-5.511,17.407-14.35c1.348-5.071,4.47-17.582,5.828-23.013c2.906-10.725,0.558-15.884-5.78-23.353
                	c-11.546-13.662-16.923-29.817-16.923-50.842c0-62.451,46.502-128.823,132.689-128.823c68.386,0,110.866,38.868,110.866,101.434
                	c0,39.482-8.504,76.046-23.951,102.961c-10.734,18.702-29.609,40.995-58.585,40.995c-12.53,0-23.786-5.147-30.888-14.121
                	c-6.709-8.483-8.921-19.441-6.222-30.862c3.048-12.904,7.205-26.364,11.228-39.376c7.337-23.766,14.273-46.213,14.273-64.122
                	c0-30.632-18.832-51.215-46.857-51.215c-35.616,0-63.519,36.174-63.519,82.354c0,22.648,6.019,39.588,8.744,46.092
                	c-4.487,19.01-31.153,132.03-36.211,153.342c-2.925,12.441-20.543,110.705,8.618,118.54c32.764,8.803,62.051-86.899,65.032-97.713
                	c2.416-8.795,10.869-42.052,16.049-62.495c15.817,15.235,41.284,25.535,66.064,25.535c46.715,0,88.727-21.022,118.298-59.189
                	c28.679-37.02,44.474-88.618,44.474-145.282C457.206,127.983,438.182,84.311,405.017,52.467z"/>
                </svg>
            </Link>
            <Link target="_blank" href="https://x.com/raya_stories?t=0Vtsc_NnsdYBjFGn7a2NnQ&s=09" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" 
                width="19" 
                height="19" 
                fill="currentColor" 
                className=" bi bi-twitter-x" 
                viewBox="0 0 16 16"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </Link>
            <Link target="_blank" href="https://youtube.com/@raya_stories?si=9GyNacZKoyVW2K9z" aria-label="YouTube">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
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
