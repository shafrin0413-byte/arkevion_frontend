import { useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import './portal.css';

const CONTENT = {
  student: {
    eyebrow: 'Student Portal',
    heading: 'Track your internship journey',
    subheading: 'Attendance, tasks, leave — all in one place.',
    formTitle: 'Student Login',
    switchText: 'Admin portal?',
    switchLink: '/admin/login',
    switchLabel: 'Switch to Admin',
  },
  admin: {
    eyebrow: 'Admin Portal',
    heading: 'Manage your domain with clarity',
    subheading: 'Students, tasks, attendance and leaves — effortlessly.',
    formTitle: 'Admin Login',
    switchText: 'Student portal?',
    switchLink: '/student/login',
    switchLabel: 'Switch to Student',
  },
};

export default function LoginPage({ role }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { isAuthenticated, login, user } = useAuth();
  const [form, setForm]           = useState({ identifier: '', password: '' });
  const [error, setError]         = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPwd, setShowPwd]     = useState(false);
  const page = CONTENT[role];

  const redirectTo = useMemo(() => {
    const p = location.state?.from?.pathname;
    return p || (role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
  }, [location.state, role]);

  if (isAuthenticated && user?.role === role) return <Navigate to={redirectTo} replace />;

  const update = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const u = await login(role, { email: form.identifier, username: form.identifier, password: form.password });
      navigate(u.role === 'admin' ? '/admin/dashboard' : '/student/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid credentials. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lp-shell">

      {/* ── left text panel (desktop only) ── */}
      <div className="lp-left">
        <span className="lp-left__eyebrow">{page.eyebrow}</span>
        <h1 className="lp-left__heading">{page.heading}</h1>
        <p className="lp-left__sub">{page.subheading}</p>
        <ul className="lp-left__features">
          <li>✦ Real-time attendance tracking</li>
          <li>✦ Task management &amp; progress</li>
          <li>✦ Leave requests &amp; approvals</li>
          <li>✦ Performance insights</li>
        </ul>
      </div>

      {/* ── right form panel ── */}
      <div className="lp-right">
        <div className="lp-right__inner">
          <div className="lp-form-card">
            <h2 className="lp-form-card__title">{page.formTitle}</h2>
            <p className="lp-form-card__sub">Welcome back! Please sign in to continue.</p>

            {error && <div className="lp-error" role="alert">{error}</div>}

            <form onSubmit={handleSubmit} className="lp-form">
              {/* role switcher */}
              <div className="lp-role-tabs">
                <button
                  type="button"
                  className={`lp-role-tab${role === 'student' ? ' active' : ''}`}
                  onClick={() => navigate('/student/login', { replace: true })}
                >
                  Student
                </button>
                <button
                  type="button"
                  className={`lp-role-tab${role === 'admin' ? ' active' : ''}`}
                  onClick={() => navigate('/admin/login', { replace: true })}
                >
                  Admin
                </button>
              </div>

              <div className="lp-field">
                <label className="lp-label" htmlFor="identifier">Email or Username</label>
                <input
                  id="identifier"
                  className="lp-input"
                  type="text"
                  name="identifier"
                  autoComplete="username"
                  value={form.identifier}
                  onChange={update}
                  placeholder="Enter your email or username"
                  required
                />
              </div>

              <div className="lp-field">
                <label className="lp-label" htmlFor="password">Password</label>
                <div className="lp-input-wrap">
                  <input
                    id="password"
                    className="lp-input lp-input--padded"
                    type={showPwd ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    value={form.password}
                    onChange={update}
                    placeholder="Enter your password"
                    required
                  />
                  <button type="button" className="lp-eye" onClick={() => setShowPwd(s => !s)} tabIndex={-1}>
                    {showPwd ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>

              <button className="lp-submit" type="submit" disabled={submitting}>
                {submitting
                  ? <span className="lp-submit__spinner" />
                  : <LogIn size={16} />
                }
                {submitting ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <p className="lp-switch">
              {page.switchText}{' '}
              <Link to={page.switchLink}>{page.switchLabel}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
