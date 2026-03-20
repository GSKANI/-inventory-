import React, { useState } from 'react';
import { fmt, getInitials, rC, USERS } from './data';

export default function EmpScanner({ currentUser }) {
  const [scanState, setScanState] = useState('idle'); // idle, scanning, found
  const [logOpen, setLogOpen] = useState(false);
  const [logText, setLogText] = useState('');
  
  // mock machine history
  const [history, setHistory] = useState([
    { date: '2026-02-10', emp: 'emp002', task: 'Pre-commissioning tests complete.' },
    { date: '2025-11-05', emp: 'admin', task: 'Factory assembly and QC sign-off.' }
  ]);

  const handleScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('found');
    }, 2000); // mock 2s scan delay
  };

  const handleAddLog = () => {
    if (!logText) return;
    const newLog = {
      date: new Date().toISOString().split('T')[0],
      emp: currentUser.username,
      task: logText
    };
    setHistory([newLog, ...history]);
    setLogText('');
    setLogOpen(false);
  };

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Equipment QR Scanner</div>
          <div className="pgs">Scan machine QR to view and update service history</div>
        </div>
      </div>

      {scanState === 'idle' && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ width: '120px', height: '120px', border: '3px dashed var(--bd)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '40px' }}>📱</span>
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Ready to Scan</h3>
          <p style={{ color: 'var(--mu)', fontSize: '13px', marginBottom: '24px', maxWidth: '300px' }}>
            Point your camera at the QR code on the machine panel to access its full service lifecycle.
          </p>
          <button className="btn bp" onClick={handleScan} style={{ padding: '12px 30px', fontSize: '15px' }}>
            Start Scanner
          </button>
        </div>
      )}

      {scanState === 'scanning' && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ width: '120px', height: '120px', border: '3px solid var(--ac)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--ac)', animation: 'scanline 1.5s infinite linear' }}></div>
            <style>{`@keyframes scanline { 0% { top: 0; opacity: 1; } 100% { top: 100%; opacity: 0; } }`}</style>
            <span style={{ fontSize: '40px', opacity: 0.5 }}>📱</span>
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Scanning Code...</h3>
          <p style={{ color: 'var(--mu)', fontSize: '13px' }}>Please hold the camera steady.</p>
        </div>
      )}

      {scanState === 'found' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <div className="card" style={{ padding: '24px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'var(--sf2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px border: 1px solid var(--bd)' }}>
                    ⚡
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '700' }}>HT VCB Panel Board</div>
                    <div className="mo" style={{ fontSize: '11px', color: 'var(--mu)' }}>SN: PNL-VCB-250001</div>
                  </div>
                </div>
                <span className="badge bg">Deployed</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div><div style={{ fontSize: '11px', color: 'var(--mu)', marginBottom: '4px' }}>Client</div><div style={{ fontSize: '13px', fontWeight: '600' }}>TANGEDCO Hosur</div></div>
                <div><div style={{ fontSize: '11px', color: 'var(--mu)', marginBottom: '4px' }}>Voltage</div><div style={{ fontSize: '13px', fontWeight: '600' }}>11kV System</div></div>
                <div><div style={{ fontSize: '11px', color: 'var(--mu)', marginBottom: '4px' }}>Mfg Date</div><div style={{ fontSize: '13px', fontWeight: '600' }}>{fmt('2025-10-15')}</div></div>
                <div><div style={{ fontSize: '11px', color: 'var(--mu)', marginBottom: '4px' }}>Warranty Ends</div><div style={{ fontSize: '13px', fontWeight: '600' }}>{fmt('2027-10-15')}</div></div>
              </div>
            </div>

            {!logOpen ? (
              <button className="btn bp" style={{ width: '100%', padding: '12px', fontSize: '14px' }} onClick={() => setLogOpen(true)}>
                + Log Site Visit / Service
              </button>
            ) : (
              <div className="card" style={{ padding: '20px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>New Service Record</div>
                <div className="fld">
                  <label>Service Performed</label>
                  <textarea rows="3" value={logText} onChange={e => setLogText(e.target.value)} placeholder="E.g. Relays calibrated, earth pit tested..."></textarea>
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <button className="btn bs" onClick={() => setLogOpen(false)}>Cancel</button>
                  <button className="btn bp" onClick={handleAddLog}>Submit Record</button>
                </div>
              </div>
            )}
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Lifecycle History</span>
              <span className="chip">{history.length} Updates</span>
            </div>
            <div style={{ position: 'relative', paddingLeft: '16px', borderLeft: '2px solid var(--bd)' }}>
              {history.map((h, i) => (
                <div key={i} style={{ marginBottom: '24px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-21px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--ac)', border: '2px solid var(--sf)' }}></div>
                  <div style={{ fontSize: '11px', color: 'var(--mu)', fontFamily: 'DM Mono', marginBottom: '4px' }}>{fmt(h.date)}</div>
                  <div style={{ fontSize: '13px', color: 'var(--tx2)', marginBottom: '8px', lineHeight: '1.4' }}>{h.task}</div>
                  <div className="acl">
                    <div className="aav" style={{ background: rC(USERS[h.emp]?.name || ' '), width: '20px', height: '20px', fontSize: '8px' }}>
                      {getInitials(USERS[h.emp]?.name || ' ')}
                    </div>
                    <span style={{ fontSize: '11.5px', fontWeight: '500' }}>{USERS[h.emp]?.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
