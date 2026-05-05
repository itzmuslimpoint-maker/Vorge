'use client';

const leads = [
  { name: 'Amit Sharma', company: 'TechSpark Pvt', campaign: 'Mumbai SaaS', status: 'converted', score: 92, sentiment: '😊' },
  { name: 'Priya Nair', company: 'GreenBuild Co.', campaign: 'Pune RE', status: 'calling', score: 74, sentiment: '😐' },
  { name: 'Rahul Mehta', company: 'FinEdge Capital', campaign: 'Delhi Finance', status: 'pending', score: 61, sentiment: '😊' },
  { name: 'Sneha Joshi', company: 'CureIt Health', campaign: 'Mumbai SaaS', status: 'failed', score: 22, sentiment: '😔' },
  { name: 'Vikram Singh', company: 'PropMax Realty', campaign: 'Pune RE', status: 'voicemail', score: 45, sentiment: '😐' },
  { name: 'Kavya Iyer', company: 'SwiftLogic SaaS', campaign: 'Mumbai SaaS', status: 'converted', score: 88, sentiment: '😊' },
  { name: 'Arjun Patel', company: 'BlueSky Finance', campaign: 'Delhi Finance', status: 'converted', score: 95, sentiment: '😊' },
  { name: 'Meena Desai', company: 'Craft & Co.', campaign: 'Mumbai SaaS', status: 'pending', score: 58, sentiment: '😐' },
];

const statusColors: Record<string, string> = {
  converted: 'bg-[rgba(0,229,160,0.12)] text-[#00e5a0]',
  calling: 'bg-[rgba(0,212,255,0.12)] text-[#00d4ff]',
  failed: 'bg-[rgba(255,71,87,0.12)] text-[#ff4757]',
  pending: 'bg-[rgba(255,193,7,0.1)] text-[#ffc107]',
  voicemail: 'bg-[rgba(123,94,167,0.15)] text-[#a87dd4]',
};

export default function CallTable() {
  return (
    <div className="overflow-y-auto max-h-[340px]">
      <table className="w-full">
        <thead>
          <tr className="text-left">
            {['Lead', 'Campaign', 'Status', 'Duration', 'Sentiment', 'Score'].map((h, i) => (
              <th key={i} className="text-[9px] text-[#3d4f63] uppercase tracking-[0.12em] font-mono font-normal px-3 pb-2.5">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map((l, i) => (
            <tr key={i} className="hover:bg-[rgba(255,255,255,0.02)]">
              <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#1a2332] flex items-center justify-center text-[11px] font-bold"
                    style={{ background: `hsl(${i * 40}, 40%, 25%)` }}>
                    {l.name[0]}{l.name.split(' ')[1]?.[0] || ''}
                  </div>
                  <div>
                    <div className="text-xs font-semibold">{l.name}</div>
                    <div className="text-[10px] text-[#6b7a8d]">{l.company}</div>
                  </div>
                </div>
              </td>
              <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)]">
                <span className="text-[10px] bg-[#1a2332] text-[#6b7a8d] px-1.5 py-0.5 rounded font-mono border border-[rgba(255,255,255,0.06)]">
                  {l.campaign}
                </span>
              </td>
              <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)]">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-[0.06em] font-mono ${statusColors[l.status] || ''}`}>
                  {l.status}
                </span>
              </td>
              <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)] font-mono text-[11px] text-[#6b7a8d]">
                {l.status === 'pending' ? '—' : `${Math.floor(Math.random() * 5 + 1)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`}
              </td>
              <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)] text-base">{l.sentiment}</td>
              <td className="py-2.5 px-3 border-t border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-1.5">
                  <div className="h-1 bg-[#1a2332] rounded-sm w-[60px] overflow-hidden">
                    <div
                      className="h-full rounded-sm"
                      style={{
                        width: `${l.score}%`,
                        background: l.score > 75 ? '#00e5a0' : l.score > 45 ? '#ffc107' : '#ff4757'
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#6b7a8d]">{l.score}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
