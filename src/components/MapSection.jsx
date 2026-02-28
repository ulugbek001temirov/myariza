import { useState } from 'react';
import { PLACES, PIN_COLORS, MAP_FILTERS } from '../data';
import styles from './MapSection.module.css';

function MapPin({ place, isSelected, onClick }) {
  const c = PIN_COLORS[place.type];
  return (
    <div
      className={styles.pin}
      style={{ left: `${place.x}%`, top: `${place.y}%` }}
      onClick={() => onClick(place)}
    >
      <div
        className={styles.pinInner}
        style={{
          background: c.bg,
          boxShadow: `0 4px 14px ${c.bg}66`,
          transform: isSelected ? 'rotate(-45deg) scale(1.2)' : 'rotate(-45deg)',
        }}
      >
        <span className={styles.pinIcon}>{c.icon}</span>
      </div>
    </div>
  );
}

export default function MapSection() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const handlePinClick = (place) => {
    setSelected(selected?.id === place.id ? null : place);
  };

  const visible = PLACES.filter(p => filter === 'all' || p.type === filter);

  return (
    <div className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>🗺️ Tashkilotlar xaritasi — oflayn nuqtalar</div>
        <div className={styles.filters}>
          {MAP_FILTERS.map(f => (
            <button
              key={f.key}
              className={`${styles.chip} ${filter === f.key ? styles.chipActive : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Canvas */}
        <div className={styles.canvas}>
          <div className={styles.mapGrid} />
          {/* Roads */}
          <div className={styles.roadH} style={{ top: '33%', height: 6 }} />
          <div className={styles.roadH} style={{ top: '66%', height: 4 }} />
          <div className={styles.roadH} style={{ top: '55%', height: 3, opacity: 0.5 }} />
          <div className={styles.roadV} style={{ left: '25%' }} />
          <div className={styles.roadV} style={{ left: '55%' }} />
          <div className={styles.roadV} style={{ left: '80%' }} />

          {/* Pins */}
          {visible.map(place => (
            <MapPin
              key={place.id}
              place={place}
              isSelected={selected?.id === place.id}
              onClick={handlePinClick}
            />
          ))}

          {/* Popup */}
          {selected && (
            <div className={styles.popup}>
              <div className={styles.popupIcon}>{PIN_COLORS[selected.type].icon}</div>
              <div className={styles.popupName}>{selected.name}</div>
              <div className={styles.popupAddr}>{selected.addr}</div>
              <div className={styles.popupActions}>
                <button className={styles.popupBtn}>Yo'l ko'rish</button>
                <button className={styles.popupClose} onClick={() => setSelected(null)}>✕</button>
              </div>
            </div>
          )}
        </div>

        {/* List */}
        <div className={styles.list}>
          {PLACES.filter(p => filter === 'all' || p.type === filter).map(p => {
            const c = PIN_COLORS[p.type];
            return (
              <div
                key={p.id}
                className={`${styles.placeItem} ${selected?.id === p.id ? styles.placeItemActive : ''}`}
                onClick={() => handlePinClick(p)}
              >
                <div className={styles.placeDot} style={{ background: c.bg }} />
                <div className={styles.placeInfo}>
                  <div className={styles.placeName}>{p.name}</div>
                  <div className={styles.placeAddr}>{p.addr}</div>
                </div>
                <span
                  className={styles.placeTag}
                  style={{ background: c.bg + '26', color: c.bg }}
                >
                  {c.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        {Object.entries(PIN_COLORS).map(([key, val]) => (
          <div key={key} className={styles.legendItem}>
            <div className={styles.legendDot} style={{ background: val.bg }} />
            {val.label}lar
          </div>
        ))}
      </div>
    </div>
  );
}
