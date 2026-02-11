# Quick Update Guide - Edit Your Portfolio Content

## 🎯 TL;DR

**To update your portfolio**: Edit `backend/data.md` and save. That's it!

## 📝 Edit Content

### File Location
```
backend/data.md
```

### Structure

```markdown
---
contactEmail: "your.email@gmail.com"
heroTitle: "Hi, I'm Your Name"
heroSubtitle: "Your Title"
phone: "+1-234-567-8900"
location: "Your City, Country"
---

# About
Your bio here...

## Skills
Skill1, Skill2, Skill3

# Education
## University Name
**Degree:** Your Degree
**Period:** Start - End
**Proficient In:** #Tags

# Experience
## Company | Role
**Period:** Start – End
- Achievement 1
- Achievement 2

# Projects
## Project Name
**Tech:** Tech1, Tech2
**Description:** Description
**GitHub:** URL
**Live:** URL

# Contact
Contact info...
```

## 🚀 See Changes

### Locally
1. Start backend: `cd backend && python main.py`
2. Start frontend: `cd portfolio-3d && npm run dev`
3. Edit `backend/data.md`
4. Save
5. Wait 5 seconds → Changes appear!

### Production (Vercel)
1. Edit `backend/data.md`
2. Commit: `git add . && git commit -m "Update content"`
3. Push: `git push`
4. Vercel redeploys automatically
5. Done!

## 📋 Common Updates

### Change Name/Title
```yaml
---
heroTitle: "Hi, I'm John Doe"
heroSubtitle: "Full Stack Developer | Open Source Enthusiast"
---
```

### Add Experience
```markdown
# Experience
## New Company | New Role
**Period:** Jan 2026 – Present
- What you did
- What you achieved
```

### Add Project
```markdown
# Projects
## New Project
**Tech:** React, Node.js, MongoDB
**Description:** What it does and impact
**GitHub:** https://github.com/you/project
**Live:** https://project.com
```

### Update Skills
```markdown
## Skills
Python, JavaScript, React, Node.js, Docker, AWS
```

### Change Contact Info
```yaml
---
contactEmail: "new@email.com"
phone: "+1-555-0123"
location: "New City, State"
---
```

## ⚠️ Important Rules

1. **Keep YAML frontmatter** (the `---` section at top)
2. **Use exact format** for sections (# About, # Education, etc.)
3. **Use exact format** for fields (**Degree:**, **Period:**, etc.)
4. **Separate sections** with blank lines
5. **Use proper markdown** (## for subsections, - for lists)

## 🐛 If Something Breaks

### Website shows old content
- Wait 5 seconds (auto-refresh interval)
- Hard refresh browser (Ctrl+Shift+R)

### Website shows blank
- Check `backend/data.md` has proper YAML frontmatter
- Verify backend is running: `curl http://localhost:8000/api/health`
- Check browser console for errors

### Changes not appearing
- Verify you saved the file
- Check file is `backend/data.md` (not somewhere else)
- Restart backend: Stop and run `python main.py` again

## 📚 Examples

### Minimal Example
```markdown
---
contactEmail: "john@example.com"
heroTitle: "Hi, I'm John"
heroSubtitle: "Developer"
phone: "+1-555-0123"
location: "NYC"
---

# About
I'm a developer.

## Skills
Python, JavaScript

# Education
## MIT
**Degree:** BS Computer Science
**Period:** 2020 - 2024
**Proficient In:** #AI #ML

# Experience
## Google | Engineer
**Period:** 2024 – Present
- Built stuff

# Projects
## Cool App
**Tech:** React, Node
**Description:** Does cool things
**GitHub:** #
**Live:** #

# Contact
Email me!
```

### Full Example
See the current `backend/data.md` file for a complete example with all sections filled out.

## ✅ Checklist Before Committing

- [ ] YAML frontmatter is complete (all 5 fields)
- [ ] All sections present (About, Education, Experience, Projects, Contact)
- [ ] No typos in section headers
- [ ] All **Field:** formats correct
- [ ] Skills separated by commas
- [ ] Project links updated (not "#")
- [ ] Contact info is current
- [ ] File saved

## 🎉 That's It!

Edit `backend/data.md` → Save → See changes!

For detailed info, see `COMPLETE_SETUP_GUIDE.md`
