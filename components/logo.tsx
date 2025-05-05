import Image from "next/image"

export default function Logo(){
    return (
        <div className=" sm:visible">
            <div className="box-decoration-slice fixed  md:translate-x-40 md:-translate-y-10 -translate-y-100 m-0 zb-10  left-0 z-30  p-0">
                <Image src={"/logo2.png"} alt="logo" className="m-0 p-0" width={300} height={300}/>
            </div>
        </div>
    )
}