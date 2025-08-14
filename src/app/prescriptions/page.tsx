import MainLayout from "@/components/layout/main-layout"
import PrescriptionManagement from "@/components/prescriptions/prescription-management"

export default function PrescriptionsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">한약 처방 관리</h1>
          <p className="text-gray-600 mt-2">
            체질별 맞춤 한약 처방을 관리하고 처방전을 생성합니다.
          </p>
        </div>
        <PrescriptionManagement />
      </div>
    </MainLayout>
  )
}