import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "사상체질 진료 웹앱 | BW Sasang Web",
  description: "한의원에서 사상체질 진료를 위한 종합 웹 애플리케이션",
  keywords: "사상체질, 한의학, 체질진단, QSCCII, 한약처방",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}