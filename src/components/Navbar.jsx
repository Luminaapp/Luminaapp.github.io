import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (sectionId) => (e) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        if (sectionId) {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If already on home page, just scroll
      if (sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="bg-black-500 border-b border-dark-border fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <a 
              href="/"
              className="flex items-center"
              onClick={handleNavigation(null)}
            >
              <img 
                src={import.meta.env.BASE_URL + 'logo.png'}
                alt="Lumina Logo" 
                className="h-10 w-auto"
              />
              <span className="text-2xl font-rubik-bold text-white ml-3">
                Lumina
              </span>
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <a 
              href="#features" 
              className="text-black-100 hover:text-white font-rubik-medium transition-colors"
              onClick={handleNavigation('features')}
            >
              Features
            </a>
            <a 
              href="#screenshots" 
              className="text-black-100 hover:text-white font-rubik-medium transition-colors"
              onClick={handleNavigation('screenshots')}
            >
              Screenshots
            </a>
            <a 
              href="#contact" 
              className="text-black-100 hover:text-white font-rubik-medium transition-colors"
              onClick={handleNavigation('contact')}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 