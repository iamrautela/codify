'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, History, Trash2, Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useSupabaseAuth } from '@/hooks/use-supabase-auth';
import { getUserWebsites } from '@/lib/api/website-generator';

interface SidebarProps {
  onPromptSelect: (prompt: string) => void;
}

export function Sidebar({ onPromptSelect }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [websites, setWebsites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated, isGuest } = useSupabaseAuth();

  // Load user's websites
  useEffect(() => {
    const loadWebsites = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      try {
        const data = await getUserWebsites(user.id);
        setWebsites(data || []);
      } catch (error) {
        console.error('Error loading websites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWebsites();
  }, [user?.id]);

  const clearHistory = async () => {
    // This would need to be implemented to delete all user's websites
    setWebsites([]);
  };

  const deleteWebsite = async (id: string) => {
    setWebsites(prev => prev.filter(item => item.id !== id));
  };

  const formatTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    }
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (!isAuthenticated && !isGuest) {
    return null;
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r border-border/40 transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-80"
      )}>
        <div className="flex flex-col w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/40">
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <History className="h-5 w-5 text-blue-400" />
                <span className="font-semibold">Prompt History</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8 rounded-lg"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {!collapsed && (
            <>
              {/* New Chat Button */}
              <div className="p-4">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  onClick={() => onPromptSelect('')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Chat
                </Button>
              </div>

              {/* History List */}
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-2">
                  {loading ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="h-8 w-8 mx-auto mb-2 opacity-50 animate-spin" />
                      <p className="text-sm">Loading your websites...</p>
                    </div>
                  ) : websites.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No websites yet</p>
                      <p className="text-xs mt-1">Your generated websites will appear here</p>
                    </div>
                  ) : (
                    websites.map((website) => (
                      <div
                        key={website.id}
                        className="group relative p-3 rounded-lg border border-border/40 bg-card/50 hover:bg-card cursor-pointer transition-colors"
                        onClick={() => website.prompts && onPromptSelect(website.prompts.prompt_text)}
                      >
                        <p className="text-sm font-medium line-clamp-1 mb-1">
                          {website.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {website.prompts?.prompt_text || 'No prompt available'}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {formatTime(website.created_at)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteWebsite(website.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>

              {/* Footer */}
              {websites.length > 0 && (
                <div className="p-4 border-t border-border/40">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHistory}
                    className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All Websites
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40 p-4">
          <ScrollArea className="h-32">
            <div className="flex space-x-3 pb-2">
              {websites.slice(-10).map((website) => (
                <div
                  key={website.id}
                  className="flex-shrink-0 w-48 p-2 rounded-lg border border-border/40 bg-card/50 cursor-pointer"
                  onClick={() => website.prompts && onPromptSelect(website.prompts.prompt_text)}
                >
                  <p className="text-xs font-medium line-clamp-1">{website.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                    {website.prompts?.prompt_text || 'No prompt'}
                  </p>
                  <span className="text-xs text-muted-foreground mt-1">
                    {formatTime(website.created_at)}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}