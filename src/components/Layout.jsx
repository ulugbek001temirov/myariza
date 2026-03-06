import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const { userId, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!userId) return;
    api.getUser(userId).then(setUser).catch(() => {});
    api.getNotifications()
      .then((ns) => setUnread(ns.filter((n) => !n.isRead).length))
      .catch(() => {});
  }, [userId]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.surName?.[0] ?? ''}`.toUpperCase()
    : '…';

  return (
    <div className={styles.app}>
      {/* Sidebar */}
      <nav className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M10 4v12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
              <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" />
              <rect x="12" y="12" width="6" height="6" rx="1.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" />
            </svg>
          </div>
          <span className={styles.logoText}>MyAriza</span>
        </div>

        <div className={styles.navSection}>
          <span className={styles.sectionLabel}>Asosiy</span>

          <NavLink to="/" end className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <span>🏠</span> Bosh sahifa
          </NavLink>

          <NavLink to="/appeals/new" className={({ isActive }) => `${styles.navItem} ${styles.navHighlight} ${isActive ? styles.active : ''}`}>
            <span>✉️</span> Yangi murojaat
          </NavLink>

          <NavLink to="/appeals" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <span>📋</span> Murojaatlarim
          </NavLink>

          <NavLink to="/notifications" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <span>🔔</span>
            <span>Bildirishnomalar</span>
            {unread > 0 && <span className={styles.badge}>{unread}</span>}
          </NavLink>
        </div>

        <div className={styles.navSection}>
          <span className={styles.sectionLabel}>Hisob</span>
          <NavLink to="/profile" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <span>👤</span> Profil
          </NavLink>
        </div>

        <div className={styles.sidebarFooter}>
          <div className={styles.userChip}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.userName}>
              {user ? `${user.firstName} ${user.surName}` : '...'}
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout} title="Chiqish">
            ⏏
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}