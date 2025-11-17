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
            <div v-for="category in categories" :key="category.id" class="category-group">
              <div class="category-main" @click="toggleCategory(category.id)">
                <span class="category-icon">{{ category.icon }}</span>
                <span class="category-name">{{ category.name }}</span>
                <svg
                    class="chevron"
                    :class="{ 'rotated': expandedCategory === category.id }"
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
                <div v-if="expandedCategory === category.id" class="subcategories">
                  <NuxtLink
                      v-for="sub in category.subcategories"
                      :key="sub.id"
                      :to="sub.link"
                      class="subcategory-item"
                      @click="showCategories = false"
                  >
                    {{ sub.name }}
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

      <NuxtLink class="nav-item" :class="{ active: currentRoute === '/cart' }">
        <CartSidebar/>
        <span>Cart</span>
      </NuxtLink>

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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showCategories = ref(false)
const expandedCategory = ref(null)
const cart = inject('cart')
const cartItemsCount = computed(() => cart?.cartItemsCount?.value || 0)

const currentRoute = computed(() => route.path)

// Sample categories data - replace with your actual categories
const categories = ref([
  {
    id: 1,
    name: 'Electronics',
    icon: '📱',
    subcategories: [
      { id: 11, name: 'Smartphones', link: '/shop/electronics/smartphones' },
      { id: 12, name: 'Laptops', link: '/shop/electronics/laptops' },
      { id: 13, name: 'Tablets', link: '/shop/electronics/tablets' },
      { id: 14, name: 'Accessories', link: '/shop/electronics/accessories' }
    ]
  },
  {
    id: 2,
    name: 'Fashion',
    icon: '👕',
    subcategories: [
      { id: 21, name: 'Men\'s Clothing', link: '/shop/fashion/men' },
      { id: 22, name: 'Women\'s Clothing', link: '/shop/fashion/women' },
      { id: 23, name: 'Kids\' Clothing', link: '/shop/fashion/kids' },
      { id: 24, name: 'Shoes', link: '/shop/fashion/shoes' }
    ]
  },
  {
    id: 3,
    name: 'Home & Living',
    icon: '🏠',
    subcategories: [
      { id: 31, name: 'Furniture', link: '/shop/home/furniture' },
      { id: 32, name: 'Decor', link: '/shop/home/decor' },
      { id: 33, name: 'Kitchen', link: '/shop/home/kitchen' },
      { id: 34, name: 'Bedding', link: '/shop/home/bedding' }
    ]
  },
  {
    id: 4,
    name: 'Sports & Outdoors',
    icon: '⚽',
    subcategories: [
      { id: 41, name: 'Fitness Equipment', link: '/shop/sports/fitness' },
      { id: 42, name: 'Outdoor Gear', link: '/shop/sports/outdoor' },
      { id: 43, name: 'Team Sports', link: '/shop/sports/team' },
      { id: 44, name: 'Activewear', link: '/shop/sports/activewear' }
    ]
  },
  {
    id: 5,
    name: 'Beauty & Health',
    icon: '💄',
    subcategories: [
      { id: 51, name: 'Skincare', link: '/shop/beauty/skincare' },
      { id: 52, name: 'Makeup', link: '/shop/beauty/makeup' },
      { id: 53, name: 'Haircare', link: '/shop/beauty/haircare' },
      { id: 54, name: 'Wellness', link: '/shop/beauty/wellness' }
    ]
  }
])

const toggleCategory = (categoryId) => {
  expandedCategory.value = expandedCategory.value === categoryId ? null : categoryId
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
  display: block;
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