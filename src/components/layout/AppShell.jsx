import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu, X, Bell, LogOut, LayoutDashboard,
  Users, CheckSquare, Clock, Award, CalendarOff, BarChart2,
  UserCog, User,
} from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import './appshell.css';

const STUDENT_NAV = [
  { key: 'dashboard',     Icon: LayoutDashboard, label: 'Home'       },
  { key: 'tasks',         Icon: CheckSquare,     label: 'Tasks'      },
  { key: 'attendance',    Icon: Clock,           label: 'Attendance' },
  { key: 'results',       Icon: Award,           label: 'Results'    },
  { key: 'profile',       Icon: User,            label: 'Profile'    },
];

const STUDENT_DRAWER = [
  { key: 'dashboard',     Icon: LayoutDashboard, label: 'Dashboard'      },
  { key: 'tasks',         Icon: CheckSquare,     label: 'Tasks'          },
  { key: 'attendance',    Icon: Clock,           label: 'Attendance'     },
  { key: 'leave',         Icon: CalendarOff,     label: 'Leave Requests' },
  { key: 'results',       Icon: Award,           label: 'Results'        },
  { key: 'notifications', Icon: Bell,            label: 'Notifications'  },
  { key: 'profile',       Icon: User,            label: 'Profile'        },
];

const ADMIN_NAV = [
  { key: 'dashboard',  Icon: LayoutDashboard, label: 'Home'       },
  { key: 'students',   Icon: Users,           label: 'Students'   },
  { key: 'tasks',      Icon: CheckSquare,     label: 'Tasks'      },
  { key: 'attendance', Icon: Clock,           label: 'Attendance' },
  { key: 'leaves',     Icon: CalendarOff,     label: 'Leaves'     },
];

const ADMIN_DRAWER = [
  { key: 'dashboard',     Icon: LayoutDashboard, label: 'Dashboard'      },
  { key: 'students',      Icon: Users,           label: 'Students'       },
  { key: 'tasks',         Icon: CheckSquare,     label: 'Tasks'          },
  { key: 'attendance',    Icon: Clock,           label: 'Attendance'     },
  { key: 'leaves',        Icon: CalendarOff,     label: 'Leave Approval' },
  { key: 'reports',       Icon: BarChart2,       label: 'Reports'        },
  { key: 'mentors',       Icon: UserCog,         label: 'Mentors'        },
  { key: 'notifications', Icon: Bell,            label: 'Notifications'  },
];

export default function AppShell({ role, active, setActive, userName, pill, children }) {
  const { logout } = useAuth();
  const navigate   = useNavigate();
  const [drawerOpen,  setDrawerOpen]  = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const bottomNav = role === 'admin' ? ADMIN_NAV    : STUDENT_NAV;
  const drawerNav = role === 'admin' ? ADMIN_DRAWER : STUDENT_DRAWER;
  const loginPath = role === 'admin' ? '/admin/login' : '/student/login';

  const askLogout  = () => { setDrawerOpen(false); setConfirmOpen(true); };
  const doLogout   = () => { logout(); navigate(loginPath, { replace: true }); };
  const go = key  => { setActive(key); setDrawerOpen(false); };

  return (
    <div className="shell">

      {/* ══ DESKTOP SIDEBAR (hidden on mobile via CSS) ══ */}
      <aside className="shell-sidebar">
        {/* sidebar header */}
        <div className="shell-sidebar__brand">
          <img src="/Arkevion_logo.png" alt="Arkevion" className="shell-sidebar__logo" />
        </div>

        {/* user info */}
        <div className="shell-sidebar__user">
          <div className="shell-sidebar__avatar">
            {userName?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="shell-sidebar__user-info">
            <p className="shell-sidebar__user-name">{userName}</p>
            <p className="shell-sidebar__user-role">{role === 'admin' ? 'Administrator' : 'Intern'}</p>
          </div>
        </div>

        {/* nav items */}
        <nav className="shell-sidebar__nav">
          <p className="shell-sidebar__section-label">Navigation</p>
          {drawerNav.map(({ key, Icon, label }) => (
            <button
              key={key}
              className={`shell-sidebar__item${active === key ? ' active' : ''}`}
              onClick={() => go(key)}
            >
              <span className="shell-sidebar__item-icon"><Icon size={18} /></span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* logout */}
        <div className="shell-sidebar__footer">
          <button className="shell-sidebar__item shell-sidebar__item--danger" onClick={askLogout}>
            <span className="shell-sidebar__item-icon"><LogOut size={18} /></span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ══ RIGHT COLUMN ══ */}
      <div className="shell-body">

        {/* ── top header ── */}
        <header className="shell-header">
          <img src="/Arkevion_logo.png" alt="Arkevion" className="shell-header__logo-mobile" />
          <div className="shell-header__center">
            {pill && <span className="shell-pill">{pill}</span>}
          </div>
          <div className="shell-header__actions">
            <button className="shell-icon-btn" onClick={() => go('notifications')} aria-label="Notifications">
              <Bell size={20} />
            </button>
            {/* hamburger — mobile only */}
            <button className="shell-icon-btn shell-hamburger" onClick={() => setDrawerOpen(true)} aria-label="Menu">
              <Menu size={22} />
            </button>
          </div>
        </header>

        {/* ── page content ── */}
        <main className="shell-main">
          {children}
        </main>
      </div>

      {/* ══ MOBILE DRAWER ══ */}
      {drawerOpen && (
        <div className="shell-overlay" onClick={() => setDrawerOpen(false)}>
          <nav className="shell-drawer" onClick={e => e.stopPropagation()} aria-label="Navigation">
            <div className="shell-drawer__top">
              <div className="shell-drawer__user">
                <div className="shell-drawer__avatar">
                  {userName?.[0]?.toUpperCase() || '?'}
                </div>
                <div>
                  <p className="shell-drawer__name">{userName}</p>
                  <p className="shell-drawer__role">{role === 'admin' ? 'Administrator' : 'Intern'}</p>
                </div>
              </div>
              <button className="shell-icon-btn" onClick={() => setDrawerOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="shell-drawer__nav">
              {drawerNav.map(({ key, Icon, label }) => (
                <button
                  key={key}
                  className={`shell-drawer__item${active === key ? ' active' : ''}`}
                  onClick={() => go(key)}
                >
                  <span className="shell-drawer__item-icon"><Icon size={18} /></span>
                  {label}
                </button>
              ))}
            </div>

            <div className="shell-drawer__footer">
              <button className="shell-drawer__item shell-drawer__item--danger" onClick={askLogout}>
                <span className="shell-drawer__item-icon"><LogOut size={18} /></span>
                Logout
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* ══ BOTTOM NAV (mobile only) ══ */}
      <nav className="shell-bottom-nav" aria-label="Bottom navigation">
        {bottomNav.map(({ key, Icon, label }) => (
          <button
            key={key}
            className={`shell-bottom-nav__item${active === key ? ' active' : ''}`}
            onClick={() => go(key)}
          >
            <Icon size={21} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* ══ LOGOUT CONFIRMATION MODAL ══ */}
      {confirmOpen && (
        <div className="shell-confirm-overlay" onClick={() => setConfirmOpen(false)}>
          <div className="shell-confirm" onClick={e => e.stopPropagation()}>
            <div className="shell-confirm__icon">
              <LogOut size={28} />
            </div>
            <h3 className="shell-confirm__title">Sign out?</h3>
            <p className="shell-confirm__sub">You'll need to log in again to access your dashboard.</p>
            <div className="shell-confirm__actions">
              <button className="shell-confirm__cancel" onClick={() => setConfirmOpen(false)}>Cancel</button>
              <button className="shell-confirm__ok" onClick={doLogout}>Yes, sign out</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
