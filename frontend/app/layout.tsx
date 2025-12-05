import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "@/globals.css"

const interFont = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfairFont = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Haro Dandi Hotel & Tourism",
  description: "Experience authentic Ethiopian hospitality and unforgettable travel experiences",
  keywords: ["Ethiopia", "Tourism", "Hotels", "Travel", "Haro Dandi"],
  openGraph: {
    title: "Haro Dandi Hotel & Tourism",
    description: "Experience authentic Ethiopian hospitality",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1abc9c",
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interFont.variable} ${playfairFont.variable} font-sans`}>{children}</body>
    </html>
  )
}
