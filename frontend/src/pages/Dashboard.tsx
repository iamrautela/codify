import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreate = () => {
    if (description.trim()) {
      // TODO: Implement AI website creation
      console.log('Creating website with description:', description);
      alert('Website creation feature coming soon!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-violet-600/30 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h1 className="text-2xl font-bold text-white">Codify</h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white/80 hover:text-white transition-colors">Home</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">My Projects</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">Community</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-3">
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-white/20"
                />
              )}
              <span className="text-white hidden lg:block text-sm">{user.name}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all hover:scale-105 active:scale-95 text-sm font-medium shadow-lg"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6">
        {/* New Banner */}
        <div className="mb-8 flex items-center space-x-2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
          <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">NEW</span>
          <span className="text-white/90 text-sm">Try 30 days free trial option</span>
          <span className="text-white/60 text-sm">→</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-5xl md:text-7xl font-bold text-white text-center mb-6 max-w-4xl leading-tight">
          Turn thoughts into websites instantly, with AI.
        </h2>

        {/* Sub-headline */}
        <p className="text-xl text-white/80 text-center mb-12 max-w-2xl">
          Create, customize and publish website faster than ever with our AI Site Builder.
        </p>

        {/* Input Section */}
        <div className="w-full max-w-3xl">
          <div className="relative bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-2 shadow-2xl">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your presentation in details"
              className="w-full bg-transparent text-white placeholder-white/50 px-6 py-5 text-lg outline-none pr-32"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCreate();
                }
              }}
            />
            <button
              onClick={handleCreate}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              Create with AI
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

