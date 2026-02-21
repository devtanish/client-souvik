import Link from "next/link";
import { Gift, Plus } from "lucide-react";
import Profile from "./tabs/Profile";
import AffiliateProgram from "./tabs/AffiliateProgram";
import Orders from "./tabs/Orders";
import Address from "./tabs/Address";
import StoreAndGift from "./tabs/StoreAndGift";
import WishList from "./tabs/WishList";
import { div } from "motion/react-client";

export const Tabs = ({ currentTab }: { currentTab: string }) => {
    // Map tab names to their corresponding components
    const tabComponents: Record<string, React.ComponentType> = {
        "PROFILE": Profile,
        "AFFILIATE PROGRAM": AffiliateProgram,
        "ORDERS": Orders,
        "ADDRESSES": Address,
        "STORE CREDIT/GIFT CARDS": StoreAndGift,
        "WISHLIST": WishList,
    };

    // Get the component for the current tab
    const TabComponent = tabComponents[currentTab];

    // Render the component if it exists, otherwise show a fallback
    return (
        <div>
            {TabComponent ? (
                <div className="md:pt-0">
                    <TabComponent />
                </div>
            ) : (
                <div className="text-center py-10 text-gray-500">
                    Tab not found
                </div>
            )}
        </div>
    );
}