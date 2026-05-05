from fastapi import APIRouter, HTTPException
from typing import List
from app.database import get_db
from app.models import Campaign, CampaignStatus
import uuid
from datetime import datetime

router = APIRouter()

@router.get("/", response_model=List[Campaign])
async def get_campaigns(status: CampaignStatus = None):
    db = get_db()
    query = db.table("campaigns").select("*")
    if status:
        query = query.eq("status", status)
    result = query.order("created_at", desc=True).execute()
    return result.data

@router.post("/")
async def create_campaign(campaign: Campaign):
    db = get_db()
    result = db.table("campaigns").insert({
        "id": str(uuid.uuid4()),
        **campaign.dict(exclude={"id", "created_at"}),
        "created_at": datetime.now().isoformat()
    }).execute()
    return result.data[0] if result.data else {}

@router.put("/{campaign_id}")
async def update_campaign(campaign_id: str, campaign: Campaign):
    db = get_db()
    result = db.table("campaigns").update(campaign.dict(exclude={"id", "created_at"})).eq("id", campaign_id).execute()
    return result.data[0] if result.data else {}

@router.post("/{campaign_id}/start")
async def start_campaign(campaign_id: str):
    from app.services.campaign_scheduler import CampaignScheduler
    scheduler = CampaignScheduler()
    result = await scheduler.launch_campaign(campaign_id)
    return result

@router.post("/{campaign_id}/pause")
async def pause_campaign(campaign_id: str):
    db = get_db()
    result = db.table("campaigns").update({"status": "paused"}).eq("id", campaign_id).execute()
    return {"status": "paused"}
