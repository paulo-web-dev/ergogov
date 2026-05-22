import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../css/tokens.css';

// ── Design-tool stubs (removed for production) ──────────────────────────────
function TweaksPanel({ children, title }) { return null; }
function TweakSection({ label, children }) { return null; }
function TweakRadio({ label, value, options, onChange }) { return null; }
function TweakToggle({ label, value, onChange }) { return null; }
function TweakSlider({ label, value, min, max, unit, onChange }) { return null; }
function TweakStepper({ label, value, min, max, onChange }) { return null; }
function TweakText({ label, value, onChange }) { return null; }
function TweakColor({ label, value, onChange }) { return null; }
function TweakSelect({ label, value, options, onChange }) { return null; }
function Tweaks({ children }) { return null; }
function Tweakable({ children, ...props }) { return children; }
function useTweaks(defaults) { const [t] = React.useState(defaults); return [t, () => {}]; }
// ─────────────────────────────────────────────────────────────────────────────


// Page-specific styles
const css = `
  html, body { height: 100%; background: var(--canvas); }
  #root { min-height: 100%; }

  /* — Login layout — */
  .login-shell {
    min-height: 100vh;
    display: grid;
    grid-template-columns: var(--split-left, 50%) 1fr;
    background: var(--canvas);
  }
  .login-shell.centered { grid-template-columns: 1fr; }

  /* Left panel */
  .login-aside {
    position: relative;
    background:
      radial-gradient(120% 80% at 20% 0%, rgba(95,184,148,0.18) 0%, rgba(95,184,148,0) 55%),
      radial-gradient(80% 60% at 100% 100%, rgba(15,61,42,0.55) 0%, rgba(15,61,42,0) 60%),
      linear-gradient(160deg, var(--sidebar) 0%, var(--g-950) 100%);
    color: var(--white);
    padding: 56px 56px 40px;
    display: flex; flex-direction: column;
    overflow: hidden;
    isolation: isolate;
  }
  .login-aside-top {
    display: flex; align-items: center; justify-content: space-between;
    z-index: 2;
  }
  .login-aside .eg-wordmark { --wordmark-size: 24px; color: var(--white); }
  .login-aside .eyebrow {
    font: var(--t-eyebrow);
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: var(--g-400);
  }
  .login-aside-mid {
    margin-top: auto;
    z-index: 2;
    max-width: 460px;
  }
  .login-aside h2 {
    font: 700 40px/1.1 var(--font-sans);
    letter-spacing: -0.025em;
    margin: 0;
    color: var(--white);
  }
  .login-aside h2 em {
    color: var(--g-400);
    font-style: normal;
    font-weight: 700;
  }
  .login-aside .tagline {
    font: 400 17px/1.5 var(--font-sans);
    color: rgba(255,255,255,0.72);
    margin-top: 18px;
    max-width: 420px;
  }
  .login-aside-bottom {
    margin-top: 40px;
    display: flex; gap: 28px;
    z-index: 2;
    flex-wrap: wrap;
  }
  .stat {
    display: flex; flex-direction: column; gap: 4px;
  }
  .stat .n {
    font: 700 22px/1 var(--font-sans);
    letter-spacing: -0.02em;
    color: var(--white);
  }
  .stat .l {
    font: 500 12px/1.3 var(--font-sans);
    color: rgba(255,255,255,0.55);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .login-aside-foot {
    margin-top: 28px;
    display: flex; align-items: center; gap: 14px;
    font: 500 12px/1.3 var(--font-sans);
    color: rgba(255,255,255,0.5);
    z-index: 2;
  }
  .login-aside-foot .gov-mark {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 10px;
    border-radius: var(--r-pill);
    border: 1px solid rgba(255,255,255,0.16);
    color: rgba(255,255,255,0.7);
  }

  /* Illustration container */
  .illus {
    position: absolute;
    right: -40px;
    top: 50%;
    transform: translateY(-50%);
    width: 460px;
    height: 460px;
    z-index: 1;
    opacity: 0.95;
    pointer-events: none;
  }
  .illus svg { width: 100%; height: 100%; display: block; }
  .grid-overlay {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
    mask-image: radial-gradient(ellipse at 70% 50%, black 0%, transparent 75%);
  }

  /* Right panel — form */
  .login-right {
    display: flex; flex-direction: column;
    background: var(--surface);
  }
  .login-shell.centered .login-right {
    background:
      radial-gradient(70% 50% at 50% 0%, rgba(95,184,148,0.08) 0%, transparent 70%),
      var(--canvas);
  }
  .login-right-head {
    padding: 24px 40px;
    display: flex; justify-content: flex-end; align-items: center; gap: 24px;
    color: var(--ink-500);
    font: 500 13px/1 var(--font-sans);
  }
  .login-right-head a { color: var(--ink-700); }
  .login-right-head a:hover { color: var(--g-700); }

  .login-form-wrap {
    flex: 1;
    display: flex; align-items: center; justify-content: center;
    padding: 24px 40px 40px;
  }
  .login-form {
    width: 100%;
    max-width: 400px;
  }
  .login-shell.centered .login-form {
    max-width: 440px;
    padding: 48px;
    background: var(--surface);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    box-shadow: var(--shadow-lg);
  }
  .login-form .form-brand {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 32px;
  }
  .login-form .form-brand .mark {
    width: 38px; height: 38px;
    border-radius: var(--r-md);
    background: linear-gradient(140deg, var(--g-700), var(--g-500));
    display: inline-flex; align-items: center; justify-content: center;
    color: var(--white);
    box-shadow: var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.2);
  }
  .login-form .form-brand .mark svg { width: 20px; height: 20px; }
  .login-form h1 {
    font: 700 30px/1.1 var(--font-sans);
    letter-spacing: -0.025em;
    margin: 0 0 8px;
    color: var(--ink-900);
  }
  .login-form .sub {
    font: var(--t-body);
    color: var(--ink-500);
    margin-bottom: 28px;
  }
  .form-field { margin-bottom: 18px; }
  .form-field .row {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 8px;
  }
  .form-field .row a {
    font: 500 12px/1 var(--font-sans);
    color: var(--g-700);
  }
  .form-field .row a:hover { color: var(--g-800); text-decoration: underline; }
  .form-field .input-wrap {
    position: relative;
  }
  .form-field .input-wrap svg.lead {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    width: 18px; height: 18px; stroke-width: 1.75;
    color: var(--ink-400);
    pointer-events: none;
  }
  .form-field .input-wrap input {
    padding-left: 42px;
  }
  .form-field .input-wrap.has-trail input {
    padding-right: 42px;
  }
  .toggle-pw {
    position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
    width: 32px; height: 32px;
    display: inline-flex; align-items: center; justify-content: center;
    border: 0; background: transparent; color: var(--ink-500);
    border-radius: var(--r-sm);
  }
  .toggle-pw:hover { background: var(--ink-100); color: var(--ink-800); }
  .toggle-pw svg { width: 18px; height: 18px; stroke-width: 1.75; }

  .remember {
    display: flex; align-items: center; gap: 10px;
    font: 500 13px/1 var(--font-sans);
    color: var(--ink-700);
    user-select: none;
    cursor: pointer;
    margin: 4px 0 22px;
  }
  .remember .box {
    width: 18px; height: 18px;
    border: 1.5px solid var(--line-3);
    border-radius: 5px;
    display: inline-flex; align-items: center; justify-content: center;
    background: var(--white);
    transition: all var(--dur-fast) var(--ease-out);
  }
  .remember.on .box {
    background: var(--g-700);
    border-color: var(--g-700);
    color: var(--white);
  }
  .remember .box svg { width: 12px; height: 12px; stroke-width: 3; opacity: 0; }
  .remember.on .box svg { opacity: 1; }

  .submit {
    width: 100%;
    height: 48px;
    font-size: 15px;
  }
  .submit svg { width: 18px; height: 18px; stroke-width: 2; }
  .submit.loading { opacity: 0.85; pointer-events: none; }
  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: var(--white);
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .divider {
    display: flex; align-items: center; gap: 12px;
    margin: 26px 0 22px;
    color: var(--ink-400);
    font: 500 12px/1 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .divider::before, .divider::after {
    content: ''; flex: 1;
    height: 1px; background: var(--line-1);
  }
  .gov-btn {
    width: 100%; height: 46px;
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    border: 1px solid var(--line-2);
    background: var(--surface);
    border-radius: var(--r-md);
    color: var(--ink-800);
    font: 500 14px/1 var(--font-sans);
    transition: all var(--dur-fast) var(--ease-out);
  }
  .gov-btn:hover { background: var(--ink-50); border-color: var(--line-3); }
  .gov-btn .badge {
    background: var(--g-800); color: var(--white);
    padding: 3px 6px; border-radius: 4px;
    font: 600 10px/1 var(--font-sans);
    letter-spacing: 0.03em;
  }

  .login-right-foot {
    padding: 24px 40px;
    display: flex; justify-content: space-between; align-items: center;
    color: var(--ink-400);
    font: 500 12px/1.3 var(--font-sans);
    border-top: 1px solid var(--line-1);
  }
  .login-right-foot .links {
    display: flex; gap: 20px;
  }
  .login-right-foot a:hover { color: var(--ink-700); }

  /* — Error state — */
  .form-error {
    display: flex; align-items: flex-start; gap: 10px;
    background: var(--risk-high-bg);
    border: 1px solid var(--risk-high-bd);
    color: var(--risk-high-fg);
    border-radius: var(--r-md);
    padding: 10px 12px;
    font: 500 13px/1.4 var(--font-sans);
    margin-bottom: 16px;
  }
  .form-error svg { width: 16px; height: 16px; stroke-width: 2; flex-shrink: 0; margin-top: 1px; }

  /* — Responsive — */
  @media (max-width: 980px) {
    .login-shell { grid-template-columns: 1fr; }
    .login-aside { padding: 32px; min-height: 320px; }
    .illus { display: none; }
  }
`;

// TweaksPanel stub — design tool removed for production

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}

const { useState } = React;

// ── Icons (inline lucide-style strokes) ──────────────────────────────────────
const I = {
  Mail: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>,
  Lock: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>,
  Eye: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M9.9 4.24A10.6 10.6 0 0 1 12 4c6.5 0 10 7 10 7a17.5 17.5 0 0 1-3.32 4.07"/><path d="M6.61 6.61A17.6 17.6 0 0 0 2 12s3.5 7 10 7a10.4 10.4 0 0 0 5.39-1.61"/><path d="m1 1 22 22"/><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/></svg>,
  Check: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>,
  ArrowRight: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>,
  Alert: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r=".5" fill="currentColor"/></svg>,
  Shield: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6Z"/><path d="m9 12 2 2 4-4"/></svg>,
  Heart: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
};

// ── Illustration variants ────────────────────────────────────────────────────
function IllustrationSilhouette() {
  return (
    <svg viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5FB894" stopOpacity="0.9"/>
          <stop offset="1" stopColor="#1F6B43" stopOpacity="0.4"/>
        </linearGradient>
        <radialGradient id="ig2" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#5FB894" stopOpacity="0.18"/>
          <stop offset="1" stopColor="#5FB894" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* glow */}
      <circle cx="230" cy="230" r="200" fill="url(#ig2)"/>
      {/* angle measurement arc */}
      <circle cx="230" cy="230" r="180" fill="none" stroke="#5FB894" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 5"/>
      <circle cx="230" cy="230" r="140" fill="none" stroke="#5FB894" strokeOpacity="0.22" strokeWidth="1"/>
      {/* desk */}
      <line x1="60" y1="340" x2="400" y2="340" stroke="#5FB894" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round"/>
      <line x1="120" y1="340" x2="120" y2="410" stroke="#5FB894" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round"/>
      <line x1="340" y1="340" x2="340" y2="410" stroke="#5FB894" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round"/>
      {/* monitor */}
      <rect x="220" y="180" width="140" height="90" rx="4" fill="none" stroke="#5FB894" strokeOpacity="0.55" strokeWidth="2"/>
      <line x1="290" y1="270" x2="290" y2="290" stroke="#5FB894" strokeOpacity="0.5" strokeWidth="2"/>
      <line x1="270" y1="290" x2="310" y2="290" stroke="#5FB894" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round"/>
      {/* keyboard */}
      <rect x="240" y="320" width="100" height="14" rx="2" fill="none" stroke="#5FB894" strokeOpacity="0.4" strokeWidth="1.5"/>
      {/* person silhouette */}
      <g stroke="url(#ig1)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* head */}
        <circle cx="155" cy="180" r="22" fill="#5FB894" fillOpacity="0.18" stroke="#A8D8C2"/>
        {/* neck + spine */}
        <path d="M155 202 L155 235 Q155 252 165 260 L185 274"/>
        {/* arm — upper + lower */}
        <path d="M165 260 L210 295 L260 320" />
        {/* hip + leg */}
        <path d="M185 274 L195 340 L210 410"/>
        <path d="M195 340 L155 410"/>
        {/* chair back */}
        <path d="M115 240 L115 340" stroke="#A8D8C2" strokeWidth="2"/>
        <path d="M115 340 L195 340" stroke="#A8D8C2" strokeWidth="2"/>
        {/* chair seat support */}
        <path d="M155 340 L155 380" stroke="#A8D8C2" strokeWidth="2"/>
        <path d="M130 380 L180 380" stroke="#A8D8C2" strokeWidth="2"/>
      </g>
      {/* angle indicators */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5FB894" fillOpacity="0.7">
        <text x="80" y="175">90°</text>
        <text x="200" y="335">100°</text>
        <text x="370" y="195">+12°</text>
      </g>
      {/* measurement dots */}
      <g fill="#5FB894">
        <circle cx="155" cy="235" r="3"/>
        <circle cx="185" cy="274" r="3"/>
        <circle cx="195" cy="340" r="3"/>
      </g>
    </svg>
  );
}

function IllustrationGeometric() {
  return (
    <svg viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gg1" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#5FB894" stopOpacity="0.18"/>
          <stop offset="1" stopColor="#5FB894" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="230" cy="230" r="200" fill="url(#gg1)"/>
      {/* concentric */}
      {[80, 130, 180, 230].map((r, i) => (
        <circle key={r} cx="230" cy="230" r={r} fill="none" stroke="#5FB894" strokeOpacity={0.3 - i * 0.05} strokeWidth="1"/>
      ))}
      {/* radial spokes */}
      {Array.from({length: 12}).map((_, i) => {
        const a = (i * 30 - 90) * Math.PI / 180;
        const x1 = 230 + Math.cos(a) * 80;
        const y1 = 230 + Math.sin(a) * 80;
        const x2 = 230 + Math.cos(a) * 230;
        const y2 = 230 + Math.sin(a) * 230;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5FB894" strokeOpacity="0.15" strokeWidth="1"/>;
      })}
      {/* hex risk indicators */}
      {[
        {cx: 230, cy: 110, color: '#16A34A', label: 'Baixo'},
        {cx: 350, cy: 230, color: '#F59E0B', label: 'Mod.'},
        {cx: 230, cy: 350, color: '#DC2626', label: 'Alto'},
        {cx: 110, cy: 230, color: '#16A34A', label: 'Baixo'},
      ].map((h) => (
        <g key={h.label}>
          <circle cx={h.cx} cy={h.cy} r="20" fill={h.color} fillOpacity="0.15" stroke={h.color} strokeWidth="1.5"/>
          <circle cx={h.cx} cy={h.cy} r="6" fill={h.color}/>
        </g>
      ))}
      {/* center mark */}
      <circle cx="230" cy="230" r="36" fill="#0F3D2A" stroke="#5FB894" strokeWidth="2"/>
      <text x="230" y="236" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="14" fontWeight="700" fill="#5FB894">AET</text>
    </svg>
  );
}

// ── Tweakable defaults ───────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "split",
  "illustration": "silhouette",
  "sidebarTone": "deep",
  "showStats": true,
  "showGov": true,
  "showRememberMe": true,
  "showError": false,
  "centeredCard": true
}/*EDITMODE-END*/;

// ── Main ─────────────────────────────────────────────────────────────────────
function LoginPage() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Get CSRF token from meta tag
    const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf,
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        // Success — redirect to home
        window.location.href = data.redirect || '/home';
        return;
      }

      if (res.status === 422) {
        setError(data?.errors?.email?.[0] || data?.message || 'E-mail ou senha inválidos.');
      } else {
        setError('Erro ao conectar. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de conexão. Verifique sua rede.');
    } finally {
      setLoading(false);
    }
  };

  const tone = t.sidebarTone === 'deeper'
    ? { '--sidebar': '#082015', '--sidebar-2': '#04130A' }
    : t.sidebarTone === 'soft'
    ? { '--sidebar': '#14532D', '--sidebar-2': '#0F3D2A' }
    : { '--sidebar': '#0F3D2A', '--sidebar-2': '#0A2A1C' };

  return (
    <div className={'login-shell' + (t.layout === 'centered' ? ' centered' : '')} style={tone}>
      {/* Left panel — only in split */}
      {t.layout === 'split' && (
        <aside className="login-aside" data-screen-label="01 Login — Left">
          <div className="grid-overlay" />
          <div className="illus">
            {t.illustration === 'silhouette' ? <IllustrationSilhouette /> : <IllustrationGeometric />}
          </div>

          <div className="login-aside-top">
            <span className="eg-wordmark">
              ergo<span className="dot">.</span><span className="gov">gov</span>
            </span>
            <span className="eyebrow">v 2.0</span>
          </div>

          <div className="login-aside-mid">
            <span className="eyebrow" style={{display:'block', marginBottom: 14}}>
              Plataforma SaaS · Gestão Ergonômica
            </span>
            <h2>Análise Ergonômica do Trabalho — <em>simplificada e digital.</em></h2>
            <p className="tagline">
              Centralize AET, ARP e relatórios técnicos da sua organização em uma única plataforma, em conformidade com a NR-17.
            </p>
          </div>

          {t.showStats && (
            <div className="login-aside-bottom">
              <div className="stat"><span className="n">+ 380</span><span className="l">Organizações</span></div>
              <div className="stat"><span className="n">12 mil</span><span className="l">Postos avaliados</span></div>
              <div className="stat"><span className="n">NR-17</span><span className="l">Em conformidade</span></div>
            </div>
          )}

          {t.showGov && (
            <div className="login-aside-foot">
              <span className="gov-mark">
                <I.Shield style={{width:14, height:14}}/>
                Gov-tech
              </span>
              <span>Dados em servidores nacionais · LGPD</span>
            </div>
          )}
        </aside>
      )}

      {/* Right panel — form */}
      <section className="login-right" data-screen-label="01 Login — Form">
        <div className="login-right-head">
          <span>Primeira vez aqui?</span>
          <a href="#contato">Falar com vendas →</a>
        </div>

        <div className="login-form-wrap">
          <form className="login-form" onSubmit={onSubmit}>
            <div className="form-brand">
              <span className="mark">
                <I.Heart />
              </span>
              <span className="eg-wordmark" style={{'--wordmark-size': '20px'}}>
                ergo<span className="dot">.</span><span className="gov">gov</span>
              </span>
            </div>

            <h1>Bem-vindo de volta</h1>
            <p className="sub">Entre com sua conta para acessar o painel de gestão ergonômica.</p>

            {t.showError && (
              <div className="form-error" role="alert">
                <I.Alert />
                <div>
                  <strong>E-mail ou senha incorretos.</strong>{' '}
                  Verifique seus dados ou{' '}
                  <a href="#" style={{color:'inherit', textDecoration:'underline'}}>recupere o acesso</a>.
                </div>
              </div>
            )}

            <div className="form-field">
              <label className="eg-label" htmlFor="email">E-mail corporativo</label>
              <div className="input-wrap">
                <I.Mail className="lead" />
                <input
                  id="email" type="email" className="eg-input"
                  placeholder="seu.nome@orgao.gov.br"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-field">
              <div className="row">
                <label className="eg-label" style={{marginBottom: 0}} htmlFor="pw">Senha</label>
                <a href="#forgot">Esqueci minha senha</a>
              </div>
              <div className="input-wrap has-trail">
                <I.Lock className="lead" />
                <input
                  id="pw" type={showPw ? 'text' : 'password'} className="eg-input"
                  placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="toggle-pw" onClick={() => setShowPw(s => !s)}
                        aria-label={showPw ? 'Ocultar senha' : 'Mostrar senha'}>
                  {showPw ? <I.EyeOff /> : <I.Eye />}
                </button>
              </div>
            </div>

            {t.showRememberMe && (
              <label className={'remember' + (remember ? ' on' : '')}>
                <input type="checkbox" checked={remember}
                       onChange={(e) => setRemember(e.target.checked)}
                       style={{display:'none'}}/>
                <span className="box"><I.Check /></span>
                <span>Manter-me conectado neste dispositivo</span>
              </label>
            )}

            <button type="submit" className={'eg-btn eg-btn-primary submit' + (loading ? ' loading' : '')}>
              {loading ? <><span className="spinner"/> Verificando…</> : <>Entrar <I.ArrowRight /></>}
            </button>

            <div className="divider">ou</div>

            <button type="button" className="gov-btn">
              <I.Shield style={{width:18, height:18, color: 'var(--g-700)'}}/>
              Entrar com <span className="badge">gov.br</span>
            </button>
          </form>
        </div>

        <div className="login-right-foot">
          <span>ergo.gov © 2026 · Todos os direitos reservados</span>
          <div className="links">
            <a href="#priv">Privacidade</a>
            <a href="#terms">Termos</a>
            <a href="#support">Suporte</a>
          </div>
        </div>
      </section>

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks · Login">
        <TweakSection label="Layout" />
        <TweakRadio
          label="Estrutura"
          value={t.layout}
          options={['split', 'centered']}
          onChange={(v) => setTweak('layout', v)}
        />
        <TweakRadio
          label="Painel esquerdo"
          value={t.sidebarTone}
          options={['soft', 'deep', 'deeper']}
          onChange={(v) => setTweak('sidebarTone', v)}
        />
        <TweakSection label="Ilustração" />
        <TweakRadio
          label="Estilo"
          value={t.illustration}
          options={['silhouette', 'geometric']}
          onChange={(v) => setTweak('illustration', v)}
        />
        <TweakSection label="Conteúdo" />
        <TweakToggle label="Estatísticas (esq.)" value={t.showStats} onChange={(v) => setTweak('showStats', v)}/>
        <TweakToggle label="Selo Gov-tech / LGPD" value={t.showGov} onChange={(v) => setTweak('showGov', v)}/>
        <TweakToggle label="Manter conectado" value={t.showRememberMe} onChange={(v) => setTweak('showRememberMe', v)}/>
        <TweakSection label="Estados" />
        <TweakToggle label="Mostrar erro de login" value={t.showError} onChange={(v) => setTweak('showError', v)}/>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('react-root')).render(<LoginPage />);

export default LoginPage;
