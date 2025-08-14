import MainLayout from "@/components/layout/main-layout"
import PatientManagement from "@/components/patients/patient-management"

export default function PatientsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">환자 관리</h1>
          <p className="text-gray-600 mt-2">
            환자 등록, 기본정보 관리, 진료 이력을 관리합니다.
          </p>
        </div>
        <PatientManagement />
      </div>
    </MainLayout>
  )
}