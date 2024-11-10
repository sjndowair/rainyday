

interface IChatPageProps {
    id: number
    sender: string
    content: string
    timestamp: string
}

export interface IChatPageState {
    activeChat: string | null
    messages: Record<string, IChatPageProps[]>
    setActiveChat: (chat: string | null) => void
    addMessage: (chat: string, message: IChatPageProps) => void
}