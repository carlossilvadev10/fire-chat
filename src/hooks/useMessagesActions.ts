import type { LastMessage, Message } from "@/schemas/room.schema";
import { addDoc, collection, doc, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"

export const useMessagesActions = (roomId: string) => {
    const db = useFirestore();
    const {data: user} = useUser();
    const messagesRef = collection(db, "rooms", roomId, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

    const {data: messages} = useFirestoreCollectionData(messagesQuery, {
        suspense: true,
        idField: "id",
    });

    const sendMessage = async (text: string) => {
        if(!text.trim()) throw new Error("useMessagesActions: 400");
        if (!user) throw new Error("useMessagesActions: 401");
        const timestamp = serverTimestamp();
        // Crear mensaje
        const messageData: Omit<Message, "id"> = {
            senderId: user.uid,
            text,
            timestamp,
        }
        // Actualizar lastMessage en el room
        const roomRef = doc(db, "rooms", roomId);
        const lastMessage: LastMessage = {
            senderId: user.uid,
            text,
            timestamp
        }
        await Promise.all([
            addDoc(messagesRef, messageData),
            updateDoc(roomRef, {
                lastMessage,
            }),
        ]);
    }

    return {
        messages: messages as Message[],
        sendMessage
    }
}