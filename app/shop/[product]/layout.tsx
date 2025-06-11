import type React from "react"
import { Cormorant_Garamond } from "next/font/google";
import "../../globals.css";

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
          <main className="">{children}</main>   
      </body>
    </html>
  );
}
