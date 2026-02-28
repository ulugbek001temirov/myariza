import { RECENT_APPEALS, STATUS_STYLES, CATEGORIES } from '../data';
import styles from './RecentAppeals.module.css';

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || { bg: '#1e3352', color: '#8ca3bb' };
  return (
    <span className={styles.badge} style={{ background: s.bg, color: s.color }}>
      {status}
    </span>
  );
}

function QuickForm({ onSubmit }) {
  return (
    <div className={styles.panel}>
      <div className={styles.aiBadge}>✨ AI tahlil</div>
      <div className={styles.panelTitle}>✉️ Tezkor murojaat yuborish</div>

      <div className={styles.formRow}>
        <label className={styles.label}>Murojaat kategoriyasi</label>
        <select className={styles.input}>
          <option value="">Kategoriyani tanlang</option>
          {CATEGORIES.map(c => <option key={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className={styles.formRow}>
        <label className={styles.label}>Muammo tavsifi</label>
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          placeholder="Muammoni batafsil yozing... AI tashkilotni avtomatik aniqlaydi"
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.label}>Manzil</label>
        <input className={styles.input} type="text" placeholder="Shahar, tuman, ko'cha..." />
      </div>
      <div className={styles.formRow}>
        <label className={styles.label}>Fayl biriktirish (ixtiyoriy)</label>
        <input className={styles.input} type="text" placeholder="📎 Rasm yoki hujjat yuklash" />
      </div>
      <button className={styles.submitBtn} onClick={onSubmit}>
        🚀 Murojaatni yuborish
      </button>
    </div>
  );
}

export default function RecentAppeals({ onNewAppeal }) {
  return (
    <div className={styles.grid}>
      {/* Left — recent */}
      <div className={styles.panel}>
        <div className={styles.panelTitle}>📋 So'nggi murojaatlarim</div>

        {RECENT_APPEALS.map((a, i) => (
          <div key={i} className={styles.item} style={{ borderBottom: i < RECENT_APPEALS.length - 1 ? '1px solid #1e3352' : 'none' }}>
            <div className={styles.num}>{a.num}</div>
            <div className={styles.info}>
              <div className={styles.itemTitle}>{a.title}</div>
              <div className={styles.meta}>{a.meta}</div>
            </div>
            <StatusBadge status={a.status} />
          </div>
        ))}

        <button className={styles.allBtn}>Barcha murojaatlar →</button>

        <div className={styles.infoCards}>
          {[
            { icon: '📱', title: 'Mobil ilova', sub: 'iOS va Android' },
            { icon: '🔔', title: 'Xabarnomalar', sub: 'SMS va push' },
          ].map((c, i) => (
            <div key={i} className={styles.infoCard}>
              <span className={styles.infoCardIcon}>{c.icon}</span>
              <div>
                <strong>{c.title}</strong>
                <span>{c.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — quick form */}
      <QuickForm onSubmit={onNewAppeal} />
    </div>
  );
}
