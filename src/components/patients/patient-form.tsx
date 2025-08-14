"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, User } from "lucide-react"

interface PatientFormProps {
  patient?: {
    id: number
    name: string
    phone: string
    email: string
    birthDate: string
    gender: string
    constitution?: string
  } | null
  onClose: () => void
  onSave: (patient: any) => void
}

export default function PatientForm({ patient, onClose, onSave }: PatientFormProps) {
  const [formData, setFormData] = useState({
    name: patient?.name || "",
    phone: patient?.phone || "",
    email: patient?.email || "",
    birthDate: patient?.birthDate || "",
    gender: patient?.gender || "",
    address: "",
    medicalHistory: "",
    allergies: "",
    currentMedications: "",
    emergencyContact: "",
    emergencyPhone: ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "환자명은 필수입니다."
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "전화번호는 필수입니다."
    } else if (!/^010-\d{4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)"
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다."
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "생년월일은 필수입니다."
    }

    if (!formData.gender) {
      newErrors.gender = "성별은 필수입니다."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSave({
        ...formData,
        id: patient?.id || Date.now() // 임시 ID 생성
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {patient ? "환자 정보 수정" : "새 환자 등록"}
            </h1>
            <p className="text-gray-600">환자의 기본 정보를 입력해주세요.</p>
          </div>
        </div>
      </div>

      {/* 폼 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>기본 정보</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 기본 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">환자명 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="홍길동"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">전화번호 *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="010-1234-5678"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="hong@email.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">생년월일 *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleChange("birthDate", e.target.value)}
                  className={errors.birthDate ? "border-red-500" : ""}
                />
                {errors.birthDate && <p className="text-sm text-red-500">{errors.birthDate}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">성별 *</Label>
              <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                  <SelectValue placeholder="성별을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">남성</SelectItem>
                  <SelectItem value="female">여성</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">주소</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="서울시 강남구..."
              />
            </div>

            {/* 의료 정보 */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">의료 정보</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medicalHistory">기존 병력</Label>
                  <Textarea
                    id="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={(e) => handleChange("medicalHistory", e.target.value)}
                    placeholder="고혈압, 당뇨병 등 기존 질환을 기록하세요"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">알레르기</Label>
                  <Textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) => handleChange("allergies", e.target.value)}
                    placeholder="음식, 약물 알레르기가 있다면 기록하세요"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentMedications">복용 중인 약물</Label>
                  <Textarea
                    id="currentMedications"
                    value={formData.currentMedications}
                    onChange={(e) => handleChange("currentMedications", e.target.value)}
                    placeholder="현재 복용 중인 약물이 있다면 기록하세요"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* 비상 연락처 */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">비상 연락처</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">비상 연락처 이름</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleChange("emergencyContact", e.target.value)}
                    placeholder="김연락"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">비상 연락처 전화번호</Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                    placeholder="010-9876-5432"
                  />
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex space-x-4 pt-6">
              <Button type="submit" className="flex-1 flex items-center justify-center space-x-2">
                <Save className="h-4 w-4" />
                <span>{patient ? "수정하기" : "등록하기"}</span>
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                취소
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}