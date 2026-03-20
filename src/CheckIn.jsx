import React, { useState } from 'react';
import CameraScanner from './CameraScanner';

export default function CheckIn({ currentUser, onCheckIn, onClose }) {
  const [showCamera, setShowCamera] = useState(false);
  const [checkInTime, setCheckInTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [qrData, setQrData] = useState(null);

  const handleScan = (data) => {
    setQrData(data);
    setShowCamera(false);
  };

  const handleCheckIn = () => {
    const checkInEntry = {
      id: Date.now(),
      user: currentUser.username,
      name: currentUser.name,
      time: checkInTime.toLocaleTimeString('en-IN'),
      date: checkInTime.toISOString().split('T')[0],
      timestamp: checkInTime.toISOString(),
      location: location || 'Not specified',
      qrData: qrData,
      type: 'check-in'
    };
    onCheckIn(checkInEntry);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">Check In</div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="check-in-form">
            <div className="form-group">
              <label>Employee</label>
              <div className="form-value">{currentUser.name}</div>
            </div>

            <div className="form-group">
              <label>Check-In Time</label>
              <input
                type="time"
                value={checkInTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })}
                onChange={(e) => {
                  const [h, m] = e.target.value.split(':');
                  const newTime = new Date(checkInTime);
                  newTime.setHours(parseInt(h), parseInt(m), 0);
                  setCheckInTime(newTime);
                }}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter work location"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>QR Code</label>
              <button 
                className="btn bp btn-block"
                onClick={() => setShowCamera(true)}
              >
                📷 Open Camera & Scan QR
              </button>
              {qrData && (
                <div className="qr-scanned">
                  <strong>✓ Scanned:</strong> {qrData}
                </div>
              )}
            </div>

            <div className="check-in-info">
              <div>Check-In: {checkInTime.toLocaleTimeString('en-IN')}</div>
              <div>Date: {checkInTime.toLocaleDateString('en-IN')}</div>
            </div>

            <div className="modal-actions">
              <button className="btn ba" onClick={onClose}>Cancel</button>
              <button className="btn bg" onClick={handleCheckIn}>✓ Check In</button>
            </div>
          </div>
        </div>

        {showCamera && (
          <CameraScanner
            onScan={handleScan}
            onClose={() => setShowCamera(false)}
            title="Scan Work Site QR Code"
          />
        )}
      </div>
    </div>
  );
}
