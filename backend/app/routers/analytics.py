from fastapi import APIRouter, Query
from typing import Optional
from datetime import datetime, timedelta
from database import get_db

router = APIRouter()


@router.get("/")
async def get_analytics(
    period: Optional[str] = Query("month", description="Period: today, week, month, all")
):
    db = get_db()
    
    now = datetime.utcnow()
    if period == "today":
        start_date = now.replace(hour=0, minute=0, second=0, microsecond=0)
    elif period == "week":
        start_date = now - timedelta(days=7)
    elif period == "month":
        start_date = now - timedelta(days=30)
    else:
        start_date = None
    
    # Get all calls
    calls_query = db.table("call_logs").select("id, outcome, duration_seconds, sentiment_score, call_cost")
    if start_date:
        calls_query = calls_query.gte("started_at", start_date.isoformat())
    calls_result = calls_query.execute()
    
    # Get leads count
    leads_count = db.table("leads").select("id", count="exact").execute()
    
    # Get active campaigns
    campaigns_result = db.table("campaigns").select("id, status", count="exact").eq("status", "active").execute()
    
    total_calls = len(calls_result.data) if calls_result.data else 0
    
    # Outcomes
    converted = sum(1 for c in (calls_result.data or []) if c.get("outcome") == "interested")
    interested = sum(1 for c in (calls_result.data or []) if c.get("outcome") == "callback")
    not_interested = sum(1 for c in (calls_result.data or []) if c.get("outcome") == "not_interested")
    voicemail = sum(1 for c in (calls_result.data or []) if c.get("outcome") == "voicemail")
    no_answer = sum(1 for c in (calls_result.data or []) if c.get("outcome") == "no_answer")
    
    # Averages
    durations = [c.get("duration_seconds", 0) or 0 for c in (calls_result.data or [])]
    avg_duration = sum(durations) / len(durations) if durations else 0
    
    sentiments = [c.get("sentiment_score", 0) or 0 for c in (calls_result.data or [])]
    avg_sentiment = sum(sentiments) / len(sentiments) if sentiments else 0
    
    total_cost = sum(c.get("call_cost", 0) or 0 for c in (calls_result.data or []))
    
    conversion_rate = (converted / total_calls * 100) if total_calls > 0 else 0
    
    # Daily volume (last 7 days)
    daily_volume = []
    for i in range(6, -1, -1):
        date = now - timedelta(days=i)
        day_start = date.replace(hour=0, minute=0, second=0, microsecond=0)
        day_end = day_start + timedelta(days=1)
        
        day_calls = db.table("call_logs").select("id", count="exact") \
            .gte("started_at", day_start.isoformat()) \
            .lt("started_at", day_end.isoformat()) \
            .execute()
        
        daily_volume.append({
            "date": date.strftime("%Y-%m-%d"),
            "day": date.strftime("%a"),
            "calls": day_calls.count if day_calls.count else 0,
        })
    
    return {
        "status": "success",
        "period": period,
        "total_leads": leads_count.count if leads_count.count else 0,
        "total_calls": total_calls,
        "active_campaigns": campaigns_result.count if campaigns_result.count else 0,
        "conversion_rate": round(conversion_rate, 1),
        "avg_duration_seconds": round(avg_duration, 0),
        "avg_sentiment": round(avg_sentiment, 1),
        "total_cost": round(total_cost, 2),
        "outcomes": {
            "converted": converted,
            "interested": interested,
            "not_interested": not_interested,
            "voicemail": voicemail,
            "no_answer": no_answer,
        },
        "daily_volume": daily_volume,
    }
