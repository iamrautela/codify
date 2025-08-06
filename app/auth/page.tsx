'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Code, Github, Linkedin, Mail, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react'
import { useState, useEffect } from "react"
import Link from "next/link"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Redirect to main page
    window.location.href = '/'
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Advanced Background Animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient orbs with complex animations */}
        <div className="absolute top-1/3 left-1/4 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/30 via-blue-600/20 to-pink-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/25 to-purple-500/25 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '8s' }}></div>
        
        {/* Mouse-following gradient */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/15 to-blue-500/15 rounded-full blur-3xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>

        {/* Animated geometric shapes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400/30 rotate-45 animate-spin" style={{ animationDuration: '10s' }}></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-pink-400/30 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-green-400/30 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          ></div>
        ))}

        {/* Grid pattern with animation */}
        <div 
          className="absolute inset-0 opacity-10 animate-pulse"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '60px 60px',
            animation: 'float 15s ease-in-out infinite'
          }}
        ></div>
      </div>

      {/* Custom CSS for advanced animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.2; }
        }
        @keyframes slideInScale {
          0% { transform: translateY(50px) scale(0.8); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
          50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.6); }
        }
        .animate-slide-in-scale {
          animation: slideInScale 0.8s ease-out forwards;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 animate-glow">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Codify AI
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <span className="text-gray-400 text-sm">New to Codify?</span>
          <Button 
            variant="ghost" 
            className="text-purple-400 hover:text-white transition-all duration-300 hover:scale-105"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </Button>
        </div>
      </nav>

      {/* Main Auth Card */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <Card className="bg-gray-900/80 backdrop-blur-xl border-white/20 shadow-2xl animate-slide-in-scale">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-2">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </CardTitle>
            <p className="text-gray-400">
              {isLogin 
                ? 'Sign in to continue building amazing websites' 
                : 'Join thousands of developers building with AI'
              }
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => handleSocialLogin('github')}
                disabled={isLoading}
                className="w-full bg-gray-800/80 hover:bg-gray-700/80 text-white border border-gray-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-gray-500/20 group"
              >
                <Github className="w-5 h-5 mr-3 group-hover:animate-spin" style={{ animationDuration: '2s' }} />
                Continue with GitHub
              </Button>

              <Button
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20 group"
              >
                <svg className="w-5 h-5 mr-3 group-hover:animate-spin" style={{ animationDuration: '2s' }} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <Button
                onClick={() => handleSocialLogin('linkedin')}
                disabled={isLoading}
                className="w-full bg-blue-600/80 hover:bg-blue-500/80 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20 group"
              >
                <Linkedin className="w-5 h-5 mr-3 group-hover:animate-spin" style={{ animationDuration: '2s' }} />
                Continue with LinkedIn
              </Button>
            </div>

            <div className="relative">
              <Separator className="bg-gray-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-gray-900 px-4 text-gray-400 text-sm">or continue with email</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Full Name</label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300"
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300"
                  required
                />
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 text-gray-400">
                    <input type="checkbox" className="rounded border-gray-600" />
                    <span>Remember me</span>
                  </label>
                  <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto">
                    Forgot password?
                  </Button>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Terms and Privacy */}
            {!isLogin && (
              <p className="text-xs text-gray-400 text-center">
                By creating an account, you agree to our{' '}
                <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto text-xs">
                  Terms of Service
                </Button>{' '}
                and{' '}
                <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto text-xs">
                  Privacy Policy
                </Button>
              </p>
            )}

            {/* Features Preview */}
            <div className="pt-6 border-t border-gray-700/50">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="group cursor-pointer">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-500/30 transition-all duration-300 group-hover:scale-110">
                    <Zap className="w-4 h-4 text-purple-400" />
                  </div>
                  <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Instant Generation</p>
                </div>
                <div className="group cursor-pointer">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-500/30 transition-all duration-300 group-hover:scale-110">
                    <Code className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Clean Code</p>
                </div>
                <div className="group cursor-pointer">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-green-500/30 transition-all duration-300 group-hover:scale-110">
                    <Shield className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Secure</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom CTA */}
        <div className="text-center mt-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-500">
          <p className="text-gray-400 text-sm mb-4">
            Join over <span className="text-purple-400 font-semibold">50,000+</span> developers building with AI
          </p>
          <div className="flex justify-center space-x-4 opacity-60">
            <div className="text-xs text-gray-500">✨ No credit card required</div>
            <div className="text-xs text-gray-500">🚀 Start building instantly</div>
          </div>
        </div>
      </div>
    </div>
  )
}
