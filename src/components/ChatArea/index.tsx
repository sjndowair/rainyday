import {useChatStore, useThemeStore} from "../../store";

import ChatInput from "../chatInput";
import ChatInitial from "../chatInitial";
import {ISendMessageProps} from "../../pages/chat";

export interface IChatAreaProps {
    setMessage?: (message: string) => void,
    newMessage?: string,
    setNewMessage?: (newMessage: string) => void | undefined,
    messages?: ISendMessageProps[],
    setMessages?: (value: (((prevState: ISendMessageProps[]) => ISendMessageProps[]) )) => void
    onClickSendMessage?: () => void
}

const ChatArea = ({
                      setNewMessage,
                      newMessage,
                      messages,
                      setMessages,
                      onClickSendMessage
                  }: IChatAreaProps) => {


    const {activeChat, message} = useChatStore();
    const {isDarkMode} = useThemeStore();




    return (
        <div className="flex-1 flex flex-col">
            {activeChat ? (<>
                <div
                    className={`${isDarkMode ? "bg-gray-800  border-b border-gray-700" : "bg-opacity-55 border-b border-purple-300 shadow-[0_10px_10px_-1px_rgba(233,213,255,0.5)]"} bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 flex items-center justify-between`}>
                    <div className="flex items-center">
                        <div
                            className={`w-10 h-10 rounded-full ${isDarkMode ? "bg-gray-600" : "bg-opacity-55 border border-purple-700 text-black"}  flex items-center justify-center mr-3 font-bold`}>
                            {activeChat[0]}
                        </div>
                        <span className="font-semibold">{activeChat}</span>
                    </div>
                    <div className="flex space-x-4">

                    </div>

                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {message[activeChat]?.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                                message.sender === 'You'
                                    ? (isDarkMode ? 'bg-blue-600 rounded-l-lg rounded-br-lg'
                                        : 'bg-purple-600 rounded-l-lg rounded-br-lg text-white')
                                    : (isDarkMode ? 'bg-gray-700 rounded-r-lg rounded-bl-lg' : 'bg-gray-100 rounded-r-lg rounded-bl-lg')
                            } p-3 shadow-md`}>
                                <p>{message.content}</p>
                                <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-black"}  mt-1`}>{message.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <ChatInput setNewMessage={setNewMessage} newMessage={newMessage} setMessages={setMessages} onClickSendMessage={onClickSendMessage} messages={messages} />
            </>) : <ChatInitial/>}
        </div>
    )

}


export default ChatArea;
