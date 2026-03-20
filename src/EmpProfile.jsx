import React, { useState } from 'react';
import { INITIAL_WORK_LOGS, ALL_SERVICES, getInitials, rC, fmt, dF, todayStr } from './data';

export default function EmpProfile({ currentUser, assigns }) {
  const [tab, setTab] = useState('info');
  const [editMode, setEditMode] = useState(false);
  const u = currentUser;
  const usr = u.username;
  const logs = INITIAL_WORK_LOGS[usr] || [];
  const myServices = ALL_SERVICES.filter(s => s.emp === usr);
  const myAssigns = assigns.filter(a => a.emp === usr);
  const totalHours = logs.reduce((s, l) => s + l.hours, 0);
  const bgColor = rC(u.name);

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="profile-hero card" style={{ marginBottom: '16px' }}>
        <div className="profile-hero-inner">
          <div className="profile-avatar-big" style={{ background: bgColor }}>
            {getInitials(u.name)}
          </div>
          <div>
            <div className="profile-name">{u.name}</div>
            <div className="profile-role-tag">{u.title} · {u.id}</div>
            <div className="profile-dept-pill">{u.dept}</div>
          </div>
        </div>
        <div className="profile-tabs">
          <div className={`profile-tab ${tab === 'info' ? 'on' : ''}`} onClick={() => setTab('info')}>Personal Info</div>
          <div className={`profile-tab ${tab === 'stats' ? 'on' : ''}`} onClick={() => setTab('stats')}>Work Stats</div>
          <div className={`profile-tab ${tab === 'assignments' ? 'on' : ''}`} onClick={() => setTab('assignments')}>Assignments</div>
        </div>
      </div>

      {tab === 'info' && (
        <div className="profile-section on">
          <div className="card">
            <div className="ch">
              <div className="ct">Personal Information</div>
              <button className={`btn ${editMode ? 'bp' : 'bs'}`} onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Save Changes' : '✎ Edit Profile'}
              </button>
            </div>
            <div className="profile-info-grid" style={{ padding: '20px' }}>
              <div className="profile-info-item"><div className="profile-info-label">Employee ID</div><div className="profile-info-value mo">{u.id}</div></div>
              <div className="profile-info-item"><div className="profile-info-label">Full Name</div><div className="profile-info-value">{u.name}</div></div>
              <div className="profile-info-item"><div className="profile-info-label">Designation</div><div className="profile-info-value">{u.title}</div></div>
              <div className="profile-info-item"><div className="profile-info-label">Department</div><div className="profile-info-value">{u.dept}</div></div>
              <div className="profile-info-item"><div className="profile-info-label">Mobile</div><div className="profile-info-value mo">{editMode ? <input type="text" defaultValue={u.mobile} className="f-inp" style={{width:'100%', padding:'4px', marginTop:'4px'}}/> : u.mobile}</div></div>
              <div className="profile-info-item"><div className="profile-info-label">Email</div><div className="profile-info-value">{editMode ? <input type="email" defaultValue={u.email} className="f-inp" style={{width:'100%', padding:'4px', marginTop:'4px'}}/> : u.email}</div></div>
              <div className="profile-info-item"><div className="profile-info-label">Join Date</div><div className="profile-info-value">{fmt(u.join)}</div></div>
              <div className="profile-info-item"><div className="profile-info-label">Role</div><div className="profile-info-value">Employee</div></div>
              <div className="profile-info-item"><div className="profile-info-label">Status</div><div className="profile-info-value"><span className="badge bg">Active</span></div></div>
            </div>
          </div>
        </div>
      )}

      {tab === 'stats' && (
        <div className="profile-section on">
          <div className="sg sg4" style={{ marginBottom: '16px' }}>
            <div className="sc"><div className="sct"><div className="scl">Total Work Logs</div></div><div className="scv">{logs.length}</div><div className="scf">all entries</div></div>
            <div className="sc"><div className="sct"><div className="scl">Total Hours Logged</div></div><div className="scv" style={{ color: '#b45309' }}>{totalHours}</div><div className="scf">all time</div></div>
            <div className="sc"><div className="sct"><div className="scl">Services Done</div></div><div className="scv" style={{ color: '#026d43' }}>{myServices.filter(s => s.status === 'Completed').length}</div><div className="scf">completed</div></div>
            <div className="sc"><div className="sct"><div className="scl">Active Assignments</div></div><div className="scv" style={{ color: '#1360c2' }}>{myAssigns.length}</div><div className="scf">current</div></div>
          </div>
        </div>
      )}

      {tab === 'assignments' && (
        <div className="profile-section on">
          <div className="card">
            <div className="ch"><div className="ct">Current Assignments</div></div>
            <table>
              <thead>
                <tr><th>Project / Site</th><th>Role</th><th>Start</th><th>End</th><th>Deadline</th></tr>
              </thead>
              <tbody>
                {myAssigns.map((a, i) => {
                  const d = dF(a.end);
                  const pill = d <= 3 && d >= 0 ? <span className="dp">{d === 0 ? 'TODAY' : d + 'd'}</span> : d <= 7 ? <span className="sp">{d}d</span> : <span className="chip mo">{d > 0 ? d + 'd' : 'Overdue'}</span>;
                  return (
                    <tr key={i}>
                      <td><strong>{a.proj}</strong></td>
                      <td>{a.role}</td>
                      <td className="mo" style={{ fontSize: '12px' }}>{fmt(a.start)}</td>
                      <td className="mo" style={{ fontSize: '12px' }}>{fmt(a.end)}</td>
                      <td>{pill}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="card">
            <div className="ch"><div className="ct">My Service Jobs</div></div>
            <table>
              <thead>
                <tr><th>Job ID</th><th>Service</th><th>Client</th><th>Date</th><th>Status</th><th>Value</th></tr>
              </thead>
              <tbody>
                {myServices.map(s => {
                  const SS = { Completed: 'bg', 'In Progress': 'bb', Pending: 'ba' };
                  return (
                    <tr key={s.id}>
                      <td><span className="chip mo">{s.id}</span></td>
                      <td>{s.type}</td>
                      <td>{s.client}</td>
                      <td className="mo" style={{ fontSize: '12px' }}>{fmt(s.date)}</td>
                      <td><span className={`badge ${SS[s.status] || 'bz'}`}>{s.status}</span></td>
                      <td className="mo">₹{s.value.toLocaleString('en-IN')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
