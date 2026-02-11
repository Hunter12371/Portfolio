# data.md Live Update Guide

Your portfolio now reads ALL content from `backend/data.md` and updates live!

## How It Works

1. **Edit `backend/data.md`** - Change any content
2. **Save the file** - Changes are saved
3. **Website updates automatically** - Within 5 seconds!

No rebuild needed! The website polls the API every 5 seconds for updates.

## What's Dynamic

✅ **Hero Section** - Title and subtitle
✅ **About Section** - Content and skills
✅ **Education Section** - All education details
✅ **Experience Section** - All work experience
✅ **Projects Section** - All projects
✅ **Contact Section** - Email, phone, location

## data.md Structure

```markdown
---
contactEmail: "your-email@gmail.com"
heroTitle: "Hi, I'm Your Name"
heroSubtitle: "Your tagline"
phone: "+91-1234567890"
location: "Your City, Country"
---

# About

Your about paragraphs here...

## Skills

Skill1, Skill2, Skill3, Skill4

# Education

## University Name
**Degree:** Your Degree Name
**Period:** Start Date - End Date
**CGPA:** X.XX / 4
**Tags:** #Tag1 #Tag2 #Tag3

# Experience

## Company Name | Your Role
**Period:** Start Date – End Date
- Achievement or responsibility 1
- Achievement or responsibility 2
- Achievement or responsibility 3

## Another Company | Another Role
**Period:** Start Date – End Date
- Achievement 1
- Achievement 2

# Projects

## Project Title
**Tech:** Tech1, Tech2, Tech3
**Description:** Your project description here
**GitHub:** https://github.com/yourrepo
**Live:** https://yourproject.com

## Another Project
**Tech:** Tech1, Tech2
**Description:** Another description
**GitHub:** #
**Live:** #

# Contact

Any additional contact information or message here.
```

## Quick Start

### 1. Start Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Backend runs at: http://localhost:5000

### 2. Start Frontend

```bash
cd portfolio-3d
npm run dev
```

Frontend runs at: http://localhost:5173

### 3. Edit Content

Open `backend/data.md` in your editor and make changes. Save the file and watch your website update within 5 seconds!

## Testing

1. Open website: http://localhost:5173
2. Open `backend/data.md` in editor
3. Change the `heroTitle` to something else
4. Save the file
5. Watch the website update automatically!

## Deployment

When deployed to Vercel:
1. Push changes to GitHub
2. Vercel rebuilds automatically
3. Edit `data.md` on GitHub
4. Changes reflect immediately (no rebuild needed for content)

## API Endpoints

- `GET /api/content` - Get all content
- `GET /api/content/{section}` - Get specific section
- `GET /api/download-resume` - Download resume
- `GET /api/health` - Health check

Visit http://localhost:5000/docs for interactive API documentation!

## Tips

- Keep the structure format exactly as shown
- Use `##` for subsections (Skills, individual items)
- Use `-` for bullet points in Experience
- Separate paragraphs with blank lines
- Tags should start with `#`

## Troubleshooting

### Changes not appearing?
- Wait 5 seconds (auto-refresh interval)
- Check backend is running
- Check browser console for errors

### Backend not starting?
```bash
pip install -r requirements.txt
python main.py
```

### Format issues?
- Check data.md follows the structure above
- Ensure proper spacing and formatting
- Look at backend console for parsing errors

---

**Your portfolio is now fully dynamic! Edit data.md and see changes live! 🚀**
