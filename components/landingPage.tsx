import Sidebar from "./sidebar";

export default function LandingPage() {
    return (
        <div className="bg-white grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-center">
                    Welcome to Raya
                </h1>
                <p className="text-center text-lg">
                    Raya is a one-stop shop for all your design needs. Whether you need a logo, a website, or a
                    brochure, we've got you covered.
                </p>
                <button className="bg-black text-white px-4 py-2 rounded-lg mt-10">
                    Get Started
                </button>
            </div>
        </div>

    )
}