import { useMessagesActions } from "@/hooks/useMessagesActions";
import MessageChat from "./MessageChat";

interface Props {
    roomId: string,
}

const MessagesChat = ({ roomId }: Props) => {
    const {messages} = useMessagesActions(roomId);

    return (
        <div className = "space-y-2">
            {
                messages.map((message) => (
                    <MessageChat key = {message.id} message = {message} />
                ))
            }
        </div>
    )
}

export default MessagesChat;