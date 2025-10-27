// types/auth.ts

/**
 * Authentication form data for login/register
 */
export interface AuthFormData {
    name?: string
    email: string
    password: string
    password_confirmation?: string
}

/**
 * Profile update form data
 */
export interface ProfileUpdateData {
    name?: string
    email?: string
    current_password?: string
    password?: string
    password_confirmation?: string
}

/**
 * Password reset form data
 */
export interface PasswordResetData {
    token: string
    email: string
    password: string
    password_confirmation: string
}

/**
 * User session data
 */
export interface UserSession {
    id: number
    name: string
    email: string
    token: string
}

/**
 * Backend authentication response
 */
export interface BackendAuthResponse {
    user: {
        id: number
        name: string
        email: string
    }
    access_token: string
    token_type?: string
}
