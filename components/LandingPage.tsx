import Image from "next/image"
import Link from "next/link"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { ChevronDown, LayoutGrid, LayoutList } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="max-w-8xl mx-auto px-0 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6">
        <div className="flex items-center gap-1">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Shop All
          </Link>
          <span className="text-gray-500">/</span>
          <span className="font-medium">Earrings</span>
        </div>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold uppercase mb-1">EARRINGS</h1>
        <p className="text-gray-600">Huggies, hoops, studs, and more. A whole lot more.</p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 mb-12">
        {categories.map((category) => (
          <div key={category.name} className="flex flex-col items-center">
            <div className="relative w-full aspect-square mb-2 overflow-hidden">
              <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
            </div>
            <span className="text-sm text-center">{category.name}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-6">
        {/* Metal filter */}
        <div>
          <h3 className="text-sm mb-3">Metal</h3>
          <div className="flex gap-2">
            {metals.map((metal) => (
              <button
                key={metal.color}
                className="w-8 h-8 rounded-full border hover:ring-2 hover:ring-offset-2 hover:ring-gray-300"
                style={{ backgroundColor: metal.color }}
                aria-label={metal.name}
              />
            ))}
          </div>
        </div>

        {/* Shape filter */}
        <div>
          <h3 className="text-sm mb-3">Shape</h3>
          <div className="flex gap-2">
            {shapes.map((shape) => (
              <button
                key={shape.id}
                className="w-8 h-8 rounded-full border flex items-center justify-center hover:border-gray-400"
              >
                {shape.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Price filter */}
        <div>
          <h3 className="text-sm mb-3">Price</h3>
          <div className="space-y-4">
            <Slider defaultValue={[100, 22000]} min={0} max={25000} step={100} />
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input type="number" className="pl-7 w-24" defaultValue={100} min={0} />
              </div>
              <span className="text-gray-500">-</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input type="number" className="pl-7 w-24" defaultValue={22000} min={0} />
              </div>
            </div>
          </div>
        </div>

        {/* Sort and view options */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Sorting By</span>
              <button className="flex items-center gap-1 text-sm font-medium">
                Featured <ChevronDown size={16} />
              </button>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded" />
              IN-STOCK ONLY
            </label>
          </div>
          <div className="flex items-center gap-2 border rounded-md">
            <button className="p-2 bg-gray-100">
              <LayoutGrid size={18} />
            </button>
            <button className="p-2">
              <LayoutList size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="relative mb-3 bg-gray-50 aspect-square overflow-hidden">
              {product.bestSeller && (
                <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 z-5">Best Seller</span>
              )}
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.showAddToBag && (
                <div className="absolute bottom-0 left-0 right-0 bg-white py-2 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full text-center text-sm font-medium">ADD TO BAG</button>
                </div>
              )}
            </div>
            <h3 className="font-medium mb-1">{product.name}</h3>
            <p className="text-gray-700 mb-1">${product.price}</p>
            <div className="flex gap-1 mb-1">
              {product.colors.map((color, index) => (
                <button key={index} className={`w-5 h-5 rounded-full border bg-[${color}]`} onClick={()=> console.log(color)}></button>
              ))}
            </div>
            <p className="text-xs text-gray-500">{product.material}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const categories = [
  { name: "Earrings", image: "/jwel/1.avif" },
  { name: "Hoop Earrings", image: "/jwel/1.avif" },
  { name: "Stud Earrings", image: "/jwel/2.avif" },
  { name: "Drop Earrings", image: "/jwel/3.avif" },
  { name: "Ear Cuffs", image: "/jwel/4.avif" },
  { name: "Hoop Charms", image: "/jwel/5.avif" },
  { name: "Cartilage & Helix", image: "/jwel/6.avif" },
  { name: "Single Ear", image: "/jwel/7.avif" },
]

const metals = [
  { name: "Gold", color: "#E6C77E" },
  { name: "Silver", color: "#E0E0E0" },
  { name: "Rose Gold", color: "#E0BFB8" },
  { name: "White Gold", color: "#F5F5F5" },
]

const shapes = [
  { id: 1, icon: "○" },
  { id: 2, icon: "◎" },
  { id: 3, icon: "◻" },
  { id: 4, icon: "◇" },
  { id: 5, icon: "◈" },
  { id: 6, icon: "□" },
  { id: 7, icon: "△" },
  { id: 8, icon: "◯" },
]

const products = [
  {
    id: 1,
    name: "Mini Hoop",
    price: 79,
    image: "/jwel/1.avif",
    colors: ["#E6C77E", "#E0E0E0", "#FFFF"],
    material: "14k Yellow Gold",
    bestSeller: true,
    showAddToBag: true,
  },
  {
    id: 2,
    name: "Sphere Studs",
    price: 64,
    image: "/jwel/2.avif",
    colors: ["#E6C77E"],
    material: "14k Yellow Gold",
    bestSeller: true,
    showAddToBag: true,
  },
  {
    id: 3,
    name: "Bold Huggie Hoops",
    price: 178,
    image: "/jwel/6.avif",
    colors: ["#E6C77E", "#E0E0E0"],
    material: "14k Yellow Gold",
    bestSeller: true,
    showAddToBag: true,
  },
  {
    id: 4,
    name: "Dome Hoops",
    price: 74,
    image: "/jwel/4.avif",
    colors: ["#E6C77E", "#E0E0E0"],
    material: "18k Solid Vermeil",
    bestSeller: true,
    showAddToBag: true,
  },
  {
    id: 5,
    name: "Twist Studs",
    price: 59,
    image: "/jwel/5.avif",
    colors: ["#FFD700"],
    material: "18k Gold Plated",
    bestSeller: false,
    showAddToBag: true,
  },
  {
    id: 6,
    name: "Diamond Accent Huggies",
    price: 199,
    image: "/jwel/6.avif",
    colors: ["#E6C77E"],
    material: "14k Yellow Gold with Diamonds",
    bestSeller: true,
    showAddToBag: true,
  },
  {
    id: 7,
    name: "Tiny Pearl Studs",
    price: 49,
    image: "/jwel/7.avif",
    colors: ["#FFFFFF"],
    material: "Sterling Silver with Freshwater Pearls",
    bestSeller: false,
    showAddToBag: true,
  },
]
