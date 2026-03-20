import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function CameraScanner({ onScan, onClose, title = 'Scan QR Code' }) {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      { 
        fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
        showTorchButtonIfSupported: true,
      },
      false
    );

    const success = (decodedText) => {
      setScanResult(decodedText);
      onScan(decodedText);
      scanner.clear().catch(err => console.log('Scanner clear error:', err));
    };

    const error = (err) => {
      console.log('QR Scan error:', err);
    };

    scanner.render(success, error);

    return () => {
      scanner.clear().catch(err => console.log('Cleanup error:', err));
    };
  }, [onScan]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-camera" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div id="qr-reader" style={{ width: '100%' }}></div>
          {scanResult && (
            <div className="scan-result">
              <strong>Scanned:</strong> {scanResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
