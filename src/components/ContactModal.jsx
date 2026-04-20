import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE from '../apiBase';

const PROJECT_TYPES = [
  'Fresh Projects',
  'Commercial',
  'Residential',
  'Rentals',
  'Plots',
  'Investments',
];

const INITIAL = { name: '', project_type: '', project_name: '' };

export default function ContactModal({ open, onClose }) {
  const [form,    setForm]    = useState(INITIAL);
  const [status,  setStatus]  = useState('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (open) { setForm(INITIAL); setStatus('idle'); setMessage(''); }
  }, [open]);

  // Close on Escape + lock body scroll while open
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, open]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setMessage('Please enter your full name.'); setStatus('error'); return; }
    setStatus('loading');
    try {
      const res = await fetch(`${API_BASE}/api/enquiries`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:         form.name,
          project_type: form.project_type,
          project_name: form.project_name,
          source:       'contact_button',
        }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      setMessage('Thank you! We will reach out to you shortly.');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const inputCls   = 'w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all duration-150';
  const inputStyle = { background: '#fff', border: '1px solid #c8ddd0', color: '#1a3a2e' };
  const focusIn    = (e) => (e.target.style.borderColor = '#2d6a4f');
  const focusOut   = (e) => (e.target.style.borderColor = '#c8ddd0');

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="contact-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 modal-backdrop"
            style={{ zIndex: 60 }}
            onClick={onClose}
          />

          {/* ── Flex centering wrapper ── */}
          <div
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 61, padding: '16px' }}
            onClick={onClose}
          >
            <motion.div
              key="contact-card"
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{ opacity: 0,    scale: 0.93, y: 20 }}
              transition={{ duration: 0.26, ease: 'easeOut' }}
              className="w-full bg-white rounded-2xl shadow-2xl relative"
              style={{
                maxWidth: 448,
                maxHeight: 'calc(100dvh - 32px)',
                overflowY: 'auto',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xl transition-colors leading-none"
                  style={{ color: '#7a8a7e', background: '#f0f0f0' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#e0e0e0')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#f0f0f0')}
                  aria-label="Close"
                >
                  ×
                </button>

                <p className="eyebrow mb-2">Contact Us</p>
                <h3 className="text-xl font-medium mb-5 pr-8" style={{ color: '#1a3a2e' }}>
                  We'd Love to Help You
                </h3>

                {status === 'success' ? (
                  <div className="text-center py-8">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-xl mx-auto mb-3"
                      style={{ background: '#2d6a4f', color: '#fff' }}
                    >
                      ✓
                    </div>
                    <p className="font-medium mb-1" style={{ color: '#1a3a2e' }}>{message}</p>
                    <button
                      onClick={onClose}
                      className="mt-4 btn-pill px-6 py-2 text-sm text-white"
                      style={{ background: '#2d6a4f' }}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      name="name" value={form.name} onChange={handleChange}
                      placeholder="Full Name *"
                      className={inputCls} style={inputStyle}
                      onFocus={focusIn} onBlur={focusOut}
                    />
                    <select
                      name="project_type" value={form.project_type} onChange={handleChange}
                      className={inputCls}
                      style={{ ...inputStyle, color: form.project_type ? '#1a3a2e' : '#7a8a7e' }}
                      onFocus={focusIn} onBlur={focusOut}
                    >
                      <option value="" disabled>Type of Project</option>
                      {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <input
                      name="project_name" value={form.project_name} onChange={handleChange}
                      placeholder="Project Name"
                      className={inputCls} style={inputStyle}
                      onFocus={focusIn} onBlur={focusOut}
                    />

                    {status === 'error' && (
                      <p className="text-[13px]" style={{ color: '#c0392b' }}>{message}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-pill py-3 text-sm font-medium text-white mt-1"
                      style={{ background: '#2d6a4f', opacity: status === 'loading' ? 0.7 : 1 }}
                      onMouseEnter={e => status !== 'loading' && (e.currentTarget.style.background = '#3a8060')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#2d6a4f')}
                    >
                      {status === 'loading' ? 'Submitting…' : 'Submit Enquiry'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
