'use server'

import axios from "axios"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from "@/utils/supabase/server"

export async function register(formData: FormData) {
    console.log("Register action")
    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)
  
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const formdata = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string
    }

    console.log("The formdata in actions is", formData)

    // First signing up using supabase auth
    // Now signing up using supabase auth
    const { data, error } = await supabase.auth.signUp({
      email: formdata.email,
      password: formdata.password
    })
  
    if (error) {
      // console.error('Error:', error)

      // If the email already exists in the database, we should not register the user
      if (error.code == 'user_already_exists') {
          console.log('A user with this email already exists')
          return "User already exists";
      }
      else {
          console.log('Error:', error)
          return "User registration failed";
      }
    }
    else {
        console.log('Data from supabase auth is:', data)

        // Now creating the user in the users table in supabase using the returned auth object
        const {user, session} = data

        // Since we have already signed up using supabase auth, we can now create a user in the users table
        const { data: userData, error: userError } = await supabase
            .from('users')
            .insert({
                user_id: user?.id, // This is the UID from supabase auth
                email: formdata.email,
            })
            .select()
        if (userError) {
            console.error('Error creating user in users table:', userError)
            return "User registration failed";
        }
        else {
            console.log('User created in users table:', userData)
            revalidatePath('/', 'layout')
            redirect('/login')
        }
        

        // // Now that we have signed up using supabase, we can create a user in our own database using the auth user UID
        // const response = await axios.post('http://localhost:8000/api/register', {
        //     user_id: data.user?.id ?? '',
        //     name: formdata.name,
        //     email: formdata.email,
        //     password: formdata.password,
        //     role: 'user'        
        // })

        // console.log("The backend's response to signing up new user is",response.data)

        // // Now here before we register the user, we need to check the returned response message from the backend
        // // If the response message is "User already exists", we should not register the user
        // // If the response message is "User registered successfully", we should register the user
        // // If the response message is "User registration failed", we should not register the user
        // if (response.data.message == "User already exists") {
        //     console.log("User already exists")
        //     return "User already exists";
        // }
        // else if (response.data.message == "User created successfully") {
        //     console.log("User registered successfully")
        //     revalidatePath('/', 'layout')
        //     redirect('/login')
        // }
        // else if (response.data.message == "User registration failed") {
        //     console.log("User registration failed")
        //     return "User registration failed";
        // }
    }
}