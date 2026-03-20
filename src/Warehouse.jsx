import React from 'react';

export default function Warehouse() {
  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Warehouse & Store</div>
          <div className="pgs">Raw material inventory and component stock</div>
        </div>
      </div>
      <div className="sg sg3">
        <div className="sc"><div className="sct"><div className="scl">Component SKUs</div></div><div className="scv">148</div><div className="scf">across categories</div></div>
        <div className="sc"><div className="sct"><div className="scl">Low Stock Items</div></div><div className="scv" style={{ color: '#a8510a' }}>11</div><div className="scf">below reorder</div></div>
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
            <tr>
              <td>
                <div className="pcl">
                  <div className="pav">VCB</div>
                  <div>
                    <div className="pn">Vacuum Circuit Breakers (11kV)</div>
                    <div className="ps2">COMP-VCB-11K</div>
                  </div>
                </div>
              </td>
              <td><span className="vtag">HT</span></td>
              <td><span className="chip mo" style={{ fontSize: '11px', background: 'var(--sf)' }}>A-11</span></td>
              <td>
                <div className="sbar">
                  <div className="btr"><div className="bfl bfg" style={{ width: '70%' }}></div></div>
                  <span className="bnum">14</span>
                </div>
              </td>
              <td className="mo" style={{ fontSize: '12px' }}>5</td>
              <td><span className="badge bg">Healthy</span></td>
            </tr>
            <tr>
              <td>
                <div className="pcl">
                  <div className="pav">ACB</div>
                  <div>
                    <div className="pn">Air Circuit Breakers (1600A)</div>
                    <div className="ps2">COMP-ACB-1600</div>
                  </div>
                </div>
              </td>
              <td><span className="svtag">LT</span></td>
              <td><span className="chip mo" style={{ fontSize: '11px', background: 'var(--sf)' }}>B-04</span></td>
              <td>
                <div className="sbar">
                  <div className="btr"><div className="bfl bfa" style={{ width: '35%' }}></div></div>
                  <span className="bnum">7</span>
                </div>
              </td>
              <td className="mo" style={{ fontSize: '12px' }}>10</td>
              <td><span className="badge ba">Low Stock</span></td>
            </tr>
            <tr>
              <td>
                <div className="pcl">
                  <div className="pav">INS</div>
                  <div>
                    <div className="pn">VCB Insulator Bushings</div>
                    <div className="ps2">COMP-INS-VCB</div>
                  </div>
                </div>
              </td>
              <td><span className="vtag">HT</span></td>
              <td><span className="chip mo" style={{ fontSize: '11px', background: 'var(--sf)' }}>A-12</span></td>
              <td>
                <div className="sbar">
                  <div className="btr"><div className="bfl bfr" style={{ width: '12%' }}></div></div>
                  <span className="bnum">12</span>
                </div>
              </td>
              <td className="mo" style={{ fontSize: '12px' }}>40</td>
              <td><span className="badge br">Critical</span></td>
            </tr>
            <tr>
              <td>
                <div className="pcl">
                  <div className="pav">BUS</div>
                  <div>
                    <div className="pn">Copper Busbar (100×10mm)</div>
                    <div className="ps2">COMP-BUS-100</div>
                  </div>
                </div>
              </td>
              <td><span className="svtag">LT</span></td>
              <td><span className="chip mo" style={{ fontSize: '11px', background: 'var(--sf)' }}>C-02</span></td>
              <td>
                <div className="sbar">
                  <div className="btr"><div className="bfl bfg" style={{ width: '80%' }}></div></div>
                  <span className="bnum">420m</span>
                </div>
              </td>
              <td className="mo" style={{ fontSize: '12px' }}>100m</td>
              <td><span className="badge bg">Healthy</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
