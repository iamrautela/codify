import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';

// Get Google OAuth Client ID from environment variable
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// Component to show configuration error
const ConfigError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 max-w-2xl">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h1 className="text-3xl font-bold text-white">Codify</h1>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-white text-center mb-4">
          Configuration Required
        </h2>
        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mb-4">
          <p className="text-yellow-200 text-sm mb-2">
            <strong>Google OAuth Client ID is not configured.</strong>
          </p>
          <p className="text-yellow-200/80 text-sm mb-4">
            Please set up your Google OAuth credentials to use authentication.
          </p>
          <div className="bg-black/30 rounded p-3 mb-4">
            <p className="text-white text-xs font-mono mb-2">Create <code className="bg-black/50 px-1 py-0.5 rounded">frontend/.env</code> file with:</p>
            <code className="text-green-300 text-xs block">
              VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
            </code>
          </div>
          <p className="text-yellow-200/80 text-xs">
            See <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a> to create OAuth credentials.
          </p>
        </div>
        <p className="text-gray-300 text-sm text-center">
          After configuring, restart the development server.
        </p>
      </div>
    </div>
  );
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/dashboard" replace /> : <Signup />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  // Check if Google Client ID is configured
  if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID.trim() === '') {
    return <ConfigError />;
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
