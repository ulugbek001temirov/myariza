import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import styles from './AuthPage.module.css';

const INITIAL_FORM = {
  surName: '',
  firstName: '',
  midName: '',
  birthDate: '',
  pin: '',
  phoneNumber: '',
  passportSeries: '',
  passportNumber: '',
};

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = personal, 2 = document, 3 = otp
  const [form, setForm] = useState(INITIAL_FORM);
  const [otp, setOtp] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleStep1 = (e) => {
    e.preventDefault();
    setError('');
    setStep(2);
  };

  const handleStep2 = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.register(form);
      setSessionId(res.sessionId);
      setStep(3);
    } catch (err) {
      setError(err.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.registerVerify({ sessionId, otp });
      login(res.token);
      navigate('/');
    } catch (err) {
      setError(err.message || "Noto'g'ri OTP");
    } finally {
      setLoading(false);
    }
  };

  const stepTitles = [
    "Shaxsiy ma'lumotlar",
    "Hujjat ma'lumotlari",
    'Telefon tasdiqlash',
  ];

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M10 4v12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
              <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" />
              <rect x="12" y="12" width="6" height="6" rx="1.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" />
            </svg>
          </div>
          <span className={styles.logoText}>MyAriza</span>
        </div>

        <h1 className={styles.title}>Ro'yxatdan o'tish</h1>
        <p className={styles.subtitle}>{stepTitles[step - 1]}</p>

        <div className={styles.steps}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={styles.stepDot}
              style={{
                background:
                  s < step ? '#0dd1a0' : s === step ? '#1a9fff' : '#1e3352',
              }}
            />
          ))}
        </div>

        {error && <div className={styles.errorBox}>{error}</div>}

        {/* Step 1 — personal info */}
        {step === 1 && (
          <form onSubmit={handleStep1} className={styles.form}>
            <div className={styles.formRow}>
              <label className={styles.label}>Familiya</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputPrefix}>👤</span>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Ivanov"
                  value={form.surName}
                  onChange={set('surName')}
                  required
                />
              </div>
            </div>

            <div className={styles.grid2}>
              <div className={styles.formRow}>
                <label className={styles.label}>Ism</label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputPrefix}>✏️</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Ivan"
                    value={form.firstName}
                    onChange={set('firstName')}
                    required
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <label className={styles.label}>Otasining ismi</label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputPrefix}>✏️</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Ivanovich"
                    value={form.midName}
                    onChange={set('midName')}
                    required
                  />
                </div>
              </div>
            </div>

            <div className={styles.formRow}>
              <label className={styles.label}>Tug'ilgan sana</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputPrefix}>📅</span>
                <input
                  className={styles.input}
                  type="date"
                  value={form.birthDate}
                  onChange={set('birthDate')}
                  required
                />
              </div>
            </div>

            <button className={styles.btn} type="submit">
              Keyingisi →
            </button>
          </form>
        )}

        {/* Step 2 — document info */}
        {step === 2 && (
          <form onSubmit={handleStep2} className={styles.form}>
            <div className={styles.formRow}>
              <label className={styles.label}>PINFL (14 raqam)</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputPrefix}>🔢</span>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="43112990000100"
                  value={form.pin}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, pin: e.target.value.replace(/\D/g, '') }))
                  }
                  maxLength={14}
                  required
                />
              </div>
            </div>

            <div className={styles.grid2}>
              <div className={styles.formRow}>
                <label className={styles.label}>Seriya</label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputPrefix}>📄</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="AA"
                    value={form.passportSeries}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        passportSeries: e.target.value.toUpperCase().replace(/[^A-Z]/g, ''),
                      }))
                    }
                    maxLength={2}
                    required
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <label className={styles.label}>Pasport raqam</label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputPrefix}>🔢</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="1234567"
                    value={form.passportNumber}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        passportNumber: e.target.value.replace(/\D/g, ''),
                      }))
                    }
                    maxLength={7}
                    required
                  />
                </div>
              </div>
            </div>

            <div className={styles.formRow}>
              <label className={styles.label}>Telefon raqam</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputPrefix}>📱</span>
                <input
                  className={styles.input}
                  type="tel"
                  placeholder="998901234567"
                  value={form.phoneNumber}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      phoneNumber: e.target.value.replace(/\D/g, ''),
                    }))
                  }
                  maxLength={12}
                  required
                />
              </div>
              <span className={styles.hint}>Format: 998XXXXXXXXX</span>
            </div>

            <button className={styles.btn} type="submit" disabled={loading}>
              {loading ? 'Yuborilmoqda...' : 'OTP yuborish →'}
            </button>
            <button
              type="button"
              className={styles.btnBack}
              onClick={() => { setStep(1); setError(''); }}
            >
              ← Orqaga
            </button>
          </form>
        )}

        {/* Step 3 — OTP */}
        {step === 3 && (
          <form onSubmit={handleOtpSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <label className={styles.label}>OTP kodi</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputPrefix}>🔑</span>
                <input
                  className={`${styles.input} ${styles.otpInput}`}
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  maxLength={6}
                  required
                />
              </div>
              <span className={styles.hint}>
                {form.phoneNumber} raqamiga yuborilgan 6 raqamli kod
              </span>
            </div>
            <button className={styles.btn} type="submit" disabled={loading}>
              {loading ? 'Tekshirilmoqda...' : '✓ Ro\'yxatdan o\'tish'}
            </button>
            <button
              type="button"
              className={styles.btnBack}
              onClick={() => { setStep(2); setOtp(''); setError(''); }}
            >
              ← Orqaga
            </button>
          </form>
        )}

        <p className={styles.switchLink}>
          Hisobingiz bormi? <Link to="/login">Kirish</Link>
        </p>
      </div>
    </div>
  );
}
