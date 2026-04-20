import React, { useState, useEffect } from 'react';

export default function Header({ onContactClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-sm' : ''
      }`}
      style={{ borderBottom: '1px solid #c8ddd0' }}
    >
      <div
        className="max-w-7xl mx-auto h-14 md:h-16 flex items-center justify-between"
        style={{ paddingLeft: 16, paddingRight: 16 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 select-none flex-shrink-0">
          <img
            src="/firmlogo.png"
            alt="Nayra Realttors"
            className="h-9 md:h-11 w-auto object-contain flex-shrink-0"
          />
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-3 md:gap-6 flex-shrink-0">
          <button
            onClick={() => scrollTo('about')}
            className="text-[13px] md:text-[14px] font-medium transition-colors duration-150 whitespace-nowrap"
            style={{ color: '#1a3a2e' }}
            onMouseEnter={e => (e.target.style.color = '#2d6a4f')}
            onMouseLeave={e => (e.target.style.color = '#1a3a2e')}
          >
            About Us
          </button>
          <button
            onClick={onContactClick}
            className="btn-pill px-4 md:px-5 py-2 text-[12px] md:text-[13px] font-medium text-white whitespace-nowrap"
            style={{ background: '#2d6a4f' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#3a8060')}
            onMouseLeave={e => (e.currentTarget.style.background = '#2d6a4f')}
          >
            Contact Us
          </button>
        </nav>
      </div>
    </header>
  );
}
