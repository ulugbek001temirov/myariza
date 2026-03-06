import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AppealsPage from './pages/AppealsPage';
import AppealDetailPage from './pages/AppealDetailPage';
import NewAppealPage from './pages/NewAppealPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={
        <PrivateRoute><DashboardPage /></PrivateRoute>
      } />
      <Route path="/appeals" element={
        <PrivateRoute><AppealsPage /></PrivateRoute>
      } />
      <Route path="/appeals/new" element={
        <PrivateRoute><NewAppealPage /></PrivateRoute>
      } />
      <Route path="/appeals/:id" element={
        <PrivateRoute><AppealDetailPage /></PrivateRoute>
      } />
      <Route path="/notifications" element={
        <PrivateRoute><NotificationsPage /></PrivateRoute>
      } />
      <Route path="/profile" element={
        <PrivateRoute><ProfilePage /></PrivateRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
