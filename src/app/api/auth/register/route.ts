import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { hashPassword } from '@/lib/auth';
import { z } from 'zod';

// 회원가입 요청 스키마
const registerSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다'),
  confirmPassword: z.string(),
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  licenseNumber: z.string().min(5, '한의사 면허번호를 입력해주세요'),
  clinic: z.string().min(2, '한의원명을 입력해주세요'),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 입력값 검증
    const validatedData = registerSchema.parse(body);
    
    // 이메일 중복 확인
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedData.email))
      .limit(1);
    
    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: '이미 존재하는 이메일입니다' },
        { status: 409 }
      );
    }
    
    // 면허번호 중복 확인
    const existingLicense = await db
      .select()
      .from(users)
      .where(eq(users.licenseNumber, validatedData.licenseNumber))
      .limit(1);
    
    if (existingLicense.length > 0) {
      return NextResponse.json(
        { error: '이미 등록된 면허번호입니다' },
        { status: 409 }
      );
    }
    
    // 비밀번호 해시화
    const hashedPassword = await hashPassword(validatedData.password);
    
    // 새 사용자 생성
    const newUser = await db
      .insert(users)
      .values({
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        licenseNumber: validatedData.licenseNumber,
        clinic: validatedData.clinic,
        phone: validatedData.phone,
        role: 'doctor',
        isActive: true
      })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        clinic: users.clinic,
        role: users.role
      });
    
    return NextResponse.json({
      success: true,
      message: '회원가입이 완료되었습니다',
      user: newUser[0]
    }, { status: 201 });
    
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: '회원가입 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}