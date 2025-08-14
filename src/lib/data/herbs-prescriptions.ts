// 한약재 마스터 데이터
export interface Herb {
  id: string
  name: string  // 한글명
  scientificName?: string  // 학명
  englishName?: string  // 영문명
  category: string  // 분류
  properties: string  // 성미 (한열온량, 오미)
  meridians: string[]  // 귀경
  effects: string[]  // 효능
  constitutions: string[]  // 적합한 체질
  contraindications?: string[]  // 금기사항
  dosage: string  // 일반 용량
}

export const herbsData: Herb[] = [
  // 태양인 약재
  {
    id: 'panax_ginseng',
    name: '인삼',
    scientificName: 'Panax ginseng',
    englishName: 'Korean Ginseng',
    category: '보기약',
    properties: '미감온 (微甘溫)',
    meridians: ['폐', '비'],
    effects: ['보원기', '복맥탈', '익비폐', '생진', '안신'],
    constitutions: ['taeyang', 'soeum'],
    contraindications: ['실열증', '고혈압'],
    dosage: '3-9g'
  },
  {
    id: 'poria_cocos',
    name: '복령',
    scientificName: 'Poria cocos',
    englishName: 'Poria',
    category: '이수삼습약',
    properties: '감담평 (甘淡平)',
    meridians: ['심', '폐', '비', '신'],
    effects: ['이수삼습', '건비', '안심신'],
    constitutions: ['taeyang', 'soyang', 'taeeum', 'soeum'],
    dosage: '10-15g'
  },

  // 소양인 약재
  {
    id: 'rehmannia_glutinosa',
    name: '지황',
    scientificName: 'Rehmannia glutinosa',
    englishName: 'Chinese Foxglove',
    category: '보혈약',
    properties: '감고한 (甘苦寒)',
    meridians: ['심', '간', '신'],
    effects: ['청열양음', '생진', '윤조'],
    constitutions: ['soyang', 'taeeum'],
    contraindications: ['비허설사'],
    dosage: '10-30g'
  },
  {
    id: 'scutellaria_baicalensis',
    name: '황금',
    scientificName: 'Scutellaria baicalensis',
    englishName: 'Baikal Skullcap',
    category: '청열조습약',
    properties: '고한 (苦寒)',
    meridians: ['폐', '담', '비', '대장', '소장'],
    effects: ['청열조습', '사화해독', '지혈', '안태'],
    constitutions: ['soyang', 'taeeum'],
    contraindications: ['비위허한'],
    dosage: '3-10g'
  },

  // 태음인 약재
  {
    id: 'coix_lacryma',
    name: '의이인',
    scientificName: 'Coix lacryma-jobi',
    englishName: 'Job\'s Tears',
    category: '이수삼습약',
    properties: '감담량미한 (甘淡涼微寒)',
    meridians: ['비', '위', '폐'],
    effects: ['이수삼습', '건비지설', '제비배농', '거풍습'],
    constitutions: ['taeeum', 'soyang'],
    dosage: '10-30g'
  },
  {
    id: 'atractylodes_macrocephala',
    name: '백출',
    scientificName: 'Atractylodes macrocephala',
    englishName: 'White Atractylodes',
    category: '보기약',
    properties: '감고온 (甘苦溫)',
    meridians: ['비', '위'],
    effects: ['보기건비', '조습이수', '고표지한', '안태'],
    constitutions: ['taeeum', 'soeum'],
    contraindications: ['음허내열'],
    dosage: '6-12g'
  },

  // 소음인 약재
  {
    id: 'cinnamomum_cassia',
    name: '계피',
    scientificName: 'Cinnamomum cassia',
    englishName: 'Chinese Cinnamon',
    category: '온리약',
    properties: '신감대열 (辛甘大熱)',
    meridians: ['신', '비', '심', '간'],
    effects: ['보화조양', '인화귀원', '산한지통', '온통혈맥'],
    constitutions: ['soeum', 'taeyang'],
    contraindications: ['음허화왕', '임신'],
    dosage: '1-4.5g'
  },
  {
    id: 'zingiber_officinale',
    name: '건강',
    scientificName: 'Zingiber officinale',
    englishName: 'Dried Ginger',
    category: '온리약',
    properties: '신열 (辛熱)',
    meridians: ['비', '위', '신', '심', '폐'],
    effects: ['온중회양', '온폐화음'],
    constitutions: ['soeum', 'taeyang'],
    contraindications: ['음허내열', '혈열출혈'],
    dosage: '3-10g'
  }
]

// 처방 마스터 데이터
export interface Prescription {
  id: string
  name: string  // 처방명
  constitution: string  // 적용 체질
  category: string  // 분류
  herbs: {
    herbId: string
    amount: string  // 용량
    unit: string  // 단위
  }[]
  preparation: string  // 제조법
  indications: string[]  // 적응증
  contraindications?: string[]  // 금기증
  dosage: string  // 복용법
  duration: string  // 표준 복용 기간
  notes?: string  // 주의사항
  source: string  // 출전
}

export const prescriptionsData: Prescription[] = [
  // 태양인 처방
  {
    id: 'taeyangjo_tang',
    name: '태양조위탕',
    constitution: 'taeyang',
    category: '청열조위',
    herbs: [
      { herbId: 'panax_ginseng', amount: '6', unit: 'g' },
      { herbId: 'poria_cocos', amount: '12', unit: 'g' },
      { herbId: 'rehmannia_glutinosa', amount: '12', unit: 'g' }
    ],
    preparation: '물 600ml에 약재를 넣고 300ml가 될 때까지 달인다',
    indications: ['위열', '소화불량', '구갈', '변비'],
    contraindications: ['비위허한'],
    dosage: '1일 2-3회, 식후 30분',
    duration: '7-14일',
    notes: '위열이 심한 경우에 사용',
    source: '동의수세보원'
  },

  // 소양인 처방
  {
    id: 'soyangjo_tang',
    name: '소양조위탕',
    constitution: 'soyang',
    category: '청열양위',
    herbs: [
      { herbId: 'rehmannia_glutinosa', amount: '15', unit: 'g' },
      { herbId: 'scutellaria_baicalensis', amount: '9', unit: 'g' },
      { herbId: 'poria_cocos', amount: '12', unit: 'g' }
    ],
    preparation: '물 600ml에 약재를 넣고 300ml가 될 때까지 달인다',
    indications: ['열격', '가슴답답', '불면', '두통', '변비'],
    contraindications: ['비위허한', '설사'],
    dosage: '1일 2-3회, 식전 30분',
    duration: '7-14일',
    notes: '열격증상이 있을 때 효과적',
    source: '동의수세보원'
  },
  {
    id: 'palmul_tang',
    name: '팔물탕',
    constitution: 'soyang',
    category: '보음청열',
    herbs: [
      { herbId: 'rehmannia_glutinosa', amount: '20', unit: 'g' },
      { herbId: 'scutellaria_baicalensis', amount: '6', unit: 'g' },
      { herbId: 'poria_cocos', amount: '15', unit: 'g' }
    ],
    preparation: '물 800ml에 약재를 넣고 400ml가 될 때까지 달인다',
    indications: ['음허', '허열', '도한', '구건'],
    dosage: '1일 2회, 식간복용',
    duration: '14-30일',
    source: '동의수세보원'
  },

  // 태음인 처방
  {
    id: 'taeeumjo_tang',
    name: '태음조위탕',
    constitution: 'taeeum',
    category: '조습건비',
    herbs: [
      { herbId: 'coix_lacryma', amount: '20', unit: 'g' },
      { herbId: 'atractylodes_macrocephala', amount: '12', unit: 'g' },
      { herbId: 'poria_cocos', amount: '15', unit: 'g' }
    ],
    preparation: '물 600ml에 약재를 넣고 300ml가 될 때까지 달인다',
    indications: ['습담', '소화불량', '복부팽만', '부종'],
    contraindications: ['음허'],
    dosage: '1일 2-3회, 식후 1시간',
    duration: '14-21일',
    notes: '습담이 많은 태음인에게 적합',
    source: '동의수세보원'
  },
  {
    id: 'yeonggyegamcho_tang',
    name: '영계감초탕',
    constitution: 'taeeum',
    category: '온양이기',
    herbs: [
      { herbId: 'atractylodes_macrocephala', amount: '15', unit: 'g' },
      { herbId: 'coix_lacryma', amount: '18', unit: 'g' },
      { herbId: 'poria_cocos', amount: '12', unit: 'g' }
    ],
    preparation: '물 700ml에 약재를 넣고 350ml가 될 때까지 달인다',
    indications: ['기허', '무력감', '식욕부진', '소화불량'],
    dosage: '1일 2회, 식전 복용',
    duration: '21-30일',
    source: '동의수세보원'
  },

  // 소음인 처방
  {
    id: 'soeumjo_tang',
    name: '소음조위탕',
    constitution: 'soeum',
    category: '온중보기',
    herbs: [
      { herbId: 'cinnamomum_cassia', amount: '3', unit: 'g' },
      { herbId: 'zingiber_officinale', amount: '6', unit: 'g' },
      { herbId: 'atractylodes_macrocephala', amount: '12', unit: 'g' },
      { herbId: 'poria_cocos', amount: '12', unit: 'g' }
    ],
    preparation: '물 600ml에 약재를 넣고 300ml가 될 때까지 달인다',
    indications: ['위한', '소화불량', '복통', '설사', '무력감'],
    contraindications: ['열증', '고혈압'],
    dosage: '1일 2-3회, 식전 30분 따뜻하게 복용',
    duration: '14-21일',
    notes: '따뜻하게 데워서 복용',
    source: '동의수세보원'
  },
  {
    id: 'hyangsa_yangwi_tang',
    name: '향사양위탕',
    constitution: 'soeum',
    category: '온중화위',
    herbs: [
      { herbId: 'cinnamomum_cassia', amount: '2', unit: 'g' },
      { herbId: 'zingiber_officinale', amount: '9', unit: 'g' },
      { herbId: 'atractylodes_macrocephala', amount: '15', unit: 'g' }
    ],
    preparation: '물 500ml에 약재를 넣고 250ml가 될 때까지 달인다',
    indications: ['비위허한', '복통', '구토', '설사'],
    dosage: '1일 3회, 식전 복용',
    duration: '7-14일',
    source: '동의수세보원'
  }
]

// 증상별 처방 추천 시스템
export interface SymptomPrescription {
  symptoms: string[]
  constitution: string
  recommendedPrescriptions: string[]  // prescription IDs
  priority: 'high' | 'medium' | 'low'
}

export const symptomBasedPrescriptions: SymptomPrescription[] = [
  {
    symptoms: ['소화불량', '위열', '구갈'],
    constitution: 'taeyang',
    recommendedPrescriptions: ['taeyangjo_tang'],
    priority: 'high'
  },
  {
    symptoms: ['가슴답답', '불면', '열격'],
    constitution: 'soyang',
    recommendedPrescriptions: ['soyangjo_tang', 'palmul_tang'],
    priority: 'high'
  },
  {
    symptoms: ['습담', '부종', '복부팽만'],
    constitution: 'taeeum',
    recommendedPrescriptions: ['taeeumjo_tang', 'yeonggyegamcho_tang'],
    priority: 'high'
  },
  {
    symptoms: ['위한', '복통', '소화불량', '설사'],
    constitution: 'soeum',
    recommendedPrescriptions: ['soeumjo_tang', 'hyangsa_yangwi_tang'],
    priority: 'high'
  }
]

// 처방 검색 및 추천 유틸리티 함수
export function getPrescriptionsByConstitution(constitution: string): Prescription[] {
  return prescriptionsData.filter(prescription => prescription.constitution === constitution)
}

export function getHerbById(herbId: string): Herb | undefined {
  return herbsData.find(herb => herb.id === herbId)
}

export function getPrescriptionById(prescriptionId: string): Prescription | undefined {
  return prescriptionsData.find(prescription => prescription.id === prescriptionId)
}

export function getRecommendedPrescriptions(symptoms: string[], constitution: string): Prescription[] {
  const recommendations = symptomBasedPrescriptions.filter(rec => 
    rec.constitution === constitution &&
    symptoms.some(symptom => rec.symptoms.includes(symptom))
  )

  const prescriptionIds = recommendations
    .sort((a, b) => a.priority === 'high' ? -1 : 1)
    .flatMap(rec => rec.recommendedPrescriptions)

  return [...new Set(prescriptionIds)].map(id => getPrescriptionById(id)).filter(Boolean) as Prescription[]
}

export function calculatePrescriptionCost(prescription: Prescription): number {
  // 임시 가격 계산 (실제로는 한약재 시세 반영)
  const baseCostPerGram = {
    'g': 150,  // 1g당 150원 기준
    'ml': 100
  }
  
  return prescription.herbs.reduce((total, herb) => {
    const amount = parseFloat(herb.amount)
    const costPerUnit = baseCostPerGram[herb.unit as keyof typeof baseCostPerGram] || 100
    return total + (amount * costPerUnit)
  }, 0)
}