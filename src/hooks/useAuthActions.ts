import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile, type AuthError } from "firebase/auth";
import { useState } from "react"
import { useAuth } from "reactfire";

interface AuthActionResponse {
    success: boolean,
    error: AuthError | null,
}

export const useAuthActions = () => {
    const [loading, setLoading] = useState(false);
    const auth = useAuth();

    const login = async (data: { email: string, password: string }): Promise<AuthActionResponse> => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            return {
                success: true,
                error: null,
            }
        } catch (e) {
            const authError = e as AuthError;
            return {
                success: false,
                error: authError,
            }
        } finally {
            setLoading(false);
        }
    }

    const register = async (data: { email: string, password: string, displayName: string }): Promise<AuthActionResponse> => {
        setLoading(true);
        try {
            const currentUser = await createUserWithEmailAndPassword(auth, data.email, data.password);

            if (currentUser.user) {
                await updateProfile(currentUser.user, {
                    displayName: data.displayName,
                });
                await currentUser.user.reload();
            }

            return {
                success: true,
                error: null,
            }
        } catch (e) {
            const authError = e as AuthError;
            return {
                success: false,
                error: authError,
            }
        } finally {
            setLoading(false);
        }
    }

    const loginWithGoogle = async (): Promise<AuthActionResponse> => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            return {
                success: true,
                error: null,
            }
        } catch (e) {
            const authError = e as AuthError;
            return {
                success: false,
                error: authError
            }
        } finally {
            setLoading(false);
        }
    }

    const logout = async (): Promise<AuthActionResponse> => {
        setLoading(true);
        try {
            await auth.signOut();
            return {
                success: true,
                error: null,
            }
        } catch (e) {
            const authError = e as AuthError;
            return {
                success: false,
                error: authError
            }
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
    }
}