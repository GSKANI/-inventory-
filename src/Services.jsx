import React, { useState } from 'react';
import { USERS, rC, getInitials, fmt } from './data';

export default function Services({ searchQuery = '', services = [], setServices }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: `SVC-${Math.floor(Math.random() * 9000).toString()}`, type: '', client: '', date: new Date().toISOString().split('T')[0], status: 'Pending', value: 0, emp: 'emp001' });

  const SS = { Completed: 'bg', 'In Progress': 'bb', Pending: 'ba' };

  let filtered = services;
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
        <button className="btn bp" onClick={() => { setFormData({ ...formData, id: `SVC-${Math.floor(Math.random() * 9000).toString()}` }); setModalOpen(true); }}>+ Create Job</button>
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

      {modalOpen && (
        <div className="ov on">
          <div className="mdl" style={{ width: '450px' }}>
            <div className="mhd">
              <div>
                <div className="mht">Assign New Service Job</div>
                <div className="mhs">{formData.id}</div>
              </div>
              <div className="cbtn" onClick={() => setModalOpen(false)}>×</div>
            </div>
            <div className="mbd">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="fld">
                  <label>Service Type *</label>
                  <input type="text" placeholder="e.g. Transformer Oil Filtration" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} />
                </div>
                <div className="fld">
                  <label>Client / Site *</label>
                  <input type="text" placeholder="e.g. TANGEDCO" value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="fld">
                    <label>Scheduled Date</label>
                    <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                  </div>
                  <div className="fld">
                    <label>Job Value (₹)</label>
                    <input type="number" value={formData.value} onChange={e => setFormData({ ...formData, value: Number(e.target.value) })} />
                  </div>
                </div>
                <div className="fld">
                  <label>Assign to Employee</label>
                  <select value={formData.emp} onChange={e => setFormData({ ...formData, emp: e.target.value })}>
                    {Object.keys(USERS).filter(k => USERS[k].role === 'employee').map(k => (
                      <option key={k} value={k}>{USERS[k].name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mft">
              <button className="btn bw" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn bp" onClick={() => {
                if(formData.type && formData.client && setServices) {
                  setServices([{ ...formData }, ...services]);
                  setModalOpen(false);
                  alert(`Successfully assigned ${formData.type} to ${USERS[formData.emp].name}`);
                }
              }}>Assign Job</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
