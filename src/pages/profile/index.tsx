import { useState } from "react";
import InfoBox from "../../components/infoBox";
import StoryBox from "../../components/storiesBox";
import Post from "../../components/post";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { POST_DUMMY_DATA, STORY_DUMMY_DATA } from "../../dummy/dummy-data";

const Profile = () => {
  const [isLikedPosts, setIsLikedPosts] = useState<Set<number>>(new Set());
  const [isBookMark, setIsBookMark] = useState<Set<number>>(new Set());

  const isToggleLiked = (postId: number) => {
    setIsLikedPosts((prev) => {
      const newSet = new Set(prev);
      newSet.has(postId) ? newSet.delete(postId) : newSet.add(postId);
      return newSet;
    });
  };

  const isToggleBookMark = (postId: number) => {
    setIsBookMark((prev) => {
      const newSet = new Set(prev);
      newSet.has(postId) ? newSet.delete(postId) : newSet.add(postId);
      return newSet;
    });
  };

  return (
    <>
      <main className="max-w-screen-xl mx-auto p-4">
        <InfoBox />
        <StoryBox />
        <Post />
      </main>
    </>
    // </div>
  );
};

export default Profile;
