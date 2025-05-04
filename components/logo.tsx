import Image from "next/image"

export default function Logo(){
    return (
        <div className=" sm:visible">
            <div className="box-decoration-slice fixed translate-x-40 -translate-y-14  m-0 zb-10  left-0 z-30  p-0">
                <Image src={"/logo2.png"} alt="logo" className="m-0 p-0" width={300} height={300}/>
            </div>
        </div>
    )
}