import MainLayout from "@/components/layout/main-layout"
import DashboardOverview from "@/components/dashboard/dashboard-overview"

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">진료 대시보드</h1>
          <p className="text-gray-600 mt-2">
            사상체질 진료 현황과 통계를 한눈에 확인하세요.
          </p>
        </div>
        <DashboardOverview />
      </div>
    </MainLayout>
  )
}