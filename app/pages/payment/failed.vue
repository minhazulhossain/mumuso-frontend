<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12">
    <UContainer>
      <div class="max-w-2xl mx-auto">
        <UCard>
          <div class="text-center py-12">
            <div class="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <UIcon name="i-heroicons-x-circle" class="text-6xl text-red-600 dark:text-red-400" />
            </div>

            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Payment Failed
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mb-8">
              Unfortunately, your payment could not be processed
            </p>

            <!-- Transaction ID -->
            <div v-if="transactionId" class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-8">
              <p class="text-sm text-gray-500 dark:text-gray-400">Transaction ID</p>
              <p class="font-medium text-gray-900 dark:text-white">{{ transactionId }}</p>
            </div>

            <!-- Reasons -->
            <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8 text-left">
              <h3 class="font-semibold text-red-900 dark:text-red-100 mb-3">Common Reasons for Payment Failure:</h3>
              <ul class="space-y-2 text-sm text-red-800 dark:text-red-200">
                <li class="flex items-start gap-2">
                  <UIcon name="i-heroicons-x-mark" class="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <span>Insufficient funds in your account</span>
                </li>
                <li class="flex items-start gap-2">
                  <UIcon name="i-heroicons-x-mark" class="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <span>Incorrect card details or PIN</span>
                </li>
                <li class="flex items-start gap-2">
                  <UIcon name="i-heroicons-x-mark" class="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <span>Card expired or blocked</span>
                </li>
                <li class="flex items-start gap-2">
                  <UIcon name="i-heroicons-x-mark" class="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <span>Payment limit exceeded</span>
                </li>
                <li class="flex items-start gap-2">
                  <UIcon name="i-heroicons-x-mark" class="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <span>Bank or network issues</span>
                </li>
              </ul>
            </div>

            <!-- What to do next -->
            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8 text-left">
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-information-circle" class="text-blue-600 dark:text-blue-400 text-xl shrink-0 mt-0.5" />
                <div class="text-sm text-blue-800 dark:text-blue-200">
                  <p class="font-medium mb-2">What you can do:</p>
                  <ul class="list-disc list-inside space-y-1">
                    <li>Double-check your payment details and try again</li>
                    <li>Try a different payment method</li>
                    <li>Contact your bank if the issue persists</li>
                    <li>Contact our support team for assistance</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-3">
              <UButton
                to="/checkout"
                size="lg"
                icon="i-heroicons-arrow-path"
                block
                class="sm:flex-1"
              >
                Try Again
              </UButton>
              <UButton
                to="/cart"
                size="lg"
                color="secondary"
                variant="outline"
                icon="i-heroicons-shopping-cart"
                block
                class="sm:flex-1"
              >
                View Cart
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const transactionId = ref<string | null>(null)

onMounted(() => {
  transactionId.value = route.query.transaction_id as string || null
})

useSEO({
  title: 'Payment Failed',
  description: 'Your payment could not be processed'
})
</script>
