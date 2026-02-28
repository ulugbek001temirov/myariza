import { useState } from 'react';
import { CATEGORIES } from '../data';
import styles from './SubmitModal.module.css';

export default function SubmitModal({ onClose }) {
  const [step, setStep] = useState(1);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <h2 className={styles.title}>Yangi murojaat</h2>
        <p className={styles.subtitle}>
          Murojaatingizni to'ldiring. AI mos tashkilotni avtomatik aniqlaydi.
        </p>

        {/* Step indicator */}
        <div className={styles.steps}>
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={styles.step}
              style={{
                background: s < step ? '#0dd1a0' : s === step ? '#1a9fff' : '#1e3352',
              }}
            />
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <>
            <div className={styles.formRow}>
              <label className={styles.label}>Kategoriya *</label>
              <select className={styles.input}>
                <option value="">Kategoriyani tanlang</option>
                {CATEGORIES.map(c => <option key={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className={styles.formRow}>
              <label className={styles.label}>Muammo tavsifi *</label>
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Muammoni batafsil yozing... AI tashkilotni avtomatik aniqlaydi"
              />
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <div className={styles.formRow}>
              <label className={styles.label}>Manzil *</label>
              <input className={styles.input} type="text" placeholder="Shahar, tuman, ko'cha..." />
            </div>
            <div className={styles.formRow}>
              <label className={styles.label}>Fayl biriktirish (ixtiyoriy)</label>
              <input className={styles.input} type="text" placeholder="📎 Rasm yoki hujjat yuklash" />
            </div>
          </>
        )}

        {/* Step 3 — AI result */}
        {step === 3 && (
          <div className={styles.aiResult}>
            <div className={styles.aiResultTitle}>✨ AI tahlil natijasi</div>
            <div className={styles.aiResultRow}>
              Aniqlandigan tashkilot:{' '}
              <span>Kommunal xizmatlar departamenti</span>
            </div>
            <div className={styles.aiResultRow}>
              Kategoriya: <span>Uy-joy va kommunal</span>
            </div>
            <div className={styles.aiResultRow}>
              Ishonch darajasi:{' '}
              <span style={{ color: '#0dd1a0' }}>94%</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.btnBack}
            onClick={() => (step > 1 ? setStep(s => s - 1) : onClose())}
          >
            {step > 1 ? '← Orqaga' : 'Bekor qilish'}
          </button>
          <button
            className={styles.btnNext}
            onClick={() => (step < 3 ? setStep(s => s + 1) : onClose())}
          >
            {step < 3 ? 'Keyingisi →' : '🚀 Yuborish'}
          </button>
        </div>
      </div>
    </div>
  );
}
