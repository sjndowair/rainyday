import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Cloud } from "lucide-react";

import SkeletonInfoBox from "../../loading/skeleton/skeletonInfoBox";
import { getWeatherList } from "../../apis/getWeatherApi";

const InfoBox = () => {
  const [isLatitube, setIsLatitube] = useState<number | "">();
  const [isLongtitube, setIsLongtitube] = useState<number | "">();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setIsLatitube(position.coords.latitude);
      setIsLongtitube(position.coords.longitude);
    });
  }, []);

  const {
    data: weatherData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["weatherData", isLatitube, isLongtitube],
    queryFn: () => getWeatherList(isLatitube!, isLongtitube!),
  });

  if (error) return <div>시발진짜 ㅈ같아서 못해먹겠네</div>;

  console.log(weatherData);
  console.log(isLatitube, isLongtitube);

  return (
    <>
      {isLoading ? (
        <SkeletonInfoBox />
      ) : (
        <div className="mb-6 bg-blue-900 bg-opacity-30 rounded-lg p-4 flex items-center justify-between h-[4rem]">
          <div className="flex items-center">
            <Cloud className="h-8 w-8 mr-2 text-blue-300" />
            <span className="text-lg font-semibold">
              Rainy day ahead! Don't forget your umbrella.
            </span>
          </div>
          <div className="text-sm">12°C | 90% chance of rain</div>
        </div>
      )}
    </>
  );
};

export default InfoBox;
