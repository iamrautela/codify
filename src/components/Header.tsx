
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, User, Settings, CreditCard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "./AuthModal";
import UserMenu from "./UserMenu";

const Header = () => {
  const { user, loading } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 glass">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-codify-500 to-electric-500 flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">Codify</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#docs" className="text-sm font-medium hover:text-primary transition-colors">
              Docs
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Credits indicator */}
            <Badge variant="secondary" className="glass hidden sm:flex items-center gap-2">
              <CreditCard className="h-3 w-3" />
              <span className="text-xs">100 credits</span>
            </Badge>

            {/* User menu */}
            {user ? (
              <UserMenu />
            ) : (
              <AuthModal>
                <Button variant="ghost" size="sm" className="glass border-white/10">
                  <User className="h-4 w-4 mr-2" />
                  {loading ? "Loading..." : "Sign In"}
                </Button>
              </AuthModal>
            )}

            <Button variant="ghost" size="icon" className="glass border-white/10">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
