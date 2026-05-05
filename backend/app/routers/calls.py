from fastapi import APIRouter, Request
from typing import List
from app.database import get_db
from app.models import CallLog
from app.services.voice_caller import HumanLikeCaller
from datetime import datetime

router = APIRouter()

@router.get("/", response_model=List[CallLog])
async def get_calls(limit: int = 50, offset: int = 0):
    db = get_db()
    result = db.table("call_logs").select("*").order("started_at", desc=True).range(offset, offset + limit).execute()
    return result.data

@router.post("/initiate")
async def initiate_call(lead_id: str, campaign_id: str):
    caller = HumanLikeCaller()
    result = await caller.initiate_call(lead_id, campaign_id)
    return result

@router.post("/webhook/vapi")
async def vapi_webhook(request: Request):
    payload = await request.json()
    from app.services.ai_service import analyze_call_outcome, generate_call_summary
    db = get_db()
    
    call_id = payload.get("call", {}).get("id")
    status = payload.get("call", {}).get("status")
    
    if status == "ended":
        transcript = payload.get("transcript", "")
        recording_url = payload.get("recordingUrl", "")
        duration_ms = payload.get("call", {}).get("duration", 0)
        cost = payload.get("cost", 0)
        
        outcome = await analyze_call_outcome(transcript)
        summary = await generate_call_summary(transcript)
        sentiment = await analyze_sentiment(transcript)
        
        db.table("call_logs").update({
            "status": "completed",
            "duration_seconds": duration_ms / 1000 if duration_ms else 0,
            "transcript": transcript,
            "recording_url": recording_url,
            "call_cost": cost,
            "outcome": outcome,
            "ai_summary": summary,
            "sentiment_score": sentiment,
            "ended_at": datetime.now().isoformat()
        }).eq("call_sid", call_id).execute()
        
        lead_status_map = {
            "interested": "interested",
            "callback": "callback_needed",
            "voicemail": "callback_needed",
            "not_interested": "not_interested",
            "no_answer": "no_answer"
        }
        
        call_record = db.table("call_logs").select("lead_id").eq("call_sid", call_id).single().execute()
        if call_record.data:
            db.table("leads").update({
                "status": lead_status_map.get(outcome, "contacted")
            }).eq("id", call_record.data["lead_id"]).execute()
    
    return {"status": "received"}
