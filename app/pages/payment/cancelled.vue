<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12">
    <UContainer>
      <div class="max-w-2xl mx-auto">
        <UCard>
          <div class="text-center py-12">
            <div class="w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <UIcon name="i-heroicons-exclamation-circle" class="text-6xl text-orange-600 dark:text-orange-400" />
            </div>

            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Payment Cancelled
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mb-8">
              You have cancelled the payment process
            </p>

            <!-- Transaction ID -->
            <div v-if="transactionId" class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-8">
              <p class="text-sm text-gray-500 dark:text-gray-400">Transaction ID</p>
              <p class="font-medium text-gray-900 dark:text-white">{{ transactionId }}</p>
            </div>

            <!-- Info Message -->
            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8 text-left">
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-information-circle" class="text-blue-600 dark:text-blue-400 text-xl shrink-0 mt-0.5" />
                <div class="text-sm text-blue-800 dark:text-blue-200">
                  <p class="font-medium mb-2">Don't worry!</p>
                  <ul class="list-disc list-inside space-y-1">
                    <li>No charges have been made to your account</li>
                    <li>Your items are still in your cart</li>
                    <li>You can complete the payment whenever you're ready</li>
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
                Complete Payment
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
              <UButton
                to="/shop"
                size="lg"
                color="secondary"
                variant="ghost"
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
  title: 'Payment Cancelled',
  description: 'Payment process was cancelled'
})
</script>
