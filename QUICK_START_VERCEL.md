# Quick Start: Deploy to Vercel in 5 Minutes

The fastest way to get your portfolio live on Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Gmail with 2FA enabled
- Gmail app-specific password

## Step 1: Get Gmail App Password (2 minutes)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if not enabled
3. Search for "App passwords"
4. Select "Mail" → Generate password
5. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

## Step 2: Push to GitHub (1 minute)

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

## Step 3: Deploy to Vercel (2 minutes)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your portfolio repository
4. Vercel auto-detects configuration ✅
5. Click "Deploy"

## Step 4: Add Environment Variables (1 minute)

While deployment is running:

1. Go to Project Settings → Environment Variables
2. Add two variables:

| Name | Value | Apply to |
|------|-------|----------|
| `EMAIL_USER` | your-email@gmail.com | All environments |
| `EMAIL_PASSWORD` | your-app-password | All environments |

3. Click "Save"

## Step 5: Redeploy (if needed)

If you added environment variables after first deployment:

1. Go to Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"

## Done! 🎉

Your portfolio is live at: `https://your-project.vercel.app`

## Test Your Deployment

- [ ] Website loads
- [ ] All sections display
- [ ] Contact form works (send test email)
- [ ] Resume downloads
- [ ] Mobile responsive

## Add Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain (e.g., `yourname.com`)
3. Update DNS records as shown
4. Wait for SSL certificate (automatic)

## Automatic Updates

Every time you push to GitHub:
- Vercel automatically deploys
- Preview URLs for pull requests
- Production updates on main branch

## Quick Commands

```bash
# Update content
vim backend/data.md
git commit -am "Update content"
git push

# Update code
# Make changes...
git commit -am "Update feature"
git push

# Vercel auto-deploys! ✨
```

## Troubleshooting

### Build Failed?
- Check build logs in Vercel Dashboard
- Test locally: `npm run build`
- Ensure all dependencies are in `package.json`

### Email Not Working?
- Verify environment variables are set
- Check Gmail app password is correct
- Ensure 2FA is enabled on Gmail

### API 404 Errors?
- Check Vercel function logs
- Verify `vercel.json` is in root directory
- Redeploy after adding environment variables

## Need More Help?

- **Detailed Guide**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- **Checklist**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- **Changes Made**: [VERCEL_CHANGES.md](./VERCEL_CHANGES.md)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)

## What's Included

✅ Frontend hosting (React + Vite)
✅ Backend API (serverless functions)
✅ Contact form with email
✅ Resume download
✅ Automatic HTTPS
✅ Global CDN
✅ Auto-scaling
✅ Preview deployments
✅ Instant rollbacks

## Cost

**Free Hobby Plan includes:**
- Unlimited deployments
- 100GB bandwidth/month
- Serverless functions
- Automatic HTTPS
- Custom domains

Perfect for personal portfolios!

---

**Your portfolio is live in 5 minutes! 🚀**

Share your link: `https://your-project.vercel.app`
