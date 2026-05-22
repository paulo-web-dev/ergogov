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


const css = `
  body {
    background:
      radial-gradient(60% 40% at 50% 0%, rgba(95,184,148,0.08) 0%, transparent 60%),
      var(--canvas);
    min-height: 100vh;
  }

  /* — Top progress bar (fixed) — */
  .arp-progress {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: var(--ink-100);
    z-index: 100;
  }
  .arp-progress > span {
    display: block; height: 100%;
    background: linear-gradient(90deg, var(--g-700), var(--g-400));
    transition: width var(--dur) var(--ease-out);
  }

  /* — Header — */
  .arp-shell {
    max-width: 760px;
    margin: 0 auto;
    padding: 36px 24px 200px;
  }
  .arp-header {
    display: flex; align-items: center; gap: 16px;
    padding: 18px 0;
    margin-bottom: 0;
  }
  .arp-header .co-logo {
    width: 48px; height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, #2D8659, #1F6B43);
    color: var(--white);
    display: inline-flex; align-items: center; justify-content: center;
    font: 700 16px/1 var(--font-sans);
    flex-shrink: 0;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
  }
  .arp-header .co-meta {
    flex: 1; min-width: 0;
  }
  .arp-header .co-meta .name {
    font: 600 14px/1.2 var(--font-sans);
    color: var(--ink-900);
  }
  .arp-header .co-meta .label {
    font: 500 11px/1 var(--font-sans);
    color: var(--ink-500);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 4px;
  }
  .arp-header .branding {
    margin-left: auto;
    display: flex; align-items: center; gap: 8px;
    color: var(--ink-500);
    font: 500 11px/1 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .arp-header .branding .ergo-mark {
    width: 26px; height: 26px;
    border-radius: 8px;
    background: var(--ink-900);
    color: var(--g-400);
    display: inline-flex; align-items: center; justify-content: center;
    font: 700 11px/1 var(--font-mono);
    letter-spacing: -0.02em;
  }

  /* — Hero — */
  .arp-hero {
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    padding: 36px;
    margin: 24px 0;
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }
  .arp-hero::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 240px; height: 240px;
    background: radial-gradient(circle, rgba(95,184,148,0.16) 0%, transparent 70%);
    z-index: -1;
  }
  .arp-hero .eyebrow {
    font: var(--t-eyebrow);
    color: var(--g-700);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    display: inline-flex; align-items: center; gap: 8px;
    margin-bottom: 14px;
  }
  .arp-hero .eyebrow .dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--g-500);
    box-shadow: 0 0 0 3px var(--g-100);
  }
  .arp-hero h1 {
    font: 700 32px/1.15 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.025em;
    margin: 0 0 14px;
  }
  .arp-hero h1 .accent { color: var(--g-700); }
  .arp-hero p.lead {
    font: 400 16px/1.55 var(--font-sans);
    color: var(--ink-700);
    margin: 0 0 22px;
    max-width: 580px;
  }
  .arp-hero .info-strip {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
    padding-top: 22px;
    border-top: 1px solid var(--line-1);
  }
  .arp-hero .info-cell {
    display: flex; gap: 10px; align-items: flex-start;
  }
  .arp-hero .info-cell .ic {
    width: 28px; height: 28px;
    border-radius: 8px;
    background: var(--g-50);
    color: var(--g-700);
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .arp-hero .info-cell .ic svg { width: 14px; height: 14px; stroke-width: 1.75; }
  .arp-hero .info-cell .t {
    font: 600 12.5px/1.3 var(--font-sans);
    color: var(--ink-900);
    margin-bottom: 2px;
  }
  .arp-hero .info-cell .s {
    font: 400 11.5px/1.4 var(--font-sans);
    color: var(--ink-500);
  }
  @media (max-width: 640px) { .arp-hero .info-strip { grid-template-columns: 1fr; } }

  /* — Section group — */
  .arp-section {
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    overflow: hidden;
    margin-bottom: 18px;
  }
  .arp-section-head {
    padding: 22px 28px 18px;
    border-bottom: 1px solid var(--line-1);
    display: flex; align-items: center; gap: 16px;
    background: var(--ink-25);
  }
  .arp-section-num {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: var(--g-700);
    color: var(--white);
    display: inline-flex; align-items: center; justify-content: center;
    font: 700 14px/1 var(--font-mono);
    flex-shrink: 0;
  }
  .arp-section-head h2 {
    font: 600 17px/1.2 var(--font-sans);
    color: var(--ink-900);
    margin: 0 0 3px;
    letter-spacing: -0.01em;
  }
  .arp-section-head .h-sub {
    font: 400 12.5px/1.3 var(--font-sans);
    color: var(--ink-500);
  }
  .arp-section-head .progress-pill {
    margin-left: auto;
    display: inline-flex; align-items: center; gap: 8px;
    padding: 4px 10px;
    border-radius: var(--r-pill);
    background: var(--white);
    border: 1px solid var(--line-2);
    font: 600 12px/1 var(--font-mono);
    color: var(--ink-700);
  }
  .arp-section-head .progress-pill.done {
    background: var(--g-50);
    border-color: var(--g-300);
    color: var(--g-800);
  }
  .arp-section-head .progress-pill svg { width: 12px; height: 12px; stroke-width: 2; }

  /* — Identification form — */
  .arp-id-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px 20px;
    padding: 24px 28px;
  }
  .arp-id-grid .span-2 { grid-column: span 2; }
  @media (max-width: 640px) { .arp-id-grid { grid-template-columns: 1fr; } .arp-id-grid .span-2 { grid-column: auto; } }
  .arp-id-grid .privacy-note {
    grid-column: span 2;
    margin-top: 4px;
    padding: 12px 14px;
    background: var(--ink-25);
    border-radius: var(--r-md);
    border: 1px dashed var(--line-3);
    display: flex; align-items: flex-start; gap: 10px;
    font: 400 12.5px/1.45 var(--font-sans);
    color: var(--ink-600);
  }
  .arp-id-grid .privacy-note .ic {
    width: 22px; height: 22px;
    border-radius: 6px;
    background: var(--g-100);
    color: var(--g-800);
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .arp-id-grid .privacy-note .ic svg { width: 12px; height: 12px; stroke-width: 1.75; }
  .arp-id-grid .privacy-note strong { color: var(--ink-900); font-weight: 600; }

  /* — Questions — */
  .arp-questions {
    display: flex; flex-direction: column;
  }
  .arp-q {
    padding: 22px 28px;
    border-bottom: 1px solid var(--line-1);
  }
  .arp-q:last-child { border-bottom: 0; }
  .arp-q.answered { background: var(--g-25); }
  .arp-q-head {
    display: flex; align-items: flex-start; gap: 12px;
    margin-bottom: 14px;
  }
  .arp-q-head .num {
    font: 700 11px/1 var(--font-mono);
    background: var(--ink-100);
    color: var(--ink-600);
    padding: 4px 7px;
    border-radius: 5px;
    flex-shrink: 0;
  }
  .arp-q.answered .arp-q-head .num {
    background: var(--g-200); color: var(--g-900);
  }
  .arp-q-head .text {
    font: 500 15px/1.45 var(--font-sans);
    color: var(--ink-900);
    flex: 1;
  }

  /* — Likert scale — */
  .likert {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
    margin-left: 30px;
  }
  @media (max-width: 600px) { .likert { grid-template-columns: 1fr; gap: 8px; } .likert .arrow { display: none; } }
  .likert-opt {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    padding: 12px 6px;
    background: var(--white);
    border: 1.5px solid var(--line-2);
    border-radius: var(--r-md);
    cursor: pointer;
    transition: all var(--dur-fast);
    text-align: center;
    position: relative;
  }
  .likert-opt:hover { border-color: var(--line-3); background: var(--ink-25); transform: translateY(-1px); }
  .likert-opt .face {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: var(--ink-100);
    color: var(--ink-500);
    display: inline-flex; align-items: center; justify-content: center;
    transition: all var(--dur-fast);
  }
  .likert-opt .face svg { width: 22px; height: 22px; stroke-width: 1.75; }
  .likert-opt .label {
    font: 600 12px/1.2 var(--font-sans);
    color: var(--ink-700);
  }
  .likert-opt .scale-num {
    font: 700 9px/1 var(--font-mono);
    color: var(--ink-400);
    letter-spacing: 0.04em;
  }
  .likert-opt.selected {
    background: var(--g-50);
    border-color: var(--g-600);
    box-shadow: 0 0 0 3px var(--g-100), var(--shadow-xs);
  }
  .likert-opt.selected .face {
    background: var(--g-700); color: var(--white);
  }
  .likert-opt.selected .label { color: var(--g-900); }
  .likert-opt.selected .scale-num { color: var(--g-700); }
  /* Color-coded by position when selected */
  .likert-opt[data-v="1"].selected .face { background: #DC2626; }
  .likert-opt[data-v="2"].selected .face { background: #F59E0B; }
  .likert-opt[data-v="3"].selected .face { background: #94A199; }
  .likert-opt[data-v="4"].selected .face { background: #3DA47E; }
  .likert-opt[data-v="5"].selected .face { background: #16A34A; }

  /* — Reverse-scored item marker (optional, for transparency) — */

  /* — Submit bar — */
  .arp-submit-bar {
    position: fixed;
    bottom: 16px; left: 50%;
    transform: translateX(-50%);
    z-index: 60;
    background: var(--white);
    border: 1px solid var(--line-2);
    border-radius: var(--r-pill);
    padding: 8px 8px 8px 18px;
    display: flex; align-items: center; gap: 16px;
    box-shadow: var(--shadow-lg);
    max-width: calc(100vw - 32px);
  }
  .arp-submit-bar .status {
    display: flex; align-items: center; gap: 10px;
    font: 500 13px/1 var(--font-sans);
    color: var(--ink-700);
  }
  .arp-submit-bar .status .pct {
    font: 700 13px/1 var(--font-mono);
    color: var(--ink-900);
    font-variant-numeric: tabular-nums;
  }
  .arp-submit-bar .mini-bar {
    width: 70px; height: 5px;
    background: var(--ink-100);
    border-radius: 3px;
    overflow: hidden;
  }
  .arp-submit-bar .mini-bar span {
    display: block; height: 100%;
    background: linear-gradient(90deg, var(--g-700), var(--g-400));
    border-radius: 3px;
    transition: width var(--dur);
  }
  .arp-submit-bar button.send {
    height: 44px;
    padding: 0 22px;
    border: 0;
    border-radius: var(--r-pill);
    background: var(--g-800);
    color: var(--white);
    font: 600 14px/1 var(--font-sans);
    display: inline-flex; align-items: center; gap: 8px;
    cursor: pointer;
    transition: all var(--dur);
  }
  .arp-submit-bar button.send:hover { background: var(--g-700); transform: scale(1.02); }
  .arp-submit-bar button.send:disabled {
    background: var(--ink-200);
    color: var(--ink-500);
    cursor: not-allowed;
    transform: none;
  }
  .arp-submit-bar button.send svg { width: 16px; height: 16px; stroke-width: 2; }

  /* — Public footer — */
  .arp-footer {
    margin-top: 40px;
    padding-top: 22px;
    border-top: 1px solid var(--line-1);
    display: flex; justify-content: space-between; align-items: center;
    font: 500 12px/1.3 var(--font-sans);
    color: var(--ink-400);
    flex-wrap: wrap; gap: 10px;
  }
  .arp-footer a:hover { color: var(--ink-700); }
  .arp-footer .powered {
    display: inline-flex; align-items: center; gap: 6px;
  }

  /* — Success state — */
  .arp-success {
    max-width: 580px;
    margin: 64px auto;
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    padding: 56px 48px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .arp-success::before {
    content: '';
    position: absolute; top: -80px; left: 50%;
    transform: translateX(-50%);
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(95,184,148,0.18) 0%, transparent 60%);
    z-index: 0;
  }
  .arp-success > * { position: relative; z-index: 1; }
  .arp-success .big-check {
    width: 88px; height: 88px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--g-700), var(--g-500));
    color: var(--white);
    display: inline-flex; align-items: center; justify-content: center;
    margin: 0 auto 24px;
    box-shadow: 0 8px 24px -8px rgba(31, 107, 67, 0.6), inset 0 1px 0 rgba(255,255,255,0.2);
    position: relative;
  }
  .arp-success .big-check::before {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 2px solid var(--g-300);
    opacity: 0.5;
    animation: pulseRing 2s ease-out infinite;
  }
  .arp-success .big-check::after {
    content: '';
    position: absolute;
    inset: -16px;
    border-radius: 50%;
    border: 2px solid var(--g-200);
    opacity: 0.3;
    animation: pulseRing 2s ease-out infinite 0.5s;
  }
  @keyframes pulseRing {
    0% { transform: scale(0.96); opacity: 0.6; }
    100% { transform: scale(1.15); opacity: 0; }
  }
  .arp-success .big-check svg {
    width: 44px; height: 44px;
    stroke-width: 2.5;
    animation: checkDraw 600ms var(--ease-out);
  }
  @keyframes checkDraw {
    0% { transform: scale(0); }
    60% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }
  .arp-success h2 {
    font: 700 28px/1.15 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.025em;
    margin: 0 0 14px;
  }
  .arp-success p {
    font: 400 16px/1.55 var(--font-sans);
    color: var(--ink-600);
    margin: 0 0 8px;
  }
  .arp-success .co-line {
    display: inline-flex; align-items: center; gap: 8px;
    margin-top: 20px;
    padding: 10px 16px;
    border-radius: var(--r-pill);
    background: var(--g-50);
    color: var(--g-800);
    font: 600 13px/1 var(--font-sans);
    border: 1px solid var(--g-200);
  }
  .arp-success .co-line .ic {
    width: 16px; height: 16px;
    background: var(--g-700);
    color: var(--white);
    border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    font: 700 9px/1 var(--font-sans);
  }
  .arp-success .anon-note {
    margin-top: 28px;
    padding: 16px 20px;
    background: var(--ink-25);
    border-radius: var(--r-md);
    border: 1px dashed var(--line-3);
    display: flex; align-items: flex-start; gap: 12px;
    text-align: left;
  }
  .arp-success .anon-note .ic {
    width: 28px; height: 28px;
    border-radius: 8px;
    background: var(--white);
    color: var(--g-700);
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    border: 1px solid var(--line-2);
  }
  .arp-success .anon-note .ic svg { width: 14px; height: 14px; stroke-width: 1.75; }
  .arp-success .anon-note .t {
    font: 600 12.5px/1.3 var(--font-sans);
    color: var(--ink-900);
    margin-bottom: 4px;
  }
  .arp-success .anon-note .s {
    font: 400 12px/1.45 var(--font-sans);
    color: var(--ink-600);
  }
  .arp-success .actions {
    display: flex; gap: 10px; justify-content: center;
    margin-top: 28px;
    flex-wrap: wrap;
  }
`;

// TweaksPanel stub — design tool removed for production

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}

const { useState, useMemo } = React;

// — Icons —
const I8 = {
  ban: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m5 5 14 14"/></svg>,
  frown: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 16s1.5-2 4-2 4 2 4 2"/><circle cx="9" cy="10" r=".5" fill="currentColor"/><circle cx="15" cy="10" r=".5" fill="currentColor"/></svg>,
  meh: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 15h8"/><circle cx="9" cy="10" r=".5" fill="currentColor"/><circle cx="15" cy="10" r=".5" fill="currentColor"/></svg>,
  smile: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="10" r=".5" fill="currentColor"/><circle cx="15" cy="10" r=".5" fill="currentColor"/></svg>,
  laugh: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M7 14a5 5 0 0 0 10 0Z" fill="currentColor"/><circle cx="9" cy="10" r=".5" fill="currentColor"/><circle cx="15" cy="10" r=".5" fill="currentColor"/></svg>,
  shield: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6Z"/></svg>,
  clock: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  globe: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/></svg>,
  lock: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>,
  check: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>,
  send: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m21 3-9 18-2.5-7.5L2 11l19-8Z"/></svg>,
  user: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>,
  briefcase: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>,
};

// — Likert scale —
const LIKERT = [
  { v: 1, label: 'Nunca',         icon: 'ban' },
  { v: 2, label: 'Raramente',     icon: 'frown' },
  { v: 3, label: 'Às vezes',      icon: 'meh' },
  { v: 4, label: 'Frequentemente',icon: 'smile' },
  { v: 5, label: 'Sempre',        icon: 'laugh' },
];

// — Categories & questions (ARP — Avaliação de Riscos Psicossociais) —
const SECTIONS = [
  {
    id: 'org',
    name: 'Organização do trabalho',
    sub: 'Demandas, ritmo e controle sobre a atividade',
    questions: [
      'Você tem que trabalhar muito rapidamente para concluir suas tarefas?',
      'O volume de trabalho excede o que pode ser realizado durante a jornada?',
      'Você consegue definir a ordem em que executa suas tarefas?',
      'As metas e prazos são claros e realistas?',
      'Você recebe informações suficientes para tomar decisões no trabalho?',
    ],
  },
  {
    id: 'rel',
    name: 'Relações sociais no trabalho',
    sub: 'Apoio da chefia e de colegas, conflitos interpessoais',
    questions: [
      'Você recebe apoio dos seus colegas quando precisa?',
      'Sua chefia oferece orientação clara para o seu trabalho?',
      'Você se sente respeitado(a) pela liderança imediata?',
      'Existem conflitos frequentes entre colegas no seu setor?',
      'Você presenciou ou sofreu situações de assédio moral no último ano?',
    ],
  },
  {
    id: 'rec',
    name: 'Reconhecimento e crescimento',
    sub: 'Valorização do trabalho e oportunidades de desenvolvimento',
    questions: [
      'Você se sente reconhecido(a) pelo trabalho que realiza?',
      'Recebe feedback construtivo sobre seu desempenho?',
      'Existem oportunidades claras de crescimento profissional?',
      'A remuneração é compatível com a responsabilidade e o esforço exigidos?',
    ],
  },
  {
    id: 'vida',
    name: 'Conflito trabalho-vida pessoal',
    sub: 'Equilíbrio entre demandas profissionais e pessoais',
    questions: [
      'As demandas do trabalho interferem na sua vida pessoal/familiar?',
      'Você consegue desconectar-se do trabalho fora do horário de expediente?',
      'Você utiliza pausas e intervalos previstos pela legislação?',
    ],
  },
  {
    id: 'bem',
    name: 'Saúde e bem-estar',
    sub: 'Como você se sente em relação ao trabalho',
    questions: [
      'Você se sente esgotado(a) ao final da jornada?',
      'Tem dificuldades para dormir relacionadas ao trabalho?',
      'De forma geral, você está satisfeito(a) com seu trabalho atual?',
    ],
  },
];

const ALL_QUESTIONS = SECTIONS.flatMap(s => s.questions.map((q, i) => ({ q, id: s.id + '-' + i, secId: s.id })));

// — Tweakable —
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "view": "form",
  "preFill": "partial"
}/*EDITMODE-END*/;

// Pre-fill helpers
function buildAnswers(preFill) {
  if (preFill === 'empty') return {};
  if (preFill === 'all') {
    const a = {};
    ALL_QUESTIONS.forEach(qq => { a[qq.id] = 3 + (qq.q.charCodeAt(0) % 3); });
    return a;
  }
  // partial: first ~half
  const a = {};
  ALL_QUESTIONS.slice(0, 12).forEach(qq => { a[qq.id] = 3 + (qq.q.charCodeAt(0) % 3); });
  return a;
}

function ArpForm({ tweak, setTweak, answers, setAnswers, identification, setIdentification }) {
  const totalQ = ALL_QUESTIONS.length;
  const answeredQ = Object.keys(answers).length;
  const idFilled = Object.values(identification).filter(v => v.trim()).length;
  const totalSlots = totalQ + 4; // 4 identification fields
  const filledSlots = answeredQ + idFilled;
  const pct = Math.round((filledSlots / totalSlots) * 100);

  const allAnswered = answeredQ === totalQ && idFilled === 4;
  const setAnswer = (qid, v) => setAnswers(prev => ({ ...prev, [qid]: v }));

  const sectionStats = SECTIONS.map(s => {
    const answered = s.questions.filter((_, i) => answers[s.id + '-' + i] != null).length;
    return { ...s, answered, total: s.questions.length };
  });

  return (
    <>
      {/* — Top progress bar — */}
      <div className="arp-progress"><span style={{width: pct + '%'}}/></div>

      <div className="arp-shell">
        {/* — Header — */}
        <div className="arp-header">
          <span className="co-logo">PJ</span>
          <div className="co-meta">
            <div className="name">Prefeitura Municipal de Jundiaí</div>
            <div className="label">Pesquisa interna · Secretaria de Administração</div>
          </div>
          <div className="branding">
            <span className="ergo-mark">e.</span>
            <span>via ergo.gov</span>
          </div>
        </div>

        {/* — Hero — */}
        <section className="arp-hero">
          <div className="eyebrow"><span className="dot"/>Pesquisa anônima · 5 a 8 minutos</div>
          <h1>
            Avaliação de Riscos <span className="accent">Psicossociais.</span>
          </h1>
          <p className="lead">
            Sua participação ajuda a melhorar as condições de trabalho na Prefeitura.
            Responda com sinceridade — as respostas são <strong>totalmente anônimas</strong>{' '}
            e tratadas em conjunto pela equipe técnica de SST.
          </p>
          <div className="info-strip">
            <div className="info-cell">
              <span className="ic"><I8.clock/></span>
              <div>
                <div className="t">5 a 8 minutos</div>
                <div className="s">{ALL_QUESTIONS.length} perguntas em {SECTIONS.length} blocos</div>
              </div>
            </div>
            <div className="info-cell">
              <span className="ic"><I8.lock/></span>
              <div>
                <div className="t">Anônimo · LGPD</div>
                <div className="s">Sem identificação no relatório</div>
              </div>
            </div>
            <div className="info-cell">
              <span className="ic"><I8.shield/></span>
              <div>
                <div className="t">Conforme NR-1</div>
                <div className="s">Risco psicossocial · 2026</div>
              </div>
            </div>
          </div>
        </section>

        {/* — Identification — */}
        <section className="arp-section">
          <div className="arp-section-head">
            <span className="arp-section-num"><I8.user style={{width:16,height:16,strokeWidth:1.75}}/></span>
            <div>
              <h2>Identificação</h2>
              <p className="h-sub">Usada apenas para agrupar respostas por setor — não aparecerá no relatório.</p>
            </div>
            <span className={'progress-pill' + (idFilled === 4 ? ' done' : '')}>
              {idFilled === 4 && <I8.check/>}
              {idFilled}/4
            </span>
          </div>
          <div className="arp-id-grid">
            <div>
              <label className="eg-label">Nome (opcional)</label>
              <input
                className="eg-input"
                value={identification.nome}
                onChange={(e) => setIdentification({ ...identification, nome: e.target.value })}
                placeholder="Como você prefere ser chamado(a)"
              />
            </div>
            <div>
              <label className="eg-label">E-mail (opcional)</label>
              <input
                className="eg-input" type="email"
                value={identification.email}
                onChange={(e) => setIdentification({ ...identification, email: e.target.value })}
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="eg-label">Departamento ou secretaria</label>
              <input
                className="eg-input"
                value={identification.dept}
                onChange={(e) => setIdentification({ ...identification, dept: e.target.value })}
                placeholder="Ex: Secretaria de Educação"
              />
            </div>
            <div>
              <label className="eg-label">Função / cargo</label>
              <input
                className="eg-input"
                value={identification.role}
                onChange={(e) => setIdentification({ ...identification, role: e.target.value })}
                placeholder="Ex: Analista administrativo"
              />
            </div>
            <div className="privacy-note span-2">
              <span className="ic"><I8.lock/></span>
              <div>
                <strong>Seus dados são protegidos.</strong> Os campos acima são agrupados antes de chegarem ao relatório.
                A equipe de SST nunca verá respostas individuais associadas ao seu nome.
              </div>
            </div>
          </div>
        </section>

        {/* — Question sections — */}
        {SECTIONS.map((sec, idx) => {
          const stats = sectionStats.find(s => s.id === sec.id);
          const done = stats.answered === stats.total;
          return (
            <section key={sec.id} className="arp-section">
              <div className="arp-section-head">
                <span className="arp-section-num">{String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{sec.name}</h2>
                  <p className="h-sub">{sec.sub}</p>
                </div>
                <span className={'progress-pill' + (done ? ' done' : '')}>
                  {done && <I8.check/>}
                  {stats.answered}/{stats.total}
                </span>
              </div>
              <div className="arp-questions">
                {sec.questions.map((q, i) => {
                  const qid = sec.id + '-' + i;
                  const selected = answers[qid];
                  return (
                    <div key={qid} className={'arp-q' + (selected != null ? ' answered' : '')}>
                      <div className="arp-q-head">
                        <span className="num">{idx + 1}.{i + 1}</span>
                        <p className="text">{q}</p>
                      </div>
                      <div className="likert">
                        {LIKERT.map(opt => {
                          const Icon = I8[opt.icon];
                          return (
                            <button
                              key={opt.v}
                              type="button"
                              data-v={opt.v}
                              className={'likert-opt' + (selected === opt.v ? ' selected' : '')}
                              onClick={() => setAnswer(qid, opt.v)}
                            >
                              <span className="face"><Icon/></span>
                              <span className="label">{opt.label}</span>
                              <span className="scale-num">{opt.v}/5</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* — Public footer — */}
        <footer className="arp-footer">
          <div>Pesquisa solicitada por Prefeitura Municipal de Jundiaí · maio de 2026</div>
          <div className="powered">
            Pesquisa hospedada por <strong style={{color: 'var(--ink-700)'}}>ergo.gov</strong> · LGPD
          </div>
        </footer>
      </div>

      {/* — Submit bar — */}
      <div className="arp-submit-bar">
        <div className="status">
          <span className="mini-bar"><span style={{width: pct + '%'}}/></span>
          <span><span className="pct">{pct}%</span> · {answeredQ} de {totalQ} perguntas</span>
        </div>
        <button
          className="send"
          disabled={!allAnswered}
          onClick={() => setTweak('view', 'success')}
        >
          {allAnswered ? <>Enviar respostas <I8.send/></> : 'Continue respondendo…'}
        </button>
      </div>
    </>
  );
}

function ArpSuccess({ setTweak }) {
  return (
    <div className="arp-shell">
      <div className="arp-header">
        <span className="co-logo">PJ</span>
        <div className="co-meta">
          <div className="name">Prefeitura Municipal de Jundiaí</div>
          <div className="label">Pesquisa interna · Secretaria de Administração</div>
        </div>
        <div className="branding">
          <span className="ergo-mark">e.</span>
          <span>via ergo.gov</span>
        </div>
      </div>

      <div className="arp-success">
        <span className="big-check"><I8.check/></span>
        <h2>Respostas enviadas com sucesso!</h2>
        <p>Obrigado(a) pela sua participação.</p>
        <p>Suas respostas vão ajudar a Prefeitura a melhorar as condições de trabalho de toda a equipe.</p>

        <div className="co-line">
          <span className="ic">PJ</span>
          Prefeitura Municipal de Jundiaí
        </div>

        <div className="anon-note">
          <span className="ic"><I8.lock/></span>
          <div>
            <div className="t">Suas respostas são totalmente anônimas</div>
            <div className="s">
              Não há vínculo entre seu nome ou e-mail e as respostas no relatório final.
              Os dados serão agregados e tratados pela equipe técnica de SST conforme a LGPD.
            </div>
          </div>
        </div>

        <div className="actions">
          <button className="eg-btn eg-btn-secondary" onClick={() => setTweak('view', 'form')}>
            Voltar ao formulário
          </button>
          <a href="https://www.jundiai.sp.gov.br" className="eg-btn eg-btn-primary">
            Ir ao site da Prefeitura
          </a>
        </div>
      </div>

      <footer className="arp-footer">
        <div>Pesquisa solicitada por Prefeitura Municipal de Jundiaí · maio de 2026</div>
        <div className="powered">
          Pesquisa hospedada por <strong style={{color: 'var(--ink-700)'}}>ergo.gov</strong> · LGPD
        </div>
      </footer>
    </div>
  );
}

function ArpPage(serverProps) {
  const empresa  = serverProps?.empresa  || { id: null, nome: 'Empresa' };
  const perguntas = serverProps?.perguntas || [];
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [answers, setAnswers] = useState(() => buildAnswers(t.preFill));
  const [identification, setIdentification] = useState({
    nome: 'Maria Aparecida Souza',
    email: 'maria.souza@jundiai.sp.gov.br',
    dept: 'Secretaria de Educação',
    role: 'Coordenadora pedagógica'
  });

  // Re-build answers when preFill tweak changes
  React.useEffect(() => {
    setAnswers(buildAnswers(t.preFill));
  }, [t.preFill]);

  return (
    <div data-screen-label={t.view === 'success' ? '08 ARP — Sucesso' : '08 ARP — Formulário'}>
      {t.view === 'success'
        ? <ArpSuccess setTweak={setTweak}/>
        : <ArpForm tweak={t} setTweak={setTweak}
                   answers={answers} setAnswers={setAnswers}
                   identification={identification} setIdentification={setIdentification}/>
      }

      <TweaksPanel title="Tweaks · ARP">
        <TweakSection label="Estado"/>
        <TweakRadio
          label="Tela"
          value={t.view}
          options={['form', 'success']}
          onChange={(v) => setTweak('view', v)}
        />
        <TweakSection label="Preenchimento (preview)"/>
        <TweakRadio
          label="Respostas"
          value={t.preFill}
          options={['empty', 'partial', 'all']}
          onChange={(v) => setTweak('preFill', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('react-root')).render(<ArpPage />);

export default ArpPage;
