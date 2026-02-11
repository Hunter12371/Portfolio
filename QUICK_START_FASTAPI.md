# Quick Start: FastAPI Backend

Your portfolio now uses FastAPI for the backend. All content comes from `data.md`!

## Install & Run (2 minutes)

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Email

Create `.env` file:

```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

### 3. Run Backend

```bash
python main.py
```

Backend runs at: http://localhost:5000

### 4. Run Frontend

In another terminal:

```bash
cd portfolio-3d
npm run dev
```

Frontend runs at: http://localhost:5173

## View API Documentation

FastAPI provides automatic interactive docs:

- **Swagger UI**: http://localhost:5000/docs
- **ReDoc**: http://localhost:5000/redoc

Test all endpoints directly in your browser!

## Update Content

### Method 1: Edit data.md (Recommended)

Simply edit `backend/data.md`:

```markdown
---
contactEmail: "your-email@gmail.com"
heroTitle: "Hi, I'm Your Name"
heroSubtitle: "Your tagline"
---

# About
Your about content here...

# Education
Your education details...

# Experience
Your work experience...

# Projects
Your projects...

# Contact
Your contact info...
```

Save the file and refresh your website - changes appear instantly!

### Method 2: Use API

Update via API endpoints:

```bash
# Update config
curl -X PUT http://localhost:5000/api/config \
  -H "Content-Type: application/json" \
  -d '{"contactEmail": "new@email.com", "heroTitle": "New Title"}'

# Update section
curl -X PUT http://localhost:5000/api/content/About \
  -H "Content-Type: application/json" \
  -d '{"newContent": "New about content..."}'
```

## How It Works

1. **data.md** contains all your portfolio content
2. **FastAPI backend** reads from data.md
3. **React frontend** fetches content from API
4. **Edit data.md** → Changes reflect on website immediately!

## Content Structure

```
backend/data.md
├── Front Matter (YAML)
│   ├── contactEmail
│   ├── heroTitle
│   └── heroSubtitle
└── Sections (Markdown)
    ├── # About
    ├── # Education
    ├── # Experience
    ├── # Projects
    └── # Contact
```

## Deploy to Vercel

1. Push to GitHub (already done!)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables:
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
5. Deploy!

Vercel automatically detects FastAPI and deploys it!

## Features

✅ **Dynamic Content** - All content from data.md
✅ **Real-time Updates** - Edit data.md, see changes instantly
✅ **Type Safety** - Pydantic validates all data
✅ **Auto Documentation** - Interactive API docs at /docs
✅ **Email Support** - Contact form sends emails
✅ **Resume Download** - One-click resume download
✅ **Fast Performance** - FastAPI is blazing fast
✅ **Easy Deployment** - Works with Vercel out of the box

## Troubleshooting

### Python not found?
Install Python 3.8+: https://python.org

### Module not found?
```bash
pip install -r requirements.txt
```

### Port already in use?
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Email not sending?
- Check `.env` file has correct Gmail credentials
- Verify 2FA is enabled on Gmail
- Use app-specific password (not regular password)

## Documentation

- **Migration Guide**: [FASTAPI_MIGRATION.md](./FASTAPI_MIGRATION.md)
- **Full Setup**: [SETUP.md](./SETUP.md)
- **Deployment**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- **FastAPI Docs**: https://fastapi.tiangolo.com

---

**Your portfolio is powered by FastAPI + data.md! ⚡**

Edit `backend/data.md` to update your website content!
