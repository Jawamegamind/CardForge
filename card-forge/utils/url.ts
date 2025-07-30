/**
 * Get the base URL for the application
 * This works for both development and production environments
 */
export function getBaseUrl(): string {
  // Check if we're on the client side
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  // Server-side logic
  // 1. If NEXT_PUBLIC_SITE_URL is set, use it (for production overrides)
  // Make sure to trim any trailing slashes
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  }

  // 2. If deployed on Vercel, use VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // 3. Production fallback - replace with your actual domain
  if (process.env.NODE_ENV === 'production') {
    return 'https://card-forge-alpha.vercel.app' // Replace with your actual domain
  }

  // 4. Fallback to localhost for development
  return 'http://localhost:3000'
}

/**
 * Get the full URL for a given path
 * @param path - The path to append to the base URL (should start with /)
 */
export function getFullUrl(path: string): string {
  return `${getBaseUrl()}${path}`
}
