import FormMessageChat from "@/components/chat/FormMessageChat";
import MessagesChat from "@/components/chat/MessagesChat";
import RoomListChat from "@/components/chat/RoomListChat";
import { Suspense, useState } from "react";

const ChatPage = () => {
    const [roomId, setRoomId] = useState("");

    const handleClickRoomId = (id: string) => {
        setRoomId(id);
    }

    return (
        <div className = "grid grid-cols-1 md:grid-cols-2">
            {/* Rooms */}
            <div className = "">
                <Suspense fallback = {<div>Cargando rooms...</div>}>
                    <RoomListChat handleClickRoomId = {handleClickRoomId} />
                </Suspense>
            </div>
            {/* Messages */}
            <div className = "">
                {
                    roomId ? (
                        <Suspense fallback = {<div>Cargando chats...</div>}>
                            <FormMessageChat roomId = {roomId} />
                            <MessagesChat roomId = {roomId} />
                        </Suspense>
                    ) : (
                        <div className = "">Selecciona una sala para chatear</div>
                    )
                }
            </div>
        </div>
    )
}

export default ChatPage;