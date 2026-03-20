import React, { useState } from 'react';
import { USERS } from './data';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    const u = USERS[username];
    if (!u || u.password !== password) {
      setError(true);
      setPassword('');
      return;
    }
    setError(false);
    onLogin({ ...u, username });
  };

  return (
    <div id="loginPage">
      <div className="login-grid"></div>
      <div className="login-box">
        <div className="login-logo">
          <div className="login-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="18" rx="2" />
              <path d="M8 3v18M16 3v18M2 9h6M2 15h6M16 9h6M16 15h6" />
            </svg>
          </div>
          <div>
            <div className="login-brand">PowerGrid ERP</div>
            <div className="login-sub">PANEL MANUFACTURING</div>
          </div>
        </div>
        <div className="login-title">Welcome back</div>
        <div className="login-desc" style={{ marginBottom: '24px' }}>Sign in to access your workspace</div>

        {error && <div className="login-err" style={{ display: 'block' }}>Invalid username or password.</div>}

        <div className="lfield">
          <label>USERNAME</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="lfield">
          <label>PASSWORD</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
        </div>
        <button className="login-btn" onClick={handleLogin}>
          Sign In →
        </button>

        <div className="login-creds">
          <div className="login-creds-title">Demo Credentials</div>
          <div className="cred-row" style={{ flexWrap: 'wrap' }}>
            <div className="cred-pill">
              <div className="cred-role">Admin</div>
              <div className="cred-val">admin / admin123</div>
            </div>
            <div className="cred-pill">
              <div className="cred-role">Finance</div>
              <div className="cred-val">finance / fin123</div>
            </div>
            <div className="cred-pill" style={{ flex: '1 1 100%' }}>
              <div className="cred-role">Employee</div>
              <div className="cred-val">emp001 / emp123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
