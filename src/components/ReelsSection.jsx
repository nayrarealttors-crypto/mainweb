import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const INSTAGRAM_URL = 'https://www.instagram.com/nayrarealttors?igsh=MWNwcDZvaGNmeGs1dg==';

const REELS = [
  {
    src:   '/IMG_8823.MP4',
    // label: 'Shobha Grandeur Tour',
    bg:    'linear-gradient(160deg,#0d2118,#2d6a4f)',
  },
  {
    src:   '/IMG_8824.MP4',
    // label: 'Shobha City Walkthrough',
    bg:    'linear-gradient(160deg,#0a1f1a,#1a3a2e)',
  },
  {
    src:   '/IMG_8825.MP4',
    // label: 'Shobha Meadows Preview',
    bg:    'linear-gradient(160deg,#141f14,#2a5232)',
  },
  {
    src:   '/IMG_8826.MP4',
    // label: 'Shobha Invest Park',
    bg:    'linear-gradient(160deg,#1a1408,#6b5416)',
  },
];

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

// Speaker ON icon
function SpeakerOn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    </svg>
  );
}

// Speaker OFF (muted) icon
function SpeakerOff() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
    </svg>
  );
}

// Single reel card — video autoplay, muted by default, speaker button toggles sound
function ReelCard({ reel, index }) {
  const videoRef  = useRef(null);
  const [muted, setMuted] = useState(true);

  // Autoplay as soon as the component mounts
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted  = true;
    v.loop   = true;
    v.play().catch(() => {}); // browsers may block; silently ignore
  }, []);

  const toggleSound = (e) => {
    e.stopPropagation(); // don't bubble to instagram link
    const v = videoRef.current;
    if (!v) return;
    const nextMuted = !muted;
    v.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted) v.play().catch(() => {});
  };

  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="relative overflow-hidden rounded-xl md:rounded-2xl"
      style={{ aspectRatio: '9/16', background: reel.bg }}
    >
      {/* ── Video ── */}
      <video
        ref={videoRef}
        src={reel.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ pointerEvents: 'none' }}
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 55%)' }}
      />

      {/* Instagram link — covers whole card except the speaker button */}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
        style={{ zIndex: 1 }}
        aria-label={`Watch ${reel.label} on Instagram`}
      />

      {/* Label at bottom */}
      <p
        className="absolute left-0 right-0 text-center text-white font-medium px-2"
        style={{ bottom: 36, fontSize: 11, zIndex: 2, textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
      >
        {reel.label}
      </p>

      {/* ── Speaker button — bottom centre, above label ── */}
      <button
        onClick={toggleSound}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="absolute flex items-center justify-center rounded-full transition-all duration-150"
        style={{
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          width: 28,
          height: 28,
          background: muted ? 'rgba(255,255,255,0.18)' : 'rgba(45,106,79,0.85)',
          color: '#fff',
          backdropFilter: 'blur(6px)',
          border: muted ? '1px solid rgba(255,255,255,0.25)' : '1px solid #3a8060',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = muted ? 'rgba(255,255,255,0.32)' : 'rgba(45,106,79,1)')}
        onMouseLeave={e => (e.currentTarget.style.background = muted ? 'rgba(255,255,255,0.18)' : 'rgba(45,106,79,0.85)')}
      >
        {muted ? <SpeakerOff /> : <SpeakerOn />}
      </button>
    </motion.div>
  );
}

export default function ReelsSection() {
  return (
    <section className="py-14 md:py-20 px-4 md:px-6" style={{ background: '#fdfaf5' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow mb-2">Our Reels</p>
            <h2 className="text-2xl md:text-3xl font-medium" style={{ color: '#1a3a2e' }}>
              See Our Properties in Action
            </h2>
          </div>
          <div className="flex flex-col sm:items-end gap-1">
            <p className="text-[11px]" style={{ color: '#7a8a7e' }}>Follow us for more</p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white flex-shrink-0"
              style={{ background: '#e1306c' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#c0254e')}
              onMouseLeave={e => (e.currentTarget.style.background = '#e1306c')}
            >
              <InstagramIcon />
              Follow on Instagram
            </a>
          </div>
        </div>

        {/* Reel cards grid — 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {REELS.map((reel, i) => (
            <ReelCard key={i} reel={reel} index={i} />
          ))}
        </div>

        <p className="text-center text-[11px] mt-5" style={{ color: '#7a8a7e' }}>
          Videos play automatically without sound · tap 🔊 to unmute
        </p>
      </div>
    </section>
  );
}
