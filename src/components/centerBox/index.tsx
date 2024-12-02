
import {ILayOutProps} from "../../types/create-membership";
import {useThemeStore} from "../../store";


const CenterBox = ({children}: ILayOutProps) => {

    const {isDarkMode} = useThemeStore()

return (<div className={`relative max-w-md w-full  rounded-lg shadow-xl ${ isDarkMode ? "bg-gray-800" : "bg-pink-200 bg-opacity-10"}`}>
    {children}
</div>)
}

export default CenterBox