import React, { useState } from 'react';

export default function Suppliers({ searchQuery = '' }) {
  const [suppliers, setSuppliers] = useState([
    { id: 'SUP-001', name: 'Crompton Greaves', catFrom: 'HT Connectors', catTo: 'High Voltage Division', email: 'sales@crompton.in', mobile: '9840012345', status: 'Active' },
    { id: 'SUP-002', name: 'Schneider Electric', catFrom: 'LT Switchgear', catTo: 'Low Voltage Division', email: 'orders@schneider.in', mobile: '9840054321', status: 'Active' },
    { id: 'SUP-003', name: 'Polycab India', catFrom: 'Wires & Cables', catTo: 'Fabrication Division', email: 'b2b@polycab.com', mobile: '9840011111', status: 'Inactive' }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const initialForm = {
    id: `SUP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    name: '',
    catFrom: '',
    catTo: '',
    email: '',
    mobile: '',
    status: 'Active'
  };

  const [formData, setFormData] = useState(initialForm);

  let displayData = suppliers;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    displayData = suppliers.filter(s => s.name.toLowerCase().includes(q) || s.catFrom.toLowerCase().includes(q));
  }

  const handleOpen = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ ...initialForm, id: `SUP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}` });
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name) return;
    if (editingItem) {
      setSuppliers(suppliers.map(s => s.id === editingItem.id ? { ...formData } : s));
    } else {
      setSuppliers([{ ...formData }, ...suppliers]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(suppliers.filter(s => s.id !== id));
    }
  };

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Supplier Management</div>
          <div className="pgs">Directory of verified material providers and their categories</div>
        </div>
        <button className="btn bp" onClick={() => handleOpen()}>+ Add Supplier</button>
      </div>

      <div className="card">
        <div className="ch">
          <div className="ct">All Suppliers <span className="chip mo" style={{ marginLeft: '6px' }}>{displayData.length}</span></div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Supplier Name</th>
              <th>From Category</th>
              <th>To Category</th>
              <th>Contact Info</th>
              <th>Status</th>
              <th className="tc">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map(s => (
              <tr key={s.id}>
                <td><span className="chip mo">{s.id}</span></td>
                <td><strong>{s.name}</strong></td>
                <td><span className="chip" style={{ fontSize: '11px' }}>{s.catFrom}</span></td>
                <td><span className="chip" style={{ fontSize: '11px', background: '#f1f5f9' }}>{s.catTo}</span></td>
                <td>
                  <div style={{ fontSize: '12px' }}>{s.mobile}</div>
                  <div style={{ fontSize: '10px', color: 'var(--mu)' }}>{s.email}</div>
                </td>
                <td><span className={`badge ${s.status === 'Active' ? 'bg' : 'ba'}`}>{s.status}</span></td>
                <td className="tc">
                  <div className="act-btns">
                    <button className="btn be" style={{ padding: '4px 9px', fontSize: '11px' }} onClick={() => handleOpen(s)}>✏️</button>
                    <button className="btn bd" style={{ padding: '4px 9px', fontSize: '11px' }} onClick={() => handleDelete(s.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="ov on">
          <div className="mdl" style={{ width: '500px' }}>
            <div className="mhd">
              <div>
                <div className="mht">{editingItem ? 'Edit Supplier' : 'New Supplier'}</div>
                <div className="mhs">{formData.id}</div>
              </div>
              <div className="cbtn" onClick={() => setModalOpen(false)}>×</div>
            </div>
            <div className="mbd">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="fld">
                  <label>Supplier Name *</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="fld">
                    <label>From Category</label>
                    <input type="text" placeholder="e.g. Raw Materials" value={formData.catFrom} onChange={e => setFormData({ ...formData, catFrom: e.target.value })} />
                  </div>
                  <div className="fld">
                    <label>To Category</label>
                    <input type="text" placeholder="e.g. HT Division" value={formData.catTo} onChange={e => setFormData({ ...formData, catTo: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="fld">
                    <label>Email Address</label>
                    <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div className="fld">
                    <label>Mobile / Phone</label>
                    <input type="text" value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} />
                  </div>
                </div>
                <div className="fld">
                  <label>Status</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mft">
              <button className="btn bw" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn bp" onClick={handleSave}>{editingItem ? 'Update Supplier' : 'Save Supplier'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
