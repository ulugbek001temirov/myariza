import { useState } from 'react';
import styles from './Sidebar.module.css';

const NAV_MAIN = [
  { id: 'home',      icon: '🏠', label: 'Bosh sahifa' },
  { id: 'submit',    icon: '✉️', label: 'Murojaat yuborish', isAction: true },
  { id: 'my',        icon: '📋', label: 'Mening murojaatlarim' },
  { id: 'notify',    icon: '🔔', label: 'Bildirishnomalar', badge: 3 },
];

const NAV_SERVICES = [
  { id: 'map',       icon: '🗺️', label: 'Xarita va nuqtalar' },
  { id: 'assistant', icon: '🤖', label: 'AI Yordamchi' },
  { id: 'orgs',      icon: '🔍', label: 'Tashkilotlar' },
  { id: 'faq',       icon: '❓', label: "Ko'p beriladigan savollar" },
];

const NAV_ACCOUNT = [
  { id: 'profile',   icon: '👤', label: 'Profil' },
  { id: 'settings',  icon: '⚙️', label: 'Sozlamalar' },
];

function NavItem({ item, active, onClick }) {
  return (
    <div
      className={`${styles.navItem} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      <span className={styles.navIcon}>{item.icon}</span>
      <span className={styles.navLabel}>{item.label}</span>
      {item.badge && (
        <span className={styles.badge}>{item.badge}</span>
      )}
    </div>
  );
}

export default function Sidebar({ activePage, setActivePage, onNewAppeal }) {
  return (
    <nav className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="8" fill="#1a9fff" fillOpacity="0.2" />
          <path d="M7 14h14M14 7v14" stroke="#1a9fff" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="4" y="4" width="8" height="8" rx="2" stroke="#0dd1a0" strokeWidth="1.5" />
          <rect x="16" y="16" width="8" height="8" rx="2" stroke="#0dd1a0" strokeWidth="1.5" />
        </svg>
        MyAriza
      </div>

      <div className={styles.navSection}>
        <div className={styles.sectionLabel}>Asosiy</div>
        {NAV_MAIN.map(item => (
          <NavItem
            key={item.id}
            item={item}
            active={activePage === item.id}
            onClick={() => item.isAction ? onNewAppeal() : setActivePage(item.id)}
          />
        ))}
      </div>

      <div className={styles.navSection}>
        <div className={styles.sectionLabel}>Xizmatlar</div>
        {NAV_SERVICES.map(item => (
          <NavItem
            key={item.id}
            item={item}
            active={activePage === item.id}
            onClick={() => setActivePage(item.id)}
          />
        ))}
      </div>

      <div className={`${styles.navSection} ${styles.accountSection}`}>
        <div className={styles.sectionLabel}>Hisob</div>
        {NAV_ACCOUNT.map(item => (
          <NavItem
            key={item.id}
            item={item}
            active={activePage === item.id}
            onClick={() => setActivePage(item.id)}
          />
        ))}
      </div>
    </nav>
  );
}
