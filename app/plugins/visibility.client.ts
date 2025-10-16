export default defineNuxtPlugin(() => {
    if (process.client) {
        const { extendReservation, cartItemsCount } = useCart()

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && cartItemsCount.value > 0) {
                extendReservation()
            }
        })
    }
})
