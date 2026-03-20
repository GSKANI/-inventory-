import React from 'react';

export default function Sidebar({ isOpen, onToggle, currentUser }) {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-user">
            <div className="user-avatar">👤</div>
            <div className="user-info">
              <div className="user-name">{currentUser.name}</div>
              <div className="user-role">{currentUser.role || 'Employee'}</div>
            </div>
          </div>
          <button className="sidebar-close" onClick={onToggle}>
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <div className="section-title">Quick Actions</div>
            <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onToggle(); }}>
              <span className="nav-icon">📊</span>
              <span className="nav-label">Dashboard</span>
            </a>
            <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onToggle(); }}>
              <span className="nav-icon">📋</span>
              <span className="nav-label">Work Log</span>
            </a>
            <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onToggle(); }}>
              <span className="nav-icon">✅</span>
              <span className="nav-label">Check In/Out</span>
            </a>
            <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onToggle(); }}>
              <span className="nav-icon">📦</span>
              <span className="nav-label">Orders</span>
            </a>
          </div>

          <div className="sidebar-section">
            <div className="section-title">Tasks</div>
            <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onToggle(); }}>
              <span className="nav-icon">🔧</span>
              <span className="nav-label">My Services</span>
            </a>
            <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onToggle(); }}>
              <span className="nav-icon">🎯</span>
              <span className="nav-label">Assignments</span>
            </a>
            <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onToggle(); }}>
              <span className="nav-icon">📲</span>
              <span className="nav-label">QR Scanner</span>
            </a>
          </div>

          <div className="sidebar-section">
            <div className="section-title">Account</div>
            <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onToggle(); }}>
              <span className="nav-icon">👤</span>
              <span className="nav-label">Profile</span>
            </a>
            <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onToggle(); }}>
              <span className="nav-icon">⚙️</span>
              <span className="nav-label">Settings</span>
            </a>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="btn ba btn-block">
            Logout
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="sidebar-overlay" onClick={onToggle}></div>
      )}
    </>
  );
}
