import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    def __init__(self):
        self.SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
        self.SUPABASE_SERVICE_KEY: str = os.getenv("SUPABASE_SERVICE_KEY", "")
        self.OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
        self.VAPI_API_KEY: str = os.getenv("VAPI_API_KEY", "")
        self.SERPAPI_KEY: str = os.getenv("SERPAPI_KEY", "")
        self.APOLLO_API_KEY: str = os.getenv("APOLLO_API_KEY", "")
        self.FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

settings = Settings()
