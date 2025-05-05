"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface OtpPopupProps {
  onSubmit: () => void
  onClose: () => void
}

export default function OtpPopup({ onSubmit, onClose }: OtpPopupProps) {
  const [otp, setOtp] = useState("")

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

      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-[#01081c]">Enter OTP</h2>
        <p className="text-sm text-gray-500">We&apos;ve sent a verification code to your phone number</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp">OTP</Label>
          <Input
            id="otp"
            className="rounded-none "
            type="text"
            placeholder="Enter verification code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <Button className="w-full rounded-none bg-[#01081c]" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  )
}
