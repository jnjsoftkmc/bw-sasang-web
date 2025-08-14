"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Users,
  Activity,
  Pill,
  Heart,
  TrendingUp,
  Calendar,
  BarChart3,
  PieChart,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  FileText,
  Target,
  Brain
} from "lucide-react"
import { getConstitutionName, getConstitutionColor } from "@/lib/utils"

// 임시 대시보드 데이터
const dashboardData = {
  patients: {
    total: 234,
    newThisMonth: 18,
    activeToday: 12,
    byConstitution: {
      taeyang: 23,
      soyang: 89,
      taeeum: 67,
      soeum: 55
    },
    byAge: {
      '20-30': 45,
      '31-40': 78,
      '41-50': 56,
      '51-60': 34,
      '60+': 21
    },
    byGender: {
      male: 108,
      female: 126
    }
  },
  assessments: {
    totalCompleted: 189,
    thisWeek: 23,
    pending: 12,
    byMethod: {
      qsccii: 145,
      bodyMeasurement: 89,
      faceAnalysis: 67
    },
    averageConfidence: 0.87
  },
  prescriptions: {
    totalActive: 156,
    completedThisMonth: 78,
    totalValue: 12450000,
    byConstitution: {
      taeyang: 12,
      soyang: 67,
      taeeum: 45,
      soeum: 32
    }
  },
  lifestyle: {
    guidesProvided: 203,
    followingDiet: 145,
    followingExercise: 123,
    averageAdherence: 0.73
  }
}

// 최근 활동 데이터
const recentActivities = [
  {
    id: 1,
    type: 'assessment',
    patient: '김철수',
    action: '체질 진단 완료',
    result: '태음인 (89%)',
    timestamp: '2시간 전',
    icon: Activity,
    color: 'text-blue-600'
  },
  {
    id: 2,
    type: 'prescription',
    patient: '이영희',
    action: '처방전 발급',
    result: '소양조위탕',
    timestamp: '3시간 전',
    icon: Pill,
    color: 'text-green-600'
  },
  {
    id: 3,
    type: 'lifestyle',
    patient: '박민수',
    action: '생활 가이드 제공',
    result: '소음인 맞춤',
    timestamp: '5시간 전',
    icon: Heart,
    color: 'text-red-600'
  },
  {
    id: 4,
    type: 'patient',
    patient: '최지영',
    action: '신규 환자 등록',
    result: '태양인',
    timestamp: '1일 전',
    icon: User,
    color: 'text-purple-600'
  }
]

// 주간 통계 데이터
const weeklyStats = [
  { day: '월', patients: 12, assessments: 8, prescriptions: 15 },
  { day: '화', patients: 15, assessments: 12, prescriptions: 18 },
  { day: '수', patients: 18, assessments: 15, prescriptions: 22 },
  { day: '목', patients: 14, assessments: 11, prescriptions: 16 },
  { day: '금', patients: 20, assessments: 18, prescriptions: 25 },
  { day: '토', patients: 8, assessments: 6, prescriptions: 10 },
  { day: '일', patients: 5, assessments: 3, prescriptions: 7 }
]

export default function DashboardOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [activeTab, setActiveTab] = useState('overview')

  const constitutionStats = useMemo(() => {
    const total = Object.values(dashboardData.patients.byConstitution).reduce((sum, count) => sum + count, 0)
    return Object.entries(dashboardData.patients.byConstitution).map(([constitution, count]) => ({
      constitution,
      count,
      percentage: Math.round((count / total) * 100)
    }))
  }, [])

  return (
    <div className="space-y-6">
      {/* 상단 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dashboardData.patients.total}</p>
                <p className="text-sm text-gray-600">총 환자 수</p>
                <p className="text-xs text-green-600 mt-1">
                  +{dashboardData.patients.newThisMonth} 이번달
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dashboardData.assessments.totalCompleted}</p>
                <p className="text-sm text-gray-600">진단 완료</p>
                <p className="text-xs text-blue-600 mt-1">
                  평균 신뢰도 {Math.round(dashboardData.assessments.averageConfidence * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Pill className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dashboardData.prescriptions.totalActive}</p>
                <p className="text-sm text-gray-600">활성 처방</p>
                <p className="text-xs text-purple-600 mt-1">
                  {(dashboardData.prescriptions.totalValue / 1000000).toFixed(1)}M원
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dashboardData.lifestyle.guidesProvided}</p>
                <p className="text-sm text-gray-600">생활 가이드</p>
                <p className="text-xs text-red-600 mt-1">
                  {Math.round(dashboardData.lifestyle.averageAdherence * 100)}% 준수율
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>통계</span>
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>환자</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>활동</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>보고서</span>
            </TabsTrigger>
          </TabsList>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">이번 주</SelectItem>
              <SelectItem value="month">이번 달</SelectItem>
              <SelectItem value="quarter">분기</SelectItem>
              <SelectItem value="year">연간</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 통계 탭 */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 체질별 환자 분포 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>체질별 환자 분포</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {constitutionStats.map(({ constitution, count, percentage }) => (
                    <div key={constitution} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge className={getConstitutionColor(constitution)}>
                          {getConstitutionName(constitution)}
                        </Badge>
                        <span className="text-sm">{count}명</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 진단 방법별 통계 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>진단 방법별 통계</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">QSCCII 설문</span>
                    </div>
                    <span className="font-semibold">{dashboardData.assessments.byMethod.qsccii}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-green-600" />
                      <span className="text-sm">신체 계측</span>
                    </div>
                    <span className="font-semibold">{dashboardData.assessments.byMethod.bodyMeasurement}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">얼굴 분석</span>
                    </div>
                    <span className="font-semibold">{dashboardData.assessments.byMethod.faceAnalysis}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 주간 활동 차트 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>주간 활동 현황</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyStats.map((stat) => (
                  <div key={stat.day} className="grid grid-cols-4 gap-4 items-center">
                    <span className="font-medium">{stat.day}요일</span>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">환자</div>
                      <div className="font-semibold text-blue-600">{stat.patients}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">진단</div>
                      <div className="font-semibold text-green-600">{stat.assessments}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">처방</div>
                      <div className="font-semibold text-purple-600">{stat.prescriptions}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 환자 탭 */}
        <TabsContent value="patients" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>연령대별 환자 분포</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(dashboardData.patients.byAge).map(([ageGroup, count]) => (
                    <div key={ageGroup} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                      <span className="text-sm">{ageGroup}세</span>
                      <span className="font-semibold">{count}명</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>성별 분포</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span>남성</span>
                    <span className="font-semibold">{dashboardData.patients.byGender.male}명</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <span>여성</span>
                    <span className="font-semibold">{dashboardData.patients.byGender.female}명</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>오늘 활동한 환자</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{dashboardData.patients.activeToday}</div>
                  <p className="text-gray-600 mt-2">명의 환자가 오늘 진료를 받았습니다</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 활동 탭 */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>최근 활동</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-lg ${activity.color} bg-opacity-10`}>
                        <Icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{activity.patient}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm">{activity.action}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {activity.result} • {activity.timestamp}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">대기 중인 진단</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {dashboardData.assessments.pending}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">건</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">이번 주 진단</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {dashboardData.assessments.thisWeek}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">건</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">이번 달 처방</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {dashboardData.prescriptions.completedThisMonth}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">건</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 보고서 탭 */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>진료 현황 요약</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">체질 진단 현황</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>완료된 진단:</span>
                      <span className="font-medium">{dashboardData.assessments.totalCompleted}건</span>
                    </div>
                    <div className="flex justify-between">
                      <span>평균 신뢰도:</span>
                      <span className="font-medium">{Math.round(dashboardData.assessments.averageConfidence * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>대기 중:</span>
                      <span className="font-medium text-orange-600">{dashboardData.assessments.pending}건</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">처방 관리 현황</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>활성 처방:</span>
                      <span className="font-medium">{dashboardData.prescriptions.totalActive}건</span>
                    </div>
                    <div className="flex justify-between">
                      <span>이번 달 완료:</span>
                      <span className="font-medium">{dashboardData.prescriptions.completedThisMonth}건</span>
                    </div>
                    <div className="flex justify-between">
                      <span>총 처방액:</span>
                      <span className="font-medium">{(dashboardData.prescriptions.totalValue / 1000000).toFixed(1)}M원</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">생활 티칭 현황</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-lg">{dashboardData.lifestyle.guidesProvided}</div>
                    <div className="text-gray-600">제공된 가이드</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="font-semibold text-lg">{dashboardData.lifestyle.followingDiet}</div>
                    <div className="text-gray-600">식단 준수 중</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-lg">{dashboardData.lifestyle.followingExercise}</div>
                    <div className="text-gray-600">운동 실천 중</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>성과 지표</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">진단 정확도</span>
                    </div>
                    <span className="font-semibold">{Math.round(dashboardData.assessments.averageConfidence * 100)}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">환자 만족도</span>
                    </div>
                    <span className="font-semibold">4.7/5</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-red-600" />
                      <span className="text-sm">생활 지침 준수율</span>
                    </div>
                    <span className="font-semibold">{Math.round(dashboardData.lifestyle.averageAdherence * 100)}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">처방 완료율</span>
                    </div>
                    <span className="font-semibold">92%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}