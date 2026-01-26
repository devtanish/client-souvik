import { div } from "motion/react-client"
import Link from "next/link"
import { Gift } from "lucide-react"

export default function (){
    return (
        <div>
            <div className="space-y-8">
                <h2 className="text-2xl font-light tracking-wide">PROFILE</h2>

                {/* Preferred Name */}
                <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900">Preferred Name</div>
                    <div className="text-sm text-gray-900">Tanish</div>
                    <Link href="#" className="text-sm text-gray-900 underline hover:no-underline">
                        Edit Preferred Name
                    </Link>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900">Email</div>
                    <div className="text-sm text-gray-900">tanish0739rish@gmail.com</div>
                    <Link href="#" className="text-sm text-gray-900 underline hover:no-underline">
                        Edit Password
                    </Link>
                </div>

                {/* Birthday */}
                <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900">Birthday</div>
                    <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-gray-600" />
                        <Link href="#" className="text-sm text-gray-900 underline hover:no-underline">
                            Add Your Birthday
                        </Link>
                        <span className="text-sm text-gray-600">for exclusive perks</span>
                    </div>
                </div>
            </div>;
        </div>
    )
} 