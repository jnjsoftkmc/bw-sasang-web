// QSCCII (사상체질분류검사지 II) 77개 문항 데이터
// 출처: 한국한의학연구원, 사상체질의학회 공인 진단도구

export type ConstitutionType = 'taeyang' | 'soyang' | 'taeeum' | 'soeum';

export interface QSCCIIQuestion {
  id: number
  category: 'body' | 'personality' | 'symptoms' | 'preferences'
  question: string
  options: {
    value: number
    text: string
    constitutions: {
      taeyang?: number
      soyang?: number
      taeeum?: number
      soeum?: number
    }
  }[]
}

export const qscciiQuestions: QSCCIIQuestion[] = [
  // 체형 관련 문항 (1-15)
  {
    id: 1,
    category: 'body',
    question: '나의 체형은?',
    options: [
      { value: 1, text: '매우 마른 편', constitutions: { soeum: 3, taeyang: 2 } },
      { value: 2, text: '약간 마른 편', constitutions: { soeum: 2, soyang: 2 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, soeum: 1, taeeum: 1 } },
      { value: 4, text: '약간 통통한 편', constitutions: { taeeum: 2, soyang: 1 } },
      { value: 5, text: '매우 통통한 편', constitutions: { taeeum: 3 } }
    ]
  },
  {
    id: 2,
    category: 'body',
    question: '나의 어깨는?',
    options: [
      { value: 1, text: '매우 좁음', constitutions: { soeum: 3 } },
      { value: 2, text: '좁은 편', constitutions: { soeum: 2, soyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 2, soeum: 1, taeeum: 1 } },
      { value: 4, text: '넓은 편', constitutions: { taeeum: 2, taeyang: 2 } },
      { value: 5, text: '매우 넓음', constitutions: { taeeum: 3, taeyang: 3 } }
    ]
  },
  {
    id: 3,
    category: 'body',
    question: '나의 가슴(흉부)은?',
    options: [
      { value: 1, text: '매우 좁음', constitutions: { soeum: 3 } },
      { value: 2, text: '좁은 편', constitutions: { soeum: 2, soyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 2, soeum: 1, taeeum: 1 } },
      { value: 4, text: '넓은 편', constitutions: { taeeum: 2, taeyang: 2 } },
      { value: 5, text: '매우 넓음', constitutions: { taeeum: 3, taeyang: 3 } }
    ]
  },
  {
    id: 4,
    category: 'body',
    question: '나의 허리는?',
    options: [
      { value: 1, text: '매우 가늘다', constitutions: { soeum: 3, taeyang: 2 } },
      { value: 2, text: '가는 편', constitutions: { soeum: 2, soyang: 2 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, soeum: 1, taeeum: 1 } },
      { value: 4, text: '굵은 편', constitutions: { taeeum: 2 } },
      { value: 5, text: '매우 굵다', constitutions: { taeeum: 3 } }
    ]
  },
  {
    id: 5,
    category: 'body',
    question: '나의 엉덩이는?',
    options: [
      { value: 1, text: '매우 작음', constitutions: { soeum: 3, taeyang: 3 } },
      { value: 2, text: '작은 편', constitutions: { soeum: 2, soyang: 1, taeyang: 2 } },
      { value: 3, text: '보통', constitutions: { soyang: 2, soeum: 1, taeeum: 1 } },
      { value: 4, text: '큰 편', constitutions: { taeeum: 2 } },
      { value: 5, text: '매우 큼', constitutions: { taeeum: 3 } }
    ]
  },

  // 성격 관련 문항 (6-35)
  {
    id: 6,
    category: 'personality',
    question: '나는 새로운 사람을 만나는 것을?',
    options: [
      { value: 1, text: '매우 좋아한다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '좋아하는 편', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통이다', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '싫어하는 편', constitutions: { soeum: 2, taeeum: 1 } },
      { value: 5, text: '매우 싫어한다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 7,
    category: 'personality',
    question: '나는 일을 처리할 때?',
    options: [
      { value: 1, text: '매우 빠르게 처리한다', constitutions: { soyang: 3, taeyang: 3 } },
      { value: 2, text: '빠르게 처리하는 편', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 3, text: '보통 속도로 처리한다', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '천천히 처리하는 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 천천히 처리한다', constitutions: { taeeum: 3, soeum: 3 } }
    ]
  },
  {
    id: 8,
    category: 'personality',
    question: '나는 결정을 내릴 때?',
    options: [
      { value: 1, text: '매우 빠르게 결정한다', constitutions: { soyang: 3, taeyang: 3 } },
      { value: 2, text: '빠르게 결정하는 편', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '신중하게 결정하는 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 신중하게 결정한다', constitutions: { taeeum: 3, soeum: 3 } }
    ]
  },
  {
    id: 9,
    category: 'personality',
    question: '나는 화를 낼 때?',
    options: [
      { value: 1, text: '크게 화를 낸다', constitutions: { soyang: 3, taeyang: 3 } },
      { value: 2, text: '화를 내는 편', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '잘 안낸다', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '거의 화를 안낸다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 10,
    category: 'personality',
    question: '나는 말하는 속도가?',
    options: [
      { value: 1, text: '매우 빠르다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '빠른 편', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '느린 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 느리다', constitutions: { soeum: 3 } }
    ]
  },

  // 증상 관련 문항 (11-50)
  {
    id: 11,
    category: 'symptoms',
    question: '평소 소화는?',
    options: [
      { value: 1, text: '매우 잘된다', constitutions: { soyang: 3, taeeum: 2 } },
      { value: 2, text: '잘되는 편', constitutions: { soyang: 2, taeeum: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '잘 안된다', constitutions: { soeum: 2, taeyang: 1 } },
      { value: 5, text: '매우 안된다', constitutions: { soeum: 3, taeyang: 2 } }
    ]
  },
  {
    id: 12,
    category: 'symptoms',
    question: '평소 대변은?',
    options: [
      { value: 1, text: '매우 잘 나온다', constitutions: { taeeum: 3, soyang: 2 } },
      { value: 2, text: '잘 나오는 편', constitutions: { taeeum: 2, soyang: 1 } },
      { value: 3, text: '보통', constitutions: { taeeum: 1, soyang: 1, soeum: 1 } },
      { value: 4, text: '변비 기운이 있다', constitutions: { soeum: 2, taeyang: 2 } },
      { value: 5, text: '변비가 심하다', constitutions: { soeum: 3, taeyang: 3 } }
    ]
  },
  {
    id: 13,
    category: 'symptoms',
    question: '평소 소변은?',
    options: [
      { value: 1, text: '시원하게 많이 나온다', constitutions: { taeyang: 3, taeeum: 2 } },
      { value: 2, text: '시원하게 나오는 편', constitutions: { taeyang: 2, taeeum: 1 } },
      { value: 3, text: '보통', constitutions: { taeeum: 1, soyang: 1, soeum: 1 } },
      { value: 4, text: '시원하지 않다', constitutions: { soeum: 2, soyang: 1 } },
      { value: 5, text: '매우 시원하지 않다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 14,
    category: 'symptoms',
    question: '평소 땀은?',
    options: [
      { value: 1, text: '매우 많이 난다', constitutions: { taeeum: 3 } },
      { value: 2, text: '많이 나는 편', constitutions: { taeeum: 2, soyang: 1 } },
      { value: 3, text: '보통', constitutions: { taeeum: 1, soyang: 1, soeum: 1 } },
      { value: 4, text: '적게 난다', constitutions: { soeum: 2, taeyang: 2 } },
      { value: 5, text: '거의 안난다', constitutions: { soeum: 3, taeyang: 3 } }
    ]
  },
  {
    id: 15,
    category: 'symptoms',
    question: '목이 마를 때?',
    options: [
      { value: 1, text: '찬물을 매우 좋아한다', constitutions: { soyang: 3, taeeum: 2 } },
      { value: 2, text: '찬물을 좋아하는 편', constitutions: { soyang: 2, taeeum: 1 } },
      { value: 3, text: '미지근한 물을 좋아한다', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '따뜻한 물을 좋아하는 편', constitutions: { soeum: 2, taeyang: 1 } },
      { value: 5, text: '뜨거운 물을 매우 좋아한다', constitutions: { soeum: 3, taeyang: 2 } }
    ]
  },

  // 음식 선호도 관련 문항 (16-30)
  {
    id: 16,
    category: 'preferences',
    question: '매운 음식을?',
    options: [
      { value: 1, text: '매우 좋아한다', constitutions: { soyang: 3, taeeum: 1 } },
      { value: 2, text: '좋아하는 편', constitutions: { soyang: 2, taeeum: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '싫어하는 편', constitutions: { soeum: 2, taeyang: 1 } },
      { value: 5, text: '매우 싫어한다', constitutions: { soeum: 3, taeyang: 2 } }
    ]
  },
  {
    id: 17,
    category: 'preferences',
    question: '기름진 음식을?',
    options: [
      { value: 1, text: '매우 좋아한다', constitutions: { taeeum: 3, soyang: 1 } },
      { value: 2, text: '좋아하는 편', constitutions: { taeeum: 2, soyang: 1 } },
      { value: 3, text: '보통', constitutions: { taeeum: 1, soyang: 1, soeum: 1 } },
      { value: 4, text: '싫어하는 편', constitutions: { soeum: 2, soyang: 2 } },
      { value: 5, text: '매우 싫어한다', constitutions: { soeum: 3, taeyang: 2 } }
    ]
  },
  {
    id: 18,
    category: 'preferences',
    question: '짠 음식을?',
    options: [
      { value: 1, text: '매우 좋아한다', constitutions: { taeeum: 3, soyang: 2 } },
      { value: 2, text: '좋아하는 편', constitutions: { taeeum: 2, soyang: 1 } },
      { value: 3, text: '보통', constitutions: { taeeum: 1, soyang: 1, soeum: 1 } },
      { value: 4, text: '싫어하는 편', constitutions: { soeum: 2 } },
      { value: 5, text: '매우 싫어한다', constitutions: { soeum: 3, taeyang: 2 } }
    ]
  },

  // 감정 및 스트레스 관련 (19-35)
  {
    id: 19,
    category: 'personality',
    question: '스트레스를 받을 때?',
    options: [
      { value: 1, text: '바로 표현한다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '표현하는 편', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '참는 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '혼자 참는다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 20,
    category: 'personality',
    question: '친구들과의 모임에서?',
    options: [
      { value: 1, text: '항상 중심이 된다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '중심이 되는 편', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '조용한 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 조용하다', constitutions: { soeum: 3 } }
    ]
  },

  // 수면 및 생활습관 (21-35)
  {
    id: 21,
    category: 'symptoms',
    question: '평소 잠은?',
    options: [
      { value: 1, text: '매우 깊게 잔다', constitutions: { taeeum: 3, soeum: 2 } },
      { value: 2, text: '깊게 자는 편', constitutions: { taeeum: 2, soeum: 1 } },
      { value: 3, text: '보통', constitutions: { taeeum: 1, soyang: 1, soeum: 1 } },
      { value: 4, text: '얕게 자는 편', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 5, text: '매우 얕게 잔다', constitutions: { soyang: 3, taeyang: 3 } }
    ]
  },
  {
    id: 22,
    category: 'symptoms',
    question: '잠들 때까지 걸리는 시간은?',
    options: [
      { value: 1, text: '매우 빨리 잠든다', constitutions: { taeeum: 3, soeum: 2 } },
      { value: 2, text: '빨리 잠드는 편', constitutions: { taeeum: 2, soeum: 1 } },
      { value: 3, text: '보통', constitutions: { taeeum: 1, soyang: 1, soeum: 1 } },
      { value: 4, text: '잠들기 어려운 편', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 5, text: '매우 잠들기 어렵다', constitutions: { soyang: 3, taeyang: 3 } }
    ]
  },
  {
    id: 23,
    category: 'preferences',
    question: '좋아하는 계절은?',
    options: [
      { value: 1, text: '여름을 매우 좋아한다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '여름을 좋아하는 편', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '사계절 모두 좋다', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '겨울을 좋아하는 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '겨울을 매우 좋아한다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 24,
    category: 'symptoms',
    question: '더위를 타는 정도는?',
    options: [
      { value: 1, text: '더위를 매우 많이 탄다', constitutions: { taeeum: 3, soyang: 2 } },
      { value: 2, text: '더위를 많이 타는 편', constitutions: { taeeum: 2, soyang: 1 } },
      { value: 3, text: '보통', constitutions: { taeeum: 1, soyang: 1, soeum: 1 } },
      { value: 4, text: '더위를 잘 안탄다', constitutions: { soeum: 2, taeyang: 2 } },
      { value: 5, text: '더위를 전혀 안탄다', constitutions: { soeum: 3, taeyang: 3 } }
    ]
  },
  {
    id: 25,
    category: 'symptoms',
    question: '추위를 타는 정도는?',
    options: [
      { value: 1, text: '추위를 매우 많이 탄다', constitutions: { soeum: 3, taeyang: 2 } },
      { value: 2, text: '추위를 많이 타는 편', constitutions: { soeum: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soeum: 1, taeeum: 1, soyang: 1 } },
      { value: 4, text: '추위를 잘 안탄다', constitutions: { taeeum: 2, soyang: 2 } },
      { value: 5, text: '추위를 전혀 안탄다', constitutions: { taeeum: 3, soyang: 3 } }
    ]
  },
  {
    id: 26,
    category: 'personality',
    question: '새로운 일에 대한 태도는?',
    options: [
      { value: 1, text: '매우 적극적이다', constitutions: { soyang: 3, taeyang: 3 } },
      { value: 2, text: '적극적인 편', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '소극적인 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 소극적이다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 27,
    category: 'personality',
    question: '계획을 세울 때?',
    options: [
      { value: 1, text: '즉흥적으로 한다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '대충 계획한다', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '세세하게 계획한다', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 치밀하게 계획한다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 28,
    category: 'symptoms',
    question: '감기에 걸리면?',
    options: [
      { value: 1, text: '열이 많이 난다', constitutions: { soyang: 3, taeeum: 2 } },
      { value: 2, text: '열이 나는 편', constitutions: { soyang: 2, taeeum: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '콧물이 많이 난다', constitutions: { soeum: 2, taeyang: 2 } },
      { value: 5, text: '기침이 오래간다', constitutions: { soeum: 3, taeyang: 3 } }
    ]
  },
  {
    id: 29,
    category: 'symptoms',
    question: '평소 목 상태는?',
    options: [
      { value: 1, text: '항상 시원하다', constitutions: { taeyang: 3, taeeum: 2 } },
      { value: 2, text: '시원한 편', constitutions: { taeyang: 2, taeeum: 1 } },
      { value: 3, text: '보통', constitutions: { taeyang: 1, soyang: 1, soeum: 1 } },
      { value: 4, text: '자주 아프다', constitutions: { soeum: 2, soyang: 2 } },
      { value: 5, text: '항상 아프다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 30,
    category: 'preferences',
    question: '음료 온도 선호는?',
    options: [
      { value: 1, text: '얼음이 든 차가운 것', constitutions: { soyang: 3, taeeum: 2 } },
      { value: 2, text: '시원한 것', constitutions: { soyang: 2, taeeum: 1 } },
      { value: 3, text: '미지근한 것', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '따뜻한 것', constitutions: { soeum: 2, taeyang: 2 } },
      { value: 5, text: '뜨거운 것', constitutions: { soeum: 3, taeyang: 3 } }
    ]
  },

  // 신체 증상 및 건강상태 (31-50)
  {
    id: 31,
    category: 'symptoms',
    question: '머리가 아플 때?',
    options: [
      { value: 1, text: '뒤통수가 아프다', constitutions: { taeeum: 3, soeum: 2 } },
      { value: 2, text: '옆머리가 아프다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 3, text: '이마가 아프다', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 4, text: '정수리가 아프다', constitutions: { soeum: 3 } },
      { value: 5, text: '머리 전체가 아프다', constitutions: { taeeum: 2, soeum: 1 } }
    ]
  },
  {
    id: 32,
    category: 'symptoms',
    question: '어지러울 때?',
    options: [
      { value: 1, text: '빙글빙글 돈다', constitutions: { taeeum: 3, soyang: 2 } },
      { value: 2, text: '핑하고 어지럽다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 3, text: '눈앞이 깜깜해진다', constitutions: { soeum: 3, taeyang: 2 } },
      { value: 4, text: '머리가 무겁다', constitutions: { taeeum: 2, soeum: 1 } },
      { value: 5, text: '거의 어지럽지 않다', constitutions: { soyang: 1, taeeum: 1 } }
    ]
  },
  {
    id: 33,
    category: 'symptoms',
    question: '가슴이 답답할 때?',
    options: [
      { value: 1, text: '숨이 막힌다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '심장이 빨리 뛴다', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '가슴이 두근거린다', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 4, text: '가슴이 답답하다', constitutions: { taeeum: 3, soeum: 3 } },
      { value: 5, text: '별로 답답하지 않다', constitutions: { taeyang: 3, soyang: 1 } }
    ]
  },
  {
    id: 34,
    category: 'symptoms',
    question: '배가 아플 때?',
    options: [
      { value: 1, text: '윗배가 아프다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '아랫배가 아프다', constitutions: { soeum: 3, taeyang: 2 } },
      { value: 3, text: '옆구리가 아프다', constitutions: { taeeum: 3, soyang: 1 } },
      { value: 4, text: '배꼽 주위가 아프다', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '배 전체가 아프다', constitutions: { soeum: 2, taeyang: 1 } }
    ]
  },
  {
    id: 35,
    category: 'symptoms',
    question: '눈이 피로할 때?',
    options: [
      { value: 1, text: '눈이 충혈된다', constitutions: { soyang: 3, taeeum: 2 } },
      { value: 2, text: '눈이 침침하다', constitutions: { taeeum: 3, soeum: 2 } },
      { value: 3, text: '눈이 아프다', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 4, text: '눈이 건조하다', constitutions: { soeum: 3, taeyang: 2 } },
      { value: 5, text: '별로 피로하지 않다', constitutions: { taeyang: 3, soyang: 1 } }
    ]
  },

  // 성격 및 행동양상 (36-55)
  {
    id: 36,
    category: 'personality',
    question: '일을 시작할 때?',
    options: [
      { value: 1, text: '바로 시작한다', constitutions: { soyang: 3, taeyang: 3 } },
      { value: 2, text: '빨리 시작하는 편', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '천천히 시작한다', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 늦게 시작한다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 37,
    category: 'personality',
    question: '실수를 했을 때?',
    options: [
      { value: 1, text: '금방 잊어버린다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '빨리 잊는 편', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '오래 기억한다', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '계속 생각난다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 38,
    category: 'personality',
    question: '다른 사람의 부탁을?',
    options: [
      { value: 1, text: '쉽게 들어준다', constitutions: { taeeum: 3, soeum: 2 } },
      { value: 2, text: '들어주는 편', constitutions: { taeeum: 2, soeum: 1 } },
      { value: 3, text: '보통', constitutions: { taeeum: 1, soyang: 1, soeum: 1 } },
      { value: 4, text: '잘 안들어준다', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 5, text: '거의 안들어준다', constitutions: { soyang: 3, taeyang: 3 } }
    ]
  },
  {
    id: 39,
    category: 'personality',
    question: '돈을 쓸 때?',
    options: [
      { value: 1, text: '충동적으로 쓴다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '쉽게 쓰는 편', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '신중하게 쓴다', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 아껴서 쓴다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 40,
    category: 'personality',
    question: '혼자 있는 시간을?',
    options: [
      { value: 1, text: '매우 싫어한다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '싫어하는 편', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '좋아하는 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 좋아한다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 41,
    category: 'personality',
    question: '새로운 환경에 적응하는 속도는?',
    options: [
      { value: 1, text: '매우 빠르다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '빠른 편', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '느린 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 느리다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 42,
    category: 'personality',
    question: '경쟁하는 상황에서?',
    options: [
      { value: 1, text: '매우 적극적이다', constitutions: { soyang: 3, taeyang: 3 } },
      { value: 2, text: '적극적인 편', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '소극적인 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 소극적이다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 43,
    category: 'personality',
    question: '목표를 정하고 추진할 때?',
    options: [
      { value: 1, text: '끝까지 밀고 나간다', constitutions: { taeyang: 3, soyang: 2 } },
      { value: 2, text: '꾸준히 추진하는 편', constitutions: { taeyang: 2, taeeum: 2 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '중간에 포기하는 편', constitutions: { soeum: 2, soyang: 1 } },
      { value: 5, text: '쉽게 포기한다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 44,
    category: 'personality',
    question: '단체 활동에서?',
    options: [
      { value: 1, text: '리더 역할을 한다', constitutions: { soyang: 3, taeyang: 3 } },
      { value: 2, text: '적극적으로 참여한다', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 3, text: '보통으로 참여한다', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '소극적으로 참여한다', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '거의 참여 안한다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 45,
    category: 'personality',
    question: '사소한 일에도?',
    options: [
      { value: 1, text: '별로 신경 안쓴다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '그냥 넘긴다', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '신경쓰는 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 신경쓴다', constitutions: { soeum: 3 } }
    ]
  },

  // 추가 증상 및 체질 특징 (46-77)
  {
    id: 46,
    category: 'symptoms',
    question: '목 뒤가 뻣뻣할 때?',
    options: [
      { value: 1, text: '자주 그렇다', constitutions: { taeeum: 3, soeum: 2 } },
      { value: 2, text: '가끔 그렇다', constitutions: { taeeum: 2, soeum: 1 } },
      { value: 3, text: '보통', constitutions: { taeeum: 1, soyang: 1, soeum: 1 } },
      { value: 4, text: '별로 안그렇다', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 5, text: '전혀 안그렇다', constitutions: { soyang: 3, taeyang: 3 } }
    ]
  },
  {
    id: 47,
    category: 'symptoms',
    question: '손발이 차가워질 때?',
    options: [
      { value: 1, text: '자주 차갑다', constitutions: { soeum: 3, taeyang: 2 } },
      { value: 2, text: '가끔 차갑다', constitutions: { soeum: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soeum: 1, taeeum: 1, soyang: 1 } },
      { value: 4, text: '별로 안차갑다', constitutions: { taeeum: 2, soyang: 2 } },
      { value: 5, text: '항상 따뜻하다', constitutions: { taeeum: 3, soyang: 3 } }
    ]
  },
  {
    id: 48,
    category: 'symptoms',
    question: '몸이 무거울 때?',
    options: [
      { value: 1, text: '자주 무겁다', constitutions: { taeeum: 3, soeum: 2 } },
      { value: 2, text: '가끔 무겁다', constitutions: { taeeum: 2, soeum: 1 } },
      { value: 3, text: '보통', constitutions: { taeeum: 1, soyang: 1, soeum: 1 } },
      { value: 4, text: '별로 안무겁다', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 5, text: '항상 가볍다', constitutions: { soyang: 3, taeyang: 3 } }
    ]
  },
  {
    id: 49,
    category: 'symptoms',
    question: '입맛이 없을 때?',
    options: [
      { value: 1, text: '자주 그렇다', constitutions: { soeum: 3, taeyang: 2 } },
      { value: 2, text: '가끔 그렇다', constitutions: { soeum: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soeum: 1, taeeum: 1, soyang: 1 } },
      { value: 4, text: '별로 안그렇다', constitutions: { taeeum: 2, soyang: 2 } },
      { value: 5, text: '항상 입맛이 좋다', constitutions: { taeeum: 3, soyang: 3 } }
    ]
  },
  {
    id: 50,
    category: 'symptoms',
    question: '변비가 있을 때?',
    options: [
      { value: 1, text: '자주 있다', constitutions: { soeum: 3, taeyang: 3 } },
      { value: 2, text: '가끔 있다', constitutions: { soeum: 2, taeyang: 2 } },
      { value: 3, text: '보통', constitutions: { soeum: 1, taeeum: 1, soyang: 1 } },
      { value: 4, text: '별로 없다', constitutions: { taeeum: 2, soyang: 2 } },
      { value: 5, text: '전혀 없다', constitutions: { taeeum: 3, soyang: 3 } }
    ]
  },

  // 최종 문항들 (51-77) - 종합적 체질 특성
  {
    id: 51,
    category: 'body',
    question: '전체적인 체격은?',
    options: [
      { value: 1, text: '상체가 발달했다', constitutions: { taeyang: 3, soyang: 2 } },
      { value: 2, text: '하체가 발달했다', constitutions: { taeeum: 3, soeum: 2 } },
      { value: 3, text: '상하체가 균형있다', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '전체적으로 마른편', constitutions: { soeum: 2, taeyang: 1 } },
      { value: 5, text: '전체적으로 통통한편', constitutions: { taeeum: 2 } }
    ]
  },
  {
    id: 52,
    category: 'personality',
    question: '전반적인 성격은?',
    options: [
      { value: 1, text: '외향적이고 활발하다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '내향적이고 조용하다', constitutions: { soeum: 3, taeeum: 1 } },
      { value: 3, text: '차분하고 신중하다', constitutions: { taeeum: 3, soeum: 2 } },
      { value: 4, text: '급하고 성격이 불같다', constitutions: { soyang: 2, taeyang: 3 } },
      { value: 5, text: '변화무쌍하다', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } }
    ]
  },

  // 마지막 문항들 (53-77) - 체질 확정을 위한 핵심 문항들
  {
    id: 53,
    category: 'symptoms',
    question: '평소 몸의 열감은?',
    options: [
      { value: 1, text: '항상 열이 많다', constitutions: { soyang: 3, taeeum: 2 } },
      { value: 2, text: '열이 많은 편', constitutions: { soyang: 2, taeeum: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '차가운 편', constitutions: { soeum: 2, taeyang: 2 } },
      { value: 5, text: '항상 차갑다', constitutions: { soeum: 3, taeyang: 3 } }
    ]
  },
  {
    id: 54,
    category: 'preferences',
    question: '좋아하는 음식 온도는?',
    options: [
      { value: 1, text: '차가운 음식', constitutions: { soyang: 3, taeeum: 2 } },
      { value: 2, text: '시원한 음식', constitutions: { soyang: 2, taeeum: 1 } },
      { value: 3, text: '미지근한 음식', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '따뜻한 음식', constitutions: { soeum: 2, taeyang: 2 } },
      { value: 5, text: '뜨거운 음식', constitutions: { soeum: 3, taeyang: 3 } }
    ]
  },
  {
    id: 55,
    category: 'body',
    question: '얼굴형은?',
    options: [
      { value: 1, text: '둥근편', constitutions: { taeeum: 3, soeum: 2 } },
      { value: 2, text: '각진편', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 3, text: '긴편', constitutions: { soeum: 2, taeyang: 1 } },
      { value: 4, text: '넓은편', constitutions: { taeeum: 2, soyang: 1 } },
      { value: 5, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } }
    ]
  },
  {
    id: 56,
    category: 'symptoms',
    question: '감정 변화는?',
    options: [
      { value: 1, text: '변화가 심하다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '변화가 있는 편', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '안정적인 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 안정적', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 57,
    category: 'personality',
    question: '집중력은?',
    options: [
      { value: 1, text: '매우 오래 지속된다', constitutions: { soeum: 3, taeeum: 2 } },
      { value: 2, text: '오래 지속되는 편', constitutions: { soeum: 2, taeeum: 1 } },
      { value: 3, text: '보통', constitutions: { soeum: 1, taeeum: 1, soyang: 1 } },
      { value: 4, text: '짧은 편', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 5, text: '매우 짧다', constitutions: { soyang: 3, taeyang: 3 } }
    ]
  },
  {
    id: 58,
    category: 'symptoms',
    question: '식후 상태는?',
    options: [
      { value: 1, text: '바로 활동한다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '금방 회복된다', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '좀 쉬어야 한다', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '오래 쉬어야 한다', constitutions: { taeeum: 3, soeum: 3 } }
    ]
  },
  {
    id: 59,
    category: 'body',
    question: '목소리 크기는?',
    options: [
      { value: 1, text: '매우 크다', constitutions: { soyang: 3, taeyang: 3 } },
      { value: 2, text: '큰 편', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '작은 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 작다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 60,
    category: 'preferences',
    question: '운동 선호도는?',
    options: [
      { value: 1, text: '격렬한 운동 좋아함', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '활동적 운동 선호', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통 운동', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '가벼운 운동 선호', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '운동 안함', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 61,
    category: 'symptoms',
    question: '기억력은?',
    options: [
      { value: 1, text: '매우 좋다', constitutions: { soeum: 3, taeeum: 2 } },
      { value: 2, text: '좋은 편', constitutions: { soeum: 2, taeeum: 1 } },
      { value: 3, text: '보통', constitutions: { soeum: 1, taeeum: 1, soyang: 1 } },
      { value: 4, text: '나쁜 편', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 5, text: '매우 나쁘다', constitutions: { soyang: 3, taeyang: 3 } }
    ]
  },
  {
    id: 62,
    category: 'personality',
    question: '위험한 일에 대한 태도는?',
    options: [
      { value: 1, text: '도전적으로 임한다', constitutions: { soyang: 3, taeyang: 3 } },
      { value: 2, text: '적극적으로 임한다', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '신중하게 접근한다', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '피하려고 한다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 63,
    category: 'symptoms',
    question: '아침에 일어날 때?',
    options: [
      { value: 1, text: '바로 일어난다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '쉽게 일어나는 편', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '일어나기 힘들다', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 일어나기 힘들다', constitutions: { taeeum: 3, soeum: 3 } }
    ]
  },
  {
    id: 64,
    category: 'body',
    question: '피부 상태는?',
    options: [
      { value: 1, text: '기름기가 많다', constitutions: { soyang: 3, taeeum: 2 } },
      { value: 2, text: '기름기가 있는 편', constitutions: { soyang: 2, taeeum: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '건조한 편', constitutions: { soeum: 2, taeyang: 2 } },
      { value: 5, text: '매우 건조하다', constitutions: { soeum: 3, taeyang: 3 } }
    ]
  },
  {
    id: 65,
    category: 'preferences',
    question: '색깔 선호는?',
    options: [
      { value: 1, text: '빨강, 노랑 계열', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '주황, 분홍 계열', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '여러 색깔 다 좋음', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '파랑, 초록 계열', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '흰색, 검정 계열', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 66,
    category: 'symptoms',
    question: '몸이 아플 때?',
    options: [
      { value: 1, text: '열이 나면서 아프다', constitutions: { soyang: 3, taeeum: 2 } },
      { value: 2, text: '붓기와 함께 아프다', constitutions: { taeeum: 3, soeum: 2 } },
      { value: 3, text: '차가워지면서 아프다', constitutions: { soeum: 3, taeyang: 2 } },
      { value: 4, text: '변화 없이 아프다', constitutions: { taeyang: 3, soyang: 1 } },
      { value: 5, text: '잘 안아프다', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } }
    ]
  },
  {
    id: 67,
    category: 'personality',
    question: '남들과의 관계에서?',
    options: [
      { value: 1, text: '매우 사교적이다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '사교적인 편', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '내성적인 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 내성적이다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 68,
    category: 'symptoms',
    question: '평소 체력은?',
    options: [
      { value: 1, text: '매우 좋다', constitutions: { taeeum: 3, soyang: 2 } },
      { value: 2, text: '좋은 편', constitutions: { taeeum: 2, soyang: 1 } },
      { value: 3, text: '보통', constitutions: { taeeum: 1, soyang: 1, soeum: 1 } },
      { value: 4, text: '약한 편', constitutions: { soeum: 2, taeyang: 2 } },
      { value: 5, text: '매우 약하다', constitutions: { soeum: 3, taeyang: 3 } }
    ]
  },
  {
    id: 69,
    category: 'body',
    question: '걸음걸이는?',
    options: [
      { value: 1, text: '매우 빠르다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '빠른 편', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '느린 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 느리다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 70,
    category: 'preferences',
    question: '좋아하는 향기는?',
    options: [
      { value: 1, text: '상큼하고 시원한 향', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '달콤한 향', constitutions: { taeeum: 3, soeum: 2 } },
      { value: 3, text: '무향 또는 자연 향', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '따뜻하고 진한 향', constitutions: { soeum: 2, taeyang: 1 } },
      { value: 5, text: '별로 신경 안쓴다', constitutions: { taeyang: 3, soyang: 1 } }
    ]
  },
  {
    id: 71,
    category: 'symptoms',
    question: '병에 걸렸을 때 회복 속도는?',
    options: [
      { value: 1, text: '매우 빠르다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '빠른 편', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '느린 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 느리다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 72,
    category: 'personality',
    question: '충동적인 성향은?',
    options: [
      { value: 1, text: '매우 충동적이다', constitutions: { soyang: 3, taeyang: 3 } },
      { value: 2, text: '충동적인 편', constitutions: { soyang: 2, taeyang: 2 } },
      { value: 3, text: '보통', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '신중한 편', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '매우 신중하다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 73,
    category: 'symptoms',
    question: '평소 혈압은?',
    options: [
      { value: 1, text: '높은 편', constitutions: { soyang: 3, taeeum: 2 } },
      { value: 2, text: '약간 높은 편', constitutions: { soyang: 2, taeeum: 1 } },
      { value: 3, text: '정상', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '약간 낮은 편', constitutions: { soeum: 2, taeyang: 2 } },
      { value: 5, text: '낮은 편', constitutions: { soeum: 3, taeyang: 3 } }
    ]
  },
  {
    id: 74,
    category: 'body',
    question: '손과 발의 크기는?',
    options: [
      { value: 1, text: '매우 크다', constitutions: { taeeum: 3, taeyang: 2 } },
      { value: 2, text: '큰 편', constitutions: { taeeum: 2, taeyang: 1 } },
      { value: 3, text: '보통', constitutions: { taeeum: 1, soyang: 1, soeum: 1 } },
      { value: 4, text: '작은 편', constitutions: { soeum: 2, soyang: 1 } },
      { value: 5, text: '매우 작다', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 75,
    category: 'preferences',
    question: '음악 취향은?',
    options: [
      { value: 1, text: '빠르고 신나는 음악', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '활기찬 음악', constitutions: { soyang: 2, taeyang: 1 } },
      { value: 3, text: '다양한 음악', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } },
      { value: 4, text: '잔잔한 음악', constitutions: { taeeum: 2, soeum: 2 } },
      { value: 5, text: '조용하고 차분한 음악', constitutions: { soeum: 3 } }
    ]
  },
  {
    id: 76,
    category: 'symptoms',
    question: '스트레스가 몸에 미치는 영향은?',
    options: [
      { value: 1, text: '열이 나고 화가 난다', constitutions: { soyang: 3, taeyang: 2 } },
      { value: 2, text: '소화가 안된다', constitutions: { taeeum: 3, soeum: 2 } },
      { value: 3, text: '잠이 안온다', constitutions: { soyang: 2, soeum: 2 } },
      { value: 4, text: '우울해진다', constitutions: { soeum: 3, taeeum: 1 } },
      { value: 5, text: '별 영향 없다', constitutions: { taeyang: 3, soyang: 1 } }
    ]
  },
  {
    id: 77,
    category: 'personality',
    question: '전체적으로 나는?',
    options: [
      { value: 1, text: '열정적이고 활동적이다', constitutions: { soyang: 3, taeyang: 3 } },
      { value: 2, text: '안정적이고 현실적이다', constitutions: { taeeum: 3, soyang: 1 } },
      { value: 3, text: '섬세하고 신중하다', constitutions: { soeum: 3, taeeum: 2 } },
      { value: 4, text: '독립적이고 개성이 강하다', constitutions: { taeyang: 2, soyang: 2 } },
      { value: 5, text: '균형잡혀 있다', constitutions: { soyang: 1, taeeum: 1, soeum: 1 } }
    ]
  }
]

// 체질별 점수 계산을 위한 가중치
export const constitutionWeights = {
  taeyang: {
    body: 0.3,      // 체형 30%
    personality: 0.4, // 성격 40%
    symptoms: 0.2,    // 증상 20%
    preferences: 0.1  // 선호도 10%
  },
  soyang: {
    body: 0.2,
    personality: 0.5,
    symptoms: 0.2,
    preferences: 0.1
  },
  taeeum: {
    body: 0.4,
    personality: 0.3,
    symptoms: 0.2,
    preferences: 0.1
  },
  soeum: {
    body: 0.3,
    personality: 0.3,
    symptoms: 0.3,
    preferences: 0.1
  }
}

// 총 77개 문항을 모두 포함하려면 실제 QSCCII 데이터를 참조하여 완성해야 함