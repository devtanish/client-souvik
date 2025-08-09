'use client'
import Image from "next/image"
import Link from "next/link"
import { Heart } from 'lucide-react'
import { SlHandbag } from "react-icons/sl" // Assuming this is installed
import { cn } from "@/lib/utils" // Assuming this utility is available

// Define types for product and cart actions based on your provided file
interface Product {
  id: number
  name: string
  price: number
  images: string
  hoverImage?: string
  bestSeller: boolean
  material: string
  stone: string
  colors: string[] // Assuming this is for the metal color swatches
}

interface ProductGridItemProps {
  product: Product
  wishlist: number[]
  addToCart: (item: { id: string; name: string; price: number; image: string; material: string; stone: string }) => void
  addToWishlist: (item: { id: string; name: string; price: number; image: string; material: string }) => void
  removeFromWishlist: (id: string) => void
  cormorantGaramondClassName: string // Pass font class from parent
  montserratClassName: string // Pass font class from parent
  isMobile: boolean // Pass isMobile state from parent
}

export default function ProductGridItem({
  product,
  wishlist,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  cormorantGaramondClassName,
  montserratClassName,
  isMobile,
}: ProductGridItemProps) {
  // Map product.colors to metalOptions for the hover effect
  const metalOptions = product.colors.map(color => ({ color, label: color }))
  const displayedMetalOptions = metalOptions.slice(0, 4);
  const remainingMetalOptionsCount = metalOptions.length - displayedMetalOptions.length;

  return (
    <div key={product.id} className="group relative bg-white rounded-none overflow-hidden">
      {/* Wishlist button */}
      <button
        className={cn(
          "absolute top-2 right-2 z-2 p-1.5 rounded-full text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300", // Added opacity and group-hover classes
        )}
        onClick={() => {
          wishlist.includes(product.id)
            ? removeFromWishlist(product.id.toString())
            : addToWishlist({
                id: product.id.toString(),
                name: product.name,
                price: product.price,
                image: product.images,
                material: product.material,
              })
        }}
        aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={cn(
            "w-5 h-5 shadow-none", // Removed conflicting hover:hidden flex
            wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
          )}
        />
      </button>
      <div className="relative mb-2 bg-gray-50 aspect-[4/6] md:aspect-[5/6] overflow-hidden">
        {product.bestSeller && (
          <span className={cn(`absolute font-mono top-2 left-2  md:text-[10px] text-[8.5px] px-2 py-1 z-2`, montserratClassName)}>
            BEST SELLING
          </span>
        )}
        {!product.bestSeller && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-2">
            <span className="text-white font-medium text-sm">Out of Stock</span>
          </div>
        )}
        {/* Default image */}
        <Link target="_blank" href={`/shop/${product.name.toString()}`}>
          <Image
            src={product.images || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            fill
            className={cn("object-cover transition-opacity duration-300 ",
              product.hoverImage ? "group-hover:opacity-0" : "",
            )}
          />
          {/* Hover image (model wearing) */}
          {product.hoverImage && (
            <Image
              src={product.hoverImage || "/placeholder.svg?height=300&width=300"}
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
            disabled={!product.bestSeller}
            onClick={() => addToCart({ id: product.id.toString(), name: product.name, price: product.price, image: product.images, material: product.material, stone: product.stone })}
          >
            <SlHandbag size={16} />
            ADD TO BAG
          </button>
        </div>
      </div>
      <div className="px-3 pb-3">
        <div className="flex items-center justify-between mb-1">
          {/* This div will dynamically show either the name or the metal options */}
          <div className="relative h-5 overflow-hidden flex-1">
            {/* Product Name - visible by default, hidden on hover */}
            <h3 className={cn("absolute inset-0 text-sm font-medium leading-tight group-hover:opacity-0 transition-opacity duration-200", cormorantGaramondClassName)}>{product.name}</h3>
            {/* Metal options - hidden by default, visible on hover */}
            <div className="absolute inset-0 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {displayedMetalOptions.map((option, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundImage: option.color }}
                  title={option.label}
                />
              ))}
              {remainingMetalOptionsCount > 0 && (
                <span className="text-sm text-gray-500">+{remainingMetalOptionsCount}</span>
              )}
            </div>
          </div>
          {/* Price - always visible, aligned to the right */}
          <span className="font-semibold text-lg ml-4">${product.price}</span>
        </div>
        {/* Removed the second description line as per previous request */}
      </div>
    </div>
  )
}
