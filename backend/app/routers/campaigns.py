from fastapi import APIRouter, HTTPException
from typing import List, Optional
from database import get_db
from models import Campaign, CampaignStatus
import uuid
from datetime import datetime

router = APIRouter()


@router.get("/")
async def get_campaigns(status: Optional[str] = None):
    db = get_db()
    query = db.table("campaigns").select("*")
    if status:
        query = query.eq("status", status)
    result = query.order("created_at", desc=True).execute()
    return result.data if result.data else []


@router.post("/")
async def create_campaign(campaign: Campaign):
    db = get_db()
    result = db.table("campaigns").insert({
        "id": str(uuid.uuid4()),
        "name": campaign.name,
        "script": campaign.script or "",
        "voice_id": campaign.voice_id or "",
        "language": campaign.language or "hi-IN",
        "status": campaign.status.value if hasattr(campaign.status, 'value') else str(campaign.status),
        "schedule_start": campaign.schedule_start or "10:00",
        "schedule_end": campaign.schedule_end or "18:00",
        "max_calls_per_day": campaign.max_calls_per_day or 200,
        "target_industry": campaign.target_industry or "",
        "target_location": campaign.target_location or "",
        "created_at": datetime.now().isoformat()
    }).execute()
    return result.data[0] if result.data else {}


@router.put("/{campaign_id}")
async def update_campaign(campaign_id: str, campaign: Campaign):
    db = get_db()
    result = db.table("campaigns").update({
        "name": campaign.name,
        "script": campaign.script,
        "voice_id": campaign.voice_id,
        "language": campaign.language,
        "status": campaign.status.value if hasattr(campaign.status, 'value') else str(campaign.status),
        "schedule_start": campaign.schedule_start,
        "schedule_end": campaign.schedule_end,
        "max_calls_per_day": campaign.max_calls_per_day,
        "target_industry": campaign.target_industry,
        "target_location": campaign.target_location,
    }).eq("id", campaign_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return result.data[0]


@router.post("/{campaign_id}/start")
async def start_campaign(campaign_id: str):
    from services.campaign_scheduler import CampaignScheduler
    db = get_db()
    
    # Check campaign exists
    campaign = db.table("campaigns").select("*").eq("id", campaign_id).single().execute()
    if not campaign.data:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    # Update status
    db.table("campaigns").update({"status": "active"}).eq("id", campaign_id).execute()
    
    return {"status": "success", "message": f"Campaign '{campaign.data['name']}' started"}


@router.post("/{campaign_id}/pause")
async def pause_campaign(campaign_id: str):
    db = get_db()
    campaign = db.table("campaigns").select("*").eq("id", campaign_id).single().execute()
    if not campaign.data:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    db.table("campaigns").update({"status": "paused"}).eq("id", campaign_id).execute()
    return {"status": "paused", "message": f"Campaign '{campaign.data['name']}' paused"}


@router.get("/{campaign_id}")
async def get_campaign(campaign_id: str):
    db = get_db()
    result = db.table("campaigns").select("*").eq("id", campaign_id).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return result.data


@router.delete("/{campaign_id}")
async def delete_campaign(campaign_id: str):
    db = get_db()
    db.table("campaigns").delete().eq("id", campaign_id).execute()
    return {"status": "deleted"}
