import asyncio
from app.database import get_db
from app.services.voice_caller import HumanLikeCaller
from datetime import datetime, timedelta

class CampaignScheduler:
    def __init__(self):
        self.caller = HumanLikeCaller()
    
    async def launch_campaign(self, campaign_id: str):
        db = get_db()
        campaign = db.table("campaigns").select("*").eq("id", campaign_id).single().execute()
        if not campaign.data:
            return {"error": "Campaign not found"}
        
        db.table("campaigns").update({"status": "active"}).eq("id", campaign_id).execute()
        return {"status": "campaign_launched", "campaign_name": campaign.data["name"]}
    
    async def process_queue(self):
        db = get_db()
        active_campaigns = db.table("campaigns").select("*").eq("status", "active").execute()
        
        for campaign in active_campaigns.data:
            current_hour = datetime.now().hour
            if 9 <= current_hour <= 19:
                leads = db.table("leads").select("*").eq("status", "new").limit(5).execute()
                for lead in leads.data:
                    await self.caller.initiate_call(lead["id"], campaign["id"])
                    await asyncio.sleep(5)  # Stagger calls
    
    def start(self):
        import threading
        def run_loop():
            import time
            while True:
                asyncio.run(self.process_queue())
                time.sleep(60)
        thread = threading.Thread(target=run_loop, daemon=True)
        thread.start()
