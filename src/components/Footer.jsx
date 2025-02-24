import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  const handleLegalClick = (path) => (e) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-black-500 text-black-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
            <a 
              href="/terms"
              className="text-black-100 hover:text-white transition-colors font-rubik"
              onClick={handleLegalClick('/terms')}
            >
              Terms of Service
            </a>
            <a 
              href="/privacy"
              className="text-black-100 hover:text-white transition-colors font-rubik"
              onClick={handleLegalClick('/privacy')}
            >
              Privacy Policy
            </a>
          </div>
          <p className="font-rubik">© {new Date().getFullYear()} Joe Brennan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 