"use client";

import Profile from "./tabs/Profile";
import AffiliateProgram from "./tabs/AffiliateProgram";
import Orders from "./tabs/Orders";
import Address from "./tabs/Address";
import StoreAndGift from "./tabs/StoreAndGift";
import WishList from "./tabs/WishList";
import { useTabsContext } from "@/contexts/profileTabContext";
import type { TabName } from "@/contexts/profileTabContext";

const tabComponents: Record<TabName, React.ComponentType> = {
    "PROFILE": Profile,
    "AFFILIATE PROGRAM": AffiliateProgram,
    "ORDERS": Orders,
    "ADDRESSES": Address,
    "STORE CREDIT/GIFT CARDS": StoreAndGift,
    "WISHLIST": WishList,
};

export const Tabs = () => {
    const { currentTab } = useTabsContext();
    const TabComponent = tabComponents[currentTab];

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
};