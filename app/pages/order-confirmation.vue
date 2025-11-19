<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <UContainer class="max-w-4xl">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <UIcon name="i-heroicons-arrow-path" class="text-4xl text-primary-500 mb-4 animate-spin inline-block"/>
        <p class="text-gray-600 dark:text-gray-400 mt-4">Loading your order details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <UIcon name="i-heroicons-exclamation-triangle" class="text-4xl text-red-500 mb-4"/>
        <p class="text-red-600 dark:text-red-400 mb-4">{{ error }}</p>
        <UButton to="/shop" color="primary">Continue Shopping</UButton>
      </div>

      <!-- Success Message -->
      <div v-else class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
          <UIcon name="i-heroicons-check-circle" class="text-5xl text-green-500"/>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Order Confirmed!
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Thank you for your purchase. Your order has been received.
        </p>
      </div>

      <!-- Order Details Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Order Number</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">{{ orderNumber }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Order Date</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ orderDate }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Estimated Delivery</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ estimatedDelivery }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Amount</p>
            <p class="text-xl font-bold text-primary-500">${{ total.toFixed(2) }}</p>
          </div>
        </div>

        <!-- Confirmation Email Notice -->
        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div class="flex items-start gap-3">
            <UIcon name="i-heroicons-envelope" class="text-blue-500 text-xl mt-0.5"/>
            <div>
              <p class="font-medium text-blue-900 dark:text-blue-100">Confirmation Email Sent</p>
              <p class="text-sm text-blue-700 dark:text-blue-300 mt-1">
                We've sent a confirmation email to <strong>{{ customerEmail }}</strong> with your order details and tracking information.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Items -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Items</h2>
        <div class="space-y-4">
          <div
              v-for="item in orderItems"
              :key="item.id"
              class="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
          >
            <img
                :src="item.image"
                :alt="item.name"
                class="w-20 h-20 object-cover rounded-lg"
            />
            <div class="flex-1">
              <p class="font-semibold text-gray-900 dark:text-white">{{ item.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Quantity: {{ item.quantity }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                ${{ item.price.toFixed(2) }} each
              </p>
            </div>
            <div class="text-right">
              <p class="font-bold text-gray-900 dark:text-white">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Price Summary -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <div class="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Subtotal</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Shipping</span>
            <span>{{ shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}` }}</span>
          </div>
          <div class="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Tax</span>
            <span>${{ tax.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
            <span>Total</span>
            <span class="text-primary-500">${{ total.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <!-- Shipping & Billing Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Shipping Address -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex items-center gap-2 mb-4">
            <UIcon name="i-heroicons-truck" class="text-primary-500 text-xl"/>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">Shipping Address</h3>
          </div>
          <div class="text-gray-600 dark:text-gray-400 space-y-1">
            <p class="font-medium text-gray-900 dark:text-white">{{ shippingAddress.name }}</p>
            <p>{{ shippingAddress.address1 }}</p>
            <p v-if="shippingAddress.address2">{{ shippingAddress.address2 }}</p>
            <p>{{ shippingAddress.city }}, {{ shippingAddress.state }} {{ shippingAddress.zipCode }}</p>
            <p>{{ shippingAddress.country }}</p>
          </div>
        </div>

        <!-- Billing Address -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex items-center gap-2 mb-4">
            <UIcon name="i-heroicons-credit-card" class="text-primary-500 text-xl"/>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">Billing Address</h3>
          </div>
          <div class="text-gray-600 dark:text-gray-400 space-y-1">
            <p class="font-medium text-gray-900 dark:text-white">{{ billingAddress.name }}</p>
            <p>{{ billingAddress.address1 }}</p>
            <p v-if="billingAddress.address2">{{ billingAddress.address2 }}</p>
            <p>{{ billingAddress.city }}, {{ billingAddress.state }} {{ billingAddress.zipCode }}</p>
            <p>{{ billingAddress.country }}</p>
          </div>
        </div>
      </div>

      <!-- Payment & Shipping Method -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Payment Method -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex items-center gap-2 mb-4">
            <UIcon name="i-heroicons-wallet" class="text-primary-500 text-xl"/>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">Payment Method</h3>
          </div>
          <div class="text-gray-600 dark:text-gray-400">
            <p class="font-medium text-gray-900 dark:text-white">{{ paymentMethod }}</p>
            <p v-if="cardLast4" class="text-sm mt-1">
              Card ending in ••{{ cardLast4 }}
            </p>
          </div>
        </div>

        <!-- Shipping Method -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex items-center gap-2 mb-4">
            <UIcon name="i-heroicons-cube" class="text-primary-500 text-xl"/>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">Shipping Method</h3>
          </div>
          <div class="text-gray-600 dark:text-gray-400">
            <p class="font-medium text-gray-900 dark:text-white">{{ shippingMethod }}</p>
            <p class="text-sm mt-1">{{ shippingDescription }}</p>
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-sm p-8 text-white mb-6">
        <h2 class="text-2xl font-bold mb-4">What's Next?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex gap-3">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span class="font-bold text-lg">1</span>
              </div>
            </div>
            <div>
              <h3 class="font-semibold mb-1">Order Processing</h3>
              <p class="text-sm text-white/90">We're preparing your order for shipment</p>
            </div>
          </div>
          <div class="flex gap-3">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span class="font-bold text-lg">2</span>
              </div>
            </div>
            <div>
              <h3 class="font-semibold mb-1">Shipping Notification</h3>
              <p class="text-sm text-white/90">You'll receive tracking info via email</p>
            </div>
          </div>
          <div class="flex gap-3">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span class="font-bold text-lg">3</span>
              </div>
            </div>
            <div>
              <h3 class="font-semibold mb-1">Delivery</h3>
              <p class="text-sm text-white/90">Enjoy your purchase!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton to="/" size="lg" variant="soft" icon="i-heroicons-home">
          Back to Home
        </UButton>
        <UButton to="/shop" size="lg" variant="soft" icon="i-heroicons-shopping-bag">
          Continue Shopping
        </UButton>
        <UButton
            @click="handlePrint"
            size="lg"
            color="secondary"
            icon="i-heroicons-printer"
        >
          Print Order
        </UButton>
      </div>

      <!-- Support -->
      <div class="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p class="text-gray-600 dark:text-gray-400 mb-2">Need help with your order?</p>
        <UButton to="/support" variant="link" icon="i-heroicons-question-mark-circle">
          Contact Support
        </UButton>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { fetchOrder } = useOrders()

// Order data state
const orderData = ref(null)
const loading = ref(true)
const error = ref(null)

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

// Pricing
const subtotal = computed(() => {
  return orderItems.value.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
})

const tax = computed(() => (subtotal.value * 10) / 100)
const total = computed(() => subtotal.value + shipping.value + tax.value)

// Methods
const handlePrint = () => {
  window.print()
}

// Fetch order data
const loadOrder = async () => {
  if (!route.query.order) {
    error.value = 'No order ID provided'
    loading.value = false
    return
  }

  try {
    const order = await fetchOrder(route.query.order as string)

    if (order) {
      // Map order data to refs
      orderData.value = order
      orderNumber.value = order.id || order.order_number || route.query.order
      customerEmail.value = order.customer_email || order.contact?.email || ''
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

      // Map addresses
      if (order.shipping_address) {
        shippingAddress.value = {
          name: `${order.shipping_address.first_name || ''} ${order.shipping_address.last_name || ''}`.trim(),
          address1: order.shipping_address.address1 || '',
          address2: order.shipping_address.address2 || '',
          city: order.shipping_address.city || '',
          state: order.shipping_address.state || '',
          zipCode: order.shipping_address.zip_code || order.shipping_address.postal_code || '',
          country: order.shipping_address.country || ''
        }
      }

      if (order.billing_address) {
        billingAddress.value = {
          name: `${order.billing_address.first_name || ''} ${order.billing_address.last_name || ''}`.trim(),
          address1: order.billing_address.address1 || '',
          address2: order.billing_address.address2 || '',
          city: order.billing_address.city || '',
          state: order.billing_address.state || '',
          zipCode: order.billing_address.zip_code || order.billing_address.postal_code || '',
          country: order.billing_address.country || ''
        }
      }

      // Map payment info
      paymentMethod.value = order.payment_method || route.query.paymentMethod || 'Unknown'
      cardLast4.value = order.card_last4 || ''

      // Map shipping info
      shippingMethod.value = order.shipping_method || 'Standard Shipping'
      shippingDescription.value = order.shipping_description || '5-7 business days'
      shipping.value = order.shipping_cost || 0
    } else {
      error.value = 'Order not found'
    }
  } catch (err: any) {
    error.value = err.message || 'Failed to load order'
    console.error('Order loading error:', err)
  } finally {
    loading.value = false
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