'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import StatCard from '@/components/StatCard';
import BarChart from '@/components/BarChart';
import DonutChart from '@/components/DonutChart';
import CallTable from '@/components/CallTable';
import LiveCalls from '@/components/LiveCalls';
import CampaignCard from '@/components/CampaignCard';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCalls: 1284,
    conversionRate: 31.7,
    avgDuration: '3:42',
    activeCampaigns: 3,
  });

  const campaignData = [
    { name: 'Mumbai SaaS Outreach', status: 'active', leads: 1240, called: 980, converted: 374, progress: 79 },
    { name: 'Pune Real Estate Q2', status: 'active', leads: 680, called: 612, converted: 183, progress: 90 },
    { name: 'Delhi Finance Drive', status: 'paused', leads: 420, called: 388, converted: 97, progress: 92 },
  ];

  return (
    <div className="flex h-screen relative z-10">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title="Overview Dashboard" breadcrumb="/ home" liveCalls={4} />
        <div className="flex-1 overflow-y-auto p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3.5 mb-6">
            <StatCard
              label="Total Calls Today"
              value="1,284"
              change="▲ 18.4% vs yesterday"
              changeType="up"
              accent="#00d4ff"
              icon="📞"
            />
            <StatCard
              label="Conversion Rate"
              value="31.7%"
              change="▲ 4.2% this week"
              changeType="up"
              accent="#00e5a0"
              icon="✓"
            />
            <StatCard
              label="Avg Call Duration"
              value="3:42"
              change="▼ 0:18 vs target"
              changeType="down"
              accent="#ff6b35"
              icon="⏱"
            />
            <StatCard
              label="Active Campaigns"
              value="3"
              change="▲ 1 launched today"
              changeType="up"
              accent="#7b5ea7"
              icon="🎯"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
                <h3 className="text-[13px] font-bold">📊 Call Volume — Last 7 Days</h3>
                <p className="text-[10px] text-[#6b7a8d] font-mono mt-0.5">calls vs converted</p>
              </div>
              <div className="p-5">
                <BarChart />
              </div>
            </div>
            <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
                <h3 className="text-[13px] font-bold">◎ Call Outcomes</h3>
                <p className="text-[10px] text-[#6b7a8d] font-mono mt-0.5">distribution by result</p>
              </div>
              <div className="p-5">
                <DonutChart />
              </div>
            </div>
          </div>

          {/* Live + Table */}
          <div className="grid grid-cols-[1fr_320px] gap-4 mb-4">
            <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)] flex justify-between items-center">
                <div>
                  <h3 className="text-[13px] font-bold">📋 Recent Calls</h3>
                  <p className="text-[10px] text-[#6b7a8d] font-mono mt-0.5">last 50 calls · auto-refresh 5s</p>
                </div>
                <button className="text-[#6b7a8d] text-[10px] border border-[rgba(255,255,255,0.12)] px-2.5 py-1 rounded-md hover:text-white">View All</button>
              </div>
              <CallTable />
            </div>
            <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)] flex justify-between items-center">
                <div>
                  <h3 className="text-[13px] font-bold">🔴 Live Calls</h3>
                  <p className="text-[10px] text-[#6b7a8d] font-mono mt-0.5">real-time monitor</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#00e5a0] font-mono bg-[rgba(0,229,160,0.08)] border border-[rgba(0,229,160,0.2)] px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse" /> 4 active
                </div>
              </div>
              <LiveCalls />
            </div>
          </div>

          {/* Campaigns Strip */}
          <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)] flex justify-between items-center">
              <h3 className="text-[13px] font-bold">⚡ Active Campaigns</h3>
              <a href="/campaigns" className="bg-[#00d4ff] text-black text-[10px] px-3 py-1 rounded-md font-semibold">Manage</a>
            </div>
            <div className="p-3 grid grid-cols-3 gap-3">
              {campaignData.map((c, i) => (
                <CampaignCard key={i} {...c} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                }
