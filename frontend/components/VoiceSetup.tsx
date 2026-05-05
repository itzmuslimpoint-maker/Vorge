'use client';

export default function VoiceSetup() {
  return (
    <div className="p-4">
      <h3 className="text-[13px] font-bold mb-3">🎙 AI Voice Profiles</h3>
      {[
        { name: 'Aryan', desc: 'Hinglish · Male · Natural code-switching', tags: ['ElevenLabs', 'Vapi.ai', 'breathing'], icon: '👨', selected: true },
        { name: 'Priya', desc: 'Hindi · Female · Warm & professional', tags: ['ElevenLabs', 'Vapi.ai'], icon: '👩', selected: false },
        { name: 'Alex', desc: 'English · Male · Corporate & clear', tags: ['ElevenLabs'], icon: '🧑', selected: false },
        { name: 'Diya', desc: 'Hinglish · Female · Energetic & friendly', tags: ['ElevenLabs', 'breathing'], icon: '👩‍💼', selected: false },
      ].map((v, i) => (
        <div
          key={i}
          className={`flex items-center gap-2.5 p-2.5 mb-2 rounded-lg border cursor-pointer transition-all ${
            v.selected
              ? 'border-[#00d4ff] bg-[rgba(0,212,255,0.04)]'
              : 'border-[rgba(255,255,255,0.06)] bg-[#131a24] hover:border-[rgba(255,255,255,0.12)]'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-[#1a2332] flex items-center justify-center text-[15px] flex-shrink-0">{v.icon}</div>
          <div className="flex-1">
            <div className="text-xs font-semibold">{v.name}</div>
            <div className="text-[10px] text-[#6b7a8d]">{v.desc}</div>
            <div className="flex gap-1 mt-1">
              {v.tags.map((t, j) => (
                <span key={j} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#1a2332] text-[#6b7a8d] border border-[rgba(255,255,255,0.06)]">{t}</span>
              ))}
            </div>
          </div>
          <button className="w-6 h-6 rounded-full bg-[#1a2332] flex items-center justify-center text-[10px] hover:bg-[#00d4ff] hover:text-black transition-colors">▶</button>
        </div>
      ))}
    </div>
  );
}
