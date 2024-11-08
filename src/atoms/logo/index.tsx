import {useNavigate} from "react-router-dom";

import { Umbrella } from "lucide-react";



const Logo = () => {

    const navigate = useNavigate();

  return (
    <h1 onClick={() => navigate("/profile")} className="text-2xl font-bold flex items-center hover:cursor-pointer">
      <Umbrella className="mr-2" />
      RainyDaySocial
    </h1>
  );
};

export default Logo;
