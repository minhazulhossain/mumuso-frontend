<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <UContainer class="max-w-4xl">
      <!-- Breadcrumb Navigation -->
      <nav class="flex items-center gap-2 mb-4" aria-label="Breadcrumb">
        <ULink to="/" class="text-primary-600 dark:text-primary-400 hover:underline text-xs">Home</ULink>
        <UIcon name="i-heroicons-chevron-right" class="w-3 h-3 text-gray-400"/>
        <ULink to="/account" class="text-primary-600 dark:text-primary-400 hover:underline text-xs">Account</ULink>
        <UIcon name="i-heroicons-chevron-right" class="w-3 h-3 text-gray-400"/>
        <ULink to="/account/orders" class="text-primary-600 dark:text-primary-400 hover:underline text-xs">Orders</ULink>
        <UIcon name="i-heroicons-chevron-right" class="w-3 h-3 text-gray-400"/>
        <span class="text-gray-900 dark:text-white text-xs font-medium">{{ orderNumber }}</span>
      </nav>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <UIcon name="i-heroicons-arrow-path" class="text-3xl text-primary-500 mb-2 animate-spin inline-block"/>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Loading order details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <UIcon name="i-heroicons-exclamation-triangle" class="text-3xl text-red-500 mb-2"/>
        <p class="text-sm text-red-600 dark:text-red-400 mb-2">{{ error }}</p>
        <UButton to="/account/orders" color="primary" size="sm">Back to Orders</UButton>
      </div>

      <!-- Order Details -->
      <div v-else-if="orderData" class="space-y-4">
        <!-- Order Status Header -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Order Number</p>
              <p class="text-sm font-bold text-gray-900 dark:text-white">{{ orderNumber }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Order Date</p>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ orderDate }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Status</p>
              <UBadge :color="getStatusColor(orderData.status)" variant="subtle" size="xs">
                {{ capitalizeFirstLetter(orderData.status) }}
              </UBadge>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Total Amount</p>
              <p class="text-sm font-bold text-primary-500">{{ formatCurrency(total) }}</p>
            </div>
          </div>

          <!-- Payment Status Warning (if unpaid) -->
          <div v-if="orderData?.payment_status === 'pending'" class="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <div class="flex items-start gap-2">
              <UIcon name="i-heroicons-exclamation-triangle" class="text-amber-500 text-lg mt-0.5 flex-shrink-0"/>
              <div class="flex-1">
                <p class="text-sm font-medium text-amber-900 dark:text-amber-100">Payment Pending</p>
                <p class="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
                  Payment is still pending. Please complete payment to proceed.
                </p>
                <UButton
                    @click="handleRetryPayment"
                    :loading="retryPaymentLoading"
                    class="mt-2"
                    size="xs"
                    color="amber"
                    icon="i-heroicons-credit-card"
                >
                  Complete Payment
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h2 class="text-sm font-bold text-gray-900 dark:text-white mb-3">Order Items</h2>
          <div class="space-y-3">
            <div
                v-for="item in orderItems"
                :key="item.id"
                class="flex gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ item.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Qty: {{ item.quantity }} × {{ formatCurrency(item.price) }}
                </p>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="text-sm font-bold text-gray-900 dark:text-white">
                  {{ formatCurrency(item.price * item.quantity) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Price Summary -->
          <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-1 text-sm">
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>{{ formatCurrency(subtotal) }}</span>
            </div>
            <div v-if="couponCode" class="flex justify-between text-green-600 dark:text-green-400">
              <span class="flex items-center gap-1">
                <UIcon name="i-heroicons-check-circle" class="w-4 h-4"/>
                Coupon: <span class="font-medium">{{ couponCode }}</span>
              </span>
              <span>-{{ formatCurrency(discount) }}</span>
            </div>
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping</span>
              <span>{{ shipping === 0 ? 'FREE' : formatCurrency(shipping) }}</span>
            </div>
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Tax</span>
              <span>{{ formatCurrency(tax) }}</span>
            </div>
            <div class="flex justify-between font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
              <span>Total</span>
              <span class="text-primary-500">{{ formatCurrency(total) }}</span>
            </div>
          </div>
        </div>

        <!-- Shipping & Billing Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Shipping Address -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <div class="flex items-center gap-2 mb-3">
              <UIcon name="i-heroicons-truck" class="text-primary-500 text-lg"/>
              <h3 class="text-sm font-bold text-gray-900 dark:text-white">Shipping Address</h3>
            </div>
            <div class="text-gray-600 dark:text-gray-400 space-y-0.5 text-xs">
              <p class="font-medium text-gray-900 dark:text-white">{{ shippingAddress.name }}</p>
              <p>{{ shippingAddress.address1 }}</p>
              <p v-if="shippingAddress.address2">{{ shippingAddress.address2 }}</p>
              <p>{{ shippingAddress.city }}, {{ shippingAddress.state }} {{ shippingAddress.zipCode }}</p>
              <p>{{ shippingAddress.country }}</p>
            </div>
          </div>

          <!-- Billing Address -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <div class="flex items-center gap-2 mb-3">
              <UIcon name="i-heroicons-credit-card" class="text-primary-500 text-lg"/>
              <h3 class="text-sm font-bold text-gray-900 dark:text-white">Billing Address</h3>
            </div>
            <div class="text-gray-600 dark:text-gray-400 space-y-0.5 text-xs">
              <p class="font-medium text-gray-900 dark:text-white">{{ billingAddress.name }}</p>
              <p>{{ billingAddress.address1 }}</p>
              <p v-if="billingAddress.address2">{{ billingAddress.address2 }}</p>
              <p>{{ billingAddress.city }}, {{ billingAddress.state }} {{ billingAddress.zipCode }}</p>
              <p>{{ billingAddress.country }}</p>
            </div>
          </div>
        </div>

        <!-- Payment & Shipping Method -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Payment Method -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <div class="flex items-center gap-2 mb-3">
              <UIcon name="i-heroicons-wallet" class="text-primary-500 text-lg"/>
              <h3 class="text-sm font-bold text-gray-900 dark:text-white">Payment Method</h3>
            </div>
            <div class="text-gray-600 dark:text-gray-400 text-xs">
              <p class="font-medium text-gray-900 dark:text-white">{{ paymentMethod }}</p>
              <p v-if="cardLast4" class="text-xs mt-0.5">
                Card ending in ••{{ cardLast4 }}
              </p>
            </div>
          </div>

          <!-- Shipping Method -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <div class="flex items-center gap-2 mb-3">
              <UIcon name="i-heroicons-cube" class="text-primary-500 text-lg"/>
              <h3 class="text-sm font-bold text-gray-900 dark:text-white">Shipping Method</h3>
            </div>
            <div class="text-gray-600 dark:text-gray-400 text-xs">
              <p class="font-medium text-gray-900 dark:text-white">{{ shippingMethod }}</p>
              <p class="text-xs mt-0.5">{{ shippingDescription }}</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-2 justify-center">
          <UButton to="/account/orders" size="sm" variant="soft" icon="i-heroicons-arrow-left">
            Back to Orders
          </UButton>
          <UButton
              @click="handlePrint"
              size="sm"
              color="secondary"
              icon="i-heroicons-printer"
          >
            Print
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useCurrency } from '#imports'
definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const { fetchOrder, loading: composableLoading, error: composableError } = useOrders()
const { initiatePayment } = usePayment()
const { formatCurrency } = useCurrency()

// Order data state
const orderData = ref(null)
const loading = computed(() => composableLoading.value)
const error = computed(() => composableError.value || error_local.value)
const error_local = ref(null)
const retryPaymentLoading = ref(false)

// Refs for order information
const orderNumber = ref('')
const orderDate = ref('')
const orderItems = ref([])
const shippingAddress = ref({
  name: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zipCode: '',
  country: ''
})
const billingAddress = ref({
  name: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zipCode: '',
  country: ''
})
const paymentMethod = ref('')
const cardLast4 = ref('')
const shippingMethod = ref('')
const shippingDescription = ref('')
const shipping = ref(0)
const couponCode = ref('')
const discount = ref(0)

// Pricing
const subtotal = computed(() => {
  if (orderData.value?.subtotal && orderData.value.subtotal > 0) {
    return Number(orderData.value.subtotal) || 0
  }
  if (orderItems.value.length > 0) {
    return orderItems.value.reduce((sum: number, item: any) => sum + ((item.price || 0) * (item.quantity || 0)), 0)
  }
  return 0
})

const tax = computed(() => {
  if (orderData.value?.tax_amount && orderData.value.tax_amount >= 0) {
    return Number(orderData.value.tax_amount) || 0
  }
  return 0
})

const total = computed(() => {
  if (orderData.value?.total_amount && orderData.value.total_amount > 0) {
    return Number(orderData.value.total_amount) || 0
  }
  const calculated = subtotal.value + (shipping.value || 0) + tax.value
  return calculated > 0 ? calculated : 0
})

// Methods
const capitalizeFirstLetter = (str: string | undefined) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const getStatusColor = (status: string | undefined) => {
  if (!status) return 'gray'
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

const handlePrint = () => {
  window.print()
}

const handleRetryPayment = async () => {
  if (!orderNumber.value) return

  retryPaymentLoading.value = true
  try {
    const paymentResponse = await initiatePayment(parseInt(orderNumber.value))

    if (!paymentResponse) {
      useToast().add({
        title: 'Payment Error',
        description: 'Failed to initiate payment. Please try again.',
        color: 'error'
      })
      return
    }
  } catch (err: any) {
    console.error('Payment retry error:', err)
    useToast().add({
      title: 'Error',
      description: err.message || 'Failed to initiate payment',
      color: 'error'
    })
  } finally {
    retryPaymentLoading.value = false
  }
}

// Load order
const loadOrder = async () => {
  const orderId = route.params.id
  if (!orderId) {
    error_local.value = 'No order ID provided'
    return
  }

  try {
    const order = await fetchOrder(orderId as string)

    if (order) {
      orderData.value = order
      orderNumber.value = order.id || order.order_number || orderId
      orderDate.value = new Date(order.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })

      // Map order items
      orderItems.value = order.items || []

      // Map addresses
      if (order.shipping_address) {
        const addr = order.shipping_address as any
        shippingAddress.value = {
          name: `${addr.first_name || ''} ${addr.last_name || ''}`.trim(),
          address1: addr.address1 || addr.address_line_1 || '',
          address2: addr.address2 || addr.address_line_2 || '',
          city: addr.city || '',
          state: addr.state || '',
          zipCode: addr.zip_code || addr.postal_code || addr.zipCode || '',
          country: addr.country || ''
        }
      }

      if (order.billing_address) {
        const addr = order.billing_address as any
        billingAddress.value = {
          name: `${addr.first_name || ''} ${addr.last_name || ''}`.trim(),
          address1: addr.address1 || addr.address_line_1 || '',
          address2: addr.address2 || addr.address_line_2 || '',
          city: addr.city || '',
          state: addr.state || '',
          zipCode: addr.zip_code || addr.postal_code || addr.zipCode || '',
          country: addr.country || ''
        }
      }

      // Map payment info
      paymentMethod.value = order.payment_method || 'Unknown'
      cardLast4.value = order.card_last4 || ''

      // Map shipping info
      shippingMethod.value = order.shipping_method || 'Standard Shipping'
      shippingDescription.value = order.shipping_description || '5-7 business days'
      shipping.value = order.shipping_cost || order.shipping_amount || 0

      // Map coupon & discount info
      couponCode.value = order.coupon_code || ''
      discount.value = order.discount_amount || 0
    } else {
      error_local.value = 'Order not found'
    }
  } catch (err: any) {
    error_local.value = err.message || 'Failed to load order'
    console.error('Order loading error:', err)
  }
}

// Watch for route changes
watch(
  () => route.params.id,
  () => {
    loadOrder()
  }
)

// Load on mount
onMounted(() => {
  loadOrder()
})

// SEO
useSeoMeta({
  title: `Order ${orderNumber.value} - My Orders`,
  description: 'View your order details'
})
</script>

<style scoped>
@media print {
  nav, button {
    display: none !important;
  }
}
</style>
