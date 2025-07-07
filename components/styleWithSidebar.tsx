"use client"

import { useState, useEffect, useRef } from "react"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { ScrollArea } from "./ui/scroll-area"
import { Heart, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

interface Product {
    id: number
    productId: number
    name: string
    price: number
    imgURL: string
    hoverImage?: string
    url: string
    bestSeller?: boolean
    colors: string[]
    material: string
    stone?: string
    inStock?: boolean
}

// Define a more specific type for cart items
interface CartItem {
    id: string
    name: string
    price: number
    image: string
    material: string
    stone?: string
}

// Updated interface to be more flexible and match the actual data structure
interface ProductCarouselProps {
    productcat?: {
        styleWith?: Product[]
        // Allow any other properties that might exist on productcat
        [key: string]: unknown
    }
    setShowSidebar: (show: boolean) => void
    showSidebar: boolean
}

export default function StyleWithSidebar({ productcat, setShowSidebar, showSidebar }: ProductCarouselProps) {
    const { addToCart } = useCart()
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)
    const [wishlist, setWishlist] = useState<string[]>([])
    const scrollRef = useRef<HTMLDivElement>(null)

    const products = productcat?.styleWith

    const toggleWishlist = (productId: number) => {
        setWishlist((prev) =>
            prev.includes(productId.toString())
                ? prev.filter((id) => id !== productId.toString())
                : [...prev, productId.toString()],
        )
    }

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            setShowLeftArrow(scrollLeft > 0)
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })
        }
    }

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: "smooth" })
        }
    }

    useEffect(() => {
        handleScroll()
    }, [])

    return (
        <div>
            {showSidebar && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                        onClick={() => setShowSidebar(false)}
                    />

                    {/* Sidebar */}
                    <div
                        className={`fixed top-0 right-0 bottom-0 bg-white z-50 transform transition-transform duration-300 ease-out ${showSidebar ? "translate-x-0" : "translate-x-full"
                            } shadow-2xl w-full max-w-lg`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
                            <h2 className="font-semibold text-lg">Style With ({products?.length || 0} items)</h2>
                            <Button onClick={() => setShowSidebar(false)} size="icon" variant="ghost" className="">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Content */}
                        <ScrollArea className="flex-1 h-[calc(100vh-80px)]">
                            <div className="p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {products &&
                                        products.map((product) => (
                                            <div key={product.id} className="group relative">

                                                <div className="relative mb-2 bg-gray-50 aspect-[5/6] overflow-hidden ">
                                                    {product.bestSeller && (
                                                        <span className="absolute top-2 left-2 bg-white text-[8.5px] px-2 py-1 z-10 font-mono">
                                                            BEST SELLING
                                                        </span>
                                                    )}

                                                    {!product.inStock && (
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                                                            <span className="text-white font-medium text-sm">Out of Stock</span>
                                                        </div>
                                                    )}

                                                    {/* Default image */}
                                                    <Link href={product.url} onClick={() => setShowSidebar(false)}>
                                                        <Image
                                                            src={product.imgURL || "/placeholder.svg?height=300&width=300"}
                                                            alt={product.name}
                                                            fill
                                                            className={cn(
                                                                "object-cover transition-opacity duration-300",
                                                                product.hoverImage ? "group-hover:opacity-0" : "",
                                                            )}
                                                        />

                                                        {/* Hover image */}
                                                        {product.hoverImage && (
                                                            <Image
                                                                src={product.hoverImage || "/placeholder.svg"}
                                                                alt={`${product.name} worn`}
                                                                fill
                                                                className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                            />
                                                        )}
                                                    </Link>

                                                    {/* Add to bag button */}
                                                    <div className="absolute bottom-0 left-0 right-0 bg-white py-2 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                        <button
                                                            className="w-full text-center text-sm font-medium flex items-center justify-center gap-2"
                                                            disabled={!product.inStock}
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                addToCart({
                                                                    id: product.id.toString(),
                                                                    name: product.name,
                                                                    price: product.price,
                                                                    image: product.imgURL,
                                                                    material: product.material,
                                                                    stone: product.stone,
                                                                })
                                                            }}
                                                        >
                                                            <ShoppingBag size={16} />
                                                            ADD TO BAG
                                                        </button>
                                                    </div>
                                                </div>

                                                <Link href={product.url} onClick={() => setShowSidebar(false)}>
                                                    <h3 className="font-medium text-sm mb-0.5">{product.name}</h3>
                                                    <p className="text-gray-700 text-sm mb-0.5">${product.price}</p>

                                                    <div className="flex gap-1 mb-0.5">
                                                        {product.colors.map((color, index) => (
                                                            <button
                                                                key={index}
                                                                className="w-3 h-3 rounded-full border hover:ring-1 hover:ring-offset-1 hover:ring-gray-400"
                                                                style={{ backgroundImage: color }}
                                                                aria-label={`Color option ${index + 1}`}
                                                            />
                                                        ))}
                                                    </div>

                                                    <p className="text-xs text-gray-500">{product.material}</p>
                                                </Link>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                </>
            )}
        </div>
    )
}
