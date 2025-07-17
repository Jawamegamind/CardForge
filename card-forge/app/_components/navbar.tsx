'use client'

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { logout } from "../(authentication)/login/actions"

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [userTable, setUserTable] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  // Fetch user data
  const fetchUser = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        console.error('User not authenticated:', userError)
        return
      }

      setUser(user)

      // Fetch user details from the users table
      const { data: userData, error: userTableError } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      if (userTableError) {
        console.error('Error fetching user details:', userTableError)
        return
      }

      setUserTable(userData)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])
  return (
    // <!-- Navbar -->
    <nav className="navbar justify-between bg-base-300">
        {/* <!-- Logo --> */}
        <a className="btn btn-ghost text-lg">
            {/* <img alt="Logo" src="/daisy-components/logo.svg" className="w-4" /> */}
            CardForge 
        </a>

        {/* <!-- Menu for mobile --> */}
        <div className="dropdown dropdown-end sm:hidden">
            <button className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    {!loading && userTable?.profile_picture_url ? (
                        <img
                            alt="User profile"
                            src={userTable.profile_picture_url}
                        />
                    ) : (
                        <div className="placeholder">
                            <div className="bg-primary text-primary-content rounded-full w-10 flex items-center justify-center">
                                <span className="text-sm font-semibold">
                                    {!loading && user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </button>

            <ul tabIndex={0} className="dropdown-content menu z-[1] bg-base-200 p-6 rounded-box shadow w-56 gap-2">
                <a className="btn btn-sm btn-primary" onClick={logout}>Log Out</a>
            </ul>
        </div>

        {/* <!-- Menu for desktop --> */}
        <ul className="hidden menu sm:menu-horizontal gap-2">
            <a href="/profile" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    {!loading && userTable?.profile_picture_url ? (
                        <img
                            alt="User profile"
                            src={userTable.profile_picture_url}
                        />
                    ) : (
                        <div className="bg-base-200 rounded-full w-10 h-10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-base-content">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                    )}
                </div>
            </a>
            <a className="btn btn-sm btn-primary" onClick={logout}>Log Out</a>
        </ul>
    </nav>
  );
}