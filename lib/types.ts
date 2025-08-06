export interface PromptHistory {
  id: string;
  prompt: string;
  timestamp: Date;
  response?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
}