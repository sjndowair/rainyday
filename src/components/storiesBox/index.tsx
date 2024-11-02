import { STORY_DUMMY_DATA } from "../../dummy/dummy-data";
import { ILoadingProps } from "../../types/mainHomepage";
import SkeletonStoryBox from "../../loading/skeleton/skeletonStoryBox";

const StoryBox = ({ isLoading }: ILoadingProps) => {
  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex space-x-4 gap-[1rem]">
        {!isLoading ? (
          <SkeletonStoryBox />
        ) : (
          <div className="flex space-x-4">
            {STORY_DUMMY_DATA.map((e) => (
              <div
                key={e.id}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 p-0.5 transition-transform transform group-hover:scale-105">
                  <img
                    src={e.avatar}
                    alt={e.username}
                    className="w-full h-full object-cover rounded-full border-2 border-gray-800"
                  />
                </div>
                <span className="text-xs mt-1 group-hover:text-blue-400 transition-colors">
                  {e.username}
                </span>
                <span className="text-xs text-gray-400">{e.outfit}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryBox;
