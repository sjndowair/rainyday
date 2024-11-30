import {useThemeStore} from "../../store";

const Footer = () => {


  const {isDarkMode} = useThemeStore();

  return <div className={` ${isDarkMode ? "bg-slate-900 text-gray-500" : "bg-gray-100 bg-opacity-55 text-purple-300"} flex flex-col justify-center items-center p-7 text-sm gap-5 `}>
    <span>Powered by UP BEAT.</span>
    <span>© 2024 RainyDay SoCial. All rights reserved.</span>
    </div>;
};

export default Footer;
