from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.database import get_db
from app.models import Lead, LeadStatus
from app.services.lead_generator import LeadGenerator
import uuid
from datetime import datetime

router = APIRouter()

@router.get("/", response_model=List[Lead])
async def get_leads(
    status: Optional[LeadStatus] = None,
    campaign: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = 50,
    offset: int = 0
):
    db = get_db()
    query = db.table("leads").select("*")
    
    if status:
        query = query.eq("status", status)
    if campaign:
        query = query.eq("campaign_id", campaign)
    if search:
        query = query.or_(f"name.ilike.%{search}%,company.ilike.%{search}%,phone.ilike.%{search}%")
    
    result = query.order("created_at", desc=True).range(offset, offset + limit).execute()
    return result.data

@router.post("/generate")
async def generate_leads(
    business_type: str = Query(...),
    location: str = Query(...),
    industry: Optional[str] = None,
    job_title: Optional[str] = None,
    limit: int = 50
):
    generator = LeadGenerator()
    
    try:
        map_leads = generator.search_google_maps(business_type, location, limit)
        apollo_leads = []
        if industry and job_title:
            apollo_leads = generator.search_apollo(industry, job_title, location, limit)
        
        all_leads = generator.deduplicate_and_clean(map_leads + apollo_leads)
        
        db = get_db()
        inserted_leads = []
        for lead in all_leads:
            result = db.table("leads").upsert({
                "id": str(uuid.uuid4()),
                "name": lead.get("name"),
                "phone": lead.get("phone"),
                "email": lead.get("email", ""),
                "company": lead.get("company", ""),
                "source": lead.get("source", "generated"),
                "status": "new",
                "created_at": datetime.now().isoformat()
            }, on_conflict="phone").execute()
            if result.data:
                inserted_leads.append(result.data[0])
        
        return {"status": "success", "leads_generated": len(inserted_leads), "leads": inserted_leads}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def create_lead(lead: Lead):
    db = get_db()
    result = db.table("leads").insert({
        "id": str(uuid.uuid4()),
        **lead.dict(exclude={"id", "created_at"}),
        "created_at": datetime.now().isoformat()
    }).execute()
    return result.data[0] if result.data else {}

@router.put("/{lead_id}")
async def update_lead(lead_id: str, lead: Lead):
    db = get_db()
    result = db.table("leads").update(lead.dict(exclude={"id", "created_at"})).eq("id", lead_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Lead not found")
    return result.data[0]

@router.delete("/{lead_id}")
async def delete_lead(lead_id: str):
    db = get_db()
    result = db.table("leads").delete().eq("id", lead_id).execute()
    return {"status": "deleted"}
