import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form,    setForm]    = useState({ username: '', password: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  useEffect(() => {
    if (localStorage.getItem('se_admin_token')) navigate('/admin/dashboard');
  }, [navigate]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      const res  = await fetch('/api/admin/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('se_admin_token',    data.token);
      localStorage.setItem('se_admin_username', data.username);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputCls   = 'w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all duration-150';
  const inputStyle = { background: '#fff', border: '1px solid #c8ddd0', color: '#1a3a2e' };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#e8f5ee' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg mb-3"
            style={{ background: '#2d6a4f' }}
          >
            SE
          </div>
          <h1 className="text-xl font-medium" style={{ color: '#1a3a2e' }}>Admin Portal</h1>
          <p className="text-[13px] mt-1" style={{ color: '#7a8a7e' }}>Shobha Estates</p>
        </div>

        <div
          className="bg-white rounded-2xl shadow-sm p-8"
          style={{ border: '1px solid #c8ddd0' }}
        >
          <h2 className="text-[15px] font-medium mb-6" style={{ color: '#1a3a2e' }}>Sign in to Dashboard</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              autoComplete="username"
              className={inputCls}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#2d6a4f')}
              onBlur={e  => (e.target.style.borderColor = '#c8ddd0')}
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="current-password"
              className={inputCls}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#2d6a4f')}
              onBlur={e  => (e.target.style.borderColor = '#c8ddd0')}
            />

            {error && (
              <p className="text-[13px] rounded-lg px-4 py-2" style={{ background: '#fee', color: '#c0392b' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-pill py-3 text-sm font-medium text-white mt-1"
              style={{ background: '#1a3a2e', opacity: loading ? 0.7 : 1 }}
              onMouseEnter={e => !loading && (e.currentTarget.style.background = '#2d6a4f')}
              onMouseLeave={e => (e.currentTarget.style.background = '#1a3a2e')}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
