// store.js
import {create} from "zustand/react";
import firebase from "firebase/compat";



const useStore = create((set:any) => ({
    modalState: false,
    isCloseModal: () => set({modalState: false}),
    isOpenModal: () => set({modalState: true}),
    isToggleModal: () => set((state: any) => ({ modalState: !state.modalState })),

}));

export default useStore;


