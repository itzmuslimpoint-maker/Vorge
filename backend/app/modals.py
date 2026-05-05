from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class LeadStatus(str, Enum):
    NEW = "new"
    CALLING = "calling"
    CALLED = "called"
    INTERESTED = "interested"
    NOT_INTERESTED = "not_interested"
    DNC = "dnc"
    CONVERTED = "converted"

class CallOutcome(str, Enum):
    INTERESTED = "interested"
    CALLBACK = "callback"
    NOT_INTERESTED = "not_interested"
    VOICEMAIL = "voicemail"
    NO_ANSWER = "no_answer"

class CampaignStatus(str, Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"

class VoiceGender(str, Enum):
    MALE = "male"
    FEMALE = "female"

class Lead(BaseModel):
    id: Optional[str] = None
    name: str
    phone: str
    email: Optional[str] = None
    company: Optional[str] = None
    source: Optional[str] = None
    status: LeadStatus = LeadStatus.NEW
    score: Optional[int] = 0
    created_at: Optional[datetime] = None

class Campaign(BaseModel):
    id: Optional[str] = None
    name: str
    script: str
    voice_id: Optional[str] = None
    voice_gender: Optional[VoiceGender] = None
    language: str = "hi-IN"
    status: CampaignStatus = CampaignStatus.DRAFT
    schedule_start: Optional[str] = "10:00"
    schedule_end: Optional[str] = "18:00"
    max_calls_per_day: int = 200
    target_industry: Optional[str] = None
    target_location: Optional[str] = None
    created_at: Optional[datetime] = None

class CallLog(BaseModel):
    id: Optional[str] = None
    lead_id: str
    campaign_id: str
    call_sid: Optional[str] = None
    status: str = "initiated"
    duration_seconds: Optional[int] = 0
    transcript: Optional[str] = None
    recording_url: Optional[str] = None
    ai_summary: Optional[str] = None
    outcome: Optional[CallOutcome] = None
    sentiment_score: Optional[float] = 0.0
    call_cost: Optional[float] = 0.0
    started_at: Optional[datetime] = None
    ended_at: Optional[datetime] = None
