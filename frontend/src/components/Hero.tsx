import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './ui/Button';

interface Slide {
  id: number;
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  image: string;
  accent: string;
  tag: string;
}

const slides: Slide[] = [
  {
    id: 1,
    badge: "India's AI-Integrated Entertainment House",
    titleLine1: 'A Complete Audio Video',
    titleLine2: 'Solution.',
    description: 'High-end photography, cinematic films, and studio music production. Powered by Artificial Intelligence.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=85',
    accent: '#00E5FF',
    tag: 'PRODUCTION HOUSE',
  },
  {
    id: 2,
    badge: 'Cinematography & Visual Arts',
    titleLine1: 'Stories Made',
    titleLine2: 'Timeless.',
    description: 'Ultra 4K cinematic wedding films, high-concept fashion shoots, music videos, and TV commercials.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=85',
    accent: '#FFB800',
    tag: 'CINEMA & EDITORIAL',
  },
  {
    id: 3,
    badge: 'Studio Sound & Music Lab',
    titleLine1: 'Next-Gen Studio',
    titleLine2: 'Production.',
    description: 'Dolby Atmos mixing, vocal mastering, custom beats, Foley sound design, and chart-topping arrangements.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920&q=85',
    accent: '#E040FB',
    tag: 'AUDIO RECORDING',
  },
  {
    id: 4,
    badge: 'AI Smart Media & Events',
    titleLine1: 'Intelligent Event',
    titleLine2: 'Broadcasts.',
    description: 'Multi-cam 4K live streaming, instant AI face-recognition guest photo delivery, and VIP experiential media.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&q=85',
    accent: '#00E676',
    tag: 'LIVE & AI TECH',
  },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showReelModal, setShowReelModal] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section
      className="relative w-full min-h-[92vh] md:min-h-screen flex flex-col justify-end overflow-hidden bg-[#000000] pt-24 pb-14 md:pb-20 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. CINEMATIC BACKGROUND SLIDER (CROSSFADE) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.48, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slide.image}
              alt={slide.titleLine1}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layer Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/85 via-[#000000]/45 to-[#000000]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/95 via-[#000000]/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* 2. HERO MAIN CONTENT */}
      <div className="satyam-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          
          {/* LEFT HERO TEXT & CTA (8 COLS ON DESKTOP) */}
          <div className="lg:col-span-8 space-y-6 md:space-y-7">
            
            {/* Tagline Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${slide.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-subtle text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em]"
                style={{ color: slide.accent }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{slide.badge}</span>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Headline with Proportional Sizing */}
            <div className="space-y-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`headline-${slide.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-black text-white tracking-tight leading-[1.08]">
                    {slide.titleLine1}{' '}
                    <span
                      className="italic font-extrabold transition-colors duration-500"
                      style={{ color: slide.accent }}
                    >
                      {slide.titleLine2}
                    </span>
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Supporting Copy */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${slide.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="text-sm sm:text-base md:text-lg text-white/75 max-w-xl font-normal leading-relaxed"
              >
                {slide.description}
              </motion.p>
            </AnimatePresence>

            {/* Primary CTA & Carousel Navigators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
              <Link to="/booking">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Book Now
                </Button>
              </Link>

              {/* Carousel Controls (Arrows + Counter) */}
              <div className="flex items-center gap-3 glass-subtle px-3 py-1.5 rounded-xl border border-white/10">
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-[11px] font-mono font-bold tracking-widest text-white/80">
                  <span className="text-white">0{slide.id}</span>
                  <span className="text-white/30 mx-1">/</span>
                  <span className="text-white/40">0{slides.length}</span>
                </span>

                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slide Indicators / Dots */}
              <div className="hidden sm:flex items-center gap-1.5">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-400 ${
                      currentSlide === idx
                        ? 'w-7 bg-[#00E5FF]'
                        : 'w-2 bg-white/20 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT FLOATING GLASS MEDIA CARD (4 COLS ON DESKTOP) */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.3, 1] }}
              className="w-full max-w-sm glass-strong rounded-3xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/20 relative group hover:border-white/35 transition-all duration-500"
            >
              {/* Media Thumbnail with Play Overlay */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-neutral-900">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"
                  alt="RRE Showreel Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Small Circular Glass Play Button */}
                <button
                  onClick={() => setShowReelModal(true)}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full glass-floating flex items-center justify-center text-white hover:scale-110 hover:border-[#00E5FF] transition-all duration-300 shadow-2xl group/play"
                  aria-label="Play RRE Showreel"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-white text-white group-hover/play:text-[#00E5FF] transition-colors" />
                </button>
              </div>

              {/* Card Meta Footer */}
              <div className="flex items-center justify-between px-1">
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-[#00E5FF]">
                    2026 Production Reel
                  </p>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">
                    RRE Studio Showcase
                  </p>
                </div>
                <button
                  onClick={() => setShowReelModal(true)}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
                >
                  Watch Reel →
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Showreel Modal Dialog */}
      {showReelModal && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8">
          <div className="relative w-full max-w-4xl glass-strong rounded-3xl p-4 sm:p-8 border border-white/20">
            <button
              onClick={() => setShowReelModal(false)}
              className="absolute top-4 right-4 p-3 rounded-full glass-subtle text-white hover:rotate-90 transition-transform"
              aria-label="Close Showreel Modal"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="RRE Showreel"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
