import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다' },
        { status: 401 }
      );
    }
    
    // 데이터베이스에서 최신 사용자 정보 조회
    const user = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        licenseNumber: users.licenseNumber,
        clinic: users.clinic,
        phone: users.phone,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt
      })
      .from(users)
      .where(eq(users.id, currentUser.userId))
      .limit(1);
    
    if (user.length === 0 || !user[0].isActive) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없거나 비활성화된 계정입니다' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      success: true,
      user: user[0]
    });
    
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { error: '사용자 정보를 가져오는 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}