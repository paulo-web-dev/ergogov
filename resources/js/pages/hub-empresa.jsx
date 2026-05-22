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
  /* — Company header — */
  .co-head {
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    padding: 22px 24px;
    margin-bottom: 20px;
  }
  .co-head-top {
    display: flex; gap: 18px; align-items: flex-start;
    margin-bottom: 18px;
  }
  .co-head .avatar {
    width: 56px; height: 56px;
    border-radius: 14px;
    background: linear-gradient(135deg, #2D8659, #1F6B43);
    color: var(--white);
    display: inline-flex; align-items: center; justify-content: center;
    font: 700 18px/1 var(--font-sans);
    flex-shrink: 0;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
  }
  .co-head .meta { flex: 1; min-width: 0; }
  .co-head h1 {
    font: 700 24px/1.2 var(--font-sans);
    letter-spacing: -0.02em;
    color: var(--ink-900);
    margin: 0 0 6px;
  }
  .co-head .submeta {
    display: flex; gap: 16px; align-items: center;
    color: var(--ink-500);
    font: 500 13px/1.3 var(--font-sans);
    flex-wrap: wrap;
  }
  .co-head .submeta .sep { color: var(--line-3); }
  .co-head .submeta .cnpj { font: var(--t-mono); font-size: 12px; }
  .co-head .actions {
    display: flex; gap: 8px;
    flex-shrink: 0;
  }
  .co-head .actions .eg-btn {
    height: 38px; padding: 0 14px;
    font-size: 13px;
  }
  .co-head .actions .eg-btn svg { width: 15px; height: 15px; stroke-width: 1.75; }

  /* — KPI strip — */
  .kpi-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr) 1.4fr;
    gap: 0;
    border-top: 1px solid var(--line-1);
    padding-top: 18px;
  }
  .kpi-strip .kpi {
    padding: 0 24px;
    border-right: 1px solid var(--line-1);
    display: flex; flex-direction: column;
    gap: 6px;
  }
  .kpi-strip .kpi:first-child { padding-left: 0; }
  .kpi-strip .kpi:last-child { border-right: 0; padding-right: 0; }
  .kpi-strip .kpi .label {
    font: 500 11px/1 var(--font-sans);
    color: var(--ink-500);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .kpi-strip .kpi .label svg { width: 12px; height: 12px; stroke-width: 1.75; }
  .kpi-strip .kpi .value {
    font: 700 22px/1.05 var(--font-sans);
    letter-spacing: -0.02em;
    color: var(--ink-900);
    font-variant-numeric: tabular-nums;
  }
  .kpi-strip .kpi .delta {
    font: 500 11px/1 var(--font-sans);
    color: var(--ink-500);
  }
  .kpi-strip .kpi .delta strong { color: var(--g-700); font-weight: 600; }
  .kpi-strip .kpi.progress-kpi { padding-right: 0; }
  .kpi-strip .progress-track {
    height: 8px; background: var(--ink-100);
    border-radius: 4px;
    overflow: hidden;
    margin-top: 4px;
  }
  .kpi-strip .progress-track > span {
    display: block; height: 100%;
    background: linear-gradient(90deg, var(--g-600), var(--g-400));
    border-radius: 4px;
  }

  /* — Tab nav — */
  .tab-nav {
    display: flex; align-items: center; gap: 4px;
    border-bottom: 1px solid var(--line-1);
    margin-bottom: 24px;
    padding: 0 4px;
    overflow-x: auto;
  }
  .tab-nav button {
    position: relative;
    background: transparent; border: 0;
    padding: 14px 16px 16px;
    font: 500 14px/1 var(--font-sans);
    color: var(--ink-500);
    cursor: pointer;
    transition: color var(--dur-fast);
    white-space: nowrap;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .tab-nav button:hover { color: var(--ink-900); }
  .tab-nav button.on { color: var(--ink-900); font-weight: 600; }
  .tab-nav button.on::after {
    content: '';
    position: absolute; left: 12px; right: 12px; bottom: -1px; height: 2px;
    background: var(--g-700);
    border-radius: 2px 2px 0 0;
  }
  .tab-nav button svg { width: 16px; height: 16px; stroke-width: 1.75; }
  .tab-nav button .num {
    background: var(--ink-100);
    color: var(--ink-600);
    padding: 2px 7px;
    border-radius: 10px;
    font: 600 11px/1 var(--font-sans);
  }
  .tab-nav button.on .num { background: var(--g-100); color: var(--g-800); }

  /* — Two-column body for structure tab — */
  .body-cols {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 24px;
  }
  @media (max-width: 1100px) { .body-cols { grid-template-columns: 1fr; } }

  .panel-main {
    background: var(--surface);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    padding: 0;
    overflow: hidden;
  }
  .panel-main-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 22px;
    border-bottom: 1px solid var(--line-1);
    gap: 12px;
    flex-wrap: wrap;
  }
  .panel-main-head h2 {
    font: 600 16px/1.3 var(--font-sans);
    margin: 0; color: var(--ink-900);
  }
  .panel-main-head .actions { display: flex; gap: 8px; align-items: center; }
  .panel-main-head .tree-search {
    position: relative;
  }
  .panel-main-head .tree-search input {
    width: 220px; height: 34px;
    border: 1px solid var(--line-2);
    background: var(--white);
    border-radius: var(--r-sm);
    padding: 0 12px 0 32px;
    font: 400 13px/1 var(--font-sans);
  }
  .panel-main-head .tree-search input:focus { outline: none; border-color: var(--g-600); box-shadow: var(--ring-focus); }
  .panel-main-head .tree-search svg {
    position: absolute; left: 10px; top: 50%; transform: translateY(-50%);
    width: 14px; height: 14px; stroke-width: 1.75; color: var(--ink-400);
  }

  /* — Tree structure — */
  .tree {
    padding: 8px 0;
  }
  .tree-node {
    /* hierarchy via padding-left */
  }
  .tree-row {
    display: grid;
    grid-template-columns: 22px 36px 1fr auto auto;
    gap: 12px; align-items: center;
    padding: 10px 22px 10px 0;
    border-bottom: 1px solid var(--line-1);
    cursor: pointer;
    transition: background var(--dur-fast);
    position: relative;
  }
  .tree-row:last-child { border-bottom: 0; }
  .tree-row:hover { background: var(--ink-25); }
  .tree-row.level-1 { padding-left: 22px; background: var(--ink-25); }
  .tree-row.level-1:hover { background: var(--ink-50); }
  .tree-row.level-2 { padding-left: 56px; }
  .tree-row.level-3 { padding-left: 92px; }
  .tree-row.level-3 { background: var(--white); }

  /* vertical guides */
  .tree-row.level-2::before {
    content: ''; position: absolute;
    left: 40px; top: 0; bottom: 0;
    width: 1px; background: var(--line-2);
  }
  .tree-row.level-3::before {
    content: ''; position: absolute;
    left: 76px; top: 0; bottom: 0;
    width: 1px; background: var(--line-2);
  }

  .tree-toggle {
    width: 22px; height: 22px;
    display: inline-flex; align-items: center; justify-content: center;
    background: transparent; border: 0;
    color: var(--ink-500);
    border-radius: 5px;
    transition: all var(--dur-fast);
  }
  .tree-toggle:hover { background: var(--ink-100); color: var(--ink-900); }
  .tree-toggle svg { width: 14px; height: 14px; stroke-width: 2; transition: transform var(--dur-fast); }
  .tree-toggle.open svg { transform: rotate(90deg); }
  .tree-toggle.invisible { visibility: hidden; pointer-events: none; }

  .tree-ic {
    width: 32px; height: 32px;
    border-radius: 9px;
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .tree-ic.area { background: var(--g-100); color: var(--g-800); }
  .tree-ic.setor { background: var(--ink-100); color: var(--ink-700); }
  .tree-ic.posto { background: transparent; border: 1.5px solid var(--line-2); color: var(--ink-500); }
  .tree-ic svg { width: 16px; height: 16px; stroke-width: 1.75; }

  .tree-label .name {
    font: 600 14px/1.2 var(--font-sans);
    color: var(--ink-900);
  }
  .tree-row.level-1 .tree-label .name { font-size: 15px; }
  .tree-row.level-3 .tree-label .name { font-weight: 500; }
  .tree-label .sub {
    font: 400 12px/1.3 var(--font-sans);
    color: var(--ink-500);
    margin-top: 2px;
  }

  .tree-tools {
    display: flex; gap: 4px; align-items: center;
    font: 500 12px/1 var(--font-sans);
    color: var(--ink-500);
  }
  .tree-tools .tool-pill {
    height: 22px; padding: 0 7px;
    border-radius: var(--r-pill);
    border: 1px solid var(--line-2);
    background: var(--white);
    color: var(--ink-700);
    font: 600 10px/1 var(--font-mono);
    letter-spacing: 0.02em;
    display: inline-flex; align-items: center;
  }
  .tree-tools .tool-pill.done { background: var(--g-50); border-color: var(--g-200); color: var(--g-800); }

  .tree-row .row-actions {
    display: flex; gap: 4px; align-items: center;
    opacity: 0; transition: opacity var(--dur-fast);
  }
  .tree-row:hover .row-actions { opacity: 1; }
  .tree-row .row-actions button {
    width: 28px; height: 28px;
    background: transparent; border: 0;
    border-radius: 6px;
    color: var(--ink-500);
    display: inline-flex; align-items: center; justify-content: center;
  }
  .tree-row .row-actions button:hover { background: var(--ink-100); color: var(--ink-900); }
  .tree-row .row-actions button svg { width: 14px; height: 14px; stroke-width: 1.75; }

  .add-row {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 22px;
    background: transparent;
    border: 0;
    border-top: 1px dashed var(--line-2);
    color: var(--g-700);
    font: 500 13px/1 var(--font-sans);
    width: 100%;
    cursor: pointer;
    transition: background var(--dur-fast);
  }
  .add-row:hover { background: var(--g-25); }
  .add-row svg { width: 16px; height: 16px; stroke-width: 1.75; }

  /* — Side panel — */
  .side-panel {
    display: flex; flex-direction: column;
    gap: 16px;
  }
  .side-card {
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    overflow: hidden;
  }
  .side-card-head {
    padding: 16px 18px;
    border-bottom: 1px solid var(--line-1);
    display: flex; align-items: center; justify-content: space-between;
  }
  .side-card-head h3 {
    font: 600 13px/1.2 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-700);
    margin: 0;
  }
  .side-card-body {
    padding: 18px;
  }

  /* — Risk donut — */
  .risk-summary {
    display: flex; align-items: center; gap: 18px;
  }
  .donut {
    width: 90px; height: 90px;
    flex-shrink: 0;
    position: relative;
  }
  .donut svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .donut .center {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center;
  }
  .donut .center .n {
    font: 700 22px/1 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .donut .center .l {
    font: 500 9px/1 var(--font-sans);
    color: var(--ink-500);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 3px;
  }
  .risk-legend {
    flex: 1;
    display: flex; flex-direction: column; gap: 8px;
  }
  .risk-legend .item {
    display: grid;
    grid-template-columns: 8px 1fr auto;
    gap: 8px; align-items: center;
    font: 500 12px/1.2 var(--font-sans);
    color: var(--ink-700);
  }
  .risk-legend .item .swatch {
    width: 8px; height: 8px; border-radius: 50%;
  }
  .risk-legend .item .n {
    font: 600 13px/1 var(--font-sans);
    color: var(--ink-900);
    font-variant-numeric: tabular-nums;
  }

  /* — Activity / timeline — */
  .activity {
    display: flex; flex-direction: column;
    gap: 0;
  }
  .activity-item {
    display: grid;
    grid-template-columns: 22px 1fr;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--line-1);
  }
  .activity-item:last-child { border-bottom: 0; }
  .activity-item .marker {
    position: relative;
    height: 100%;
    display: flex; justify-content: center;
  }
  .activity-item .marker::before {
    content: ''; position: absolute; top: 4px;
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--g-500);
    border: 2px solid var(--white);
    box-shadow: 0 0 0 1px var(--g-300);
  }
  .activity-item .marker::after {
    content: ''; position: absolute; top: 18px; bottom: -16px;
    width: 1px; background: var(--line-2);
  }
  .activity-item:last-child .marker::after { display: none; }
  .activity-item .text .what {
    font: 500 13px/1.4 var(--font-sans);
    color: var(--ink-900);
  }
  .activity-item .text .who {
    color: var(--g-700); font-weight: 600;
  }
  .activity-item .text .when {
    font: 500 11px/1 var(--font-sans);
    color: var(--ink-500);
    margin-top: 3px;
  }

  /* — Quick actions panel — */
  .qa-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .qa-btn {
    display: flex; flex-direction: column; align-items: flex-start;
    gap: 8px;
    padding: 14px;
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-md);
    cursor: pointer;
    transition: all var(--dur-fast);
    text-align: left;
  }
  .qa-btn:hover {
    border-color: var(--g-300);
    background: var(--g-25);
    transform: translateY(-1px);
  }
  .qa-btn .ic {
    width: 30px; height: 30px;
    border-radius: 8px;
    background: var(--g-100);
    color: var(--g-800);
    display: inline-flex; align-items: center; justify-content: center;
  }
  .qa-btn .ic svg { width: 16px; height: 16px; stroke-width: 1.75; }
  .qa-btn .lbl {
    font: 600 12px/1.25 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.005em;
  }
  .qa-btn .desc {
    font: 400 11px/1.3 var(--font-sans);
    color: var(--ink-500);
  }

  /* — Dados gerais form — */
  .form-section {
    background: var(--surface);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    padding: 28px 32px;
    margin-bottom: 16px;
  }
  .form-section h2 {
    font: 600 16px/1.3 var(--font-sans);
    color: var(--ink-900);
    margin: 0 0 4px;
  }
  .form-section .h-sub {
    font: var(--t-body-sm);
    color: var(--ink-500);
    margin-bottom: 24px;
  }
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px 24px;
  }
  .form-grid .span-2 { grid-column: span 2; }
  @media (max-width: 720px) { .form-grid { grid-template-columns: 1fr; } .form-grid .span-2 { grid-column: auto; } }

  .form-footer {
    display: flex; justify-content: flex-end; gap: 10px;
    margin-top: 8px;
  }

  /* — Generic tab placeholder — */
  .tab-placeholder {
    background: var(--surface);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    padding: 60px 32px;
    text-align: center;
  }
  .tab-placeholder .ic {
    width: 56px; height: 56px;
    border-radius: 16px;
    background: var(--g-50); color: var(--g-700);
    display: inline-flex; align-items: center; justify-content: center;
    margin-bottom: 16px;
  }
  .tab-placeholder .ic svg { width: 28px; height: 28px; stroke-width: 1.5; }
  .tab-placeholder h3 {
    font: 600 18px/1.3 var(--font-sans); color: var(--ink-900);
    margin: 0 0 8px;
  }
  .tab-placeholder p {
    font: var(--t-body); color: var(--ink-500);
    max-width: 480px; margin: 0 auto 20px;
  }
`;

// TweaksPanel stub — design tool removed for production

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}

const { useState, useMemo } = React;

const I4 = {
  chevR: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6"/></svg>,
  plus: EgIcon.plus,
  download: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>,
  pdf: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>,
  share: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/></svg>,
  link: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></svg>,
  chart: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-7"/></svg>,
  layout: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  print: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"/><rect x="3" y="9" width="18" height="9" rx="2"/><path d="M6 18v4h12v-4"/></svg>,
  layers: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>,
  factory: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V11l5 3V11l5 3V11l5 3v7H3Z"/><path d="M3 11V5"/><path d="M21 11V5"/></svg>,
  person: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>,
  building: EgIcon.building,
  more: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg>,
  edit: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"/></svg>,
  clipboard: EgIcon.clipboard,
  brain: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2a3 3 0 0 0-3 3 3 3 0 0 0-2.5 3 3 3 0 0 0 .5 4.5A3 3 0 0 0 4 17a3 3 0 0 0 5.5 1.5A3 3 0 0 0 12 20"/><path d="M14.5 2a3 3 0 0 1 3 3 3 3 0 0 1 2.5 3 3 3 0 0 1-.5 4.5A3 3 0 0 1 20 17a3 3 0 0 1-5.5 1.5A3 3 0 0 1 12 20"/><path d="M12 6v14"/></svg>,
  search: EgIcon.search,
  expand: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M7 14l5 5 5-5M7 10l5-5 5 5"/></svg>,
  collapse: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l5-5 5 5M7 7l5 5 5-5"/></svg>,
};

// — Mock data —
// COMPANY and STRUCTURE from server props
const RISK_LABELS = {
  high: { label: 'Alto', color: '#DC2626', bg: '#FEF1F1', fg: '#B91C1C' },
  med: { label: 'Moderado', color: '#F59E0B', bg: '#FFF7E6', fg: '#B45309' },
  low: { label: 'Baixo', color: '#16A34A', bg: '#E7F4EC', fg: '#15703D' },
  pending: { label: 'Pendente', color: '#94A199', bg: '#ECF0EE', fg: '#4A5D53' },
};

const ACTIVITY = [
  { what: 'Pregoeiro — Pregoeiro · RULA aplicado', who: 'Ana Silva', when: 'hoje, 14:32' },
  { what: 'Eletricista predial — risco alto identificado', who: 'Ana Silva', when: 'ontem, 16:08' },
  { what: 'Setor Manutenção predial — Checklist concluído', who: 'Carlos M.', when: 'há 2 dias' },
  { what: 'Pesquisa ARP enviada para 142 colaboradores', who: 'Sistema', when: 'há 3 dias' },
];

// — Tree row component —
function TreeRow({ level, icon, name, sub, count, risk, tools, expanded, onToggle, hasChildren }) {
  const r = risk ? RISK_LABELS[risk] : null;
  return (
    <div className={'tree-row level-' + level} onClick={hasChildren ? onToggle : undefined}>
      {hasChildren ? (
        <button className={'tree-toggle' + (expanded ? ' open' : '')} aria-label={expanded ? 'Recolher' : 'Expandir'}>
          <I4.chevR />
        </button>
      ) : <span className="tree-toggle invisible"/>}
      <span className={'tree-ic ' + (level === 1 ? 'area' : level === 2 ? 'setor' : 'posto')}>
        {level === 1 ? <I4.layers/> : level === 2 ? <I4.building/> : <I4.person/>}
      </span>
      <div className="tree-label">
        <div className="name">{name}</div>
        {sub && <div className="sub">{sub}</div>}
      </div>
      <div className="tree-tools">
        {tools && tools.slice(0, 4).map((t, i) => (
          <span key={i} className={'tool-pill' + (t === 'Pendente' ? '' : ' done')}>{t}</span>
        ))}
        {tools && tools.length > 4 && <span className="tool-pill">+{tools.length - 4}</span>}
        {r && (
          <span className="eg-badge" style={{
            background: r.bg, color: r.fg,
            border: '1px solid ' + r.color + '40'
          }}>
            <span className="dot"/>{r.label}{r.label === 'Pendente' ? '' : ' · ' + tools[0]}
          </span>
        )}
      </div>
      <div className="row-actions" onClick={(e) => e.stopPropagation()}>
        <button aria-label="Adicionar"><I4.plus/></button>
        <button aria-label="Editar"><I4.edit/></button>
        <button aria-label="Mais"><I4.more/></button>
      </div>
    </div>
  );
}

// — Risk donut —
function RiskDonut({ values }) {
  const total = values.reduce((a, b) => a + b.n, 0);
  const C = 2 * Math.PI * 32;
  let offset = 0;
  return (
    <div className="donut">
      <svg viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="32" fill="none" stroke="var(--ink-100)" strokeWidth="11"/>
        {values.map((v, i) => {
          const seg = (v.n / total) * C;
          const dasharray = `${seg} ${C - seg}`;
          const dashoffset = -offset;
          offset += seg;
          return (
            <circle key={i} cx="40" cy="40" r="32"
              fill="none" stroke={v.color} strokeWidth="11"
              strokeDasharray={dasharray} strokeDashoffset={dashoffset} strokeLinecap="butt"/>
          );
        })}
      </svg>
      <div className="center">
        <span className="n">{total}</span>
        <span className="l">Postos</span>
      </div>
    </div>
  );
}

// — Tweakable defaults —
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tab": "estrutura",
  "showSidePanel": true,
  "treeExpanded": "smart",
  "showRowActions": true,
  "actionsLayout": "compact"
}/*EDITMODE-END*/;

function HubPage(serverProps) {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Real data from Laravel
  const user      = serverProps?.user    || { name: 'Usuário' };
  const empresa   = serverProps?.empresa || {};
  const structure = serverProps?.structure || [];
  const arp       = serverProps?.arp      || {};

  // Map to COMPANY shape expected by JSX
  const COMPANY = {
    id:          empresa.id,
    name:        empresa.name        || empresa.nome || '—',
    cnpj:        empresa.cnpj        || '—',
    sector:      empresa.sector      || empresa.setor || '—',
    responsavel: empresa.responsavel || '—',
    email:       empresa.email       || '—',
    endereco:    empresa.rua         ? empresa.rua + ', ' + (empresa.numero || '') : '—',
    cidade:      empresa.cidade      || '—',
    uf:          empresa.estado      || '—',
    cep:         empresa.cep         || '—',
    inscEst:     empresa.inscricao_estadual || '—',
    cnae:        empresa.setor       || '—',
    tituloAET:   empresa.titulo      || '—',
    status:      empresa.status      || 'andamento',
    totalAreas:  empresa.totalAreas  || 0,
    totalSetores:empresa.totalSetores|| 0,
    totalPostos: empresa.totalPostos || 0,
    progress:    empresa.progress    || 0,
  };

  const STRUCTURE = structure;
  const [tab, setTab] = useState(t.tab || 'estrutura');

  // sync tweak → state
  React.useEffect(() => { setTab(t.tab); }, [t.tab]);

  const [expanded, setExpanded] = useState(() => {
    if (t.treeExpanded === 'all') return new Set(STRUCTURE.flatMap(a => [a.id, ...a.setores.map(s => s.id)]));
    if (t.treeExpanded === 'none') return new Set();
    // smart: expand first area, all its setores
    return new Set([STRUCTURE[0].id, STRUCTURE[1].id, ...STRUCTURE[0].setores.map(s => s.id), STRUCTURE[1].setores[0].id]);
  });
  React.useEffect(() => {
    if (t.treeExpanded === 'all') setExpanded(new Set(STRUCTURE.flatMap(a => [a.id, ...a.setores.map(s => s.id)])));
    if (t.treeExpanded === 'none') setExpanded(new Set());
  }, [t.treeExpanded]);

  const toggle = (id) => setExpanded(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const totals = useMemo(() => {
    let areas = STRUCTURE.length, setores = 0, postos = 0, high = 0, med = 0, low = 0, pending = 0;
    STRUCTURE.forEach(a => {
      setores += a.setores.length;
      a.setores.forEach(s => {
        s.postos.forEach(p => {
          postos++;
          if (p.risk === 'high') high++;
          else if (p.risk === 'med') med++;
          else if (p.risk === 'low') low++;
          else if (p.risk === 'pending') pending++;
        });
      });
    });
    return { areas, setores, postos, high, med, low, pending };
  }, []);

  const progress = Math.round(((totals.postos - totals.pending) / totals.postos) * 100);

  const TabBtn = ({ id, icon, label, num }) => (
    <button className={tab === id ? 'on' : ''} onClick={() => { setTab(id); setTweak('tab', id); }}>
      {icon}<span>{label}</span>{num != null && <span className="num">{num}</span>}
    </button>
  );

  return (
    <div className="eg-shell">
      <EgSidebar active="empresas" />
      <main className="eg-main">
        <EgTopbar breadcrumb={['Início', 'Empresas', COMPANY.name]} user={user.name}/>

        <div className="eg-page" data-screen-label="04 Hub Empresa">
          {/* Company header */}
          <header className="co-head">
            <div className="co-head-top">
              <span className="avatar">PJ</span>
              <div className="meta">
                <h1>{COMPANY.name}</h1>
                <div className="submeta">
                  <span className="cnpj">CNPJ {COMPANY.cnpj}</span>
                  <span className="sep">·</span>
                  <span>{COMPANY.sector}</span>
                  <span className="sep">·</span>
                  <span className="eg-badge eg-badge-risk-med"><span className="dot"/>AET em andamento</span>
                  <span className="sep">·</span>
                  <span>Atualizado há 2 dias</span>
                </div>
              </div>
              <div className="actions">
                <button className="eg-btn eg-btn-secondary"><I4.chart/> Dashboard</button>
                <button className="eg-btn eg-btn-secondary"><I4.link/> Link ARP</button>
                <button className="eg-btn eg-btn-primary"><I4.pdf/> Gerar relatório</button>
              </div>
            </div>
            <div className="kpi-strip">
              <div className="kpi">
                <span className="label"><I4.layers/> Áreas</span>
                <span className="value">{totals.areas}</span>
                <span className="delta">organização ativa</span>
              </div>
              <div className="kpi">
                <span className="label"><I4.building/> Setores</span>
                <span className="value">{totals.setores}</span>
                <span className="delta"><strong>+2</strong> este mês</span>
              </div>
              <div className="kpi">
                <span className="label"><I4.person/> Postos avaliados</span>
                <span className="value">{totals.postos - totals.pending}<span style={{font:'400 14px/1 var(--font-sans)', color:'var(--ink-400)'}}> / {totals.postos}</span></span>
                <span className="delta">{totals.pending} pendente{totals.pending===1?'':'s'}</span>
              </div>
              <div className="kpi">
                <span className="label" style={{color: 'var(--risk-high-fg)'}}>● Risco alto</span>
                <span className="value" style={{color: 'var(--risk-high-fg)'}}>{totals.high}</span>
                <span className="delta">{Math.round(totals.high/totals.postos*100)}% dos postos</span>
              </div>
              <div className="kpi progress-kpi">
                <span className="label">Conclusão da AET</span>
                <span className="value">{progress}%</span>
                <div className="progress-track"><span style={{width: progress + '%'}}/></div>
              </div>
            </div>
          </header>

          {/* Tabs */}
          <nav className="tab-nav">
            <TabBtn id="dados"    icon={<I4.edit/>}      label="Dados gerais" />
            <TabBtn id="estrutura" icon={<I4.layers/>}   label="Estrutura da AET" num={totals.postos}/>
            <TabBtn id="checklists" icon={<I4.clipboard/>} label="Checklists" num={12}/>
            <TabBtn id="arp"      icon={<I4.brain/>}    label="ARP" num={4}/>
            <TabBtn id="docs"     icon={<I4.pdf/>}      label="Documentos" num={8}/>
          </nav>

          {/* Tab content */}
          {tab === 'estrutura' && (
            <div className={t.showSidePanel ? 'body-cols' : ''}>
              <div className="panel-main">
                <div className="panel-main-head">
                  <h2>Estrutura organizacional · Áreas → Setores → Postos</h2>
                  <div className="actions">
                    <div className="tree-search">
                      <I4.search/>
                      <input type="search" placeholder="Buscar posto, setor…"/>
                    </div>
                    <button className="eg-btn eg-btn-secondary" style={{height: 34, padding: '0 12px', fontSize: 12}}
                            onClick={() => setExpanded(new Set(STRUCTURE.flatMap(a => [a.id, ...a.setores.map(s => s.id)])))}>
                      <I4.expand style={{width: 14, height: 14}}/>
                    </button>
                    <button className="eg-btn eg-btn-secondary" style={{height: 34, padding: '0 12px', fontSize: 12}}
                            onClick={() => setExpanded(new Set())}>
                      <I4.collapse style={{width: 14, height: 14}}/>
                    </button>
                  </div>
                </div>
                <div className="tree">
                  {STRUCTURE.map(area => (
                    <div key={area.id} className="tree-node">
                      <TreeRow
                        level={1} name={area.name} sub={area.desc}
                        expanded={expanded.has(area.id)} onToggle={() => toggle(area.id)}
                        hasChildren={true}
                      />
                      {expanded.has(area.id) && area.setores.map(setor => (
                        <React.Fragment key={setor.id}>
                          <TreeRow
                            level={2} name={setor.name} sub={setor.desc}
                            expanded={expanded.has(setor.id)} onToggle={() => toggle(setor.id)}
                            hasChildren={true}
                          />
                          {expanded.has(setor.id) && setor.postos.map(posto => (
                            <TreeRow
                              key={posto.id}
                              level={3} name={posto.name}
                              tools={posto.tools} risk={posto.risk}
                              hasChildren={false}
                            />
                          ))}
                          {expanded.has(setor.id) && (
                            <button className="add-row" style={{paddingLeft: 92}}>
                              <I4.plus/> Adicionar posto de trabalho em {setor.name}
                            </button>
                          )}
                        </React.Fragment>
                      ))}
                      {expanded.has(area.id) && (
                        <button className="add-row" style={{paddingLeft: 56}}>
                          <I4.plus/> Adicionar setor em {area.name}
                        </button>
                      )}
                    </div>
                  ))}
                  <button className="add-row">
                    <I4.plus/> Adicionar nova área
                  </button>
                </div>
              </div>

              {t.showSidePanel && (
                <aside className="side-panel">
                  <div className="side-card">
                    <div className="side-card-head"><h3>Distribuição de risco</h3></div>
                    <div className="side-card-body">
                      <div className="risk-summary">
                        <RiskDonut values={[
                          { n: totals.high, color: '#DC2626' },
                          { n: totals.med, color: '#F59E0B' },
                          { n: totals.low, color: '#16A34A' },
                          { n: totals.pending, color: '#C5CFC9' },
                        ]}/>
                        <div className="risk-legend">
                          <div className="item"><span className="swatch" style={{background:'#DC2626'}}/>Alto<span className="n">{totals.high}</span></div>
                          <div className="item"><span className="swatch" style={{background:'#F59E0B'}}/>Moderado<span className="n">{totals.med}</span></div>
                          <div className="item"><span className="swatch" style={{background:'#16A34A'}}/>Baixo<span className="n">{totals.low}</span></div>
                          <div className="item"><span className="swatch" style={{background:'#C5CFC9'}}/>Pendente<span className="n">{totals.pending}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="side-card">
                    <div className="side-card-head"><h3>Ações rápidas</h3></div>
                    <div className="side-card-body">
                      <div className="qa-grid">
                        <button className="qa-btn">
                          <span className="ic"><I4.chart/></span>
                          <span className="lbl">Dashboard gerencial</span>
                          <span className="desc">Visualizar indicadores</span>
                        </button>
                        <button className="qa-btn">
                          <span className="ic"><I4.pdf/></span>
                          <span className="lbl">Relatório PDF</span>
                          <span className="desc">Gerar laudo técnico</span>
                        </button>
                        <button className="qa-btn">
                          <span className="ic"><I4.link/></span>
                          <span className="lbl">Link ARP público</span>
                          <span className="desc">Copiar link da pesquisa</span>
                        </button>
                        <button className="qa-btn">
                          <span className="ic"><I4.layout/></span>
                          <span className="lbl">Cabeçalho & rodapé</span>
                          <span className="desc">Identidade do PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="side-card">
                    <div className="side-card-head">
                      <h3>Atividade recente</h3>
                      <a href="#" style={{font:'500 11px/1 var(--font-sans)', color:'var(--g-700)'}}>Ver tudo</a>
                    </div>
                    <div className="side-card-body">
                      <div className="activity">
                        {ACTIVITY.map((a, i) => (
                          <div key={i} className="activity-item">
                            <span className="marker"/>
                            <div className="text">
                              <span className="what">{a.what}</span>
                              <div className="when"><span className="who">{a.who}</span> · {a.when}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </aside>
              )}
            </div>
          )}

          {tab === 'dados' && (
            <div className="body-cols" style={t.showSidePanel ? {} : {gridTemplateColumns: '1fr'}}>
              <div>
                <div className="form-section">
                  <h2>Identificação</h2>
                  <p className="h-sub">Dados cadastrais utilizados no relatório técnico e na geração de documentos.</p>
                  <div className="form-grid">
                    <div className="span-2">
                      <label className="eg-label">Razão social</label>
                      <input className="eg-input" defaultValue={COMPANY.name}/>
                    </div>
                    <div>
                      <label className="eg-label">CNPJ</label>
                      <input className="eg-input" defaultValue={COMPANY.cnpj}/>
                    </div>
                    <div>
                      <label className="eg-label">Inscrição estadual</label>
                      <input className="eg-input" defaultValue={COMPANY.inscEst}/>
                    </div>
                    <div className="span-2">
                      <label className="eg-label">CNAE principal</label>
                      <input className="eg-input" defaultValue={COMPANY.cnae}/>
                    </div>
                    <div className="span-2">
                      <label className="eg-label">Título da AET</label>
                      <input className="eg-input" defaultValue={COMPANY.tituloAET}/>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h2>Endereço</h2>
                  <div className="form-grid">
                    <div className="span-2">
                      <label className="eg-label">Logradouro</label>
                      <input className="eg-input" defaultValue={COMPANY.endereco}/>
                    </div>
                    <div>
                      <label className="eg-label">Cidade</label>
                      <input className="eg-input" defaultValue={COMPANY.cidade}/>
                    </div>
                    <div>
                      <label className="eg-label">UF</label>
                      <input className="eg-input" defaultValue={COMPANY.uf}/>
                    </div>
                    <div>
                      <label className="eg-label">CEP</label>
                      <input className="eg-input" defaultValue={COMPANY.cep}/>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h2>Responsável técnico</h2>
                  <div className="form-grid">
                    <div className="span-2">
                      <label className="eg-label">Nome e formação</label>
                      <input className="eg-input" defaultValue={COMPANY.responsavel}/>
                    </div>
                    <div>
                      <label className="eg-label">E-mail de contato</label>
                      <input className="eg-input" defaultValue={COMPANY.email}/>
                    </div>
                    <div>
                      <label className="eg-label">Telefone</label>
                      <input className="eg-input" defaultValue="(11) 4589-8000"/>
                    </div>
                  </div>
                </div>

                <div className="form-footer">
                  <button className="eg-btn eg-btn-secondary">Cancelar</button>
                  <button className="eg-btn eg-btn-primary">Salvar alterações</button>
                </div>
              </div>

              {t.showSidePanel && (
                <aside className="side-panel">
                  <div className="side-card">
                    <div className="side-card-head"><h3>Status do cadastro</h3></div>
                    <div className="side-card-body" style={{display:'flex', flexDirection:'column', gap: 10}}>
                      <div style={{display:'flex', justifyContent:'space-between', fontSize:13}}>
                        <span style={{color:'var(--ink-700)'}}>Dados cadastrais</span>
                        <span style={{color:'var(--g-700)', fontWeight:600}}>Completo</span>
                      </div>
                      <div style={{display:'flex', justifyContent:'space-between', fontSize:13}}>
                        <span style={{color:'var(--ink-700)'}}>Endereço</span>
                        <span style={{color:'var(--g-700)', fontWeight:600}}>Completo</span>
                      </div>
                      <div style={{display:'flex', justifyContent:'space-between', fontSize:13}}>
                        <span style={{color:'var(--ink-700)'}}>Responsável técnico</span>
                        <span style={{color:'var(--g-700)', fontWeight:600}}>Completo</span>
                      </div>
                      <div style={{display:'flex', justifyContent:'space-between', fontSize:13}}>
                        <span style={{color:'var(--ink-700)'}}>Identidade visual</span>
                        <span style={{color:'var(--risk-med-fg)', fontWeight:600}}>Pendente</span>
                      </div>
                    </div>
                  </div>
                </aside>
              )}
            </div>
          )}

          {tab === 'checklists' && (
            <div className="tab-placeholder">
              <span className="ic"><I4.clipboard/></span>
              <h3>12 checklists ergonômicos aplicados</h3>
              <p>Tela detalhada de checklists (cadeira, mesa, monitor, teclado, iluminação...) — desenhada na Página 7 do redesign.</p>
              <button className="eg-btn eg-btn-primary"><I4.plus/> Novo checklist</button>
            </div>
          )}

          {tab === 'arp' && (
            <div className="tab-placeholder">
              <span className="ic"><I4.brain/></span>
              <h3>4 pesquisas ARP · 1.247 respostas</h3>
              <p>Avaliações de Riscos Psicossociais ativas. Compartilhe o link público com colaboradores e visualize indicadores por categoria.</p>
              <div style={{display:'flex', gap: 8, justifyContent:'center'}}>
                <button className="eg-btn eg-btn-secondary"><I4.link/> Copiar link público</button>
                <button className="eg-btn eg-btn-primary"><I4.plus/> Nova pesquisa</button>
              </div>
            </div>
          )}

          {tab === 'docs' && (
            <div className="tab-placeholder">
              <span className="ic"><I4.pdf/></span>
              <h3>8 documentos arquivados</h3>
              <p>Histórico completo de laudos AET, relatórios ARP e checklists em PDF gerados para esta organização.</p>
              <button className="eg-btn eg-btn-primary"><I4.pdf/> Gerar novo relatório</button>
            </div>
          )}
        </div>
      </main>

      <TweaksPanel title="Tweaks · Hub">
        <TweakSection label="Aba ativa" />
        <TweakSelect
          label="Aba"
          value={t.tab}
          options={['dados', 'estrutura', 'checklists', 'arp', 'docs']}
          onChange={(v) => setTweak('tab', v)}
        />
        <TweakSection label="Layout" />
        <TweakToggle label="Painel lateral direito" value={t.showSidePanel} onChange={(v) => setTweak('showSidePanel', v)}/>
        <TweakSection label="Árvore (Estrutura)" />
        <TweakRadio
          label="Expansão inicial"
          value={t.treeExpanded}
          options={['none', 'smart', 'all']}
          onChange={(v) => setTweak('treeExpanded', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('react-root')).render(<HubPage />);

export default HubPage;
