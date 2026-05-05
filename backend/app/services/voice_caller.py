import httpx
from app.config import settings
from app.database import get_db
from datetime import datetime

class HumanLikeCaller:
    def __init__(self):
        self.vapi_key = settings.VAPI_API_KEY
        self.vapi_base_url = "https://api.vapi.ai"
    
    def create_conversational_script(self, lead: dict, campaign: dict):
        return f"""
[SYSTEM PROMPT]
You are an experienced sales representative. Your speaking style: Warm, natural, with slight pauses. Never sound robotic.

IMPORTANT RULES:
1. NEVER read script word-for-word — adapt naturally
2. If busy, offer callback
3. If not interested, politely end after one follow-up
4. If voicemail, leave warm message
5. Max duration: 3 minutes unless they engage

[CALL OPENING]
"Hello {lead.get('name', '')} ji, main Raj bol raha hoon VoiceForge se. Aapse ek minute baat karni thi, is this a good time?"

[CAMPAIGN PURPOSE]
{campaign.get('script', '')}

[OBJECTION HANDLING]
- Price: "Completely understand. Our clients typically see 3X ROI within 60 days..."
- Not interested: "Totally understand. Just one thing — we've helped 200+ similar companies save 40%..."
- Send email: "Absolutely, I'll send right after. What area interests you most?"

[CLOSING]
"Perfect! Let me send a calendar invite. Details on WhatsApp as well. Thank you!"

[VOICEMAIL]
"Hi {lead.get('name', '')}, this is Raj from VoiceForge. Calling about {campaign.get('name', '')}. Please call back at your convenience. Have a great day!"
"""
    
    async def initiate_call(self, lead_id: str, campaign_id: str):
        db = get_db()
        lead = db.table("leads").select("*").eq("id", lead_id).single().execute()
        campaign = db.table("campaigns").select("*").eq("id", campaign_id).single().execute()
        
        if not lead.data or not campaign.data:
            return {"success": False, "error": "Lead or campaign not found"}
        
        script = self.create_conversational_script(lead.data, campaign.data)
        
        call_payload = {
            "assistant": {
                "model": "gpt-4o",
                "voice": "elevenlabs_raj",
                "language": campaign.data.get("language", "hi-IN"),
                "firstMessage": f"Hello {lead.data['name']} ji, main Raj bol raha hoon VoiceForge se...",
                "systemPrompt": script,
                "maxDurationSeconds": 180,
                "silenceTimeoutSeconds": 8,
                "endCallPhrases": ["thank you", "have a great day", "bye", "dhanyavaad"],
                "transcriber": {
                    "provider": "deepgram",
                    "language": "hi"
                }
            },
            "phoneNumber": {
                "phoneNumberId": "YOUR_VAPI_PHONE_NUMBER_ID"
            },
            "customer": {
                "number": lead.data['phone'],
                "name": lead.data['name']
            }
        }
        
        headers = {
            "Authorization": f"Bearer {self.vapi_key}",
            "Content-Type": "application/json"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{self.vapi_base_url}/call", json=call_payload, headers=headers)
            call_data = response.json()
        
        db.table("call_logs").insert({
            "lead_id": lead_id,
            "campaign_id": campaign_id,
            "call_sid": call_data.get("id"),
            "status": "initiated",
            "started_at": datetime.now().isoformat()
        }).execute()
        
        db.table("leads").update({"status": "calling"}).eq("id", lead_id).execute()
        
        return {"success": True, "call_id": call_data.get("id"), "lead_name": lead.data['name'], "phone": lead.data['phone']}
