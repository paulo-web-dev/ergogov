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
  /* — Home page specifics — */
  .home-hero {
    display: flex; align-items: flex-end; justify-content: space-between;
    padding: 36px 0 28px;
    gap: 32px;
    border-bottom: 1px solid var(--line-1);
    margin-bottom: 32px;
  }
  .home-hero .greeting-eyebrow {
    font: var(--t-eyebrow);
    color: var(--g-700);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    margin-bottom: 12px;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .home-hero .greeting-eyebrow .dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--g-500);
    box-shadow: 0 0 0 3px var(--g-100);
  }
  .home-hero h1 {
    font: 700 36px/1.1 var(--font-sans);
    letter-spacing: -0.025em;
    color: var(--ink-900);
    margin: 0;
  }
  .home-hero h1 .accent { color: var(--g-700); }
  .home-hero .sub {
    margin-top: 10px;
    font: var(--t-body-lg);
    color: var(--ink-500);
    max-width: 560px;
  }
  .home-hero .meta {
    display: flex; flex-direction: column; align-items: flex-end;
    gap: 12px;
    color: var(--ink-500);
    font: 500 13px/1.4 var(--font-sans);
  }
  .home-hero .meta .today {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 12px;
    border-radius: var(--r-pill);
    border: 1px solid var(--line-2);
    background: var(--white);
    color: var(--ink-700);
  }
  .home-hero .meta .today svg { width: 14px; height: 14px; }

  /* — Module cards — */
  .module-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 40px;
  }
  .module-card {
    position: relative;
    background: var(--surface);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    padding: 28px;
    display: flex; flex-direction: column;
    min-height: 280px;
    transition: all var(--dur) var(--ease-out);
    overflow: hidden;
    isolation: isolate;
  }
  .module-card::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(90% 50% at 90% 10%, var(--card-glow, rgba(95,184,148,0.10)) 0%, transparent 60%);
    pointer-events: none;
    z-index: -1;
  }
  .module-card:hover {
    border-color: var(--g-300);
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
  }
  .module-card .icon-wrap {
    width: 56px; height: 56px;
    border-radius: 14px;
    background: linear-gradient(140deg, var(--card-icon-from), var(--card-icon-to));
    color: var(--white);
    display: inline-flex; align-items: center; justify-content: center;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), var(--shadow-sm);
    margin-bottom: 22px;
  }
  .module-card .icon-wrap svg { width: 30px; height: 30px; }
  .module-card .tag {
    position: absolute; top: 24px; right: 24px;
  }
  .module-card h3 {
    font: 700 22px/1.15 var(--font-sans);
    letter-spacing: -0.02em;
    margin: 0 0 8px;
    color: var(--ink-900);
  }
  .module-card .acronym {
    font: var(--t-eyebrow);
    color: var(--g-700);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    margin-bottom: 12px;
    display: block;
  }
  .module-card p {
    font: var(--t-body);
    color: var(--ink-500);
    margin: 0 0 24px;
    flex: 1;
  }
  .module-card .footer {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 16px;
    border-top: 1px solid var(--line-1);
  }
  .module-card .footer .stats {
    display: flex; gap: 16px;
    color: var(--ink-600);
    font: 500 12px/1.3 var(--font-sans);
  }
  .module-card .footer .stats strong {
    color: var(--ink-900);
    font: 600 14px/1 var(--font-sans);
    display: block;
  }
  .module-card .footer .cta {
    display: inline-flex; align-items: center; gap: 6px;
    font: 600 13px/1 var(--font-sans);
    color: var(--g-700);
  }
  .module-card .footer .cta svg {
    width: 16px; height: 16px;
    transition: transform var(--dur) var(--ease-out);
  }
  .module-card:hover .footer .cta svg { transform: translateX(3px); }

  /* — Secondary row — */
  .home-secondary {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 20px;
  }
  .panel {
    background: var(--surface);
    border: 1px solid var(--line-1);
    border-radius: var(--r-xl);
    padding: 24px;
  }
  .panel-head {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 18px;
  }
  .panel-head h2 {
    font: var(--t-h3);
    margin: 0;
    color: var(--ink-900);
  }
  .panel-head a {
    font: 500 13px/1 var(--font-sans);
    color: var(--g-700);
    display: inline-flex; align-items: center; gap: 4px;
  }
  .panel-head a:hover { color: var(--g-800); }

  /* Recent items list */
  .recent {
    display: flex; flex-direction: column;
    gap: 4px;
  }
  .recent-item {
    display: grid;
    grid-template-columns: 36px 1fr auto auto;
    gap: 14px;
    align-items: center;
    padding: 12px;
    margin: 0 -12px;
    border-radius: var(--r-md);
    cursor: pointer;
    transition: background var(--dur-fast) var(--ease-out);
  }
  .recent-item:hover { background: var(--ink-50); }
  .recent-item .avatar {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: inline-flex; align-items: center; justify-content: center;
    font: 600 12px/1 var(--font-sans);
    color: var(--white);
    letter-spacing: 0.02em;
  }
  .recent-item .meta-text { min-width: 0; }
  .recent-item .meta-text .name {
    font: 600 14px/1.3 var(--font-sans);
    color: var(--ink-900);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .recent-item .meta-text .sub {
    font: 400 12px/1.3 var(--font-sans);
    color: var(--ink-500);
    margin-top: 2px;
  }
  .recent-item .progress {
    display: flex; flex-direction: column; align-items: flex-end; gap: 4px;
    min-width: 120px;
  }
  .recent-item .progress .label {
    font: 500 11px/1 var(--font-sans);
    color: var(--ink-500);
  }
  .recent-item .progress .bar {
    width: 100px; height: 5px;
    background: var(--ink-100);
    border-radius: 3px;
    overflow: hidden;
  }
  .recent-item .progress .bar > span {
    display: block; height: 100%;
    background: var(--g-500);
    border-radius: 3px;
  }

  /* — Tasks panel — */
  .task-list {
    display: flex; flex-direction: column; gap: 12px;
  }
  .task {
    display: grid;
    grid-template-columns: 32px 1fr auto;
    gap: 12px; align-items: flex-start;
    padding: 14px;
    background: var(--ink-25);
    border: 1px solid var(--line-1);
    border-radius: var(--r-md);
    cursor: pointer;
    transition: all var(--dur-fast) var(--ease-out);
  }
  .task:hover { background: var(--white); border-color: var(--line-3); box-shadow: var(--shadow-xs); }
  .task .ic {
    width: 32px; height: 32px;
    border-radius: 8px;
    display: inline-flex; align-items: center; justify-content: center;
  }
  .task .ic svg { width: 16px; height: 16px; }
  .task.high .ic { background: var(--risk-high-bg); color: var(--risk-high-fg); }
  .task.med .ic { background: var(--risk-med-bg); color: var(--risk-med-fg); }
  .task.low .ic { background: var(--g-100); color: var(--g-800); }
  .task .text .ttl {
    font: 600 14px/1.3 var(--font-sans);
    color: var(--ink-900);
  }
  .task .text .sub {
    font: 400 12px/1.4 var(--font-sans);
    color: var(--ink-500);
    margin-top: 3px;
  }
  .task .when {
    font: 500 11px/1.3 var(--font-sans);
    color: var(--ink-500);
    white-space: nowrap;
  }

  /* — Page footer — */
  .home-footer {
    margin-top: 48px; padding-top: 24px;
    border-top: 1px solid var(--line-1);
    display: flex; justify-content: space-between; align-items: center;
    color: var(--ink-400);
    font: 500 12px/1.3 var(--font-sans);
  }
  .home-footer .legal { display: flex; gap: 20px; }
  .home-footer a:hover { color: var(--ink-700); }

  /* — Layout variant: compact — */
  .home-shell.compact .home-hero { padding: 24px 0 20px; margin-bottom: 24px; }
  .home-shell.compact .home-hero h1 { font-size: 28px; }
  .home-shell.compact .module-card { min-height: 220px; padding: 22px; }
  .home-shell.compact .module-card .icon-wrap { width: 44px; height: 44px; margin-bottom: 16px; }
  .home-shell.compact .module-card .icon-wrap svg { width: 24px; height: 24px; }
  .home-shell.compact .module-card h3 { font-size: 18px; }

  /* — Module style: minimal — */
  .home-shell.minimal .module-card { padding: 24px; }
  .home-shell.minimal .module-card .icon-wrap {
    background: var(--card-icon-soft) !important;
    color: var(--card-icon-text) !important;
    box-shadow: none;
    border: 1px solid var(--card-icon-border);
  }
`;

// TweaksPanel stub — design tool removed for production

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}

const { useState } = React;

// — Date helpers (PT-BR) —
const DIAS = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
const MESES = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
function formatDate(d) {
  return `${DIAS[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}

// — Mock data —
const MODULES = [
  {
    id: 'aet',
    acronym: 'AET',
    title: 'Análise Ergonômica do Trabalho',
    desc: 'Mapeie áreas, setores e postos. Aplique RULA, OWAS, NIOSH, KIM e gere laudos técnicos.',
    icon: 'modAET',
    iconFrom: 'var(--g-700)', iconTo: 'var(--g-500)',
    glow: 'rgba(95,184,148,0.14)',
    softBg: 'var(--g-100)', softText: 'var(--g-800)', softBorder: 'var(--g-200)',
    stats: [
      { l: 'Em andamento', n: '12' },
      { l: 'Postos avaliados', n: '348' },
    ],
    tag: { label: 'Mais usado', kind: 'neutral' },
  },
  {
    id: 'arp',
    acronym: 'ARP',
    title: 'Avaliação de Riscos Psicossociais',
    desc: 'Envie questionários anônimos para colaboradores e visualize indicadores por categoria.',
    icon: 'modARP',
    iconFrom: '#1F6B70', iconTo: '#4FB5A6',
    glow: 'rgba(79,181,166,0.14)',
    softBg: '#DCEFEA', softText: '#0B3B3C', softBorder: '#A8D8C2',
    stats: [
      { l: 'Pesquisas ativas', n: '4' },
      { l: 'Respostas recebidas', n: '1.247' },
    ],
    tag: null,
  },
  {
    id: 'rel',
    acronym: 'Relatórios',
    title: 'Documentos & Laudos PDF',
    desc: 'Gere relatórios em PDF com cabeçalho institucional. Histórico completo de versões.',
    icon: 'modRel',
    iconFrom: '#3D5A4A', iconTo: '#6B8B7A',
    glow: 'rgba(107,139,122,0.10)',
    softBg: '#E8EFEB', softText: '#2A3D33', softBorder: '#C5CFC9',
    stats: [
      { l: 'Gerados em 2026', n: '67' },
      { l: 'Última geração', n: 'há 2h' },
    ],
    tag: null,
  },
];

// COMPANIES replaced by server props
const COMPANIES_MOCK = [];

function colorFromName(name) {
  const palette = ['#2D8659','#1F6B70','#3D5A4A','#1F6B43','#B45309','#0F3D2A','#4FB5A6'];
  let h = 0;
  for (let i=0; i<name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return palette[h % palette.length];
}
function initials(name) {
  return name.replace(/[·\-\.]/g,' ').split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

const TASKS = [
  { kind: 'high', icon: 'alertOctagon', title: '3 postos críticos sem revisão',
    sub: 'Metalúrgica SP · setor Soldagem · RULA score 7', when: 'hoje' },
  { kind: 'med', icon: 'clipboard', title: 'Pesquisa ARP aguardando envio',
    sub: 'Prefeitura de Jundiaí · 142 colaboradores', when: 'amanhã' },
  { kind: 'low', icon: 'pdf', title: 'Laudo AET pronto para revisão',
    sub: 'Clínica Saúde Total · v.3 — aprovação técnica', when: '3 dias' },
];

// — Tweakable defaults —
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "default",
  "moduleStyle": "vivid",
  "showSecondary": true,
  "showQuickStats": true,
  "userName": "Ana Silva"
}/*EDITMODE-END*/;

function HomePage(serverProps) {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const today = new Date();

  // Real data from Laravel via data-props
  const user   = serverProps?.user   || { name: 'Usuário' };
  const stats  = serverProps?.stats  || { totalEmpresas: 0, totalPostos: 0, riscoAlto: 0 };
  const recentEmpresas = serverProps?.recentEmpresas || [];

  // Real companies list
  const COMPANIES = recentEmpresas.map(e => ({
    id: e.id, name: e.name, sector: e.sector || '—',
    progress: e.progress || 0, color: colorFromName(e.name),
    status: e.status || '—',
  }));

  // Patch module stats with real data
  MODULES[0].stats = [
    { l: 'Em andamento', n: String(stats.totalEmpresas) },
    { l: 'Postos avaliados', n: String(stats.totalPostos) },
  ];

  const firstName = user.name.split(' ')[0];

  return (
    <div className="eg-shell">
      <EgSidebar active="home" />

      <main className="eg-main">
        <EgTopbar
          breadcrumb={['Início']}
          user={user.name}
        />

        <div className={'eg-page home-shell ' + (t.layout === 'compact' ? 'compact ' : '') + (t.moduleStyle === 'minimal' ? 'minimal' : '')}>
          {/* — Hero / greeting — */}
          <section className="home-hero" data-screen-label="02 Home — Hero">
            <div>
              <span className="greeting-eyebrow">
                <span className="dot"/>
                Painel principal
              </span>
              <h1>
                Olá, <span className="accent">{firstName}.</span><br/>
                O que vamos avaliar hoje?
              </h1>
              <p className="sub">
                Acesse rapidamente os módulos da plataforma ou continue de onde parou.
                Você tem <strong>3 ações pendentes</strong> aguardando revisão.
              </p>
            </div>
            <div className="meta">
              <span className="today">
                <EgIcon.calendar />
                {formatDate(today)}
              </span>
              {t.showQuickStats && (
                <div style={{display:'flex', gap: 18, marginTop: 4}}>
                  <div style={{textAlign:'right'}}>
                    <div style={{font:'700 20px/1 var(--font-sans)', color:'var(--ink-900)', letterSpacing:'-0.02em'}}>{stats.totalEmpresas}</div>
                    <div style={{font:'500 11px/1.3 var(--font-sans)', color:'var(--ink-500)', marginTop: 4, textTransform:'uppercase', letterSpacing:'0.06em'}}>Organizações</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{font:'700 20px/1 var(--font-sans)', color:'var(--ink-900)', letterSpacing:'-0.02em'}}>{stats.totalPostos}</div>
                    <div style={{font:'500 11px/1.3 var(--font-sans)', color:'var(--ink-500)', marginTop: 4, textTransform:'uppercase', letterSpacing:'0.06em'}}>Postos avaliados</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{font:'700 20px/1 var(--font-sans)', color:'var(--risk-high-fg)', letterSpacing:'-0.02em'}}>{stats.riscoAlto}</div>
                    <div style={{font:'500 11px/1.3 var(--font-sans)', color:'var(--ink-500)', marginTop: 4, textTransform:'uppercase', letterSpacing:'0.06em'}}>Críticos</div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* — Module access cards — */}
          <section className="module-grid" data-screen-label="02 Home — Modules">
            {MODULES.map((m) => {
              const Icon = EgIcon[m.icon];
              return (
                <article key={m.id} className="module-card" style={{
                  '--card-icon-from': m.iconFrom,
                  '--card-icon-to': m.iconTo,
                  '--card-glow': m.glow,
                  '--card-icon-soft': m.softBg,
                  '--card-icon-text': m.softText,
                  '--card-icon-border': m.softBorder,
                }}>
                  {m.tag && (
                    <span className={'eg-badge tag eg-badge-' + (m.tag.kind || 'neutral')}>
                      <span className="dot"/>{m.tag.label}
                    </span>
                  )}
                  <span className="icon-wrap"><Icon /></span>
                  <span className="acronym">{m.acronym}</span>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                  <div className="footer">
                    <div className="stats">
                      {m.stats.map((s, i) => (
                        <div key={i}>
                          <strong>{s.n}</strong>
                          {s.l}
                        </div>
                      ))}
                    </div>
                    <span className="cta">Acessar <EgIcon.arrowRight /></span>
                  </div>
                </article>
              );
            })}
          </section>

          {/* — Secondary row — */}
          {t.showSecondary && (
            <section className="home-secondary">
              {/* Recent companies */}
              <div className="panel" data-screen-label="02 Home — Recent">
                <div className="panel-head">
                  <h2>Continue de onde parou</h2>
                  <a href="/empresas">Ver todas as empresas <EgIcon.arrowRight style={{width: 14, height: 14}}/></a>
                </div>
                <div className="recent">
                  {COMPANIES.map((c) => (
                    <div key={c.name} className="recent-item">
                      <span className="avatar" style={{background: colorFromName(c.name)}}>
                        {initials(c.name)}
                      </span>
                      <div className="meta-text">
                        <div className="name">{c.name}</div>
                        <div className="sub">{c.sector} · {c.status}</div>
                      </div>
                      <div className="progress">
                        <span className="label">{c.progress}% concluída</span>
                        <span className="bar">
                          <span style={{width: c.progress + '%', background: c.color}}/>
                        </span>
                      </div>
                      <EgIcon.arrowRight style={{width: 16, height: 16, color: 'var(--ink-400)'}}/>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending tasks */}
              <div className="panel" data-screen-label="02 Home — Tasks">
                <div className="panel-head">
                  <h2>Pendências</h2>
                  <span className="eg-badge eg-badge-risk-high"><span className="dot"/>3</span>
                </div>
                <div className="task-list">
                  {TASKS.map((task, i) => {
                    const Icon = EgIcon[task.icon];
                    return (
                      <div key={i} className={'task ' + task.kind}>
                        <span className="ic"><Icon /></span>
                        <div className="text">
                          <div className="ttl">{task.title}</div>
                          <div className="sub">{task.sub}</div>
                        </div>
                        <span className="when">{task.when}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* — Page footer — */}
          <footer className="home-footer">
            <span>ergo.gov © 2026 · v 2.0.4 — em conformidade com a NR-17</span>
            <div className="legal">
              <a href="#priv">Privacidade</a>
              <a href="#terms">Termos de uso</a>
              <a href="#support">Suporte</a>
            </div>
          </footer>
        </div>
      </main>

      <TweaksPanel title="Tweaks · Início">
        <TweakSection label="Layout" />
        <TweakRadio
          label="Densidade"
          value={t.layout}
          options={['default', 'compact']}
          onChange={(v) => setTweak('layout', v)}
        />
        <TweakRadio
          label="Estilo dos cards"
          value={t.moduleStyle}
          options={['vivid', 'minimal']}
          onChange={(v) => setTweak('moduleStyle', v)}
        />
        <TweakSection label="Conteúdo" />
        <TweakToggle label="Métricas rápidas (topo)" value={t.showQuickStats} onChange={(v) => setTweak('showQuickStats', v)}/>
        <TweakToggle label="Painéis secundários" value={t.showSecondary} onChange={(v) => setTweak('showSecondary', v)}/>
        <TweakText label="Nome do usuário" value={t.userName} onChange={(v) => setTweak('userName', v)}/>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('react-root')).render(<HomePage />);

export default HomePage;
