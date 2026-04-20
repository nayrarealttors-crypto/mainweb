import React from 'react';

const INSTAGRAM_URL = 'https://www.instagram.com/nayrarealttors?igsh=MWNwcDZvaGNmeGs1dg==';

export default function Footer({ onContactClick }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const linkStyle = {
    color: 'rgba(255,255,255,0.65)',
    textDecoration: 'none',
    fontSize: 13,
    lineHeight: '2.2',
    cursor: 'pointer',
    transition: 'color 0.15s',
    display: 'block',
  };

  const hoverIn  = (e) => (e.target.style.color = '#fff');
  const hoverOut = (e) => (e.target.style.color = 'rgba(255,255,255,0.65)');

  return (
    <footer style={{ background: '#1a3a2e' }}>
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/firmlogo.png"
              alt="Nayra Realttors"
              className="h-10 w-auto object-contain flex-shrink-0"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <p className="text-[13px] leading-[1.85] mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Building dreams and delivering homes across Bengaluru since 2010.
            Quality. Trust. Excellence.
          </p>
          {/* Instagram link */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[12px]"
            style={{ color: '#d4a843', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#d4a843')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @nayrarealttors
          </a>
        </div>

        {/* Quick links */}
        <div>
          <p className="text-white font-medium text-[13px] uppercase tracking-widest mb-4">
            Quick Links
          </p>
          <nav className="flex flex-col">
            <span style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut} onClick={() => scrollTo('about')}>About Us</span>
            <span style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut} onClick={() => scrollTo('contact')}>Contact</span>
            <span style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut} onClick={() => scrollTo('upcoming')}>Upcoming Projects</span>
            <span style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut} onClick={onContactClick}>Get Enquiry</span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
            >
              Instagram
            </a>
          </nav>
        </div>

        {/* Contact info — real details */}
        <div>
          <p className="text-white font-medium text-[13px] uppercase tracking-widest mb-4">
            Contact Info
          </p>
          <div className="flex flex-col gap-3 text-[13px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
            <a
              href="tel:+918065489910"
              className="flex items-start gap-2"
              style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
            >
              <span className="mt-0.5">📞</span>
              <span>+91 80 6548 9910</span>
            </a>
            {/* Instagram replaces mobile number */}
            <a
              href="https://www.instagram.com/nayrarealttors?igsh=MWNwcDZvaGNmeGs1dg=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2"
              style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginTop: 2, flexShrink: 0 }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@Nayrarealttors</span>
            </a>
            <a
              href="mailto:Info@nayrarealttors.com"
              className="flex items-start gap-2"
              style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
            >
              <span className="mt-0.5">✉</span>
              <span>Info@nayrarealttors.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom bar */}
      <div
        className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px]"
        style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
      >
        <p>© {new Date().getFullYear()} Nayra Realttors. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" style={{ ...linkStyle, fontSize: 12 }} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>Privacy Policy</a>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <a href="#" style={{ ...linkStyle, fontSize: 12 }} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}
