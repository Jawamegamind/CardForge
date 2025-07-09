'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Handle login logic here
    console.log('Login attempt:', { email, password });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="flex flex-col gap-4 rounded-box bg-base-200 p-6 max-w-md">
            {/* CardForge Logo */}
            <div className="text-center mb-2">
                <h1 className="text-4xl font-bold text-primary mb-2">CardForge</h1>
                <p className="text-base-content/70 text-sm">Create professional business cards with ease</p>
            </div>
            
            <h2 className="text-2xl font-bold self-center">Log in</h2>

            <span className="self-center">
                Don't have an account?{' '}
                <Link href="/signup" className="link link-secondary">Sign up</Link>
            </span>

            {/* <a className="btn btn-neutral">
                <i className="fa-brands fa-google text-primary"></i>
                Log in with Google
            </a> */}

            <div className="divider my-0">OR</div>

            <div>
                <label className="input validator join-item">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                    >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                </svg>
                <input type="email" placeholder="mail@site.com" required />
                </label>
                <div className="validator-hint hidden">Enter valid email address</div>
            </div>

            <div>
                <label className="input validator">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                    >
                    <path
                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                    ></path>
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                    </g>
                </svg>
                <input
                    type="password"
                    required
                    placeholder="Password"
                />
                </label>
                <div className="flex justify-between items-center mt-1">
                    <div></div>
                    <a className="link link-accent text-sm">Forgot password?</a>
                </div>
            </div>

            <div className="form-control">
                <label className="cursor-pointer label self-start gap-2">
                    <input type="checkbox" className="checkbox" />
                    <span className="label-text">Remember me</span>
                </label>
            </div>

            <button className="btn btn-primary">Log in</button>
        </div>
    </div>
  );
}