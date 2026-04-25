from pydantic import BaseModel
from typing import List, Dict, Any


class GenerateCalendarRequest(BaseModel):
    company_details: str
    weekly_focus: str
    file_name: str | None = None


class GenerateCalendarResponse(BaseModel):
    records: List[Dict[str, Any]]
    file_name: str
    download_url: str
