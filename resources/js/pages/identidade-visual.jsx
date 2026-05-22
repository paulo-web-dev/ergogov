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
  .iv-page { max-width: 1400px; padding: 28px 32px 120px; }

  /* — Header — */
  .iv-head {
    display: flex; justify-content: space-between; align-items: flex-end;
    gap: 24px; margin-bottom: 24px;
  }
  .iv-head h1 {
    font: 700 28px/1.15 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.025em;
    margin: 0 0 6px;
  }
  .iv-head .sub {
    font: 500 13px/1.4 var(--font-sans);
    color: var(--ink-500);
    max-width: 520px;
  }

  /* — Body 2-col — */
  .iv-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: start;
  }
  @media (max-width: 1100px) { .iv-body { grid-template-columns: 1fr; } }

  /* — Form column — */
  .iv-form { display: flex; flex-direction: column; gap: 16px; }

  .iv-section {
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    overflow: hidden;
  }
  .iv-section-head {
    display: flex; align-items: center; gap: 14px;
    padding: 18px 22px;
    border-bottom: 1px solid var(--line-1);
    background: linear-gradient(180deg, var(--white), var(--ink-25));
  }
  .iv-section-head .num {
    width: 28px; height: 28px;
    border-radius: 9px;
    background: var(--g-700);
    color: var(--white);
    display: inline-flex; align-items: center; justify-content: center;
    font: 700 12px/1 var(--font-mono);
  }
  .iv-section-head h2 {
    font: 600 15px/1.2 var(--font-sans);
    color: var(--ink-900);
    margin: 0 0 2px;
    letter-spacing: -0.005em;
  }
  .iv-section-head .sub {
    font: 400 12px/1.3 var(--font-sans);
    color: var(--ink-500);
  }
  .iv-section-body { padding: 22px; }

  /* — Logo upload — */
  .logo-upload-row {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 18px;
    align-items: center;
  }
  .logo-preview {
    width: 140px; height: 100px;
    border-radius: var(--r-md);
    background: var(--ink-25);
    border: 1.5px dashed var(--line-3);
    display: flex; align-items: center; justify-content: center;
    color: var(--ink-400);
    overflow: hidden;
    transition: all var(--dur-fast);
  }
  .logo-preview.has-logo {
    background: var(--white);
    border-style: solid;
    border-color: var(--line-2);
  }
  .logo-preview .logo-circle {
    width: 64px; height: 64px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--logo-c1), var(--logo-c2));
    color: var(--white);
    display: inline-flex; align-items: center; justify-content: center;
    font: 700 22px/1 var(--font-sans);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
  }
  .logo-actions {
    display: flex; flex-direction: column; gap: 8px;
  }
  .logo-actions .upload-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 9px 14px;
    background: var(--ink-900);
    color: var(--white);
    border: 0;
    border-radius: var(--r-md);
    font: 600 13px/1 var(--font-sans);
    cursor: pointer;
    transition: all var(--dur-fast);
    width: fit-content;
  }
  .logo-actions .upload-btn:hover { background: var(--ink-800); }
  .logo-actions .upload-btn svg { width: 14px; height: 14px; stroke-width: 1.75; }
  .logo-actions .remove-btn {
    background: transparent; border: 0;
    color: var(--risk-high-fg);
    font: 500 13px/1 var(--font-sans);
    padding: 6px 0;
    cursor: pointer;
    text-align: left;
    width: fit-content;
  }
  .logo-actions .remove-btn:hover { text-decoration: underline; }
  .logo-actions .hint {
    font: 400 11px/1.4 var(--font-sans);
    color: var(--ink-500);
    margin-top: 4px;
  }

  .dropzone {
    margin-top: 16px;
    padding: 22px 18px;
    border: 1.5px dashed var(--line-3);
    border-radius: var(--r-md);
    background: var(--ink-25);
    text-align: center;
    color: var(--ink-500);
    font: 500 13px/1.4 var(--font-sans);
    cursor: pointer;
    transition: all var(--dur-fast);
  }
  .dropzone:hover {
    border-color: var(--g-400);
    background: var(--g-25);
    color: var(--g-700);
  }
  .dropzone .dz-ic {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: var(--white);
    color: var(--g-700);
    display: inline-flex; align-items: center; justify-content: center;
    margin-bottom: 10px;
    border: 1px solid var(--line-2);
  }
  .dropzone .dz-ic svg { width: 18px; height: 18px; stroke-width: 1.75; }
  .dropzone strong { color: var(--ink-900); font-weight: 600; }
  .dropzone .formats { font-size: 11px; margin-top: 6px; }

  /* — Colors — */
  .swatches-row {
    display: flex; align-items: center; gap: 10px;
    flex-wrap: wrap;
  }
  .swatch-btn {
    width: 40px; height: 40px;
    border-radius: 10px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all var(--dur-fast);
    position: relative;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08);
  }
  .swatch-btn:hover { transform: scale(1.08); }
  .swatch-btn.on {
    border-color: var(--ink-900);
    box-shadow: inset 0 0 0 1px var(--white), 0 0 0 2px var(--ink-900);
  }
  .swatch-btn.on::after {
    content: '✓';
    position: absolute;
    inset: 0;
    display: flex; align-items: center; justify-content: center;
    color: var(--white);
    font: 700 16px/1 var(--font-sans);
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  }
  .swatch-custom {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 12px;
    height: 40px;
    background: var(--white);
    border: 1px solid var(--line-2);
    border-radius: 10px;
    font: 500 13px/1 var(--font-sans);
    color: var(--ink-700);
    cursor: pointer;
    transition: all var(--dur-fast);
  }
  .swatch-custom:hover { border-color: var(--line-3); background: var(--ink-25); }
  .swatch-custom .ic {
    width: 22px; height: 22px;
    background: conic-gradient(from 0deg, #DC2626, #F59E0B, #16A34A, #2D8659, #1D4ED8, #6B21A8, #DC2626);
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
  }
  .swatch-custom input[type="color"] {
    position: absolute;
    width: 0; height: 0;
    opacity: 0;
    pointer-events: none;
  }
  .hex-input {
    display: inline-flex; align-items: center;
    height: 40px;
    border: 1px solid var(--line-2);
    border-radius: 10px;
    overflow: hidden;
  }
  .hex-input .preview {
    width: 32px; height: 100%;
    background: var(--hex-c, #14532D);
  }
  .hex-input input {
    width: 90px; height: 100%;
    border: 0;
    padding: 0 10px;
    font: 600 13px/1 var(--font-mono);
    color: var(--ink-900);
    text-transform: uppercase;
    letter-spacing: 0.02em;
    background: var(--white);
  }
  .hex-input input:focus { outline: none; }

  /* — Header / footer form fields — */
  .form-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px 18px;
  }
  .form-grid-2 .span-2 { grid-column: span 2; }
  @media (max-width: 720px) { .form-grid-2 { grid-template-columns: 1fr; } .form-grid-2 .span-2 { grid-column: auto; } }

  textarea.eg-input {
    height: auto;
    padding: 12px 14px;
    min-height: 80px;
    line-height: 1.5;
    resize: vertical;
  }

  .toggle-list {
    display: flex; flex-direction: column;
    gap: 8px;
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid var(--line-1);
  }
  .toggle-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px; align-items: center;
    padding: 8px 10px;
    border-radius: var(--r-sm);
    transition: background var(--dur-fast);
  }
  .toggle-row:hover { background: var(--ink-25); }
  .toggle-row .label {
    font: 500 13px/1.3 var(--font-sans);
    color: var(--ink-800);
  }
  .toggle-row .label .sub {
    font: 400 11.5px/1.3 var(--font-sans);
    color: var(--ink-500);
    margin-top: 2px;
  }
  .switch-flat {
    position: relative;
    width: 36px; height: 20px;
    border-radius: 12px;
    background: var(--ink-200);
    cursor: pointer;
    transition: background var(--dur-fast);
    border: 0; padding: 0;
    flex-shrink: 0;
  }
  .switch-flat::after {
    content: '';
    position: absolute;
    top: 2px; left: 2px;
    width: 16px; height: 16px;
    background: var(--white);
    border-radius: 50%;
    box-shadow: var(--shadow-sm);
    transition: transform var(--dur-fast);
  }
  .switch-flat.on { background: var(--g-700); }
  .switch-flat.on::after { transform: translateX(16px); }

  /* — Font picker — */
  .font-options {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }
  @media (max-width: 720px) { .font-options { grid-template-columns: 1fr; } }
  .font-opt {
    padding: 14px 16px;
    border: 1.5px solid var(--line-2);
    border-radius: var(--r-md);
    background: var(--white);
    cursor: pointer;
    transition: all var(--dur-fast);
    text-align: left;
  }
  .font-opt:hover { border-color: var(--line-3); background: var(--ink-25); }
  .font-opt.on { border-color: var(--g-600); background: var(--g-25); box-shadow: 0 0 0 3px var(--g-100); }
  .font-opt .sample {
    font: 700 22px/1.1 var(--ff, var(--font-sans));
    color: var(--ink-900);
    letter-spacing: -0.02em;
  }
  .font-opt .name {
    font: 500 11px/1 var(--font-sans);
    color: var(--ink-500);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 6px;
  }

  /* — PDF preview column — */
  .preview-col {
    position: sticky;
    top: 88px;
  }
  .preview-card {
    background: linear-gradient(180deg, var(--ink-50), var(--ink-100));
    border: 1px solid var(--line-2);
    border-radius: var(--r-xl);
    padding: 28px;
    box-shadow: var(--shadow-md);
  }
  .preview-card-head {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 20px;
  }
  .preview-card-head .eyebrow {
    font: 600 11px/1 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-500);
  }
  .preview-card-head .title {
    font: 600 14px/1.2 var(--font-sans);
    color: var(--ink-900);
    margin-top: 4px;
  }
  .preview-card-head .live-pill {
    margin-left: auto;
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 10px;
    background: var(--white);
    border: 1px solid var(--line-2);
    border-radius: var(--r-pill);
    font: 600 11px/1 var(--font-sans);
    color: var(--g-700);
  }
  .preview-card-head .live-pill .dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--g-500);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }

  /* PDF page mockup */
  .pdf-page {
    background: var(--white);
    width: 100%;
    aspect-ratio: 210 / 297; /* A4 */
    border-radius: 6px;
    box-shadow: 0 12px 32px -8px rgba(15,26,20,0.18), 0 2px 6px rgba(15,26,20,0.06);
    display: flex; flex-direction: column;
    overflow: hidden;
    color: #0F1A14;
    font-family: var(--pdf-font, 'Outfit', sans-serif);
    position: relative;
    transform-origin: top center;
  }

  .pdf-header {
    padding: 14px 18px;
    border-bottom: 3px solid var(--pdf-c1, #14532D);
    background: var(--pdf-header-bg, var(--white));
    display: flex; align-items: center; gap: 12px;
  }
  .pdf-header.style-band {
    background: var(--pdf-c1, #14532D);
    color: var(--white);
    border-bottom: 0;
  }
  .pdf-header .pdf-logo {
    width: 36px; height: 36px;
    border-radius: 8px;
    background: linear-gradient(135deg, var(--pdf-c1, #14532D), var(--pdf-c2, #3DA47E));
    color: var(--white);
    display: inline-flex; align-items: center; justify-content: center;
    font: 700 13px/1 var(--font-sans);
    flex-shrink: 0;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
  }
  .pdf-header.style-band .pdf-logo {
    background: var(--white);
    color: var(--pdf-c1);
  }
  .pdf-header .pdf-h-meta { flex: 1; min-width: 0; }
  .pdf-header .pdf-h-title {
    font: 700 13px/1.2 var(--pdf-font, 'Outfit', sans-serif);
    color: var(--pdf-title-c, var(--ink-900));
    letter-spacing: -0.01em;
    margin: 0 0 2px;
  }
  .pdf-header.style-band .pdf-h-title { color: var(--white); }
  .pdf-header .pdf-h-sub {
    font: 500 10px/1.3 var(--pdf-font, 'Outfit', sans-serif);
    color: var(--ink-500);
  }
  .pdf-header.style-band .pdf-h-sub { color: rgba(255,255,255,0.85); }
  .pdf-header .pdf-h-right {
    text-align: right;
    font: 500 9px/1.4 var(--pdf-font, 'Outfit', sans-serif);
    color: var(--ink-500);
    flex-shrink: 0;
  }
  .pdf-header.style-band .pdf-h-right { color: rgba(255,255,255,0.7); }
  .pdf-header .pdf-h-right strong { color: var(--ink-900); font-weight: 600; display: block; }
  .pdf-header.style-band .pdf-h-right strong { color: var(--white); }

  .pdf-content {
    flex: 1;
    padding: 18px;
    display: flex; flex-direction: column;
    gap: 12px;
    overflow: hidden;
  }
  .pdf-content h3 {
    font: 700 14px/1.2 var(--pdf-font, 'Outfit', sans-serif);
    color: var(--pdf-c1, #14532D);
    margin: 0 0 6px;
    letter-spacing: -0.01em;
  }
  .pdf-content .text-lines {
    display: flex; flex-direction: column; gap: 6px;
  }
  .pdf-content .line {
    height: 4px;
    background: var(--ink-100);
    border-radius: 2px;
  }
  .pdf-content .line.short { width: 60%; }
  .pdf-content .line.medium { width: 80%; }
  .pdf-content .line.short-2 { width: 45%; }
  .pdf-content .section-block {
    padding: 10px 12px;
    background: var(--ink-25);
    border-left: 3px solid var(--pdf-c1, #14532D);
    border-radius: 4px;
  }
  .pdf-content .section-block .ttl {
    font: 700 9px/1 var(--pdf-font, 'Outfit', sans-serif);
    color: var(--pdf-c1, #14532D);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
  }
  .pdf-content .score-row {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 10px;
    background: #FEF1F1;
    border-radius: 4px;
    font: 500 9px/1.2 var(--pdf-font, 'Outfit', sans-serif);
    color: #7F1D1D;
  }
  .pdf-content .score-row .n {
    font: 700 16px/1 var(--pdf-font, 'Outfit', sans-serif);
    color: #B91C1C;
    letter-spacing: -0.02em;
  }

  .pdf-footer {
    padding: 10px 18px;
    border-top: 1px solid var(--ink-100);
    display: flex; align-items: center; justify-content: space-between;
    font: 500 8.5px/1.3 var(--pdf-font, 'Outfit', sans-serif);
    color: var(--ink-500);
    background: var(--pdf-footer-bg, var(--white));
    gap: 10px;
  }
  .pdf-footer.style-band {
    background: var(--pdf-c1, #14532D);
    color: rgba(255,255,255,0.8);
    border-top: 0;
  }
  .pdf-footer .pdf-f-left { flex: 1; min-width: 0; }
  .pdf-footer .pdf-f-right { font-family: var(--font-mono); white-space: nowrap; }

  /* — Save bar — */
  .iv-save-bar {
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
  .iv-save-bar .left-info {
    display: flex; align-items: center; gap: 10px;
    color: var(--ink-700);
    font: 500 13px/1.3 var(--font-sans);
  }
  .iv-save-bar .left-info .dot {
    width: 9px; height: 9px; border-radius: 50%;
    background: var(--risk-med-solid);
  }
  .iv-save-bar .actions { display: flex; gap: 8px; }

  /* — Reset note — */
  .reset-link {
    background: transparent; border: 0;
    color: var(--ink-500);
    font: 500 12px/1 var(--font-sans);
    cursor: pointer;
    padding: 0;
  }
  .reset-link:hover { color: var(--g-700); }
`;

// TweaksPanel stub — design tool removed for production

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}

const { useState, useMemo } = React;

const I11 = {
  upload: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/></svg>,
  image: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>,
  preview: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
  download: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>,
  check: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>,
};

const PALETTES = [
  { id: 'verde-gov',  name: 'Verde gov.br',     c1: '#14532D', c2: '#3DA47E' },
  { id: 'petroleo',   name: 'Verde petróleo',   c1: '#0B3B3C', c2: '#4FB5A6' },
  { id: 'azul-gov',   name: 'Azul gov.br',      c1: '#1D4ED8', c2: '#60A5FA' },
  { id: 'roxo-inst',  name: 'Roxo institucional', c1: '#6B21A8', c2: '#A855F7' },
  { id: 'vinho',      name: 'Vinho',            c1: '#7F1D1D', c2: '#DC2626' },
  { id: 'preto',      name: 'Preto sóbrio',     c1: '#1A2620', c2: '#4A5D53' },
];

const FONTS = [
  { id: 'Outfit',  label: 'Outfit',  family: "'Outfit', sans-serif" },
  { id: 'Inter',   label: 'Inter',   family: "'Inter', sans-serif" },
  { id: 'DMSans',  label: 'DM Sans', family: "'DM Sans', sans-serif" },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "petroleo",
  "customHex": "#1A2620",
  "font": "Outfit",
  "headerStyle": "minimal",
  "footerStyle": "minimal",
  "showCNPJ": true,
  "showDate": true,
  "showResp": true,
  "showPageNum": true,
  "showPoweredBy": true
}/*EDITMODE-END*/;

function IdentidadePage(serverProps) {
  const user     = serverProps?.user     || { name: 'Usuário' };
  const empresas = serverProps?.empresas || [];
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [coHeader, setCoHeader] = useState({
    name: 'Prefeitura Municipal de Jundiaí',
    subtitle: 'Secretaria Municipal de Recursos Humanos · SST',
    address: 'Av. da Liberdade, s/nº · Jardim Botânico · Jundiaí · SP',
    cnpj: '46.523.015/0001-35',
  });

  const [coFooter, setCoFooter] = useState({
    text: 'Análise Ergonômica do Trabalho elaborada por equipe técnica em conformidade com a NR-17. Documento emitido em 21/05/2026 — versão 3.',
    site: 'www.jundiai.sp.gov.br',
  });

  const [hasLogo, setHasLogo] = useState(true);

  // Active palette colors (custom override via picker)
  const activePalette = PALETTES.find(p => p.id === t.palette) || PALETTES[0];
  const primaryC = activePalette.c1;
  const accentC = activePalette.c2;
  const activeFont = FONTS.find(f => f.id === t.font) || FONTS[0];

  const pdfVars = {
    '--pdf-c1': primaryC,
    '--pdf-c2': accentC,
    '--pdf-font': activeFont.family,
  };

  return (
    <div className="eg-shell">
      <EgSidebar active="identidade"/>
      <main className="eg-main">
        <EgTopbar breadcrumb={['Início', 'Identidade visual']} user={user.name}/>

        <div className="iv-page" data-screen-label="11 Identidade Visual">
          {/* Header */}
          <header className="iv-head">
            <div>
              <h1>Identidade visual</h1>
              <p className="sub">
                Personalize logo, cores e textos institucionais que aparecerão no cabeçalho e rodapé dos relatórios PDF gerados pelo sistema.
              </p>
            </div>
            <button className="reset-link">Restaurar padrão</button>
          </header>

          <div className="iv-body">
            {/* — Form column — */}
            <div className="iv-form">
              {/* 1. Logo */}
              <section className="iv-section">
                <div className="iv-section-head">
                  <span className="num">01</span>
                  <div>
                    <h2>Logo da organização</h2>
                    <p className="sub">Exibido no canto superior esquerdo do PDF</p>
                  </div>
                </div>
                <div className="iv-section-body">
                  <div className="logo-upload-row">
                    <div className={'logo-preview' + (hasLogo ? ' has-logo' : '')}>
                      {hasLogo ? (
                        <span className="logo-circle" style={{'--logo-c1': primaryC, '--logo-c2': accentC}}>PJ</span>
                      ) : (
                        <I11.image style={{width: 28, height: 28, strokeWidth: 1.25}}/>
                      )}
                    </div>
                    <div className="logo-actions">
                      <button className="upload-btn">
                        <I11.upload/> {hasLogo ? 'Trocar logo' : 'Enviar logo'}
                      </button>
                      {hasLogo && (
                        <button className="remove-btn" onClick={() => setHasLogo(false)}>
                          Remover logo
                        </button>
                      )}
                      <span className="hint">PNG ou SVG · fundo transparente · até 2 MB</span>
                    </div>
                  </div>

                  {!hasLogo && (
                    <div className="dropzone" onClick={() => setHasLogo(true)}>
                      <span className="dz-ic"><I11.upload/></span>
                      <div><strong>Arraste sua logo</strong> ou clique para selecionar</div>
                      <div className="formats">PNG, SVG ou JPG · 1024×1024 px recomendado</div>
                    </div>
                  )}
                </div>
              </section>

              {/* 2. Cores */}
              <section className="iv-section">
                <div className="iv-section-head">
                  <span className="num">02</span>
                  <div>
                    <h2>Cor institucional</h2>
                    <p className="sub">Usada em títulos, bordas e elementos de destaque</p>
                  </div>
                </div>
                <div className="iv-section-body">
                  <label className="eg-label">Paleta sugerida</label>
                  <div className="swatches-row">
                    {PALETTES.map(p => (
                      <button
                        key={p.id}
                        className={'swatch-btn' + (t.palette === p.id ? ' on' : '')}
                        style={{background: 'linear-gradient(135deg, ' + p.c1 + ', ' + p.c2 + ')'}}
                        onClick={() => { setTweak('palette', p.id); setTweak('customHex', p.c1); }}
                        title={p.name}
                      />
                    ))}
                  </div>

                  <div style={{marginTop: 20}}>
                    <label className="eg-label">Cor personalizada</label>
                    <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                      <label className="swatch-custom" style={{position: 'relative'}}>
                        <span className="ic"/>
                        Color picker
                        <input type="color"
                          value={t.customHex}
                          onChange={(e) => { setTweak('customHex', e.target.value); }}
                        />
                      </label>
                      <span className="hex-input" style={{'--hex-c': t.customHex}}>
                        <span className="preview"/>
                        <input type="text" value={t.customHex.toUpperCase()}
                          onChange={(e) => setTweak('customHex', e.target.value)}/>
                      </span>
                    </div>
                  </div>

                  <div style={{
                    marginTop: 20, padding: 14,
                    background: 'var(--ink-25)',
                    borderRadius: 'var(--r-md)',
                    border: '1px solid var(--line-1)',
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    fontSize: 12, lineHeight: 1.45, color: 'var(--ink-600)',
                  }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 6,
                      background: 'var(--white)', color: 'var(--g-700)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, border: '1px solid var(--line-2)',
                    }}>
                      <I11.preview style={{width: 11, height: 11, strokeWidth: 1.75}}/>
                    </span>
                    <div>
                      Use cores com <strong style={{color: 'var(--ink-900)'}}>boa legibilidade em fundo claro</strong>.
                      O sistema gera automaticamente versões mais claras e escuras para detalhes visuais.
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Tipografia */}
              <section className="iv-section">
                <div className="iv-section-head">
                  <span className="num">03</span>
                  <div>
                    <h2>Tipografia</h2>
                    <p className="sub">Família tipográfica usada no PDF</p>
                  </div>
                </div>
                <div className="iv-section-body">
                  <div className="font-options">
                    {FONTS.map(f => (
                      <button key={f.id}
                        className={'font-opt' + (t.font === f.id ? ' on' : '')}
                        onClick={() => setTweak('font', f.id)}
                        style={{'--ff': f.family}}
                      >
                        <div className="sample">Aa Bb</div>
                        <div className="name">{f.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* 4. Cabeçalho */}
              <section className="iv-section">
                <div className="iv-section-head">
                  <span className="num">04</span>
                  <div>
                    <h2>Cabeçalho do relatório</h2>
                    <p className="sub">Informações institucionais que aparecem no topo</p>
                  </div>
                </div>
                <div className="iv-section-body">
                  <div className="form-grid-2">
                    <div className="span-2">
                      <label className="eg-label">Nome da organização</label>
                      <input className="eg-input" value={coHeader.name}
                        onChange={(e) => setCoHeader({...coHeader, name: e.target.value})}/>
                    </div>
                    <div className="span-2">
                      <label className="eg-label">Subtítulo / setor responsável</label>
                      <input className="eg-input" value={coHeader.subtitle}
                        onChange={(e) => setCoHeader({...coHeader, subtitle: e.target.value})}/>
                    </div>
                    <div>
                      <label className="eg-label">CNPJ</label>
                      <input className="eg-input" value={coHeader.cnpj}
                        onChange={(e) => setCoHeader({...coHeader, cnpj: e.target.value})}/>
                    </div>
                    <div>
                      <label className="eg-label">Estilo do cabeçalho</label>
                      <div style={{display: 'flex', gap: 6}}>
                        <button
                          className={'eg-btn ' + (t.headerStyle === 'minimal' ? 'eg-btn-primary' : 'eg-btn-secondary')}
                          style={{height: 42, padding: '0 14px', fontSize: 13, flex: 1}}
                          onClick={() => setTweak('headerStyle', 'minimal')}>
                          Minimalista
                        </button>
                        <button
                          className={'eg-btn ' + (t.headerStyle === 'band' ? 'eg-btn-primary' : 'eg-btn-secondary')}
                          style={{height: 42, padding: '0 14px', fontSize: 13, flex: 1}}
                          onClick={() => setTweak('headerStyle', 'band')}>
                          Faixa
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="toggle-list">
                    <div className="toggle-row">
                      <div className="label">Mostrar CNPJ<div className="sub">CNPJ no canto direito do cabeçalho</div></div>
                      <button className={'switch-flat' + (t.showCNPJ ? ' on' : '')} onClick={() => setTweak('showCNPJ', !t.showCNPJ)}/>
                    </div>
                    <div className="toggle-row">
                      <div className="label">Mostrar data de emissão<div className="sub">Data de geração do PDF</div></div>
                      <button className={'switch-flat' + (t.showDate ? ' on' : '')} onClick={() => setTweak('showDate', !t.showDate)}/>
                    </div>
                    <div className="toggle-row">
                      <div className="label">Mostrar responsável técnico<div className="sub">Nome e formação no cabeçalho</div></div>
                      <button className={'switch-flat' + (t.showResp ? ' on' : '')} onClick={() => setTweak('showResp', !t.showResp)}/>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. Rodapé */}
              <section className="iv-section">
                <div className="iv-section-head">
                  <span className="num">05</span>
                  <div>
                    <h2>Rodapé do relatório</h2>
                    <p className="sub">Informações legais e notas técnicas</p>
                  </div>
                </div>
                <div className="iv-section-body">
                  <div className="form-grid-2">
                    <div className="span-2">
                      <label className="eg-label">Texto institucional</label>
                      <textarea className="eg-input" value={coFooter.text}
                        onChange={(e) => setCoFooter({...coFooter, text: e.target.value})}/>
                    </div>
                    <div>
                      <label className="eg-label">Site institucional</label>
                      <input className="eg-input" value={coFooter.site}
                        onChange={(e) => setCoFooter({...coFooter, site: e.target.value})}/>
                    </div>
                    <div>
                      <label className="eg-label">Estilo do rodapé</label>
                      <div style={{display: 'flex', gap: 6}}>
                        <button
                          className={'eg-btn ' + (t.footerStyle === 'minimal' ? 'eg-btn-primary' : 'eg-btn-secondary')}
                          style={{height: 42, padding: '0 14px', fontSize: 13, flex: 1}}
                          onClick={() => setTweak('footerStyle', 'minimal')}>
                          Minimalista
                        </button>
                        <button
                          className={'eg-btn ' + (t.footerStyle === 'band' ? 'eg-btn-primary' : 'eg-btn-secondary')}
                          style={{height: 42, padding: '0 14px', fontSize: 13, flex: 1}}
                          onClick={() => setTweak('footerStyle', 'band')}>
                          Faixa
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="toggle-list">
                    <div className="toggle-row">
                      <div className="label">Mostrar número de página<div className="sub">"Página X de Y" no canto direito</div></div>
                      <button className={'switch-flat' + (t.showPageNum ? ' on' : '')} onClick={() => setTweak('showPageNum', !t.showPageNum)}/>
                    </div>
                    <div className="toggle-row">
                      <div className="label">"Gerado por ergo.gov"<div className="sub">Selo discreto de identificação do sistema</div></div>
                      <button className={'switch-flat' + (t.showPoweredBy ? ' on' : '')} onClick={() => setTweak('showPoweredBy', !t.showPoweredBy)}/>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* — Preview column — */}
            <aside className="preview-col">
              <div className="preview-card">
                <div className="preview-card-head">
                  <div>
                    <div className="eyebrow">Pré-visualização</div>
                    <div className="title">Relatório PDF · A4</div>
                  </div>
                  <span className="live-pill">
                    <span className="dot"/>Atualizado ao vivo
                  </span>
                </div>

                {/* PDF Page */}
                <div className="pdf-page" style={pdfVars}>
                  {/* Header */}
                  <div className={'pdf-header' + (t.headerStyle === 'band' ? ' style-band' : '')}>
                    {hasLogo && <span className="pdf-logo">PJ</span>}
                    <div className="pdf-h-meta">
                      <h1 className="pdf-h-title">{coHeader.name}</h1>
                      <div className="pdf-h-sub">{coHeader.subtitle}</div>
                    </div>
                    <div className="pdf-h-right">
                      {t.showCNPJ && <><span>CNPJ</span><strong>{coHeader.cnpj}</strong></>}
                      {t.showDate && <div style={{marginTop: t.showCNPJ ? 4 : 0}}>21 mai 2026</div>}
                      {t.showResp && <div style={{marginTop: 4}}>Resp.: Ana Silva</div>}
                    </div>
                  </div>

                  {/* Content (placeholder) */}
                  <div className="pdf-content">
                    <h3>1. Análise Ergonômica do Trabalho — Eletricista predial</h3>
                    <div className="text-lines">
                      <div className="line"/>
                      <div className="line medium"/>
                      <div className="line short"/>
                    </div>

                    <div className="section-block">
                      <div className="ttl">Identificação do posto</div>
                      <div className="text-lines">
                        <div className="line short"/>
                        <div className="line medium"/>
                      </div>
                    </div>

                    <h3 style={{marginTop: 4}}>2. Resultados das ferramentas aplicadas</h3>
                    <div className="score-row">
                      <span>RULA</span>
                      <span className="n">7</span>
                      <span>· Nível 4 · Intervenção imediata</span>
                    </div>

                    <div className="text-lines">
                      <div className="line"/>
                      <div className="line short-2"/>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className={'pdf-footer' + (t.footerStyle === 'band' ? ' style-band' : '')}>
                    <div className="pdf-f-left">
                      {coFooter.text.length > 120 ? coFooter.text.slice(0, 120) + '…' : coFooter.text}
                      {t.showPoweredBy && <div style={{marginTop: 3, opacity: 0.7}}>Gerado por ergo.gov · {coFooter.site}</div>}
                    </div>
                    {t.showPageNum && <div className="pdf-f-right">1 / 24</div>}
                  </div>
                </div>

                <div style={{
                  display: 'flex', gap: 8, marginTop: 16, justifyContent: 'center',
                }}>
                  <button className="eg-btn eg-btn-secondary" style={{height: 36, padding: '0 14px', fontSize: 12.5}}>
                    <I11.download style={{width: 14, height: 14, strokeWidth: 1.75}}/> Baixar exemplo
                  </button>
                  <button className="eg-btn eg-btn-secondary" style={{height: 36, padding: '0 14px', fontSize: 12.5}}>
                    Ver página 2 →
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Save bar */}
        <div className="iv-save-bar">
          <div className="left-info">
            <span className="dot"/>
            <span>Alterações não aplicadas · serão usadas nos próximos PDFs gerados</span>
          </div>
          <div className="actions">
            <button className="eg-btn eg-btn-ghost">Descartar</button>
            <button className="eg-btn eg-btn-primary">
              Salvar e aplicar <I11.check style={{width: 16, height: 16}}/>
            </button>
          </div>
        </div>
      </main>

      <TweaksPanel title="Tweaks · Identidade">
        <TweakSection label="Cor"/>
        <TweakColor
          label="Paleta"
          value={t.palette}
          options={PALETTES.map(p => p.id)}
          onChange={(v) => setTweak('palette', v)}
        />
        <TweakSection label="Estilos"/>
        <TweakRadio
          label="Estilo cabeçalho"
          value={t.headerStyle}
          options={['minimal', 'band']}
          onChange={(v) => setTweak('headerStyle', v)}
        />
        <TweakRadio
          label="Estilo rodapé"
          value={t.footerStyle}
          options={['minimal', 'band']}
          onChange={(v) => setTweak('footerStyle', v)}
        />
        <TweakSection label="Tipografia"/>
        <TweakRadio
          label="Fonte"
          value={t.font}
          options={FONTS.map(f => f.id)}
          onChange={(v) => setTweak('font', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('react-root')).render(<IdentidadePage />);

export default IdentidadePage;
