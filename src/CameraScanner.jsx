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
          <div id="qr-reader" style={{ width: '100%', borderRadius: '8px', overflow: 'hidden' }}></div>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--mu)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>OR USE NATIVE SCANNER</div>
            <a 
              href="intent://#Intent;package=com.google.ar.lens;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;end" 
              className="btn bp" 
              style={{ width: '100%', display: 'flex', justifyContent: 'center', background: '#4285F4', color: '#fff', border: 'none', height: '42px' }}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Google_Lens_-_new_logo.png" alt="Google Lens" style={{ width: '16px', height: '16px', marginRight: '8px', filter: 'brightness(0) invert(1)' }}/>
              Link with Google Lens
            </a>
          </div>
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
