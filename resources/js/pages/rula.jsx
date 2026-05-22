import React from 'react';
import ReactDOM from 'react-dom/client';
import { EgShell, EgSidebar, EgTopbar, EgIcon, EgWordmark } from '../components/EgShell.jsx';
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
  .rula-page { padding-bottom: 120px; max-width: 1400px; }

  /* — Tool header — */
  .tool-head {
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    padding: 22px 24px;
    margin-bottom: 24px;
  }
  .tool-head-top {
    display: flex; align-items: center; gap: 18px;
    margin-bottom: 16px;
  }
  .tool-glyph {
    width: 54px; height: 54px;
    border-radius: 14px;
    background: linear-gradient(140deg, #1F6B43, #3DA47E);
    color: var(--white);
    display: inline-flex; align-items: center; justify-content: center;
    font: 700 18px/1 var(--font-mono);
    letter-spacing: 0.02em;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
    flex-shrink: 0;
  }
  .tool-head h1 {
    font: 700 24px/1.15 var(--font-sans);
    letter-spacing: -0.02em;
    color: var(--ink-900);
    margin: 0 0 6px;
  }
  .tool-head h1 .full {
    font-weight: 400;
    color: var(--ink-500);
    margin-left: 8px;
  }
  .tool-head .meta-row {
    display: flex; align-items: center; gap: 12px;
    color: var(--ink-500);
    font: 500 13px/1.3 var(--font-sans);
    flex-wrap: wrap;
  }
  .tool-head .meta-row .sep { color: var(--line-3); }
  .tool-head .meta-row a {
    display: inline-flex; align-items: center; gap: 4px;
    color: var(--g-700);
  }
  .tool-head .meta-row a:hover { color: var(--g-800); text-decoration: underline; }
  .tool-head .ref-links {
    margin-left: auto;
    display: flex; gap: 8px;
  }
  .tool-head .ref-links .eg-btn { height: 36px; padding: 0 14px; font-size: 12.5px; }
  .tool-head .ref-links .eg-btn svg { width: 14px; height: 14px; stroke-width: 1.75; }

  /* — Body layout 60/40 — */
  .rula-body {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 20px;
    align-items: start;
  }
  @media (max-width: 1100px) {
    .rula-body { grid-template-columns: 1fr; }
  }

  /* — Left column: form groups — */
  .form-col { display: flex; flex-direction: column; gap: 16px; }

  .group-card {
    background: var(--surface);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    overflow: hidden;
  }
  .group-card-head {
    display: flex; align-items: center; gap: 14px;
    padding: 16px 22px;
    border-bottom: 1px solid var(--line-1);
    background: linear-gradient(180deg, var(--white), var(--ink-25));
  }
  .group-card-head .badge {
    width: 28px; height: 28px;
    border-radius: 8px;
    background: var(--g-700);
    color: var(--white);
    display: inline-flex; align-items: center; justify-content: center;
    font: 700 12px/1 var(--font-mono);
  }
  .group-card-head.group-b .badge { background: #1F6B70; }
  .group-card-head.group-c .badge { background: var(--ink-700); }
  .group-card-head h2 {
    font: 600 15px/1.2 var(--font-sans);
    color: var(--ink-900);
    margin: 0;
  }
  .group-card-head .sub {
    font: 400 12px/1.3 var(--font-sans);
    color: var(--ink-500);
    margin-top: 2px;
  }
  .group-card-head .partial-score {
    margin-left: auto;
    display: flex; align-items: center; gap: 6px;
    padding: 5px 12px;
    border-radius: var(--r-pill);
    background: var(--white);
    border: 1px solid var(--line-2);
  }
  .group-card-head .partial-score .l {
    font: 500 11px/1 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink-500);
  }
  .group-card-head .partial-score .v {
    font: 700 18px/1 var(--font-mono);
    color: var(--ink-900);
    font-variant-numeric: tabular-nums;
  }

  .group-card-body { padding: 22px; }

  /* — Question block — */
  .qblock { margin-bottom: 22px; }
  .qblock:last-child { margin-bottom: 0; }
  .qblock-head {
    display: flex; align-items: baseline; gap: 8px;
    margin-bottom: 10px;
  }
  .qblock-head .num {
    font: 700 11px/1 var(--font-mono);
    color: var(--ink-500);
    background: var(--ink-100);
    padding: 3px 7px;
    border-radius: 5px;
  }
  .qblock-head .name {
    font: 600 14px/1.2 var(--font-sans);
    color: var(--ink-900);
  }
  .qblock-head .hint {
    margin-left: auto;
    font: 500 11px/1.3 var(--font-sans);
    color: var(--ink-500);
  }
  .opts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 6px;
  }
  .opt-btn {
    position: relative;
    padding: 10px 12px;
    border: 1.5px solid var(--line-2);
    border-radius: var(--r-md);
    background: var(--white);
    cursor: pointer;
    transition: all var(--dur-fast);
    text-align: left;
  }
  .opt-btn:hover { border-color: var(--line-3); background: var(--ink-25); }
  .opt-btn .lbl {
    font: 500 13px/1.25 var(--font-sans);
    color: var(--ink-800);
  }
  .opt-btn .lbl-sub {
    font: 400 11px/1.3 var(--font-sans);
    color: var(--ink-500);
    margin-top: 3px;
  }
  .opt-btn .pts {
    position: absolute; top: 8px; right: 8px;
    font: 700 11px/1 var(--font-mono);
    color: var(--ink-500);
    background: var(--ink-100);
    padding: 2px 6px;
    border-radius: 4px;
  }
  .opt-btn.on {
    border-color: var(--g-600);
    background: var(--g-25);
  }
  .opt-btn.on .lbl { color: var(--g-900); font-weight: 600; }
  .opt-btn.on .pts { background: var(--g-700); color: var(--white); }

  /* modifiers row — checkbox-style chips */
  .mods {
    display: flex; flex-wrap: wrap; gap: 6px;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px dashed var(--line-2);
  }
  .mod-chip {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 6px 10px;
    border: 1.5px solid var(--line-2);
    border-radius: var(--r-pill);
    background: var(--white);
    font: 500 12px/1 var(--font-sans);
    color: var(--ink-700);
    cursor: pointer;
    transition: all var(--dur-fast);
  }
  .mod-chip:hover { border-color: var(--line-3); }
  .mod-chip .box {
    width: 14px; height: 14px;
    border: 1.5px solid var(--line-3);
    border-radius: 4px;
    display: inline-flex; align-items: center; justify-content: center;
    background: var(--white);
  }
  .mod-chip .box svg { width: 9px; height: 9px; stroke-width: 3; opacity: 0; color: var(--white); }
  .mod-chip.on {
    background: var(--g-50);
    border-color: var(--g-500);
    color: var(--g-900);
  }
  .mod-chip.on .box { background: var(--g-700); border-color: var(--g-700); }
  .mod-chip.on .box svg { opacity: 1; }
  .mod-chip .pts {
    font: 700 10px/1 var(--font-mono);
    background: var(--ink-100);
    color: var(--ink-500);
    padding: 2px 5px;
    border-radius: 4px;
  }
  .mod-chip.on .pts { background: var(--g-200); color: var(--g-900); }

  /* — Result column — */
  .result-col {
    position: sticky;
    top: 88px;
    display: flex; flex-direction: column;
    gap: 16px;
  }
  .result-card {
    background: var(--surface);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    overflow: hidden;
  }

  /* Silhouette */
  .silhouette-box {
    padding: 18px 22px;
    border-bottom: 1px solid var(--line-1);
    background: linear-gradient(180deg, var(--ink-25), var(--white));
  }
  .silhouette-box .ttl {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 10px;
  }
  .silhouette-box .ttl span {
    font: 600 12px/1 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-500);
  }
  .silhouette-box .focused {
    font: 600 11px/1 var(--font-sans);
    color: var(--g-700);
    background: var(--g-50);
    padding: 4px 9px;
    border-radius: var(--r-pill);
  }
  .silhouette {
    height: 220px;
    display: flex; align-items: center; justify-content: center;
  }
  .silhouette svg { height: 100%; max-width: 100%; }

  /* Score block */
  .score-block {
    padding: 22px;
    text-align: center;
    border-bottom: 1px solid var(--line-1);
    position: relative;
    overflow: hidden;
  }
  .score-block::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(60% 60% at 50% 0%, var(--score-glow, rgba(220,38,38,0.10)) 0%, transparent 70%);
    pointer-events: none;
  }
  .score-block .label {
    font: 600 11px/1 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--ink-500);
    margin-bottom: 8px;
    position: relative;
  }
  .score-num-final {
    font: 700 96px/1 var(--font-sans);
    letter-spacing: -0.05em;
    color: var(--score-color, var(--risk-high-fg));
    font-variant-numeric: tabular-nums;
    position: relative;
    transition: color var(--dur);
  }
  .score-class {
    margin-top: 6px;
    display: inline-flex; align-items: center; gap: 7px;
    padding: 6px 14px;
    border-radius: var(--r-pill);
    font: 600 13px/1 var(--font-sans);
    background: var(--score-bg, var(--risk-high-bg));
    color: var(--score-color, var(--risk-high-fg));
    border: 1px solid var(--score-bd, var(--risk-high-bd));
    position: relative;
  }
  .score-class .dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: currentColor;
  }

  .partial-scores {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid var(--line-1);
  }
  .partial-scores .col {
    padding: 14px 16px;
    border-right: 1px solid var(--line-1);
    display: flex; flex-direction: column;
    gap: 4px;
  }
  .partial-scores .col:last-child { border-right: 0; }
  .partial-scores .col .l {
    font: 500 11px/1 var(--font-sans);
    color: var(--ink-500);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .partial-scores .col .v {
    font: 700 24px/1 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .partial-scores .col .breakdown {
    font: 400 11px/1.3 var(--font-sans);
    color: var(--ink-500);
    margin-top: 4px;
  }

  /* Action legend */
  .action-legend {
    padding: 18px 22px;
  }
  .action-legend h4 {
    font: 600 11px/1 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-500);
    margin: 0 0 12px;
  }
  .action-legend .row {
    display: grid;
    grid-template-columns: auto 28px 1fr;
    gap: 10px; align-items: center;
    padding: 6px 0;
    font: 500 12px/1.3 var(--font-sans);
    color: var(--ink-700);
  }
  .action-legend .row.on {
    background: var(--ink-25);
    margin: 0 -10px;
    padding: 6px 10px;
    border-radius: 6px;
  }
  .action-legend .row .swatch {
    width: 10px; height: 10px;
    border-radius: 50%;
  }
  .action-legend .row .lvl {
    font: 700 11px/1 var(--font-mono);
    background: var(--ink-100);
    color: var(--ink-700);
    padding: 3px 6px;
    border-radius: 4px;
    text-align: center;
  }
  .action-legend .row.on .lvl {
    background: var(--g-700); color: var(--white);
  }
  .action-legend .row .desc {
    font: 400 11px/1.3 var(--font-sans);
    color: var(--ink-500);
    margin-top: 2px;
  }
  .action-legend .row strong { color: var(--ink-900); }

  /* Save bar */
  .save-bar {
    position: fixed;
    bottom: 0; left: 240px; right: 0;
    z-index: 50;
    background: var(--white);
    border-top: 1px solid var(--line-2);
    padding: 14px 32px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px;
    box-shadow: 0 -4px 16px -4px rgba(15,26,20,0.06);
  }
  .save-bar .status {
    display: flex; align-items: center; gap: 12px;
    color: var(--ink-500);
    font: 500 13px/1.3 var(--font-sans);
  }
  .save-bar .status .live-dot {
    width: 9px; height: 9px;
    border-radius: 50%;
    background: var(--g-500);
    box-shadow: 0 0 0 3px var(--g-100);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 3px var(--g-100); }
    50% { box-shadow: 0 0 0 6px var(--g-50); }
  }
  .save-bar .actions { display: flex; gap: 8px; align-items: center; }

  /* — Tabs for other tools — */
  .tool-tabs {
    display: flex; align-items: center; gap: 4px;
    margin-bottom: 0;
    padding: 0 4px 0 0;
    overflow-x: auto;
    border-bottom: 1px solid var(--line-1);
    margin-bottom: 24px;
  }
  .tool-tabs a {
    position: relative;
    padding: 12px 14px;
    font: 500 13px/1 var(--font-mono);
    color: var(--ink-500);
    cursor: pointer;
    white-space: nowrap;
    transition: color var(--dur-fast);
    display: inline-flex; align-items: center; gap: 8px;
  }
  .tool-tabs a:hover { color: var(--ink-900); }
  .tool-tabs a.on { color: var(--ink-900); font-weight: 700; }
  .tool-tabs a.on::after {
    content: '';
    position: absolute; left: 12px; right: 12px; bottom: -1px; height: 2px;
    background: var(--g-700);
    border-radius: 2px 2px 0 0;
  }
  .tool-tabs a .dot {
    width: 6px; height: 6px; border-radius: 50%;
  }
  .tool-tabs a .dot.done { background: var(--g-500); }
  .tool-tabs a .dot.pending { background: var(--ink-300); }
`;

// TweaksPanel stub — design tool removed for production

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}

const { useState, useMemo, useRef, useEffect } = React;

const I6 = {
  check: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>,
  book: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5a2 2 0 0 1 2-2h13v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 1 2-2h12"/><path d="M8 7h7"/></svg>,
  external: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="m10 14 11-11"/></svg>,
  history: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></svg>,
  reset: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 1 3 6.7L3 16"/><path d="M3 21v-5h5"/></svg>,
  zap: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg>,
};

// — RULA scoring tables (simplified canonical) —
// Group A — Arm + Wrist
// table[upperArm-1][lowerArm-1][wrist-1][wristTwist-1]
const TABLE_A = [
  // upperArm = 1
  [
    [[1,2],[2,2],[2,3],[3,3]], // lowerArm=1
    [[2,2],[2,2],[3,3],[3,3]], // lowerArm=2
    [[2,3],[3,3],[3,3],[4,4]], // lowerArm=3
  ],
  // upperArm = 2
  [
    [[2,3],[3,3],[3,4],[4,4]],
    [[3,3],[3,3],[3,4],[4,4]],
    [[3,4],[4,4],[4,4],[5,5]],
  ],
  // upperArm = 3
  [
    [[3,3],[4,4],[4,4],[5,5]],
    [[3,4],[4,4],[4,4],[5,5]],
    [[4,4],[4,4],[4,5],[5,5]],
  ],
  // upperArm = 4
  [
    [[4,4],[4,4],[4,5],[5,5]],
    [[4,4],[4,4],[4,5],[5,5]],
    [[4,4],[4,5],[5,5],[6,6]],
  ],
  // upperArm = 5
  [
    [[5,5],[5,5],[5,6],[6,7]],
    [[5,6],[6,6],[6,7],[7,7]],
    [[6,6],[6,7],[7,7],[7,8]],
  ],
  // upperArm = 6
  [
    [[7,7],[7,7],[7,8],[8,9]],
    [[7,8],[8,8],[8,9],[9,9]],
    [[8,8],[8,9],[9,9],[9,9]],
  ],
];

// Group B — Neck + Trunk + Legs
// table[neck-1][trunk-1][legs-1]
const TABLE_B = [
  [[1,3],[2,3],[3,4],[5,5],[6,6],[7,7]],
  [[2,3],[2,3],[4,5],[5,5],[6,7],[7,7]],
  [[3,3],[3,4],[4,5],[5,6],[6,7],[7,7]],
  [[5,5],[5,6],[6,7],[7,7],[7,7],[8,8]],
  [[7,7],[7,7],[7,8],[8,8],[8,8],[8,8]],
  [[8,8],[8,8],[8,8],[8,9],[9,9],[9,9]],
];

// Final Grand Score table[scoreC-1][scoreD-1] — C = wrist/arm + muscle + force, D = neck/trunk/legs + muscle + force
const GRAND = [
  [1,2,3,3,4,5,5],
  [2,2,3,4,4,5,5],
  [3,3,3,4,4,5,6],
  [3,3,3,4,5,6,6],
  [4,4,4,5,6,7,7],
  [4,4,5,6,6,7,7],
  [5,5,6,6,7,7,7],
  [5,5,6,7,7,7,7],
];

function scoreA(state) {
  const { upperArm, lowerArm, wrist, wristTwist,
          armShoulder, armAbducted, armSupported, armCross, wristDev } = state;
  // base values:
  let ua = upperArm + (armShoulder ? 1 : 0) + (armAbducted ? 1 : 0) - (armSupported ? 1 : 0);
  ua = Math.max(1, Math.min(6, ua));
  let la = lowerArm + (armCross ? 1 : 0);
  la = Math.max(1, Math.min(3, la));
  let w = wrist + (wristDev ? 1 : 0);
  w = Math.max(1, Math.min(4, w));
  let wt = Math.max(1, Math.min(2, wristTwist));

  const row = TABLE_A[ua - 1];
  const sub = row[la - 1];
  const wRow = sub[w - 1];
  const a = wRow[wt - 1];
  return { score: a, ua, la, w, wt };
}

function scoreB(state) {
  const { neck, trunk, legs, neckTwist, neckBend, trunkTwist, trunkBend } = state;
  let n = neck + (neckTwist ? 1 : 0) + (neckBend ? 1 : 0);
  n = Math.max(1, Math.min(6, n));
  let tr = trunk + (trunkTwist ? 1 : 0) + (trunkBend ? 1 : 0);
  tr = Math.max(1, Math.min(6, tr));
  let lg = Math.max(1, Math.min(2, legs));

  const row = TABLE_B[n - 1];
  const sub = row[tr - 1];
  return { score: sub[lg - 1], n, tr, lg };
}

function getGrand(c, d) {
  c = Math.max(1, Math.min(8, c));
  d = Math.max(1, Math.min(7, d));
  return GRAND[c - 1][d - 1];
}

function actionLevel(score) {
  if (score <= 2) return { lvl: 1, label: 'Aceitável',
    desc: 'Postura aceitável se não mantida ou repetida por longos períodos.',
    color: '#16A34A', bg: '#E7F4EC', bd: '#5FB894', glow: 'rgba(22,163,74,0.10)' };
  if (score <= 4) return { lvl: 2, label: 'Investigar',
    desc: 'Investigar e considerar mudanças no posto.',
    color: '#F59E0B', bg: '#FFF7E6', bd: '#FBBF24', glow: 'rgba(245,158,11,0.10)' };
  if (score <= 6) return { lvl: 3, label: 'Investigar logo',
    desc: 'Investigar e implementar mudanças em curto prazo.',
    color: '#EA580C', bg: '#FFF1E6', bd: '#FB923C', glow: 'rgba(234,88,12,0.10)' };
  return { lvl: 4, label: 'Intervenção imediata',
    desc: 'Investigar e implementar mudanças imediatamente.',
    color: '#DC2626', bg: '#FEF1F1', bd: '#FCA5A5', glow: 'rgba(220,38,38,0.10)' };
}

// — Option configs —
const OPTS = {
  upperArm: [
    { v: 1, lbl: '20° ext. a 20° flex.', sub: 'Posição neutra' },
    { v: 2, lbl: '> 20° ext. ou 20–45° flex.' },
    { v: 3, lbl: '45–90° de flexão' },
    { v: 4, lbl: '> 90° de flexão', sub: 'Acima do ombro' },
  ],
  lowerArm: [
    { v: 1, lbl: '60° a 100° de flexão', sub: 'Posição ideal' },
    { v: 2, lbl: '< 60° ou > 100°' },
  ],
  wrist: [
    { v: 1, lbl: 'Neutro (0°)', sub: 'Em linha com o antebraço' },
    { v: 2, lbl: '0° a 15° flex/ext' },
    { v: 3, lbl: '> 15° flex/ext' },
  ],
  wristTwist: [
    { v: 1, lbl: 'Pronação/supinação média' },
    { v: 2, lbl: 'Pronação/supinação extrema' },
  ],
  neck: [
    { v: 1, lbl: '0° a 10° de flexão', sub: 'Posição neutra' },
    { v: 2, lbl: '10° a 20° de flexão' },
    { v: 3, lbl: '> 20° de flexão' },
    { v: 4, lbl: 'Em extensão' },
  ],
  trunk: [
    { v: 1, lbl: 'Sentado, apoiado a 90°' },
    { v: 2, lbl: '0° a 20° de flexão' },
    { v: 3, lbl: '20° a 60° de flexão' },
    { v: 4, lbl: '> 60° de flexão' },
  ],
  legs: [
    { v: 1, lbl: 'Apoiadas e equilibradas', sub: 'Peso distribuído' },
    { v: 2, lbl: 'Não apoiadas/desequil.' },
  ],
  muscleUse: [
    { v: 0, lbl: 'Postura dinâmica', sub: '< 1 min estática ou < 4×/min' },
    { v: 1, lbl: 'Estática ou repetitiva', sub: '> 1 min ou ≥ 4×/min' },
  ],
  force: [
    { v: 0, lbl: '< 2 kg intermitente' },
    { v: 1, lbl: '2–10 kg intermitente' },
    { v: 2, lbl: '2–10 kg estático/repet.' },
    { v: 3, lbl: '> 10 kg ou choques' },
  ],
};

// — Default state (pre-filled w/ a high-risk scenario, mimicking the Eletricista predial) —
const DEFAULT_STATE = {
  // arm + wrist
  upperArm: 4, lowerArm: 2, wrist: 2, wristTwist: 1,
  armShoulder: false, armAbducted: true, armSupported: false, armCross: false, wristDev: true,
  // neck + trunk + legs
  neck: 2, trunk: 2, legs: 1,
  neckTwist: false, neckBend: false, trunkTwist: false, trunkBend: false,
  // muscle + force
  muscleUseA: 1, muscleUseB: 1,
  forceA: 1, forceB: 0,
};

// — Silhouette SVG —
function Silhouette({ focus }) {
  // focus: 'arm' | 'wrist' | 'neck' | 'trunk' | 'legs' | null
  const seg = (key) => focus === key ? '#1F6B43' : '#BFC9C2';
  const segGlow = (key) => focus === key ? 'rgba(31,107,67,0.18)' : 'transparent';
  return (
    <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#1F6B43" stopOpacity="0.18"/>
          <stop offset="1" stopColor="#1F6B43" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Glow halo around focused segment */}
      {focus === 'neck' && <circle cx="100" cy="55" r="40" fill="url(#halo)"/>}
      {focus === 'arm' && <ellipse cx="148" cy="135" rx="50" ry="50" fill="url(#halo)"/>}
      {focus === 'wrist' && <circle cx="180" cy="180" r="30" fill="url(#halo)"/>}
      {focus === 'trunk' && <rect x="60" y="110" width="80" height="100" fill="url(#halo)"/>}
      {focus === 'legs' && <rect x="65" y="200" width="70" height="110" fill="url(#halo)"/>}

      {/* Reference grid */}
      <line x1="100" y1="0" x2="100" y2="320" stroke="#DBE2DD" strokeWidth="1" strokeDasharray="3 4"/>
      <line x1="0" y1="160" x2="200" y2="160" stroke="#DBE2DD" strokeWidth="1" strokeDasharray="3 4"/>

      {/* Head */}
      <circle cx="100" cy="42" r="20" fill="none" stroke={seg('neck')} strokeWidth="2.5"/>
      <circle cx="100" cy="42" r="20" fill={focus === 'neck' ? '#E7F4EC' : 'transparent'}/>

      {/* Neck */}
      <line x1="100" y1="62" x2="100" y2="80" stroke={seg('neck')} strokeWidth="3" strokeLinecap="round"/>

      {/* Trunk */}
      <path d="M 70 80 L 130 80 L 125 200 L 75 200 Z"
            fill={focus === 'trunk' ? '#E7F4EC' : 'transparent'}
            stroke={seg('trunk')} strokeWidth="2.5" strokeLinejoin="round"/>

      {/* Shoulders to upper arms */}
      {/* Left arm (subject's left = viewer's right) — show the focused/active arm */}
      <line x1="130" y1="84" x2="148" y2="135" stroke={seg('arm')} strokeWidth="4" strokeLinecap="round"/>
      <circle cx="148" cy="135" r="5" fill={seg('arm')}/>

      {/* Lower arm */}
      <line x1="148" y1="135" x2="178" y2="172" stroke={seg('arm')} strokeWidth="3.5" strokeLinecap="round"/>
      <circle cx="178" cy="172" r="4" fill={seg('wrist')}/>

      {/* Hand (wrist focus area) */}
      <line x1="178" y1="172" x2="188" y2="195" stroke={seg('wrist')} strokeWidth="3" strokeLinecap="round"/>

      {/* Other arm — relaxed */}
      <line x1="70" y1="84" x2="55" y2="135" stroke="#BFC9C2" strokeWidth="3.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="55" y1="135" x2="48" y2="180" stroke="#BFC9C2" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>

      {/* Legs */}
      <line x1="85" y1="200" x2="80" y2="290" stroke={seg('legs')} strokeWidth="4" strokeLinecap="round"/>
      <line x1="115" y1="200" x2="120" y2="290" stroke={seg('legs')} strokeWidth="4" strokeLinecap="round"/>
      {/* Feet */}
      <line x1="65" y1="290" x2="95" y2="290" stroke={seg('legs')} strokeWidth="3" strokeLinecap="round"/>
      <line x1="105" y1="290" x2="135" y2="290" stroke={seg('legs')} strokeWidth="3" strokeLinecap="round"/>

      {/* Angle indicator for focused arm */}
      {focus === 'arm' && (
        <g>
          <path d="M 130 84 A 22 22 0 0 1 142 105" fill="none" stroke="#1F6B43" strokeWidth="1.5" strokeDasharray="2 3"/>
          <text x="143" y="103" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#1F6B43" fontWeight="600">~75°</text>
        </g>
      )}
      {focus === 'wrist' && (
        <g>
          <path d="M 168 172 A 12 12 0 0 1 178 184" fill="none" stroke="#1F6B43" strokeWidth="1.5" strokeDasharray="2 3"/>
          <text x="135" y="178" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#1F6B43" fontWeight="600">15°</text>
        </g>
      )}
      {focus === 'neck' && (
        <g>
          <path d="M 100 62 A 18 18 0 0 1 110 78" fill="none" stroke="#1F6B43" strokeWidth="1.5" strokeDasharray="2 3"/>
          <text x="115" y="76" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#1F6B43" fontWeight="600">12°</text>
        </g>
      )}
      {focus === 'trunk' && (
        <g>
          <path d="M 100 100 A 25 25 0 0 1 122 120" fill="none" stroke="#1F6B43" strokeWidth="1.5" strokeDasharray="2 3"/>
          <text x="123" y="116" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#1F6B43" fontWeight="600">15°</text>
        </g>
      )}
    </svg>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showSilhouette": true,
  "showPartialScores": true,
  "preset": "high"
}/*EDITMODE-END*/;

const PRESETS = {
  low:  { ...DEFAULT_STATE, upperArm: 1, lowerArm: 1, wrist: 1, neck: 1, trunk: 1, legs: 1,
          armAbducted: false, wristDev: false, muscleUseA: 0, muscleUseB: 0, forceA: 0, forceB: 0 },
  med:  { ...DEFAULT_STATE, upperArm: 2, lowerArm: 2, wrist: 2, neck: 2, trunk: 2,
          armAbducted: false, wristDev: false, muscleUseA: 1, muscleUseB: 0, forceA: 1, forceB: 0 },
  high: DEFAULT_STATE,
};

function RulaPage() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [state, setState] = useState(PRESETS[t.preset] || DEFAULT_STATE);
  const [focus, setFocus] = useState('arm');

  // when preset tweak changes, load it
  useEffect(() => { setState(PRESETS[t.preset] || DEFAULT_STATE); }, [t.preset]);

  const set = (key, value) => setState(s => ({ ...s, [key]: value }));
  const toggle = (key) => setState(s => ({ ...s, [key]: !s[key] }));

  const a = useMemo(() => scoreA(state), [state]);
  const b = useMemo(() => scoreB(state), [state]);
  const c = useMemo(() => a.score + state.muscleUseA + state.forceA, [a, state.muscleUseA, state.forceA]);
  const d = useMemo(() => b.score + state.muscleUseB + state.forceB, [b, state.muscleUseB, state.forceB]);
  const grand = useMemo(() => getGrand(c, d), [c, d]);
  const action = useMemo(() => actionLevel(grand), [grand]);

  const Opts = ({ field, opts, onFocus }) => (
    <div className="opts">
      {opts.map(o => (
        <button key={o.v}
          className={'opt-btn' + (state[field] === o.v ? ' on' : '')}
          onClick={() => set(field, o.v)}
          onMouseEnter={onFocus ? () => setFocus(onFocus) : undefined}
        >
          <span className="pts">+{o.v}</span>
          <div className="lbl">{o.lbl}</div>
          {o.sub && <div className="lbl-sub">{o.sub}</div>}
        </button>
      ))}
    </div>
  );

  const Mod = ({ field, label, pts = '+1' }) => (
    <button className={'mod-chip' + (state[field] ? ' on' : '')} onClick={() => toggle(field)}>
      <span className="box"><I6.check/></span>
      {label}
      <span className="pts">{pts}</span>
    </button>
  );

  return (
    <div className="eg-shell">
      <EgSidebar active="empresas" />
      <main className="eg-main">
        <EgTopbar
          breadcrumb={['Empresas', 'Prefeitura de Jundiaí', 'Eletricista predial', 'RULA']}
          user="Ana Silva"
        />

        <div className="eg-page rula-page" data-screen-label="06 RULA">
          {/* Tool header */}
          <header className="tool-head">
            <div className="tool-head-top">
              <span className="tool-glyph">RULA</span>
              <div style={{flex: 1, minWidth: 0}}>
                <h1>RULA <span className="full">Rapid Upper Limb Assessment</span></h1>
                <div className="meta-row">
                  <span>McAtamney & Corlett (1993)</span>
                  <span className="sep">·</span>
                  <span>Avaliação biomecânica para membros superiores</span>
                  <span className="sep">·</span>
                  <a href="#metodologia"><I6.book style={{width:13,height:13,strokeWidth:1.75}}/>Metodologia</a>
                  <span className="sep">·</span>
                  <a href="#ref"><I6.external style={{width:13,height:13,strokeWidth:1.75}}/>Aplicação</a>
                </div>
              </div>
              <div className="ref-links">
                <button className="eg-btn eg-btn-secondary"><I6.history/> Histórico</button>
                <button className="eg-btn eg-btn-secondary" onClick={() => setState(DEFAULT_STATE)}>
                  <I6.reset/> Reiniciar
                </button>
              </div>
            </div>

            <div className="tool-tabs">
              <a className="on"><span className="dot done"/>RULA</a>
              <a><span className="dot done"/>OWAS</a>
              <a><span className="dot done"/>NIOSH</a>
              <a><span className="dot done"/>Moore-Garg</a>
              <a><span className="dot pending"/>KIM</a>
              <a><span className="dot pending"/>Sue Rodgers</a>
            </div>
          </header>

          <div className="rula-body">
            {/* — Form column — */}
            <div className="form-col">
              {/* Group A — Arm + Wrist */}
              <div className="group-card">
                <div className="group-card-head">
                  <span className="badge">A</span>
                  <div>
                    <h2>Grupo A — Braço e punho</h2>
                    <div className="sub">Avaliação dos membros superiores</div>
                  </div>
                  <span className="partial-score">
                    <span className="l">Sub-A</span>
                    <span className="v">{a.score}</span>
                  </span>
                </div>
                <div className="group-card-body">
                  <div className="qblock">
                    <div className="qblock-head">
                      <span className="num">A1</span>
                      <span className="name">Posição do braço</span>
                      <span className="hint">Ângulo a partir do tronco</span>
                    </div>
                    <Opts field="upperArm" opts={OPTS.upperArm} onFocus="arm"/>
                    <div className="mods">
                      <Mod field="armShoulder" label="Ombro elevado"/>
                      <Mod field="armAbducted"  label="Braço abduzido"/>
                      <Mod field="armSupported" label="Apoio do braço" pts="−1"/>
                    </div>
                  </div>

                  <div className="qblock">
                    <div className="qblock-head">
                      <span className="num">A2</span>
                      <span className="name">Posição do antebraço</span>
                    </div>
                    <Opts field="lowerArm" opts={OPTS.lowerArm} onFocus="arm"/>
                    <div className="mods">
                      <Mod field="armCross" label="Cruza linha média ou se estende"/>
                    </div>
                  </div>

                  <div className="qblock">
                    <div className="qblock-head">
                      <span className="num">A3</span>
                      <span className="name">Posição do punho</span>
                    </div>
                    <Opts field="wrist" opts={OPTS.wrist} onFocus="wrist"/>
                    <div className="mods">
                      <Mod field="wristDev" label="Desvio radial/ulnar"/>
                    </div>
                  </div>

                  <div className="qblock">
                    <div className="qblock-head">
                      <span className="num">A4</span>
                      <span className="name">Torção do punho</span>
                    </div>
                    <Opts field="wristTwist" opts={OPTS.wristTwist} onFocus="wrist"/>
                  </div>
                </div>
              </div>

              {/* Group B — Neck + Trunk + Legs */}
              <div className="group-card">
                <div className="group-card-head group-b">
                  <span className="badge">B</span>
                  <div>
                    <h2>Grupo B — Pescoço, tronco e pernas</h2>
                    <div className="sub">Avaliação postural axial</div>
                  </div>
                  <span className="partial-score">
                    <span className="l">Sub-B</span>
                    <span className="v">{b.score}</span>
                  </span>
                </div>
                <div className="group-card-body">
                  <div className="qblock">
                    <div className="qblock-head">
                      <span className="num">B1</span>
                      <span className="name">Posição do pescoço</span>
                    </div>
                    <Opts field="neck" opts={OPTS.neck} onFocus="neck"/>
                    <div className="mods">
                      <Mod field="neckTwist" label="Pescoço torcido"/>
                      <Mod field="neckBend" label="Inclinação lateral"/>
                    </div>
                  </div>

                  <div className="qblock">
                    <div className="qblock-head">
                      <span className="num">B2</span>
                      <span className="name">Posição do tronco</span>
                    </div>
                    <Opts field="trunk" opts={OPTS.trunk} onFocus="trunk"/>
                    <div className="mods">
                      <Mod field="trunkTwist" label="Tronco torcido"/>
                      <Mod field="trunkBend" label="Inclinação lateral"/>
                    </div>
                  </div>

                  <div className="qblock">
                    <div className="qblock-head">
                      <span className="num">B3</span>
                      <span className="name">Pernas</span>
                    </div>
                    <Opts field="legs" opts={OPTS.legs} onFocus="legs"/>
                  </div>
                </div>
              </div>

              {/* Group C — Muscle + Force */}
              <div className="group-card">
                <div className="group-card-head group-c">
                  <span className="badge">C</span>
                  <div>
                    <h2>Uso muscular e força/carga</h2>
                    <div className="sub">Aplicado a ambos os grupos A e B</div>
                  </div>
                </div>
                <div className="group-card-body">
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
                    <div>
                      <div className="qblock-head">
                        <span className="num">C1·A</span>
                        <span className="name">Uso muscular (A)</span>
                      </div>
                      <Opts field="muscleUseA" opts={OPTS.muscleUse}/>
                    </div>
                    <div>
                      <div className="qblock-head">
                        <span className="num">C1·B</span>
                        <span className="name">Uso muscular (B)</span>
                      </div>
                      <Opts field="muscleUseB" opts={OPTS.muscleUse}/>
                    </div>
                    <div>
                      <div className="qblock-head">
                        <span className="num">C2·A</span>
                        <span className="name">Força/Carga (A)</span>
                      </div>
                      <Opts field="forceA" opts={OPTS.force}/>
                    </div>
                    <div>
                      <div className="qblock-head">
                        <span className="num">C2·B</span>
                        <span className="name">Força/Carga (B)</span>
                      </div>
                      <Opts field="forceB" opts={OPTS.force}/>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conclusion textarea */}
              <div className="group-card">
                <div className="group-card-head">
                  <span className="badge" style={{background: 'var(--ink-700)'}}><I6.zap style={{width:14, height:14}}/></span>
                  <div>
                    <h2>Conclusão técnica</h2>
                    <div className="sub">Comentários do avaliador para o laudo</div>
                  </div>
                </div>
                <div className="group-card-body">
                  <textarea
                    className="eg-input"
                    style={{minHeight: 100, padding: 14}}
                    defaultValue="Posto apresenta postura desfavorável de membros superiores associada a trabalho frequente acima do nível dos ombros e manuseio de carga sem apoio de braço, agravado por desvios de punho repetidos durante atividade de fixação de luminárias."
                  />
                </div>
              </div>
            </div>

            {/* — Result column — */}
            <aside className="result-col">
              <div className="result-card" style={{
                '--score-color': action.color,
                '--score-bg': action.bg,
                '--score-bd': action.bd,
                '--score-glow': action.glow,
              }}>
                {t.showSilhouette && (
                  <div className="silhouette-box">
                    <div className="ttl">
                      <span>Diagrama postural</span>
                      <span className="focused">
                        {focus === 'arm' && 'Braço'}
                        {focus === 'wrist' && 'Punho'}
                        {focus === 'neck' && 'Pescoço'}
                        {focus === 'trunk' && 'Tronco'}
                        {focus === 'legs' && 'Pernas'}
                        {!focus && 'Postura geral'}
                      </span>
                    </div>
                    <div className="silhouette">
                      <Silhouette focus={focus}/>
                    </div>
                  </div>
                )}

                <div className="score-block">
                  <div className="label">Score Final RULA</div>
                  <div className="score-num-final">{grand}</div>
                  <span className="score-class">
                    <span className="dot"/>
                    Nível {action.lvl} · {action.label}
                  </span>
                </div>

                {t.showPartialScores && (
                  <div className="partial-scores">
                    <div className="col">
                      <span className="l">Grupo A · final</span>
                      <span className="v">{c}</span>
                      <span className="breakdown">postura {a.score} + músc. {state.muscleUseA} + força {state.forceA}</span>
                    </div>
                    <div className="col">
                      <span className="l">Grupo B · final</span>
                      <span className="v">{d}</span>
                      <span className="breakdown">postura {b.score} + músc. {state.muscleUseB} + força {state.forceB}</span>
                    </div>
                  </div>
                )}

                <div className="action-legend">
                  <h4>Níveis de ação</h4>
                  <div className={'row' + (action.lvl === 1 ? ' on' : '')}>
                    <span className="swatch" style={{background: '#16A34A'}}/>
                    <span className="lvl">1</span>
                    <div>
                      <strong>1–2 · Aceitável</strong>
                      <div className="desc">Postura aceitável se não mantida.</div>
                    </div>
                  </div>
                  <div className={'row' + (action.lvl === 2 ? ' on' : '')}>
                    <span className="swatch" style={{background: '#F59E0B'}}/>
                    <span className="lvl">2</span>
                    <div>
                      <strong>3–4 · Investigar</strong>
                      <div className="desc">Investigar e considerar mudanças.</div>
                    </div>
                  </div>
                  <div className={'row' + (action.lvl === 3 ? ' on' : '')}>
                    <span className="swatch" style={{background: '#EA580C'}}/>
                    <span className="lvl">3</span>
                    <div>
                      <strong>5–6 · Investigar logo</strong>
                      <div className="desc">Mudanças em curto prazo.</div>
                    </div>
                  </div>
                  <div className={'row' + (action.lvl === 4 ? ' on' : '')}>
                    <span className="swatch" style={{background: '#DC2626'}}/>
                    <span className="lvl">4</span>
                    <div>
                      <strong>7+ · Intervenção imediata</strong>
                      <div className="desc">Mudanças imediatas necessárias.</div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Save bar */}
        <div className="save-bar">
          <div className="status">
            <span className="live-dot"/>
            <span>Cálculo ao vivo · Score atual <strong style={{color: action.color, fontWeight: 700}}>{grand}</strong> · {action.label}</span>
          </div>
          <div className="actions">
            <button className="eg-btn eg-btn-ghost">Exportar PDF da avaliação</button>
            <button className="eg-btn eg-btn-secondary">Salvar como rascunho</button>
            <button className="eg-btn eg-btn-primary">
              Salvar avaliação <I6.check style={{width: 16, height: 16}}/>
            </button>
          </div>
        </div>
      </main>

      <TweaksPanel title="Tweaks · RULA">
        <TweakSection label="Cenário"/>
        <TweakRadio
          label="Preset"
          value={t.preset}
          options={['low', 'med', 'high']}
          onChange={(v) => setTweak('preset', v)}
        />
        <TweakSection label="Painel de resultado"/>
        <TweakToggle label="Silhueta humana" value={t.showSilhouette} onChange={(v) => setTweak('showSilhouette', v)}/>
        <TweakToggle label="Scores parciais (A/B)" value={t.showPartialScores} onChange={(v) => setTweak('showPartialScores', v)}/>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('react-root')).render(<RulaPage />);

export default RulaPage;
