import httpx
from app.config import settings

class LeadGenerator:
    def __init__(self):
        self.serpapi_key = settings.SERPAPI_KEY
        self.apollo_key = settings.APOLLO_API_KEY
    
    async def search_google_maps(self, business_type: str, location: str, limit: int = 50):
        params = {
            "engine": "google_maps",
            "q": f"{business_type} in {location}",
            "api_key": self.serpapi_key,
            "type": "search",
            "limit": limit
        }
        async with httpx.AsyncClient() as client:
            response = await client.get("https://serpapi.com/search", params=params)
            results = response.json().get("local_results", [])
        return [{
            "name": biz.get("title"),
            "phone": biz.get("phone"),
            "address": biz.get("address"),
            "website": biz.get("website"),
            "source": "google_maps"
        } for biz in results if biz.get("phone")]
    
    async def search_apollo(self, industry: str, job_title: str, location: str, limit: int = 50):
        headers = {"Content-Type": "application/json"}
        payload = {
            "api_key": self.apollo_key,
            "q_keywords": job_title,
            "organization_industry": industry,
            "organization_locations": [location],
            "per_page": limit
        }
        async with httpx.AsyncClient() as client:
            response = await client.post("https://api.apollo.io/v1/mixed_people/search", json=payload, headers=headers)
            people = response.json().get("people", [])
        return [{
            "name": p.get("name"),
            "phone": (p.get("phone_numbers") or [{}])[0].get("raw_number"),
            "email": p.get("email"),
            "company": p.get("organization_name"),
            "title": p.get("title"),
            "source": "apollo"
        } for p in people]
    
    def deduplicate_and_clean(self, leads_list):
        seen_phones = set()
        cleaned = []
        for lead in leads_list:
            phone = lead.get("phone")
            if phone and phone not in seen_phones:
                seen_phones.add(phone)
                cleaned.append(lead)
        return cleaned
