
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, Loader2, Lightbulb, Cpu } from "lucide-react";

interface PromptInterfaceProps {
  onCodeGenerated: (code: string) => void;
}

const PromptInterface = ({ onCodeGenerated }: PromptInterfaceProps) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const suggestions = [
    "Build a modern blog with dark mode toggle",
    "Create a task management app with drag & drop",
    "Design a landing page for a SaaS product",
    "Build a weather dashboard with charts",
    "Create a portfolio website with animations"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockCode = `// Generated from: "${prompt}"
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Your AI Generated App
        </h1>
        <p className="text-gray-600 text-center">
          Based on your prompt: "${prompt.slice(0, 50)}..."
        </p>
        <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;`;
      
      onCodeGenerated(mockCode);
      setIsGenerating(false);
    }, 3000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <div className="space-y-6">
      {/* Prompt Input */}
      <Card className="glass p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Describe Your App</h3>
          </div>
          
          <Textarea
            placeholder="Describe the app you want to build... (e.g., 'Build a modern blog with dark mode toggle and markdown support')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px] resize-none glass border-white/20 focus:border-primary/50"
          />
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              {prompt.length}/500 characters
            </div>
            
            <Button 
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="bg-gradient-to-r from-codify-500 to-electric-500 hover:from-codify-600 hover:to-electric-600 text-white"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Generate App
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Suggestions */}
      <Card className="glass p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-400" />
            <h4 className="font-medium text-sm">Quick Ideas</h4>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="glass cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Generation Status */}
      {isGenerating && (
        <Card className="glass p-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-codify-500 to-electric-500 flex items-center justify-center animate-pulse">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium">AI is working on your app...</h4>
              <div className="text-sm text-muted-foreground mt-1">
                Analyzing requirements • Generating components • Optimizing code
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PromptInterface;
