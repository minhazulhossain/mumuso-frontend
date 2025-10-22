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

          <!-- Step 1: Contact Information -->
          <ContactInformationForm
              v-if="currentStep === 1"
              v-model="contactInfo"
              @next="handleNext"
          />

          <!-- Step 2: Shipping Information -->
          <ShippingAddressForm
              v-if="currentStep === 2"
              v-model="shippingAddress"
              v-model:selected-shipping-method="selectedShippingMethod"
              :shipping-methods="shippingMethods"
              @next="handleNext"
              @previous="handlePrevious"
          />

          <!-- Step 3: Payment Information -->
          <div v-if="currentStep === 3" class="space-y-6">
            <!-- Billing Address -->
            <BillingAddressForm
                v-model="billingAddress"
                v-model:same-as-shipping="sameAsShipping"
            />

            <!-- Payment Method -->
            <PaymentMethodForm
                v-model="paymentInfo"
                v-model:selected-payment-method="selectedPaymentMethod"
            />

            <!-- Order Notes -->
            <OrderNotes v-model="orderNotes" />

            <!-- Terms and Conditions -->
            <TermsAcceptance v-model="agreedToTerms" />

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
          <OrderSummary
              :cart-items="cartItems || []"
              :shipping-cost="shippingCost"
              :tax-rate="10"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import ContactInformationForm from '~/components/checkout/ContactInformationForm.vue'
import ShippingAddressForm from '~/components/checkout/ShippingAddressForm.vue'
import BillingAddressForm from '~/components/checkout/BillingAddressForm.vue'
import PaymentMethodForm from '~/components/checkout/PaymentMethodForm.vue'
import OrderSummary from '~/components/checkout/OrderSummary.vue'
import OrderNotes from '~/components/checkout/OrderNotes.vue'
import TermsAcceptance from '~/components/checkout/TermsAcceptance.vue'

const toast = useToast()
const router = useRouter()
const { cartItems } = useCart()

// Stepper steps configuration
const steps = [
  {
    value: 1,
    title: 'Contact',
    description: 'Your contact information',
    icon: 'i-heroicons-envelope'
  },
  {
    value: 2,
    title: 'Shipping',
    description: 'Delivery address',
    icon: 'i-heroicons-truck'
  },
  {
    value: 3,
    title: 'Payment',
    description: 'Payment details',
    icon: 'i-heroicons-credit-card'
  }
]

const currentStep = ref(1)

// Contact Information
const contactInfo = ref({
  email: '',
  phone: '',
  subscribeNewsletter: false
})

// Shipping Address
const shippingAddress = ref({
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'US'
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
  country: 'US'
})

const sameAsShipping = ref(true)

// Shipping Methods
const shippingMethods = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 0
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: 12.99
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day',
    price: 24.99
  }
]

const selectedShippingMethod = ref('standard')

// Payment
const selectedPaymentMethod = ref('card')
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

// Breadcrumb
const breadcrumbLinks = [
  { label: 'Home', to: '/' },
  { label: 'Cart', to: '/cart' },
  { label: 'Checkout', to: '/checkout' }
]

// Computed
const shippingCost = computed(() => {
  const method = shippingMethods.find(m => m.id === selectedShippingMethod.value)
  return method?.price || 0
})

// Validation functions
const validateStep1 = () => {
  if (!contactInfo.value.email || !contactInfo.value.phone) {
    toast.add({
      title: 'Missing information',
      description: 'Please fill in all required fields',
      color: 'error'
    })
    return false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(contactInfo.value.email)) {
    toast.add({
      title: 'Invalid email',
      description: 'Please enter a valid email address',
      color: 'error'
    })
    return false
  }

  return true
}

const validateStep2 = () => {
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
  return true
}

const validateStep3 = () => {
  if (!agreedToTerms.value) {
    toast.add({
      title: 'Terms required',
      description: 'Please agree to the terms and conditions',
      color: 'error'
    })
    return false
  }

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

  if (isValid && currentStep.value < 3) {
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
  if (!validateStep3()) {
    return
  }

  processingOrder.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))

  processingOrder.value = false

  // Create order object
  const order = {
    contact: contactInfo.value,
    shipping: shippingAddress.value,
    billing: sameAsShipping.value ? shippingAddress.value : billingAddress.value,
    shippingMethod: selectedShippingMethod.value,
    paymentMethod: selectedPaymentMethod.value,
    items: cartItems.value,
    orderNotes: orderNotes.value,
    shippingCost: shippingCost.value,
    orderNumber: `ORD-${Date.now()}`,
    orderDate: new Date().toISOString()
  }

  console.log('Order placed:', order)

  toast.add({
    title: 'Order placed successfully!',
    description: `Order #${order.orderNumber}`,
    color: 'success',
    icon: 'i-heroicons-check-circle'
  })

  // Redirect to order confirmation
  await router.push(`/order-confirmation?order=${order.orderNumber}`)
}

// Redirect if cart is empty
onMounted(() => {
  if (!cartItems.value || cartItems.value.length === 0) {
    toast.add({
      title: 'Cart is empty',
      description: 'Add some products before checkout',
      color: 'warning'
    })
    router.push('/shop')
  }
})

// SEO
useSeoMeta({
  title: 'Checkout - Complete Your Purchase',
  description: 'Secure checkout process for your order'
})
</script>