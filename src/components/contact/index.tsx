import { useState, useEffect } from "react";
import { useThemeStore } from "../../store";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../firebase/config";
import { IContactProps } from "../../types/create-chatPage";

interface ChatRoom {
  id: string;
  name: string;
  createdAt: any;
}

const Contact = ({
  searchTerm,
  onRoomSelect,
  onClickToggleSideBar,
}: IContactProps) => {
  const { isDarkMode } = useThemeStore();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    // 실시간으로 채팅방 목록 가져오기
    const q = query(collection(db, "chats"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rooms = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as ChatRoom)
      );
      setChatRooms(rooms);
    });

    return () => unsubscribe();
  }, []);

  const createNewChat = async (roomName: string) => {
    try {
      await addDoc(collection(db, "chats"), {
        name: roomName,
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser?.uid,
      });
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  const filteredRooms = chatRooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`overflow-y-auto h-[calc(100vh-8rem)] ${
        isDarkMode ? "" : "shadow-[17px_0_10px_-3px_rgba(233,213,255,0.5)]"
      }`}
    >
      <button
        onClick={() => {
          const roomName = prompt("새로운 채팅방 이름을 입력하세요:");
          if (roomName) createNewChat(roomName);
        }}
        className={`w-full p-3 mb-2 ${
          isDarkMode ? "bg-blue-600" : "bg-purple-600"
        } text-white rounded`}
      >
        새 채팅방 만들기
      </button>

      {filteredRooms.map((room) => (
        <button
          key={room.id}
          onClick={() => {
            onRoomSelect(room.id);
            onClickToggleSideBar();
          }}
          className={`flex items-center w-full p-3 ${
            isDarkMode ? "hover:bg-gray-800" : "hover:bg-purple-200"
          } transition-colors`}
        >
          <div
            className={`w-10 h-10 rounded-full ${
              isDarkMode ? "bg-gray-600" : "border border-purple-700"
            } font-bold flex items-center justify-center mr-3`}
          >
            {room.name[0]}
          </div>
          <span>{room.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Contact;
