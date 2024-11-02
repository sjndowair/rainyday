import { useEffect, useState } from "react";

const Loading = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 overflow-hidden">
      <div className="z-10 text-center">
        <div className="w-20 h-20 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-semibold text-blue-300">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
