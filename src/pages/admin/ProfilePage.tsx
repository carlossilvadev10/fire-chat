import FormProfile from "@/components/FormProfile";
import { useUser } from "reactfire";

const ProfilePage = () => {
    const { data: user } = useUser();

    if (!user) {
        return <div className = "text-red-500">Cargando...</div>
    }

    return (
        <div>
            <h1>
                Profile Page
            </h1>
            <FormProfile user = {user} />
        </div>
    )
}

export default ProfilePage;