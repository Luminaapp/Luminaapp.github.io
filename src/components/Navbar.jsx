import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleNavigation = (sectionId) => (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (sectionId) {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
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
          {/* Logo */}
          <div className="flex items-center">
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

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-black-100 hover:text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-6">
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

      {/* Mobile menu */}
      <div 
        className={`
          fixed top-0 right-0 h-full w-64 bg-black-500 transform transition-transform duration-300 ease-in-out z-50
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:hidden
        `}
      >
        {/* Close button inside menu */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-md text-black-100 hover:text-white focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col pt-20 px-4">
          <a 
            href="#features" 
            className="text-black-100 hover:text-white font-rubik-medium transition-colors py-4 px-4 rounded-lg hover:bg-black-400 active:bg-black-300"
            onClick={handleNavigation('features')}
          >
            Features
          </a>
          <a 
            href="#screenshots" 
            className="text-black-100 hover:text-white font-rubik-medium transition-colors py-4 px-4 rounded-lg hover:bg-black-400 active:bg-black-300"
            onClick={handleNavigation('screenshots')}
          >
            Screenshots
          </a>
          <a 
            href="#contact" 
            className="text-black-100 hover:text-white font-rubik-medium transition-colors py-4 px-4 rounded-lg hover:bg-black-400 active:bg-black-300"
            onClick={handleNavigation('contact')}
          >
            Contact
          </a>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
}

export default Navbar; 