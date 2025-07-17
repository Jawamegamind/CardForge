'use client'

import Link from 'next/link'

export default function AuthCodeError() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-2xl">
                <div className="card-body text-center">
                    {/* Error Icon */}
                    <div className="text-6xl mb-4">⚠️</div>
                    
                    {/* Header */}
                    <h1 className="text-2xl font-bold text-error mb-2">Authentication Error</h1>
                    <p className="text-base-content/70 mb-6">
                        The authentication link you clicked is invalid or has expired.
                    </p>

                    {/* Possible Reasons */}
                    <div className="text-left bg-base-200 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold mb-2">This could happen if:</h3>
                        <ul className="text-sm space-y-1 text-base-content/70">
                            <li>• The link has expired (links expire after 1 hour)</li>
                            <li>• The link has already been used</li>
                            <li>• The link was copied incorrectly</li>
                            <li>• You opened the link in a different browser</li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Link href="/forgot-password" className="btn btn-primary w-full">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Request New Reset Link
                        </Link>
                        
                        <Link href="/login" className="btn btn-outline w-full">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Back to Login
                        </Link>
                    </div>

                    {/* Help Section */}
                    <div className="mt-6 pt-4 border-t border-base-300">
                        <p className="text-xs text-base-content/50">
                            Still having trouble?{' '}
                            <a href="mailto:support@cardforge.app" className="link link-primary">
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
