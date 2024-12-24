import {type} from "node:os";
import {Simulate} from "react-dom/test-utils";
import keyDown = Simulate.keyDown;


type TButtonType = "submit" | "reset" | "button";

interface IMyPageButtonProps {
    onClick? : () => void | null;
    value? : string;
    keyDown? : () => void | null;
    type?: string ;
}

const MyPageButton= ({onClick, value, type}:IMyPageButtonProps) => {


    return (
        <button type={type as TButtonType}  onClick={() => onClick?.()
        }
                className={`text-purple-800 font-semibold mt-4 bg-purple-300 rounded-2xl inline-block p-2 bg-opacity-50 shadow-purple-500 shadow-md  transition-all duration-200 ease hover:cursor-pointer hover:bg-opacity-50 hover:shadow-purple-500 hover:shadow-sm `}>
            {value}
        </button>
    )

}
export default MyPageButton;