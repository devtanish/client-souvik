import React from "react"
import Cart from "@/components/cart"

export default function Home({ params }: { params: Promise<{ product: string }> }){

    const { product } = React.use(params)

    return (
        <div>
            <Cart params={Promise.resolve({ product: product })}/>
        </div>
    )
}