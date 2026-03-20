import React from 'react';

export default function Dashboard() {
  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">PowerGrid ERP — Platform Overview</div>
          <div className="pgs">Thursday, 19 March 2026 · Electrical Panel Manufacturing & Services</div>
        </div>
      </div>
      <div className="sg sg5" style={{ marginBottom: '20px' }}>
        <div className="sc"><div className="sct"><div className="scl">Panel Products</div></div><div className="scv">16</div><div className="scf">HT, LT & Controls</div></div>
        <div className="sc"><div className="sct"><div className="scl">Revenue (YTD)</div></div><div className="scv" style={{ color: '#026d43' }}>₹2.4Cr</div><div className="scf"><span className="up">↑ 22%</span> vs last yr</div></div>
        <div className="sc"><div className="sct"><div className="scl">Employees</div></div><div className="scv" style={{ color: '#1360c2' }}>22</div><div className="scf">6 on field sites</div></div>
        <div className="sc"><div className="sct"><div className="scl">Active Projects</div></div><div className="scv" style={{ color: '#b45309' }}>4</div><div className="scf">3 due this month</div></div>
        <div className="sc"><div className="sct"><div className="scl">Service Jobs</div></div><div className="scv" style={{ color: '#b01f1f' }}>8</div><div className="scf">2 urgent pending</div></div>
      </div>
      <div className="twocol">
        <div>
          <div className="sdv" style={{ marginBottom: '10px' }}>
            <div className="sdvt">Production Pipeline</div><div className="sdvl"></div><div className="sdvc">LIVE</div>
          </div>
          <div className="pipe">
            <div className="ps"><div className="pst"><div className="pdot pdg"></div><div className="psn">Raw Material</div></div><div className="psc">148</div><div className="psu">in store</div><div className="ppb"><div className="ppf" style={{ width: '74%' }}></div></div><div className="parr">›</div></div>
            <div className="ps"><div className="pst"><div className="pdot pda"></div><div className="psn">Fabrication</div></div><div className="psc hi">7</div><div className="psu">in progress</div><div className="ppb"><div className="ppf" style={{ width: '48%' }}></div></div><div className="parr">›</div></div>
            <div className="ps"><div className="pst"><div className="pdot pdg"></div><div className="psn">Wiring</div></div><div className="psc">4</div><div className="psu">being wired</div><div className="ppb"><div className="ppf" style={{ width: '62%' }}></div></div><div className="parr">›</div></div>
            <div className="ps"><div className="pst"><div className="pdot pdb"></div><div className="psn">Testing & QC</div></div><div className="psc hi">3</div><div className="psu">under inspection</div><div className="ppb"><div className="ppf" style={{ width: '30%' }}></div></div><div className="parr">›</div></div>
            <div className="ps"><div className="pst"><div className="pdot pdg"></div><div className="psn">Dispatch</div></div><div className="psc">5</div><div className="psu">ready</div><div className="ppb"><div className="ppf" style={{ width: '55%' }}></div></div></div>
          </div>
        </div>
        <div className="rcol">
          <div className="card">
            <div className="ch"><div className="ct">Live Activity</div><span className="badge bg" style={{ fontSize: '10px' }}>● Live</span></div>
            <div>
              <div className="ai"><div className="adw"><div className="adot" style={{ background: '#12b76a' }}></div><div className="aline"></div></div><div><div className="atx"><strong>LT ACB Panel (1600A)</strong> cleared QC — ready for dispatch</div><div className="atm">1h ago · ORD-0041</div></div></div>
              <div className="ai"><div className="adw"><div className="adot" style={{ background: '#f79009' }}></div><div className="aline"></div></div><div><div className="atx"><strong>Low stock</strong> — VCB insulator bushings below reorder</div><div className="atm">2h ago · 12 pcs left</div></div></div>
              <div className="ai"><div className="adw"><div className="adot" style={{ background: '#1848c8' }}></div><div className="aline"></div></div><div><div className="atx">Wiring completed on <strong>PCC Panel Batch W-09</strong></div><div className="atm">3h ago · 3 panels</div></div></div>
              <div className="ai"><div className="adw"><div className="adot" style={{ background: '#f04438' }}></div></div><div><div className="atx"><strong>CEIG inspection</strong> scheduled — Coimbatore, 1 day!</div><div className="atm">Auto-alert</div></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
