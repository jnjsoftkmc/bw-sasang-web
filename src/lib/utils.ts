import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 체질 타입에 따른 한글명 반환
export function getConstitutionName(type: string): string {
  const constitutionNames: Record<string, string> = {
    taeyang: '태양인',
    soyang: '소양인', 
    taeeum: '태음인',
    soeum: '소음인'
  };
  return constitutionNames[type] || '미확정';
}

// 체질 타입에 따른 색상 클래스 반환
export function getConstitutionColor(type: string): string {
  const constitutionColors: Record<string, string> = {
    taeyang: 'text-red-600 bg-red-50 border-red-200',
    soyang: 'text-teal-600 bg-teal-50 border-teal-200',
    taeeum: 'text-blue-600 bg-blue-50 border-blue-200',
    soeum: 'text-green-600 bg-green-50 border-green-200'
  };
  return constitutionColors[type] || 'text-gray-600 bg-gray-50 border-gray-200';
}

// BMI 계산
export function calculateBMI(height: number, weight: number): number {
  const heightInMeters = height / 100;
  return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
}

// BMI 분류
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return '저체중';
  if (bmi < 23) return '정상';
  if (bmi < 25) return '과체중';
  if (bmi < 30) return '비만 1단계';
  if (bmi < 35) return '비만 2단계';
  return '비만 3단계';
}

// 나이 계산
export function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

// 날짜 포맷팅
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR');
}

// 전화번호 포맷팅
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phone;
}

// 신뢰도 점수를 백분율로 변환
export function formatConfidenceScore(score: number): string {
  return `${Math.round(score * 100)}%`;
}

// 체질별 특성 설명
export function getConstitutionDescription(type: string): string {
  const descriptions: Record<string, string> = {
    taeyang: '폐가 크고 간이 작은 체질. 직관력이 뛰어나고 공정한 성격.',
    soyang: '비장이 크고 신장이 작은 체질. 감정적이고 민첩한 성격.',
    taeeum: '간이 크고 폐가 작은 체질. 꾸준하고 예의를 중시하는 성격.',
    soeum: '신장이 좋고 비위가 약한 체질. 논리적이고 사고력이 우수한 성격.'
  };
  return descriptions[type] || '체질 특성을 분석 중입니다.';
}