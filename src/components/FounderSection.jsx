import React from 'react';
import { motion } from 'framer-motion';

export default function FounderSection() {
  return (
    <section
      className="py-12 md:py-16 px-4 md:px-6"
      style={{ background: '#e8f5ee', borderTop: '1px solid #c8ddd0' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile: image on top centered | Desktop: image on right */}
          <div className="flex justify-center md:hidden">
            <div
              style={{
                width: '100%',
                maxWidth: 320,
                height: 400,
                borderRadius: 14,
                overflow: 'hidden',
                border: '3px solid #2d6a4f',
                boxShadow: '0 4px 20px rgba(26,58,46,0.18)',
              }}
            >
              <img
                src="/founder.jpeg"
                alt="Mr. Mayank Rawat — Founder & Chairman"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.style.background = '#1a3a2e';
                  e.currentTarget.parentElement.style.display = 'flex';
                  e.currentTarget.parentElement.style.alignItems = 'center';
                  e.currentTarget.parentElement.style.justifyContent = 'center';
                  e.currentTarget.parentElement.innerHTML =
                    '<span style="color:#fff;font-size:28px;font-weight:600;">MR</span>';
                }}
              />
            </div>
          </div>

          {/* Text */}
          <div className="text-center md:text-left min-w-0">
            <h2
              className="font-semibold leading-tight text-3xl md:text-[56px]"
              style={{ color: '#1a3a2e' }}
            >
              Mr. Mayank Rawat
            </h2>
            <p className="mt-2 text-lg md:text-[28px]" style={{ color: '#2d6a4f' }}>
              Founder &amp; Chairman
            </p>
          </div>

          {/* Desktop only: image on right */}
          <div className="hidden md:flex flex-shrink-0">
            <div
              style={{
                width: 350,
                height: 500,
                borderRadius: 14,
                overflow: 'hidden',
                border: '3px solid #2d6a4f',
                boxShadow: '0 4px 20px rgba(26,58,46,0.18)',
              }}
            >
              <img
                src="/founder.jpeg"
                alt="Mr. Mayank Rawat — Founder & Chairman"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.style.background = '#1a3a2e';
                  e.currentTarget.parentElement.style.display = 'flex';
                  e.currentTarget.parentElement.style.alignItems = 'center';
                  e.currentTarget.parentElement.style.justifyContent = 'center';
                  e.currentTarget.parentElement.innerHTML =
                    '<span style="color:#fff;font-size:28px;font-weight:600;">MR</span>';
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
