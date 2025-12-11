# Quick Start Guide - Coupon System & Guest Checkout

**Last Updated:** December 11, 2025
**Status:** Production Ready ✅

---

## What's New

Complete coupon system with guest checkout payment support for Mumuso e-commerce platform.

### Key Features
✅ Guest users can shop without login
✅ Guest users can apply coupon codes
✅ Guest users can pay via SSLCommerz gateway
✅ Authenticated users can apply coupons
✅ Coupon usage tracked in database
✅ Admin panel shows coupon data

---

## For Shoppers

### Guest Checkout Flow
```
1. Browse products (no login required)
2. Add items to cart
3. Click "Proceed to Checkout"
4. Enter shipping address and email
5. Apply coupon code (optional) - see discount immediately
6. Select shipping method
7. Choose payment method (SSLCommerz or Cash on Delivery)
8. Review order summary
9. Click "Place Order"
10. Redirected to payment gateway
11. Complete payment
12. Order confirmation sent to email
```

### Applying Coupon
```
- In Cart: See coupon input at bottom of order summary
- In Checkout: See coupon input in order summary sidebar
- Enter valid coupon code
- Click "Apply"
- Discount shows immediately
- See updated total
```

### Removing Coupon
```
- Click X button on applied coupon
- Discount removed
- Order total updates
```

### Valid Coupon Examples
```
- SUMMER20 - 20% off
- SAVE50 - $50 off
- WELCOME10 - 10% off first order
```

---

## For Developers

### Frontend Setup
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

### Backend Setup
```bash
# Install dependencies
composer install

# Run migrations (including coupon tables)
php artisan migrate

# Start server
php artisan serve
```

### Key Files

**Frontend:**
- `app/composables/useCoupon.ts` - Coupon state management
- `app/components/CouponInput.vue` - Coupon UI
- `server/api/coupons/validate.post.ts` - Validation endpoint
- `app/pages/checkout.vue` - Checkout logic with coupon support

**Backend:**
- `app/Http/Controllers/Api/PaymentController.php` - Payment handling
- `app/Http/Controllers/Api/CouponController.php` - Coupon validation
- `app/Models/Coupon.php` - Coupon model
- `routes/api.php` - All API routes

### Testing Guest Checkout
```
1. Open browser in incognito mode (no login)
2. Add products to cart
3. Proceed to checkout
4. Enter test address:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Address: 123 Main St
   - City: Any City
   - State: Any State
   - Zip: 12345
5. Apply coupon: SUMMER20
6. Verify discount shows
7. Select "SSLCommerz" payment
8. Click "Place Order"
9. Should redirect to payment gateway
```

### API Endpoints

**Public (No Auth Required):**
```
GET /api/v1/coupons - List all coupons
POST /api/v1/coupons/validate - Validate coupon code
POST /api/v1/coupons/check - Get coupon details
POST /api/v1/payments/initiate - Initiate payment (guest or auth)
POST /api/v1/orders - Create order (guest or auth)
```

**Authenticated Only:**
```
GET /api/v1/cart - Get user cart
POST /api/v1/cart/add - Add to cart
GET /api/v1/payments/status/{transactionId} - Payment status
```

### Coupon Validation Response
```json
{
  "valid": true,
  "discount": 15.50,
  "coupon": {
    "code": "SUMMER20",
    "discount_type": "fixed",
    "discount_value": 15.50,
    "min_amount": 0,
    "is_active": true
  }
}
```

### Error Responses
```json
{
  "valid": false,
  "message": "This coupon code is not valid or has expired"
}
```

---

## For Admins

### Viewing Coupons
1. Log in to Filament admin
2. Navigate to "Coupons" in sidebar
3. See all coupons with usage stats
4. Click coupon to see details and usage history

### Viewing Orders with Coupons
1. Navigate to "Orders" in sidebar
2. See "Coupon Code" column in table
3. Click order to see full coupon details
4. See discount amount in order summary

### Creating Coupon
1. Go to "Coupons"
2. Click "Create"
3. Fill in:
   - Code (e.g., SUMMER20)
   - Discount Type (Fixed or Percentage)
   - Discount Value
   - Expiration date (optional)
   - Min purchase amount (optional)
4. Click "Create"

### Viewing Coupon Usage
1. Open coupon details
2. See "Usage Statistics" section
3. See times used, revenue generated
4. See which orders used this coupon

---

## Troubleshooting

### Issue: Guest can't apply coupon
**Solution:** Ensure coupon is active and hasn't expired in admin panel

### Issue: Coupon shows $0 discount
**Solution:**
- Check if coupon value is correct in database
- Refresh page and try again
- Check browser console for errors

### Issue: Guest payment shows 404
**Solution:**
- Verify backend payment route is public (not behind auth)
- Check PaymentController::initiate() supports guest orders
- Clear backend route cache: `php artisan route:cache`

### Issue: Order created but coupon not saved
**Solution:**
- Check if coupon_code column exists in orders table
- Run migration: `php artisan migrate`
- Verify OrderService applies coupon usage

### Issue: Admin can't see coupon in order
**Solution:**
- Refresh page
- Check if order was created after coupon system deployment
- Verify Filament resources are configured correctly

---

## Database Queries

### View All Coupons
```sql
SELECT * FROM coupons WHERE is_active = 1;
```

### See Coupon Usage
```sql
SELECT
    c.code,
    COUNT(cu.id) as times_used,
    SUM(cu.discount_amount) as total_discount
FROM coupons c
LEFT JOIN coupon_usages cu ON c.id = cu.coupon_id
GROUP BY c.id
ORDER BY times_used DESC;
```

### View Orders with Coupons
```sql
SELECT
    o.id,
    o.coupon_code,
    o.discount_amount,
    o.total_amount,
    o.created_at
FROM orders o
WHERE o.coupon_code IS NOT NULL
ORDER BY o.created_at DESC;
```

### See Guest vs Authenticated Orders
```sql
SELECT
    COUNT(CASE WHEN user_id IS NULL THEN 1 END) as guest_orders,
    COUNT(CASE WHEN user_id IS NOT NULL THEN 1 END) as authenticated_orders
FROM orders;
```

---

## Configuration

### Environment Variables
```bash
# .env (Backend)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mumuso
DB_USERNAME=root
DB_PASSWORD=

# SSL Commerce Settings
SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASS=your_store_password
SSLCOMMERZ_MODE=sandbox  # or production

# Frontend URL for redirects
APP_FRONTEND_URL=http://localhost:3000
```

```bash
# .env (Frontend - .env or nuxt.config.ts)
NUXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api/v1/
BACKEND_API_BASE=http://127.0.0.1:8000/api/v1/
```

---

## Performance

### Expected Load Times
- Coupon validation: < 100ms
- Order creation: < 500ms
- Payment initiation: < 300ms
- Admin load: < 1s

### Optimization Tips
- Enable database query caching
- Use Redis for session storage
- Enable frontend asset compression
- Use CDN for static files

---

## Security Notes

✅ **Guest Orders**
- Guest email is required
- Guest data stored securely
- Confirmation emails sent
- Payment verified through gateway

✅ **Authentication**
- Session tokens required for user operations
- User can only access own orders
- CSRF protection enabled

✅ **Payment**
- SSLCommerz handles payment security
- Payment verification before order processing
- Order status updated only after payment confirmation

✅ **Validation**
- All inputs validated server-side
- Coupon codes validated before applying
- Amount validation before payment

---

## Monitoring

### Key Metrics to Track
- Guest vs authenticated conversion rates
- Coupon usage percentage
- Payment success rate
- Average order value (with vs without coupon)
- Failed payment rate

### Logging
- Check `storage/logs/laravel.log` for backend errors
- Check browser console for frontend errors
- Monitor payment gateway webhook responses
- Track coupon validation failures

---

## Helpful Links

- **Frontend Code:** `/app` directory
- **Backend Code:** `/app` directory in mumuso-admin
- **API Routes:** `/routes/api.php`
- **Migrations:** `/database/migrations`
- **Database Models:** `/app/Models`
- **Admin Panel:** Filament resources in `/app/Filament`
- **Documentation:** Root level `.md` files

---

## Support

For issues or questions:
1. Check documentation files (COUPON_*.md, PAYMENT_*.md)
2. Review code comments in implementation
3. Check error messages in browser console
4. Check Laravel logs in storage/logs
5. Review database records directly

---

## Next Steps (Optional Enhancements)

- [ ] Add coupon code generator UI
- [ ] Implement coupon expiry email alerts
- [ ] Add coupon performance dashboard
- [ ] Implement loyalty points system
- [ ] Add referral coupon system
- [ ] Implement automatic coupon suggestions
- [ ] Add bulk order discounts
- [ ] Implement subscription discounts

---

**Version:** 1.0.0
**Status:** Production Ready ✅
**Last Updated:** December 11, 2025

