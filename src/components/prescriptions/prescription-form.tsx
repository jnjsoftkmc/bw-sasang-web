"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft,
  Save,
  Search,
  Plus,
  Minus,
  User,
  Pill,
  Calculator,
  FileText,
  AlertCircle
} from "lucide-react"
import { getConstitutionName, getConstitutionColor } from "@/lib/utils"
import { 
  getPrescriptionsByConstitution, 
  getRecommendedPrescriptions,
  herbsData,
  prescriptionsData,
  calculatePrescriptionCost 
} from "@/lib/data/herbs-prescriptions"

interface PrescriptionFormProps {
  patient?: any
  onClose: () => void
  onSave: (prescription: any) => void
}

interface PrescriptionItem {
  herbId: string
  herbName: string
  amount: string
  unit: string
}

export default function PrescriptionForm({ patient, onClose, onSave }: PrescriptionFormProps) {
  const [step, setStep] = useState(1) // 1: 환자선택, 2: 처방작성, 3: 확인
  const [selectedPatient, setSelectedPatient] = useState(patient)
  const [formData, setFormData] = useState({
    prescriptionName: '',
    symptoms: '',
    treatmentGoal: '',
    duration: '14',
    dosage: '1일 2회, 식후 30분',
    notes: ''
  })
  const [prescriptionItems, setPrescriptionItems] = useState<PrescriptionItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')

  // 임시 환자 데이터
  const mockPatients = [
    { id: 1, name: "김철수", age: 44, gender: "남성", constitution: "taeeum" },
    { id: 2, name: "이영희", age: 49, gender: "여성", constitution: "soyang" },
    { id: 3, name: "박민수", age: 34, gender: "남성", constitution: "soeum" }
  ]

  const filteredHerbs = herbsData.filter(herb => 
    herb.name.includes(searchTerm) ||
    herb.effects.some(effect => effect.includes(searchTerm))
  )

  const calculateTotalCost = () => {
    return prescriptionItems.reduce((total, item) => {
      const amount = parseFloat(item.amount) || 0
      const costPerGram = 150 // 임시 단가
      return total + (amount * costPerGram)
    }, 0)
  }

  const handleAddHerb = (herb: any) => {
    if (!prescriptionItems.find(item => item.herbId === herb.id)) {
      setPrescriptionItems(prev => [...prev, {
        herbId: herb.id,
        herbName: herb.name,
        amount: '6',
        unit: 'g'
      }])
    }
  }

  const handleRemoveHerb = (herbId: string) => {
    setPrescriptionItems(prev => prev.filter(item => item.herbId !== herbId))
  }

  const handleUpdateAmount = (herbId: string, amount: string) => {
    setPrescriptionItems(prev => prev.map(item => 
      item.herbId === herbId ? { ...item, amount } : item
    ))
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = prescriptionsData.find(p => p.id === templateId)
    if (template) {
      setFormData(prev => ({
        ...prev,
        prescriptionName: template.name,
        dosage: template.dosage,
        duration: template.duration.split('-')[0] // "14-21일" -> "14"
      }))
      
      const templateItems = template.herbs.map(herb => {
        const herbData = herbsData.find(h => h.id === herb.herbId)
        return {
          herbId: herb.herbId,
          herbName: herbData?.name || herb.herbId,
          amount: herb.amount,
          unit: herb.unit
        }
      })
      setPrescriptionItems(templateItems)
      setSelectedTemplate(templateId)
    }
  }

  const handleSave = () => {
    const prescription = {
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      constitution: selectedPatient.constitution,
      ...formData,
      herbs: prescriptionItems,
      cost: calculateTotalCost(),
      prescribedBy: "김한의사", // 실제로는 로그인 사용자
      prescribedDate: new Date().toISOString().split('T')[0]
    }
    
    onSave(prescription)
  }

  if (step === 1) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">새 처방 작성</h1>
            <p className="text-gray-600">처방할 환자를 선택해주세요.</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-6 w-6" />
              <span>환자 선택</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                    <Badge className={getConstitutionColor(patient.constitution)}>
                      {getConstitutionName(patient.constitution)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedPatient}
                className="w-full"
              >
                다음 단계
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">처방전 확인</h1>
            <p className="text-gray-600">처방 내용을 확인하고 저장하세요.</p>
          </div>
        </div>

        <Card>
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-800">처방전</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-blue-700">
              <span>환자: {selectedPatient.name}</span>
              <Badge className={getConstitutionColor(selectedPatient.constitution)}>
                {getConstitutionName(selectedPatient.constitution)}
              </Badge>
              <span>처방일: {new Date().toLocaleDateString('ko-KR')}</span>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">처방 정보</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>처방명:</strong> {formData.prescriptionName}</div>
                    <div><strong>증상:</strong> {formData.symptoms}</div>
                    <div><strong>치료목표:</strong> {formData.treatmentGoal}</div>
                    <div><strong>복용기간:</strong> {formData.duration}일</div>
                    <div><strong>복용법:</strong> {formData.dosage}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">비용 정보</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>총 비용:</strong> {calculateTotalCost().toLocaleString()}원</div>
                    <div><strong>1일 비용:</strong> {Math.round(calculateTotalCost() / parseInt(formData.duration)).toLocaleString()}원</div>
                    <div><strong>처방의:</strong> 김한의사</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-4">처방 구성</h3>
                <div className="space-y-2">
                  {prescriptionItems.map((item, index) => (
                    <div key={item.herbId} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500">{index + 1}</span>
                        <span className="font-medium">{item.herbName}</span>
                      </div>
                      <div className="text-sm">
                        {item.amount}{item.unit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {formData.notes && (
                <div>
                  <h3 className="font-semibold mb-2">처방 메모</h3>
                  <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">
                    {formData.notes}
                  </p>
                </div>
              )}

              <div className="flex space-x-4">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  처방 저장
                </Button>
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  수정하기
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">처방 작성</h1>
          <p className="text-gray-600">
            {selectedPatient.name} ({getConstitutionName(selectedPatient.constitution)})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 좌측: 처방 정보 */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prescriptionName">처방명</Label>
                <Input
                  id="prescriptionName"
                  value={formData.prescriptionName}
                  onChange={(e) => setFormData(prev => ({ ...prev, prescriptionName: e.target.value }))}
                  placeholder="처방명을 입력하세요"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">주요 증상</Label>
                <Input
                  id="symptoms"
                  value={formData.symptoms}
                  onChange={(e) => setFormData(prev => ({ ...prev, symptoms: e.target.value }))}
                  placeholder="소화불량, 복부팽만, 습담 등"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="treatmentGoal">치료 목표</Label>
                <Textarea
                  id="treatmentGoal"
                  value={formData.treatmentGoal}
                  onChange={(e) => setFormData(prev => ({ ...prev, treatmentGoal: e.target.value }))}
                  placeholder="치료 목표를 입력하세요"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">복용 기간 (일)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dosage">복용법</Label>
                  <Input
                    id="dosage"
                    value={formData.dosage}
                    onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">처방 메모</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="주의사항이나 특별한 지시사항을 입력하세요"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* 한약재 구성 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>한약재 구성</span>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calculator className="h-4 w-4" />
                  <span>총 비용: {calculateTotalCost().toLocaleString()}원</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prescriptionItems.map((item) => (
                  <div key={item.herbId} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <span className="font-medium flex-1">{item.herbName}</span>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={item.amount}
                        onChange={(e) => handleUpdateAmount(item.herbId, e.target.value)}
                        className="w-20"
                      />
                      <span className="text-sm text-gray-600">{item.unit}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveHerb(item.herbId)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                {prescriptionItems.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Pill className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>한약재를 추가해주세요.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 우측: 한약재 검색 및 템플릿 */}
        <div className="space-y-6">
          {/* 처방 템플릿 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">추천 처방</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {getPrescriptionsByConstitution(selectedPatient.constitution).slice(0, 3).map((prescription) => (
                  <Button
                    key={prescription.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleTemplateSelect(prescription.id)}
                    className="w-full justify-start"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {prescription.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 한약재 검색 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">한약재 검색</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="한약재명, 효능으로 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2">
                  {filteredHerbs.slice(0, 10).map((herb) => (
                    <div
                      key={herb.id}
                      className="p-2 border rounded cursor-pointer hover:bg-gray-50"
                      onClick={() => handleAddHerb(herb)}
                    >
                      <div className="font-medium text-sm">{herb.name}</div>
                      <div className="text-xs text-gray-600">
                        {herb.effects.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 주의사항 */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">처방 주의사항</p>
                  <ul className="space-y-1 text-xs">
                    <li>• 환자의 체질과 증상을 신중히 고려하세요</li>
                    <li>• 약재간 상호작용을 확인하세요</li>
                    <li>• 적절한 용량과 복용법을 지정하세요</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setStep(3)} disabled={prescriptionItems.length === 0}>
          다음 단계 (확인)
        </Button>
      </div>
    </div>
  )
}