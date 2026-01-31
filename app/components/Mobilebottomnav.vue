<template>
  <div class="mobile-nav-wrapper">
    <!-- Categories Overlay -->
    <transition name="slide-up">
      <div v-if="showCategories" class="categories-overlay" @click="showCategories = false">
        <div class="categories-panel" @click.stop>
          <div class="categories-header">
            <h3>Categories</h3>
            <button @click="showCategories = false" class="close-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="categories-content">
            <div v-for="(category, index) in categories" :key="getCategoryKey(category, index)" class="category-group">
              <div class="category-main" @click="toggleCategory(getCategoryKey(category, index), category)">
                <span class="category-thumb">
                  <NuxtImg
                      v-if="category.image?.original || category.image?.thumb"
                      :src="category.image?.thumb || category.image?.original"
                      :alt="category.label || category.name"
                      width="36"
                      height="36"
                      loading="lazy"
                      format="webp"
                  />
                  <span v-else class="category-fallback">
                    {{ getInitial(category.label || category.name) }}
                  </span>
                </span>
                <span class="category-name">{{ category.label || category.name }}</span>
                <svg
                    v-if="(category.children || category.subcategories || []).length > 0"
                    class="chevron"
                    :class="{ 'rotated': expandedCategory === getCategoryKey(category, index) }"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              <transition name="expand">
                <div v-if="expandedCategory === getCategoryKey(category, index)" class="subcategories">
                  <NuxtLink
                      v-for="sub in (category.children || category.subcategories || [])"
                      :key="sub.id"
                      :to="sub.to || `/categories/${sub.slug}`"
                      class="subcategory-item"
                      @click="showCategories = false"
                  >
                    <span class="subcategory-thumb">
                      <NuxtImg
                          v-if="sub.image?.original || sub.image?.thumb"
                          :src="sub.image?.thumb || sub.image?.original"
                          :alt="sub.label || sub.name"
                          width="24"
                          height="24"
                          loading="lazy"
                          format="webp"
                      />
                      <span v-else class="subcategory-fallback">
                        {{ getInitial(sub.label || sub.name) }}
                      </span>
                    </span>
                    {{ sub.label || sub.name }}
                  </NuxtLink>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Bottom Navigation Bar -->
    <nav class="bottom-nav">
      <NuxtLink to="/" class="nav-item" :class="{ active: currentRoute === '/' }">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span>Home</span>
      </NuxtLink>

      <button @click="showCategories = true" class="nav-item" :class="{ active: showCategories }">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <span>Shop</span>
      </button>

      <CartSidebar>
        <button
            type="button"
            class="nav-item"
            :class="{ active: currentRoute === '/cart' }"
        >
          <span class="cart-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2 2h3l2.4 12.6a2 2 0 0 0 2 1.6h9.6a2 2 0 0 0 2-1.6L23 6H6"></path>
            </svg>
            <span v-if="cartItemsCount > 0" class="cart-badge">
              {{ cartItemsCount }}
            </span>
          </span>
          <span>Cart</span>
        </button>
      </CartSidebar>

      <NuxtLink to="/account" class="nav-item" :class="{ active: currentRoute === '/account' }">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>Account</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showCategories = ref(false)
const expandedCategory = ref(null)
const cart = inject('cart')
const cartItemsCount = computed(() => cart?.cartItemsCount?.value || 0)

const currentRoute = computed(() => route.path)

const { fetchCategories } = useContent()

const normalizeCategoryLinks = (items) => {
  if (!Array.isArray(items)) return []

  return items.map((item) => {
    const normalized = { ...item }

    if (typeof normalized.to === 'string') {
      const match = normalized.to.match(/category=([^&]+)/)
      if (match && match[1]) {
        normalized.to = `/categories/${match[1]}`
      }
    } else if (normalized.slug) {
      normalized.to = `/categories/${normalized.slug}`
    }

    if (Array.isArray(normalized.children)) {
      normalized.children = normalizeCategoryLinks(normalized.children)
    }

    return normalized
  })
}

const categories = ref([])

onMounted(async () => {
  try {
    const rawCategories = await fetchCategories()
    categories.value = normalizeCategoryLinks(rawCategories)
  } catch (error) {
    console.error('Failed to load categories:', error)
    categories.value = []
  }
})

const getCategoryKey = (category, index) => {
  return category?.id ?? category?.slug ?? `${index}`
}

const toggleCategory = (categoryKey, category) => {
  const hasChildren = (category?.children || category?.subcategories || []).length > 0
  if (!hasChildren) return
  expandedCategory.value = expandedCategory.value === categoryKey ? null : categoryKey
}

const getInitial = (name) => {
  if (!name || typeof name !== 'string') return '?'
  return name.trim().charAt(0).toUpperCase()
}
</script>

<style scoped>
.mobile-nav-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

/* Bottom Navigation */
.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 8px 0 max(8px, env(safe-area-inset-bottom));
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #6b7280;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 12px;
  transition: all 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  min-width: 64px;
}

.nav-item:active {
  transform: scale(0.95);
}

.nav-item.active {
  color: #ef4444;
}

.nav-item.active svg {
  stroke: #ef4444;
}

.cart-icon-wrapper {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

/* Categories Overlay */
.categories-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: flex-end;
}

.categories-panel {
  background: white;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.categories-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
}

.categories-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background 0.2s;
}

.close-btn:hover {
  background: #f3f4f6;
}

.categories-content {
  overflow-y: auto;
  flex: 1;
  padding: 8px;
}

.category-group {
  margin-bottom: 8px;
}

.category-main {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f9fafb;
  cursor: pointer;
  transition: all 0.2s;
}

.category-thumb {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: #eef2f7;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.category-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-fallback {
  font-size: 14px;
  font-weight: 600;
  color: #4b5563;
}

.subcategory-thumb {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: #eef2f7;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 10px;
}

.subcategory-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.subcategory-fallback {
  font-size: 11px;
  font-weight: 600;
  color: #4b5563;
}

.category-main:active {
  background: #f3f4f6;
  transform: scale(0.98);
}

.category-icon {
  font-size: 24px;
}

.category-name {
  flex: 1;
  font-weight: 600;
  font-size: 15px;
  color: #111827;
}

.chevron {
  transition: transform 0.2s;
  color: #9ca3af;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.subcategories {
  padding: 8px 0 8px 52px;
  overflow: hidden;
}

.subcategory-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: #4b5563;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;
  font-size: 14px;
}

.subcategory-item:hover,
.subcategory-item:active {
  background: #f3f4f6;
  color: #111827;
}

/* Animations */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: opacity 0.3s;
}

.slide-up-enter-active .categories-panel,
.slide-up-leave-active .categories-panel {
  transition: transform 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
}

.slide-up-enter-from .categories-panel,
.slide-up-leave-to .categories-panel {
  transform: translateY(100%);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 500px;
  opacity: 1;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .mobile-nav-wrapper {
    display: none;
  }
}
</style>

