import React, { useState } from 'react';

export default function Warehouse({ searchQuery = '', pos, setPos, warehouseStock, setWarehouseStock }) {
  const [orderModal, setOrderModal] = useState(false);
  const [orderItem, setOrderItem] = useState(null);
  const [orderForm, setOrderForm] = useState({ qty: 0, date: '' });

  const lowStockCount = warehouseStock.filter(c => c.inStock <= c.reorder).length;

  let filtered = warehouseStock;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.short.toLowerCase().includes(q));
  }

  const handleOrderClick = (c) => {
    setOrderItem(c);
    setOrderForm({
      qty: (c.reorder * 2) - c.inStock,
      date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
    });
    setOrderModal(true);
  };

  const handleOrderSubmit = () => {
    if (pos && setPos) {
      const supp = orderItem.cat === 'HT' ? 'Crompton Greaves (HT Supplies)' : 'Schneider Electric (LT Supplies)';
      const newPo = {
        id: `PO-${Date.now().toString().slice(-4)}`,
        comp: orderItem.name,
        qty: orderItem.unit || 'nos',
        qtyNum: Number(orderForm.qty),
        supplier: supp,
        rate: 550, // mock base rate
        appliedDate: new Date().toISOString().split('T')[0],
        date: orderForm.date,
        status: 'Pending'
      };
      setPos([newPo, ...pos]);
    }
    alert(`Order Form Sent to Supplier for ${orderItem.name}! Tracking and quantities updated.`);
    setOrderModal(false);
  };

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Warehouse & Store</div>
          <div className="pgs">Raw material inventory and component stock</div>
        </div>
      </div>
      <div className="sg sg3">
        <div className="sc"><div className="sct"><div className="scl">Component SKUs</div></div><div className="scv">{warehouseStock.length}</div><div className="scf">across categories</div></div>
        <div className="sc"><div className="sct"><div className="scl">Low Stock Items</div></div><div className="scv" style={{ color: '#a8510a' }}>{lowStockCount}</div><div className="scf">below reorder</div></div>
        <div className="sc"><div className="sct"><div className="scl">Pending POs</div></div><div className="scv" style={{ color: '#b01f1f' }}>5</div><div className="scf">awaiting delivery</div></div>
      </div>
      <div className="card">
        <div className="ch"><div className="ct">Component Stock</div></div>
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Category</th>
              <th>Location</th>
              <th>In Stock</th>
              <th>Reorder At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td>
                  <div className="pcl">
                    <div className="pav">{c.short}</div>
                    <div>
                      <div className="pn">{c.name}</div>
                      <div className="ps2">{c.code}</div>
                    </div>
                  </div>
                </td>
                <td><span className={c.cat === 'HT' ? 'vtag' : 'svtag'}>{c.cat}</span></td>
                <td><span className="chip mo" style={{ fontSize: '11px', background: 'var(--sf)' }}>{c.loc}</span></td>
                <td>
                  <div className="sbar">
                    <div className="btr"><div className={`bfl ${c.colorC}`} style={{ width: `${c.percent}%` }}></div></div>
                    <span className="bnum">{c.inStock}{c.unit || ''}</span>
                  </div>
                </td>
                <td className="mo" style={{ fontSize: '12px' }}>{c.reorder}{c.unit || ''}</td>
                <td>
                  <span className={`badge ${c.statusClass}`} style={{ marginBottom: '4px', display: 'inline-block' }}>{c.status}</span>
                  {c.inStock <= c.reorder && (
                    <button className="btn bs" style={{ padding: '2px 6px', fontSize: '10px', display: 'block', width: '100%', marginTop: '4px', borderColor: '#a8510a', color: '#a8510a' }} onClick={() => handleOrderClick(c)}>
                      + Order
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orderModal && orderItem && (
        <div className="ov on">
          <div className="mdl" style={{ width: '450px' }}>
            <div className="mhd">
              <div>
                <div className="mht">Auto Supplier Order Form</div>
                <div className="mhs">{orderItem.code}</div>
              </div>
              <div className="cbtn" onClick={() => setOrderModal(false)}>×</div>
            </div>
            <div className="mbd">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '12px', background: '#fffbeb', border: '1px solid #fef08a', borderRadius: '8px', fontSize: '12px', color: '#b45309', marginBottom: '8px' }}>
                  <strong>{orderItem.name}</strong> is critically low ({orderItem.inStock}{orderItem.unit || ''} remaining vs minimum {orderItem.reorder}{orderItem.unit || ''}).
                </div>
                
                <div className="fld">
                  <label>Supplier (Auto-assigned based on category)</label>
                  <select className="f-inp" readOnly value="supplier1">
                    <option value="supplier1">{orderItem.cat === 'HT' ? 'Crompton Greaves (HT Supplies)' : 'Schneider Electric (LT Supplies)'}</option>
                  </select>
                </div>

                <div className="fld">
                  <label>Order Quantity Needed</label>
                  <input type="number" value={orderForm.qty} onChange={(e) => setOrderForm({ ...orderForm, qty: Number(e.target.value) })} className="f-inp" />
                  <div style={{ fontSize: '11px', color: 'var(--mu)', marginTop: '4px' }}>Recommended auto-replenishment qty</div>
                </div>

                <div className="fld">
                  <label>Expected Delivery Request</label>
                  <input type="date" className="f-inp" value={orderForm.date} onChange={(e) => setOrderForm({ ...orderForm, date: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="mft">
              <button className="btn bw" onClick={() => setOrderModal(false)}>Cancel</button>
              <button className="btn bp" onClick={handleOrderSubmit}>Submit to Supplier</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
