<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Payment Method</h2>

    <div class="space-y-4">
      <!-- Payment Options -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label
            v-for="method in paymentMethods"
            :key="method.id"
            class="flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all"
            :class="selectedPaymentMethod === method.id
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'"
        >
          <URadioGroup
              :model-value="selectedPaymentMethod"
              @update:model-value="$emit('update:selectedPaymentMethod', $event)"
              :value="method.id"
              class="mb-2"
          />
          <UIcon :name="method.icon" class="text-3xl mb-2" :class="method.iconColor"/>
          <span class="text-sm font-medium text-gray-900 dark:text-white">{{ method.name }}</span>
        </label>
      </div>

      <!-- Credit Card Form -->
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

      <!-- PayPal Notice -->
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

      <!-- Apple Pay Notice -->
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
    id: 'card',
    name: 'Credit Card',
    icon: 'i-heroicons-credit-card',
    iconColor: 'text-blue-500'
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