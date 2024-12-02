
import { useState } from "react";
import {
  Umbrella,
  Cloud,
  Edit,
  MapPin,
  Calendar,
  Droplet,
  Wind,
  ThermometerSun,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import {useNavigate} from "react-router-dom";
import Layout from "../../layout";
import Theme from "../../components/theme";
import { MYPAGE_DUMMY_DATA } from "../../dummy/dummy-data";
import {useThemeStore} from "../../store";

export default function MyPage() {
  const [weatherMood, setWeatherMood] = useState("☁️ Cloudy");
  const { isDarkMode } = useThemeStore();

  const navigate = useNavigate();

  return (
<Layout>
    <Theme>
      <div
        id="rain-container"
        className="fixed inset-0 pointer-events-none z-50"
      ></div>


      <main className="max-w-screen-xl mx-auto p-4">
        {/* Profile Section */}
        <div className={` ${isDarkMode ? "bg-gray-800 bg-opacity-50" : "bg-purple-300 bg-opacity-10 border border-purple-300" }  rounded-lg overflow-hidden backdrop-blur-sm mb-6`}>
          <div className={`relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 ${isDarkMode ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-gradient-to-r from-pink-400 to-purple-400 border border-purple-300"}`}>
            <button className="absolute top-4 right-4 bg-gray-800 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">
              <Edit className="h-5 w-5" />
            </button>
          </div>
          <div className="relative px-6 pb-6">
            <img
              src="/placeholder.svg?height=120&width=120"
              alt="Profile"
              className="absolute -top-16 left-6 w-32 h-32 rounded-full border-4 border-gray-800"
            />
            <div className="pt-20">
              <h2 className="text-2xl font-bold">Rain Lover</h2>
              <p className="text-gray-400 flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1" /> Seattle, WA
              </p>
              <p className="text-gray-400 flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1" /> Joined April 2023
              </p>
              <p className="mt-4">
                Embracing the rain, one puddle at a time. ☔️
                #RainyDayEnthusiast
              </p>
            </div>
          </div>
        </div>

        {/* Weather Mood */}
        <div className={`${isDarkMode ? "bg-blue-900 " : "bg-purple-300 bg-opacity-10 border border-purple-300 "} bg-opacity-30 rounded-lg p-4 mb-6`}>
          <h3 className="text-lg font-semibold mb-2">Today's Weather Mood</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Cloud className="h-8 w-8 text-blue-300" />
              <input
                type="text"
                value={weatherMood}
                onChange={(e) => setWeatherMood(e.target.value)}
                className="bg-transparent border-b border-blue-300 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setWeatherMood("☁️ Cloudy")}
                className="p-2 rounded-full hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Cloud className="h-5 w-5" />
              </button>
              <button
                onClick={() => setWeatherMood("💧 Drizzle")}
                className="p-2 rounded-full hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Droplet className="h-5 w-5" />
              </button>
              <button
                onClick={() => setWeatherMood("🌬️ Windy")}
                className="p-2 rounded-full hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Wind className="h-5 w-5" />
              </button>
              <button
                onClick={() => setWeatherMood("☀️ Sunny Break")}
                className="p-2 rounded-full hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <ThermometerSun className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div className="space-y-6">
          {MYPAGE_DUMMY_DATA.map((post) => (
            <div
              key={post.id}
              className={`${isDarkMode ? "bg-gray-800 bg-opacity-50" : "bg-purple-800 bg-opacity-10 hover:bg-opacity-20"} rounded-lg overflow-hidden backdrop-blur-sm transition-all hover:bg-opacity-70`}
            >
              <div className="p-4">
                <p className="mb-4">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full rounded-lg mb-4"
                  />
                )}
                <p className="text-sm text-gray-400 mb-2">
                  Wearing: {post.outfit}
                </p>
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
    </Theme>
</Layout>
  );
}
