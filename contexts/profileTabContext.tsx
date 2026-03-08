"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type TabName =
    | "PROFILE"
    | "AFFILIATE PROGRAM"
    | "ORDERS"
    | "ADDRESSES"
    | "STORE CREDIT/GIFT CARDS"
    | "WISHLIST";

export const TAB_LIST: TabName[] = [
    "PROFILE",
    "AFFILIATE PROGRAM",
    "ORDERS",
    "ADDRESSES",
    "STORE CREDIT/GIFT CARDS",
    "WISHLIST",
];

interface TabsContextValue {
    currentTab: TabName;
    setTab: (tab: TabName) => void;
    isActive: (tab: TabName) => boolean;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

interface TabsProviderProps {
    children: React.ReactNode;
    defaultTab?: TabName;
}

export function TabsProvider({ children, defaultTab = "PROFILE" }: TabsProviderProps) {
    const [currentTab, setCurrentTab] = useState<TabName>(defaultTab);

    const setTab = useCallback((tab: TabName) => {
        setCurrentTab(tab);
    }, []);

    const isActive = useCallback(
        (tab: TabName) => tab === currentTab,
        [currentTab]
    );

    return (
        <TabsContext.Provider value={{ currentTab, setTab, isActive }}>
            {children}
        </TabsContext.Provider>
    );
}

export function useTabsContext(): TabsContextValue {
    const ctx = useContext(TabsContext);
    if (!ctx) throw new Error("useTabsContext must be used inside <TabsProvider>");
    return ctx;
}