<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Payment Method</h2>

    <div class="space-y-4">
      <!-- Payment Options -->
      <ClientOnly>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
              v-for="method in paymentMethods"
              :key="method.id"
              type="button"
              @click="$emit('update:selectedPaymentMethod', method.id)"
              class="flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all"
              :class="selectedPaymentMethod === method.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'"
          >
            <div class="w-5 h-5 rounded-full border-2 mb-2 flex items-center justify-center transition-colors"
                 :class="selectedPaymentMethod === method.id
                   ? 'border-primary-500 bg-primary-500'
                   : 'border-gray-300 dark:border-gray-600'">
              <div v-if="selectedPaymentMethod === method.id" class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <UIcon :name="method.icon" class="text-3xl mb-2" :class="method.iconColor"/>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ method.name }}</span>
          </button>
        </div>
      </ClientOnly>

      <!-- Credit Card Form -->
      <ClientOnly>
        <div v-if="selectedPaymentMethod === 'card'" class="space-y-4 pt-4">
        <UFormField label="Card Number" required>
          <UInput
              :model-value="modelValue.cardNumber"
              @update:model-value="updateField('cardNumber', $event)"
              placeholder="1234 5678 9012 3456"
              size="lg"
              icon="i-heroicons-credit-card"
              maxlength="19"
          />
        </UFormField>

        <UFormField label="Cardholder Name" required>
          <UInput
              :model-value="modelValue.cardName"
              @update:model-value="updateField('cardName', $event)"
              placeholder="John Doe"
              size="lg"
          />
        </UFormField>

        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Expiry Date" required>
            <UInput
                :model-value="modelValue.expiryDate"
                @update:model-value="updateField('expiryDate', $event)"
                placeholder="MM/YY"
                size="lg"
                maxlength="5"
            />
          </UFormField>

          <UFormField label="CVV" required>
            <UInput
                :model-value="modelValue.cvv"
                @update:model-value="updateField('cvv', $event)"
                type="password"
                placeholder="123"
                size="lg"
                maxlength="4"
            />
          </UFormField>
        </div>

        <div class="flex items-center gap-2">
          <UCheckbox
              :model-value="modelValue.saveCard"
              @update:model-value="updateField('saveCard', $event)"
          />
          <label class="text-sm text-gray-600 dark:text-gray-400">
            Save card for future purchases
          </label>
        </div>
        </div>
      </ClientOnly>

      <!-- PayPal Notice -->
      <ClientOnly>
        <div v-if="selectedPaymentMethod === 'paypal'" class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div class="flex items-start gap-3">
            <UIcon name="i-heroicons-information-circle" class="text-blue-500 text-xl mt-0.5"/>
            <div>
              <p class="font-medium text-blue-900 dark:text-blue-100">PayPal Checkout</p>
              <p class="text-sm text-blue-700 dark:text-blue-300 mt-1">
                You will be redirected to PayPal to complete your purchase securely.
              </p>
            </div>
          </div>
        </div>
      </ClientOnly>

      <!-- Apple Pay Notice -->
      <ClientOnly>
        <div v-if="selectedPaymentMethod === 'apple'" class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="flex items-start gap-3">
            <UIcon name="i-heroicons-information-circle" class="text-gray-500 text-xl mt-0.5"/>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Apple Pay</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Complete your purchase quickly and securely with Apple Pay.
              </p>
            </div>
          </div>
        </div>
      </ClientOnly>

      <!-- Cash on Delivery Notice -->
      <ClientOnly>
        <div v-if="selectedPaymentMethod === 'cash'" class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div class="flex items-start gap-3">
            <UIcon name="i-heroicons-banknotes" class="text-amber-600 dark:text-amber-400 text-xl mt-0.5"/>
            <div>
              <p class="font-medium text-amber-900 dark:text-amber-100 mb-2">Cash on Delivery (COD)</p>
              <div class="text-sm text-amber-800 dark:text-amber-200 space-y-2">
                <p>Pay the delivery person when your order arrives at your doorstep.</p>
                <ul class="list-disc list-inside space-y-1 mt-2">
                  <li>No online payment required</li>
                  <li>Pay directly to the delivery driver</li>
                  <li>Please have the exact amount ready</li>
                  <li>Your order will be confirmed after payment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>

      <!-- SSLCommerz Notice -->
      <ClientOnly>
        <div v-if="selectedPaymentMethod === 'sslcommerz'" class="space-y-4 pt-4">
        <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div class="flex items-start gap-3">
            <UIcon name="i-heroicons-shield-check" class="text-green-600 dark:text-green-400 text-xl mt-0.5"/>
            <div>
              <p class="font-medium text-green-900 dark:text-green-100 mb-2">Secure Payment Gateway</p>
              <p class="text-sm text-green-800 dark:text-green-200 mb-3">
                You will be redirected to SSLCommerz secure payment gateway to complete your purchase.
              </p>
              <p class="text-xs text-green-700 dark:text-green-300 mb-2 font-medium">Supported Payment Methods:</p>
              <div class="grid grid-cols-3 md:grid-cols-6 gap-2">
                <div class="bg-white dark:bg-gray-800 rounded p-2 text-center">
                  <UIcon name="i-heroicons-credit-card" class="text-blue-600 mb-1" />
                  <span class="text-xs text-gray-900 dark:text-white block">Visa</span>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded p-2 text-center">
                  <UIcon name="i-heroicons-credit-card" class="text-orange-600 mb-1" />
                  <span class="text-xs text-gray-900 dark:text-white block">Master</span>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded p-2 text-center">
                  <UIcon name="i-heroicons-credit-card" class="text-blue-500 mb-1" />
                  <span class="text-xs text-gray-900 dark:text-white block">Amex</span>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded p-2 text-center">
                  <UIcon name="i-heroicons-device-phone-mobile" class="text-pink-600 mb-1" />
                  <span class="text-xs text-gray-900 dark:text-white block">bKash</span>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded p-2 text-center">
                  <UIcon name="i-heroicons-device-phone-mobile" class="text-orange-500 mb-1" />
                  <span class="text-xs text-gray-900 dark:text-white block">Nagad</span>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded p-2 text-center">
                  <UIcon name="i-heroicons-device-phone-mobile" class="text-purple-600 mb-1" />
                  <span class="text-xs text-gray-900 dark:text-white block">Rocket</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <UIcon name="i-heroicons-lock-closed" class="text-blue-600 dark:text-blue-400" />
          <div class="text-sm">
            <span class="text-blue-900 dark:text-blue-100 font-medium">256-bit SSL Encryption</span>
            <span class="text-blue-700 dark:text-blue-300 block text-xs">Your payment information is secure and encrypted</span>
          </div>
        </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PaymentInfo {
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
  saveCard: boolean
}

const props = defineProps<{
  modelValue: PaymentInfo
  selectedPaymentMethod: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: PaymentInfo]
  'update:selectedPaymentMethod': [value: string]
}>()

// Payment Methods
const paymentMethods = [
  {
    id: 'sslcommerz',
    name: 'SSLCommerz',
    icon: 'i-heroicons-shield-check',
    iconColor: 'text-green-600'
  },
  {
    id: 'card',
    name: 'Credit Card',
    icon: 'i-heroicons-credit-card',
    iconColor: 'text-blue-500'
  },
  {
    id: 'cash',
    name: 'Cash on Delivery',
    icon: 'i-heroicons-banknotes',
    iconColor: 'text-yellow-600'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: 'i-heroicons-wallet',
    iconColor: 'text-blue-600'
  },
  {
    id: 'apple',
    name: 'Apple Pay',
    icon: 'i-heroicons-device-phone-mobile',
    iconColor: 'text-gray-900 dark:text-white'
  }
]

const updateField = (field: keyof PaymentInfo, value: any) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}
</script>