# Vercel Deployment Guide

## Status
✅ **Build:** Succeeds without errors
❌ **Configuration:** Incomplete - missing environment variables

## Critical Steps to Deploy

### 1. Set Vercel Environment Variables (MOST IMPORTANT)

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables** and add:

```
NUXT_SESSION_PASSWORD=42fb3ccd4d6f4df49f4429771b02141f
NUXT_PUBLIC_API_BASE=https://mumusoadmin.coderdrivelab.com/api/v1/
```

**Why:** Without these variables:
- `NUXT_SESSION_PASSWORD` missing → Session encryption fails → Login breaks
- `NUXT_PUBLIC_API_BASE` missing → All API calls fail with 500 errors

### 2. Update Local .env to HTTPS (Already Done ✅)

Changed from `http://` to `https://` in `.env` file.

**Reason:** Prevents browser mixed content warnings and security issues.

### 3. Remove Hardcoded Password Fallbacks (Already Done ✅)

- Updated `server/utils/guestCart.ts` to fail fast if `NUXT_SESSION_PASSWORD` is missing
- Updated `nuxt.config.ts` to require env variables in production

**Reason:** Prevents silent failures and inconsistent behavior across deployments.

### 4. Create .env.example (Already Done ✅)

Created `.env.example` documenting all required environment variables.

## Build & Deploy Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Deploy to Vercel (with pre-built output)
npx vercel deploy --prebuilt

# Or redeploy via Vercel Dashboard after setting environment variables
```

## Vercel Configuration

Your `vercel.json` is already configured:
```json
{
  "version": 2,
  "framework": "nuxtjs"
}
```

Nuxt 4 + Vercel preset (`nitro.preset: 'vercel'`) is properly configured in `nuxt.config.ts`.

## Build Output

- **Size:** 56.6 MB (21.1 MB gzipped) ✅ Well under Vercel's 250 MB limit
- **Output:** `.vercel/output/` directory ready for deployment
- **Function:** Single serverless function `__fallback.func` handles all routes

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `NUXT_SESSION_PASSWORD` | Encrypts guest cart & auth sessions | 32+ character hex string |
| `NUXT_PUBLIC_API_BASE` | Backend API base URL | `https://api.example.com/api/v1/` |

## Troubleshooting

### "NUXT_SESSION_PASSWORD environment variable is required"
- **Cause:** Not set on Vercel
- **Fix:** Add to Vercel Environment Variables (see Step 1)

### API calls return 500 errors
- **Cause:** `NUXT_PUBLIC_API_BASE` not set or incorrect
- **Fix:** Verify environment variables in Vercel dashboard

### Mixed content warnings in browser
- **Cause:** API URL using `http://` instead of `https://`
- **Fix:** Ensure `NUXT_PUBLIC_API_BASE` uses HTTPS protocol

### Cart/session not persisting
- **Cause:** Different instances using different session passwords
- **Fix:** Ensure all Vercel deployments have same `NUXT_SESSION_PASSWORD`

## Next Steps

1. Go to Vercel Dashboard
2. Select your project
3. Navigate to Settings → Environment Variables
4. Add the two required variables from Step 1
5. Redeploy (or push to trigger new build)
6. Test login, cart, and API calls

## Files Modified

- `nuxt.config.ts` - Added environment variable validation
- `server/utils/guestCart.ts` - Removed hardcoded password fallback
- `.env.example` - Created to document required variables (COMMIT THIS)
- `.env` - Updated API URL to HTTPS (DO NOT COMMIT - local only)

## Architecture Notes

- **Nitro Preset:** `vercel` - Optimized for serverless
- **Build Target:** Single function handling all routes + static assets
- **Session Management:** Server-side encrypted sessions for guest cart
- **API Integration:** Token-based Bearer authentication to backend

## Additional Resources

- Nuxt 4 Docs: https://nuxt.com
- Vercel Deployment: https://vercel.com/docs/frameworks/nuxt
- Environment Variables: https://vercel.com/docs/projects/environment-variables

---

**Last Updated:** 2025-11-16
**Status:** Ready for deployment (after setting environment variables)
