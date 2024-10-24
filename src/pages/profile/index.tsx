import { useState, useEffect } from "react";
// import {
//   Home,
//   Search,
//   Bell,
//   Mail,
//   User,
//   Heart,
//   MessageCircle,
//   Share2,
//   Bookmark,
//   MoreHorizontal,
//   Umbrella,
//   Cloud,
// } from "lucide-react";

interface Story {
  id: number;
  username: string;
  avatar: string;
  outfit: string;
}

interface Post {
  id: number;
  username: string;
  avatar: string;
  content: string;
  image?: string;
  outfit: string;
  likes: number;
  comments: number;
  shares: number;
}

const stories: Story[] = [
  {
    id: 1,
    username: "rainlover",
    avatar: "/placeholder.svg?height=60&width=60",
    outfit: "Yellow raincoat",
  },
  {
    id: 2,
    username: "puddlejumper",
    avatar: "/placeholder.svg?height=60&width=60",
    outfit: "Blue wellies",
  },
  {
    id: 3,
    username: "stormchaser",
    avatar: "/placeholder.svg?height=60&width=60",
    outfit: "Waterproof jacket",
  },
  {
    id: 4,
    username: "cozycafe",
    avatar: "/placeholder.svg?height=60&width=60",
    outfit: "Warm sweater",
  },
];

const posts: Post[] = [
  {
    id: 1,
    username: "rainlover",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Loving my new yellow raincoat! Perfect for this weather. #RainyDayStyle",
    image: "/placeholder.svg?height=400&width=400",
    outfit: "Yellow raincoat",
    likes: 120,
    comments: 15,
    shares: 5,
  },
  {
    id: 2,
    username: "puddlejumper",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "These blue wellies are not just fashionable, but also practical! #RainyDayFashion",
    outfit: "Blue wellies",
    likes: 45,
    comments: 8,
    shares: 2,
  },
];

export default function Profile() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(
    new Set()
  );

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleBookmark = (postId: number) => {
    setBookmarkedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const createRaindrop = () => {
      const raindrop = document.createElement("div");
      raindrop.classList.add("raindrop");
      raindrop.style.left = `${Math.random() * 100}%`;
      raindrop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
      document.getElementById("rain-container")?.appendChild(raindrop);
      setTimeout(() => raindrop.remove(), 2000);
    };

    const rainInterval = setInterval(createRaindrop, 50);
    return () => clearInterval(rainInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-200">
      <div
        id="rain-container"
        className="fixed inset-0 pointer-events-none z-50"
      ></div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 shadow-lg">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <div className="mr-2" />
            RainyDaySocial
          </h1>
          <nav className="flex space-x-4">
            <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1">
              <div className="h-6 w-6" />
            </button>
            <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1">
              <div className="h-6 w-6" />
            </button>
            <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1">
              <div className="h-6 w-6" />
            </button>
            <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1">
              <div className="h-6 w-6" />
            </button>
            <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1">
              <div className="h-6 w-6" />
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto p-4">
        {/* Weather Update */}
        <div className="mb-6 bg-blue-900 bg-opacity-30 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 mr-2 text-blue-300" />
            <span className="text-lg font-semibold">
              Rainy day ahead! Don't forget your umbrella.
            </span>
          </div>
          <div className="text-sm">12°C | 90% chance of rain</div>
        </div>

        {/* Stories */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-4">
            {stories.map((story) => (
              <div
                key={story.id}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 p-0.5 transition-transform transform group-hover:scale-105">
                  <img
                    src={story.avatar}
                    alt={story.username}
                    className="w-full h-full object-cover rounded-full border-2 border-gray-800"
                  />
                </div>
                <span className="text-xs mt-1 group-hover:text-blue-400 transition-colors">
                  {story.username}
                </span>
                <span className="text-xs text-gray-400">{story.outfit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden backdrop-blur-sm transition-all hover:bg-opacity-70"
            >
              <div className="p-4 flex items-center">
                <img
                  src={post.avatar}
                  alt={post.username}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <span className="font-semibold">{post.username}</span>
                  <p className="text-xs text-gray-400">
                    Wearing: {post.outfit}
                  </p>
                </div>
                <button className="ml-auto focus:outline-none">
                  <div className="h-5 w-5" />
                </button>
              </div>
              {post.image && (
                <img src={post.image} alt="Post content" className="w-full" />
              )}
              <div className="p-4">
                <p className="mb-4">{post.content}</p>
                <div className="flex justify-between mb-2">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center space-x-1 focus:outline-none group"
                    >
                      <div
                        className={`h-5 w-5 ${
                          likedPosts.has(post.id)
                            ? "text-red-500 fill-current"
                            : "group-hover:text-red-500 transition-colors"
                        }`}
                      />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 focus:outline-none group">
                      <div className="h-5 w-5 group-hover:text-blue-400 transition-colors" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 focus:outline-none group">
                      <div className="h-5 w-5 group-hover:text-green-400 transition-colors" />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className="focus:outline-none"
                  >
                    <div
                      className={`h-5 w-5 ${
                        bookmarkedPosts.has(post.id)
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

      <style>{`
        .raindrop {
          position: absolute;
          top: -10px;
          width: 2px;
          height: 10px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.5)
          );
          animation: fall linear infinite;
        }
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
}
