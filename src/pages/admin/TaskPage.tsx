import TaskForm from "@/components/tasks/TaskForm";
import TaskList from "@/components/tasks/TaskList";
import { Suspense } from "react";

const TaskPage = () => {
    return (
        <div>
            <h1 className = "text-2xl font-bold">
                Tareas
            </h1>
            <TaskForm />
            <Suspense fallback = {<div>Cargando tareas...</div>}>
                <TaskList />
            </Suspense>
        </div>
    )
}

export default TaskPage;