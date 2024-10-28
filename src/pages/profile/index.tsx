import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Cloud,
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
        {/* Weather Update */}
        <div className="mb-6 bg-blue-900 bg-opacity-30 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Cloud className="h-8 w-8 mr-2 text-blue-300" />
            <span className="text-lg font-semibold">
              Rainy day ahead! Don't forget your umbrella.
            </span>
          </div>
          <div className="text-sm">12°C | 90% chance of rain</div>
        </div>

        {/* Stories */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-4">
            {STORY_DUMMY_DATA.map((e) => (
              <div
                key={e.id}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 p-0.5 transition-transform transform group-hover:scale-105">
                  <img
                    src={e.avatar}
                    alt={e.username}
                    className="w-full h-full object-cover rounded-full border-2 border-gray-800"
                  />
                </div>
                <span className="text-xs mt-1 group-hover:text-blue-400 transition-colors">
                  {e.username}
                </span>
                <span className="text-xs text-gray-400">{e.outfit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {POST_DUMMY_DATA.map((e) => (
            <div
              key={e.id}
              className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden backdrop-blur-sm transition-all hover:bg-opacity-70"
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
              {e.image && (
                <img src={e.image} alt="Post content" className="w-full" />
              )}
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
        </div>
      </main>
    </>
    // </div>
  );
};

export default Profile;
