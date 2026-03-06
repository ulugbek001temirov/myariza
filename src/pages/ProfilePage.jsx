import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import styles from './ProfilePage.module.css';

function Field({ label, value }) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <span className={styles.fieldValue}>{value || '—'}</span>
    </div>
  );
}

function EditInput({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div className={styles.formRow}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default function ProfilePage() {
  const { userId } = useAuth();
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    surName: '',
    firstName: '',
    midName: '',
    passportSeries: '',
    passportNumber: '',
    birthDate: '',
  });

  useEffect(() => {
    if (!userId) return;
    api.getUser(userId)
      .then((u) => {
        setUser(u);
        setForm({
          surName:        u.surName || '',
          firstName:      u.firstName || '',
          midName:        u.midName || '',
          passportSeries: u.passportSeries || '',
          passportNumber: u.passportNumber || '',
          birthDate:      u.birthDate ? u.birthDate.split('T')[0] : '',
        });
      })
      .catch(() => setError('Profil yuklanmadi'))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      const updated = await api.updateUser(userId, {
        ...form,
        birthDate: form.birthDate,
      });
      setUser(updated);
      setEditing(false);
      setSuccess("Profil muvaffaqiyatli yangilandi!");
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setSaving(false);
    }
  };

  const set = (field) => (val) => setForm((p) => ({ ...p, [field]: val }));

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.surName?.[0] ?? ''}`.toUpperCase()
    : '…';

  if (loading) {
    return <div className={styles.page}><div className={styles.loading}>Yuklanmoqda...</div></div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Profil</h1>
        <p className={styles.sub}>Shaxsiy ma'lumotlaringiz</p>
      </div>

      <div className={styles.profileCard}>
        {/* Avatar + name */}
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>{initials}</div>
          <div>
            <div className={styles.fullName}>
              {user ? `${user.surName} ${user.firstName} ${user.midName}` : '...'}
            </div>
            <div className={styles.phone}>{user?.phoneNumber}</div>
            {user?.isVerified && (
              <span className={styles.verifiedBadge}>✅ Tasdiqlangan</span>
            )}
          </div>
        </div>

        {/* Messages */}
        {error && <div className={styles.errorBox}>{error}</div>}
        {success && <div className={styles.successBox}>{success}</div>}

        {/* View mode */}
        {!editing && user && (
          <>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Shaxsiy ma'lumotlar</div>
              <div className={styles.fields}>
                <Field label="Familiya"       value={user.surName} />
                <Field label="Ism"            value={user.firstName} />
                <Field label="Otasining ismi" value={user.midName} />
                <Field label="Tug'ilgan sana" value={user.birthDate?.split('T')[0]} />
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>Hujjat ma'lumotlari</div>
              <div className={styles.fields}>
                <Field label="PINFL"          value={user.pin} />
                <Field label="Pasport seriya" value={user.passportSeries} />
                <Field label="Pasport raqam"  value={user.passportNumber} />
                <Field label="Telefon"        value={user.phoneNumber} />
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>Hisob ma'lumotlari</div>
              <div className={styles.fields}>
                <Field label="Ro'yxatdan o'tgan sana" value={user.createdAt?.split('T')[0]} />
              </div>
            </div>

            <button className={styles.editBtn} onClick={() => setEditing(true)}>
              ✏️ Ma'lumotlarni tahrirlash
            </button>
          </>
        )}

        {/* Edit mode */}
        {editing && (
          <>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Ma'lumotlarni tahrirlash</div>
              <div className={styles.editGrid}>
                <EditInput
                  label="Familiya"
                  value={form.surName}
                  onChange={set('surName')}
                  placeholder="Familiya"
                />
                <EditInput
                  label="Ism"
                  value={form.firstName}
                  onChange={set('firstName')}
                  placeholder="Ism"
                />
                <EditInput
                  label="Otasining ismi"
                  value={form.midName}
                  onChange={set('midName')}
                  placeholder="Otasining ismi"
                />
                <EditInput
                  label="Tug'ilgan sana"
                  type="date"
                  value={form.birthDate}
                  onChange={set('birthDate')}
                />
                <EditInput
                  label="Pasport seriya (2 harf)"
                  value={form.passportSeries}
                  onChange={(v) => set('passportSeries')(v.toUpperCase().replace(/[^A-Z]/g, ''))}
                  placeholder="AA"
                />
                <EditInput
                  label="Pasport raqam (7 raqam)"
                  value={form.passportNumber}
                  onChange={(v) => set('passportNumber')(v.replace(/\D/g, ''))}
                  placeholder="1234567"
                />
              </div>
              <p className={styles.editNote}>
                * PINFL va telefon raqamni o'zgartirish mumkin emas
              </p>
            </div>

            <div className={styles.editActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => { setEditing(false); setError(''); }}
              >
                Bekor qilish
              </button>
              <button
                className={styles.saveBtn}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saqlanmoqda...' : '✓ Saqlash'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}