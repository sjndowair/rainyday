import { useState } from "react";
import { useEffect } from "react";
import InfoBox from "../../components/infoBox";
import StoryBox from "../../components/storiesBox";
import Post from "../../components/post";


const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const isLoadingState = setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    return () => clearTimeout(isLoadingState);
  }, []);

  return (
    <>
      <main className="max-w-screen-xl mx-auto p-8 flex flex-col gap-10 ">
        <InfoBox />
        <StoryBox isLoading={isLoading} />
        <Post isLoading={isLoading} />
      </main>
    </>
  );
};

export default Profile;
