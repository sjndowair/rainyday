import { useState } from "react";
import { ILoadingProps } from "../../types/mainHomepage";
import { POST_DUMMY_DATA } from "../../dummy/dummy-data";
import {
  Heart, Bookmark,
  Share2, MessageCircle,
  MoreHorizontal,
} from "lucide-react";
import {useThemeStore} from "../../store";


const Post = ({ isLoading }: ILoadingProps) => {
  const [isLikedPosts, setIsLikedPosts] = useState<Set<number>>(new Set());
  const [isBookMark, setIsBookMark] = useState<Set<number>>(new Set());

  const {isDarkMode} = useThemeStore();

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
    <div className="space-y-6">

        <>
          {POST_DUMMY_DATA.map((e) => (
            <div
              key={e.id}
              className={`${isDarkMode ? "bg-gray-800 bg-opacity-50" : "bg-purple-300 bg-opacity-50"} rounded-lg overflow-hidden backdrop-blur-sm transition-all hover:bg-opacity-70`}
            >
              <div className="p-4 flex items-center">
                <img
                  src={e.avatar}
                  alt={e.username}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <span className="font-semibold">{e.username}</span>
                  <p className="text-xs text-gray-400">Wearing: {e.outfit}</p>
                </div>
                <button className="ml-auto focus:outline-none">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                <p className="mb-4">{e.content}</p>
                <div className="flex justify-between mb-2">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => isToggleLiked(e.id)}
                      className="flex items-center space-x-1 focus:outline-none group"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isLikedPosts.has(e.id)
                            ? "text-red-500 fill-current"
                            : "group-hover:text-red-500 transition-colors"
                        }`}
                      />
                      <span>{e.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 focus:outline-none group">
                      <MessageCircle className="h-5 w-5 group-hover:text-blue-400 transition-colors" />
                      <span>{e.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 focus:outline-none group">
                      <Share2 className="h-5 w-5 group-hover:text-green-400 transition-colors" />
                      <span>{e.shares}</span>
                    </button>
                  </div>
                  <button
                    onClick={() => isToggleBookMark(e.id)}
                    className="focus:outline-none"
                  >
                    <Bookmark
                      className={`h-5 w-5 ${
                        isBookMark.has(e.id)
                          ? "text-yellow-500 fill-current"
                          : "hover:text-yellow-500 transition-colors"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
    </div>
  );
};

export default Post;
