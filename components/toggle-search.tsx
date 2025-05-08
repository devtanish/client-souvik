"use client"

import { useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToggleSearchProps {
  className?: string
  buttonClassName?: string
  inputClassName?: string
}

export default function ToggleSearch({ className = "", buttonClassName = "", inputClassName = "" }: ToggleSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const toggleSearch = () => {
    setIsOpen(!isOpen)
  }

  // Focus the input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  return (
    <div className={cn("relative flex items-center", className)}>
      

      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "w-66.5 opacity-100 ml-2" : "w-0 opacity-0"}
        `}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className={cn(
            "w-full h-10 px-4 py-2 text-sm bg-white border-b border-gray-200  focus:outline-none focus:ring-2 focus:ring-gray-200",
            inputClassName,
          )}
          aria-hidden={!isOpen}
          tabIndex={isOpen ? 0 : -1}
        />
      </div>
      <button
        onClick={toggleSearch}
        className={cn(
          "flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-100 transition-colors duration-200",
          buttonClassName,
        )}
        aria-label={isOpen ? "Close search" : "Open search"}
      >
        <Search className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  )
}
