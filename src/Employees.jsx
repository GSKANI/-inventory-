import React, { useState } from 'react';
import { EMPS_DATA, USERS, rC, getInitials, fmt } from './data';

export default function Employees({ searchQuery = '' }) {
  const cols = ['#b45309', '#026d43', '#a8510a', '#1360c2', '#5b21b6', '#b01f1f'];
  
  const [emps, setEmps] = useState([...EMPS_DATA]);
  const [modalType, setModalType] = useState(null); // 'view' or 'add'
  const [selectedEmp, setSelectedEmp] = useState(null);
  
  const initialForm = {
    fname: '',
    role: '',
    dept: '',
    join: new Date().toISOString().split('T')[0],
    mobile: '',
    email: '',
    username: '',
    password: ''
  };
  const [formData, setFormData] = useState(initialForm);

  const handleOpenView = (e) => {
    // Find the corresponding user object to get credentials
    const userKey = Object.keys(USERS).find(k => USERS[k].id === e.id);
    const userObj = userKey ? USERS[userKey] : null;
    
    setSelectedEmp({
      ...e,
      username: userKey || 'N/A',
      password: userObj ? userObj.password : 'N/A',
      mobile: userObj ? userObj.mobile : 'N/A',
      email: userObj ? userObj.email : 'N/A',
      title: userObj ? userObj.title : e.role
    });
    setModalType('view');
  };

  const handleOpenAdd = () => {
    setFormData({ 
      ...initialForm, 
      id: `EMP-00${emps.length + 1}` 
    });
    setModalType('add');
  };

  const handleAddSubmit = () => {
    if (!formData.fname || !formData.username) return;
    
    // Create new EMPS_DATA entry
    const newEmp = {
      id: formData.id,
      name: formData.fname,
      dept: formData.dept,
      role: formData.role,
      join: formData.join,
      status: 'Active',
      projects: 0
    };
    
    // Create new USERS entry in memory (allows mock login until refresh)
    USERS[formData.username] = {
      id: formData.id,
      password: formData.password,
      role: 'employee',
      name: formData.fname,
      title: formData.role,
      dept: formData.dept,
      join: formData.join,
      mobile: formData.mobile,
      email: formData.email,
      initials: getInitials(formData.fname)
    };
    
    EMPS_DATA.push(newEmp);
    setEmps([newEmp, ...emps]);
    setModalType(null);
  };

  let displayEmps = emps;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    displayEmps = emps.filter(e => 
      e.name.toLowerCase().includes(q) || 
      e.role.toLowerCase().includes(q) || 
      e.dept.toLowerCase().includes(q) || 
      e.id.toLowerCase().includes(q)
    );
  }

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh" style={{ alignItems: 'center' }}>
        <div>
          <div className="pgt">Employee Directory</div>
          <div className="pgs">Workshop, field engineers and admin staff</div>
        </div>
        <button className="btn bp" onClick={handleOpenAdd}>+ Add Employee</button>
      </div>
      
      <div className="eg" id="empGrid">
        {displayEmps.slice(0, 6).map((e, i) => (
          <div className="ec" key={e.id}>
            <div className="ect">
              <div className="eav" style={{ background: cols[i % 6] }}>{getInitials(e.name)}</div>
              <div>
                <div className="enm">{e.name}</div>
                <div className="erl">{e.role}</div>
              </div>
            </div>
            <div className="ecs">
              <div className="est">
                <div className="esl">Projects</div>
                <div className="esv">{e.projects || 0}</div>
              </div>
              <div className="est">
                <div className="esl">Dept</div>
                <div className="esv" style={{ fontSize: '10px' }}>{e.dept.split(' ')[0]}</div>
              </div>
            </div>
            <div className="efoot">
              <span className={`badge ${e.status === 'Active' ? 'bg' : 'ba'}`}>{e.status}</span>
              <button className="btn bs" style={{ padding: '3px 8px', fontSize: '11px' }} onClick={() => handleOpenView(e)}>View Profile</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="card">
        <div className="ch"><div className="ct">All Employees</div></div>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Projects</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayEmps.map(e => (
              <tr key={e.id}>
                <td>
                  <div className="acl">
                    <div className="aav" style={{ background: rC(e.name) }}>{getInitials(e.name)}</div>
                    <div>
                      <div className="anm">{e.name}</div>
                      <div className="aid">{e.id}</div>
                    </div>
                  </div>
                </td>
                <td>{e.dept}</td>
                <td>{e.role}</td>
                <td className="mo" style={{ fontWeight: 600 }}>{e.projects || 0}</td>
                <td className="mo" style={{ fontSize: '12px' }}>{fmt(e.join)}</td>
                <td><span className={`badge ${e.status === 'Active' ? 'bg' : 'ba'}`}>{e.status}</span></td>
                <td>
                  <button className="btn be" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => handleOpenView(e)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalType === 'view' && selectedEmp && (
        <div className="ov on">
          <div className="mdl" style={{ width: '850px', maxWidth: '95%', flexDirection: 'row', overflow: 'hidden', padding: 0 }}>
            {/* Left Side - White Pane */}
            <div style={{ flex: 1, padding: '36px', background: '#fff', overflowY: 'auto', maxHeight: '85vh' }}>
              
              {/* Personal Details */}
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Personal Details</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--bd2)' }}>
                <span style={{ color: 'var(--mu)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>✉ Email</span>
                <strong style={{ fontSize: '13px' }}>{selectedEmp.email || 'N/A'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--bd2)' }}>
                <span style={{ color: 'var(--mu)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>📞 Phone</span>
                <strong style={{ fontSize: '13px', fontFamily: 'DM Mono' }}>{selectedEmp.mobile || 'N/A'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--bd2)' }}>
                <span style={{ color: 'var(--mu)', fontSize: '13px' }}>Gender</span>
                <strong style={{ fontSize: '13px' }}>Male</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--bd2)' }}>
                <span style={{ color: 'var(--mu)', fontSize: '13px' }}>Marital Status</span>
                <strong style={{ fontSize: '13px' }}>Married</strong>
              </div>

              {/* Employment Information */}
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginTop: '32px', marginBottom: '16px' }}>Employment Information</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--bd2)' }}>
                <span style={{ color: 'var(--mu)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>💼 Role</span>
                <strong style={{ fontSize: '13px' }}>{selectedEmp.title}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--bd2)' }}>
                <span style={{ color: 'var(--mu)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>₹ Salary</span>
                <strong style={{ fontSize: '13px', fontFamily: 'DM Mono' }}>₹ 42,000</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--bd2)' }}>
                <span style={{ color: 'var(--mu)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>🗓 Joining Date</span>
                <strong style={{ fontSize: '13px', fontFamily: 'DM Mono' }}>{fmt(selectedEmp.join) || 'N/A'}</strong>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '32px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Address</h3>
                  <div style={{ color: 'var(--tx2)', fontSize: '13px', lineHeight: '1.6', display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--mu)' }}>📍</span>
                    <div>
                      Plot 14, Phase II Ind. Estate,<br/>
                      Hosur, Tamil Nadu - 635109
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>System Credentials</h3>
                  <div style={{ background: 'var(--sf2)', border: '1px solid var(--bd)', borderRadius: 'var(--r)', padding: '10px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--tx2)' }}>Username</span>
                      <strong style={{ fontFamily: 'DM Mono', fontSize: '12.5px', color: 'var(--bl)' }}>{selectedEmp.username}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', color: 'var(--tx2)' }}>Password</span>
                      <strong style={{ fontFamily: 'DM Mono', fontSize: '12.5px', color: 'var(--rd)' }}>{selectedEmp.password}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--bd)', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn bw" onClick={() => setModalType(null)}>Close Profile</button>
              </div>

            </div>

            {/* Right Side - Dark Pane */}
            <div style={{ width: '300px', background: '#0f172a', color: '#fff', padding: '40px 24px', textAlign: 'center', position: 'relative' }}>
              
              <div style={{ width: '110px', height: '110px', margin: '20px auto 24px', borderRadius: '50%', border: '4px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: '800', background: rC(selectedEmp.name) }}>
                {getInitials(selectedEmp.name)}
              </div>
              
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>{selectedEmp.name}</h2>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>{selectedEmp.title}</div>
              <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'DM Mono', marginBottom: '22px' }}>ID: {selectedEmp.id}</div>
              
              <div style={{ display: 'inline-block', background: '#10b981', color: '#fff', padding: '4px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: 600, marginBottom: '32px' }}>
                Present
              </div>
              
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '32px' }}></div>
              
              <div style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: 600, marginBottom: '6px' }}>{selectedEmp.dept}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>PowerGrid ERP</div>

            </div>
          </div>
        </div>
      )}

      {modalType === 'add' && (
        <div className="ov on">
          <div className="mdl" style={{ width: '560px' }}>
            <div className="mhd">
              <div>
                <div className="mht">Add New Employee</div>
                <div className="mhs">{formData.id}</div>
              </div>
              <div className="cbtn" onClick={() => setModalType(null)}>×</div>
            </div>
            <div className="mbd">
              <div className="ssep" style={{ marginTop: 0 }}>Personal & Corporate Details</div>
              <div className="fg2">
                <div className="fld">
                  <label>Full Name *</label>
                  <input type="text" value={formData.fname} onChange={e => setFormData({ ...formData, fname: e.target.value })} />
                </div>
                <div className="fld">
                  <label>Designation / Title *</label>
                  <input type="text" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                </div>
                <div className="fld">
                  <label>Department</label>
                  <select value={formData.dept} onChange={e => setFormData({ ...formData, dept: e.target.value })}>
                    <option value="">Select Department</option>
                    <option value="Field Engineering">Field Engineering</option>
                    <option value="Design & Engineering">Design & Engineering</option>
                    <option value="Testing & QC">Testing & QC</option>
                    <option value="Workshop / Fabrication">Workshop / Fabrication</option>
                  </select>
                </div>
                <div className="fld">
                  <label>Date of Joining</label>
                  <input type="date" value={formData.join} onChange={e => setFormData({ ...formData, join: e.target.value })} />
                </div>
                <div className="fld">
                  <label>Mobile Number</label>
                  <input type="text" value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} />
                </div>
                <div className="fld">
                  <label>Email Address</label>
                  <input type="text" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>

              <div className="ssep">System Credentials</div>
              <div className="fg2">
                <div className="fld">
                  <label>Login Username *</label>
                  <input type="text" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} placeholder="e.g. emp004" />
                </div>
                <div className="fld">
                  <label>Login Password *</label>
                  <input type="text" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="temporary password" />
                </div>
              </div>
            </div>
            <div className="mft">
              <button className="btn bw" onClick={() => setModalType(null)}>Cancel</button>
              <button className="btn bp" onClick={handleAddSubmit}>Save Employee Registration</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
