'use client';

import { Code } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { UserMenu } from '@/components/auth/user-menu';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Code className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Codify
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}