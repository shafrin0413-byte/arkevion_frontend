import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, CheckSquare, Clock, CalendarOff, TrendingUp,
  ChevronRight, Plus, Trash2, BarChart2,
} from 'lucide-react';
import { adminPortalAPI } from '../../api';
import { useAuth } from '../../auth/AuthContext';
import AppShell from '../../components/layout/AppShell';
import '../auth/portal.css';

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

function StatCard({ icon, bg, color, value, label }) {
  return (
    <div className="mob-stat-card">
      <span className="mob-stat-card__icon" style={{ background: bg, color }}>{icon}</span>
      <strong className="mob-stat-card__val">{value}</strong>
      <span className="mob-stat-card__lbl">{label}</span>
    </div>
  );
}

/* ─── main ───────────────────────────────────────────────────── */
export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate   = useNavigate();
  const [active, setActive]       = useState('dashboard');
  const [data,   setData]         = useState(null);
  const [loading, setLoading]     = useState(true);
  const [message, setMessage]     = useState('');
  const [studentForm, setStudentForm] = useState({
    full_name: '', email: '', password: '', phone: '', college: '', domain: '', is_active: true,
  });
  const [taskForm, setTaskForm] = useState({
    title: '', description: '', assign_to: '__all__', due_date: '',
  });

  const loadPortal = async () => {
    const res = await adminPortalAPI.getPortal();
    setData(res.data);
    setStudentForm(f => ({ ...f, domain: res.data.students[0]?.domain_id || '' }));
  };

  useEffect(() => { loadPortal().finally(() => setLoading(false)); }, []);

  const studentOptions = useMemo(() => data?.students || [], [data]);

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
          <p>Loading admin portal…</p>
        </div>
      </div>
    );
  }

  return (
    <AppShell
      role="admin"
      active={active}
      setActive={setActive}
      userName={data.admin.full_name}
      pill={`${data.admin.assigned_domain} Admin`}
    >
      <div className="mob-page" style={{ animation: 'mobFadeUp .3s ease both' }}>
        {message && <div className="mob-alert">{message}</div>}

        {/* ══ DASHBOARD ══ */}
        {active === 'dashboard' && (
          <>
            <div className="mob-greet">
              <div>
                <p className="mob-greet__sub">Admin Panel</p>
                <h1 className="mob-greet__name">{data.admin.full_name?.split(' ')[0]}</h1>
              </div>
            </div>

            <div className="mob-stats">
              <StatCard icon={<Users size={17}/>}      bg="#e0fdf4" color="#0f766e"
                value={data.summary.student_count}      label="Students" />
              <StatCard icon={<CheckSquare size={17}/>} bg="#fef9c3" color="#854d0e"
                value={data.summary.task_count}          label="Tasks" />
              <StatCard icon={<CalendarOff size={17}/>} bg="#fee2e2" color="#991b1b"
                value={data.summary.pending_leave_count} label="Pending Leaves" />
            </div>

            <div className="mob-card">
              <div className="mob-card__head">
                <span className="mob-card__title">Recent Tasks</span>
                <button className="mob-link" onClick={() => setActive('tasks')}>
                  View all <ChevronRight size={14}/>
                </button>
              </div>
              <div className="mob-task-list">
                {data.recent_tasks.slice(0, 5).map(t => (
                  <div className="mob-task-row" key={t.id}>
                    <span className="mob-task-title">{t.title}</span>
                    <Badge value={t.status} label={t.status_display} />
                  </div>
                ))}
                {!data.recent_tasks.length && <p className="mob-muted">No tasks yet.</p>}
              </div>
            </div>

            <div className="mob-card">
              <div className="mob-card__head">
                <span className="mob-card__title">Leave Requests</span>
                <button className="mob-link" onClick={() => setActive('leaves')}>
                  Review <ChevronRight size={14}/>
                </button>
              </div>
              <div className="mob-task-list">
                {data.recent_leaves.slice(0, 5).map(l => (
                  <div className="mob-task-row" key={l.id}>
                    <span className="mob-task-title">{l.student_name}</span>
                    <Badge value={l.status} label={l.status_display} />
                  </div>
                ))}
                {!data.recent_leaves.length && <p className="mob-muted">No leave requests.</p>}
              </div>
            </div>
          </>
        )}

        {/* ══ STUDENTS ══ */}
        {active === 'students' && (
          <>
            <div className="mob-greet">
              <div><p className="mob-greet__sub">Management</p><h1 className="mob-greet__name">Students</h1></div>
              <span className="mob-badge mob-badge--complete">{data.students.length} Total</span>
            </div>

            <form className="mob-card mob-form" onSubmit={e => {
              e.preventDefault();
              runAction(() => adminPortalAPI.createStudent(studentForm), 'Student added successfully.');
            }}>
              <span className="mob-card__title">Add Student</span>
              <label className="mob-label">Full Name
                <input className="mob-input" value={studentForm.full_name}
                  onChange={e => setStudentForm({ ...studentForm, full_name: e.target.value })} required />
              </label>
              <label className="mob-label">Email
                <input className="mob-input" type="email" value={studentForm.email}
                  onChange={e => setStudentForm({ ...studentForm, email: e.target.value })} required />
              </label>
              <label className="mob-label">Password
                <input className="mob-input" type="password" value={studentForm.password}
                  onChange={e => setStudentForm({ ...studentForm, password: e.target.value })} required />
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <label className="mob-label">Phone
                  <input className="mob-input" value={studentForm.phone}
                    onChange={e => setStudentForm({ ...studentForm, phone: e.target.value })} />
                </label>
                <label className="mob-label">College
                  <input className="mob-input" value={studentForm.college}
                    onChange={e => setStudentForm({ ...studentForm, college: e.target.value })} />
                </label>
              </div>
              <button className="mob-btn mob-btn--primary mob-btn--full" type="submit">
                <Plus size={16}/> Add Student
              </button>
            </form>

            <div className="mob-card">
              <span className="mob-card__title">All Students</span>
              <div className="mob-history" style={{ marginTop: 12 }}>
                {data.students.map(s => (
                  <div className="mob-history-row" key={s.id}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{s.full_name}</p>
                      <p style={{ margin: '2px 0 0', fontSize: 11, color: '#64748b' }}>{s.email}</p>
                    </div>
                    <Badge value={s.is_active ? 'complete' : 'hold'} label={s.is_active ? 'Active' : 'Off'} />
                    <button className="mob-icon-act mob-icon-act--danger"
                      onClick={() => runAction(() => adminPortalAPI.deleteStudent(s.id), 'Student deleted.')}>
                      <Trash2 size={14}/>
                    </button>
                  </div>
                ))}
                {!data.students.length && <p className="mob-muted">No students found.</p>}
              </div>
            </div>
          </>
        )}

        {/* ══ TASKS ══ */}
        {active === 'tasks' && (
          <>
            <div className="mob-greet">
              <div><p className="mob-greet__sub">Management</p><h1 className="mob-greet__name">Tasks</h1></div>
              <span className="mob-badge mob-badge--progress">{data.tasks.length} Total</span>
            </div>

            <form className="mob-card mob-form" onSubmit={e => {
              e.preventDefault();
              runAction(() => adminPortalAPI.createTask(taskForm), 'Task created and assigned.');
            }}>
              <span className="mob-card__title">Create Task</span>
              <label className="mob-label">Title
                <input className="mob-input" value={taskForm.title}
                  onChange={e => setTaskForm({ ...taskForm, title: e.target.value })} required />
              </label>
              <label className="mob-label">Description
                <textarea className="mob-input" rows="3" value={taskForm.description}
                  onChange={e => setTaskForm({ ...taskForm, description: e.target.value })} required />
              </label>
              <label className="mob-label">Assign To
                <select className="mob-input" value={taskForm.assign_to}
                  onChange={e => setTaskForm({ ...taskForm, assign_to: e.target.value })}>
                  <option value="__all__">All Students</option>
                  {studentOptions.map(s => <option key={s.id} value={s.id}>{s.full_name}</option>)}
                </select>
              </label>
              <label className="mob-label">Due Date
                <input className="mob-input" type="date" value={taskForm.due_date}
                  onChange={e => setTaskForm({ ...taskForm, due_date: e.target.value })} />
              </label>
              <button className="mob-btn mob-btn--primary mob-btn--full" type="submit">
                <Plus size={16}/> Save Task
              </button>
            </form>

            <div className="mob-card">
              <span className="mob-card__title">All Tasks</span>
              <div className="mob-history" style={{ marginTop: 12 }}>
                {data.tasks.map(t => (
                  <div className="mob-history-row" key={t.id}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{t.title}</p>
                      <p style={{ margin: '2px 0 0', fontSize: 11, color: '#64748b' }}>
                        {t.assigned_to_display} {t.due_date ? `· Due ${fmtDate(t.due_date)}` : ''}
                      </p>
                    </div>
                    <Badge value={t.status} label={t.status_display} />
                    <button className="mob-icon-act mob-icon-act--danger"
                      onClick={() => runAction(() => adminPortalAPI.deleteTask(t.id), 'Task deleted.')}>
                      <Trash2 size={14}/>
                    </button>
                  </div>
                ))}
                {!data.tasks.length && <p className="mob-muted">No tasks yet.</p>}
              </div>
            </div>
          </>
        )}

        {/* ══ ATTENDANCE ══ */}
        {active === 'attendance' && (
          <>
            <div className="mob-greet">
              <div><p className="mob-greet__sub">Monitoring</p><h1 className="mob-greet__name">Attendance</h1></div>
            </div>

            <div className="mob-stats mob-stats--2">
              <StatCard icon={<Clock size={17}/>}      bg="#e0fdf4" color="#0f766e"
                value={data.attendance.filter(a => a.status === 'present').length} label="Present Today" />
              <StatCard icon={<TrendingUp size={17}/>} bg="#fee2e2" color="#991b1b"
                value={data.attendance.filter(a => a.status === 'absent').length}  label="Absent Today" />
            </div>

            <div className="mob-card">
              <span className="mob-card__title">Records</span>
              <div className="mob-history" style={{ marginTop: 12 }}>
                {data.attendance.map((row, i) => (
                  <div className="mob-history-row" key={i}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{row.student_name}</p>
                      <p style={{ margin: '2px 0 0', fontSize: 11, color: '#64748b' }}>
                        {fmtDate(row.date)} · {fmtTime(row.check_in_time)} – {fmtTime(row.check_out_time)}
                        {row.worked_hours ? ` · ${row.worked_hours}` : ''}
                      </p>
                    </div>
                    <Badge value={row.status} label={row.status_display} />
                  </div>
                ))}
                {!data.attendance.length && <p className="mob-muted">No attendance records.</p>}
              </div>
            </div>
          </>
        )}

        {/* ══ LEAVES ══ */}
        {active === 'leaves' && (
          <>
            <div className="mob-greet">
              <div><p className="mob-greet__sub">Approval</p><h1 className="mob-greet__name">Leaves</h1></div>
              <span className="mob-badge mob-badge--pending">
                {data.leaves.filter(l => l.status === 'pending').length} Pending
              </span>
            </div>

            <div className="mob-card">
              <span className="mob-card__title">All Requests</span>
              <div className="mob-history" style={{ marginTop: 12 }}>
                {data.leaves.map(l => (
                  <div key={l.id} style={{ padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{l.student_name}</p>
                        <p style={{ margin: '2px 0 0', fontSize: 11, color: '#64748b' }}>
                          {l.leave_type_display} · {fmtDate(l.start_date)} → {fmtDate(l.end_date)}
                        </p>
                      </div>
                      <Badge value={l.status} label={l.status_display} />
                    </div>
                    {l.status === 'pending' && (
                      <div className="mob-btn-row" style={{ justifyContent: 'flex-start', marginTop: 8 }}>
                        <button className="mob-btn mob-btn--primary" style={{ padding: '8px 16px', fontSize: 12 }}
                          onClick={() => runAction(() => adminPortalAPI.reviewLeave(l.id, 'approve'), 'Leave approved.')}>
                          Approve
                        </button>
                        <button className="mob-btn mob-btn--danger" style={{ padding: '8px 16px', fontSize: 12 }}
                          onClick={() => runAction(() => adminPortalAPI.reviewLeave(l.id, 'reject'), 'Leave rejected.')}>
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {!data.leaves.length && <p className="mob-muted">No leave requests.</p>}
              </div>
            </div>
          </>
        )}

        {/* ══ REPORTS ══ */}
        {active === 'reports' && (
          <>
            <div className="mob-greet">
              <div><p className="mob-greet__sub">Analytics</p><h1 className="mob-greet__name">Reports</h1></div>
            </div>
            <div className="mob-stats">
              <StatCard icon={<Users size={17}/>}      bg="#e0fdf4" color="#0f766e"
                value={data.summary.student_count}      label="Students" />
              <StatCard icon={<CheckSquare size={17}/>} bg="#fef9c3" color="#854d0e"
                value={data.summary.task_count}          label="Tasks" />
              <StatCard icon={<CalendarOff size={17}/>} bg="#fee2e2" color="#991b1b"
                value={data.summary.pending_leave_count} label="Leaves" />
            </div>
            <div className="mob-card">
              <div className="mob-card__head">
                <span className="mob-card__title">Attendance Overview</span>
                <button className="mob-link" onClick={() => setActive('attendance')}>See all <ChevronRight size={14}/></button>
              </div>
              <div className="mob-task-list">
                {data.attendance.slice(0, 6).map((row, i) => (
                  <div className="mob-task-row" key={i}>
                    <span className="mob-task-title">{row.student_name}</span>
                    <Badge value={row.status} label={row.status_display} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ══ MENTORS ══ */}
        {active === 'mentors' && (
          <>
            <div className="mob-greet">
              <div><p className="mob-greet__sub">Team</p><h1 className="mob-greet__name">Mentors</h1></div>
            </div>
            <div className="mob-card">
              <span className="mob-card__title">Domain Mentor</span>
              <div className="mob-session-grid" style={{ marginTop: 12 }}>
                <div className="mob-session-item"><span className="mob-session-item__label">Name</span><span className="mob-session-item__value">{data.admin.full_name}</span></div>
                <div className="mob-session-item"><span className="mob-session-item__label">Domain</span><span className="mob-session-item__value">{data.admin.assigned_domain}</span></div>
                <div className="mob-session-item" style={{ gridColumn: '1 / -1' }}><span className="mob-session-item__label">Email</span><span className="mob-session-item__value" style={{ fontSize: 13 }}>{data.admin.email}</span></div>
              </div>
              <p className="mob-muted" style={{ marginTop: 12, fontSize: 12 }}>Mentor assignments are domain-admin based.</p>
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
