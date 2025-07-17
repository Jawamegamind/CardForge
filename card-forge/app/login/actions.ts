'use server'

import axios from "axios";
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
    console.log("login action")
    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)
  
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const formdata = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    console.log("The formdata in login actions is", formData)

    // Signing in first using supabase auth
    const { data, error } = await supabase.auth.signInWithPassword(formdata)
  
    if (error) {
      console.error('Error:', error)

      // If invalid credentials are provided, we should not login the user
      if (error.code == 'invalid_credentials') {
          console.log('Invalid credentials')
          return "Invalid credentials";
      }
    }
    else {
        console.log('Data:', data)

        // Now basically retrieving user details from the users table in supabase using the user id from the auth object
        const { user, session } = data

        // Now we need to get the user details from the users table in supabase
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', user?.id) // This is the UID from supabase
        if (userError) {
            console.error('Error retrieving user data:', userError)
            return "User login failed";
        }

        console.log("The user object is", userData)

        // Now redirecting the user to the application dashboard
        redirect('/dashboard')
    }
}

// Function for loggin out the user
export async function logout() {
    console.log("logout action")
    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)

    // Signing out using supabase auth
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error('Error logging out:', error)
    }

    // Redirecting to the login page after successful logout
    revalidatePath('/', 'layout')
    redirect('/login')
}

// Function for sending password reset email
export async function resetPassword(formData: FormData) {
    console.log("reset password action")
    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)
  
    const email = formData.get('email') as string
    
    if (!email) {
        return "Email is required"
    }

    // Send password reset email using Supabase Auth
    const { error } = await supabase.auth.resetPasswordForEmail(
        email
    )

    if (error) {
        console.error('Error sending reset email:', error)
        return "Failed to send reset email. Please try again."
    }

    return "success"
}