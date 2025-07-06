import ProductPage from "@/components/productPage"
import React from "react"

export default function Home({ params }: { params: Promise<{ product: string }> }) {
  const { product } = React.use(params)
  return (
    <>
      <ProductPage params={Promise.resolve({ product: product })}/>
    </>
  )
}