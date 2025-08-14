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
  calculateConstitutionFromQuestionnaire,
  calculateConstitutionFromBodyMeasurement,
  calculateConstitutionFromFaceAnalysis,
  integrateAssessmentResults,
  AssessmentResult
} from "@/lib/constitution-algorithm"
import { qscciiQuestions } from "@/lib/data/qsccii-questions"
import { getConstitutionName, getConstitutionColor, formatConfidenceScore, getConstitutionDescription } from "@/lib/utils"

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
  const [results, setResults] = useState<{
    questionnaire?: AssessmentResult
    bodyMeasurement?: AssessmentResult
    faceAnalysis?: AssessmentResult
    integrated?: AssessmentResult
  }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const calculateResults = async () => {
      setLoading(true)
      
      const newResults: typeof results = {}

      // QSCCII 설문 결과 계산
      if (assessmentData.questionnaire?.responses) {
        try {
          newResults.questionnaire = calculateConstitutionFromQuestionnaire(
            assessmentData.questionnaire.responses,
            qscciiQuestions
          )
        } catch (error) {
          console.error('설문 분석 오류:', error)
        }
      }

      // 신체 계측 결과 계산
      if (assessmentData.bodyMeasurement) {
        try {
          newResults.bodyMeasurement = calculateConstitutionFromBodyMeasurement(assessmentData.bodyMeasurement)
        } catch (error) {
          console.error('신체계측 분석 오류:', error)
        }
      }

      // 얼굴 분석 결과 계산
      if (assessmentData.faceAnalysis && (
        assessmentData.faceAnalysis.faceLength && 
        assessmentData.faceAnalysis.faceWidth &&
        assessmentData.faceAnalysis.foreheadWidth &&
        assessmentData.faceAnalysis.cheekboneWidth &&
        assessmentData.faceAnalysis.jawWidth
      )) {
        try {
          newResults.faceAnalysis = calculateConstitutionFromFaceAnalysis(assessmentData.faceAnalysis)
        } catch (error) {
          console.error('얼굴분석 오류:', error)
        }
      }

      // 통합 결과 계산
      if (Object.keys(newResults).length > 0) {
        try {
          newResults.integrated = integrateAssessmentResults(newResults)
        } catch (error) {
          console.error('통합분석 오류:', error)
        }
      }

      setResults(newResults)
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

  const integratedResult = results.integrated
  const hasMultipleMethods = Object.keys(results).filter(key => key !== 'integrated').length > 1

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
      {integratedResult && (
        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Brain className="h-6 w-6" />
              <span>종합 진단 결과</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              {/* 주 체질 */}
              <div>
                <Badge className={`text-2xl p-4 ${getConstitutionColor(integratedResult.finalConstitution)}`}>
                  {getConstitutionName(integratedResult.finalConstitution)}
                </Badge>
                <p className="text-gray-600 mt-2 text-lg">
                  {getConstitutionDescription(integratedResult.finalConstitution)}
                </p>
              </div>

              {/* 신뢰도 */}
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {formatConfidenceScore(integratedResult.confidenceScore)}
                  </div>
                  <p className="text-sm text-gray-600">진단 신뢰도</p>
                </div>
                <div className={`p-3 rounded-lg ${getConfidenceLevel(integratedResult.confidenceScore).bgColor}`}>
                  <div className={`font-medium ${getConfidenceLevel(integratedResult.confidenceScore).color}`}>
                    신뢰도: {getConfidenceLevel(integratedResult.confidenceScore).level}
                  </div>
                </div>
              </div>

              {/* 체질별 점수 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {Object.entries(integratedResult.scores).map(([constitution, score]) => (
                  <div key={constitution} className="text-center">
                    <div className="mb-2">
                      <Badge className={getConstitutionColor(constitution)}>
                        {getConstitutionName(constitution)}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress value={score * 100} className="h-2" />
                      <span className="text-sm font-medium">{Math.round(score * 100)}%</span>
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="detailed">상세 분석</TabsTrigger>
          <TabsTrigger value="questionnaire" disabled={!results.questionnaire}>
            <FileText className="h-4 w-4 mr-2" />
            설문 결과
          </TabsTrigger>
          <TabsTrigger value="body" disabled={!results.bodyMeasurement}>
            <Ruler className="h-4 w-4 mr-2" />
            신체 계측
          </TabsTrigger>
          <TabsTrigger value="face" disabled={!results.faceAnalysis}>
            <Scan className="h-4 w-4 mr-2" />
            얼굴 분석
          </TabsTrigger>
        </TabsList>

        <TabsContent value="detailed" className="space-y-6">
          {/* 진단 방법별 결과 비교 */}
          <Card>
            <CardHeader>
              <CardTitle>진단 방법별 결과 비교</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.questionnaire && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">QSCCII 설문지</p>
                        <p className="text-sm text-gray-600">
                          신뢰도: {formatConfidenceScore(results.questionnaire.confidenceScore)}
                        </p>
                      </div>
                    </div>
                    <Badge className={getConstitutionColor(results.questionnaire.finalConstitution)}>
                      {getConstitutionName(results.questionnaire.finalConstitution)}
                    </Badge>
                  </div>
                )}

                {results.bodyMeasurement && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Ruler className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">신체 계측</p>
                        <p className="text-sm text-gray-600">
                          신뢰도: {formatConfidenceScore(results.bodyMeasurement.confidenceScore)}
                        </p>
                      </div>
                    </div>
                    <Badge className={getConstitutionColor(results.bodyMeasurement.finalConstitution)}>
                      {getConstitutionName(results.bodyMeasurement.finalConstitution)}
                    </Badge>
                  </div>
                )}

                {results.faceAnalysis && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Scan className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">얼굴 분석</p>
                        <p className="text-sm text-gray-600">
                          신뢰도: {formatConfidenceScore(results.faceAnalysis.confidenceScore)}
                        </p>
                      </div>
                    </div>
                    <Badge className={getConstitutionColor(results.faceAnalysis.finalConstitution)}>
                      {getConstitutionName(results.faceAnalysis.finalConstitution)}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 체질별 특성 및 건강 관리법 */}
          {integratedResult && (
            <Card>
              <CardHeader>
                <CardTitle>{getConstitutionName(integratedResult.finalConstitution)} 특성 및 관리법</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-700">권장사항</h4>
                    <ul className="space-y-2 text-sm">
                      {integratedResult.finalConstitution === 'taeyang' && (
                        <>
                          <li>• 새콤하고 시원한 음식 (포도, 복숭아 등)</li>
                          <li>• 가벼운 유산소 운동</li>
                          <li>• 충분한 수분 섭취</li>
                          <li>• 스트레스 관리</li>
                        </>
                      )}
                      {integratedResult.finalConstitution === 'soyang' && (
                        <>
                          <li>• 시원하고 담백한 음식 (해산물, 채소 등)</li>
                          <li>• 적당한 운동과 충분한 휴식</li>
                          <li>• 찬 음식과 차가운 물 섭취</li>
                          <li>• 감정 조절과 마음의 평온</li>
                        </>
                      )}
                      {integratedResult.finalConstitution === 'taeeum' && (
                        <>
                          <li>• 따뜻하고 기름기 있는 음식 (소고기, 견과류 등)</li>
                          <li>• 활발한 운동과 땀 배출</li>
                          <li>• 규칙적인 생활 패턴</li>
                          <li>• 체중 관리와 금연</li>
                        </>
                      )}
                      {integratedResult.finalConstitution === 'soeum' && (
                        <>
                          <li>• 따뜻하고 소화가 잘되는 음식 (닭고기, 따뜻한 차 등)</li>
                          <li>• 가벼운 운동과 충분한 휴식</li>
                          <li>• 따뜻한 음식과 실온 물 섭취</li>
                          <li>• 소화기 건강 관리</li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-red-700">주의사항</h4>
                    <ul className="space-y-2 text-sm">
                      {integratedResult.finalConstitution === 'taeyang' && (
                        <>
                          <li>• 맵고 자극적인 음식 피하기</li>
                          <li>• 과도한 운동 금지</li>
                          <li>• 과식 주의</li>
                          <li>• 과로와 스트레스 피하기</li>
                        </>
                      )}
                      {integratedResult.finalConstitution === 'soyang' && (
                        <>
                          <li>• 뜨거운 음식과 자극적인 음식 피하기</li>
                          <li>• 과도한 운동과 사우나 피하기</li>
                          <li>• 흥분과 스트레스 피하기</li>
                          <li>• 과음과 늦은 잠자리 피하기</li>
                        </>
                      )}
                      {integratedResult.finalConstitution === 'taeeum' && (
                        <>
                          <li>• 찬 음식과 생식 피하기</li>
                          <li>• 과식과 폭식 주의</li>
                          <li>• 운동 부족 주의</li>
                          <li>• 게으름과 우울감 주의</li>
                        </>
                      )}
                      {integratedResult.finalConstitution === 'soeum' && (
                        <>
                          <li>• 찬 음식과 생과일 과다 섭취 피하기</li>
                          <li>• 과로와 무리한 운동 피하기</li>
                          <li>• 스트레스와 과로 피하기</li>
                          <li>• 소화불량 유발 음식 주의</li>
                        </>
                      )}
                    </ul>
                  </div>
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

        {/* 개별 결과 탭들 */}
        <TabsContent value="questionnaire">
          {results.questionnaire && (
            <Card>
              <CardHeader>
                <CardTitle>QSCCII 설문지 분석 결과</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <Badge className={`text-xl p-3 ${getConstitutionColor(results.questionnaire.finalConstitution)}`}>
                      {getConstitutionName(results.questionnaire.finalConstitution)}
                    </Badge>
                    <p className="text-lg mt-2">
                      신뢰도: {formatConfidenceScore(results.questionnaire.confidenceScore)}
                    </p>
                  </div>
                  
                  {/* 카테고리별 점수 */}
                  <div>
                    <h4 className="font-semibold mb-4">카테고리별 분석</h4>
                    <div className="space-y-4">
                      {Object.entries(results.questionnaire.categoryScores).map(([category, scores]) => {
                        const categoryNames = {
                          body: '체형',
                          personality: '성격',
                          symptoms: '증상',
                          preferences: '선호도'
                        }
                        return (
                          <div key={category}>
                            <h5 className="font-medium mb-2">{categoryNames[category as keyof typeof categoryNames]}</h5>
                            <div className="grid grid-cols-4 gap-2">
                              {Object.entries(scores).map(([constitution, score]) => (
                                <div key={constitution} className="text-center">
                                  <Badge variant="outline" className="text-xs mb-1">
                                    {getConstitutionName(constitution)}
                                  </Badge>
                                  <Progress value={score * 100} className="h-2" />
                                  <span className="text-xs">{Math.round(score * 100)}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="body">
          {results.bodyMeasurement && (
            <Card>
              <CardHeader>
                <CardTitle>신체 계측 분석 결과</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <Badge className={`text-xl p-3 ${getConstitutionColor(results.bodyMeasurement.finalConstitution)}`}>
                    {getConstitutionName(results.bodyMeasurement.finalConstitution)}
                  </Badge>
                  <p className="text-lg mt-2">
                    신뢰도: {formatConfidenceScore(results.bodyMeasurement.confidenceScore)}
                  </p>
                </div>
                
                {/* 신체 데이터 표시 */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {assessmentData.bodyMeasurement.height && (
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-600">키</p>
                      <p className="text-lg font-semibold">{assessmentData.bodyMeasurement.height}cm</p>
                    </div>
                  )}
                  {assessmentData.bodyMeasurement.weight && (
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-600">체중</p>
                      <p className="text-lg font-semibold">{assessmentData.bodyMeasurement.weight}kg</p>
                    </div>
                  )}
                  {assessmentData.bodyMeasurement.bmi && (
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-600">BMI</p>
                      <p className="text-lg font-semibold">{assessmentData.bodyMeasurement.bmi}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="face">
          {results.faceAnalysis && (
            <Card>
              <CardHeader>
                <CardTitle>얼굴 분석 결과</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <Badge className={`text-xl p-3 ${getConstitutionColor(results.faceAnalysis.finalConstitution)}`}>
                    {getConstitutionName(results.faceAnalysis.finalConstitution)}
                  </Badge>
                  <p className="text-lg mt-2">
                    신뢰도: {formatConfidenceScore(results.faceAnalysis.confidenceScore)}
                  </p>
                </div>
                
                {/* 얼굴 측정 데이터 */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {assessmentData.faceAnalysis.faceLength && (
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-600">얼굴 길이</p>
                      <p className="text-lg font-semibold">{assessmentData.faceAnalysis.faceLength}mm</p>
                    </div>
                  )}
                  {assessmentData.faceAnalysis.faceWidth && (
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-600">얼굴 너비</p>
                      <p className="text-lg font-semibold">{assessmentData.faceAnalysis.faceWidth}mm</p>
                    </div>
                  )}
                  {assessmentData.faceAnalysis.foreheadWidth && (
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-600">이마 너비</p>
                      <p className="text-lg font-semibold">{assessmentData.faceAnalysis.foreheadWidth}mm</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}