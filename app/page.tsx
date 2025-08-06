'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { PromptInterface } from '@/components/prompt/prompt-interface';
import { cn } from '@/lib/utils';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handlePromptSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-blue-500/5 animate-pulse [animation-duration:8s]" />
      
      <Header />
      
      <div className="relative">
        <Sidebar onPromptSelect={handlePromptSelect} />
        
        {/* Main Content */}
        <div className={cn(
          "transition-all duration-300 pt-8 pb-24 lg:pb-8",
          "lg:ml-80" // Always account for sidebar space on desktop
        )}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Hero Section */}
              <div className="space-y-4 mb-12">
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    From prompt
                  </span>
                  <br />
                  <span className="text-foreground">
                    to production
                  </span>
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Transform your ideas into fully functional apps and websites using AI-powered development. Just describe what you want to build.
                </p>
              </div>

              {/* Prompt Interface */}
              <PromptInterface prompt={prompt} onPromptChange={setPrompt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}