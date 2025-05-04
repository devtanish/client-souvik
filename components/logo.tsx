import Image from "next/image"

export default function Logo(){
    return (
        <div className="md:disabled ">
            <div className=" fixed -top-50 ml-30  left-0 z-10  p-0">
                <Image src={"/logo.png"} alt="logo" className="m-0 -translate-x-19 p-0" width={600} height={600}/>
            </div>
        </div>
    )
}