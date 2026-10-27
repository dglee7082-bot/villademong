import { NextRequest, NextResponse } from 'next/server'
import { MAIN_PAGE_ONLY } from './lib/site-config'

export function proxy(request: NextRequest) {
  if (!MAIN_PAGE_ONLY) return NextResponse.next()

  const { pathname } = request.nextUrl
  const isAsset = /\.(?:ico|png|jpg|jpeg|webp|gif|svg|woff2?)$/i.test(pathname)

  if (pathname === '/' || pathname === '/open-house' || pathname.startsWith('/_next/') || isAsset) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
