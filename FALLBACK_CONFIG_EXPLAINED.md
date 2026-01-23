# Understanding Fallback Configuration

## What are Fallback Values?

Since environment variables are optional (server won't crash without them), the app uses safe defaults:

```typescript
// nuxt.config.ts
session: {
    password: process.env.NUXT_SESSION_PASSWORD || 'dev-secret-key-change-in-production-min-32-xxx'
},
public: {
    apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://admin.mumuso.com.bd/api/v1/'
}
```

## What This Means

### Session Password Fallback

**Default Value:** `dev-secret-key-change-in-production-min-32-xxx`

**What It Does:**
- Encrypts guest cart session data
- Encrypts authentication tokens
- Used for client cookies

**Why It's Safe for Testing:**
- âœ“ Works fine for development
- âœ“ Good enough for staging/testing
- âš ï¸ NOT secure for production (exposed in source code)

**When to Override:**
- Production deployments
- Sensitive data environments
- When security matters

**How to Override:**
1. Generate a secure random string:
   ```bash
   # Using OpenSSL (Linux/Mac)
   openssl rand -hex 32

   # Using Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

   # Using Python
   python3 -c "import secrets; print(secrets.token_hex(32))"
   ```

2. Set in Vercel: `NUXT_SESSION_PASSWORD=<your-generated-string>`

---

### API Base URL Fallback

**Default Value:** `https://admin.mumuso.com.bd/api/v1/`

**What It Does:**
- Routes all API calls to this endpoint
- Used for products, cart, checkout, blog, etc.

**Why This Fallback Exists:**
- Allows the app to work out-of-box for testing
- Points to a real API for demo purposes
- No broken state - app still functions

**Problems with Fallback:**
- âŒ Points to someone else's API (coderdrivelab.com)
- âŒ Not your database/data
- âŒ Not secure for production
- âŒ Could break if that domain changes

**When to Override:**
- Always for production
- Whenever you have your own API
- When you want to use your own data

**How to Override:**
1. Set your API endpoint
   ```
   NUXT_PUBLIC_API_BASE=https://your-api.example.com/api/v1/
   ```

2. Set in Vercel: `NUXT_PUBLIC_API_BASE=<your-api-url>`

**Important:** Must include `/api/v1/` at the end

---

## Deployment Scenarios

### Scenario 1: Quick Test Deploy (No Config)

```
Environment Variables: (none set)
â†“
Uses Fallback Values
â†“
âœ“ Homepage loads
âœ“ Products show (from coderdrivelab.com)
âœ“ Cart works (with dev password)
âœ“ Everything functions
âœ— But uses demo data, not your data
```

### Scenario 2: Production Deploy (With Config)

```
Environment Variables:
â€¢ NUXT_SESSION_PASSWORD = <your-secure-key>
â€¢ NUXT_PUBLIC_API_BASE = https://your-api.com/api/v1/

â†“
Overrides Fallback Values
â†“
âœ“ Homepage loads
âœ“ Products show (from your API)
âœ“ Cart works (with your session key)
âœ“ Uses YOUR data
âœ“ Secure & production-ready
```

---

## Security Implications

### Using Fallback Values

**Risk Level:** ðŸŸ¡ Medium (for testing/staging)

**Risks:**
- Session password is in source code
- Everyone can see it in git history
- Multiple deployments share same password
- API calls go to someone else's server

**Acceptable For:**
- Local development
- Feature testing
- Staging environment
- Public demo site

**NOT Acceptable For:**
- Production with real users
- Handling sensitive data
- Real e-commerce transactions

### Using Environment Variables

**Risk Level:** ðŸŸ¢ Low (secure)

**Benefits:**
- Unique password per deployment
- Not in source code
- Each environment isolated
- API points to your servers
- Complies with security standards

**Required For:**
- Production sites
- Real transactions
- Handling user data
- Enterprise deployments

---

## Checking Which Config is Active

### In Browser Console

```javascript
// Check which API endpoint is being used
window.__NUXT__?.config?.public?.apiBase
// or
// Check network requests - look at the URL in DevTools â†’ Network tab
```

### In Vercel Logs

1. Go to Vercel Dashboard â†’ Deployments â†’ Click deployment
2. View Function Logs
3. Look for API endpoint in requests (should show your URL if env vars set)

### In Production

```bash
# SSH into Vercel function (if available)
# Check environment variables
env | grep NUXT

# If variables show:
# NUXT_SESSION_PASSWORD=<value>
# NUXT_PUBLIC_API_BASE=<value>
# Then production config is active âœ“

# If variables are empty:
# Then fallback values are being used (check if intended)
```

---

## Troubleshooting

### Problem: Data from coderdrivelab.com showing in production

**Cause:** `NUXT_PUBLIC_API_BASE` environment variable not set

**Solution:**
1. Go to Vercel Dashboard â†’ Settings â†’ Environment Variables
2. Add `NUXT_PUBLIC_API_BASE` with your API URL
3. Trigger redeploy
4. Verify in browser Network tab that API calls go to your domain

### Problem: Cart not persisting

**Cause:** Using development session password (fallback)

**Solution:**
1. Generate secure password: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
2. Add to Vercel Environment Variables: `NUXT_SESSION_PASSWORD=<generated-value>`
3. Redeploy

### Problem: Getting "NUXT_SESSION_PASSWORD required" error

**Cause:** Route tries to access cart without password set AND fallback is missing

**Solution:**
1. Set `NUXT_SESSION_PASSWORD` in Vercel environment variables
2. Or check that fallback value is still in `nuxt.config.ts`

---

## Best Practices

### For Local Development
- Keep default fallback values
- No environment variables needed
- Everything works out-of-box

### For Staging Environment
- Consider setting custom `NUXT_SESSION_PASSWORD`
- Set `NUXT_PUBLIC_API_BASE` to staging API
- Test against real staging data

### For Production
- **MUST** set both environment variables
- Use unique, secure session password
- Point to production API
- Never rely on fallback values

### For Team Collaboration
- Document required environment variables
- Use `.env.example` (already created)
- Never commit `.env` file
- Share env vars securely (1Password, Vercel dashboard, etc.)

---

## Monitoring & Alerts

### What to Monitor

1. **Session Errors**
   - Look in Vercel logs for "NUXT_SESSION_PASSWORD"
   - If you see warnings: environment variable not set

2. **API Errors**
   - Check Network tab in DevTools
   - Verify API URL matches your expectation
   - Look for 404/403 errors from wrong domain

3. **Cart Issues**
   - If guest cart disappears: session password changed
   - If items not saving: check API connection

### Warning Signs

- âŒ API calls to wrong domain
- âŒ Cart data not persisting
- âŒ Login failures
- âŒ "Cannot find package" errors
- âŒ Function invocation failed

---

## Summary

| Aspect | Fallback (Default) | Production (Env Vars) |
|--------|-------------------|----------------------|
| Session Password | Development key | Your secure key |
| API Endpoint | coderdrivelab.com | Your API |
| Data | Demo data | Your data |
| Security | âš ï¸ Not secure | âœ“ Secure |
| Suitable For | Testing | Production |
| When to Use | Now (test) | After setup |

---

**Next Steps:** See `DEPLOYMENT_GUIDE.md` for setting up environment variables in production.
