import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";
import { useUser } from "reactfire";

const AuthenticatedLayout = () => {
    useUser({
        suspense: true, // Habilita el modo suspense para obtener el usuario
    });

    return (
        <div>
            <Navbar />
            <div className = "container mx-auto p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthenticatedLayout;