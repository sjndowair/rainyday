

interface IChatPageProps {
    id: number
    sender: string
    content: string
    timestamp: string
}

export interface IChatPageState {
    activeChat: string | null
    message: Record<string, IChatPageProps[]>
    setActiveChat: (chat: string | null) => void
    addMessage: (chat: string, message: IChatPageProps) => void
}


export interface IContactProps {
    searchTerm: string
}

export interface IThemeStore {
    isDarkMode: boolean;
    toggleTheme: () => void;
}