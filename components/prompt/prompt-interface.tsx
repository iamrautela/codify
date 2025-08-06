'use client';

import { useState } from 'react';
import { Send, Sparkles, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useSupabaseAuth } from '@/hooks/use-supabase-auth';
import { generateWebsite } from '@/lib/api/website-generator';
import { WebsitePreview } from '@/components/website/website-preview';

interface PromptInterfaceProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
}

const quickStarts = [
  'Build a CRM dashboard',
  'Create a landing page',
  'Design a directory app',
  'Make a SaaS platform',
  'Build an e-commerce store',
  'Create a blog platform'
];

export function PromptInterface({ prompt, onPromptChange }: PromptInterfaceProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWebsite, setGeneratedWebsite] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated, isGuest } = useSupabaseAuth();

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedWebsite(null);

    try {
      const response = await generateWebsite({
        prompt: prompt.trim(),
        userId: user?.id
      });

      if (response.success) {
        setGeneratedWebsite({
          id: response.websiteId,
          title: response.website.title,
          description: response.website.description,
          html_content: response.website.html,
          css_content: response.website.css,
          js_content: response.website.js,
          is_public: false,
          created_at: new Date().toISOString(),
          prompts: {
            prompt_text: prompt.trim(),
            created_at: new Date().toISOString()
          }
        });
      } else {
        setError(response.error || 'Failed to generate website');
      }
    } catch (error) {
      console.error('Generation error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleQuickStart = (quickPrompt: string) => {
    onPromptChange(quickPrompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Generated Website Preview */}
      {generatedWebsite && (
        <div className="space-y-4">
          <Alert className="border-green-200 bg-green-50 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Website generated successfully! You can preview, edit, and download your website below.
            </AlertDescription>
          </Alert>
          
          <WebsitePreview 
            website={generatedWebsite}
            onEdit={(id) => console.log('Edit website:', id)}
            onDelete={(id) => {
              setGeneratedWebsite(null);
              console.log('Delete website:', id);
            }}
            onTogglePublic={(id, isPublic) => {
              setGeneratedWebsite(prev => ({ ...prev, is_public: isPublic }));
              console.log('Toggle public:', id, isPublic);
            }}
          />
        </div>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {/* Main Prompt Input */}
      <div className="relative">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Describe what you want to build... (⌘+Enter to generate)"
              className={cn(
                "min-h-[120px] resize-none rounded-xl border-border/40 bg-background/60 backdrop-blur text-lg placeholder:text-muted-foreground/60 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-200",
                "scrollbar-thin scrollbar-thumb-border/40 scrollbar-track-transparent"
              )}
              disabled={isGenerating}
            />
            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
              {prompt.trim() && (
                <div className="text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded-full">
                  ⌘+Enter
                </div>
              )}
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                size="sm"
                className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 h-10 w-10 p-0"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Buttons */}
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          <span>Quick starts</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {quickStarts.map((quickPrompt) => (
            <Button
              key={quickPrompt}
              variant="outline"
              size="sm"
              onClick={() => handleQuickStart(quickPrompt)}
              className="rounded-full border-border/40 hover:border-blue-500/50 hover:bg-blue-500/5 transition-colors"
              disabled={isGenerating}
            >
              {quickPrompt}
            </Button>
          ))}
        </div>
      </div>

      {/* Status */}
      {isGenerating && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-blue-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Generating your website... This may take 30-60 seconds.</span>
          </div>
        </div>
      )}
    </div>
  );
}