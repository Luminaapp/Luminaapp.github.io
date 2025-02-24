import { useEffect, useRef, useState } from 'react';

function Home() {
  const screenshotsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
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
                className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-primary-300 text-white font-rubik-medium rounded-lg hover:opacity-90 transition-opacity gap-2"
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
                    src={import.meta.env.BASE_URL + 'your-mockup.png'}
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
          {/* Add your features content here */}
        </div>
      </div>

      {/* Screenshots Section */}
      <div id="screenshots" className="bg-[#171922] scroll-mt-16 opacity-0 animate-fade-in-up overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 py-24">
          <h2 className="text-4xl font-rubik-bold text-white text-center mb-12">
            Screenshots
          </h2>
          
          {/* Screenshots carousel */}
          <div 
            className="relative"
            onMouseEnter={() => setIsUserInteracting(true)}
            onMouseLeave={() => setIsUserInteracting(false)}
          >
            {/* Phones Container */}
            <div className="flex justify-center items-center overflow-hidden">
              <div 
                className="flex gap-8 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(calc(${-currentIndex * (320 + 32)}px + 50% - 160px))`, // 320px is phone width, 32px is gap, 160px is half phone width
                }}
              >
                {screenshots.map((screenshot, index) => {
                  const position = index - currentIndex;
                  return (
                    <div 
                      key={index}
                      className={`
                        w-[280px] h-[567px] sm:w-[320px] sm:h-[650px]
                        transition-all duration-500 ease-in-out
                        ${Math.abs(position) <= 2 ? 'opacity-100' : 'opacity-0'}
                        transform
                        ${position === 0 ? 'scale-100 z-20' : 'scale-75 z-10'}
                      `}
                    >
                      <div className="w-full h-full rounded-[2rem] sm:rounded-[3rem] bg-black-500/30 overflow-hidden">
                        <img
                          src={import.meta.env.BASE_URL + screenshot}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation buttons */}
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

            {/* Pagination dots */}
            <div 
              className="flex justify-center gap-3 mt-8 flex-wrap"
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
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentIndex === index ? 'bg-primary-300' : 'bg-black-100'
                  }`}
                  aria-label={`Go to screenshot ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-[#171922] scroll-mt-16 opacity-0 animate-fade-in-up">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 py-24">
          <h2 className="text-4xl font-rubik-bold text-white text-center mb-8">
            Contact
          </h2>
          <div className="text-center">
            <p className="text-xl text-black-100 font-rubik-medium mb-4">
              Contact the Developer
            </p>
            <a 
              href="mailto:lumminapp.official@gmail.com"
              className="text-primary-300 font-rubik-medium hover:underline"
            >
              lumminapp.official@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 