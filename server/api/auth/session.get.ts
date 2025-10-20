// server/api/auth/session.get.ts
export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)

    if (!session?.user?.token) {
        return { user: null }
    }

    // Refresh user data from backend
    const user = await refreshUserSession(event)

    return {
        user
    }
})