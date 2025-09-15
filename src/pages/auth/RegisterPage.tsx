import ButtonGoogle from "@/components/ButtonGoogle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthActions } from "@/hooks/useAuthActions";
import { registerZodSchema, type registerZodSchemaType } from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";

const RegisterPage = () => {
    const { loading, register } = useAuthActions();

    const form = useForm<registerZodSchemaType>({
        resolver: zodResolver(registerZodSchema),
        defaultValues: {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: registerZodSchemaType) => {
        const response = await register(data);

        if (response.error) {
            toast.error("Error al registrar cuenta");
            if (response.error.code === "auth/email-already-in-use") {
                form.setError("email", {
                    type: "manual",
                    message: "Este correo ya está registrado.",
                });
            }
        }
    };

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
                <Form {...form}>
                    <form className = "space-y-4" onSubmit = {form.handleSubmit(onSubmit)}>
                        <FormField control = {form.control} name = "displayName" render = {({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Nombre completo
                                </FormLabel>
                                <FormControl>
                                    <Input type = "text" placeholder = "Tu nombre" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField control = {form.control} name = "email" render = {({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Correo electrónico
                                </FormLabel>
                                <FormControl>
                                    <Input type = "email" placeholder = "ejemplo@correo.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField control = {form.control} name = "password" render = {({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Contraseña
                                </FormLabel>
                                <FormControl>
                                    <Input type = "password" placeholder = "••••••••" autoComplete = "new-password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField control = {form.control} name = "confirmPassword" render = {({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Confirmar contraseña
                                </FormLabel>
                                <FormControl>
                                    <Input type = "password" placeholder = "••••••••" autoComplete = "new-password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className = "-mb-6">
                            <Button type = "submit" disabled = {loading} className = "w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors mb-3">
                                {loading ? "Registrando..." : "Registrarse"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className = "flex flex-col">
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