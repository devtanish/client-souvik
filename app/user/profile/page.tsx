"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import { Gift, ChevronDown } from "lucide-react"
import { useState } from "react"

export default function Profile() {
    const [activeTab, setActiveTab] = useState("PROFILE")
    const [expandedSections, setExpandedSections] = useState<string[]>([])

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
    }

    const tabs = ["PROFILE", "MEMBERSHIP PERKS", "ORDERS", "ADDRESSES", "STORE CREDIT & GIFT CARDS", "WISHLIST"]

    const membershipPerks = [
        {
            title: "PRIORITY SALE ACCESS",
            description:
                "Members get exclusive access to shop our sales first, before the general public. Because we know sold out sucks. Priority sale access is available online, in-app or store.",
        },
        {
            title: "BIRTHDAY TREAT",
            description:
                "During your birthday month, you'll receive an exclusive perk just for you which you will be able to redeem, in-store, and in the app.",
        },
        {
            title: "FREE SHIPPING EVERY MONDAY",
            description:
                "Members get free shipping every Monday, with no minimum spend required. Just in time for our new arrivals.",
        },
        {
            title: "EXCLUSIVE PRODUCT ACCESS",
            description:
                "Members get exclusive access to shop limited-edition products, available to shop online, in-app or in-store.",
        },
    ]

    return (
        <div className="mt-23 md:mt-40 w-screen  mb-20">
            <div className="md:mt-0 lg:mx-15 md:mx-10 mx-3">
                <div className="w-screen h-24 bg-white z-10 top-8 md:flex hidden -translate-x-12 fixed"></div>
                <div className=" bg-white">
                    <div className="">
                        {/* Header Greeting */}
                        <h1 className="text-6xl font-light mb-8 tracking-wide">HI, TANISH</h1>

                        {/* Navigation Tabs */}
                        <div className="flex flex-wrap gap-1 mb-3 border-gray-200">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-sm font-medium ${activeTab === tab ? "bg-gray-200 text-black border border-black" : "text-gray-600 bg-gray-100 hover:bg-gray-50"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="mb-7 w-end border-b"></div>

                        {/* Profile Section */}
                        {activeTab === "PROFILE" && (
                            <div className="space-y-8">
                                <h2 className="text-2xl font-light tracking-wide">PROFILE</h2>

                                {/* Preferred Name */}
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-900">Preferred Name</div>
                                    <div className="text-sm text-gray-900">Tanish</div>
                                    <Link href="#" className="text-sm text-gray-900 underline hover:no-underline">
                                        Edit Preferred Name
                                    </Link>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-900">Email</div>
                                    <div className="text-sm text-gray-900">tanish0739rish@gmail.com</div>
                                    <Link href="#" className="text-sm text-gray-900 underline hover:no-underline">
                                        Edit Password
                                    </Link>
                                </div>

                                {/* Birthday */}
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-900">Birthday</div>
                                    <div className="flex items-center gap-2">
                                        <Gift className="w-4 h-4 text-gray-600" />
                                        <Link href="#" className="text-sm text-gray-900 underline hover:no-underline">
                                            Add Your Birthday
                                        </Link>
                                        <span className="text-sm text-gray-600">for exclusive perks</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Membership Perks Section */}
                        {activeTab === "MEMBERSHIP PERKS" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-medium tracking-wide">Membership Perks</h2>

                                <div className="space-y-4">
                                    {membershipPerks.map((perk) => (
                                        <div key={perk.title} className="border-b border-gray-200 pb-1">
                                            <button
                                                onClick={() => toggleSection(perk.title)}
                                                className="w-full flex items-center justify-between py-2 text-left"
                                            >
                                                <span className="text-sm font-medium text-gray-900 tracking-wide">{perk.title}</span>
                                                <ChevronDown
                                                    className={`w-4 h-4 text-gray-600 transition-transform ${expandedSections.includes(perk.title) ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>
                                            {expandedSections.includes(perk.title) && (
                                                <div className="mt-2 text-sm text-gray-700 leading-relaxed">{perk.description}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Orders Section */}
                        {activeTab === "ORDERS" && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-light tracking-wide">MY ORDERS</h2>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">You haven't placed any orders yet.</p>
                                        <p className="text-sm text-gray-600">Stock up on something new</p>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <button className="px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50">
                                            BEST SELLERS
                                        </button>
                                        <button className="px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50">
                                            SHOP ALL
                                        </button>
                                        <button className="px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50">
                                            ALL RINGS
                                        </button>
                                        <button className="px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50">
                                            NEW ARRIVALS
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Addresses Section */}
                        {activeTab === "ADDRESSES" && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-light tracking-wide">ADDRESS BOOK</h2>
                                <div className="space-y-4 ">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">SHIPPING ADDRESS</h3>
                                        <button className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-700">
                                            <span className="text-lg"><Plus className="-translate-y-[0.03rem]" fill="black" size={12}/></span>
                                            ADD
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-600">You have no addresses saved.</p>
                                </div>
                            </div>
                        )}

                        {/* Store Credit & Gift Cards Section */}
                        {activeTab === "STORE CREDIT & GIFT CARDS" && (
                            <div className="space-y-8">
                                <h2 className="text-2xl font-light tracking-wide">STORE CREDIT & GIFT CARDS</h2>

                                {/* Store Credit Section */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900">STORE CREDIT</h3>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-900">Credit Code</p>
                                        <p className="text-sm text-gray-600">
                                            You do not have a credit code. Once you receive store credit, your credit code will be created.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-900">You have $0 credit</p>
                                        <p className="text-sm text-gray-600">
                                            You can apply your store credit at the checkout. For store credit issued outside of the current store
                                            currency, it will be converted to the current currency.
                                        </p>
                                    </div>
                                </div>

                                <hr className="border-gray-200" />

                                {/* Gift Card Balance Section */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900">GIFT CARD BALANCE</h3>
                                    <p className="text-sm text-gray-600">
                                        If your gift card is in another currency, it will be converted in the same currency as the store.
                                    </p>

                                    <div className="max-w-md space-y-4">
                                        <div className="space-y-2">
                                            <label htmlFor="giftCardCode" className="block text-sm text-gray-600">
                                                Enter Gift Card Code
                                            </label>
                                            <input
                                                type="text"
                                                id="giftCardCode"
                                                placeholder="XXXXXXXXXX"
                                                className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                            />
                                        </div>

                                        <button className="w-full bg-black text-white py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
                                            CHECK GIFT CARD BALANCE
                                        </button>

                                        <p className="text-xs text-gray-500">
                                            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Wishlist Section */}
                        {activeTab === "WISHLIST" && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-light tracking-wide">WISHLIST</h2>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-900">Your wishlist is empty</p>
                                    <p className="text-sm text-gray-600">Get started by adding items to your wishlist</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}