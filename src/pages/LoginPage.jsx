import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import styles from './AuthPage.module.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = phone, 2 = otp
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.login({ phoneNumber });
      setSessionId(res.sessionId);
      setStep(2);
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
      const res = await api.loginVerify({ sessionId, otp });
      login(res.token);
      navigate('/');
    } catch (err) {
      setError(err.message || "Noto'g'ri OTP");
    } finally {
      setLoading(false);
    }
  };

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

        <h1 className={styles.title}>Tizimga kirish</h1>
        <p className={styles.subtitle}>
          {step === 1
            ? 'Telefon raqamingizni kiriting'
            : `${phoneNumber} raqamiga OTP yuborildi`}
        </p>

        <div className={styles.steps}>
          {[1, 2].map((s) => (
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

        {step === 1 ? (
          <form onSubmit={handlePhoneSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <label className={styles.label}>Telefon raqam</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputPrefix}>📱</span>
                <input
                  className={styles.input}
                  type="tel"
                  placeholder="998901234567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  maxLength={12}
                  required
                />
              </div>
              <span className={styles.hint}>Format: 998XXXXXXXXX</span>
            </div>
            <button className={styles.btn} type="submit" disabled={loading}>
              {loading ? 'Yuklanmoqda...' : 'OTP yuborish →'}
            </button>
          </form>
        ) : (
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
              <span className={styles.hint}>SMS orqali yuborilgan 6 raqamli kod</span>
            </div>
            <button className={styles.btn} type="submit" disabled={loading}>
              {loading ? 'Tekshirilmoqda...' : '✓ Kirish'}
            </button>
            <button
              type="button"
              className={styles.btnBack}
              onClick={() => { setStep(1); setOtp(''); setError(''); }}
            >
              ← Orqaga
            </button>
          </form>
        )}

        <p className={styles.switchLink}>
          Hisobingiz yo'qmi?{' '}
          <Link to="/register">Ro'yxatdan o'tish</Link>
        </p>
      </div>
    </div>
  );
}
