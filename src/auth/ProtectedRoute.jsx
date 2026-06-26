import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../pages/auth/portal.css';

export default function ProtectedRoute({ role }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="mob-shell mob-shell--loading">
        <div className="mob-loader">
          <span className="mob-loader__ring" />
          <p>Checking session…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={role === 'admin' ? '/admin/login' : '/student/login'}
        replace
        state={{ from: location }}
      />
    );
  }

  if (role && user.role !== role) {
    return (
      <Navigate
        to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'}
        replace
      />
    );
  }

  return <Outlet />;
}
