
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Declaring the routes that need to be protected
const protectedRoutes = [
  '/dashboard'
]

export const createClient = async (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    },
  );

  // Getting the pathname from the request
  const pathname = request.nextUrl.pathname 

  // Checking if the path name is in the protected routes
  const isProtectedRoute = protectedRoutes.includes(pathname)

  // Getting the session of the authenticated user
  const session = await supabase.auth.getUser()

  // If the route is protected and the user is not authenticated, redirect to login
  if (isProtectedRoute && !session.data.user) {
    // const loginUrl = new URL('/login', request.url);
    // loginUrl.searchParams.set('redirect', pathname);
    // return NextResponse.redirect(loginUrl);
    return NextResponse.redirect(new URL('/', request.url))
  }

  return supabaseResponse
};
