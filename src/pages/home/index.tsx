import { Outlet } from "react-router-dom";
import Loading from "../../components/loading";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isApiHandle = async () => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1000);
  };
  useEffect(() => {
    isApiHandle();
  }, []);

  return (
    <>
      {!isLoading ? <Loading /> : null}
      <div>main home</div>
      <Outlet />
    </>
  );
};

export default Home;
