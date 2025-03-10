import { useThemeStore } from "../../store";

const Loading = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div
      className={`relative flex items-center justify-center min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } overflow-hidden`}
    >
      <div className="z-10 text-center">
        <div
          className={`w-14 h-14 border-t-4 border-b-4 border-r-4 rounded-full animate-spin mb-4 ${
            isDarkMode ? "border-blue-500" : "border-purple-500"
          }`}
        ></div>
        <p
          className={`text-xl font-semibold ${
            isDarkMode ? "text-blue-300" : "text-purple-500"
          }`}
        >
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
