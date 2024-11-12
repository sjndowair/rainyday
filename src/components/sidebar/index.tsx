import {useState} from "react";
import Contact from "../contact";
import {Cloud, Search} from "lucide-react";



const UserSidebar = () => {

    const [searchTerm, setSearchTerm] = useState('');

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
            <Contact />
        </div>
    )
}

export default UserSidebar;