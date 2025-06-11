import type React from "react"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Footer from "@/components/footer";
import WhatsAppChatButton from "@/components/whatsapp-chat-button";
import Sidebar from "@/components/sidebar";
import Tooltip from "@/components/tooltip";
import Header from "@/components/header";
import CartSidebar from "@/components/cart-sidebar";
import { CartProvider } from "@/contexts/cart-context";


export const metadata: Metadata = {
  title: "Earrings Collection | Raya Jewelry",
  description: "Explore our collection of earrings - huggies, hoops, studs, and more.",
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} `}
      >
        <CartProvider>
          <Header />
          <Sidebar />
          <Tooltip />
          <main className="">{children}</main>
          <CartSidebar />
          <WhatsAppChatButton phoneNumber="+918850305563" notificationCount={1} message="Hello, I'd like to chat with you!" />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
