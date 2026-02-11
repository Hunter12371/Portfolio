# SETUP INSTRUCTIONS

Follow these steps to get your portfolio up and running with the backend.

## 1. Backend Setup

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Create Environment File

```bash
cp .env.example .env
```

### Step 3: Configure Gmail for Email Sending

1. Go to [Google Account Security Settings](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if not already enabled
3. Search for "App passwords" in the security settings
4. Select "Mail" and "Windows Computer" to generate an app-specific password
5. Copy the generated password

### Step 4: Update .env File

Edit `backend/.env` with your Gmail credentials:

```
PORT=5000
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

For example:
```
PORT=5000
EMAIL_USER=work.srivastav@gmail.com
EMAIL_PASSWORD=jkhs kxyo pqwm zxcv
```

### Step 5: Start Backend

```bash
npm run dev
```

You should see:
```
Backend server running on http://localhost:5000
```

## 2. Frontend Setup

### Step 1: Install Dependencies

```bash
cd portfolio-3d
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

You should see:
```
VITE vX.X.X  ready in XXX ms

➜  Local:   http://localhost:5173/
```

## 3. Verify Everything Works

1. Open `http://localhost:5173` in your browser
2. You should see your portfolio website
3. Click on "Download Resume" button - should download your resume
4. Go to "Contact" section and try sending a test email
5. Check the configured email for the message

## 4. Update Your Content

All your content is in `backend/data.md`. You can edit:

- **Hero Title & Subtitle**: In the front-matter at the top
- **About Section**: Under `# About`
- **Education**: Under `# Education`
- **Experience**: Under `# Experience`
- **Projects**: Under `# Projects`
- **Contact Email**: In the front-matter `contactEmail` field

Example front-matter:
```yaml
---
contactEmail: "your-email@gmail.com"
heroTitle: "Hi, I'm Siddharth"
heroSubtitle: "AI Engineer | Level 99 Gamer | Tech Enthusast"
---
```

Save the file, and refresh your browser to see the changes!

## 5. Customization Tips

### Change Skills Section
Edit the `skills` array in `src/components/About.tsx` and `backend/data.md`

### Add New Projects
Add project details to the Projects section in `backend/data.md`

### Update Resume Download
Replace `resume/Sidd.pdf` with your own resume PDF

### Customize Colors
Edit `tailwind.config.js` to change the color scheme

## 6. Deployment

### Deploy to Vercel (Recommended - All-in-One Solution)

Your project is fully configured for Vercel deployment with both frontend and backend!

**Quick Steps:**
1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository
3. Add environment variables in Vercel Dashboard:
   - `EMAIL_USER`: your-email@gmail.com
   - `EMAIL_PASSWORD`: your-app-specific-password
4. Click Deploy!

**Detailed Guide:** See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete instructions.

**Deployment Checklist:** Use [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) to ensure everything is ready.

### Alternative: Separate Deployment

If you prefer to deploy frontend and backend separately:

**Backend Options:**
- Railway (recommended, simple setup)
- Render (free tier available)
- Your own VPS

**Frontend Options:**
- Vercel (recommended for Vite)
- Netlify
- GitHub Pages

Before separate deployment, update the API URL in `portfolio-3d/src/services/contentAPI.ts`:

```typescript
const API_URL = import.meta.env.PROD 
  ? 'https://your-backend-url.com'
  : 'http://localhost:5000';
```

## 7. Troubleshooting

### Backend not running?
- Check if port 5000 is already in use
- Try: `npm run dev` in the backend folder
- Check the console for error messages

### Frontend can't connect to backend?
- Ensure backend is running on port 5000
- Check `vite.config.ts` has proxy settings
- Check `.env` file exists in backend folder

### Emails not sending?
- Verify Gmail address and app password are correct
- Check 2FA is enabled on Gmail
- Look at backend console for error messages
- Make sure EMAIL_USER and EMAIL_PASSWORD are set

### Resume not downloading?
- Ensure `resume/Sidd.pdf` exists
- File must be a PDF and properly named
- Check file permissions

## 8. Production Checklist

Before deploying to production:

- [ ] Update all content in `backend/data.md`
- [ ] Update API URL in `src/services/contentAPI.ts`
- [ ] Set environment variables on hosting service
- [ ] Test contact form and email sending
- [ ] Test resume download
- [ ] Update resume PDF to latest version
- [ ] Test on multiple browsers
- [ ] Check responsive design on mobile
- [ ] Optimize all images
- [ ] Build frontend: `npm run build`

## 9. Quick Commands Reference

```bash
# Backend
cd backend
npm install              # Install dependencies
npm run dev             # Development mode with auto-reload
npm start               # Production mode

# Frontend
cd portfolio-3d
npm install             # Install dependencies
npm run dev             # Development server
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Check code quality
```

## 10. File Locations

- **Content**: `backend/data.md`
- **Email Config**: `backend/.env`
- **Resume**: `resume/Sidd.pdf`
- **Frontend Config**: `portfolio-3d/vite.config.ts`
- **API Service**: `portfolio-3d/src/services/contentAPI.ts`
- **Backend Server**: `backend/src/server.js`

## Need Help?

Refer to:
- [Backend README](./backend/README.md) - Detailed API documentation
- [Frontend README](./portfolio-3d/README.md) - Frontend documentation
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vite.dev/)

---

Happy coding! 🚀
