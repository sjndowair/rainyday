import { Menu } from "lucide-react";
import { useThemeStore } from "../../store";
import ChatInitial from "../chatInitial";
import { useState, useEffect, useRef } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../../firebase/config";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { UserStoryImage } from "../storiesBox/index";
import { useFireBaseImage } from "../../hooks/useFireBaseImage";
import { useQuery, useMutation } from "@tanstack/react-query";

interface Message {
  id: string;
  userId: string;
  text: string;
  timestamp: any;
  userName?: string;
  userImage?: string;
}

interface ChatRoom {
  id: string;
  name: string;
}

interface ChatAreaProps {
  isOpen: boolean;
  onClickToggleSideBar: () => void;
  messages: Message[];
  currentRoom: string | null;
}

const ChatArea = ({
  messages,
  currentRoom,
  isOpen,
  onClickToggleSideBar,
}: ChatAreaProps) => {
  const { isDarkMode } = useThemeStore();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [lastReadMessageId, setLastReadMessageId] = useState<string | null>(
    null
  );

  const { isUserImage, isFetchImageFile } = useFireBaseImage({
    userId: auth.currentUser?.uid || null,
    collectionData: "profileImages",
  });

  // 채팅방 정보 조회
  const { data: roomInfoData } = useQuery<ChatRoom>({
    queryKey: ["chatRoom", currentRoom],
    queryFn: () =>
      new Promise((resolve) => {
        const unsubscribe = onSnapshot(
          doc(db, "chats", currentRoom!),
          (doc) => {
            if (doc.exists()) {
              resolve({ id: doc.id, ...doc.data() } as ChatRoom);
            }
          }
        );
        return () => unsubscribe();
      }),
    enabled: !!currentRoom,
  });

  // 사용자 프로필 이미지 조회
  const { data: userImageData } = useQuery({
    queryKey: ["userImage", auth.currentUser?.uid],
    queryFn: () => isFetchImageFile(),
    enabled: !!auth.currentUser?.uid,
  });

  const onClickScrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollButton(false);
    if (messages.length > 0) {
      setLastReadMessageId(messages[messages.length - 1].id);
    }
  };

  const onScroll = () => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      messagesContainerRef.current;
    const isBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;

    if (isBottom && messages.length > 0) {
      setLastReadMessageId(messages[messages.length - 1].id);
    }

    const hasNewMessages =
      messages.length > 0 &&
      lastReadMessageId !== messages[messages.length - 1].id;

    setShowScrollButton(!isBottom && hasNewMessages);
  };

  useEffect(() => {
    const fetchUserImage = async () => {
      if (auth.currentUser?.uid) {
        try {
          const imageData = await isFetchImageFile();
          setUserProfileImage(imageData || null);
        } catch (error) {
          console.error("Error fetching user image:", error);
          setUserProfileImage(null);
        }
      }
    };
    fetchUserImage();
  }, [auth.currentUser?.uid]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", onScroll);
      return () => container.removeEventListener("scroll", onScroll);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const container = messagesContainerRef.current;
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const isBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;

        if (isBottom) {
          setLastReadMessageId(messages[messages.length - 1].id);
        }
      }
    }
  }, [messages]);

  // 메시지 전송 뮤테이션
  const { mutate: sendMessage } = useMutation({
    mutationFn: async (newMessageText: string) => {
      if (!newMessageText.trim() || !currentRoom || !auth.currentUser) return;

      const messageData = {
        text: newMessageText,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || "익명",
        userImage: userImageData || null,
        timestamp: serverTimestamp(),
      };

      await addDoc(
        collection(db, `chats/${currentRoom}/messages`),
        messageData
      );
    },
    onSuccess: () => {
      setNewMessage("");
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setShowScrollButton(false);
      if (messages.length > 0) {
        setLastReadMessageId(messages[messages.length - 1].id);
      }
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(newMessage);
  };

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return "";
    if (timestamp.toDate) {
      return formatDistanceToNow(timestamp.toDate(), {
        addSuffix: true,
        locale: ko,
      });
    }
    return "";
  };

  return (
    <div className="flex-1 flex flex-col h-screen md:p-4 p-2">
      {currentRoom && roomInfoData ? (
        <>
          <div
            className={`
              ${
                isDarkMode
                  ? "bg-gray-800 border-b border-gray-700"
                  : "bg-opacity-55 border-b border-purple-300 shadow-[0_10px_10px_-1px_rgba(233,213,255,0.5)]"
              } 
              bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 flex items-center justify-between
            `}
          >
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full ${
                  isDarkMode
                    ? "bg-gray-600"
                    : "bg-opacity-55 border border-purple-700 text-black"
                }  flex items-center justify-center mr-3 font-bold`}
              >
                {roomInfoData?.name[0]}
              </div>
              <span className="font-semibold">{roomInfoData?.name}</span>
            </div>
            <div className="flex space-x-4">
              <Menu
                size={25}
                onClick={onClickToggleSideBar}
                className={`block cursor-pointer transition-all duration-500 ease-in-out
                  hover:rotate-180 hover:translate-x-0
                  ${isOpen ? "rotate-180" : "rotate-0"}
                  hover:scale-110 active:scale-95
                  ${
                    isDarkMode ? "hover:text-blue-700" : "hover:text-purple-600"
                  }
                `}
              />
            </div>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages?.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.userId === auth.currentUser?.uid
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start max-w-xs lg:max-w-md xl:max-w-lg`}
                >
                  {message.userId !== auth.currentUser?.uid && (
                    <div className="mr-2 flex flex-col items-center">
                      {message.userImage ? (
                        <UserStoryImage
                          userId={message.userId}
                          username={message.userName || "Anonymous"}
                          size="small"
                        />
                      ) : (
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                          ${
                            isDarkMode
                              ? "bg-gray-700 text-white"
                              : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {message.userName?.[0]?.toUpperCase() || "?"}
                        </div>
                      )}
                      <span className="text-xs mt-1">
                        {message.userName || "익명"}
                      </span>
                    </div>
                  )}

                  <div
                    className={`${
                      message?.userId === auth.currentUser?.uid
                        ? isDarkMode
                          ? "bg-blue-600 rounded-l-lg rounded-br-lg"
                          : "bg-purple-600 rounded-l-lg rounded-br-lg text-white"
                        : isDarkMode
                        ? "bg-gray-700 rounded-r-lg rounded-bl-lg"
                        : "bg-gray-100 rounded-r-lg rounded-bl-lg"
                    } p-3 shadow-md`}
                  >
                    <p>{message?.text}</p>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      } mt-1`}
                    >
                      {formatTimestamp(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {showScrollButton && (
            <div
              onClick={onClickScrollToBottom}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer w-[20rem] rounded-lg flex items-center"
            >
              새글 읽기
            </div>
          )}
          <form onSubmit={handleSubmit} className="mt-4 flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className={`flex-1 border rounded-l p-2 ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
              }`}
              placeholder="메시지를 입력하세요..."
            />

            <button
              type="submit"
              className={`px-4 py-2 rounded-r ${
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-purple-600 hover:bg-purple-700"
              } text-white`}
            >
              전송
            </button>
          </form>
        </>
      ) : (
        <ChatInitial />
      )}
    </div>
  );
};

export default ChatArea;
