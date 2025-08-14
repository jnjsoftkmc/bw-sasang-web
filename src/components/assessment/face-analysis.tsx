"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Scan,
  Upload,
  Camera,
  CheckCircle,
  Save,
  Info,
  Image as ImageIcon,
  Ruler
} from "lucide-react"

interface FaceAnalysisProps {
  onComplete: (data: any) => void
  completed: boolean
}

export default function FaceAnalysis({ onComplete, completed }: FaceAnalysisProps) {
  const [activeTab, setActiveTab] = useState('upload')
  const [images, setImages] = useState<{
    front?: string
    side?: string
  }>({})
  
  const [measurements, setMeasurements] = useState({
    faceLength: '',
    faceWidth: '',
    foreheadWidth: '',
    cheekboneWidth: '',
    jawWidth: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const frontInputRef = useRef<HTMLInputElement>(null)
  const sideInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (type: 'front' | 'side', file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImages(prev => ({
          ...prev,
          [type]: e.target?.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMeasurementChange = (field: string, value: string) => {
    setMeasurements(prev => ({ ...prev, [field]: value }))
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // 이미지나 측정값 중 하나는 있어야 함
    const hasImages = images.front || images.side
    const hasMeasurements = Object.values(measurements).some(value => value.trim() !== '')

    if (!hasImages && !hasMeasurements) {
      newErrors.general = "얼굴 사진을 업로드하거나 측정값을 입력해주세요"
    }

    // 측정값이 있다면 유효성 검사
    Object.entries(measurements).forEach(([key, value]) => {
      if (value) {
        const numValue = parseFloat(value)
        if (isNaN(numValue) || numValue <= 0) {
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
        frontImage: images.front || null,
        sideImage: images.side || null,
        faceLength: measurements.faceLength ? parseFloat(measurements.faceLength) : null,
        faceWidth: measurements.faceWidth ? parseFloat(measurements.faceWidth) : null,
        foreheadWidth: measurements.foreheadWidth ? parseFloat(measurements.foreheadWidth) : null,
        cheekboneWidth: measurements.cheekboneWidth ? parseFloat(measurements.cheekboneWidth) : null,
        jawWidth: measurements.jawWidth ? parseFloat(measurements.jawWidth) : null,
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
            <span>얼굴 분석 완료</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">얼굴 분석이 완료되었습니다</p>
                <p className="text-sm text-green-600">
                  얼굴 데이터가 체질 진단에 활용됩니다.
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-gray-600">
              얼굴 분석 결과는 체질 진단 결과에서 확인하실 수 있습니다.
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
          <Scan className="h-6 w-6" />
          <span>얼굴 분석</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 에러 메시지 */}
        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>사진 업로드</span>
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center space-x-2">
              <Ruler className="h-4 w-4" />
              <span>직접 측정</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            {/* 사진 업로드 섹션 */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <h3 className="text-lg font-semibold">얼굴 사진 업로드</h3>
                <Badge variant="secondary">선택</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 정면 사진 */}
                <div className="space-y-4">
                  <Label>정면 사진</Label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => frontInputRef.current?.click()}
                  >
                    {images.front ? (
                      <div className="space-y-2">
                        <img 
                          src={images.front} 
                          alt="정면 사진" 
                          className="max-h-48 mx-auto rounded"
                        />
                        <p className="text-sm text-green-600">업로드 완료</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <ImageIcon className="h-12 w-12 mx-auto text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">정면 사진 업로드</p>
                          <p className="text-xs text-gray-500">얼굴이 정면을 향한 사진</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    ref={frontInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload('front', file)
                    }}
                  />
                </div>

                {/* 측면 사진 */}
                <div className="space-y-4">
                  <Label>측면 사진</Label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => sideInputRef.current?.click()}
                  >
                    {images.side ? (
                      <div className="space-y-2">
                        <img 
                          src={images.side} 
                          alt="측면 사진" 
                          className="max-h-48 mx-auto rounded"
                        />
                        <p className="text-sm text-green-600">업로드 완료</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <ImageIcon className="h-12 w-12 mx-auto text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">측면 사진 업로드</p>
                          <p className="text-xs text-gray-500">얼굴이 옆을 향한 사진</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    ref={sideInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload('side', file)
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 사진 촬영 가이드 */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Camera className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">사진 촬영 가이드:</p>
                  <ul className="space-y-1">
                    <li>• 밝은 곳에서 촬영하세요</li>
                    <li>• 얼굴이 화면 중앙에 오도록 하세요</li>
                    <li>• 머리카락이 얼굴을 가리지 않도록 하세요</li>
                    <li>• 정면: 카메라를 정면으로 바라보세요</li>
                    <li>• 측면: 완전히 옆을 향해 촬영하세요</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            {/* 직접 측정 섹션 */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <h3 className="text-lg font-semibold">얼굴 측정값 입력</h3>
                <Badge variant="secondary">선택</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="faceLength">얼굴 길이 (mm)</Label>
                  <Input
                    id="faceLength"
                    type="number"
                    placeholder="180"
                    value={measurements.faceLength}
                    onChange={(e) => handleMeasurementChange('faceLength', e.target.value)}
                    className={errors.faceLength ? 'border-red-500' : ''}
                  />
                  {errors.faceLength && <p className="text-sm text-red-500">{errors.faceLength}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="faceWidth">얼굴 너비 (mm)</Label>
                  <Input
                    id="faceWidth"
                    type="number"
                    placeholder="140"
                    value={measurements.faceWidth}
                    onChange={(e) => handleMeasurementChange('faceWidth', e.target.value)}
                    className={errors.faceWidth ? 'border-red-500' : ''}
                  />
                  {errors.faceWidth && <p className="text-sm text-red-500">{errors.faceWidth}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="foreheadWidth">이마 너비 (mm)</Label>
                  <Input
                    id="foreheadWidth"
                    type="number"
                    placeholder="120"
                    value={measurements.foreheadWidth}
                    onChange={(e) => handleMeasurementChange('foreheadWidth', e.target.value)}
                    className={errors.foreheadWidth ? 'border-red-500' : ''}
                  />
                  {errors.foreheadWidth && <p className="text-sm text-red-500">{errors.foreheadWidth}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cheekboneWidth">광대뼈 너비 (mm)</Label>
                  <Input
                    id="cheekboneWidth"
                    type="number"
                    placeholder="130"
                    value={measurements.cheekboneWidth}
                    onChange={(e) => handleMeasurementChange('cheekboneWidth', e.target.value)}
                    className={errors.cheekboneWidth ? 'border-red-500' : ''}
                  />
                  {errors.cheekboneWidth && <p className="text-sm text-red-500">{errors.cheekboneWidth}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="jawWidth">턱 너비 (mm)</Label>
                  <Input
                    id="jawWidth"
                    type="number"
                    placeholder="110"
                    value={measurements.jawWidth}
                    onChange={(e) => handleMeasurementChange('jawWidth', e.target.value)}
                    className={errors.jawWidth ? 'border-red-500' : ''}
                  />
                  {errors.jawWidth && <p className="text-sm text-red-500">{errors.jawWidth}</p>}
                </div>
              </div>
            </div>

            {/* 측정 가이드 */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div className="text-sm text-yellow-700">
                  <p className="font-medium mb-1">측정 가이드:</p>
                  <ul className="space-y-1">
                    <li>• 얼굴 길이: 이마 위쪽부터 턱 아래까지</li>
                    <li>• 얼굴 너비: 좌우 최대 너비</li>
                    <li>• 이마 너비: 이마의 가장 넓은 부분</li>
                    <li>• 광대뼈 너비: 광대뼈의 가장 넓은 부분</li>
                    <li>• 턱 너비: 턱의 가장 넓은 부분</li>
                    <li>• 정확한 측정을 위해 자 또는 캘리퍼를 사용하세요</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* 미래 기능 안내 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-gray-500 mt-0.5" />
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-1">개발 예정 기능:</p>
              <p>향후 AI 기반 자동 얼굴 분석 기능이 추가될 예정입니다. 현재는 사진 업로드 또는 직접 측정으로 데이터를 수집하고 있습니다.</p>
            </div>
          </div>
        </div>

        {/* 완료 버튼 */}
        <Button 
          onClick={handleComplete}
          className="w-full flex items-center justify-center space-x-2 mt-6"
        >
          <Save className="h-4 w-4" />
          <span>얼굴 분석 완료</span>
        </Button>
      </CardContent>
    </Card>
  )
}