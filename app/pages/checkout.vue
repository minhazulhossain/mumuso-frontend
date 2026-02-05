<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <UContainer>
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Checkout</h1>
        <UBreadcrumb :links="breadcrumbLinks" class="mt-2"/>
      </div>

      <!-- Stepper -->
      <div class="mb-8">
        <UStepper
            v-model="currentStep"
            :items="steps"
            class="max-w-3xl mx-auto"
            color="primary"
        />
      </div>

      <!-- Loading State -->
      <div v-if="!cartInitialized || cartLoading" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Forms Skeleton -->
        <div class="lg:col-span-2 space-y-4">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <USkeleton class="h-5 w-48 mb-4" />
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <USkeleton class="h-10 w-full" />
              <USkeleton class="h-10 w-full" />
              <USkeleton class="h-10 w-full" />
              <USkeleton class="h-10 w-full" />
            </div>
            <USkeleton class="h-10 w-full mt-4" />
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <USkeleton class="h-5 w-40 mb-4" />
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <USkeleton class="h-10 w-full" />
              <USkeleton class="h-10 w-full" />
              <USkeleton class="h-10 w-full" />
              <USkeleton class="h-10 w-full" />
            </div>
          </div>
        </div>

        <!-- Summary Skeleton -->
        <div class="lg:col-span-1 space-y-4">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <USkeleton class="h-10 w-full" />
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <USkeleton class="h-5 w-40 mb-6" />
            <USkeleton class="h-10 w-full mb-4" />
            <div class="space-y-3">
              <USkeleton class="h-4 w-full" />
              <USkeleton class="h-4 w-5/6" />
              <USkeleton class="h-4 w-4/6" />
            </div>
            <USkeleton class="h-10 w-full mt-6" />
          </div>
        </div>
      </div>

      <!-- Main Checkout Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Side - Forms (2 columns) -->
        <div class="lg:col-span-2">

          <!-- Step 2: Shipping Information -->
          <CheckoutShippingAddressForm
              v-if="currentStep === 1"
              v-model="shippingAddress"
              v-model:selected-shipping-method="selectedShippingMethod"
              :shipping-methods="shippingMethods"
              :saved-addresses="addresses"
              :show-saved-addresses="loggedIn"
              :show-email="!loggedIn"
              :loading="shippingLoading"
              :disable-next="!canProceedToPayment"
              @next="handleNext"
              @previous="handlePrevious"
              previous-label="Back to cart"
          />

          <!-- Step 3: Payment Information -->
          <div v-if="currentStep === 2" class="space-y-6">
            <!-- Billing Address -->
            <CheckoutBillingAddressForm
                v-model="billingAddress"
                v-model:same-as-shipping="sameAsShipping"
                :saved-addresses="addresses"
                :show-saved-addresses="loggedIn"
            />

            <!-- Payment Method -->
            <CheckoutPaymentMethodForm
                v-model="paymentInfo"
                v-model:selected-payment-method="selectedPaymentMethod"
                :methods="paymentMethods"
                :loading="paymentMethodsLoading"
                :error="Boolean(paymentMethodsError)"
                :refresh-methods="refreshPaymentMethods"
            />

            <!-- Order Notes -->
            <CheckoutOrderNotes v-model="orderNotes" />

            <!-- Terms and Conditions -->
            <CheckoutTermsAcceptance v-model="agreedToTerms" />

            <!-- Navigation Buttons -->
            <div class="flex justify-between">
              <UButton
                  @click="handlePrevious"
                  variant="soft"
                  size="lg"
                  icon="i-heroicons-arrow-left"
              >
                Back to Shipping
              </UButton>
              <UButton
                  @click="handlePlaceOrder"
                  :disabled="!agreedToTerms || processingOrder"
                  :loading="processingOrder"
                  size="lg"
                  icon="i-heroicons-lock-closed"
              >
                Place Order
              </UButton>
            </div>
          </div>
        </div>

        <!-- Right Side - Order Summary (1 column) -->
        <div class="lg:col-span-1 space-y-4">
          <!-- Coupon Input -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <CouponInput
                :amount="cartTotal"
            />
          </div>

          <!-- Order Summary -->
          <CheckoutOrderSummary
              :cart-items="cartItems || []"
              :shipping-cost="shippingCost"
              :show-shipping="showShippingLine"
              :tax-rate="VAT_RATE"
              :applied-coupon="appliedCoupon"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useCurrency } from '#imports'
import { usePaymentMethods } from '~/composables/usePaymentMethods'
import { calculateTax } from '#shared/utils/cart-helpers'

const toast = useToast()
const router = useRouter()
const { loggedIn } = useAuth()
const { user } = useUserSession()
const { addresses, fetchAddresses, createAddress } = useAddresses()
const cart = inject('cart')
const { cartItems, isLoading: cartLoading, cartInitialized, fetchCart } = cart
const { initiatePayment } = usePayment()
const { createOrder } = useOrders()
const { shippingMethods, fetchMethodsByLocation, loading: shippingLoading } = useShipping()
const { currency } = useCurrency()
const { couponState } = useCoupon()

// Fetch saved addresses on mount
onMounted(async () => {
  if (loggedIn.value) {
    await fetchAddresses()
  }
  if (!cartInitialized.value && !cartLoading.value) {
    await fetchCart()
  }
})

watch([cartInitialized, cartItems, cartLoading], ([initialized, items, loading]) => {
  if (!initialized || loading) return
  if (!items || items.length === 0) {
    toast.add({
      title: 'Cart is empty',
      description: 'Add some products before checkout',
      color: 'warning'
    })
    router.push('/shop')
  }
}, { immediate: true })

// Stepper steps configuration
const steps = [
  {
    value: 1,
    title: 'Shipping',
    description: 'Delivery address',
    icon: 'i-heroicons-truck'
  },
  {
    value: 2,
    title: 'Payment',
    description: 'Payment details',
    icon: 'i-heroicons-credit-card'
  }
]

const currentStep = ref(1)

// Contact Information
// const contactInfo = ref({
//   email: '',
//   phone: '',
//   subscribeNewsletter: false
// })

// Shipping Address
const shippingAddress = ref({
  firstName: '',
  lastName: '',
  email: '',
  address1: '',
  address2: '',
  city: '',
  thana: '',
  state: '',
  zipCode: '',
  country: 'BD',
  phone: ''
})

// Billing Address
const billingAddress = ref({
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  thana: '',
  state: '',
  zipCode: '',
  country: 'BD',
  phone: ''
})

const sameAsShipping = ref(true)

// Shipping Methods - Updated to use computed from API
const selectedShippingMethod = ref<number | null>(null)

// Fetch shipping methods when shipping address country/state changes
watch(
  () => [
    shippingAddress.value.country,
    shippingAddress.value.state,
    shippingAddress.value.city,
    shippingAddress.value.thana,
    shippingAddress.value.zipCode
  ],
  async ([country, state, district, thana, postalCode]) => {
    if (!country || !district) return

    await fetchMethodsByLocation({
      country,
      state,
      district,
      thana,
      postal_code: postalCode
    })
  }
)

// Set first shipping method as default once loaded
watch(shippingMethods, (methods) => {
  if (methods.length > 0 && selectedShippingMethod.value === null) {
    selectedShippingMethod.value = methods[0].id
  } else if (!methods.length) {
    selectedShippingMethod.value = null
  }
}, { immediate: true })

// Payment
const selectedPaymentMethod = ref('sslcommerz')
const paymentInfo = ref({
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: '',
  saveCard: false
})

// Other
const orderNotes = ref('')
const agreedToTerms = ref(false)
const processingOrder = ref(false)

const {
  methods: paymentMethods,
  loading: paymentMethodsLoading,
  error: paymentMethodsError,
  refresh: refreshPaymentMethods,
  hasActive: hasActivePaymentMethod
} = usePaymentMethods()

const selectedPaymentMethodDetails = computed(() => {
  return paymentMethods.value.find((method) => method.id === selectedPaymentMethod.value)
})

watch(paymentMethods, (methods) => {
  if (!methods.length) {
    selectedPaymentMethod.value = ''
    return
  }

  const currentlySelected = methods.find((method) => method.id === selectedPaymentMethod.value)
  if (currentlySelected && currentlySelected.active) return

  const firstActive = methods.find((method) => method.active) ?? methods[0]
  selectedPaymentMethod.value = firstActive?.id ?? ''
}, { immediate: true })

// Coupon state (shared across cart/checkout)
const appliedCoupon = computed(() => ({
  code: couponState.value.code || '',
  discount: couponState.value.discount || 0
}))

// Breadcrumb
const breadcrumbLinks = [
  { label: 'Home', to: '/' },
  { label: 'Cart', to: '/cart' },
  { label: 'Checkout', to: '/checkout' }
]

// Computed
const cartTotal = computed(() => {
  if (!cartItems.value || cartItems.value.length === 0) return 0
  return cartItems.value.reduce((total: number, item: any) => {
    const price = item.pricing?.final_price || item.variation?.price || item.product?.price || item.price || 0
    return total + (price * (item.quantity || 0))
  }, 0)
})

const VAT_RATE = 7.5

const taxableSubtotal = computed(() => {
  const discount = appliedCoupon.value.discount || 0
  const subtotal = cartTotal.value || 0
  return Math.max(0, subtotal - discount)
})

const vatAmount = computed(() => {
  const amount = calculateTax(taxableSubtotal.value, VAT_RATE)
  return parseFloat(amount.toFixed(2))
})

const shippingCost = computed(() => {
  if (!Array.isArray(shippingMethods.value)) return 0
  const method = shippingMethods.value.find(m => m.id === selectedShippingMethod.value)
  return method?.cost || 0
})

const selectedShippingMethodDetails = computed(() => {
  return shippingMethods.value.find(m => m.id === selectedShippingMethod.value)
})

const isFreeShippingSelected = computed(() => {
  const method = selectedShippingMethodDetails.value
  if (!method) return false
  const cost = Number(method.cost ?? method.price ?? 0)
  return method.is_free === true || cost === 0
})

const showShippingLine = computed(() => {
  if (shippingCost.value > 0) return true
  return isFreeShippingSelected.value
})

const hasShippingMethods = computed(() => Array.isArray(shippingMethods.value) && shippingMethods.value.length > 0)
const isShippingMethodSelected = computed(() => {
  if (!hasShippingMethods.value) return false
  return shippingMethods.value.some((method) => method.id === selectedShippingMethod.value)
})
const canProceedToPayment = computed(() => !shippingLoading.value && hasShippingMethods.value && isShippingMethodSelected.value)

// Validation functions
// const validateStep1 = () => {
//   if (!contactInfo.value.email || !contactInfo.value.phone) {
//     toast.add({
//       title: 'Missing information',
//       description: 'Please fill in all required fields',
//       color: 'error'
//     })
//     return false
//   }
//
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//   if (!emailRegex.test(contactInfo.value.email)) {
//     toast.add({
//       title: 'Invalid email',
//       description: 'Please enter a valid email address',
//       color: 'error'
//     })
//     return false
//   }
//
//   return true
// }

const validateStep1 = () => {
  if (!shippingAddress.value.firstName || !shippingAddress.value.lastName ||
      !shippingAddress.value.address1 || !shippingAddress.value.city ||
      !shippingAddress.value.state || !shippingAddress.value.zipCode) {
    toast.add({
      title: 'Missing information',
      description: 'Please fill in all required shipping fields',
      color: 'error'
    })
    return false
  }

  // Only validate email for guest users
  if (!loggedIn.value) {
    if (!shippingAddress.value.email) {
      toast.add({
        title: 'Email required',
        description: 'Please enter your email address',
        color: 'error'
      })
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(shippingAddress.value.email)) {
      toast.add({
        title: 'Invalid email',
        description: 'Please enter a valid email address',
        color: 'error'
      })
      return false
    }
  }

  if (shippingLoading.value) {
    toast.add({
      title: 'Shipping methods loading',
      description: 'Please wait until shipping methods are available.',
      color: 'warning'
    })
    return false
  }

  if (!hasShippingMethods.value) {
    toast.add({
      title: 'Shipping method required',
      description: 'No shipping methods are available for this address.',
      color: 'error'
    })
    return false
  }

  if (!isShippingMethodSelected.value) {
    toast.add({
      title: 'Select a shipping method',
      description: 'Please choose a shipping method to continue.',
      color: 'error'
    })
    return false
  }

  return true
}

const validateStep2 = () => {
  if (!agreedToTerms.value) {
    toast.add({
      title: 'Terms required',
      description: 'Please agree to the terms and conditions',
      color: 'error'
    })
    return false
  }

  // Card validation only for credit card method
  if (selectedPaymentMethod.value === 'card') {
    if (!paymentInfo.value.cardNumber || !paymentInfo.value.cardName ||
        !paymentInfo.value.expiryDate || !paymentInfo.value.cvv) {
      toast.add({
        title: 'Payment information required',
        description: 'Please fill in all payment details',
        color: 'error'
      })
      return false
    }
  }

  // Cash on Delivery and SSLCommerz don't require card details
  // They are validated on the payment gateway side

  return true
}

// Navigation methods
const handleNext = () => {
  let isValid = false

  if (currentStep.value === 1) {
    isValid = validateStep1()
  } else if (currentStep.value === 2) {
    isValid = validateStep2()
  }

  if (isValid && currentStep.value < 2) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handlePrevious = () => {
  if (currentStep.value === 1) {
    router.push('/cart')
    return
  }

  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handlePlaceOrder = async () => {
  if (!validateStep2()) {
    return
  }

  if (!paymentMethods.value.length || !hasActivePaymentMethod.value) {
    toast.add({
      title: 'Payment unavailable',
      description: 'No active payment methods are configured right now. Please try again later.',
      color: 'error'
    })
    return
  }

  const activeMethod = selectedPaymentMethodDetails.value
  if (!activeMethod || !activeMethod.active) {
    toast.add({
      title: 'Select a valid payment method',
      description: 'Please choose an enabled payment method before placing your order.',
      color: 'error'
    })
    return
  }

  processingOrder.value = true

  try {
    const billingAddr = sameAsShipping.value ? shippingAddress.value : billingAddress.value

    // Step 1: Create order object matching server expectations
    const order = {
      // User info (only send for guest checkout, logged-in users have email in session)
      ...(loggedIn.value ? {
        user_id: user.value?.id
      } : {
        user: {
          first_name: shippingAddress.value.firstName,
          last_name: shippingAddress.value.lastName,
          email: shippingAddress.value.email || user.value?.email || '',
          phone: shippingAddress.value.phone
        }
      }),
      shipping: shippingAddress.value,
      billing: billingAddr,
      sameAsShipping: sameAsShipping.value,
      contact: {
        email: shippingAddress.value.email || '',
        phone: shippingAddress.value.phone || ''
      },
      currency: currency.value,
      paymentMethod: selectedPaymentMethod.value,
      orderNotes: orderNotes.value || '',
      shippingCost: shippingCost.value || 0,
      vat_amount: vatAmount.value,
      discount_amount: appliedCoupon.value.discount || 0,
      coupon_code: appliedCoupon.value.code || null,
      items: cartItems.value && cartItems.value.length > 0 ? cartItems.value.map((item: any) => {
        // Get product_id from multiple possible sources
        const productId = item.product?.id || item.product_id || item.id
        // Get price - prioritize pricing info, then variation, then product, then item price
        const price = item.pricing?.final_price || item.variation?.price || item.product?.price || item.price

        return {
          product_id: productId,
          quantity: item.quantity,
          unit_price: price || 0
        }
      }) : []
    }

    console.log('[Checkout] Final coupon state before order creation:', {
      appliedCoupon: appliedCoupon.value,
      timestamp: new Date().toISOString()
    })

    console.log('[Checkout] Final order object to send:', {
      user_id: order.user_id,
      user: order.user,
      coupon_code: order.coupon_code,
      discount_amount: order.discount_amount,
      items_count: order.items?.length,
      shipping_cost: order.shippingCost,
      vat_amount: order.vat_amount,
      timestamp: new Date().toISOString()
    })

    // Step 1: Create order in backend
    const orderResponse = await createOrder(order)

    if (!orderResponse) {
      toast.add({
        title: 'Error',
        description: 'Failed to create order. Please try again.',
        color: 'error'
      })
      return
    }

    const orderId = orderResponse.id

    // Clear cart after successful order creation
    await cart.clearCart()

    // Step 2: Handle payment based on selected method
    if (selectedPaymentMethod.value === 'sslcommerz') {
      if (!activeMethod?.configured) {
        toast.add({
          title: 'SSL not ready',
          description: 'SSLCommerz is currently disabled. Please pick another payment method.',
          color: 'error'
        })
        return
      }

      // Initiate SSLCommerz payment gateway
      const paymentResponse = await initiatePayment(orderId)

      if (!paymentResponse) {
        // Payment initiation failed - show order created with payment unpaid status
        toast.add({
          title: 'Order Created',
          description: `Order #${orderId} created but payment initiation failed. You can pay later.`,
          color: 'warning'
        })
        await router.push(`/order-confirmation?order=${orderId}&paymentStatus=unpaid`)
        return
      }
      // User will be automatically redirected to SSLCommerz payment gateway
      // After payment completion, SSLCommerz will redirect back to success/failed/cancelled page
    } else if (selectedPaymentMethod.value === 'cash') {
      // Handle Cash on Delivery - no payment gateway needed
      toast.add({
        title: 'Order placed successfully!',
        description: `Order #${orderId} - Pay when delivery arrives`,
        color: 'success',
        icon: 'i-heroicons-check-circle'
      })
      await router.push(`/order-confirmation?order=${orderId}&paymentMethod=cash`)
    } else {
      // Handle other payment methods (card, paypal, apple pay)
      toast.add({
        title: 'Order placed successfully!',
        description: `Order #${orderId}`,
        color: 'success',
        icon: 'i-heroicons-check-circle'
      })
      await router.push(`/order-confirmation?order=${orderId}`)
    }
  } catch (error: any) {
    console.error('Order placement error:', error)
    toast.add({
      title: 'Order Error',
      description: error.message || 'Failed to process order. Please try again.',
      color: 'error'
    })
  } finally {
    processingOrder.value = false
  }
}

// SEO
useSeoMeta({
  title: 'Checkout - Complete Your Purchase',
  description: 'Secure checkout process for your order'
})
</script>
