import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      {/* Navigation */}
      <nav className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <div className="text-2xl font-bold text-primary">CardForge</div>
        </div>
        <div className="navbar-end">
          <div className="flex gap-2">
            <Link href="/login" className="btn btn-ghost">
              Log In
            </Link>
            <Link href="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero min-h-[calc(100vh-4rem)]">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Create Professional Business Cards in Minutes
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-base-content/80 max-w-3xl mx-auto">
              Design, customize, and download stunning business cards with our intuitive platform. 
              Perfect for professionals, entrepreneurs, and businesses of all sizes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/signup" className="btn btn-primary btn-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get Started Free
              </Link>
              <Link href="/login" className="btn btn-outline btn-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </Link>
            </div>

            {/* Demo Card Preview */}
            <div className="flex justify-center mb-16">
              <div className="mockup-browser bg-base-100 shadow-2xl">
                <div className="mockup-browser-toolbar">
                  <div className="input">cardforge.app</div>
                </div>
                <div className="bg-base-200 p-8">
                  <div className="bg-white shadow-xl border border-gray-100 rounded-lg p-6" style={{ width: '350px', height: '200px' }}>
                    <div className="flex h-full">
                      <div className="w-1/2 flex flex-col justify-center items-center text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-3">
                          <span className="text-white font-bold text-lg">CF</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">CardForge</h3>
                        <p className="text-xs text-gray-600">Professional Design</p>
                      </div>
                      <div className="w-1/2 bg-gray-50 flex flex-col justify-center px-4 rounded-r-lg">
                        <h2 className="text-base font-bold text-gray-800 mb-2">John Smith</h2>
                        <p className="text-sm text-gray-600 mb-3">Creative Director</p>
                        <div className="space-y-1 text-xs text-gray-700">
                          <div>📞 +1 234 567 8900</div>
                          <div>✉️ john@cardforge.app</div>
                          <div>🌐 cardforge.app</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-base-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose CardForge?</h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Everything you need to create professional business cards that make a lasting impression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="card-title justify-center mb-2">Easy Design</h3>
                <p>Intuitive drag-and-drop interface makes creating beautiful business cards effortless.</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="card-title justify-center mb-2">Mobile Ready</h3>
                <p>Create and edit your business cards on any device, anywhere, anytime.</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="card-title justify-center mb-2">Instant Download</h3>
                <p>Download your cards in high-quality PNG or PDF format, ready for printing.</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="card-title justify-center mb-2">Professional Templates</h3>
                <p>Choose from a variety of professionally designed templates for every industry.</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">☁️</div>
                <h3 className="card-title justify-center mb-2">Cloud Storage</h3>
                <p>Your designs are automatically saved and synced across all your devices.</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="card-title justify-center mb-2">Secure & Private</h3>
                <p>Your personal information and designs are protected with enterprise-grade security.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Create Your Perfect Business Card?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust CardForge for their business card needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn btn-neutral btn-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Start Creating Now
            </Link>
            <Link href="/login" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content">
        <div>
          <p className="text-base text-white">
            <a 
              href="https://jawamegamind-portfolio.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="link text-white hover:text-primary font-medium"
            >
              © Jawad Saeed
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
