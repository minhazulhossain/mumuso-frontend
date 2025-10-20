export default defineEventHandler(async (event) => {
    return {
        count: await getCartCount(event)
    }
})
