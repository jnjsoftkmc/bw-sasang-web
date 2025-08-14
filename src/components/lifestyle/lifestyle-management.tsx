"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Apple,
  Dumbbell,
  Clock,
  Calendar,
  Heart,
  User,
  Search,
  Filter,
  TrendingUp,
  Target,
  Leaf,
  Sun,
  Moon,
  Brain
} from "lucide-react"
import { getConstitutionName, getConstitutionColor } from "@/lib/utils"
import { 
  lifestyleGuidanceData,
  getLifestyleGuidanceByConstitution,
  foodCategories,
  exerciseCategories,
  type Food,
  type Exercise
} from "@/lib/data/lifestyle-guidance"
import LifestyleGuideDetail from "./lifestyle-guide-detail"

// 임시 환자 데이터
const mockPatients = [
  { id: 1, name: "김철수", age: 44, gender: "남성", constitution: "taeeum" },
  { id: 2, name: "이영희", age: 49, gender: "여성", constitution: "soyang" },
  { id: 3, name: "박민수", age: 34, gender: "남성", constitution: "soeum" },
  { id: 4, name: "최지영", age: 38, gender: "여성", constitution: "taeyang" }
]

export default function LifestyleManagement() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [selectedConstitution, setSelectedConstitution] = useState('all')
  const [foodSearchTerm, setFoodSearchTerm] = useState('')
  const [exerciseSearchTerm, setExerciseSearchTerm] = useState('')
  const [selectedFoodCategory, setSelectedFoodCategory] = useState('all')
  const [selectedExerciseCategory, setSelectedExerciseCategory] = useState('all')

  // 체질별 통계 계산
  const constitutionStats = {
    taeyang: mockPatients.filter(p => p.constitution === 'taeyang').length,
    soyang: mockPatients.filter(p => p.constitution === 'soyang').length,
    taeeum: mockPatients.filter(p => p.constitution === 'taeeum').length,
    soeum: mockPatients.filter(p => p.constitution === 'soeum').length
  }

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient)
    setActiveTab('guide')
  }

  const getEffectBadgeColor = (effect: string) => {
    switch (effect) {
      case 'beneficial':
        return 'bg-green-100 text-green-800'
      case 'neutral':
        return 'bg-gray-100 text-gray-800'
      case 'harmful':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEffectLabel = (effect: string) => {
    switch (effect) {
      case 'beneficial':
        return '유익'
      case 'neutral':
        return '보통'
      case 'harmful':
        return '주의'
      default:
        return effect
    }
  }

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'excellent':
        return 'bg-blue-100 text-blue-800'
      case 'good':
        return 'bg-green-100 text-green-800'
      case 'caution':
        return 'bg-yellow-100 text-yellow-800'
      case 'avoid':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSuitabilityLabel = (suitability: string) => {
    switch (suitability) {
      case 'excellent':
        return '최적'
      case 'good':
        return '좋음'
      case 'caution':
        return '주의'
      case 'avoid':
        return '피함'
      default:
        return suitability
    }
  }

  if (activeTab === 'guide' && selectedPatient) {
    return (
      <LifestyleGuideDetail 
        patient={selectedPatient}
        onBack={() => {
          setActiveTab('overview')
          setSelectedPatient(null)
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>개요</span>
          </TabsTrigger>
          <TabsTrigger value="patients" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>환자 관리</span>
          </TabsTrigger>
          <TabsTrigger value="foods" className="flex items-center space-x-2">
            <Apple className="h-4 w-4" />
            <span>음식 가이드</span>
          </TabsTrigger>
          <TabsTrigger value="exercises" className="flex items-center space-x-2">
            <Dumbbell className="h-4 w-4" />
            <span>운동 가이드</span>
          </TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">생활 티칭 대시보드</h2>
            <p className="text-gray-600">체질별 맞춤 생활 지도와 건강 관리 현황을 확인하세요.</p>
          </div>

          {/* 체질별 환자 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Sun className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{constitutionStats.taeyang}</p>
                    <p className="text-sm text-gray-600">태양인</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{constitutionStats.soyang}</p>
                    <p className="text-sm text-gray-600">소양인</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{constitutionStats.taeeum}</p>
                    <p className="text-sm text-gray-600">태음인</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{constitutionStats.soeum}</p>
                    <p className="text-sm text-gray-600">소음인</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 주요 가이드라인 요약 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Apple className="h-5 w-5" />
                  <span>체질별 음식 가이드</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lifestyleGuidanceData.map((guidance) => (
                    <div key={guidance.constitution} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge className={getConstitutionColor(guidance.constitution)}>
                          {getConstitutionName(guidance.constitution)}
                        </Badge>
                        <span className="text-sm">
                          유익: {guidance.foods.beneficial.length}개 | 
                          주의: {guidance.foods.harmful.length}개
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Dumbbell className="h-5 w-5" />
                  <span>체질별 운동 가이드</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lifestyleGuidanceData.map((guidance) => (
                    <div key={guidance.constitution} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge className={getConstitutionColor(guidance.constitution)}>
                          {getConstitutionName(guidance.constitution)}
                        </Badge>
                        <span className="text-sm">
                          권장 운동: {guidance.exercises.length}종류
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 계절별 건강 관리 팁 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>계절별 건강 관리</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['봄', '여름', '가을', '겨울'].map((season, index) => {
                  const seasonKey = ['spring', 'summer', 'autumn', 'winter'][index]
                  return (
                    <div key={season} className="text-center p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">{season}</h4>
                      <p className="text-sm text-gray-600">
                        체질별 맞춤 건강 관리법을 통해 계절에 따른 최적의 생활을 실천하세요.
                      </p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 환자 관리 탭 */}
        <TabsContent value="patients" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">환자별 생활 티칭</h2>
            <p className="text-gray-600">환자별 맞춤 생활 지도를 제공하고 관리하세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <Badge className={getConstitutionColor(patient.constitution)}>
                      {getConstitutionName(patient.constitution)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{patient.age}세 • {patient.gender}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="text-gray-600">최근 관리 항목:</p>
                      <ul className="mt-1 space-y-1">
                        <li className="flex items-center space-x-2">
                          <Apple className="h-3 w-3 text-green-600" />
                          <span>식단 관리</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Dumbbell className="h-3 w-3 text-blue-600" />
                          <span>운동 프로그램</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Heart className="h-3 w-3 text-red-600" />
                          <span>생활 습관</span>
                        </li>
                      </ul>
                    </div>
                    <Button 
                      onClick={() => handlePatientSelect(patient)}
                      className="w-full"
                      size="sm"
                    >
                      상세 가이드 보기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 음식 가이드 탭 */}
        <TabsContent value="foods" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">체질별 음식 가이드</h2>
            <p className="text-gray-600">사상체질에 따른 음식의 효능과 주의사항을 확인하세요.</p>
          </div>

          {/* 검색 및 필터 */}
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="음식명으로 검색..."
                value={foodSearchTerm}
                onChange={(e) => setFoodSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedConstitution} onValueChange={setSelectedConstitution}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="체질" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="taeyang">태양인</SelectItem>
                <SelectItem value="soyang">소양인</SelectItem>
                <SelectItem value="taeeum">태음인</SelectItem>
                <SelectItem value="soeum">소음인</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedFoodCategory} onValueChange={setSelectedFoodCategory}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="분류" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                {foodCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 음식 목록 */}
          <div className="space-y-4">
            {lifestyleGuidanceData
              .filter(guidance => selectedConstitution === 'all' || guidance.constitution === selectedConstitution)
              .map(guidance => (
                <Card key={guidance.constitution}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Badge className={getConstitutionColor(guidance.constitution)}>
                        {getConstitutionName(guidance.constitution)}
                      </Badge>
                      <span>음식 가이드</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...guidance.foods.beneficial, ...guidance.foods.neutral, ...guidance.foods.harmful]
                        .filter(food => 
                          (!foodSearchTerm || food.name.includes(foodSearchTerm)) &&
                          (selectedFoodCategory === 'all' || food.category === selectedFoodCategory)
                        )
                        .map(food => (
                          <div key={food.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{food.name}</h4>
                              <Badge className={getEffectBadgeColor(food.effect)}>
                                {getEffectLabel(food.effect)}
                              </Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                              <p><strong>분류:</strong> {food.category}</p>
                              <p><strong>성미:</strong> {food.properties}</p>
                              <p><strong>효능:</strong> {food.benefits?.join(', ') || food.effects?.join(', ') || '-'}</p>
                              {food.cautions && (
                                <p className="text-red-600"><strong>주의:</strong> {food.cautions.join(', ')}</p>
                              )}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* 운동 가이드 탭 */}
        <TabsContent value="exercises" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">체질별 운동 가이드</h2>
            <p className="text-gray-600">사상체질에 맞는 운동법과 주의사항을 확인하세요.</p>
          </div>

          {/* 검색 및 필터 */}
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="운동명으로 검색..."
                value={exerciseSearchTerm}
                onChange={(e) => setExerciseSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedConstitution} onValueChange={setSelectedConstitution}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="체질" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="taeyang">태양인</SelectItem>
                <SelectItem value="soyang">소양인</SelectItem>
                <SelectItem value="taeeum">태음인</SelectItem>
                <SelectItem value="soeum">소음인</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedExerciseCategory} onValueChange={setSelectedExerciseCategory}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="분류" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                {exerciseCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 운동 목록 */}
          <div className="space-y-4">
            {lifestyleGuidanceData
              .filter(guidance => selectedConstitution === 'all' || guidance.constitution === selectedConstitution)
              .map(guidance => (
                <Card key={guidance.constitution}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Badge className={getConstitutionColor(guidance.constitution)}>
                        {getConstitutionName(guidance.constitution)}
                      </Badge>
                      <span>운동 가이드</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {guidance.exercises
                        .filter(exercise => 
                          (!exerciseSearchTerm || exercise.name.includes(exerciseSearchTerm)) &&
                          (selectedExerciseCategory === 'all' || exercise.category === selectedExerciseCategory)
                        )
                        .map(exercise => (
                          <div key={exercise.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{exercise.name}</h4>
                              <Badge className={getSuitabilityColor(exercise.suitability)}>
                                {getSuitabilityLabel(exercise.suitability)}
                              </Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                              <p><strong>분류:</strong> {exercise.category}</p>
                              <p><strong>강도:</strong> {exercise.intensity}</p>
                              <p><strong>시간:</strong> {exercise.duration}</p>
                              <p><strong>빈도:</strong> {exercise.frequency}</p>
                              <p><strong>효과:</strong> {exercise.benefits.join(', ')}</p>
                              {exercise.precautions && (
                                <p className="text-amber-600"><strong>주의:</strong> {exercise.precautions.join(', ')}</p>
                              )}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}