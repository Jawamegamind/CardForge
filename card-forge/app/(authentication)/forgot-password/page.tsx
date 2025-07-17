'use client'

import { useState } from 'react'
import Link from 'next/link'
import { resetPassword } from '../login/actions'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        const formData = new FormData()
        formData.append('email', email)

        try {
            const result = await resetPassword(formData)
            
            if (result === 'success') {
                setSuccess(true)
                setMessage('Password reset email sent! Check your inbox and follow the instructions to reset your password.')
            } else {
                setMessage(result || 'An error occurred. Please try again.')
            }
        } catch (error) {
            console.error('Reset password error:', error)
            setMessage('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-2xl">
                <div className="card-body">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-primary mb-2">CardForge</h1>
                        <h2 className="text-xl font-semibold mb-2">Forgot Password</h2>
                        <p className="text-base-content/70">
                            Enter your email address and we'll send you a link to reset your password.
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

                    {!success ? (
                        <>
                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Email Address</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="input input-bordered w-full"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                                    disabled={loading || !email.trim()}
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Sending Reset Email...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Send Reset Email
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="divider">OR</div>
                        </>
                    ) : (
                        /* Success Actions */
                        <div className="space-y-4">
                            <div className="text-center">
                                <div className="text-6xl mb-4">📧</div>
                                <p className="text-sm text-base-content/70 mb-4">
                                    Didn't receive the email? Check your spam folder or try again.
                                </p>
                            </div>
                            
                            <button
                                onClick={() => {
                                    setSuccess(false)
                                    setMessage('')
                                    setEmail('')
                                }}
                                className="btn btn-outline w-full"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Back to Login */}
                    <div className="text-center">
                        <Link href="/login" className="link link-primary text-sm">
                            <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Login
                        </Link>
                    </div>

                    {/* Additional Help */}
                    <div className="text-center mt-6 pt-4 border-t border-base-300">
                        <p className="text-xs text-base-content/50">
                            Need help? Contact{' '}
                            <a href="mailto:jawad.saeed586@gmail.com" className="link link-primary">
                                jawad.saeed586@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
