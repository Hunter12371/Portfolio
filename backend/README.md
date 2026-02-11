# Portfolio Backend - FastAPI

A FastAPI backend that serves dynamic content from `data.md` file.

## Features

- 🚀 FastAPI for high performance
- 📝 Dynamic content from `data.md`
- 📧 Contact form with email sending
- 📄 Resume download
- 🔄 Real-time content updates
- ✅ Type validation with Pydantic

## Setup

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create a `.env` file:

```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

### 3. Run Development Server

```bash
python main.py
```

Or with uvicorn:

```bash
uvicorn main:app --reload --port 5000
```

Server runs at: `http://localhost:5000`

## API Documentation

FastAPI provides automatic interactive API docs:

- **Swagger UI**: http://localhost:5000/docs
- **ReDoc**: http://localhost:5000/redoc

## API Endpoints

### Content Management

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/content` | GET | Get all content from data.md |
| `/api/content/{section}` | GET | Get specific section |
| `/api/config` | PUT | Update configuration (email, titles) |
| `/api/content/{section}` | PUT | Update section content |

### Contact & Resume

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/send-email` | POST | Send contact form email |
| `/api/download-resume` | GET | Download resume PDF |
| `/api/health` | GET | Health check |

## Content Management

All content is stored in `data.md` with YAML front-matter:

```markdown
---
contactEmail: "your-email@gmail.com"
heroTitle: "Hi, I'm Your Name"
heroSubtitle: "Your tagline"
---

# About
Your about content...

# Education
Your education details...

# Experience
Your work experience...

# Projects
Your projects...

# Contact
Your contact info...
```

### Update Content

Simply edit `data.md` and save. Changes are reflected immediately!

### Update via API

```bash
# Update config
curl -X PUT http://localhost:5000/api/config \
  -H "Content-Type: application/json" \
  -d '{"contactEmail": "new@email.com"}'

# Update section
curl -X PUT http://localhost:5000/api/content/About \
  -H "Content-Type: application/json" \
  -d '{"newContent": "New about content..."}'
```

## Email Setup

1. Enable 2FA on Gmail
2. Generate app-specific password
3. Add to `.env` file

## Deployment

### Vercel

The project is configured for Vercel deployment:

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

See [VERCEL_DEPLOYMENT.md](../VERCEL_DEPLOYMENT.md) for details.

## Technologies

- **FastAPI**: Modern Python web framework
- **Uvicorn**: ASGI server
- **Pydantic**: Data validation
- **python-frontmatter**: Parse markdown with YAML
- **python-dotenv**: Environment variables

---

**Made with FastAPI ⚡**
