import Image from "next/image";

export default function LandingPage_P3() {
    return (
        <div>
            
            <div className="sm:h-[150vh] h-[100vh] w-screen grid grid-cols-4 md:grid-cols-6 grid-rows-8 gap-0 mt-[5vh] md:mt-[10vh]">
                <div className="col-start-1 col-end-3 row-start-1 row-end-5 relative">
                    <Image
                        src="/landingPage/1.png"
                        alt="Image 1"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className="col-start-1 col-end-3 row-start-5 row-end-9  relative">
                    <Image
                        src="/landingPage/2.png"
                        alt="Image 2"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className="col-start-3 col-end-5 row-start-1 row-end-5 relative">
                    <Image
                        src="/landingPage/3.png"
                        alt="Image 3"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className="col-start-3 col-end-5 row-start-5 row-end-9 relative">
                    <Image
                        src="/landingPage/4.png"
                        alt="Image 4"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className="col-start-5 col-end-7 row-start-1 row-end-9 relative">
                    <Image
                        src="/landingPage/5.png"
                        alt="Image 5"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>
            </div>
            <div className="w-screen h-[100vh] relative flex md:hidden">
                <Image
                    className=""
                    src="/landingPage/5.png"
                    alt="Image 5"
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>
        </div>
    );
}   