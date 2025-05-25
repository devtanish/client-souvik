import Image from "next/image";
import { Hind } from "next/font/google";
import { Heart } from "lucide-react";

const oswald =Hind({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
})

export default function Home() {

  return (
    <div className="mt-18 md:mt-36 w-screen  mb-20">
      <div className="md:mt-0 lg:mx-2.5 md:mx-10 mx-3">
        <div className="grid gap-1.5 grid-cols-11 grid-rows-5 "> 
          <div className="col-span-4 row-start-1 row-end-5 space-y-1.5">
            <Image src={"/product/ring.avif"} alt="product" className="" width={800} height={800} />
            <Image src={"/product/ring2.png"} alt="product" className="" width={800} height={800} />
            <Image src={"/product/ring3.avif"} alt="product" className="" width={800} height={800} />
            <Image src={"/product/hand.webp"} alt="product" className="" width={800} height={800} />
          </div>
          <div className="col-span-4 row-start-1 row-end-5 space-y-1.5">
            <Image src={"/product/girl.avif"} alt="product" className="" width={800} height={800} />
            <Image src={"/product/ring4.avif"} alt="product" className="" width={800} height={800} />
            <Image src={"/product/ring5.avif"} alt="product" className="" width={800} height={800} />
          </div>
          <div className={`${oswald.className} col-span-3 row-start-1 row-end-5 mx-10 `}>
            <div className="flex justify-between wrap-normal">
              <div className="text-2xl ">The Classic Emerald Engagement Ring</div>
              <div className="mt-2 ml-6"> <Heart/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
