export interface IContactProps {
  searchTerm: string;
  onRoomSelect: (room: string | null) => void;
  onClickToggleSideBar: () => void;
}

export interface IChatPageState {
  activeChat: string | null;
  messages: Record<string, any[]>;
  setActiveChat: (chat: string | null) => void;
  addMessage: (chat: string, message: string) => void;
}

export interface IThemeStore {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
