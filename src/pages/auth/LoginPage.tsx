import ButtonGoogle from "@/components/ButtonGoogle";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthActions } from "@/hooks/useAuthActions";
import { Link } from "react-router";
import { loginZodSchema, type loginZodSchemaType } from "@/lib/zod.schema";

const LoginPage = () => {
    const { loading, login } = useAuthActions();

    const form = useForm<loginZodSchemaType>({
        resolver: zodResolver(loginZodSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data: loginZodSchemaType) => {
        const response = await login(data);

        if (!response.success) {
            if (response.error?.code === "auth/invalid-login-credentials") {
                form.setError("email", {
                    type: "manual",
                    message: "Correo o contraseña incorrectos."
                });

                form.setError("password", {
                    type: "manual",
                    message: "Correo o contraseña incorrectos."
                });
            }
            return;
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
                    <Link to = "/auth/register" className = "font-medium text-blue-600 hover:text-blue-500 hover:underline">
                        Crear cuenta
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className = "space-y-4" onSubmit = {form.handleSubmit(onSubmit)} >
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
                                    <Input type = "password" placeholder = "••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className = "flex flex-col">
                            <Link to = "/forgot-password" className = "text-sm text-gray-500 hover:text-blue-600 hover:underline self-end mb-3">
                                ¿Olvidaste tu contraseña?
                            </Link>
                            <div className = "-mb-6">
                                <Button type = "submit" disabled = {loading} className = "w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors mb-3">
                                    {loading ? "Iniciando..." : "Iniciar sesión"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className = "flex flex-col">
                <div className = "relative w-full text-center text-sm text-gray-400 mb-3">
                    <span className = "px-2 bg-white relative z-10">o</span>
                    <div className = "absolute top-1/2 left-0 w-full border-t border-gray-200 -z-0" />
                </div>
                <ButtonGoogle type = "login" loading = {loading} />
            </CardFooter>
        </Card>
    );
};

export default LoginPage;