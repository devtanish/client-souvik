"use client"

import { useState } from "react"
import { LuSearch } from "react-icons/lu"

export default function ToggleSearch2() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      <LuSearch size={20} className="mt-2 mr-2" />
    </button>
  )
}