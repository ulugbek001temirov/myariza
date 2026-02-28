import styles from './StatsRow.module.css';

const STATS = [
  { icon: '📨', value: '12', label: 'Barcha murojaatlar',  color: '#1a9fff', bgColor: 'rgba(26,159,255,0.15)' },
  { icon: '⏳', value: '4',  label: "Ko'rib chiqilmoqda",  color: '#f5a623', bgColor: 'rgba(245,166,35,0.15)' },
  { icon: '✅', value: '7',  label: 'Hal qilingan',        color: '#0dd1a0', bgColor: 'rgba(13,209,160,0.15)' },
  { icon: '❌', value: '1',  label: 'Rad etilgan',         color: '#ff6060', bgColor: 'rgba(255,80,80,0.15)' },
];

export default function StatsRow() {
  return (
    <div className={styles.grid}>
      {STATS.map((s, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.iconWrap} style={{ background: s.bgColor }}>
            {s.icon}
          </div>
          <div>
            <div className={styles.value} style={{ color: s.color }}>{s.value}</div>
            <div className={styles.label}>{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
