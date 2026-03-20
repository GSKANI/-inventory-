import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Products from './Products';
import Orders from './Orders';
import Warehouse from './Warehouse';
import Manufacturing from './Manufacturing';
import Services from './Services';
import Invoices from './Invoices';
import Performa from './Performa';
import Employees from './Employees';
import Assign from './Assign';
import Projects from './Projects';
import Alerts from './Alerts';
import AdminWorkLogs from './AdminWorkLogs';
import FinanceDashboard from './FinanceDashboard';
import Payroll from './Payroll';
import Suppliers from './Suppliers';

// Emp views
import EmpDashboard from './EmpDashboard';
import EmpWorkLog from './EmpWorkLog';
import EmpServices from './EmpServices';
import EmpProfile from './EmpProfile';
import EmpProducts from './EmpProducts';
import EmpOrders from './EmpOrders';
import EmpScanner from './EmpScanner';

import { INITIAL_PRODS, INITIAL_POS, getInitials, ASSIGNS, PROJECTS, exportToCSV, PAYROLL_DATA, INVOICES } from './data';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('main-dash');
  const [prods, setProds] = useState(INITIAL_PRODS);
  const [pos, setPos] = useState(INITIAL_POS);
  const [assigns, setAssigns] = useState(ASSIGNS);
  const [projects, setProjects] = useState(PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) {
    return (
      <Login
        onLogin={(u) => {
          setCurrentUser(u);
          setCurrentView('main-dash');
        }}
      />
    );
  }

  const isAdmin = currentUser.role === 'admin';
  const isFinance = currentUser.role === 'finance';
  const roleDisplay = isAdmin ? 'Admin' : isFinance ? 'Finance' : 'Employee';

  const handleExport = () => {
    switch (currentView) {
      case 'products': exportToCSV(prods, 'products_export.csv'); break;
      case 'orders': exportToCSV(pos, 'purchase_orders_export.csv'); break;
      case 'invoices': exportToCSV(INVOICES, 'invoices_export.csv'); break;
      case 'assign': exportToCSV(assigns, 'site_assignments_export.csv'); break;
      case 'projects': exportToCSV(projects, 'projects_export.csv'); break;
      case 'payroll': exportToCSV(PAYROLL_DATA, 'payroll_export.csv'); break;
      default: alert('Export is not configured for this specific view yet. Try Products, Orders, Invoices, Assignments, Projects or Payroll.');
    }
  };

  const formatTitle = (id) => {
    const titles = {
      'main-dash': isAdmin ? 'Dashboard / Overview' : 'Workspace / My Dashboard',
      'products': 'Products / Panel Board Catalogue',
      'orders': 'Products / Purchase Orders',
      'warehouse': 'Products / Warehouse & Store',
      'manufacturing': 'Products / Production Floor',
      'services': 'Services / Service Jobs',
      'invoices': 'Finance / Invoices',
      'performa': 'Finance / Performa Invoice',
      'employees': 'HRMS / Employee Directory',
      'assign': 'HRMS / Site Assignment',
      'projects': 'HRMS / Projects',
      'alerts': 'HRMS / Deadline Alerts',
      'admin-worklogs': 'HRMS / All Work Logs',
      // Finance specific
      'fin-dash': 'Finance / Financial Dashboard',
      'payroll': 'Finance / Payroll & Statutory',
      // Emp specific
      'emp-worklog': 'Workspace / My Work Log',
      'emp-services': 'Workspace / Assigned Services',
      'emp-profile': 'Workspace / My Profile',
      'emp-scanner': 'Workspace / QR Scanner',
      'emp-products': 'View Only / Panel Catalogue',
      'emp-orders': 'View Only / Purchase Orders',
    };
    const t = titles[id] || id;
    const parts = t.split(' / ');
    return (
      <>
        {parts[0]} {parts[1] && <span>/ {parts[1]}</span>}
      </>
    );
  };

  return (
    <div id="app" className="lay">
      {/* SIDEBAR */}
      {sidebarOpen && <div className="sb-overlay" onClick={() => setSidebarOpen(false)}></div>}
      <aside className={`sb ${sidebarOpen ? 'open' : ''}`} onClick={(e) => { if(e.target.closest('.ni') || e.target.closest('.logout-btn')) setSidebarOpen(false); }}>
        <div className="sb-head">
          <div className="lb">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="18" rx="2" />
              <path d="M8 3v18M16 3v18M2 9h6M2 15h6M16 9h6M16 15h6" />
            </svg>
          </div>
          <div>
            <div className="ln">PowerGrid ERP</div>
            <div className="lv">PANEL MANUFACTURING</div>
          </div>
          <button className="sidebar-close sb-close-mobile" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        {isAdmin ? (
          <div id="admin-sidebar" style={{ display: 'block' }}>
            <div className="ns">
              <div className="nl">Overview</div>
              <div className={`ni ${currentView === 'main-dash' ? 'on' : ''}`} onClick={() => { setCurrentView('main-dash'); setSearchQuery(''); }}>Dashboard</div>
            </div>
            <div className="ns">
              <div className="nl">Products</div>
              <div className={`ni ${currentView === 'products' ? 'on' : ''}`} onClick={() => { setCurrentView('products'); setSearchQuery(''); }}>Panel Boards <span className="nb b">{prods.length}</span></div>
              <div className={`ni ${currentView === 'orders' ? 'on' : ''}`} onClick={() => { setCurrentView('orders'); setSearchQuery(''); }}>Purchase Orders <span className="nb r">{pos.length}</span></div>
              <div className={`ni ${currentView === 'suppliers' ? 'on' : ''}`} onClick={() => { setCurrentView('suppliers'); setSearchQuery(''); }}>Suppliers</div>
              <div className={`ni ${currentView === 'warehouse' ? 'on' : ''}`} onClick={() => { setCurrentView('warehouse'); setSearchQuery(''); }}>Warehouse</div>
              <div className={`ni ${currentView === 'manufacturing' ? 'on' : ''}`} onClick={() => { setCurrentView('manufacturing'); setSearchQuery(''); }}>Production Floor</div>
            </div>
            <div className="ns">
              <div className="nl">Services</div>
              <div className={`ni ${currentView === 'services' ? 'on' : ''}`} onClick={() => { setCurrentView('services'); setSearchQuery(''); }}>Service Jobs <span className="nb a">3</span></div>
            </div>
            <div className="ns">
              <div className="nl">Finance</div>
              <div className={`ni ${currentView === 'invoices' ? 'on' : ''}`} onClick={() => { setCurrentView('invoices'); setSearchQuery(''); }}>Invoices <span className="nb g">2</span></div>
              <div className={`ni ${currentView === 'performa' ? 'on' : ''}`} onClick={() => { setCurrentView('performa'); setSearchQuery(''); }}>Performa Invoice</div>
            </div>
            <div className="ns">
              <div className="nl">HR Management</div>
              <div className={`ni ${currentView === 'employees' ? 'on' : ''}`} onClick={() => { setCurrentView('employees'); setSearchQuery(''); }}>Employees <span className="nb b">3</span></div>
              <div className={`ni ${currentView === 'assign' ? 'on' : ''}`} onClick={() => { setCurrentView('assign'); setSearchQuery(''); }}>Site Assignment</div>
              <div className={`ni ${currentView === 'projects' ? 'on' : ''}`} onClick={() => { setCurrentView('projects'); setSearchQuery(''); }}>Projects <span className="nb a">2</span></div>
              <div className={`ni ${currentView === 'alerts' ? 'on' : ''}`} onClick={() => { setCurrentView('alerts'); setSearchQuery(''); }}>Deadline Alerts</div>
              <div className={`ni ${currentView === 'admin-worklogs' ? 'on' : ''}`} onClick={() => { setCurrentView('admin-worklogs'); setSearchQuery(''); }}>All Work Logs</div>
            </div>
          </div>
        ) : isFinance ? (
          <div id="fin-sidebar" style={{ display: 'block' }}>
            <div className="ns">
              <div className="nl">Overview</div>
              <div className={`ni ${currentView === 'fin-dash' ? 'on' : ''}`} onClick={() => { setCurrentView('fin-dash'); setSearchQuery(''); }}>Financial Dashboard</div>
            </div>
            <div className="ns">
              <div className="nl">Income & Expenses</div>
              <div className={`ni ${currentView === 'invoices' ? 'on' : ''}`} onClick={() => { setCurrentView('invoices'); setSearchQuery(''); }}>Invoices <span className="nb g">2</span></div>
              <div className={`ni ${currentView === 'performa' ? 'on' : ''}`} onClick={() => { setCurrentView('performa'); setSearchQuery(''); }}>Performa Invoice</div>
              <div className={`ni ${currentView === 'orders' ? 'on' : ''}`} onClick={() => { setCurrentView('orders'); setSearchQuery(''); }}>Outgoing POs <span className="nb r">{pos.length}</span></div>
            </div>
            <div className="ns">
              <div className="nl">Payroll & Employees</div>
              <div className={`ni ${currentView === 'payroll' ? 'on' : ''}`} onClick={() => { setCurrentView('payroll'); setSearchQuery(''); }}>Payroll & PF/ESI</div>
              <div className={`ni ${currentView === 'employees' ? 'on' : ''}`} onClick={() => { setCurrentView('employees'); setSearchQuery(''); }}>Directory (View-Only)</div>
            </div>
          </div>
        ) : (
          <div id="emp-sidebar" style={{ display: 'block' }}>
            <div className="ns">
              <div className="nl">My Workspace</div>
              <div className={`ni ${currentView === 'main-dash' ? 'on' : ''}`} onClick={() => { setCurrentView('main-dash'); setSearchQuery(''); }}>My Dashboard</div>
              <div className={`ni ${currentView === 'emp-worklog' ? 'on' : ''}`} onClick={() => { setCurrentView('emp-worklog'); setSearchQuery(''); }}>My Work Log <span className="nb g">+</span></div>
              <div className={`ni ${currentView === 'emp-services' ? 'on' : ''}`} onClick={() => { setCurrentView('emp-services'); setSearchQuery(''); }}>My Services</div>
              <div className={`ni ${currentView === 'emp-profile' ? 'on' : ''}`} onClick={() => { setCurrentView('emp-profile'); setSearchQuery(''); }}>My Profile</div>
              <div className={`ni ${currentView === 'emp-scanner' ? 'on' : ''}`} onClick={() => { setCurrentView('emp-scanner'); setSearchQuery(''); }}>QR Scanner <span className="nb a">📷</span></div>
            </div>
            <div className="ns">
              <div className="nl">View Only</div>
              <div className={`ni ${currentView === 'emp-products' ? 'on' : ''}`} onClick={() => { setCurrentView('emp-products'); setSearchQuery(''); }}>Panel Catalogue</div>
              <div className={`ni ${currentView === 'emp-orders' ? 'on' : ''}`} onClick={() => { setCurrentView('emp-orders'); setSearchQuery(''); }}>Purchase Orders</div>
            </div>
          </div>
        )}

        <div className="sb-ft">
          <div className="ur">
            <div className="ua" id="sbAvatar">
              {getInitials(currentUser.name)}
            </div>
            <div>
              <div className="un" id="sbName">
                {currentUser.name}
              </div>
              <div id="sbRoleBadge" className={`role-badge ${isAdmin ? 'role-admin' : isFinance ? 'role-admin' : 'role-emp'}`}>
                {roleDisplay}
              </div>
            </div>
          </div>
          <div className="logout-btn" onClick={() => setCurrentUser(null)}>
            🔒 Sign Out
          </div>
        </div>
      </aside>

      {/* MAIN TOPBAR */}
      <div className="main">
        <div className="tb">
          <button className="btn-sidebar mobile-only" onClick={() => setSidebarOpen(true)}>☰</button>
          <div className="tb-t" id="tbt">
            {formatTitle(currentView)}
          </div>
          <div className="sr">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input type="text" placeholder="Search page contents…" id="searchGlobal" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <span
            id="tbRoleChip"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: '99px',
              ...(isAdmin || isFinance
                ? { background: '#fef3c7', color: '#b45309', border: '1px solid #fcd34d' }
                : { background: '#edf5ff', color: '#1360c2', border: '1px solid #9ecbf7' }),
            }}
          >
            {isAdmin ? '🔑 Admin' : isFinance ? '💰 Finance' : '👤 Employee'}
          </span>
          <button className="btn bp" onClick={handleExport}>↓ Export</button>
        </div>

        {/* CURRENT VIEW COMPONENT */}
        {isAdmin || isFinance ? (
          <>
            {currentView === 'main-dash' && <Dashboard searchQuery={searchQuery} />}
            {currentView === 'fin-dash' && <FinanceDashboard searchQuery={searchQuery} />}
            {currentView === 'payroll' && <Payroll searchQuery={searchQuery} />}
            {currentView === 'products' && <Products prods={prods} setProds={setProds} searchQuery={searchQuery} />}
            {currentView === 'orders' && <Orders pos={pos} setPos={setPos} searchQuery={searchQuery} />}
            {currentView === 'suppliers' && <Suppliers searchQuery={searchQuery} />}
            {currentView === 'warehouse' && <Warehouse searchQuery={searchQuery} />}
            {currentView === 'manufacturing' && <Manufacturing searchQuery={searchQuery} />}
            {currentView === 'services' && <Services searchQuery={searchQuery} />}
            {currentView === 'invoices' && <Invoices searchQuery={searchQuery} />}
            {currentView === 'performa' && <Performa />}
            {currentView === 'employees' && <Employees searchQuery={searchQuery} />}
            {currentView === 'assign' && <Assign assigns={assigns} setAssigns={setAssigns} searchQuery={searchQuery} />}
            {currentView === 'projects' && <Projects projects={projects} setProjects={setProjects} searchQuery={searchQuery} />}
            {currentView === 'alerts' && <Alerts assigns={assigns} projects={projects} searchQuery={searchQuery} />}
            {currentView === 'admin-worklogs' && <AdminWorkLogs searchQuery={searchQuery} />}
          </>
        ) : (
          <>
            {currentView === 'main-dash' && <EmpDashboard currentUser={currentUser} assigns={assigns} searchQuery={searchQuery} />}
            {currentView === 'emp-worklog' && <EmpWorkLog currentUser={currentUser} searchQuery={searchQuery} />}
            {currentView === 'emp-services' && <EmpServices currentUser={currentUser} searchQuery={searchQuery} />}
            {currentView === 'emp-profile' && <EmpProfile currentUser={currentUser} assigns={assigns} />}
            {currentView === 'emp-scanner' && <EmpScanner currentUser={currentUser} />}
            {currentView === 'emp-products' && <EmpProducts prods={prods} searchQuery={searchQuery} />}
            {currentView === 'emp-orders' && <EmpOrders pos={pos} searchQuery={searchQuery} />}
          </>
        )}
      </div>
    </div>
  );
}
