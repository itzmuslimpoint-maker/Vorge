'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

const leadsData = [
  { name: 'Amit Sharma', company: 'TechSpark Pvt', phone: '+91 98200 12345', source: 'Apollo', campaign: 'Mumbai SaaS', status: 'converted', calls: 2, score: 92 },
  { name: 'Priya Nair', company: 'GreenBuild Co.', phone: '+91 90000 54321', source: 'Google Maps', campaign: 'Pune RE', status: 'calling', calls: 1, score: 74 },
  { name: 'Rahul Mehta', company: 'FinEdge Capital', phone: '+91 91234 67890', source: 'Apollo', campaign: 'Delhi Finance', status: 'pending', calls: 0, score: 61 },
  { name: 'Sneha Joshi', company: 'CureIt Health', phone: '+91 98765 43210', source: 'Apollo', campaign: 'Mumbai SaaS', status: 'failed', calls: 3, score: 22 },
  { name: 'Vikram Singh', company: 'PropMax Realty', phone: '+91 80000 11111', source: 'Google Maps', campaign: 'Pune RE', status: 'voicemail', calls: 2, score: 45 },
  { name: 'Kavya Iyer', company: 'SwiftLogic SaaS', phone: '+91 70000 22222', source: 'Apollo', campaign: 'Mumbai SaaS', status: 'converted', calls: 1, score: 88 },
  { name: 'Arjun Patel', company: 'BlueSky Finance', phone: '+91 99999 33333', source: 'Apollo', campaign: 'Delhi Finance', status: 'converted', calls: 2, score: 95 },
  { name: 'Meena Desai', company: 'Craft & Co.', phone: '+91 88888 44444', source: 'Google Maps', campaign: 'Mumbai SaaS', status: 'pending', calls: 0, score: 58 },
];

const statusColors: Record<string, string> = {
  converted: 'bg-[rgba(0,229,160,0.12)] text-[#00e5a0]',
  calling: 'bg-[rgba(0,212,255,0.12)] text-[#00d4ff]',
  failed: 'bg-[rgba(255,71,87,0.12)] text-[#ff4757]',
  pending: 'bg-[rgba(255,193,7,0.1)] text-[#ffc107]',
  voicemail: 'bg-[rgba(123,94,167,0.15)] text-[#a87dd4]',
};

export default function LeadsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex h-screen relative z-10">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title="Lead Manager" breadcrumb="/ leads" />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)] flex justify-between items-center">
              <h3 className="text-[13px] font-bold">◎ Lead Database</h3>
              <div className="flex gap-2">
                <button className="text-[10px] text-[#6b7a8d] border border-[rgba(255,255,255,0.12)] px-2.5 py-1 rounded hover:text-white transition">⟳ Sync Apollo</button>
                <button className="text-[10px] text-[#6b7a8d] border border-[rgba(255,255,255,0.12)] px-2.5 py-1 rounded hover:text-white transition">🗺 Google Maps Import</button>
                <button className="bg-[#00d4ff] text-black text-[10px] px-3 py-1 rounded-md font-semibold">+ Add Lead</button>
              </div>
            </div>

            {/* Filters */}
            <div className="px-5 py-3 border-b border-[rgba(255,255,255,0.06)] flex gap-2.5">
              <input
                className="flex-1 bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none focus:border-[#00d4ff] transition"
                placeholder="Search leads by name, company, number…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <select className="bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none appearance-none w-[140px]">
                <option>All Statuses</option>
                <option>Pending</option>
                <option>Converted</option>
                <option>Failed</option>
              </select>
              <select className="bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none appearance-none w-[140px]">
                <option>All Campaigns</option>
                <option>Mumbai SaaS</option>
                <option>Pune RE</option>
              </select>
            </div>

            {/* Table */}
            <div className="overflow-y-auto max-h-[460px]">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    {['Lead', 'Phone', 'Source', 'Campaign', 'Status', 'Calls', 'Score', ''].map((h, i) => (
                      <th key={i} className="text-[9px] text-[#3d4f63] uppercase tracking-[0.12em] font-mono font-normal px-3 pb-2.5 pt-2">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leadsData.filter(l => !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.company.toLowerCase().includes(search.toLowerCase())).map((l, i) => (
                    <tr key={i} className="hover:bg-[rgba(255,255,255,0.02)]">
                      <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)]">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold" style={{ background: `hsl(${i * 40}, 40%, 25%)` }}>
                            {l.name[0]}{l.name.split(' ')[1]?.[0] || ''}
                          </div>
                          <div>
                            <div className="text-xs font-semibold">{l.name}</div>
                            <div className="text-[10px] text-[#6b7a8d]">{l.company}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)] font-mono text-[11px] text-[#6b7a8d]">{l.phone}</td>
                      <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)]">
                        <span className="text-[10px] bg-[#1a2332] text-[#6b7a8d] px-1.5 py-0.5 rounded font-mono border border-[rgba(255,255,255,0.06)]">{l.source}</span>
                      </td>
                      <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)]">
                        <span className="text-[10px] bg-[#1a2332] text-[#6b7a8d] px-1.5 py-0.5 rounded font-mono border border-[rgba(255,255,255,0.06)]">{l.campaign}</span>
                      </td>
                      <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)]">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-[0.06em] font-mono ${statusColors[l.status]}`}>{l.status}</span>
                      </td>
                      <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)] font-mono text-[11px] text-center">{l.calls}</td>
                      <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)]">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1 bg-[#1a2332] rounded-sm w-[60px] overflow-hidden">
                            <div className="h-full rounded-sm" style={{ width: `${l.score}%`, background: l.score > 75 ? '#00e5a0' : l.score > 45 ? '#ffc107' : '#ff4757' }} />
                          </div>
                          <span className="text-[10px] font-mono text-[#6b7a8d]">{l.score}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)]">
                        <button className="text-[9px] text-[#6b7a8d] border border-[rgba(255,255,255,0.12)] px-2 py-1 rounded hover:text-white transition">Call</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
