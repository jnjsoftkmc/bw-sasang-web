"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Brain,
  FileText,
  Ruler,
  Scan,
  TrendingUp,
  User,
  Download,
  Share,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { 
  calculateConstitution,
  ConstitutionDiagnosis,
  constitutionNames,
  constitutionDescriptions,
  getConstitutionColor,
  getConfidenceMessage
} from "@/lib/constitution-calculator"

interface AssessmentResultsProps {
  patient: any
  assessmentData: {
    questionnaire?: any
    bodyMeasurement?: any
    faceAnalysis?: any
  }
  onBack?: () => void
}

export default function AssessmentResults({ patient, assessmentData, onBack }: AssessmentResultsProps) {
  const [diagnosis, setDiagnosis] = useState<ConstitutionDiagnosis | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const calculateResults = async () => {
      setLoading(true)
      
      // QSCCII 설문 결과만 계산 (현재는 설문만 완성됨)
      if (assessmentData.questionnaire?.responses) {
        try {
          const result = calculateConstitution(assessmentData.questionnaire.responses)
          setDiagnosis(result)
        } catch (error) {
          console.error('설문 분석 오류:', error)
        }
      }

      setLoading(false)
    }

    calculateResults()
  }, [assessmentData])

  const getConfidenceLevel = (score: number) => {
    if (score >= 0.8) return { level: '높음', color: 'text-green-600', bgColor: 'bg-green-50' }
    if (score >= 0.6) return { level: '중간', color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
    return { level: '낮음', color: 'text-red-600', bgColor: 'bg-red-50' }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Brain className="h-12 w-12 mx-auto mb-4 text-blue-500 animate-pulse" />
          <p className="text-lg font-medium mb-2">체질 진단 분석 중...</p>
          <p className="text-gray-600">잠시만 기다려주세요.</p>
        </CardContent>
      </Card>
    )
  }

  const confidenceInfo = diagnosis ? getConfidenceMessage(diagnosis.confidence) : null

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold">체질 진단 결과</h1>
            <p className="text-gray-600">
              {patient?.name} • {patient?.age}세 • {patient?.gender}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            PDF 다운로드
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            공유
          </Button>
        </div>
      </div>

      {/* 종합 결과 */}
      {diagnosis && (
        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Brain className="h-6 w-6" />
              <span>QSCCII 진단 결과</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              {/* 주 체질 */}
              <div>
                <Badge className={`text-2xl p-4 ${getConstitutionColor(diagnosis.primaryConstitution)}`}>
                  {constitutionNames[diagnosis.primaryConstitution]}
                </Badge>
                <p className="text-gray-600 mt-2 text-lg">
                  {constitutionDescriptions[diagnosis.primaryConstitution].characteristics}
                </p>
              </div>

              {/* 신뢰도 */}
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {Math.round(diagnosis.confidence)}%
                  </div>
                  <p className="text-sm text-gray-600">진단 신뢰도</p>
                </div>
                {confidenceInfo && (
                  <div className="p-3 rounded-lg bg-gray-50">
                    <div className={`font-medium ${confidenceInfo.color}`}>
                      {confidenceInfo.message}
                    </div>
                  </div>
                )}
              </div>

              {/* 완성도 */}
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-700">
                  설문 완성도: {Math.round(diagnosis.completeness)}%
                </div>
                <p className="text-sm text-gray-500">
                  총 {diagnosis.totalResponses}개 문항 응답 완료
                </p>
                <Progress value={diagnosis.completeness} className="mt-2" />
              </div>

              {/* 체질별 점수 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {diagnosis.scores.map((score) => (
                  <div key={score.constitution} className="text-center">
                    <div className="mb-2">
                      <Badge className={getConstitutionColor(score.constitution)}>
                        {constitutionNames[score.constitution]}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress value={score.percentage} className="h-2" />
                      <span className="text-sm font-medium">{Math.round(score.percentage)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 상세 결과 탭 */}
      <Tabs defaultValue="detailed" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="detailed">상세 분석</TabsTrigger>
          <TabsTrigger value="questionnaire" disabled={!diagnosis}>
            <FileText className="h-4 w-4 mr-2" />
            설문 결과
          </TabsTrigger>
          <TabsTrigger value="recommendations" disabled={!diagnosis}>
            <TrendingUp className="h-4 w-4 mr-2" />
            건강 관리법
          </TabsTrigger>
        </TabsList>

        <TabsContent value="detailed" className="space-y-6">
          {/* 카테고리별 세부 점수 */}
          {diagnosis && (
            <Card>
              <CardHeader>
                <CardTitle>카테고리별 체질 분석</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {diagnosis.scores[0] && (
                    <>
                      <div>
                        <h4 className="font-semibold mb-4 flex items-center">
                          <User className="h-5 w-5 mr-2" />
                          체형 분석
                        </h4>
                        <div className="grid grid-cols-4 gap-4">
                          {Object.entries(diagnosis.scores[0].categoryScores.body || {}).map(([constitution, score]) => (
                            <div key={constitution} className="text-center">
                              <Badge variant="outline" className="mb-2">
                                {constitutionNames[constitution as keyof typeof constitutionNames]}
                              </Badge>
                              <Progress value={(score / 3) * 100} className="h-2 mb-1" />
                              <span className="text-xs text-gray-600">{score.toFixed(1)}/3.0</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-4 flex items-center">
                          <Brain className="h-5 w-5 mr-2" />
                          성격 분석
                        </h4>
                        <div className="grid grid-cols-4 gap-4">
                          {Object.entries(diagnosis.scores[0].categoryScores.personality || {}).map(([constitution, score]) => (
                            <div key={constitution} className="text-center">
                              <Badge variant="outline" className="mb-2">
                                {constitutionNames[constitution as keyof typeof constitutionNames]}
                              </Badge>
                              <Progress value={(score / 3) * 100} className="h-2 mb-1" />
                              <span className="text-xs text-gray-600">{score.toFixed(1)}/3.0</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-4 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          증상 분석
                        </h4>
                        <div className="grid grid-cols-4 gap-4">
                          {Object.entries(diagnosis.scores[0].categoryScores.symptoms || {}).map(([constitution, score]) => (
                            <div key={constitution} className="text-center">
                              <Badge variant="outline" className="mb-2">
                                {constitutionNames[constitution as keyof typeof constitutionNames]}
                              </Badge>
                              <Progress value={(score / 3) * 100} className="h-2 mb-1" />
                              <span className="text-xs text-gray-600">{score.toFixed(1)}/3.0</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-4 flex items-center">
                          <TrendingUp className="h-5 w-5 mr-2" />
                          선호도 분석
                        </h4>
                        <div className="grid grid-cols-4 gap-4">
                          {Object.entries(diagnosis.scores[0].categoryScores.preferences || {}).map(([constitution, score]) => (
                            <div key={constitution} className="text-center">
                              <Badge variant="outline" className="mb-2">
                                {constitutionNames[constitution as keyof typeof constitutionNames]}
                              </Badge>
                              <Progress value={(score / 3) * 100} className="h-2 mb-1" />
                              <span className="text-xs text-gray-600">{score.toFixed(1)}/3.0</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 주의사항 */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">⚠️ 진단 결과 활용 시 주의사항</p>
                  <ul className="space-y-1">
                    <li>• 본 결과는 체질 진단의 보조 자료로만 활용하시기 바랍니다.</li>
                    <li>• 최종 진단과 치료는 반드시 전문 한의사와 상담하시기 바랍니다.</li>
                    <li>• 개인차가 있을 수 있으므로 획일적인 적용을 피해주세요.</li>
                    <li>• 건강상 문제가 있을 시 즉시 전문의와 상담하시기 바랍니다.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questionnaire">
          {diagnosis && (
            <Card>
              <CardHeader>
                <CardTitle>QSCCII 설문지 분석 결과</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <Badge className={`text-xl p-3 ${getConstitutionColor(diagnosis.primaryConstitution)}`}>
                      {constitutionNames[diagnosis.primaryConstitution]}
                    </Badge>
                    <p className="text-lg mt-2">
                      신뢰도: {Math.round(diagnosis.confidence)}%
                    </p>
                  </div>
                  
                  {/* 체질별 점수 상세 */}
                  <div>
                    <h4 className="font-semibold mb-4">체질별 종합 점수</h4>
                    <div className="space-y-3">
                      {diagnosis.scores.map((score, index) => (
                        <div key={score.constitution} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg font-bold text-gray-600">{index + 1}</span>
                            <Badge className={getConstitutionColor(score.constitution)}>
                              {constitutionNames[score.constitution]}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Progress value={score.percentage} className="w-24 h-2" />
                            <span className="font-medium text-right min-w-[3rem]">
                              {Math.round(score.percentage)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 추천사항 */}
                  {diagnosis.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-4">진단 기반 추천사항</h4>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <ul className="space-y-2">
                          {diagnosis.recommendations.map((recommendation, index) => (
                            <li key={index} className="text-sm text-blue-800 flex items-start">
                              <span className="mr-2">•</span>
                              <span>{recommendation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recommendations">
          {diagnosis && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {constitutionNames[diagnosis.primaryConstitution]} 맞춤 건강 관리법
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 체질별 특성 */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-blue-700">체질 특성</h4>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800">
                          {constitutionDescriptions[diagnosis.primaryConstitution].characteristics}
                        </p>
                        <p className="text-sm text-blue-600 mt-2">
                          성격: {constitutionDescriptions[diagnosis.primaryConstitution].personality}
                        </p>
                      </div>
                    </div>

                    {/* 건강 관리 포인트 */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-green-700">건강 관리 포인트</h4>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800 text-sm">
                          {constitutionDescriptions[diagnosis.primaryConstitution].health}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 식이 요법 */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-purple-700">권장 식단</h4>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <p className="text-purple-800 text-sm">
                          {constitutionDescriptions[diagnosis.primaryConstitution].diet}
                        </p>
                      </div>
                    </div>

                    {/* 생활 습관 */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-orange-700">생활 습관</h4>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <ul className="text-sm text-orange-800 space-y-1">
                          {diagnosis.primaryConstitution === 'taeyang' && (
                            <>
                              <li>• 규칙적인 생활 패턴 유지</li>
                              <li>• 적절한 휴식과 수면</li>
                              <li>• 스트레스 관리</li>
                              <li>• 과로 피하기</li>
                            </>
                          )}
                          {diagnosis.primaryConstitution === 'soyang' && (
                            <>
                              <li>• 충분한 수분 섭취</li>
                              <li>• 감정 조절 훈련</li>
                              <li>• 규칙적인 운동</li>
                              <li>• 과도한 흥분 피하기</li>
                            </>
                          )}
                          {diagnosis.primaryConstitution === 'taeeum' && (
                            <>
                              <li>• 꾸준한 운동과 활동</li>
                              <li>• 체중 관리</li>
                              <li>• 규칙적인 식사</li>
                              <li>• 목표 설정과 실행</li>
                            </>
                          )}
                          {diagnosis.primaryConstitution === 'soeum' && (
                            <>
                              <li>• 충분한 휴식과 수면</li>
                              <li>• 소화기 건강 관리</li>
                              <li>• 따뜻한 환경 유지</li>
                              <li>• 무리한 활동 피하기</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 주의사항 */}
                  <div>
                    <h4 className="font-semibold text-lg text-red-700 mb-4">주의사항</h4>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <ul className="text-sm text-red-800 space-y-1">
                        {diagnosis.primaryConstitution === 'taeyang' && (
                          <>
                            <li>• 과도한 운동이나 활동 피하기</li>
                            <li>• 자극적이고 뜨거운 음식 주의</li>
                            <li>• 감정 조절에 신경쓰기</li>
                          </>
                        )}
                        {diagnosis.primaryConstitution === 'soyang' && (
                          <>
                            <li>• 뜨겁고 매운 음식 피하기</li>
                            <li>• 과로와 스트레스 주의</li>
                            <li>• 과음과 흡연 금지</li>
                          </>
                        )}
                        {diagnosis.primaryConstitution === 'taeeum' && (
                          <>
                            <li>• 차가운 음식과 과식 피하기</li>
                            <li>• 운동 부족 주의</li>
                            <li>• 소극적인 생활 태도 개선</li>
                          </>
                        )}
                        {diagnosis.primaryConstitution === 'soeum' && (
                          <>
                            <li>• 찬 음식과 생것 피하기</li>
                            <li>• 과로와 무리 피하기</li>
                            <li>• 소화불량 유발 음식 주의</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}