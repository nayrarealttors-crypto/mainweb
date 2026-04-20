import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE from '../apiBase';

export default function AdminDashboard() {
  const navigate  = useNavigate();
  const username  = localStorage.getItem('se_admin_username') || 'Admin';

  const [enquiries,    setEnquiries]    = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState('');
  const [emailStatus,  setEmailStatus]  = useState(null);
  const [testingEmail, setTestingEmail] = useState(false);
  const [toast,        setToast]        = useState(null);

  const token = localStorage.getItem('se_admin_token');

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res  = await fetch(`${API_BASE}/api/admin/enquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { logout(); return; }
      const data = await res.json();
      setEnquiries(data.enquiries || []);
    } catch {
      setError('Failed to fetch enquiries. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchEnquiries();
    fetch(`${API_BASE}/api/admin/email-status`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setEmailStatus).catch(() => {});
  }, [fetchEnquiries]);

  function logout() {
    localStorage.removeItem('se_admin_token');
    localStorage.removeItem('se_admin_username');
    navigate('/admin/login');
  }

  function showToast(msg, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  }

  async function sendTestEmail() {
    setTestingEmail(true);
    try {
      const res  = await fetch(`${API_BASE}/api/admin/test-email`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) showToast(data.message, true);
      else        showToast(data.error, false);
    } catch {
      showToast('Network error — could not reach backend.', false);
    } finally {
      setTestingEmail(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this enquiry?')) return;
    try {
      await fetch(`${API_BASE}/api/admin/enquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnquiries(prev => prev.filter(e => e.id !== id));
    } catch {
      alert('Failed to delete.');
    }
  }

  const formatDate = (ts) => {
    try {
      return new Date(ts).toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });
    } catch { return ts; }
  };

  return (
    <div className="min-h-screen" style={{ background: '#f0f7f3' }}>
      {/* Toast notification */}
      {toast && (
        <div
          className="fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-[13px] font-medium shadow-lg"
          style={{
            background: toast.ok ? '#1a3a2e' : '#c0392b',
            color: '#fff',
            maxWidth: 340,
            animation: 'fadeIn .2s ease',
          }}
        >
          {toast.ok ? '✓ ' : '✗ '}{toast.msg}
        </div>
      )}

      {/* Top bar */}
      <header
        className="sticky top-0 z-10 bg-white px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid #c8ddd0' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ background: '#2d6a4f' }}
          >
            SE
          </div>
          <div>
            <p className="text-[14px] font-medium" style={{ color: '#1a3a2e' }}>Nayra Realttors</p>
            <p className="text-[11px]" style={{ color: '#7a8a7e' }}>Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[13px] hidden sm:block" style={{ color: '#7a8a7e' }}>
            Welcome, <strong style={{ color: '#1a3a2e' }}>{username}</strong>
          </span>
          <button
            onClick={logout}
            className="btn-pill px-4 py-2 text-[13px] font-medium"
            style={{ background: '#fff', border: '1px solid #c8ddd0', color: '#1a3a2e' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f0f0f0')}
            onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 md:px-8 py-8 max-w-screen-xl mx-auto">
        {/* Stats bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="eyebrow mb-1">All Submissions</p>
            <h1 className="text-2xl font-medium" style={{ color: '#1a3a2e' }}>
              Enquiry Inbox
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Email status badge */}
            {emailStatus && (
              <span
                className="px-3 py-1.5 rounded-full text-[12px] font-medium"
                style={{
                  background: emailStatus.configured ? '#d4eadb' : '#fdecea',
                  color:      emailStatus.configured ? '#1a3a2e' : '#c0392b',
                }}
              >
                {emailStatus.configured ? '✉ Email ON' : '✉ Email OFF — set SMTP vars'}
              </span>
            )}
            <span
              className="px-4 py-1.5 rounded-full text-[13px] font-medium"
              style={{ background: '#d4eadb', color: '#1a3a2e' }}
            >
              {enquiries.length} Total
            </span>
            <button
              onClick={sendTestEmail}
              disabled={testingEmail}
              className="btn-pill px-4 py-2 text-[13px] font-medium"
              style={{
                background: '#fff',
                border: '1px solid #2d6a4f',
                color: '#2d6a4f',
                opacity: testingEmail ? 0.6 : 1,
              }}
              onMouseEnter={e => { if (!testingEmail) e.currentTarget.style.background = '#e8f5ee'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
            >
              {testingEmail ? 'Sending…' : '✉ Test Email'}
            </button>
            <button
              onClick={fetchEnquiries}
              className="btn-pill px-4 py-2 text-[13px] text-white font-medium"
              style={{ background: '#2d6a4f' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#3a8060')}
              onMouseLeave={e => (e.currentTarget.style.background = '#2d6a4f')}
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-20" style={{ color: '#7a8a7e' }}>
            <div className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mb-3" style={{ borderColor: '#2d6a4f', borderTopColor: 'transparent' }} />
            <p>Loading enquiries…</p>
          </div>
        )}

        {error && (
          <div className="rounded-xl p-5 text-[14px]" style={{ background: '#fee', color: '#c0392b', border: '1px solid #fcc' }}>
            {error}
          </div>
        )}

        {!loading && !error && enquiries.length === 0 && (
          <div className="text-center py-20 rounded-2xl" style={{ background: '#fff', border: '1px solid #c8ddd0' }}>
            <p className="text-4xl mb-3">📭</p>
            <p className="font-medium" style={{ color: '#1a3a2e' }}>No enquiries yet</p>
            <p className="text-[13px] mt-1" style={{ color: '#7a8a7e' }}>Submissions will appear here.</p>
          </div>
        )}

        {!loading && enquiries.length > 0 && (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #c8ddd0', background: '#fff' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#e8f5ee', borderBottom: '1px solid #c8ddd0' }}>
                    {['#', 'Name', 'Email', 'Mobile', 'Project', 'Type', 'Source', 'Submitted At', ''].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 font-medium"
                        style={{ color: '#1a3a2e', whiteSpace: 'nowrap' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq, idx) => (
                    <tr
                      key={enq.id}
                      style={{ borderBottom: '1px solid #f0f7f3' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#fdfaf5')}
                      onMouseLeave={e => (e.currentTarget.style.background = '')}
                    >
                      <td className="px-4 py-3 font-mono text-[11px]" style={{ color: '#7a8a7e' }}>{enq.id}</td>
                      <td className="px-4 py-3 font-medium" style={{ color: '#1a3a2e', whiteSpace: 'nowrap' }}>{enq.name || '—'}</td>
                      <td className="px-4 py-3" style={{ color: '#7a8a7e' }}>{enq.email || '—'}</td>
                      <td className="px-4 py-3" style={{ color: '#7a8a7e', whiteSpace: 'nowrap' }}>{enq.mobile || '—'}</td>
                      <td className="px-4 py-3" style={{ color: '#1a3a2e', whiteSpace: 'nowrap' }}>{enq.project_name || '—'}</td>
                      <td className="px-4 py-3">
                        {enq.project_type ? (
                          <span
                            className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium"
                            style={{ background: '#d4eadb', color: '#1a3a2e' }}
                          >
                            {enq.project_type}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-full text-[11px]"
                          style={{ background: '#f5f0e8', color: '#7a5a20' }}
                        >
                          {enq.source || 'website'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[12px]" style={{ color: '#7a8a7e', whiteSpace: 'nowrap' }}>
                        {formatDate(enq.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(enq.id)}
                          className="text-[12px] transition-colors"
                          style={{ color: '#c0392b' }}
                          onMouseEnter={e => (e.target.style.fontWeight = '600')}
                          onMouseLeave={e => (e.target.style.fontWeight = '400')}
                          title="Delete enquiry"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
