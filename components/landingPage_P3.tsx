import Image from "next/image";

export default function LandingPage_P3() {
    return (
        <div id="landingPage3" className="scroll-mt-16">
            <div className="sm:h-[150vh] h-[100vh] w-screen grid grid-cols-4 md:grid-cols-6 grid-rows-8 gap-0 mt-[5vh] md:mt-[10vh]">
                <div className="col-start-1 col-end-3 row-start-1 row-end-5 relative group overflow-hidden">
                    <Image
                        src="/landingPage/1.png"
                        alt="Image 1"
                        id=""
                        fill
                        style={{ objectFit: "cover" }}
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out text-center">
                        <h3 className="text-white text-xl font-semibold mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                            Women Bracelet
                        </h3>
                        <p className="text-white/90 text-xl opacity-0 group-hover:opacity-100 mb-4 transition-opacity duration-700 delay-300">
                            Men Brecelet
                        </p>
                    </div>
                </div>
                <div className="col-start-1 col-end-3 row-start-5 row-end-9 relative group overflow-hidden">
                    <Image
                        src="/landingPage/2.png"
                        alt="Image 2"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out text-center">
                        <h3 className="text-white text-xl font-semibold mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                            Women Braclet 
                        </h3>
                        <p className="text-white/90 text-xl opacity-0 group-hover:opacity-100 mb-4 transition-opacity duration-700 delay-300">
                            Men Braclet 
                        </p>
                    </div>
                </div>
                <div className="col-start-3 col-end-5 row-start-1 row-end-5 relative group overflow-hidden">
                    <Image
                        src="/landingPage/3.png"
                        alt="Image 3"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out text-center">
                        <h3 className="text-white text-xl font-semibold mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                            Women Earrings 
                        </h3>
                        <p className="text-white/90 text-xl opacity-0 group-hover:opacity-100 mb-4 transition-opacity duration-700 delay-300">
                            Men Earrings 
                        </p>
                    </div>
                </div>
                <div className="col-start-3 col-end-5 row-start-5 row-end-9 relative group overflow-hidden">
                    <Image
                        src="/landingPage/4.png"
                        alt="Image 4"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out text-center">
                        <h3 className="text-white text-xl font-semibold mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                            Women Necklace
                        </h3>
                        <p className="text-white/90 text-xl opacity-0 group-hover:opacity-100 mb-4 transition-opacity duration-700 delay-300">
                            Men Necklace
                        </p>
                    </div>
                </div>
                <div className="col-start-5 col-end-7 row-start-1 row-end-9 relative group overflow-hidden">
                    <Image
                        src="/landingPage/5.png"
                        alt="Image 5"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out text-center">
                        <h3 className="text-white text-xl font-semibold mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                            Boby & More
                        </h3>
                    </div>
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