import Navigation from "../../Molecule/navigation";
import Logo from "../../atoms/logo";

import { useThemeStore } from "../../store";

const Header = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <>
      <div
        className={`fixed w-full z-[999999]
       ${
         isDarkMode
           ? "bg-gray-900 text-gray-200"
           : "bg-opacity-55 text-purple-700  "
       }`}
      >
        <div
          id="rain-container"
          className="fixed inset-0 pointer-events-none z-50"
        ></div>
        <header
          className={`sticky top-0 z-50 
         bg-opacity-80 backdrop-blur-md p-4 
          ${
            isDarkMode ? "shadow-lg " : "shadow-[0_0_1.5rem_rgb(203,195,227)]"
          } `}
        >
          <div className="max-w-[1700px] mx-auto flex sm:flex-row flex-col gap-4 justify-between items-center">
            <Logo />
            <Navigation />
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
