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
  .ck-page { padding-bottom: 100px; max-width: 1400px; }

  /* — Page header — */
  .ck-head {
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    padding: 24px 28px;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 24px;
    align-items: center;
  }
  .ck-head h1 {
    font: 700 22px/1.2 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.015em;
    margin: 0 0 6px;
  }
  .ck-head .sub {
    font: 500 13px/1.4 var(--font-sans);
    color: var(--ink-500);
  }
  .ck-head .sub strong { color: var(--ink-900); font-weight: 600; }

  .overall-score {
    display: grid;
    grid-template-columns: 84px 1fr;
    gap: 16px;
    align-items: center;
    padding-left: 24px;
    border-left: 1px solid var(--line-1);
    min-width: 320px;
  }
  .overall-donut {
    width: 84px; height: 84px;
    position: relative;
  }
  .overall-donut svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .overall-donut .center {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
  }
  .overall-donut .v {
    font: 700 22px/1 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .overall-donut .l {
    font: 500 8.5px/1 var(--font-sans);
    color: var(--ink-500);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-top: 3px;
  }
  .overall-meta .l {
    font: 600 11px/1 var(--font-sans);
    color: var(--ink-500);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
  }
  .overall-meta .nums {
    display: flex; gap: 18px;
    margin-bottom: 10px;
  }
  .overall-meta .nums div {
    display: flex; flex-direction: column;
    gap: 2px;
  }
  .overall-meta .nums .n {
    font: 700 18px/1 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.015em;
    font-variant-numeric: tabular-nums;
  }
  .overall-meta .nums .n.conform { color: var(--g-700); }
  .overall-meta .nums .n.nonconform { color: var(--risk-high-fg); }
  .overall-meta .nums .lbl {
    font: 500 11px/1 var(--font-sans);
    color: var(--ink-500);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  /* — Body — */
  .ck-body {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 20px;
    align-items: start;
  }
  @media (max-width: 980px) { .ck-body { grid-template-columns: 1fr; } .ck-rail { order: -1; } }

  /* — Category rail — */
  .ck-rail {
    position: sticky;
    top: 84px;
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    padding: 8px;
    max-height: calc(100vh - 110px);
    overflow-y: auto;
  }
  .ck-rail-title {
    font: 600 11px/1 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-500);
    padding: 10px 12px 6px;
  }
  .cat-item {
    display: grid;
    grid-template-columns: 28px 1fr auto;
    gap: 10px;
    align-items: center;
    padding: 9px 12px;
    border-radius: var(--r-md);
    cursor: pointer;
    transition: background var(--dur-fast);
    position: relative;
    margin: 0 0 2px;
  }
  .cat-item:hover { background: var(--ink-25); }
  .cat-item.active {
    background: var(--g-50);
  }
  .cat-item.active::before {
    content: '';
    position: absolute; left: 0; top: 8px; bottom: 8px;
    width: 3px;
    background: var(--g-700);
    border-radius: 0 3px 3px 0;
  }
  .cat-item .ic {
    width: 28px; height: 28px;
    border-radius: 8px;
    background: var(--ink-100);
    color: var(--ink-700);
    display: inline-flex; align-items: center; justify-content: center;
    transition: all var(--dur-fast);
  }
  .cat-item.active .ic { background: var(--g-700); color: var(--white); }
  .cat-item .ic svg { width: 14px; height: 14px; stroke-width: 1.75; }
  .cat-item .meta { min-width: 0; }
  .cat-item .name {
    font: 500 13px/1.2 var(--font-sans);
    color: var(--ink-800);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .cat-item.active .name { color: var(--ink-900); font-weight: 600; }
  .cat-item .progress-mini {
    width: 100%;
    height: 3px;
    background: var(--ink-100);
    border-radius: 2px;
    margin-top: 4px;
    overflow: hidden;
  }
  .cat-item .progress-mini > span {
    display: block;
    height: 100%;
    border-radius: 2px;
  }
  .cat-item .pct {
    font: 700 11px/1 var(--font-mono);
    color: var(--ink-700);
    font-variant-numeric: tabular-nums;
  }
  .cat-item.active .pct { color: var(--g-800); }

  /* — Main checklist area — */
  .ck-main {
    background: var(--surface);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    overflow: hidden;
  }
  .ck-main-head {
    padding: 22px 28px 18px;
    border-bottom: 1px solid var(--line-1);
    background: linear-gradient(180deg, var(--white), var(--ink-25));
  }
  .ck-main-head .row1 {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 16px;
  }
  .ck-main-head .big-ic {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--g-700), var(--g-500));
    color: var(--white);
    display: inline-flex; align-items: center; justify-content: center;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
  }
  .ck-main-head .big-ic svg { width: 22px; height: 22px; stroke-width: 1.75; }
  .ck-main-head h2 {
    font: 600 19px/1.2 var(--font-sans);
    color: var(--ink-900);
    margin: 0 0 3px;
    letter-spacing: -0.015em;
  }
  .ck-main-head .desc {
    font: 400 13px/1.4 var(--font-sans);
    color: var(--ink-500);
  }
  .ck-main-head .right-stats {
    margin-left: auto;
    display: flex; align-items: center; gap: 18px;
    flex-shrink: 0;
  }
  .conformance-bar {
    display: flex; align-items: center; gap: 14px;
    padding: 12px 14px;
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-md);
  }
  .conformance-bar .ratio-num {
    font: 700 20px/1 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .conformance-bar .ratio-num .of {
    font: 400 13px/1 var(--font-sans);
    color: var(--ink-500);
    margin-left: 2px;
  }
  .conformance-bar .ratio-meta {
    display: flex; flex-direction: column; gap: 4px;
    min-width: 0;
  }
  .conformance-bar .ratio-meta .l {
    font: 500 10px/1 var(--font-sans);
    color: var(--ink-500);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .conformance-bar .ratio-meta .bar {
    width: 120px; height: 5px;
    background: var(--ink-100);
    border-radius: 3px;
    overflow: hidden;
  }
  .conformance-bar .ratio-meta .bar span {
    display: block; height: 100%;
    border-radius: 3px;
    transition: width var(--dur);
  }
  .conformance-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 12px;
    border-radius: var(--r-pill);
    font: 600 12px/1 var(--font-sans);
  }
  .conformance-pill.ok   { background: var(--g-100);     color: var(--g-800);     border: 1px solid var(--g-200); }
  .conformance-pill.warn { background: var(--risk-med-bg); color: var(--risk-med-fg); border: 1px solid var(--risk-med-bd); }
  .conformance-pill.bad  { background: var(--risk-high-bg); color: var(--risk-high-fg); border: 1px solid var(--risk-high-bd); }
  .conformance-pill .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

  /* Toolbar */
  .ck-toolbar {
    display: flex; align-items: center; gap: 8px;
    flex-wrap: wrap;
  }
  .ck-filter {
    display: inline-flex;
    padding: 3px;
    background: var(--ink-25);
    border: 1px solid var(--line-1);
    border-radius: var(--r-sm);
  }
  .ck-filter button {
    padding: 5px 10px;
    border: 0;
    background: transparent;
    border-radius: 5px;
    color: var(--ink-600);
    font: 500 12px/1 var(--font-sans);
    cursor: pointer;
    transition: all var(--dur-fast);
  }
  .ck-filter button.on {
    background: var(--white);
    color: var(--ink-900);
    box-shadow: var(--shadow-xs);
    font-weight: 600;
  }

  /* — Question cards — */
  .ck-items {
    padding: 8px;
  }
  .ck-item {
    display: grid;
    grid-template-columns: 28px 1fr auto;
    gap: 14px;
    align-items: flex-start;
    padding: 18px 20px;
    border-radius: var(--r-md);
    border: 1px solid transparent;
    transition: all var(--dur-fast);
    position: relative;
  }
  .ck-item:hover { background: var(--ink-25); }
  .ck-item + .ck-item { border-top: 1px solid var(--line-1); border-radius: 0; margin-top: -1px; }
  .ck-item:first-child { border-top: 0; }
  .ck-item.no { background: var(--risk-high-bg); border-color: var(--risk-high-bd); border-radius: var(--r-md); }
  .ck-item.no + .ck-item { border-top: 1px solid var(--line-1); }
  .ck-item .num {
    font: 700 11px/1.4 var(--font-mono);
    color: var(--ink-500);
    background: var(--ink-100);
    padding: 4px 6px;
    border-radius: 5px;
    width: 28px; text-align: center;
  }
  .ck-item.no .num { background: var(--risk-high-bd); color: var(--risk-high-fg); }
  .ck-item .q { flex: 1; min-width: 0; }
  .ck-item .q .ttl {
    font: 500 14px/1.4 var(--font-sans);
    color: var(--ink-900);
    margin: 0;
  }
  .ck-item .q .ref {
    font: 500 11px/1.3 var(--font-mono);
    color: var(--ink-500);
    margin-top: 4px;
  }
  .ck-item .q .reco-hint {
    margin-top: 12px;
    display: flex; align-items: flex-start; gap: 8px;
    padding: 10px 12px;
    background: var(--white);
    border: 1px solid var(--risk-high-bd);
    border-radius: var(--r-sm);
  }
  .ck-item .q .reco-hint .reco-ic {
    width: 22px; height: 22px;
    border-radius: 6px;
    background: var(--risk-high-bg);
    color: var(--risk-high-fg);
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .ck-item .q .reco-hint .reco-ic svg { width: 12px; height: 12px; stroke-width: 1.75; }
  .ck-item .q .reco-hint .reco-body {
    flex: 1;
  }
  .ck-item .q .reco-hint .reco-body .reco-l {
    font: 600 11px/1.2 var(--font-sans);
    color: var(--risk-high-fg);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 4px;
  }
  .ck-item .q .reco-hint .reco-body .reco-text {
    font: 500 13px/1.4 var(--font-sans);
    color: var(--ink-900);
  }
  .ck-item .q .reco-hint .add-reco {
    background: transparent;
    border: 0;
    color: var(--g-700);
    font: 600 12px/1 var(--font-sans);
    display: inline-flex; align-items: center; gap: 4px;
    padding: 4px 8px;
    border-radius: 5px;
    transition: all var(--dur-fast);
  }
  .ck-item .q .reco-hint .add-reco:hover { background: var(--g-50); }
  .ck-item .q .reco-hint .add-reco.added { color: var(--g-700); }
  .ck-item .q .reco-hint .add-reco.added .reco-check { color: var(--white); background: var(--g-700); border-radius: 4px; padding: 2px; }
  .ck-item .q .reco-hint .add-reco svg { width: 12px; height: 12px; stroke-width: 2; }

  /* — Toggle switch — */
  .toggle-switch {
    display: inline-flex;
    padding: 3px;
    background: var(--ink-100);
    border-radius: var(--r-pill);
    flex-shrink: 0;
    border: 1px solid var(--line-2);
  }
  .toggle-switch button {
    height: 28px;
    min-width: 48px;
    padding: 0 12px;
    border: 0;
    background: transparent;
    border-radius: var(--r-pill);
    color: var(--ink-600);
    font: 600 12px/1 var(--font-sans);
    cursor: pointer;
    transition: all var(--dur-fast);
    display: inline-flex; align-items: center; gap: 6px;
  }
  .toggle-switch button.on-yes { background: var(--g-700); color: var(--white); box-shadow: var(--shadow-xs); }
  .toggle-switch button.on-no  { background: var(--risk-high-solid); color: var(--white); box-shadow: var(--shadow-xs); }
  .toggle-switch button.on-na  { background: var(--ink-500); color: var(--white); box-shadow: var(--shadow-xs); }
  .toggle-switch button svg { width: 12px; height: 12px; stroke-width: 2.5; }

  /* — Save bar — */
  .save-bar-ck {
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
  .save-bar-ck .left-info {
    display: flex; align-items: center; gap: 18px;
    color: var(--ink-700);
    font: 500 13px/1.3 var(--font-sans);
  }
  .save-bar-ck .left-info .pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 10px;
    border-radius: var(--r-pill);
    background: var(--g-50);
    color: var(--g-800);
    font: 600 12px/1 var(--font-sans);
    border: 1px solid var(--g-200);
  }
  .save-bar-ck .actions { display: flex; gap: 8px; }

  /* — Recommendations side panel — */
  .reco-flyout {
    position: fixed;
    right: 16px; top: 100px;
    width: 320px;
    z-index: 30;
    background: var(--white);
    border: 1px solid var(--line-2);
    border-radius: var(--r-xl);
    box-shadow: var(--shadow-lg);
    max-height: calc(100vh - 200px);
    overflow: hidden;
    display: flex; flex-direction: column;
  }
  .reco-flyout-head {
    padding: 14px 16px;
    border-bottom: 1px solid var(--line-1);
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px;
  }
  .reco-flyout-head h3 {
    font: 600 13px/1.2 var(--font-sans);
    color: var(--ink-900);
    margin: 0;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .reco-flyout-head h3 .badge {
    background: var(--g-700); color: var(--white);
    padding: 2px 7px; border-radius: 10px;
    font: 700 11px/1 var(--font-mono);
  }
  .reco-flyout-head .close {
    width: 28px; height: 28px;
    background: transparent;
    border: 0;
    border-radius: 6px;
    color: var(--ink-500);
    display: inline-flex; align-items: center; justify-content: center;
  }
  .reco-flyout-head .close:hover { background: var(--ink-100); color: var(--ink-900); }
  .reco-flyout-head .close svg { width: 14px; height: 14px; stroke-width: 1.75; }
  .reco-flyout-body {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
  }
  .reco-flyout-item {
    padding: 10px 12px;
    border-radius: var(--r-sm);
    margin-bottom: 4px;
    display: flex; gap: 10px;
    align-items: flex-start;
  }
  .reco-flyout-item:hover { background: var(--ink-25); }
  .reco-flyout-item .mark {
    width: 18px; height: 18px;
    border-radius: 5px;
    background: var(--g-100);
    color: var(--g-800);
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px;
  }
  .reco-flyout-item .mark svg { width: 11px; height: 11px; stroke-width: 2.5; }
  .reco-flyout-item .text {
    font: 500 12px/1.4 var(--font-sans);
    color: var(--ink-800);
  }
  .reco-flyout-item .src {
    font: 500 10px/1 var(--font-mono);
    color: var(--ink-500);
    margin-top: 3px;
  }
  .reco-flyout-foot {
    padding: 12px 14px;
    border-top: 1px solid var(--line-1);
  }
`;

// TweaksPanel stub — design tool removed for production

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}

const { useState, useMemo, useEffect } = React;

const I7 = {
  chair: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M6 11V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v7"/><path d="M5 12h14"/><path d="M7 20v2M17 20v2"/><path d="M5 12v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"/></svg>,
  desk: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h18"/><path d="M3 10V8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2"/><path d="M5 10v10M19 10v10"/><path d="M3 16h18"/></svg>,
  monitor: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M9 21h6M12 17v4"/></svg>,
  keyboard: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M10 13h.01M14 13h.01M18 13h.01M8 17h8"/></svg>,
  tray: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h18l-2 9H5L3 7Z"/><path d="M5 7V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/></svg>,
  laptop: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="11" rx="1"/><path d="M2 17h20l-1 2H3l-1-2Z"/></svg>,
  cpu: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>,
  sun: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
  grid: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  docs: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg>,
  foot: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9c0-3 2-5 5-5 2.5 0 4 1.5 4 4 0 3 2 5 2 8 0 4-3 7-7 7s-7-3-7-7c0-2 2-4 3-7Z"/><circle cx="9" cy="6" r="0.5" fill="currentColor"/></svg>,
  check: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>,
  x: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  alert: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r=".5" fill="currentColor"/></svg>,
  zap: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg>,
  pdf: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>,
  plus: EgIcon.plus,
};

// — Checklist categories with mock items —
const CATEGORIES = [
  {
    id: 'cadeira', name: 'Cadeira', icon: 'chair',
    items: [
      { q: 'A altura do assento permite apoio total dos pés no chão?', ref: 'NR-17 17.3.3 (a)', ans: 'yes' },
      { q: 'A regulagem de altura é feita pelo próprio colaborador?', ref: 'NR-17 17.3.3 (b)', ans: 'yes' },
      { q: 'O encosto possui regulagem de inclinação?', ref: 'NR-17 17.3.3 (c)', ans: 'no',
        reco: 'Substituir por cadeira com encosto reclinável e travamento independente.' },
      { q: 'O encosto oferece suporte adequado para a região lombar?', ref: 'NR-17 17.3.3 (c)', ans: 'yes' },
      { q: 'Os apoios de braço são reguláveis em altura e largura?', ref: 'NR-17 17.3.3 (d)', ans: 'no',
        reco: 'Substituir cadeira ou adquirir apoios de braço reguláveis (4D).' },
      { q: 'A base é estável (5 pés) com rodízios adequados ao piso?', ref: 'NR-17 17.3.3 (e)', ans: 'yes' },
      { q: 'O assento possui borda anterior arredondada (anti-pressão)?', ref: 'NR-17 17.3.3 (f)', ans: 'yes' },
      { q: 'A cadeira gira livremente sem trancos ou ranger?', ref: 'Manutenção', ans: 'yes' },
      { q: 'O revestimento é respirável e antiderrapante?', ref: 'NR-17 17.3.3 (g)', ans: 'na' },
    ],
  },
  {
    id: 'mesa', name: 'Mesa', icon: 'desk',
    items: [
      { q: 'A altura da superfície de trabalho está entre 65 e 75 cm?', ref: 'NR-17 17.3.2 (a)', ans: 'yes' },
      { q: 'Existe espaço suficiente para apoiar antebraços?', ref: 'NR-17 17.3.2 (b)', ans: 'yes' },
      { q: 'A superfície tem bordas arredondadas (sem cantos vivos)?', ref: 'NR-17 17.3.2 (c)', ans: 'no',
        reco: 'Aplicar proteção em bordas vivas ou substituir tampo da estação.' },
      { q: 'O espaço para pernas (vão livre) é suficiente?', ref: 'NR-17 17.3.2 (d)', ans: 'yes' },
      { q: 'A profundidade da mesa permite distância ergonômica ao monitor?', ref: '60-70 cm', ans: 'yes' },
      { q: 'A superfície é livre de reflexos e brilho excessivos?', ref: 'NR-17 17.5.2', ans: 'yes' },
      { q: 'A mesa é estável (sem balanço)?', ref: 'Manutenção', ans: 'yes' },
    ],
  },
  {
    id: 'monitor', name: 'Monitor', icon: 'monitor',
    items: [
      { q: 'O topo do monitor está no nível dos olhos ou ligeiramente abaixo?', ref: 'NR-17 17.3.4', ans: 'yes' },
      { q: 'A distância do monitor está entre 50 e 70 cm dos olhos?', ref: 'NR-17 17.3.4', ans: 'yes' },
      { q: 'O monitor está alinhado frontalmente ao colaborador?', ref: 'NR-17 17.3.4', ans: 'no',
        reco: 'Reposicionar monitor para alinhamento central da estação.' },
      { q: 'A tela está livre de reflexos da iluminação natural ou artificial?', ref: 'NR-17 17.5.3', ans: 'no',
        reco: 'Reposicionar estação ou instalar veneziana/persiana para controle de luminosidade.' },
      { q: 'O brilho e contraste estão ajustados ao ambiente?', ref: 'Boas práticas', ans: 'yes' },
      { q: 'A altura do monitor é regulável (haste ou suporte)?', ref: 'NR-17 17.3.4', ans: 'yes' },
      { q: 'Há suporte físico apenas para um monitor por colaborador?', ref: 'NR-17 17.3.4', ans: 'yes' },
      { q: 'A taxa de atualização é confortável (sem flicker)?', ref: '≥ 60 Hz', ans: 'yes' },
    ],
  },
  {
    id: 'teclado', name: 'Teclado', icon: 'keyboard',
    items: [
      { q: 'O teclado é independente da tela?', ref: 'NR-17 17.3.5 (a)', ans: 'yes' },
      { q: 'A inclinação do teclado é suave (5° a 15°)?', ref: 'NR-17 17.3.5 (b)', ans: 'yes' },
      { q: 'O teclado tem dimensões compatíveis com a tarefa?', ref: 'NR-17 17.3.5 (c)', ans: 'yes' },
      { q: 'Os símbolos das teclas são legíveis (não desgastados)?', ref: 'Manutenção', ans: 'yes' },
      { q: 'Há apoio para os punhos próximo ao teclado quando necessário?', ref: 'NR-17 17.3.5 (d)', ans: 'no',
        reco: 'Fornecer apoio de punho em material macio para teclado.' },
    ],
  },
  {
    id: 'suporte-tec', name: 'Suporte do teclado', icon: 'tray',
    items: [
      { q: 'O suporte permite ajuste de altura do teclado?', ref: 'NR-17 17.3.5', ans: 'yes' },
      { q: 'O suporte é estável (não balança ao digitar)?', ref: 'NR-17 17.3.5', ans: 'yes' },
      { q: 'A bandeja comporta também o mouse?', ref: 'Boas práticas', ans: 'no',
        reco: 'Substituir por bandeja com extensão lateral para o mouse.' },
    ],
  },
  {
    id: 'notebook', name: 'Notebook', icon: 'laptop',
    items: [
      { q: 'O notebook é usado com teclado e mouse externos?', ref: 'NR-17 boas práticas', ans: 'no',
        reco: 'Adquirir teclado e mouse externos para uso prolongado.' },
      { q: 'A tela do notebook está elevada com suporte para nível dos olhos?', ref: 'NR-17 17.3.4', ans: 'no',
        reco: 'Adquirir suporte/elevador de notebook ou monitor externo.' },
      { q: 'O notebook é refrigerado adequadamente (sem aquecimento de coxas)?', ref: 'Segurança', ans: 'yes' },
    ],
  },
  {
    id: 'computador', name: 'Computador (CPU)', icon: 'cpu',
    items: [
      { q: 'A CPU está localizada onde não ocupa espaço útil das pernas?', ref: 'NR-17 17.3.2 (d)', ans: 'yes' },
      { q: 'A CPU não emite ruído excessivo?', ref: '< 50 dB', ans: 'yes' },
      { q: 'Os cabos estão organizados sem risco de tropeço?', ref: 'NR-17 17.3.2', ans: 'no',
        reco: 'Implementar gerenciamento de cabos com canaletas e organizadores.' },
    ],
  },
  {
    id: 'iluminacao', name: 'Iluminação', icon: 'sun',
    items: [
      { q: 'A iluminação geral está adequada para a tarefa (≥ 500 lx)?', ref: 'NR-17 17.5.3 / NHO-11', ans: 'yes' },
      { q: 'A iluminação é uniforme em toda a área de trabalho?', ref: 'NR-17 17.5.3', ans: 'yes' },
      { q: 'A iluminação natural está sob controle (persianas, cortinas)?', ref: 'NR-17 17.5.3', ans: 'no',
        reco: 'Instalar persianas verticais ou venezianas controláveis nas janelas.' },
      { q: 'As luminárias estão posicionadas para evitar ofuscamento direto?', ref: 'NR-17 17.5.3', ans: 'yes' },
      { q: 'A temperatura de cor é adequada à tarefa (3500–5000K)?', ref: 'Boas práticas', ans: 'yes' },
      { q: 'A iluminação é livre de cintilação (flicker)?', ref: 'NR-17 17.5.3', ans: 'yes' },
    ],
  },
  {
    id: 'leiaute', name: 'Leiaute', icon: 'grid',
    items: [
      { q: 'O leiaute respeita o fluxo lógico da atividade?', ref: 'NR-17 17.4', ans: 'yes' },
      { q: 'Existe espaço de circulação adequado (≥ 0,80 m)?', ref: 'NR-17 17.4.2', ans: 'yes' },
      { q: 'Os itens de uso frequente estão ao alcance sem extensão?', ref: 'Zona de conforto', ans: 'no',
        reco: 'Reposicionar materiais frequentes para a zona de conforto (50 cm).' },
      { q: 'O posto é livre de interferências e barulhos da equipe?', ref: 'NR-17 17.5.2', ans: 'yes' },
    ],
  },
  {
    id: 'documentos', name: 'Documentos', icon: 'docs',
    items: [
      { q: 'Há suporte para documentos próximo à tela (mesma altura)?', ref: 'NR-17 17.3.4', ans: 'no',
        reco: 'Adquirir suporte porta-documentos (atril) para colocação ao lado do monitor.' },
      { q: 'A iluminação do suporte de documentos é adequada?', ref: 'NR-17 17.5.3', ans: 'yes' },
    ],
  },
  {
    id: 'apoio-pe', name: 'Apoio de pés', icon: 'foot',
    items: [
      { q: 'O colaborador dispõe de apoio para os pés quando necessário?', ref: 'NR-17 17.3.4', ans: 'yes' },
      { q: 'O apoio tem superfície antiderrapante?', ref: 'NR-17 17.3.4', ans: 'yes' },
      { q: 'O apoio é regulável em altura e inclinação?', ref: 'NR-17 17.3.4', ans: 'no',
        reco: 'Substituir por apoio de pés com regulagem de altura e inclinação.' },
    ],
  },
];

const ANSWER_LABELS = {
  yes: 'Sim',
  no: 'Não',
  na: 'N/A',
};

// — Tweakable defaults —
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "activeCategory": "cadeira",
  "filter": "all",
  "showFlyout": true
}/*EDITMODE-END*/;

function ChecklistPage() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [data, setData] = useState(() => CATEGORIES.map(c => ({
    ...c,
    items: c.items.map(i => ({ ...i }))
  })));
  const [addedRecos, setAddedRecos] = useState(new Set());

  const activeCat = data.find(c => c.id === t.activeCategory) || data[0];

  const stats = useMemo(() => {
    return data.map(c => {
      const apl = c.items.filter(i => i.ans !== 'na');
      const conform = apl.filter(i => i.ans === 'yes').length;
      const nonconform = apl.filter(i => i.ans === 'no').length;
      const pct = apl.length ? Math.round((conform / apl.length) * 100) : 0;
      return { ...c, conform, nonconform, applicable: apl.length, total: c.items.length, pct };
    });
  }, [data]);

  const overall = useMemo(() => {
    const all = stats.reduce((acc, c) => ({
      conform: acc.conform + c.conform,
      nonconform: acc.nonconform + c.nonconform,
      applicable: acc.applicable + c.applicable,
      total: acc.total + c.total,
    }), { conform: 0, nonconform: 0, applicable: 0, total: 0 });
    all.pct = all.applicable ? Math.round((all.conform / all.applicable) * 100) : 0;
    return all;
  }, [stats]);

  const activeStats = stats.find(c => c.id === activeCat.id);

  const setAns = (catId, itemIdx, ans) => {
    setData(prev => prev.map(c => c.id !== catId ? c : {
      ...c, items: c.items.map((i, ii) => ii !== itemIdx ? i : { ...i, ans })
    }));
  };

  const toggleReco = (key) => {
    setAddedRecos(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const filteredItems = activeCat.items.filter(i => {
    if (t.filter === 'all') return true;
    if (t.filter === 'no') return i.ans === 'no';
    if (t.filter === 'pending') return !i.ans;
    return true;
  });

  const pctColor = (pct) => {
    if (pct >= 80) return '#16A34A';
    if (pct >= 50) return '#F59E0B';
    return '#DC2626';
  };
  const pctPill = (pct) => pct >= 80 ? 'ok' : pct >= 50 ? 'warn' : 'bad';

  const C_OVERALL = 2 * Math.PI * 30;
  const overallStroke = overall.pct / 100 * C_OVERALL;

  // Build list of all "no" items for the flyout
  const allRecos = stats.flatMap(c =>
    c.items.map((i, idx) => ({ ...i, catName: c.name, key: c.id + ':' + idx }))
      .filter(i => i.ans === 'no')
  );

  return (
    <div className="eg-shell">
      <EgSidebar active="empresas" />
      <main className="eg-main">
        <EgTopbar
          breadcrumb={['Empresas', 'Prefeitura de Jundiaí', 'Eletricista predial', 'Checklists']}
          user="Ana Silva"
        />

        <div className="eg-page ck-page" data-screen-label="07 Checklists">
          {/* Header with overall score */}
          <header className="ck-head">
            <div>
              <h1>Checklist ergonômico</h1>
              <p className="sub">
                Conformidade geral em <strong>11 categorias</strong> de avaliação do posto de trabalho ·{' '}
                aplicado em <strong>18/05/2026</strong> por Ana Silva
              </p>
            </div>
            <div className="overall-score">
              <div className="overall-donut">
                <svg viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="30" fill="none" stroke="var(--ink-100)" strokeWidth="9"/>
                  <circle cx="40" cy="40" r="30" fill="none"
                    stroke={pctColor(overall.pct)} strokeWidth="9"
                    strokeDasharray={`${overallStroke} ${C_OVERALL - overallStroke}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="center">
                  <span className="v">{overall.pct}%</span>
                  <span className="l">Conforme</span>
                </div>
              </div>
              <div className="overall-meta">
                <div className="l">Score geral</div>
                <div className="nums">
                  <div>
                    <div className="n conform">{overall.conform}</div>
                    <div className="lbl">Conformes</div>
                  </div>
                  <div>
                    <div className="n nonconform">{overall.nonconform}</div>
                    <div className="lbl">Não conformes</div>
                  </div>
                  <div>
                    <div className="n">{overall.total}</div>
                    <div className="lbl">Itens totais</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="ck-body">
            {/* Category rail */}
            <nav className="ck-rail">
              <div className="ck-rail-title">Categorias</div>
              {stats.map(c => {
                const Icon = I7[c.icon];
                return (
                  <div
                    key={c.id}
                    className={'cat-item' + (t.activeCategory === c.id ? ' active' : '')}
                    onClick={() => setTweak('activeCategory', c.id)}
                  >
                    <span className="ic"><Icon/></span>
                    <div className="meta">
                      <div className="name">{c.name}</div>
                      <div className="progress-mini">
                        <span style={{
                          width: c.pct + '%',
                          background: pctColor(c.pct),
                        }}/>
                      </div>
                    </div>
                    <span className="pct">{c.pct}%</span>
                  </div>
                );
              })}
            </nav>

            {/* Main */}
            <div className="ck-main">
              <div className="ck-main-head">
                <div className="row1">
                  <span className="big-ic">{(() => { const I = I7[activeCat.icon]; return <I/>; })()}</span>
                  <div style={{flex: 1, minWidth: 0}}>
                    <h2>{activeCat.name}</h2>
                    <div className="desc">
                      Verificação de conformidade ergonômica · {activeStats.total} item{activeStats.total === 1 ? '' : 's'}
                    </div>
                  </div>
                  <div className="right-stats">
                    <div className="conformance-bar">
                      <span className="ratio-num">
                        {activeStats.conform}<span className="of">/{activeStats.applicable}</span>
                      </span>
                      <div className="ratio-meta">
                        <span className="l">Conformidade</span>
                        <span className="bar">
                          <span style={{width: activeStats.pct + '%', background: pctColor(activeStats.pct)}}/>
                        </span>
                      </div>
                    </div>
                    <span className={'conformance-pill ' + pctPill(activeStats.pct)}>
                      <span className="dot"/>{activeStats.pct}%
                    </span>
                  </div>
                </div>

                <div className="ck-toolbar">
                  <div className="ck-filter">
                    <button className={t.filter === 'all' ? 'on' : ''} onClick={() => setTweak('filter', 'all')}>
                      Todos ({activeCat.items.length})
                    </button>
                    <button className={t.filter === 'no' ? 'on' : ''} onClick={() => setTweak('filter', 'no')}>
                      Não conformes ({activeStats.nonconform})
                    </button>
                    <button className={t.filter === 'pending' ? 'on' : ''} onClick={() => setTweak('filter', 'pending')}>
                      Pendentes
                    </button>
                  </div>
                  <div style={{marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center'}}>
                    <button className="eg-btn eg-btn-ghost" style={{height: 32, padding: '0 12px', fontSize: 12}}>
                      Marcar todos como conformes
                    </button>
                  </div>
                </div>
              </div>

              <div className="ck-items">
                {filteredItems.map((item, idx) => {
                  const realIdx = activeCat.items.indexOf(item);
                  const recoKey = activeCat.id + ':' + realIdx;
                  const isAdded = addedRecos.has(recoKey);
                  return (
                    <div key={realIdx} className={'ck-item' + (item.ans === 'no' ? ' no' : '')}>
                      <span className="num">{String(realIdx + 1).padStart(2, '0')}</span>
                      <div className="q">
                        <p className="ttl">{item.q}</p>
                        <div className="ref">{item.ref}</div>
                        {item.ans === 'no' && item.reco && (
                          <div className="reco-hint">
                            <span className="reco-ic"><I7.zap/></span>
                            <div className="reco-body">
                              <div className="reco-l">Recomendação sugerida</div>
                              <div className="reco-text">{item.reco}</div>
                            </div>
                            <button
                              className={'add-reco' + (isAdded ? ' added' : '')}
                              onClick={() => toggleReco(recoKey)}
                            >
                              {isAdded ? <>
                                <span className="reco-check"><I7.check style={{width: 9, height: 9}}/></span>
                                Adicionada
                              </> : <>
                                <I7.plus/>Adicionar
                              </>}
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="toggle-switch">
                        <button
                          className={item.ans === 'yes' ? 'on-yes' : ''}
                          onClick={() => setAns(activeCat.id, realIdx, 'yes')}
                          title="Conforme"
                        >
                          {item.ans === 'yes' && <I7.check/>}Sim
                        </button>
                        <button
                          className={item.ans === 'no' ? 'on-no' : ''}
                          onClick={() => setAns(activeCat.id, realIdx, 'no')}
                          title="Não conforme"
                        >
                          {item.ans === 'no' && <I7.x/>}Não
                        </button>
                        <button
                          className={item.ans === 'na' ? 'on-na' : ''}
                          onClick={() => setAns(activeCat.id, realIdx, 'na')}
                          title="Não se aplica"
                        >
                          N/A
                        </button>
                      </div>
                    </div>
                  );
                })}
                {filteredItems.length === 0 && (
                  <div style={{padding: '60px 24px', textAlign: 'center'}}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 14,
                      background: 'var(--g-50)', color: 'var(--g-700)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 12
                    }}><I7.check/></div>
                    <div style={{font:'600 14px/1.3 var(--font-sans)', color: 'var(--ink-900)', marginBottom: 6}}>
                      Nada para mostrar neste filtro
                    </div>
                    <div style={{font:'400 13px/1.4 var(--font-sans)', color: 'var(--ink-500)'}}>
                      Troque o filtro para ver outros itens.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* — Recommendations flyout — */}
          {t.showFlyout && allRecos.length > 0 && (
            <div className="reco-flyout">
              <div className="reco-flyout-head">
                <h3>
                  <I7.zap style={{width: 14, height: 14, strokeWidth: 1.75, color: 'var(--g-700)'}}/>
                  Recomendações
                  <span className="badge">{addedRecos.size}/{allRecos.length}</span>
                </h3>
                <button className="close" onClick={() => setTweak('showFlyout', false)} aria-label="Fechar"><I7.x/></button>
              </div>
              <div className="reco-flyout-body">
                {allRecos.map(r => (
                  <div key={r.key} className="reco-flyout-item">
                    <span className="mark" style={{
                      background: addedRecos.has(r.key) ? 'var(--g-700)' : 'var(--ink-100)',
                      color: addedRecos.has(r.key) ? 'var(--white)' : 'var(--ink-500)',
                    }}>
                      {addedRecos.has(r.key) ? <I7.check/> : <I7.plus/>}
                    </span>
                    <div>
                      <div className="text">{r.reco}</div>
                      <div className="src">{r.catName}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="reco-flyout-foot">
                <button className="eg-btn eg-btn-primary" style={{width: '100%', height: 36}}>
                  Adicionar todas ao posto
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Save bar */}
        <div className="save-bar-ck">
          <div className="left-info">
            <span className="pill"><I7.check style={{width: 12, height: 12, strokeWidth: 2.5}}/>Auto-salvo · {overall.applicable} de {overall.total} preenchidos</span>
            <span>Conformidade geral: <strong style={{color: pctColor(overall.pct), fontWeight: 700}}>{overall.pct}%</strong></span>
          </div>
          <div className="actions">
            <button className="eg-btn eg-btn-ghost"><I7.pdf style={{width: 16, height: 16, strokeWidth: 1.75}}/> Exportar PDF</button>
            <button className="eg-btn eg-btn-primary">Concluir checklist</button>
          </div>
        </div>
      </main>

      <TweaksPanel title="Tweaks · Checklists">
        <TweakSection label="Navegação"/>
        <TweakSelect
          label="Categoria ativa"
          value={t.activeCategory}
          options={CATEGORIES.map(c => c.id)}
          onChange={(v) => setTweak('activeCategory', v)}
        />
        <TweakSection label="Filtros"/>
        <TweakRadio
          label="Filtro"
          value={t.filter}
          options={['all', 'no', 'pending']}
          onChange={(v) => setTweak('filter', v)}
        />
        <TweakSection label="Painéis"/>
        <TweakToggle label="Painel flutuante de recomendações" value={t.showFlyout} onChange={(v) => setTweak('showFlyout', v)}/>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('react-root')).render(<ChecklistPage />);

export default ChecklistPage;
