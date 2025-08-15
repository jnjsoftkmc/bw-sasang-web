import { db } from './index';
import { users } from './schema';
import { hashPassword } from '../auth';
import { eq } from 'drizzle-orm';

// 기본 관리자 계정 생성
export async function createDefaultAdmin() {
  const adminEmail = 'admin@bw-sasang.com';
  
  try {
    // 이미 관리자 계정이 있는지 확인
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.email, adminEmail))
      .limit(1);
    
    if (existingAdmin.length > 0) {
      console.log('관리자 계정이 이미 존재합니다.');
      return;
    }
    
    // 기본 관리자 계정 생성
    const hashedPassword = await hashPassword('Admin123!');
    
    await db.insert(users).values({
      email: adminEmail,
      password: hashedPassword,
      name: '시스템 관리자',
      licenseNumber: 'ADMIN001',
      clinic: 'BW 사상체질 진료소',
      phone: '02-1234-5678',
      role: 'admin',
      isActive: true
    });
    
    console.log('기본 관리자 계정이 생성되었습니다.');
    console.log('이메일: admin@bw-sasang.com');
    console.log('비밀번호: Admin123!');
    console.log('보안을 위해 로그인 후 비밀번호를 변경하세요.');
    
  } catch (error) {
    console.error('관리자 계정 생성 중 오류:', error);
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  createDefaultAdmin().then(() => {
    console.log('시드 스크립트 완료');
    process.exit(0);
  });
}