import React from 'react';
import { INVOICES } from './data';

export default function FinanceDashboard({ searchQuery = '' }) {
  let invs = INVOICES;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    invs = invs.filter(i => i.client.toLowerCase().includes(q) || i.id.toLowerCase().includes(q));
  }

  const incomes = invs.filter(i => i.status === 'Paid').reduce((s, i) => s + i.amount, 0);
  const expectedIncomes = invs.filter(i => i.status === 'Pending').reduce((s, i) => s + i.amount, 0);
  
  // Mock outgoings based on POs or flat numbers for demo
  const outgoings = 240000; 

  return (
    <div className="view pg on" style={{ animation: 'fin .2s ease' }}>
      <div className="pgh">
        <div>
          <div className="pgt">Finance Overview</div>
          <div className="pgs">Monitor all income, outgoing expenses, and corporate financial health.</div>
        </div>
      </div>

      <div className="sg sg3" style={{ marginBottom: '20px' }}>
        <div className="sc">
          <div className="sct"><div className="scl">Total Income (Secured)</div><div className="sci" style={{background: 'var(--gnb)', color: 'var(--gn)'}}>IN</div></div>
          <div className="scv mo" style={{ color: 'var(--gn)' }}>₹{incomes.toLocaleString('en-IN')}</div>
          <div className="scf">Collected to date</div>
        </div>
        <div className="sc">
          <div className="sct"><div className="scl">Pending Receivables</div><div className="sci" style={{background: 'var(--amb)', color: 'var(--am)'}}>PND</div></div>
          <div className="scv mo" style={{ color: 'var(--am)' }}>₹{expectedIncomes.toLocaleString('en-IN')}</div>
          <div className="scf">Awaiting invoice clearance</div>
        </div>
        <div className="sc">
          <div className="sct"><div className="scl">Total Outgoings</div><div className="sci" style={{background: 'var(--rdb)', color: 'var(--rd)'}}>OUT</div></div>
          <div className="scv mo" style={{ color: 'var(--rd)' }}>₹{outgoings.toLocaleString('en-IN')}</div>
          <div className="scf">Expenses & Material Costs</div>
        </div>
      </div>

      <div className="card">
        <div className="ch"><div className="ct">Financial Summary Chart</div></div>
        <div style={{ padding: '24px', textAlign: 'center' }}>
           <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', height: '24px', borderRadius: '12px', overflow: 'hidden', display: 'flex', background: 'var(--sf2)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)' }}>
             <div style={{ width: '65%', background: 'var(--gn)', height: '100%' }} title="Income 65%"></div>
             <div style={{ width: '20%', background: 'var(--am)', height: '100%' }} title="Pending 20%"></div>
             <div style={{ width: '15%', background: 'var(--rd)', height: '100%' }} title="Outgoings 15%"></div>
           </div>
           <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '16px', fontSize: '13px' }}>
             <span><strong style={{color: 'var(--gn)'}}>65%</strong> Realized Income</span>
             <span><strong style={{color: 'var(--am)'}}>20%</strong> Pending Value</span>
             <span><strong style={{color: 'var(--rd)'}}>15%</strong> Outgoing Costs</span>
           </div>
        </div>
      </div>

    </div>
  );
}
