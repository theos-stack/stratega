import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from app.config import OUTPUTS_DIR, get_allowed_origins
from app.generator import generate_content_calendar
from app.schemas import GenerateCalendarRequest


app = FastAPI(title="Stratega AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/generate")
def generate(request: GenerateCalendarRequest):
    result = generate_content_calendar(
        company_details=request.company_details,
        weekly_focus=request.weekly_focus,
        file_name=request.file_name,
    )

    records = result["df"].to_dict(orient="records")

    return {
        "records": records,
        "file_name": result["file_name"],
        "download_url": f"/download/{result['file_name']}",
    }


@app.get("/download/{file_name}")
def download_file(file_name: str):
    safe_file_name = os.path.basename(file_name)
    file_path = OUTPUTS_DIR / safe_file_name

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Excel file not found")

    return FileResponse(
        path=str(file_path),
        filename=safe_file_name,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )
