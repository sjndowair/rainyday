// store.js
import {create} from "zustand/react";

import {IChatPageState, IThemeStore} from "../types/create-chatPage";


const useStore = create((set:any) => ({
    modalState: false,
    isCloseModal: () => set({modalState: false}),
    isOpenModal: () => set({modalState: true}),
    isToggleModal: () => set((state: any) => ({ modalState: !state.modalState })),

}));


const useChatStore = create<IChatPageState>((set) => ({
    activeChat: null,
    messages: {
        'Alice': [
            { id: 1, sender: 'Alice', content: "Hey, hows the weather there?", timestamp: '10:30 AM' },
            { id: 2, sender: 'You', content: "Its raining cats and dogs!", timestamp: '10:32 AM' },
        ],
        'Bob': [
            { id: 1, sender: 'Bob', content: 'Want to go for a walk in the rain?', timestamp: '11:15 AM' },
            { id: 2, sender: 'You', content: 'Sure, let me grab my umbrella!', timestamp: '11:17 AM' },
        ],
    },



    setActiveChat: (chat) => set({ activeChat: chat }),
    addMessage: (chat, message) => set((state) => ({
        messages: {
            ...state.messages,
            [chat]: [...(state.messages[chat] || []), message],
        },
    })),
}))



const useThemeStore = create<IThemeStore>((set) => ({
    isDarkMode: true,
    toggleTheme: () => set((props) => ({isDarkMode: !props.isDarkMode}))
}))

export {useStore, useChatStore, useThemeStore};