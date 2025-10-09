<!--<template>-->
<!--  <NuxtLink-->
<!--      :to="`/shop/product/${product.slug}`"-->
<!--      class="group block"-->
<!--  >-->
<!--    <UCard class="hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden">-->
<!--      <template #header>-->
<!--        <div class="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 relative">-->
<!--          &lt;!&ndash; Product Image &ndash;&gt;-->
<!--          <picture>-->
<!--            <source-->
<!--                v-if="product.image_webp"-->
<!--                :srcset="product.image_webp"-->
<!--                type="image/webp"-->
<!--            />-->
<!--            <img-->
<!--                :src="product.image || product.image_thumb"-->
<!--                :alt="product.name"-->
<!--                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"-->
<!--                loading="lazy"-->
<!--                @error="handleImageError"-->
<!--            />-->
<!--          </picture>-->

<!--          &lt;!&ndash; Badges Container &ndash;&gt;-->
<!--          <div class="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">-->
<!--            &lt;!&ndash; Left badges &ndash;&gt;-->
<!--            <div class="flex flex-col gap-2">-->
<!--              <UBadge v-if="product.is_featured" color="warning" variant="solid" size="sm">-->
<!--                <UIcon name="i-heroicons-star-solid" class="w-3 h-3" />-->
<!--                Featured-->
<!--              </UBadge>-->

<!--              <UBadge v-if="!product.in_stock" color="secondary" variant="solid" size="sm">-->
<!--                Out of Stock-->
<!--              </UBadge>-->
<!--            </div>-->

<!--            &lt;!&ndash; Right badges &ndash;&gt;-->
<!--            <div class="flex flex-col gap-2 items-end">-->
<!--              <UBadge v-if="product.has_discount" color="error" variant="solid" size="sm">-->
<!--                -{{ product.discount_percentage }}%-->
<!--              </UBadge>-->
<!--            </div>-->
<!--          </div>-->

<!--          &lt;!&ndash; Quick View Button &ndash;&gt;-->
<!--          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">-->
<!--            <UButton-->
<!--                icon="i-heroicons-eye"-->
<!--                color="success"-->
<!--                variant="solid"-->
<!--                class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100"-->
<!--                @click.prevent="$emit('quick-view', product)"-->
<!--            >-->
<!--              Quick View-->
<!--            </UButton>-->
<!--          </div>-->
<!--        </div>-->
<!--      </template>-->

<!--      &lt;!&ndash; Product Info &ndash;&gt;-->
<!--      <div class="space-y-3 flex-1 flex flex-col p-4">-->
<!--        &lt;!&ndash; Categories &ndash;&gt;-->
<!--        <div v-if="product.categories && product.categories.length > 0" class="flex flex-wrap gap-1">-->
<!--          <UBadge-->
<!--              v-for="category in product.categories.slice(0, 2)"-->
<!--              :key="category.id"-->
<!--              color="primary"-->
<!--              variant="soft"-->
<!--              size="xs"-->
<!--          >-->
<!--            {{ category.name }}-->
<!--          </UBadge>-->
<!--          <UBadge-->
<!--              v-if="product.categories.length > 2"-->
<!--              color="secondary"-->
<!--              variant="soft"-->
<!--              size="xs"-->
<!--          >-->
<!--            +{{ product.categories.length - 2 }}-->
<!--          </UBadge>-->
<!--        </div>-->

<!--        &lt;!&ndash; Product Name &ndash;&gt;-->
<!--        <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-2 text-base">-->
<!--          {{ product.name }}-->
<!--        </h3>-->

<!--        &lt;!&ndash; Rating (if available) &ndash;&gt;-->
<!--        <div v-if="product.rating" class="flex items-center gap-2">-->
<!--          <div class="flex items-center">-->
<!--            <UIcon-->
<!--                v-for="i in 5"-->
<!--                :key="i"-->
<!--                name="i-heroicons-star-solid"-->
<!--                :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-300'"-->
<!--                class="w-4 h-4"-->
<!--            />-->
<!--          </div>-->
<!--          <span class="text-xs text-gray-500">-->
<!--            ({{ product.reviews_count || 0 }})-->
<!--          </span>-->
<!--        </div>-->

<!--        &lt;!&ndash; Stock Status Badge &ndash;&gt;-->
<!--        <div class="flex items-center gap-2">-->
<!--          <UBadge-->
<!--              :color="product.in_stock ? 'success' : 'error'"-->
<!--              variant="soft"-->
<!--              size="xs"-->
<!--          >-->
<!--            <div class="flex items-center gap-1">-->
<!--              <div :class="product.in_stock ? 'bg-green-500' : 'bg-red-500'" class="w-2 h-2 rounded-full" />-->
<!--              {{ product.in_stock ? 'In Stock' : 'Out of Stock' }}-->
<!--            </div>-->
<!--          </UBadge>-->

<!--          <span v-if="product.stock_quantity && product.stock_quantity < 10" class="text-xs text-orange-500">-->
<!--            Only {{ product.stock_quantity }} left!-->
<!--          </span>-->
<!--        </div>-->

<!--        &lt;!&ndash; Price &ndash;&gt;-->
<!--        <div class="flex items-center justify-between pt-2 mt-auto">-->
<!--          <div class="flex items-baseline gap-2">-->
<!--            <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">-->
<!--              ${{ parseFloat(product.price).toFixed(2) }}-->
<!--            </span>-->
<!--            <span v-if="product.compare_price" class="text-sm text-gray-400 line-through">-->
<!--              ${{ parseFloat(product.compare_price).toFixed(2) }}-->
<!--            </span>-->
<!--          </div>-->

<!--          <UButton-->
<!--              icon="i-heroicons-heart"-->
<!--              color="secondary"-->
<!--              variant="ghost"-->
<!--              size="sm"-->
<!--              @click.prevent="$emit('add-to-wishlist', product.id)"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Footer Actions &ndash;&gt;-->
<!--      <template #footer>-->
<!--        <div class="flex gap-2">-->
<!--          <UButton-->
<!--              @click.prevent="$emit('add-to-cart', product.id, 1)"-->
<!--              icon="i-heroicons-shopping-cart"-->
<!--              color="primary"-->
<!--              class="flex-1"-->
<!--              :disabled="!product.in_stock"-->
<!--              :loading="addingToCart"-->
<!--          >-->
<!--            {{ product.in_stock ? 'Add to Cart' : 'Out of Stock' }}-->
<!--          </UButton>-->

<!--          <UButton-->
<!--              icon="i-heroicons-eye"-->
<!--              color="primary"-->
<!--              variant="soft"-->
<!--              @click.prevent="navigateTo(`/shop/product/${product.slug}`)"-->
<!--          />-->
<!--        </div>-->
<!--      </template>-->
<!--    </UCard>-->
<!--  </NuxtLink>-->
<!--</template>-->

<script setup lang="ts">
defineProps<{
  product: any
}>()

const ui = {
  root: 'rounded-none ring-0',
  header: 'sm:px-0 p-0 ring-0 border-0',
  body: 'sm:p-3 border-0',
  footer: 'sm:p-3',
}

defineEmits<{
  'add-to-cart': [productId: number, quantity: number]
  'add-to-wishlist': [productId: number]
  'quick-view': [product: any]
}>()

const addingToCart = ref(false)

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://placehold.co/600x600'
}
</script>

<template>
  <NuxtLink :to="`/shop/product/${product.slug}`" class="block relative">
    <UCard :ui="ui">
      <template #header>
        <picture>
          <source
              v-if="product.image_webp"
              :srcset="product.image_webp"
              type="image/webp"
          />
          <img
              :src="product.image || product.image_thumb"
              :alt="product.name"
              class="aspect-1/1 object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              @error="handleImageError"
          />
        </picture>

        <div class="flex align-center absolute top-3 px-3 justify-between w-full">

          <UBadge v-if="product?.has_discount" color="error" class="rounded-none">-{{ product?.discount_percentage }}%</UBadge>

          <UButton
              icon="i-heroicons-heart"
              color="primary"
              variant="ghost"
              size="md"
              @click.prevent="$emit('add-to-wishlist', product.id)"
          />
        </div>

      </template>

      <!-- Product Name -->
      <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-2 text-base h-13">
        {{ product.name }}
      </h3>


      <template #footer>
        <div class="flex items-center justify-between w-full">

          <!-- Price -->
          <div class="flex items-center justify-between">
            <div class="flex items-baseline gap-2">
            <span v-if="product.compare_price" class="text-sm text-gray-400 line-through">
                      ${{ parseFloat(product.compare_price).toFixed(2) }}
                    </span>
              <span class="text-xl font-bold dark:text-white">
                      ${{ parseFloat(product.price).toFixed(2) }}
                    </span>

            </div>
          </div>

          <UButton
              @click.prevent="$emit('add-to-cart', product.id, 1)"
              :icon="product.in_stock ? 'i-heroicons-shopping-cart' : ''"
              color="primary"
              class=""
              :disabled="!product.in_stock"
              :loading="addingToCart"
              variant="outline"
          />

        </div>
      </template>
    </UCard>
  </NuxtLink>
</template>