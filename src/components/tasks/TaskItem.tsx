import { useTaskActions } from "@/hooks/useTaskActions";
import type { Task } from "@/schemas/task.schema";
import { Card, CardAction, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "../ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
    task: Task;
}

const TaskItem = ({ task }: Props) => {
    const { deleteTask, toggleTaskCompleted } = useTaskActions();
    const [isPending, starTransition] = useTransition();

    const handleDelete = async () => {
        starTransition(async () => {
            try {
                await deleteTask(task.id);
            } catch (e) {
                toast.error(`Error ${e}`);
            }
        })
    }

    const handleToggleTaskCompleted = async () => {
        starTransition(async () => {
            try {
                await toggleTaskCompleted(task.id);
            } catch (e) {
                toast.error(`Error ${e}`);
            }
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className = {cn("text-lg font-semibold", task.completed ? "line-through text-gray-500" : "")}>
                    {task.title}
                </CardTitle>
                <CardAction className = "flex justify-center gap-2">
                    <Button variant = "outline" disabled = {isPending} onClick = {handleToggleTaskCompleted}>
                        Actualizar
                    </Button>
                    <Button variant = "destructive" onClick = {handleDelete}>
                        Eliminar
                    </Button>
                </CardAction>
            </CardHeader>
            {
                task.description && (
                    <CardContent>
                        {task.description}
                    </CardContent>
                )
            }
        </Card>
    )
}

export default TaskItem;