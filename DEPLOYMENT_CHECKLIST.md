# Vercel Deployment Checklist

Use this checklist to ensure your portfolio is ready for Vercel deployment.

## Pre-Deployment Checklist

### 1. Code Preparation
- [ ] All changes committed to Git
- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] No sensitive data in code (API keys, passwords)
- [ ] `.env` file is in `.gitignore`

### 2. Content Setup
- [ ] `backend/data.md` has your actual content
- [ ] Resume file exists at `resume/Sidd.pdf`
- [ ] All images and assets are in place
- [ ] Contact email is correct in `data.md`

### 3. Environment Variables Ready
- [ ] Gmail account with 2FA enabled
- [ ] App-specific password generated
- [ ] Email credentials ready to add to Vercel

### 4. Local Testing
- [ ] Frontend runs locally: `cd portfolio-3d && npm run dev`
- [ ] Backend runs locally: `cd backend && npm run dev`
- [ ] Contact form works locally
- [ ] Resume download works locally
- [ ] All sections display correctly

### 5. Build Test
- [ ] Run `npm run build` from root directory
- [ ] Build completes without errors
- [ ] Check `portfolio-3d/dist` folder exists

## Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Import to Vercel
1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your repository
4. Vercel auto-detects configuration

### Step 3: Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `EMAIL_USER` | your-email@gmail.com | Production, Preview, Development |
| `EMAIL_PASSWORD` | your-app-password | Production, Preview, Development |

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build (usually 2-3 minutes)
3. Get your live URL: `https://your-project.vercel.app`

## Post-Deployment Checklist

### 1. Functionality Testing
- [ ] Website loads correctly
- [ ] All sections display properly
- [ ] 3D animations work
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] Contact form submits successfully
- [ ] Resume downloads correctly
- [ ] No console errors

### 2. Performance Check
- [ ] Page loads in < 3 seconds
- [ ] Images load properly
- [ ] No broken links
- [ ] Smooth animations

### 3. SEO & Meta
- [ ] Page title is correct
- [ ] Meta description is set
- [ ] Favicon displays
- [ ] Social media preview works

### 4. Optional Enhancements
- [ ] Add custom domain
- [ ] Enable Vercel Analytics
- [ ] Set up preview deployments
- [ ] Configure deployment notifications

## Troubleshooting

### Build Fails
**Check:**
- [ ] All dependencies in `package.json`
- [ ] No TypeScript errors
- [ ] Build works locally

**Fix:**
```bash
# Test build locally
npm run build

# Check for errors
npm run lint
```

### API Not Working
**Check:**
- [ ] Environment variables set in Vercel
- [ ] API routes in `vercel.json` are correct
- [ ] Backend code has no errors

**Test:**
```bash
# Test API endpoint
curl https://your-project.vercel.app/api/health
```

### Email Not Sending
**Check:**
- [ ] `EMAIL_USER` is correct Gmail address
- [ ] `EMAIL_PASSWORD` is app-specific password (not regular password)
- [ ] 2FA is enabled on Gmail
- [ ] Environment variables are set for all environments

**Test:**
```bash
# Check environment variables
vercel env ls
```

### Frontend Not Loading
**Check:**
- [ ] Build output is in `portfolio-3d/dist`
- [ ] `vercel.json` routes are correct
- [ ] No browser console errors

**Fix:**
```bash
# Rebuild and redeploy
vercel --prod
```

## Maintenance

### Update Content
1. Edit `backend/data.md`
2. Commit and push
3. Vercel auto-deploys

### Update Code
1. Make changes locally
2. Test with `npm run dev`
3. Commit and push
4. Vercel auto-deploys

### Rollback
1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "Promote to Production"

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Community**: https://github.com/vercel/vercel/discussions

## Success Criteria

Your deployment is successful when:
- ✅ Website is live and accessible
- ✅ All features work correctly
- ✅ No console errors
- ✅ Contact form sends emails
- ✅ Resume downloads
- ✅ Mobile responsive
- ✅ Fast loading times

---

**Congratulations! Your portfolio is live! 🚀**

Share your link: `https://your-project.vercel.app`
