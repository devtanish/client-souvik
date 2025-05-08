"use client"

import { useState } from "react"
import { MessageSquare } from "lucide-react"
import Link from "next/link"

interface WhatsAppChatButtonProps {
  phoneNumber: string
  notificationCount?: number
  message?: string
}

export default function WhatsAppChatButton({
  phoneNumber,
  notificationCount = 1,
  message = "Hello, I have a question!",
}: WhatsAppChatButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  // Format phone number by removing any non-digit characters
  const formattedPhoneNumber = phoneNumber.replace(/\D/g, "")

  // Construct WhatsApp URL
  const whatsappUrl = `https://wa.me/${formattedPhoneNumber}?text=${encodeURIComponent(message)}`

  const handleClick = () => {
    setIsAnimating(true)

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  return (
    <div className="fixed bottom-6 right-6 z-0">
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`
          relative flex items-center justify-center
          w-16 h-16 rounded-full bg-[#171717]
          text-white shadow-lg
          hover:bg-[#2e2e2e] transition-all duration-300
          ${isAnimating ? "scale-110" : "scale-100"}
          hover:scale-105 active:scale-95
        `}
      >
        <MessageSquare size={24} />

        {/* Notification Badge */}
        {notificationCount > 0 && (
          <div className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
            {notificationCount}
          </div>
        )}
      </Link>
    </div>
  )
}
