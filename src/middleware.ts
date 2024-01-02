import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const tokenAuth = await getToken({ req: request })
  const isAuth = !!tokenAuth

  const isAuthPage =
    request.nextUrl.pathname.startsWith('/auth/login') ||
    request.nextUrl.pathname.startsWith('/auth/register')

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return null
  }

  const isAutenticatePage = request.nextUrl.pathname.startsWith('/dashboard')

  if (isAutenticatePage) {
    if (!isAuth) {
      let from = request.nextUrl.pathname
      if (request.nextUrl.search) {
        from += request.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/auth/login?from=${encodeURIComponent(from)}`, request.url),
      )
    }
    return null
  }
}

export const config = {
  matcher: [
    '/auth/register/password',
    '/auth/register',
    '/auth/login',
    '/dashboard/:path*',
  ],
}
