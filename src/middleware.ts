import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { 
  verifyToken, 
  getTokenFromRequest,
  PROTECTED_ROUTES, 
  DOCTOR_ONLY_ROUTES, 
  ADMIN_ONLY_ROUTES,
  AUTH_ROUTES 
} from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 정적 파일과 API 경로는 제외
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 토큰 확인
  const token = getTokenFromRequest(request);
  const user = token ? await verifyToken(token) : null;

  // 로그인/회원가입 페이지는 로그인 안 된 사용자만 접근
  if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    if (user) {
      // 이미 로그인된 사용자는 대시보드로 리다이렉트
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // 루트 경로는 로그인 상태에 따라 분기
  if (pathname === '/') {
    if (user) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 보호된 라우트 확인
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    // 로그인하지 않은 사용자
    if (!user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 관리자 전용 페이지
    const isAdminRoute = ADMIN_ONLY_ROUTES.some(route => pathname.startsWith(route));
    if (isAdminRoute && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // 한의사 전용 페이지 (admin도 접근 가능)
    const isDoctorRoute = DOCTOR_ONLY_ROUTES.some(route => pathname.startsWith(route));
    if (isDoctorRoute && !['doctor', 'admin'].includes(user.role)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};