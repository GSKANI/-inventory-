import React from 'react';
import { ALL_SERVICES, USERS, rC, getInitials, fmt } from './data';

export default function Services({ searchQuery = '' }) {
  const SS = { Completed: 'bg', 'In Progress': 'bb', Pending: 'ba' };

  let filtered = ALL_SERVICES;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(s => s.type.toLowerCase().includes(q) || s.client.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
  }

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Service Jobs</div>
          <div className="pgs">Field service and overhauling jobs</div>
        </div>
      </div>
      <div className="card">
        <div className="ch"><div className="ct">All Service Jobs</div></div>
        <table>
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Service Type</th>
              <th>Client / Site</th>
              <th>Assigned</th>
              <th>Scheduled</th>
              <th>Status</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td><span className="chip mo">{s.id}</span></td>
                <td>{s.type}</td>
                <td>{s.client}</td>
                <td>
                  <div className="acl">
                    <div
                      className="aav"
                      style={{ background: rC(s.emp), width: '24px', height: '24px', fontSize: '9px' }}
                    >
                      {getInitials(USERS[s.emp]?.name || '?')}
                    </div>
                    <span style={{ fontSize: '12px' }}>{USERS[s.emp]?.name || 'Unknown'}</span>
                  </div>
                </td>
                <td className="mo" style={{ fontSize: '12px' }}>{fmt(s.date)}</td>
                <td><span className={`badge ${SS[s.status] || 'bz'}`}>{s.status}</span></td>
                <td className="mo" style={{ fontWeight: 600 }}>₹{s.value.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
