import React, { useState } from 'react';
import { rC, getInitials, fmt, dF, USERS } from './data';

export default function Projects({ projects, setProjects, searchQuery = '' }) {
  const [modalOpen, setModalOpen] = useState(false);
  const PD = { High: '#b01f1f', Medium: '#a8510a', Low: '#026d43' };

  const initialForm = {
    id: `PRJ-${Date.now().toString().slice(-4)}`,
    name: '',
    client: '',
    type: 'Sub-Station Automation',
    end: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    budget: 0,
    priority: 'Medium',
    progress: 0,
    team: []
  };

  const [formData, setFormData] = useState(initialForm);
  const [teamMember, setTeamMember] = useState('emp001');

  const handleSave = () => {
    if (!formData.name || !formData.client) return;
    setProjects([...projects, formData]);
    setModalOpen(false);
  };

  const addTeamMember = () => {
    if (!formData.team.includes(USERS[teamMember].name)) {
      setFormData({ ...formData, team: [...formData.team, USERS[teamMember].name] });
    }
  };

  let displayProjects = projects;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    displayProjects = projects.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.client.toLowerCase().includes(q)
    );
  }

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Project Allocation</div>
          <div className="pgs">Electrical commissioning and turnkey projects</div>
        </div>
        <button className="btn bp" onClick={() => { setFormData(initialForm); setModalOpen(true); }}>+ Create Project</button>
      </div>

      <div className="sg sg3">
        <div className="sc"><div className="sct"><div className="scl">Active Projects</div></div><div className="scv" style={{ color: '#b45309' }}>{projects.length}</div><div className="scf">in execution</div></div>
        <div className="sc"><div className="sct"><div className="scl">Nearing Deadline</div></div><div className="scv" style={{ color: '#a8510a' }}>{projects.filter(p => dF(p.end) <= 30 && dF(p.end) >= 0).length}</div><div className="scf">within 30 days</div></div>
        <div className="sc"><div className="sct"><div className="scl">Team Deployed</div></div><div className="scv">{projects.reduce((s, p) => s + p.team.length, 0)}</div><div className="scf">across sites</div></div>
      </div>
      <div className="card" id="projList">
        <div className="ch"><div className="ct">All Projects</div></div>
        {displayProjects.map(p => {
          const d = dF(p.end);
          const pill =
            d <= 3 && d >= 0 ? (
              <span className="dp" style={{ marginLeft: '6px' }}>{d === 0 ? 'DUE TODAY' : d + 'd'}</span>
            ) : d <= 7 && d >= 0 ? (
              <span className="sp" style={{ marginLeft: '6px' }}>{d}d</span>
            ) : (
              <span className="chip mo" style={{ marginLeft: '6px' }}>{d >= 0 ? d + 'd' : 'Overdue'}</span>
            );

          const bc = p.progress > 70 ? 'pfg' : p.progress > 40 ? 'pfb' : 'pfa';

          return (
            <div className="prow" key={p.id}>
              <div className="pdcol">
                <div className="pdd" style={{ borderColor: PD[p.priority], background: `${PD[p.priority]}22` }}></div>
                <div className="pdline" style={{ height: '30px' }}></div>
              </div>
              <div className="pbody">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 600 }}>{p.name}</div>
                  <span className={`badge ${p.priority === 'High' ? 'br' : p.priority === 'Medium' ? 'ba' : 'bg'}`}>
                    {p.priority}
                  </span>
                  {pill}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--mu)', marginTop: '2px' }}>
                  {p.client} · <span className="chip" style={{ fontSize: '10px' }}>{p.type}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                  <div className="pb">
                    <div className="ptr" style={{ width: '110px' }}>
                      <div className={`pf ${bc}`} style={{ width: `${p.progress}%` }}></div>
                    </div>
                    <span className="pv">{p.progress}%</span>
                  </div>
                  <div className="pm-avs" style={{ marginLeft: '8px' }}>
                    {p.team.map((t, idx) => (
                      <div className="pm-av" key={idx} style={{ background: rC(t), width: '24px', height: '24px', fontSize: '9px' }}>
                        {getInitials(t)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="chip mo" style={{ fontSize: '11px' }}>{fmt(p.end)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div className="ov on">
          <div className="mdl" style={{ width: '480px' }}>
            <div className="mhd">
              <div>
                <div className="mht">Create New Project</div>
                <div className="mhs">{formData.id}</div>
              </div>
              <div className="cbtn" onClick={() => setModalOpen(false)}>×</div>
            </div>
            <div className="mbd">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="fld">
                  <label>Project Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="fld">
                  <label>Client</label>
                  <input type="text" value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="fld">
                    <label>Priority</label>
                    <select value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })}>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div className="fld">
                    <label>Deadline</label>
                    <input type="date" value={formData.end} onChange={e => setFormData({ ...formData, end: e.target.value })} />
                  </div>
                </div>
                
                <div className="fld">
                  <label>Team Deployment</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <select value={teamMember} onChange={e => setTeamMember(e.target.value)} style={{ flex: 1 }}>
                      {Object.keys(USERS).map(k => (
                        <option key={k} value={k}>{USERS[k].name}</option>
                      ))}
                    </select>
                    <button className="btn bs" onClick={addTeamMember}>+ Add</button>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {formData.team.map((t, idx) => (
                      <span key={idx} className="chip">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mft">
              <button className="btn bw" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn bp" onClick={handleSave}>Initialize Project</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
