# Complete Setup Guide - Portfolio with FastAPI Backend

## 🎯 Overview

Your portfolio now has:
- ✅ **Frontend**: React + TypeScript + Three.js (in `portfolio-3d/`)
- ✅ **Backend**: FastAPI Python server (in `backend/`)
- ✅ **Dynamic Content**: All content comes from `backend/data.md`
- ✅ **Live Updates**: Changes to `data.md` reflect on website every 5 seconds
- ✅ **Fallback Data**: Website never shows blank - uses hardcoded data if API fails
- ✅ **Vercel Ready**: Configured for deployment

## 🚀 Quick Start

### Local Development

1. **Start Backend** (Terminal 1):
```bash
cd backend
pip install -r requirements.txt
python main.py
```
Backend runs at: `http://localhost:8000`

2. **Start Frontend** (Terminal 2):
```bash
cd portfolio-3d
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

3. **Edit Content**:
- Open `backend/data.md`
- Make changes
- Save file
- Wait 5 seconds - changes appear on website!

### Production (Vercel)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Portfolio with FastAPI backend"
git push
```

2. **Deploy to Vercel**:
- Go to vercel.com
- Import your GitHub repository
- Vercel will automatically detect the configuration
- Click "Deploy"

3. **Update Content on Vercel**:
- Edit `backend/data.md` in your repository
- Commit and push changes
- Vercel will redeploy automatically

## 📝 How to Update Content

### Edit data.md

The file structure:
```markdown
---
contactEmail: "your.email@gmail.com"
heroTitle: "Hi, I'm Your Name"
heroSubtitle: "Your Title | Your Passion"
phone: "+1-234-567-8900"
location: "Your City, Country"
---

# About
Write about yourself here...

## Skills
Skill1, Skill2, Skill3, Skill4

# Education
## University Name
**Degree:** Your Degree Name
**Period:** Start Date - End Date
**Proficient In:** #Tag1 #Tag2 #Tag3

# Experience
## Company Name | Your Role
**Period:** Start Date – End Date
- Achievement or responsibility 1
- Achievement or responsibility 2
- Achievement or responsibility 3

# Projects
## Project Name
**Tech:** Technology1, Technology2, Technology3
**Description:** Describe your project and its impact
**GitHub:** https://github.com/username/repo
**Live:** https://yourproject.com

# Contact
Add any additional contact information here...
```

### What Gets Updated

| Section in data.md | Where it appears on website |
|-------------------|----------------------------|
| `heroTitle` | Main hero section title |
| `heroSubtitle` | Hero section subtitle |
| `contactEmail` | Contact section |
| `phone` | Contact section |
| `location` | Contact section |
| `About` section | About Me page |
| `Skills` | About Me - Skills box |
| `Education` | Education section |
| `Experience` | Experience timeline |
| `Projects` | Projects grid |
| `Contact` | Contact section |

## 🔧 How It Works

### Architecture

```
┌─────────────────┐
│   data.md       │ ← Edit this file
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  FastAPI        │ ← Reads data.md
│  Backend        │   Serves via API
│  (Port 8000)    │
└────────┬────────┘
         │
         ▼ HTTP Requests
┌─────────────────┐
│  React          │ ← Fetches from API
│  Frontend       │   Updates every 5s
│  (Port 5173)    │   Falls back if API fails
└─────────────────┘
```

### Data Flow

1. **Backend reads** `data.md` when API is called
2. **Frontend fetches** from `/api/content` every 5 seconds
3. **If API succeeds**: Display fresh data from `data.md`
4. **If API fails**: Display hardcoded fallback data from `portfolio-3d/src/data/content.ts`

### Why Fallback Data?

- Website NEVER shows blank content
- Works even if backend is down
- Instant loading on first visit
- Graceful degradation

## 🧪 Testing

### Test Backend Locally

```bash
cd backend
python test_api.py
```

Expected output:
```
==================================================
FastAPI Backend Test
==================================================

Testing /api/health...
Status: 200
Response: {'status': 'Backend is running'}

Testing /api/content...
Status: 200
Config: {...}
Sections: ['About', 'Education', 'Experience', 'Projects', 'Contact']

Testing /api/content/About...
Status: 200
Content preview: I am an AI & ML Engineering Student...

✅ All tests passed!
```

### Test Frontend

1. Start backend: `cd backend && python main.py`
2. Start frontend: `cd portfolio-3d && npm run dev`
3. Open browser: `http://localhost:5173`
4. Open browser console (F12)
5. Look for: "Error fetching content from API, using fallback data" (if backend not running)
6. Or: No errors (if backend is running)

## 📦 Build for Production

```bash
cd portfolio-3d
npm run build
```

Output: `portfolio-3d/dist/` folder ready for deployment

## 🐛 Troubleshooting

### Website Shows Blank Content

**Cause**: Fallback data not working
**Fix**: Check `portfolio-3d/src/data/content.ts` has all data

### Backend Won't Start

**Cause**: Port 8000 already in use
**Fix**: 
```python
# In backend/main.py, change port:
uvicorn.run(app, host="0.0.0.0", port=9000)

# In portfolio-3d/src/services/contentAPI.ts, update:
const API_URL = 'http://localhost:9000'
```

### Changes to data.md Not Reflecting

**Cause**: Backend not running or frontend not fetching
**Fix**:
1. Verify backend is running: `curl http://localhost:8000/api/health`
2. Check browser console for errors
3. Wait 5 seconds for auto-refresh

### Vercel Deployment Issues

**Cause**: Build configuration
**Fix**: Ensure `vercel.json` is correct:
```json
{
  "version": 2,
  "buildCommand": "cd portfolio-3d && npm install && npm run build",
  "builds": [
    {
      "src": "backend/main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/main.py"
    },
    {
      "src": "/(.*)",
      "dest": "portfolio-3d/dist/$1"
    }
  ],
  "outputDirectory": "portfolio-3d/dist"
}
```

## 📚 File Structure

```
.
├── backend/
│   ├── main.py              # FastAPI server
│   ├── data.md              # ⭐ EDIT THIS for content
│   ├── requirements.txt     # Python dependencies
│   ├── test_api.py          # Test script
│   └── README.md
├── portfolio-3d/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── data/
│   │   │   └── content.ts   # Fallback data
│   │   ├── hooks/
│   │   │   └── useContent.ts # API fetching hook
│   │   ├── services/
│   │   │   └── contentAPI.ts # API client
│   │   └── utils/
│   │       └── parseContent.ts # Data parsing
│   ├── package.json
│   └── vite.config.ts
├── vercel.json              # Vercel deployment config
└── COMPLETE_SETUP_GUIDE.md  # This file
```

## 🎨 Customization

### Change Refresh Interval

In `portfolio-3d/src/hooks/useContent.ts`:
```typescript
// Change 5000 (5 seconds) to your preferred interval
const interval = setInterval(fetchContent, 5000);
```

### Disable Live Updates

Remove the interval:
```typescript
// Comment out these lines:
// const interval = setInterval(fetchContent, 5000);
// return () => clearInterval(interval);
```

### Update Fallback Data

Edit `portfolio-3d/src/data/content.ts` to match your `backend/data.md`

## ✅ Checklist

Before deploying:
- [ ] Backend runs locally without errors
- [ ] Frontend builds successfully (`npm run build`)
- [ ] `data.md` has all your content
- [ ] Fallback data in `content.ts` matches `data.md`
- [ ] Resume PDF exists at `resume/Sidd.pdf`
- [ ] All links in projects are updated (not "#")
- [ ] Contact email is correct
- [ ] Phone number is correct

## 🎉 You're Done!

Your portfolio is now:
- ✅ Dynamic (content from `data.md`)
- ✅ Live updating (changes reflect in 5 seconds)
- ✅ Reliable (fallback data prevents blank pages)
- ✅ Production ready (Vercel deployment configured)

**To update content**: Just edit `backend/data.md` and push to GitHub!
