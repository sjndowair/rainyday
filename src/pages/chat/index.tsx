

import { useState } from 'react'
import Layout from "../../layout";
import {useChatStore} from "../../store";
import { Cloud,  Phone, Video, Search,  User, Send } from 'lucide-react'


const contacts = ['Alice', 'Bob', 'Charlie', 'David', 'Eve']


export default function MainPage() {
    const { activeChat, messages, setActiveChat, addMessage } = useChatStore()
    const [newMessage, setNewMessage] = useState('')
    const [searchTerm, setSearchTerm] = useState('')


    const filteredContacts = contacts.filter(contact =>
        contact.toLowerCase().includes(searchTerm.toLowerCase())
    )

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

    return (
        <Layout>
        <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
            <div id="rain-container" className="fixed inset-0 pointer-events-none"></div>

            {/* Sidebar */}
            <div className="w-64 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border-r border-gray-700">
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold">RainyChat</h1>
                        <Cloud className="text-blue-400" />
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            className="w-full bg-gray-700 bg-opacity-50 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute right-3 top-2.5 text-gray-400" />
                    </div>
                </div>
                <div className="overflow-y-auto h-[calc(100vh-8rem)]">
                    {filteredContacts.map(contact => (
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

            {/* Main Chat Area */}
            <div className=" flex-1 flex flex-col">
                {activeChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 flex items-center justify-between border-b border-gray-700">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                                    {activeChat[0]}
                                </div>
                                <span className="font-semibold">{activeChat}</span>
                            </div>
                            <div className="flex space-x-4">
                                <button className="hover:text-blue-400 transition-colors">
                                    <Phone className="h-5 w-5" />
                                </button>
                                <button className="hover:text-blue-400 transition-colors">
                                    <Video className="h-5 w-5" />
                                </button>
                                <button className="hover:text-blue-400 transition-colors">
                                    <User className="h-5 w-5" />
                                </button>
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

                        {/* Message Input */}
                        <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 border-t border-gray-700">
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
                                    <Send className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-500 text-lg">Select a chat to start messaging</p>
                    </div>
                )}
            </div>
        </div>
        </Layout>
    )
}