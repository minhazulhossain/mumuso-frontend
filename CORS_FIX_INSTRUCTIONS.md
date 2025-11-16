# CORS Fix - Complete Instructions

## Problem Identified

Your backend at `https://mumusoadmin.coderdrivelab.com/api/v1/` doesn't have CORS headers enabled. When the frontend running on `https://mumuso-frontend.vercel.app/` tries to call the backend directly, the browser blocks the request.

**Error you're seeing:**
```
Access to fetch at 'https://mumusoadmin.coderdrivelab.com/api/v1/...'
from origin 'https://mumuso-frontend-...-vercel.app' has been blocked
by CORS policy: No 'Access-Control-Allow-Origin' header
```

## Solution: Use Server-Side Proxy

We've implemented a **server-side proxy endpoint** at `/api/proxy/` that:
1. Frontend calls `/api/proxy/...` (same-origin, no CORS issues)
2. Vercel server proxies the request to HTTPS backend
3. Backend returns data to server
4. Server returns data to frontend (no CORS issues)

## What Changed in This Fix

1. **Updated proxy endpoint** - Changed to use HTTPS backend URL
   - File: `server/api/proxy/[...].get.ts`
   - Changed from: `http://mumusoadmin...` → `https://mumusoadmin...`

2. **Code is already configured to use proxy as fallback**
   - File: `nuxt.config.ts` (line 48)
   - When `NUXT_PUBLIC_API_BASE` env var is NOT set, uses `/api/proxy/` fallback
   - When env var IS set, uses that URL directly (causes CORS issues)

## Required Step: Remove Environment Variable from Vercel

**The issue:** `NUXT_PUBLIC_API_BASE` is SET in Vercel environment variables, which tells frontend to call the backend directly instead of using the proxy.

**Solution:** Delete it from Vercel so the code falls back to using the proxy.

### Steps to Remove NUXT_PUBLIC_API_BASE:

1. Go to **Vercel Dashboard** → **Your Project**
2. Click **Settings** → **Environment Variables**
3. Find `NUXT_PUBLIC_API_BASE`
4. Click the **trash icon** to delete it
5. Click **Save** or **Deploy**

### After Deletion:

- Frontend will automatically use `/api/proxy/` as the API base
- All requests will go through Vercel's server
- Backend receives requests, processes them, returns data
- No CORS issues because all communication is server-to-server

## Why This Works

```
Browser (Frontend)
    ↓ (same-origin, no CORS)
Vercel Server (/api/proxy/...)
    ↓ (server-to-server, no CORS restrictions)
Backend (HTTPS)
    ↓ (response)
Vercel Server
    ↓ (same-origin response)
Browser (Frontend) ✅
```

## Deployment Steps

1. **Delete environment variable** (as described above)
2. **Vercel redeploys automatically** when you save
3. **Wait ~1-2 minutes** for deployment to complete
4. **Test your site** - should load products/categories without CORS errors

## How to Verify It's Working

After deployment:

1. Open your site: https://mumuso-frontend-...vercel.app
2. Open **Browser DevTools** → **Console** tab
3. You should **NOT** see CORS errors
4. Homepage should load with:
   - Navigation items ✓
   - Product listing ✓
   - Categories ✓

## If It Still Doesn't Work

Check Vercel function logs:

1. Go to **Vercel Dashboard** → **Your Project**
2. Click **Deployments** → Latest deployment
3. Click **Deployment** → **Function Logs** (top tabs)
4. Look for errors related to proxy
5. Share the error message

## Environment Variables You Should Have

For production, Vercel should have:
- `NUXT_SESSION_PASSWORD` - for session encryption (keep this)
- `NUXT_PUBLIC_API_BASE` - **DELETE THIS** (let it use proxy fallback)
- `BACKEND_API_BASE` - Optional, only if you want to customize proxy backend URL

The `.env` file in your code has HTTPS URL, but it's only used locally during `npm run dev`.

## Summary of Changes

```bash
# Commit made:
bfecd8e Update proxy endpoint to use HTTPS backend URL

# What changed:
- server/api/proxy/[...].get.ts
  - HTTP fallback → HTTPS fallback
  - Now: https://mumusoadmin.coderdrivelab.com/api/v1/
```

---

**Next Action:** Delete `NUXT_PUBLIC_API_BASE` from Vercel environment variables, then test your site.
