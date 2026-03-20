import React, { useState } from 'react';
import { INITIAL_WORK_LOGS, USERS, fmt, getInitials, rC } from './data';

export default function AdminWorkLogs({ searchQuery = '' }) {
  const [filter, setFilter] = useState('all');

  // flatten worklogs
  let allLogs = [];
  Object.keys(INITIAL_WORK_LOGS).forEach(emp => {
    INITIAL_WORK_LOGS[emp].forEach(l => {
      allLogs.push({ ...l, emp });
    });
  });

  let filtered = filter === 'all' ? allLogs : allLogs.filter(l => l.emp === filter);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(l => l.site.toLowerCase().includes(q) || l.task.toLowerCase().includes(q) || l.wo.toLowerCase().includes(q) || USERS[l.emp]?.name?.toLowerCase().includes(q));
  }

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">All Employee Work Logs</div>
          <div className="pgs">Admin view — every submitted daily work entry</div>
        </div>
      </div>
      <div className="sg sg3">
        <div className="sc"><div className="sct"><div className="scl">Total Entries</div></div><div className="scv" id="awl-total">{allLogs.length}</div><div className="scf">all employees</div></div>
        <div className="sc"><div className="sct"><div className="scl">Today's Logs</div></div><div className="scv" style={{ color: '#026d43' }} id="awl-today">1</div><div className="scf">submitted today</div></div>
        <div className="sc"><div className="sct"><div className="scl">Total Hours</div></div><div className="scv" style={{ color: '#b45309' }} id="awl-hours">{allLogs.reduce((a, b) => a + b.hours, 0)}</div><div className="scf">this month</div></div>
      </div>
      <div className="card">
        <div className="ch">
          <div className="ct">All Work Log Entries</div>
          <div className="tabs">
            <div className={`tab ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>All</div>
            <div className={`tab ${filter === 'emp001' ? 'on' : ''}`} onClick={() => setFilter('emp001')}>K. Suresh Kumar</div>
            <div className={`tab ${filter === 'emp002' ? 'on' : ''}`} onClick={() => setFilter('emp002')}>R. Venkatesan</div>
            <div className={`tab ${filter === 'emp003' ? 'on' : ''}`} onClick={() => setFilter('emp003')}>S. Pradeep</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee</th>
              <th>Site / Location</th>
              <th>Work Done</th>
              <th>Work Order</th>
              <th>Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id}>
                <td className="mo" style={{ fontSize: '12px' }}>{fmt(l.date)}</td>
                <td>
                  <div className="acl">
                    <div className="aav" style={{ background: rC(USERS[l.emp]?.name || ' '), width: '24px', height: '24px', fontSize: '9px' }}>
                      {getInitials(USERS[l.emp]?.name || ' ')}
                    </div>
                    <span style={{ fontSize: '12px' }}>{USERS[l.emp]?.name}</span>
                  </div>
                </td>
                <td>{l.site}</td>
                <td>{l.task}</td>
                <td className="mo" style={{ fontSize: '12px' }}>{l.wo}</td>
                <td className="mo" style={{ fontWeight: 600 }}>{l.hours}</td>
                <td><span className={`badge ${l.status === 'Completed' ? 'bg' : 'bb'}`}>{l.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
