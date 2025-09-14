import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthActions } from "@/hooks/useAuthActions";
import { Link } from "react-router";
import { toast } from "sonner";

const LoginPage = () => {
    const { loginWithGoogle } = useAuthActions();

    const handleLoginWithGoogle = async () => {
        const result = await loginWithGoogle();
        if (result.success) {
            toast.success("Login successfull");
        } else {
            toast.error("Login failed");
        }
    }

    return (
        <Card className = "w-full max-w-md mx-auto shadow-lg rounded-2xl border border-gray-200 bg-white">
            <CardHeader className = "text-center">
                <CardTitle className = "text-2xl font-semibold text-gray-800">
                    Iniciar sesión
                </CardTitle>
                <CardDescription className = "text-gray-500 mt-2">
                    Ingresa tus credenciales para acceder a tu cuenta.
                </CardDescription>
                <div className = "mt-3 text-sm text-gray-600">
                    ¿No tienes cuenta?{" "}
                    <Link to = "/register" className = "font-medium text-blue-600 hover:text-blue-500 hover:underline">
                        Regístrate aquí
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <input type = "email" placeholder = "Correo electrónico" className = "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none mb-3" />
                <input type = "password" placeholder = "Contraseña" className = "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none" />
            </CardContent>
            <CardFooter className = "flex flex-col">
                <Link to = "/forgot-password" className = "text-sm text-gray-500 hover:text-blue-600 hover:underline self-end mb-3" >
                    ¿Olvidaste tu contraseña?
                </Link>
                <Button className = "w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors mb-3">
                    Iniciar sesión
                </Button>
                <div className = "relative w-full text-center text-sm text-gray-400 mb-3">
                    <span className = "px-2 bg-white relative z-10">o</span>
                    <div className = "absolute top-1/2 left-0 w-full border-t border-gray-200 -z-0"></div>
                </div>
                <Button variant = "outline" className = "w-full border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2 py-2 rounded-lg" onClick = {handleLoginWithGoogle} >
                    <img src = "https://www.svgrepo.com/show/355037/google.svg" alt = "Google" className = "w-5 h-5" />
                    Iniciar sesión con Google
                </Button>
            </CardFooter>
        </Card>
    );
};

export default LoginPage;