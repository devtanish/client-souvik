"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Cart({ params }: { params: Promise<{ product: string }> }) {

  const { cartItems, getCartCount, getCartTotal } = useCart()

  console.log(cartItems.length)

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    country: "",
    stateRegion: "",
    address: "",
    city: "",
    postalCode: "",
  })

  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [currentStep, setCurrentStep] = useState<"information" | "shipping" | "payment">("information")
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "card">("paypal")

  const handleApplyCoupon = () => {
    // Simple coupon validation - you can expand this
    if (couponCode.toUpperCase() === "SAVE10") {
      setAppliedCoupon({ code: couponCode, discount: 18 }) // 10% discount
    } else if (couponCode.toUpperCase() === "WELCOME20") {
      setAppliedCoupon({ code: couponCode, discount: 36 }) // 20% discount
    }
  }

  const subtotal = 180
  const discount = appliedCoupon?.discount || 0
  const total = subtotal - discount

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-full bg-gray-100">
      <div className="mt-15 md:mt-27 mb-10 w-full bg-white min-h-full">
        <div className="px-4 py-6 lg:px-16 lg:pt-13">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6">CHECKOUT</h1>

            {/* Progress Steps */}
            <div className="flex gap-8 text-sm">
              <button
                onClick={() => setCurrentStep("information")}
                className={`font-semibold pb-1 ${currentStep === "information"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                INFORMATION
              </button>
              <button
                onClick={() => setCurrentStep("shipping")}
                className={`pb-1 ${currentStep === "shipping"
                    ? "text-black border-b-2 border-black font-semibold"
                    : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                SHIPPING
              </button>
              <button
                onClick={() => setCurrentStep("payment")}
                className={`pb-1 ${currentStep === "payment"
                    ? "text-black border-b-2 border-black font-semibold"
                    : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                PAYMENT
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-24">
            {/* Left Column - Form */}
            <div className="space-y-5">
              {currentStep === "information" && (
                <>
                  {/* Contact Info */}
                  <div>
                    <h2 className="text-sm font-semibold mb-4 tracking-wide">CONTACT INFO</h2>
                    <div className="space-y-4">
                      <div>
                        <Input
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="border-gray-300 rounded-none h-12"
                        />
                      </div>
                      <div>
                        <Input
                          placeholder="Phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="border-gray-300 rounded-none h-12"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h2 className="text-sm font-semibold mb-4 tracking-wide">SHIPPING ADDRESS</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="border-gray-300 rounded-none h-12"
                        />
                        <Input
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="border-gray-300 rounded-none h-12"
                        />
                      </div>

                      <Select onValueChange={(value) => handleInputChange("country", value)}>
                        <SelectTrigger className="border-gray-300 rounded-none h-12">
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        placeholder="State / Region"
                        value={formData.stateRegion}
                        onChange={(e) => handleInputChange("stateRegion", e.target.value)}
                        className="border-gray-300 rounded-none h-12"
                      />

                      <Input
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="border-gray-300 rounded-none h-12"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className="border-gray-300 rounded-none h-12"
                        />
                        <Input
                          placeholder="Postal Code"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange("postalCode", e.target.value)}
                          className="border-gray-300 rounded-none h-12"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Continue to Shipping Button */}
                  <Button
                    onClick={() => setCurrentStep("shipping")}
                    className="bg-gray-800 hover:bg-gray-900 text-white rounded-none h-12 px-8 flex items-center gap-2"
                  >
                    Continue to Shipping
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </>
              )}

              {currentStep === "shipping" && (
                <>
                  <div>
                    <h2 className="text-sm font-semibold mb-4 tracking-wide">SHIPPING METHOD</h2>
                    <div className="border border-gray-300 p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Standard Shipping</p>
                          <p className="text-sm text-gray-600">5-7 business days</p>
                        </div>
                        <span className="font-medium">Free</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => setCurrentStep("information")}
                      variant="outline"
                      className="border-gray-300 rounded-none h-12 px-8 flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Information
                    </Button>
                    <Button
                      onClick={() => setCurrentStep("payment")}
                      className="bg-gray-800 hover:bg-gray-900 text-white rounded-none h-12 px-8 flex items-center gap-2"
                    >
                      Continue to Payment
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}

              {currentStep === "payment" && (
                <>
                  {/* Payment Method Selection */}
                  <div>
                    <h2 className="text-lg font-medium mb-6 text-gray-700">Choose payment method</h2>
                    <div className="space-y-0">
                      {/* PayPal Option */}
                      <div className="border-b border-gray-200 pb-4 mb-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={paymentMethod === "paypal"}
                            onChange={(e) => setPaymentMethod(e.target.value as "paypal" | "card")}
                            className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                          />
                          <span className="ml-3 text-gray-600">Paypal</span>
                        </label>
                      </div>

                      {/* Visa/Mastercard Option */}
                      <div className="border-b border-gray-200 pb-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={(e) => setPaymentMethod(e.target.value as "paypal" | "card")}
                            className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                          />
                          <span className="ml-3 text-gray-600">Visa/Mastercard</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => setCurrentStep("shipping")}
                      variant="outline"
                      className="border-gray-300 rounded-none h-12 px-8 flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Shipping
                    </Button>
                    <Button className="bg-gray-800 hover:bg-gray-900 text-white rounded-none h-12 px-8 flex items-center gap-2">
                      Complete Order
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:pl-16">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold tracking-wide">YOUR ORDER</h2>
                <span className="text-sm">{cartItems.length}</span>
              </div>

              {cartItems.length != 0 &&
                <div className="space-y-6">
                  {/* Product 1 */}
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="Basic Heavy T-Shirt"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="text-sm font-medium">Basic Heavy T-Shirt</h3>
                          <p className="text-sm text-gray-600">Black/L</p>
                        </div>
                        <button className="text-sm underline">Change</button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">(1)</span>
                        <span className="text-sm font-medium">$90</span>
                      </div>
                    </div>
                  </div>

                  {/* Product 2 */}
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="Basic Fit T-Shirt"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="text-sm font-medium">Basic Fit T-Shirt</h3>
                          <p className="text-sm text-gray-600">Black/L</p>
                        </div>
                        <button className="text-sm underline">Change</button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">(1)</span>
                        <span className="text-sm font-medium">$90</span>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Code Block */}
                  <div className="border-t pt-4 pb-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="border-gray-300 rounded-none h-10 flex-1"
                      />
                      <Button
                        onClick={handleApplyCoupon}
                        variant="outline"
                        className="border-gray-300 rounded-none h-10 px-4 hover:bg-gray-50 bg-transparent"
                      >
                        Apply
                      </Button>
                    </div>
                    {appliedCoupon && (
                      <div className="mt-2 text-sm text-green-600">
                        Coupon &quot;{appliedCoupon.code}&quot; applied successfully!
                      </div>
                    )}
                  </div>

                  {/* Order Summary */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount ({appliedCoupon.code})</span>
                        <span>-${appliedCoupon.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-gray-500">Calculated at next step</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              }
              <div className="space-y-6">
                {/* Product 1 */}
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                    <Image
                      src="/product/girl.avif"
                      alt="Basic Heavy T-Shirt"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-sm font-medium">Basic Heavy T-Shirt</h3>
                        <p className="text-sm text-gray-600">Black/L</p>
                      </div>
                      <button className="text-sm underline">Change</button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">(1)</span>
                      <span className="text-sm font-medium">$90</span>
                    </div>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                    <Image
                      src="/product/ring.avif"
                      alt="Basic Fit T-Shirt"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-sm font-medium">Basic Fit T-Shirt</h3>
                        <p className="text-sm text-gray-600">Black/L</p>
                      </div>
                      <button className="text-sm underline">Change</button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">(1)</span>
                      <span className="text-sm font-medium">$90</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Code Block */}
                <div className="border-t pt-4 pb-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="border-gray-300 rounded-none h-10 flex-1"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      variant="outline"
                      className="border-gray-300 rounded-none h-10 px-4 hover:bg-gray-50 bg-transparent"
                    >
                      Apply
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-2 text-sm text-green-600">
                      Coupon &quot;{appliedCoupon.code}&quot; applied successfully!
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-${appliedCoupon.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-gray-500">Calculated at next step</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
