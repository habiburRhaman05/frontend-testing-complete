import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard'];
  const publicRoutes = ['/login', '/register'];

  // Protected route: no access token
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    if (refreshToken) {
      // Allow through — client-side axios interceptor handles token refresh
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Public auth routes: already logged in → redirect to dashboard
  if (publicRoutes.some((route) => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
