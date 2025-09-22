import { Navigate } from "react-router";
import { useSigninCheck } from "reactfire";
import { Suspense } from "react";
import AuthenticatedLayout from "./AuthenticatedLayout";

const AdminLayout = () => {
    const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();
    // Mostrar loading mientras se verifica el estado de inicio de sesión
    if (status === "loading" || !hasEmitted) return <div className = "">Cargando...</div>;
    // Redirigir si el usuario no está auntenticado
    if (status === "success" && !signInCheckResult.signedIn) return <Navigate to = "/auth/login" replace />

    return (
        <Suspense fallback = {<div>Cargando usuario...</div>}>
            <AuthenticatedLayout />
        </Suspense>
    )
}

export default AdminLayout;