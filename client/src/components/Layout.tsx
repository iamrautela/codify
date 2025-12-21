import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'My Projects' },
    { path: '/community', label: 'Community' },
    { path: '/pricing', label: 'Pricing' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Responsive Navigation */}
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-slate-800">
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-xl sm:text-2xl">
              <svg
                width="32"
                height="32"
                viewBox="0 0 29 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 sm:w-10 sm:h-10"
              >
                <path
                  d="M8.75 11.2991L15.5 15.1839L22.25 11.2991M8.75 34.5783V26.8236L2 22.9387M29 22.9387L22.25 26.8236V34.5783M2.405 15.4081L15.5 22.9536L28.595 15.4081M15.5 38V22.9387M29 28.9154V16.962C28.9995 16.4379 28.8606 15.9233 28.5973 15.4696C28.334 15.0159 27.9556 14.6391 27.5 14.3771L17 8.40036C16.5439 8.13808 16.0266 8 15.5 8C14.9734 8 14.4561 8.13808 14 8.40036L3.5 14.3771C3.04439 14.6391 2.66597 15.0159 2.40269 15.4696C2.13941 15.9233 2.00054 16.4379 2 16.962V28.9154C2.00054 29.4395 2.13941 29.9541 2.40269 30.4078C2.66597 30.8615 3.04439 31.2383 3.5 31.5003L14 37.477C14.4561 37.7393 14.9734 37.8774 15.5 37.8774C16.0266 37.8774 16.5439 37.7393 17 37.477L27.5 31.5003C27.9556 31.2383 28.334 30.8615 28.5973 30.4078C28.8606 29.9541 28.9995 29.4395 29 28.9154Z"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hidden sm:inline">Codify</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 sm:px-4 py-2 rounded-md text-sm lg:text-base transition-colors ${
                    isActive(item.path)
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button className="px-4 sm:px-6 py-2 border border-indigo-600 rounded-md text-sm lg:text-base hover:bg-indigo-600/10 transition">
                Sign in
              </button>
              <button className="px-4 sm:px-6 py-2 bg-indigo-600 rounded-md text-sm lg:text-base hover:bg-indigo-700 transition">
                Get started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-slate-800 rounded-md transition"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-slate-800 bg-black/95 backdrop-blur-sm">
              <div className="flex flex-col py-4 px-0">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-3 text-sm rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 mt-4 px-4">
                  <button className="w-full px-4 py-3 border border-indigo-600 rounded-md text-sm hover:bg-indigo-600/10 transition">
                    Sign in
                  </button>
                  <button className="w-full px-4 py-3 bg-indigo-600 rounded-md text-sm hover:bg-indigo-700 transition">
                    Get started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Responsive Footer */}
      <footer className="bg-black border-t border-slate-800 mt-12 md:mt-20">
        <div className="container-responsive section-responsive">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6">
            {/* Brand */}
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <h3 className="font-bold text-lg mb-4">Codify</h3>
              <p className="text-sm text-slate-400">
                Turn your ideas into beautiful, responsive websites instantly.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-base mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-slate-400 hover:text-white transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-slate-400 hover:text-white transition">
                    Pricing
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>

            {/* Community Links */}
            <div>
              <h4 className="font-semibold text-base mb-4">Community</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/community" className="text-slate-400 hover:text-white transition">
                    Forum
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-base mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-slate-400">
              © 2025 Codify. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition">
                Privacy
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                Terms
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
