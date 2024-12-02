import React from "react";
import {useChatStore, useStore, useThemeStore} from "../../store";
import {CircleX} from "lucide-react"



interface INotiProps {
    children?: React.ReactNode | string | JSX.Element
}


const Noti = ({children}:INotiProps) => {


    const {isDarkMode} = useThemeStore();

    const isCloseModal = useStore(state => state.isCloseModal)

    return (
        <>
            <div className={`z-[99999] rounded-2xl absolute top-[4.5rem] xl:right-[5%] lg:right-[2%] right-[2%] w-[300px] max-w-full 
            ${isDarkMode ? " bg-gray-800 bg-opacity-50 h-[20rem] hover:bg-opacity-70 focus:bg-opacity-70"
                : "bg-purple-600 bg-opacity-20 h-[20rem] hover:bg-opacity-40 focus:bg-opacity-50 text-white"}
            `}>
        <button className="float-right pr-2 pt-2"  onClick={isCloseModal}><CircleX /></button>
                <ul>
                    {children}
                </ul>
    </div>
        </>
    )
}

export default Noti