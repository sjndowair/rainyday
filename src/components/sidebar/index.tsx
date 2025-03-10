import { Menu } from "lucide-react";
import { useState } from "react";
import Contact from "../contact";
import { Cloud } from "lucide-react";
import { useThemeStore } from "../../store";

interface UserSidebarProps {
  onRoomSelect: (room: string | null) => void;
  isOpen: boolean;
  onClickToggleSideBar: () => void;
}

const UserSidebar = ({
  onRoomSelect,
  isOpen,
  onClickToggleSideBar,
}: UserSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkMode } = useThemeStore();

  return (
    <div className={` ${isOpen ? "flex" : "hidden"} `}>
      <div
        className={`
        fixed  sm:top-0 top-[7.1rem]  left-0 h-full z-50
        w-full 
        md:relative md:block md:w-64
        ${isOpen ? "block" : "hidden"}
        ${
          isDarkMode
            ? "bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border-r border-gray-700"
            : "bg-opacity-75 text-black backdrop-blur backdrop-filter border-r border-purple-300 shadow-[17px_0_10px_-3px_rgba(233,213,255,0.5)]"
        }
      `}
      >
        <div className="p-4 opacity-100">
          <div className="flex items-center justify-between mb-4">
            <h1
              className={`${
                isDarkMode ? "text-white" : "text-purple-700"
              } text-xl font-bold`}
            >
              RainyChat
            </h1>
            <Cloud
              className={isDarkMode ? "text-blue-400" : "text-purple-400"}
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="검색"
              className={`w-full ${
                isDarkMode
                  ? "bg-gray-700 bg-opacity-50"
                  : "bg-gray-100 bg-opacity-50 border border-purple-300"
              }  rounded-md py-2 px-4 focus:outline-none`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Contact
          onClickToggleSideBar={onClickToggleSideBar}
          searchTerm={searchTerm}
          onRoomSelect={onRoomSelect}
        />
      </div>
    </div>
  );
};

export default UserSidebar;
