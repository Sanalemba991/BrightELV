import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Get the auth token from cookies
    const authToken = request.cookies.get('auth-token');

    // If there's no auth token, redirect to login
    if (!authToken || !authToken.value) {
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Verify the JWT token
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
      await jwtVerify(authToken.value, secret);
    } catch (error) {
      // Token is invalid or expired, redirect to login
      const loginUrl = new URL('/auth/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      // Clear the invalid cookie
      response.cookies.delete('auth-token');
      return response;
    }
  }

  return NextResponse.next();
}

// Configure the paths that should be matched by the middleware
export const config = {
  matcher: '/admin/:path*'
};
