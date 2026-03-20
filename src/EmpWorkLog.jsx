import React, { useState } from 'react';
import { INITIAL_WORK_LOGS } from './data';

export default function EmpWorkLog({ currentUser }) {
  const [filter, setFilter] = useState('all');
  const usr = currentUser.username;
  const logs = INITIAL_WORK_LOGS[usr] || [];
  
  const filtered = filter === 'all' ? logs : logs.filter(l => l.cat === filter);
  const SS = { Completed: 'bg', 'In Progress': 'bb', 'On Hold': 'ba', 'Pending Material': 'ba' };

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Work Log</div>
          <div className="pgs">Your daily work history — all entries</div>
        </div>
        <button className="btn bp">+ Add Entry</button>
      </div>
      <div className="card">
        <div className="ch">
          <div className="ct">All Entries <span className="chip mo" style={{ marginLeft: '6px' }}>{logs.length}</span></div>
          <div className="tabs">
            {['all', 'Site Work', 'Workshop', 'Testing'].map(f => (
              <div key={f} className={`tab ${filter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f}
              </div>
            ))}
          </div>
        </div>
        <div id="worklog-list-full">
          {filtered.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--mu)', fontSize: '13px' }}>
              No entries found. Add your first work log!
            </div>
          ) : (
            filtered.map(l => {
              const d = new Date(l.date);
              return (
                <div className="log-entry" key={l.id}>
                  <div className="log-date-col">
                    <div className="log-date-day">{d.getDate()}</div>
                    <div className="log-date-mon">{d.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase()}</div>
                  </div>
                  <div className="log-body">
                    <div className="log-site">{l.site}</div>
                    <div className="log-task">{l.task}</div>
                    <div className="log-meta">
                      <span className="log-hours">⏱ {l.hours}h</span>
                      {l.wo && <span className="log-wo">{l.wo}</span>}
                      <span className="log-pill">{l.cat}</span>
                      <span className={`badge ${SS[l.status]}`} style={{ fontSize: '10px' }}>{l.status}</span>
                    </div>
                    {l.next && <div style={{ fontSize: '11.5px', color: 'var(--mu)', marginTop: '4px' }}>→ Next: {l.next}</div>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
