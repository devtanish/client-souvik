import { Plus } from "lucide-react";

export default function() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-light tracking-wide">ADDRESS BOOK</h2>
            <div className="space-y-4 ">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">SHIPPING ADDRESS</h3>
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-700">
                        <span className="text-lg"><Plus className="-translate-y-[0.03rem]" fill="black" size={12} /></span>
                        ADD
                    </button>
                </div>
                <p className="text-sm text-gray-600">You have no addresses saved.</p>
            </div>
        </div>
    )
}