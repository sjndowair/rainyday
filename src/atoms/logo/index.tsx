import {useNavigate} from "react-router-dom";

import {ChartNoAxesColumnIncreasing, ChartNoAxesColumnDecreasing} from "lucide-react";



const Logo = () => {

    const navigate = useNavigate();

  return (

    <h1 onClick={() => navigate("/profile")} className="text-2xl font-bold flex items-center hover:cursor-pointer">
      <ChartNoAxesColumnIncreasing className="ml-2 text"/>
      CharChaoTalk
        <ChartNoAxesColumnDecreasing className="mr-2" />
    </h1>
  );
};

export default Logo;
