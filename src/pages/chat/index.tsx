import {Dispatch, SetStateAction, useEffect, useState} from 'react'

import {useChatStore} from "../../store";

import {db} from "../../constants/firebase-contants"

import {collection, addDoc, onSnapshot, query, orderBy} from "firebase/firestore"

import Layout from "../../layout";
import ChatArea from "../../components/ChatArea";
import UserSidebar from "../../components/sidebar";
import Theme from "../../components/theme";


export interface ISendMessageProps {
    userId? : string;
    message? : string;
    id? : string;
    createdAt? : string;

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
          <ChatArea messages={messages} setMessages={setMessages}
                    newMessage={newMessage} setNewMessage={setNewMessage} onClickSendMessage={onClickSendMessage} />
            </div>
        </Theme>
        </Layout>
    )
}

export default MainPage