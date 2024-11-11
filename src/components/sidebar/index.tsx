import {useState} from "react";
import {useChatStore} from "../../store";
import {CONTANT} from "../../dummy/dummy-data";
import {Cloud, Search} from "lucide-react";



const UserSidebar = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const {setActiveChat, activeChat} = useChatStore();

const isFilteredContacts = CONTANT.filter(contant => contant.toLowerCase().includes(searchTerm.toLowerCase().toLowerCase()));

    return (<div className="w-64 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border-r border-gray-700">
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold">RainyChat</h1>
                    <Cloud className="text-blue-400"/>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        className="w-full bg-gray-700 bg-opacity-50 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute right-3 top-2.5 text-gray-400"/>
                </div>
            </div>
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
        </div>
    )
}

export default UserSidebar;