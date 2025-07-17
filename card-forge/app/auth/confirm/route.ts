import { type EmailOtpType } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
    const cookieStore = cookies()
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null
    const next = searchParams.get('next') ?? '/'
    const redirectTo = request.nextUrl.clone()
    redirectTo.pathname = next
    redirectTo.search = '' // Clear the search params for clean redirect

    if (token_hash && type) {
        const supabase = await createClient(cookieStore)

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        })
        
        if (!error) {
            // Successful verification - redirect to the intended page
            console.log(`Successfully verified ${type} token, redirecting to ${next}`)
            return NextResponse.redirect(redirectTo)
        } else {
            console.error('Error verifying token:', error)
        }
    }

    // return the user to an error page with some instructions
    redirectTo.pathname = '/auth/auth-code-error'
    redirectTo.search = ''
    return NextResponse.redirect(redirectTo)
}