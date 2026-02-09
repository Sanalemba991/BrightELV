"use client";
import React, { useEffect, useRef, useState } from "react";

export default function CompanyOverview() {
  const [isVisible, setIsVisible] = useState({
    title: false,
    stats: false,
    description: false,
  });

  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const createObserver = (ref: React.RefObject<HTMLElement | null>, key: string) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [key]: true }));
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
        observers.push(observer);
      }

      return observer;
    };

    const titleObserver = createObserver(titleRef, 'title');
    const statsObserver = createObserver(statsRef, 'stats');
    const descriptionObserver = createObserver(descriptionRef, 'description');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <div className="hidden sm:block w-full bg-white py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes countUp {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        
        .animate-countUp {
          animation: countUp 0.6s ease-out forwards;
        }
        
        .divider {
          transition: all 0.8s ease-out;
          transform-origin: left center;
          transform: scaleX(0);
        }
        
        .divider-animate {
          transform: scaleX(1);
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
          {/* Left Section - Stats Grid */}
          <div>
            <div
              ref={titleRef}
              className={`text-center mb-6 md:mb-8 ${isVisible.title ? 'animate-fadeInUp' : 'opacity-0'}`}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 uppercase text-center tracking-wide">
                Company Overview
              </h2>
              <div
                className={`divider mx-auto mt-2 sm:mt-3 h-[1px] w-16 sm:w-24 md:w-32 lg:w-40 bg-blue-700 ${isVisible.title ? 'divider-animate' : ''}`}
              ></div>
            </div>

            <div
              ref={statsRef}
              className={`py-6 md:py-8 mt-4 md:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 bg-indigo-950 px-4 sm:px-6 md:px-8 rounded-2xl lg:rounded-l-3xl lg:rounded-r-none ${isVisible.stats ? 'animate-fadeInLeft' : 'opacity-0'}`}
            >
              {/* Stat Card 1 - Globe */}
              <div className="bg-[#1e1f42] rounded-xl md:rounded-2xl p-4 md:p-6 border border-[#4a4b7f] text-white">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-7 md:h-7 text-[#1e1f42]"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <ellipse cx="12" cy="12" rx="4" ry="10" />
                    </svg>

                  </div>
                  <div>
                    <div className="text-base md:text-xl font-bold">
                      We Operate
                    </div>
                    <div className="text-base md:text-xl font-bold">
                      Around Global
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat Card 2 - Employees */}
              <div className="bg-[#1e1f42] rounded-xl md:rounded-2xl p-4 md:p-6 border border-[#4a4b7f] text-white">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-10 h-10 md:w-12 md:h-12"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                  </div>
                  <div>
                    <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${isVisible.stats ? 'animate-countUp' : 'opacity-0'}`}>
                      +42
                    </div>
                    <div className="text-sm md:text-lg">Employees</div>
                  </div>
                </div>
              </div>

              {/* Stat Card 3 - Projects Complete */}
              <div className="bg-[#1e1f42] rounded-xl md:rounded-2xl p-4 md:p-6 border border-[#4a4b7f] text-white">
                <div className="flex items-center gap-3 md:gap-4">
                  <svg
                    className="w-10 h-10 md:w-14 md:h-14 flex-shrink-0"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                  </svg>
                  <div>
                    <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${isVisible.stats ? 'animate-countUp' : 'opacity-0'}`}>
                      +128
                    </div>
                    <div className="text-sm md:text-lg">Projects Complete</div>
                  </div>
                </div>
              </div>

              {/* Stat Card 4 - Product Lines */}
              <div className="bg-[#1e1f42] rounded-xl md:rounded-2xl p-4 md:p-6 border border-[#4a4b7f] text-white">
                <div className="flex items-center gap-3 md:gap-4">
                  <svg className="w-10 h-10 md:w-14 md:h-14 flex-shrink-0"

                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3L7 8H10V21H14V8H17L12 3Z"
                      fill="currentColor"
                    />

                    <rect x="18" y="6" width="4" height="2" rx="1" fill="currentColor" />
                    <rect x="18" y="11" width="4" height="2" rx="1" fill="currentColor" />
                    <rect x="18" y="16" width="4" height="2" rx="1" fill="currentColor" />
                  </svg>



                  <div>
                    <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${isVisible.stats ? 'animate-countUp' : 'opacity-0'}`}>
                      +1,000
                    </div>
                    <div className="text-sm md:text-lg">Product Lines</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Company Description */}
          <div
            ref={descriptionRef}
            className={`bg-indigo-950 rounded-2xl md:rounded-3xl lg:rounded-4xl rounded-bl-2xl md:rounded-bl-3xl lg:rounded-bl-none p-6 md:p-8 lg:p-12 text-white ${isVisible.description ? 'animate-fadeInRight' : 'opacity-0'}`}
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
              WE ARE ...
            </h3>

            <p className="text-sm sm:text-base leading-relaxed mb-4 md:mb-6">
              The Global Supplier For Cutting-Edge ELV Products. Empowering
              Businesses With Innovative Technology, Seamless Integration, And
              Superior Performance. Trust Our Experienced 42+ Team Employees To
              Deliver High-Quality Solutions Tailored To Your Unique Needs.
            </p>

            <p className="text-sm sm:text-base leading-relaxed">
              Together, let's surpass your competition and achieve customer satisfaction with more than 128 completed projects. Choose BrightElv Technology LLC for excellence in surveillance, audio-visual, home automation, and building management solutions—backed by 1000+ product lines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}