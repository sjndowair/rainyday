import { useEffect, useState } from "react";
import RainEffect from "./rain";
import "./rain/style.css";

const Loading = () => {
  const [isRaindrops, setIsRaindrops] = useState<number[]>([]);

  useEffect(() => {
    setIsRaindrops(Array.from({ length: 50 }, (_, i) => i));
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
      {isRaindrops.map((_, i) => (
        <RainEffect key={i} delay={Math.random() * 1.5} />
      ))}
      <div className="z-10 text-center">
        <div className="w-20 h-20 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-semibold text-blue-300">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
