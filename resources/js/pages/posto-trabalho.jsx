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
  /* — Page wrapper — pad below for sticky save bar — */
  .posto-page { padding-bottom: 120px; max-width: 1400px; }

  /* — Posto header — */
  .posto-head {
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    padding: 22px 24px;
    margin-bottom: 24px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 18px;
    align-items: center;
  }
  .posto-head .left { min-width: 0; }
  .posto-head .eyebrow {
    font: var(--t-eyebrow);
    color: var(--ink-500);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
    display: inline-flex; gap: 6px; align-items: center;
  }
  .posto-head .eyebrow .arrow { color: var(--ink-300); }
  .posto-head h1 {
    font: 700 26px/1.15 var(--font-sans);
    letter-spacing: -0.02em;
    color: var(--ink-900);
    margin: 0 0 8px;
  }
  .posto-head .meta-row {
    display: flex; align-items: center; gap: 16px;
    color: var(--ink-500);
    font: 500 13px/1.3 var(--font-sans);
    flex-wrap: wrap;
  }
  .posto-head .meta-row .sep { color: var(--line-3); }
  .posto-head .right {
    display: flex; align-items: center; gap: 14px;
  }
  .risk-summary-card {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 14px;
    align-items: center;
    padding: 12px 16px;
    border-radius: var(--r-md);
    background: var(--risk-high-bg);
    border: 1px solid var(--risk-high-bd);
    min-width: 220px;
  }
  .risk-summary-card.risk-med  { background: var(--risk-med-bg);  border-color: var(--risk-med-bd); }
  .risk-summary-card.risk-low  { background: var(--risk-low-bg);  border-color: var(--risk-low-bd); }
  .risk-summary-card .score-num {
    font: 700 36px/1 var(--font-sans);
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
    color: var(--risk-high-fg);
  }
  .risk-summary-card.risk-med .score-num { color: var(--risk-med-fg); }
  .risk-summary-card.risk-low .score-num { color: var(--risk-low-fg); }
  .risk-summary-card .lbl-l {
    font: 600 11px/1 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--risk-high-fg);
    margin-bottom: 4px;
  }
  .risk-summary-card.risk-med .lbl-l { color: var(--risk-med-fg); }
  .risk-summary-card.risk-low .lbl-l { color: var(--risk-low-fg); }
  .risk-summary-card .lbl-r {
    font: 600 14px/1.2 var(--font-sans);
    color: var(--ink-900);
  }
  .risk-summary-card .lbl-r .sub {
    font: 400 12px/1.2 var(--font-sans);
    color: var(--ink-500);
    margin-top: 3px;
    font-weight: 400;
  }

  /* — Two-column body — */
  .posto-body {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 32px;
    align-items: start;
  }
  @media (max-width: 1000px) { .posto-body { grid-template-columns: 1fr; } .anchor-nav { display: none; } }

  /* — Anchor nav (sticky left) — */
  .anchor-nav {
    position: sticky; top: 88px;
    align-self: start;
    padding: 0;
  }
  .anchor-nav-title {
    font: 600 11px/1 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--ink-500);
    padding: 0 12px 14px;
  }
  .anchor-list {
    display: flex; flex-direction: column;
    gap: 1px;
    position: relative;
  }
  .anchor-list::before {
    content: '';
    position: absolute;
    left: 13px; top: 12px; bottom: 12px;
    width: 2px;
    background: var(--line-1);
    border-radius: 1px;
  }
  .anchor-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px 10px 28px;
    border-radius: var(--r-sm);
    color: var(--ink-500);
    font: 500 13px/1.3 var(--font-sans);
    transition: all var(--dur-fast);
    position: relative;
    cursor: pointer;
  }
  .anchor-item::before {
    content: '';
    position: absolute;
    left: 9px; top: 50%; transform: translateY(-50%);
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--white);
    border: 2px solid var(--line-2);
    transition: all var(--dur-fast);
    z-index: 1;
  }
  .anchor-item .num {
    background: var(--ink-100); color: var(--ink-500);
    width: 18px; height: 18px;
    border-radius: 5px;
    display: inline-flex; align-items: center; justify-content: center;
    font: 600 10px/1 var(--font-mono);
  }
  .anchor-item:hover { color: var(--ink-900); background: var(--ink-25); }
  .anchor-item.active {
    color: var(--g-800);
    background: var(--g-25);
    font-weight: 600;
  }
  .anchor-item.active::before {
    background: var(--g-700);
    border-color: var(--g-700);
    box-shadow: 0 0 0 3px var(--g-100);
  }
  .anchor-item.active .num { background: var(--g-200); color: var(--g-900); }
  .anchor-item.complete::before {
    background: var(--g-500);
    border-color: var(--g-500);
  }
  .anchor-item .check {
    width: 16px; height: 16px;
    border-radius: 50%;
    background: var(--g-500);
    color: var(--white);
    display: inline-flex; align-items: center; justify-content: center;
    margin-left: auto;
  }
  .anchor-item .check svg { width: 10px; height: 10px; stroke-width: 3; }
  .anchor-item.pending .alert {
    width: 16px; height: 16px;
    border-radius: 50%;
    background: var(--risk-med-bg);
    color: var(--risk-med-fg);
    display: inline-flex; align-items: center; justify-content: center;
    font: 700 10px/1 var(--font-sans);
    margin-left: auto;
  }

  /* — Sections — */
  .sections {
    display: flex; flex-direction: column;
    gap: 20px;
  }
  .section {
    background: var(--surface);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    padding: 28px 32px;
    scroll-margin-top: 80px;
  }
  .section-head {
    display: flex; align-items: flex-start; gap: 14px;
    margin-bottom: 24px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--line-1);
  }
  .section-head .num-badge {
    width: 32px; height: 32px;
    border-radius: 9px;
    background: var(--g-100);
    color: var(--g-800);
    display: inline-flex; align-items: center; justify-content: center;
    font: 700 13px/1 var(--font-mono);
    flex-shrink: 0;
  }
  .section-head .meta { flex: 1; min-width: 0; }
  .section-head h2 {
    font: 600 17px/1.3 var(--font-sans);
    color: var(--ink-900);
    margin: 0 0 4px;
    letter-spacing: -0.01em;
  }
  .section-head .h-sub {
    font: var(--t-body-sm);
    color: var(--ink-500);
  }
  .section-head .badge {
    flex-shrink: 0;
  }

  /* Form helpers reused in sections */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px 24px;
  }
  .form-grid .span-2 { grid-column: span 2; }
  @media (max-width: 720px) {
    .form-grid { grid-template-columns: 1fr; }
    .form-grid .span-2 { grid-column: auto; }
  }
  .field-help {
    font: 400 12px/1.4 var(--font-sans);
    color: var(--ink-500);
    margin-top: 6px;
  }
  textarea.eg-input {
    height: auto;
    padding: 12px 14px;
    min-height: 90px;
    line-height: 1.5;
    resize: vertical;
  }

  /* Rich editor mock */
  .rich-editor {
    border: 1px solid var(--line-2);
    border-radius: var(--r-md);
    background: var(--white);
    overflow: hidden;
  }
  .rich-toolbar {
    display: flex; align-items: center; gap: 2px;
    padding: 6px 10px;
    border-bottom: 1px solid var(--line-1);
    background: var(--ink-25);
  }
  .rich-toolbar button {
    width: 30px; height: 28px;
    display: inline-flex; align-items: center; justify-content: center;
    background: transparent; border: 0;
    border-radius: 5px;
    color: var(--ink-600);
    font: 600 13px/1 var(--font-sans);
    transition: all var(--dur-fast);
  }
  .rich-toolbar button:hover { background: var(--ink-100); color: var(--ink-900); }
  .rich-toolbar button.on { background: var(--ink-200); color: var(--ink-900); }
  .rich-toolbar button svg { width: 15px; height: 15px; stroke-width: 1.75; }
  .rich-toolbar .sep { width: 1px; height: 18px; background: var(--line-2); margin: 0 4px; }
  .rich-area {
    padding: 14px;
    min-height: 120px;
    font: var(--t-body);
    color: var(--ink-800);
  }
  .rich-area b { color: var(--ink-900); }
  .rich-area p { margin: 0 0 10px; }
  .rich-area ul { margin: 0; padding-left: 20px; color: var(--ink-700); }

  /* — Photos grid — */
  .photos-toolbar {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 18px;
    flex-wrap: wrap; gap: 10px;
  }
  .photos-toolbar .meta {
    font: 500 13px/1.3 var(--font-sans);
    color: var(--ink-500);
  }
  .photos-toolbar .meta strong { color: var(--ink-900); }
  .photos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 14px;
  }
  .photo-card {
    border: 1px solid var(--line-1);
    border-radius: var(--r-md);
    background: var(--white);
    overflow: hidden;
    transition: all var(--dur-fast);
    position: relative;
  }
  .photo-card:hover {
    border-color: var(--g-300);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
  .photo-thumb {
    aspect-ratio: 4/3;
    background: linear-gradient(135deg, var(--ink-200), var(--ink-300));
    position: relative;
    overflow: hidden;
  }
  .photo-thumb::after {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(circle at 30% 40%, rgba(255,255,255,0.18), transparent 60%),
      linear-gradient(160deg, var(--photo-c1, #6B7B72) 0%, var(--photo-c2, #4A5D53) 100%);
  }
  .photo-card .placeholder-icon {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.4);
    z-index: 1;
  }
  .photo-card .placeholder-icon svg { width: 36px; height: 36px; stroke-width: 1.25; }
  .photo-tag {
    position: absolute; top: 8px; left: 8px;
    z-index: 2;
    background: rgba(15,26,20,0.7);
    backdrop-filter: blur(8px);
    color: var(--white);
    padding: 3px 8px;
    border-radius: var(--r-pill);
    font: 600 10px/1 var(--font-mono);
    letter-spacing: 0.04em;
  }
  .photo-actions {
    position: absolute; top: 8px; right: 8px;
    z-index: 2;
    display: flex; gap: 4px;
    opacity: 0;
    transition: opacity var(--dur-fast);
  }
  .photo-card:hover .photo-actions { opacity: 1; }
  .photo-actions button {
    width: 28px; height: 28px;
    background: rgba(15,26,20,0.65);
    backdrop-filter: blur(8px);
    border: 0;
    border-radius: 6px;
    color: var(--white);
    display: inline-flex; align-items: center; justify-content: center;
  }
  .photo-actions button:hover { background: rgba(15,26,20,0.9); }
  .photo-actions svg { width: 14px; height: 14px; stroke-width: 1.75; }
  .photo-caption {
    padding: 10px 12px;
    border-top: 1px solid var(--line-1);
  }
  .photo-caption .name {
    font: 600 12px/1.3 var(--font-sans);
    color: var(--ink-900);
    margin: 0 0 3px;
    overflow: hidden; text-overflow: ellipsis;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  }
  .photo-caption .meta {
    font: 400 10.5px/1.3 var(--font-sans);
    color: var(--ink-500);
  }
  .photo-upload {
    border: 1.5px dashed var(--line-3);
    border-radius: var(--r-md);
    aspect-ratio: 4/3;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 8px;
    color: var(--ink-500);
    font: 500 12px/1.3 var(--font-sans);
    background: var(--ink-25);
    transition: all var(--dur-fast);
    cursor: pointer;
    text-align: center;
    padding: 12px;
  }
  .photo-upload:hover { border-color: var(--g-400); background: var(--g-25); color: var(--g-700); }
  .photo-upload svg { width: 24px; height: 24px; stroke-width: 1.75; }

  /* — Characteristics: checkboxes pills — */
  .char-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  @media (max-width: 720px) { .char-grid { grid-template-columns: 1fr; } }
  .char-col h4 {
    font: 600 12px/1 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-700);
    margin: 0 0 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--line-1);
  }
  .char-list {
    display: flex; flex-direction: column;
    gap: 8px;
  }
  .char-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px; align-items: center;
    padding: 10px 12px;
    border: 1px solid var(--line-1);
    border-radius: var(--r-sm);
    background: var(--white);
    transition: all var(--dur-fast);
    cursor: pointer;
  }
  .char-row:hover { border-color: var(--line-3); background: var(--ink-25); }
  .char-row.on { background: var(--g-25); border-color: var(--g-300); }
  .char-row .lbl {
    font: 500 13px/1.3 var(--font-sans);
    color: var(--ink-800);
  }
  .char-row .lbl .sub {
    font: 400 11px/1.3 var(--font-sans);
    color: var(--ink-500);
    margin-top: 2px;
  }
  /* segmented control */
  .segmented {
    display: inline-flex;
    border: 1px solid var(--line-2);
    border-radius: var(--r-sm);
    background: var(--white);
    padding: 2px;
  }
  .segmented button {
    background: transparent; border: 0;
    padding: 5px 11px;
    border-radius: 5px;
    font: 500 11px/1 var(--font-sans);
    color: var(--ink-600);
    transition: all var(--dur-fast);
  }
  .segmented button.on {
    background: var(--g-100);
    color: var(--g-800);
    font-weight: 600;
  }

  /* — Diagnosis severity — */
  .severity-scale {
    display: flex; gap: 6px;
    margin-bottom: 18px;
  }
  .sev-pill {
    flex: 1;
    padding: 14px 10px;
    border: 1.5px solid var(--line-1);
    border-radius: var(--r-md);
    background: var(--white);
    cursor: pointer;
    transition: all var(--dur-fast);
    text-align: center;
  }
  .sev-pill:hover { border-color: var(--line-3); }
  .sev-pill .icon {
    display: inline-flex; align-items: center; justify-content: center;
    width: 28px; height: 28px;
    border-radius: 8px;
    margin: 0 auto 8px;
  }
  .sev-pill .icon svg { width: 16px; height: 16px; stroke-width: 1.75; }
  .sev-pill .name {
    font: 600 12px/1.2 var(--font-sans);
    color: var(--ink-900);
  }
  .sev-pill .desc {
    font: 400 11px/1.3 var(--font-sans);
    color: var(--ink-500);
    margin-top: 3px;
  }
  .sev-pill.low { --sev-c: #16A34A; --sev-bg: #E7F4EC; }
  .sev-pill.med { --sev-c: #F59E0B; --sev-bg: #FFF7E6; }
  .sev-pill.high { --sev-c: #DC2626; --sev-bg: #FEF1F1; }
  .sev-pill .icon { background: var(--ink-100); color: var(--ink-600); }
  .sev-pill.selected {
    border-color: var(--sev-c);
    background: var(--sev-bg);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--sev-c) 12%, transparent);
  }
  .sev-pill.selected .icon { background: var(--sev-c); color: var(--white); }

  /* — Tools grid — */
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 14px;
  }
  .tool-card {
    border: 1px solid var(--line-1);
    border-radius: var(--r-md);
    background: var(--white);
    padding: 16px;
    transition: all var(--dur-fast);
    cursor: pointer;
    position: relative;
    display: flex; flex-direction: column;
    gap: 12px;
  }
  .tool-card:hover { border-color: var(--g-300); transform: translateY(-2px); box-shadow: var(--shadow-sm); }
  .tool-card .row1 {
    display: flex; align-items: center; justify-content: space-between;
    gap: 10px;
  }
  .tool-card .tool-name {
    font: 700 15px/1.2 var(--font-mono);
    color: var(--ink-900);
    letter-spacing: -0.005em;
  }
  .tool-card .tool-desc {
    font: 400 11.5px/1.4 var(--font-sans);
    color: var(--ink-500);
  }
  .tool-card .score-row {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid var(--line-1);
  }
  .tool-card .score-row .l {
    font: 500 11px/1.2 var(--font-sans);
    color: var(--ink-500);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .tool-card .score-row .v {
    font: 700 18px/1 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.01em;
  }
  .tool-card.high  { border-left: 3px solid var(--risk-high-solid); }
  .tool-card.med   { border-left: 3px solid var(--risk-med-solid); }
  .tool-card.low   { border-left: 3px solid var(--risk-low-solid); }
  .tool-card.empty { background: var(--ink-25); }
  .tool-card.empty .tool-name { color: var(--ink-700); }
  .tool-card .open-btn {
    width: 100%; height: 32px;
    padding: 0 12px;
    background: var(--g-50);
    color: var(--g-800);
    border: 0;
    border-radius: 6px;
    font: 600 12px/1 var(--font-sans);
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    transition: all var(--dur-fast);
  }
  .tool-card .open-btn:hover { background: var(--g-100); }
  .tool-card .open-btn svg { width: 12px; height: 12px; stroke-width: 2; }

  /* — Recommendations — */
  .reco-list {
    display: flex; flex-direction: column;
    gap: 10px;
  }
  .reco-item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 14px; align-items: flex-start;
    padding: 14px 16px;
    border: 1px solid var(--line-1);
    border-radius: var(--r-md);
    background: var(--white);
    transition: all var(--dur-fast);
  }
  .reco-item:hover { border-color: var(--line-3); box-shadow: var(--shadow-xs); }
  .reco-item .ic {
    width: 32px; height: 32px;
    border-radius: 8px;
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .reco-item.priority-high .ic { background: var(--risk-high-bg); color: var(--risk-high-fg); }
  .reco-item.priority-med .ic { background: var(--risk-med-bg); color: var(--risk-med-fg); }
  .reco-item.priority-low .ic { background: var(--g-100); color: var(--g-800); }
  .reco-item .ic svg { width: 16px; height: 16px; stroke-width: 1.75; }
  .reco-item .body { min-width: 0; }
  .reco-item .body .ttl {
    font: 600 14px/1.3 var(--font-sans);
    color: var(--ink-900);
    margin: 0 0 4px;
  }
  .reco-item .body .desc {
    font: 400 12.5px/1.45 var(--font-sans);
    color: var(--ink-600);
  }
  .reco-item .body .tags {
    display: flex; gap: 6px; margin-top: 8px;
    flex-wrap: wrap;
  }
  .reco-item .body .tags .tag {
    background: var(--ink-100);
    color: var(--ink-700);
    padding: 3px 8px;
    border-radius: var(--r-pill);
    font: 600 10px/1 var(--font-sans);
  }
  .reco-item .actions {
    display: flex; gap: 4px;
    flex-shrink: 0;
  }
  .reco-item .actions button {
    width: 28px; height: 28px;
    background: transparent; border: 0;
    border-radius: 6px;
    color: var(--ink-500);
    display: inline-flex; align-items: center; justify-content: center;
  }
  .reco-item .actions button:hover { background: var(--ink-100); color: var(--ink-900); }
  .reco-item .actions svg { width: 14px; height: 14px; stroke-width: 1.75; }

  /* — Bottom sticky save bar — */
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
    display: flex; align-items: center; gap: 8px;
    color: var(--ink-500);
    font: 500 13px/1.3 var(--font-sans);
  }
  .save-bar .status .dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--risk-med-solid);
    box-shadow: 0 0 0 3px var(--risk-med-bg);
  }
  .save-bar .status.saved .dot {
    background: var(--g-500);
    box-shadow: 0 0 0 3px var(--g-100);
  }
  .save-bar .actions { display: flex; gap: 8px; align-items: center; }

  /* — Dadosaúde mini cards — */
  .health-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 12px;
  }
  .health-card {
    padding: 14px;
    border: 1px solid var(--line-1);
    border-radius: var(--r-md);
    background: var(--white);
  }
  .health-card .l {
    font: 500 11px/1.2 var(--font-sans);
    color: var(--ink-500);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 8px;
  }
  .health-card .v {
    font: 700 22px/1 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .health-card .delta {
    font: 500 11px/1.3 var(--font-sans);
    color: var(--ink-500);
    margin-top: 6px;
  }
  .health-card.warn { background: var(--risk-med-bg); border-color: var(--risk-med-bd); }
  .health-card.warn .l, .health-card.warn .delta { color: var(--risk-med-fg); }
  .health-card.warn .v { color: var(--risk-med-fg); }
`;

// TweaksPanel stub — design tool removed for production

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}

const { useState, useEffect, useRef, useMemo } = React;

const I5 = {
  check: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>,
  alert: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r=".5" fill="currentColor"/></svg>,
  camera: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5l-1 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4.5l-1-2Z"/><circle cx="12" cy="13" r="3.5"/></svg>,
  upload: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/></svg>,
  edit: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"/></svg>,
  trash: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg>,
  plus: EgIcon.plus,
  bold: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h7a4 4 0 0 1 0 8H6V4Z"/><path d="M6 12h8a4 4 0 0 1 0 8H6v-8Z"/></svg>,
  italic: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M19 4h-9M14 20H5M15 4l-6 16"/></svg>,
  listUl: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>,
  listOl: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6h12M9 12h12M9 18h12"/><path d="M4 4h2v4"/><path d="M4 10h3v2H4v2h3"/></svg>,
  link: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></svg>,
  smile: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="10" r=".5" fill="currentColor"/><circle cx="15" cy="10" r=".5" fill="currentColor"/></svg>,
  frown: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 16s1.5-2 4-2 4 2 4 2"/><circle cx="9" cy="10" r=".5" fill="currentColor"/><circle cx="15" cy="10" r=".5" fill="currentColor"/></svg>,
  meh: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 15h8"/><circle cx="9" cy="10" r=".5" fill="currentColor"/><circle cx="15" cy="10" r=".5" fill="currentColor"/></svg>,
  arrowRight: EgIcon.arrowRight,
  user: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>,
  tool: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m14.7 6.3 3 3-12 12-3-3 12-12Z"/><path d="m12 9 3 3"/><path d="M18 2l4 4-2 2-4-4 2-2Z"/></svg>,
  history: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></svg>,
  shield: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6Z"/></svg>,
  lightbulb: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5.9 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2Z"/></svg>,
};

// — Section definitions —
const SECTIONS = [
  { id: 'identificacao', num: 1, name: 'Identificação', sub: 'Dados básicos do posto de trabalho', status: 'complete' },
  { id: 'funcao', num: 2, name: 'Função e tarefa', sub: 'Descrição funcional', status: 'complete' },
  { id: 'atividade', num: 3, name: 'Análise da atividade', sub: 'Como o trabalho é realizado', status: 'complete' },
  { id: 'fotos', num: 4, name: 'Registro fotográfico', sub: '5 fotos · postura e ambiente', status: 'complete' },
  { id: 'caracteristicas', num: 5, name: 'Características do trabalho', sub: 'Organizacionais e ambientais', status: 'complete' },
  { id: 'saude', num: 6, name: 'Dados de saúde', sub: 'Histórico ocupacional', status: 'pending' },
  { id: 'prediagnostico', num: 7, name: 'Pré-diagnóstico', sub: 'Avaliação preliminar', status: 'complete' },
  { id: 'ferramentas', num: 8, name: 'Ferramentas de análise', sub: '4 aplicadas · 2 pendentes', status: 'pending' },
  { id: 'recomendacoes', num: 9, name: 'Recomendações técnicas', sub: '6 medidas propostas', status: 'complete' },
];

const PHOTOS = [
  { tag: 'P-01', name: 'Vista frontal do posto', meta: 'Tirada em 18/05/2026 · postura', c1: '#5A6B4C', c2: '#3D4E38' },
  { tag: 'P-02', name: 'Postura de trabalho durante reparo elétrico', meta: '18/05/2026 · ângulo lateral', c1: '#6B7B72', c2: '#4A5D53' },
  { tag: 'P-03', name: 'Manuseio de escada e ferramentas em altura', meta: '18/05/2026 · altura', c1: '#7A6B5C', c2: '#5C4A3D' },
  { tag: 'P-04', name: 'Quadro elétrico em manutenção', meta: '18/05/2026 · ambiente', c1: '#4A5D6B', c2: '#3D4E5A' },
  { tag: 'P-05', name: 'EPIs utilizados pelo profissional', meta: '18/05/2026 · proteção individual', c1: '#5C6B5C', c2: '#3D4E3D' },
];

// TOOLS from server props
// RECOS from server props
// CHARS_ORG from server props
// CHARS_AMB from server props
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "anchorPosition": "left",
  "showRiskCard": true,
  "showSaveBar": true,
  "compactSections": false,
  "preDiagnosis": "high"
}/*EDITMODE-END*/;

function PostoPage(serverProps) {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activeSection, setActiveSection] = useState('identificacao');
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const sectionRefs = useRef({});

  // Real data from Laravel
  const user     = serverProps?.user      || { name: 'Usuário' };
  const sub      = serverProps?.subsetor  || {};
  const empresa  = serverProps?.empresa   || {};
  const area     = serverProps?.area      || {};
  const setor    = serverProps?.setor     || {};
  const TOOLS    = serverProps?.tools     || [];
  const RECOS    = serverProps?.recomendacoes || [];
  const checklists = serverProps?.checklists || {};

  const CHARS_ORG = serverProps?.caracteristicas?.org || [];
  const CHARS_AMB = serverProps?.caracteristicas?.amb || [];

  // Scrollspy via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.target.offsetTop - b.target.offsetTop);
        if (visible.length) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -55% 0px', threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <div className="eg-shell">
      <EgSidebar active="empresas" />
      <main className="eg-main">
        <EgTopbar
          breadcrumb={['Empresas', 'Prefeitura de Jundiaí', 'Operacional', 'Manutenção predial', 'Eletricista predial']}
          user={user.name}
        />

        <div className="eg-page posto-page" data-screen-label="05 Posto de Trabalho">
          {/* — Posto header — */}
          <header className="posto-head">
            <div className="left">
              <div className="eyebrow">
                <span>Operacional</span>
                <span className="arrow">›</span>
                <span>Manutenção predial</span>
                <span className="arrow">›</span>
                <span>Setor 4</span>
              </div>
              <h1>Eletricista predial</h1>
              <div className="meta-row">
                <span><I5.user style={{width:14, height:14, display:'inline', verticalAlign:'-2px', marginRight:6, strokeWidth:1.75}}/>3 colaboradores avaliados</span>
                <span className="sep">·</span>
                <span><I5.history style={{width:14, height:14, display:'inline', verticalAlign:'-2px', marginRight:6, strokeWidth:1.75}}/>Editado por <strong style={{color:'var(--ink-900)', fontWeight:600}}>Ana Silva</strong> · ontem, 16:08</span>
                <span className="sep">·</span>
                <span>Posto-ID: <span style={{font:'600 12px/1 var(--font-mono)', color:'var(--ink-800)'}}>P-10</span></span>
              </div>
            </div>
            {t.showRiskCard && (
              <div className="right">
                <div className="risk-summary-card">
                  <span className="score-num">7</span>
                  <div>
                    <div className="lbl-l">Pré-diagnóstico</div>
                    <div className="lbl-r">Risco alto<div className="sub">Ação corretiva imediata</div></div>
                  </div>
                </div>
              </div>
            )}
          </header>

          {/* — Body: anchor nav + sections — */}
          <div className="posto-body" style={t.anchorPosition === 'right' ? {gridTemplateColumns: '1fr 240px'} : {}}>
            {/* Anchor nav */}
            <nav className="anchor-nav" style={t.anchorPosition === 'right' ? {order: 2} : {}}>
              <div className="anchor-nav-title">Seções da AET</div>
              <div className="anchor-list">
                {SECTIONS.map(s => (
                  <a
                    key={s.id}
                    className={'anchor-item' +
                      (activeSection === s.id ? ' active' : '') +
                      (s.status === 'complete' && activeSection !== s.id ? ' complete' : '') +
                      (s.status === 'pending' ? ' pending' : '')}
                    onClick={(e) => { e.preventDefault(); scrollTo(s.id); }}
                    href={'#' + s.id}
                  >
                    <span style={{flex:1, minWidth:0}}>{s.name}</span>
                    {s.status === 'complete' && (
                      <span className="check"><I5.check/></span>
                    )}
                    {s.status === 'pending' && (
                      <span className="alert">!</span>
                    )}
                  </a>
                ))}
              </div>
            </nav>

            {/* Sections */}
            <div className="sections" style={t.anchorPosition === 'right' ? {order: 1} : {}}>
              {/* 1. Identificação */}
              <section id="identificacao" ref={(el) => sectionRefs.current['identificacao'] = el} className="section">
                <div className="section-head">
                  <span className="num-badge">01</span>
                  <div className="meta">
                    <h2>Identificação</h2>
                    <p className="h-sub">Dados básicos do posto de trabalho que aparecerão no cabeçalho do laudo.</p>
                  </div>
                  <span className="badge eg-badge eg-badge-risk-low"><I5.check style={{width: 11, height: 11}}/>Completo</span>
                </div>
                <div className="form-grid">
                  <div className="span-2">
                    <label className="eg-label">Nome do posto</label>
                    <input className="eg-input" defaultValue="Eletricista predial"/>
                  </div>
                  <div>
                    <label className="eg-label">CBO</label>
                    <input className="eg-input" defaultValue="7156-15 · Eletricista de manutenção predial"/>
                  </div>
                  <div>
                    <label className="eg-label">Setor</label>
                    <input className="eg-input" defaultValue="Manutenção predial"/>
                  </div>
                  <div>
                    <label className="eg-label">Colaboradores no posto</label>
                    <input className="eg-input" type="number" defaultValue="3"/>
                  </div>
                  <div>
                    <label className="eg-label">Carga horária semanal</label>
                    <input className="eg-input" defaultValue="44 h/semana"/>
                  </div>
                </div>
              </section>

              {/* 2. Função e tarefa */}
              <section id="funcao" ref={(el) => sectionRefs.current['funcao'] = el} className="section">
                <div className="section-head">
                  <span className="num-badge">02</span>
                  <div className="meta">
                    <h2>Função e tarefa</h2>
                    <p className="h-sub">Descrição da função e das principais tarefas executadas.</p>
                  </div>
                  <span className="badge eg-badge eg-badge-risk-low"><I5.check style={{width: 11, height: 11}}/>Completo</span>
                </div>
                <div>
                  <label className="eg-label">Descrição da função</label>
                  <textarea className="eg-input" defaultValue="Responsável pela manutenção corretiva e preventiva da infraestrutura elétrica predial — incluindo quadros de distribuição, iluminação, tomadas, disjuntores e sistemas de emergência (no-breaks, geradores)."/>
                  <p className="field-help">Use linguagem técnica clara — este texto compõe o relatório PDF.</p>
                </div>
                <div style={{marginTop: 18}}>
                  <label className="eg-label">Principais tarefas</label>
                  <div className="rich-editor">
                    <div className="rich-toolbar">
                      <button title="Negrito"><I5.bold/></button>
                      <button title="Itálico"><I5.italic/></button>
                      <span className="sep"/>
                      <button title="Lista" className="on"><I5.listUl/></button>
                      <button title="Numerada"><I5.listOl/></button>
                      <span className="sep"/>
                      <button title="Link"><I5.link/></button>
                    </div>
                    <div className="rich-area" contentEditable suppressContentEditableWarning={true}>
                      <ul>
                        <li>Inspeção visual e teste de quadros elétricos de distribuição</li>
                        <li>Substituição de disjuntores, contactores e dispositivos DR</li>
                        <li>Lançamento e fixação de cabos elétricos em eletrocalha e bandeja</li>
                        <li>Instalação e reparo de luminárias em altura (até 4m)</li>
                        <li>Atendimento a emergências elétricas durante plantão</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Análise da atividade */}
              <section id="atividade" ref={(el) => sectionRefs.current['atividade'] = el} className="section">
                <div className="section-head">
                  <span className="num-badge">03</span>
                  <div className="meta">
                    <h2>Análise da atividade</h2>
                    <p className="h-sub">Como o trabalho é efetivamente realizado — observado no campo.</p>
                  </div>
                  <span className="badge eg-badge eg-badge-risk-low"><I5.check style={{width: 11, height: 11}}/>Completo</span>
                </div>
                <div>
                  <label className="eg-label">Descrição da atividade real (observada in loco)</label>
                  <textarea className="eg-input" style={{minHeight: 130}} defaultValue="Durante observação em 18/05/2026, o profissional realizou trabalho em altura (escada simples de 4m, sem plataforma) para substituição de luminárias em corredor administrativo. Foi observada manutenção de braços elevados acima do ombro por períodos de 2 a 4 minutos consecutivos, com transporte manual de ferramentas e equipamentos sem cinto de ferramentas dedicado. Pausas eram autodeterminadas, mas pouco frequentes (1 a cada 90 min)."/>
                </div>
              </section>

              {/* 4. Fotos */}
              <section id="fotos" ref={(el) => sectionRefs.current['fotos'] = el} className="section">
                <div className="section-head">
                  <span className="num-badge">04</span>
                  <div className="meta">
                    <h2>Registro fotográfico</h2>
                    <p className="h-sub">Fotos do posto, postura e ambiente. Cada foto recebe legenda no laudo.</p>
                  </div>
                  <span className="badge eg-badge eg-badge-risk-low"><I5.check style={{width: 11, height: 11}}/>{PHOTOS.length} fotos</span>
                </div>
                <div className="photos-toolbar">
                  <div className="meta">
                    <strong>{PHOTOS.length} fotos</strong> · capturadas em 18/05/2026
                  </div>
                  <div style={{display:'flex', gap: 8}}>
                    <button className="eg-btn eg-btn-secondary" style={{height: 34, padding:'0 12px', fontSize: 12}}>
                      <I5.upload/> Adicionar foto
                    </button>
                  </div>
                </div>
                <div className="photos-grid">
                  {PHOTOS.map(p => (
                    <div key={p.tag} className="photo-card">
                      <div className="photo-thumb" style={{'--photo-c1': p.c1, '--photo-c2': p.c2}}>
                        <span className="photo-tag">{p.tag}</span>
                        <span className="placeholder-icon"><I5.camera/></span>
                        <div className="photo-actions">
                          <button aria-label="Editar"><I5.edit/></button>
                          <button aria-label="Remover"><I5.trash/></button>
                        </div>
                      </div>
                      <div className="photo-caption">
                        <div className="name">{p.name}</div>
                        <div className="meta">{p.meta}</div>
                      </div>
                    </div>
                  ))}
                  <button className="photo-upload">
                    <I5.upload/>
                    Adicionar foto<br/>
                    <span style={{fontSize: 10, color:'var(--ink-400)'}}>JPG, PNG · até 10 MB</span>
                  </button>
                </div>
              </section>

              {/* 5. Características */}
              <section id="caracteristicas" ref={(el) => sectionRefs.current['caracteristicas'] = el} className="section">
                <div className="section-head">
                  <span className="num-badge">05</span>
                  <div className="meta">
                    <h2>Características do trabalho</h2>
                    <p className="h-sub">Aspectos organizacionais e ambientais observados no posto.</p>
                  </div>
                  <span className="badge eg-badge eg-badge-risk-low"><I5.check style={{width: 11, height: 11}}/>12 / 12</span>
                </div>
                <div className="char-grid">
                  <div className="char-col">
                    <h4>Organizacionais</h4>
                    <div className="char-list">
                      {CHARS_ORG.map((c, i) => (
                        <div key={i} className={'char-row' + (c.on ? ' on' : '')}>
                          <div className="lbl">
                            {c.name}
                            {c.sub && <div className="sub">{c.sub}</div>}
                          </div>
                          <div className="segmented">
                            <button className={c.on ? 'on' : ''}>Sim</button>
                            <button className={!c.on ? 'on' : ''}>Não</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="char-col">
                    <h4>Ambientais</h4>
                    <div className="char-list">
                      {CHARS_AMB.map((c, i) => (
                        <div key={i} className={'char-row' + (c.on ? ' on' : '')}>
                          <div className="lbl">
                            {c.name}
                            {c.sub && <div className="sub">{c.sub}</div>}
                          </div>
                          <div className="segmented">
                            <button className={c.on ? 'on' : ''}>Sim</button>
                            <button className={!c.on ? 'on' : ''}>Não</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* 6. Saúde */}
              <section id="saude" ref={(el) => sectionRefs.current['saude'] = el} className="section">
                <div className="section-head">
                  <span className="num-badge">06</span>
                  <div className="meta">
                    <h2>Dados de saúde ocupacional</h2>
                    <p className="h-sub">Indicadores agregados do SESMT relacionados a este posto.</p>
                  </div>
                  <span className="badge eg-badge eg-badge-risk-med">! Aguardando SESMT</span>
                </div>
                <div className="health-cards">
                  <div className="health-card">
                    <div className="l">Atestados (12 meses)</div>
                    <div className="v">14</div>
                    <div className="delta">média 2.3 dias/atestado</div>
                  </div>
                  <div className="health-card warn">
                    <div className="l">CIDs M (osteomusc.)</div>
                    <div className="v">6</div>
                    <div className="delta">42% dos atestados</div>
                  </div>
                  <div className="health-card">
                    <div className="l">CATs registradas</div>
                    <div className="v">2</div>
                    <div className="delta">queda em altura · ombro</div>
                  </div>
                  <div className="health-card">
                    <div className="l">Afastamentos INSS</div>
                    <div className="v">1</div>
                    <div className="delta">B91 · 47 dias</div>
                  </div>
                  <div className="health-card">
                    <div className="l">Queixas espontâneas</div>
                    <div className="v">8</div>
                    <div className="delta">ombro, lombar, mãos</div>
                  </div>
                </div>
                <div style={{marginTop: 18}}>
                  <label className="eg-label">Observações do SESMT</label>
                  <textarea className="eg-input" placeholder="Adicione observações da equipe de saúde ocupacional…"></textarea>
                </div>
              </section>

              {/* 7. Pré-diagnóstico */}
              <section id="prediagnostico" ref={(el) => sectionRefs.current['prediagnostico'] = el} className="section">
                <div className="section-head">
                  <span className="num-badge">07</span>
                  <div className="meta">
                    <h2>Pré-diagnóstico</h2>
                    <p className="h-sub">Avaliação preliminar antes da aplicação das ferramentas biomecânicas.</p>
                  </div>
                  <span className="badge eg-badge eg-badge-risk-high"><span className="dot"/>Risco alto</span>
                </div>
                <div className="severity-scale">
                  <div className={'sev-pill low' + (t.preDiagnosis === 'low' ? ' selected' : '')}
                       onClick={() => setTweak('preDiagnosis', 'low')}>
                    <span className="icon"><I5.smile/></span>
                    <div className="name">Risco baixo</div>
                    <div className="desc">Não requer intervenção</div>
                  </div>
                  <div className={'sev-pill med' + (t.preDiagnosis === 'med' ? ' selected' : '')}
                       onClick={() => setTweak('preDiagnosis', 'med')}>
                    <span className="icon"><I5.meh/></span>
                    <div className="name">Risco moderado</div>
                    <div className="desc">Aplicar ferramentas</div>
                  </div>
                  <div className={'sev-pill high' + (t.preDiagnosis === 'high' ? ' selected' : '')}
                       onClick={() => setTweak('preDiagnosis', 'high')}>
                    <span className="icon"><I5.frown/></span>
                    <div className="name">Risco alto</div>
                    <div className="desc">Intervenção imediata</div>
                  </div>
                </div>
                <div>
                  <label className="eg-label">Justificativa do pré-diagnóstico</label>
                  <textarea className="eg-input" defaultValue="Posto apresenta múltiplos fatores de risco identificados na observação inicial: trabalho frequente acima do nível dos ombros, manuseio de carga, trabalho em altura sem equipamentos auxiliares adequados e relato espontâneo de dores musculoesqueléticas pelos colaboradores. Aplicação de ferramentas biomecânicas se faz necessária."/>
                </div>
              </section>

              {/* 8. Ferramentas */}
              <section id="ferramentas" ref={(el) => sectionRefs.current['ferramentas'] = el} className="section">
                <div className="section-head">
                  <span className="num-badge">08</span>
                  <div className="meta">
                    <h2>Ferramentas de análise biomecânica</h2>
                    <p className="h-sub">Aplique as ferramentas adequadas ao perfil de risco do posto.</p>
                  </div>
                  <span className="badge eg-badge eg-badge-risk-med">4 de 6 aplicadas</span>
                </div>
                <div className="tools-grid">
                  {TOOLS.map(tool => {
                    const pending = tool.risk === 'pending';
                    return (
                      <div key={tool.code} className={'tool-card ' + tool.risk + (pending ? ' empty' : '')}>
                        <div className="row1">
                          <div>
                            <div className="tool-name">{tool.code}</div>
                            <div className="tool-desc">{tool.full}</div>
                          </div>
                          {!pending ? (
                            <span className="eg-badge eg-badge-risk-high"><span className="dot"/>Alto</span>
                          ) : (
                            <span className="eg-badge eg-badge-neutral">Pendente</span>
                          )}
                        </div>
                        {!pending && (
                          <div className="score-row">
                            <div>
                              <span className="l">Score</span>
                              <div className="v">{tool.score}</div>
                            </div>
                            <div style={{textAlign:'right', font:'500 11px/1.3 var(--font-sans)', color:'var(--ink-500)', maxWidth: 120}}>
                              {tool.acao}
                            </div>
                          </div>
                        )}
                        <button className="open-btn">
                          {pending ? 'Aplicar ferramenta' : 'Ver avaliação'}<I5.arrowRight/>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 9. Recomendações */}
              <section id="recomendacoes" ref={(el) => sectionRefs.current['recomendacoes'] = el} className="section">
                <div className="section-head">
                  <span className="num-badge">09</span>
                  <div className="meta">
                    <h2>Recomendações técnicas</h2>
                    <p className="h-sub">Medidas propostas, priorizadas por nível de impacto e prazo.</p>
                  </div>
                  <span className="badge eg-badge eg-badge-risk-low">{RECOS.length} cadastradas</span>
                </div>
                <div className="reco-list">
                  {RECOS.map((r, i) => (
                    <div key={i} className={'reco-item priority-' + r.priority}>
                      <span className="ic">
                        {r.priority === 'high' ? <I5.alert/> : r.priority === 'med' ? <I5.tool/> : <I5.lightbulb/>}
                      </span>
                      <div className="body">
                        <div className="ttl">{r.title}</div>
                        <div className="desc">{r.desc}</div>
                        <div className="tags">
                          {r.tags.map(t => <span key={t} className="tag">{t}</span>)}
                        </div>
                      </div>
                      <div className="actions">
                        <button aria-label="Editar"><I5.edit/></button>
                        <button aria-label="Remover"><I5.trash/></button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="eg-btn eg-btn-secondary" style={{marginTop: 16}}>
                  <I5.plus/> Adicionar recomendação
                </button>
              </section>
            </div>
          </div>
        </div>

        {/* — Sticky save bar — */}
        {t.showSaveBar && (
          <div className="save-bar">
            <div className={'status' + (hasUnsaved ? '' : ' saved')}>
              <span className="dot"/>
              {hasUnsaved ? 'Alterações não salvas · rascunho automático às 16:38' : 'Tudo salvo'}
            </div>
            <div className="actions">
              <button className="eg-btn eg-btn-ghost">Pré-visualizar PDF</button>
              <button className="eg-btn eg-btn-secondary" onClick={() => setHasUnsaved(true)}>Descartar</button>
              <button className="eg-btn eg-btn-primary" onClick={() => setHasUnsaved(false)}>
                Salvar alterações <I5.check style={{width: 16, height: 16}}/>
              </button>
            </div>
          </div>
        )}
      </main>

      <TweaksPanel title="Tweaks · Posto">
        <TweakSection label="Layout" />
        <TweakRadio
          label="Menu âncora"
          value={t.anchorPosition}
          options={['left', 'right']}
          onChange={(v) => setTweak('anchorPosition', v)}
        />
        <TweakSection label="Componentes" />
        <TweakToggle label="Card de risco no header" value={t.showRiskCard} onChange={(v) => setTweak('showRiskCard', v)}/>
        <TweakToggle label="Barra fixa de salvar" value={t.showSaveBar} onChange={(v) => setTweak('showSaveBar', v)}/>
        <TweakSection label="Pré-diagnóstico" />
        <TweakRadio
          label="Severidade selecionada"
          value={t.preDiagnosis}
          options={['low', 'med', 'high']}
          onChange={(v) => setTweak('preDiagnosis', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('react-root')).render(<PostoPage />);

export default PostoPage;
