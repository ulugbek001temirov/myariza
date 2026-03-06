const BASE_URL = '/api/v1';

function getToken() {
  return localStorage.getItem('accessToken');
}

async function request(path, options = {}) {
  const token = getToken();
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Network error' }));
    const msg = Array.isArray(error.message)
      ? error.message.join(', ')
      : error.message || 'Request failed';
    const err = new Error(msg);
    err.status = res.status;
    err.data = error;
    throw err;
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  // Auth
  register: (data) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  registerVerify: (data) =>
    request('/auth/register/verify', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  loginVerify: (data) =>
    request('/auth/login/verify', { method: 'POST', body: JSON.stringify(data) }),
  getSessions: () => request('/auth/sessions'),

  // User
  getUser: (userId) => request(`/user/${userId}`),
  updateUser: (userId, data) =>
    request(`/user/${userId}`, { method: 'PATCH', body: JSON.stringify(data) }),

  // Appeals
  createAppeal: (data) =>
    request('/appeals', { method: 'POST', body: JSON.stringify(data) }),
  getAppeals: () => request('/appeals'),
  getAppeal: (id) => request(`/appeals/${id}`),
  cancelAppeal: (id) => request(`/appeals/${id}/cancel`, { method: 'PATCH' }),
  getAppealStatusLogs: (id) => request(`/appeals/${id}/status-logs`),
  getAppealReplies: (id) => request(`/appeals/${id}/replies`),
  getAppealFiles: (id) => request(`/appeals/${id}/files`),
  uploadAppealFile: (appealId, file) => {
    const token = getToken();
    const formData = new FormData();
    formData.append('file', file);
    return request(`/appeals/${appealId}/files`, {
      method: 'POST',
      body: formData,
    });
  },

  // Categories
  getCategories: () => request('/categories'),
  getCategory: (id) => request(`/categories/${id}`),

  // Organizations
  getOrganizations: () => request('/organizations'),
  getOrganizationsByCategory: (categoryId) =>
    request(`/organizations/category/${categoryId}`),

  // Notifications
  getNotifications: () => request('/notifications'),
  getNotification: (id) => request(`/notifications/${id}`),
  markNotificationRead: (id) =>
    request(`/notifications/${id}/read`, { method: 'PATCH' }),
  markAllNotificationsRead: () =>
    request('/notifications/read-all', { method: 'PATCH' }),
};
