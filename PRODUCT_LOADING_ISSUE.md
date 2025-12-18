# Product Loading Timing Issues - Analysis & Solutions

## Problems Identified

### 1. **Multiple Loading States (Race Condition)**

**ShopLayoutPage (Product List)**:
- Line 139: Checks `v-if="loadingContent"` (from props)
- Line 236, 245, 259, 270: Uses `loading` (from useProducts() global state)
- Line 501-508: Has `pending` from useAsyncData

Three different loading states that might be out of sync!

**Single Product Page**:
- Line 11: Checks `v-if="loading"` (from useProducts() global state)
- Line 310-317: Uses `useAsyncData` with `pending`
- **Problem**: Template uses global `loading` but data comes from `pending`

### 2. **Why This Causes Timing Issues**

When you navigate between pages:
1. Old product's `loading` state is still `true`
2. New page calls `fetchProduct()` which sets `loading = true`
3. `useAsyncData` is also fetching in parallel
4. They finish at different times → UI flickers between states
5. Skeleton shows/hides unpredictably

Example timeline:
```
Time 1: User clicks product link
Time 2: Old loading = true
Time 3: New fetchProduct() called → loading = true
Time 4: useAsyncData starts fetching → pending = true
Time 5: fetchProduct() finishes → loading = false (TOO EARLY!)
Time 6: useAsyncData still fetching → pending = true (but skeleton hidden!)
Time 7: useAsyncData finishes → pending = false (NOW show content)
```

Result: Content flashes/appears before it's ready, or skeleton shows then vanishes

### 3. **Global State Contamination**

`useProducts()` uses global `useState()`:
```typescript
const loading = useState('products-loading', () => false)
```

This is **shared across ALL components** using useProducts():
- Product list uses it
- Single product page uses it
- When one changes loading state, it affects the other

## Solutions

### **Option A: Use `pending` from useAsyncData (RECOMMENDED)**

The most reliable solution is to use Nuxt's built-in `pending` state from useAsyncData, which is specifically designed for this.

**Single Product Page** - Change:
```typescript
// OLD (from useProducts global state)
const {fetchProduct, loading, error} = useProducts()

// NEW (use pending from useAsyncData)
const {fetchProduct, error} = useProducts()
const {data: asyncProduct, pending: loading} = await useAsyncData(...)
```

Then in template, `loading` will be the `pending` state from useAsyncData.

**ShopLayoutPage** - Change:
```typescript
// OLD
const {loading} = useProducts()

// NEW
const {pending: loading} = await useAsyncData(...)
```

### **Option B: Separate Loading States per Page**

Create independent loading states:
```typescript
const localLoading = ref(false)

const loadProduct = async (slug: string) => {
  localLoading.value = true
  try {
    const data = await fetchProduct(slug)
    product.value = data
  } finally {
    localLoading.value = false
  }
}
```

### **Option C: Debounce Global State Updates**

Delay setting `loading = false` by 100ms to ensure async data is ready:
```typescript
finally {
  setTimeout(() => {
    loading.value = false
  }, 100)
}
```

## Implementation Steps

### For Single Product Page (`app/pages/shop/product/[slug].vue`):

1. Remove import of `loading` from useProducts
2. Use `pending` from useAsyncData for the skeleton check
3. Update template line 11 from `v-if="loading"` to `v-if="pending"`

**Before**:
```typescript
const {fetchProduct, fetchProducts, loading, error} = useProducts()

const { data: asyncProduct, pending } = await useAsyncData(...)
```

**After**:
```typescript
const {fetchProduct, error} = useProducts()

const { data: asyncProduct, pending } = await useAsyncData(
  `product-${route.params.slug}`,
  () => fetchProduct(route.params.slug as string),
  { server: true, watch: [() => route.params.slug] }
)
```

### For ShopLayoutPage (`app/components/Shop/LayoutPage.vue`):

1. Use `pending` from useAsyncData instead of `loading`
2. Pass `pending` to child components if needed
3. Update all references to `loading` to use `pending`

**Before**:
```typescript
const { products, loading, error, fetchProducts } = useProducts()
const { pending } = await useAsyncData(async () => {
  await loadProducts()
}, { server: true, watch: [() => route.query] })
```

**After**:
```typescript
const { products, error, fetchProducts } = useProducts()
const { pending: loading } = await useAsyncData(async () => {
  await loadProducts()
}, { server: true, watch: [() => route.query] })
```

## Why This Fixes the Timing Issues

1. **Single source of truth**: `pending` from useAsyncData is the authoritative loading state
2. **Automatic synchronization**: When data arrives, `pending` is automatically false
3. **No race conditions**: You can't have `pending = false` while data is still loading
4. **Proper hydration**: Server renders with correct state, client hydrates matching state

## Testing After Fix

1. Navigate from product list → product detail → back to list
2. Check that skeleton shows only while loading
3. Verify content appears immediately when ready
4. No flashing or UI jumping

## Files to Modify

1. `app/pages/shop/product/[slug].vue` - Line 11, 294
2. `app/components/Shop/LayoutPage.vue` - Line 139, 236, 245, 259, 270, 297, 501

## Root Cause Summary

The root cause is using the **global loading state** from `useProducts()` instead of the **page-specific loading state** from `useAsyncData()`. Global state can be updated by multiple things concurrently, while `pending` is specifically designed to track that page's data fetching.
