import { useRoomActions } from "@/hooks/useRoomActions";
import { Button } from "../ui/button";

interface Props {
    handleClickRoomId: (id: string) => void,
}

const RoomListChat = ({ handleClickRoomId }: Props) => {
    const {rooms} = useRoomActions();

    return (
        <div>
            {
                rooms.map((room) => (
                    <Button key = {room.id} onClick = {() => handleClickRoomId(room.id)}>
                        {room.id}
                    </Button>
                ))
            }
            <pre>
                {
                    JSON.stringify(rooms, null, 2)
                }
            </pre>
        </div>
    )
}

export default RoomListChat;