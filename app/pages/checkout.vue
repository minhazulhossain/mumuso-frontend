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

      <!-- Main Checkout Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              @next="handleNext"
              @previous="handlePrevious"
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
        <div class="lg:col-span-1">
          <CheckoutOrderSummary
              :cart-items="cartItems || []"
              :shipping-cost="shippingCost"
              :tax-rate="0"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">

const toast = useToast()
const router = useRouter()
const { loggedIn } = useAuth()
const { user } = useUserSession()
const { addresses, fetchAddresses, createAddress } = useAddresses()
const cart = inject('cart')
const { cartItems } = cart
const { initiatePayment } = usePayment()
const { createOrder } = useOrders()
const { shippingMethods, fetchMethodsByLocation, loading: shippingLoading } = useShipping()

// Fetch saved addresses on mount
onMounted(async () => {
  if (loggedIn.value) {
    await fetchAddresses()
  }
  if (!cartItems.value || cartItems.value.length === 0) {
    toast.add({
      title: 'Cart is empty',
      description: 'Add some products before checkout',
      color: 'warning'
    })
    router.push('/shop')
  }
})

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
  state: '',
  zipCode: '',
  country: 'US',
  phone: ''
})

// Billing Address
const billingAddress = ref({
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'US',
  phone: ''
})

const sameAsShipping = ref(true)

// Shipping Methods - Updated to use computed from API
const selectedShippingMethod = ref<number | null>(null)

// Fetch shipping methods when shipping address country/state changes
watch([() => shippingAddress.value.country, () => shippingAddress.value.state], async () => {
  if (shippingAddress.value.country) {
    await fetchMethodsByLocation({
      country: shippingAddress.value.country,
      state: shippingAddress.value.state,
      postal_code: shippingAddress.value.zipCode
    })
  }
})

// Set first shipping method as default once loaded
watch(shippingMethods, (methods) => {
  if (methods.length > 0 && selectedShippingMethod.value === null) {
    selectedShippingMethod.value = methods[0].id
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

// Coupon state
const appliedCoupon = ref({
  code: '',
  discount: 0
})

// Breadcrumb
const breadcrumbLinks = [
  { label: 'Home', to: '/' },
  { label: 'Cart', to: '/cart' },
  { label: 'Checkout', to: '/checkout' }
]

// Computed
const shippingCost = computed(() => {
  if (!Array.isArray(shippingMethods.value)) return 0
  const method = shippingMethods.value.find(m => m.id === selectedShippingMethod.value)
  return method?.cost || 0
})

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
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handlePlaceOrder = async () => {
  if (!validateStep2()) {
    return
  }

  processingOrder.value = true

  try {
    const billingAddr = sameAsShipping.value ? shippingAddress.value : billingAddress.value

    console.log('User session:', user.value)
    console.log('Is logged in:', loggedIn.value)
    console.log('User ID:', user.value?.id)

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
      paymentMethod: selectedPaymentMethod.value,
      orderNotes: orderNotes.value || '',
      shippingCost: shippingCost.value || 0,
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

    console.log('Final order object to send:', order)
    console.log('Order user_id:', order.user_id)
    console.log('Order user:', order.user)

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