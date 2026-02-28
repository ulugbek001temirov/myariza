import { useState } from 'react';
import { CATEGORIES } from '../data';
import styles from './CategoriesGrid.module.css';

function CategoryCard({ cat, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={styles.card}
      style={{
        borderColor: hovered ? cat.color + '88' : '#1e3352',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className={styles.icon} style={{ background: cat.color + '26' }}>
        {cat.icon}
      </div>
      <div className={styles.name}>{cat.name}</div>
      <ul className={styles.items}>
        {cat.items.map(item => (
          <li key={item}>
            <span className={styles.arrow}>›</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SpecialCard({ id, icon, name, color, borderColor, items, tag, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={styles.card}
      style={{ borderColor: hovered ? borderColor + 'cc' : borderColor + '55', transform: hovered ? 'translateY(-2px)' : 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className={styles.icon} style={{ background: color + '26' }}>{icon}</div>
      <div className={styles.name} style={{ color }}>{name}</div>
      <ul className={styles.items}>
        {items.map(item => (
          <li key={item}>
            <span style={{ color }} className={styles.arrow}>›</span>
            {item}
          </li>
        ))}
      </ul>
      <div className={styles.tag} style={{ color: color + 'bb' }}>{tag}</div>
    </div>
  );
}

export default function CategoriesGrid({ onMapClick, onAssistantClick }) {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>Sohalar bo'yicha murojaatlar</div>
        <div className={styles.link}>Barcha sohalar →</div>
      </div>
      <div className={styles.grid}>
        {CATEGORIES.map(cat => (
          <CategoryCard key={cat.id} cat={cat} />
        ))}
        <SpecialCard
          id="map"
          icon="🗺️"
          name="Xarita va nuqtalar"
          color="#1ac7ff"
          borderColor="#1ac7ff"
          items={['Sudlar', 'Notariuslar', "Ko'chmas mulk agentliklari"]}
          tag="📍 Oflayn xarita →"
          onClick={onMapClick}
        />
        <SpecialCard
          id="assistant"
          icon="🤖"
          name="AI Ariza yordamchisi"
          color="#b06aff"
          borderColor="#a06eff"
          items={['Ariza tuzish', 'Shikoyat shakli', "So'rov xati"]}
          tag="✨ AI bilan tuzish →"
          onClick={onAssistantClick}
        />
      </div>
    </div>
  );
}
