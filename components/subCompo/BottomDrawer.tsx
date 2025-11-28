"use client"

import type React from "react"
import { type ReactNode, useEffect, useRef } from "react"
import { X } from "lucide-react"

interface BottomDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  showHandle?: boolean
  showCloseButton?: boolean
  height?: string
  className?: string
  overlayClassName?: string
  contentClassName?: string
  closeOnOverlayClick?: boolean
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
  showHandle = true,
  showCloseButton = true,
  height = "50vh",
  className = "",
  overlayClassName = "",
  contentClassName = "",
  closeOnOverlayClick = true,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)

  // Disable background scroll when drawer is open
  useEffect(() => {
    const html = document.documentElement
    const prev = {
      bodyOverflow: document.body.style.overflow,
      bodyPosition: document.body.style.position,
      bodyTop: document.body.style.top,
      htmlOverflow: html.style.overflow,
    }

    let scrollY = 0

    if (isOpen) {
      scrollY = window.scrollY
      document.body.style.top = `-${scrollY}px`
      document.body.style.position = "fixed"
      document.body.style.overflow = "hidden"
      html.style.overflow = "hidden"
    } else {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.overflow = ""
      html.style.overflow = ""
    }

    return () => {
      const top = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.overflow = prev.bodyOverflow
      html.style.overflow = prev.htmlOverflow

      // restore scroll position if it was locked
      if (top) {
        const y = Number.parseInt(top || "0", 10) * -1
        window.scrollTo(0, y)
      }
    }
  }, [isOpen])

  // Add global wheel/touch lock while open, except inside drawer content
  useEffect(() => {
    if (!isOpen) return

    const preventOutside = (e: WheelEvent | TouchEvent) => {
      const el = contentRef.current
      // If we don't have the content node, block scrolling globally
      if (!el) {
        e.preventDefault()
        return
      }
      const target = e.target as Node
      // Allow default only when the event originated inside the drawer content;
      // the drawer content will handle its own scroll (and edge cases) below.
      if (el.contains(target)) return

      // Otherwise, prevent so the background never scrolls.
      e.preventDefault()
    }

    window.addEventListener("wheel", preventOutside, { passive: false })
    window.addEventListener("touchmove", preventOutside, { passive: false })

    return () => {
      window.removeEventListener("wheel", preventOutside as EventListener)
      window.removeEventListener("touchmove", preventOutside as EventListener)
    }
  }, [isOpen])

  // Prevent scroll propagation from drawer to body
  const handleWheel = (e: React.WheelEvent) => {
    const el = contentRef.current
    if (!el) return

    const { scrollTop, scrollHeight, clientHeight } = el
    const delta = e.deltaY

    if ((delta > 0 && scrollTop + clientHeight >= scrollHeight) || (delta < 0 && scrollTop <= 0)) {
      e.preventDefault() // Stop scrolling beyond content
    }
  }

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose()
    }
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={handleOverlayClick}
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
          className={` fixed inset-0 bg-black/30 backdrop-blur-xs z-40 transition-opacity duration-300 ${overlayClassName}`}
        />
      )}

      {/* Drawer */}
      <div
        className={`bg-gradient-to-b bg-white fixed bottom-0 left-0 right-0  shadow-2xl z-50 transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } ${className}`}
        // style={{ height }}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Handle */}
          {showHandle && (
            <div className="">
              <div className="" />
            </div>
          )}

          {/* Close Button */}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-3 z-40 right-3 p-2 hover:bg-gray-100 transition-colors"
              aria-label="Close drawer"
            >
              <X size={24} className="text-gray-600" />
            </button>
          )}

          {/* Title */}
          {title && (
            <div className="px-6 pt-0 pb-2 shrink-0">
              <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>
          )}

          {/* Drawer Content (Scrollable) */}
          <div
            ref={contentRef}
            onWheel={handleWheel}
            style={{ overscrollBehavior: "contain" }}
            className={`flex-1 px-4 lg:px-6 mt-1 py-4 overflow-y-auto pb-8 ${contentClassName}`}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default BottomDrawer
