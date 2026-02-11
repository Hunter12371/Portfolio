from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
import os
from pathlib import Path
import frontmatter
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
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

# Pydantic models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ConfigUpdate(BaseModel):
    contactEmail: Optional[str] = None
    heroTitle: Optional[str] = None
    heroSubtitle: Optional[str] = None

class SectionUpdate(BaseModel):
    newContent: str

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
            "config": {"contactEmail": "work.srivastav@gmail.com"},
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

def write_data_file(config: dict, content: str):
    """Write config and content back to data.md"""
    post = frontmatter.Post(content, **config)
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(frontmatter.dumps(post))

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
    return data

@app.get("/api/content/{section}")
async def get_section(section: str):
    """Get specific section from data.md"""
    data = read_data_file()
    sections = parse_sections(data["content"])
    
    if section not in sections:
        raise HTTPException(status_code=404, detail="Section not found")
    
    return {"content": sections[section]}

@app.put("/api/config")
async def update_config(config_update: ConfigUpdate):
    """Update configuration in data.md"""
    try:
        data = read_data_file()
        
        # Update config
        if config_update.contactEmail:
            data["config"]["contactEmail"] = config_update.contactEmail
        if config_update.heroTitle:
            data["config"]["heroTitle"] = config_update.heroTitle
        if config_update.heroSubtitle:
            data["config"]["heroSubtitle"] = config_update.heroSubtitle
        
        # Write back to file
        write_data_file(data["config"], data["content"])
        
        return {"success": True, "config": data["config"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update config: {str(e)}")

@app.put("/api/content/{section}")
async def update_section(section: str, section_update: SectionUpdate):
    """Update specific section in data.md"""
    try:
        data = read_data_file()
        sections = parse_sections(data["content"])
        
        # Update section
        sections[section] = section_update.newContent
        
        # Reconstruct content
        new_content = "\n\n".join([f"# {key}\n\n{value}" for key, value in sections.items()])
        
        # Write back to file
        write_data_file(data["config"], new_content)
        
        return {"success": True, "section": section, "content": section_update.newContent}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update section: {str(e)}")

@app.post("/api/send-email")
async def send_email(form: ContactForm):
    """Send contact form email"""
    try:
        data = read_data_file()
        recipient_email = data["config"].get("contactEmail", "work.srivastav@gmail.com")
        
        # Email configuration
        sender_email = os.getenv("EMAIL_USER")
        sender_password = os.getenv("EMAIL_PASSWORD")
        
        if not sender_email or not sender_password:
            raise HTTPException(status_code=500, detail="Email configuration not set")
        
        # Create message
        message = MIMEMultipart("alternative")
        message["Subject"] = f"Portfolio Contact: {form.subject}"
        message["From"] = sender_email
        message["To"] = recipient_email
        
        # HTML body
        html = f"""
        <html>
            <body>
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> {form.name}</p>
                <p><strong>Email:</strong> {form.email}</p>
                <p><strong>Subject:</strong> {form.subject}</p>
                <p><strong>Message:</strong></p>
                <p>{form.message.replace(chr(10), '<br>')}</p>
            </body>
        </html>
        """
        
        part = MIMEText(html, "html")
        message.attach(part)
        
        # Send email
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient_email, message.as_string())
        
        return {"success": True, "message": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")

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
    uvicorn.run(app, host="0.0.0.0", port=5000)
