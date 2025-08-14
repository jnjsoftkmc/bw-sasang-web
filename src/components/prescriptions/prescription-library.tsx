"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft,
  Search,
  BookOpen,
  Pill,
  FileText,
  Eye,
  Copy,
  Star,
  Info
} from "lucide-react"
import { getConstitutionName, getConstitutionColor } from "@/lib/utils"
import { 
  prescriptionsData, 
  herbsData, 
  getPrescriptionsByConstitution,
  getHerbById,
  calculatePrescriptionCost 
} from "@/lib/data/herbs-prescriptions"

interface PrescriptionLibraryProps {
  onBack: () => void
}

export default function PrescriptionLibrary({ onBack }: PrescriptionLibraryProps) {
  const [activeTab, setActiveTab] = useState('prescriptions')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterConstitution, setFilterConstitution] = useState('all')
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null)

  const filteredPrescriptions = prescriptionsData.filter(prescription => {
    const matchesSearch = 
      prescription.name.includes(searchTerm) ||
      prescription.category.includes(searchTerm) ||
      prescription.indications.some(indication => indication.includes(searchTerm))
    
    const matchesConstitution = filterConstitution === 'all' || prescription.constitution === filterConstitution

    return matchesSearch && matchesConstitution
  })

  const filteredHerbs = herbsData.filter(herb => {
    const matchesSearch = 
      herb.name.includes(searchTerm) ||
      herb.category.includes(searchTerm) ||
      herb.effects.some(effect => effect.includes(searchTerm))
    
    const matchesConstitution = filterConstitution === 'all' || herb.constitutions.includes(filterConstitution)

    return matchesSearch && matchesConstitution
  })

  const PrescriptionDetail = ({ prescription }: { prescription: any }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3">
            <span>{prescription.name}</span>
            <Badge className={getConstitutionColor(prescription.constitution)}>
              {getConstitutionName(prescription.constitution)}
            </Badge>
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              복사
            </Button>
            <Button size="sm">
              사용하기
            </Button>
          </div>
        </div>
        <p className="text-gray-600">{prescription.category}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">적응증</h4>
            <ul className="space-y-1">
              {prescription.indications.map((indication: string, index: number) => (
                <li key={index} className="text-sm flex items-center space-x-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  <span>{indication}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">복용법</h4>
            <div className="space-y-2 text-sm">
              <div><strong>용법:</strong> {prescription.dosage}</div>
              <div><strong>기간:</strong> {prescription.duration}</div>
              <div><strong>제조법:</strong> {prescription.preparation}</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">처방 구성</h4>
          <div className="space-y-2">
            {prescription.herbs.map((herb: any, index: number) => {
              const herbData = getHerbById(herb.herbId)
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">{herbData?.name || herb.herbId}</span>
                    {herbData && (
                      <div className="text-sm text-gray-600">
                        {herbData.effects.slice(0, 3).join(', ')}
                      </div>
                    )}
                  </div>
                  <Badge variant="outline">
                    {herb.amount}{herb.unit}
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>

        {prescription.contraindications && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Info className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800 mb-2">금기사항</h4>
                <ul className="space-y-1">
                  {prescription.contraindications.map((contraindication: string, index: number) => (
                    <li key={index} className="text-sm text-red-700">
                      • {contraindication}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 pt-4 border-t">
          <div className="flex justify-between">
            <span>출전: {prescription.source}</span>
            <span>예상 비용: {calculatePrescriptionCost(prescription).toLocaleString()}원</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">처방 라이브러리</h1>
          <p className="text-gray-600">사상의학 표준 처방과 한약재 정보를 확인하세요.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="prescriptions" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>처방 ({prescriptionsData.length})</span>
          </TabsTrigger>
          <TabsTrigger value="herbs" className="flex items-center space-x-2">
            <Pill className="h-4 w-4" />
            <span>한약재 ({herbsData.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* 검색 및 필터 */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={activeTab === 'prescriptions' ? "처방명, 적응증으로 검색..." : "한약재명, 효능으로 검색..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
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

        <TabsContent value="prescriptions" className="space-y-4">
          {selectedPrescription ? (
            <div className="space-y-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedPrescription(null)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                목록으로 돌아가기
              </Button>
              <PrescriptionDetail prescription={selectedPrescription} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPrescriptions.map((prescription) => (
                <Card key={prescription.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{prescription.name}</CardTitle>
                      <Badge className={getConstitutionColor(prescription.constitution)}>
                        {getConstitutionName(prescription.constitution)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{prescription.category}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold mb-1">주요 적응증</h4>
                        <p className="text-sm text-gray-600">
                          {prescription.indications.slice(0, 3).join(', ')}
                          {prescription.indications.length > 3 && '...'}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-500">
                          {prescription.herbs.length}가지 약재
                        </span>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedPrescription(prescription)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {filteredPrescriptions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>검색 결과가 없습니다.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="herbs" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHerbs.map((herb) => (
              <Card key={herb.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{herb.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {herb.category}
                    </Badge>
                  </div>
                  {herb.scientificName && (
                    <p className="text-sm text-gray-500 italic">{herb.scientificName}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold mb-1">성미</h4>
                      <p className="text-sm text-gray-600">{herb.properties}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-1">효능</h4>
                      <p className="text-sm text-gray-600">
                        {herb.effects.slice(0, 3).join(', ')}
                        {herb.effects.length > 3 && '...'}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-1">적합 체질</h4>
                      <div className="flex flex-wrap gap-1">
                        {herb.constitutions.map((constitution) => (
                          <Badge
                            key={constitution}
                            variant="outline"
                            className={`text-xs ${getConstitutionColor(constitution)}`}
                          >
                            {getConstitutionName(constitution)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t text-xs text-gray-500">
                      <div className="flex justify-between">
                        <span>용량: {herb.dosage}</span>
                        <span>귀경: {herb.meridians.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredHerbs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Pill className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>검색 결과가 없습니다.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}