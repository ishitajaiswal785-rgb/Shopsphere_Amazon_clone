import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { homeHeroBanners } from '../data/categories';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % homeHeroBanners.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + homeHeroBanners.length) % homeHeroBanners.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % homeHeroBanners.length);
  };

  const activeBanner = homeHeroBanners[currentSlide];

  return (
    <div 
      className="relative w-full overflow-hidden bg-[#131921] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Content */}
      <div className={`w-full min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] bg-gradient-to-r ${activeBanner.bgGradient} flex items-center relative transition-all duration-700`}>
        
        {/* Soft Amazon-style bottom fade to blend smoothly into page content */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f7fafa] via-[#f7fafa]/60 to-transparent pointer-events-none z-10" />

        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-8 w-full flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Text Content */}
          <div className="max-w-xl text-left space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#fe9800] text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeBanner.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {activeBanner.title}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-200 font-medium">
              {activeBanner.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">
              {activeBanner.description}
            </p>

            <div className="pt-2">
              <Link
                to={`/products?category=${activeBanner.categorySlug}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-bold text-xs sm:text-sm rounded-md shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{activeBanner.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="relative w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-80 rounded-2xl p-4 flex items-center justify-center">
              <img
                src={activeBanner.image}
                alt={activeBanner.title}
                className="max-h-full max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-16 sm:w-12 sm:h-24 bg-black/20 hover:bg-black/50 text-white rounded flex items-center justify-center backdrop-blur-xs transition-colors"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-16 sm:w-12 sm:h-24 bg-black/20 hover:bg-black/50 text-white rounded flex items-center justify-center backdrop-blur-xs transition-colors"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {homeHeroBanners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index ? 'w-8 bg-[#fe9800]' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
