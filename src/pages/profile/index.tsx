import { useState } from "react";
import { useEffect } from "react";
import InfoBox from "../../components/infoBox";
import StoryBox from "../../components/storiesBox";
import Post from "../../components/post";
import Layout from "../../layout";
import SkeletonPost from "../../loading/skeleton/skeletonPost";
import { useAuth } from "../../hooks/useFireBaseWriteNoti";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const { userId } = useParams(); // URL에서 userId 가져오기

  useEffect(() => {
    const isLoadingState = setTimeout(() => {
      setIsLoading(true);
    }, 400);
    return () => clearTimeout(isLoadingState);
  }, []);

  // console.log("isLoading:", isLoading); // 로딩 상태 확인

  return (
    <Layout>
      <main className="max-w-screen-xl mx-auto md:p-8 px-3 py-8 flex flex-col gap-25 ">
        <InfoBox />
        <StoryBox isLoading={isLoading} />
        {!isLoading ? (
          <SkeletonPost />
        ) : (
          <Post isLoading={isLoading} showAllPosts={true} isUser={user} />
        )}
      </main>
    </Layout>
  );
};

export default Profile;
