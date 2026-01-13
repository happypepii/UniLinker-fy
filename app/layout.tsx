import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { UserContextProvider } from "@/lib/user-context"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UniLinker — Real Knowledge for International Students",
  description: "Structured, lived knowledge from real students to help you navigate university life abroad.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Suspense fallback={null}>
          <UserContextProvider>
            {children}
            <Analytics />
          </UserContextProvider>
        </Suspense>
      </body>
    </html>
  )
}
