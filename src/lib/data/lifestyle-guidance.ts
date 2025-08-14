// 체질별 생활 티칭 데이터

export interface Food {
  id: string
  name: string
  category: string // 곡류, 육류, 채소류, 과일류, 음료 등
  effect: 'beneficial' | 'neutral' | 'harmful' // 해당 체질에 미치는 영향
  properties: string // 성미 (한열온량, 오미)
  nutrients: string[] // 주요 영양성분
  benefits?: string[] // 좋은 효과
  cautions?: string[] // 주의사항
  cookingMethods?: string[] // 권장 조리법
  seasons?: string[] // 적절한 섭취 계절
}

export interface Exercise {
  id: string
  name: string
  category: string // 유산소, 근력, 유연성, 명상 등
  intensity: 'low' | 'moderate' | 'high'
  suitability: 'excellent' | 'good' | 'caution' | 'avoid' // 체질 적합도
  duration: string // 권장 운동 시간
  frequency: string // 권장 빈도
  benefits: string[] // 운동 효과
  precautions?: string[] // 주의사항
  tips?: string[] // 운동 팁
}

export interface LifestyleGuidance {
  constitution: string
  foods: {
    beneficial: Food[]
    neutral: Food[]
    harmful: Food[]
  }
  exercises: Exercise[]
  dailyRoutine: {
    wakeTime: string
    sleepTime: string
    mealTimes: string[]
    exerciseTime: string
    recommendations: string[]
  }
  seasonalAdvice: {
    spring: string[]
    summer: string[]
    autumn: string[]
    winter: string[]
  }
  mentalHealth: {
    stressManagement: string[]
    emotionalBalance: string[]
    meditation: string[]
  }
}

// 태양인 음식 데이터
const taeyangFoods: Food[] = [
  // 유익한 음식
  {
    id: 'taeyang_buckwheat',
    name: '메밀',
    category: '곡류',
    effect: 'beneficial',
    properties: '성량미감 (性涼味甘)',
    nutrients: ['단백질', '루틴', '비타민B'],
    benefits: ['열을 내려줌', '혈관 강화', '소화 개선'],
    cookingMethods: ['냉면', '메밀국수', '메밀전'],
    seasons: ['여름', '가을']
  },
  {
    id: 'taeyang_cabbage',
    name: '배추',
    category: '채소류',
    effect: 'beneficial',
    properties: '성량미감 (性涼味甘)',
    nutrients: ['비타민C', '식이섬유', '칼슘'],
    benefits: ['열독 해소', '소화 촉진', '변비 개선'],
    cookingMethods: ['김치', '쌈', '국물요리'],
    seasons: ['가을', '겨울']
  },
  {
    id: 'taeyang_pork',
    name: '돼지고기',
    category: '육류',
    effect: 'beneficial',
    properties: '성량미감 (性涼味甘)',
    nutrients: ['단백질', '비타민B1', '철분'],
    benefits: ['체력 보강', '근육 발달'],
    cookingMethods: ['수육', '찜', '구이'],
    seasons: ['사계절']
  },
  // 주의해야 할 음식
  {
    id: 'taeyang_ginseng',
    name: '인삼',
    category: '보약',
    effect: 'harmful',
    properties: '성온미감 (性溫味甘)',
    nutrients: ['사포닌', '당질'],
    cautions: ['열성 체질에 부적합', '상열감 증가'],
    seasons: ['겨울']
  },
  {
    id: 'taeyang_ginger',
    name: '생강',
    category: '향신료',
    effect: 'harmful',
    properties: '성열미신 (性熱味辛)',
    nutrients: ['진저롤', '쇼가올'],
    cautions: ['열을 올릴 수 있음', '위장 자극'],
    seasons: ['겨울']
  }
]

// 소양인 음식 데이터
const soyangFoods: Food[] = [
  // 유익한 음식
  {
    id: 'soyang_barley',
    name: '보리',
    category: '곡류',
    effect: 'beneficial',
    properties: '성량미감 (性涼味甘)',
    nutrients: ['식이섬유', '베타글루칸', '비타민B'],
    benefits: ['열 해소', '변비 개선', '콜레스테롤 조절'],
    cookingMethods: ['보리밥', '보리차', '보리죽'],
    seasons: ['여름', '가을']
  },
  {
    id: 'soyang_watermelon',
    name: '수박',
    category: '과일류',
    effect: 'beneficial',
    properties: '성한미감 (性寒味甘)',
    nutrients: ['수분', '비타민C', '라이코펜'],
    benefits: ['열 해소', '수분 보충', '이뇨 작용'],
    cookingMethods: ['생과', '주스'],
    seasons: ['여름']
  },
  {
    id: 'soyang_oyster',
    name: '굴',
    category: '해산물',
    effect: 'beneficial',
    properties: '성량미함 (性涼味鹹)',
    nutrients: ['아연', '단백질', '타우린'],
    benefits: ['음수 보충', '간 해독', '면역력 증강'],
    cookingMethods: ['굴국', '굴전', '생굴'],
    seasons: ['겨울', '봄']
  },
  // 주의해야 할 음식
  {
    id: 'soyang_pepper',
    name: '고추',
    category: '향신료',
    effect: 'harmful',
    properties: '성열미신 (性熱味辛)',
    nutrients: ['캡사이신', '비타민C'],
    cautions: ['열성을 증가시킴', '위장 자극'],
    seasons: ['여름']
  }
]

// 태음인 음식 데이터
const taeumFoods: Food[] = [
  // 유익한 음식
  {
    id: 'taeum_beef',
    name: '쇠고기',
    category: '육류',
    effect: 'beneficial',
    properties: '성평미감 (性平味甘)',
    nutrients: ['단백질', '철분', '아연'],
    benefits: ['기력 보강', '근육 생성', '혈액 생성'],
    cookingMethods: ['불고기', '갈비탕', '스테이크'],
    seasons: ['사계절']
  },
  {
    id: 'taeum_radish',
    name: '무',
    category: '채소류',
    effect: 'beneficial',
    properties: '성량미신감 (性涼味辛甘)',
    nutrients: ['비타민C', '식이섬유', '소화효소'],
    benefits: ['소화 촉진', '가래 제거', '해독 작용'],
    cookingMethods: ['무국', '무생채', '동치미'],
    seasons: ['가을', '겨울']
  },
  {
    id: 'taeum_walnut',
    name: '호두',
    category: '견과류',
    effect: 'beneficial',
    properties: '성온미감 (性溫味甘)',
    nutrients: ['오메가3', '단백질', '비타민E'],
    benefits: ['뇌 건강', '기력 보충', '변비 개선'],
    cookingMethods: ['생것', '호두차', '요리 토핑'],
    seasons: ['겨울', '봄']
  },
  // 주의해야 할 음식
  {
    id: 'taeum_chicken',
    name: '닭고기',
    category: '육류',
    effect: 'harmful',
    properties: '성온미감 (性溫味甘)',
    nutrients: ['단백질', '인', '나이아신'],
    cautions: ['열성을 높일 수 있음', '습담 생성'],
    seasons: ['여름']
  }
]

// 소음인 음식 데이터
const soeumFoods: Food[] = [
  // 유익한 음식
  {
    id: 'soeum_rice',
    name: '찹쌀',
    category: '곡류',
    effect: 'beneficial',
    properties: '성온미감 (性溫味甘)',
    nutrients: ['탄수화물', '단백질', '비타민B'],
    benefits: ['위장 강화', '기력 보충', '소화 개선'],
    cookingMethods: ['찹쌀밥', '떡', '죽'],
    seasons: ['사계절']
  },
  {
    id: 'soeum_ginger',
    name: '생강',
    category: '향신료',
    effect: 'beneficial',
    properties: '성열미신 (性熱味辛)',
    nutrients: ['진저롤', '쇼가올'],
    benefits: ['소화 촉진', '몸을 따뜻하게', '감기 예방'],
    cookingMethods: ['생강차', '요리 양념'],
    seasons: ['가을', '겨울']
  },
  {
    id: 'soeum_lamb',
    name: '양고기',
    category: '육류',
    effect: 'beneficial',
    properties: '성열미감 (性熱味甘)',
    nutrients: ['단백질', '철분', 'L-카르니틴'],
    benefits: ['체온 상승', '기력 보강', '혈액순환'],
    cookingMethods: ['구이', '탕', '찜'],
    seasons: ['가을', '겨울']
  },
  // 주의해야 할 음식
  {
    id: 'soeum_watermelon',
    name: '수박',
    category: '과일류',
    effect: 'harmful',
    properties: '성한미감 (性寒味甘)',
    nutrients: ['수분', '비타민C'],
    cautions: ['몸을 차갑게 함', '소화불량 유발'],
    seasons: ['여름']
  }
]

// 체질별 운동 데이터
const taeyangExercises: Exercise[] = [
  {
    id: 'taeyang_walking',
    name: '산책',
    category: '유산소',
    intensity: 'low',
    suitability: 'excellent',
    duration: '30-60분',
    frequency: '매일',
    benefits: ['스트레스 해소', '혈액순환', '마음의 평정'],
    tips: ['자연 환경에서', '천천히 걷기', '명상과 함께']
  },
  {
    id: 'taeyang_swimming',
    name: '수영',
    category: '유산소',
    intensity: 'moderate',
    suitability: 'excellent',
    duration: '30-45분',
    frequency: '주 3-4회',
    benefits: ['전신 운동', '관절 부담 적음', '심폐 강화'],
    tips: ['물 온도 주의', '과도하지 않게', '천천히 진행']
  },
  {
    id: 'taeyang_yoga',
    name: '요가',
    category: '유연성',
    intensity: 'low',
    suitability: 'excellent',
    duration: '60-90분',
    frequency: '주 2-3회',
    benefits: ['정신적 안정', '유연성 향상', '스트레스 해소'],
    tips: ['마음을 차분히', '무리하지 말고', '호흡에 집중']
  }
]

const soyangExercises: Exercise[] = [
  {
    id: 'soyang_jogging',
    name: '조깅',
    category: '유산소',
    intensity: 'moderate',
    suitability: 'good',
    duration: '20-40분',
    frequency: '주 3-4회',
    benefits: ['심폐 강화', '체중 관리', '스트레스 해소'],
    precautions: ['과도한 운동 금지', '충분한 수분 섭취'],
    tips: ['시원한 시간대', '적당한 강도', '수분 보충']
  },
  {
    id: 'soyang_tennis',
    name: '테니스',
    category: '구기종목',
    intensity: 'moderate',
    suitability: 'good',
    duration: '60-90분',
    frequency: '주 2-3회',
    benefits: ['순발력 향상', '전신 운동', '사회성'],
    precautions: ['과열 주의', '적절한 휴식'],
    tips: ['실내에서', '적당한 강도', '수분 섭취']
  },
  {
    id: 'soyang_pilates',
    name: '필라테스',
    category: '근력',
    intensity: 'moderate',
    suitability: 'excellent',
    duration: '45-60분',
    frequency: '주 2-3회',
    benefits: ['코어 강화', '자세 교정', '집중력 향상'],
    tips: ['정확한 자세', '호흡 조절', '점진적 증가']
  }
]

const taeumExercises: Exercise[] = [
  {
    id: 'taeum_weight_training',
    name: '웨이트 트레이닝',
    category: '근력',
    intensity: 'high',
    suitability: 'excellent',
    duration: '60-90분',
    frequency: '주 3-4회',
    benefits: ['근육량 증가', '기초대사량 향상', '체형 개선'],
    tips: ['점진적 증량', '충분한 휴식', '올바른 자세']
  },
  {
    id: 'taeum_hiking',
    name: '등산',
    category: '유산소',
    intensity: 'high',
    suitability: 'excellent',
    duration: '2-4시간',
    frequency: '주 1-2회',
    benefits: ['심폐 지구력', '하체 근력', '정신력 강화'],
    tips: ['적절한 장비', '충분한 준비', '안전 우선']
  },
  {
    id: 'taeum_boxing',
    name: '복싱',
    category: '격투기',
    intensity: 'high',
    suitability: 'good',
    duration: '60분',
    frequency: '주 2-3회',
    benefits: ['전신 운동', '스트레스 해소', '순발력'],
    precautions: ['부상 위험', '적절한 보호구'],
    tips: ['기초부터', '안전 장비', '점진적 강도']
  }
]

const soeumExercises: Exercise[] = [
  {
    id: 'soeum_yoga',
    name: '요가',
    category: '유연성',
    intensity: 'low',
    suitability: 'excellent',
    duration: '45-60분',
    frequency: '주 3-4회',
    benefits: ['유연성', '정신 안정', '혈액순환'],
    tips: ['따뜻한 환경', '천천히 진행', '무리하지 않기']
  },
  {
    id: 'soeum_walking',
    name: '산책',
    category: '유산소',
    intensity: 'low',
    suitability: 'excellent',
    duration: '30-45분',
    frequency: '매일',
    benefits: ['기혈순환', '소화 촉진', '마음의 평화'],
    tips: ['따뜻한 시간', '규칙적으로', '자연과 함께']
  },
  {
    id: 'soeum_tai_chi',
    name: '태극권',
    category: '명상',
    intensity: 'low',
    suitability: 'excellent',
    duration: '30-45분',
    frequency: '매일',
    benefits: ['기혈순환', '정신집중', '균형감각'],
    tips: ['마음을 비우고', '천천히 정확하게', '지속적으로']
  }
]

// 체질별 생활 가이던스 통합 데이터
export const lifestyleGuidanceData: LifestyleGuidance[] = [
  {
    constitution: 'taeyang',
    foods: {
      beneficial: taeyangFoods.filter(f => f.effect === 'beneficial'),
      neutral: taeyangFoods.filter(f => f.effect === 'neutral'),
      harmful: taeyangFoods.filter(f => f.effect === 'harmful')
    },
    exercises: taeyangExercises,
    dailyRoutine: {
      wakeTime: '06:00',
      sleepTime: '22:00',
      mealTimes: ['07:00', '12:00', '18:00'],
      exerciseTime: '아침 또는 저녁',
      recommendations: [
        '규칙적인 생활 패턴 유지',
        '충분한 수면 시간 확보',
        '스트레스 관리에 신경 쓰기',
        '차가운 성질의 음식 위주로 섭취',
        '과격한 운동보다는 가벼운 운동'
      ]
    },
    seasonalAdvice: {
      spring: ['봄나물 섭취', '가벼운 운동 시작', '스트레스 관리'],
      summer: ['시원한 음식 섭취', '충분한 수분 보충', '무리한 활동 자제'],
      autumn: ['보양식 절제', '규칙적인 운동', '마음의 평정 유지'],
      winter: ['따뜻한 차 마시기', '실내 운동', '충분한 휴식']
    },
    mentalHealth: {
      stressManagement: ['명상', '독서', '음악감상', '자연과의 교감'],
      emotionalBalance: ['감정 조절', '여유로운 마음', '긍정적 사고'],
      meditation: ['호흡 명상', '걷기 명상', '요가', '차 명상']
    }
  },
  {
    constitution: 'soyang',
    foods: {
      beneficial: soyangFoods.filter(f => f.effect === 'beneficial'),
      neutral: soyangFoods.filter(f => f.effect === 'neutral'),
      harmful: soyangFoods.filter(f => f.effect === 'harmful')
    },
    exercises: soyangExercises,
    dailyRoutine: {
      wakeTime: '06:30',
      sleepTime: '22:30',
      mealTimes: ['07:30', '12:30', '18:30'],
      exerciseTime: '오전 또는 저녁',
      recommendations: [
        '규칙적이지만 유연한 생활',
        '충분한 수면으로 열 해소',
        '스트레스를 적절히 해소',
        '서늘한 성질의 음식 섭취',
        '적당한 강도의 운동'
      ]
    },
    seasonalAdvice: {
      spring: ['봄 채소 섭취', '야외 활동 증가', '알레르기 주의'],
      summer: ['차가운 음식 적극 섭취', '충분한 휴식', '열 중증 주의'],
      autumn: ['제철 과일 섭취', '운동량 적절히 증가', '감정 관리'],
      winter: ['따뜻하지 않게', '실내 활동', '수분 섭취 유지']
    },
    mentalHealth: {
      stressManagement: ['취미 활동', '사회적 교류', '창작 활동'],
      emotionalBalance: ['감정 표현', '활발한 소통', '목표 설정'],
      meditation: ['동적 명상', '그룹 명상', '자연 명상']
    }
  },
  {
    constitution: 'taeeum',
    foods: {
      beneficial: taeumFoods.filter(f => f.effect === 'beneficial'),
      neutral: taeumFoods.filter(f => f.effect === 'neutral'),
      harmful: taeumFoods.filter(f => f.effect === 'harmful')
    },
    exercises: taeumExercises,
    dailyRoutine: {
      wakeTime: '05:30',
      sleepTime: '22:00',
      mealTimes: ['07:00', '12:00', '18:00'],
      exerciseTime: '오전',
      recommendations: [
        '규칙적이고 활동적인 생활',
        '충분한 운동으로 신진대사 촉진',
        '과식 피하고 소식하기',
        '담백한 음식 위주로 섭취',
        '꾸준하고 강도 높은 운동'
      ]
    },
    seasonalAdvice: {
      spring: ['해독 음식 섭취', '운동량 증가', '체중 관리'],
      summer: ['시원한 음식 적당히', '땀나는 운동', '충분한 활동'],
      autumn: ['보양식 적당히', '등산 등 야외 활동', '규칙적 생활'],
      winter: ['따뜻한 음식', '실내 운동 지속', '체중 관리 주의']
    },
    mentalHealth: {
      stressManagement: ['운동', '목표 설정', '성취감', '사회 활동'],
      emotionalBalance: ['적극적 태도', '도전 정신', '인내심'],
      meditation: ['움직이는 명상', '목표 명상', '감사 명상']
    }
  },
  {
    constitution: 'soeum',
    foods: {
      beneficial: soeumFoods.filter(f => f.effect === 'beneficial'),
      neutral: soeumFoods.filter(f => f.effect === 'neutral'),
      harmful: soeumFoods.filter(f => f.effect === 'harmful')
    },
    exercises: soeumExercises,
    dailyRoutine: {
      wakeTime: '07:00',
      sleepTime: '22:30',
      mealTimes: ['08:00', '12:30', '19:00'],
      exerciseTime: '오후',
      recommendations: [
        '따뜻하고 규칙적인 생활',
        '충분한 휴식과 수면',
        '스트레스 피하고 안정감 유지',
        '따뜻한 성질의 음식 섭취',
        '가벼운 운동으로 기혈 순환'
      ]
    },
    seasonalAdvice: {
      spring: ['따뜻한 봄나물', '가벼운 운동 시작', '알레르기 주의'],
      summer: ['에어컨 과도한 사용 피하기', '따뜻한 음식 유지', '충분한 수분'],
      autumn: ['보양식 적극 섭취', '따뜻하게 입기', '감기 예방'],
      winter: ['따뜻한 음식 위주', '실내 운동', '체온 관리']
    },
    mentalHealth: {
      stressManagement: ['조용한 취미', '독서', '차 마시기', '온화한 사람들과 교류'],
      emotionalBalance: ['안정감', '소속감', '따뜻한 인간관계'],
      meditation: ['정적 명상', '호흡 명상', '온화한 음악과 함께']
    }
  }
]

// 유틸리티 함수
export function getLifestyleGuidanceByConstitution(constitution: string): LifestyleGuidance | undefined {
  return lifestyleGuidanceData.find(guidance => guidance.constitution === constitution)
}

export function getFoodsByConstitution(constitution: string): Food[] {
  const guidance = getLifestyleGuidanceByConstitution(constitution)
  return guidance ? [...guidance.foods.beneficial, ...guidance.foods.neutral, ...guidance.foods.harmful] : []
}

export function getExercisesByConstitution(constitution: string): Exercise[] {
  const guidance = getLifestyleGuidanceByConstitution(constitution)
  return guidance?.exercises || []
}

export function getFoodRecommendationsByCategory(constitution: string, category: string): Food[] {
  const foods = getFoodsByConstitution(constitution)
  return foods.filter(food => food.category === category)
}

export function getSeasonalAdvice(constitution: string, season: 'spring' | 'summer' | 'autumn' | 'winter'): string[] {
  const guidance = getLifestyleGuidanceByConstitution(constitution)
  return guidance?.seasonalAdvice[season] || []
}

// 음식 카테고리 리스트
export const foodCategories = [
  '곡류', '육류', '채소류', '과일류', '해산물', '견과류', '유제품', '음료', '향신료', '보약'
]

// 운동 카테고리 리스트
export const exerciseCategories = [
  '유산소', '근력', '유연성', '명상', '구기종목', '격투기', '수상스포츠', '야외활동'
]