export const USERS = {
  admin: {
    password: 'admin123',
    role: 'admin',
    name: 'S. Krishnamurthy',
    initials: 'SK',
    title: 'Managing Director',
    dept: 'Management',
    id: 'ADM-001',
    join: '2015-01-01',
    mobile: '9840001001',
    email: 'sk@powergrid.in',
  },
  finance: {
    password: 'fin123',
    role: 'finance',
    name: 'M. Lakshmi',
    initials: 'ML',
    title: 'Finance Manager',
    dept: 'Accounts & Finance',
    id: 'FIN-001',
    join: '2016-04-10',
    mobile: '9840001002',
    email: 'lakshmi@powergrid.in',
  },
  emp001: {
    password: 'emp123',
    role: 'employee',
    name: 'K. Suresh Kumar',
    initials: 'KS',
    title: 'Senior Site Engineer',
    dept: 'Field Engineering',
    id: 'EMP-002',
    join: '2019-03-15',
    mobile: '9841001002',
    email: 'suresh@powergrid.in',
  },
  emp002: {
    password: 'emp123',
    role: 'employee',
    name: 'R. Venkatesan',
    initials: 'RV',
    title: 'Chief Engineer',
    dept: 'Design & Engineering',
    id: 'EMP-001',
    join: '2018-06-01',
    mobile: '9841001001',
    email: 'venkat@powergrid.in',
  },
  emp003: {
    password: 'emp123',
    role: 'employee',
    name: 'S. Pradeep',
    initials: 'SP',
    title: 'QC Inspector',
    dept: 'Testing & QC',
    id: 'EMP-005',
    join: '2021-05-01',
    mobile: '9841001005',
    email: 'pradeep@powergrid.in',
  },
};

export const INITIAL_WORK_LOGS = {
  emp001: [
    {
      id: 'WL-081',
      date: '2026-03-19',
      site: 'TANGEDCO – Hosur Sub-Station',
      wo: 'WO-0091',
      cat: 'Site Work',
      task: 'Completed HT VCB panel wiring and cable termination. Checked earthing connections. Verified CT and PT connections for protection relay.',
      hours: 9,
      status: 'In Progress',
      next: 'Final relay testing tomorrow',
      remarks: 'All work on schedule',
      emp: 'emp001',
    },
    {
      id: 'WL-080',
      date: '2026-03-18',
      site: 'TANGEDCO – Hosur Sub-Station',
      wo: 'WO-0091',
      cat: 'Site Work',
      task: 'Installed cable trays and laid 240 sqmm XLPE cables from transformer to panel room. 80% cable pulling complete.',
      hours: 8,
      status: 'In Progress',
      next: 'Complete remaining 20% cable pulling',
      remarks: '',
      emp: 'emp001',
    },
    {
      id: 'WL-079',
      date: '2026-03-17',
      site: 'TANGEDCO – Hosur Sub-Station',
      wo: 'WO-0091',
      cat: 'Panel Erection',
      task: 'Panel base frame fabrication and fixing. Anchoring bolts installed. Panel shifted from vehicle to position.',
      hours: 7,
      status: 'Completed',
      next: 'Cable laying from tomorrow',
      remarks: '',
      emp: 'emp001',
    },
  ],
  emp002: [
    {
      id: 'WL-071',
      date: '2026-03-19',
      site: 'Aavin Dairy – MCC Panel Design',
      wo: 'PRJ-002',
      cat: 'Workshop',
      task: 'Completed single line diagram and wiring diagram for MCC panel. Shared with client for approval.',
      hours: 7,
      status: 'In Progress',
      next: 'Pending client approval',
      remarks: '',
      emp: 'emp002',
    },
  ],
  emp003: [
    {
      id: 'WL-091',
      date: '2026-03-19',
      site: 'TANGEDCO – Hosur Sub-Station',
      wo: 'WO-0091',
      cat: 'Inspection / QC',
      task: 'QC inspection of HT VCB panel. Checked bus bar connections, CT ratios, relay wiring. Minor rework needed on cable dressing.',
      hours: 8,
      status: 'In Progress',
      next: 'Final HV test pending',
      remarks: 'Cable dressing rework assigned to wireman',
      emp: 'emp003',
    },
  ],
};

export const ALL_SERVICES = [
  { id: 'SVC-0035', type: 'Overhauling & testing of Circuit breakers', client: 'TANGEDCO', date: '2026-03-14', status: 'Completed', value: 45000, emp: 'emp001' },
  { id: 'SVC-0034', type: 'Transformer oil filtration, testing & oil leakage arresting', client: 'Chemplast', date: '2026-03-18', status: 'In Progress', value: 28000, emp: 'emp001' },
  { id: 'SVC-0033', type: 'Earth pit testing & Installation', client: 'Aavin Dairy', date: '2026-03-19', status: 'In Progress', value: 18000, emp: 'emp001' },
  { id: 'SVC-0032', type: 'Testing & calibration of relays', client: 'Srinivasa Textiles', date: '2026-03-21', status: 'Pending', value: 12000, emp: 'emp002' },
  { id: 'SVC-0031', type: 'Testing & calibration of meters', client: 'MRF Tyres', date: '2026-03-22', status: 'Pending', value: 9000, emp: 'emp003' },
  { id: 'SVC-0030', type: 'Panel erection & Cable laying', client: 'Hyundai Motors', date: '2026-03-15', status: 'Completed', value: 85000, emp: 'emp001' },
  { id: 'SVC-0029', type: 'Cable laying termination', client: 'Hyundai Motors', date: '2026-03-16', status: 'Completed', value: 34000, emp: 'emp002' },
  { id: 'SVC-0028', type: 'Thermography', client: 'L&T Construction', date: '2026-03-25', status: 'Pending', value: 15000, emp: 'emp003' },
  { id: 'SVC-0027', type: 'CT & PT testing', client: 'TANGEDCO', date: '2026-03-26', status: 'Pending', value: 22000, emp: 'emp001' }
];

export const ASSIGNS = [
  { emp: 'emp001', empName: 'K. Suresh Kumar', proj: 'TANGEDCO – Hosur Sub-Station', role: 'Site-in-Charge', start: '2026-01-15', end: '2026-03-25' },
  { emp: 'emp002', empName: 'R. Venkatesan', proj: 'Aavin Dairy – MCC Installation', role: 'Design Lead', start: '2026-02-01', end: '2026-04-10' },
  { emp: 'emp003', empName: 'S. Pradeep', proj: 'TANGEDCO – Hosur Sub-Station', role: 'QC Engineer', start: '2026-01-15', end: '2026-03-25' },
];

export const INITIAL_PRODS = [
  { id: 1, name: 'HT VCB Panel Boards (3.3 KV – 33 KV)', code: 'PNL-VCB-HT', cat: 'HT', rating: '3.3kV–33kV', inProd: 2, ready: 1, lead: '8-12 wks', status: 'Active' },
  { id: 2, name: 'LT OCB Panel Boards (200 A -1200 A)', code: 'PNL-OCB-LT', cat: 'LT', rating: '200A-1200A', inProd: 0, ready: 0, lead: '6-8 wks', status: 'Active' },
  { id: 3, name: 'LT ACB Panel Boards (400A – 4000A)', code: 'PNL-ACB-LT', cat: 'LT', rating: '400A–4000A', inProd: 1, ready: 0, lead: '6-8 wks', status: 'Active' },
  { id: 4, name: 'PCC/MCC Panel Boards', code: 'PNL-PCC-MCC', cat: 'LT', rating: 'Custom', inProd: 3, ready: 1, lead: '4-6 wks', status: 'Active' },
  { id: 5, name: 'Synchronizing Panel Boards', code: 'PNL-SYNC', cat: 'LT', rating: 'Custom', inProd: 0, ready: 0, lead: '6-8 wks', status: 'Active' },
  { id: 6, name: 'Distribution Panel Boards', code: 'PNL-DIST', cat: 'LT', rating: 'Standard', inProd: 2, ready: 4, lead: '3-5 wks', status: 'Active' },
  { id: 7, name: 'Metering Panel Boards', code: 'PNL-METER', cat: 'Control', rating: 'Standard', inProd: 0, ready: 2, lead: '3-4 wks', status: 'Active' },
  { id: 8, name: 'Annunciator Panel Boards', code: 'PNL-ANNUN', cat: 'Control', rating: 'Custom', inProd: 0, ready: 0, lead: '4-6 wks', status: 'Active' },
  { id: 9, name: 'APFC Panel Boards', code: 'PNL-APFC', cat: 'LT', rating: 'Standard', inProd: 1, ready: 1, lead: '4-6 wks', status: 'Active' },
  { id: 10, name: 'Control Panel Boards', code: 'PNL-CTRL', cat: 'Control', rating: 'Custom', inProd: 4, ready: 2, lead: '3-6 wks', status: 'Active' },
  { id: 11, name: 'Battery Charger & LT Changeover Panel', code: 'PNL-BATT', cat: 'DC/LT', rating: 'Standard', inProd: 0, ready: 0, lead: '5-7 wks', status: 'Active' },
  { id: 12, name: 'AB Switch & Isolators MCCB & Switch Fuse Units', code: 'SW-AB-MCCB', cat: 'Switchgear', rating: 'Standard', inProd: 0, ready: 10, lead: '2-4 wks', status: 'Active' },
  { id: 13, name: 'Load Break Switch Panel board', code: 'PNL-LBS', cat: 'Medium', rating: 'Standard', inProd: 0, ready: 0, lead: '4-6 wks', status: 'Active' },
  { id: 14, name: 'RETROFIT', code: 'SVC-RETRO', cat: 'Service/Upgrades', rating: 'Custom', inProd: 1, ready: 0, lead: 'Variable', status: 'Active' },
  { id: 15, name: 'CIRCUIT BREAKERS', code: 'COMP-CB', cat: 'Components', rating: 'Various', inProd: 0, ready: 45, lead: '1-3 wks', status: 'Active' },
  { id: 16, name: 'SPARES', code: 'COMP-SPR', cat: 'Components', rating: 'Various', inProd: 0, ready: 120, lead: 'Ex-stock', status: 'Active' }
];

export const INITIAL_POS = [
  { id: 'PO-0112', comp: 'VCB Insulator Bushings', qty: '60 pcs', qtyNum: 60, supplier: 'Crompton Greaves', rate: 800, appliedDate: '2026-03-15', date: '2026-03-22', status: 'Pending' },
  { id: 'PO-0111', comp: 'ACB 1600A (3P)', qty: '10 nos', qtyNum: 10, supplier: 'Schneider Electric', rate: 32000, appliedDate: '2026-03-16', date: '2026-03-25', status: 'Pending' },
];

export const INVOICES = [
  { id: 'INV-0030', client: 'TANGEDCO · Hosur', item: 'HT VCB Panel 11kV × 2', amount: 1439600, issue: '2026-03-01', due: '2026-03-31', status: 'Pending' },
  { id: 'INV-0028', client: 'Chemplast · Cuddalore', item: 'PCC Panel + Overhauling', amount: 610000, issue: '2026-02-10', due: '2026-03-10', status: 'Paid' },
];

export const EMPS_DATA = [
  { id: 'EMP-001', name: 'R. Venkatesan', dept: 'Design & Engineering', role: 'Chief Engineer', join: '2018-06-01', status: 'Active', projects: 2 },
  { id: 'EMP-002', name: 'K. Suresh Kumar', dept: 'Field Engineering', role: 'Senior Site Engineer', join: '2019-03-15', status: 'Active', projects: 2 },
  { id: 'EMP-003', name: 'M. Arumugam', dept: 'Workshop / Fabrication', role: 'Fabrication Supervisor', join: '2020-01-10', status: 'Active', projects: 1 },
];

export const PROJECTS = [
  { id: 'PRJ-001', name: 'TANGEDCO – Hosur Sub-Station', client: 'TANGEDCO', type: 'ELECTRICAL PRE & POST COMMISSIONING', end: '2026-03-25', budget: 2400000, priority: 'High', progress: 82, team: ['K. Suresh Kumar', 'S. Pradeep'] },
  { id: 'PRJ-002', name: 'Aavin Dairy – MCC Installation', client: 'Aavin Dairy', type: 'COMPLETE INDUSTRIAL ELECTRICAL', end: '2026-04-10', budget: 1200000, priority: 'High', progress: 58, team: ['R. Venkatesan', 'P. Balamurugan'] },
  { id: 'PRJ-003', name: 'MRF Tyres – CEIG Handover', client: 'MRF Tyres', type: 'CEIG CO-ORDINATION WORK', end: '2026-05-15', budget: 850000, priority: 'Medium', progress: 20, team: ['K. Suresh Kumar'] },
  { id: 'PRJ-004', name: 'Hyundai – Line 2 Safety Upgrade', client: 'Hyundai Motors', type: 'RULE 30', end: '2026-04-05', budget: 450000, priority: 'Medium', progress: 10, team: ['S. Pradeep', 'R. Venkatesan'] },
];

export const PAYROLL_DATA = [
  { id: 'EMP-001', name: 'R. Venkatesan', basic: 52000, hra: 20000, allow: 8000, pf: 1800, esi: 0 },
  { id: 'EMP-002', name: 'K. Suresh Kumar', basic: 42000, hra: 15000, allow: 5000, pf: 1800, esi: 0 },
  { id: 'EMP-003', name: 'M. Arumugam', basic: 18000, hra: 8000, allow: 2000, pf: 1800, esi: 210 },
  { id: 'EMP-005', name: 'S. Pradeep', basic: 21000, hra: 9000, allow: 3000, pf: 1800, esi: 247 },
];

export const today = new Date('2026-03-19');
export const todayStr = '2026-03-19';

export function getInitials(name) {
  if (!name) return 'UN';
  return name.split(' ').map((w) => w[0]).join('').substring(0, 2).toUpperCase();
}

export function rC(s) {
  const h = ['#b45309', '#026d43', '#a8510a', '#1360c2', '#5b21b6', '#b01f1f'];
  let i = 0;
  for (let c of s) i += c.charCodeAt(0);
  return h[i % h.length];
}

export function fmt(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function dF(d) {
  return Math.ceil((new Date(d) - today) / 86400000);
}

export function exportToCSV(dataArray, filename = 'export.csv') {
  if (!dataArray || !dataArray.length) {
    alert('No data to export.');
    return;
  }
  const keys = Object.keys(dataArray[0]);
  let csv = keys.join(',') + '\n';
  
  dataArray.forEach(row => {
    csv += keys.map(k => {
      let val = row[k] === null || row[k] === undefined ? '' : row[k];
      if (typeof val === 'string') {
        val = val.replace(/"/g, '""');
        if (val.search(/("|,|\n)/g) >= 0) val = `"${val}"`;
      }
      return val;
    }).join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
