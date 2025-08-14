import { QSCCIIQuestion, constitutionWeights } from './data/qsccii-questions'

export interface ConstitutionScores {
  taeyang: number
  soyang: number
  taeeum: number
  soeum: number
}

export interface AssessmentResult {
  finalConstitution: string
  confidenceScore: number
  scores: ConstitutionScores
  categoryScores: {
    body: ConstitutionScores
    personality: ConstitutionScores
    symptoms: ConstitutionScores
    preferences: ConstitutionScores
  }
}

export interface QuestionnaireResponse {
  questionId: number
  response: number
}

/**
 * QSCCII 설문 응답을 바탕으로 체질을 진단하는 핵심 알고리즘
 */
export function calculateConstitutionFromQuestionnaire(
  responses: QuestionnaireResponse[],
  questions: QSCCIIQuestion[]
): AssessmentResult {
  
  // 카테고리별 점수 초기화
  const categoryScores = {
    body: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
    personality: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
    symptoms: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
    preferences: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 }
  }

  // 카테고리별 문항 수 카운트
  const categoryCounts = {
    body: 0,
    personality: 0,
    symptoms: 0,
    preferences: 0
  }

  // 각 응답에 대해 점수 계산
  responses.forEach(response => {
    const question = questions.find(q => q.id === response.questionId)
    if (!question) return

    const selectedOption = question.options.find(opt => opt.value === response.response)
    if (!selectedOption) return

    // 카테고리별 점수 누적
    const category = question.category
    categoryCounts[category]++

    Object.entries(selectedOption.constitutions).forEach(([constitution, score]) => {
      if (constitution in categoryScores[category]) {
        categoryScores[category][constitution as keyof ConstitutionScores] += score
      }
    })
  })

  // 카테고리별 평균 점수 계산 (0-1 정규화)
  Object.keys(categoryScores).forEach(category => {
    const cat = category as keyof typeof categoryScores
    const count = categoryCounts[cat]
    
    if (count > 0) {
      const maxPossibleScore = count * 3 // 최대 점수는 문항수 × 3
      Object.keys(categoryScores[cat]).forEach(constitution => {
        const const_key = constitution as keyof ConstitutionScores
        categoryScores[cat][const_key] = categoryScores[cat][const_key] / maxPossibleScore
      })
    }
  })

  // 전체 체질별 점수 계산 (가중평균)
  const finalScores: ConstitutionScores = { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 }

  Object.keys(finalScores).forEach(constitution => {
    const const_key = constitution as keyof ConstitutionScores
    const weights = constitutionWeights[const_key]
    
    finalScores[const_key] = 
      (categoryScores.body[const_key] * weights.body) +
      (categoryScores.personality[const_key] * weights.personality) +
      (categoryScores.symptoms[const_key] * weights.symptoms) +
      (categoryScores.preferences[const_key] * weights.preferences)
  })

  // 최고 점수 체질 결정
  const constitutions = Object.keys(finalScores) as Array<keyof ConstitutionScores>
  const finalConstitution = constitutions.reduce((prev, current) =>
    finalScores[current] > finalScores[prev] ? current : prev
  )

  // 신뢰도 점수 계산
  const sortedScores = Object.values(finalScores).sort((a, b) => b - a)
  const confidenceScore = sortedScores.length > 1 
    ? (sortedScores[0] - sortedScores[1]) / sortedScores[0] 
    : 1.0

  return {
    finalConstitution,
    confidenceScore: Math.max(0, Math.min(1, confidenceScore)),
    scores: finalScores,
    categoryScores
  }
}

/**
 * 신체 계측 데이터를 바탕으로 체질 추론
 */
export function calculateConstitutionFromBodyMeasurement(data: {
  height: number
  weight: number
  shoulderWidth?: number
  waistCircumference?: number
  hipCircumference?: number
  chestCircumference?: number
}): AssessmentResult {
  
  const { height, weight, shoulderWidth, waistCircumference, hipCircumference, chestCircumference } = data
  
  // BMI 계산
  const bmi = weight / Math.pow(height / 100, 2)
  
  // 체형 비율 계산
  const shoulderToWaist = shoulderWidth && waistCircumference ? shoulderWidth / waistCircumference : 1
  const waistToHip = waistCircumference && hipCircumference ? waistCircumference / hipCircumference : 1
  
  // 체질별 점수 초기화
  const scores: ConstitutionScores = { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 }
  
  // BMI 기반 점수
  if (bmi < 18.5) {
    // 저체중 - 소음인, 태양인 성향
    scores.soeum += 0.4
    scores.taeyang += 0.3
  } else if (bmi < 23) {
    // 정상 - 소양인 성향
    scores.soyang += 0.4
    scores.soeum += 0.2
  } else if (bmi < 25) {
    // 과체중 - 태음인 성향
    scores.taeeum += 0.4
    scores.soyang += 0.2
  } else {
    // 비만 - 태음인 강함
    scores.taeeum += 0.6
  }
  
  // 어깨-허리 비율 기반 점수
  if (shoulderToWaist > 1.3) {
    // 어깨가 넓음 - 태양인, 태음인 성향
    scores.taeyang += 0.3
    scores.taeeum += 0.2
  } else if (shoulderToWaist < 1.1) {
    // 어깨가 좁음 - 소음인 성향
    scores.soeum += 0.3
  }
  
  // 허리-엉덩이 비율 기반 점수
  if (waistToHip < 0.8) {
    // 하체 발달 - 태음인 성향
    scores.taeeum += 0.2
  } else if (waistToHip > 0.9) {
    // 상체 발달 - 소양인, 태양인 성향
    scores.soyang += 0.2
    scores.taeyang += 0.1
  }
  
  // 점수 정규화
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)
  if (totalScore > 0) {
    Object.keys(scores).forEach(key => {
      scores[key as keyof ConstitutionScores] /= totalScore
    })
  }
  
  // 최고 점수 체질 결정
  const constitutions = Object.keys(scores) as Array<keyof ConstitutionScores>
  const finalConstitution = constitutions.reduce((prev, current) =>
    scores[current] > scores[prev] ? current : prev
  )
  
  // 신뢰도 점수 계산 (신체계측만으로는 낮은 신뢰도)
  const sortedScores = Object.values(scores).sort((a, b) => b - a)
  const confidenceScore = sortedScores.length > 1 
    ? (sortedScores[0] - sortedScores[1]) / sortedScores[0] * 0.6  // 최대 60%
    : 0.6

  return {
    finalConstitution,
    confidenceScore: Math.max(0, Math.min(1, confidenceScore)),
    scores,
    categoryScores: {
      body: scores,
      personality: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
      symptoms: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
      preferences: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 }
    }
  }
}

/**
 * 얼굴 분석 데이터를 바탕으로 체질 추론 (기본 규칙 기반)
 */
export function calculateConstitutionFromFaceAnalysis(data: {
  faceLength: number
  faceWidth: number
  foreheadWidth: number
  cheekboneWidth: number
  jawWidth: number
}): AssessmentResult {
  
  const { faceLength, faceWidth, foreheadWidth, cheekboneWidth, jawWidth } = data
  
  // 얼굴 비율 계산
  const faceRatio = faceLength / faceWidth  // 길이/너비 비율
  const upperToLower = foreheadWidth / jawWidth  // 상안면/하안면 비율
  const cheekboneRatio = cheekboneWidth / faceWidth  // 광대뼈 비율
  
  // 체질별 점수 초기화
  const scores: ConstitutionScores = { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 }
  
  // 얼굴 길이 비율 기반 점수
  if (faceRatio > 1.3) {
    // 긴 얼굴 - 소음인, 소양인 성향
    scores.soeum += 0.3
    scores.soyang += 0.2
  } else if (faceRatio < 1.1) {
    // 둥근 얼굴 - 태음인 성향
    scores.taeeum += 0.3
  }
  
  // 상하안면 비율 기반 점수
  if (upperToLower > 1.2) {
    // 이마가 넓음 - 태양인 성향
    scores.taeyang += 0.3
  } else if (upperToLower < 0.9) {
    // 턱이 넓음 - 태음인 성향
    scores.taeeum += 0.2
  }
  
  // 광대뼈 비율 기반 점수
  if (cheekboneRatio > 0.9) {
    // 광대뼈 발달 - 소양인 성향
    scores.soyang += 0.2
  }
  
  // 점수 정규화
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)
  if (totalScore > 0) {
    Object.keys(scores).forEach(key => {
      scores[key as keyof ConstitutionScores] /= totalScore
    })
  } else {
    // 모든 점수가 0이면 균등 분배
    Object.keys(scores).forEach(key => {
      scores[key as keyof ConstitutionScores] = 0.25
    })
  }
  
  // 최고 점수 체질 결정
  const constitutions = Object.keys(scores) as Array<keyof ConstitutionScores>
  const finalConstitution = constitutions.reduce((prev, current) =>
    scores[current] > scores[prev] ? current : prev
  )
  
  // 신뢰도 점수 (얼굴 분석만으로는 낮은 신뢰도)
  const sortedScores = Object.values(scores).sort((a, b) => b - a)
  const confidenceScore = sortedScores.length > 1 
    ? (sortedScores[0] - sortedScores[1]) / sortedScores[0] * 0.5  // 최대 50%
    : 0.5

  return {
    finalConstitution,
    confidenceScore: Math.max(0, Math.min(1, confidenceScore)),
    scores,
    categoryScores: {
      body: scores,
      personality: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
      symptoms: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
      preferences: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 }
    }
  }
}

/**
 * 다중 방법론 통합 체질 진단
 */
export function integrateAssessmentResults(results: {
  questionnaire?: AssessmentResult
  bodyMeasurement?: AssessmentResult
  faceAnalysis?: AssessmentResult
}): AssessmentResult {
  
  const { questionnaire, bodyMeasurement, faceAnalysis } = results
  
  // 각 방법의 가중치 (설문지가 가장 높음)
  const weights = {
    questionnaire: 0.7,
    bodyMeasurement: 0.2,
    faceAnalysis: 0.1
  }
  
  // 통합 점수 계산
  const integratedScores: ConstitutionScores = { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 }
  let totalWeight = 0
  
  if (questionnaire) {
    Object.keys(integratedScores).forEach(constitution => {
      const key = constitution as keyof ConstitutionScores
      integratedScores[key] += questionnaire.scores[key] * weights.questionnaire
    })
    totalWeight += weights.questionnaire
  }
  
  if (bodyMeasurement) {
    Object.keys(integratedScores).forEach(constitution => {
      const key = constitution as keyof ConstitutionScores
      integratedScores[key] += bodyMeasurement.scores[key] * weights.bodyMeasurement
    })
    totalWeight += weights.bodyMeasurement
  }
  
  if (faceAnalysis) {
    Object.keys(integratedScores).forEach(constitution => {
      const key = constitution as keyof ConstitutionScores
      integratedScores[key] += faceAnalysis.scores[key] * weights.faceAnalysis
    })
    totalWeight += weights.faceAnalysis
  }
  
  // 가중치 정규화
  if (totalWeight > 0) {
    Object.keys(integratedScores).forEach(constitution => {
      const key = constitution as keyof ConstitutionScores
      integratedScores[key] /= totalWeight
    })
  }
  
  // 최종 체질 결정
  const constitutions = Object.keys(integratedScores) as Array<keyof ConstitutionScores>
  const finalConstitution = constitutions.reduce((prev, current) =>
    integratedScores[current] > integratedScores[prev] ? current : prev
  )
  
  // 통합 신뢰도 점수
  const individualConfidences = [
    questionnaire?.confidenceScore || 0,
    bodyMeasurement?.confidenceScore || 0,
    faceAnalysis?.confidenceScore || 0
  ].filter(score => score > 0)
  
  const avgConfidence = individualConfidences.length > 0 
    ? individualConfidences.reduce((sum, conf) => sum + conf, 0) / individualConfidences.length
    : 0.5
  
  // 방법 수에 따른 보정 (여러 방법 사용시 신뢰도 증가)
  const methodBonus = Math.min(individualConfidences.length * 0.1, 0.2)
  const finalConfidence = Math.min(1.0, avgConfidence + methodBonus)
  
  return {
    finalConstitution,
    confidenceScore: finalConfidence,
    scores: integratedScores,
    categoryScores: questionnaire?.categoryScores || {
      body: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
      personality: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
      symptoms: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 },
      preferences: { taeyang: 0, soyang: 0, taeeum: 0, soeum: 0 }
    }
  }
}