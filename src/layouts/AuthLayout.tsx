import { Navigate, Outlet } from "react-router";
import { useSigninCheck } from "reactfire";

const AuthLayout = () => {
    const {status, data: signInCheckResult, hasEmitted} = useSigninCheck();
    // Mostrar loading mientras se verifica el estado de inicio de sesión
    if (status === "loading" || !hasEmitted) return <div className = "">Cargando...</div>;
    // Redirigir si el usuario ya está auntenticado
    if (status === "success" && signInCheckResult.signedIn) return <Navigate to = "/admin" replace />

    return (
        <div className = "flex items-center justify-center min-h-screen bg-gray-50">
            <div className = "max-w-md w-full">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout;