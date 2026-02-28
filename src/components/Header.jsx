import styles from './Header.module.css';

export default function Header({ onNewAppeal }) {
  return (
    <header className={styles.header}>
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.searchInput}
          placeholder="Qidiruv: murojaat turi, tashkilot nomi..."
        />
      </div>

      <div className={styles.right}>
        <div className={styles.weatherBadge}>
          <span>☁️</span>
          <div>
            <div className={styles.weatherTemp}>+2° — +4°</div>
            <div className={styles.weatherCity}>Toshkent</div>
          </div>
        </div>

        <button className={styles.newBtn} onClick={onNewAppeal}>
          + Murojaat
        </button>

        <div className={styles.avatar}>AK</div>
      </div>
    </header>
  );
}
