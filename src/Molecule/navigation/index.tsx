import { Home, Bell, User, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore, useThemeStore } from "../../store";

const Navigation = () => {
  const navigate = useNavigate();

  const isOpenModal = useStore((state) => state.isToggleModal);

  const { isDarkMode } = useThemeStore();
  const { isToggleModal } = useStore();

  const isNavigationIcon = [
    {
      key: "message",
      icon: <MessageCircle className="h-6 w-6" />,
      path: "/chat",
    },
    { key: "home", icon: <Home className="h-6 w-6" />, path: "/" },
    { key: "bell", icon: <Bell className="h-6 w-6" /> },
    {
      key: "user",
      icon: (
        <User
          className="h-6 w-6 relative z-100"
          onClick={() => {
            isOpenModal();
          }}
        />
      ),
    },
  ];

  return (
    <>
      <nav className="relative ">
        <ul className="flex space-x-4">
          {isNavigationIcon.map((e, i) => (
            <li key={i}>
              <button
                onClick={() => {
                  navigate(e?.path!);
                }}
                className={`${
                  isDarkMode ? "hover:text-blue-400" : "hover:text-purple-900"
                }  transition-colors focus:outline-none  rounded-full p-1`}
              >
                {e.icon}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
