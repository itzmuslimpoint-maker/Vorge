from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List
from app.services.ai_service import generate_script, test_voice_connection
from app.database import get_db

router = APIRouter()


class ScriptGenerationRequest(BaseModel):
    product: str = Field(..., description="Product or service name")
    persona: str = Field(..., description="Target customer persona")
    value_prop: str = Field(..., description="Unique value proposition")
    tone: str = Field(default="Hinglish — Friendly & Casual", description="Conversation tone")
    objections: str = Field(default="", description="Common objections to handle")
    language: str = Field(default="hi-IN", description="Language code")


class VoiceProfile(BaseModel):
    id: str
    name: str
    gender: str
    language: str
    provider: str
    description: str
    sample_url: Optional[str] = None


class VoiceTestRequest(BaseModel):
    voice_id: str
    phone_number: Optional[str] = None
    message: str = "Hello! This is a test call from VoiceForge AI."


# Predefined voice profiles
VOICE_PROFILES = [
    {
        "id": "aryan_hindi",
        "name": "Aryan",
        "gender": "male",
        "language": "Hinglish",
        "provider": "ElevenLabs",
        "description": "Warm, natural male voice with natural Hindi-English code-switching. Perfect for Indian business calls.",
        "sample_url": None,
        "settings": {
            "stability": 0.5,
            "similarity_boost": 0.75,
            "speaking_rate": 1.0,
        }
    },
    {
        "id": "priya_hindi",
        "name": "Priya",
        "gender": "female",
        "language": "Hindi",
        "provider": "ElevenLabs",
        "description": "Professional yet friendly female voice. Clear Hindi pronunciation, great for formal introductions.",
        "sample_url": None,
        "settings": {
            "stability": 0.6,
            "similarity_boost": 0.7,
            "speaking_rate": 0.95,
        }
    },
    {
        "id": "alex_english",
        "name": "Alex",
        "gender": "male",
        "language": "English",
        "provider": "ElevenLabs",
        "description": "Corporate American English voice. Clear, confident, and professional.",
        "sample_url": None,
        "settings": {
            "stability": 0.55,
            "similarity_boost": 0.8,
            "speaking_rate": 1.05,
        }
    },
    {
        "id": "diya_hinglish",
        "name": "Diya",
        "gender": "female",
        "language": "Hinglish",
        "provider": "ElevenLabs",
        "description": "Energetic and friendly Hinglish voice. Great for startup and casual business conversations.",
        "sample_url": None,
        "settings": {
            "stability": 0.45,
            "similarity_boost": 0.75,
            "speaking_rate": 1.1,
        }
    },
    {
        "id": "raj_hinglish",
        "name": "Raj",
        "gender": "male",
        "language": "Hinglish",
        "provider": "Vapi.ai",
        "description": "Natural Hinglish male voice optimized for sales calls. Handles objections smoothly.",
        "sample_url": None,
        "settings": {
            "stability": 0.5,
            "similarity_boost": 0.7,
            "speaking_rate": 1.0,
        }
    },
    {
        "id": "neha_hindi",
        "name": "Neha",
        "gender": "female",
        "language": "Hindi",
        "provider": "Vapi.ai",
        "description": "Soft yet persuasive Hindi female voice. Excellent for customer follow-up calls.",
        "sample_url": None,
        "settings": {
            "stability": 0.55,
            "similarity_boost": 0.75,
            "speaking_rate": 0.9,
        }
    },
]

# Human-like voice settings presets
HUMAN_LIKE_PRESETS = {
    "natural": {
        "response_delay_ms": 200,
        "breathing_sounds": True,
        "interruption_handling": "real_time",
        "personality_injection": True,
        "filler_words": True,
        "emotional_variation": True,
    },
    "formal": {
        "response_delay_ms": 100,
        "breathing_sounds": False,
        "interruption_handling": "fixed_pause",
        "personality_injection": False,
        "filler_words": False,
        "emotional_variation": False,
    },
    "friendly": {
        "response_delay_ms": 250,
        "breathing_sounds": True,
        "interruption_handling": "real_time",
        "personality_injection": True,
        "filler_words": True,
        "emotional_variation": True,
    },
}


@router.get("/voices")
async def get_voices(
    language: Optional[str] = None,
    gender: Optional[str] = None,
):
    """Get available AI voice profiles with optional filtering"""
    voices = VOICE_PROFILES
    
    if language:
        voices = [v for v in voices if language.lower() in v["language"].lower()]
    if gender:
        voices = [v for v in voices if v["gender"] == gender.lower()]
    
    return {
        "status": "success",
        "count": len(voices),
        "voices": voices,
    }


@router.get("/voices/{voice_id}")
async def get_voice_by_id(voice_id: str):
    """Get a specific voice profile by ID"""
    for voice in VOICE_PROFILES:
        if voice["id"] == voice_id:
            return {"status": "success", "voice": voice}
    
    raise HTTPException(status_code=404, detail=f"Voice '{voice_id}' not found")


@router.post("/generate-script")
async def generate_call_script(request: ScriptGenerationRequest):
    """Generate an AI-powered sales call script using GPT-4o"""
    try:
        script = await generate_script(
            product=request.product,
            persona=request.persona,
            value_prop=request.value_prop,
            tone=request.tone,
            objections=request.objections,
        )
        
        return {
            "status": "success",
            "script": script,
            "metadata": {
                "product": request.product,
                "tone": request.tone,
                "language": request.language,
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Script generation failed: {str(e)}")


@router.post("/test-call")
async def test_voice_call(request: VoiceTestRequest):
    """Make a test call with a specific voice profile"""
    # Find the voice profile
    voice = None
    for v in VOICE_PROFILES:
        if v["id"] == request.voice_id:
            voice = v
            break
    
    if not voice:
        raise HTTPException(status_code=404, detail=f"Voice '{request.voice_id}' not found")
    
    # Check if Vapi.ai is configured
    from app.config import settings
    if not settings.VAPI_API_KEY:
        raise HTTPException(status_code=400, detail="Vapi.ai API key not configured")
    
    try:
        import httpx
        
        call_payload = {
            "assistant": {
                "model": "gpt-4o",
                "voice": request.voice_id,
                "firstMessage": request.message,
                "maxDurationSeconds": 60,
            },
            "phoneNumber": {
                "phoneNumberId": "YOUR_VAPI_PHONE_ID"
            },
            "customer": {
                "number": request.phone_number or "+910000000000",
                "name": "Test User"
            }
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.vapi.ai/call",
                json=call_payload,
                headers={
                    "Authorization": f"Bearer {settings.VAPI_API_KEY}",
                    "Content-Type": "application/json"
                }
            )
            
            if response.status_code == 201:
                return {
                    "status": "success",
                    "message": "Test call initiated",
                    "call_id": response.json().get("id"),
                    "voice_used": voice["name"],
                }
            else:
                return {
                    "status": "warning",
                    "message": "Test call could not be completed",
                    "detail": response.text,
                }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Test call failed: {str(e)}")


@router.get("/settings/presets")
async def get_voice_presets():
    """Get predefined human-like voice settings"""
    return {
        "status": "success",
        "presets": HUMAN_LIKE_PRESETS,
    }


@router.get("/settings/human-like")
async def get_human_like_settings():
    """Get configurable human-like voice parameters"""
    return {
        "status": "success",
        "settings": {
            "response_delay": {
                "min": 50,
                "max": 500,
                "default": 200,
                "unit": "milliseconds",
                "description": "Delay before AI responds — simulates human thinking time"
            },
            "breathing_sounds": {
                "options": ["disabled", "subtle", "natural"],
                "default": "subtle",
                "description": "Add subtle breathing sounds between sentences"
            },
            "interruption_handling": {
                "options": ["real_time", "fixed_pause_300ms", "fixed_pause_500ms", "disabled"],
                "default": "real_time",
                "description": "How the AI handles being interrupted by the human"
            },
            "personality_injection": {
                "options": ["hinglish_local", "formal_only", "custom_prompt"],
                "default": "hinglish_local",
                "description": "Add local references and personality to conversations"
            },
            "filler_words": {
                "options": ["enabled", "disabled"],
                "default": "enabled",
                "description": "Use natural fillers like 'umm', 'actually', 'you know'"
            },
            "emotional_variation": {
                "options": ["enabled", "disabled"],
                "default": "enabled",
                "description": "Vary emotional tone based on conversation context"
            },
        }
    }


@router.post("/clone")
async def clone_voice(
    name: str,
    audio_sample_url: str,
    description: Optional[str] = None,
):
    """
    Clone a new voice from an audio sample.
    Requires ElevenLabs API key configured.
    """
    from app.config import settings
    
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=400, detail="ElevenLabs API key not configured")
    
    try:
        import httpx
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.elevenlabs.io/v1/voices/add",
                json={
                    "name": name,
                    "files": [audio_sample_url],
                    "description": description or f"Cloned voice: {name}",
                },
                headers={
                    "xi-api-key": settings.OPENAI_API_KEY,
                    "Content-Type": "application/json"
                }
            )
            
            if response.status_code == 200:
                voice_data = response.json()
                return {
                    "status": "success",
                    "message": "Voice cloned successfully",
                    "voice_id": voice_data.get("voice_id"),
                    "name": name,
                }
            else:
                raise HTTPException(status_code=500, detail=response.text)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Voice cloning failed: {str(e)}")
