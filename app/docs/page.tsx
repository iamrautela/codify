'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Code, Search, BookOpen, Zap, Rocket, Database, Palette, Globe, ArrowRight, Copy, Check, ChevronRight, Menu, X, Home, FileText, Settings, HelpCircle } from 'lucide-react'
import { useState, useEffect } from "react"
import Link from "next/link"

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("getting-started")
  const [copiedCode, setCopiedCode] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(""), 2000)
  }

  const sidebarItems = [
    {
      title: "Getting Started",
      items: [
        { id: "introduction", title: "Introduction", icon: <BookOpen className="w-4 h-4" /> },
        { id: "quick-start", title: "Quick Start", icon: <Zap className="w-4 h-4" /> },
        { id: "installation", title: "Installation", icon: <Settings className="w-4 h-4" /> }
      ]
    },
    {
      title: "API Reference",
      items: [
        { id: "authentication", title: "Authentication", icon: <Globe className="w-4 h-4" /> },
        { id: "endpoints", title: "Endpoints", icon: <Database className="w-4 h-4" /> },
        { id: "examples", title: "Examples", icon: <Code className="w-4 h-4" /> }
      ]
    },
    {
      title: "Components",
      items: [
        { id: "ui-components", title: "UI Components", icon: <Palette className="w-4 h-4" /> },
        { id: "templates", title: "Templates", icon: <FileText className="w-4 h-4" /> },
        { id: "deployment", title: "Deployment", icon: <Rocket className="w-4 h-4" /> }
      ]
    }
  ]

  const codeExamples = {
    "quick-start": `// Install Codify AI CLI
npm install -g @codify/cli

// Initialize a new project
codify init my-awesome-app

// Generate components with AI
codify generate "Create a modern dashboard with charts"

// Deploy to production
codify deploy`,
    
    "authentication": `// API Authentication
const codify = new CodifyAI({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Generate a component
const result = await codify.generate({
  prompt: "Create a responsive navbar",
  framework: "react",
  styling: "tailwind"
});`,

    "endpoints": `// POST /api/generate
{
  "prompt": "Create a landing page",
  "framework": "react",
  "styling": "tailwind",
  "features": ["responsive", "dark-mode"]
}

// Response
{
  "id": "gen_123456",
  "status": "completed",
  "files": [
    {
      "name": "page.tsx",
      "content": "..."
    }
  ]
}`
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Advanced Background Animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient orbs */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/20 via-blue-600/15 to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '10s' }}></div>
        
        {/* Mouse-following gradient */}
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-2xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
        ></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 backdrop-blur-sm border-b border-white/10">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Codify AI
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105">
            <Home className="w-4 h-4 inline mr-2" />
            Home
          </Link>
          <Link href="/docs" className="text-purple-400 font-medium">
            <BookOpen className="w-4 h-4 inline mr-2" />
            Documentation
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
          <Link href="/auth">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 font-medium shadow-lg transition-all duration-300 hover:scale-105">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-40 w-80 h-screen bg-gray-900/80 backdrop-blur-xl border-r border-white/10 transition-transform duration-300`}>
          <div className="p-6">
            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documentation..."
                className="pl-10 bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500/50 focus:ring-purple-500/20"
              />
            </div>

            {/* Navigation */}
            <div className="space-y-6">
              {sidebarItems.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 group ${
                          activeSection === item.id
                            ? 'bg-purple-500/20 text-purple-300 border-l-2 border-purple-400'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className={`transition-colors ${activeSection === item.id ? 'text-purple-400' : 'text-gray-400 group-hover:text-white'}`}>
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.title}</span>
                        {activeSection === item.id && (
                          <ChevronRight className="w-4 h-4 ml-auto text-purple-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-12">
            
            {/* Header */}
            <div className="mb-12 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <BookOpen className="w-4 h-4 mr-2" />
                Documentation
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Build faster with{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Codify AI
                </span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                Complete guide to building production-ready applications with AI-powered development.
              </p>
            </div>

            {/* Quick Start Section */}
            {activeSection === "quick-start" && (
              <div className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span>Quick Start</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-300 leading-relaxed">
                      Get up and running with Codify AI in less than 5 minutes. Follow these simple steps to create your first AI-generated application.
                    </p>
                    
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative bg-gray-900/80 rounded-lg p-4 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-400 font-medium">Terminal</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(codeExamples["quick-start"], "quick-start")}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedCode === "quick-start" ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{codeExamples["quick-start"]}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Rocket className="w-5 h-5 text-purple-400" />
                            <h4 className="font-semibold text-white">Fast Setup</h4>
                          </div>
                          <p className="text-sm text-gray-300">Zero configuration required. Start building immediately.</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gradient-to-br from-blue-500/10 to-green-500/10 border-blue-500/20">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Code className="w-5 h-5 text-blue-400" />
                            <h4 className="font-semibold text-white">Clean Code</h4>
                          </div>
                          <p className="text-sm text-gray-300">Production-ready code with best practices built-in.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Authentication Section */}
            {activeSection === "authentication" && (
              <div className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Globe className="w-5 h-5 text-green-400" />
                      <span>Authentication</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-300 leading-relaxed">
                      Secure your API requests with authentication tokens. All API endpoints require a valid API key.
                    </p>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <HelpCircle className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-blue-300">Getting Your API Key</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        Sign up for a free account and get your API key from the dashboard. Free tier includes 100 generations per month.
                      </p>
                    </div>

                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative bg-gray-900/80 rounded-lg p-4 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-400 font-medium">JavaScript</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(codeExamples["authentication"], "auth")}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedCode === "auth" ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{codeExamples["authentication"]}</code>
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* API Endpoints Section */}
            {activeSection === "endpoints" && (
              <div className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Database className="w-5 h-5 text-purple-400" />
                      <span>API Endpoints</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-300 leading-relaxed">
                      RESTful API endpoints for generating components, templates, and full applications.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">POST</Badge>
                        <code className="text-green-300 font-mono">/api/generate</code>
                        <span className="text-gray-400">Generate components with AI</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">GET</Badge>
                        <code className="text-blue-300 font-mono">/api/templates</code>
                        <span className="text-gray-400">List available templates</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">POST</Badge>
                        <code className="text-purple-300 font-mono">/api/deploy</code>
                        <span className="text-gray-400">Deploy to production</span>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative bg-gray-900/80 rounded-lg p-4 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-400 font-medium">Request/Response</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(codeExamples["endpoints"], "endpoints")}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedCode === "endpoints" ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{codeExamples["endpoints"]}</code>
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Introduction Section */}
            {activeSection === "introduction" && (
              <div className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                      <span>Introduction</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Welcome to Codify AI - the most powerful AI-driven development platform for creating production-ready web applications.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">What is Codify AI?</h3>
                        <p className="text-gray-300 leading-relaxed">
                          Codify AI transforms natural language descriptions into fully functional, production-ready code. 
                          Whether you're building a simple landing page or a complex SaaS application, our AI agents understand 
                          your requirements and generate clean, maintainable code.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Key Features</h3>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span>AI-powered code generation</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span>React.js + Tailwind CSS</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>Production-ready code</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                            <span>One-click deployment</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Separator className="bg-gray-700" />

                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-white mb-4">Ready to get started?</h3>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/auth">
                          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 font-medium shadow-lg transition-all duration-300 hover:scale-105">
                            Start Building Free
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          className="border-white/20 text-white hover:bg-white/10 px-8 py-3 font-medium transition-all duration-300 hover:scale-105"
                          onClick={() => setActiveSection("quick-start")}
                        >
                          Quick Start Guide
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="flex justify-between items-center mt-16 pt-8 border-t border-white/10">
              <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Back to Home</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">Need help?</span>
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}
