import { useThemeStore } from "../../store/index";

type TButtonType = "submit" | "reset" | "button";

interface IMyPageButtonProps {
  onClick?: () => void | null;
  value?: string;
  keyDown?: () => void | null;
  type?: string;
}

const MyPageButton = ({ onClick, value, type }: IMyPageButtonProps) => {
  const { isDarkMode } = useThemeStore();

  return (
    <button
      type={type as TButtonType}
      onClick={() => onClick?.()}
      className={` font-semibold mt-4 bg-purple-300 ${
        isDarkMode
          ? "bg-blue-700 text-blue-100 shadow-blue-800 hover:shadow-blue-900"
          : "text-purple-800 shadow-purple-500 hover:shadow-purple-500"
      }  rounded-2xl inline-block p-2 bg-opacity-50  shadow-md  transition-all duration-200 ease hover:cursor-pointer hover:bg-opacity-50  hover:shadow-sm `}
    >
      {value}
    </button>
  );
};
export default MyPageButton;
