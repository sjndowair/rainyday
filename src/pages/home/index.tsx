import { Outlet } from "react-router-dom";
import Loading from "../../components/loading";
import { useEffect, useState } from "react";
import Layout from "../../layout";
// import { auth } from "../../constants/firebase.constants";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const isApiHandle = async () => {
  //     await auth.authStateReady();
  //   };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1000);
  }, []);

  return (
    <>
      <Layout>
        {!isLoading ? <Loading /> : null}
        <div>main home</div>
        <Outlet />
      </Layout>
    </>
  );
};

export default Home;
