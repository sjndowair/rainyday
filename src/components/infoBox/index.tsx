import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Cloud } from "lucide-react";
import SkeletonInfoBox from "../../loading/skeleton/skeletonInfoBox";
import { getWeatherList, getWeatherDetail } from "../../apis/getWeatherApi";
import { weatherIcon } from "../../apis/getWeatherApi";
import { weatherGenres } from "../../utils/weather.Util";
import { useThemeStore } from "../../store";

const InfoBox = () => {
  const [isLatitube, setIsLatitube] = useState<number>();
  const [isLongtitube, setIsLongtitube] = useState<number>();

  const { isDarkMode } = useThemeStore();

  const { data: weatherData, isLoading: isWeatherLoading } = useQuery({
    queryKey: ["weatherData", isLatitube, isLongtitube],
    queryFn: () => getWeatherList(isLatitube!, isLongtitube!),
    enabled: isLatitube !== undefined && isLongtitube !== undefined,
  });

  const { data: detailData } = useQuery({
    queryKey: ["weatherDetail", isLatitube, isLongtitube],
    queryFn: () => getWeatherDetail(isLatitube!, isLongtitube!),
    enabled: isLatitube !== undefined && isLongtitube !== undefined,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setIsLatitube(position.coords.latitude);
      setIsLongtitube(position.coords.longitude);
    });
  }, []);

  const iconData = weatherData?.weather?.[0]?.icon!;

  const isIconUrl = () => {
    if (iconData) return weatherIcon({ iconData });
  };

  return (
    <>
      {isWeatherLoading ? (
        <SkeletonInfoBox />
      ) : (
        <div
          className={`mb-6 ${
            isDarkMode
              ? "bg-blue-900 bg-opacity-30"
              : "bg-purple-400 bg-opacity-60 text-white"
          } rounded-lg p-4 flex items-center justify-between h-[4rem]`}
        >
          <div className="flex gap-2 items-center">
            <Cloud
              className={`h-8 w-8 mr-2  ${
                isDarkMode ? "text-blue-300" : "text-white"
              }`}
            />
            <img src={isIconUrl()} alt="날씨 아이콘" />
            <span className="text-lg font-semibold">{weatherData?.name}</span>
            {weatherData?.weather?.map((e, i) => (
              <span className="text-lg font-semibold" key={i}>
                {weatherGenres[e.id]}
              </span>
            ))}
          </div>

          <div className="text-sm">
            습도: {detailData?.main?.humidity}% | 체감온도:{" "}
            {detailData?.main?.feel_like}°C
          </div>
        </div>
      )}
    </>
  );
};

export default InfoBox;
