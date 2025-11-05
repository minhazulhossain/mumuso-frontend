# SSLCommerz Payment Integration - Usage Examples

## Frontend Implementation Examples

### 1. Using Payment in Checkout Page

```vue
<template>
  <div>
    <UButton
      @click="handleProceedToPayment"
      :loading="paymentLoading"
      size="xl"
      block
    >
      Proceed to Payment
    </UButton>
  </div>
</template>

<script setup lang="ts">
const { initiatePayment } = usePayment()
const toast = useToast()

const orderId = ref(123) // Your order ID
const paymentLoading = ref(false)

const handleProceedToPayment = async () => {
  paymentLoading.value = true

  try {
    const response = await initiatePayment(orderId.value)

    if (!response) {
      toast.add({
        title: 'Payment Error',
        description: 'Failed to initiate payment. Please try again.',
        color: 'error'
      })
    }
    // If successful, user will be redirected to SSLCommerz gateway automatically
  } catch (error) {
    toast.add({
      title: 'Payment Error',
      description: 'Something went wrong. Please try again.',
      color: 'error'
    })
  } finally {
    paymentLoading.value = false
  }
}
</script>
```

### 2. Checking Payment Status

```vue
<script setup lang="ts">
const route = useRoute()
const { getPaymentStatus } = usePayment()

const paymentData = ref(null)
const loading = ref(true)

onMounted(async () => {
  const transactionId = route.query.transaction_id as string

  if (transactionId) {
    const response = await getPaymentStatus(transactionId)

    if (response && response.success) {
      paymentData.value = response.data
    }

    loading.value = false
  }
})
</script>
```

### 3. Complete Checkout Flow Example

```vue
<template>
  <div class="checkout-page">
    <!-- Step 1: Order Summary -->
    <div v-if="step === 1">
      <h2>Order Summary</h2>
      <!-- Order items, totals, etc. -->
      <UButton @click="step = 2">Continue to Shipping</UButton>
    </div>

    <!-- Step 2: Shipping Information -->
    <div v-if="step === 2">
      <h2>Shipping Information</h2>
      <!-- Shipping form -->
      <UButton @click="step = 3">Continue to Payment</UButton>
    </div>

    <!-- Step 3: Payment -->
    <div v-if="step === 3">
      <h2>Payment</h2>

      <!-- Order Summary Card -->
      <UCard class="mb-6">
        <template #header>
          <h3 class="font-semibold">Order Total</h3>
        </template>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Subtotal:</span>
            <span>${{ orderTotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Shipping:</span>
            <span>${{ shipping.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span>${{ (orderTotal + shipping).toFixed(2) }}</span>
          </div>
        </div>
      </UCard>

      <!-- Payment Methods Info -->
      <UCard class="mb-6">
        <template #header>
          <h3 class="font-semibold">We Accept</h3>
        </template>
        <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
          <div class="text-center">
            <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">
              <span class="text-sm">Visa</span>
            </div>
          </div>
          <div class="text-center">
            <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">
              <span class="text-sm">Master</span>
            </div>
          </div>
          <div class="text-center">
            <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">
              <span class="text-sm">bKash</span>
            </div>
          </div>
          <div class="text-center">
            <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">
              <span class="text-sm">Nagad</span>
            </div>
          </div>
          <div class="text-center">
            <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">
              <span class="text-sm">Rocket</span>
            </div>
          </div>
          <div class="text-center">
            <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded">
              <span class="text-sm">Bank</span>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Place Order Button -->
      <UButton
        @click="handlePlaceOrder"
        :loading="isProcessing"
        size="xl"
        block
        icon="i-heroicons-lock-closed"
      >
        Proceed to Secure Payment
      </UButton>

      <p class="text-sm text-gray-500 text-center mt-4">
        <UIcon name="i-heroicons-shield-check" class="inline" />
        Your payment is secured by SSLCommerz
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { initiatePayment } = usePayment()
const toast = useToast()

const step = ref(1)
const isProcessing = ref(false)
const orderId = ref<number | null>(null)
const orderTotal = ref(150.00)
const shipping = ref(10.00)

// First create order in backend
const createOrder = async () => {
  try {
    const response = await $fetch('/api/orders', {
      method: 'POST',
      body: {
        // order data
      }
    })

    return response.data.id
  } catch (error) {
    throw error
  }
}

const handlePlaceOrder = async () => {
  isProcessing.value = true

  try {
    // Step 1: Create order in backend
    const newOrderId = await createOrder()
    orderId.value = newOrderId

    // Step 2: Initiate payment
    const paymentResponse = await initiatePayment(newOrderId)

    if (!paymentResponse) {
      toast.add({
        title: 'Payment Error',
        description: 'Failed to initiate payment. Please try again.',
        color: 'error'
      })
      return
    }

    // User will be automatically redirected to SSLCommerz payment page
  } catch (error: any) {
    toast.add({
      title: 'Order Error',
      description: error.message || 'Failed to process order. Please try again.',
      color: 'error'
    })
  } finally {
    isProcessing.value = false
  }
}
</script>
```

## Payment Flow Diagram

```
1. User clicks "Proceed to Payment" in checkout
   ↓
2. Frontend calls createOrder() → Laravel creates order
   ↓
3. Frontend calls initiatePayment(orderId) → Laravel initiates SSLCommerz
   ↓
4. Laravel returns payment gateway URL
   ↓
5. User is redirected to SSLCommerz payment page
   ↓
6. User completes payment on SSLCommerz
   ↓
7. SSLCommerz redirects to success/fail/cancel URL
   ↓
8. Laravel backend validates payment and updates order
   ↓
9. User sees payment result page
```

## Important Notes

1. **Order Creation**: Always create the order in the backend first, then initiate payment
2. **Security**: Never expose SSLCommerz credentials in frontend
3. **Validation**: Always validate payment on the backend before completing order
4. **Error Handling**: Always handle payment failures gracefully
5. **User Experience**: Show clear loading states and error messages
6. **Redirect**: The `initiatePayment` composable automatically redirects to payment gateway
7. **Callbacks**: SSLCommerz will redirect to your backend URLs, not frontend URLs

## Testing

Use SSLCommerz sandbox mode for testing:
- Set `SSLCOMMERZ_TESTMODE=true` in backend .env
- Use test cards provided by SSLCommerz
- Test all scenarios: success, failure, cancellation

## Production Checklist

- [ ] Switch to production SSLCommerz credentials
- [ ] Set `SSLCOMMERZ_TESTMODE=false`
- [ ] Test with real payment (small amount)
- [ ] Verify email notifications work
- [ ] Check order status updates correctly
- [ ] Test IPN (Instant Payment Notification)
- [ ] Ensure proper error logging
- [ ] Add payment retry mechanism
- [ ] Implement refund handling (if needed)
