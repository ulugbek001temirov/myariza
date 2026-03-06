import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { formatDateTime } from '../utils/status';
import styles from './NotificationsPage.module.css';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    api.getNotifications()
      .then(setNotifications)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleRead = async (id) => {
    try {
      const updated = await api.markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? updated : n))
      );
    } catch {}
  };

  const handleReadAll = async () => {
    setMarking(true);
    try {
      await api.markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {}
    setMarking(false);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Bildirishnomalar</h1>
          <p className={styles.sub}>
            {unreadCount > 0
              ? `${unreadCount} ta o'qilmagan bildirishnoma`
              : 'Barcha bildirishnomalar o\'qilgan'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            className={styles.readAllBtn}
            onClick={handleReadAll}
            disabled={marking}
          >
            {marking ? 'O\'qilmoqda...' : '✓ Barchasini o\'qilgan deb belgilash'}
          </button>
        )}
      </div>

      <div className={styles.list}>
        {loading && <div className={styles.empty}>Yuklanmoqda...</div>}

        {!loading && notifications.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🔔</div>
            <p>Hali bildirishnomalar yo'q</p>
          </div>
        )}

        {notifications.map((n) => (
          <div
            key={n.id}
            className={`${styles.item} ${!n.isRead ? styles.unread : ''}`}
            onClick={() => !n.isRead && handleRead(n.id)}
          >
            <div className={styles.itemDot}>
              {!n.isRead ? (
                <span className={styles.dotUnread} />
              ) : (
                <span className={styles.dotRead} />
              )}
            </div>
            <div className={styles.itemContent}>
              <div className={styles.itemTitle}>{n.title}</div>
              <div className={styles.itemMessage}>{n.message}</div>
              <div className={styles.itemDate}>{formatDateTime(n.createdAt)}</div>
            </div>
            {!n.isRead && (
              <span className={styles.newTag}>Yangi</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}