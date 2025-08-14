import { sql } from 'drizzle-orm';
import { 
  sqliteTable, 
  text, 
  integer, 
  real,
  blob 
} from 'drizzle-orm/sqlite-core';

// 체질 타입 정의
export const constitutionTypes = ['taeyang', 'soyang', 'taeeum', 'soeum'] as const;
export type ConstitutionType = typeof constitutionTypes[number];

// 환자 테이블
export const patients = sqliteTable('patients', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  phone: text('phone'),
  email: text('email'),
  birthDate: text('birth_date'), // YYYY-MM-DD 형식
  gender: text('gender', { enum: ['male', 'female'] }),
  address: text('address'),
  medicalHistory: text('medical_history'),
  allergies: text('allergies'),
  currentMedications: text('current_medications'),
  emergencyContact: text('emergency_contact'),
  emergencyPhone: text('emergency_phone'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`)
});

// 체질 진단 테이블
export const constitutionAssessments = sqliteTable('constitution_assessments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  patientId: integer('patient_id').notNull().references(() => patients.id),
  assessmentDate: text('assessment_date').default(sql`CURRENT_TIMESTAMP`),
  finalConstitution: text('final_constitution', { enum: constitutionTypes }),
  confidenceScore: real('confidence_score'), // 0.0 ~ 1.0
  
  // 각 방법별 결과
  questionnaireResult: text('questionnaire_result', { enum: constitutionTypes }),
  questionnaireScore: real('questionnaire_score'),
  bodyMeasurementResult: text('body_measurement_result', { enum: constitutionTypes }),
  bodyMeasurementScore: real('body_measurement_score'),
  faceAnalysisResult: text('face_analysis_result', { enum: constitutionTypes }),
  faceAnalysisScore: real('face_analysis_score'),
  
  // 진단 메모
  doctorNotes: text('doctor_notes'),
  assessedBy: text('assessed_by'), // 진단한 한의사
  
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`)
});

// QSCCII 설문 응답 테이블
export const questionnaireResponses = sqliteTable('questionnaire_responses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  assessmentId: integer('assessment_id').notNull().references(() => constitutionAssessments.id),
  questionNumber: integer('question_number').notNull(), // 1-77
  questionCategory: text('question_category'), // 체형, 성격, 증상 등
  response: integer('response').notNull(), // 1-5 점수
  responseText: text('response_text'), // 선택한 답변 텍스트
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

// 신체 계측 데이터 테이블
export const bodyMeasurements = sqliteTable('body_measurements', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  assessmentId: integer('assessment_id').notNull().references(() => constitutionAssessments.id),
  height: real('height'), // cm
  weight: real('weight'), // kg
  bmi: real('bmi'),
  waistCircumference: real('waist_circumference'), // cm
  hipCircumference: real('hip_circumference'), // cm
  chestCircumference: real('chest_circumference'), // cm
  shoulderWidth: real('shoulder_width'), // cm
  bodyFatPercentage: real('body_fat_percentage'), // %
  muscleMass: real('muscle_mass'), // kg
  
  // 체형 특성
  bodyType: text('body_type'), // 상체형, 하체형, 균형형 등
  postureType: text('posture_type'), // 전굴, 후굴, 측만 등
  
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

// 얼굴 분석 데이터 테이블
export const faceAnalysis = sqliteTable('face_analysis', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  assessmentId: integer('assessment_id').notNull().references(() => constitutionAssessments.id),
  
  // 얼굴 이미지
  frontImage: blob('front_image'), // 정면 사진
  sideImage: blob('side_image'), // 측면 사진
  
  // 얼굴 비율 측정값
  faceLength: real('face_length'), // 얼굴 길이
  faceWidth: real('face_width'), // 얼굴 너비
  foreheadWidth: real('forehead_width'), // 이마 너비
  cheekboneWidth: real('cheekbone_width'), // 광대뼈 너비
  jawWidth: real('jaw_width'), // 턱 너비
  
  // 얼굴형 분류
  faceShape: text('face_shape'), // 둥근형, 긴형, 사각형, 하트형 등
  eyeShape: text('eye_shape'), // 눈 형태
  noseShape: text('nose_shape'), // 코 형태
  mouthShape: text('mouth_shape'), // 입 형태
  
  // AI 분석 결과 (향후 확장)
  aiAnalysisResult: text('ai_analysis_result'), // JSON 형태
  
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

// 한약 처방 테이블
export const prescriptions = sqliteTable('prescriptions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  patientId: integer('patient_id').notNull().references(() => patients.id),
  assessmentId: integer('assessment_id').references(() => constitutionAssessments.id),
  
  prescriptionDate: text('prescription_date').default(sql`CURRENT_TIMESTAMP`),
  constitution: text('constitution', { enum: constitutionTypes }).notNull(),
  
  // 처방 정보
  prescriptionName: text('prescription_name').notNull(), // 처방명
  herbs: text('herbs').notNull(), // JSON 형태로 약재 정보 저장
  dosage: text('dosage'), // 복용법
  duration: integer('duration'), // 복용 기간 (일)
  
  // 증상 및 목적
  symptoms: text('symptoms'), // 대상 증상
  treatmentGoal: text('treatment_goal'), // 치료 목표
  
  // 처방 상태
  status: text('status', { enum: ['active', 'completed', 'discontinued'] }).default('active'),
  
  // 효과 추적
  effectivenessScore: real('effectiveness_score'), // 1-10 점수
  sideEffects: text('side_effects'), // 부작용
  patientFeedback: text('patient_feedback'), // 환자 피드백
  
  prescribedBy: text('prescribed_by'), // 처방한 한의사
  notes: text('notes'), // 처방 메모
  
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`)
});

// 생활 지도 테이블
export const lifestyleGuides = sqliteTable('lifestyle_guides', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  patientId: integer('patient_id').notNull().references(() => patients.id),
  constitution: text('constitution', { enum: constitutionTypes }).notNull(),
  
  guideDate: text('guide_date').default(sql`CURRENT_TIMESTAMP`),
  
  // 음식 가이드
  recommendedFoods: text('recommended_foods'), // JSON 배열
  avoidedFoods: text('avoided_foods'), // JSON 배열
  mealTiming: text('meal_timing'), // 식사 시간 가이드
  cookingMethods: text('cooking_methods'), // 조리법 가이드
  
  // 운동 가이드
  recommendedExercises: text('recommended_exercises'), // JSON 배열
  exerciseIntensity: text('exercise_intensity'), // 운동 강도
  exerciseDuration: text('exercise_duration'), // 운동 시간
  exerciseFrequency: text('exercise_frequency'), // 운동 빈도
  
  // 생활습관 가이드
  sleepSchedule: text('sleep_schedule'), // 수면 스케줄
  stressManagement: text('stress_management'), // 스트레스 관리법
  seasonalCare: text('seasonal_care'), // 계절별 관리법
  
  // 기타 생활지도
  emotionalCare: text('emotional_care'), // 감정 관리
  environmentalFactors: text('environmental_factors'), // 환경 요인
  
  // 가이드 상태
  status: text('status', { enum: ['active', 'archived'] }).default('active'),
  adherenceScore: real('adherence_score'), // 준수도 점수 1-10
  
  guidedBy: text('guided_by'), // 지도한 한의사
  notes: text('notes'), // 추가 메모
  
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`)
});

// 한약재 마스터 테이블
export const herbsMaster = sqliteTable('herbs_master', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(), // 한글명
  scientificName: text('scientific_name'), // 학명
  englishName: text('english_name'), // 영문명
  category: text('category'), // 분류 (해열, 보혈, 소화 등)
  properties: text('properties'), // 성미 (한열온량, 오미)
  meridians: text('meridians'), // 귀경
  effects: text('effects'), // 효능
  constitution: text('constitution'), // 적합한 체질 (JSON 배열)
  contraindications: text('contraindications'), // 금기사항
  dosage: text('dosage'), // 일반 용량
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

// 처방 마스터 테이블
export const prescriptionsMaster = sqliteTable('prescriptions_master', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(), // 처방명
  constitution: text('constitution', { enum: constitutionTypes }).notNull(),
  category: text('category'), // 분류 (소화제, 감기약 등)
  herbs: text('herbs').notNull(), // JSON 형태 약재 구성
  preparation: text('preparation'), // 제조법
  indications: text('indications'), // 적응증
  contraindications: text('contraindications'), // 금기증
  dosage: text('dosage'), // 복용법
  duration: text('duration'), // 표준 복용 기간
  notes: text('notes'), // 주의사항
  source: text('source'), // 출전
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

// 사용자 (한의사) 테이블
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(), // 해시된 비밀번호
  name: text('name').notNull(),
  licenseNumber: text('license_number'), // 한의사 면허번호
  clinic: text('clinic'), // 한의원명
  phone: text('phone'),
  role: text('role', { enum: ['doctor', 'admin'] }).default('doctor'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`)
});

// 진료 세션 테이블
export const treatmentSessions = sqliteTable('treatment_sessions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  patientId: integer('patient_id').notNull().references(() => patients.id),
  doctorId: integer('doctor_id').notNull().references(() => users.id),
  sessionDate: text('session_date').default(sql`CURRENT_TIMESTAMP`),
  sessionType: text('session_type', { 
    enum: ['initial_consultation', 'follow_up', 'constitution_assessment', 'prescription_review'] 
  }),
  chiefComplaint: text('chief_complaint'), // 주소
  presentIllness: text('present_illness'), // 현병력
  physicalExam: text('physical_exam'), // 신체검사
  diagnosis: text('diagnosis'), // 진단
  treatment: text('treatment'), // 치료
  nextAppointment: text('next_appointment'), // 다음 예약
  notes: text('notes'), // 진료 메모
  status: text('status', { enum: ['scheduled', 'completed', 'cancelled'] }).default('scheduled'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`)
});