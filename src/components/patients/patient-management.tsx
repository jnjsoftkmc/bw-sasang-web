"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, 
  Search, 
  Calendar, 
  Phone, 
  Mail,
  User,
  Heart,
  Activity
} from "lucide-react"
import PatientForm from "./patient-form"
import { getConstitutionName, getConstitutionColor, calculateAge, formatPhoneNumber } from "@/lib/utils"

// 임시 데이터 (실제로는 데이터베이스에서 가져옴)
const mockPatients = [
  {
    id: 1,
    name: "김철수",
    phone: "010-1234-5678",
    email: "kim@email.com",
    birthDate: "1980-03-15",
    gender: "male",
    constitution: "taeeum",
    lastVisit: "2024-01-15",
    totalSessions: 5
  },
  {
    id: 2,
    name: "이영희",
    phone: "010-2345-6789",
    email: "lee@email.com", 
    birthDate: "1975-08-22",
    gender: "female",
    constitution: "soyang",
    lastVisit: "2024-01-10",
    totalSessions: 3
  },
  {
    id: 3,
    name: "박민수",
    phone: "010-3456-7890",
    email: "park@email.com",
    birthDate: "1990-12-05",
    gender: "male",
    constitution: "soeum",
    lastVisit: "2024-01-08",
    totalSessions: 8
  }
]

export default function PatientManagement() {
  const [patients] = useState(mockPatients)
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null)

  const filteredPatients = patients.filter(patient =>
    patient.name.includes(searchTerm) ||
    patient.phone.includes(searchTerm) ||
    patient.email.includes(searchTerm)
  )

  const handleAddPatient = () => {
    setSelectedPatient(null)
    setShowForm(true)
  }

  const handleEditPatient = (patient: typeof mockPatients[0]) => {
    setSelectedPatient(patient)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setSelectedPatient(null)
  }

  if (showForm) {
    return (
      <PatientForm 
        patient={selectedPatient}
        onClose={handleFormClose}
        onSave={() => {
          // 저장 로직 구현
          handleFormClose()
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* 상단 컨트롤 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="환자명, 전화번호, 이메일로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button onClick={handleAddPatient} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>새 환자 등록</span>
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{patients.length}</p>
                <p className="text-sm text-gray-600">총 환자 수</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {patients.reduce((sum, p) => sum + p.totalSessions, 0)}
                </p>
                <p className="text-sm text-gray-600">총 진료 횟수</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">
                  {patients.filter(p => p.constitution).length}
                </p>
                <p className="text-sm text-gray-600">체질 진단 완료</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {patients.filter(p => {
                    const today = new Date()
                    const lastVisit = new Date(p.lastVisit)
                    const diffTime = Math.abs(today.getTime() - lastVisit.getTime())
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                    return diffDays <= 7
                  }).length}
                </p>
                <p className="text-sm text-gray-600">최근 7일 내 진료</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 환자 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>환자 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleEditPatient(patient)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{patient.name}</h3>
                      <Badge variant="secondary">
                        {patient.gender === 'male' ? '남성' : '여성'}
                      </Badge>
                      {patient.constitution && (
                        <Badge className={getConstitutionColor(patient.constitution)}>
                          {getConstitutionName(patient.constitution)}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{calculateAge(patient.birthDate)}세</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{formatPhoneNumber(patient.phone)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{patient.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>최근 진료: {new Date(patient.lastVisit).toLocaleDateString('ko-KR')}</p>
                    <p>총 진료: {patient.totalSessions}회</p>
                  </div>
                </div>
              </div>
            ))}
            {filteredPatients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}