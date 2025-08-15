import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

// JWT 시크릿 키 (환경변수에서 가져오거나 기본값 사용)
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY || 'your-secret-key-here-please-change-in-production'
);

// JWT 토큰 만료 시간 (7일)
const JWT_EXPIRES_IN = '7d';

// 비밀번호 해시화
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// 비밀번호 검증
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// JWT 토큰 생성
export async function createToken(payload: { userId: number; email: string; role: string }): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secret);
}

// JWT 토큰 검증
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: number; email: string; role: string; iat: number; exp: number };
  } catch (error) {
    return null;
  }
}

// 쿠키에서 토큰 가져오기
export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token');
  return token?.value || null;
}

// 현재 사용자 정보 가져오기
export async function getCurrentUser() {
  const token = await getTokenFromCookies();
  if (!token) return null;
  
  const payload = await verifyToken(token);
  return payload;
}

// Request에서 토큰 가져오기 (미들웨어용)
export function getTokenFromRequest(request: NextRequest): string | null {
  const token = request.cookies.get('auth-token')?.value;
  return token || null;
}

// 인증 필요한 페이지 목록
export const PROTECTED_ROUTES = [
  '/dashboard',
  '/patients',
  '/assessment',
  '/prescriptions',
  '/lifestyle',
  '/records'
];

// 한의사만 접근 가능한 페이지 목록
export const DOCTOR_ONLY_ROUTES = [
  '/patients',
  '/assessment',
  '/prescriptions',
  '/lifestyle',
  '/records'
];

// 관리자만 접근 가능한 페이지 목록
export const ADMIN_ONLY_ROUTES = [
  '/admin'
];

// 로그인 페이지 (인증되지 않은 사용자만 접근)
export const AUTH_ROUTES = [
  '/login',
  '/register'
];