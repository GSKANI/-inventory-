import React from 'react';

export default function Manufacturing() {
  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Production Floor</div>
          <div className="pgs">Active fabrication and assembly batches</div>
        </div>
      </div>
      <div className="sg sg3">
        <div className="sc"><div className="sct"><div className="scl">Active Work Orders</div></div><div className="scv" style={{ color: '#b45309' }}>7</div><div className="scf">3 due this week</div></div>
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
            <tr>
              <td><span className="chip mo">WO-0091</span></td>
              <td>HT VCB Panel 11kV</td>
              <td>TANGEDCO</td>
              <td className="mo">2</td>
              <td><span className="badge bb">Wiring</span></td>
              <td>
                <div className="sbar">
                  <div className="btr" style={{ width: '80px' }}>
                    <div className="bfl bfa" style={{ width: '70%' }}></div>
                  </div>
                  <span className="bnum">70%</span>
                </div>
              </td>
              <td className="mo" style={{ fontSize: '12px' }}>Mar 22</td>
            </tr>
            <tr>
              <td><span className="chip mo">WO-0089</span></td>
              <td>MCC Panel Board</td>
              <td>Aavin Dairy</td>
              <td className="mo">3</td>
              <td><span className="badge bb">Wiring</span></td>
              <td>
                <div className="sbar">
                  <div className="btr" style={{ width: '80px' }}>
                    <div className="bfl bfa" style={{ width: '80%' }}></div>
                  </div>
                  <span className="bnum">80%</span>
                </div>
              </td>
              <td className="mo" style={{ fontSize: '12px' }}>Mar 24</td>
            </tr>
            <tr>
              <td><span className="chip mo">WO-0088</span></td>
              <td>APFC Panel 300kVAR</td>
              <td>Srinivasa Textiles</td>
              <td className="mo">1</td>
              <td><span className="badge bg">QC / Testing</span></td>
              <td>
                <div className="sbar">
                  <div className="btr" style={{ width: '80px' }}>
                    <div className="bfl bfg" style={{ width: '95%' }}></div>
                  </div>
                  <span className="bnum">95%</span>
                </div>
              </td>
              <td className="mo" style={{ fontSize: '12px' }}>Mar 20</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
