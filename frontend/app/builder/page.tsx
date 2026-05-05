// builder/page.tsx
'use client';

import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function BuilderPage() {
  return (
    <div className="flex h-screen relative z-10">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title="Script Builder" breadcrumb="/ builder" />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)] flex justify-between items-center">
              <h3 className="text-[13px] font-bold">✦ Campaign Script Builder — GPT-4o Powered</h3>
              <button className="bg-[#00d4ff] text-black text-xs px-3.5 py-1.5 rounded-md font-semibold">🚀 Generate Script</button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-5">
              <div>
                {[
                  { label: 'Product / Service', type: 'input', value: 'SaaS CRM for SMEs' },
                  { label: 'Target Persona', type: 'input', value: 'Business owners, Managers (Mumbai, 25-45)' },
                  { label: 'Key Value Prop', type: 'textarea', value: 'Automates follow-ups, saves 3 hours/day, integrates with WhatsApp. 40% cheaper than Salesforce.', rows: 3 },
                  { label: 'Tone', type: 'select', options: ['Hinglish — Friendly & Casual', 'Hindi — Professional', 'English — Corporate', 'Regional Mix'] },
                  { label: 'Common Objections', type: 'textarea', value: 'Price too high, Already using Excel, No time to switch', rows: 3 },
                ].map((f, i) => (
                  <div key={i} className="mb-3.5">
                    <label className="text-[10px] text-[#6b7a8d] mb-1 block font-mono uppercase tracking-[0.08em]">{f.label}</label>
                    {f.type === 'select' ? (
                      <select className="w-full bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none focus:border-[#00d4ff] transition appearance-none">
                        {f.options?.map((o, j) => <option key={j}>{o}</option>)}
                      </select>
                    ) : f.type === 'textarea' ? (
                      <textarea className="w-full bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none focus:border-[#00d4ff] transition resize-none" rows={f.rows} defaultValue={f.value} />
                    ) : (
                      <input className="w-full bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-md px-3 py-2 text-xs text-[#e8edf5] outline-none focus:border-[#00d4ff] transition" defaultValue={f.value} />
                    )}
                  </div>
                ))}
              </div>
              <div>
                <label className="text-[10px] text-[#6b7a8d] mb-1 block font-mono uppercase tracking-[0.08em]">Generated Script Preview</label>
                <div className="bg-[#131a24] border border-[rgba(255,255,255,0.12)] rounded-lg p-3.5 text-[11px] leading-relaxed text-[#e8edf5] font-mono h-[calc(100%-24px)] overflow-y-auto">
                  <div className="text-[#00d4ff] mb-2">── OPENING ──</div>
                  Namaste! Main Rahul bol raha hoon, VoiceForge se. Kya aap [Company Name] ke owner hain?
                  <br /><br />
                  <span className="text-[#6b7a8d]">[Wait for response]</span>
                  <br /><br />
                  Bahut achha! Main chahta tha ki aapko ek cheez bataaun jo Mumbai ke 200+ businesses use kar rahe hain — unka CRM aur follow-up poora automate ho gaya hai.
                  <br /><br />
                  <div className="text-[#00d4ff] mb-2">── IF INTERESTED ──</div>
                  Perfect! Humara tool directly WhatsApp se connect hota hai. Kya main ek quick 15-minute demo set kar sakta hoon?
                  <br /><br />
                  <div className="text-[#ffc107] mb-2">── OBJECTION: Price ──</div>
                  Samajh sakta hoon! Actually humari pricing Salesforce se 40% kam hai — aur SME ke liye specially banaya gaya hai.
                  <br /><br />
                  <div className="text-[#00e5a0] mb-2">── CLOSING ──</div>
                  Toh Thursday 11 baje ya Friday 3 baje — kaunsa better hoga aapke liye?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
