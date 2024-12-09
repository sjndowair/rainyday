// store.js
import {create} from "zustand/react";

import {IChatPageState, IThemeStore, IChatPageProps} from "../types/create-chatPage";



export interface IChatAreaProps {
    activeChat: string | null;
    newMessage: string;
    setActiveChat: (chatId: string | null) => void;
    setNewMessage: (message: string) => void;
}


const useStore = create((set:any) => ({
    modalState: false,
    isCloseModal: () => set({modalState: false}),
    isOpenModal: () => set({modalState: true}),
    isToggleModal: () => set((state: any) => ({ modalState: !state.modalState })),

}));

const useChatStore = create<IChatPageState>((set) => ({
    activeChat: null,
    message: {

    },

    setActiveChat: (chat) => set({ activeChat: chat }),
    addMessage: (chat, message) => set((state) => ({
        message: {
            ...state.message,
            [chat]: [...(state.message[chat] || []), message],
        },
    })),
}))



const useThemeStore = create<IThemeStore>((set) => ({
    isDarkMode: true,
    toggleTheme: () => set((props) => ({isDarkMode: !props.isDarkMode}))
}))

export {useStore, useChatStore, useThemeStore};