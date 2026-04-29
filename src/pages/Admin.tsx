import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { Brief } from '../lib/supabase';

// SHA-256 of the admin password — plain text is never stored in source
const ADMIN_HASH  = 'e20d74df80c86296908d10b16bacd0288b9d08dc66351a650767020bb6f837a7';
const SESSION_KEY = 'mojo_adm_s';
const RATE_KEY    = 'mojo_adm_r';
const MAX_ATTEMPTS   = 5;
const LOCKOUT_MS     = 15 * 60 * 1000;
const SESSION_TTL_MS = 30 * 60 * 1000;

interface RateData { attempts: number; lockUntil: number | null; }

async function sha256(s: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function getRate(): RateData {
  try { return JSON.parse(localStorage.getItem(RATE_KEY) || '{"attempts":0,"lockUntil":null}'); }
  catch { return { attempts: 0, lockUntil: null }; }
}
function setRate(r: RateData) { localStorage.setItem(RATE_KEY, JSON.stringify(r)); }

function fmt(ts: string) {
  return new Date(ts).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function Admin() {
  const [authed,     setAuthed]     = useState(false);
  const [pw,         setPw]         = useState('');
  const [showPw,     setShowPw]     = useState(false);
  const [error,      setError]      = useState('');
  const [shake,      setShake]      = useState(false);
  const [logging,    setLogging]    = useState(false);
  const [briefs,     setBriefs]     = useState<Brief[]>([]);
  const [loading,    setLoading]    = useState(false);
  const [filter,     setFilter]     = useState<'all'|'new'|'read'|'archived'>('all');
  const [search,     setSearch]     = useState('');
  const [expanded,   setExpanded]   = useState<string|null>(null);
  const [delConfirm, setDelConfirm] = useState<string|null>(null);
  const [lockSecs,   setLockSecs]   = useState(0);

  // Restore session on mount
  useEffect(() => {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      const { expires } = JSON.parse(raw);
      if (Date.now() < expires) { setAuthed(true); }
      else sessionStorage.removeItem(SESSION_KEY);
    }
  }, []);

  // Fetch briefs once authed
  useEffect(() => { if (authed) fetchBriefs(); }, [authed]);

  // Lockout countdown
  useEffect(() => {
    if (!lockSecs) return;
    const id = setInterval(() => {
      const r = getRate();
      if (!r.lockUntil || Date.now() >= r.lockUntil) {
        setRate({ attempts: 0, lockUntil: null }); setLockSecs(0);
      } else {
        setLockSecs(Math.ceil((r.lockUntil - Date.now()) / 1000));
      }
    }, 1000);
    return () => clearInterval(id);
  }, [lockSecs]);

  // Refresh session TTL on activity
  useEffect(() => {
    if (!authed) return;
    const refresh = () => sessionStorage.setItem(SESSION_KEY, JSON.stringify({ expires: Date.now() + SESSION_TTL_MS }));
    window.addEventListener('mousemove', refresh);
    window.addEventListener('keydown', refresh);
    return () => { window.removeEventListener('mousemove', refresh); window.removeEventListener('keydown', refresh); };
  }, [authed]);

  const fetchBriefs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('briefs')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setBriefs(data as Brief[]);
    setLoading(false);
  };

  const login = async () => {
    const r = getRate();
    if (r.lockUntil && Date.now() < r.lockUntil) {
      setLockSecs(Math.ceil((r.lockUntil - Date.now()) / 1000));
      setError(`Account locked. Try again in ${Math.ceil((r.lockUntil - Date.now()) / 60000)} min.`);
      return;
    }
    setLogging(true);
    await new Promise(res => setTimeout(res, 700));
    const hash = await sha256(pw);
    if (hash === ADMIN_HASH) {
      setRate({ attempts: 0, lockUntil: null });
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ expires: Date.now() + SESSION_TTL_MS }));
      setAuthed(true);
    } else {
      const attempts = r.attempts + 1;
      const lockUntil = attempts >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_MS : null;
      setRate({ attempts, lockUntil });
      setError(attempts >= MAX_ATTEMPTS
        ? 'Too many failed attempts. Locked for 15 minutes.'
        : `Incorrect password. ${MAX_ATTEMPTS - attempts} attempt${MAX_ATTEMPTS - attempts === 1 ? '' : 's'} remaining.`);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      if (lockUntil) setLockSecs(Math.ceil(LOCKOUT_MS / 1000));
    }
    setLogging(false);
    setPw('');
  };

  const logout = () => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); setBriefs([]); };

  const mutate = async (id: string, patch: Partial<Brief>) => {
    const { data } = await supabase.from('briefs').update(patch).eq('id', id).select().single();
    if (data) setBriefs(prev => prev.map(b => b.id === id ? data as Brief : b));
  };

  const remove = async (id: string) => {
    await supabase.from('briefs').delete().eq('id', id);
    setBriefs(prev => prev.filter(b => b.id !== id));
    setDelConfirm(null); setExpanded(null);
  };

  const expand = (id: string) => {
    setExpanded(prev => prev === id ? null : id);
    const brief = briefs.find(b => b.id === id);
    if (brief?.status === 'new') mutate(id, { status: 'read' });
  };

  const counts = {
    all: briefs.length,
    new: briefs.filter(b => b.status === 'new').length,
    read: briefs.filter(b => b.status === 'read').length,
    archived: briefs.filter(b => b.status === 'archived').length,
    today: briefs.filter(b => new Date(b.created_at).toDateString() === new Date().toDateString()).length,
  };

  const filtered = briefs
    .filter(b => filter === 'all' || b.status === filter)
    .filter(b => {
      if (!search) return true;
      const q = search.toLowerCase();
      return [b.name, b.email, b.company, b.service].some(v => v?.toLowerCase().includes(q));
    });

  /* ── LOGIN ─────────────────────────────────────────────────────────────── */
  if (!authed) return (
    <div className="bg-void min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
      <div className="grain-overlay" aria-hidden="true" />

      <motion.div className="w-full max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={shake ? { opacity: 1, y: 0, x: [0,-12,12,-10,10,-6,6,0] } : { opacity: 1, y: 0 }}
        transition={{ duration: shake ? 0.5 : 0.8 }}>

        <div className="flex items-center gap-3 mb-12 justify-center">
          <div className="w-6 h-6 border border-chrome-faint flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-gold" />
          </div>
          <span className="font-display text-lg font-light tracking-widest text-chrome">
            MOJO<span className="text-chrome-dim">WEBS</span>
          </span>
        </div>

        <div className="relative border border-chrome-faint/15 bg-void-2/60 p-8">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/30" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/30" />

          <p className="mono-label mb-2 text-center">◈ Restricted access</p>
          <h2 className="font-display text-2xl font-light text-chrome text-center mb-8">Admin Portal</h2>

          <div className="space-y-6">
            <div>
              <label className="mono-label block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={pw}
                  onChange={e => { setPw(e.target.value); setError(''); }}
                  onKeyDown={e => e.key === 'Enter' && !logging && !lockSecs && pw && login()}
                  className="w-full bg-transparent border-b border-chrome-faint/30 focus:border-chrome/60 px-0 py-3 text-chrome font-sans text-sm outline-none transition-colors duration-300 pr-10"
                  placeholder="Enter password"
                  autoComplete="new-password"
                  disabled={!!lockSecs}
                />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-0 top-3 text-chrome-dim hover:text-chrome transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {showPw
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    }
                  </svg>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p className="mono-label text-red-400/80 text-center text-xs"
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button onClick={login} disabled={logging || !pw || !!lockSecs}
              className="btn-primary w-full justify-center flex disabled:opacity-40 disabled:cursor-not-allowed">
              {logging
                ? <span className="flex items-center gap-2"><span className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin"/>Verifying…</span>
                : lockSecs ? `Locked — ${lockSecs}s` : 'Enter'}
            </button>
          </div>
        </div>

        <p className="mono-label text-center mt-6 opacity-30 text-xs">Mojowebs Admin · Secure access only</p>
      </motion.div>
    </div>
  );

  /* ── DASHBOARD ──────────────────────────────────────────────────────────── */
  return (
    <div className="bg-void min-h-screen">
      <div className="grain-overlay" aria-hidden="true" />

      {/* Header */}
      <header className="border-b border-chrome-faint/15 bg-void-2/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border border-chrome-faint flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-gold" />
            </div>
            <span className="font-display text-base font-light tracking-widest text-chrome">
              MOJO<span className="text-chrome-dim">WEBS</span>
            </span>
            <span className="mono-label text-chrome-faint/30 ml-1">/ Admin</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="mono-label text-chrome-dim hidden md:block text-xs">
              {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            {counts.new > 0 && (
              <span className="mono-label text-gold border border-gold/30 px-2 py-0.5 text-xs animate-pulse">
                {counts.new} new
              </span>
            )}
            <button onClick={logout}
              className="mono-label text-chrome-dim hover:text-chrome transition-colors duration-200 flex items-center gap-2 text-xs">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">

        {/* Page title */}
        <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="mono-label mb-2">◈ Dashboard</p>
          <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-chrome">Project Briefs</h1>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Received',  value: counts.all,      accent: false },
            { label: 'New & Unread',    value: counts.new,      accent: counts.new > 0 },
            { label: 'Received Today',  value: counts.today,    accent: false },
            { label: 'Archived',        value: counts.archived, accent: false },
          ].map(({ label, value, accent }, i) => (
            <motion.div key={label}
              className={`relative border p-6 overflow-hidden ${accent ? 'border-gold/40' : 'border-chrome-faint/10 bg-void-2/30'}`}
              style={accent ? { background: 'rgba(201,168,76,0.04)' } : {}}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              {accent && <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-chrome-faint/10" />
              <p className="font-display text-5xl font-light mb-2" style={{ color: accent ? '#C9A84C' : 'var(--chrome)' }}>{value}</p>
              <p className="mono-label">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Toolbar */}
        <motion.div className="flex flex-col sm:flex-row gap-3 mb-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="flex border border-chrome-faint/15 overflow-hidden shrink-0">
            {(['all','new','read','archived'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2.5 mono-label capitalize text-xs transition-colors duration-200 ${filter === f ? 'bg-chrome-faint/15 text-chrome' : 'text-chrome-dim hover:text-chrome'}`}>
                {f}
                {f !== 'all' && <span className="ml-1.5 opacity-50">({counts[f]})</span>}
              </button>
            ))}
          </div>

          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-chrome-faint/40 pointer-events-none"
              width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, company…"
              className="w-full h-full bg-void-2/30 border border-chrome-faint/15 pl-9 pr-4 py-2.5 text-chrome font-sans text-sm outline-none placeholder-chrome-faint/30 focus:border-chrome-faint/35 transition-colors" />
          </div>

          <button onClick={fetchBriefs} disabled={loading}
            className="mono-label text-chrome-dim hover:text-chrome border border-chrome-faint/15 hover:border-chrome-faint/30 px-4 py-2.5 transition-colors text-xs shrink-0 disabled:opacity-40 flex items-center gap-2">
            {loading
              ? <><span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"/>Loading</>
              : '↻ Refresh'}
          </button>
        </motion.div>

        {/* Loading state */}
        {loading && briefs.length === 0 ? (
          <div className="text-center py-28">
            <span className="w-8 h-8 border border-chrome-faint/30 border-t-gold rounded-full animate-spin inline-block mb-4" />
            <p className="mono-label">Loading briefs…</p>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div className="text-center py-28 border border-chrome-faint/10 border-dashed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-5xl text-chrome-faint/15 mb-5">◈</p>
            <p className="font-display text-2xl font-light text-chrome-dim mb-2">No briefs here yet</p>
            <p className="mono-label">Submissions from your contact form will appear here.</p>
          </motion.div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((brief, i) => (
                <motion.div key={brief.id} layout
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.03 }}
                  className={`border transition-colors duration-200 ${brief.status === 'new' ? 'border-gold/25' : 'border-chrome-faint/10 bg-void-2/10'}`}
                  style={brief.status === 'new' ? { background: 'rgba(201,168,76,0.02)' } : {}}>

                  {/* Row */}
                  <button className="w-full text-left px-6 py-4 flex items-center gap-4 group"
                    onClick={() => expand(brief.id)}>
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      brief.status === 'new' ? 'bg-gold' : brief.status === 'read' ? 'bg-chrome-faint/30' : 'bg-chrome-faint/10'
                    }`} />
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-y-1 gap-x-4 items-center min-w-0">
                      <div className="min-w-0">
                        <p className="text-chrome font-sans text-sm font-medium truncate">{brief.name}</p>
                        <p className="mono-label text-xs truncate">{brief.email}</p>
                      </div>
                      <p className="text-chrome-dim font-sans text-sm truncate hidden sm:block">{brief.company || '—'}</p>
                      <p className="mono-label text-xs truncate hidden sm:block">{brief.service || '—'}</p>
                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <span className={`mono-label px-2 py-0.5 border text-xs ${
                          brief.status === 'new'  ? 'border-gold/40 text-gold' :
                          brief.status === 'read' ? 'border-chrome-faint/20 text-chrome-dim' :
                                                    'border-chrome-faint/10 text-chrome-faint/30'
                        }`}>{brief.status}</span>
                        <span className="mono-label text-chrome-faint/30 text-xs hidden lg:block whitespace-nowrap">
                          {new Date(brief.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </span>
                        <motion.span className="text-chrome-dim"
                          animate={{ rotate: expanded === brief.id ? 180 : 0 }} transition={{ duration: 0.25 }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                        </motion.span>
                      </div>
                    </div>
                  </button>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {expanded === brief.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                        className="overflow-hidden">
                        <div className="px-6 pb-6 pt-1 border-t border-chrome-faint/10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5 mb-6">
                            <div className="space-y-4">
                              <p className="mono-label mb-2">◈ Submission details</p>
                              {[
                                { k: 'Full Name',  v: brief.name },
                                { k: 'Email',      v: brief.email },
                                { k: 'Company',    v: brief.company || '—' },
                                { k: 'Service',    v: brief.service || '—' },
                                { k: 'Budget',     v: brief.budget  || '—' },
                                { k: 'Submitted',  v: fmt(brief.created_at) },
                              ].map(({ k, v }) => (
                                <div key={k} className="flex gap-4 items-start">
                                  <span className="mono-label w-20 flex-shrink-0 text-xs pt-0.5">{k}</span>
                                  <span className="text-chrome font-sans text-sm">{v}</span>
                                </div>
                              ))}
                            </div>
                            <div>
                              <p className="mono-label mb-4">◈ Project brief</p>
                              <div className="relative border border-chrome-faint/10 bg-void p-5 min-h-[120px]">
                                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-chrome-faint/15" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-chrome-faint/15" />
                                <p className="text-chrome-dim font-sans text-sm leading-relaxed whitespace-pre-wrap">{brief.message}</p>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-3 pt-5 border-t border-chrome-faint/10">
                            <a href={`mailto:${brief.email}?subject=Re: Your Mojowebs project brief&body=Hi ${brief.name},%0A%0AThank you for reaching out to Mojowebs.%0A%0A`}
                              className="btn-primary inline-flex text-xs py-2 px-5">
                              Reply via Email →
                            </a>
                            {brief.status !== 'archived' && (
                              <button onClick={() => mutate(brief.id, { status: 'archived' })}
                                className="mono-label px-4 py-2 border border-chrome-faint/20 text-chrome-dim hover:text-chrome hover:border-chrome-faint/40 transition-colors text-xs">
                                Archive
                              </button>
                            )}
                            {brief.status === 'archived' && (
                              <button onClick={() => mutate(brief.id, { status: 'read' })}
                                className="mono-label px-4 py-2 border border-chrome-faint/20 text-chrome-dim hover:text-chrome hover:border-chrome-faint/40 transition-colors text-xs">
                                Unarchive
                              </button>
                            )}
                            {delConfirm === brief.id ? (
                              <div className="flex items-center gap-2 ml-auto">
                                <span className="mono-label text-red-400/80 text-xs">Confirm delete?</span>
                                <button onClick={() => remove(brief.id)}
                                  className="mono-label px-3 py-2 border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors text-xs">
                                  Delete
                                </button>
                                <button onClick={() => setDelConfirm(null)}
                                  className="mono-label px-3 py-2 border border-chrome-faint/20 text-chrome-dim hover:text-chrome transition-colors text-xs">
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button onClick={() => setDelConfirm(brief.id)}
                                className="mono-label px-4 py-2 border border-chrome-faint/15 text-chrome-faint/40 hover:text-red-400/80 hover:border-red-500/30 transition-colors ml-auto text-xs">
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
