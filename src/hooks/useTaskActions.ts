import type { Task } from "@/schemas/task.schema";
import { collection, query, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useTaskActions = () => {
    const {data: user} = useUser();
    const db = useFirestore();
    const taskCollectionRef = collection(db, "tasks");

    const tasksQuery = query(
        taskCollectionRef,
        where("userId", "==", user!.uid),
    );

    const {data: tasks} = useFirestoreCollectionData(tasksQuery, {
        idField: "id",
        suspense: true,
    });

    return {
        tasks: tasks as Task[],
        isLoading: status === "loading",
    }
}