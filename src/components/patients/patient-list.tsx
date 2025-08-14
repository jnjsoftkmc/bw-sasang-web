"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search,
  User,
  Plus,
  Eye,
  Edit,
  Activity,
  Calendar,
  Phone,
  Mail,
  MapPin
} from "lucide-react"
import { getConstitutionName, getConstitutionColor } from "@/lib/utils"

// 임시 환자 데이터
const mockPatients = [
  {
    id: 1,
    name: "김철수",
    age: 44,
    gender: "남성",
    phone: "010-1234-5678",
    email: "kim@example.com",
    address: "서울시 강남구",
    constitution: "taeeum",
    confidenceScore: 89,
    lastVisit: "2024-01-15",
    totalVisits: 12,
    status: "active",
    symptoms: ["습담", "소화불량", "복부팽만"]
  },
  {
    id: 2,
    name: "이영희",
    age: 49,
    gender: "여성",
    phone: "010-2345-6789",
    email: "lee@example.com",
    address: "서울시 서초구",
    constitution: "soyang",
    confidenceScore: 92,
    lastVisit: "2024-01-14",
    totalVisits: 8,
    status: "active",
    symptoms: ["열격", "가슴답답", "불면"]
  },
  {
    id: 3,
    name: "박민수",
    age: 34,
    gender: "남성",
    phone: "010-3456-7890",
    email: "park@example.com",
    address: "서울시 강동구",
    constitution: "soeum",
    confidenceScore: 85,
    lastVisit: "2024-01-12",
    totalVisits: 15,
    status: "active",
    symptoms: ["위한", "복통", "소화불량"]
  },
  {
    id: 4,
    name: "최지영",
    age: 38,
    gender: "여성",
    phone: "010-4567-8901",
    email: "choi@example.com",
    address: "서울시 마포구",
    constitution: "taeyang",
    confidenceScore: 78,
    lastVisit: "2024-01-10",
    totalVisits: 6,
    status: "inactive",
    symptoms: ["위열", "소화불량", "구갈"]
  },
  {
    id: 5,
    name: "정수현",
    age: 29,
    gender: "여성",
    phone: "010-5678-9012",
    email: "jung@example.com",
    address: "서울시 송파구",
    constitution: "soyang",
    confidenceScore: 91,
    lastVisit: "2024-01-16",
    totalVisits: 3,
    status: "active",
    symptoms: ["열격", "두통", "불면증"]
  }
]

export default function PatientList() {
  const [patients] = useState(mockPatients)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterConstitution, setFilterConstitution] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterGender, setFilterGender] = useState("all")

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.includes(searchTerm) ||
      patient.phone.includes(searchTerm) ||
      patient.email.includes(searchTerm) ||
      patient.symptoms.some(symptom => symptom.includes(searchTerm))

    const matchesConstitution = filterConstitution === "all" || patient.constitution === filterConstitution
    const matchesStatus = filterStatus === "all" || patient.status === filterStatus
    const matchesGender = filterGender === "all" || patient.gender === filterGender

    return matchesSearch && matchesConstitution && matchesStatus && matchesGender
  })

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? { label: '활성', class: 'bg-green-100 text-green-800' }
      : { label: '비활성', class: 'bg-gray-100 text-gray-800' }
  }

  const patientStats = {
    total: patients.length,
    active: patients.filter(p => p.status === 'active').length,
    byConstitution: {
      taeyang: patients.filter(p => p.constitution === 'taeyang').length,
      soyang: patients.filter(p => p.constitution === 'soyang').length,
      taeeum: patients.filter(p => p.constitution === 'taeeum').length,
      soeum: patients.filter(p => p.constitution === 'soeum').length
    }
  }

  return (
    <div className="space-y-6">
      {/* 상단 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <User className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{patientStats.total}</p>
                <p className="text-sm text-gray-600">총 환자</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{patientStats.active}</p>
                <p className="text-sm text-gray-600">활성 환자</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-lg font-bold">체질별 분포</p>
              <div className="flex justify-center space-x-1 mt-2">
                {Object.entries(patientStats.byConstitution).map(([constitution, count]) => (
                  <Badge key={constitution} className={`${getConstitutionColor(constitution)} text-xs`}>
                    {count}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              새 환자 등록
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 검색 및 필터 */}
      <Card>
        <CardHeader>
          <CardTitle>환자 검색 및 필터</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="환자명, 전화번호, 증상으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterConstitution} onValueChange={setFilterConstitution}>
              <SelectTrigger>
                <SelectValue placeholder="체질" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 체질</SelectItem>
                <SelectItem value="taeyang">태양인</SelectItem>
                <SelectItem value="soyang">소양인</SelectItem>
                <SelectItem value="taeeum">태음인</SelectItem>
                <SelectItem value="soeum">소음인</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 상태</SelectItem>
                <SelectItem value="active">활성</SelectItem>
                <SelectItem value="inactive">비활성</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterGender} onValueChange={setFilterGender}>
              <SelectTrigger>
                <SelectValue placeholder="성별" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 성별</SelectItem>
                <SelectItem value="남성">남성</SelectItem>
                <SelectItem value="여성">여성</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setSearchTerm("")
              setFilterConstitution("all")
              setFilterStatus("all")
              setFilterGender("all")
            }}>
              초기화
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 환자 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>환자 목록 ({filteredPatients.length}명)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* 환자 기본 정보 */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold">{patient.name}</h3>
                      <Badge className={getConstitutionColor(patient.constitution)}>
                        {getConstitutionName(patient.constitution)} ({patient.confidenceScore}%)
                      </Badge>
                      <Badge className={getStatusBadge(patient.status).class}>
                        {getStatusBadge(patient.status).label}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{patient.age}세 • {patient.gender}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{patient.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{patient.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>최근 방문: {new Date(patient.lastVisit).toLocaleDateString('ko-KR')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4" />
                        <span>총 {patient.totalVisits}회 방문</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-sm">
                        <strong className="text-gray-700">주요 증상:</strong> {patient.symptoms.join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Activity className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredPatients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>검색 조건에 맞는 환자가 없습니다.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}