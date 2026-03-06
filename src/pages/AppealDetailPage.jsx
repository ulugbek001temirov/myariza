import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { getStatus, formatDateTime } from '../utils/status';
import styles from './AppealDetailPage.module.css';

function StatusBadge({ status }) {
  const s = getStatus(status);
  return (
    <span className={styles.badge} style={{ background: s.bg, color: s.color }}>
      {s.icon} {s.label}
    </span>
  );
}

export default function AppealDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appeal, setAppeal]       = useState(null);
  const [logs, setLogs]           = useState([]);
  const [replies, setReplies]     = useState([]);
  const [files, setFiles]         = useState([]);
  const [category, setCategory]   = useState(null);
  const [loading, setLoading]     = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError]         = useState('');

  useEffect(() => {
    Promise.all([
      api.getAppeal(id),
      api.getAppealStatusLogs(id),
      api.getAppealReplies(id),
      api.getAppealFiles(id),
    ])
      .then(([a, l, r, f]) => {
        setAppeal(a);
        setLogs(l);
        setReplies(r);
        setFiles(f);
        if (a.categoryId) {
          api.getCategory(a.categoryId).then(setCategory).catch(() => {});
        }
      })
      .catch(() => setError('Murojaat topilmadi'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm("Murojaatni bekor qilmoqchimisiz?")) return;
    setCancelling(true);
    try {
      const updated = await api.cancelAppeal(id);
      setAppeal(updated);
      // Re-fetch logs
      api.getAppealStatusLogs(id).then(setLogs).catch(() => {});
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Yuklanmoqda...</div>
      </div>
    );
  }

  if (error || !appeal) {
    return (
      <div className={styles.page}>
        <div className={styles.errorBox}>{error || 'Murojaat topilmadi'}</div>
        <Link to="/appeals" className={styles.backLink}>← Orqaga</Link>
      </div>
    );
  }

  const canCancel = appeal.status === 'PENDING';

  return (
    <div className={styles.page}>
      {/* Back + title */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => navigate('/appeals')}>
          ← Orqaga
        </button>
        {canCancel && (
          <button
            className={styles.cancelBtn}
            onClick={handleCancel}
            disabled={cancelling}
          >
            {cancelling ? 'Bekor qilinmoqda...' : '🚫 Murojaatni bekor qilish'}
          </button>
        )}
      </div>

      {/* Appeal header card */}
      <div className={styles.card}>
        <div className={styles.cardTopRow}>
          <div className={styles.appealMeta}>
            <span className={styles.appealId}>#{id.slice(0, 8).toUpperCase()}</span>
            {category && (
              <span className={styles.categoryTag}>
                📂 {category.nameUz || category.nameRu || category.nameEn}
              </span>
            )}
          </div>
          <StatusBadge status={appeal.status} />
        </div>

        <p className={styles.description}>{appeal.description}</p>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>📍</span>
            <span>{appeal.address || 'Manzil ko\'rsatilmagan'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>📅</span>
            <span>{formatDateTime(appeal.createdAt)}</span>
          </div>
          {appeal.updatedAt !== appeal.createdAt && (
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>🔄</span>
              <span>Yangilangan: {formatDateTime(appeal.updatedAt)}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.twoCol}>
        {/* Status timeline */}
        <div className={styles.card}>
          <h3 className={styles.sectionTitle}>📊 Holat tarixi</h3>
          {logs.length === 0 ? (
            <p className={styles.emptyText}>Hali holat o'zgarishi yo'q</p>
          ) : (
            <div className={styles.timeline}>
              {logs.map((log, i) => {
                const from = getStatus(log.statusFrom);
                const to   = getStatus(log.statusTo);
                return (
                  <div key={log.id} className={styles.timelineItem}>
                    <div className={styles.timelineDot} style={{ background: to.color }} />
                    {i < logs.length - 1 && <div className={styles.timelineLine} />}
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineStatus}>
                        <span style={{ color: from.color }}>{from.label}</span>
                        <span className={styles.timelineArrow}>→</span>
                        <span style={{ color: to.color }}>{to.label}</span>
                      </div>
                      {log.comment && (
                        <p className={styles.timelineComment}>{log.comment}</p>
                      )}
                      <span className={styles.timelineDate}>{formatDateTime(log.createdAt)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Org replies */}
        <div className={styles.card}>
          <h3 className={styles.sectionTitle}>💬 Tashkilot javoblari</h3>
          {replies.length === 0 ? (
            <p className={styles.emptyText}>Hali javob yo'q</p>
          ) : (
            <div className={styles.replies}>
              {replies.map((r) => (
                <div key={r.id} className={`${styles.reply} ${r.isFinal ? styles.replyFinal : ''}`}>
                  {r.isFinal && (
                    <div className={styles.finalTag}>✅ Yakuniy javob</div>
                  )}
                  <p className={styles.replyText}>{r.answer}</p>
                  <span className={styles.replyDate}>{formatDateTime(r.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Files */}
      {files.length > 0 && (
        <div className={styles.card}>
          <h3 className={styles.sectionTitle}>📎 Biriktirilgan fayllar</h3>
          <div className={styles.fileGrid}>
            {files.map((f) => (
              <div key={f.id} className={styles.fileItem}>
                <span className={styles.fileIcon}>
                  {f.mimeType?.includes('image') ? '🖼️' : '📄'}
                </span>
                <div className={styles.fileInfo}>
                  <div className={styles.fileName}>{f.name}</div>
                  <div className={styles.fileSize}>
                    {(f.sizeBytes / 1024).toFixed(0)} KB
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}