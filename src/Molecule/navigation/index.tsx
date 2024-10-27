import { Home, Search, Bell, Mail, User } from "lucide-react";

const isNavigationIcon = [
  { key: "home", icon: <Home className="h-6 w-6" /> },
  {
    key: "search",
    icon: <Search className="h-6 w-6" />,
  },
  { key: "bell", icon: <Bell className="h-6 w-6" /> },
  { key: "mail", icon: <Mail className="h-6 w-6" /> },
  { key: "user", icon: <User className="h-6 w-6" /> },
];

const Navigation = () => {
  return (
    <nav>
      <ul className="flex space-x-4">
        {isNavigationIcon.map((e, i) => (
          <li key={i}>
            <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1">
              {e.icon}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
