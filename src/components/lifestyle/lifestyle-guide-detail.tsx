"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft,
  User,
  Apple,
  Dumbbell,
  Clock,
  Calendar,
  Heart,
  Brain,
  Sun,
  Thermometer,
  AlertCircle,
  CheckCircle,
  XCircle,
  Target,
  TrendingUp,
  Leaf
} from "lucide-react"
import { getConstitutionName, getConstitutionColor } from "@/lib/utils"
import { getLifestyleGuidanceByConstitution, getSeasonalAdvice, type LifestyleGuidance } from "@/lib/data/lifestyle-guidance"

interface LifestyleGuideDetailProps {
  patient: any
  onBack: () => void
}

export default function LifestyleGuideDetail({ patient, onBack }: LifestyleGuideDetailProps) {
  const [activeTab, setActiveTab] = useState('daily')
  const guidance = getLifestyleGuidanceByConstitution(patient.constitution)
  
  if (!guidance) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600">해당 체질의 생활 가이드를 찾을 수 없습니다.</p>
        <Button onClick={onBack} className="mt-4">돌아가기</Button>
      </div>
    )
  }

  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1
    if (month >= 3 && month <= 5) return 'spring'
    if (month >= 6 && month <= 8) return 'summer'
    if (month >= 9 && month <= 11) return 'autumn'
    return 'winter'
  }

  const getEffectIcon = (effect: string) => {
    switch (effect) {
      case 'beneficial':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'harmful':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getEffectColor = (effect: string) => {
    switch (effect) {
      case 'beneficial':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'harmful':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getIntensityBadge = (intensity: string) => {
    const config = {
      low: { label: '저강도', color: 'bg-blue-100 text-blue-800' },
      moderate: { label: '중강도', color: 'bg-yellow-100 text-yellow-800' },
      high: { label: '고강도', color: 'bg-red-100 text-red-800' }
    }
    return config[intensity as keyof typeof config] || { label: intensity, color: 'bg-gray-100 text-gray-800' }
  }

  const currentSeason = getCurrentSeason()
  const seasonalAdvice = getSeasonalAdvice(patient.constitution, currentSeason)

  return (
    <div className="space-y-6">
      {/* 환자 정보 헤더 */}
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold flex items-center space-x-3">
            <User className="h-6 w-6" />
            <span>{patient.name}님의 맞춤 생활 가이드</span>
            <Badge className={getConstitutionColor(patient.constitution)}>
              {getConstitutionName(patient.constitution)}
            </Badge>
          </h1>
          <p className="text-gray-600 mt-1">
            {patient.age}세 • {patient.gender} • 체질별 맞춤 건강 관리법
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 max-w-3xl">
          <TabsTrigger value="daily" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>일상</span>
          </TabsTrigger>
          <TabsTrigger value="food" className="flex items-center space-x-2">
            <Apple className="h-4 w-4" />
            <span>식단</span>
          </TabsTrigger>
          <TabsTrigger value="exercise" className="flex items-center space-x-2">
            <Dumbbell className="h-4 w-4" />
            <span>운동</span>
          </TabsTrigger>
          <TabsTrigger value="seasonal" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>계절</span>
          </TabsTrigger>
          <TabsTrigger value="mental" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>정신건강</span>
          </TabsTrigger>
        </TabsList>

        {/* 일상 생활 가이드 */}
        <TabsContent value="daily" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>일상 생활 루틴</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <span>수면 패턴</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-blue-50 rounded">
                      <span>기상 시간</span>
                      <span className="font-medium">{guidance.dailyRoutine.wakeTime}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-purple-50 rounded">
                      <span>취침 시간</span>
                      <span className="font-medium">{guidance.dailyRoutine.sleepTime}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <Apple className="h-4 w-4" />
                    <span>식사 시간</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    {guidance.dailyRoutine.mealTimes.map((time, index) => (
                      <div key={index} className="flex justify-between p-2 bg-green-50 rounded">
                        <span>{['아침', '점심', '저녁'][index]} 식사</span>
                        <span className="font-medium">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>생활 지침</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {guidance.dailyRoutine.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Thermometer className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">운동 시간</h4>
                    <p className="text-sm text-blue-700">
                      <strong>{guidance.dailyRoutine.exerciseTime}</strong>에 운동하는 것이 가장 효과적입니다.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 식단 가이드 */}
        <TabsContent value="food" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 유익한 음식 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>권장 음식</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {guidance.foods.beneficial.map((food) => (
                    <div key={food.id} className={`border rounded-lg p-3 ${getEffectColor(food.effect)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{food.name}</h4>
                        {getEffectIcon(food.effect)}
                      </div>
                      <div className="space-y-1 text-xs">
                        <p><strong>분류:</strong> {food.category}</p>
                        <p><strong>성미:</strong> {food.properties}</p>
                        {food.benefits && (
                          <p><strong>효능:</strong> {food.benefits.slice(0, 2).join(', ')}</p>
                        )}
                        {food.cookingMethods && (
                          <p><strong>조리법:</strong> {food.cookingMethods.slice(0, 2).join(', ')}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 중성 음식 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-gray-500" />
                  <span>보통 음식</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {guidance.foods.neutral.map((food) => (
                    <div key={food.id} className={`border rounded-lg p-3 ${getEffectColor(food.effect)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{food.name}</h4>
                        {getEffectIcon(food.effect)}
                      </div>
                      <div className="space-y-1 text-xs">
                        <p><strong>분류:</strong> {food.category}</p>
                        <p><strong>성미:</strong> {food.properties}</p>
                      </div>
                    </div>
                  ))}
                  {guidance.foods.neutral.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      중성 음식 정보가 없습니다.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 주의할 음식 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span>주의 음식</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {guidance.foods.harmful.map((food) => (
                    <div key={food.id} className={`border rounded-lg p-3 ${getEffectColor(food.effect)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{food.name}</h4>
                        {getEffectIcon(food.effect)}
                      </div>
                      <div className="space-y-1 text-xs">
                        <p><strong>분류:</strong> {food.category}</p>
                        <p><strong>성미:</strong> {food.properties}</p>
                        {food.cautions && (
                          <p className="text-red-600"><strong>주의:</strong> {food.cautions.slice(0, 2).join(', ')}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 운동 가이드 */}
        <TabsContent value="exercise" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Dumbbell className="h-5 w-5" />
                <span>추천 운동 프로그램</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guidance.exercises.map((exercise) => (
                  <div key={exercise.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-lg">{exercise.name}</h4>
                      <Badge className={getIntensityBadge(exercise.intensity).color}>
                        {getIntensityBadge(exercise.intensity).label}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-blue-50 p-2 rounded">
                          <span className="font-medium">분류:</span> {exercise.category}
                        </div>
                        <div className="bg-green-50 p-2 rounded">
                          <span className="font-medium">시간:</span> {exercise.duration}
                        </div>
                        <div className="bg-purple-50 p-2 rounded col-span-2">
                          <span className="font-medium">빈도:</span> {exercise.frequency}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold mb-2">운동 효과</h5>
                        <ul className="space-y-1">
                          {exercise.benefits.map((benefit, index) => (
                            <li key={index} className="text-sm flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {exercise.tips && (
                        <div>
                          <h5 className="font-semibold mb-2">운동 팁</h5>
                          <ul className="space-y-1">
                            {exercise.tips.map((tip, index) => (
                              <li key={index} className="text-sm flex items-center space-x-2">
                                <Target className="h-3 w-3 text-blue-600" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {exercise.precautions && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                          <h5 className="font-semibold mb-2 text-yellow-800">주의사항</h5>
                          <ul className="space-y-1">
                            {exercise.precautions.map((precaution, index) => (
                              <li key={index} className="text-sm flex items-start space-x-2">
                                <AlertCircle className="h-3 w-3 text-yellow-600 mt-0.5" />
                                <span className="text-yellow-700">{precaution}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 계절별 가이드 */}
        <TabsContent value="seasonal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>계절별 건강 관리</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(guidance.seasonalAdvice).map(([season, advice]) => {
                  const seasonInfo = {
                    spring: { name: '봄', icon: Leaf, color: 'bg-green-100 text-green-800' },
                    summer: { name: '여름', icon: Sun, color: 'bg-red-100 text-red-800' },
                    autumn: { name: '가을', icon: Leaf, color: 'bg-orange-100 text-orange-800' },
                    winter: { name: '겨울', icon: Thermometer, color: 'bg-blue-100 text-blue-800' }
                  }[season as keyof typeof guidance.seasonalAdvice]

                  const Icon = seasonInfo?.icon || Calendar
                  const isCurrentSeason = season === currentSeason

                  return (
                    <div 
                      key={season} 
                      className={`border rounded-lg p-4 ${isCurrentSeason ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                    >
                      <div className="flex items-center space-x-2 mb-3">
                        <Icon className="h-5 w-5" />
                        <h4 className="font-semibold">{seasonInfo?.name}</h4>
                        {isCurrentSeason && (
                          <Badge variant="secondary">현재</Badge>
                        )}
                      </div>
                      <ul className="space-y-2">
                        {advice.map((item, index) => (
                          <li key={index} className="text-sm flex items-start space-x-2">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* 현재 계절 특별 조언 */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-800">
                <TrendingUp className="h-5 w-5" />
                <span>이번 계절 특별 관리법</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {seasonalAdvice.map((advice, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                    <span className="text-sm text-blue-800">{advice}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 정신 건강 가이드 */}
        <TabsContent value="mental" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>스트레스 관리</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {guidance.mentalHealth.stressManagement.map((method, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                      <Heart className="h-4 w-4 text-red-600" />
                      <span className="text-sm">{method}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <span>감정 균형</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {guidance.mentalHealth.emotionalBalance.map((method, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{method}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  <span>명상 & 마음챙김</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {guidance.mentalHealth.meditation.map((method, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <Brain className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">{method}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}