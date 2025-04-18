import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { shop, customeService, company } from "./interface-contents/footerContents"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Newsletter Signup */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-lg font-medium">Sign up to Our Newsletter</h3>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email<span className="text-red-500">*</span>
              </label>
              <div className="flex w-full max-w-sm flex-col space-y-2">
                <Input type="email" id="email" placeholder="Email" className="h-10 border-gray-300" />
                <Button variant="outline" className="w-fit border-gray-300 px-6">
                  Submit
                </Button>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Shop</h3>
            <ul className="space-y-2 text-sm">
              {shop.map((items, key) => (
                <li key={key}>
                  <Link href={items.href ? `${items.href}` : `/${items.name}`} className="hover:underline">
                    {items.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              {customeService.map((items, key) => (
                <li key={key}>
                  <Link href={items.href ? `${items.href}` : `/${items.name}`} className="hover:underline">
                    {items.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              {company.map((items, key) => (
                <li key={key}>
                  <Link href={items.href ? `${items.href}` : `/${items.name}`} className="hover:underline">
                    {items.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section with Logo and Social Icons */}
        <div className="mt-12 flex flex-col items-start justify-center border-t pt-8 md:flex-row md:items-center">
          <div className="flex space-x-4">
            <Link href="https://www.facebook.com/share/1A7oTXbCpe/" aria-label="Facebook">
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
            <Link href="https://www.instagram.com/raya_stories?igsh=bGgydXZoNzE2M253" aria-label="Instagram">
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
            <Link href="https://x.com/raya_stories?t=0Vtsc_NnsdYBjFGn7a2NnQ&s=09" aria-label="Twitter">
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
            <Link href="https://youtube.com/@raya_stories?si=9GyNacZKoyVW2K9z" aria-label="YouTube">
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
            <Link href="https://pin.it/6nY94OeoY" aria-label="Pinterest">
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
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
