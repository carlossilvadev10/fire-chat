import ButtonGoogle from "@/components/ButtonGoogle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthActions } from "@/hooks/useAuthActions";
import { Link } from "react-router";

const RegisterPage = () => {
    const { loading } = useAuthActions();

    return (
        <Card className = "w-full max-w-md mx-auto shadow-lg rounded-2xl border border-gray-200 bg-white">
            <CardHeader className = "text-center">
                <CardTitle className = "text-2xl font-semibold text-gray-800">
                    Crear cuenta
                </CardTitle>
                <CardDescription className = "text-gray-500 mt-2">
                    Completa los siguientes datos para registrarte.
                </CardDescription>
                <div className = "mt-3 text-sm text-gray-600">
                    ¿Ya tienes tienes cuenta?{" "}
                    <Link to = "/auth/login" className = "font-medium text-blue-600 hover:text-blue-500 hover:underline">
                        Iniciar sesión
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <input type = "text" placeholder = "Nombre completo" className = "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none mb-3" />
                <input type = "email" placeholder = "Correo electrónico" className = "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none mb-3" />
                <input type = "password" placeholder = "Contraseña" className = "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none mb-3" />
                <input type = "password" placeholder = "Confirmar contraseña" className = "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none" />
            </CardContent>
            <CardFooter className = "flex flex-col">
                <Button className = "w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors mb-3">
                    Registrarse
                </Button>
                <div className = "relative w-full text-center text-sm text-gray-400 mb-3">
                    <span className = "px-2 bg-white relative z-10">o</span>
                    <div className = "absolute top-1/2 left-0 w-full border-t border-gray-200 -z-0" />
                </div>
                <ButtonGoogle type = "register" loading = {loading} />
            </CardFooter>
        </Card>
    );
}

export default RegisterPage;