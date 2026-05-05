from datetime import datetime, timedelta
import re

def validate_phone(phone: str) -> bool:
    pattern = r'^\+?[\d\s\-\(\)]{10,15}$'
    return bool(re.match(pattern, phone))

def format_phone(phone: str) -> str:
    digits = re.sub(r'\D', '', phone)
    if len(digits) == 10:
        return f"+91 {digits[:5]} {digits[5:]}"
    return phone

def get_time_ist() -> datetime:
    return datetime.utcnow() + timedelta(hours=5, minutes=30)

def is_business_hours() -> bool:
    now = get_time_ist()
    return 9 <= now.hour < 19 and now.weekday() < 5
