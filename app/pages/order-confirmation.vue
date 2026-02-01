<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <UContainer class="max-w-4xl">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <UIcon name="i-heroicons-arrow-path" class="text-3xl text-primary-500 mb-2 animate-spin inline-block"/>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Loading your order details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <UIcon name="i-heroicons-exclamation-triangle" class="text-3xl text-red-500 mb-2"/>
        <p class="text-sm text-red-600 dark:text-red-400 mb-2">{{ error }}</p>
        <UButton to="/shop" color="primary" size="sm">Continue Shopping</UButton>
      </div>

      <!-- Success Message -->
      <div v-else class="text-center mb-4">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mb-2">
          <UIcon name="i-heroicons-check-circle" class="text-4xl text-green-500"/>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Order Confirmed!
        </h1>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Thank you for your purchase. Your order has been received.
        </p>
      </div>

      <!-- Order Details Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
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
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Est. Delivery</p>
            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ estimatedDelivery }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Total Amount</p>
            <p class="text-sm font-bold text-primary-500">{{ formatCurrency(total) }}</p>
          </div>
        </div>

        <!-- Confirmation Email Notice -->
        <div class="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div class="flex items-start gap-2">
            <UIcon name="i-heroicons-envelope" class="text-blue-500 text-lg mt-0.5 flex-shrink-0"/>
            <div>
              <p class="text-sm font-medium text-blue-900 dark:text-blue-100">Confirmation Email Sent</p>
              <p class="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                We've sent a confirmation to <strong>{{ customerEmail }}</strong>.
              </p>
            </div>
          </div>
        </div>

        <!-- Payment Status Warning (if unpaid) -->
        <div v-if="paymentStatus === 'unpaid'" class="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
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
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
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
          <div class="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Shipping</span>
            <span>{{ formatCurrency(shipping) }}</span>
          </div>
          <div class="flex justify-between text-gray-600 dark:text-gray-400">
            <span>VAT (7.5%)</span>
            <span>{{ formatCurrency(tax) }}</span>
          </div>
          <div class="flex justify-between font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
            <span>Total</span>
            <span class="text-primary-500">{{ formatCurrency(total) }}</span>
          </div>
        </div>
      </div>

      <!-- Shipping & Billing Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            <p>{{ getDistrictLabel(shippingAddress.city) }}, {{ getDivisionLabel(shippingAddress.state) }} {{ shippingAddress.zipCode }}</p>
            <p>{{ getCountryLabel(shippingAddress.country) }}</p>
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
            <p>{{ getDistrictLabel(billingAddress.city) }}, {{ getDivisionLabel(billingAddress.state) }} {{ billingAddress.zipCode }}</p>
            <p>{{ getCountryLabel(billingAddress.country) }}</p>
          </div>
        </div>
      </div>

      <!-- Payment & Shipping Method -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

      <!-- Next Steps -->
      <div class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-sm p-4 text-white mb-4">
        <h2 class="text-lg font-bold mb-3">What's Next?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="flex gap-2">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="font-bold text-sm">1</span>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-semibold mb-0.5">Order Processing</h3>
              <p class="text-xs text-white/90">Preparing for shipment</p>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="font-bold text-sm">2</span>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-semibold mb-0.5">Shipping Notification</h3>
              <p class="text-xs text-white/90">Tracking info via email</p>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="font-bold text-sm">3</span>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-semibold mb-0.5">Delivery</h3>
              <p class="text-xs text-white/90">Enjoy your purchase!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-2 justify-center mb-4">
        <UButton to="/" size="sm" variant="soft" icon="i-heroicons-home">
          Home
        </UButton>
        <UButton to="/shop" size="sm" variant="soft" icon="i-heroicons-shopping-bag">
          Shop
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

      <!-- Support -->
      <div class="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Need help?</p>
        <UButton to="/support" variant="link" size="sm" icon="i-heroicons-question-mark-circle">
          Contact Support
        </UButton>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { getCountryLabel, getDivisionLabel, getDistrictLabel } from '#shared/utils/address-display'
import { useCurrency } from '#imports'
const route = useRoute()
const router = useRouter()
const toast = useToast()
const { fetchOrder, loading: composableLoading, error: composableError } = useOrders()
const { initiatePayment } = usePayment()
const { formatCurrency } = useCurrency()

// Order data state
const orderData = ref(null)
const loading = computed(() => composableLoading.value)
const error = computed(() => composableError.value || error_local.value)
const error_local = ref(null)
const paymentStatus = ref<string | null>(null)
const retryPaymentLoading = ref(false)

// Refs for order information (will be populated from API)
const orderNumber = ref('')
const customerEmail = ref('')
const orderDate = ref('')
const estimatedDelivery = ref('')
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

// Pricing - use order data if available, otherwise calculate
const subtotal = computed(() => {
  if (orderData.value?.subtotal && orderData.value.subtotal > 0) {
    return Number(orderData.value.subtotal) || 0
  }
  if (orderItems.value.length > 0) {
    return orderItems.value.reduce((sum: number, item: any) => sum + ((item.price || 0) * (item.quantity || 0)), 0)
  }
  return 0
})

const VAT_RATE = 7.5

const tax = computed(() => {
  if (orderData.value?.tax_amount && orderData.value.tax_amount >= 0) {
    return Number(orderData.value.tax_amount) || 0
  }
  return (subtotal.value * VAT_RATE) / 100
})

const total = computed(() => {
  if (orderData.value?.total_amount && orderData.value.total_amount > 0) {
    return Number(orderData.value.total_amount) || 0
  }
  const calculated = subtotal.value + (shipping.value || 0) + tax.value
  return calculated > 0 ? calculated : 0
})

// Methods
const handlePrint = () => {
  window.print()
}

// Retry payment for unpaid orders
const handleRetryPayment = async () => {
  if (!orderNumber.value) return

  retryPaymentLoading.value = true
  try {
    const paymentResponse = await initiatePayment(parseInt(orderNumber.value))

    if (!paymentResponse) {
      toast.add({
        title: 'Payment Error',
        description: 'Failed to initiate payment. Please try again.',
        color: 'error'
      })
      return
    }
    // User will be automatically redirected to SSLCommerz payment gateway
  } catch (err: any) {
    console.error('Payment retry error:', err)
    toast.add({
      title: 'Error',
      description: err.message || 'Failed to initiate payment',
      color: 'error'
    })
  } finally {
    retryPaymentLoading.value = false
  }
}

// Fetch order data
const loadOrder = async () => {
  if (!route.query.order) {
    error_local.value = 'No order ID provided'
    console.error('No order ID in URL query')
    return
  }

  // Capture payment status from URL
  paymentStatus.value = route.query.paymentStatus as string || null

  try {
    console.log('Loading order:', route.query.order)
    console.log('Payment status:', paymentStatus.value)
    const order = await fetchOrder(route.query.order as string)
    console.log('Order fetched:', order)

    if (order) {
      // Map order data to refs
      orderData.value = order
      console.log('Full order object:', order)
      orderNumber.value = order.id || order.order_number || route.query.order
      console.log('Order number:', orderNumber.value)
      // Extract email with multiple fallbacks
      customerEmail.value =
        order.customer_email ||
        order.contact?.email ||
        order.shipping_address?.email ||
        order.billing_address?.email ||
        'Email not available'
      console.log('Customer email:', customerEmail.value)
      console.log('Customer email sources - customer_email:', order.customer_email, 'contact.email:', order.contact?.email, 'shipping email:', order.shipping_address?.email)
      console.log('Order date string:', order.created_at)
      orderDate.value = new Date(order.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      // Calculate estimated delivery (7 days from order date)
      const deliveryDate = new Date(order.created_at)
      deliveryDate.setDate(deliveryDate.getDate() + 7)
      estimatedDelivery.value = deliveryDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      // Map order items
      orderItems.value = order.items || []
      console.log('Order items mapped:', orderItems.value)

      // Map addresses - handle both snake_case and camelCase field names
      console.log('Shipping address from order:', order.shipping_address)
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
        console.log('Mapped shipping address:', shippingAddress.value)
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
        console.log('Mapped billing address:', billingAddress.value)
      }

      // Map payment info
      paymentMethod.value = order.payment_method || route.query.paymentMethod || 'Unknown'
      cardLast4.value = order.card_last4 || ''

      // Map shipping info
      shippingMethod.value = order.shipping_method || 'Standard Shipping'
      shippingDescription.value = order.shipping_description || '5-7 business days'
      shipping.value = order.shipping_cost || order.shipping_amount || 0
      console.log('Shipping value set to:', shipping.value)
    } else {
      error_local.value = 'Order not found'
    }
  } catch (err: any) {
    error_local.value = err.message || 'Failed to load order'
    console.error('Order loading error:', err)
  }
}

// Load order on mount
onMounted(() => {
  loadOrder()
})

// SEO
useSeoMeta({
  title: `Order Confirmation - ${orderNumber.value}`,
  description: 'Your order has been confirmed and is being processed'
})
</script>

<style scoped>
@media print {
  /* Hide navigation and unnecessary elements when printing */
  nav, footer, button {
    display: none !important;
  }
}
</style>
