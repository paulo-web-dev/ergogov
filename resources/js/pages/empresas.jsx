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
  /* — Page header — */
  .emp-header {
    display: flex; align-items: flex-end; justify-content: space-between;
    gap: 24px; margin-bottom: 24px;
  }
  .emp-header h1 {
    font: 700 30px/1.1 var(--font-sans);
    letter-spacing: -0.025em;
    color: var(--ink-900);
    margin: 0;
  }
  .emp-header .sub {
    margin-top: 8px;
    color: var(--ink-500);
    font: var(--t-body);
  }
  .emp-header .sub strong { color: var(--ink-900); font-weight: 600; }

  /* — Toolbar — */
  .emp-toolbar {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }
  .emp-search {
    position: relative;
    flex: 1; min-width: 280px; max-width: 420px;
  }
  .emp-search svg.lead {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    width: 18px; height: 18px; stroke-width: 1.75; color: var(--ink-400);
    pointer-events: none;
  }
  .emp-search input {
    width: 100%; height: 42px;
    border: 1px solid var(--line-2);
    background: var(--white);
    border-radius: var(--r-md);
    padding: 0 14px 0 42px;
    font: 400 14px/1 var(--font-sans);
    color: var(--ink-900);
    transition: border-color var(--dur-fast), box-shadow var(--dur-fast);
  }
  .emp-search input:focus { outline: none; border-color: var(--g-600); box-shadow: var(--ring-focus); }
  .emp-search input::placeholder { color: var(--ink-400); }

  .filter-pill {
    display: inline-flex; align-items: center; gap: 8px;
    height: 42px; padding: 0 14px;
    border: 1px solid var(--line-2);
    background: var(--white);
    border-radius: var(--r-md);
    font: 500 13px/1 var(--font-sans);
    color: var(--ink-700);
    cursor: pointer;
    transition: all var(--dur-fast);
  }
  .filter-pill:hover { background: var(--ink-50); border-color: var(--line-3); }
  .filter-pill.active { background: var(--g-50); border-color: var(--g-300); color: var(--g-800); }
  .filter-pill svg { width: 15px; height: 15px; stroke-width: 1.75; }
  .filter-pill .count {
    margin-left: 4px;
    background: var(--ink-100); color: var(--ink-700);
    padding: 2px 7px; border-radius: 10px;
    font: 600 11px/1 var(--font-sans);
  }
  .filter-pill.active .count { background: var(--g-200); color: var(--g-900); }

  .view-toggle {
    display: inline-flex;
    border: 1px solid var(--line-2);
    border-radius: var(--r-md);
    background: var(--white);
    padding: 3px;
    margin-left: auto;
  }
  .view-toggle button {
    width: 36px; height: 34px;
    display: inline-flex; align-items: center; justify-content: center;
    background: transparent; border: 0;
    border-radius: 7px;
    color: var(--ink-500);
    transition: all var(--dur-fast);
  }
  .view-toggle button:hover { color: var(--ink-900); }
  .view-toggle button.on {
    background: var(--g-50);
    color: var(--g-800);
    box-shadow: var(--shadow-xs);
  }
  .view-toggle svg { width: 16px; height: 16px; stroke-width: 1.75; }

  /* — Status filter chips row — */
  .status-row {
    display: flex; gap: 8px; align-items: center;
    margin-bottom: 24px;
    overflow-x: auto;
    padding-bottom: 4px;
  }

  /* — Grid view — */
  .emp-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
  @media (max-width: 1100px) { .emp-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 720px) { .emp-grid { grid-template-columns: 1fr; } }

  .emp-card {
    position: relative;
    background: var(--surface);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    padding: 22px;
    transition: all var(--dur) var(--ease-out);
    display: flex; flex-direction: column;
    gap: 0;
  }
  .emp-card:hover {
    border-color: var(--g-300);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  .emp-card-top {
    display: flex; align-items: flex-start; gap: 14px;
    margin-bottom: 16px;
  }
  .emp-avatar {
    width: 52px; height: 52px;
    border-radius: 14px;
    display: inline-flex; align-items: center; justify-content: center;
    color: var(--white);
    font: 700 17px/1 var(--font-sans);
    letter-spacing: -0.005em;
    flex-shrink: 0;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
    position: relative;
  }
  .emp-avatar::after {
    /* subtle ring */
    content: '';
    position: absolute; inset: -3px;
    border-radius: 17px;
    border: 1px solid currentColor;
    opacity: 0.18;
    pointer-events: none;
  }
  .emp-name-wrap { flex: 1; min-width: 0; }
  .emp-name {
    font: 600 16px/1.25 var(--font-sans);
    letter-spacing: -0.01em;
    color: var(--ink-900);
    margin: 0 0 4px;
    /* truncate to 2 lines */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .emp-cnpj {
    font: var(--t-mono);
    color: var(--ink-500);
    font-size: 12px;
    letter-spacing: 0.01em;
  }
  .emp-menu {
    width: 32px; height: 32px;
    display: inline-flex; align-items: center; justify-content: center;
    background: transparent; border: 0;
    border-radius: 7px;
    color: var(--ink-500);
    transition: all var(--dur-fast);
  }
  .emp-menu:hover { background: var(--ink-50); color: var(--ink-900); }
  .emp-menu svg { width: 18px; height: 18px; stroke-width: 1.75; }

  /* status badge inside card */
  .emp-card .status-line {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
  .meta-chip {
    display: inline-flex; align-items: center; gap: 5px;
    font: 500 11px/1 var(--font-sans);
    color: var(--ink-500);
    background: transparent;
    border: 1px solid var(--line-1);
    padding: 5px 9px;
    border-radius: var(--r-pill);
    letter-spacing: 0.005em;
  }
  .meta-chip svg { width: 12px; height: 12px; stroke-width: 1.75; }

  /* progress bar */
  .emp-progress {
    margin-bottom: 16px;
  }
  .emp-progress .row {
    display: flex; align-items: baseline; justify-content: space-between;
    margin-bottom: 6px;
  }
  .emp-progress .row .l {
    font: 500 12px/1 var(--font-sans);
    color: var(--ink-600);
  }
  .emp-progress .row .v {
    font: 700 14px/1 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
  }
  .emp-progress .bar {
    height: 6px;
    background: var(--ink-100);
    border-radius: 3px;
    overflow: hidden;
    position: relative;
  }
  .emp-progress .bar > span {
    display: block;
    height: 100%;
    border-radius: 3px;
    background: linear-gradient(90deg, var(--bar-from), var(--bar-to));
    transition: width var(--dur) var(--ease-out);
  }

  /* card meta grid */
  .emp-meta-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    padding: 14px 0;
    border-top: 1px solid var(--line-1);
    border-bottom: 1px solid var(--line-1);
    margin-bottom: 16px;
  }
  .emp-meta-grid .cell { text-align: center; }
  .emp-meta-grid .cell .n {
    font: 700 16px/1 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.015em;
    font-variant-numeric: tabular-nums;
  }
  .emp-meta-grid .cell.high .n { color: var(--risk-high-fg); }
  .emp-meta-grid .cell.med .n  { color: var(--risk-med-fg); }
  .emp-meta-grid .cell.low .n  { color: var(--risk-low-fg); }
  .emp-meta-grid .cell .l {
    font: 500 10px/1.3 var(--font-sans);
    color: var(--ink-500);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-top: 4px;
  }

  /* card footer */
  .emp-card-foot {
    display: flex; align-items: center; gap: 10px;
    margin-top: auto;
  }
  .emp-card-foot .eg-btn-primary { flex: 1; }
  .emp-card-foot .eg-btn-secondary {
    height: 42px; padding: 0 14px;
  }

  /* — List view (table) — */
  .emp-list {
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    overflow: hidden;
  }
  .emp-list-head, .emp-list-row {
    display: grid;
    grid-template-columns: 2.4fr 1fr 1.2fr 1.6fr 0.8fr 100px;
    gap: 16px;
    padding: 14px 22px;
    align-items: center;
  }
  .emp-list-head {
    font: 600 11px/1 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-500);
    background: var(--ink-25);
    border-bottom: 1px solid var(--line-1);
  }
  .emp-list-row {
    border-bottom: 1px solid var(--line-1);
    transition: background var(--dur-fast);
    cursor: pointer;
  }
  .emp-list-row:last-child { border-bottom: 0; }
  .emp-list-row:hover { background: var(--ink-25); }
  .emp-list-row .emp-cell-name {
    display: flex; align-items: center; gap: 12px;
    min-width: 0;
  }
  .emp-list-row .emp-cell-name .emp-avatar {
    width: 36px; height: 36px; font-size: 13px; border-radius: 10px;
  }
  .emp-list-row .emp-cell-name .name {
    font: 600 14px/1.25 var(--font-sans);
    color: var(--ink-900);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .emp-list-row .emp-cell-name .sub {
    font: 400 12px/1.2 var(--font-sans);
    color: var(--ink-500);
    margin-top: 2px;
  }
  .emp-list-row .cnpj-cell { font: var(--t-mono); font-size: 12px; color: var(--ink-600); }
  .emp-list-row .bar-cell {
    display: flex; flex-direction: column; gap: 4px;
  }
  .emp-list-row .bar-cell .label {
    font: 600 12px/1 var(--font-sans); color: var(--ink-900);
    font-variant-numeric: tabular-nums;
  }
  .emp-list-row .bar-cell .bar {
    height: 5px; background: var(--ink-100); border-radius: 3px; overflow: hidden;
  }
  .emp-list-row .bar-cell .bar span { display:block; height:100%; border-radius:3px; }

  /* — Empty state — */
  .empty-state {
    display: flex; flex-direction: column; align-items: center; text-align: center;
    padding: 80px 24px;
    background: var(--white);
    border: 1px dashed var(--line-2);
    border-radius: var(--r-xl);
  }
  .empty-state .ic {
    width: 64px; height: 64px;
    border-radius: 18px;
    background: var(--g-50);
    color: var(--g-700);
    display: inline-flex; align-items: center; justify-content: center;
    margin-bottom: 20px;
  }
  .empty-state .ic svg { width: 30px; height: 30px; stroke-width: 1.5; }
  .empty-state h3 {
    font: 600 18px/1.3 var(--font-sans);
    color: var(--ink-900);
    margin: 0 0 8px;
  }
  .empty-state p {
    font: var(--t-body);
    color: var(--ink-500);
    max-width: 400px;
    margin: 0 0 24px;
  }

  /* — Pagination — */
  .pagination {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 24px;
    color: var(--ink-500);
    font: 500 13px/1 var(--font-sans);
  }
  .pagination .pages {
    display: inline-flex; gap: 4px;
  }
  .pagination .pages button {
    width: 36px; height: 36px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--r-sm);
    color: var(--ink-700);
    font: 500 13px/1 var(--font-sans);
    transition: all var(--dur-fast);
  }
  .pagination .pages button:hover { background: var(--ink-50); }
  .pagination .pages button.on {
    background: var(--g-800);
    color: var(--white);
    border-color: var(--g-800);
  }
  .pagination .pages button.icon { color: var(--ink-500); }
  .pagination .pages button.icon svg { width: 16px; height: 16px; stroke-width: 1.75; }

  /* — Action menu — */
  .action-menu {
    position: absolute;
    top: 60px; right: 16px;
    z-index: 20;
    background: var(--white);
    border: 1px solid var(--line-2);
    border-radius: var(--r-md);
    box-shadow: var(--shadow-lg);
    padding: 6px;
    min-width: 180px;
  }
  .action-menu button {
    display: flex; width: 100%; align-items: center; gap: 10px;
    padding: 8px 10px;
    background: transparent; border: 0;
    color: var(--ink-800);
    font: 500 13px/1 var(--font-sans);
    border-radius: var(--r-xs);
    transition: background var(--dur-fast);
    text-align: left;
  }
  .action-menu button:hover { background: var(--ink-50); }
  .action-menu button.danger { color: var(--risk-high-fg); }
  .action-menu button.danger:hover { background: var(--risk-high-bg); }
  .action-menu button svg { width: 15px; height: 15px; stroke-width: 1.75; flex-shrink: 0; }
  .action-menu hr {
    border: 0; height: 1px;
    background: var(--line-1);
    margin: 4px 0;
  }
`;

// TweaksPanel stub — design tool removed for production

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}

const { useState, useMemo, useRef, useEffect } = React;

// — Extra icons —
const Icon2 = {
  building: EgIcon.building,
  more: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg>,
  edit: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"/></svg>,
  trash: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg>,
  copy: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  archive: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 13h4"/></svg>,
  eye: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
  filter: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M7 12h10M10 18h4"/></svg>,
  grid: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  list: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
  sort: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4v16M3 8l4-4 4 4M17 20V4M21 16l-4 4-4-4"/></svg>,
  chevLeft: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
  chevRight: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6"/></svg>,
};

// — Mock data —
// ALL_COMPANIES from server props
const STATUS_MAP = {
  andamento:  { label: 'AET em andamento', cls: 'eg-badge-risk-med', barFrom: '#F59E0B', barTo: '#FBBF24' },
  concluida:  { label: 'Concluída',        cls: 'eg-badge-risk-low', barFrom: '#16A34A', barTo: '#3DA47E' },
  iniciada:   { label: 'Iniciada',         cls: 'eg-badge-neutral',  barFrom: '#6B7B72', barTo: '#94A199' },
  pendente:   { label: 'Aguardando início',cls: 'eg-badge-neutral',  barFrom: '#BFC9C2', barTo: '#DBE2DD' },
};

function colorFromName(name) {
  const palette = [
    {bg: '#2D8659', shade: 'rgba(45,134,89,0.95)'},
    {bg: '#1F6B70', shade: 'rgba(31,107,112,0.95)'},
    {bg: '#3D5A4A', shade: 'rgba(61,90,74,0.95)'},
    {bg: '#1F6B43', shade: 'rgba(31,107,67,0.95)'},
    {bg: '#0F3D2A', shade: 'rgba(15,61,42,0.95)'},
    {bg: '#4FB5A6', shade: 'rgba(79,181,166,0.95)'},
    {bg: '#5A6B4C', shade: 'rgba(90,107,76,0.95)'},
  ];
  let h = 0;
  for (let i=0; i<name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const c = palette[h % palette.length];
  return `linear-gradient(135deg, ${c.bg} 0%, ${c.shade} 100%)`;
}
function initials(name) {
  return name.replace(/[·\-\.]/g,' ')
    .split(/\s+/).filter(Boolean)
    .filter(w => !['de','da','do','dos','das','e','—','ltda','s/a','sa'].includes(w.toLowerCase()))
    .slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

// — Tweakable defaults —
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "view": "grid",
  "showMetaGrid": true,
  "showSectorChips": true,
  "showEmptyState": false,
  "highlightActionable": true
}/*EDITMODE-END*/;

function EmpresaCard({ c, onMenuToggle, menuOpen }) {
  const status = STATUS_MAP[c.status];
  const t = window._homeTweaks || {};
  const isCritical = c.riskHigh >= 5;

  return (
    <article className="emp-card" style={{
      borderColor: t.highlightActionable && isCritical ? 'var(--risk-high-bd)' : undefined
    }}>
      {isCritical && t.highlightActionable && (
        <span style={{
          position: 'absolute', top: -1, left: 22, right: 22, height: 3,
          background: 'var(--risk-high-solid)',
          borderRadius: '0 0 3px 3px'
        }}/>
      )}

      <div className="emp-card-top">
        <span className="emp-avatar" style={{background: colorFromName(c.name)}}>
          {initials(c.name)}
        </span>
        <div className="emp-name-wrap">
          <h3 className="emp-name">{c.name}</h3>
          <div className="emp-cnpj">{c.cnpj}</div>
        </div>
        <button className="emp-menu" onClick={() => onMenuToggle(c.cnpj)} aria-label="Mais opções">
          <Icon2.more />
        </button>
        {menuOpen && (
          <div className="action-menu" onClick={(e) => e.stopPropagation()}>
            <button><Icon2.eye/> Ver detalhes</button>
            <button><Icon2.edit/> Editar empresa</button>
            <button><Icon2.copy/> Duplicar AET</button>
            <button><Icon2.archive/> Arquivar</button>
            <hr/>
            <button className="danger"><Icon2.trash/> Excluir</button>
          </div>
        )}
      </div>

      <div className="status-line">
        <span className={'eg-badge ' + status.cls}>
          <span className="dot"/>{status.label}
        </span>
        {t.showSectorChips && (
          <span className="meta-chip">
            <Icon2.building/>
            {c.sector}
          </span>
        )}
      </div>

      <div className="emp-progress">
        <div className="row">
          <span className="l">Conclusão da AET</span>
          <span className="v">{c.progress}%</span>
        </div>
        <div className="bar" style={{'--bar-from': status.barFrom, '--bar-to': status.barTo}}>
          <span style={{width: c.progress + '%'}}/>
        </div>
      </div>

      {t.showMetaGrid && (
        <div className="emp-meta-grid">
          <div className="cell"><div className="n">{c.postos}</div><div className="l">Postos</div></div>
          <div className="cell high"><div className="n">{c.riskHigh}</div><div className="l">Risco alto</div></div>
          <div className="cell med"><div className="n">{c.riskMed}</div><div className="l">Moderado</div></div>
        </div>
      )}

      <div className="emp-card-foot">
        <button className="eg-btn eg-btn-primary">Ver detalhes <EgIcon.arrowRight/></button>
        <button className="eg-btn eg-btn-secondary" aria-label="Editar"><Icon2.edit/></button>
      </div>
    </article>
  );
}

function EmpresaRow({ c, onMenuToggle, menuOpen }) {
  const status = STATUS_MAP[c.status];
  return (
    <div className="emp-list-row" style={{position:'relative'}}>
      <div className="emp-cell-name">
        <span className="emp-avatar" style={{background: colorFromName(c.name)}}>
          {initials(c.name)}
        </span>
        <div style={{minWidth: 0}}>
          <div className="name">{c.name}</div>
          <div className="sub">{c.sector} · {c.employees.toLocaleString('pt-BR')} colaboradores</div>
        </div>
      </div>
      <div className="cnpj-cell">{c.cnpj}</div>
      <div>
        <span className={'eg-badge ' + status.cls}><span className="dot"/>{status.label}</span>
      </div>
      <div className="bar-cell">
        <span className="label">{c.progress}% concluída</span>
        <span className="bar">
          <span style={{width: c.progress + '%', background: `linear-gradient(90deg, ${status.barFrom}, ${status.barTo})`}}/>
        </span>
      </div>
      <div style={{font: '500 12px/1 var(--font-sans)', color: 'var(--ink-500)'}}>{c.updated}</div>
      <div style={{display:'flex', gap: 6, justifyContent:'flex-end'}}>
        <button className="eg-btn eg-btn-secondary" style={{height: 34, padding: '0 12px', fontSize: 12}}>Ver</button>
        <button className="emp-menu" onClick={(e) => {e.stopPropagation(); onMenuToggle(c.cnpj);}} aria-label="Mais"><Icon2.more/></button>
        {menuOpen && (
          <div className="action-menu" style={{top: 38, right: 8}} onClick={(e) => e.stopPropagation()}>
            <button><Icon2.eye/> Ver detalhes</button>
            <button><Icon2.edit/> Editar empresa</button>
            <button><Icon2.archive/> Arquivar</button>
            <hr/>
            <button className="danger"><Icon2.trash/> Excluir</button>
          </div>
        )}
      </div>
    </div>
  );
}

function EmpresasPage(serverProps) {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Dados reais do Laravel
  const user = serverProps?.user || { name: 'Usuário' };
  const ALL_COMPANIES = (serverProps?.empresas || []).map(e => ({
    id: e.id,
    name: e.name || e.nome || '—',
    cnpj: e.cnpj || '—',
    sector: e.sector || e.setor || '—',
    employees: e.employees || e.num_funcionarios || 0,
    progress: e.progress || 0,
    status: e.status || 'pendente',
    updated: e.updated || '—',
    riskHigh: e.riskHigh || 0,
    riskMed: e.riskMed || 0,
    riskLow: e.riskLow || 0,
    postos: e.postos || 0,
  }));

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('todas');
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const close = () => setOpenMenu(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const filtered = useMemo(() => {
    return ALL_COMPANIES.filter(c => {
      if (statusFilter !== 'todas' && c.status !== statusFilter) return false;
      if (query) {
        const q = query.toLowerCase();
        return (c.name || '').toLowerCase().includes(q) || (c.cnpj || '').includes(q);
      }
      return true;
    });
  }, [ALL_COMPANIES, query, statusFilter]);

  const display = t.showEmptyState ? [] : filtered;

  const counts = useMemo(() => ({
    todas: ALL_COMPANIES.length,
    andamento: ALL_COMPANIES.filter(c => c.status === 'andamento').length,
    concluida: ALL_COMPANIES.filter(c => c.status === 'concluida').length,
    iniciada: ALL_COMPANIES.filter(c => c.status === 'iniciada').length,
    pendente: ALL_COMPANIES.filter(c => c.status === 'pendente').length,
  }), [ALL_COMPANIES]);

  return (
    <div className="eg-shell">
      <EgSidebar active="empresas" />
      <main className="eg-main">
        <EgTopbar breadcrumb={['Início', 'Empresas']} user={user.name}/>

        <div className="eg-page" data-screen-label="03 Empresas">
          {/* Header */}
          <div className="emp-header">
            <div>
              <h1>Empresas cadastradas</h1>
              <p className="sub">
                <strong>{counts.todas}</strong> organizações ·{' '}
                <strong>{counts.andamento}</strong> com AET em andamento ·{' '}
                <strong>{counts.concluida}</strong> concluída{counts.concluida === 1 ? '' : 's'}
              </p>
            </div>
            <button className="eg-btn eg-btn-primary">
              <EgIcon.plus/> Nova empresa
            </button>
          </div>

          {/* Toolbar */}
          <div className="emp-toolbar">
            <div className="emp-search">
              <EgIcon.search className="lead"/>
              <input
                type="search"
                placeholder="Buscar por nome ou CNPJ…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button className="filter-pill">
              <Icon2.filter/> Filtros
              <span className="count">2</span>
            </button>
            <button className="filter-pill">
              <Icon2.sort/> Última atualização
            </button>
            <div className="view-toggle">
              <button className={t.view === 'grid' ? 'on' : ''}
                      onClick={() => setTweak('view', 'grid')}
                      aria-label="Visualização em grade">
                <Icon2.grid/>
              </button>
              <button className={t.view === 'list' ? 'on' : ''}
                      onClick={() => setTweak('view', 'list')}
                      aria-label="Visualização em lista">
                <Icon2.list/>
              </button>
            </div>
          </div>

          {/* Status chips */}
          <div className="status-row">
            <button className={'filter-pill ' + (statusFilter === 'todas' ? 'active' : '')}
                    onClick={() => setStatusFilter('todas')}>
              Todas <span className="count">{counts.todas}</span>
            </button>
            <button className={'filter-pill ' + (statusFilter === 'andamento' ? 'active' : '')}
                    onClick={() => setStatusFilter('andamento')}>
              Em andamento <span className="count">{counts.andamento}</span>
            </button>
            <button className={'filter-pill ' + (statusFilter === 'concluida' ? 'active' : '')}
                    onClick={() => setStatusFilter('concluida')}>
              Concluídas <span className="count">{counts.concluida}</span>
            </button>
            <button className={'filter-pill ' + (statusFilter === 'iniciada' ? 'active' : '')}
                    onClick={() => setStatusFilter('iniciada')}>
              Iniciadas <span className="count">{counts.iniciada}</span>
            </button>
            <button className={'filter-pill ' + (statusFilter === 'pendente' ? 'active' : '')}
                    onClick={() => setStatusFilter('pendente')}>
              Pendentes <span className="count">{counts.pendente}</span>
            </button>
          </div>

          {/* Content */}
          {display.length === 0 ? (
            <div className="empty-state">
              <span className="ic"><Icon2.building/></span>
              <h3>Nenhuma empresa cadastrada{query || statusFilter !== 'todas' ? ' nos filtros atuais' : ''}</h3>
              <p>
                {query || statusFilter !== 'todas'
                  ? 'Ajuste a busca ou os filtros para encontrar uma organização.'
                  : 'Comece cadastrando sua primeira organização para iniciar uma Análise Ergonômica do Trabalho.'}
              </p>
              <button className="eg-btn eg-btn-primary"><EgIcon.plus/> Cadastrar empresa</button>
            </div>
          ) : t.view === 'grid' ? (
            <div className="emp-grid">
              {display.map(c => (
                <EmpresaCard
                  key={c.cnpj} c={c}
                  menuOpen={openMenu === c.cnpj}
                  onMenuToggle={(id) => setOpenMenu(openMenu === id ? null : id)}
                />
              ))}
            </div>
          ) : (
            <div className="emp-list">
              <div className="emp-list-head">
                <span>Empresa</span>
                <span>CNPJ</span>
                <span>Status</span>
                <span>Progresso AET</span>
                <span>Atualizado</span>
                <span></span>
              </div>
              {display.map(c => (
                <EmpresaRow
                  key={c.cnpj} c={c}
                  menuOpen={openMenu === c.cnpj}
                  onMenuToggle={(id) => setOpenMenu(openMenu === id ? null : id)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {display.length > 0 && (
            <div className="pagination">
              <span>Mostrando <strong style={{color: 'var(--ink-900)'}}>1–{display.length}</strong> de <strong style={{color: 'var(--ink-900)'}}>{display.length}</strong> empresas</span>
              <div className="pages">
                <button className="icon" aria-label="Anterior"><Icon2.chevLeft/></button>
                <button className="on">1</button>
                <button>2</button>
                <button>3</button>
                <span style={{display:'inline-flex', alignItems:'center', padding: '0 4px', color: 'var(--ink-400)'}}>…</span>
                <button>8</button>
                <button className="icon" aria-label="Próximo"><Icon2.chevRight/></button>
              </div>
            </div>
          )}
        </div>
      </main>

      <TweaksPanel title="Tweaks · Empresas">
        <TweakSection label="Visualização" />
        <TweakRadio
          label="Layout"
          value={t.view}
          options={['grid', 'list']}
          onChange={(v) => setTweak('view', v)}
        />
        <TweakSection label="Card (grid)" />
        <TweakToggle label="Métricas (postos/risco)" value={t.showMetaGrid} onChange={(v) => setTweak('showMetaGrid', v)}/>
        <TweakToggle label="Chip de setor" value={t.showSectorChips} onChange={(v) => setTweak('showSectorChips', v)}/>
        <TweakToggle label="Destacar críticos (borda)" value={t.highlightActionable} onChange={(v) => setTweak('highlightActionable', v)}/>
        <TweakSection label="Estados" />
        <TweakToggle label="Mostrar estado vazio" value={t.showEmptyState} onChange={(v) => setTweak('showEmptyState', v)}/>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('react-root')).render(<EmpresasPage />);

export default EmpresasPage;
