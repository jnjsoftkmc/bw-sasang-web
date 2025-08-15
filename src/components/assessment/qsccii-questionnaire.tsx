"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  FileText,
  Save
} from "lucide-react"
import { qscciiQuestions } from "@/lib/data/qsccii-questions"

interface QSCCIIQuestionnaireProps {
  onComplete: (data: any) => void
  completed: boolean
}

export default function QSCCIIQuestionnaire({ onComplete, completed }: QSCCIIQuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<number, number>>({})
  const [showSummary, setShowSummary] = useState(false)

  const currentQuestion = qscciiQuestions[currentQuestionIndex]
  const totalQuestions = qscciiQuestions.length
  const answeredQuestions = Object.keys(responses).length
  const progressPercentage = (currentQuestionIndex / totalQuestions) * 100
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1

  console.log('Component state:', {
    currentQuestionIndex,
    totalQuestions,
    currentQuestion: currentQuestion ? { id: currentQuestion.id, question: currentQuestion.question } : null,
    responses,
    answeredQuestions
  })

  const handleResponse = (questionId: number, response: number) => {
    console.log('handleResponse called:', { questionId, response })
    setResponses(prev => {
      const newResponses = {
        ...prev,
        [questionId]: response
      }
      console.log('Updated responses:', newResponses)
      return newResponses
    })
  }

  const handleNext = () => {
    console.log('handleNext called:', { currentQuestionIndex, isLastQuestion, currentResponse: responses[currentQuestion.id] })
    if (isLastQuestion) {
      setShowSummary(true)
    } else {
      setCurrentQuestionIndex(prev => {
        console.log('Moving from question', prev, 'to question', prev + 1)
        return prev + 1
      })
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleComplete = () => {
    const responseData = Object.entries(responses).map(([questionId, response]) => ({
      questionId: parseInt(questionId),
      response
    }))
    
    onComplete({
      responses: responseData,
      completedAt: new Date().toISOString()
    })
  }

  const getCategoryLabel = (category: string) => {
    const labels = {
      body: '체형',
      personality: '성격',
      symptoms: '증상',
      preferences: '선호도'
    }
    return labels[category as keyof typeof labels] || category
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      body: 'bg-blue-100 text-blue-800',
      personality: 'bg-green-100 text-green-800',
      symptoms: 'bg-orange-100 text-orange-800',
      preferences: 'bg-purple-100 text-purple-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (completed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <span>QSCCII 설문 완료</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">설문이 완료되었습니다</p>
                <p className="text-sm text-green-600">
                  총 {totalQuestions}개 문항에 모두 응답하였습니다.
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-gray-600">
              설문 결과는 체질 진단 결과에서 확인하실 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (showSummary) {
    const categoryStats = qscciiQuestions.reduce((acc, question) => {
      const category = question.category
      if (!acc[category]) {
        acc[category] = { total: 0, answered: 0 }
      }
      acc[category].total++
      if (responses[question.id]) {
        acc[category].answered++
      }
      return acc
    }, {} as Record<string, { total: number; answered: number }>)

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span>설문 완료 확인</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 전체 통계 */}
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {answeredQuestions} / {totalQuestions}
            </div>
            <p className="text-gray-600">문항 응답 완료</p>
            <Progress value={(answeredQuestions / totalQuestions) * 100} className="mt-4" />
          </div>

          {/* 카테고리별 통계 */}
          <div>
            <h3 className="font-semibold mb-3">카테고리별 응답 현황</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(categoryStats).map(([category, stats]) => (
                <div key={category} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(category)}>
                      {getCategoryLabel(category)}
                    </Badge>
                    <span className="text-sm font-medium">
                      {stats.answered}/{stats.total}
                    </span>
                  </div>
                  <Progress value={(stats.answered / stats.total) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* 미응답 문항 확인 */}
          {answeredQuestions < totalQuestions && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 font-medium">
                ⚠️ {totalQuestions - answeredQuestions}개 문항이 미응답 상태입니다.
              </p>
              <p className="text-sm text-yellow-600 mt-1">
                정확한 진단을 위해 모든 문항에 응답하는 것을 권장합니다.
              </p>
            </div>
          )}

          {/* 버튼 */}
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowSummary(false)}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              설문으로 돌아가기
            </Button>
            <Button
              onClick={handleComplete}
              className="flex-1 flex items-center justify-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>설문 완료</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* 진행 상황 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Badge className={getCategoryColor(currentQuestion.category)}>
                {getCategoryLabel(currentQuestion.category)}
              </Badge>
              <span className="text-sm text-gray-600">
                {currentQuestionIndex + 1} / {totalQuestions}
              </span>
            </div>
            <span className="text-sm font-medium">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} />
        </CardContent>
      </Card>

      {/* 현재 문항 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Q{currentQuestionIndex + 1}. {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={responses[currentQuestion.id]?.toString() || ""}
            onValueChange={(value) => {
              console.log('RadioGroup onValueChange:', { value, questionId: currentQuestion.id })
              handleResponse(currentQuestion.id, parseInt(value))
            }}
          >
            {currentQuestion.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value.toString()}
                  id={`option-${option.value}`}
                />
                <Label 
                  htmlFor={`option-${option.value}`}
                  className="flex-1 cursor-pointer py-3 px-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* 네비게이션 버튼 */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              이전
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={false}
              className={!responses[currentQuestion.id] ? "bg-gray-300" : ""}
            >
              {isLastQuestion ? (
                <>
                  완료 확인
                  <CheckCircle className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  다음
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* 응답 현황 */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-500">
              총 응답: {answeredQuestions}/{totalQuestions} 
              ({Math.round((answeredQuestions / totalQuestions) * 100)}%)
            </p>
            <p className="text-xs text-red-500 mt-1">
              DEBUG: 현재 질문 ID: {currentQuestion.id}, 현재 응답: {responses[currentQuestion.id] || 'None'}, 
              버튼 disabled: {!responses[currentQuestion.id] ? 'Yes' : 'No'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}