import { useEffect, useMemo, useState } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { studentPortalAPI } from '../../api';
import { useAuth } from '../../auth/AuthContext';
import '../auth/portal.css';

const navItems = [
  ['dashboard', 'D', 'Dashboard'],
  ['profile', 'P', 'Profile'],
  ['tasks', 'T', 'Tasks'],
  ['attendance', 'A', 'Attendance'],
  ['results', 'R', 'Results'],
  ['leave', 'L', 'Leave Requests'],
  ['notifications', 'N', 'Notifications'],
];

const statusOptions = [
  ['progress', 'Progress'],
  ['hold', 'Hold'],
  ['complete', 'Complete'],
];

function Badge({ value, label }) {
  return <span className={`ark-badge ${value}`}>{label}</span>;
}

export default function StudentDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('dashboard');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [leaveForm, setLeaveForm] = useState({ leave_type: 'sick', start_date: '', end_date: '', reason: '' });
  const [profileForm, setProfileForm] = useState({ full_name: '', email: '', phone: '', college: '' });

  const loadPortal = async () => {
    const response = await studentPortalAPI.getPortal();
    setData(response.data);
    setProfileForm({
      full_name: response.data.student.full_name || '',
      email: response.data.student.email || '',
      phone: response.data.student.phone || '',
      college: response.data.student.college || '',
    });
  };

  useEffect(() => {
    loadPortal().finally(() => setLoading(false));
  }, []);

  const currentTask = useMemo(() => data?.tasks?.find((task) => task.status !== 'complete') || data?.tasks?.[0], [data]);

  const handleLogout = () => {
    logout();
    navigate('/student/login', { replace: true });
  };

  const runAction = async (action, success) => {
    setMessage('');
    await action();
    await loadPortal();
    setMessage(success);
  };

  if (loading) {
    return <section className="ark-login-shell"><div className="ark-portal-panel"><div className="ark-login-card">Loading student portal...</div></div></section>;
  }

  return (
    <section className="ark-login-shell">
      <div className="ark-dashboard-shell">
        <aside className="ark-side" aria-label="Student navigation">
          {navItems.map(([key, icon, label]) => (
            <button key={key} type="button" className={active === key ? 'active' : ''} onClick={() => setActive(key)}>
              <span aria-hidden="true">{icon}</span> {label}
            </button>
          ))}
          <button type="button" onClick={handleLogout}><span><LogOut size={14} /></span> Logout</button>
        </aside>

        <div className="ark-panel">
          {message && <div className="ark-alert">{message}</div>}

          {active === 'dashboard' && (
            <>
              <div className="ark-page-head">
                <div><span className="ark-eyebrow">{data.student.domain} Internship</span><h1>Dashboard</h1></div>
                <Badge value={data.today_attendance.status} label={data.today_attendance.status_display} />
              </div>
              <div className="ark-stats ark-stats-compact">
                <div className="ark-card ark-stat-card"><strong>{data.summary.complete_tasks}</strong><span>Completed Tasks</span></div>
                <div className="ark-card ark-stat-card"><strong>{data.summary.progress_tasks}</strong><span>In Progress</span></div>
                <div className="ark-card ark-stat-card"><strong>{data.today_attendance.worked_hours}</strong><span>Hours Today</span></div>
              </div>
              <div className="ark-grid-2">
                <div className="ark-card">
                  <div className="ark-card-head"><h2>Task Progress</h2><button className="ark-link-btn" onClick={() => setActive('tasks')}>View tasks</button></div>
                  {data.tasks.slice(0, 4).map((task) => <div className="ark-row" key={task.id}><span>{task.title}</span><Badge value={task.status} label={task.status_display} /></div>)}
                  {!data.tasks.length && <p className="ark-muted">No tasks assigned yet.</p>}
                </div>
                <div className="ark-card">
                  <div className="ark-card-head"><h2>Today's Attendance</h2><button className="ark-link-btn" onClick={() => setActive('attendance')}>Open</button></div>
                  <p><strong>Total Worked Hours:</strong> {data.today_attendance.worked_hours}</p>
                  <p><strong>Attendance Percentage:</strong> {data.attendance_percentage}%</p>
                  <p><strong>Assigned Mentor:</strong> {data.mentor?.full_name || 'Not assigned'}</p>
                  <p><strong>Current Task:</strong> {currentTask?.title || 'No current task'}</p>
                </div>
              </div>
            </>
          )}

          {active === 'attendance' && (
            <>
              <div className="ark-page-head"><div><span className="ark-eyebrow">Daily Session</span><h1>Attendance</h1></div><Badge value={data.today_attendance.status} label={data.today_attendance.status_display} /></div>
              <div className="ark-grid-2">
                <div className="ark-card">
                  <div className="ark-card-head"><h2>Today's Timer</h2><Badge value={data.today_attendance.status} label={data.today_attendance.status_display} /></div>
                  <p><strong>Total Worked Hours:</strong> {data.today_attendance.worked_hours}</p>
                  <div className="ark-button-row">
                    <button className="ark-btn" type="button" onClick={() => runAction(studentPortalAPI.checkIn, 'Checked in successfully.')}>Check In</button>
                    <button className="ark-btn ark-btn-outline" type="button" onClick={() => runAction(studentPortalAPI.checkOut, 'Checked out successfully.')}>Check Out</button>
                  </div>
                </div>
                <div className="ark-card">
                  <h2>Session Details</h2>
                  <p><strong>Check In:</strong> {data.today_attendance.check_in_time || '-'}</p>
                  <p><strong>Check Out:</strong> {data.today_attendance.check_out_time || '-'}</p>
                  <p><strong>Date:</strong> {data.today_attendance.date}</p>
                </div>
              </div>
              <Table headers={['Date', 'Check In', 'Check Out', 'Hours', 'Status']} rows={data.attendance_history.map((row) => [row.date, row.check_in_time || '-', row.check_out_time || '-', row.worked_hours, <Badge value={row.status} label={row.status_display} />])} empty="No attendance records." />
            </>
          )}

          {active === 'tasks' && (
            <>
              <div className="ark-title-row"><div><span className="ark-eyebrow">Assigned Work</span><h1>Tasks</h1></div><div><Badge value="complete" label={`${data.summary.complete_tasks} Complete`} /> <Badge value="progress" label={`${data.summary.progress_tasks} Progress`} /> <Badge value="hold" label={`${data.summary.hold_tasks} Hold`} /></div></div>
              <Table headers={['Task', 'Description', 'Due', 'Status']} rows={data.tasks.map((task) => [
                task.title,
                task.description,
                task.due_date || '-',
                <select className={`ark-status-select ${task.status}`} value={task.status} onChange={(event) => runAction(() => studentPortalAPI.updateTaskStatus(task.id, { status: event.target.value }), 'Task status updated.')}>{statusOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>,
              ])} empty="No tasks assigned yet." />
            </>
          )}

          {active === 'leave' && (
            <div className="ark-grid-2">
              <form className="ark-card ark-form" onSubmit={(event) => {
                event.preventDefault();
                runAction(() => studentPortalAPI.submitLeave(leaveForm), 'Leave request submitted.');
              }}>
                <h2>New Leave Request</h2>
                <label>Leave Type<select className="ark-input" value={leaveForm.leave_type} onChange={(event) => setLeaveForm({ ...leaveForm, leave_type: event.target.value })}><option value="sick">Sick Leave</option><option value="casual">Casual Leave</option><option value="emergency">Emergency Leave</option><option value="other">Other</option></select></label>
                <label>Start Date<input className="ark-input" type="date" value={leaveForm.start_date} onChange={(event) => setLeaveForm({ ...leaveForm, start_date: event.target.value })} required /></label>
                <label>End Date<input className="ark-input" type="date" value={leaveForm.end_date} onChange={(event) => setLeaveForm({ ...leaveForm, end_date: event.target.value })} required /></label>
                <label>Reason<textarea className="ark-input" rows="4" value={leaveForm.reason} onChange={(event) => setLeaveForm({ ...leaveForm, reason: event.target.value })} required /></label>
                <button className="ark-btn" type="submit">Submit Request</button>
              </form>
              <div className="ark-card"><h2>Request Status</h2>{data.leaves.map((leave) => <div className="ark-row" key={leave.id}><span>{leave.leave_type_display} - {leave.start_date} to {leave.end_date}</span><Badge value={leave.status} label={leave.status_display} /></div>)}{!data.leaves.length && <p className="ark-muted">No leave requests submitted.</p>}</div>
            </div>
          )}

          {active === 'profile' && (
            <div className="ark-grid-2">
              <form className="ark-card ark-form" onSubmit={(event) => {
                event.preventDefault();
                runAction(() => studentPortalAPI.updateProfile(profileForm), 'Profile updated successfully.');
              }}>
                <h2>Edit Profile</h2>
                {Object.entries({ full_name: 'Full Name', email: 'Email Address', phone: 'Mobile Number', college: 'College' }).map(([key, label]) => <label key={key}>{label}<input className="ark-input" value={profileForm[key]} onChange={(event) => setProfileForm({ ...profileForm, [key]: event.target.value })} required={key === 'full_name' || key === 'email'} /></label>)}
                <button className="ark-btn" type="submit">Save Profile</button>
              </form>
              <div className="ark-card"><h2>Internship Details</h2><p><strong>Domain:</strong> {data.student.domain}</p><p><strong>Assigned Mentor:</strong> {data.mentor?.full_name || 'Not assigned'}</p><p><strong>Status:</strong> <Badge value={data.student.is_active ? 'complete' : 'hold'} label={data.student.is_active ? 'Active' : 'Disabled'} /></p></div>
            </div>
          )}

          {active === 'results' && (
            <>
              <div><span className="ark-eyebrow">Performance</span><h1>Results</h1></div>
              <div className="ark-stats"><div className="ark-card ark-stat-card"><strong>{data.summary.complete_tasks}</strong><span>Completed</span></div><div className="ark-card ark-stat-card"><strong>{data.summary.progress_tasks}</strong><span>In Progress</span></div><div className="ark-card ark-stat-card"><strong>{data.summary.hold_tasks}</strong><span>On Hold</span></div></div>
              <div className="ark-card"><h2>Course Result Summary</h2><p className="ark-muted">Your result view is based on assigned task progress. Certificate and scoring details can be added here when evaluation records are available.</p></div>
            </>
          )}

          {active === 'notifications' && <div className="ark-card"><h2>Notifications</h2><p className="ark-muted">No notifications yet.</p></div>}
        </div>
      </div>
    </section>
  );
}

function Table({ headers, rows, empty }) {
  return (
    <div className="ark-table-wrap"><table className="ark-table"><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>) : <tr><td colSpan={headers.length}>{empty}</td></tr>}</tbody></table></div>
  );
}
