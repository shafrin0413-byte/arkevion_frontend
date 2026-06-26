import { useEffect, useMemo, useState } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminPortalAPI } from '../../api';
import { useAuth } from '../../auth/AuthContext';
import '../auth/portal.css';

const navItems = [
  ['dashboard', 'D', 'Dashboard'],
  ['students', 'S', 'Students'],
  ['tasks', 'T', 'Tasks'],
  ['attendance', 'A', 'Attendance'],
  ['reports', 'R', 'Reports'],
  ['leaves', 'L', 'Leave Approval'],
  ['mentors', 'M', 'Mentors'],
  ['notifications', 'N', 'Notifications'],
];

function Badge({ value, label }) {
  return <span className={`ark-badge ${value}`}>{label}</span>;
}

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('dashboard');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [studentForm, setStudentForm] = useState({ full_name: '', email: '', password: '', phone: '', college: '', domain: '', is_active: true });
  const [taskForm, setTaskForm] = useState({ title: '', description: '', assign_to: '__all__', due_date: '' });

  const loadPortal = async () => {
    const response = await adminPortalAPI.getPortal();
    setData(response.data);
    setStudentForm((current) => ({ ...current, domain: response.data.students[0]?.domain_id || '' }));
  };

  useEffect(() => {
    loadPortal().finally(() => setLoading(false));
  }, []);

  const studentOptions = useMemo(() => data?.students || [], [data]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const runAction = async (action, success) => {
    setMessage('');
    await action();
    await loadPortal();
    setMessage(success);
  };

  if (loading) {
    return <section className="ark-login-shell"><div className="ark-portal-panel"><div className="ark-login-card">Loading admin portal...</div></div></section>;
  }

  return (
    <section className="ark-login-shell">
      <div className="ark-dashboard-shell">
        <aside className="ark-side" aria-label="Admin navigation">
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
              <span className="ark-eyebrow">{data.admin.assigned_domain} Admin</span>
              <h1>Dashboard</h1>
              <div className="ark-stats">
                <div className="ark-card"><strong>{data.summary.student_count}</strong><span>Students</span></div>
                <div className="ark-card"><strong>{data.summary.task_count}</strong><span>Tasks</span></div>
                <div className="ark-card"><strong>{data.summary.pending_leave_count}</strong><span>Pending Leaves</span></div>
              </div>
              <div className="ark-grid-2">
                <div className="ark-card"><div className="ark-card-head"><h2>Recent Tasks</h2><button className="ark-link-btn" onClick={() => setActive('tasks')}>View all</button></div>{data.recent_tasks.map((task) => <div className="ark-row" key={task.id}><span>{task.title}</span><Badge value={task.status} label={task.status_display} /></div>)}{!data.recent_tasks.length && <p className="ark-muted">No tasks yet.</p>}</div>
                <div className="ark-card"><div className="ark-card-head"><h2>Leave Requests</h2><button className="ark-link-btn" onClick={() => setActive('leaves')}>Review</button></div>{data.recent_leaves.map((leave) => <div className="ark-row" key={leave.id}><span>{leave.student_name}</span><Badge value={leave.status} label={leave.status_display} /></div>)}{!data.recent_leaves.length && <p className="ark-muted">No leave requests.</p>}</div>
              </div>
            </>
          )}

          {active === 'students' && (
            <>
              <div className="ark-title-row"><div><span className="ark-eyebrow">Student Management</span><h1>Students</h1></div></div>
              <form className="ark-card ark-form ark-inline-form" onSubmit={(event) => {
                event.preventDefault();
                runAction(() => adminPortalAPI.createStudent(studentForm), 'Student added successfully.');
              }}>
                <h2>Add Student</h2>
                <input className="ark-input" placeholder="Full name" value={studentForm.full_name} onChange={(event) => setStudentForm({ ...studentForm, full_name: event.target.value })} required />
                <input className="ark-input" placeholder="Email" value={studentForm.email} onChange={(event) => setStudentForm({ ...studentForm, email: event.target.value })} required />
                <input className="ark-input" placeholder="Password" type="password" value={studentForm.password} onChange={(event) => setStudentForm({ ...studentForm, password: event.target.value })} required />
                <input className="ark-input" placeholder="Phone" value={studentForm.phone} onChange={(event) => setStudentForm({ ...studentForm, phone: event.target.value })} />
                <input className="ark-input" placeholder="College" value={studentForm.college} onChange={(event) => setStudentForm({ ...studentForm, college: event.target.value })} />
                <input type="hidden" value={studentForm.domain} />
                <button className="ark-btn" type="submit">Save Student</button>
              </form>
              <Table headers={['Name', 'Email', 'Domain', 'Status', 'Actions']} rows={data.students.map((student) => [
                student.full_name,
                student.email,
                student.domain,
                <Badge value={student.is_active ? 'complete' : 'hold'} label={student.is_active ? 'Active' : 'Disabled'} />,
                <button className="ark-link-btn danger" onClick={() => runAction(() => adminPortalAPI.deleteStudent(student.id), 'Student deleted successfully.')}>Delete</button>,
              ])} empty="No students found." />
            </>
          )}

          {active === 'tasks' && (
            <>
              <div className="ark-title-row"><div><span className="ark-eyebrow">Task Management</span><h1>Tasks</h1></div></div>
              <form className="ark-card ark-form ark-inline-form" onSubmit={(event) => {
                event.preventDefault();
                runAction(() => adminPortalAPI.createTask(taskForm), 'Task created and assigned successfully.');
              }}>
                <h2>Create Task</h2>
                <input className="ark-input" placeholder="Task title" value={taskForm.title} onChange={(event) => setTaskForm({ ...taskForm, title: event.target.value })} required />
                <textarea className="ark-input" placeholder="Description" value={taskForm.description} onChange={(event) => setTaskForm({ ...taskForm, description: event.target.value })} required />
                <select className="ark-input" value={taskForm.assign_to} onChange={(event) => setTaskForm({ ...taskForm, assign_to: event.target.value })}><option value="__all__">All Students</option>{studentOptions.map((student) => <option key={student.id} value={student.id}>{student.full_name}</option>)}</select>
                <input className="ark-input" type="date" value={taskForm.due_date} onChange={(event) => setTaskForm({ ...taskForm, due_date: event.target.value })} />
                <button className="ark-btn" type="submit">Save Task</button>
              </form>
              <Table headers={['Task', 'Assigned To', 'Due', 'Status', 'Actions']} rows={data.tasks.map((task) => [
                task.title,
                task.assigned_to_display,
                task.due_date || '-',
                <Badge value={task.status} label={task.status_display} />,
                <button className="ark-link-btn danger" onClick={() => runAction(() => adminPortalAPI.deleteTask(task.id), 'Task deleted successfully.')}>Delete</button>,
              ])} empty="No tasks found." />
            </>
          )}

          {active === 'attendance' && (
            <>
              <span className="ark-eyebrow">Attendance Monitoring</span><h1>Attendance</h1>
              <Table headers={['Student', 'Date', 'Check In', 'Check Out', 'Hours', 'Status']} rows={data.attendance.map((row) => [row.student_name, row.date, row.check_in_time || '-', row.check_out_time || '-', row.worked_hours, <Badge value={row.status} label={row.status_display} />])} empty="No attendance records." />
            </>
          )}

          {active === 'leaves' && (
            <>
              <span className="ark-eyebrow">Leave Management</span><h1>Leave Approval</h1>
              <Table headers={['Student', 'Type', 'Dates', 'Status', 'Review']} rows={data.leaves.map((leave) => [
                leave.student_name,
                leave.leave_type_display,
                `${leave.start_date} to ${leave.end_date}`,
                <Badge value={leave.status} label={leave.status_display} />,
                leave.status === 'pending' ? <div className="ark-actions-inline"><button className="ark-link-btn" onClick={() => runAction(() => adminPortalAPI.reviewLeave(leave.id, 'approve'), 'Leave request approved.')}>Approve</button><button className="ark-link-btn danger" onClick={() => runAction(() => adminPortalAPI.reviewLeave(leave.id, 'reject'), 'Leave request rejected.')}>Reject</button></div> : '-',
              ])} empty="No leave requests." />
            </>
          )}

          {active === 'reports' && (
            <>
              <div className="ark-title-row"><div><span className="ark-eyebrow">Analytics</span><h1>Reports</h1></div><div><button className="ark-btn ark-btn-outline" onClick={() => setActive('attendance')}>Attendance</button> <button className="ark-btn ark-btn-outline" onClick={() => setActive('leaves')}>Leaves</button></div></div>
              <div className="ark-stats"><div className="ark-card ark-stat-card"><strong>{data.summary.student_count}</strong><span>Students</span></div><div className="ark-card ark-stat-card"><strong>{data.summary.task_count}</strong><span>Tasks</span></div><div className="ark-card ark-stat-card"><strong>{data.summary.pending_leave_count}</strong><span>Pending Leaves</span></div></div>
              <div className="ark-grid-2"><div className="ark-card"><h2>Recent Attendance</h2>{data.attendance.slice(0, 8).map((row) => <div className="ark-row" key={row.id}><span>{row.student_name}</span><Badge value={row.status} label={row.status_display} /></div>)}</div><div className="ark-card"><h2>Leave Requests</h2>{data.leaves.slice(0, 8).map((leave) => <div className="ark-row" key={leave.id}><span>{leave.student_name}</span><Badge value={leave.status} label={leave.status_display} /></div>)}</div></div>
            </>
          )}

          {active === 'mentors' && <div className="ark-card"><h2>Mentor Management</h2><p><strong>Assigned Domain:</strong> {data.admin.assigned_domain}</p><p><strong>Admin Mentor:</strong> {data.admin.full_name}</p><p><strong>Email:</strong> {data.admin.email}</p><p className="ark-muted">Existing mentor behavior is domain-admin based; no extra mentor table is added.</p></div>}
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
