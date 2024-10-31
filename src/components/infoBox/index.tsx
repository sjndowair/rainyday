import { ILoadingProps } from "../../types/mainHomepage";

import { Cloud } from "lucide-react";

const InfoBox = ({ isLoading }: ILoadingProps) => {
  // const WHETHE_API = process.env.
  return (
    <>
      {!isLoading ? (
        <div className="w-full h-[4rem] bg-gray-600 animate-pulse rounded " />
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
