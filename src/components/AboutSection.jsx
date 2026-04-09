import React from 'react';
import { motion } from 'framer-motion';
import ChipStrip from './ChipStrip.jsx';

export default function AboutSection({ onContactClick }) {
  return (
    <section
      id="about"
      className="py-14 md:py-20 px-4 md:px-6 overflow-hidden"
      style={{ background: '#fdfaf5' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">

          {/* Left: content */}
          <motion.div
            className="flex-1 min-w-0 w-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <p className="eyebrow mb-3">About Us</p>
            <h2
              className="text-[26px] md:text-4xl font-medium leading-tight mb-5"
              style={{ color: '#1a3a2e' }}
            >
              Building Dreams,<br />Delivering Homes<br />
              <span style={{ color: '#2d6a4f' }}>Since 2010</span>
            </h2>
            <p style={{ fontWeight: 'bold', fontSize: '20px' }}>
              Nayra Realtors is a trusted real estate consultancy with over 16 years of experience, located in Sector 65,
               Gurgaon near M3M Route 65. Built on trust and strong relationships with 500+ satisfied clients, we specialize in fresh projects, residential and commercial properties, resale, and rental solutions. Our team provides expert property consultation, verified listings, and seamless transactions, making us a reliable choice for real estate investment in Gurgaon.</p>

            {/* Mini chip strip */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid #c8ddd0', maxWidth: '100%' }}
            >
              {/* <ChipStrip mintBg /> */}
            </div>
          </motion.div>

          {/* Right: CTA — on mobile sits below content, centred */}
          <motion.div
            className="w-full lg:w-auto flex flex-row lg:flex-col items-center justify-center lg:items-start gap-4 lg:gap-6 lg:pt-16 lg:flex-shrink-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
          >
            {/* Horizontal divider on mobile, vertical on desktop */}
            <div
              className="lg:hidden h-px w-full"
              style={{ background: '#c8ddd0' }}
            />
            <div
              className="hidden lg:block w-px self-stretch"
              style={{ background: '#c8ddd0', marginRight: '2.5rem' }}
            />

            <div className="flex flex-col items-center gap-3 lg:pl-10">
              <button
                onClick={onContactClick}
                className="btn-pill px-7 py-3 text-[14px] font-medium text-white whitespace-nowrap"
                style={{ background: '#2d6a4f' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#3a8060')}
                onMouseLeave={e => (e.currentTarget.style.background = '#2d6a4f')}
              >
                Contact Us
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
