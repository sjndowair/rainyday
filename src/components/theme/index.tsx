import {useState, useEffect} from "react";
//store
import {useThemeStore} from "../../store";
import {ILayOutProps} from "../../types/create-membership";
import ToggleButton from "../../atoms/toggleButton";
import {Sun, Moon} from "lucide-react";




const Theme = ({children}:ILayOutProps) => {



    const { isDarkMode} = useThemeStore();





    return (<div className={`min-h-screen   transition-colors duration-300 ${
        isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white'
            : 'bg-gradient-to-br from-white via-purple-200 to-purple-300 text-gray-900'
    }`}>
        <div className="absolute top-[5rem] right-[1.5rem]">
           <ToggleButton />
        </div>
        {children}
    </div>)
}

export default Theme;