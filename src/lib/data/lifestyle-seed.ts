// 생활 티칭 추가 데이터 및 시드 데이터

import { type Food, type Exercise } from './lifestyle-guidance'

// 추가 한약재 음식 데이터
export const additionalFoods: Food[] = [
  // 태양인 추가 음식
  {
    id: 'taeyang_cucumber',
    name: '오이',
    category: '채소류',
    effect: 'beneficial',
    properties: '성한미감 (性寒味甘)',
    nutrients: ['수분', '비타민C', '칼륨'],
    benefits: ['열 해소', '수분 보충', '이뇨 작용'],
    cookingMethods: ['생식', '냉국', '무침'],
    seasons: ['여름']
  },
  {
    id: 'taeyang_pear',
    name: '배',
    category: '과일류',
    effect: 'beneficial',
    properties: '성량미감 (性涼味甘)',
    nutrients: ['수분', '식이섬유', '비타민C'],
    benefits: ['폐열 해소', '기관지 보호', '변비 개선'],
    cookingMethods: ['생과', '배즙', '배차'],
    seasons: ['가을', '겨울']
  },
  
  // 소양인 추가 음식
  {
    id: 'soyang_green_bean',
    name: '녹두',
    category: '콩류',
    effect: 'beneficial',
    properties: '성한미감 (性寒味甘)',
    nutrients: ['단백질', '식이섬유', '비타민B'],
    benefits: ['열독 해소', '부종 완화', '해독 작용'],
    cookingMethods: ['녹두죽', '녹두전', '숙주나물'],
    seasons: ['여름']
  },
  {
    id: 'soyang_crab',
    name: '게',
    category: '해산물',
    effect: 'beneficial',
    properties: '성한미함 (性寒味鹹)',
    nutrients: ['단백질', '키틴', '타우린'],
    benefits: ['열 해소', '혈액순환', '관절 건강'],
    cookingMethods: ['찜', '탕', '무침'],
    seasons: ['가을']
  },
  
  // 태음인 추가 음식
  {
    id: 'taeum_mushroom',
    name: '버섯',
    category: '채소류',
    effect: 'beneficial',
    properties: '성평미감 (性平味甘)',
    nutrients: ['단백질', '베타글루칸', '비타민D'],
    benefits: ['면역력 증강', '항암 작용', '콜레스테롤 조절'],
    cookingMethods: ['볶음', '전골', '찜'],
    seasons: ['가을', '겨울']
  },
  {
    id: 'taeum_kelp',
    name: '다시마',
    category: '해조류',
    effect: 'beneficial',
    properties: '성한미함 (性寒味鹹)',
    nutrients: ['요오드', '칼슘', '식이섬유'],
    benefits: ['갑상선 건강', '혈압 조절', '변비 개선'],
    cookingMethods: ['국물', '무침', '볶음'],
    seasons: ['사계절']
  },
  
  // 소음인 추가 음식
  {
    id: 'soeum_sweet_potato',
    name: '고구마',
    category: '근채류',
    effect: 'beneficial',
    properties: '성온미감 (性溫味甘)',
    nutrients: ['베타카로틴', '식이섬유', '칼륨'],
    benefits: ['소화 촉진', '변비 개선', '면역력 증강'],
    cookingMethods: ['구이', '찜', '죽'],
    seasons: ['가을', '겨울']
  },
  {
    id: 'soeum_chicken',
    name: '닭고기',
    category: '육류',
    effect: 'beneficial',
    properties: '성온미감 (性溫味甘)',
    nutrients: ['단백질', '인', '나이아신'],
    benefits: ['기력 보충', '소화 촉진', '체력 강화'],
    cookingMethods: ['삶음', '찜', '죽'],
    seasons: ['겨울', '봄']
  }
]

// 추가 운동 데이터
export const additionalExercises: Exercise[] = [
  // 태양인 추가 운동
  {
    id: 'taeyang_meditation',
    name: '명상',
    category: '명상',
    intensity: 'low',
    suitability: 'excellent',
    duration: '20-30분',
    frequency: '매일',
    benefits: ['정신적 평안', '스트레스 해소', '집중력 향상'],
    tips: ['조용한 환경', '편안한 자세', '규칙적 실천']
  },
  {
    id: 'taeyang_cycling',
    name: '자전거 타기',
    category: '유산소',
    intensity: 'moderate',
    suitability: 'good',
    duration: '30-60분',
    frequency: '주 2-3회',
    benefits: ['심폐 기능 향상', '하체 근력', '관절 부담 적음'],
    tips: ['적당한 속도', '안전 장비 착용', '수분 보충']
  },
  
  // 소양인 추가 운동
  {
    id: 'soyang_badminton',
    name: '배드민턴',
    category: '구기종목',
    intensity: 'moderate',
    suitability: 'excellent',
    duration: '45-90분',
    frequency: '주 2-3회',
    benefits: ['순발력 향상', '전신 운동', '협응력 발달'],
    tips: ['실내에서', '적절한 휴식', '수분 보충']
  },
  {
    id: 'soyang_dance',
    name: '댄스',
    category: '유산소',
    intensity: 'moderate',
    suitability: 'good',
    duration: '45-60분',
    frequency: '주 2-3회',
    benefits: ['심폐 지구력', '리듬감', '스트레스 해소'],
    tips: ['다양한 장르', '즐겁게', '점진적 증가']
  },
  
  // 태음인 추가 운동
  {
    id: 'taeum_crossfit',
    name: '크로스핏',
    category: '근력',
    intensity: 'high',
    suitability: 'good',
    duration: '45-60분',
    frequency: '주 3-4회',
    benefits: ['전신 근력', '체력 향상', '다양성'],
    precautions: ['부상 위험', '충분한 준비 운동'],
    tips: ['전문 지도', '개인 수준 조절', '안전 우선']
  },
  {
    id: 'taeum_running',
    name: '달리기',
    category: '유산소',
    intensity: 'high',
    suitability: 'excellent',
    duration: '30-60분',
    frequency: '주 3-4회',
    benefits: ['심폐 지구력', '체중 관리', '정신력 강화'],
    tips: ['점진적 증량', '적절한 신발', '몸의 신호 주의']
  },
  
  // 소음인 추가 운동
  {
    id: 'soeum_stretching',
    name: '스트레칭',
    category: '유연성',
    intensity: 'low',
    suitability: 'excellent',
    duration: '15-30분',
    frequency: '매일',
    benefits: ['유연성 향상', '혈액순환', '근육 이완'],
    tips: ['부드럽게', '꾸준히', '호흡과 함께']
  },
  {
    id: 'soeum_qigong',
    name: '기공',
    category: '명상',
    intensity: 'low',
    suitability: 'excellent',
    duration: '30-45분',
    frequency: '매일',
    benefits: ['기혈순환', '정신 수양', '체력 증진'],
    tips: ['올바른 호흡', '정확한 자세', '꾸준한 연습']
  }
]

// 체질별 일일 식단 예시
export const sampleDailyMenus = {
  taeyang: {
    breakfast: ['메밀죽', '배추김치', '두부된장국'],
    lunch: ['보리밥', '돼지고기 수육', '오이냉채', '미역국'],
    dinner: ['현미밥', '생선구이', '나물무침', '배추국'],
    snacks: ['배', '오이', '찬 차']
  },
  soyang: {
    breakfast: ['보리밥', '굴국', '시금치나물'],
    lunch: ['현미밥', '도미찜', '가지나물', '오이냉국'],
    dinner: ['흑미밥', '새우젓', '상추쌈', '콩나물국'],
    snacks: ['수박', '포도', '녹차']
  },
  taeeum: {
    breakfast: ['현미밥', '쇠고기미역국', '무생채'],
    lunch: ['잡곡밥', '갈비찜', '도라지무침', '버섯국'],
    dinner: ['현미밥', '생선조림', '콩나물무침', '다시마국'],
    snacks: ['견과류', '사과', '따뜻한 차']
  },
  soeum: {
    breakfast: ['찹쌀죽', '생강차', '김치찌개'],
    lunch: ['현미밥', '닭백숙', '고구마순무침', '된장국'],
    dinner: ['잡곡밥', '양고기구이', '마늘종볶음', '미역국'],
    snacks: ['대추', '생강차', '호두']
  }
}

// 체질별 운동 루틴 예시
export const sampleExerciseRoutines = {
  taeyang: {
    monday: ['산책 30분', '요가 30분'],
    tuesday: ['수영 45분'],
    wednesday: ['산책 45분', '명상 20분'],
    thursday: ['요가 60분'],
    friday: ['자전거 45분'],
    saturday: ['등산 2시간'],
    sunday: ['휴식', '가벼운 스트레칭']
  },
  soyang: {
    monday: ['조깅 30분', '필라테스 45분'],
    tuesday: ['테니스 90분'],
    wednesday: ['댄스 60분'],
    thursday: ['배드민턴 90분'],
    friday: ['조깅 40분', '요가 30분'],
    saturday: ['등산 3시간'],
    sunday: ['휴식', '가벼운 산책']
  },
  taeeum: {
    monday: ['웨이트 트레이닝 90분'],
    tuesday: ['달리기 45분', '근력 운동 45분'],
    wednesday: ['등산 3시간'],
    thursday: ['크로스핏 60분'],
    friday: ['웨이트 트레이닝 90분'],
    saturday: ['복싱 60분'],
    sunday: ['가벼운 조깅 30분']
  },
  soeum: {
    monday: ['요가 60분'],
    tuesday: ['산책 30분', '태극권 30분'],
    wednesday: ['스트레칭 30분', '기공 30분'],
    thursday: ['요가 60분'],
    friday: ['산책 45분'],
    saturday: ['가벼운 등산 2시간'],
    sunday: ['휴식', '명상 20분']
  }
}

// 계절별 건강 관리 상세 가이드
export const detailedSeasonalGuides = {
  taeyang: {
    spring: {
      foods: ['봄나물', '죽순', '미나리', '쑥'],
      exercises: ['가벼운 등산', '자전거', '산책'],
      lifestyle: ['일찍 기상', '가벼운 옷차림', '스트레스 관리'],
      warnings: ['꽃가루 알레르기 주의', '급격한 기온 변화 대비']
    },
    summer: {
      foods: ['수박', '참외', '오이', '냉면'],
      exercises: ['수영', '시원한 시간대 운동'],
      lifestyle: ['충분한 수분 섭취', '에어컨 과도 사용 주의'],
      warnings: ['열사병 주의', '찬 음식 과다 섭취 주의']
    },
    autumn: {
      foods: ['배', '사과', '감', '도라지'],
      exercises: ['등산', '자전거', '조깅'],
      lifestyle: ['규칙적인 생활', '보온 관리'],
      warnings: ['환절기 감기 주의', '건조함 대비']
    },
    winter: {
      foods: ['따뜻한 차', '견과류', '해조류'],
      exercises: ['실내 운동', '요가', '명상'],
      lifestyle: ['충분한 휴식', '따뜻한 환경'],
      warnings: ['과도한 난방 주의', '실내 건조 주의']
    }
  },
  // 다른 체질도 동일한 구조로...
}

// 체질별 주의할 생활 패턴
export const lifestyleWarnings = {
  taeyang: [
    '과도한 스트레스는 상열감을 증가시킵니다',
    '뜨거운 음식이나 자극적인 음식은 피하세요',
    '과로는 신체 불균형을 초래할 수 있습니다'
  ],
  soyang: [
    '과열된 환경에서의 운동은 피하세요',
    '매운 음식은 내열을 증가시킵니다',
    '과도한 사회 활동은 에너지를 소모시킵니다'
  ],
  taeeum: [
    '과식은 소화 기능에 부담을 줍니다',
    '운동 부족은 습담을 증가시킵니다',
    '게으른 생활 습관은 건강에 해롭습니다'
  ],
  soeum: [
    '차가운 음식은 소화력을 약화시킵니다',
    '과도한 에어컨 사용은 피하세요',
    '무리한 운동은 오히려 기력을 소모시킵니다'
  ]
}

// 체질별 건강 체크리스트
export const healthCheckLists = {
  taeyang: [
    '하루 8잔 이상의 물 섭취',
    '규칙적인 수면 패턴 유지',
    '스트레스 관리 실천',
    '적절한 휴식 시간 확보',
    '뜨거운 음식 섭취 제한'
  ],
  soyang: [
    '충분한 수분 섭취',
    '시원한 성질의 음식 섭취',
    '과도한 활동 자제',
    '정기적인 건강 검진',
    '감정 조절 연습'
  ],
  taeeum: [
    '규칙적인 운동 실천',
    '적절한 식사량 조절',
    '체중 관리 지속',
    '활동적인 생활 습관',
    '정기적인 건강 체크'
  ],
  soeum: [
    '따뜻한 음식 위주 섭취',
    '적당한 운동량 유지',
    '충분한 휴식과 수면',
    '스트레스 최소화',
    '체온 유지 관리'
  ]
}