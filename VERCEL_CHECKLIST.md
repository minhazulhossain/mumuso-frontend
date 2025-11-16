# Vercel Deployment Checklist

## Pre-Deployment ✅

- [x] Build completes successfully
  ```bash
  npm run build
  ```
  **Result:** 56.6 MB build (21.1 MB gzipped) ✅

- [x] Environment file created (`.env.example`)
  **Purpose:** Documents required variables for team

- [x] Code fixes applied
  - [x] Removed hardcoded password fallback
  - [x] Added environment variable validation
  - [x] Updated API URL to HTTPS

- [x] Git commits created
  ```bash
  git log --oneline | head -1
  # 17b02e4 Fix critical Vercel deployment issues
  ```

## Vercel Dashboard Setup (⚠️ DO THIS MANUALLY)

### Step 1: Set Environment Variables

Go to: **https://vercel.com/dashboard** → Select Project → **Settings** → **Environment Variables**

Add these exact variables:

```
Name: NUXT_SESSION_PASSWORD
Value: 42fb3ccd4d6f4df49f4429771b02141f
Environments: Production, Preview, Development
```

```
Name: NUXT_PUBLIC_API_BASE
Value: https://mumusoadmin.coderdrivelab.com/api/v1/
Environments: Production, Preview, Development
```

Click **Save** after each variable.

### Step 2: Redeploy

Option A: Via Vercel Dashboard
- Click "Deployments" tab
- Click "..." on latest deployment
- Select "Redeploy"

Option B: Via Git
- Push changes to main branch
- Vercel automatically rebuilds

## Post-Deployment Testing ✅

After deployment is successful:

- [ ] Visit homepage
  - Verify page loads without errors
  - Check browser console for errors

- [ ] Test authentication
  - Go to `/login`
  - Try login with test credentials
  - Verify session cookie is set

- [ ] Test cart functionality
  - Add item to cart
  - Verify cart updates (guest mode)
  - Login and verify cart syncs

- [ ] Test API calls
  - Open DevTools → Network tab
  - Load products page
  - Verify API requests to `https://mumusoadmin.coderdrivelab.com`

- [ ] Monitor logs
  - Vercel Dashboard → Deployments → Click deployment
  - View Function Logs
  - Check for NUXT_SESSION_PASSWORD or NUXT_PUBLIC_API_BASE errors

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| 500 errors on load | Missing env vars | Add to Vercel dashboard |
| "NUXT_SESSION_PASSWORD required" | Not set in Vercel | Add to environment variables |
| API calls fail | Wrong API URL or missing HTTPS | Verify `NUXT_PUBLIC_API_BASE` |
| Login broken | Session encryption failed | Check `NUXT_SESSION_PASSWORD` |
| Mixed content warnings | Using HTTP API | Use HTTPS in URL |

## Rollback Plan

If deployment fails:

1. Check Vercel dashboard → Deployments
2. Click the previous successful deployment
3. Click "..." → "Promote to Production"

Or redeploy locally:
```bash
npm run build
npx vercel deploy --prebuilt
```

## Build Statistics

```
Total Size: 56.6 MB (21.1 MB gzipped)
Vercel Limit: 250 MB
Usage: 22.6% ✅

Files:
- 34 API routes
- 20 Pages
- 38 Components
- 13 Composables
- 12 Type definition files
```

## Environment Variables Reference

See `.env.example` in project root for detailed documentation.

```bash
# Session encryption (backend for user sessions)
NUXT_SESSION_PASSWORD=<32+ char hex string>

# Backend API base URL (must include /api/v1/)
NUXT_PUBLIC_API_BASE=<https://api.domain.com/api/v1/>
```

## Support Documentation

- **Deployment Guide:** See `DEPLOYMENT_GUIDE.md`
- **Project Overview:** See `CLAUDE.md`
- **Type Definitions:** See `shared/types/README.md`

---

**Status:** Ready to deploy (after setting Vercel environment variables)
**Last Updated:** 2025-11-16
