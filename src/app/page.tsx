import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, FileText, Pill, Heart, Brain } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* 헤더 */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">사상체질 진료 시스템</h1>
            </div>
            <nav className="flex space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/patients">환자 관리</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/assessment">체질 진단</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/prescriptions">처방 관리</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">대시보드</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8">
        {/* 환영 섹션 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            한의원 사상체질 진료를 위한 종합 솔루션
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            QSCCII 설문지, 신체계측, 얼굴분석을 통한 정확한 체질 진단과 맞춤형 처방
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge className="constitution-badge taeyang">태양인</Badge>
            <Badge className="constitution-badge soyang">소양인</Badge>
            <Badge className="constitution-badge taeeum">태음인</Badge>
            <Badge className="constitution-badge soeum">소음인</Badge>
          </div>
        </div>

        {/* 주요 기능 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="constitution-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-blue-600" />
                <span>환자 관리</span>
              </CardTitle>
              <CardDescription>
                환자 등록, 기본정보 관리, 진료 이력 추적
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/patients">환자 관리 시작</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="constitution-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-6 w-6 text-green-600" />
                <span>체질 진단</span>
              </CardTitle>
              <CardDescription>
                QSCCII 설문지, 신체계측, 얼굴분석을 통한 종합 진단
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/assessment">체질 진단 시작</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="constitution-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Pill className="h-6 w-6 text-purple-600" />
                <span>한약 처방</span>
              </CardTitle>
              <CardDescription>
                체질별 맞춤 한약 처방 및 처방 이력 관리
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/prescriptions">처방 관리</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="constitution-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-red-600" />
                <span>생활 지도</span>
              </CardTitle>
              <CardDescription>
                체질별 음식, 운동, 생활습관 맞춤 가이드
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/lifestyle">생활 지도</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="constitution-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-orange-600" />
                <span>진료 기록</span>
              </CardTitle>
              <CardDescription>
                진료 세션 관리, 진단 결과 및 처방 기록
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/records">진료 기록</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="constitution-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-indigo-600" />
                <span>분석 대시보드</span>
              </CardTitle>
              <CardDescription>
                진료 현황, 체질별 통계, 처방 효과 분석
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/dashboard">대시보드</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 체질별 특징 요약 */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            사상체질별 특징
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 border border-red-200 rounded-lg bg-red-50">
              <Badge className="constitution-badge taeyang mb-3">태양인</Badge>
              <h4 className="font-semibold mb-2">폐대간소(肺大肝小)</h4>
              <p className="text-sm text-gray-600">
                직관력 탁월, 공정한 성격<br/>
                소변량이 많으면 건강
              </p>
            </div>
            <div className="text-center p-4 border border-teal-200 rounded-lg bg-teal-50">
              <Badge className="constitution-badge soyang mb-3">소양인</Badge>
              <h4 className="font-semibold mb-2">비대신소(脾大腎小)</h4>
              <p className="text-sm text-gray-600">
                감정적, 민첩한 성격<br/>
                대변이 잘 통하면 건강
              </p>
            </div>
            <div className="text-center p-4 border border-blue-200 rounded-lg bg-blue-50">
              <Badge className="constitution-badge taeeum mb-3">태음인</Badge>
              <h4 className="font-semibold mb-2">간대폐소(肝大肺小)</h4>
              <p className="text-sm text-gray-600">
                꾸준함, 예의 중시<br/>
                땀 배출이 잘 되면 건강
              </p>
            </div>
            <div className="text-center p-4 border border-green-200 rounded-lg bg-green-50">
              <Badge className="constitution-badge soeum mb-3">소음인</Badge>
              <h4 className="font-semibold mb-2">신대비소(腎大脾小)</h4>
              <p className="text-sm text-gray-600">
                논리적, 사고력 우수<br/>
                소화가 잘 되면 건강
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2024 사상체질 진료 웹앱. 한의학 진료 보조 도구로 활용하시기 바랍니다.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            ⚠️ 본 시스템은 진단 보조 도구이며, 최종 진단은 전문 한의사의 종합적 판단이 필요합니다.
          </p>
        </div>
      </footer>
    </div>
  )
}