<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <UContainer>
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order History</h1>
        <p class="text-gray-600 dark:text-gray-400">View and manage your orders</p>
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
      <div v-else class="space-y-4">
        <!-- Filter & Sort -->
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div class="flex gap-2">
            <UButton
              v-for="status in orderStatuses"
              :key="status"
              :color="selectedStatus === status ? 'primary' : 'gray'"
              :variant="selectedStatus === status ? 'solid' : 'outline'"
              size="sm"
              @click="selectedStatus = selectedStatus === status ? null : status"
            >
              {{ status === null ? 'All Orders' : capitalizeFirstLetter(status) }}
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

        <!-- Orders Grid -->
        <div class="space-y-4">
          <div
            v-for="order in filteredOrders"
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
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const toast = useToast()
const { initiatePayment } = usePayment()
const { fetchOrders, loading: ordersLoading } = useOrders()

const orders = ref([])
const loading = ref(false)
const error = ref<string | null>(null)
const selectedStatus = ref<string | null>(null)
const expandedOrder = ref<number | null>(null)
const payingOrderId = ref<number | null>(null)
const sortBy = ref('newest')

const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Highest Price', value: 'highest' },
  { label: 'Lowest Price', value: 'lowest' }
]

const filteredOrders = computed(() => {
  let filtered = orders.value

  // Filter by status
  if (selectedStatus.value) {
    filtered = filtered.filter(order => order.status === selectedStatus.value)
  }

  // Sort
  switch (sortBy.value) {
    case 'oldest':
      return filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    case 'highest':
      return filtered.sort((a, b) => b.total_amount - a.total_amount)
    case 'lowest':
      return filtered.sort((a, b) => a.total_amount - b.total_amount)
    case 'newest':
    default:
      return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }
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
    const result = await fetchOrders()
    orders.value = result || []
  } catch (err: any) {
    error.value = err.message || 'Failed to load orders'
    console.error('Error loading orders:', err)
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

onMounted(() => {
  loadOrders()
})

useSeoMeta({
  title: 'Order History - My Account',
  description: 'View and manage your orders'
})
</script>
