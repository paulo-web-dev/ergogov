import React from 'react';

export const EG_NAV_ITEMS = [
  { id: 'home',       label: 'Início',           icon: 'home',     href: '/home' },
  { id: 'empresas',   label: 'Empresas',         icon: 'building', href: '/empresas' },
  { id: 'usuarios',   label: 'Usuários',         icon: 'users',    href: '/usuarios' },
  { id: 'identidade', label: 'Identidade visual',icon: 'palette',  href: '/identidade' },
  { id: 'logout',     label: 'Sair',             icon: 'logout',   href: '/logout' },
];

export const EgIcon = {
  home:        (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg>,
  building:    (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h.01M9 11h.01M9 15h.01M15 7h.01M15 11h.01M15 15h.01"/><path d="M10 21v-4h4v4"/></svg>,
  users:       (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M16 19a4 4 0 0 0-8 0"/><circle cx="12" cy="10" r="4"/><path d="M22 19a4 4 0 0 0-3-3.87"/><path d="M2 19a4 4 0 0 1 3-3.87"/><circle cx="18" cy="8" r="2.5"/><circle cx="6" cy="8" r="2.5"/></svg>,
  palette:     (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="1.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="1.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="1.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="1.5" fill="currentColor"/><path d="M12 22a9 9 0 1 1 0-18c4.97 0 9 3.58 9 8 0 2.21-1.79 4-4 4h-1.5a2 2 0 0 0-1 3.75A1.3 1.3 0 0 1 13.5 22Z"/></svg>,
  logout:      (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>,
  search:      (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  bell:        (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>,
  help:        (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-.5.4-1.5 1-1.5 2v.5"/><circle cx="12" cy="17" r=".5" fill="currentColor"/></svg>,
  chevronDown: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  plus:        (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>,
  arrowRight:  (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>,
  pdf:         (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M9 14h6M9 18h4"/></svg>,
  trendUp:     (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>,
  modAET:      (p) => <svg {...p} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="22" cy="11" r="4"/><path d="M22 15v9l-7 6"/><path d="M22 21l8 5"/><path d="M22 24v8l-4 7"/><path d="M22 32l5 7"/><rect x="30" y="14" width="14" height="10" rx="1.5"/><path d="M37 24v4"/><path d="M33 28h8"/></svg>,
  modARP:      (p) => <svg {...p} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M24 6c-7 0-12 5-12 11 0 4 2 7 4 9v6a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-6c2-2 4-5 4-9 0-6-5-11-12-11Z"/><path d="M18 41h12"/><path d="M19 35h10"/></svg>,
  modRel:      (p) => <svg {...p} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M14 6h16l8 8v26a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/><path d="M30 6v8h8"/><path d="M18 24h12"/><path d="M18 30h12"/><path d="M18 36h7"/></svg>,
  calendar:    (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>,
  clipboard:   (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="12" height="18" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/></svg>,
  alertOctagon:(p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polygon points="8 2 16 2 22 8 22 16 16 22 8 22 2 16 2 8"/><path d="M12 8v4"/><circle cx="12" cy="16" r=".5" fill="currentColor"/></svg>,
  download:    (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
};

export function EgWordmark({ size = 22, theme = 'light' }) {
  return (
    <span className="eg-wordmark" style={{ '--wordmark-size': size + 'px' }}>
      ergo<span className="dot">.</span><span className="gov">gov</span>
    </span>
  );
}

export function EgSidebar({ active = 'home' }) {
  return (
    <aside className="eg-sidebar">
      <div className="eg-sidebar-brand">
        <EgWordmark size={22} />
      </div>
      <div className="eg-sidebar-section">Menu</div>
      <nav>
        {EG_NAV_ITEMS.map((item) => {
          const Icon = EgIcon[item.icon];
          return (
            <a key={item.id}
               className={'eg-sidebar-item' + (active === item.id ? ' active' : '')}
               href={item.href}>
              {Icon && <Icon />}
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="eg-sidebar-footer">ergo.gov v1.0</div>
    </aside>
  );
}

export function EgTopbar({ breadcrumbs = [], user = { name: 'Usuário', initials: 'U' } }) {
  return (
    <header className="eg-topbar">
      <div className="eg-breadcrumb">
        {breadcrumbs.map((b, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="sep">/</span>}
            <span className={i === breadcrumbs.length - 1 ? 'current' : ''}>{b}</span>
          </React.Fragment>
        ))}
      </div>
      <div className="eg-topbar-right">
        <button className="eg-iconbtn">
          <EgIcon.bell />
        </button>
        <div className="eg-avatar">
          <div className="circle">{user.initials}</div>
          <span className="name">{user.name}</span>
        </div>
      </div>
    </header>
  );
}

export function EgShell({ active, breadcrumbs = [], user, children }) {
  return (
    <div className="eg-shell">
      <EgSidebar active={active} />
      <div className="eg-main">
        <EgTopbar breadcrumbs={breadcrumbs} user={user || { name: 'Usuário', initials: 'U' }} />
        <main className="eg-page">
          {children}
        </main>
      </div>
    </div>
  );
}
