"use client"

import { useCart } from "@/contexts/cart-context"
import { X, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

const recommendedProducts = [
  {
    id: "2",
    name: "Mini Hoop",
    price: 68,
    image: "/jwel/1.avif",
    material: "14k Yellow Gold",
  },
  {
    id: "3",
    name: "Classic Chain",
    price: 95,
    image: "/jwel/5.avif",
    material: "Sterling Silver",
  },
]

export default function CartSidebar() {
  const {
    isCartOpen,
    setIsCartOpen,
    activeTab,
    setActiveTab,
    cartItems,
    wishlistItems,
    removeFromCart,
    updateQuantity,
    moveToWishlist,
    addToCart,
    removeFromWishlist,
    getCartTotal,
    getCartCount,
    getWishlistCount,
  } = useCart()

  if (!isCartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className={`${inter.className} fixed inset-0 bg-black/50 z-40`} onClick={() => setIsCartOpen(false)} />

      {/* Sidebar */}
      <div className={`fixed right-0 top-7 md:top-8 h-full w-full max-w-xl bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${inter.className}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("bag")}
                  className={cn(
                    "text-sm font-medium pb-2 border-b-2 transition-colors",
                    activeTab === "bag"
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700",
                  )}
                >
                  BAG ({getCartCount()})
                </button>
                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={cn(
                    "text-sm font-medium pb-2 border-b-2 transition-colors",
                    activeTab === "wishlist"
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700",
                  )}
                >
                  WISHLIST ({getWishlistCount()})
                </button>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)} className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {activeTab === "bag" && cartItems.length > 0 && (
              <div className="bg-green-100 text-green-800 text-sm p-2 text-center">
                Enjoy free expedited shipping!
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "bag" ? (
              <div className="p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">Your bag is empty</div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                            <div>Material: {item.material}</div>
                            {item.stone && <div>Stone: {item.stone}</div>}
                            {item.length && <div>Length: {item.length}</div>}
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-sm font-medium">CA${item.price}</div>
                          </div>
                          <div className="flex gap-4 mt-2">
                            <button
                              onClick={() => moveToWishlist(item.id)}
                              className="text-xs text-gray-600 hover:text-gray-800 underline"
                            >
                              Move to wishlist
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-xs text-gray-600 hover:text-gray-800 underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Sold out message */}
                    <div className="bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
                      Sold out sucks—act fast before these styles sell out.
                    </div>

                    {/* Recommendations */}
                    <div className="mt-8">
                      <h3 className="text-sm font-medium text-gray-600 mb-4">YOU MAY ALSO LIKE</h3>
                      <div className="space-y-4">
                        {recommendedProducts.map((product) => (
                          <div key={product.id} className="flex gap-4 p-3 border">
                            <div className="w-16 h-16 bg-gray-100 flex-shrink-0">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{product.name}</h4>
                              <div className="text-xs text-gray-600 mt-1">Material: {product.material}</div>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-sm">From CA${product.price}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs h-7"
                                  onClick={() =>
                                    addToCart({
                                      id: product.id,
                                      name: product.name,
                                      price: product.price,
                                      image: product.image,
                                      material: product.material,
                                    })
                                  }
                                >
                                  Add item
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-4">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4">
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">Your wishlist is empty</div>
                ) : (
                  <div className="space-y-4">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 border ">
                        <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <div className="text-xs text-gray-600 mt-1">Material: {item.material}</div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm">CA${item.price}</span>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-7"
                                onClick={() => {
                                  addToCart({
                                    id: item.id,
                                    name: item.name,
                                    price: item.price,
                                    image: item.image,
                                    material: item.material,
                                  })
                                  removeFromWishlist(item.id)
                                }}
                              >
                                Add to bag
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs h-7"
                                onClick={() => removeFromWishlist(item.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer - Checkout Summary */}
          {activeTab === "bag" && cartItems.length > 0 && (
            <div className="border-t bg-gray-50 p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>CA${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>-</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-xs">Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Estimated Total</span>
                  <span>CA${getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <Button className=" rounded-none w-full mt-4 bg-black hover:bg-gray-900 text-white">CHECKOUT</Button>

              <div className="text-xs text-center mt-2 text-gray-600">
                4 payments of $42.00 with <strong>afterpay</strong> or <strong>Klarna.</strong>{" "}
                <button className="underline">Learn More</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
