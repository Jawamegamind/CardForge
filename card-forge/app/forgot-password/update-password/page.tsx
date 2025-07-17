'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

export default function ResetPassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClient()

    useEffect(() => {
        // Check if we have the necessary tokens/session for password reset
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                setError('Invalid or expired reset link. Please request a new password reset.')
            }
        }
        
        checkSession()
    }, [supabase.auth])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        setError('')

        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long')
            setLoading(false)
            return
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            })

            if (error) {
                setError(error.message)
            } else {
                setSuccess(true)
                setMessage('Password updated successfully! You can now login with your new password.')
                
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    router.push('/login')
                }, 3000)
            }
        } catch (error) {
            console.error('Reset password error:', error)
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (error && !success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-4">
                <div className="card w-full max-w-md bg-base-100 shadow-2xl">
                    <div className="card-body text-center">
                        <div className="text-6xl mb-4">❌</div>
                        <h2 className="text-xl font-semibold mb-2">Reset Link Invalid</h2>
                        <p className="text-base-content/70 mb-6">{error}</p>
                        
                        <div className="space-y-2">
                            <Link href="/forgot-password" className="btn btn-primary w-full">
                                Request New Reset Link
                            </Link>
                            <Link href="/login" className="btn btn-outline w-full">
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-2xl">
                <div className="card-body">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-primary mb-2">CardForge</h1>
                        <h2 className="text-xl font-semibold mb-2">Reset Password</h2>
                        <p className="text-base-content/70">
                            Enter your new password below.
                        </p>
                    </div>

                    {/* Success/Error Message */}
                    {message && (
                        <div className={`alert ${success ? 'alert-success' : 'alert-error'} mb-4`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {success ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                )}
                            </svg>
                            <span>{message}</span>
                        </div>
                    )}

                    {error && !success && (
                        <div className="alert alert-error mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {!success ? (
                        <>
                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">New Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        className="input input-bordered w-full"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                        minLength={8}
                                    />
                                    <label className="label">
                                        <span className="label-text-alt">Password must be at least 6 characters</span>
                                    </label>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Confirm New Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        className="input input-bordered w-full"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        minLength={6}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                                    disabled={loading || !password.trim() || !confirmPassword.trim()}
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Updating Password...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            Update Password
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        /* Success State */
                        <div className="text-center space-y-4">
                            <div className="text-6xl mb-4">✅</div>
                            <p className="text-sm text-base-content/70">
                                Redirecting you to login in 3 seconds...
                            </p>
                            <Link href="/login" className="btn btn-primary w-full">
                                Login Now
                            </Link>
                        </div>
                    )}

                    {/* Back to Login */}
                    {!success && (
                        <div className="text-center mt-4">
                            <Link href="/login" className="link link-primary text-sm">
                                <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
