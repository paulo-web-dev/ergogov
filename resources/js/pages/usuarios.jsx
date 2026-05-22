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
  .users-page { max-width: 1400px; padding: 28px 32px; }

  /* — Header — */
  .users-head {
    display: flex; justify-content: space-between; align-items: flex-end;
    gap: 24px; margin-bottom: 22px;
  }
  .users-head h1 {
    font: 700 28px/1.15 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.025em;
    margin: 0 0 6px;
  }
  .users-head .sub {
    font: 500 13px/1.4 var(--font-sans);
    color: var(--ink-500);
  }
  .users-head .sub strong { color: var(--ink-900); font-weight: 600; }

  /* — Stats strip — */
  .u-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 22px;
  }
  @media (max-width: 800px) { .u-stats { grid-template-columns: repeat(2, 1fr); } }
  .u-stat {
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-md);
    padding: 14px 18px;
    display: flex; flex-direction: column;
    gap: 6px;
  }
  .u-stat .lbl {
    font: 500 11px/1 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-500);
    display: inline-flex; align-items: center; gap: 7px;
  }
  .u-stat .lbl .swatch {
    width: 8px; height: 8px; border-radius: 50%;
  }
  .u-stat .v {
    font: 700 24px/1 var(--font-sans);
    color: var(--ink-900);
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .u-stat .delta {
    font: 500 11px/1.3 var(--font-sans);
    color: var(--ink-500);
  }
  .u-stat .delta strong { color: var(--g-700); font-weight: 600; }

  /* — Toolbar — */
  .u-toolbar {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
  .u-search {
    position: relative;
    flex: 1; min-width: 280px; max-width: 440px;
  }
  .u-search input {
    width: 100%; height: 40px;
    border: 1px solid var(--line-2);
    background: var(--white);
    border-radius: var(--r-md);
    padding: 0 14px 0 40px;
    font: 400 14px/1 var(--font-sans);
    transition: all var(--dur-fast);
  }
  .u-search input:focus { outline: none; border-color: var(--g-600); box-shadow: var(--ring-focus); }
  .u-search svg.lead {
    position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
    width: 16px; height: 16px; stroke-width: 1.75; color: var(--ink-400);
  }

  .filter-row {
    display: flex; gap: 6px; align-items: center;
    flex-wrap: wrap;
    margin-bottom: 18px;
  }
  .filter-row .lbl {
    font: 600 11px/1 var(--font-sans);
    color: var(--ink-500);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-right: 6px;
  }
  .perfil-chip {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 6px 11px;
    background: var(--white);
    border: 1px solid var(--line-2);
    border-radius: var(--r-pill);
    color: var(--ink-700);
    font: 500 12px/1 var(--font-sans);
    cursor: pointer;
    transition: all var(--dur-fast);
  }
  .perfil-chip:hover { border-color: var(--line-3); }
  .perfil-chip.active {
    background: var(--g-50);
    border-color: var(--g-300);
    color: var(--g-800);
    font-weight: 600;
  }
  .perfil-chip .swatch {
    width: 8px; height: 8px; border-radius: 50%;
  }
  .perfil-chip .count {
    background: var(--ink-100); color: var(--ink-600);
    padding: 2px 6px; border-radius: 10px;
    font: 600 10.5px/1 var(--font-mono);
    margin-left: 2px;
  }
  .perfil-chip.active .count {
    background: var(--g-200); color: var(--g-900);
  }

  /* — Table — */
  .u-table-wrap {
    background: var(--white);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    overflow: hidden;
  }
  .u-table {
    width: 100%;
    border-collapse: collapse;
  }
  .u-table thead th {
    background: var(--ink-25);
    padding: 12px 18px;
    text-align: left;
    font: 600 11px/1 var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-500);
    border-bottom: 1px solid var(--line-1);
    white-space: nowrap;
  }
  .u-table thead th:first-child { padding-left: 22px; }
  .u-table thead th:last-child { padding-right: 22px; text-align: right; }
  .u-table thead th.sortable {
    cursor: pointer; user-select: none;
    transition: color var(--dur-fast);
  }
  .u-table thead th.sortable:hover { color: var(--ink-900); }
  .u-table thead th.sortable svg {
    width: 12px; height: 12px;
    margin-left: 4px;
    opacity: 0.4;
    vertical-align: -2px;
  }
  .u-table thead th.sortable.active svg { opacity: 1; color: var(--g-700); }

  .u-table tbody td {
    padding: 14px 18px;
    border-bottom: 1px solid var(--line-1);
    font: 400 14px/1.3 var(--font-sans);
    color: var(--ink-700);
    vertical-align: middle;
  }
  .u-table tbody td:first-child { padding-left: 22px; }
  .u-table tbody td:last-child { padding-right: 22px; text-align: right; }
  .u-table tbody tr:last-child td { border-bottom: 0; }
  .u-table tbody tr { transition: background var(--dur-fast); }
  .u-table tbody tr:hover { background: var(--ink-25); }
  .u-table tbody tr.inactive { opacity: 0.65; }

  /* User cell */
  .user-cell {
    display: flex; align-items: center; gap: 12px;
  }
  .u-avatar {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: inline-flex; align-items: center; justify-content: center;
    color: var(--white);
    font: 700 13px/1 var(--font-sans);
    flex-shrink: 0;
    position: relative;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
  }
  .u-avatar .badge-pres {
    position: absolute;
    bottom: -2px; right: -2px;
    width: 11px; height: 11px;
    background: var(--g-500);
    border-radius: 50%;
    border: 2px solid var(--white);
  }
  .u-avatar .badge-pres.off { background: var(--ink-400); }
  .user-cell .meta {
    min-width: 0;
  }
  .user-cell .name {
    font: 600 13.5px/1.3 var(--font-sans);
    color: var(--ink-900);
  }
  .user-cell .name .you {
    background: var(--g-50);
    color: var(--g-800);
    font: 600 10px/1 var(--font-sans);
    padding: 2px 6px;
    border-radius: 4px;
    margin-left: 6px;
    border: 1px solid var(--g-200);
  }
  .user-cell .email {
    font: 400 12px/1.3 var(--font-sans);
    color: var(--ink-500);
    margin-top: 2px;
  }

  /* Perfil badge */
  .perfil-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 9px;
    border-radius: var(--r-pill);
    font: 600 11.5px/1 var(--font-sans);
  }
  .perfil-badge .dot { width: 6px; height: 6px; border-radius: 50%; }
  .perfil-badge.admin {
    background: #F3EAFE; color: #6B21A8; border: 1px solid #D8B4FE;
  }
  .perfil-badge.admin .dot { background: #6B21A8; }
  .perfil-badge.tecnico {
    background: var(--g-50); color: var(--g-800); border: 1px solid var(--g-200);
  }
  .perfil-badge.tecnico .dot { background: var(--g-700); }
  .perfil-badge.visualizador {
    background: var(--ink-100); color: var(--ink-700); border: 1px solid var(--line-2);
  }
  .perfil-badge.visualizador .dot { background: var(--ink-500); }

  /* Last access */
  .last-access {
    font: 500 13px/1.3 var(--font-sans);
    color: var(--ink-800);
  }
  .last-access .sub {
    font: 400 11.5px/1.3 var(--font-sans);
    color: var(--ink-500);
    margin-top: 2px;
  }

  /* — Toggle status switch — */
  .status-cell {
    display: flex; align-items: center; gap: 8px;
  }
  .switch-flat {
    position: relative;
    width: 36px; height: 20px;
    border-radius: 12px;
    background: var(--ink-200);
    cursor: pointer;
    transition: background var(--dur-fast);
    border: 0;
    padding: 0;
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
  .status-cell .lbl {
    font: 600 12px/1.3 var(--font-sans);
    color: var(--ink-800);
  }
  .status-cell .lbl.off { color: var(--ink-500); }

  /* Actions */
  .row-actions {
    display: inline-flex; gap: 4px; align-items: center;
    justify-content: flex-end;
  }
  .row-actions button {
    width: 32px; height: 32px;
    background: transparent;
    border: 0;
    border-radius: 7px;
    color: var(--ink-500);
    display: inline-flex; align-items: center; justify-content: center;
    transition: all var(--dur-fast);
  }
  .row-actions button:hover { background: var(--ink-50); color: var(--ink-900); }
  .row-actions button svg { width: 16px; height: 16px; stroke-width: 1.75; }
  .row-actions button.danger:hover { background: var(--risk-high-bg); color: var(--risk-high-fg); }

  /* — Pagination — */
  .u-pagination {
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 22px;
    border-top: 1px solid var(--line-1);
    background: var(--ink-25);
    font: 500 13px/1 var(--font-sans);
    color: var(--ink-500);
  }
  .u-pagination strong { color: var(--ink-900); font-weight: 700; }
  .u-pagination .pages {
    display: inline-flex; gap: 4px;
  }
  .u-pagination .pages button {
    min-width: 34px; height: 34px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--r-sm);
    color: var(--ink-700);
    font: 500 13px/1 var(--font-sans);
    cursor: pointer; transition: all var(--dur-fast);
  }
  .u-pagination .pages button:hover { background: var(--white); border-color: var(--line-2); }
  .u-pagination .pages button.on {
    background: var(--g-800);
    color: var(--white);
    border-color: var(--g-800);
  }
  .u-pagination .pages button.icon svg { width: 14px; height: 14px; stroke-width: 1.75; }

  /* — Modal — */
  .modal-backdrop {
    position: fixed; inset: 0;
    background: rgba(15, 26, 20, 0.55);
    backdrop-filter: blur(6px);
    z-index: 100;
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: fadeIn var(--dur) var(--ease-out);
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal {
    background: var(--white);
    border-radius: var(--r-xl);
    width: 100%; max-width: 460px;
    max-height: calc(100vh - 48px);
    overflow: hidden;
    display: flex; flex-direction: column;
    box-shadow: var(--shadow-xl);
    animation: slideUp var(--dur-slow) var(--ease-out);
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .modal-head {
    padding: 22px 24px 18px;
    border-bottom: 1px solid var(--line-1);
    position: relative;
  }
  .modal-head h2 {
    font: 600 18px/1.2 var(--font-sans);
    color: var(--ink-900);
    margin: 0 0 4px;
    letter-spacing: -0.015em;
  }
  .modal-head .sub {
    font: 400 13px/1.4 var(--font-sans);
    color: var(--ink-500);
  }
  .modal-head .close {
    position: absolute;
    top: 16px; right: 16px;
    width: 30px; height: 30px;
    background: transparent;
    border: 0;
    border-radius: 7px;
    color: var(--ink-500);
    display: inline-flex; align-items: center; justify-content: center;
  }
  .modal-head .close:hover { background: var(--ink-100); color: var(--ink-900); }
  .modal-head .close svg { width: 16px; height: 16px; stroke-width: 2; }

  .modal-body {
    padding: 22px 24px;
    overflow-y: auto;
  }
  .modal-body .field {
    margin-bottom: 16px;
  }
  .modal-body .field:last-child { margin-bottom: 0; }

  /* Perfil select cards */
  .perfil-options {
    display: flex; flex-direction: column;
    gap: 8px;
  }
  .perfil-opt {
    display: grid;
    grid-template-columns: 22px 1fr auto;
    gap: 12px; align-items: center;
    padding: 12px 14px;
    border: 1.5px solid var(--line-2);
    border-radius: var(--r-md);
    background: var(--white);
    cursor: pointer;
    transition: all var(--dur-fast);
    text-align: left;
  }
  .perfil-opt:hover { border-color: var(--line-3); background: var(--ink-25); }
  .perfil-opt .radio {
    width: 18px; height: 18px;
    border-radius: 50%;
    border: 1.5px solid var(--line-3);
    background: var(--white);
    display: flex; align-items: center; justify-content: center;
    transition: all var(--dur-fast);
  }
  .perfil-opt .radio::after {
    content: '';
    width: 8px; height: 8px;
    background: var(--white);
    border-radius: 50%;
    opacity: 0;
    transition: opacity var(--dur-fast);
  }
  .perfil-opt .meta .name {
    font: 600 13px/1.2 var(--font-sans);
    color: var(--ink-900);
  }
  .perfil-opt .meta .desc {
    font: 400 11.5px/1.3 var(--font-sans);
    color: var(--ink-500);
    margin-top: 2px;
  }
  .perfil-opt.on {
    border-color: var(--g-600);
    background: var(--g-25);
  }
  .perfil-opt.on .radio {
    background: var(--g-700);
    border-color: var(--g-700);
  }
  .perfil-opt.on .radio::after { opacity: 1; }
  .perfil-opt.on .meta .name { color: var(--g-900); }

  .modal-foot {
    padding: 16px 24px;
    border-top: 1px solid var(--line-1);
    background: var(--ink-25);
    display: flex; justify-content: flex-end; gap: 8px;
  }
`;

// TweaksPanel stub — design tool removed for production

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}

const { useState, useMemo, useEffect } = React;

const I10 = {
  invite: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>,
  filter: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M7 12h10M10 18h4"/></svg>,
  sort: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h18M6 12h12M9 16h6"/></svg>,
  edit: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"/></svg>,
  key: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="15" r="4"/><path d="m10.85 12.15 8.15-8.15h3v3l-2 2v3h-3v3l-2 2"/></svg>,
  trash: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg>,
  more: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg>,
  chevDown: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  chevLeft: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
  chevRight: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6"/></svg>,
  close: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  send: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m21 3-9 18-2.5-7.5L2 11l19-8Z"/></svg>,
  shield: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6Z"/></svg>,
  user: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>,
  eye: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
};

// — Mock users —
const PERFIS = {
  admin:        { name: 'Administrador', short: 'Admin',        cls: 'admin',        desc: 'Acesso total a empresas, usuários e configurações' },
  tecnico:      { name: 'Técnico',       short: 'Técnico',      cls: 'tecnico',      desc: 'Cria AETs, aplica ferramentas e gera laudos' },
  visualizador: { name: 'Visualizador',  short: 'Visualizador', cls: 'visualizador', desc: 'Apenas leitura de dashboards e relatórios' },
};

// USERS from server props
const AVATAR_PALETTE = [
  'linear-gradient(135deg, #2D8659, #1F6B43)',
  'linear-gradient(135deg, #1F6B70, #4FB5A6)',
  'linear-gradient(135deg, #6B7B72, #4A5D53)',
  'linear-gradient(135deg, #B45309, #F59E0B)',
  'linear-gradient(135deg, #6B21A8, #A855F7)',
  'linear-gradient(135deg, #1D4ED8, #3B82F6)',
  'linear-gradient(135deg, #DC2626, #EF4444)',
];
function avatarFor(name) {
  let h = 0;
  for (let i=0; i<name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_PALETTE[h % AVATAR_PALETTE.length];
}
function initials(name) {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
  return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "modal": "none",
  "showStats": true,
  "showPerfilChips": true
}/*EDITMODE-END*/;

function UsuariosPage(serverProps) {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const user = serverProps?.user || { name: 'Usuário' };
  const [users, setUsers] = React.useState(serverProps?.users || []);
  const [query, setQuery] = useState('');
  const [filterPerfil, setFilterPerfil] = useState('todos');

  // invite modal state
  const [inviteForm, setInviteForm] = useState({ nome: '', email: '', perfil: 'tecnico' });
  const [editForm, setEditForm] = useState({ nome: 'Carlos Mendes', email: 'carlos.mendes@jundiai.sp.gov.br', perfil: 'tecnico' });

  const counts = useMemo(() => ({
    todos: users.length,
    admin: users.filter(u => u.perfil === 'admin').length,
    tecnico: users.filter(u => u.perfil === 'tecnico').length,
    visualizador: users.filter(u => u.perfil === 'visualizador').length,
    active: users.filter(u => u.active).length,
    inactive: users.filter(u => !u.active).length,
  }), [users]);

  const filtered = users.filter(u => {
    if (filterPerfil !== 'todos' && u.perfil !== filterPerfil) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const toggleActive = (email) => {
    setUsers(prev => prev.map(u => u.email === email ? { ...u, active: !u.active } : u));
  };

  const openInvite = () => setTweak('modal', 'invite');
  const openEdit = () => setTweak('modal', 'edit');
  const closeModal = () => setTweak('modal', 'none');

  return (
    <div className="eg-shell">
      <EgSidebar active="usuarios"/>
      <main className="eg-main">
        <EgTopbar breadcrumb={['Início', 'Usuários']} user={user.name}/>

        <div className="users-page" data-screen-label="10 Usuários">
          {/* Header */}
          <header className="users-head">
            <div>
              <h1>Usuários</h1>
              <p className="sub">
                <strong>{counts.todos}</strong> usuários cadastrados ·{' '}
                <strong>{counts.active}</strong> ativos ·{' '}
                <strong>{counts.inactive}</strong> inativos
              </p>
            </div>
            <button className="eg-btn eg-btn-primary" onClick={openInvite}>
              <I10.invite/> Convidar usuário
            </button>
          </header>

          {/* Stats */}
          {t.showStats && (
            <div className="u-stats">
              <div className="u-stat">
                <span className="lbl">Total de usuários</span>
                <span className="v">{counts.todos}</span>
                <span className="delta"><strong>+2</strong> nos últimos 30 dias</span>
              </div>
              <div className="u-stat">
                <span className="lbl"><span className="swatch" style={{background:'#6B21A8'}}/>Administradores</span>
                <span className="v">{counts.admin}</span>
                <span className="delta">Acesso total ao sistema</span>
              </div>
              <div className="u-stat">
                <span className="lbl"><span className="swatch" style={{background:'#2D8659'}}/>Técnicos</span>
                <span className="v">{counts.tecnico}</span>
                <span className="delta">Aplicam AETs e checklists</span>
              </div>
              <div className="u-stat">
                <span className="lbl"><span className="swatch" style={{background:'#94A199'}}/>Visualizadores</span>
                <span className="v">{counts.visualizador}</span>
                <span className="delta">Apenas leitura de relatórios</span>
              </div>
            </div>
          )}

          {/* Toolbar */}
          <div className="u-toolbar">
            <div className="u-search">
              <EgIcon.search className="lead"/>
              <input
                type="search"
                placeholder="Buscar por nome ou e-mail…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button className="eg-btn eg-btn-secondary" style={{height: 40, padding: '0 14px', fontSize: 13}}>
              <I10.filter style={{width: 15, height: 15, strokeWidth: 1.75}}/> Mais filtros
            </button>
            <button className="eg-btn eg-btn-secondary" style={{height: 40, padding: '0 14px', fontSize: 13}}>
              <I10.sort style={{width: 15, height: 15, strokeWidth: 1.75}}/> Ordenar
            </button>
          </div>

          {/* Perfil filter row */}
          {t.showPerfilChips && (
            <div className="filter-row">
              <span className="lbl">Perfil:</span>
              <button className={'perfil-chip' + (filterPerfil === 'todos' ? ' active' : '')}
                      onClick={() => setFilterPerfil('todos')}>
                Todos<span className="count">{counts.todos}</span>
              </button>
              <button className={'perfil-chip' + (filterPerfil === 'admin' ? ' active' : '')}
                      onClick={() => setFilterPerfil('admin')}>
                <span className="swatch" style={{background:'#6B21A8'}}/>Administradores<span className="count">{counts.admin}</span>
              </button>
              <button className={'perfil-chip' + (filterPerfil === 'tecnico' ? ' active' : '')}
                      onClick={() => setFilterPerfil('tecnico')}>
                <span className="swatch" style={{background:'#2D8659'}}/>Técnicos<span className="count">{counts.tecnico}</span>
              </button>
              <button className={'perfil-chip' + (filterPerfil === 'visualizador' ? ' active' : '')}
                      onClick={() => setFilterPerfil('visualizador')}>
                <span className="swatch" style={{background:'#94A199'}}/>Visualizadores<span className="count">{counts.visualizador}</span>
              </button>
            </div>
          )}

          {/* Table */}
          <div className="u-table-wrap">
            <table className="u-table">
              <thead>
                <tr>
                  <th className="sortable active">Usuário <I10.chevDown/></th>
                  <th>Perfil</th>
                  <th className="sortable">Último acesso <I10.chevDown/></th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => {
                  const p = PERFIS[u.perfil];
                  return (
                    <tr key={u.email} className={u.active ? '' : 'inactive'}>
                      <td>
                        <div className="user-cell">
                          <span className="u-avatar" style={{background: avatarFor(u.name)}}>
                            {initials(u.name)}
                            {u.active && <span className={'badge-pres' + (u.online ? '' : ' off')}/>}
                          </span>
                          <div className="meta">
                            <div className="name">
                              {u.name}
                              {u.you && <span className="you">você</span>}
                            </div>
                            <div className="email">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={'perfil-badge ' + p.cls}>
                          <span className="dot"/>{p.short}
                        </span>
                      </td>
                      <td>
                        <div className="last-access">
                          {u.last}
                          <div className="sub">{u.lastSub}</div>
                        </div>
                      </td>
                      <td>
                        <div className="status-cell">
                          <button className={'switch-flat' + (u.active ? ' on' : '')}
                                  onClick={() => toggleActive(u.email)}
                                  aria-label={u.active ? 'Desativar' : 'Ativar'}/>
                          <span className={'lbl' + (u.active ? '' : ' off')}>
                            {u.active ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="row-actions">
                          <button aria-label="Editar" onClick={() => { setEditForm({nome: u.name, email: u.email, perfil: u.perfil}); openEdit(); }}>
                            <I10.edit/>
                          </button>
                          <button aria-label="Mais"><I10.more/></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr><td colSpan="5">
                    <div style={{padding: '40px 24px', textAlign: 'center', color: 'var(--ink-500)'}}>
                      Nenhum usuário corresponde aos filtros atuais.
                    </div>
                  </td></tr>
                )}
              </tbody>
            </table>
            <div className="u-pagination">
              <span>Mostrando <strong>1–{filtered.length}</strong> de <strong>{filtered.length}</strong></span>
              <div className="pages">
                <button className="icon"><I10.chevLeft/></button>
                <button className="on">1</button>
                <button>2</button>
                <button className="icon"><I10.chevRight/></button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* — Invite modal — */}
      {t.modal === 'invite' && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>Convidar novo usuário</h2>
              <p className="sub">Envie um convite por e-mail. Ele(a) define a própria senha ao aceitar.</p>
              <button className="close" onClick={closeModal} aria-label="Fechar"><I10.close/></button>
            </div>
            <div className="modal-body">
              <div className="field">
                <label className="eg-label">Nome (opcional)</label>
                <input className="eg-input" placeholder="Como o(a) usuário(a) será chamado(a)"
                       value={inviteForm.nome}
                       onChange={(e) => setInviteForm({...inviteForm, nome: e.target.value})}/>
              </div>
              <div className="field">
                <label className="eg-label">E-mail corporativo</label>
                <input className="eg-input" type="email" placeholder="usuario@orgao.gov.br"
                       value={inviteForm.email}
                       onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}/>
              </div>
              <div className="field">
                <label className="eg-label">Perfil de acesso</label>
                <div className="perfil-options">
                  {Object.entries(PERFIS).map(([key, p]) => (
                    <button key={key}
                      className={'perfil-opt' + (inviteForm.perfil === key ? ' on' : '')}
                      onClick={() => setInviteForm({...inviteForm, perfil: key})}>
                      <span className="radio"/>
                      <div className="meta">
                        <div className="name">{p.name}</div>
                        <div className="desc">{p.desc}</div>
                      </div>
                      <span className={'perfil-badge ' + p.cls}><span className="dot"/>{p.short}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-foot">
              <button className="eg-btn eg-btn-secondary" onClick={closeModal}>Cancelar</button>
              <button className="eg-btn eg-btn-primary" onClick={closeModal}>
                <I10.send style={{width: 15, height: 15, strokeWidth: 2}}/> Enviar convite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* — Edit modal — */}
      {t.modal === 'edit' && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>Editar usuário</h2>
              <p className="sub">Atualize dados e perfil de acesso.</p>
              <button className="close" onClick={closeModal} aria-label="Fechar"><I10.close/></button>
            </div>
            <div className="modal-body">
              <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22, padding: 12, background: 'var(--ink-25)', borderRadius: 'var(--r-md)', border: '1px solid var(--line-1)'}}>
                <span className="u-avatar" style={{background: avatarFor(editForm.nome), width: 44, height: 44, fontSize: 15}}>
                  {initials(editForm.nome)}
                </span>
                <div>
                  <div style={{font:'600 14px/1.3 var(--font-sans)', color:'var(--ink-900)'}}>{editForm.nome}</div>
                  <div style={{font:'400 12px/1.3 var(--font-sans)', color:'var(--ink-500)', marginTop:2}}>Cadastrado em 14/03/2025</div>
                </div>
                <button style={{marginLeft: 'auto', background:'transparent', border: '1px solid var(--line-2)', borderRadius: 6, padding: '6px 10px', font: '500 12px/1 var(--font-sans)', color: 'var(--ink-700)', cursor: 'pointer'}}>
                  Reenviar convite
                </button>
              </div>
              <div className="field">
                <label className="eg-label">Nome</label>
                <input className="eg-input" value={editForm.nome}
                       onChange={(e) => setEditForm({...editForm, nome: e.target.value})}/>
              </div>
              <div className="field">
                <label className="eg-label">E-mail</label>
                <input className="eg-input" type="email" value={editForm.email}
                       onChange={(e) => setEditForm({...editForm, email: e.target.value})}/>
              </div>
              <div className="field">
                <label className="eg-label">Perfil</label>
                <div className="perfil-options">
                  {Object.entries(PERFIS).map(([key, p]) => (
                    <button key={key}
                      className={'perfil-opt' + (editForm.perfil === key ? ' on' : '')}
                      onClick={() => setEditForm({...editForm, perfil: key})}>
                      <span className="radio"/>
                      <div className="meta">
                        <div className="name">{p.name}</div>
                        <div className="desc">{p.desc}</div>
                      </div>
                      <span className={'perfil-badge ' + p.cls}><span className="dot"/>{p.short}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-foot">
              <button className="eg-btn eg-btn-ghost" style={{color: 'var(--risk-high-fg)'}}>
                <I10.trash style={{width: 14, height: 14, strokeWidth: 1.75}}/> Remover usuário
              </button>
              <div style={{marginLeft: 'auto', display: 'flex', gap: 8}}>
                <button className="eg-btn eg-btn-secondary" onClick={closeModal}>Cancelar</button>
                <button className="eg-btn eg-btn-primary" onClick={closeModal}>Salvar alterações</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <TweaksPanel title="Tweaks · Usuários">
        <TweakSection label="Modal aberto"/>
        <TweakRadio
          label="Modal"
          value={t.modal}
          options={['none', 'invite', 'edit']}
          onChange={(v) => setTweak('modal', v)}
        />
        <TweakSection label="Componentes"/>
        <TweakToggle label="Stats no topo"    value={t.showStats}       onChange={(v) => setTweak('showStats', v)}/>
        <TweakToggle label="Chips de perfil"  value={t.showPerfilChips} onChange={(v) => setTweak('showPerfilChips', v)}/>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('react-root')).render(<UsuariosPage />);

export default UsuariosPage;
