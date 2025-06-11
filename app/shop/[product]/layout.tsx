import type React from "react"
import { Geist } from "next/font/google";
import "../../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  weight: ["400", "500", "600", "700"],
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
        className={`${geistSans.variable} antialiased`}
      >
          <main className="">{children}</main>   
      </body>
    </html>
  );
}
