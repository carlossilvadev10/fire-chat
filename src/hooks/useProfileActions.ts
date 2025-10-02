import { updateProfile, type AuthError } from "firebase/auth";
import { useState } from "react";
import { useUser } from "reactfire";
import { toast } from "sonner";
import { useUserActions } from "./useUserActions";

export const useProfileAction = () => {
    const [loading, setLoading] = useState(false);
    const { data: user } = useUser();
    const {createOrUpdateUser} = useUserActions();

    const updateUserProfile = async (profileData: {
        displayName?: string;
        photoURL?: string;
    }) => {
        setLoading(true);

        try {
             // Validar que el usuario esté autenticado
            if (!user) throw new Error("El usuario no está autenticado");

            // Actualizar el perfil en Firebase Auth
            await updateProfile(user, {
                displayName: profileData.displayName || user.displayName,
                photoURL: profileData.photoURL || user.photoURL,
            });

            // Sincronizar los cambios con Firestore
            await createOrUpdateUser({
                ...user,
                ...profileData,
            });

            // Recargar el usuario para que ReactFire detecte los cambios
            await user.reload();

            return {
                success: true,
                error: null,
            };
        } catch (e) {
            toast.error(`Error ${e}`);

            return {
                success: false,
                error: e as AuthError,
            };
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        updateUserProfile,
    }
}