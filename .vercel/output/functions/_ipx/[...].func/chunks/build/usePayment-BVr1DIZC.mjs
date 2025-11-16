import { F as useState } from './server.mjs';
import { readonly } from 'vue';

const usePayment = () => {
  const loading = useState("payment-loading", () => false);
  const error = useState("payment-error", () => null);
  const initiatePayment = async (orderId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch("/api/payment/initiate", {
        method: "POST",
        body: {
          order_id: orderId
        }
      });
      if (response.success && response.data.gateway_url) {
        if (false) ;
      }
      return response;
    } catch (err) {
      error.value = err.data?.message || "Failed to initiate payment";
      console.error("Payment initiation error:", err);
      return null;
    } finally {
      loading.value = false;
    }
  };
  const getPaymentStatus = async (transactionId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch(`/api/payment/status/${transactionId}`);
      return response;
    } catch (err) {
      error.value = err.data?.message || "Failed to fetch payment status";
      console.error("Payment status error:", err);
      return null;
    } finally {
      loading.value = false;
    }
  };
  return {
    loading: readonly(loading),
    error: readonly(error),
    initiatePayment,
    getPaymentStatus
  };
};

export { usePayment as u };
//# sourceMappingURL=usePayment-BVr1DIZC.mjs.map
