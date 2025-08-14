import { ReactNode } from "react"
import Navbar from "./navbar"

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>© 2024 사상체질 진료 웹앱. 한의학 진료 보조 도구로 활용하시기 바랍니다.</p>
            <p className="mt-1 text-xs text-red-600">
              ⚠️ 본 시스템은 진단 보조 도구이며, 최종 진단은 전문 한의사의 종합적 판단이 필요합니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}