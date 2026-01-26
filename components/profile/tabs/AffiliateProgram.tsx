import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function () {

    const [expandedSections, setExpandedSections] = useState<string[]>([])

    const toggleSection = (title: string) => {
        setExpandedSections(prev =>
        prev.includes(title)
            ? prev.filter(item => item !== title)
            : [...prev, title]
        )
    }

    const membershipPerks = [
        {
        title: "PRIORITY SALE ACCESS",
        description:
            "Members get exclusive access to shop our sales first, before the general public.",
        },
        {
        title: "BIRTHDAY TREAT",
        description:
            "During your birthday month, you'll receive an exclusive perk just for you.",
        },
        {
        title: "FREE SHIPPING EVERY MONDAY",
        description:
            "Members get free shipping every Monday, with no minimum spend required.",
        },
        {
        title: "EXCLUSIVE PRODUCT ACCESS",
        description:
            "Members get exclusive access to shop limited-edition products.",
        },
    ]

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-medium tracking-wide">MEMBERSHIP PERKS</h2>

            <div className="space-y-4">
                {membershipPerks.map((perk) => (
                    <div key={perk.title} className="border-b border-gray-200 pb-1">
                        <button
                            onClick={() => toggleSection(perk.title)}
                            className="w-full flex items-center justify-between py-2 text-left"
                        >
                            <span className="text-sm font-medium text-gray-900 tracking-wide">{perk.title}</span>
                            <ChevronDown
                                className={`w-4 h-4 text-gray-600 transition-transform ${expandedSections.includes(perk.title) ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {expandedSections.includes(perk.title) && (
                            <div className="mt-2 text-sm text-gray-700 leading-relaxed">{perk.description}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}