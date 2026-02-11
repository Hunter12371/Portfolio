# Where Website Data Comes From

## Current Status: PARTIALLY IMPLEMENTED ⚠️

Your portfolio has a FastAPI backend that reads from `data.md`, but the frontend components are **mostly hardcoded** and not yet fully connected to the API.

## What's Working ✅

1. **Backend API** - FastAPI reads from `backend/data.md`
2. **API Endpoints** - All endpoints work correctly
3. **Hero Section** - NOW fetches title and subtitle from data.md
4. **About Section** - NOW fetches content from data.md
5. **Contact Section** - Fetches email from data.md

## What's Still Hardcoded ❌

1. **Education Section** - Hardcoded in `Education.tsx`
2. **Experience Section** - Hardcoded in `Experience.tsx`
3. **Projects Section** - Hardcoded in `Projects.tsx`

## Data Flow

```
backend/data.md
      ↓
FastAPI Backend (main.py)
      ↓
API Endpoints (/api/content)
      ↓
Frontend (contentAPI.ts)
      ↓
React Components
      ↓
Website Display
```

## Files Involved

### Backend
- **`backend/data.md`** - Source of truth for all content
- **`backend/main.py`** - FastAPI server that reads data.md
- **`backend/.env`** - Email configuration

### Frontend
- **`portfolio-3d/src/services/contentAPI.ts`** - API client
- **`portfolio-3d/src/hooks/useContent.ts`** - React hook to fetch content
- **`portfolio-3d/src/components/*.tsx`** - React components

## How to Update Content

### Method 1: Edit data.md (Recommended)

Edit `backend/data.md`:

```markdown
---
contactEmail: "your-email@gmail.com"
heroTitle: "Hi, I'm Your Name"
heroSubtitle: "Your tagline here"
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

**Components that will update automatically:**
- ✅ Hero (title and subtitle)
- ✅ About (content and skills)
- ✅ Contact (email)

**Components that need manual update:**
- ❌ Education (still hardcoded)
- ❌ Experience (still hardcoded)
- ❌ Projects (still hardcoded)

### Method 2: Edit Component Files Directly

For sections not yet connected to data.md, edit the component files:

- **Education**: `portfolio-3d/src/components/Education.tsx`
- **Experience**: `portfolio-3d/src/components/Experience.tsx`
- **Projects**: `portfolio-3d/src/components/Projects.tsx`

## Next Steps to Complete Integration

To make ALL sections dynamic from data.md:

### 1. Update Education Component

Parse Education section from data.md and display it dynamically.

### 2. Update Experience Component

Parse Experience section from data.md with structured format.

### 3. Update Projects Component

Parse Projects section from data.md with project details.

## Testing

### Test Backend API

```bash
# Start backend
cd backend
python main.py

# Test endpoints
curl http://localhost:5000/api/content
curl http://localhost:5000/api/content/About
```

### Test Frontend

```bash
# Start frontend
cd portfolio-3d
npm run dev

# Visit http://localhost:5173
# Check browser console for API calls
```

## Current Data Sources Summary

| Section | Data Source | Status |
|---------|-------------|--------|
| Hero Title | data.md (heroTitle) | ✅ Dynamic |
| Hero Subtitle | data.md (heroSubtitle) | ✅ Dynamic |
| About Content | data.md (# About) | ✅ Dynamic |
| Skills | data.md (## Skills) | ✅ Dynamic |
| Education | Hardcoded in Education.tsx | ❌ Static |
| Experience | Hardcoded in Experience.tsx | ❌ Static |
| Projects | Hardcoded in Projects.tsx | ❌ Static |
| Contact Email | data.md (contactEmail) | ✅ Dynamic |

## Recommendation

**Option 1: Keep Current Hybrid Approach**
- Hero, About, Contact: Dynamic from data.md ✅
- Education, Experience, Projects: Edit component files directly

**Option 2: Make Everything Dynamic** (Requires more work)
- Update all components to parse data.md
- Define structured format in data.md
- More flexible but requires careful parsing

## Quick Reference

### To Update Hero/About/Contact:
```bash
# Edit this file
vim backend/data.md

# Changes reflect immediately (no rebuild needed)
```

### To Update Education/Experience/Projects:
```bash
# Edit component files
vim portfolio-3d/src/components/Education.tsx
vim portfolio-3d/src/components/Experience.tsx
vim portfolio-3d/src/components/Projects.tsx

# Rebuild frontend
npm run build
```

## API Documentation

Visit http://localhost:5000/docs for interactive API documentation when backend is running.

---

**Summary**: Your website gets data from BOTH `data.md` (for Hero, About, Contact) and hardcoded component files (for Education, Experience, Projects). The backend infrastructure is ready, but not all components are connected yet.
