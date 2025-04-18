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
              {company.map((items, key)=> (
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
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
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
            <Link href="https://youtube.com/@raya_stories?si=9GyNacZKoyVW2K9z" aria-label="YouTube">
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
