from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import leads, campaigns, calls, analytics, voice
from app.services.campaign_scheduler import scheduler

app = FastAPI(
    title="VoiceForge AI API",
    version="1.0.0",
    description="AI-Powered Outbound Calling Platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(leads.router, prefix="/api/leads", tags=["Leads"])
app.include_router(campaigns.router, prefix="/api/campaigns", tags=["Campaigns"])
app.include_router(calls.router, prefix="/api/calls", tags=["Calls"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])
app.include_router(voice.router, prefix="/api/voice", tags=["Voice AI"])

@app.on_event("startup")
async def startup_event():
    scheduler.start()

@app.get("/")
async def root():
    return {"message": "VoiceForge AI API is running", "version": "1.0.0"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}
