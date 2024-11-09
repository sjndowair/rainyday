import {useState} from "react";
import { Home, Search, Bell, Mail, User, Settings, MessageCircle } from "lucide-react";
import {useNavigate} from "react-router-dom";
import useStore from "../../store";

const Navigation = () => {

  const [onClickModal, setOnClickModal] = useState(false);
const navigate = useNavigate();

const isOpenModal = useStore(state => state.isToggleModal);


  const isNavigationIcon = [
    {key: "message", icon: <MessageCircle className="h-6 w-6" />, path:"/chat" },
    { key: "home", icon: <Home className="h-6 w-6" />, path:""},
    {
      key: "search",
      icon: <Search className="h-6 w-6"  />,
    },
    { key: "bell", icon: <Bell className="h-6 w-6"  onClick={isOpenModal}/> },
    { key: "user", icon: <User className="h-6 w-6" />, path:"/mypage"},

  ];


  return (
      <>
    <nav className="relative">
      <ul className="flex space-x-4">
        {isNavigationIcon.map((e, i) => (
          <li key={i}>
            <button onClick={() => navigate(e?.path!)}
             className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1">
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
