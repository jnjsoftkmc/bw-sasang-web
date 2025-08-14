"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Ruler,
  Weight,
  Calculator,
  CheckCircle,
  Save,
  Info
} from "lucide-react"
import { calculateBMI, getBMICategory } from "@/lib/utils"

interface BodyMeasurementProps {
  onComplete: (data: any) => void
  completed: boolean
}

export default function BodyMeasurement({ onComplete, completed }: BodyMeasurementProps) {
  const [measurements, setMeasurements] = useState({
    height: '',
    weight: '',
    shoulderWidth: '',
    waistCircumference: '',
    hipCircumference: '',
    chestCircumference: '',
    bodyFatPercentage: '',
    muscleMass: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [calculatedBMI, setCalculatedBMI] = useState<number | null>(null)

  const handleChange = (field: string, value: string) => {
    setMeasurements(prev => ({ ...prev, [field]: value }))
    
    // 에러 클리어
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }

    // BMI 자동 계산
    if (field === 'height' || field === 'weight') {
      const newMeasurements = { ...measurements, [field]: value }
      if (newMeasurements.height && newMeasurements.weight) {
        const height = parseFloat(newMeasurements.height)
        const weight = parseFloat(newMeasurements.weight)
        if (!isNaN(height) && !isNaN(weight) && height > 0 && weight > 0) {
          setCalculatedBMI(calculateBMI(height, weight))
        }
      }
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!measurements.height || parseFloat(measurements.height) <= 0) {
      newErrors.height = "키를 올바르게 입력해주세요"
    } else if (parseFloat(measurements.height) < 100 || parseFloat(measurements.height) > 250) {
      newErrors.height = "키는 100-250cm 사이여야 합니다"
    }

    if (!measurements.weight || parseFloat(measurements.weight) <= 0) {
      newErrors.weight = "체중을 올바르게 입력해주세요"
    } else if (parseFloat(measurements.weight) < 20 || parseFloat(measurements.weight) > 300) {
      newErrors.weight = "체중은 20-300kg 사이여야 합니다"
    }

    // 선택 사항들의 유효성 검사
    Object.entries(measurements).forEach(([key, value]) => {
      if (value && key !== 'height' && key !== 'weight') {
        const numValue = parseFloat(value)
        if (isNaN(numValue) || numValue < 0) {
          newErrors[key] = "올바른 숫자를 입력해주세요"
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleComplete = () => {
    if (validateForm()) {
      const data = {
        height: parseFloat(measurements.height),
        weight: parseFloat(measurements.weight),
        bmi: calculatedBMI,
        shoulderWidth: measurements.shoulderWidth ? parseFloat(measurements.shoulderWidth) : null,
        waistCircumference: measurements.waistCircumference ? parseFloat(measurements.waistCircumference) : null,
        hipCircumference: measurements.hipCircumference ? parseFloat(measurements.hipCircumference) : null,
        chestCircumference: measurements.chestCircumference ? parseFloat(measurements.chestCircumference) : null,
        bodyFatPercentage: measurements.bodyFatPercentage ? parseFloat(measurements.bodyFatPercentage) : null,
        muscleMass: measurements.muscleMass ? parseFloat(measurements.muscleMass) : null,
        completedAt: new Date().toISOString()
      }

      onComplete(data)
    }
  }

  if (completed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <span>신체 계측 완료</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">계측이 완료되었습니다</p>
                <p className="text-sm text-green-600">
                  신체 데이터가 체질 진단에 활용됩니다.
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-gray-600">
              신체 계측 결과는 체질 진단 결과에서 확인하실 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Ruler className="h-6 w-6" />
          <span>신체 계측</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 필수 정보 */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <h3 className="text-lg font-semibold">기본 정보</h3>
            <Badge variant="destructive">필수</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">키 (cm) *</Label>
              <div className="relative">
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={measurements.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  className={errors.height ? 'border-red-500' : ''}
                />
                <Ruler className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.height && <p className="text-sm text-red-500">{errors.height}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">체중 (kg) *</Label>
              <div className="relative">
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={measurements.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  className={errors.weight ? 'border-red-500' : ''}
                />
                <Weight className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.weight && <p className="text-sm text-red-500">{errors.weight}</p>}
            </div>
          </div>

          {/* BMI 계산 결과 */}
          {calculatedBMI && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-800">BMI 계산 결과</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{calculatedBMI}</p>
                  <p className="text-sm text-gray-600">BMI 지수</p>
                </div>
                <div>
                  <Badge className={
                    calculatedBMI < 18.5 ? 'bg-blue-100 text-blue-800' :
                    calculatedBMI < 23 ? 'bg-green-100 text-green-800' :
                    calculatedBMI < 25 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {getBMICategory(calculatedBMI)}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">체중 분류</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* 선택 정보 */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <h3 className="text-lg font-semibold">상세 계측</h3>
            <Badge variant="secondary">선택</Badge>
            <Info className="h-4 w-4 text-gray-400" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shoulderWidth">어깨 너비 (cm)</Label>
              <Input
                id="shoulderWidth"
                type="number"
                placeholder="40"
                value={measurements.shoulderWidth}
                onChange={(e) => handleChange('shoulderWidth', e.target.value)}
                className={errors.shoulderWidth ? 'border-red-500' : ''}
              />
              {errors.shoulderWidth && <p className="text-sm text-red-500">{errors.shoulderWidth}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="chestCircumference">가슴 둘레 (cm)</Label>
              <Input
                id="chestCircumference"
                type="number"
                placeholder="90"
                value={measurements.chestCircumference}
                onChange={(e) => handleChange('chestCircumference', e.target.value)}
                className={errors.chestCircumference ? 'border-red-500' : ''}
              />
              {errors.chestCircumference && <p className="text-sm text-red-500">{errors.chestCircumference}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="waistCircumference">허리 둘레 (cm)</Label>
              <Input
                id="waistCircumference"
                type="number"
                placeholder="80"
                value={measurements.waistCircumference}
                onChange={(e) => handleChange('waistCircumference', e.target.value)}
                className={errors.waistCircumference ? 'border-red-500' : ''}
              />
              {errors.waistCircumference && <p className="text-sm text-red-500">{errors.waistCircumference}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hipCircumference">엉덩이 둘레 (cm)</Label>
              <Input
                id="hipCircumference"
                type="number"
                placeholder="95"
                value={measurements.hipCircumference}
                onChange={(e) => handleChange('hipCircumference', e.target.value)}
                className={errors.hipCircumference ? 'border-red-500' : ''}
              />
              {errors.hipCircumference && <p className="text-sm text-red-500">{errors.hipCircumference}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bodyFatPercentage">체지방률 (%)</Label>
              <Input
                id="bodyFatPercentage"
                type="number"
                placeholder="15"
                value={measurements.bodyFatPercentage}
                onChange={(e) => handleChange('bodyFatPercentage', e.target.value)}
                className={errors.bodyFatPercentage ? 'border-red-500' : ''}
              />
              {errors.bodyFatPercentage && <p className="text-sm text-red-500">{errors.bodyFatPercentage}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="muscleMass">근육량 (kg)</Label>
              <Input
                id="muscleMass"
                type="number"
                placeholder="50"
                value={measurements.muscleMass}
                onChange={(e) => handleChange('muscleMass', e.target.value)}
                className={errors.muscleMass ? 'border-red-500' : ''}
              />
              {errors.muscleMass && <p className="text-sm text-red-500">{errors.muscleMass}</p>}
            </div>
          </div>
        </div>

        {/* 안내 메시지 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-gray-500 mt-0.5" />
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-1">측정 팁:</p>
              <ul className="space-y-1">
                <li>• 키와 체중은 정확한 진단을 위해 필수입니다</li>
                <li>• 상세 계측 정보를 추가하면 더 정확한 체질 판정이 가능합니다</li>
                <li>• 체지방률과 근육량은 체성분 분석기로 측정된 값을 입력하세요</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 완료 버튼 */}
        <Button 
          onClick={handleComplete}
          className="w-full flex items-center justify-center space-x-2"
          disabled={!measurements.height || !measurements.weight}
        >
          <Save className="h-4 w-4" />
          <span>신체 계측 완료</span>
        </Button>
      </CardContent>
    </Card>
  )
}