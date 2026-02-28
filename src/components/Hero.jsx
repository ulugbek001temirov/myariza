import styles from './Hero.module.css';

export default function Hero({ onNewAppeal }) {
  return (
    <div className={styles.hero}>
      <div className={styles.glow1} />
      <div className={styles.glow2} />
      <h1 className={styles.title}>Xush kelibsiz! 👋</h1>
      <p className={styles.subtitle}>
        Davlat tashkilotlariga murojaat yuborish, kuzatish va javob olish uchun yagona platforma.
      </p>
      <div className={styles.actions}>
        <button className={styles.btnPrimary} onClick={onNewAppeal}>
          ＋ Yangi murojaat
        </button>
        <button className={styles.btnSecondary}>
          📋 Murojaatlarni ko'rish
        </button>
      </div>
    </div>
  );
}
