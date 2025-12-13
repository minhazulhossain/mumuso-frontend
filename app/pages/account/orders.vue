<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <UContainer>
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order History</h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ totalOrders > 0 ? `You have ${totalOrders} ${totalOrders === 1 ? 'order' : 'orders'}` : 'View and manage your orders' }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-16">
        <div class="text-center">
          <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 animate-spin text-primary-500 mx-auto mb-4"/>
          <p class="text-gray-600 dark:text-gray-400">Loading your orders...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-4"/>
        <h2 class="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">Error Loading Orders</h2>
        <p class="text-red-700 dark:text-red-300 mb-4">{{ error }}</p>
        <UButton @click="loadOrders" color="error" variant="soft">
          Try Again
        </UButton>
      </div>

      <!-- Empty State -->
      <div v-else-if="orders.length === 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
          <UIcon name="i-heroicons-shopping-bag" class="w-10 h-10 text-gray-400"/>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Orders Yet</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">You haven't placed any orders yet. Start shopping to see your order history here.</p>
        <UButton to="/shop" icon="i-heroicons-shopping-bag">
          Continue Shopping
        </UButton>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-6">
        <!-- Filter & Sort -->
        <div class="flex flex-col gap-4 mb-6">
          <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div class="flex gap-2 flex-wrap">
              <UButton
                :color="selectedStatus === null ? 'primary' : 'gray'"
                :variant="selectedStatus === null ? 'solid' : 'outline'"
                size="sm"
                @click="selectedStatus = null; currentPage = 1"
              >
                All Orders
              </UButton>
              <UButton
                v-for="status in orderStatuses"
                :key="status"
                :color="selectedStatus === status ? 'primary' : 'gray'"
                :variant="selectedStatus === status ? 'solid' : 'outline'"
                size="sm"
                @click="selectedStatus = status; currentPage = 1"
              >
                {{ capitalizeFirstLetter(status) }}
              </UButton>
            </div>
            <USelectMenu
              v-model="sortBy"
              :items="sortOptions"
              placeholder="Sort by..."
              size="sm"
              class="w-full md:w-40"
            />
          </div>
          <!-- Results Info -->
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Showing {{ itemsStartIndex + 1 }} to {{ itemsEndIndex }} of {{ filteredOrders.length }} orders
          </div>
        </div>

        <!-- Orders Grid -->
        <div class="space-y-4">
          <div
            v-for="order in paginatedOrders"
            :key="order.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <!-- Order Header -->
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Order Number</p>
                  <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ order.order_number }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Date</p>
                  <p class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ formatDate(order.created_at) }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Total</p>
                  <p class="text-lg font-semibold text-primary-600 dark:text-primary-400">
                    ${{ order.total_amount.toFixed(2) }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                  <div class="flex gap-2 flex-wrap">
                    <UBadge :color="getStatusColor(order.status)" variant="subtle">
                      {{ capitalizeFirstLetter(order.status) }}
                    </UBadge>
                    <UBadge :color="getPaymentStatusColor(order.payment_status)" variant="subtle">
                      {{ capitalizeFirstLetter(order.payment_status) }}
                    </UBadge>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Items -->
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Items ({{ order.items.length }})</h3>
              <div class="space-y-3">
                <div
                  v-for="item in order.items.slice(0, 2)"
                  :key="item.id"
                  class="flex gap-4"
                >
                  <div v-if="item.image" class="flex-shrink-0">
                    <NuxtImg
                      :src="item.image"
                      :alt="item.name"
                      class="w-12 h-12 object-cover rounded-lg"
                      width="48"
                      height="48"
                      loading="lazy"
                      format="webp"
                    />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ item.name }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Qty: {{ item.quantity }} × ${{ item.price.toFixed(2) }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">
                      ${{ (item.price * item.quantity).toFixed(2) }}
                    </p>
                  </div>
                </div>
                <div v-if="order.items.length > 2" class="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <button
                    @click="expandedOrder = expandedOrder === order.id ? null : order.id"
                    class="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {{ expandedOrder === order.id ? 'Show less' : `Show ${order.items.length - 2} more items` }}
                  </button>
                </div>
              </div>

              <!-- Expanded Items -->
              <div v-if="expandedOrder === order.id && order.items.length > 2" class="mt-4 space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div
                  v-for="item in order.items.slice(2)"
                  :key="item.id"
                  class="flex gap-4"
                >
                  <div v-if="item.image" class="flex-shrink-0">
                    <NuxtImg
                      :src="item.image"
                      :alt="item.name"
                      class="w-12 h-12 object-cover rounded-lg"
                      width="48"
                      height="48"
                      loading="lazy"
                      format="webp"
                    />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ item.name }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Qty: {{ item.quantity }} × ${{ item.price.toFixed(2) }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">
                      ${{ (item.price * item.quantity).toFixed(2) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Footer -->
            <div class="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Payment: <span class="font-medium text-gray-900 dark:text-white">{{ order.payment_method }}</span>
              </div>
              <div class="flex gap-2 w-full md:w-auto">
                <UButton
                  :to="`/order-confirmation?order=${order.id}`"
                  variant="outline"
                  color="primary"
                  size="sm"
                  icon="i-heroicons-eye"
                  class="flex-1 md:flex-none"
                >
                  View Details
                </UButton>
                <UButton
                  v-if="order.payment_status === 'pending'"
                  @click="retryPayment(order.id)"
                  color="amber"
                  size="sm"
                  icon="i-heroicons-credit-card"
                  :loading="payingOrderId === order.id"
                  class="flex-1 md:flex-none"
                >
                  Pay Now
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Page {{ currentPage }} of {{ totalPages }}
          </div>
          <div class="flex gap-2">
            <UButton
              :disabled="currentPage === 1"
              variant="outline"
              size="sm"
              icon="i-heroicons-chevron-left"
              @click="previousPage"
            >
              Previous
            </UButton>
            <div class="flex items-center gap-2">
              <span v-for="page in visiblePages" :key="page" class="text-sm">
                <UButton
                  v-if="page === '...'"
                  variant="ghost"
                  size="sm"
                  disabled
                >
                  ...
                </UButton>
                <UButton
                  v-else
                  :color="currentPage === page ? 'primary' : 'gray'"
                  :variant="currentPage === page ? 'soft' : 'outline'"
                  size="sm"
                  :label="`${page}`"
                  @click="currentPage = page"
                />
              </span>
            </div>
            <UButton
              :disabled="currentPage === totalPages"
              variant="outline"
              size="sm"
              icon="i-heroicons-chevron-right"
              icon-trailing
              @click="nextPage"
            >
              Next
            </UButton>
          </div>
          <USelectMenu
            v-model="itemsPerPage"
            :items="itemsPerPageOptions"
            placeholder="Items per page"
            size="sm"
            class="w-full md:w-40"
            @change="currentPage = 1"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const toast = useToast()
const { user } = useUserSession()
const { initiatePayment } = usePayment()
const { fetchOrders, loading: ordersLoading } = useOrders()

const orders = ref([])
const loading = ref(false)
const error = ref<string | null>(null)
const selectedStatus = ref<string | null>(null)
const expandedOrder = ref<number | null>(null)
const payingOrderId = ref<number | null>(null)
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(5)

const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Highest Price', value: 'highest' },
  { label: 'Lowest Price', value: 'lowest' }
]
const itemsPerPageOptions = [
  { label: '5 per page', value: 5 },
  { label: '10 per page', value: 10 },
  { label: '15 per page', value: 15 },
  { label: '20 per page', value: 20 }
]

const paginationMeta = ref({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
  from: 0,
  to: 0
})

const totalOrders = computed(() => paginationMeta.value.total)

// Orders are already filtered and paginated by backend
const filteredOrders = computed(() => orders.value)

const totalPages = computed(() => paginationMeta.value.last_page || 1)

const itemsStartIndex = computed(() => (paginationMeta.value.from || 1) - 1)
const itemsEndIndex = computed(() => paginationMeta.value.to || paginationMeta.value.per_page)

// Orders are already paginated by backend, use as-is
const paginatedOrders = computed(() => orders.value)

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const maxVisible = 5

  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)

    if (currentPage.value > 3) {
      pages.push('...')
    }

    const start = Math.max(2, currentPage.value - 1)
    const end = Math.min(totalPages.value - 1, currentPage.value + 1)

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i)
      }
    }

    if (currentPage.value < totalPages.value - 2) {
      pages.push('...')
    }

    pages.push(totalPages.value)
  }

  return pages
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'amber'
    case 'processing':
      return 'blue'
    case 'shipped':
      return 'cyan'
    case 'delivered':
      return 'green'
    case 'cancelled':
      return 'red'
    default:
      return 'gray'
  }
}

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'amber'
    case 'paid':
      return 'green'
    case 'failed':
      return 'red'
    case 'refunded':
      return 'blue'
    default:
      return 'gray'
  }
}

const loadOrders = async () => {
  loading.value = true
  error.value = null
  try {
    const result = await fetchOrders(currentPage.value, itemsPerPage.value, {
      status: selectedStatus.value
    })

    // Orders are already filtered and paginated by backend
    orders.value = result.data || []
    paginationMeta.value = result.meta

    console.log(`[Orders Page] Loaded ${orders.value.length} orders for user`, {
      page: result.meta?.current_page,
      total: result.meta?.total,
      perPage: result.meta?.per_page
    })
  } catch (err: any) {
    error.value = err.message || 'Failed to load orders'
    console.error('[Orders Page] Error loading orders:', err)
  } finally {
    loading.value = false
  }
}

const retryPayment = async (orderId: number) => {
  payingOrderId.value = orderId
  try {
    const paymentResponse = await initiatePayment(orderId)
    if (!paymentResponse) {
      toast.add({
        title: 'Payment Error',
        description: 'Failed to initiate payment. Please try again.',
        color: 'error'
      })
    }
    // User will be redirected to payment gateway if successful
  } catch (err: any) {
    console.error('Payment error:', err)
    toast.add({
      title: 'Error',
      description: err.message || 'Failed to initiate payment',
      color: 'error'
    })
  } finally {
    payingOrderId.value = null
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  loadOrders()
})

useSeoMeta({
  title: 'Order History - My Account',
  description: 'View and manage your orders'
})
</script>
