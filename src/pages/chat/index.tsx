import { useState, useEffect } from "react";
import Layout from "../../layout";
import ChatArea from "../../components/ChatArea";
import UserSidebar from "../../components/sidebar";
import Theme from "../../components/theme";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/config";

interface IMessageProps {
  id: string;
  userId: string;
  text: string;
  timestamp: any;
  userName?: string;
  userImage?: string;
}

const MainPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [messages, setMessages] = useState<IMessageProps[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  const onClickToggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (!currentRoom) {
      setMessages([]);
      return;
    }

    const messagesRef = collection(db, `chats/${currentRoom}/messages`);
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messageList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IMessageProps[];
        setMessages(messageList);
      },
      (error) => {
        console.error("Error in messages snapshot:", error);
        setMessages([]);
      }
    );

    return () => unsubscribe();
  }, [currentRoom]);

  return (
    <Layout>
      <Theme>
        <div className={`flex`}>
          <div className="absolute inset-0 pointer-events-none w-full" />
          <UserSidebar
            isOpen={isOpen}
            onClickToggleSideBar={onClickToggleSidebar}
            onRoomSelect={setCurrentRoom}
          />
          <ChatArea
            isOpen={isOpen}
            onClickToggleSideBar={onClickToggleSidebar}
            messages={messages}
            currentRoom={currentRoom}
          />
        </div>
      </Theme>
    </Layout>
  );
};

export default MainPage;
