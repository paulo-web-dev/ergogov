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
  .dash-page { max-width: 1400px; padding: 28px 32px; }

  /* — Dash header — */
  .dash-head {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 24px;
    align-items: center;
    margin-bottom: 24px;
  }
  .dash-head .h-left .eyebrow {
    font: var(--t-eyebrow);
    color: var(--g-700);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    display: inline-flex; align-items: center; gap: 8px;
    margin-bottom: 8px;
  }
  .dash-head .h-left .eyebrow .dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--g-500);
    box-shadow: 0 0 0 3px var(--g-100);
  }
  .dash-head h1 {
    font: 700 28px/1.15 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.025em;
    margin: 0 0 8px;
  }
  .dash-head .meta {
    font: 500 13px/1.4 var(--font-sans);
    color: var(--ink-500);
    display: flex; gap: 16px;
    align-items: center;
    flex-wrap: wrap;
  }
  .dash-head .meta .sep { color: var(--line-3); }
  .dash-head .meta strong { color: var(--ink-900); font-weight: 600; }
  .dash-head .h-right {
    display: flex; gap: 8px; align-items: center;
  }
  .dash-head .h-right .period-toggle {
    display: inline-flex;
    padding: 3px;
    background: var(--ink-25);
    border: 1px solid var(--line-1);
    border-radius: var(--r-md);
  }
  .dash-head .h-right .period-toggle button {
    padding: 6px 12px;
    background: transparent; border: 0;
    border-radius: 6px;
    color: var(--ink-600);
    font: 500 12px/1 var(--font-sans);
    cursor: pointer;
    transition: all var(--dur-fast);
  }
  .dash-head .h-right .period-toggle button.on {
    background: var(--white);
    color: var(--ink-900);
    box-shadow: var(--shadow-xs);
    font-weight: 600;
  }

  /* — KPI strip — */
  .kpi-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 20px;
  }
  @media (max-width: 1000px) { .kpi-row { grid-template-columns: repeat(2, 1fr); } }

  .kpi-card {
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    padding: 22px;
    display: flex; flex-direction: column;
    gap: 14px;
    position: relative;
    overflow: hidden;
  }
  .kpi-card .top-row {
    display: flex; align-items: center; justify-content: space-between;
  }
  .kpi-card .top-row .label {
    font: 500 12px/1 var(--font-sans);
    color: var(--ink-500);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .kpi-card .top-row .delta {
    font: 600 11px/1 var(--font-sans);
    padding: 4px 8px;
    border-radius: var(--r-pill);
  }
  .kpi-card .top-row .delta.up   { background: var(--risk-high-bg); color: var(--risk-high-fg); }
  .kpi-card .top-row .delta.down { background: var(--g-100); color: var(--g-800); }
  .kpi-card .top-row .delta.neutral { background: var(--ink-100); color: var(--ink-700); }
  .kpi-card .big-num {
    font: 700 44px/1 var(--font-sans);
    letter-spacing: -0.03em;
    color: var(--ink-900);
    font-variant-numeric: tabular-nums;
  }
  .kpi-card .big-num.risk-h { color: var(--risk-high-fg); }
  .kpi-card .big-num.risk-m { color: var(--risk-med-fg); }
  .kpi-card .big-num.risk-l { color: var(--risk-low-fg); }
  .kpi-card .big-num .pct {
    font: 600 16px/1 var(--font-sans);
    color: var(--ink-500);
    margin-left: 8px;
    letter-spacing: -0.01em;
  }
  .kpi-card .footer {
    display: flex; align-items: center; gap: 8px;
    padding-top: 12px;
    border-top: 1px solid var(--line-1);
    font: 500 12px/1.3 var(--font-sans);
    color: var(--ink-500);
  }
  .kpi-card .footer .ic {
    width: 22px; height: 22px;
    border-radius: 6px;
    background: var(--ink-100);
    color: var(--ink-700);
    display: inline-flex; align-items: center; justify-content: center;
  }
  .kpi-card .footer .ic svg { width: 12px; height: 12px; stroke-width: 1.75; }
  .kpi-card.risk-h .footer .ic { background: var(--risk-high-bg); color: var(--risk-high-fg); }
  .kpi-card.risk-m .footer .ic { background: var(--risk-med-bg); color: var(--risk-med-fg); }
  .kpi-card.risk-l .footer .ic { background: var(--g-100); color: var(--g-800); }
  .kpi-card.risk-h { border-left: 3px solid var(--risk-high-solid); }
  .kpi-card.risk-m { border-left: 3px solid var(--risk-med-solid); }
  .kpi-card.risk-l { border-left: 3px solid var(--risk-low-solid); }

  /* — Two-column charts — */
  .charts-row {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }
  @media (max-width: 1000px) { .charts-row { grid-template-columns: 1fr; } }

  .panel {
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    overflow: hidden;
  }
  .panel-head {
    padding: 18px 22px;
    border-bottom: 1px solid var(--line-1);
    display: flex; align-items: center; gap: 14px;
    flex-wrap: wrap;
  }
  .panel-head h2 {
    font: 600 15px/1.2 var(--font-sans);
    color: var(--ink-900);
    margin: 0;
    letter-spacing: -0.01em;
  }
  .panel-head .h-sub {
    font: 400 12px/1.3 var(--font-sans);
    color: var(--ink-500);
    margin-top: 2px;
  }
  .panel-head .actions {
    margin-left: auto;
    display: flex; gap: 6px; align-items: center;
  }
  .panel-head .actions button {
    width: 28px; height: 28px;
    border: 0; background: transparent;
    border-radius: 6px;
    color: var(--ink-500);
    display: inline-flex; align-items: center; justify-content: center;
  }
  .panel-head .actions button:hover { background: var(--ink-50); color: var(--ink-900); }
  .panel-head .actions svg { width: 14px; height: 14px; stroke-width: 1.75; }

  .panel-body { padding: 18px 22px 22px; }

  /* — Stacked horizontal bar chart — */
  .stacked-bars {
    display: flex; flex-direction: column;
    gap: 16px;
  }
  .stacked-row {
    display: grid;
    grid-template-columns: 140px 1fr 80px;
    gap: 14px;
    align-items: center;
  }
  .stacked-row .area-label {
    display: flex; flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .stacked-row .area-label .name {
    font: 600 13px/1.2 var(--font-sans);
    color: var(--ink-900);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .stacked-row .area-label .sub {
    font: 400 11px/1.2 var(--font-sans);
    color: var(--ink-500);
  }
  .stacked-bar-track {
    height: 32px;
    background: var(--ink-50);
    border-radius: var(--r-sm);
    overflow: hidden;
    display: flex;
    border: 1px solid var(--line-1);
  }
  .stacked-bar-seg {
    display: flex; align-items: center; justify-content: center;
    color: var(--white);
    font: 700 12px/1 var(--font-mono);
    transition: width var(--dur), filter var(--dur-fast);
    cursor: pointer;
    position: relative;
  }
  .stacked-bar-seg.h { background: linear-gradient(180deg, #EF4444, #DC2626); }
  .stacked-bar-seg.m { background: linear-gradient(180deg, #FBBF24, #F59E0B); }
  .stacked-bar-seg.l { background: linear-gradient(180deg, #4ADE80, #16A34A); }
  .stacked-bar-seg:hover { filter: brightness(1.1); }
  .stacked-row .total {
    text-align: right;
    font: 700 14px/1 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
  }
  .stacked-row .total .sub {
    font: 500 11px/1.2 var(--font-sans);
    color: var(--ink-500);
    font-weight: 500;
    margin-top: 2px;
    letter-spacing: 0;
  }

  .chart-legend {
    display: flex; gap: 18px; align-items: center;
    padding: 14px 22px;
    border-top: 1px solid var(--line-1);
    font: 500 12px/1 var(--font-sans);
    color: var(--ink-600);
    flex-wrap: wrap;
  }
  .chart-legend .item {
    display: inline-flex; align-items: center; gap: 7px;
  }
  .chart-legend .swatch {
    width: 11px; height: 11px;
    border-radius: 3px;
  }
  .chart-legend .swatch.h { background: linear-gradient(180deg, #EF4444, #DC2626); }
  .chart-legend .swatch.m { background: linear-gradient(180deg, #FBBF24, #F59E0B); }
  .chart-legend .swatch.l { background: linear-gradient(180deg, #4ADE80, #16A34A); }
  .chart-legend .item strong { color: var(--ink-900); font-weight: 700; }

  /* — Donut — */
  .donut-wrap {
    display: flex; flex-direction: column; align-items: center;
    padding: 12px 0 0;
  }
  .donut-big {
    width: 220px; height: 220px;
    position: relative;
    margin-bottom: 18px;
  }
  .donut-big svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .donut-big .center {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
  }
  .donut-big .center .num {
    font: 700 48px/1 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
  }
  .donut-big .center .lbl {
    font: 500 11px/1 var(--font-sans);
    color: var(--ink-500);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 6px;
  }
  .donut-legend {
    width: 100%;
    display: flex; flex-direction: column;
    gap: 0;
  }
  .donut-legend .item {
    display: grid;
    grid-template-columns: 12px 1fr auto auto;
    gap: 10px;
    align-items: center;
    padding: 10px 4px;
    border-bottom: 1px solid var(--line-1);
  }
  .donut-legend .item:last-child { border-bottom: 0; }
  .donut-legend .swatch {
    width: 12px; height: 12px;
    border-radius: 50%;
  }
  .donut-legend .name {
    font: 500 13px/1.2 var(--font-sans);
    color: var(--ink-800);
  }
  .donut-legend .num {
    font: 700 14px/1 var(--font-mono);
    color: var(--ink-900);
    font-variant-numeric: tabular-nums;
  }
  .donut-legend .pct {
    font: 500 11px/1 var(--font-sans);
    color: var(--ink-500);
    min-width: 36px; text-align: right;
  }

  /* — Critical posts table — */
  .table-panel { margin-bottom: 20px; }
  .crit-table {
    width: 100%;
    border-collapse: collapse;
  }
  .crit-table thead th {
    background: var(--ink-25);
    padding: 12px 18px;
    text-align: left;
    font: 600 11px/1 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-500);
    border-bottom: 1px solid var(--line-1);
  }
  .crit-table thead th:first-child { padding-left: 22px; }
  .crit-table thead th:last-child { padding-right: 22px; }
  .crit-table tbody td {
    padding: 14px 18px;
    border-bottom: 1px solid var(--line-1);
    font: 400 13px/1.4 var(--font-sans);
    color: var(--ink-700);
    vertical-align: top;
  }
  .crit-table tbody td:first-child { padding-left: 22px; }
  .crit-table tbody td:last-child { padding-right: 22px; }
  .crit-table tbody tr:last-child td { border-bottom: 0; }
  .crit-table tbody tr { transition: background var(--dur-fast); cursor: pointer; }
  .crit-table tbody tr:hover { background: var(--ink-25); }
  .crit-table .area-pill {
    display: inline-flex;
    padding: 3px 8px;
    border-radius: var(--r-pill);
    font: 600 11px/1 var(--font-sans);
    color: var(--ink-700);
    background: var(--ink-100);
    border: 1px solid var(--line-2);
  }
  .crit-table .posto-name {
    font: 600 13px/1.3 var(--font-sans);
    color: var(--ink-900);
  }
  .crit-table .posto-sub {
    font: 400 11.5px/1.3 var(--font-sans);
    color: var(--ink-500);
    margin-top: 2px;
  }
  .crit-table .tool-cell {
    display: inline-flex; align-items: center; gap: 8px;
  }
  .crit-table .tool-cell .tool-code {
    font: 700 12px/1 var(--font-mono);
    color: var(--ink-900);
    padding: 4px 7px;
    background: var(--ink-100);
    border-radius: 5px;
  }
  .crit-table .score-cell {
    font: 700 18px/1 var(--font-sans);
    color: var(--risk-high-fg);
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .crit-table .reco-cell {
    color: var(--ink-700);
    max-width: 320px;
  }
  .crit-table .action-cell button {
    background: transparent;
    border: 1px solid var(--line-2);
    border-radius: var(--r-sm);
    padding: 6px 10px;
    color: var(--ink-700);
    font: 500 12px/1 var(--font-sans);
    display: inline-flex; align-items: center; gap: 4px;
    cursor: pointer;
    transition: all var(--dur-fast);
  }
  .crit-table .action-cell button:hover { background: var(--g-50); border-color: var(--g-300); color: var(--g-800); }

  /* — ARP / Heatmap row — */
  .lower-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  @media (max-width: 1000px) { .lower-row { grid-template-columns: 1fr; } }

  /* ARP horizontal bars */
  .arp-bars {
    display: flex; flex-direction: column;
    gap: 14px;
  }
  .arp-bar-row {
    display: grid;
    grid-template-columns: 1fr 60px;
    gap: 16px;
    align-items: center;
  }
  .arp-bar-row .label {
    font: 500 13px/1.3 var(--font-sans);
    color: var(--ink-800);
  }
  .arp-bar-row .label .sub {
    font: 400 11px/1.3 var(--font-sans);
    color: var(--ink-500);
    margin-top: 2px;
  }
  .arp-bar-track {
    position: relative;
    height: 24px;
    background: var(--ink-50);
    border-radius: var(--r-sm);
    overflow: hidden;
    border: 1px solid var(--line-1);
    margin-top: 6px;
  }
  .arp-bar-track > span {
    display: block; height: 100%;
    border-radius: var(--r-sm);
    transition: width var(--dur);
  }
  .arp-bar-track .scale-ticks {
    position: absolute; inset: 0;
    display: flex;
    pointer-events: none;
  }
  .arp-bar-track .scale-ticks span {
    flex: 1;
    border-right: 1px solid rgba(0,0,0,0.06);
    background: transparent;
  }
  .arp-bar-track .scale-ticks span:last-child { border-right: 0; }
  .arp-bar-row .score {
    font: 700 22px/1 var(--font-sans);
    text-align: right;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .arp-bar-row .score .of {
    font: 500 11px/1 var(--font-sans);
    color: var(--ink-400);
    margin-left: 2px;
  }
  .arp-bar-row .score.h { color: var(--risk-high-fg); }
  .arp-bar-row .score.m { color: var(--risk-med-fg); }
  .arp-bar-row .score.l { color: var(--g-800); }

  /* — Heatmap — */
  .heatmap-wrap {
    overflow-x: auto;
    padding-bottom: 4px;
  }
  .heatmap {
    width: 100%;
    border-collapse: separate;
    border-spacing: 4px;
  }
  .heatmap th {
    font: 600 10px/1 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink-500);
    text-align: center;
    padding: 4px 6px;
    font-family: var(--font-mono);
  }
  .heatmap th.row-label {
    text-align: left;
    padding-left: 0;
    font-family: var(--font-sans);
    font-size: 12px;
    text-transform: none;
    letter-spacing: 0;
    color: var(--ink-800);
    font-weight: 600;
    width: 110px;
  }
  .heatmap td {
    padding: 0;
    text-align: center;
  }
  .heatmap .cell {
    width: 100%;
    height: 38px;
    border-radius: var(--r-sm);
    display: flex; align-items: center; justify-content: center;
    font: 700 12px/1 var(--font-mono);
    color: var(--ink-800);
    transition: transform var(--dur-fast);
    cursor: pointer;
    border: 1px solid transparent;
  }
  .heatmap .cell:hover {
    transform: scale(1.05);
    border-color: var(--ink-700);
    box-shadow: var(--shadow-sm);
  }
  .heatmap .cell.empty {
    background: var(--ink-25);
    color: var(--ink-300);
    border: 1px dashed var(--line-2);
  }
  .heatmap-scale {
    display: flex; align-items: center; gap: 8px;
    padding: 16px 0 0;
    border-top: 1px dashed var(--line-2);
    margin-top: 14px;
    font: 500 11px/1 var(--font-sans);
    color: var(--ink-500);
  }
  .heatmap-scale .scale-bar {
    flex: 1;
    height: 8px;
    background: linear-gradient(90deg, #4ADE80 0%, #FBBF24 50%, #DC2626 100%);
    border-radius: 4px;
  }

  /* — Insight pills (top of dashboard) — */
  .insights {
    display: flex; gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  .insight {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px;
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-md);
    font: 500 13px/1.4 var(--font-sans);
    color: var(--ink-700);
  }
  .insight .ic {
    width: 28px; height: 28px;
    border-radius: 8px;
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .insight .ic svg { width: 14px; height: 14px; stroke-width: 1.75; }
  .insight.danger .ic { background: var(--risk-high-bg); color: var(--risk-high-fg); }
  .insight.warn .ic { background: var(--risk-med-bg); color: var(--risk-med-fg); }
  .insight.good .ic { background: var(--g-100); color: var(--g-800); }
  .insight strong { color: var(--ink-900); font-weight: 700; }
`;

// TweaksPanel stub — design tool removed for production

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}

const { useState, useMemo } = React;

const I9 = {
  download: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>,
  share: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/></svg>,
  pdf: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>,
  print: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"/><rect x="3" y="9" width="18" height="9" rx="2"/><path d="M6 18v4h12v-4"/></svg>,
  refresh: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 1 3 6.7L3 16"/><path d="M3 21v-5h5"/></svg>,
  more: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></svg>,
  trendUp: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>,
  trendDown: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m3 7 6 6 4-4 8 8"/><path d="M14 17h7v-7"/></svg>,
  alert: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r=".5" fill="currentColor"/></svg>,
  user: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>,
  check: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>,
  arrow: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>,
  zap: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg>,
  shield: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6Z"/></svg>,
  brain: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2a3 3 0 0 0-3 3 3 3 0 0 0-2.5 3 3 3 0 0 0 .5 4.5A3 3 0 0 0 4 17a3 3 0 0 0 5.5 1.5A3 3 0 0 0 12 20"/><path d="M14.5 2a3 3 0 0 1 3 3 3 3 0 0 1 2.5 3 3 3 0 0 1-.5 4.5A3 3 0 0 1 20 17a3 3 0 0 1-5.5 1.5A3 3 0 0 1 12 20"/><path d="M12 6v14"/></svg>,
};

// — Data —
// AREAS from server props
// CRITICAL from server props
// ARP_DATA from server props
// Heatmap: areas × tools — avg score normalized 0-1
const TOOLS = ['RULA','OWAS','NIOSH','KIM','Moore-Garg','Sue R.','Checklist'];
// HEATMAP from server props
function heatColor(v) {
  if (v == null) return { bg: 'transparent', fg: 'var(--ink-300)' };
  // gradient green (0) → yellow (0.5) → red (1)
  const interp = (a, b, t) => Math.round(a + (b - a) * t);
  let r, g, b;
  if (v <= 0.5) {
    const t = v / 0.5;
    r = interp(74, 251, t);
    g = interp(222, 191, t);
    b = interp(128, 36, t);
  } else {
    const t = (v - 0.5) / 0.5;
    r = interp(251, 220, t);
    g = interp(191, 38, t);
    b = interp(36, 38, t);
  }
  // soften the bg
  const alpha = 0.18 + v * 0.32;
  return {
    bg: `rgba(${r},${g},${b},${alpha})`,
    fg: v > 0.65 ? '#7F1D1D' : (v > 0.4 ? '#7C2D12' : '#14532D')
  };
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "period": "all",
  "showInsights": true,
  "showARP": true,
  "showHeatmap": true
}/*EDITMODE-END*/;

function Dashboard(serverProps) {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Real data from Laravel
  const user     = serverProps?.user    || { name: 'Usuário' };
  const empresa  = serverProps?.empresa || {};
  const AREAS    = serverProps?.areas   || [];
  const CRITICAL = serverProps?.critical || [];
  const totais   = serverProps?.totais   || { postos: 0, h: 0, m: 0, l: 0 };
  const arpData  = serverProps?.arp?.mediasGerais || [];

  const TOTAL = { h: totais.h, m: totais.m, l: totais.l };
  const TOTAL_POSTOS = totais.postos;
  const ARP_DATA = arpData.map(a => ({
    name: a.categoria, sub: '', score: parseFloat(a.media),
    level: a.nivel === 'Severo' || a.nivel === 'Sério' ? 'h' : a.nivel === 'Moderado' ? 'm' : 'l',
  }));
  const maxAreaTotal = AREAS.length > 0
    ? Math.max(...AREAS.map(a => (a.h||0) + (a.m||0) + (a.l||0)), 1)
    : 1;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const pct = (n) => Math.round((n / TOTAL_POSTOS) * 100);

  // Donut math
  const R = 75;
  const CIRC = 2 * Math.PI * R;
  const segH = (TOTAL.h / TOTAL_POSTOS) * CIRC;
  const segM = (TOTAL.m / TOTAL_POSTOS) * CIRC;
  const segL = (TOTAL.l / TOTAL_POSTOS) * CIRC;

  // Stacked bar — max for visual scale

  return (
    <div className="eg-shell">
      <EgSidebar active="empresas"/>
      <main className="eg-main">
        <EgTopbar
          breadcrumb={['Empresas', 'Prefeitura de Jundiaí', 'Dashboard']}
          user={user.name}
        />

        <div className="dash-page" data-screen-label="09 Dashboard Gerencial">
          {/* — Header — */}
          <header className="dash-head">
            <div className="h-left">
              <span className="eyebrow">
                <span className="dot"/>Atualizado ao vivo
              </span>
              <h1>Dashboard gerencial · Prefeitura Municipal de Jundiaí</h1>
              <div className="meta">
                <span>CNPJ <strong>46.523.015/0001-35</strong></span>
                <span className="sep">·</span>
                <span>Última atualização <strong>21/05/2026 às 16:08</strong></span>
                <span className="sep">·</span>
                <span>Responsável: <strong>Ana Silva</strong></span>
              </div>
            </div>
            <div className="h-right">
              <div className="period-toggle">
                <button className={t.period === 'all'   ? 'on' : ''} onClick={() => setTweak('period', 'all')}>Tudo</button>
                <button className={t.period === '30d'   ? 'on' : ''} onClick={() => setTweak('period', '30d')}>30 dias</button>
                <button className={t.period === '90d'   ? 'on' : ''} onClick={() => setTweak('period', '90d')}>90 dias</button>
                <button className={t.period === '2026'  ? 'on' : ''} onClick={() => setTweak('period', '2026')}>2026</button>
              </div>
              <button className="eg-btn eg-btn-secondary"><I9.share/> Compartilhar</button>
              <button className="eg-btn eg-btn-primary"><I9.print/> Imprimir relatório</button>
            </div>
          </header>

          {/* — Insight pills — */}
          {t.showInsights && (
            <div className="insights">
              <div className="insight danger">
                <span className="ic"><I9.alert/></span>
                <span>
                  <strong>3 postos críticos</strong> em Manutenção predial · revisão imediata recomendada
                </span>
              </div>
              <div className="insight warn">
                <span className="ic"><I9.brain/></span>
                <span>
                  ARP · <strong>conflito trabalho-vida</strong> elevado (4.1/5) em 3 secretarias
                </span>
              </div>
              <div className="insight good">
                <span className="ic"><I9.check/></span>
                <span>
                  Conformidade dos checklists <strong>subiu 8 p.p.</strong> no último trimestre
                </span>
              </div>
            </div>
          )}

          {/* — KPI cards — */}
          <div className="kpi-row">
            <div className="kpi-card">
              <div className="top-row">
                <span className="label">Postos avaliados</span>
                <span className="delta down">↑ +6</span>
              </div>
              <div className="big-num">{TOTAL_POSTOS}<span className="pct">/ 45 totais</span></div>
              <div className="footer">
                <span className="ic"><I9.user/></span>
                <span><strong style={{color: 'var(--ink-900)', fontWeight: 600}}>100%</strong> da organização avaliada</span>
              </div>
            </div>
            <div className="kpi-card risk-h">
              <div className="top-row">
                <span className="label">Risco alto</span>
                <span className="delta up">↑ +2</span>
              </div>
              <div className="big-num risk-h">{TOTAL.h}<span className="pct">{pct(TOTAL.h)}%</span></div>
              <div className="footer">
                <span className="ic"><I9.alert/></span>
                <span>Intervenção <strong style={{color: 'var(--risk-high-fg)', fontWeight: 600}}>imediata</strong> recomendada</span>
              </div>
            </div>
            <div className="kpi-card risk-m">
              <div className="top-row">
                <span className="label">Risco moderado</span>
                <span className="delta neutral">— estável</span>
              </div>
              <div className="big-num risk-m">{TOTAL.m}<span className="pct">{pct(TOTAL.m)}%</span></div>
              <div className="footer">
                <span className="ic"><I9.zap/></span>
                <span>Investigar e considerar mudanças</span>
              </div>
            </div>
            <div className="kpi-card risk-l">
              <div className="top-row">
                <span className="label">Risco baixo</span>
                <span className="delta down">↑ +4</span>
              </div>
              <div className="big-num risk-l">{TOTAL.l}<span className="pct">{pct(TOTAL.l)}%</span></div>
              <div className="footer">
                <span className="ic"><I9.shield/></span>
                <span>Postura <strong style={{color: 'var(--g-800)', fontWeight: 600}}>aceitável</strong>, sem intervenção</span>
              </div>
            </div>
          </div>

          {/* — Charts row — */}
          <div className="charts-row">
            {/* Stacked bar */}
            <div className="panel">
              <div className="panel-head">
                <div>
                  <h2>Distribuição de risco por área</h2>
                  <p className="h-sub">Postos avaliados, classificados por nível de risco biomecânico</p>
                </div>
                <div className="actions">
                  <button aria-label="Atualizar"><I9.refresh/></button>
                  <button aria-label="Mais"><I9.more/></button>
                </div>
              </div>
              <div className="panel-body">
                <div className="stacked-bars">
                  {AREAS.map(a => {
                    const total = a.h + a.m + a.l;
                    const w = (total / maxAreaTotal) * 100; // total bar width as % of max
                    return (
                      <div key={a.id} className="stacked-row">
                        <div className="area-label">
                          <span className="name">{a.name}</span>
                          <span className="sub">{a.sub}</span>
                        </div>
                        <div className="stacked-bar-track" style={{width: w + '%'}}>
                          {a.h > 0 && (
                            <div className="stacked-bar-seg h" style={{width: (a.h/total * 100) + '%'}}>
                              {a.h}
                            </div>
                          )}
                          {a.m > 0 && (
                            <div className="stacked-bar-seg m" style={{width: (a.m/total * 100) + '%'}}>
                              {a.m}
                            </div>
                          )}
                          {a.l > 0 && (
                            <div className="stacked-bar-seg l" style={{width: (a.l/total * 100) + '%'}}>
                              {a.l}
                            </div>
                          )}
                        </div>
                        <div className="total">
                          {total}
                          <div className="sub">postos</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="chart-legend">
                <div className="item"><span className="swatch h"/><strong>{TOTAL.h}</strong> Risco alto</div>
                <div className="item"><span className="swatch m"/><strong>{TOTAL.m}</strong> Risco moderado</div>
                <div className="item"><span className="swatch l"/><strong>{TOTAL.l}</strong> Risco baixo</div>
              </div>
            </div>

            {/* Donut */}
            <div className="panel">
              <div className="panel-head">
                <div>
                  <h2>Distribuição geral</h2>
                  <p className="h-sub">Composição total dos postos avaliados</p>
                </div>
                <div className="actions">
                  <button aria-label="Mais"><I9.more/></button>
                </div>
              </div>
              <div className="panel-body">
                <div className="donut-wrap">
                  <div className="donut-big">
                    <svg viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r={R} fill="none" stroke="var(--ink-100)" strokeWidth="22"/>
                      <circle cx="100" cy="100" r={R} fill="none"
                        stroke="#DC2626" strokeWidth="22"
                        strokeDasharray={`${segH} ${CIRC - segH}`}
                        strokeDashoffset="0"
                      />
                      <circle cx="100" cy="100" r={R} fill="none"
                        stroke="#F59E0B" strokeWidth="22"
                        strokeDasharray={`${segM} ${CIRC - segM}`}
                        strokeDashoffset={-segH}
                      />
                      <circle cx="100" cy="100" r={R} fill="none"
                        stroke="#16A34A" strokeWidth="22"
                        strokeDasharray={`${segL} ${CIRC - segL}`}
                        strokeDashoffset={-(segH + segM)}
                      />
                    </svg>
                    <div className="center">
                      <span className="num">{TOTAL_POSTOS}</span>
                      <span className="lbl">postos · 4 áreas</span>
                    </div>
                  </div>
                  <div className="donut-legend">
                    <div className="item">
                      <span className="swatch" style={{background: '#DC2626'}}/>
                      <span className="name">Risco alto</span>
                      <span className="num">{TOTAL.h}</span>
                      <span className="pct">{pct(TOTAL.h)}%</span>
                    </div>
                    <div className="item">
                      <span className="swatch" style={{background: '#F59E0B'}}/>
                      <span className="name">Risco moderado</span>
                      <span className="num">{TOTAL.m}</span>
                      <span className="pct">{pct(TOTAL.m)}%</span>
                    </div>
                    <div className="item">
                      <span className="swatch" style={{background: '#16A34A'}}/>
                      <span className="name">Risco baixo</span>
                      <span className="num">{TOTAL.l}</span>
                      <span className="pct">{pct(TOTAL.l)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* — Critical posts table — */}
          <div className="panel table-panel">
            <div className="panel-head">
              <div>
                <h2 style={{display:'inline-flex', alignItems:'center', gap: 10}}>
                  <span className="eg-badge eg-badge-risk-high"><span className="dot"/>Risco alto</span>
                  Postos críticos
                </h2>
                <p className="h-sub">Requerem intervenção imediata. {CRITICAL.length} postos identificados.</p>
              </div>
              <div className="actions" style={{marginLeft: 'auto', gap: 10}}>
                <button className="eg-btn eg-btn-secondary" style={{height: 34, padding: '0 12px', fontSize: 12.5}}>
                  Ver todos
                </button>
                <button className="eg-btn eg-btn-secondary" style={{height: 34, padding: '0 12px', fontSize: 12.5}}>
                  <I9.download style={{width: 14, height: 14, strokeWidth: 1.75}}/> CSV
                </button>
              </div>
            </div>
            <table className="crit-table">
              <thead>
                <tr>
                  <th>Área</th>
                  <th>Posto / setor</th>
                  <th>Ferramenta</th>
                  <th>Score</th>
                  <th>Ação recomendada</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {CRITICAL.map((c, i) => (
                  <tr key={i}>
                    <td><span className="area-pill">{c.areaShort}</span></td>
                    <td>
                      <div className="posto-name">{c.posto}</div>
                      <div className="posto-sub">{c.setor} · {c.sub}</div>
                    </td>
                    <td>
                      <span className="tool-cell">
                        <span className="tool-code">{c.tool}</span>
                      </span>
                    </td>
                    <td>
                      <span className="score-cell">{c.score}</span>
                    </td>
                    <td className="reco-cell">{c.reco}</td>
                    <td className="action-cell">
                      <button>Abrir<I9.arrow style={{width: 12, height: 12, strokeWidth: 2}}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* — Lower row: ARP + Heatmap — */}
          {(t.showARP || t.showHeatmap) && (
            <div className="lower-row">
              {t.showARP && (
                <div className="panel">
                  <div className="panel-head">
                    <div>
                      <h2 style={{display:'inline-flex', alignItems:'center', gap: 10}}>
                        <span style={{
                          width: 22, height: 22, borderRadius: 7,
                          background: 'var(--g-100)', color: 'var(--g-700)',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        }}><I9.brain style={{width: 13, height: 13, strokeWidth: 1.75}}/></span>
                        Resultados ARP por categoria
                      </h2>
                      <p className="h-sub">Avaliação de Riscos Psicossociais · 142 respostas válidas · escala 1–5 (maior = mais crítico)</p>
                    </div>
                    <div className="actions">
                      <button aria-label="Mais"><I9.more/></button>
                    </div>
                  </div>
                  <div className="panel-body">
                    <div className="arp-bars">
                      {ARP_DATA.map((a, i) => {
                        const pct = (a.score / 5) * 100;
                        const color = a.level === 'h' ? 'linear-gradient(90deg, #FBBF24, #DC2626)' :
                                      a.level === 'm' ? 'linear-gradient(90deg, #FBBF24, #F59E0B)' :
                                                        'linear-gradient(90deg, #4ADE80, #16A34A)';
                        return (
                          <div key={i} className="arp-bar-row">
                            <div>
                              <div className="label">{a.name}</div>
                              <div className="label sub">{a.sub}</div>
                              <div className="arp-bar-track">
                                <div className="scale-ticks">
                                  {[0,1,2,3,4].map(t => <span key={t}/>)}
                                </div>
                                <span style={{width: pct + '%', background: color}}/>
                              </div>
                            </div>
                            <div className={'score ' + a.level}>
                              {a.score.toFixed(1)}<span className="of">/5</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {t.showHeatmap && (
                <div className="panel">
                  <div className="panel-head">
                    <div>
                      <h2>Mapa de calor · risco por área × ferramenta</h2>
                      <p className="h-sub">Score normalizado (média ponderada). Cinza = ferramenta não aplicada.</p>
                    </div>
                  </div>
                  <div className="panel-body">
                    <div className="heatmap-wrap">
                      <table className="heatmap">
                        <thead>
                          <tr>
                            <th className="row-label"></th>
                            {TOOLS.map(t => <th key={t}>{t}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {AREAS.map((a, i) => (
                            <tr key={a.id}>
                              <th className="row-label">{a.name}</th>
                              {HEATMAP[i].map((v, j) => {
                                const c = heatColor(v);
                                return (
                                  <td key={j}>
                                    <div className={'cell' + (v == null ? ' empty' : '')}
                                         style={{background: c.bg, color: c.fg}}>
                                      {v == null ? '—' : (v * 10).toFixed(1)}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="heatmap-scale">
                      <span>Baixo</span>
                      <div className="scale-bar"/>
                      <span>Alto</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <TweaksPanel title="Tweaks · Dashboard">
        <TweakSection label="Período"/>
        <TweakSelect
          label="Recorte"
          value={t.period}
          options={['all', '30d', '90d', '2026']}
          onChange={(v) => setTweak('period', v)}
        />
        <TweakSection label="Componentes"/>
        <TweakToggle label="Insights no topo"   value={t.showInsights}  onChange={(v) => setTweak('showInsights', v)}/>
        <TweakToggle label="Painel ARP"          value={t.showARP}       onChange={(v) => setTweak('showARP', v)}/>
        <TweakToggle label="Mapa de calor"       value={t.showHeatmap}   onChange={(v) => setTweak('showHeatmap', v)}/>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('react-root')).render(<Dashboard />);

export default Dashboard;
