import {Send} from "lucide-react";
import { useThemeStore} from "../../store";
import {IChatAreaProps} from "../ChatArea";

const ChatInput = ({newMessage, setNewMessage, onClickSendMessage, messages}:IChatAreaProps) => {



    const {isDarkMode} = useThemeStore();



    return (<div
        className={`${isDarkMode ? "bg-gray-800 bg-opacity-50 border-t border-gray-700"
            : " bg-opacity-55 border-t border-purple-300"}
         backdrop-filter backdrop-blur-lg p-4 `}>
        <div className="flex items-center space-x-2">
            <input
                type="text"
                placeholder="메세지를 입력해주세요"
                className={ `flex-1  rounded-md py-2 px-4 focus:outline-none
                 ${isDarkMode ? "bg-gray-700 bg-opacity-50" : "bg-gray-100 bg-opacity-70"}`}
                value={newMessage}
                onChange={(e) =>
                    setNewMessage?.(e.target.value)}
                onKeyDown={(e) =>
                    e.key === 'Enter' && onClickSendMessage?.() }
            />
            <button
                onClick={onClickSendMessage}
                className={`${isDarkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-purple-500 hover:bg-purple-600 "}
                  rounded-md p-2 transition-colors`}
            >
                <Send className="h-5 w-5"/>
            </button>
        </div>
    </div>)
}

export default ChatInput; 