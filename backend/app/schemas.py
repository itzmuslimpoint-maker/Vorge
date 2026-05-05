from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


class LeadCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    company: Optional[str] = None
    source: Optional[str] = None
    status: str = "new"
    score: int = 0


class LeadResponse(BaseModel):
    id: str
    name: str
    phone: str
    email: Optional[str] = None
    company: Optional[str] = None
    source: Optional[str] = None
    status: str
    score: int
    created_at: Optional[datetime] = None


class CampaignCreate(BaseModel):
    name: str
    script: str = ""
    voice_id: Optional[str] = None
    language: str = "hi-IN"
    status: str = "draft"
    schedule_start: Optional[str] = "10:00"
    schedule_end: Optional[str] = "18:00"
    max_calls_per_day: int = 200
    target_industry: Optional[str] = None
    target_location: Optional[str] = None


class CampaignResponse(BaseModel):
    id: str
    name: str
    script: str
    voice_id: Optional[str] = None
    language: str
    status: str
    schedule_start: Optional[str] = None
    schedule_end: Optional[str] = None
    max_calls_per_day: int
    target_industry: Optional[str] = None
    target_location: Optional[str] = None
    created_at: Optional[datetime] = None


class CallLogCreate(BaseModel):
    lead_id: str
    campaign_id: str
    call_sid: Optional[str] = None
    status: str = "initiated"


class CallLogResponse(BaseModel):
    id: str
    lead_id: str
    campaign_id: str
    call_sid: Optional[str] = None
    status: str
    duration_seconds: Optional[int] = None
    transcript: Optional[str] = None
    recording_url: Optional[str] = None
    ai_summary: Optional[str] = None
    outcome: Optional[str] = None
    sentiment_score: Optional[float] = None
    call_cost: Optional[float] = None
    started_at: Optional[datetime] = None
    ended_at: Optional[datetime] = None


class LeadGenerateRequest(BaseModel):
    business_type: str
    location: str
    industry: Optional[str] = None
    job_title: Optional[str] = None
    limit: int = 50


class InitiateCallRequest(BaseModel):
    lead_id: str
    campaign_id: str


class ApiResponse(BaseModel):
    status: str = "success"
    message: str = ""
    data: Optional[Dict[str, Any]] = None
    count: Optional[int] = None


class ErrorResponse(BaseModel):
    status: str = "error"
    message: str
    detail: Optional[str] = None
