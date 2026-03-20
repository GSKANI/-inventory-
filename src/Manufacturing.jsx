import React, { useState } from 'react';

export default function Manufacturing({ searchQuery = '', warehouseStock = [], setWarehouseStock }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [prodForm, setProdForm] = useState({ name: '', qty: 1, client: '' });
  const [activeWOs, setActiveWOs] = useState([
    { id: 'WO-0091', type: 'HT VCB Panel 11kV', client: 'TANGEDCO', qty: 2, stage: 'Wiring', progress: 70, start: '2026-03-05', due: '2026-03-22' },
    { id: 'WO-0089', type: 'MCC Panel Board', client: 'Aavin Dairy', qty: 3, stage: 'Wiring', progress: 80, start: '2026-03-08', due: '2026-03-24' },
    { id: 'WO-0088', type: 'APFC Panel 300kVAR', client: 'Srinivasa Textiles', qty: 1, stage: 'QC / Testing', progress: 95, start: '2026-03-01', due: '2026-03-20' }
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
        start: new Date().toISOString().split('T')[0],
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

      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="ch"><div className="ct">Production Tracking Chart</div></div>
        <div style={{ padding: '24px 24px 32px 24px', overflowX: 'auto' }}>
          <div style={{ minWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Timeline Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr 100px', gap: '16px', borderBottom: '1px solid var(--bd)', paddingBottom: '8px', fontSize: '11px', fontWeight: 600, color: 'var(--mu)', textTransform: 'uppercase' }}>
              <div>Work Order</div>
              <div>Timeline (Start → End Process)</div>
              <div style={{ textAlign: 'right' }}>Status</div>
            </div>

            {/* Timelines */}
            {activeWOs.map(wo => {
              // Convert dates for simple visual offsets
              const sDate = new Date(wo.start);
              const eDate = new Date(wo.due);
              const maxSpanDays = 45; // arbitrary chart width reference
              const diffDays = Math.ceil((eDate - sDate) / 86400000);
              const now = new Date();
              const elapsedDays = Math.ceil((now - sDate) / 86400000);
              
              const barWidth = Math.max(10, Math.min(100, (diffDays / maxSpanDays) * 100));
              const progWidth = wo.progress;
              const isOverdue = now > eDate && wo.progress < 100;
              const barCol = wo.progress >= 90 ? '#12b76a' : wo.progress >= 50 ? '#f79009' : '#3b82f6';
              
              return (
              <div key={wo.id} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 100px', gap: '16px', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--tx)' }}>{wo.id}</div>
                  <div style={{ fontSize: '10px', color: 'var(--mu)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{wo.type}</div>
                </div>
                
                {/* Visual Chart Track */}
                <div style={{ background: 'var(--sf2)', height: '24px', borderRadius: '4px', position: 'relative', overflow: 'visible', width: `${barWidth}%`, minWidth: '150px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${progWidth}%`, background: barCol, borderRadius: '4px', opacity: 0.8 }} />
                  {/* Start / End Track Markers */}
                  <div style={{ position: 'absolute', left: '-10px', top: '28px', fontSize: '10px', color: 'var(--tx2)', fontWeight: 500 }}>{wo.start.substring(5)}</div>
                  <div style={{ position: 'absolute', right: '-10px', top: '28px', fontSize: '10px', color: isOverdue ? 'var(--rd)' : 'var(--tx2)', fontWeight: 500 }}>{wo.due.substring(5)}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge" style={{ border: `1px solid ${barCol}`, color: barCol, background: 'transparent' }}>{wo.progress}% {isOverdue && ' (Late)'}</span>
                </div>
              </div>
            )})}
          </div>
        </div>
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
              <th>Start Process</th>
              <th>End Process</th>
              <th>Stage</th>
              <th>Progress</th>
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
                <td className="mo">{wo.start.substring(0, 10)}</td>
                <td className="mo" style={{ fontSize: '12px' }}>{wo.due.substring(0, 10)}</td>
                <td><span className={`badge ${pBadge}`}>{wo.stage}</span></td>
                <td>
                  <div className="sbar">
                    <div className="btr" style={{ width: '80px' }}>
                      <div className={`bfl ${bClass}`} style={{ width: `${wo.progress}%` }}></div>
                    </div>
                    <span className="bnum">{wo.progress}%</span>
                  </div>
                </td>
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
