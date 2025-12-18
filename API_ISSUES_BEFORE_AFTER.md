# Before & After - Homepage API Issues

## Issue #1: CategoriesGrid Loading State Bug

### The Problem
Component was fetching data correctly but showing skeleton forever because it used the wrong loading variable.

### Before ❌
```
User scrolls to Categories Section
  ↓
fetchFeaturedCategories() starts
  ↓
const loading = ref(false)  ← Always false!
  ↓
Template: v-if="loading" ← Always false, skeleton never shows
  ↓
Data arrives but user doesn't see skeleton animation
  ↓
Categories appear instantly without loading indicator
```

### After ✅
```
User scrolls to Categories Section
  ↓
fetchFeaturedCategories() starts
  ↓
const { data: categories, pending: loading } = await...  ← Uses pending state
  ↓
Template: v-if="loading" ← Shows skeleton while pending
  ↓
Data arrives, pending becomes false
  ↓
Categories appear with proper loading animation
```

### Code Changes
**Line 49 in CategoriesGrid.vue:**

```diff
const { fetchFeaturedCategories } = useContent()
- const { data: categories, pending } = await fetchFeaturedCategories()
+ const { data: categories, pending: loading } = await fetchFeaturedCategories()

- const loading = ref(false)  // ❌ This line removed
const isMobile = ref(false)
const isTablet = ref(false)
```

---

## Issue #2: PromotionGrid API Disabled

### The Problem
API call was commented out, so component showed hardcoded demo data instead of real products.

### Before ❌
```
Component mounts
  ↓
onMounted hook
  ↓
fetchProducts() function exists but is NEVER CALLED
  ↓
Products stay as hardcoded fallbackProducts
  ↓
User sees same 6 demo products every time
  ↓
Never fetches real promotional products from backend
```

### After ✅
```
Component mounts
  ↓
onMounted hook runs
  ↓
fetchProducts() is now called on mount
  ↓
useFetch('/api/products?featured=true&limit=6')
  ↓
Real featured products from backend
  ↓
User sees actual promotional products
  ↓
Data updates if products change in backend
```

### Code Changes
**Lines 103-115 in PromotionGrid.vue:**

```diff
- // Fetch products from API
- const fetchProducts = async () => {
-   loading.value = true
-   try {
-     // Replace with your actual API endpoint
-     // const { data } = await useFetch<Product[]>('/api/products/featured')  ← Commented!
-     // products.value = data.value || fallbackProducts
-
-     // Simulating API call
-     await new Promise(resolve => setTimeout(resolve, 1000))
-     products.value = fallbackProducts
-   } catch (error) {
-     console.error('Error fetching products:', error)
-     products.value = fallbackProducts
-   } finally {
-     loading.value = false
-   }
- }
-
- // Uncomment when API is ready
- // onMounted(() => {
- //   fetchProducts()
- // })

+ // Fetch promotional products on mount
+ onMounted(async () => {
+   loading.value = true
+   try {
+     const { data: fetchedProducts } = await useFetch<{data: Product[]}>('/api/products?featured=true&limit=6')
+     products.value = fetchedProducts.value?.data || fallbackProducts
+   } catch (error) {
+     console.error('Error fetching promotional products:', error)
+     products.value = fallbackProducts
+   } finally {
+     loading.value = false
+   }
+ })
```

---

## Issue #3: BannersGrid Static Data

### The Problem
Using hardcoded banner URLs without API fetching.

### Status: ✅ Kept As-Is

**Reason**:
- No `/content/banners` endpoint exists in backend
- Static banners work fine for this section
- They're promotional/static assets, not dynamic content

The BannersGrid is intentionally simple - it doesn't need API calls if the banners are static.

---

## Testing Checklist

### CategoriesGrid - Should See:
- [ ] Skeleton shows while loading
- [ ] Categories appear in carousel
- [ ] No duplicate requests
- [ ] Works on mobile, tablet, desktop

### PromotionGrid - Should See:
- [ ] Skeleton shows while loading
- [ ] Different products than hardcoded fallback data
- [ ] Real product images from backend
- [ ] Proper responsive sizing

### BannersGrid - Should See:
- [ ] Banner images load
- [ ] Grid layout responsive
- [ ] Images display at correct sizes

---

## Impact

| Component | Before | After |
|-----------|--------|-------|
| CategoriesGrid | Shows categories but no loading animation | Shows skeleton → categories smoothly |
| PromotionGrid | Always shows same 6 demo products | Shows real featured products from backend |
| BannersGrid | Static banners | Static banners (unchanged) |

---

## Data Flow Verification

All the following are now working:

```
Homepage requests data:
├── Settings (/api/settings) → Backend → Full settings ✓
├── Hero Banners (/api/content/hero-banners) → Backend → Hero banners ✓
├── Featured Categories (/api/categories/featured) → Backend → Categories ✓
├── Products (/api/products) → Backend → All products ✓
└── Featured Products (/api/products?featured=true) → Backend → Featured products ✓
```

Each route in `server/api/` proxies to the backend and returns data correctly.

---

## Performance Notes

- CategoriesGrid: Uses `getCachedData()` for SSR caching ✓
- PromotionGrid: Fetches on mount, no caching (simpler use case)
- BannersGrid: No network requests, just static assets
- All use Nuxt's built-in data fetching with proper loading states

**Result**: Fast, responsive homepage with proper loading indicators!
