"use client";
import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Banner() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const slides = [
    {
      number: '01',
      title: 'EXHIBITION CENTER IN BOSTON',
      description: 'Exhibition Center is the architectural of a new generation, a building that exists not only in the dimension of space, but also in the dimension of time and communication.',
      image: 'https://plus.unsplash.com/premium_photo-1669999708136-f0e17295a1e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      number: '02',
      title: 'MODERN ARCHITECTURE REDEFINED',
      description: 'A synthesis of cutting-edge design principles and sustainable innovation, creating spaces that inspire and transform the urban landscape.',
      image: 'https://plus.unsplash.com/premium_photo-1763651732449-38a1ccd2f0ae?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      number: '03',
      title: 'SUSTAINABLE INNOVATION HUB',
      description: 'Where environmental consciousness meets architectural excellence, pioneering the future of green building design and community integration.',
      image: 'https://images.unsplash.com/photo-1707095581605-047c5560d164?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-96 md:h-screen overflow-hidden text-white font-sans">
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black z-40 md:hidden transition-transform duration-500 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl">
          {['HOME', 'PROJECTS', 'ABOUT', 'CONTACT'].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-blue-400 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Left Sidebar Container */}
      <div className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-8">
        {/* Slide Number Indicator */}
        <div className="mb-8">
          <div className="text-5xl font-extralight opacity-20 transition-opacity duration-500">
            {slides[currentSlide].number}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex flex-col gap-2 mb-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentSlide ? 1 : -1);
                setCurrentSlide(idx);
              }}
              className={`w-0.5 transition-all duration-500 hover:scale-110 ${
                idx === currentSlide ? 'h-16 bg-blue-400' : 'h-3 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Social Links */}
        
      </div>

      {/* Main Content Slider */}
      <div className="relative w-full h-full">
        <div className="absolute inset-0">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 w-full">
              <div className="max-w-2xl md:ml-16">
                <div className="animate-fadeIn">
                  <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light tracking-wide mb-3 sm:mb-6 leading-tight">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-10 text-gray-300 max-w-xl">
                    {slides[currentSlide].description}
                  </p>
                  <button className="group flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-medium tracking-widest text-xs transition-all duration-300 hover:gap-3 sm:hover:gap-4">
                    LOOK MORE
                    <ChevronRight size={16} className="w-4 sm:w-[18px] transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}