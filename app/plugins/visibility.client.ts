export default defineNuxtPlugin(() => {
    const { extendReservation, cartItemsCount } = useCart()

    if (process.client) {
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && cartItemsCount.value > 0) {
                extendReservation()
            }
        })
    }
})