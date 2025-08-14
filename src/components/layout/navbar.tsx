"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, 
  Users, 
  Activity, 
  Pill, 
  Heart, 
  FileText, 
  BarChart3,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "대시보드", href: "/dashboard", icon: BarChart3 },
  { name: "환자 관리", href: "/patients", icon: Users },
  { name: "체질 진단", href: "/assessment", icon: Activity },
  { name: "처방 관리", href: "/prescriptions", icon: Pill },
  { name: "생활 지도", href: "/lifestyle", icon: Heart },
  { name: "진료 기록", href: "/records", icon: FileText },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">사상체질 진료</h1>
              <p className="text-xs text-gray-500">BW Sasang Web</p>
            </div>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link href={item.href} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              )
            })}
          </nav>

          {/* 체질 배지 */}
          <div className="hidden lg:flex items-center space-x-2">
            <Badge variant="secondary" className="constitution-badge taeyang text-xs">태양인</Badge>
            <Badge variant="secondary" className="constitution-badge soyang text-xs">소양인</Badge>
            <Badge variant="secondary" className="constitution-badge taeeum text-xs">태음인</Badge>
            <Badge variant="secondary" className="constitution-badge soeum text-xs">소음인</Badge>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="py-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 text-sm rounded-lg transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
            <div className="border-t pt-4 pb-4">
              <div className="px-4">
                <p className="text-sm text-gray-500 mb-2">사상체질</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="constitution-badge taeyang text-xs">태양인</Badge>
                  <Badge className="constitution-badge soyang text-xs">소양인</Badge>
                  <Badge className="constitution-badge taeeum text-xs">태음인</Badge>
                  <Badge className="constitution-badge soeum text-xs">소음인</Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}