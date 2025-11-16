# Vercel Deployment Guide

## Status
✅ **Build:** Succeeds without errors
✅ **Server:** Starts successfully with fallback values
⚠️  **Configuration:** Environment variables recommended for production security

## Critical Steps to Deploy

### 1. Set Vercel Environment Variables (STRONGLY RECOMMENDED)

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables** and add:

```
NUXT_SESSION_PASSWORD=42fb3ccd4d6f4df49f4429771b02141f
NUXT_PUBLIC_API_BASE=https://mumusoadmin.coderdrivelab.com/api/v1/
```

**Why:**
- `NUXT_SESSION_PASSWORD`: Uses fallback for development, but production should use a unique secure key
- `NUXT_PUBLIC_API_BASE`: Uses fallback pointing to coderdrivelab.com, but you should configure your own API endpoint

**Important:** If these variables are not set:
- Server will still start and serve pages
- Cart operations will work but use insecure session password
- API calls will go to the fallback domain instead of your configured API
- This is fine for testing but **not recommended for production**

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

### "Function Invocation Failed" Error
- **Cause:** Missing `@iconify/utils` dependency (now fixed)
- **Status:** ✅ Resolved - added to package.json

### API calls go to wrong domain
- **Cause:** `NUXT_PUBLIC_API_BASE` not set or using fallback
- **Fix:** Set `NUXT_PUBLIC_API_BASE` to your API domain in Vercel Environment Variables
- **Example:** `https://your-api.com/api/v1/`

### Cart data not persisting (guest mode)
- **Cause:** Using fallback `NUXT_SESSION_PASSWORD` instead of production key
- **Fix:** Set `NUXT_SESSION_PASSWORD` to unique secure key in Vercel
- **Security:** Different deployments using same password = security risk

### Mixed content warnings in browser
- **Cause:** API URL using `http://` instead of `https://`
- **Fix:** Ensure `NUXT_PUBLIC_API_BASE` uses HTTPS protocol

### 500 errors when using cart features
- **Cause:** Session encryption issue with fallback password
- **Fix:** Configure proper `NUXT_SESSION_PASSWORD` in Vercel Environment Variables

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
