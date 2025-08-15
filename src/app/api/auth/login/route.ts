import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { verifyPassword, createToken } from '@/lib/auth';
import { z } from 'zod';

// 로그인 요청 스키마
const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 입력값 검증
    const validatedData = loginSchema.parse(body);
    
    // 사용자 조회
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedData.email))
      .limit(1);
    
    if (user.length === 0) {
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 올바르지 않습니다' },
        { status: 401 }
      );
    }
    
    const foundUser = user[0];
    
    // 계정 활성화 상태 확인
    if (!foundUser.isActive) {
      return NextResponse.json(
        { error: '비활성화된 계정입니다. 관리자에게 문의하세요' },
        { status: 401 }
      );
    }
    
    // 비밀번호 검증
    const isValidPassword = await verifyPassword(validatedData.password, foundUser.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 올바르지 않습니다' },
        { status: 401 }
      );
    }
    
    // JWT 토큰 생성
    const token = await createToken({
      userId: foundUser.id,
      email: foundUser.email,
      role: foundUser.role || 'doctor'
    });
    
    // 응답 생성 및 쿠키 설정
    const response = NextResponse.json({
      success: true,
      user: {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role || 'doctor',
        clinic: foundUser.clinic
      }
    });
    
    // HTTP-only 쿠키로 토큰 설정
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7일
      path: '/'
    });
    
    return response;
    
  } catch (error) {
    console.error('Login error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: '로그인 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}