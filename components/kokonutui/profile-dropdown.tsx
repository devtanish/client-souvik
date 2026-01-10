"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Settings, CreditCard, FileText, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Gemini from "@/components/kokonutui/gemini";

interface Profile {
    name: string;
    email: string;
    avatar: string;
    subscription?: string;
    model?: string;
}

interface MenuItem {
    label: string;
    value?: string;
    href: string;
    icon: React.ReactNode;
    external?: boolean;
}

const SAMPLE_PROFILE_DATA: Profile = {
    name: "Eugene An",
    email: "eugene@kokonutui.com",
    avatar: "data:image/jpeg;base64,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",
    subscription: "PRO",
    model: "Gemini 2.0 Flash",
};

interface ProfileDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    data?: Profile;
    showTopbar?: boolean;
}

export default function ProfileDropdown({
    data = SAMPLE_PROFILE_DATA,
    className,
    ...props
}: ProfileDropdownProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const menuItems: MenuItem[] = [
        {
            label: "Profile",
            href: "#",
            icon: <User className="w-4 h-4" />,
        },
        {
            label: "Model",
            value: data.model,
            href: "#",
            icon: <Gemini className="w-4 h-4" />,
        },
        {
            label: "Subscription",
            value: data.subscription,
            href: "#",
            icon: <CreditCard className="w-4 h-4" />,
        },
        {
            label: "Settings",
            href: "#",
            icon: <Settings className="w-4 h-4" />,
        },
        {
            label: "Terms & Policies",
            href: "#",
            icon: <FileText className="w-4 h-4" />,
            external: true,
        },
    ];

    return (
        <div className={cn("relative", className)} {...props}>
            <DropdownMenu onOpenChange={setIsOpen}>
                <div className="group relative">
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="flex items-center gap-16 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 hover:shadow-sm transition-all duration-200 focus:outline-none"
                        >
                            <div className="text-left flex-1">
                                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                                    {data.name}
                                </div>
                                <div className="text-xs text-zinc-500 dark:text-zinc-400 tracking-tight leading-tight">
                                    {data.email}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-0.5">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-zinc-900">
                                        <Image
                                            src={data.avatar}
                                            alt={data.name}
                                            width={36}
                                            height={36}
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </button>
                    </DropdownMenuTrigger>

                    {/* Bending line indicator on the right */}
                    <div
                        className={cn(
                            "absolute -right-3 top-1/2 -translate-y-1/2 transition-all duration-200",
                            isOpen
                                ? "opacity-100"
                                : "opacity-60 group-hover:opacity-100"
                        )}
                    >
                        <svg
                            width="12"
                            height="24"
                            viewBox="0 0 12 24"
                            fill="none"
                            className={cn(
                                "transition-all duration-200",
                                isOpen
                                    ? "text-blue-500 dark:text-blue-400 scale-110"
                                    : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                            )}
                            aria-hidden="true"
                        >
                        </svg>
                    </div>

                    <DropdownMenuContent
                        align="end"
                        sideOffset={4}
                        className="w-64 p-2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl shadow-xl shadow-zinc-900/5 dark:shadow-zinc-950/20 
                    data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-top-right"
                    >
                        <div className="space-y-1">
                            {menuItems.map((item) => (
                                <DropdownMenuItem key={item.label} asChild>
                                    <Link
                                        href={item.href}
                                        className="flex items-center p-3 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 rounded-xl transition-all duration-200 cursor-pointer group hover:shadow-sm border border-transparent hover:border-zinc-200/50 dark:hover:border-zinc-700/50"
                                    >
                                        <div className="flex items-center gap-2 flex-1">
                                            {item.icon}
                                            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight whitespace-nowrap group-hover:text-zinc-950 dark:group-hover:text-zinc-50 transition-colors">
                                                {item.label}
                                            </span>
                                        </div>
                                        <div className="flex-shrink-0 ml-auto">
                                            {item.value && (
                                                <span
                                                    className={cn(
                                                        "text-xs font-medium rounded-md py-1 px-2 tracking-tight",
                                                        item.label === "Model"
                                                            ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10 border border-blue-500/10"
                                                            : "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-500/10 border border-purple-500/10"
                                                    )}
                                                >
                                                    {item.value}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </div>

                        <DropdownMenuSeparator className="my-3 bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />

                        <DropdownMenuItem asChild>
                            <button
                                type="button"
                                className="w-full flex items-center gap-3 p-3 duration-200 bg-red-500/10 rounded-xl hover:bg-red-500/20 cursor-pointer border border-transparent hover:border-red-500/30 hover:shadow-sm transition-all group"
                            >
                                <LogOut className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                                <span className="text-sm font-medium text-red-500 group-hover:text-red-600">
                                    Sign Out
                                </span>
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </div>
            </DropdownMenu>
        </div>
    );
}
