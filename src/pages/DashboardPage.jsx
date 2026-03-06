import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { getStatus, formatDate } from '../utils/status';
import styles from './DashboardPage.module.css';

function StatCard({ icon, label, value, color }) {
  return (
    <div className={styles.statCard} style={{ borderTop: `3px solid ${color}` }}>
      <div className={styles.statIcon} style={{ color }}>{icon}</div>
      <div className={styles.statValue} style={{ color }}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const s = getStatus(status);
  return (
    <span className={styles.badge} style={{ background: s.bg, color: s.color }}>
      {s.icon} {s.label}
    </span>
  );
}

export default function DashboardPage() {
  const { userId } = useAuth();
  const [user, setUser] = useState(null);
  const [appeals, setAppeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    api.getUser(userId).then(setUser).catch(() => {});
    api.getAppeals()
      .then(setAppeals)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  const total     = appeals.length;
  const pending   = appeals.filter((a) => a.status === 'PENDING').length;
  const active    = appeals.filter((a) => ['UNDER_REVIEW', 'IN_PROGRESS'].includes(a.status)).length;
  const resolved  = appeals.filter((a) => a.status === 'RESOLVED').length;

  const recent = appeals.slice(0, 5);

  return (
    <div className={styles.page}>
      {/* Welcome */}
      <div className={styles.welcome}>
        <div>
          <h1 className={styles.welcomeTitle}>
            Xush kelibsiz{user ? `, ${user.firstName}` : ''}! 👋
          </h1>
          <p className={styles.welcomeSub}>
            Murojaatlaringiz holati bilan tanishing
          </p>
        </div>
        <Link to="/appeals/new" className={styles.newBtn}>
          ✉️ Yangi murojaat
        </Link>
      </div>

      {/* Stats */}
      <div className={styles.statsRow}>
        <StatCard icon="📊" label="Jami murojaatlar" value={total}   color="#1a9fff" />
        <StatCard icon="⏳" label="Kutilmoqda"        value={pending} color="#f5a623" />
        <StatCard icon="⚙️" label="Ko'rib chiqilmoqda" value={active} color="#b06aff" />
        <StatCard icon="✅" label="Hal qilindi"       value={resolved} color="#0dd1a0" />
      </div>

      {/* Recent appeals */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>📋 So'nggi murojaatlar</h2>
          <Link to="/appeals" className={styles.seeAll}>Barchasini ko'rish →</Link>
        </div>

        {loading && <div className={styles.empty}>Yuklanmoqda...</div>}

        {!loading && recent.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📭</div>
            <p>Hali murojaatlar yo'q</p>
            <Link to="/appeals/new" className={styles.emptyBtn}>
              Birinchi murojaatingizni yuboring
            </Link>
          </div>
        )}

        {recent.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tavsif</th>
                <th>Manzil</th>
                <th>Holat</th>
                <th>Sana</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recent.map((a) => (
                <tr key={a.id}>
                  <td className={styles.tdDesc}>
                    {a.description.length > 55
                      ? a.description.slice(0, 55) + '…'
                      : a.description}
                  </td>
                  <td className={styles.tdMeta}>{a.address || '—'}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td className={styles.tdMeta}>{formatDate(a.createdAt)}</td>
                  <td>
                    <Link to={`/appeals/${a.id}`} className={styles.viewBtn}>
                      Ko'rish
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Info cards */}
      <div className={styles.infoRow}>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>🤖</div>
          <div>
            <div className={styles.infoTitle}>AI tahlil</div>
            <div className={styles.infoSub}>
              Sun'iy intellekt murojaatingizni tegishli tashkilotga avtomatik yo'naltiradi
            </div>
          </div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>🔔</div>
          <div>
            <div className={styles.infoTitle}>Bildirishnomalar</div>
            <div className={styles.infoSub}>
              Har bir holat o'zgarishida SMS va push xabar olasiz
            </div>
          </div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>📎</div>
          <div>
            <div className={styles.infoTitle}>Hujjat biriktirish</div>
            <div className={styles.infoSub}>
              Fotosuratlar va PDF hujjatlarni murojaatingizga qo'shishingiz mumkin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}