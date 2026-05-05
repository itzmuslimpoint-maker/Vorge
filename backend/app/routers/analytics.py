from fastapi import APIRouter, Query
from typing import Optional
from datetime import datetime, timedelta
from app.database import get_db

router = APIRouter()


@router.get("/")
async def get_analytics(
    period: Optional[str] = Query("month", description="Period: today, week, month, all")
):
    db = get_db()
    
    # Calculate date filter
    now = datetime.utcnow()
    if period == "today":
        start_date = now.replace(hour=0, minute=0, second=0, microsecond=0)
    elif period == "week":
        start_date = now - timedelta(days=7)
    elif period == "month":
        start_date = now - timedelta(days=30)
    else:
        start_date = None
    
    # Base queries
    leads_query = db.table("leads").select("id", count="exact")
    calls_query = db.table("call_logs").select("id, outcome, duration_seconds, sentiment_score, call_cost")
    campaigns_query = db.table("campaigns").select("id, status", count="exact")
    
    # Apply date filter if needed
    if start_date:
        start_iso = start_date.isoformat()
        calls_query = calls_query.gte("started_at", start_iso)
    
    # Execute queries
    total_leads = leads_query.execute()
    calls_result = calls_query.execute()
    campaigns_result = campaigns_query.execute()
    
    # Calculate metrics
    total_calls = len(calls_result.data) if calls_result.data else 0
    active_campaigns = sum(1 for c in (campaigns_result.data or []) if c.get("status") == "active")
    
    # Outcome distribution
    converted = sum(1 for c in (calls_result.data or []) if c.get("outcome") == "interested")
    interested = sum(1 for c in (calls_result.data or []) if c.get("outcome") == "callback")
    not_interested = sum(1 for c in (calls_result.data or []) if c.get("outcome") == "not_interested")
    voicemail = sum(1 for c in (calls_result.data or []) if c.get("outcome") == "voicemail")
    no_answer = sum(1 for c in (calls_result.data or []) if c.get("outcome") == "no_answer")
    
    # Average metrics
    durations = [c.get("duration_seconds", 0) or 0 for c in (calls_result.data or [])]
    avg_duration = sum(durations) / len(durations) if durations else 0
    
    sentiments = [c.get("sentiment_score", 0) or 0 for c in (calls_result.data or [])]
    avg_sentiment = sum(sentiments) / len(sentiments) if sentiments else 0
    
    total_cost = sum(c.get("call_cost", 0) or 0 for c in (calls_result.data or []))
    cost_per_call = total_cost / total_calls if total_calls > 0 else 0
    cost_per_lead = total_cost / converted if converted > 0 else 0
    
    conversion_rate = (converted / total_calls * 100) if total_calls > 0 else 0
    
    # Campaign performance
    all_campaigns = db.table("campaigns").select("id, name, status").execute()
    campaign_performance = []
    
    for campaign in (all_campaigns.data or []):
        camp_calls = db.table("call_logs").select("id, outcome, duration_seconds, sentiment_score") \
            .eq("campaign_id", campaign["id"]).execute()
        
        camp_total = len(camp_calls.data) if camp_calls.data else 0
        camp_converted = sum(1 for c in (camp_calls.data or []) if c.get("outcome") == "interested")
        camp_durations = [c.get("duration_seconds", 0) or 0 for c in (camp_calls.data or [])]
        camp_avg_duration = sum(camp_durations) / len(camp_durations) if camp_durations else 0
        camp_sentiments = [c.get("sentiment_score", 0) or 0 for c in (camp_calls.data or [])]
        camp_avg_sentiment = sum(camp_sentiments) / len(camp_sentiments) if camp_sentiments else 0
        
        campaign_performance.append({
            "id": campaign["id"],
            "name": campaign["name"],
            "status": campaign["status"],
            "total_calls": camp_total,
            "converted": camp_converted,
            "conversion_rate": round((camp_converted / camp_total * 100) if camp_total > 0 else 0, 1),
            "avg_duration_seconds": round(camp_avg_duration, 0),
            "avg_sentiment": round(camp_avg_sentiment, 1),
        })
    
    # Daily call volume (last 7 days)
    daily_volume = []
    for i in range(6, -1, -1):
        date = now - timedelta(days=i)
        day_start = date.replace(hour=0, minute=0, second=0, microsecond=0)
        day_end = day_start + timedelta(days=1)
        
        day_calls = db.table("call_logs").select("id", count="exact") \
            .gte("started_at", day_start.isoformat()) \
            .lt("started_at", day_end.isoformat()) \
            .execute()
        
        day_converted = db.table("call_logs").select("id", count="exact") \
            .eq("outcome", "interested") \
            .gte("started_at", day_start.isoformat()) \
            .lt("started_at", day_end.isoformat()) \
            .execute()
        
        daily_volume.append({
            "date": date.strftime("%Y-%m-%d"),
            "day_name": date.strftime("%a"),
            "calls": day_calls.count if day_calls.count else 0,
            "converted": day_converted.count if day_converted.count else 0,
        })
    
    return {
        "status": "success",
        "period": period,
        "summary": {
            "total_leads": total_leads.count if total_leads.count else 0,
            "total_calls": total_calls,
            "active_campaigns": active_campaigns,
            "conversion_rate": round(conversion_rate, 1),
            "avg_duration_seconds": round(avg_duration, 0),
            "avg_sentiment": round(avg_sentiment, 1),
            "total_cost": round(total_cost, 2),
            "cost_per_call": round(cost_per_call, 2),
            "cost_per_converted_lead": round(cost_per_lead, 2),
        },
        "outcomes": {
            "converted": converted,
            "interested": interested,
            "not_interested": not_interested,
            "voicemail": voicemail,
            "no_answer": no_answer,
        },
        "daily_volume": daily_volume,
        "campaign_performance": campaign_performance,
    }


@router.get("/campaign/{campaign_id}")
async def get_campaign_analytics(campaign_id: str):
    db = get_db()
    
    campaign = db.table("campaigns").select("*").eq("id", campaign_id).single().execute()
    if not campaign.data:
        return {"status": "error", "message": "Campaign not found"}
    
    calls = db.table("call_logs").select("*").eq("campaign_id", campaign_id).execute()
    
    total = len(calls.data) if calls.data else 0
    converted = sum(1 for c in (calls.data or []) if c.get("outcome") == "interested")
    
    return {
        "status": "success",
        "campaign": campaign.data,
        "metrics": {
            "total_calls": total,
            "converted": converted,
            "conversion_rate": round((converted / total * 100) if total > 0 else 0, 1),
        }
  }
