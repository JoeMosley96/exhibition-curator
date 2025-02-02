// app/layout.ts
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "./zui/BottomNav";

import TopNav from "./zui/TopNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "masterpieceHub",
  description: "Collect artworks from the world's best galleries",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["masterpiece", "art", "gallery", "museum"],
  authors: [
    {
      name: "Joe Mosley",
      url: "https://www.linkedin.com/in/joe-mosley-0a06a1101/",
    },
  ],

  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-192x192.png" },
    { rel: "icon", url: "icons/icon-192x192.png" },
  ],
};

export const viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="cupcake">
      <body className={inter.className} >
        <TopNav />
        {children}
        <BottomNav />
      </body>
      
    </html>
  );
}
