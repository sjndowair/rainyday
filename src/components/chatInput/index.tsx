import {Send} from "lucide-react";
import {useState} from "react";
import {useChatStore} from "../../store";

const ChatInput = () => {

    const [newMessage, setNewMessage] = useState('')

    const {activeChat, addMessage} = useChatStore();

    const handleSendMessage = () => {
        if (newMessage.trim() && activeChat) {
            addMessage(activeChat, {
                id: Date.now(),
                sender: 'You',
                content: newMessage.trim(),
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            })
            setNewMessage('')
        }
    }
    return (<div
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
            <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 bg-opacity-50 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 rounded-md p-2 transition-colors"
            >
                <Send className="h-5 w-5"/>
            </button>
        </div>
    </div>)
}

export default ChatInput;