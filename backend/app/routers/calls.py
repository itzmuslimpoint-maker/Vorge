from fastapi import APIRouter, Request, HTTPException
from typing import List, Optional
from database import get_db
from models import CallLog, CallOutcome
from services.voice_caller import HumanLikeCaller
from services.ai_service import analyze_call_outcome, generate_call_summary, analyze_sentiment
from datetime import datetime
import uuid

router = APIRouter()


@router.get("/")
async def get_calls(
    limit: int = 50,
    offset: int = 0,
    campaign_id: Optional[str] = None,
    outcome: Optional[str] = None
):
    db = get_db()
    query = db.table("call_logs").select("*")
    
    if campaign_id:
        query = query.eq("campaign_id", campaign_id)
    if outcome:
        query = query.eq("outcome", outcome)
    
    result = query.order("started_at", desc=True).range(offset, offset + limit).execute()
    return result.data if result.data else []


@router.post("/initiate")
async def initiate_call(lead_id: str, campaign_id: str):
    caller = HumanLikeCaller()
    try:
        result = caller.initiate_call(lead_id, campaign_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/webhook/vapi")
async def vapi_webhook(request: Request):
    try:
        payload = await request.json()
    except:
        return {"status": "error", "message": "Invalid JSON"}
    
    db = get_db()
    
    call_id = payload.get("call", {}).get("id")
    status = payload.get("call", {}).get("status")
    
    if status == "ended":
        transcript = payload.get("transcript", "")
        recording_url = payload.get("recordingUrl", "")
        duration_ms = payload.get("call", {}).get("duration", 0)
        cost = payload.get("cost", 0)
        
        # Analyze call
        outcome = analyze_call_outcome(transcript)
        summary = generate_call_summary(transcript)
        sentiment = analyze_sentiment(transcript)
        
        # Update call log
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
        
        # Update lead status
        call_record = db.table("call_logs").select("lead_id").eq("call_sid", call_id).single().execute()
        if call_record.data:
            lead_status_map = {
                "interested": "interested",
                "callback": "callback_needed",
                "voicemail": "callback_needed",
                "not_interested": "not_interested",
                "no_answer": "no_answer"
            }
            new_status = lead_status_map.get(outcome, "contacted")
            db.table("leads").update({"status": new_status}).eq("id", call_record.data["lead_id"]).execute()
    
    return {"status": "received"}


@router.get("/{call_id}")
async def get_call(call_id: str):
    db = get_db()
    result = db.table("call_logs").select("*").eq("id", call_id).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Call not found")
    return result.data
