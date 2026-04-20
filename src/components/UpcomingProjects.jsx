import React from 'react';
import { motion } from 'framer-motion';

const PROJECTS = [
  {
    name:     'M3M Golfestate',
    type:     'Residential',
    location: 'Sector 65, Gurgaon',
    bg:       'linear-gradient(135deg,#1a3a2e,#2d6a4f)',
  },
  {
    name:     'Trump Towers',
    type:     'Residential',
    location: 'Sector 65, Gurgaon',
    bg:       'linear-gradient(135deg,#0a1f1a,#1a3a2e)',
  },
  {
    name:     'M3M Route 65',
    type:     'Commercial',
    location: 'Sector 65, Gurgaon',
    bg:       'linear-gradient(135deg,#1f3622,#2a5232)',
  },
];

export default function UpcomingProjects({ onEnquire }) {
  return (
    <section id="upcoming" className="py-14 md:py-20 px-4 md:px-6" style={{ background: '#fdfaf5' }}>
      <div className="max-w-7xl mx-auto">
        <p className="eyebrow mb-3">Hot deals</p>
        <h2 className="text-2xl md:text-3xl font-medium mb-8 md:mb-12" style={{ color: '#1a3a2e' }}>
          Resale Properties
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden cursor-pointer group"
              style={{ background: '#fff', border: '1px solid #2d6a4f' }}
              onClick={() => onEnquire && onEnquire(proj)}
            >
              {/* Property image area */}
              <div
                className="h-32 w-full transition-all duration-300 group-hover:h-36"
                style={{ background: proj.bg }}
              />

              {/* Card body */}
              <div className="p-5">
                <span
                  className="inline-block px-3 py-0.5 rounded-full text-[11px] font-medium mb-3"
                  style={{ background: '#d4eadb', color: '#1a3a2e' }}
                >
                  {proj.type}
                </span>
                <h3 className="text-[16px] font-medium mb-2" style={{ color: '#1a3a2e' }}>
                  {proj.name}
                </h3>
                <p className="text-[12px] mb-4" style={{ color: '#7a8a7e' }}>
                  📍 {proj.location}
                </p>

                {/* Enquire button */}
                <div
                  className="w-full py-2 rounded-xl text-[13px] font-medium text-center transition-colors duration-150"
                  style={{ background: '#e8f5ee', color: '#2d6a4f' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#d4eadb')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#e8f5ee')}
                >
                  Enquire Now →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
