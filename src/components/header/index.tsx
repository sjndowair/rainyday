import { Umbrella, Home, Search, Bell, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Molecule/navigation";
import Logo from "../../atoms/logo";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className=" bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-200">
        <div
          id="rain-container"
          className="fixed inset-0 pointer-events-none z-50"
        ></div>
        <header className="sticky top-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 shadow-lg">
          <div className="max-w-screen-xl mx-auto flex justify-between items-center">
            <Logo />
            <Navigation />
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
