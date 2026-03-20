import React, { useState } from 'react';
import { INVOICES, fmt } from './data';

export default function Invoices({ searchQuery = '' }) {
  const [filter, setFilter] = useState('all');
  const [invs, setInvs] = useState(INVOICES);
  const [modalOpen, setModalOpen] = useState(false);
  
  const initialForm = {
    id: `INV-26-${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`,
    client: '',
    item: '',
    amount: 0,
    issue: new Date().toISOString().split('T')[0],
    due: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'Pending'
  };
  const [formData, setFormData] = useState(initialForm);

  let filtered = filter === 'all' ? invs : invs.filter(i => i.status === filter);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(i => 
      i.client.toLowerCase().includes(q) || 
      i.id.toLowerCase().includes(q) || 
      i.item.toLowerCase().includes(q)
    );
  }

  const stats = {
    paid: invs.filter(i => i.status === 'Paid').reduce((s, i) => s + i.amount, 0),
    pend: invs.filter(i => i.status === 'Pending').reduce((s, i) => s + i.amount, 0),
    over: invs.filter(i => i.status === 'Overdue').reduce((s, i) => s + i.amount, 0),
  };

  const IS = { Paid: 'bg', Pending: 'ba', Overdue: 'br' };

  const handleOpen = () => {
    setFormData({ ...initialForm, id: `INV-26-${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}` });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.client || !formData.item) return;
    setInvs([formData, ...invs]);
    setModalOpen(false);
  };

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Invoices & Receivables</div>
          <div className="pgs">Financial tracking against dispatched panels</div>
        </div>
        <button className="btn bp" onClick={handleOpen}>+ New Invoice</button>
      </div>

      <div className="sg sg3">
        <div className="sc"><div className="sct"><div className="scl">Paid Received</div></div><div className="scv" style={{ color: '#026d43' }}>₹{(stats.paid / 100000).toFixed(1)}L</div><div className="scf">this quarter</div></div>
        <div className="sc"><div className="sct"><div className="scl">Pending Clearance</div></div><div className="scv" style={{ color: '#a8510a' }}>₹{(stats.pend / 100000).toFixed(1)}L</div><div className="scf">net 30 days</div></div>
        <div className="sc"><div className="sct"><div className="scl">Overdue Amount</div></div><div className="scv" style={{ color: '#b01f1f' }}>₹{(stats.over / 100000).toFixed(1)}L</div><div className="scf">requires followup</div></div>
      </div>

      <div className="card">
        <div className="ch">
          <div className="ct">Accounts Receivable <span className="chip mo" style={{ marginLeft: '6px' }}>{filtered.length}</span></div>
          <div className="tabs">
            {['all', 'Paid', 'Pending', 'Overdue'].map(f => (
              <div key={f} className={`tab ${filter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f}
              </div>
            ))}
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Billed To</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Issued</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(iv => (
              <tr key={iv.id}>
                <td><span className="chip mo" style={{ fontWeight: 600 }}>{iv.id}</span></td>
                <td><strong>{iv.client}</strong></td>
                <td>{iv.item}</td>
                <td className="mo" style={{ fontWeight: 600 }}>₹{iv.amount?.toLocaleString('en-IN') || 0}</td>
                <td className="mo" style={{ fontSize: '12px' }}>{fmt(iv.issue)}</td>
                <td className="mo" style={{ fontSize: '12px' }}>{fmt(iv.due)}</td>
                <td><span className={`badge ${IS[iv.status]}`}>{iv.status}</span></td>
                <td><button className="btn bs" style={{ padding: '3px 8px', fontSize: '10.5px' }}>PDF</button></td>
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
                <div className="mht">Raise New Invoice</div>
                <div className="mhs">{formData.id}</div>
              </div>
              <div className="cbtn" onClick={() => setModalOpen(false)}>×</div>
            </div>
            <div className="mbd">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="fld">
                  <label>Client Name</label>
                  <input type="text" value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} />
                </div>
                <div className="fld">
                  <label>Service / Product Details</label>
                  <input type="text" value={formData.item} onChange={e => setFormData({ ...formData, item: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="fld">
                    <label>Amount (₹)</label>
                    <input type="number" value={formData.amount} onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })} />
                  </div>
                  <div className="fld">
                    <label>Status</label>
                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                  <div className="fld">
                    <label>Issue Date</label>
                    <input type="date" value={formData.issue} onChange={e => setFormData({ ...formData, issue: e.target.value })} />
                  </div>
                  <div className="fld">
                    <label>Due Date</label>
                    <input type="date" value={formData.due} onChange={e => setFormData({ ...formData, due: e.target.value })} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mft">
              <button className="btn bw" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn bp" onClick={handleSave}>Raise Invoice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
