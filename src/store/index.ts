import { create } from "zustand/react";
import { persist } from "zustand/middleware";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../constants/firebase-contants";
import { IChatPageState, IThemeStore } from "../types/create-chatPage";

interface IChatStore {
  activeChat: string | null;
  setActiveChat: (chat: string | null) => void;
  addMessage: (content: string, sender: string) => Promise<void>;
}

const useRealChatStore = create<IChatStore>((set) => ({
  activeChat: null,
  setActiveChat: (chat) => set({ activeChat: chat }),
  addMessage: async (content, sender) => {
    const messagesRef = collection(db, "messages");
    await addDoc(messagesRef, {
      content,
      sender,
      timestamp: serverTimestamp(),
    });
  },
}));

const useStore = create((set: any) => ({
  modalState: false,
  isCloseModal: () => set({ modalState: false }),
  isOpenModal: () => set({ modalState: true }),
  isToggleModal: () => set((state: any) => ({ modalState: !state.modalState })),
}));

const useChatStore = create<IChatPageState>((set) => ({
  activeChat: null,
  messages: {},

  setActiveChat: (chat: string | null) => set({ activeChat: chat }),
  addMessage: (chat: string, message: string) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chat]: [...(state.messages[chat] || []), message],
      },
    })),
}));

const useThemeStore = create<IThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: true,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "theme-storage",
    }
  )
);

export { useStore, useChatStore, useThemeStore, useRealChatStore };
