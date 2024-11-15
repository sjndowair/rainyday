import {Phone,  User, Video} from "lucide-react";
import {useChatStore} from "../../store";
import ChatInput from "../chatInput";
import ChatInitial from "../chatInitial";

const ChatArea = () => {

    const {activeChat,  messages} = useChatStore();


    return (
        <div className="flex-1 flex flex-col">
            {activeChat ? (<>
                <div
                    className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 flex items-center justify-between border-b border-gray-700">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                            {activeChat[0]}
                        </div>
                        <span className="font-semibold">{activeChat}</span>
                    </div>
                    <div className="flex space-x-4">

                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages[activeChat]?.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                                message.sender === 'You'
                                    ? 'bg-blue-600 rounded-l-lg rounded-br-lg'
                                    : 'bg-gray-700 rounded-r-lg rounded-bl-lg'
                            } p-3 shadow-md`}>
                                <p>{message.content}</p>
                                <p className="text-xs text-gray-300 mt-1">{message.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
              <ChatInput />
            </>) : <ChatInitial />}
        </div>
    )

}


export default ChatArea;