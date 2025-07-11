import ProductPage from "@/components/productPage"
import React from "react"

export default function Home({ params }: { params: Promise<{ product: string }> }) {
  const { product } = React.use(params)
  return (
    <>
      <div className="w-screen h-25 bg-white z-10 top-7 md:flex hidden fixed"></div>
      <ProductPage params={Promise.resolve({ product: product })} />
    </>
  )
}