import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "reactfire";

const RegisterPage = () => {
    const auth = useAuth();

    const handleClickGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            console.log("Inicio de sesión exitoso");
        } catch (e) {
            console.log("Error al iniciar con Google", e);
        }
    }

    return (
        <div>
            <h1>
                Register
            </h1>
            <button onClick = {handleClickGoogle}>
                Iniciar sesión con Google
            </button>
        </div>
    )
}

export default RegisterPage;