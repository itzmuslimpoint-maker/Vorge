from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List
from services.ai_service import generate_script

router = APIRouter()


class ScriptRequest(BaseModel):
    product: str = Field(...)
    persona: str = Field(...)
    value_prop: str = Field(...)
    tone: str = Field(default="Hinglish — Friendly & Casual")
    objections: str = Field(default="")
    language: str = Field(default="hi-IN")


VOICES = [
    {"id": "aryan", "name": "Aryan", "gender": "male", "language": "Hinglish", "provider": "ElevenLabs"},
    {"id": "priya", "name": "Priya", "gender": "female", "language": "Hindi", "provider": "ElevenLabs"},
    {"id": "alex", "name": "Alex", "gender": "male", "language": "English", "provider": "ElevenLabs"},
    {"id": "diya", "name": "Diya", "gender": "female", "language": "Hinglish", "provider": "ElevenLabs"},
    {"id": "raj", "name": "Raj", "gender": "male", "language": "Hinglish", "provider": "Vapi.ai"},
    {"id": "neha", "name": "Neha", "gender": "female", "language": "Hindi", "provider": "Vapi.ai"},
]


@router.get("/voices")
async def get_voices(language: Optional[str] = None, gender: Optional[str] = None):
    voices = VOICES
    if language:
        voices = [v for v in voices if language.lower() in v["language"].lower()]
    if gender:
        voices = [v for v in voices if v["gender"] == gender.lower()]
    return {"status": "success", "count": len(voices), "voices": voices}


@router.get("/voices/{voice_id}")
async def get_voice(voice_id: str):
    for v in VOICES:
        if v["id"] == voice_id:
            return {"status": "success", "voice": v}
    raise HTTPException(status_code=404, detail="Voice not found")


@router.post("/generate-script")
async def generate_call_script(request: ScriptRequest):
    try:
        script = await generate_script(
            request.product,
            request.persona,
            request.value_prop,
            request.tone,
            request.objections
        )
        return {"status": "success", "script": script}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/settings/presets")
async def get_presets():
    return {
        "status": "success",
        "presets": {
            "natural": {"response_delay_ms": 200, "breathing": True, "fillers": True},
            "formal": {"response_delay_ms": 100, "breathing": False, "fillers": False},
            "friendly": {"response_delay_ms": 250, "breathing": True, "fillers": True},
        }
    }
