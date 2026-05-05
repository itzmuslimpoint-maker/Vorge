// setup/page.tsx
'use client';

import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import VoiceSetup from '@/components/VoiceSetup';

export default function SetupPage() {
  return (
    <div className="flex h-screen relative z-10">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title="AI Voice Setup" breadcrumb="/ settings" />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Voice Profiles */}
            <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
              <VoiceSetup />
            </div>

            {/* Script Builder */}
            <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
                <h3 className="text-[13px] font-bold">✦ Script Builder</h3>
              </div>
              <div className="p-4">
                <div className="mb-3.5">
                  <label className="text-[10px] text-[#6b7a8d] mb-1 block font-mono uppercase tracking-[0.08em]">Opening Line</label>
                  <textarea className="w-full bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none focus:border-[#00d4ff] transition resize-none" rows={3} defaultValue="Namaste! Main VoiceForge se bol raha hoon. Kya aapke paas 2 minute hain?" />
                </div>
                <div className="mb-3.5">
                  <label className="text-[10px] text-[#6b7a8d] mb-1 block font-mono uppercase tracking-[0.08em]">Objection: "Not Interested"</label>
                  <textarea className="w-full bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none focus:border-[#00d4ff] transition resize-none" rows={2} defaultValue="Bilkul samajh sakta hoon! Humne 50+ companies ko 40% cost bachane mein help ki hai." />
                </div>
                <div className="mb-3.5">
                  <label className="text-[10px] text-[#6b7a8d] mb-1 block font-mono uppercase tracking-[0.08em]">Closing Line</label>
                  <textarea className="w-full bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none focus:border-[#00d4ff] transition resize-none" rows={2} defaultValue="Toh kya main aapko kal 11 baje demo ke liye call kar sakta hoon?" />
                </div>
                <button className="w-full text-[#6b7a8d] border border-[rgba(255,255,255,0.12)] py-2 rounded-md text-xs mb-2 hover:text-white transition">🤖 Generate with GPT-4o</button>
                <button className="w-full bg-[#00d4ff] text-black py-2 rounded-md text-xs font-semibold hover:bg-[#00bcdc] transition">Save Script</button>
              </div>
            </div>

            {/* Human-like Settings */}
            <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
                <h3 className="text-[13px] font-bold">⚙ Human-Like Settings</h3>
              </div>
              <div className="p-4">
                {[
                  { label: 'Response Delay (ms)', type: 'range', value: '200', desc: '200ms — simulates human thinking time' },
                  { label: 'Breathing Sounds', type: 'select', options: ['Enabled (subtle)', 'Enabled (natural)', 'Disabled'], desc: '' },
                  { label: 'Interruption Handling', type: 'select', options: ['GPT-4o Real-time Pause', 'Fixed Pause (500ms)'], desc: '' },
                  { label: 'Personality Injection', type: 'select', options: ['Hinglish local refs enabled', 'Formal only', 'Custom prompt…'], desc: '' },
                ].map((s, i) => (
                  <div key={i} className="mb-3.5">
                    <label className="text-[10px] text-[#6b7a8d] mb-1 block font-mono uppercase tracking-[0.08em]">{s.label}</label>
                    {s.type === 'range' ? (
                      <>
                        <input type="range" min="50" max="500" defaultValue={s.value} className="w-full accent-[#00d4ff]" />
                        {s.desc && <div className="text-[10px] text-[#6b7a8d] mt-1 font-mono">{s.desc}</div>}
                      </>
                    ) : (
                      <select className="w-full bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none focus:border-[#00d4ff] transition appearance-none">
                        {s.options?.map((o, j) => <option key={j}>{o}</option>)}
                      </select>
                    )}
                  </div>
                ))}
                <button className="w-full bg-[#00d4ff] text-black py-2 rounded-md text-xs font-semibold hover:bg-[#00bcdc] transition">Save Voice Config</button>
              </div>
            </div>

            {/* API Keys */}
            <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
                <h3 className="text-[13px] font-bold">🔌 API Keys</h3>
              </div>
              <div className="p-4">
                {['Vapi.ai API Key', 'OpenAI (GPT-4o)', 'Supabase URL', 'Apollo.io Key'].map((key, i) => (
                  <div key={i} className="mb-3.5">
                    <label className="text-[10px] text-[#6b7a8d] mb-1 block font-mono uppercase tracking-[0.08em]">{key}</label>
                    <input type={key.includes('URL') ? 'text' : 'password'} className="w-full bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none focus:border-[#00d4ff] transition" defaultValue="••••••••••••••••••" />
                  </div>
                ))}
                <button className="w-full bg-[#00d4ff] text-black py-2 rounded-md text-xs font-semibold hover:bg-[#00bcdc] transition">Save & Test Connections</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                  }
