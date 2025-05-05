"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import LoginPopup from "@/components/login-popup"
import OtpPopup from "@/components/otp-popup"

export default function Home() {
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [showOtpPopup, setShowOtpPopup] = useState(false)

  const handleLoginClick = () => {
    setShowLoginPopup(true)
  } 

  const handleVerifyClick = () => {
    setShowLoginPopup(false)
    setShowOtpPopup(true)
  }

  const handleOtpSubmit = () => {
    setShowOtpPopup(false)
    // Handle successful authentication here
  }

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false)
  }

  const handleCloseOtpPopup = () => {
    setShowOtpPopup(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-200">
      {/* Example of button that could be positioned anywhere */}
      <div className="absolute ">
        <Button className="rounded-none bg-[#01081c]" onClick={handleLoginClick}>Login</Button>
      </div>

      {/* Modal backdrop and container - fixed positioning ensures it's always centered */}
      {(showLoginPopup || showOtpPopup) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm transition-all">
          <div
            className={`transform transition-all duration-300 ease-in-out ${
              showLoginPopup || showOtpPopup ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            {showLoginPopup && <LoginPopup onVerify={handleVerifyClick} onClose={handleCloseLoginPopup} />}
            {showOtpPopup && <OtpPopup onSubmit={handleOtpSubmit} onClose={handleCloseOtpPopup} />}
          </div>
        </div>
      )}
    </main>
  )
}
