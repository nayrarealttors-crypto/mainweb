import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PROJECT_TYPES = [
  'Fresh Projects',
  'Commercial',
  'Residential',
  'Rentals',
  'Plots',
  'Investments',
];

const INITIAL = { name: '', mobile: '', email: '', project_type: '', project_name: '' };

export default function ContactSection() {
  const [form,    setForm]    = useState(INITIAL);
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setMessage('Please enter your name.'); setStatus('error'); return; }
    setStatus('loading');
    try {
      const res = await fetch('/api/enquiries', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...form, source: 'contact_section' }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setMessage('Thank you! We will get back to you shortly.');
      setForm(INITIAL);
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const inputCls = `w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all duration-150`;
  const inputStyle = {
    background: '#fff',
    border: '1px solid #c8ddd0',
    color: '#1a3a2e',
  };

  return (
    <section id="contact" className="py-14 md:py-20 px-4 md:px-6" style={{ background: '#e8f5ee' }}>
      <div className="w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow mb-3 text-center">Get In Touch</p>
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-3" style={{ color: '#1a3a2e' }}>
            Let's Find Your Perfect Property
          </h2>
          {/* Contact details above form */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8 text-[13px]" style={{ color: '#7a8a7e' }}>
            <a href="tel:+918065489910" className="flex items-center gap-1.5" style={{ color: '#2d6a4f', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
            >
              📞 +91 80 6548 9910
            </a>
            <span className="hidden sm:block" style={{ color: '#c8ddd0' }}>|</span>
            {/* Instagram — replaces mobile number */}
            <a
              href="https://www.instagram.com/nayrarealttors?igsh=MWNwcDZvaGNmeGs1dg=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
              style={{ color: '#e1306c', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @Nayrarealttors
            </a>
            <span className="hidden sm:block" style={{ color: '#c8ddd0' }}>|</span>
            <a href="mailto:Info@nayrarealttors.com" className="flex items-center gap-1.5" style={{ color: '#2d6a4f', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
            >
              ✉ Info@nayrarealttors.com
            </a>
          </div>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4"
                style={{ background: '#2d6a4f', color: '#fff' }}
              >
                ✓
              </div>
              <p className="text-lg font-medium mb-2" style={{ color: '#1a3a2e' }}>{message}</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-sm underline"
                style={{ color: '#2d6a4f' }}
              >
                Submit another enquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name *"
                className={inputCls}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#2d6a4f')}
                onBlur={e  => (e.target.style.borderColor = '#c8ddd0')}
              />
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                type="tel"
                className={inputCls}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#2d6a4f')}
                onBlur={e  => (e.target.style.borderColor = '#c8ddd0')}
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                type="email"
                className={inputCls}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#2d6a4f')}
                onBlur={e  => (e.target.style.borderColor = '#c8ddd0')}
              />
              <select
                name="project_type"
                value={form.project_type}
                onChange={handleChange}
                className={inputCls}
                style={{ ...inputStyle, color: form.project_type ? '#1a3a2e' : '#7a8a7e' }}
                onFocus={e => (e.target.style.borderColor = '#2d6a4f')}
                onBlur={e  => (e.target.style.borderColor = '#c8ddd0')}
              >
                <option value="" disabled>Type of Project</option>
                {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <input
                name="project_name"
                value={form.project_name}
                onChange={handleChange}
                placeholder="Project Name"
                className={inputCls}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#2d6a4f')}
                onBlur={e  => (e.target.style.borderColor = '#c8ddd0')}
              />

              {status === 'error' && (
                <p className="text-sm" style={{ color: '#c0392b' }}>{message}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-pill mt-2 py-3 text-[14px] font-medium text-white w-full"
                style={{ background: '#1a3a2e', opacity: status === 'loading' ? 0.7 : 1 }}
                onMouseEnter={e => status !== 'loading' && (e.currentTarget.style.background = '#2d6a4f')}
                onMouseLeave={e => (e.currentTarget.style.background = '#1a3a2e')}
              >
                {status === 'loading' ? 'Submitting…' : 'Submit Enquiry'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
