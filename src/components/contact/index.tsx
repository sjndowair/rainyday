import {useState} from "react";
import {CONTANT} from "../../dummy/dummy-data";
import {useChatStore} from "../../store";



const Contact = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const {setActiveChat, activeChat} = useChatStore();
    const isFilteredContacts = CONTANT.filter(contant => contant.toLowerCase().includes(searchTerm.toLowerCase().toLowerCase()));

    return (
        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
            {isFilteredContacts.map(contact => (
                <button
                    key={contact}
                    onClick={() => setActiveChat(contact)}
                    className={`flex items-center w-full p-3 hover:bg-gray-700 transition-colors ${activeChat === contact ? 'bg-gray-700' : ''}`}
                >
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                        {contact[0]}
                    </div>
                    <span>{contact}</span>
                </button>
            ))}
        </div>

)
}

export default Contact;