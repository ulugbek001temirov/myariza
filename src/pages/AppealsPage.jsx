import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { getStatus, formatDate } from '../utils/status';
import styles from './AppealsPage.module.css';

const FILTERS = [
  { key: 'ALL',              label: 'Barchasi' },
  { key: 'PENDING',          label: 'Kutilmoqda' },
  { key: 'UNDER_REVIEW',     label: "Ko'rib chiqilmoqda" },
  { key: 'IN_PROGRESS',      label: 'Jarayonda' },
  { key: 'RESOLVED',         label: 'Hal qilindi' },
  { key: 'REJECTED',         label: 'Rad etildi' },
  { key: 'CANCELLED_BY_USER',label: 'Bekor qilindi' },
];

function StatusBadge({ status }) {
  const s = getStatus(status);
  return (
    <span className={styles.badge} style={{ background: s.bg, color: s.color }}>
      {s.icon} {s.label}
    </span>
  );
}

export default function AppealsPage() {
  const [appeals, setAppeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    api.getAppeals()
      .then(setAppeals)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === 'ALL' ? appeals : appeals.filter((a) => a.status === filter);

  const counts = {};
  FILTERS.forEach((f) => {
    counts[f.key] = f.key === 'ALL'
      ? appeals.length
      : appeals.filter((a) => a.status === f.key).length;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Mening murojaatlarim</h1>
          <p className={styles.sub}>Barcha yuborilgan murojaatlaringiz</p>
        </div>
        <Link to="/appeals/new" className={styles.newBtn}>
          ✉️ Yangi murojaat
        </Link>
      </div>

      {/* Filter tabs */}
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`${styles.filterBtn} ${filter === f.key ? styles.filterActive : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            {counts[f.key] > 0 && (
              <span className={styles.filterCount}>{counts[f.key]}</span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={styles.card}>
        {loading && <div className={styles.empty}>Yuklanmoqda...</div>}

        {!loading && filtered.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📭</div>
            <p>
              {filter === 'ALL'
                ? 'Hali murojaatlar yo\'q'
                : `"${FILTERS.find((f) => f.key === filter)?.label}" murojaatlar yo'q`}
            </p>
            {filter === 'ALL' && (
              <Link to="/appeals/new" className={styles.emptyBtn}>
                Birinchi murojaatingizni yuboring
              </Link>
            )}
          </div>
        )}

        {filtered.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Tavsif</th>
                <th>Manzil</th>
                <th>Holat</th>
                <th>Sana</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={a.id}>
                  <td className={styles.tdNum}>{i + 1}</td>
                  <td className={styles.tdDesc}>
                    {a.description.length > 70
                      ? a.description.slice(0, 70) + '…'
                      : a.description}
                  </td>
                  <td className={styles.tdMeta}>{a.address || '—'}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td className={styles.tdMeta}>{formatDate(a.createdAt)}</td>
                  <td>
                    <Link to={`/appeals/${a.id}`} className={styles.viewBtn}>
                      Ko'rish →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}