import React from 'react';
import { fmt } from './data';

export default function EmpOrders({ pos }) {
  const SS = { Pending: 'ba', Received: 'bg', Cancelled: 'br' };

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Purchase Orders</div>
          <div className="pgs">View only — contact admin to make changes</div>
        </div>
      </div>
      <div className="card">
        <div className="ch">
          <div className="ct">All Purchase Orders</div>
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
            </tr>
          </thead>
          <tbody>
            {pos.map(po => (
              <tr key={po.id}>
                <td><span className="chip mo">{po.id}</span></td>
                <td><strong>{po.comp}</strong></td>
                <td className="mo" style={{ fontSize: '12px' }}>{po.qty}</td>
                <td>{po.supplier}</td>
                <td className="mo" style={{ fontWeight: 600 }}>₹{(po.rate * po.qtyNum).toLocaleString('en-IN')}</td>
                <td className="mo" style={{ fontSize: '12px' }}>{fmt(po.date)}</td>
                <td><span className={`badge ${SS[po.status] || 'bz'}`}>{po.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
