import { POST_DUMMY_DATA } from "../../../dummy/index";

const SkeletonPost = () => {
  return (
    <>
      {POST_DUMMY_DATA.map((_, i) => (
        <div
          key={i}
          className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden backdrop-blur-sm"
        >
          <div className="p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-600 animate-pulse mr-3"></div>
            <div className="w-24 h-4 bg-gray-600 animate-pulse rounded"></div>
          </div>
          <div className="w-full h-48 bg-gray-600 animate-pulse"></div>
          <div className="p-4">
            <div className="w-full h-4 bg-gray-600 animate-pulse rounded mb-2"></div>
            <div className="w-2/3 h-4 bg-gray-600 animate-pulse rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonPost;
