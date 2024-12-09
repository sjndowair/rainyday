import {CONTANT} from "../../dummy/dummy-data";
import {useChatStore, useThemeStore} from "../../store";
import {IContactProps} from "../../types/create-chatPage";

const Contact = ({searchTerm}:IContactProps) => {
    const {isDarkMode} = useThemeStore();
    const {setActiveChat, activeChat} = useChatStore();
    const isFilteredContacts = CONTANT.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className={`overflow-y-auto h-[calc(100vh-8rem)] ${isDarkMode ? "" : "shadow-[17px_0_10px_-3px_rgba(233,213,255,0.5)]" } `}>
            {isFilteredContacts.map(item => (
                <button
                    key={item}
                    onClick={() => setActiveChat(item)}
                    className={`flex items-center w-full p-3 ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-purple-200 "} transition-colors ${activeChat === item ? (isDarkMode  ? "bg-gray-700 " : "bg-purple-300 bg-opacity-45 ") : ""}`}

                >
                    <div className={` w-10 h-10 rounded-full ${isDarkMode ? "bg-gray-600" : "border border-purple-700"}  font-bold flex items-center justify-center mr-3`}>
                        {item[0]}
                    </div>
                    <span>{item}</span>
                </button>
            ))}
        </div>

)
}

export default Contact;