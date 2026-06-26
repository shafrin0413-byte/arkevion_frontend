import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckSquare, Clock, TrendingUp, ChevronRight,
  Timer, Percent, BookOpen, CalendarOff, Coffee,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { studentPortalAPI } from '../../api';
import { useAuth } from '../../auth/AuthContext';
import AppShell from '../../components/layout/AppShell';
import '../auth/portal.css';

/* ─── quick links ────────────────────────────────────────────── */
const QUICK = [
  { key: 'tasks',         Icon: CheckSquare,  label: 'My Tasks',   bg: '#e0fdf4', color: '#0f766e' },
  { key: 'attendance',    Icon: Clock,        label: 'Attendance', bg: '#fef9c3', color: '#854d0e' },
  { key: 'leave',         Icon: CalendarOff,  label: 'Leave',      bg: '#fee2e2', color: '#991b1b' },
  { key: 'results',       Icon: TrendingUp,   label: 'Results',    bg: '#ede9fe', color: '#5b21b6' },
  { key: 'notifications', Icon: Timer,        label: 'Alerts',     bg: '#e0f2fe', color: '#075985' },
  { key: 'profile',       Icon: BookOpen,     label: 'Profile',    bg: '#fce7f3', color: '#9d174d' },
];

const STATUS_OPTIONS = [
  ['progress', 'Progress'],
  ['hold',     'Hold'    ],
  ['complete', 'Complete'],
];

/* ─── helpers ────────────────────────────────────────────────── */
function Badge({ value, label }) {
  return <span className={`mob-badge mob-badge--${value}`}>{label}</span>;
}

function fmtDate(str) {
  if (!str) return '—';
  return new Date(str).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function fmtTime(str) {
  if (!str) return '—';
  const [h, m] = str.split(':');
  const hr = parseInt(h, 10);
  return `${hr % 12 || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}`;
}

function useLiveTimer(checkInTime, isActive) {
  const [elapsed, setElapsed] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (!isActive || !checkInTime) { setElapsed(0); return; }
    const base = new Date();
    const [h, m, s] = checkInTime.split(':').map(Number);
    base.setHours(h, m, s, 0);
    const tick = () => setElapsed(Math.max(0, Math.floor((Date.now() - base.getTime()) / 1000)));
    tick();
    ref.current = setInterval(tick, 1000);
    return () => clearInterval(ref.current);
  }, [isActive, checkInTime]);
  const hh = String(Math.floor(elapsed / 3600)).padStart(2, '0');
  const mm = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

function StatCard({ icon, bg, color, value, label }) {
  return (
    <div className="mob-stat-card">
      <span className="mob-stat-card__icon" style={{ background: bg, color }}>{icon}</span>
      <strong className="mob-stat-card__val">{value}</strong>
      <span className="mob-stat-card__lbl">{label}</span>
    </div>
  );
}

function SessionItem({ label, value }) {
  return (
    <div className="mob-session-item">
      <span className="mob-session-item__label">{label}</span>
      <span className="mob-session-item__value">{value}</span>
    </div>
  );
}

/* ─── main ───────────────────────────────────────────────────── */
export default function StudentDashboard() {
  const { logout } = useAuth();
  const navigate   = useNavigate();
  const [active, setActive]       = useState('dashboard');
  const [data,   setData]         = useState(null);
  const [loading, setLoading]     = useState(true);
  const [message, setMessage]     = useState('');
  const [leaveForm, setLeaveForm] = useState({ leave_type: 'sick', start_date: '', end_date: '', reason: '' });
  const [profileForm, setProfileForm] = useState({ full_name: '', email: '', phone: '', college: '' });

  const loadPortal = async () => {
    const res = await studentPortalAPI.getPortal();
    setData(res.data);
    setProfileForm({
      full_name: res.data.student.full_name || '',
      email:     res.data.student.email     || '',
      phone:     res.data.student.phone     || '',
      college:   res.data.student.college   || '',
    });
  };

  useEffect(() => { loadPortal().finally(() => setLoading(false)); }, []);

  const att         = data?.today_attendance ?? {};
  const isCheckedIn = att.status === 'present' && att.check_in_time && !att.check_out_time;
  const timer       = useLiveTimer(att.check_in_time, isCheckedIn);
  const currentTask = useMemo(
    () => data?.tasks?.find(t => t.status !== 'complete') || data?.tasks?.[0],
    [data]
  );

  const totalTasks   = data?.tasks?.length || 0;
  const doneTasks    = data?.summary?.complete_tasks || 0;
  const taskPct      = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const dailyGoalHrs = 8;
  const workedDec    = parseFloat(att.worked_hours) || 0;
  const dailyPct     = Math.min(100, Math.round((workedDec / dailyGoalHrs) * 100));

  const runAction = async (action, success) => {
    setMessage('');
    await action();
    await loadPortal();
    setMessage(success);
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="mob-shell mob-shell--loading">
        <div className="mob-loader">
          <span className="mob-loader__ring" />
          <p>Loading portal…</p>
        </div>
      </div>
    );
  }

  return (
    <AppShell
      role="student"
      active={active}
      setActive={setActive}
      userName={data.student.full_name}
      pill={`${data.student.domain} Intern`}
    >
      <div className="mob-page">
        {message && <div className="mob-alert">{message}</div>}

        {/* ══ DASHBOARD ══ */}
        {active === 'dashboard' && (
          <>
            <div className="mob-greet">
              <div>
                <p className="mob-greet__sub">Good day 👋</p>
                <h1 className="mob-greet__name">{data.student.full_name?.split(' ')[0]}</h1>
              </div>
              <Badge value={att.status} label={att.status_display} />
            </div>

            <div className="mob-stats">
              <StatCard icon={<CheckSquare size={18}/>} bg="#e0fdf4" color="#0f766e"
                value={data.summary.complete_tasks}   label="Completed" />
              <StatCard icon={<TrendingUp size={18}/>}  bg="#fef9c3" color="#854d0e"
                value={data.summary.progress_tasks}   label="In Progress" />
              <StatCard icon={<Timer size={18}/>}        bg="#ede9fe" color="#5b21b6"
                value={att.worked_hours || '0h'}       label="Hours Today" />
            </div>

            <div className="mob-card">
              <div className="mob-card__head">
                <span className="mob-card__title">Task Progress</span>
                <button className="mob-link" onClick={() => setActive('tasks')}>
                  View all <ChevronRight size={14}/>
                </button>
              </div>
              <div className="mob-progress-wrap">
                <div className="mob-progress-bar">
                  <div className="mob-progress-fill" style={{ width: `${taskPct}%` }} />
                </div>
                <span className="mob-progress-pct">{taskPct}%</span>
              </div>
              <p className="mob-card__sub">{doneTasks} of {totalTasks} tasks completed</p>
              <div className="mob-task-list">
                {data.tasks.slice(0, 3).map(t => (
                  <div className="mob-task-row" key={t.id}>
                    <span className="mob-task-title">{t.title}</span>
                    <Badge value={t.status} label={t.status_display} />
                  </div>
                ))}
                {!data.tasks.length && <p className="mob-muted">No tasks assigned yet.</p>}
              </div>
            </div>

            <div className="mob-card">
              <div className="mob-card__head">
                <span className="mob-card__title">Attendance Overview</span>
                <button className="mob-link" onClick={() => setActive('attendance')}>
                  Open <ChevronRight size={14}/>
                </button>
              </div>
              <div className="mob-att-row">
                <div className="mob-att-stat">
                  <span className="mob-att-stat__icon"><Timer size={16}/></span>
                  <span className="mob-att-stat__val">{att.worked_hours || '—'}</span>
                  <span className="mob-att-stat__lbl">Worked Today</span>
                </div>
                <div className="mob-att-stat">
                  <span className="mob-att-stat__icon"><Percent size={16}/></span>
                  <span className="mob-att-stat__val">{data.attendance_percentage}%</span>
                  <span className="mob-att-stat__lbl">Attendance</span>
                </div>
                <div className="mob-att-stat">
                  <span className="mob-att-stat__icon"><BookOpen size={16}/></span>
                  <span className="mob-att-stat__val">{data.mentor?.full_name?.split(' ')[0] || '—'}</span>
                  <span className="mob-att-stat__lbl">Mentor</span>
                </div>
              </div>
            </div>

            <div className="mob-card">
              <span className="mob-card__title">Quick Links</span>
              <div className="mob-quick-grid">
                {QUICK.map(({ key, Icon, label, bg, color }) => (
                  <button key={key} className="mob-quick-btn" onClick={() => setActive(key)}>
                    <span className="mob-quick-icon" style={{ background: bg, color }}><Icon size={20}/></span>
                    <span className="mob-quick-label">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ══ ATTENDANCE ══ */}
        {active === 'attendance' && (
          <>
            <div className="mob-greet">
              <div><p className="mob-greet__sub">Daily Session</p><h1 className="mob-greet__name">Attendance</h1></div>
              <Badge value={att.status} label={att.status_display} />
            </div>

            <div className={`mob-card mob-timer-card${isCheckedIn ? ' mob-timer-card--active' : ''}`}>
              {isCheckedIn ? (
                <>
                  <p className="mob-timer-label">Working Since</p>
                  <div className="mob-timer-display">{timer}</div>
                  <p className="mob-timer-since">Checked in at {fmtTime(att.check_in_time)}</p>
                  <div className="mob-daily-wrap">
                    <span className="mob-daily-label">Daily Goal ({dailyGoalHrs}h)</span>
                    <div className="mob-progress-bar mob-progress-bar--slim">
                      <div className="mob-progress-fill" style={{ width: `${dailyPct}%` }} />
                    </div>
                    <span className="mob-progress-pct">{dailyPct}%</span>
                  </div>
                  <div className="mob-btn-row">
                    <button className="mob-btn mob-btn--outline"
                      onClick={() => runAction(studentPortalAPI.checkOut, 'Break started.')}>
                      <Coffee size={16}/> Break
                    </button>
                    <button className="mob-btn mob-btn--danger"
                      onClick={() => runAction(studentPortalAPI.checkOut, 'Checked out successfully.')}>
                      Check Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mob-timer-label">Not checked in yet</p>
                  <div className="mob-timer-display mob-timer-display--idle">00:00:00</div>
                  <button className="mob-btn mob-btn--primary mob-btn--full"
                    onClick={() => runAction(studentPortalAPI.checkIn, 'Checked in successfully.')}>
                    Check In
                  </button>
                </>
              )}
            </div>

            <div className="mob-card">
              <span className="mob-card__title">Session Details</span>
              <div className="mob-session-grid">
                <SessionItem label="Date"        value={fmtDate(att.date)} />
                <SessionItem label="Check In"    value={fmtTime(att.check_in_time)} />
                <SessionItem label="Check Out"   value={fmtTime(att.check_out_time)} />
                <SessionItem label="Total Hours" value={att.worked_hours || '—'} />
              </div>
            </div>

            <div className="mob-stats mob-stats--2">
              <StatCard icon={<Timer size={18}/>}   bg="#e0fdf4" color="#0f766e"
                value={att.worked_hours || '0h'} label="Hours Today" />
              <StatCard icon={<Percent size={18}/>} bg="#fef9c3" color="#854d0e"
                value={`${data.attendance_percentage}%`} label="Attendance %" />
            </div>

            {data.attendance_history?.length > 0 && (
              <div className="mob-card">
                <span className="mob-card__title">History</span>
                <div className="mob-history">
                  {data.attendance_history.map((row, i) => (
                    <div className="mob-history-row" key={i}>
                      <div className="mob-history-date">{fmtDate(row.date)}</div>
                      <div className="mob-history-times">
                        <span>In: {fmtTime(row.check_in_time)}</span>
                        <span>Out: {fmtTime(row.check_out_time)}</span>
                        <span>{row.worked_hours}</span>
                      </div>
                      <Badge value={row.status} label={row.status_display} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ══ TASKS ══ */}
        {active === 'tasks' && (
          <>
            <div className="mob-greet">
              <div><p className="mob-greet__sub">Assigned Work</p><h1 className="mob-greet__name">Tasks</h1></div>
              <div className="mob-badge-row">
                <Badge value="complete" label={`${data.summary.complete_tasks} Done`} />
                <Badge value="progress" label={`${data.summary.progress_tasks} WIP`} />
              </div>
            </div>
            {data.tasks.map(task => (
              <div className="mob-card mob-task-card" key={task.id}>
                <div className="mob-task-card__head">
                  <span className="mob-task-card__title">{task.title}</span>
                  <select
                    className={`mob-status-sel mob-status-sel--${task.status}`}
                    value={task.status}
                    onChange={e => runAction(
                      () => studentPortalAPI.updateTaskStatus(task.id, { status: e.target.value }),
                      'Task updated.'
                    )}
                  >
                    {STATUS_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
                {task.description && <p className="mob-task-card__desc">{task.description}</p>}
                {task.due_date    && <p className="mob-task-card__due">Due: {fmtDate(task.due_date)}</p>}
              </div>
            ))}
            {!data.tasks.length && <div className="mob-card"><p className="mob-muted">No tasks assigned yet.</p></div>}
          </>
        )}

        {/* ══ LEAVE ══ */}
        {active === 'leave' && (
          <>
            <div className="mob-greet">
              <div><p className="mob-greet__sub">Time Off</p><h1 className="mob-greet__name">Leave</h1></div>
            </div>
            <form className="mob-card mob-form" onSubmit={e => {
              e.preventDefault();
              runAction(() => studentPortalAPI.submitLeave(leaveForm), 'Leave submitted.');
            }}>
              <span className="mob-card__title">New Request</span>
              <label className="mob-label">Leave Type
                <select className="mob-input" value={leaveForm.leave_type}
                  onChange={e => setLeaveForm({ ...leaveForm, leave_type: e.target.value })}>
                  <option value="sick">Sick Leave</option>
                  <option value="casual">Casual Leave</option>
                  <option value="emergency">Emergency Leave</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="mob-label">Start Date
                <input className="mob-input" type="date" value={leaveForm.start_date}
                  onChange={e => setLeaveForm({ ...leaveForm, start_date: e.target.value })} required />
              </label>
              <label className="mob-label">End Date
                <input className="mob-input" type="date" value={leaveForm.end_date}
                  onChange={e => setLeaveForm({ ...leaveForm, end_date: e.target.value })} required />
              </label>
              <label className="mob-label">Reason
                <textarea className="mob-input" rows="3" value={leaveForm.reason}
                  onChange={e => setLeaveForm({ ...leaveForm, reason: e.target.value })} required />
              </label>
              <button className="mob-btn mob-btn--primary mob-btn--full" type="submit">Submit Request</button>
            </form>
            <div className="mob-card">
              <span className="mob-card__title">My Requests</span>
              {data.leaves.map(l => (
                <div className="mob-history-row" key={l.id}>
                  <div className="mob-history-date">{l.leave_type_display}</div>
                  <div className="mob-history-times">
                    <span>{fmtDate(l.start_date)} → {fmtDate(l.end_date)}</span>
                  </div>
                  <Badge value={l.status} label={l.status_display} />
                </div>
              ))}
              {!data.leaves.length && <p className="mob-muted">No requests yet.</p>}
            </div>
          </>
        )}

        {/* ══ PROFILE ══ */}
        {active === 'profile' && (
          <>
            <div className="mob-greet">
              <div><p className="mob-greet__sub">My Account</p><h1 className="mob-greet__name">Profile</h1></div>
            </div>
            <form className="mob-card mob-form" onSubmit={e => {
              e.preventDefault();
              runAction(() => studentPortalAPI.updateProfile(profileForm), 'Profile saved.');
            }}>
              <span className="mob-card__title">Edit Details</span>
              {[['full_name','Full Name'],['email','Email'],['phone','Phone'],['college','College']].map(([k, l]) => (
                <label key={k} className="mob-label">{l}
                  <input className="mob-input" value={profileForm[k]}
                    onChange={e => setProfileForm({ ...profileForm, [k]: e.target.value })} />
                </label>
              ))}
              <button className="mob-btn mob-btn--primary mob-btn--full" type="submit">Save Profile</button>
            </form>
            <div className="mob-card">
              <span className="mob-card__title">Internship Details</span>
              <div className="mob-session-grid">
                <SessionItem label="Domain"  value={data.student.domain} />
                <SessionItem label="Mentor"  value={data.mentor?.full_name || '—'} />
                <SessionItem label="Status"  value={data.student.is_active ? 'Active' : 'Inactive'} />
                <SessionItem label="Current Task" value={currentTask?.title || '—'} />
              </div>
            </div>
          </>
        )}

        {/* ══ RESULTS ══ */}
        {active === 'results' && (
          <>
            <div className="mob-greet">
              <div><p className="mob-greet__sub">Performance</p><h1 className="mob-greet__name">Results</h1></div>
            </div>
            <div className="mob-stats">
              <StatCard icon={<CheckSquare size={18}/>} bg="#e0fdf4" color="#0f766e"
                value={data.summary.complete_tasks} label="Completed" />
              <StatCard icon={<TrendingUp size={18}/>}  bg="#fef9c3" color="#854d0e"
                value={data.summary.progress_tasks} label="In Progress" />
              <StatCard icon={<CalendarOff size={18}/>} bg="#fee2e2" color="#991b1b"
                value={data.summary.hold_tasks}     label="On Hold" />
            </div>
            <div className="mob-card">
              <span className="mob-card__title">Summary</span>
              <p className="mob-muted" style={{ marginTop: 8 }}>
                Certificate and scoring details will appear here once evaluation is complete.
              </p>
            </div>
          </>
        )}

        {/* ══ NOTIFICATIONS ══ */}
        {active === 'notifications' && (
          <>
            <div className="mob-greet">
              <div><p className="mob-greet__sub">Updates</p><h1 className="mob-greet__name">Notifications</h1></div>
            </div>
            <div className="mob-card"><p className="mob-muted">No notifications yet.</p></div>
          </>
        )}
      </div>
    </AppShell>
  );
}
