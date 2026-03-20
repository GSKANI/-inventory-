import React, { useState } from 'react';
import { fmt } from './data';

export default function Orders({ pos, setPos, searchQuery = '' }) {
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  const [trackItem, setTrackItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const initialForm = {
    id: `PO-${Date.now().toString().slice(-4)}`, comp: '', qty: '', qtyNum: 0, supplier: '', rate: 0, date: new Date().toISOString().split('T')[0], appliedDate: new Date().toISOString().split('T')[0], status: 'Pending'
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
                    <button className="btn bo" style={{ padding: '4px 9px', fontSize: '11px', background: '#fff', border: '1px solid #d1d5db', color: '#111827' }} onClick={() => { setTrackItem(po); setTrackOpen(true); }}>📍 Track</button>
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
              <button className="btn bp" onClick={handleSave}>{editingItem ? 'Update PO' : 'Save Purchase Order'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Order Tracking Visual Modal */}
      {trackOpen && trackItem && (
        <div className="ov on" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="mdl" style={{ width: '800px', maxWidth: '95%', padding: 0 }}>
            {/* Header */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--bd)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', borderRadius: '8px 8px 0 0' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--tx)' }}>PO Tracking Process</div>
              <div className="cbtn" onClick={() => setTrackOpen(false)}>×</div>
            </div>
            
            <div style={{ padding: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#475569', borderBottom: '1px solid var(--bd)', paddingBottom: '12px', marginBottom: '16px' }}>
                Order ID: <strong>{trackItem.id}</strong>
              </div>

              {/* Grid Status Info */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px', fontSize: '12px', color: '#64748b' }}>
                <div>
                  <div>Estimated Delivery time:</div>
                  <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '4px' }}>{fmt(trackItem.date)}</div>
                </div>
                <div>
                  <div>Shipping BY:</div>
                  <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '4px' }}>{trackItem.supplier.includes('Crompton') ? 'BLUEDART' : 'DTDC'}, | 📞 +91 98400 12345</div>
                </div>
                <div>
                  <div>Status:</div>
                  <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '4px' }}>{trackItem.status === 'Received' ? 'Delivered' : 'On the way'}</div>
                </div>
                <div>
                  <div>Tracking #:</div>
                  <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '4px' }}>BD{Math.floor(Math.random() * 90000000) + 10000000}</div>
                </div>
              </div>

              {/* Graphic Stepper UI */}
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                {/* Background Line */}
                <div style={{ position: 'absolute', top: '15px', left: '40px', right: '40px', height: '4px', background: '#e2e8f0', zIndex: 0 }}></div>
                {/* Active Line Overlap */}
                <div style={{ position: 'absolute', top: '15px', left: '40px', right: '40px', height: '4px', background: trackItem.status === 'Received' ? '#ea580c' : 'linear-gradient(to right, #ea580c 50%, transparent 50%)', zIndex: 1 }}></div>

                {/* Step 1 */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#ea580c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0 0 0 4px #fff' }}>✓</div>
                  <div style={{ fontSize: '11px', fontWeight: 500, color: '#333', marginTop: '12px', textAlign: 'center' }}>Order confirmed</div>
                </div>

                {/* Step 2 */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#ea580c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', boxShadow: '0 0 0 4px #fff' }}>👤</div>
                  <div style={{ fontSize: '11px', fontWeight: 500, color: '#333', marginTop: '12px', textAlign: 'center' }}>Picked by courier</div>
                </div>

                {/* Step 3 */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: trackItem.status === 'Received' ? '#ea580c' : '#e2e8f0', color: trackItem.status === 'Received' ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', boxShadow: '0 0 0 4px #fff' }}>🚚</div>
                  <div style={{ fontSize: '11px', fontWeight: 500, color: '#333', marginTop: '12px', textAlign: 'center' }}>On the way</div>
                </div>

                {/* Step 4 */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: trackItem.status === 'Received' ? '#ea580c' : '#e2e8f0', color: trackItem.status === 'Received' ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', boxShadow: '0 0 0 4px #fff' }}>📦</div>
                  <div style={{ fontSize: '11px', fontWeight: 500, color: '#333', marginTop: '12px', textAlign: 'center' }}>Ready for pickup</div>
                </div>
              </div>

              {/* Items Detail Area */}
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '24px 0', borderTop: '1px solid var(--bd)', borderBottom: '1px solid var(--bd)' }}>
                <div style={{ width: '60px', height: '60px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>⚙️</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--tx)' }}>{trackItem.comp}</div>
                  <div style={{ fontSize: '12px', color: 'var(--mu)', marginTop: '4px' }}>Supplier: {trackItem.supplier}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--bl)', marginTop: '4px' }}>₹{(trackItem.rate * trackItem.qtyNum).toLocaleString('en-IN')}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <div style={{ fontSize: '12px', color: 'var(--mu)', marginBottom: '4px' }}>Quantity</div>
                   <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--tx)' }}>{trackItem.qty}</div>
                </div>
              </div>

              {/* Footer Btn */}
              <div style={{ marginTop: '24px' }}>
                <button className="btn bo" style={{ background: '#ea580c', color: 'white', border: 'none', padding: '8px 16px', fontWeight: 600 }} onClick={() => setTrackOpen(false)}>
                  &lt; Back to orders
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
