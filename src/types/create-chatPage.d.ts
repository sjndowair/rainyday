import { Message } from "firebase/firestore";

interface IChatPageProps {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

export interface IChatPageState {
  activeChat: string | null;
  messages: Record<string, Message[]>;
  setActiveChat: (chat: string | null) => void;
  addMessage: (chat: string, message: Message) => void;
}

export interface IContactProps {
  searchTerm: string;
  onRoomSelect: (room: string | null) => void;
  onClickToggleSideBar: () => void;
}

export interface IThemeStore {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
