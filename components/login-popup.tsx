"use client"

import { useState } from "react"
import { Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

interface LoginPopupProps {
  onVerify: () => void
  onClose: () => void
}

export default function LoginPopup({ onVerify, onClose }: LoginPopupProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="relative w-full max-w-md rounded-none bg-white p-6 shadow-lg animate-in fade-in zoom-in duration-300">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      <div className=" flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
          <Clock className="h-6 w-6 text-gray-600" />
        </div>
      </div>

      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold">Welcome back</h2>
        <p className="text-sm text-gray-500">Enter your credentials to login to your account.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            className="rounded-none border-gray-300"
            type="tel"
            placeholder="+91 9876543210"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              className="rounded-none"
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember me
            </Label>
          </div>

          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>

        <Button className="w-full rounded-none" onClick={onVerify}>
          Verify
        </Button>

        <div className="relative my-4 mt-0">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
            Or
          </span>
        </div>

        <Button variant="outline" className="w-full rounded-none">
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Login with Google
        </Button>

        <div className=" text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Signup
          </a>
        </div>
      </div>
    </div>
  )
}
