import { STORY_DUMMY_DATA } from "../../../dummy/index";

const SkeletonStoryBox = () => {
  return (
    <>
      {STORY_DUMMY_DATA.map((_, i) => (
        <div key={i} className="flex gap-2 flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-600 animate-pulse"></div>
          <div className="w-14 h-3 mt-2 bg-gray-600 animate-pulse rounded"></div>
        </div>
      ))}
    </>
  );
};

export default SkeletonStoryBox;
