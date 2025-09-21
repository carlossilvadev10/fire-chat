import { useProfileAction } from "@/hooks/useProfileActions";
import { profileZodSchema, type profileZodSchemaType } from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { User } from "firebase/auth";
import { toast } from "sonner";

interface Props {
    user: User;
}

const FormProfile = ({ user }: Props) => {
    const { loading, updateUserProfile } = useProfileAction();

    const form = useForm<profileZodSchemaType>({
        resolver: zodResolver(profileZodSchema),
        defaultValues: {
            displayName: user?.displayName || "",
            photoURL: user?.photoURL || "",
        },
    });

    const onSubmit = async (data: profileZodSchemaType) => {
        const result = await updateUserProfile(data);
        if (result.success) {
            return toast.success("Perfil actualizado exitosamente.");
        }
        toast.error("Error al actualizar perfil");
    };

    return (
        <Form {...form}>
            <form className = "space-y-4" onSubmit = {form.handleSubmit(onSubmit)}>
                <FormField control = {form.control} name = "displayName" render = {({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Usuario
                        </FormLabel>
                        <FormControl>
                            <Input placeholder = "Usuario" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField control = {form.control} name = "photoURL" render = {({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Usuario
                        </FormLabel>
                        <FormControl>
                            <Input placeholder = "https://example.com/photo.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type = "submit" disabled = {loading}>
                    {loading ? "Actualizando..." : "Actuallizar"}
                </Button>
            </form>
        </Form>
    )
}

export default FormProfile