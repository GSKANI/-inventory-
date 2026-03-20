import React from 'react';
import { fmt, dF } from './data';

export default function Alerts({ assigns, projects }) {
  const crit = projects.filter(p => { const d = dF(p.end); return d >= 0 && d <= 3; });
  const soon = projects.filter(p => { const d = dF(p.end); return d > 3 && d <= 7; });
  const acrit = assigns.filter(a => { const d = dF(a.end); return d >= 0 && d <= 3; });

  const hasCrit = crit.length > 0 || acrit.length > 0;

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Deadline Alerts</div>
          <div className="pgs">Projects and assignments due within 3 days</div>
        </div>
      </div>
      <div id="alertsContent">
        {hasCrit && (
          <div className="abanner">
            <div className="abico">🚨</div>
            <div>
              <div className="abtit">URGENT — Due within 3 days</div>
              <div className="ablist">
                {crit.map(p => {
                  const d = dF(p.end);
                  return (
                    <div className="abitem" key={p.id}>
                      Project <strong>{p.name}</strong> — {d === 0 ? 'DUE TODAY' : `Due in ${d}d`}
                    </div>
                  );
                })}
                {acrit.map((a, i) => {
                  const d = dF(a.end);
                  return (
                    <div className="abitem" key={i}>
                      <strong>{a.empName}</strong> — {a.proj} ends {d === 0 ? 'today' : `in ${d}d`}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div className="sg sg3">
          <div className="sc"><div className="sct"><div className="scl">Due ≤ 3 Days</div></div><div className="scv" style={{ color: '#b01f1f' }}>{crit.length}</div></div>
          <div className="sc"><div className="sct"><div className="scl">Due 4–7 Days</div></div><div className="scv" style={{ color: '#a8510a' }}>{soon.length}</div></div>
          <div className="sc"><div className="sct"><div className="scl">Overdue</div></div><div className="scv" style={{ color: '#b01f1f' }}>{projects.filter(p => dF(p.end) < 0).length}</div></div>
        </div>
        <div className="card">
          <div className="ch"><div className="ct">All Deadlines</div></div>
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Type</th>
                <th>Deadline</th>
                <th>Days</th>
                <th>Progress</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {[...projects].sort((a, b) => dF(a.end) - dF(b.end)).map(p => {
                const d = dF(p.end);
                const pill = d < 0 ? <span className="dp">OVERDUE</span> : d <= 3 ? <span className="dp">{d}d</span> : d <= 7 ? <span className="sp">{d}d</span> : <span className="chip mo">{d}d</span>;
                const bc = p.progress > 70 ? 'pfg' : p.progress > 40 ? 'pfb' : 'pfa';
                return (
                  <tr key={p.id}>
                    <td><strong>{p.name}</strong></td>
                    <td>{p.client}</td>
                    <td><span className="chip" style={{ fontSize: '10px' }}>{p.type}</span></td>
                    <td className="mo" style={{ fontSize: '12px' }}>{fmt(p.end)}</td>
                    <td>{pill}</td>
                    <td>
                      <div className="pb">
                        <div className="ptr" style={{ width: '70px' }}>
                          <div className={`pf ${bc}`} style={{ width: `${p.progress}%` }}></div>
                        </div>
                        <span className="pv">{p.progress}%</span>
                      </div>
                    </td>
                    <td><span className={`badge ${p.priority === 'High' ? 'br' : p.priority === 'Medium' ? 'ba' : 'bg'}`}>{p.priority}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
