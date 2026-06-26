import { useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import './portal.css';

const content = {
  student: {
    eyebrow: 'Student Portal',
    heading: 'Internship work, attendance, and leave in one place.',
    subheading: 'Login with the email and password assigned by your Arkevion domain admin.',
    formTitle: 'Student Login',
  },
  admin: {
    eyebrow: 'Admin Portal',
    heading: 'Manage your internship domain with clarity.',
    subheading: 'Add students, assign tasks, monitor attendance, and review leave requests securely.',
    formTitle: 'Admin Login',
  },
};

export default function LoginPage({ role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login, user } = useAuth();
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const page = content[role];

  const redirectTo = useMemo(() => {
    const statePath = location.state?.from?.pathname;
    if (statePath) return statePath;
    return role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
  }, [location.state, role]);

  if (isAuthenticated && user?.role === role) {
    return <Navigate to={redirectTo} replace />;
  }

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const nextUser = await login(role, {
        email: form.identifier,
        username: form.identifier,
        password: form.password,
      });
      navigate(nextUser.role === 'admin' ? '/admin/dashboard' : '/student/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to login. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="ark-login-shell">
      <div className="ark-login-container ark-login-grid">
        <div>
          <span className="ark-login-eyebrow">{page.eyebrow}</span>
          <h1>{page.heading}</h1>
          <p>{page.subheading}</p>
        </div>

        <form className="ark-login-card ark-login-form" onSubmit={handleSubmit}>
          <h2>{page.formTitle}</h2>
          {error && <div className="ark-login-alert" role="alert">{error}</div>}

          <label>
            Role
            <select
              className="ark-login-input"
              value={role}
              onChange={(event) => navigate(`/${event.target.value}/login`, { replace: true })}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <label>
            Email or Username
            <input
              className="ark-login-input"
              type="text"
              name="identifier"
              autoComplete="username"
              value={form.identifier}
              onChange={updateField}
              placeholder="Email or username"
              required
            />
          </label>

          <label>
            Password
            <input
              className="ark-login-input"
              type="password"
              name="password"
              autoComplete="current-password"
              value={form.password}
              onChange={updateField}
              placeholder="Password"
              required
            />
          </label>

          <button className="ark-login-button" type="submit" disabled={submitting}>
            <LogIn size={16} />
            {submitting ? 'Logging in...' : 'Login'}
          </button>

          {role === 'admin' && (
            <p className="ark-login-note">
              New admin? <span>Registration remains handled by the backend admin flow.</span>
            </p>
          )}
          {role === 'student' && (
            <p className="ark-login-note">
              Admin portal? <Link to="/admin/login">Switch to admin login</Link>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
