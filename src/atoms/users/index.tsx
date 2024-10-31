import { useState } from "react";
import FeatureIcon from "../featureIcon";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

const Users = () => {
  const [isLikedPosts, setIsLikedPosts] = useState<Set<number>>(new Set());
  const [isBookMark, setIsBookMark] = useState<Set<number>>(new Set());

  const ICON_INUM = {
    Heart: <Heart />,
    MessageCircle: <MessageCircle />,
    share: <Share2 />,
    icoBookMarkn: <Bookmark />,
  };

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
    <div>
      {Object.entries(ICON_INUM).map(([key, icon]) => (
        <FeatureIcon
          isBookMark={isBookMark}
          key={key}
          icon={icon}
          onClick={() => isToggleBookMark}
        />
      ))}
    </div>
  );
};

export default Users;
