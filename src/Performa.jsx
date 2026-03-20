import React, { useState } from 'react';

export default function Performa() {
  const [taxMode, setTaxMode] = useState('IGST'); // IGST vs CGST_SGST
  const [items, setItems] = useState([
    { id: 1, name: 'HT VCB Panel Board 11kV', hsn: '8537', qty: 1, rate: 450000 },
    { id: 2, name: 'LT Main Panel Board 1600A', hsn: '8537', qty: 1, rate: 620000 },
    { id: 3, name: 'Control & Relay Panel', hsn: '8538', qty: 2, rate: 750000 }
  ]);

  const subtotal = items.reduce((s, i) => s + (i.qty * i.rate), 0);
  const taxRate = 0.18; // 18%
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Performa Invoice Generation</div>
          <div className="pgs">Create and preview performa invoices for bulk clients</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <select value={taxMode} onChange={e => setTaxMode(e.target.value)} className="btn bs" style={{ WebkitAppearance: 'none' }}>
            <option value="IGST">Inter-state (IGST 18%)</option>
            <option value="CGST_SGST">Intra-state (CGST 9% + SGST 9%)</option>
          </select>
          <button className="btn bs">✏️ Edit Items</button>
          <button className="btn bp">↓ Export PDF</button>
        </div>
      </div>

      <div className="inv-wrap" style={{ maxWidth: '850px', margin: '0 auto' }}>
        <div className="inv-top">
          <div>
            <div className="ibrand">POWERGRID ERP</div>
            <div className="ibsub">ELECTRICAL PANEL MANUFACTURING</div>
            <div style={{ fontSize: '12px', color: 'var(--mu)', marginTop: '8px', lineHeight: '1.5' }}>
              124 Industrial Estate, Phase 3<br />Bengaluru, Karnataka 560058<br />GSTIN: 29AABCP1234D1Z5
            </div>
          </div>
          <div className="imeta">
            <div style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px', color: 'var(--tx2)' }}>PROFORMA INVOICE</div>
            <div className="inum">PI-2026-0018</div>
            <div className="idate">Dated: 20-Mar-2026</div>
          </div>
        </div>

        <div className="iparties">
          <div>
            <div className="ipl">Billed To</div>
            <div className="ipn">TANGEDCO Sub-Division 4</div>
            <div className="ipi">
              Central Power Hub, Plot 44-A<br />Hosur, Tamil Nadu 635109<br />GSTIN: 33BBDCT4023G1Z0
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ipl">Delivered To</div>
            <div className="ipn">Site Office (Sector 4)</div>
            <div className="ipi">
              TANGEDCO Hosur Phase II<br />Hosur, Tamil Nadu 635109
            </div>
          </div>
        </div>

        <table className="itbl">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>#</th>
              <th>Description of Goods</th>
              <th>HSN/SAC</th>
              <th>Qty</th>
              <th>Rate (₹)</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => (
              <tr key={it.id}>
                <td>{idx + 1}</td>
                <td style={{ fontWeight: '500' }}>{it.name}</td>
                <td>{it.hsn}</td>
                <td>{it.qty} Nos</td>
                <td>{it.rate.toLocaleString('en-IN')}</td>
                <td>{(it.qty * it.rate).toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="itots">
          <div className="itots-in">
            <div className="itr">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {taxMode === 'IGST' ? (
              <div className="itr">
                <span>IGST (18%)</span>
                <span>₹{taxAmount.toLocaleString('en-IN')}</span>
              </div>
            ) : (
              <>
                <div className="itr">
                  <span>CGST (9%)</span>
                  <span>₹{(taxAmount / 2).toLocaleString('en-IN')}</span>
                </div>
                <div className="itr">
                  <span>SGST (9%)</span>
                  <span>₹{(taxAmount / 2).toLocaleString('en-IN')}</span>
                </div>
              </>
            )}
            <div className="itr tot">
              <span>Total Value</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div className="ifoot">
          <strong>Bank Details for Advance:</strong> HDFC Bank, Kormangala Branch | A/C: 50200012345678 | IFSC: HDFC0000184<br />
          <em>This is a computer generated performa invoice. Advance payment of 40% required to initiate manufacturing.</em>
        </div>
      </div>
    </div>
  );
}
