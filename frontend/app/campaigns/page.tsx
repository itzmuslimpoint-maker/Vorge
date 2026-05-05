'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function CampaignsPage() {
  const [formData, setFormData] = useState({
    name: 'Mumbai SaaS Outreach',
    industry: 'SaaS / Tech',
    location: 'Mumbai, Thane',
    voice: 'Aryan (Hinglish · Male)',
    window: '10:00 AM – 6:00 PM IST',
    maxCalls: 200,
  });

  const campaigns = [
    { name: 'Mumbai SaaS Outreach', status: 'active', leads: 1240, called: 980, converted: 374, progress: 79 },
    { name: 'Pune Real Estate Q2', status: 'active', leads: 680, called: 612, converted: 183, progress: 90 },
    { name: 'Delhi Finance Drive', status: 'paused', leads: 420, called: 388, converted: 97, progress: 92 },
  ];

  return (
    <div className="flex h-screen relative z-10">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title="Campaigns" breadcrumb="/ campaigns" />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-[1fr_320px] gap-4">
            {/* Campaign List */}
            <div>
              <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden mb-4">
                <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)] flex justify-between items-center">
                  <h3 className="text-[13px] font-bold">⚡ All Campaigns</h3>
                  <button className="bg-[#00d4ff] text-black text-[10px] px-3 py-1 rounded-md font-semibold">+ New</button>
                </div>
                <div className="p-3">
                  {campaigns.map((c, i) => (
                    <div key={i} className="bg-[#131a24] border border-[rgba(255,255,255,0.06)] rounded-lg p-3.5 mb-2.5 hover:border-[rgba(255,255,255,0.12)] transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-xs font-bold">{c.name}</div>
                          <div className="text-[10px] text-[#6b7a8d] font-mono mt-0.5">{c.leads} leads · {c.progress}% complete</div>
                        </div>
                        <span className={`text-[9px] font-semibold capitalize ${c.status === 'active' ? 'text-[#00e5a0]' : 'text-[#ffc107]'}`}>● {c.status}</span>
                      </div>
                      <div className="h-1 bg-[#1a2332] rounded-sm overflow-hidden mb-2">
                        <div className="h-full rounded-sm bg-gradient-to-r from-[#00d4ff] to-[#00e5a0]" style={{ width: `${c.progress}%` }} />
                      </div>
                      <div className="flex gap-3 mt-2">
                        <div className="flex gap-2">
                          <button className="text-[10px] text-[#6b7a8d] border border-[rgba(255,255,255,0.12)] px-2 py-1 rounded hover:text-white transition">⏸ Pause</button>
                          <button className="text-[10px] text-[#6b7a8d] border border-[rgba(255,255,255,0.12)] px-2 py-1 rounded hover:text-white transition">✎ Edit</button>
                          <button className="text-[10px] bg-[#00d4ff] text-black px-2 py-1 rounded font-semibold hover:bg-[#00bcdc] transition">▶ Run</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Launch */}
            <div>
              <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
                  <h3 className="text-[13px] font-bold">✦ Quick Launch</h3>
                </div>
                <div className="p-4">
                  <div className="mb-3.5">
                    <label className="text-[10px] text-[#6b7a8d] mb-1 block font-mono uppercase tracking-[0.08em]">Campaign Name</label>
                    <input className="w-full bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none focus:border-[#00d4ff] transition" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="mb-3.5">
                    <label className="text-[10px] text-[#6b7a8d] mb-1 block font-mono uppercase tracking-[0.08em]">Target Industry</label>
                    <select className="w-full bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none focus:border-[#00d4ff] transition appearance-none">
                      <option>SaaS / Tech</option>
                      <option>Real Estate</option>
                      <option>Healthcare</option>
                      <option>Finance</option>
                      <option>Retail</option>
                    </select>
                  </div>
                  <div className="mb-3.5">
                    <label className="text-[10px] text-[#6b7a8d] mb-1 block font-mono uppercase tracking-[0.08em]">City / Region</label>
                    <input className="w-full bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none focus:border-[#00d4ff] transition" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                  </div>
                  <div className="mb-3.5">
                    <label className="text-[10px] text-[#6b7a8d] mb-1 block font-mono uppercase tracking-[0.08em]">AI Voice</label>
                    <select className="w-full bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none focus:border-[#00d4ff] transition appearance-none">
                      <option>Aryan (Hinglish · Male)</option>
                      <option>Priya (Hindi · Female)</option>
                      <option>Alex (English · Male)</option>
                      <option>Diya (Hinglish · Female)</option>
                    </select>
                  </div>
                  <div className="mb-3.5">
                    <label className="text-[10px] text-[#6b7a8d] mb-1 block font-mono uppercase tracking-[0.08em]">Call Window</label>
                    <select className="w-full bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none focus:border-[#00d4ff] transition appearance-none">
                      <option>10:00 AM – 6:00 PM IST</option>
                      <option>9:00 AM – 8:00 PM IST</option>
                      <option>Custom…</option>
                    </select>
                  </div>
                  <div className="mb-3.5">
                    <label className="text-[10px] text-[#6b7a8d] mb-1 block font-mono uppercase tracking-[0.08em]">Max Calls / Day</label>
                    <input type="number" className="w-full bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none focus:border-[#00d4ff] transition" value={formData.maxCalls} onChange={e => setFormData({...formData, maxCalls: parseInt(e.target.value)})} />
                  </div>
                  <button className="w-full bg-[#00d4ff] text-black text-xs py-2 rounded-md font-semibold hover:bg-[#00bcdc] transition mt-1.5">🚀 Launch Campaign</button>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden mt-3">
                <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
                  <h3 className="text-[13px] font-bold">🛠 Tech Stack</h3>
                </div>
                <div className="p-4 text-[11px] text-[#6b7a8d]">
                  Powering this campaign:
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {[
                      { label: 'Next.js', cls: 'text-[#60a5fa] border-[rgba(96,165,250,0.3)] bg-[rgba(96,165,250,0.06)]' },
                      { label: 'FastAPI', cls: 'text-[#ff6b35] border-[rgba(255,107,53,0.3)] bg-[rgba(255,107,53,0.06)]' },
                      { label: 'Supabase', cls: 'text-[#00e5a0] border-[rgba(0,229,160,0.3)] bg-[rgba(0,229,160,0.06)]' },
                      { label: 'Vapi.ai', cls: 'text-[#00d4ff] border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.06)]' },
                      { label: 'ElevenLabs', cls: 'text-[#a87dd4] border-[rgba(168,125,212,0.3)] bg-[rgba(168,125,212,0.06)]' },
                      { label: 'GPT-4o', cls: 'text-[#60a5fa] border-[rgba(96,165,250,0.3)] bg-[rgba(96,165,250,0.06)]' },
                      { label: 'Deepgram', cls: 'text-[#00e5a0] border-[rgba(0,229,160,0.3)] bg-[rgba(0,229,160,0.06)]' },
                      { label: 'Apollo.io', cls: 'text-[#ff6b35] border-[rgba(255,107,53,0.3)] bg-[rgba(255,107,53,0.06)]' },
                      { label: 'Railway', cls: 'text-[#00d4ff] border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.06)]' },
                    ].map((t, i) => (
                      <span key={i} className={`text-[10px] font-mono px-2 py-0.5 rounded border ${t.cls}`}>{t.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                    }
