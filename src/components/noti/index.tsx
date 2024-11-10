import React from "react";
import {useStore} from "../../store";
import {CircleX} from "lucide-react"



interface INotiProps {
    children?: React.ReactNode | string | JSX.Element
}


const Noti = ({children}:INotiProps) => {


    const isCloseModal = useStore(state => state.isCloseModal)

    return (
        <>
            <div className="rounded-2xl absolute top-[4.5rem] xl:right-[5%] lg:right-[2%] right-[2%] w-[300px] max-w-full bg-gray-800 bg-opacity-50 h-[20rem] hover:bg-opacity-70 focus:bg-opacity-70 ">
        <button className="float-right pr-2 pt-2"  onClick={isCloseModal}><CircleX /></button>
                <ul>
                    {children}
                </ul>
    </div>
        </>
    )
}

export default Noti