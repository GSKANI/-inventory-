import React, { useState } from 'react';
import { PAYROLL_DATA } from './data';

export default function Payroll({ searchQuery = '' }) {
  const [employees, setEmployees] = useState(PAYROLL_DATA);
  const [pfRate, setPfRate] = useState(12); // standard 12%
  const [esiRate, setEsiRate] = useState(1.75); // standard 1.75%
  
  const handleRecalculate = () => {
    const updated = employees.map(emp => {
      // Basic PF Calculation
      const pfNew = (emp.basic * pfRate) / 100;
      // Basic ESI Calculation on Gross (Basic + HRA + Allowances)
      const gross = emp.basic + emp.hra + emp.allow;
      // ESI logic typically applies if gross is below 21000, 
      // but for demonstration we'll just apply the selected rate if they had esi broadly 
      // or optionally apply it everywhere.
      const esiNew = gross <= 25000 ? (gross * esiRate) / 100 : 0;
      
      return { ...emp, pf: pfNew, esi: esiNew };
    });
    setEmployees(updated);
  };

  let displayEmps = employees;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    displayEmps = employees.filter(e => e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q));
  }

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Payroll & Regulations</div>
          <div className="pgs">Manage Employee Salary, PF (Provident Fund) and ESI allocations.</div>
        </div>
      </div>

      <div className="card" style={{ padding: '20px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '14px', marginBottom: '12px' }}>Statutory Policy Configuration</h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--mu)', display: 'block', marginBottom: '4px' }}>PF Deduction Rate (%)</label>
            <input type="number" min="0" max="100" className="f-inp" value={pfRate} onChange={e => setPfRate(e.target.value)} style={{ width: '150px' }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--mu)', display: 'block', marginBottom: '4px' }}>ESI Rate (%)</label>
            <input type="number" step="0.01" min="0" max="100" className="f-inp" value={esiRate} onChange={e => setEsiRate(e.target.value)} style={{ width: '150px' }} />
          </div>
          <button className="btn bp" onClick={handleRecalculate}>Apply Policy Globally</button>
        </div>
      </div>

      <div className="card">
        <div className="ch"><div className="ct">Employee Payroll Ledger</div></div>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Basic Salary</th>
              <th>HRA & Allowances</th>
              <th>PF Deduction</th>
              <th>ESI Deduction</th>
              <th>Net Payable</th>
            </tr>
          </thead>
          <tbody>
            {displayEmps.map(emp => {
              const gross = emp.basic + emp.hra + emp.allow;
              const deduct = emp.pf + emp.esi;
              const net = gross - deduct;
              return (
                <tr key={emp.id}>
                  <td>
                    <div className="anm">{emp.name}</div>
                    <div className="aid mo">{emp.id}</div>
                  </td>
                  <td className="mo">₹{emp.basic.toLocaleString('en-IN')}</td>
                  <td className="mo">₹{(emp.hra + emp.allow).toLocaleString('en-IN')}</td>
                  <td className="mo" style={{ color: 'var(--rd)' }}>- ₹{emp.pf.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                  <td className="mo" style={{ color: 'var(--rd)' }}>- ₹{emp.esi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                  <td className="mo" style={{ color: 'var(--gn)', fontWeight: 700 }}>₹{net.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
