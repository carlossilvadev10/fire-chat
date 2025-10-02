import { messageZodSchema, type messageZodSchemaType } from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMessagesActions } from "@/hooks/useMessagesActions";
import { toast } from "sonner";
import { useTransition } from "react";

interface Props {
    roomId: string,
}

const FormMessageChat = ({ roomId }: Props) => {
    const [isLoading, starTransition] = useTransition();
    const {sendMessage} = useMessagesActions(roomId);

    const form = useForm<messageZodSchemaType>({
        resolver: zodResolver(messageZodSchema),
        defaultValues: {
            text: "",
        }
    });

    const onSubmit = (values: messageZodSchemaType) => {
        starTransition(async () => {
            try {
                await sendMessage(values.text);
                form.reset();
            } catch (e) {
                console.log(`Error ${e}`);
                toast.error("No se pudo enviar el mensaje.")
            }
        });
    }

    return (
        <Form {...form}>
            <form className = "space-y-2" onSubmit = {form.handleSubmit(onSubmit)}>
                <FormField control = {form.control} name = "text" render = {({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder = "Título de la tarea" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type = "submit" disabled = {isLoading}>
                    {
                        isLoading ? "Enviando mensaje..." : "Enviar"
                    }
                </Button>
            </form>
        </Form>
    )
}

export default FormMessageChat;