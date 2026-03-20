import React, { useState } from 'react';
import { fmt } from './data';

export default function Orders({ pos, setPos, searchQuery = '' }) {
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const initialForm = {
    id: `PO-${Date.now().toString().slice(-4)}`, comp: '', qty: '', qtyNum: 0, supplier: '', rate: 0, date: new Date().toISOString().split('T')[0], status: 'Pending'
  };
  const [formData, setFormData] = useState(initialForm);

  let filtered = filter === 'all' ? pos : pos.filter(p => p.status === filter);
  if (searchQuery) {
    filtered = filtered.filter(p => p.comp.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase()) || p.supplier.toLowerCase().includes(searchQuery.toLowerCase()));
  }
  const totalValue = pos.reduce((s, p) => s + (p.rate * p.qtyNum), 0);

  const pendingCount = pos.filter(p => p.status === 'Pending').length;
  const receivedCount = pos.filter(p => p.status === 'Received').length;

  const STATUS_STYLE = { Pending: 'ba', Received: 'bg', Cancelled: 'br' };

  const handleOpen = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ ...initialForm, id: `PO-${Date.now().toString().slice(-4)}` });
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      setPos(pos.map(p => p.id === editingItem.id ? { ...formData } : p));
    } else {
      setPos([{ ...formData }, ...pos]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this purchase order?')) {
      setPos(pos.filter(p => p.id !== id));
    }
  };

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Purchase Orders</div>
          <div className="pgs">Component and raw material procurement</div>
        </div>
        <button className="btn bp" onClick={() => handleOpen()}>+ New PO</button>
      </div>

      <div className="sg sg4">
        <div className="sc"><div className="sct"><div className="scl">Total Orders</div></div><div className="scv">{pos.length}</div><div className="scf">all time</div></div>
        <div className="sc"><div className="sct"><div className="scl">Pending</div></div><div className="scv" style={{ color: '#a8510a' }}>{pendingCount}</div><div className="scf">awaiting delivery</div></div>
        <div className="sc"><div className="sct"><div className="scl">Received</div></div><div className="scv" style={{ color: '#026d43' }}>{receivedCount}</div><div className="scf">this month</div></div>
        <div className="sc"><div className="sct"><div className="scl">Total Value</div></div><div className="scv" style={{ color: '#b45309' }}>₹{(totalValue / 100000).toFixed(1)}L</div><div className="scf">all orders</div></div>
      </div>

      <div className="card">
        <div className="ch">
          <div className="ct">All Purchase Orders <span className="chip mo" style={{ marginLeft: '6px' }}>{filtered.length}</span></div>
          <div className="tabs">
            {['all', 'Pending', 'Received', 'Cancelled'].map(f => (
              <div key={f} className={`tab ${filter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f}
              </div>
            ))}
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>PO ID</th>
              <th>Component</th>
              <th>Qty</th>
              <th>Supplier</th>
              <th>Value</th>
              <th>Expected</th>
              <th>Status</th>
              <th className="tc">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(po => (
              <tr key={po.id}>
                <td><span className="chip mo">{po.id}</span></td>
                <td><strong>{po.comp}</strong></td>
                <td className="mo" style={{ fontSize: '12px' }}>{po.qtyNum} {po.qty.replace(/[0-9]/g, '').trim() || 'Nos'}</td>
                <td>{po.supplier}</td>
                <td className="mo" style={{ fontWeight: 600 }}>₹{(po.rate * po.qtyNum).toLocaleString('en-IN')}</td>
                <td className="mo" style={{ fontSize: '12px' }}>{fmt(po.date)}</td>
                <td><span className={`badge ${STATUS_STYLE[po.status] || 'bz'}`}>{po.status}</span></td>
                <td className="tc">
                  <div className="act-btns">
                    <button className="btn be" style={{ padding: '4px 9px', fontSize: '11px' }} onClick={() => handleOpen(po)}>✏️</button>
                    <button className="btn bd" style={{ padding: '4px 9px', fontSize: '11px' }} onClick={() => handleDelete(po.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="ov" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="mdl" style={{ width: '500px', maxWidth: '90%' }}>
            <div className="mhd">
              <div>
                <div className="mht">{editingItem ? 'Edit Purchase Order' : 'New Purchase Order'}</div>
                <div className="mhs">{formData.id}</div>
              </div>
              <div className="cbtn" onClick={() => setModalOpen(false)}>×</div>
            </div>
            <div className="mbd">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="fld">
                  <label>Component Name *</label>
                  <input type="text" value={formData.comp} onChange={e => setFormData({ ...formData, comp: e.target.value })} />
                </div>
                <div className="fld">
                  <label>Supplier *</label>
                  <input type="text" value={formData.supplier} onChange={e => setFormData({ ...formData, supplier: e.target.value })} />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="fld">
                    <label>Quantity (Num) *</label>
                    <input type="number" value={formData.qtyNum} onChange={e => setFormData({ ...formData, qtyNum: Number(e.target.value) })} />
                  </div>
                  <div className="fld">
                    <label>Unit (e.g. pcs, nos, m)</label>
                    <input type="text" value={formData.qty} onChange={e => setFormData({ ...formData, qty: e.target.value })} />
                  </div>
                  <div className="fld">
                    <label>Rate Per Unit (₹) *</label>
                    <input type="number" value={formData.rate} onChange={e => setFormData({ ...formData, rate: Number(e.target.value) })} />
                  </div>
                  <div className="fld">
                    <label>Total Value</label>
                    <div style={{ padding: '8px 12px', background: 'var(--bg)', borderRadius: 'var(--r)', border: '1px solid var(--bd2)' }}>
                      ₹{(formData.rate * formData.qtyNum).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="fld">
                    <label>Expected Date *</label>
                    <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                  </div>
                  <div className="fld">
                    <label>Status</label>
                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                      <option value="Pending">Pending</option>
                      <option value="Received">Received</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="mft">
              <button className="btn bw" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn bp" onClick={handleSave}>{editingItem ? 'Update PO' : 'Raise PO'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
