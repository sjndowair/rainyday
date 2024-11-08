// store.js
import {create} from "zustand/react";


const useStore = create((set:any) => ({
    state: false,
    isCloseModal: () => set({state: false}),
    isOpenModal: () => set({state: true}),

}));

export default useStore;
