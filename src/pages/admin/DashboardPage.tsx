import { useAuthActions } from "@/hooks/useAuthActions";
import { useUser } from "reactfire";

const DashboardPage = () => {
    const { data: user } = useUser();
    const { logout } = useAuthActions();

    return (
        <div className = "">
            <h1>
                Dashboard page
            </h1>
            <p>Bienvenido, {user!.displayName || "Supongo"}</p>
            <p>Correo: {user!.email || "No provisto"}</p>
            <button onClick = {logout}>
                Cerrar sesión
            </button>
        </div>
    )
}

export default DashboardPage;