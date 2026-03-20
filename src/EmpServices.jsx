import React from 'react';
import { ALL_SERVICES, fmt } from './data';

export default function EmpServices({ currentUser }) {
  const usr = currentUser.username;
  const myServices = ALL_SERVICES.filter(s => s.emp === usr);
  const inProg = myServices.filter(s => s.status === 'In Progress').length;
  const done = myServices.filter(s => s.status === 'Completed').length;

  const SS = { Completed: 'bg', 'In Progress': 'bb', Pending: 'ba' };

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">My Assigned Services</div>
          <div className="pgs">Service jobs assigned to you</div>
        </div>
      </div>
      <div className="sg sg3">
        <div className="sc"><div className="sct"><div className="scl">Total Assigned</div></div><div className="scv">{myServices.length}</div><div className="scf">all time</div></div>
        <div className="sc"><div className="sct"><div className="scl">In Progress</div></div><div className="scv" style={{ color: '#b45309' }}>{inProg}</div><div className="scf">active now</div></div>
        <div className="sc"><div className="sct"><div className="scl">Completed</div></div><div className="scv" style={{ color: '#026d43' }}>{done}</div><div className="scf">this month</div></div>
      </div>
      <div className="card">
        <div className="ch"><div className="ct">Service Jobs</div></div>
        <table>
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Service Type</th>
              <th>Client / Site</th>
              <th>Scheduled</th>
              <th>Status</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {myServices.map(s => (
              <tr key={s.id}>
                <td><span className="chip mo">{s.id}</span></td>
                <td>{s.type}</td>
                <td>{s.client}</td>
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
