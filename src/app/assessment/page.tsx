import MainLayout from "@/components/layout/main-layout"
import AssessmentWorkflow from "@/components/assessment/assessment-workflow"

export default function AssessmentPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">체질 진단</h1>
          <p className="text-gray-600 mt-2">
            QSCCII 설문지, 신체 계측, 얼굴 분석을 통한 종합 체질 진단을 실시합니다.
          </p>
        </div>
        <AssessmentWorkflow />
      </div>
    </MainLayout>
  )
}