import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './ui/Button';
import { API_URL } from '../config/api';

// Static fallback slides if API is unavailable
const FALLBACK_SLIDES = [
  {
    _id: '1',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=85',
    title: 'Grand Wedding & Event Production',
  },
  {
    _id: '2',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=85',
    title: 'Cinematic Films & Visual Arts',
  },
  {
    _id: '3',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920&q=85',
    title: 'Studio Recording & Music',
  },
  {
    _id: '4',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=85',
    title: 'Live Concert & Broadcast',
  },
];

interface Slide {
  _id: string;
  image: string;
  title: string;
}

const Hero: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>(FALLBACK_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Fetch slides from backend
  useEffect(() => {
    fetch(`${API_URL}/api/hero-slides`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data && data.length > 0) setSlides(data); })
      .catch(() => {}); // silently fall back to static slides
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Background auto-slide every 5 seconds
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, slides.length]);

  // Reset slide index when slides change
  useEffect(() => {
    setCurrentSlide(0);
  }, [slides.length]);

  return (
    <section
      className="relative w-full min-h-[92vh] md:min-h-screen flex flex-col justify-end overflow-hidden bg-[#000000] pt-28 pb-16 md:pb-24 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. FULL-SCREEN BACKGROUND IMAGE CAROUSEL (CROSSFADE) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={slides[currentSlide]?._id || currentSlide}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.85, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slides[currentSlide]?.image}
              alt={slides[currentSlide]?.title || 'RRE Studio'}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layer Dark Vignette Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-[#000000]/40 to-[#000000]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/95 via-[#000000]/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]" />
      </div>

      {/* 2. HERO CONTENT CONTAINER (SINGLE CLEAN SLOGAN + CTA) */}
      <div className="satyam-container relative z-10 w-full">
        <div className="max-w-3xl space-y-6 md:space-y-8">

          {/* Slogan Headline (Clean, Proportional Typography) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              A Complete Audio & Video{' '}
              <span className="italic font-extrabold text-[#00E5FF]">
                Solution
              </span>
            </h1>
          </motion.div>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base md:text-lg text-white/75 max-w-xl font-normal leading-relaxed"
          >
            A Complete Professional Photography Cinematography Studio In Dildarnagar
          </motion.p>

          {/* Primary CTA & Background Carousel Controls */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2"
          >
            <Link to="/booking">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Book Now
              </Button>
            </Link>

            {/* Subtle Carousel Controls (Arrows + Counter) */}
            <div className="flex items-center gap-2.5 glass-subtle px-3 py-1.5 rounded-xl border border-white/10">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-[11px] font-mono font-bold tracking-widest text-white/80">
                <span className="text-white">0{currentSlide + 1}</span>
                <span className="text-white/30 mx-1">/</span>
                <span className="text-white/40">0{slides.length}</span>
              </span>

              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Slide Indicators / Pill Dots */}
            <div className="hidden sm:flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    currentSlide === idx
                      ? 'w-7 bg-[#00E5FF]'
                      : 'w-2 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
