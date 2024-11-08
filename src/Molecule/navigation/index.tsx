import { Home, Search, Bell, Mail, User } from "lucide-react";
import {useNavigate} from "react-router-dom";
import Noti from "../../components/noti"



const Navigation = () => {

const navigate = useNavigate();

  const isNavigationIcon = [
    { key: "home", icon: <Home className="h-6 w-6" />, path:""},
    {
      key: "search",
      icon: <Search className="h-6 w-6"  />,
    },
    { key: "bell", icon: <Bell className="h-6 w-6" /> },
    { key: "user", icon: <User className="h-6 w-6" />, path:"/mypage"},
  ];
  return (
    <nav>
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
      <Noti />
    </nav>
  );
};

export default Navigation;
