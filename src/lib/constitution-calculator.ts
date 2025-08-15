import { qscciiQuestions, constitutionWeights, ConstitutionType } from '@/lib/data/qsccii-questions';

// 설문 응답 인터페이스
interface QuestionResponse {
  questionId: number;
  response: number;
}

// 체질별 점수 결과
interface ConstitutionScore {
  constitution: ConstitutionType;
  score: number;
  percentage: number;
  categoryScores: {
    body: number;
    personality: number;
    symptoms: number;
    preferences: number;
  };
}

// 진단 결과
export interface ConstitutionDiagnosis {
  primaryConstitution: ConstitutionType;
  scores: ConstitutionScore[];
  confidence: number;
  totalResponses: number;
  completeness: number;
  recommendations: string[];
}

// 체질별 이름 매핑
export const constitutionNames = {
  taeyang: '태양인',
  soyang: '소양인', 
  taeeum: '태음인',
  soeum: '소음인'
} as const;

// 체질별 특성 설명
export const constitutionDescriptions = {
  taeyang: {
    name: '태양인',
    characteristics: '리더십이 강하고 진취적이며, 상체가 발달한 체형',
    personality: '추진력이 있고 개척정신이 강하며 적극적',
    health: '목과 폐 기능이 중요하며, 간 기능 조절 필요',
    diet: '해물류, 냉한 성질의 음식이 좋음',
    color: 'from-red-500 to-orange-500'
  },
  soyang: {
    name: '소양인',
    characteristics: '활발하고 사교적이며, 가슴 부위가 발달한 체형',
    personality: '외향적이고 감정표현이 풍부하며 순발력이 좋음',
    health: '신장과 방광 기능이 중요하며, 소화기능 주의',
    diet: '돼지고기, 해물류, 차가운 성질의 음식이 좋음',
    color: 'from-yellow-500 to-red-500'
  },
  taeeum: {
    name: '태음인',
    characteristics: '체격이 크고 안정적이며, 하체가 발달한 체형',
    personality: '침착하고 계획적이며 끈기가 있음',
    health: '폐와 대장 기능이 중요하며, 순환기계 관리 필요',
    diet: '쇠고기, 율무, 도라지, 따뜻한 성질의 음식이 좋음',
    color: 'from-green-500 to-blue-500'
  },
  soeum: {
    name: '소음인',
    characteristics: '체격이 작고 섬세하며, 소화기관이 약한 체형',
    personality: '내성적이고 신중하며 꼼꼼함',
    health: '위와 비장 기능이 중요하며, 소화기능 강화 필요',
    diet: '닭고기, 인삼, 생강, 따뜻한 성질의 음식이 좋음',
    color: 'from-blue-500 to-purple-500'
  }
} as const;

/**
 * QSCCII 설문 응답을 기반으로 체질 진단을 수행
 */
export function calculateConstitution(responses: QuestionResponse[]): ConstitutionDiagnosis {
  // 응답을 Map으로 변환하여 빠른 검색 가능
  const responseMap = new Map(responses.map(r => [r.questionId, r.response]));
  
  // 각 체질별 점수 초기화
  const constitutionScores = {
    taeyang: { total: 0, body: 0, personality: 0, symptoms: 0, preferences: 0, count: { body: 0, personality: 0, symptoms: 0, preferences: 0 } },
    soyang: { total: 0, body: 0, personality: 0, symptoms: 0, preferences: 0, count: { body: 0, personality: 0, symptoms: 0, preferences: 0 } },
    taeeum: { total: 0, body: 0, personality: 0, symptoms: 0, preferences: 0, count: { body: 0, personality: 0, symptoms: 0, preferences: 0 } },
    soeum: { total: 0, body: 0, personality: 0, symptoms: 0, preferences: 0, count: { body: 0, personality: 0, symptoms: 0, preferences: 0 } }
  };

  // 각 문항의 응답을 분석하여 체질별 점수 계산
  qscciiQuestions.forEach(question => {
    const response = responseMap.get(question.id);
    if (!response) return; // 응답하지 않은 문항은 스킵

    // 해당 응답의 선택지 찾기
    const selectedOption = question.options.find(option => option.value === response);
    if (!selectedOption) return;

    // 각 체질별로 점수 누적
    Object.entries(selectedOption.constitutions).forEach(([constitution, score]) => {
      const constitutionKey = constitution as ConstitutionType;
      if (score && constitutionScores[constitutionKey]) {
        constitutionScores[constitutionKey][question.category] += score;
        constitutionScores[constitutionKey].count[question.category] += 1;
      }
    });
  });

  // 각 체질별 최종 점수 계산 (가중평균)
  const finalScores: ConstitutionScore[] = (Object.keys(constitutionScores) as ConstitutionType[]).map(constitution => {
    const scores = constitutionScores[constitution];
    const weights = constitutionWeights[constitution];

    // 각 카테고리별 평균 점수 계산
    const categoryScores = {
      body: scores.count.body > 0 ? scores.body / scores.count.body : 0,
      personality: scores.count.personality > 0 ? scores.personality / scores.count.personality : 0,
      symptoms: scores.count.symptoms > 0 ? scores.symptoms / scores.count.symptoms : 0,
      preferences: scores.count.preferences > 0 ? scores.preferences / scores.count.preferences : 0
    };

    // 가중평균으로 총점 계산
    const totalScore = 
      (categoryScores.body * weights.body) +
      (categoryScores.personality * weights.personality) +
      (categoryScores.symptoms * weights.symptoms) +
      (categoryScores.preferences * weights.preferences);

    return {
      constitution,
      score: totalScore,
      percentage: 0, // 나중에 계산
      categoryScores
    };
  });

  // 백분율 계산
  const maxScore = Math.max(...finalScores.map(s => s.score));
  const totalScore = finalScores.reduce((sum, s) => sum + s.score, 0);

  finalScores.forEach(score => {
    score.percentage = totalScore > 0 ? (score.score / totalScore) * 100 : 25;
  });

  // 점수 순으로 정렬
  finalScores.sort((a, b) => b.score - a.score);

  // 주체질 결정
  const primaryConstitution = finalScores[0].constitution;
  
  // 신뢰도 계산 (1위와 2위 점수 차이 기반)
  const confidence = finalScores.length > 1 
    ? Math.min(((finalScores[0].score - finalScores[1].score) / finalScores[0].score) * 100, 100)
    : 100;

  // 완성도 계산
  const completeness = (responses.length / qscciiQuestions.length) * 100;

  // 체질별 추천사항
  const recommendations = generateRecommendations(primaryConstitution, finalScores[0], completeness);

  return {
    primaryConstitution,
    scores: finalScores,
    confidence: Math.max(confidence, 0),
    totalResponses: responses.length,
    completeness,
    recommendations
  };
}

/**
 * 체질에 따른 추천사항 생성
 */
function generateRecommendations(
  constitution: ConstitutionType, 
  score: ConstitutionScore, 
  completeness: number
): string[] {
  const recommendations: string[] = [];
  const desc = constitutionDescriptions[constitution];

  // 기본 체질 특성
  recommendations.push(`${desc.name} 체질의 특성에 맞는 생활습관을 유지하세요.`);
  
  // 식이 권장사항
  recommendations.push(`식단: ${desc.diet}`);
  
  // 건강관리 권장사항
  recommendations.push(`건강관리: ${desc.health}`);

  // 카테고리별 세부 권장사항
  if (score.categoryScores.body < 2.0) {
    recommendations.push('체형 관리를 위한 적절한 운동을 꾸준히 하세요.');
  }
  
  if (score.categoryScores.personality < 2.0) {
    recommendations.push('자신의 성격 특성을 이해하고 스트레스 관리에 주의하세요.');
  }
  
  if (score.categoryScores.symptoms < 2.0) {
    recommendations.push('현재 증상에 맞는 한의학적 치료를 고려해보세요.');
  }

  // 설문 완성도에 따른 권장사항
  if (completeness < 90) {
    recommendations.push('더 정확한 진단을 위해 모든 설문 문항에 응답하는 것을 권장합니다.');
  }

  return recommendations;
}

/**
 * 체질별 색상 클래스 반환
 */
export function getConstitutionColor(constitution: ConstitutionType): string {
  const colors = {
    taeyang: 'border-red-500 bg-red-50 text-red-800',
    soyang: 'border-yellow-500 bg-yellow-50 text-yellow-800',
    taeeum: 'border-green-500 bg-green-50 text-green-800',
    soeum: 'border-blue-500 bg-blue-50 text-blue-800'
  };
  return colors[constitution];
}

/**
 * 신뢰도에 따른 메시지 반환
 */
export function getConfidenceMessage(confidence: number): { message: string; color: string } {
  if (confidence >= 80) {
    return { message: '매우 높은 신뢰도', color: 'text-green-600' };
  } else if (confidence >= 60) {
    return { message: '높은 신뢰도', color: 'text-blue-600' };
  } else if (confidence >= 40) {
    return { message: '보통 신뢰도', color: 'text-yellow-600' };
  } else {
    return { message: '낮은 신뢰도', color: 'text-red-600' };
  }
}