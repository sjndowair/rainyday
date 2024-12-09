import { useState } from 'react'

import {useChatStore} from "../../store";

import { auth, db } from "../../constants/firebase-contants";
// import {getDatabase, ref, push, onChildAdded} from "firebase/database"
import Layout from "../../layout";
import ChatArea from "../../components/ChatArea";
import UserSidebar from "../../components/sidebar";
import Theme from "../../components/theme";



 const MainPage =() => {
    const { activeChat, message, setActiveChat, addMessage } = useChatStore()

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

 const MainPage =() => {

     const [messages, setMessages] = useState<ISendMessageProps[]>([]);
     const [newMessage, setNewMessage] = useState('');

     const sendMessage = async ({userId, message}:ISendMessageProps) => {

         try {
        await addDoc(collection(db, "messages"), {
            userId,
            text: message,
            createdAt: new Date().toISOString(),
        });
         } catch (e) {
             console.log("this message Error:", e)
         }
     }

     const subscribeToMessages = (callback:Dispatch<SetStateAction<ISendMessageProps[]>>) => {
        const q = query(collection(db, "message"),
            orderBy("createdAt"));
        return onSnapshot(q, (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                    ...doc.data()
            }));
            callback(messages)
        })
     }

     useEffect(() => {
         const unsubscribe = subscribeToMessages(setMessages);
         return () => unsubscribe()
     }, []);

    const onClickSendMessage = () => {
         if(newMessage.trim()){
            sendMessage({userId: "currentUserId", message: newMessage})
             setNewMessage("");
         }

    }

    return (
        <Layout>
        <Theme >
            <div className={`flex`}>
            <div id="rain-container" className="fixed inset-0 pointer-events-none" />
           <UserSidebar />

          <ChatArea />

          <ChatArea messages={messages} setMessages={setMessages}
                    newMessage={newMessage} setNewMessage={setNewMessage} onClickSendMessage={onClickSendMessage} />

            </div>
        </Theme>
        </Layout>
    )
}

export default MainPage