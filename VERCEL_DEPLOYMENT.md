# Vercel Deployment Guide

This guide will help you deploy your 3D portfolio to Vercel with both frontend and backend.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- [Vercel CLI](https://vercel.com/cli) installed (optional, but recommended)
- Git repository (GitHub, GitLab, or Bitbucket)

## Quick Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect the configuration from `vercel.json`

3. **Configure Environment Variables**
   - In Vercel Dashboard, go to: Project Settings → Environment Variables
   - Add the following variables:
     ```
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASSWORD=your-app-specific-password
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add EMAIL_USER
   vercel env add EMAIL_PASSWORD
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Configuration Details

### Project Structure for Vercel

```
.
├── backend/
│   └── api/
│       └── index.js          # Serverless API function
├── portfolio-3d/
│   ├── dist/                 # Built frontend (auto-generated)
│   └── src/
├── vercel.json               # Vercel configuration
└── package.json              # Root package.json with build script
```

### How It Works

1. **Frontend**: Built as a static site from `portfolio-3d/` and served from root
2. **Backend**: Runs as serverless functions at `/api/*` routes
3. **Routing**: 
   - `/api/*` → Backend serverless functions
   - `/*` → Frontend static files
   - SPA routing handled with fallback to `index.html`

### Environment Variables

Set these in Vercel Dashboard or via CLI:

| Variable | Description | Required |
|----------|-------------|----------|
| `EMAIL_USER` | Gmail address for sending emails | Yes (for contact form) |
| `EMAIL_PASSWORD` | Gmail app-specific password | Yes (for contact form) |

#### Getting Gmail App Password

1. Enable 2-Factor Authentication on your Gmail account
2. Go to [Google Account Security](https://myaccount.google.com/security)
3. Under "Signing in to Google", select "App passwords"
4. Generate a new app password for "Mail"
5. Use this password as `EMAIL_PASSWORD`

## Build Configuration

The `vercel.json` file configures:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "portfolio-3d/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "portfolio-3d/dist"
      }
    },
    {
      "src": "backend/api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/api/index.js"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/portfolio-3d/dist/$1"
    }
  ]
}
```

## Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. SSL certificate is automatically provisioned

## Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch triggers a production deployment
- Pull requests get preview deployments
- Rollback to previous deployments anytime

## Troubleshooting

### Build Fails

**Issue**: Build fails with "Cannot find module"
**Solution**: Ensure all dependencies are in `package.json`, not just `devDependencies`

**Issue**: TypeScript errors during build
**Solution**: Run `npm run build` locally first to catch errors

### API Not Working

**Issue**: API returns 404
**Solution**: Check that routes in `vercel.json` are correct

**Issue**: Email not sending
**Solution**: 
- Verify environment variables are set in Vercel Dashboard
- Check Gmail app password is correct
- Ensure 2FA is enabled on Gmail

### Frontend Not Loading

**Issue**: Blank page or 404
**Solution**: 
- Check `outputDirectory` in `vercel.json`
- Verify build output is in `portfolio-3d/dist`
- Check browser console for errors

### CORS Issues

**Issue**: CORS errors in production
**Solution**: The backend already has CORS enabled. If issues persist, check that API calls use relative URLs (no hardcoded domains)

## Local Development

Test the production build locally:

```bash
# Install Vercel CLI
npm install -g vercel

# Run local development server
vercel dev
```

This simulates the Vercel environment locally.

## Monitoring

- **Analytics**: Enable in Vercel Dashboard → Analytics
- **Logs**: View function logs in Vercel Dashboard → Deployments → [deployment] → Functions
- **Performance**: Check Web Vitals in Analytics tab

## Updating Content

After deployment, you can update content by:

1. Editing `backend/data.md` locally
2. Committing and pushing changes
3. Vercel automatically redeploys

Or use the API endpoints to update content dynamically.

## Cost

- **Hobby Plan**: Free for personal projects
  - Unlimited deployments
  - 100GB bandwidth/month
  - Serverless function execution included

- **Pro Plan**: $20/month for commercial projects
  - More bandwidth and function execution time

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Contact Support](https://vercel.com/support)

## Next Steps

After deployment:
1. Test all features (contact form, resume download, etc.)
2. Set up custom domain
3. Enable analytics
4. Configure preview deployments for PRs
5. Set up monitoring alerts

---

**Your portfolio is now live on Vercel! 🎉**
