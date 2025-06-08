"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  material: string
  stone?: string
  length?: string
  quantity: number
}

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  material: string
}

interface CartContextType {
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  activeTab: "bag" | "wishlist"
  setActiveTab: (tab: "bag" | "wishlist") => void
  cartItems: CartItem[]
  wishlistItems: WishlistItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  moveToWishlist: (id: string) => void
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  getCartTotal: () => number
  getCartCount: () => number
  getWishlistCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"bag" | "wishlist">("bag")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id)
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const moveToWishlist = (id: string) => {
    const item = cartItems.find((item) => item.id === id)
    if (item) {
      const wishlistItem: WishlistItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        material: item.material,
      }
      addToWishlist(wishlistItem)
      removeFromCart(id)
    }
  }

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prev) => {
      const existing = prev.find((wishlistItem) => wishlistItem.id === item.id)
      if (!existing) {
        return [...prev, item]
      }
      return prev
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const getWishlistCount = () => {
    return wishlistItems.length
  }

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        activeTab,
        setActiveTab,
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        moveToWishlist,
        addToWishlist,
        removeFromWishlist,
        getCartTotal,
        getCartCount,
        getWishlistCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
