import React, { useState } from 'react';

export default function EmpProducts({ prods }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? prods : prods.filter(p => p.cat === filter);

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Panel Board Catalogue</div>
          <div className="pgs">View only — contact admin to make changes</div>
        </div>
      </div>
      <div className="card">
        <div className="ch">
          <div className="ct">All Products</div>
          <div className="tabs">
            {['all', 'HT', 'LT', 'Control'].map(f => (
              <div key={f} className={`tab ${filter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>
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
              <th>Rating</th>
              <th>In Production</th>
              <th>Ready Stock</th>
              <th>Lead Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  <div className="pcl">
                    <div className="pav" style={{ fontSize: '9px', width: '38px' }}>
                      {p.code.split('-').slice(1, 3).join('')}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
