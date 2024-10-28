import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

const USER_ICON = [
  { key: "Heart", icon: <Heart /> },
  { key: "MessageCircle", icon: <MessageCircle /> },
  { key: "share", icon: <Share2 /> },
  { key: "BookMark", icon: <Bookmark /> },
];

const Users = () => {
  return (
    <>
      {USER_ICON.map((e, i) => (
        <button
          key={i}
          className="flex items-center space-x-1 focus:outline-none group"
        >
          {e}
        </button>
      ))}
    </>
  );
};

export default Users;
