import { Outlet } from "react-router-dom";
import Loading from "../../loading/spinner";
import { useEffect, useState } from "react";
import Layout from "../../layout";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 500);
  }, []);

  return (
    <>
      <Layout>
        <Outlet />
        {!isLoading && <Loading />  }
      </Layout>
    </>
  );
};

export default Home;
