import React, { useState } from 'react';
import { INITIAL_WORK_LOGS, ALL_SERVICES, today, todayStr, dF, fmt } from './data';
import CheckIn from './CheckIn';
import CameraScanner from './CameraScanner';

export default function EmpDashboard({ currentUser, assigns }) {
  const [chartView, setChartView] = useState('hours');
  const [checkInModal, setCheckInModal] = useState(false);
  const [cameraModal, setCameraModal] = useState(false);
  const [todayWorkLog, setTodayWorkLog] = useState(null);
  const [scannedQR, setScannedQR] = useState(null);
  const [selectedProj, setSelectedProj] = useState('');

  const usr = currentUser.username;
  const logs = INITIAL_WORK_LOGS[usr] || [];
  const myServices = ALL_SERVICES.filter(s => s.emp === usr);
  const myAssigns = assigns.filter(a => a.emp === usr);

  const currentProj = selectedProj || (myAssigns.length > 0 ? myAssigns[0].proj : 'other');
  const selA = myAssigns.find(a => a.proj === currentProj);
  const isLiveSite = selA ? (selA.role.includes('Site') || selA.role.includes('QC') || selA.proj.includes('Sub-Station')) : false;

  const hr = new Date().getHours();
  const greet = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';

  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekLogs = logs.filter(l => new Date(l.date) >= weekAgo);
  const weekHours = weekLogs.reduce((s, l) => s + l.hours, 0);

  const deadlines = myAssigns.filter(a => { const d = dF(a.end); return d >= 0 && d <= 7; });
  const SS = { Completed: 'bg', 'In Progress': 'bb', 'On Hold': 'ba', 'Pending Material': 'ba' };
  const SVC_SS = { Completed: 'bg', 'In Progress': 'bb', Pending: 'ba' };

  const todayLog = logs.find(l => l.date === todayStr);

  const handleCheckIn = (checkInEntry) => {
    console.log('Check-in:', checkInEntry);
    setTodayWorkLog(checkInEntry);
  };

  const handleQRScan = (qrData) => {
    console.log('QR Scanned:', qrData);
    setScannedQR(qrData);
    setCameraModal(false);
  };

  const handleAddWorkEntry = () => {
    if (!selectedProj && myAssigns.length > 0) setSelectedProj(myAssigns[0].proj);
    setCheckInModal(true);
  };

  return (
    <>
      <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
        <div className="pgh">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div>
              <div className="pgt">{greet}, {currentUser.name.split(' ')[0]}! 👋</div>
              <div className="pgs">
                {today.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn bp" onClick={() => setCameraModal(true)} title="Scan QR Code">📷</button>
            <button className="btn bp" onClick={handleAddWorkEntry}>+ Log Work</button>
          </div>
        </div>

      <div className="sg sg4" style={{ marginBottom: '18px' }}>
        <div className="sc"><div className="sct"><div className="scl">Hours This Week</div><div className="sci">⏱️</div></div><div className="scv">{weekHours}</div><div className="scf">logged hours</div></div>
        <div className="sc"><div className="sct"><div className="scl">Jobs Assigned</div><div className="sci">🔧</div></div><div className="scv" style={{ color: '#1360c2' }}>{myServices.filter(s => s.status === 'In Progress').length}</div><div className="scf">active services</div></div>
        <div className="sc"><div className="sct"><div className="scl">Logs This Month</div><div className="sci">📋</div></div><div className="scv" style={{ color: '#b45309' }}>{logs.length}</div><div className="scf">work entries</div></div>
        <div className="sc"><div className="sct"><div className="scl">Deadlines</div><div className="sci">⚠️</div></div><div className="scv" style={{ color: '#b01f1f' }}>{deadlines.length}</div><div className="scf">within 7 days</div></div>
      </div>

      <div className="twocol">
        <div>
          <div className="card" style={{ marginBottom: '16px' }}>
            <div className="ch">
              <div className="ct">Work History — Last 14 Days</div>
              <div className="tabs">
                <div className={`tab ${chartView === 'hours' ? 'on' : ''}`} onClick={() => setChartView('hours')}>Hours</div>
                <div className={`tab ${chartView === 'jobs' ? 'on' : ''}`} onClick={() => setChartView('jobs')}>Jobs</div>
              </div>
            </div>
            <div className="chart-wrap" style={{ display: 'flex', gap: 0, alignItems: 'flex-start' }}>
              <div className="chart-y" id="chart-y-axis">
                {chartView === 'hours' ? [12, 9, 6, 3, 0].map(v => <span key={v}>{v}</span>) : [3, 2, 1, 0].map(v => <span key={v}>{v}</span>)}
              </div>
              <div style={{ flex: 1 }}>
                <div className="chart-canvas" id="work-chart">
                  {/* Simplified bar rendering for demo */}
                  {[...Array(14)].map((_, i) => (
                    <div className="chart-bar-group" style={{ flex: 1 }} key={i}>
                      <div className="chart-bar" style={{ height: Math.max(4, Math.random() * 80) + 'px', background: chartView === 'hours' ? '#b45309' : '#1360c2' }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="chart-legend">
              <div className="chart-legend-item"><div className="chart-legend-dot" style={{ background: '#b45309' }}></div>Hours worked</div>
              <div className="chart-legend-item"><div className="chart-legend-dot" style={{ background: '#1360c2' }}></div>Jobs completed</div>
            </div>
          </div>

          <div className="card">
            <div className="ch">
              <div className="ct">Recent Work Logs</div>
              <button className="btn bs" style={{ fontSize: '12px', padding: '4px 10px' }}>View All →</button>
            </div>
            <div id="emp-recent-logs">
              {logs.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--mu)', fontSize: '13px' }}>
                  No work logs yet. Add your first entry!
                </div>
              ) : (
                logs.slice(0, 3).map(l => {
                  const d = new Date(l.date);
                  return (
                    <div className="log-entry" key={l.id}>
                      <div className="log-date-col">
                        <div className="log-date-day">{d.getDate()}</div>
                        <div className="log-date-mon">{d.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase()}</div>
                      </div>
                      <div className="log-body">
                        <div className="log-site">{l.site}</div>
                        <div className="log-task">{l.task}</div>
                        <div className="log-meta">
                          <span className="log-hours">⏱ {l.hours}h</span>
                          {l.wo && <span className="log-wo">{l.wo}</span>}
                          <span className="log-pill">{l.cat}</span>
                          <span className={`badge ${SS[l.status]}`} style={{ fontSize: '10px' }}>{l.status}</span>
                        </div>
                        {l.next && <div style={{ fontSize: '11.5px', color: 'var(--mu)', marginTop: '4px' }}>→ Next: {l.next}</div>}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="rcol">
          <div className="card">
            <div className="ch">
              <div className="ct">⚠️ My Deadlines</div>
              <span className="badge br" style={{ fontSize: '10px' }}>{deadlines.length}</span>
            </div>
            <div style={{ padding: '10px 14px' }}>
              {deadlines.length === 0 ? (
                <div style={{ fontSize: '12.5px', color: 'var(--mu)', padding: '8px 0' }}>No deadlines within 7 days. 🎉</div>
              ) : (
                deadlines.map((a, i) => {
                  const d = dF(a.end);
                  const cls = d <= 2 ? 'urgent' : d <= 5 ? 'warn' : 'info';
                  const icon = d <= 2 ? '🚨' : d <= 5 ? '⚡' : '📅';
                  return (
                    <div className={`alert-card ${cls}`} style={{ marginBottom: '8px' }} key={i}>
                      <div className="alert-icon">{icon}</div>
                      <div>
                        <div className="alert-title">{a.proj}</div>
                        <div className="alert-body">Role: {a.role}</div>
                        <div className="alert-meta">{d === 0 ? 'DUE TODAY' : d === 1 ? 'Due TOMORROW' : d + 'd left'} · Ends {fmt(a.end)}</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="card">
            <div className="ch"><div className="ct">My Assigned Services</div></div>
            <div>
              {myServices.length === 0 ? (
                <div style={{ padding: '14px 18px', fontSize: '12.5px', color: 'var(--mu)' }}>No services assigned.</div>
              ) : (
                myServices.slice(0, 3).map(s => (
                  <div key={s.id} style={{ padding: '10px 18px', borderBottom: '1px solid var(--bd)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500 }}>{s.type}</div>
                      <div style={{ fontSize: '11.5px', color: 'var(--mu)' }}>{s.client} · {fmt(s.date)}</div>
                    </div>
                    <span className={`badge ${SVC_SS[s.status]}`}>{s.status}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card" style={{ border: '2px solid var(--acm)' }}>
            <div className="ch" style={{ background: 'var(--acl)' }}>
              <div className="ct" style={{ color: 'var(--ac)' }}>📝 Today's Quick Log</div>
            </div>
            <div style={{ padding: '14px' }}>
              <div style={{ fontSize: '12.5px', color: 'var(--mu)', marginBottom: '10px' }}>
                {todayLog ? (
                  <>
                    <span className="badge bg" style={{ marginBottom: '6px' }}>✓ Log submitted today</span><br />
                    <span style={{ fontSize: '12px', color: 'var(--tx2)' }}>{todayLog.site} · {todayLog.hours}h · {todayLog.status}</span>
                  </>
                ) : (
                  <span style={{ color: 'var(--rd)', fontWeight: 600 }}>⚠ No log submitted for today yet.</span>
                )}
              </div>
              <button className="btn bp" style={{ width: '100%' }} onClick={handleAddWorkEntry}>+ Add Today's Work Update</button>
            </div>
          </div>

          <div className="card" style={{ border: '2px solid #10b981' }}>
            <div className="ch" style={{ background: '#d1fae5' }}>
              <div className="ct" style={{ color: '#047857' }}>📍 Live Site Check-In</div>
            </div>
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#047857', marginBottom: '12px', fontWeight: 600 }}>Update your on-site attendance securely using GPS mapped photos.</div>
              <button className="btn bg" style={{ width: '100%', display: 'flex', justifyContent: 'center', background: '#10b981', color: '#fff', border: 'none', marginBottom: '8px' }} onClick={() => setCheckInModal(true)}>
                📷 Open Camera & Check-in
              </button>
              <a href="intent://#Intent;package=com.google.ar.lens;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;end" className="btn bp" style={{ width: '100%', display: 'flex', justifyContent: 'center', background: '#4285F4', color: '#fff', border: 'none' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Google_Lens_-_new_logo.png" alt="Google Lens" style={{ width: '16px', height: '16px', marginRight: '8px', filter: 'brightness(0) invert(1)' }}/>
                Link with Google Lens
              </a>
            </div>
          </div>
        </div>
      </div>

      {checkInModal && (
        <div className="ov on">
          <div className="mdl" style={{ width: '400px' }}>
            <div className="mhd">
              <div className="mt">{isLiveSite ? "📍 Live Site Attendance" : "📝 Manual Work Entry"}</div>
              <div className="cbtn" onClick={() => setCheckInModal(false)}>×</div>
            </div>
            <div className="mbd">
              <div className="fld" style={{ marginBottom: '16px' }}>
                <label>Project / Assignment</label>
                <select value={currentProj} onChange={e => setSelectedProj(e.target.value)} style={{ padding: '10px 14px' }}>
                  {myAssigns.map((a, i) => <option key={i} value={a.proj}>{a.proj} ({a.role})</option>)}
                  <option value="other">Other / Office Work</option>
                </select>
              </div>
              
              {isLiveSite ? (
                <>
                  <div style={{ background: '#f1f5f9', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px', border: '1px solid #cbd5e1', position: 'relative' }}>
                <div style={{ height: '160px', background: 'url(https://maps.googleapis.com/maps/api/staticmap?center=12.9716,77.5946&zoom=14&size=400x160&sensor=false) center/cover, #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', backdropFilter: 'blur(4px)' }}>
                    🌍 GPS Locked: Site A
                  </div>
                </div>
                <div style={{ padding: '10px 14px', fontSize: '11px', color: '#475569', display: 'flex', justifyContent: 'space-between', background: '#fff' }}>
                  <span>Lat: 12.97159</span>
                  <span>Lng: 77.59456</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>Acc: 4m</span>
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '6px' }}>LOCATION PHOTO</label>
                <div style={{ border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '30px 20px', textAlign: 'center', background: '#f8fafc', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.borderColor = '#10b981'} onMouseOut={e => e.currentTarget.style.borderColor = '#cbd5e1'} onClick={() => setCameraModal(true)}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📷</div>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Tap to Capture Selfie</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Geo-tags will be embedded automatically</div>
                </div>
                {scannedQR && (
                  <div style={{ marginTop: '8px', padding: '8px', background: '#d1fae5', border: '1px solid #10b981', borderRadius: '4px', fontSize: '12px', color: '#047857' }}>
                    ✓ QR Code Scanned: {scannedQR}
                  </div>
                )}
              </div>
                </>
              ) : (
                <>
                  <div className="fld">
                    <label>Hours Worked</label>
                    <input type="number" placeholder="Enter hours (e.g., 8)" style={{ padding: '10px 14px' }} />
                  </div>
                  <div className="fld" style={{ marginTop: '12px' }}>
                    <label>Task Description / Updates</label>
                    <textarea rows="3" placeholder="Describe work done..." style={{ padding: '10px 14px' }}></textarea>
                  </div>
                </>
              )}
            </div>
            <div className="mft">
              <button className="btn bw" onClick={() => setCheckInModal(false)}>Cancel</button>
              <button className="btn" style={{ background: '#10b981', color: '#fff', border: '1px solid #059669' }} onClick={() => { handleCheckIn({ timestamp: new Date().toISOString(), qrData: scannedQR }); setCheckInModal(false); }}>🚀 Submit Log</button>
            </div>
          </div>
        </div>
      )}

      {cameraModal && (
        <CameraScanner
          onScan={handleQRScan}
          onClose={() => setCameraModal(false)}
          title="Capture Site Photo & Scan QR"
        />
      )}

      {todayWorkLog && (
        <div className="card" style={{ position: 'fixed', bottom: '20px', right: '20px', width: '300px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <div className="ch" style={{ background: '#d1fae5' }}>
            <div className="ct" style={{ color: '#047857' }}>✓ Check-In Logged</div>
            <button onClick={() => setTodayWorkLog(null)} className="cbtn">×</button>
          </div>
          <div style={{ padding: '12px 14px', fontSize: '12px' }}>
            <div style={{ marginBottom: '6px' }}>
              <strong>Time:</strong> {todayWorkLog.time}
            </div>
            <div style={{ marginBottom: '6px' }}>
              <strong>Location:</strong> {todayWorkLog.location}
            </div>
            {todayWorkLog.qrData && (
              <div style={{ marginBottom: '6px' }}>
                <strong>QR:</strong> {todayWorkLog.qrData}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </>
  );
}
