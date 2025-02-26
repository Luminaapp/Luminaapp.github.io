import { useEffect, useRef, useState } from 'react';
import { MdDescription, MdCalendarToday, MdPsychology } from "react-icons/md";

function Home() {
  const screenshotsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const screenshots = [
    'your-mockup.png',
    'your-mockup.png',
    'your-mockup.png',
    'your-mockup.png',
    'your-mockup.png',
    'your-mockup.png',
    'your-mockup.png',
    'your-mockup.png',
  ];

  useEffect(() => {
    const scrollContainer = screenshotsRef.current;
    let scrollInterval;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer) {
          if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
            scrollContainer.scrollLeft = 0;
          } else {
            scrollContainer.scrollLeft += 1;
          }
        }
      }, 20);
    };

    startAutoScroll();

    // Pause auto-scroll on hover
    scrollContainer?.addEventListener('mouseenter', () => clearInterval(scrollInterval));
    scrollContainer?.addEventListener('mouseleave', startAutoScroll);

    return () => {
      clearInterval(scrollInterval);
      scrollContainer?.removeEventListener('mouseenter', () => clearInterval(scrollInterval));
      scrollContainer?.removeEventListener('mouseleave', startAutoScroll);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (!isUserInteracting) {
      interval = setInterval(() => {
        setCurrentIndex((current) => 
          current === screenshots.length - 1 ? 0 : current + 1
        );
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isUserInteracting]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(e.touches[0].clientX);
    setIsUserInteracting(true);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
    const diff = touchStart - e.touches[0].clientX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    const diff = touchStart - touchEnd;
    const minSwipeDistance = 50; // Minimum distance for swipe

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swiped left
        setCurrentIndex(prev => prev === screenshots.length - 1 ? 0 : prev + 1);
      } else {
        // Swiped right
        setCurrentIndex(prev => prev === 0 ? screenshots.length - 1 : prev - 1);
      }
    }
    setDragOffset(0);
    setTimeout(() => setIsUserInteracting(false), 1000);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setIsUserInteracting(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = dragStart - e.clientX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    const diff = dragOffset;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        setCurrentIndex(prev => prev === screenshots.length - 1 ? 0 : prev + 1);
      } else {
        setCurrentIndex(prev => prev === 0 ? screenshots.length - 1 : prev - 1);
      }
    }
    setIsDragging(false);
    setDragOffset(0);
    setTimeout(() => setIsUserInteracting(false), 1000);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="pt-16 bg-[#1E1B2E] min-h-screen">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 min-h-[calc(100vh-4rem)] flex items-center py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 w-full">
            {/* Left side - Text content */}
            <div className="flex-1 lg:order-1 order-2 text-center lg:text-left">
              <h1 className="font-rubik-black text-4xl sm:text-5xl lg:text-6xl text-white mb-4 sm:mb-6">
                Navigate Your College Journey
              </h1>
              <p className="text-lg sm:text-xl text-black-100 font-rubik-light mb-6 sm:mb-10">
                Let us help you with your college life
              </p>
              <a
                href="#download"
                className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-primary-300 text-white font-rubik-medium rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] gap-2"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                App Store
              </a>
            </div>

            {/* Right side - Phone mockup */}
            <div className="flex-1 lg:order-2 order-1 flex justify-center mb-8 lg:mb-0">
              <div className="relative w-[280px] h-[567px] sm:w-[320px] sm:h-[650px] animate-float">
                <div className="w-full h-full rounded-[2rem] sm:rounded-[3rem] bg-black-500/30 overflow-hidden">
                  <img
                    src={`${import.meta.env.BASE_URL}your-mockup.png`}
                    alt="Lumina App Interface"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-[#171922] scroll-mt-16 opacity-0 animate-fade-in-up">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 py-24">
          <h2 className="text-4xl font-rubik-bold text-white text-center mb-12">
            Features
          </h2>
          <div className="bg-black-500/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12">
            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Syllabus Import */}
              <div className="bg-black-500/30 rounded-2xl p-6 backdrop-blur-sm hover:bg-black-500/40 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <MdDescription className="w-6 h-6 text-primary-300" />
                  </div>
                  <h3 className="text-xl font-rubik-bold text-white">Smart Syllabus Import</h3>
                </div>
                <p className="text-black-100">Skip the manual setup. Simply upload your syllabus and watch as your class schedule, assignments, and important dates are automatically organized for you.</p>
              </div>

              {/* Schedule Management */}
              <div className="bg-black-500/30 rounded-2xl p-6 backdrop-blur-sm hover:bg-black-500/40 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <MdCalendarToday className="w-6 h-6 text-primary-300" />
                  </div>
                  <h3 className="text-xl font-rubik-bold text-white">Seamless Organization</h3>
                </div>
                <p className="text-black-100">Keep track of classes, assignments, and deadlines with smart reminders. Sync everything to your favorite calendar app with one click.</p>
              </div>

              {/* AI Study Tools */}
              <div className="bg-black-500/30 rounded-2xl p-6 backdrop-blur-sm hover:bg-black-500/40 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <MdPsychology className="w-6 h-6 text-primary-300" />
                  </div>
                  <h3 className="text-xl font-rubik-bold text-white">Smart Study Assistant</h3>
                </div>
                <p className="text-black-100">Transform any course material into study guides, practice questions, or get instant help with assignments. Your personal academic assistant is always ready to help.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshots Section */}
      <div id="screenshots" className="bg-[#171922] scroll-mt-16 opacity-0 animate-fade-in-up overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 py-24">
          <h2 className="text-4xl font-rubik-bold text-white text-center mb-12">
            Screenshots
          </h2>
          <div className="bg-black-500/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12">
            {/* Screenshots carousel */}
            <div 
              className="relative px-4 sm:px-0"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {/* Phones Container */}
              <div className="flex justify-center items-center overflow-hidden">
                <div 
                  className="flex gap-4 sm:gap-8 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(calc(${-currentIndex * (window.innerWidth < 640 ? 256 : 352)}px + 50% - ${window.innerWidth < 640 ? 120 : 160}px - ${dragOffset}px))`,
                    cursor: isDragging ? 'grabbing' : 'grab'
                  }}
                >
                  {screenshots.map((screenshot, index) => {
                    const position = index - currentIndex;
                    return (
                      <div 
                        key={index}
                        className={`
                          w-[240px] h-[487px] sm:w-[320px] sm:h-[650px]
                          transition-all duration-500 ease-in-out
                          ${Math.abs(position) <= 2 ? 'opacity-100' : 'opacity-0'}
                          transform
                          ${position === 0 ? 'scale-100 z-20' : 'scale-75 z-10'}
                        `}
                      >
                        <div className="w-full h-full rounded-2xl sm:rounded-[3rem] bg-black-500/30 overflow-hidden">
                          <img
                            src={`${import.meta.env.BASE_URL}your-mockup.png`}
                            alt={`Screenshot ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation buttons - hide on very small screens */}
              <div className="hidden sm:block">
                <button 
                  onClick={() => setCurrentIndex(prev => 
                    prev === 0 ? screenshots.length - 1 : prev - 1
                  )}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-4 opacity-75 hover:opacity-100 bg-black-500/50 rounded-full"
                >
                  ←
                </button>
                <button 
                  onClick={() => setCurrentIndex(prev => 
                    prev === screenshots.length - 1 ? 0 : prev + 1
                  )}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-4 opacity-75 hover:opacity-100 bg-black-500/50 rounded-full"
                >
                  →
                </button>
              </div>

              {/* Pagination dots */}
              <div 
                className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 flex-wrap"
                onMouseEnter={() => setIsUserInteracting(true)}
                onMouseLeave={() => setIsUserInteracting(false)}
              >
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsUserInteracting(true);
                    }}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                      currentIndex === index ? 'bg-primary-300' : 'bg-black-100'
                    }`}
                    aria-label={`Go to screenshot ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-[#171922] scroll-mt-16 opacity-0 animate-fade-in-up">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 py-24">
          <h2 className="text-4xl font-rubik-bold text-white text-center mb-12">
            Contact
          </h2>
          <div className="bg-black-500/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12">
            <div className="text-center">
              <p className="text-xl text-black-100 font-rubik-medium mb-4">
                Contact the Developer
              </p>
              <a 
                href="mailto:lumminapp.official@gmail.com"
                className="text-primary-300 font-rubik-medium hover:underline inline-block mb-8"
              >
                luminaapp.official@gmail.com
              </a>
              
              <p className="text-xl text-black-100 font-rubik-medium mb-6">
                Or find us on social media
              </p>
              <div className="flex justify-center gap-8">
                <a 
                  href="https://instagram.com/luminaapp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black-100 hover:text-primary-300 transition-colors"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com/luminaapp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black-100 hover:text-primary-300 transition-colors"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://discord.gg/luminaapp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black-100 hover:text-primary-300 transition-colors"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 