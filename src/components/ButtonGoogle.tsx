import { useAuthActions } from "@/hooks/useAuthActions";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface Props {
    type: "login" | "register";
    loading: boolean;
}

const ButtonGoogle = ({ type, loading }: Props) => {
    const { loginWithGoogle } = useAuthActions();
    const isLogin = type === "login";

    const handleLoginWithGoogle = async () => {
        const result = await loginWithGoogle();
        if (result.success) {
            toast.success("Inicio de sesión exitoso");
        } else {
            toast.error("Error al iniciar sesión");
        }
    }

    return (
        <Button variant = "outline" disabled = {loading} className = "w-full flex items-center justify-center gap-2 py-2 rounded-lg border-gray-300 hover:bg-gray-50" onClick = {handleLoginWithGoogle} >
            <img src = "https://www.svgrepo.com/show/355037/google.svg" alt = "Google" className = "w-5 h-5" />
            {isLogin ? "Iniciar sesión con Google" : "Registrarse con Google"}
        </Button>
    )
}

export default ButtonGoogle;