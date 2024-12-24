import {IButtonProps} from "../../types/create-membership";
import {useThemeStore} from "../../store";


const Button = ({isLoading, onClick, children}:IButtonProps) => {

  const {isDarkMode} = useThemeStore()

  return (
    <button
        onClick={onClick}
      type="submit"
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
      text-sm font-medium text-white ${isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-500 hover:bg-purple-600 bg-opacity-80"} `}
    >
      {isLoading ? "열심히 들어가는중...":children }
    </button>
  );
};

export default Button;
