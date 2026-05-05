from openai import AsyncOpenAI
from app.config import settings

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

async def analyze_call_outcome(transcript: str) -> str:
    prompt = f"Analyze this sales call transcript and categorize: interested, callback, not_interested, voicemail, no_answer. Return only the category.\n\nTranscript:\n{transcript}"
    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=10
    )
    return response.choices[0].message.content.strip()

async def generate_call_summary(transcript: str) -> str:
    prompt = f"Summarize this call in 3 bullet points:\n{transcript}"
    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=150
    )
    return response.choices[0].message.content.strip()

async def analyze_sentiment(transcript: str) -> float:
    prompt = f"Rate the customer's sentiment on a scale of 0-10. Return only the number.\n\n{transcript}"
    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=5
    )
    try:
        return float(response.choices[0].message.content.strip())
    except:
        return 5.0

async def generate_script(product: str, persona: str, value_prop: str, tone: str, objections: str) -> str:
    prompt = f"""Generate a complete sales call script for:
Product: {product}
Persona: {persona}
Value Prop: {value_prop}
Tone: {tone}
Common Objections: {objections}

Include: Opening, qualification questions, value proposition, objection handlers, and closing."""
    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500
    )
    return response.choices[0].message.content.strip()
