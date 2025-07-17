'use client';

import { useState } from 'react';
import Link from 'next/link';
import { register } from './actions';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // if (!formData.firstName.trim()) {
    //   newErrors.firstName = 'First name is required';
    // }

    // if (!formData.lastName.trim()) {
    //   newErrors.lastName = 'Last name is required';
    // }

    // if (!formData.email.trim()) {
    //   newErrors.email = 'Email is required';
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = 'Please enter a valid email';
    // }

    // if (!formData.password) {
    //   newErrors.password = 'Password is required';
    // } else if (formData.password.length < 8) {
    //   newErrors.password = 'Password must be at least 8 characters';
    // } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(formData.password)) {
    //   newErrors.password = 'Password must include uppercase, lowercase, and number';
    // }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    // await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Handle signup logic here
    console.log('Signup attempt:', formData);

    // Calling the register action
    const formDataObj = new FormData();
    formDataObj.append('email', formData.email);
    formDataObj.append('password', formData.password);
    formDataObj.append('confirmPassword', formData.confirmPassword);
    
    const response = await register(formDataObj);

    // Checking the response from the register action for specific errors 
    if (response === "User already exists") {
      setErrors(prev => ({
        ...prev,
        email: 'A user with this email already exists'
      }));
    } else if (response === "User registration failed") {
      setErrors(prev => ({
        ...prev,
        general: 'User registration failed. Please try again.'
      }));
    }
    
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
            
            <h2 className="text-2xl font-bold self-center">Create an account</h2>

            <span className="self-center">
                Already have an account?{' '}
                <Link href="/login" className="link link-secondary">Log in</Link>
            </span>

            {/* <a className="btn btn-neutral">
                <i className="fa-brands fa-google text-primary"></i>
                Create with Google
            </a> */}

            <div className="divider my-0">OR</div>

            <form onSubmit={handleSignup} className="flex flex-col gap-4">
                <div>
                    <label className={`input validator join-item ${errors.email ? 'input-error' : ''}`}>
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
                    <input 
                        type="email" 
                        name="email"
                        placeholder="mail@site.com" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                    </label>
                    {errors.email && (
                        <div className="text-error text-sm mt-1">{errors.email}</div>
                    )}
                </div>

                <div>
                    <label className={`input validator ${errors.password ? 'input-error' : ''}`}>
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
                        name="password"
                        required
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        minLength={8}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    />
                    </label>
                    {errors.password && (
                        <div className="text-error text-sm mt-1">{errors.password}</div>
                    )}
                </div>

                <div>
                    <label className={`input validator ${errors.confirmPassword ? 'input-error' : ''}`}>
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
                        name="confirmPassword"
                        required
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        minLength={8}
                        title="Confirm your password"
                    />
                    </label>
                    {errors.confirmPassword && (
                        <div className="text-error text-sm mt-1">{errors.confirmPassword}</div>
                    )}
                </div>

                {/* <div className="form-control">
                    <label className="cursor-pointer label self-start gap-2">
                        <input type="checkbox" className="checkbox" />
                        <span className="label-text">
                            I accept the{' '}
                            <a className="link link-accent">Terms and Conditions</a>
                        </span>
                    </label>
                </div> */}

                <button 
                    type="submit" 
                    className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating...' : 'Create'}
                </button>
            </form>
        </div>
    </div>
  );
}
