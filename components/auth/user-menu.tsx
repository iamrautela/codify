'use client';

import { useState } from 'react';
import { User, LogOut, Settings, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AuthDialog } from './auth-dialog';
import { useSupabaseAuth } from '@/hooks/use-supabase-auth';

export function UserMenu() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { user, profile, isAuthenticated, isGuest, logout } = useSupabaseAuth();

  if (!isAuthenticated && !isGuest) {
    return (
      <>
        <Button
          onClick={() => setShowAuthDialog(true)}
          variant="default"
          size="sm"
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
        >
          Sign In
        </Button>
        <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-lg">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'Guest'} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
              {isGuest ? 'G' : profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {isAuthenticated && (user || profile) ? (
          <>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{profile?.full_name || 'User'}</p>
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {user?.email || profile?.email}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
          </>
        ) : (
          <>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">Guest User</p>
                <p className="text-sm text-muted-foreground">
                  Limited features available
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <History className="mr-2 h-4 w-4" />
          History
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {isGuest ? (
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => setShowAuthDialog(true)}
          >
            <User className="mr-2 h-4 w-4" />
            Sign In
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="cursor-pointer" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </DropdownMenu>
  );
}