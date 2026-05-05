'use client';

import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import LiveCalls from '@/components/LiveCalls';

const queueLeads = [
  { name: 'Amit Sharma', company: 'TechSpark Pvt' },
  { name: 'Priya Nair', company: 'GreenBuild Co.' },
  { name: 'Rahul Mehta', company: 'FinEdge Capital' },
  { name: 'Sneha Joshi', company: 'CureIt Health' },
  { name: 'Vikram Singh', company: 'PropMax Realty' },
  { name: 'Kavya Iyer', company: 'SwiftLogic SaaS' },
];

export default function CallsPage() {
  return (
    <div className="flex h-screen relative z-10">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title="Live Call Monitor" breadcrumb="/ monitor" liveCalls={4} />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-[1fr_320px] gap-4">
            {/* Live Call Monitor */}
            <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)] flex justify-between items-center">
                <h3 className="text-[13px] font-bold">▶ Live Call Monitor</h3>
                <div className="flex items-center gap-1.5 text-[10px] text-[#00e5a0] font-mono bg-[rgba(0,229,160,0.08)] border border-[rgba(0,229,160,0.2)] px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse" /> 4 active
                </div>
              </div>
              <LiveCalls />
            </div>

            {/* Call Queue */}
            <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
                <h3 className="text-[13px] font-bold">◷ Call Queue</h3>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[11px] text-[#6b7a8d]">Next in queue</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-semibold uppercase font-mono bg-[rgba(255,193,7,0.1)] text-[#ffc107]">47 pending</span>
                </div>
                {queueLeads.map((l, i) => (
                  <div key={i} className="flex items-center gap-2.5 py-2 border-b border-[rgba(255,255,255,0.06)] last:border-b-0">
                    <div className="font-mono text-[10px] text-[#3d4f63] w-4">{i + 1}</div>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold" style={{ background: `hsl(${i * 40}, 40%, 25%)` }}>{l.name[0]}</div>
                    <div className="flex-1">
                      <div className="text-[11px] font-semibold">{l.name}</div>
                      <div className="text-[10px] text-[#6b7a8d]">{l.company}</div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-semibold uppercase font-mono bg-[rgba(255,193,7,0.1)] text-[#ffc107]">queued</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
