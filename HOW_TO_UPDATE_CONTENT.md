# How to Update Your Portfolio Content

## Simple Method: Edit One File

All your portfolio content is in **ONE FILE**: `portfolio-3d/src/data/content.ts`

### To Update Content:

1. Open `portfolio-3d/src/data/content.ts`
2. Edit the content you want to change
3. Save the file
4. Commit and push to GitHub
5. Vercel will automatically rebuild and deploy!

## What You Can Update:

### Hero Section
```typescript
config: {
  heroTitle: "Hi, I'm Your Name",  // Change your name
  heroSubtitle: "Your tagline here",  // Change your tagline
}
```

### About Section
```typescript
about: {
  paragraphs: [
    "First paragraph about you...",
    "Second paragraph about you..."
  ],
  skills: ["Skill1", "Skill2", "Skill3"]  // Add/remove skills
}
```

### Education
```typescript
education: [
  {
    institution: "University Name",
    degree: "Your Degree",
    period: "Start - End Date",
    cgpa: "X.XX / 4",
    tags: ["#Tag1", "#Tag2"]
  }
]
```

### Experience
```typescript
experience: [
  {
    company: "Company Name",
    role: "Your Role",
    period: "Start – End Date",
    description: [
      "Achievement 1",
      "Achievement 2"
    ]
  }
]
```

### Projects
```typescript
projects: [
  {
    title: "Project Name",
    tech: ["Tech1", "Tech2"],
    description: "Project description...",
    github: "https://github.com/yourrepo",
    live: "https://yourproject.com"
  }
]
```

### Contact Info
```typescript
config: {
  contactEmail: "your@email.com",
  phone: "+91-1234567890",
  location: "Your City, Country"
}
```

## Steps to Deploy Changes:

```bash
# 1. Edit the file
vim portfolio-3d/src/data/content.ts

# 2. Save and commit
git add .
git commit -m "Update portfolio content"

# 3. Push to GitHub
git push origin main

# 4. Vercel automatically deploys!
```

## That's It!

No backend needed, no API calls, no data.md parsing. Just edit one TypeScript file and push!

---

**Your content updates will be live in 2-3 minutes after pushing to GitHub!** 🚀
