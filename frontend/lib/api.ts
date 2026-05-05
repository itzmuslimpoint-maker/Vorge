import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Leads
export const getLeads = (params?: any) => api.get('/api/leads', { params });
export const generateLeads = (params: any) => api.post('/api/leads/generate', null, { params });
export const createLead = (data: any) => api.post('/api/leads', data);
export const updateLead = (id: string, data: any) => api.put(`/api/leads/${id}`, data);

// Campaigns
export const getCampaigns = (params?: any) => api.get('/api/campaigns', { params });
export const createCampaign = (data: any) => api.post('/api/campaigns', data);
export const startCampaign = (id: string) => api.post(`/api/campaigns/${id}/start`);
export const pauseCampaign = (id: string) => api.post(`/api/campaigns/${id}/pause`);

// Calls
export const getCalls = (params?: any) => api.get('/api/calls', { params });
export const initiateCall = (leadId: string, campaignId: string) =>
  api.post('/api/calls/initiate', null, {
    params: { lead_id: leadId, campaign_id: campaignId },
  });

// Analytics
export const getAnalytics = () => api.get('/api/analytics');

// Voice
export const getVoices = () => api.get('/api/voice/voices');
export const generateScript = (data: any) => api.post('/api/voice/generate-script', data);
