<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12">
    <UContainer>
      <div class="max-w-2xl mx-auto">
        <!-- Loading State -->
        <div v-if="loading" class="text-center">
          <UIcon name="i-heroicons-arrow-path" class="text-6xl text-primary-500 animate-spin mb-4 mx-auto" />
          <p class="text-gray-600 dark:text-gray-400">Verifying payment...</p>
        </div>

        <!-- Success State -->
        <div v-else-if="paymentData" class="text-center">
          <UCard>
            <template #header>
              <div class="flex flex-col items-center py-6">
                <div class="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                  <UIcon name="i-heroicons-check-circle" class="text-6xl text-green-600 dark:text-green-400" />
                </div>
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Payment Successful!
                </h1>
                <p class="text-gray-600 dark:text-gray-400">
                  Your payment has been processed successfully
                </p>
              </div>
            </template>

            <div class="space-y-6">
              <!-- Transaction Details -->
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Transaction Details
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Transaction ID</p>
                    <p class="font-medium text-gray-900 dark:text-white">{{ paymentData.transaction_id }}</p>
                  </div>

                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Amount Paid</p>
                    <p class="font-medium text-gray-900 dark:text-white">
                      {{ paymentData.currency }} {{ parseFloat(paymentData.amount).toFixed(2) }}
                    </p>
                  </div>

                  <div v-if="paymentData.payment_method">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Payment Method</p>
                    <p class="font-medium text-gray-900 dark:text-white capitalize">
                      {{ paymentData.payment_method }}
                    </p>
                  </div>

                  <div v-if="paymentData.paid_at">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Payment Date</p>
                    <p class="font-medium text-gray-900 dark:text-white">
                      {{ new Date(paymentData.paid_at).toLocaleString() }}
                    </p>
                  </div>

                  <div v-if="paymentData.bank_tran_id">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Bank Transaction ID</p>
                    <p class="font-medium text-gray-900 dark:text-white">{{ paymentData.bank_tran_id }}</p>
                  </div>

                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Order ID</p>
                    <p class="font-medium text-gray-900 dark:text-white">#{{ paymentData.order_id }}</p>
                  </div>
                </div>
              </div>

              <!-- Success Message -->
              <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div class="flex items-start gap-3">
                  <UIcon name="i-heroicons-information-circle" class="text-green-600 dark:text-green-400 text-xl shrink-0 mt-0.5" />
                  <div class="text-sm text-green-800 dark:text-green-200">
                    <p class="font-medium mb-1">What's next?</p>
                    <ul class="list-disc list-inside space-y-1">
                      <li>You will receive an order confirmation email shortly</li>
                      <li>You can track your order status in your account</li>
                      <li>We'll notify you when your order ships</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col sm:flex-row gap-3 pt-4">
                <UButton
                  to="/account/orders"
                  size="lg"
                  icon="i-heroicons-receipt-percent"
                  block
                  class="sm:flex-1"
                >
                  View Orders
                </UButton>
                <UButton
                  to="/shop"
                  size="lg"
                  color="secondary"
                  variant="outline"
                  icon="i-heroicons-shopping-bag"
                  block
                  class="sm:flex-1"
                >
                  Continue Shopping
                </UButton>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Error State -->
        <div v-else class="text-center">
          <UCard>
            <div class="py-12">
              <UIcon name="i-heroicons-exclamation-triangle" class="text-6xl text-red-500 mb-4 mx-auto" />
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Unable to Verify Payment
              </h1>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                {{ error || 'Something went wrong while verifying your payment' }}
              </p>
              <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <UButton to="/account/orders" size="lg" icon="i-heroicons-receipt-percent">
                  View Orders
                </UButton>
                <UButton to="/" size="lg" color="secondary" variant="outline">
                  Go Home
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getPaymentStatus } = usePayment()

const loading = ref(true)
const error = ref<string | null>(null)
const paymentData = ref<any>(null)

onMounted(async () => {
  const transactionId = route.query.transaction_id as string

  if (!transactionId) {
    error.value = 'No transaction ID provided'
    loading.value = false
    return
  }

  const response = await getPaymentStatus(transactionId)

  if (response && response.success) {
    paymentData.value = response.data
  } else {
    error.value = 'Failed to fetch payment details'
  }

  loading.value = false
})

useSEO({
  title: 'Payment Successful',
  description: 'Your payment has been processed successfully'
})
</script>
