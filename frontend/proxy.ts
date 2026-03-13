import { NextRequest, NextResponse } from 'next/server';

// ─── Route config ─────────────────────────────────────────────────────────────
// PUBLIC  → no auth needed
// PATIENT → requires any authenticated user
// DOCTOR  → requires role === 'doctor'
// ADMIN   → requires role === 'admin' or 'super_admin'

const PUBLIC_PATHS = ['/', '/login', '/register', '/otp'];

const DOCTOR_PREFIX = '/doctor';
const ADMIN_PREFIX = '/admin';

// ─── Token helpers ────────────────────────────────────────────────────────────

function getAuthCookie(req: NextRequest) {
  // We store a lightweight non-sensitive session hint in a cookie after login.
  // The real JWT is kept in memory (Zustand) — this cookie only carries the role
  // so middleware can redirect without exposing the token server-side.
  // Cookie name: docnear-session  value: JSON { role: string, isAuthenticated: bool }
  const raw = req.cookies.get('docnear-session')?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as { role: string; isAuthenticated: boolean };
  } catch {
    return null;
  }
}

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow static assets, api routes, Next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static files
  ) {
    return NextResponse.next();
  }

  const session = getAuthCookie(req);
  const isAuthenticated = session?.isAuthenticated === true;
  const role = session?.role ?? null;

  // ── Not logged in ──────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    if (isPublic(pathname)) return NextResponse.next();

    // Redirect to login with a return URL
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Logged in — role-based guards ──────────────────────────────────────────

  // Admin routes: only admin / super_admin
  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (role !== 'admin' && role !== 'super_admin') {
      const url = req.nextUrl.clone();
      url.pathname = role === 'doctor' ? '/doctor' : '/';
      return NextResponse.redirect(url);
    }
  }

  // Doctor routes: only doctor
  if (pathname.startsWith(DOCTOR_PREFIX)) {
    if (role !== 'doctor') {
      const url = req.nextUrl.clone();
      url.pathname = role === 'admin' || role === 'super_admin' ? '/admin' : '/';
      return NextResponse.redirect(url);
    }
  }

  // Prevent logged-in users from hitting login/register again
  if (pathname === '/login' || pathname === '/register') {
    const url = req.nextUrl.clone();
    url.pathname =
      role === 'doctor' ? '/doctor' : role === 'admin' || role === 'super_admin' ? '/admin' : '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
