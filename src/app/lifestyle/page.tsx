import MainLayout from "@/components/layout/main-layout"
import LifestyleManagement from "@/components/lifestyle/lifestyle-management"

export default function LifestylePage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">생활 티칭 관리</h1>
          <p className="text-gray-600 mt-2">
            사상체질별 맞춤 식단, 운동, 생활습관 가이드를 제공하고 관리합니다.
          </p>
        </div>
        <LifestyleManagement />
      </div>
    </MainLayout>
  )
}