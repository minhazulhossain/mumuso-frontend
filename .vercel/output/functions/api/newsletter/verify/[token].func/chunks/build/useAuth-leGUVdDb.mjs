import { A as useUserSession, v as navigateTo } from './server.mjs';

const handleAuthError = (error, defaultMessage) => {
  const message = error.data?.message || error.message || defaultMessage;
  throw new Error(message);
};
const useAuth = () => {
  const user = useUserSession();
  const login = async (email, password) => {
    try {
      const data = await $fetch("/api/auth/login", {
        method: "POST",
        body: { email, password }
      });
      await user.fetch();
      return data;
    } catch (error) {
      handleAuthError(error, "Login failed");
    }
  };
  const register = async (formData) => {
    try {
      const data = await $fetch("/api/auth/register", {
        method: "POST",
        body: formData
      });
      await user.fetch();
      return data;
    } catch (error) {
      handleAuthError(error, "Registration failed");
    }
  };
  const logout = async () => {
    try {
      await $fetch("/api/auth/logout", {
        method: "POST"
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      user.clear();
      await navigateTo("/auth/login");
    }
  };
  const checkAuth = async () => {
    try {
      await user.fetch();
      return user.loggedIn.value;
    } catch (error) {
      return false;
    }
  };
  const forgotPassword = async (email) => {
    try {
      return await $fetch("/api/auth/forgot-password", {
        method: "POST",
        body: { email }
      });
    } catch (error) {
      handleAuthError(error, "Failed to send reset link");
    }
  };
  const resetPassword = async (formData) => {
    try {
      return await $fetch("/api/auth/reset-password", {
        method: "POST",
        body: formData
      });
    } catch (error) {
      handleAuthError(error, "Password reset failed");
    }
  };
  const updateProfile = async (formData) => {
    try {
      const data = await $fetch("/api/auth/profile", {
        method: "PUT",
        body: formData
      });
      await user.fetch();
      return data;
    } catch (error) {
      handleAuthError(error, "Profile update failed");
    }
  };
  return {
    // User session
    user: user.user,
    loggedIn: user.loggedIn,
    // Auth methods
    login,
    register,
    logout,
    checkAuth,
    forgotPassword,
    resetPassword,
    updateProfile,
    // Session methods
    fetch: user.fetch,
    clear: user.clear
  };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-leGUVdDb.mjs.map
