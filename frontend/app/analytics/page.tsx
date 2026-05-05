'use client';

import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import StatCard from '@/components/StatCard';

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen relative z-10">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title="Analytics" breadcrumb="/ analytics" />
        <div className="flex-1 overflow-y-auto p-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-3.5 mb-6">
            <StatCard label="Total Calls (Month)" value="28.4K" change="▲ 34% MoM" changeType="up" accent="#00d4ff" icon="📞" />
            <StatCard label="Revenue Generated" value="₹4.2L" change="▲ 21% MoM" changeType="up" accent="#00e5a0" icon="💰" />
            <StatCard label="Cost per Lead" value="₹18" change="▼ 6% (better)" changeType="down" accent="#ff6b35" icon="📉" />
            <StatCard label="Avg Sentiment" value="7.4" change="▲ 0.8 vs last month" changeType="up" accent="#7b5ea7" icon="😊" />
          </div>

          {/* Campaign Performance Table */}
          <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
              <h3 className="text-[13px] font-bold">◈ Performance by Campaign</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    {['Campaign', 'Leads', 'Called', 'Converted', 'Rate', 'Avg Duration', 'Sentiment', 'Revenue'].map((h, i) => (
                      <th key={i} className="text-[9px] text-[#3d4f63] uppercase tracking-[0.12em] font-mono font-normal px-3 pb-2.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Mumbai SaaS Outreach', leads: 1240, called: 1180, converted: 374, rate: '31.7%', duration: '3:42', sentiment: 7.8, revenue: '₹2,14,000' },
                    { name: 'Pune Real Estate', leads: 680, called: 612, converted: 183, rate: '29.9%', duration: '4:12', sentiment: 6.4, revenue: '₹1,46,000' },
                    { name: 'Delhi Finance', leads: 420, called: 388, converted: 97, rate: '25.0%', duration: '2:58', sentiment: 7.1, revenue: '₹58,000' },
                  ].map((r, i) => (
                    <tr key={i} className="hover:bg-[rgba(255,255,255,0.02)]">
                      <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)] font-semibold text-xs">{r.name}</td>
                      <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)] font-mono text-[11px]">{r.leads}</td>
                      <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)] font-mono text-[11px]">{r.called}</td>
                      <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)] font-mono text-[11px] text-[#00e5a0]">{r.converted}</td>
                      <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)]">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-semibold uppercase font-mono bg-[rgba(0,229,160,0.12)] text-[#00e5a0]">{r.rate}</span>
                      </td>
                      <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)] font-mono text-[11px] text-[#6b7a8d]">{r.duration}</td>
                      <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{r.sentiment > 7 ? '😊' : '😐'}</span>
                          <div className="h-1 bg-[#1a2332] rounded-sm w-[60px] overflow-hidden">
                            <div className="h-full rounded-sm" style={{ width: `${r.sentiment * 10}%`, background: r.sentiment > 7 ? '#00e5a0' : '#ffc107' }} />
                          </div>
                          <span className="font-mono text-[10px]">{r.sentiment}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)] font-mono text-[11px] text-[#00e5a0]">{r.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
