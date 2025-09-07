import { useAuth, useUser } from "reactfire";

const DashboardPage = () => {
    const auth = useAuth();
    const {data: user} = useUser();

    return (
        <div>
            <h1>
                Dashboard page
            </h1>
            <p>Bienvenido, {user?.displayName || "Supongo"}</p>
            <p>Correo: {user?.email || "No provisto"}</p>
            <button onClick = {() => auth.signOut()}>
                Cerrar sesión
            </button>
        </div>
    )
}

export default DashboardPage;