"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Ruler, 
  Scan, 
  Brain,
  CheckCircle,
  Circle,
  ArrowRight,
  User,
  Play
} from "lucide-react"
import QSCCIIQuestionnaire from "./qsccii-questionnaire"
import BodyMeasurement from "./body-measurement"
import FaceAnalysis from "./face-analysis"
import AssessmentResults from "./assessment-results"

interface AssessmentStep {
  id: string
  title: string
  description: string
  icon: any
  completed: boolean
  data?: any
}

export default function AssessmentWorkflow() {
  const [currentStep, setCurrentStep] = useState<string>('select-patient')
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [assessmentSteps, setAssessmentSteps] = useState<AssessmentStep[]>([
    {
      id: 'questionnaire',
      title: 'QSCCII 설문지',
      description: '77개 문항의 체질 분류 설문조사',
      icon: FileText,
      completed: false
    },
    {
      id: 'body-measurement',
      title: '신체 계측',
      description: '키, 체중, 체형 데이터 측정',
      icon: Ruler,
      completed: false
    },
    {
      id: 'face-analysis',
      title: '얼굴 분석',
      description: '얼굴 형태 및 비율 분석',
      icon: Scan,
      completed: false
    }
  ])

  // 임시 환자 데이터
  const mockPatients = [
    { id: 1, name: "김철수", age: 44, gender: "남성" },
    { id: 2, name: "이영희", age: 49, gender: "여성" },
    { id: 3, name: "박민수", age: 34, gender: "남성" }
  ]

  const completedSteps = assessmentSteps.filter(step => step.completed).length
  const progressPercentage = (completedSteps / assessmentSteps.length) * 100

  const handleStepComplete = (stepId: string, data: any) => {
    setAssessmentSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, completed: true, data } 
        : step
    ))
  }

  const handleStartAssessment = () => {
    if (selectedPatient) {
      setCurrentStep('workflow')
    }
  }

  const canViewResults = completedSteps > 0

  if (currentStep === 'select-patient') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-6 w-6" />
              <span>환자 선택</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              체질 진단을 실시할 환자를 선택해주세요.
            </p>
            <div className="space-y-3">
              {mockPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedPatient?.id === patient.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{patient.name}</h3>
                      <p className="text-sm text-gray-600">
                        {patient.age}세 • {patient.gender}
                      </p>
                    </div>
                    {selectedPatient?.id === patient.id && (
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button 
                onClick={handleStartAssessment}
                disabled={!selectedPatient}
                className="w-full flex items-center justify-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>체질 진단 시작</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === 'results') {
    return (
      <AssessmentResults 
        patient={selectedPatient}
        assessmentData={{
          questionnaire: assessmentSteps.find(s => s.id === 'questionnaire')?.data,
          bodyMeasurement: assessmentSteps.find(s => s.id === 'body-measurement')?.data,
          faceAnalysis: assessmentSteps.find(s => s.id === 'face-analysis')?.data
        }}
        onBack={() => setCurrentStep('workflow')}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* 환자 정보 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <h3 className="font-semibold">{selectedPatient?.name}</h3>
                <p className="text-sm text-gray-600">
                  {selectedPatient?.age}세 • {selectedPatient?.gender}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep('select-patient')}
            >
              환자 변경
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 진행 상태 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>체질 진단 진행상황</CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {completedSteps}/{assessmentSteps.length} 완료
              </span>
              <Badge variant={completedSteps === assessmentSteps.length ? "default" : "secondary"}>
                {Math.round(progressPercentage)}%
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {assessmentSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  className={`border rounded-lg p-4 ${
                    step.completed 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    {step.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-400" />
                    )}
                    <Icon className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">{step.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 pl-9">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* 진단 도구 탭 */}
      <Tabs defaultValue="questionnaire" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="questionnaire" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>설문지</span>
          </TabsTrigger>
          <TabsTrigger value="body-measurement" className="flex items-center space-x-2">
            <Ruler className="h-4 w-4" />
            <span>신체계측</span>
          </TabsTrigger>
          <TabsTrigger value="face-analysis" className="flex items-center space-x-2">
            <Scan className="h-4 w-4" />
            <span>얼굴분석</span>
          </TabsTrigger>
          <TabsTrigger 
            value="results" 
            className="flex items-center space-x-2"
            disabled={!canViewResults}
          >
            <Brain className="h-4 w-4" />
            <span>결과</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="questionnaire" className="space-y-4">
          <QSCCIIQuestionnaire 
            onComplete={(data) => handleStepComplete('questionnaire', data)}
            completed={assessmentSteps.find(s => s.id === 'questionnaire')?.completed || false}
          />
        </TabsContent>

        <TabsContent value="body-measurement" className="space-y-4">
          <BodyMeasurement 
            onComplete={(data) => handleStepComplete('body-measurement', data)}
            completed={assessmentSteps.find(s => s.id === 'body-measurement')?.completed || false}
          />
        </TabsContent>

        <TabsContent value="face-analysis" className="space-y-4">
          <FaceAnalysis 
            onComplete={(data) => handleStepComplete('face-analysis', data)}
            completed={assessmentSteps.find(s => s.id === 'face-analysis')?.completed || false}
          />
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {canViewResults ? (
            <AssessmentResults 
              patient={selectedPatient}
              assessmentData={{
                questionnaire: assessmentSteps.find(s => s.id === 'questionnaire')?.data,
                bodyMeasurement: assessmentSteps.find(s => s.id === 'body-measurement')?.data,
                faceAnalysis: assessmentSteps.find(s => s.id === 'face-analysis')?.data
              }}
            />
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">
                  진단 결과를 보려면 최소 하나의 진단 방법을 완료해주세요.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}