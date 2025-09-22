import type { Task } from "@/schemas/task.schema";
import { addDoc, collection, deleteDoc, doc, query, updateDoc, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useTaskActions = () => {
    const { data: user } = useUser();
    const db = useFirestore();
    const taskCollectionRef = collection(db, "tasks");

    if (!user) {
        throw new Error("El usuario no está autenticado");
    }

    const tasksQuery = query(
        taskCollectionRef,
        where("userId", "==", user!.uid),
    );

    const { data: tasks } = useFirestoreCollectionData(tasksQuery, {
        idField: "id",
        suspense: true,
    });

    const createTask = async (data: {
        title: string;
        description?: string;
    }) => {
        const newTask = {
            ...data,
            completed: false,
            userId: user!.uid,
        }
        return await addDoc(taskCollectionRef, newTask);
    }

    const deleteTask = async (taskId: string) => {
        const taskDoc = doc(db, "tasks", taskId);
        return await deleteDoc(taskDoc);
    }

    const toggleTaskCompleted = async (taskId: string) => {
        const task = tasks.find((task) => task.id === taskId);
        const taskDoc = doc(db, "tasks", taskId);

        if (!task) {
            throw new Error("Tarea no econtrada");
        }

        return await updateDoc(taskDoc, {
            completed: !task.completed,
        });
    }

    return {
        tasks: tasks as Task[],
        isLoading: status === "loading",
        createTask,
        deleteTask,
        toggleTaskCompleted,
    }
}