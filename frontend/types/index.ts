export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  source?: string;
  status: 'new' | 'calling' | 'called' | 'interested' | 'not_interested' | 'dnc' | 'converted';
  score?: number;
  created_at?: string;
}

export interface Campaign {
  id: string;
  name: string;
  script: string;
  voice_id?: string;
  voice_gender?: 'male' | 'female';
  language?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  schedule_start?: string;
  schedule_end?: string;
  max_calls_per_day?: number;
  target_industry?: string;
  target_location?: string;
  created_at?: string;
}

export interface CallLog {
  id: string;
  lead_id: string;
  campaign_id: string;
  call_sid?: string;
  status: string;
  duration_seconds?: number;
  transcript?: string;
  recording_url?: string;
  ai_summary?: string;
  outcome?: string;
  sentiment_score?: number;
  call_cost?: number;
  started_at?: string;
  ended_at?: string;
}
