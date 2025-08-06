'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Send, Paperclip, Upload, Globe, Lock, Unlock, Menu, X, ArrowRight, Play, Users, Rocket, TrendingUp, Star } from 'lucide-react'
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Component() {
  const [prompt, setPrompt] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsGenerating(false)
  }

  const suggestions = [
    "Portfolio", "SaaS Dashboard", "E-Commerce", "PDF Viewer", "Crypto App"
  ]

  const stats = [
    { number: "50K+", label: "Websites Generated", icon: "🚀" },
    { number: "15K+", label: "Active Developers", icon: "👨‍💻" },
    { number: "99.9%", label: "Uptime", icon: "⚡" },
    { number: "< 30s", label: "Average Generation", icon: "⏱️" }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder at TechFlow",
      avatar: "👩‍💼",
      quote: "Codify AI helped us launch our MVP in just 2 days. Incredible!"
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior Developer",
      avatar: "👨‍💻",
      quote: "The code quality is production-ready. Saved us months of work."
    },
    {
      name: "Emily Watson",
      role: "Designer",
      avatar: "👩‍🎨",
      quote: "Finally, a tool that understands both design and development."
    }
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient orbs with complex animations */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] bg-gradient-to-r from-purple-600/40 via-blue-600/30 to-pink-600/40 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Floating orbs with different animations */}
        <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
        
        {/* Mouse-following gradient */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-2xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
        
        {/* Animated geometric shapes */}
        <div className="absolute top-20 left-20 w-6 h-6 bg-purple-400/30 rotate-45 animate-spin" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-40 right-32 w-8 h-8 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDuration: '7s' }}></div>
        <div className="absolute bottom-32 left-40 w-4 h-4 bg-pink-400/30 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-6 h-6 bg-green-400/30 rounded-full animate-ping" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-60 left-1/3 w-3 h-3 bg-yellow-400/30 rotate-45 animate-spin" style={{ animationDuration: '12s' }}></div>

        {/* Floating particles */}
        {[...Array(40)].map((_, i) => (
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

        {/* Advanced grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '60px 60px',
            animation: 'float 20s ease-in-out infinite'
          }}
        ></div>
      </div>

      {/* Custom CSS for advanced animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          33% { transform: translateY(-20px) rotate(120deg); opacity: 0.3; }
          66% { transform: translateY(-10px) rotate(240deg); opacity: 0.25; }
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
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 backdrop-blur-sm">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 animate-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Codify AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105">Features</a>
          <a href="#templates" className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105">Templates</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105">Pricing</a>
          <a href="#api" className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105">API</a>
          <Link href="/docs" className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105">Docs</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/auth">
            <Button variant="ghost" className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:scale-105">
              Login
            </Button>
          </Link>
          <Link href="/auth">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white transition-all duration-300 hover:scale-110"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 z-40 bg-black/95 backdrop-blur-lg border-b border-white/10 animate-in slide-in-from-top duration-300">
          <div className="px-6 py-6 space-y-4">
            <a href="#features" className="block text-gray-300 hover:text-white transition-colors font-medium">Features</a>
            <a href="#templates" className="block text-gray-300 hover:text-white transition-colors font-medium">Templates</a>
            <a href="#pricing" className="block text-gray-300 hover:text-white transition-colors font-medium">Pricing</a>
            <a href="#api" className="block text-gray-300 hover:text-white transition-colors font-medium">API</a>
            <Link href="/docs" className="block text-gray-300 hover:text-white transition-colors font-medium">Docs</Link>
            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link href="/auth">
                <Button variant="ghost" className="w-full text-gray-300 hover:text-white justify-start font-medium">
                  Login
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6 text-center">
        
        {/* Hero Badge */}
        <Badge className="mb-8 bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 px-4 py-2 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
          <Sparkles className="w-4 h-4 mr-2 animate-spin" style={{ animationDuration: '3s' }} />
          #1 AI Website Builder for Startups
        </Badge>

        {/* Main Headline */}
        <div className="max-w-6xl mx-auto mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-200">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Ship faster with
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              AI-powered code
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-400">
            Transform ideas into production-ready websites in seconds, not weeks.
          </p>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-600">
            Join the future of web development with{" "}
            <span className="text-purple-400 font-semibold">intelligent AI agents</span> that understand your vision.
          </p>
        </div>

        {/* AI Prompt Interface */}
        <div className="w-full max-w-4xl mx-auto mb-12 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-800">
          <div className="relative group">
            {/* Enhanced Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-pink-500/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20 hover:scale-[1.02]">
              <div className="flex items-center space-x-4 mb-6">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Build a modern SaaS dashboard with user authentication and billing"
                  className="flex-1 bg-transparent border-none text-white placeholder:text-gray-400 text-lg focus:ring-0 focus:outline-none h-12 transition-all duration-300"
                />
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-10 w-10 transition-all duration-300 hover:scale-110 hover:bg-purple-500/20">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-10 w-10 transition-all duration-300 hover:scale-110 hover:bg-blue-500/20">
                    <Upload className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPublic(!isPublic)}
                    className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${isPublic ? 'text-green-400 hover:bg-green-500/20' : 'text-yellow-400 hover:bg-yellow-500/20'}`}
                  >
                    {isPublic ? <Unlock className="w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
                    {isPublic ? 'Public' : 'Private'}
                  </Button>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Building...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Rocket className="w-4 h-4" />
                      <span>Build Now</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Suggestion Tags */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setPrompt(`Create a ${suggestion.toLowerCase()} website`)}
                className="bg-gray-900/50 border-white/20 text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 px-4 py-2 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: `${1000 + index * 100}ms` }}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full max-w-6xl mx-auto mb-20 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-1200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer transition-all duration-300 hover:scale-110"
              >
                <div className="text-3xl mb-2 group-hover:animate-bounce">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof / Testimonials */}
        <div className="w-full max-w-6xl mx-auto animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-1400">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              Loved by <span className="text-purple-400">developers</span> worldwide
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-2xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                  <div className="flex space-x-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000">
            Ready to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              revolutionize
            </span>{" "}
            your workflow?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-200">
            Join thousands of developers, designers, and founders who are building 
            the future with Codify AI.
          </p>
          <div className="flex justify-center animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-400">
            <Link href="/auth">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-lg rounded-xl font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50">
                Start Building Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          
          {/* Additional trust signals */}
          <div className="flex justify-center items-center space-x-8 mt-8 opacity-60 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-600">
            <div className="text-sm text-gray-400">✨ No credit card required</div>
            <div className="text-sm text-gray-400">🚀 Start building instantly</div>
            <div className="text-sm text-gray-400">💡 Free forever plan</div>
          </div>
        </div>
      </div>
    </div>
  )
}
