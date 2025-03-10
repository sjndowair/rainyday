import { MYPAGE_DUMMY_DATA, POST_DUMMY_DATA } from "../../dummy/index";

import {
  Heart,
  Bookmark,
  Share2,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";

import { useThemeStore } from "../../store";

const UserNoti = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <div className="space-y-6">
      {MYPAGE_DUMMY_DATA.map((post) => (
        <div
          key={post.id}
          className={`${
            isDarkMode
              ? "bg-gray-800 bg-opacity-50"
              : "bg-purple-800 bg-opacity-10 hover:bg-opacity-20"
          } rounded-lg overflow-hidden backdrop-blur-sm transition-all hover:bg-opacity-70`}
        >
          <div className="p-4">
            <p className="mb-4">{post.content}</p>

            <p className="text-sm text-gray-400 mb-2">Wearing: {post.outfit}</p>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <div className="flex space-x-4">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
                <span>{post.shares} shares</span>
              </div>
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserNoti;
