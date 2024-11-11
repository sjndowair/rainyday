import { useState } from 'react'
import Layout from "../../layout";
import {useChatStore} from "../../store";
import ChatArea from "../../components/ChatArea";
import UserSidebar from "../../components/sidebar";


 const MainPage =() => {
    const { activeChat, messages, setActiveChat, addMessage } = useChatStore()

    const [newMessage, setNewMessage] = useState('')


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
            <div id="rain-container" className="fixed inset-0 pointer-events-none" />
           <UserSidebar />
          <ChatArea />
        </div>
        </Layout>
    )
}

export default MainPage