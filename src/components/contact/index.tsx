import {useState} from "react";
import {CONTANT} from "../../dummy/dummy-data";
import {useChatStore} from "../../store";
import {IContactProps} from "../../types/create-chatPage";

const Contact = ({searchTerm}:IContactProps) => {

    const {setActiveChat, activeChat} = useChatStore();
    const isFilteredContacts = CONTANT.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
            {isFilteredContacts.map(item => (
                <button
                    key={item}
                    onClick={() => setActiveChat(item)}
                    className={`flex items-center w-full p-3 hover:bg-gray-700 transition-colors ${activeChat === item ? 'bg-gray-700' : ''}`}
                >
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                        {item[0]}
                    </div>
                    <span>{item}</span>
                </button>
            ))}
        </div>

)
}

export default Contact;