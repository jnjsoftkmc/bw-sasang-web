import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: '로그아웃되었습니다' });
  
  // 인증 토큰 쿠키 삭제
  response.cookies.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  });
  
  return response;
}