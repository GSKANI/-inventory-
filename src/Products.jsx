import React, { useState } from 'react';

export default function Products({ prods, setProds, searchQuery = '' }) {
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const initialForm = {
    name: '', code: '', cat: 'HT', rating: '', inProd: 0, ready: 0, lead: '', status: 'Active', desc: ''
  };
  const [formData, setFormData] = useState(initialForm);

  let filtered = filter === 'all' ? prods : prods.filter(p => p.cat === filter);
  if (searchQuery) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.code.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  const handleOpen = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData(initialForm);
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      setProds(prods.map(p => p.id === editingItem.id ? { ...formData } : p));
    } else {
      setProds([...prods, { ...formData, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProds(prods.filter(p => p.id !== id));
    }
  };

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Panel Board Products</div>
          <div className="pgs">Full catalogue — HT, LT, Control & Specialty panels</div>
        </div>
        <button className="btn bp" onClick={() => handleOpen()}>+ Add Product</button>
      </div>
      <div className="card">
        <div className="ch">
          <div className="ct">
            All Products <span className="chip mo" style={{ marginLeft: '6px' }}>{filtered.length}</span>
          </div>
          <div className="tabs">
            {['all', 'HT', 'LT', 'Control', 'Spares'].map(f => (
              <div
                key={f}
                className={`tab ${filter === f ? 'on' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All' : f}
              </div>
            ))}
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Voltage / Rating</th>
              <th>In Production</th>
              <th>Ready Stock</th>
              <th>Lead Time</th>
              <th>Status</th>
              <th className="tc">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  <div className="pcl">
                    <div className="pav" style={{ fontSize: '9px', width: '38px' }}>
                      {p.code.split('-').slice(1, 3).join('') || 'PNL'}
                    </div>
                    <div>
                      <div className="pn">{p.name}</div>
                      <div className="ps2">{p.code}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {p.cat === 'HT' ? (
                    <span className="vtag">{p.cat}</span>
                  ) : p.cat === 'LT' ? (
                    <span className="svtag">{p.cat}</span>
                  ) : (
                    <span className="chip" style={{ fontSize: '10px' }}>{p.cat}</span>
                  )}
                </td>
                <td className="mo" style={{ fontSize: '12px' }}>{p.rating}</td>
                <td className="mo" style={{ color: p.inProd > 0 ? '#b45309' : 'var(--mu)' }}>{p.inProd}</td>
                <td className="mo" style={{ color: p.ready > 0 ? '#026d43' : 'var(--mu)' }}>{p.ready}</td>
                <td style={{ fontSize: '12px', color: 'var(--mu)' }}>{p.lead}</td>
                <td>
                  <span className={`badge ${p.status === 'Active' ? 'bg' : 'bz'}`}>{p.status}</span>
                </td>
                <td className="tc">
                  <div className="act-btns">
                    <button className="btn be" style={{ padding: '4px 9px', fontSize: '11px' }} onClick={() => handleOpen(p)}>✏️</button>
                    <button className="btn bd" style={{ padding: '4px 9px', fontSize: '11px' }} onClick={() => handleDelete(p.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="ov" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="mdl" style={{ width: '600px', maxWidth: '90%' }}>
            <div className="mhd">
              <div>
                <div className="mht">{editingItem ? 'Edit Panel Product' : 'Add Panel Product'}</div>
                <div className="mhs">Panel catalogue entry</div>
              </div>
              <div className="cbtn" onClick={() => setModalOpen(false)}>×</div>
            </div>
            <div className="mbd">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="fld">
                  <label>Product Name *</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="fld">
                  <label>Product Code *</label>
                  <input type="text" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} />
                </div>
                <div className="fld">
                  <label>Category *</label>
                  <select value={formData.cat} onChange={e => setFormData({ ...formData, cat: e.target.value })}>
                    <option value="HT">HT</option>
                    <option value="LT">LT</option>
                    <option value="Control">Control</option>
                    <option value="Spares">Spares</option>
                  </select>
                </div>
                <div className="fld">
                  <label>Voltage / Rating *</label>
                  <input type="text" value={formData.rating} onChange={e => setFormData({ ...formData, rating: e.target.value })} />
                </div>
                <div className="fld">
                  <label>In Production</label>
                  <input type="number" value={formData.inProd} onChange={e => setFormData({ ...formData, inProd: Number(e.target.value) })} />
                </div>
                <div className="fld">
                  <label>Ready Stock</label>
                  <input type="number" value={formData.ready} onChange={e => setFormData({ ...formData, ready: Number(e.target.value) })} />
                </div>
                <div className="fld">
                  <label>Lead Time</label>
                  <input type="text" value={formData.lead} onChange={e => setFormData({ ...formData, lead: e.target.value })} />
                </div>
                <div className="fld">
                  <label>Status</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="fld">
                <label>Description</label>
                <textarea rows="3" placeholder="Scope of supply..." value={formData.desc || ''} onChange={e => setFormData({ ...formData, desc: e.target.value })}></textarea>
              </div>
            </div>
            <div className="mft">
              <button className="btn bw" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn bp" onClick={handleSave}>{editingItem ? 'Update Product' : 'Save Product'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
