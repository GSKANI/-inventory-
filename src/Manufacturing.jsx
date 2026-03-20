import React, { useState } from 'react';

export default function Manufacturing({ searchQuery = '', warehouseStock = [], setWarehouseStock }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [prodForm, setProdForm] = useState({ name: '', qty: 1, client: '' });
  const [activeWOs, setActiveWOs] = useState([
    { id: 'WO-0091', type: 'HT VCB Panel 11kV', client: 'TANGEDCO', qty: 2, stage: 'Wiring', progress: 70, due: 'Mar 22' },
    { id: 'WO-0089', type: 'MCC Panel Board', client: 'Aavin Dairy', qty: 3, stage: 'Wiring', progress: 80, due: 'Mar 24' },
    { id: 'WO-0088', type: 'APFC Panel 300kVAR', client: 'Srinivasa Textiles', qty: 1, stage: 'QC / Testing', progress: 95, due: 'Mar 20' }
  ]);

  const handleStartProduction = () => {
    if (!prodForm.name) return;

    let required = [];
    const n = prodForm.name.toLowerCase();
    
    // Simple Auto-BOM mapping logic
    if (n.includes('vcb') || n.includes('ht')) {
      required.push({ short: 'VCB', qty: 1 * prodForm.qty });
      required.push({ short: 'INS', qty: 3 * prodForm.qty });
      required.push({ short: 'BUS', qty: 2 * prodForm.qty });
    } else if (n.includes('acb') || n.includes('lt')) {
      required.push({ short: 'ACB', qty: 1 * prodForm.qty });
      required.push({ short: 'BUS', qty: 5 * prodForm.qty });
    } else {
      required.push({ short: 'BUS', qty: 3 * prodForm.qty });
    }

    // Verify Stock exists
    let alertText = `Starting Production for ${prodForm.qty}x ${prodForm.name}!\n\nAuto-deducting from Warehouse:\n`;
    let canBuild = true;

    const newStock = warehouseStock.map(c => {
      const req = required.find(r => r.short === c.short);
      if (req) {
        if (c.inStock < req.qty) {
          canBuild = false;
          alertText += `❌ Not enough ${c.name}! Need ${req.qty}, have ${c.inStock}.\n`;
        } else {
          alertText += `✅ Used ${req.qty} ${c.unit || 'units'} of ${c.short}\n`;
        }
        return { 
          ...c, 
          inStock: c.inStock - req.qty,
          status: (c.inStock - req.qty) <= c.reorder ? 'Low Stock' : 'Healthy',
          statusClass: (c.inStock - req.qty) <= c.reorder ? 'ba' : 'bg',
          percent: Math.max(0, Math.min(100, ((c.inStock - req.qty) / (c.reorder * 3)) * 100))
        };
      }
      return c;
    });

    if (!canBuild) {
      alert("PRODUCTION HALTED\n\n" + alertText + "\nPlease Auto-Order more components from Warehouse first.");
      return;
    }

    if (setWarehouseStock) setWarehouseStock(newStock);
    alert(alertText);

    setActiveWOs([
      {
        id: `WO-${Date.now().toString().slice(-4)}`,
        type: prodForm.name,
        client: prodForm.client || 'Internal Stock',
        qty: prodForm.qty,
        stage: 'Fabrication',
        progress: 10,
        due: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0] // 14 days later
      },
      ...activeWOs
    ]);
    
    setModalOpen(false);
    setProdForm({ name: '', qty: 1, client: '' });
  };
  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Production Floor</div>
          <div className="pgs">Active fabrication and assembly batches</div>
        </div>
        <button className="btn bp" onClick={() => setModalOpen(true)}>+ Start Production</button>
      </div>
      <div className="sg sg3">
        <div className="sc"><div className="sct"><div className="scl">Active Work Orders</div></div><div className="scv" style={{ color: '#b45309' }}>{activeWOs.length}</div><div className="scf">in progress</div></div>
        <div className="sc"><div className="sct"><div className="scl">In Fabrication</div></div><div className="scv" style={{ color: '#a8510a' }}>4</div><div className="scf">sheet metal work</div></div>
        <div className="sc"><div className="sct"><div className="scl">Completed (March)</div></div><div className="scv" style={{ color: '#026d43' }}>9</div><div className="scf"><span className="up">↑ 28%</span> vs Feb</div></div>
      </div>
      <div className="card">
        <div className="ch"><div className="ct">Work Orders</div></div>
        <table>
          <thead>
            <tr>
              <th>Work Order</th>
              <th>Panel Type</th>
              <th>Client</th>
              <th>Qty</th>
              <th>Stage</th>
              <th>Progress</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            {activeWOs.map(wo => {
              const bClass = wo.progress >= 90 ? 'bfg' : wo.progress >= 50 ? 'bfa' : 'bfb';
              const pBadge = wo.progress >= 90 ? 'bg' : wo.progress >= 50 ? 'ba' : 'bb';
              return (
              <tr key={wo.id}>
                <td><span className="chip mo">{wo.id}</span></td>
                <td>{wo.type}</td>
                <td>{wo.client}</td>
                <td className="mo">{wo.qty}</td>
                <td><span className={`badge ${pBadge}`}>{wo.stage}</span></td>
                <td>
                  <div className="sbar">
                    <div className="btr" style={{ width: '80px' }}>
                      <div className={`bfl ${bClass}`} style={{ width: `${wo.progress}%` }}></div>
                    </div>
                    <span className="bnum">{wo.progress}%</span>
                  </div>
                </td>
                <td className="mo" style={{ fontSize: '12px' }}>{wo.due.substring(0, 10)}</td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="ov on">
          <div className="mdl" style={{ width: '450px' }}>
            <div className="mhd">
              <div>
                <div className="mht">Start New Production Batch</div>
              </div>
              <div className="cbtn" onClick={() => setModalOpen(false)}>×</div>
            </div>
            <div className="mbd">
              <div style={{ padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#475569', marginBottom: '16px' }}>
                <strong>Auto-BOM Engine Active</strong><br/>
                Intelligently collects raw materials from the warehouse based on the panel type you enter. E.g. entering "VCB" or "HT" will collect Vacuum Breakers and Insulators.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="fld">
                  <label>Product / Panel Type *</label>
                  <input type="text" placeholder="e.g. HT VCB Panel 11kV" value={prodForm.name} onChange={e => setProdForm({ ...prodForm, name: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="fld">
                    <label>Quantity to Build *</label>
                    <input type="number" min="1" value={prodForm.qty} onChange={e => setProdForm({ ...prodForm, qty: Number(e.target.value) })} />
                  </div>
                  <div className="fld">
                    <label>Assigned Client</label>
                    <input type="text" placeholder="Optional" value={prodForm.client} onChange={e => setProdForm({ ...prodForm, client: e.target.value })} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mft">
              <button className="btn bw" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn bp" onClick={handleStartProduction}>Queue to Floor</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
