import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import styles from './NewAppealPage.module.css';

const STEPS = [
  { num: 1, label: 'Muammo tavsifi' },
  { num: 2, label: 'Kategoriya' },
  { num: 3, label: 'Manzil va fayl' },
  { num: 4, label: 'Yuborildi' },
];

export default function NewAppealPage() {
  const navigate = useNavigate();

  const [step, setStep]             = useState(1);
  const [categories, setCategories] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [address, setAddress]       = useState('');
  const [file, setFile]             = useState(null);
  const [catLoading, setCatLoading] = useState(true);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [createdAppeal, setCreatedAppeal] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    api.getCategories()
      .then(setCategories)
      .catch(() => {})
      .finally(() => setCatLoading(false));
  }, []);

  const handleSelectCategory = (catId) => {
    setCategoryId(catId);
    setOrganizations([]);
    api.getOrganizationsByCategory(catId)
      .then(setOrganizations)
      .catch(() => setOrganizations([]));
    setStep(3);
  };

  const handleSubmit = async () => {
    if (!address.trim()) { setError('Manzilni kiriting'); return; }
    setError('');
    setLoading(true);
    try {
      const appeal = await api.createAppeal({ categoryId, description, address });
      if (file) await api.uploadAppealFile(appeal.id, file).catch(() => {});
      setCreatedAppeal(appeal);
      setStep(4);
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const rootCategories = categories.filter((c) => !c.parentId);
  const selectedCategory = categories.find((c) => c.id === categoryId);
  const selectedOrg = organizations[0] || null;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Yangi murojaat</h1>
        <p className={styles.sub}>Muammongizni tavsiflang va tegishli kategoriyani tanlang</p>
      </div>

      <div className={styles.stepper}>
        {STEPS.map((s, i) => (
          <div key={s.num} className={styles.stepWrap}>
            <div className={`${styles.stepCircle} ${step > s.num ? styles.stepDone : step === s.num ? styles.stepActive : ''}`}>
              {step > s.num ? '✓' : s.num}
            </div>
            <span className={`${styles.stepLabel} ${step === s.num ? styles.stepLabelActive : ''}`}>{s.label}</span>
            {i < STEPS.length - 1 && <div className={`${styles.stepLine} ${step > s.num ? styles.stepLineDone : ''}`} />}
          </div>
        ))}
      </div>

      <div className={styles.card}>
        {error && <div className={styles.errorBox}>{error}</div>}

        {/* STEP 1 */}
        {step === 1 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Muammoni tavsiflang</h2>
            <p className={styles.stepHint}>Muammongizni batafsil yozing.</p>
            <div className={styles.formRow}>
              <label className={styles.label}>Muammo tavsifi *</label>
              <textarea
                className={styles.textarea}
                placeholder="Masalan: Ko'chadagi yo'l buzilgan, teshiklar bor..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
              />
              <span className={styles.charCount}>
                {description.length} ta belgi
                {description.length < 10 && description.length > 0 && (
                  <span className={styles.charWarn}> (kamida 10 ta belgi kerak)</span>
                )}
              </span>
            </div>
            <div className={styles.actions}>
              <button className={styles.btnBack} onClick={() => navigate('/appeals')}>Bekor qilish</button>
              <button
                className={styles.btnNext}
                onClick={() => { setError(''); setStep(2); }}
                disabled={description.trim().length < 10}
              >
                Davom etish →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Kategoriyani tanlang</h2>
            <p className={styles.stepHint}>Muammongizga mos kategoriyani bosing.</p>
            <div className={styles.categoryGrid}>
              {catLoading && (
                <p className={styles.emptyCategories}>Kategoriyalar yuklanmoqda...</p>
              )}
              {!catLoading && rootCategories.length === 0 && (
                <p className={styles.emptyCategories}>Kategoriyalar topilmadi.</p>
              )}
              {rootCategories.map((c) => (
                <div
                  key={c.id}
                  className={styles.categoryCard}
                  onClick={() => handleSelectCategory(c.id)}
                >
                  <div className={styles.categoryName}>{c.nameUz || c.nameRu}</div>
                </div>
              ))}
            </div>
            <div className={styles.actions}>
              <button className={styles.btnBack} onClick={() => { setStep(1); setError(''); }}>← Orqaga</button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Manzil va hujjatlar</h2>

            <div className={styles.summaryBox}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryKey}>Kategoriya:</span>
                <span>{selectedCategory?.nameUz || selectedCategory?.nameRu || '—'}</span>
              </div>
              {selectedOrg && (
                <div className={styles.summaryItem}>
                  <span className={styles.summaryKey}>Tashkilot:</span>
                  <span>{selectedOrg.nameUz || selectedOrg.nameRu}</span>
                </div>
              )}
            </div>

            <div className={styles.formRow}>
              <label className={styles.label}>Manzil *</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Shahar, tuman, ko'cha, uy raqami..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className={styles.formRow}>
              <label className={styles.label}>Fayl biriktirish (ixtiyoriy)</label>
              <input ref={fileRef} type="file" style={{ display: 'none' }} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={(e) => setFile(e.target.files[0] ?? null)} />
              <button type="button" className={styles.fileBtn} onClick={() => fileRef.current.click()}>
                {file ? <><span style={{ color: '#0dd1a0' }}>📎</span> {file.name}</> : <><span>📎</span> Rasm yoki hujjat yuklash (PDF, JPG, PNG)</>}
              </button>
            </div>

            <div className={styles.actions}>
              <button className={styles.btnBack} onClick={() => { setStep(2); setError(''); }}>← Orqaga</button>
              <button className={styles.btnSubmit} onClick={handleSubmit} disabled={loading || !address.trim()}>
                {loading ? <><span className={styles.spinner} /> Yuborilmoqda...</> : '🚀 Yuborish'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && createdAppeal && (
          <div className={styles.stepContent}>
            <div className={styles.successBox}>
              <div className={styles.successIcon}>✅</div>
              <h2 className={styles.successTitle}>Murojaat muvaffaqiyatli yuborildi!</h2>
              <p className={styles.successSub}>
                Murojaatingiz qabul qilindi va ko'rib chiqish uchun yuborildi.
                Holat o'zgarganda bildirishnoma orqali xabardor qilinasiz.
              </p>
              <div className={styles.appealIdBox}>
                Murojaat raqami: <strong>#{createdAppeal.id.slice(0, 8).toUpperCase()}</strong>
              </div>
              <div className={styles.successActions}>
                <button className={styles.btnNext} onClick={() => navigate(`/appeals/${createdAppeal.id}`)}>
                  Murojaatni ko'rish →
                </button>
                <button className={styles.btnBack} onClick={() => {
                  setStep(1); setDescription(''); setCategoryId('');
                  setAddress(''); setFile(null); setCreatedAppeal(null); setError('');
                }}>
                  Yangi murojaat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}