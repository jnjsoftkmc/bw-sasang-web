"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Plus, 
  Search, 
  Pill, 
  FileText, 
  Calendar, 
  User,
  TrendingUp,
  Eye,
  Edit,
  Trash2
} from "lucide-react"
import { getConstitutionName, getConstitutionColor } from "@/lib/utils"
import { getPrescriptionsByConstitution, calculatePrescriptionCost } from "@/lib/data/herbs-prescriptions"
import PrescriptionForm from "./prescription-form"
import PrescriptionLibrary from "./prescription-library"

// 임시 처방 데이터
const mockPrescriptions = [
  {
    id: 1,
    patientId: 1,
    patientName: "김철수",
    constitution: "taeeum",
    prescriptionName: "태음조위탕",
    symptoms: ["습담", "소화불량", "복부팽만"],
    status: "active",
    prescribedDate: "2024-01-15",
    duration: 14,
    cost: 45000,
    prescribedBy: "김한의사"
  },
  {
    id: 2,
    patientId: 2,
    patientName: "이영희",
    constitution: "soyang",
    prescriptionName: "소양조위탕",
    symptoms: ["열격", "가슴답답", "불면"],
    status: "completed",
    prescribedDate: "2024-01-10",
    duration: 7,
    cost: 32000,
    prescribedBy: "김한의사"
  },
  {
    id: 3,
    patientId: 3,
    patientName: "박민수",
    constitution: "soeum",
    prescriptionName: "소음조위탕",
    symptoms: ["위한", "복통", "소화불량"],
    status: "active",
    prescribedDate: "2024-01-12",
    duration: 21,
    cost: 38000,
    prescribedBy: "김한의사"
  }
]

export default function PrescriptionManagement() {
  const [activeTab, setActiveTab] = useState('list')
  const [prescriptions] = useState(mockPrescriptions)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterConstitution, setFilterConstitution] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = 
      prescription.patientName.includes(searchTerm) ||
      prescription.prescriptionName.includes(searchTerm) ||
      prescription.symptoms.some(symptom => symptom.includes(searchTerm))
    
    const matchesStatus = filterStatus === "all" || prescription.status === filterStatus
    const matchesConstitution = filterConstitution === "all" || prescription.constitution === filterConstitution

    return matchesSearch && matchesStatus && matchesConstitution
  })

  const statusStats = {
    total: prescriptions.length,
    active: prescriptions.filter(p => p.status === 'active').length,
    completed: prescriptions.filter(p => p.status === 'completed').length,
    discontinued: prescriptions.filter(p => p.status === 'discontinued').length
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: '복용중', class: 'bg-green-100 text-green-800' },
      completed: { label: '완료', class: 'bg-blue-100 text-blue-800' },
      discontinued: { label: '중단', class: 'bg-red-100 text-red-800' }
    }
    return statusConfig[status as keyof typeof statusConfig] || { label: status, class: 'bg-gray-100 text-gray-800' }
  }

  const handleNewPrescription = () => {
    setActiveTab('form')
    setSelectedPatient(null)
  }

  if (activeTab === 'form') {
    return (
      <PrescriptionForm
        patient={selectedPatient}
        onClose={() => setActiveTab('list')}
        onSave={() => {
          setActiveTab('list')
          // 저장 로직 구현
        }}
      />
    )
  }

  if (activeTab === 'library') {
    return <PrescriptionLibrary onBack={() => setActiveTab('list')} />
  }

  return (
    <div className="space-y-6">
      {/* 상단 컨트롤 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4 flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="환자명, 처방명, 증상으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="active">복용중</SelectItem>
              <SelectItem value="completed">완료</SelectItem>
              <SelectItem value="discontinued">중단</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterConstitution} onValueChange={setFilterConstitution}>
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
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setActiveTab('library')}>
            <FileText className="h-4 w-4 mr-2" />
            처방 라이브러리
          </Button>
          <Button onClick={handleNewPrescription}>
            <Plus className="h-4 w-4 mr-2" />
            새 처방
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Pill className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{statusStats.total}</p>
                <p className="text-sm text-gray-600">총 처방</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{statusStats.active}</p>
                <p className="text-sm text-gray-600">복용 중</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{statusStats.completed}</p>
                <p className="text-sm text-gray-600">완료</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(prescriptions.reduce((sum, p) => sum + p.cost, 0) / 1000)}K
                </p>
                <p className="text-sm text-gray-600">총 처방 금액</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 처방 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>처방 목록 ({filteredPrescriptions.length}건)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{prescription.prescriptionName}</h3>
                      <Badge className={getConstitutionColor(prescription.constitution)}>
                        {getConstitutionName(prescription.constitution)}
                      </Badge>
                      <Badge className={getStatusBadge(prescription.status).class}>
                        {getStatusBadge(prescription.status).label}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{prescription.patientName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(prescription.prescribedDate).toLocaleDateString('ko-KR')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Pill className="h-4 w-4" />
                        <span>{prescription.duration}일분</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>{prescription.cost.toLocaleString()}원</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <strong>증상:</strong> {prescription.symptoms.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredPrescriptions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Pill className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}