import React from 'react';
import { Brain, TrendingUp } from 'lucide-react';

const Header = ({ currentPage, onNavigate }) => {
  const isActive = (page) => currentPage === page;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => onNavigate('home')} className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-200">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Portfolio Manager
              </h1>
              <p className="text-xs text-gray-500">Smart Investment Solutions</p>
            </div>
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('home') 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('form')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('form') 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Get Started
            </button>
            <button
              onClick={() => onNavigate('portfolio')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('portfolio') 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => onNavigate('sentiment')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('sentiment') 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Sentiment
            </button>
          </nav>

          <div className="flex items-center space-x-2 md:hidden">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;