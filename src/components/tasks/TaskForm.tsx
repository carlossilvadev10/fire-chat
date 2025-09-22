import { taskZodSchema, type taskZodSchemaType } from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { useTaskActions } from "@/hooks/useTaskActions";
import { toast } from "sonner";

const TaskForm = () => {
    const [isPending, starTransition] = useTransition();
    const {createTask} = useTaskActions();

    const form = useForm<taskZodSchemaType>({
        resolver: zodResolver(taskZodSchema),
        defaultValues: {
            title: "",
            description: "",
        }
    });

    const onSubmit = async (data: taskZodSchemaType) => {
        starTransition(async () => {
            try {
                await createTask(data);
                form.reset();
            } catch (e) {
                toast.error(`Error ${e}`);
            }
        });
    }

    return (
        <Form {...form}>
            <form className = "space-y-4" onSubmit = {form.handleSubmit(onSubmit)}>
                <FormField control = {form.control} name = "title" render = {({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Título
                        </FormLabel>
                        <FormControl>
                            <Input placeholder = "Título de la tarea" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField control = {form.control} name = "description" render = {({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Descripción
                        </FormLabel>
                        <FormControl>
                            <Input placeholder = "Descripción de la tarea" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type = "submit" disabled = {isPending}>
                    {
                        isPending ? "Creando..." : "Crear tarea"
                    }
                </Button>
            </form>
        </Form>
    )
}

export default TaskForm;