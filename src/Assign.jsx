import React, { useState } from 'react';
import { rC, getInitials, fmt, dF, USERS } from './data';

export default function Assign({ assigns, setAssigns, searchQuery = '' }) {
  const [modalOpen, setModalOpen] = useState(false);
  const initialForm = {
    emp: 'emp001',
    empName: USERS.emp001.name,
    proj: '',
    role: '',
    start: new Date().toISOString().split('T')[0],
    end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };
  const [formData, setFormData] = useState(initialForm);

  const handleSave = () => {
    if (!formData.proj || !formData.role) return;
    setAssigns([...assigns, formData]);
    setModalOpen(false); // Keeping setModalOpen(false) as setModalType is not defined in the provided context.
  };

  let displayAssigns = assigns;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    displayAssigns = assigns.filter(a => 
      a.empName.toLowerCase().includes(q) || 
      a.proj.toLowerCase().includes(q) || 
      a.role.toLowerCase().includes(q)
    );
  }

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Site Assignment</div>
          <div className="pgs">Allocate engineers to sites</div>
        </div>
        <button className="btn bp" onClick={() => { setFormData(initialForm); setModalOpen(true); }}>+ Assign Employee</button>
      </div>

      <div className="card">
        <div className="ch"><div className="ct">Current Assignments</div></div>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Project / Site</th>
              <th>Role</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {displayAssigns.map((a, i) => {
              const d = dF(a.end);
              const pill =
                d <= 3 && d >= 0 ? (
                  <span className="dp" style={{ marginLeft: '6px' }}>{d === 0 ? 'TODAY' : d + 'd'}</span>
                ) : d <= 7 && d >= 0 ? (
                  <span className="sp" style={{ marginLeft: '6px' }}>{d}d</span>
                ) : null;

              return (
                <tr key={i}>
                  <td>
                    <div className="acl">
                      <div className="aav" style={{ background: rC(a.empName) }}>
                        {getInitials(a.empName)}
                      </div>
                      <div>
                        <div className="anm">{a.empName}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong>{a.proj}</strong> {pill}
                  </td>
                  <td>{a.role}</td>
                  <td className="mo" style={{ fontSize: '12px' }}>{fmt(a.start)}</td>
                  <td className="mo" style={{ fontSize: '12px' }}>{fmt(a.end)}</td>
                  <td>
                    <span className="badge bb">Active</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="ov on">
          <div className="mdl" style={{ width: '400px' }}>
            <div className="mhd">
              <div>
                <div className="mht">New Site Assignment</div>
                <div className="mhs">Allocate an employee to a project</div>
              </div>
              <div className="cbtn" onClick={() => setModalOpen(false)}>×</div>
            </div>
            <div className="mbd">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="fld">
                  <label>Employee</label>
                  <select 
                    value={formData.emp} 
                    onChange={e => {
                      const empKey = e.target.value;
                      setFormData({ ...formData, emp: empKey, empName: USERS[empKey]?.name || 'Unknown' });
                    }}
                  >
                    {Object.keys(USERS).map(k => (
                      <option key={k} value={k}>{USERS[k].name} ({USERS[k].role})</option>
                    ))}
                  </select>
                </div>
                <div className="fld">
                  <label>Project / Site Name</label>
                  <input type="text" value={formData.proj} onChange={e => setFormData({ ...formData, proj: e.target.value })} />
                </div>
                <div className="fld">
                  <label>Role</label>
                  <input type="text" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="fld">
                    <label>Start Date</label>
                    <input type="date" value={formData.start} onChange={e => setFormData({ ...formData, start: e.target.value })} />
                  </div>
                  <div className="fld">
                    <label>End Date</label>
                    <input type="date" value={formData.end} onChange={e => setFormData({ ...formData, end: e.target.value })} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mft">
              <button className="btn bw" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn bp" onClick={handleSave}>Assign Employee</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
