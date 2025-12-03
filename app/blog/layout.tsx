import type React from "react"
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
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

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.className}`}
      >
        <CartProvider>
          <Header bg={false}/>
          <Sidebar />
          <Tooltip />
          <main className={`my-12 md:my-25`}>{children}</main>
          <CartSidebar />
          <WhatsAppChatButton phoneNumber="+918850305563" notificationCount={1} message="Hello, I'd like to chat with you!" />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
