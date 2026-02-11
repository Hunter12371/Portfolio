from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, Dict, Any
import os
from pathlib import Path
import frontmatter
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Portfolio API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths
BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "data.md"
RESUME_FILE = BASE_DIR.parent / "resume" / "Sidd.pdf"

# Helper functions
def read_data_file() -> Dict[str, Any]:
    """Read and parse the data.md file"""
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            post = frontmatter.load(f)
            return {
                "config": dict(post.metadata),
                "content": post.content
            }
    except Exception as e:
        print(f"Error reading data.md: {e}")
        return {
            "config": {},
            "content": ""
        }

def parse_sections(content: str) -> Dict[str, str]:
    """Parse markdown content into sections"""
    sections = {}
    lines = content.split('\n')
    current_section = None
    current_content = []
    
    for line in lines:
        if line.startswith('# ') and not line.startswith('## '):
            if current_section:
                sections[current_section] = '\n'.join(current_content).strip()
            current_section = line[2:].strip()
            current_content = []
        elif current_section:
            current_content.append(line)
    
    if current_section:
        sections[current_section] = '\n'.join(current_content).strip()
    
    return sections

# API Routes
@app.get("/")
async def root():
    return {"message": "Portfolio API is running", "status": "ok"}

@app.get("/api/health")
async def health_check():
    return {"status": "Backend is running"}

@app.get("/api/content")
async def get_content():
    """Get all content from data.md"""
    data = read_data_file()
    sections = parse_sections(data["content"])
    return {
        "config": data["config"],
        "sections": sections,
        "raw_content": data["content"]
    }

@app.get("/api/content/{section}")
async def get_section(section: str):
    """Get specific section from data.md"""
    data = read_data_file()
    sections = parse_sections(data["content"])
    
    if section not in sections:
        raise HTTPException(status_code=404, detail="Section not found")
    
    return {"content": sections[section]}

@app.get("/api/download-resume")
async def download_resume():
    """Download resume PDF"""
    if not RESUME_FILE.exists():
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return FileResponse(
        path=RESUME_FILE,
        filename="Siddharth_Resume.pdf",
        media_type="application/pdf"
    )

# For local development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
