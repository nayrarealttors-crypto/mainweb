import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  {
    title:    'The Westin Residences by Whiteland',
    category: 'Residential',
    sub:      'Sector 103 Dwarka expressway, Gurgaon.',
    img:      '/one.jpeg',
    bg:       'linear-gradient(135deg, #0d2118 0%, #1a3a2e 60%, #2d6a4f 100%)',
  },
  {
    title:    'Trevoc The Royal Residence',
    category: 'Residential',
    sub:      'Sector 56, Golf course road, Gurgaon.',
    img:      '/two.jpeg',
    bg:       'linear-gradient(135deg, #0a1f1a 0%, #163028 60%, #1e4d3a 100%)',
  },
  {
    title:    'Sobha Crescent',
    category: 'Residential',
    sub:      'Sector 63A, Golf Course ext rd, Gurgaon.',
    img:      '/three.jpeg',
    bg:       'linear-gradient(135deg, #141f14 0%, #1f3622 60%, #2a5232 100%)',
  },
  {
    title:    'M3M Elie Shab - Sector 111',
    category: 'Residential',
    sub:      'Sector 111, Dwarka Expressway, Gurgaon.',
    img:      '/four.jpeg',
    bg:       'linear-gradient(135deg, #181520 0%, #2a2640 60%, #3a3560 100%)',
  },
  {
    title:    'Trump Residencies Gurgaon',
    category: 'Residential',
    sub:      'Sector 69, Gurgaon.',
    img:      '/five.jpeg',
    bg:       'linear-gradient(135deg, #1a1408 0%, #3a2e0c 60%, #6b5416 100%)',
  },
];

const INTERVAL = 2800;

const variants = {
  enter:  (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0.6 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0.6 }),
};

const TRANSITION = { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] };

export default function HeroSlider({ onSlideClick }) {
  const [current,   setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered,   setHovered]   = useState(false);
  const timerRef = useRef(null);

  const navigate = useCallback((next, dir) => {
    setDirection(dir);
    setCurrent((next + SLIDES.length) % SLIDES.length);
  }, []);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent(p => (p + 1) % SLIDES.length);
    }, INTERVAL);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const handlePrev = (e) => { e.stopPropagation(); navigate(current - 1, -1); resetTimer(); };
  const handleNext = (e) => { e.stopPropagation(); navigate(current + 1,  1); resetTimer(); };
  const handleDot  = (i, e) => {
    e.stopPropagation();
    if (i !== current) navigate(i, i > current ? 1 : -1);
    resetTimer();
  };

  const slide = SLIDES[current];

  return (
    <div
      className="relative w-full overflow-hidden cursor-pointer select-none"
      style={{ height: 'clamp(320px, 58vh, 600px)' }}
      onClick={() => onSlideClick(slide)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Sliding background (image + gradient fallback) ──── */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`bg-${current}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={TRANSITION}
          className="absolute inset-0"
          style={{
            background: slide.bg,
            backgroundImage: `url(${slide.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />
      </AnimatePresence>

      {/* Fixed dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.12) 60%)',
          zIndex: 1,
        }}
      />

      {/* ── Sliding text content ─────────────────────────────── */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={`txt-${current}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={TRANSITION}
          className="absolute bottom-14 left-5 right-5 md:left-14 md:right-auto md:max-w-xl"
          style={{ zIndex: 2 }}
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
            style={{ background: '#2d6a4f', color: '#fff' }}
          >
            {slide.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold text-white leading-tight mb-2">
            {slide.title}
          </h1>
          <p className="text-xs md:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
            {slide.sub}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* ── Enquire Now hover hint ───────────────────────────── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ zIndex: 3 }}
          >
            <div
              className="bg-white rounded-2xl px-6 py-3 text-sm font-medium flex items-center gap-2 shadow-xl"
              style={{ color: '#1a3a2e' }}
            >
              <span style={{ color: '#2d6a4f', fontSize: 18 }}>✦</span>
              Enquire Now
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Arrow buttons ────────────────────────────────────── */}
      <button
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-150"
        style={{ background: 'rgba(255,255,255,0.22)', color: '#fff', backdropFilter: 'blur(6px)', zIndex: 4 }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.4)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
      >
        ←
      </button>
      <button
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-150"
        style={{ background: 'rgba(255,255,255,0.22)', color: '#fff', backdropFilter: 'blur(6px)', zIndex: 4 }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.4)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
      >
        →
      </button>

      {/* ── Dot indicators ──────────────────────────────────── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2" style={{ zIndex: 4 }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={(e) => handleDot(i, e)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300"
            style={{
              height: 7,
              width:  i === current ? 26 : 7,
              borderRadius: 4,
              background: i === current ? '#d4a843' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
