export const STATUS_CONFIG = {
  PENDING:           { label: 'Kutilmoqda',         color: '#f5a623', bg: 'rgba(245,166,35,0.15)',   icon: '⏳' },
  UNDER_REVIEW:      { label: "Ko'rib chiqilmoqda", color: '#1a9fff', bg: 'rgba(26,159,255,0.15)',   icon: '👁' },
  IN_PROGRESS:       { label: 'Jarayonda',           color: '#b06aff', bg: 'rgba(176,106,255,0.15)', icon: '⚙️' },
  RESOLVED:          { label: 'Hal qilindi',         color: '#0dd1a0', bg: 'rgba(13,209,160,0.15)',  icon: '✅' },
  REJECTED:          { label: 'Rad etildi',          color: '#ff6060', bg: 'rgba(255,80,80,0.15)',   icon: '❌' },
  CANCELLED_BY_USER: { label: 'Bekor qilindi',       color: '#8ca3bb', bg: 'rgba(140,163,187,0.15)', icon: '🚫' },
};

export function getStatus(key) {
  return STATUS_CONFIG[key] ?? { label: key, color: '#8ca3bb', bg: 'rgba(140,163,187,0.15)', icon: '•' };
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now - d;
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return 'Bugun';
  if (diffDays === 1) return 'Kecha';
  if (diffDays < 7) return `${diffDays} kun oldin`;
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}